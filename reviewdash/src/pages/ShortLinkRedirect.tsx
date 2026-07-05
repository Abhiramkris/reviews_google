import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LOCAL_API_URL = 'http://localhost:8787/adminApiBlog';
const LIVE_API_URL = 'https://bloggfeature.certifyied.workers.dev/adminApiBlog';

export default function ShortLinkRedirect() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    const fetchClientId = async () => {
      const baseUrl = import.meta.env.DEV ? LOCAL_API_URL : LIVE_API_URL;
      const url = `${baseUrl}/api/reviews/public/slug?slug=${slug}`;
        
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Short link not found.');
        }
        // Redirect to the feedback page
        navigate(`/feedback?clientId=${data.clientId}`, { replace: true });
      } catch (err: any) {
        setError(err.message || 'Failed to resolve short link.');
      }
    };

    fetchClientId();
  }, [slug, navigate]);

  if (error) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', padding: '2rem', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center', backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#ef4444', fontWeight: 600, fontSize: '1.1rem', margin: '0 0 1rem' }}>Error</p>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.5 }}>{error}</p>
          <button 
            onClick={() => navigate('/', { replace: true })} 
            style={{ padding: '10px 24px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer' }}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <p style={{ color: '#475569', fontSize: '1rem' }}>Redirecting to feedback page...</p>
    </div>
  );
}
