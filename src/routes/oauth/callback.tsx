import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    // Get the current domain (works for both local and production)
    const domain = window.location.origin;
    const callbackEndpoint = `${domain}/api/oauth/callback`;

    if (code) {
      // Exchange the code for tokens
      fetch(callbackEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, state }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Store tokens securely
          localStorage.setItem('healthAccessToken', data.accessToken);
          localStorage.setItem('healthRefreshToken', data.refreshToken);
          navigate('/activity');
        } else {
          console.error('OAuth error:', data.error);
          navigate('/health-connect?error=auth_failed');
        }
      })
      .catch(error => {
        console.error('OAuth callback error:', error);
        navigate('/health-connect?error=server_error');
      });
    } else {
      navigate('/health-connect?error=no_code');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Connecting to Health Service</h1>
        <p className="text-gray-400">Please wait while we complete the connection...</p>
      </div>
    </div>
  );
} 