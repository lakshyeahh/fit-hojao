'use client'

import { useState, useEffect } from 'react'
import { Activity, RefreshCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HealthApp {
  name: string
  color: string
  hoverColor: string
  authUrl: string
  isConnected: boolean
  lastSync?: Date
}

const GOOGLE_SCOPES = [
  'email',
  'profile',
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.heart_rate.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.location.read',
  'https://www.googleapis.com/auth/fitness.blood_pressure.read',
  'https://www.googleapis.com/auth/fitness.blood_glucose.read',
  'https://www.googleapis.com/auth/fitness.nutrition.read',
  'https://www.googleapis.com/auth/fitness.oxygen_saturation.read',
  'https://www.googleapis.com/auth/fitness.reproductive_health.read',
  'https://www.googleapis.com/auth/fitness.sleep.read'
].join(' ');

export default function HealthConnect() {
  const navigate = useNavigate()
  const [healthApps, setHealthApps] = useState<HealthApp[]>([
    {
      name: 'Google Fit',
      color: '#4285F4',
      hoverColor: '#3367D6',
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?` + 
        new URLSearchParams({
          client_id: '49939848628-43880hebju9j4mn6pqt1q3a97kp412t0.apps.googleusercontent.com',
          redirect_uri: `${window.location.origin}/oauth/callback`,
          response_type: 'code',
          scope: GOOGLE_SCOPES,
          access_type: 'offline',
          prompt: 'consent'
        }).toString(),
      isConnected: false
    },
    {
      name: 'Strava',
      color: '#FC4C02',
      hoverColor: '#E34402',
      authUrl: `https://www.strava.com/oauth/authorize?client_id=${import.meta.env.VITE_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=activity:read_all,profile:read_all`,
      isConnected: false
    },
    {
      name: 'Withings',
      color: '#00b5a5',
      hoverColor: '#009688',
      authUrl: `https://account.withings.com/oauth2_user/authorize2?client_id=${import.meta.env.VITE_WITHINGS_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=user.metrics`,
      isConnected: false
    },
    {
      name: 'Fitbit',
      color: '#00B0B9',
      hoverColor: '#008C94',
      authUrl: `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23PZW6&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Foauth%2Fcallback&scope=activity+nutrition+heartrate+location+nutrition+profile+settings+sleep+social+weight&expires_in=604800`,
      isConnected: false
    },
    {
      name: 'Garmin',
      color: '#000000',
      hoverColor: '#333333',
      authUrl: `https://connect.garmin.com/oauthConfirm?client_id=${import.meta.env.VITE_GARMIN_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=activity:read_all,profile:read_all`,
      isConnected: false
    }
  ])

  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle')
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkConnectionStatus()
  }, [])

  const checkConnectionStatus = () => {
    try {
      setSyncStatus('syncing')
      setError(null)
      
      // Check for tokens in localStorage
      const googleFitToken = localStorage.getItem('google_fit_token')
      const stravaToken = localStorage.getItem('strava_token')
      const withingsToken = localStorage.getItem('withings_token')
      const fitbitToken = localStorage.getItem('fitbit_token')
      const garminToken = localStorage.getItem('garmin_token')

      setHealthApps(prev => prev.map(app => {
        let isConnected = false
        let lastSync = undefined

        switch(app.name.toLowerCase()) {
          case 'google fit':
            isConnected = !!googleFitToken
            break
          case 'strava':
            isConnected = !!stravaToken
            break
          case 'withings':
            isConnected = !!withingsToken
            break
          case 'fitbit':
            isConnected = !!fitbitToken
            break
          case 'garmin':
            isConnected = !!garminToken
            break
        }

        return {
          ...app,
          isConnected,
          lastSync: isConnected ? new Date() : undefined
        }
      }))
      
      setSyncStatus('success')
      setLastSyncTime(new Date())
    } catch (err) {
      console.error('Failed to check connection status:', err)
      setSyncStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to check connection status')
    }
  }

  const handleConnect = (authUrl: string) => {
    const width = 600
    const height = 800
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2
    
    window.open(
      authUrl,
      'Connect Health App',
      `width=${width},height=${height},left=${left},top=${top},location=yes,menubar=no,toolbar=no,status=no`
    )
  }

  // Listen for OAuth success message
  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_SUCCESS') {
        console.log('OAuth success:', event.data)
        checkConnectionStatus() // Refresh status after successful connection
        setTimeout(() => {
          navigate('/onboarding')
        }, 1500)
      }
    }

    window.addEventListener('message', handleOAuthMessage)
    return () => window.removeEventListener('message', handleOAuthMessage)
  }, [navigate])

  const renderConnectButton = (app: HealthApp) => {
    const isConnected = app.isConnected;
    const buttonStyle = {
      backgroundColor: isConnected ? 'transparent' : app.color,
      borderColor: app.color,
      borderWidth: isConnected ? '1px' : '0',
      color: isConnected ? app.color : 'white',
    };

    return (
      <button
        onClick={() => handleConnect(app.authUrl)}
        className="px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        style={buttonStyle}
      >
        {isConnected ? (
          <>
            <RefreshCcw className="w-4 h-4" />
            <span>Reconnect</span>
          </>
        ) : (
          <span>Connect</span>
        )}
      </button>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen pb-16 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Connect Your Health Apps</h1>
        <p className="text-gray-400">Link your fitness devices and apps to sync your health data.</p>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-200 mb-2">{error}</p>
          <button
            onClick={checkConnectionStatus}
            className="text-red-200 hover:text-red-100 text-sm flex items-center"
          >
            <RefreshCcw className="w-4 h-4 mr-1" /> Try Again
          </button>
        </div>
      )}

      <div className="space-y-4">
        {healthApps.map((app) => (
          <div
            key={app.name}
            className="bg-gray-900 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{app.name}</h3>
                {app.isConnected && app.lastSync && (
                  <p className="text-sm text-gray-400">
                    Last synced: {app.lastSync.toLocaleDateString()}
                  </p>
                )}
              </div>
              {renderConnectButton(app)}
            </div>
          </div>
        ))}
      </div>

      {syncStatus === 'syncing' && (
        <div className="mt-6 flex items-center justify-center text-gray-400">
          <RefreshCcw className="w-5 h-5 animate-spin mr-2" />
          Checking connection status...
        </div>
      )}
    </div>
  )
}