import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, X } from 'lucide-react';

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [countdown, setCountdown] = useState(5);
  const [errorMessage, setErrorMessage] = useState('');

  const determineProvider = () => {
    const referrer = document.referrer.toLowerCase();
    console.log('OAuth referrer:', referrer);

    if (referrer.includes('accounts.google.com')) return 'google';
    if (referrer.includes('fitbit.com')) return 'fitbit';
    if (referrer.includes('strava.com')) return 'strava';
    if (referrer.includes('withings.com')) return 'withings';
    if (referrer.includes('garmin.com')) return 'garmin';

    const url = new URL(window.location.href);
    const scope = url.searchParams.get('scope');
    
    if (scope?.includes('googleapis.com')) return 'google';
    if (scope?.includes('fitbit.com')) return 'fitbit';
    
    console.log('Could not determine provider from referrer or scope, defaulting to google');
    return 'google';
  };
  
  useEffect(() => {
    const code = searchParams.get('code');
    const provider = determineProvider();

    async function handleCallback() {
      try {
        const code = searchParams.get('code');
        const provider = determineProvider();
        console.log('Starting OAuth callback:', { provider, hasCode: !!code });

        if (provider === 'google') {
          // Exchange code for token
          console.log('Exchanging code for token...');
          const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              code: code as string,
              client_id: '49939848628-43880hebju9j4mn6pqt1q3a97kp412t0.apps.googleusercontent.com',
              client_secret: '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',
              redirect_uri: `${window.location.origin}/oauth/callback`,
              grant_type: 'authorization_code'
            })
          });

          if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            console.error('Token exchange failed:', errorData);
            throw new Error(errorData.error_description || 'Failed to exchange code for token');
          }

          const tokenData = await tokenResponse.json();
          console.log('Token exchange successful:', { 
            hasAccessToken: !!tokenData.access_token,
            tokenType: tokenData.token_type,
            expiresIn: tokenData.expires_in
          });

          // Store token in localStorage
          localStorage.setItem('google_fit_token', tokenData.access_token);
          
          // Verify token was stored
          const storedToken = localStorage.getItem('google_fit_token');
          console.log('Token storage check:', { 
            wasStored: !!storedToken,
            storedTokenLength: storedToken?.length
          });

          // Send message to parent window
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage({ 
              type: 'OAUTH_SUCCESS',
              provider,
              token: tokenData.access_token
            }, window.location.origin);
          }

          setStatus('success');
        }

        let count = 5;
        const timer = setInterval(() => {
          count--;
          setCountdown(count);
          if (count === 0) {
            clearInterval(timer);
            setTimeout(() => window.close(), 100);
          }
        }, 1000);

        return () => clearInterval(timer);
      } catch (error) {
        console.error('OAuth callback error:', error);
        setErrorMessage(error instanceof Error ? error.message : 'Unable to connect to health app');
        setStatus('error');
      }
    }

    if (code) {
      handleCallback();
    } else {
      setErrorMessage('No authorization code received');
      setStatus('error');
    }
  }, [searchParams, navigate]);

  const handleClose = () => {
    window.close();
  };

  if (status === 'processing') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#c2ff00] mx-auto mb-4"></div>
          <p>Connecting to your health app...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="rounded-full h-12 w-12 bg-red-500 flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold mb-2">Connection Failed</h2>
          <p className="text-gray-400 mb-4">{errorMessage}</p>
          <div className="text-sm text-gray-500 mb-4">
            <p>Code: {searchParams.get('code')}</p>
            <p>Provider: {determineProvider()}</p>
          </div>
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-[#c2ff00] text-black rounded-lg hover:bg-[#a6d600] transition"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <div className="rounded-full h-12 w-12 bg-[#c2ff00] flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-black" />
        </div>
        <h2 className="text-xl font-bold mb-2">Successfully Connected!</h2>
        <p className="text-gray-400 mb-4">You can now close this window.</p>
        <p className="text-sm text-gray-500 mb-4">Window will close automatically in {countdown} seconds</p>
        <button 
          onClick={handleClose}
          className="px-4 py-2 bg-[#c2ff00] text-black rounded-lg hover:bg-[#a6d600] transition"
        >
          Close Window Now
        </button>
      </div>
    </div>
  );
} 