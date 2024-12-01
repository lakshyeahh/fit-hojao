const handleGoogleFitConnect = () => {
  const clientId = '49939848628-43880hebju9j4mn6pqt1q3a97kp412t0.apps.googleusercontent.com';
  const redirectUri = window.location.origin + '/oauth/callback';
  const scope = 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read';
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
  
  window.location.href = authUrl;
}; 