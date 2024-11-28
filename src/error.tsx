'use client'

import { useState } from 'react'
import { AlertCircle, RefreshCw, Home, User } from 'lucide-react'

type ErrorType = 'no_wearable_data' | 'no_upcoming_sessions' | 'connection_error'

const errorMessages = {
  no_wearable_data: "No wearable data available",
  no_upcoming_sessions: "No upcoming sessions found",
  connection_error: "Unable to connect to the server"
}

export default function ErrorNoDataPage() {
  const [errorType, setErrorType] = useState<ErrorType>('no_wearable_data')
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)
    // Simulating a retry action
    setTimeout(() => {
      setIsRetrying(false)
      // Here you would typically re-fetch the data or check the connection
      console.log("Retried fetching data")
    }, 2000)
  }

  const navigateTo = (destination: 'dashboard' | 'profile') => {
    console.log(`Navigating to ${destination}`)
    // Here you would implement the actual navigation logic
  }

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen text-white flex flex-col">
      {/* Status Bar */}
      

      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center p-6">
        <AlertCircle className="w-24 h-24 text-[#c2ff00] mb-6" />
        <h1 className="text-2xl font-bold mb-4 text-center">Oops! Something's Missing</h1>
        <p className="text-gray-300 text-center mb-8">{errorMessages[errorType]}</p>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="flex items-center justify-center w-full py-3 px-4 bg-[#c2ff00] text-black font-semibold rounded-lg hover:bg-[#a6d600] transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRetrying ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Retrying...
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5 mr-2" />
              Retry
            </>
          )}
        </button>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-4 w-full">
          <button
            onClick={() => navigateTo('dashboard')}
            className="flex items-center justify-center flex-1 py-3 px-4 bg-gray-800 text-[#c2ff00] font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => navigateTo('profile')}
            className="flex items-center justify-center flex-1 py-3 px-4 bg-gray-800 text-[#c2ff00] font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            <User className="w-5 h-5 mr-2" />
            Profile
          </button>
        </div>
      </div>

      {/* Error Type Selector (for demonstration purposes) */}
      <div className="p-6">
        <p className="text-sm text-gray-400 mb-2">Demo: Select Error Type</p>
        <select
          value={errorType}
          onChange={(e) => setErrorType(e.target.value as ErrorType)}
          className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
        >
          <option value="no_wearable_data">No Wearable Data</option>
          <option value="no_upcoming_sessions">No Upcoming Sessions</option>
          <option value="connection_error">Connection Error</option>
        </select>
      </div>
    </div>
  )
}