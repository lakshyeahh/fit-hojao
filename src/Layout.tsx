import { Link, Outlet, useLocation } from 'react-router-dom'
import { Home, Calendar, Activity, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Layout() {
  const location = useLocation()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])


  return (
    <div className="max-w-md mx-auto bg-black min-h-screen pb-16 text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center p-4 text-sm text-gray-400">
      <span>{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
        <div className="flex gap-1">
          <span>●●●●</span>
          <span>WiFi</span>
          <span>100%</span>
        </div>
      </div>

      <Outlet/>

      {/* Bottom Navigation */}
      {location.pathname !== '/' && location.pathname !== '/register' && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-4 px-6">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'text-[#c2ff00]' : 'text-gray-600'}>
            <Home className="w-6 h-6" />
          </Link>
          <Link to="/pre-game" className={location.pathname === '/pre-game' ? 'text-[#c2ff00]' : 'text-gray-600'}>
            <Calendar className="w-6 h-6" />
          </Link>
          <Link to="/activity" className={location.pathname === '/activity' ? 'text-[#c2ff00]' : 'text-gray-600'}>
            <Activity className="w-6 h-6" />
          </Link>
          <Link to="/user" className={location.pathname === '/user' ? 'text-[#c2ff00]' : 'text-gray-600'}>
            <User className="w-6 h-6" />
          </Link>
        </div>
      )}
    </div>
  )
}