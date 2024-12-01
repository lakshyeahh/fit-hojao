'use client'

import { useState, useEffect } from 'react'
import { Home, Calendar, Activity, User, ChevronLeft, Dumbbell, Clock, Zap, TrendingUp, BarChart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function TrainingPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    // You can add any side effects here if needed
  }, [])

  // Mock data for the training load chart
  const trainingLoadData = [
    { day: 'Mon', load: 65 },
    { day: 'Tue', load: 75 },
    { day: 'Wed', load: 85 },
    { day: 'Thu', load: 70 },
    { day: 'Fri', load: 80 },
    { day: 'Sat', load: 90 },
    { day: 'Sun', load: 60 },
  ]

  // Mock data for upcoming training sessions
  const upcomingTrainingSessions = [
    { type: 'Strength', duration: '45 min', time: '10:00 AM', intensity: 'High' },
    { type: 'Cardio', duration: '30 min', time: '2:00 PM', intensity: 'Medium' },
    { type: 'Recovery', duration: '20 min', time: '5:00 PM', intensity: 'Low' },
  ]

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen pb-16 text-white">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
          </Link>
          <h1 className="text-2xl font-bold">Training</h1>
        </div>

        {/* Training Load Chart */}
        <div className="bg-gray-900 rounded-2xl p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Training Load</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingLoadData}>
                <XAxis dataKey="day" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line type="monotone" dataKey="load" stroke="#c2ff00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            Your training load has increased by 15% this week.
          </div>
        </div>

        {/* Today's Training Summary */}
        <div className="bg-gray-900 rounded-2xl p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Today's Training</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-xl p-3">
              <Dumbbell className="w-6 h-6 text-[#c2ff00] mb-2" />
              <p className="text-sm text-gray-400">Total Volume</p>
              <p className="text-xl font-bold">12,500 kg</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <Clock className="w-6 h-6 text-[#c2ff00] mb-2" />
              <p className="text-sm text-gray-400">Duration</p>
              <p className="text-xl font-bold">75 min</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <Zap className="w-6 h-6 text-[#c2ff00] mb-2" />
              <p className="text-sm text-gray-400">Intensity</p>
              <p className="text-xl font-bold">High</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <TrendingUp className="w-6 h-6 text-[#c2ff00] mb-2" />
              <p className="text-sm text-gray-400">Progress</p>
              <p className="text-xl font-bold">+5%</p>
            </div>
          </div>
        </div>

        {/* Upcoming Training Sessions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
          {upcomingTrainingSessions.map((session, index) => (
            <div key={index} className="bg-gray-900 rounded-2xl p-4 mb-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-[#c2ff00]">{session.type}</p>
                  <p className="text-sm text-gray-400">{session.time} • {session.duration}</p>
                </div>
                <div className="bg-gray-800 rounded-full px-3 py-1">
                  <span className="text-sm text-[#c2ff00]">{session.intensity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Training Stats */}
        <div className="bg-gray-900 rounded-2xl p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Training Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Weekly Goal</p>
              <p className="text-2xl font-bold">80%</p>
              <div className="w-full bg-gray-800 rounded-full h-2.5 mt-2">
                <div className="bg-[#c2ff00] h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">Monthly Goal</p>
              <p className="text-2xl font-bold">65%</p>
              <div className="w-full bg-gray-800 rounded-full h-2.5 mt-2">
                <div className="bg-[#c2ff00] h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gray-900 rounded-2xl p-4 flex items-center justify-center">
            <BarChart className="w-6 h-6 text-[#c2ff00] mr-2" />
            <span>View Detailed Stats</span>
          </button>
          <button className="bg-[#c2ff00] text-black rounded-2xl p-4 flex items-center justify-center font-semibold">
            <Dumbbell className="w-6 h-6 mr-2" />
            <span>Start Training</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-4 px-6">
        <Link to="/dashboard" className="text-gray-600">
          <Home className="w-6 h-6" />
        </Link>
        <Link to="/schedule" className="text-gray-600">
          <Calendar className="w-6 h-6" />
        </Link>
        <Link to="/activity" className="text-gray-600">
          <Activity className="w-6 h-6" />
        </Link>
        <Link to="/profile" className="text-gray-600">
          <User className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}