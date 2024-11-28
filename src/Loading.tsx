'use client'

import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const navigate  = useNavigate();


  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
      
          clearInterval(timer)
          navigate('/dashboard')
          return 100
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 200)

    return () => {
      clearInterval(timer)
    }
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Status Bar */}
     

      {/* Logo and App Name */}
      <div className="mb-8 text-center">
        <div className="inline-block p-4 bg-gray-900 rounded-full mb-4">
          <Activity className="w-16 h-16 text-[#c2ff00]" />
        </div>
        <h1 className="text-3xl font-bold">Guardian</h1>
        <p className="text-sm text-gray-400 mt-2 font-mono">predict. prevent. perform.</p>
      </div>

      {/* Loading Animation */}
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#c2ff00] transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-gray-400">Loading your performance data...</p>

      {/* Version Number */}
      <div className="fixed bottom-8 text-sm text-gray-600">
        Version 1.0.0
      </div>
    </div>
  )
}

