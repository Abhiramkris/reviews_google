import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicFunnel from './pages/PublicFunnel';

const basename = window.location.pathname.startsWith('/clientReview') ? '/clientReview' : '';

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        {/* clientReview is ONLY the public Google-style review funnel */}
        <Route path="/" element={<PublicFunnel />} />
        <Route path="/index.html" element={<PublicFunnel />} />
        <Route path="/feedback" element={<PublicFunnel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
