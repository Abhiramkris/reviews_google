const fs = require('fs');

const filepath = '/Users/abhiram/Documents/certifyied/reviews_google/clientReview/src/pages/LandingPage.tsx';
const content = fs.readFileSync(filepath, 'utf8');

// A simple stack-based parser to check JSX tag matching
let pos = 0;
const stack = [];

function parse() {
  while (pos < content.length) {
    if (content[pos] === '<') {
      // Check if it is a comment
      if (content.substr(pos, 4) === '<!--') {
        pos = content.indexOf('-->', pos) + 3;
        continue;
      }
      if (content.substr(pos, 3) === '{/*') {
        pos = content.indexOf('*/}', pos) + 3;
        continue;
      }
      
      // Read tag name
      pos++;
      let isClosing = false;
      if (content[pos] === '/') {
        isClosing = true;
        pos++;
      }
      
      let tagName = '';
      while (pos < content.length && /[a-zA-Z0-9\.\-]/.test(content[pos])) {
        tagName += content[pos];
        pos++;
      }
      
      if (!tagName) continue;
      
      // Skip until '>'
      let isSelfClosing = false;
      while (pos < content.length && content[pos] !== '>') {
        if (content[pos] === '/' && content[pos + 1] === '>') {
          isSelfClosing = true;
          pos++;
          break;
        }
        pos++;
      }
      
      pos++; // consume '>' or '/'
      
      if (isSelfClosing) {
        // self closing, ignore
        continue;
      }
      
      if (isClosing) {
        const top = stack.pop();
        if (top !== tagName) {
          console.warn(`Mismatched tag at pos ${pos}: closed </${tagName}> but expected </${top}>`);
        }
      } else {
        // Only push standard HTML tag names or component names
        // skip if it's a known non-JSX syntax
        if (tagName === 'svg' || tagName === 'path' || tagName === 'line' || tagName === 'circle' || tagName === 'rect') {
          // ignore SVG tags for simplicity or track them
        }
        stack.push(tagName);
      }
    } else {
      pos++;
    }
  }
}

try {
  parse();
  console.log('Final stack:', stack);
} catch (err) {
  console.error(err);
}
