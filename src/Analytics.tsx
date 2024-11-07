'use client'

import { useState } from 'react'
import { ChevronLeft, Heart, Droplets, Watch, Activity, Zap, Timer } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import {  Home, Calendar, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('watch')

  // Mock data for smartwatch
  const watchData = {
    heartRate: [
      { time: '00:00', rate: 62 },
      { time: '04:00', rate: 58 },
      { time: '08:00', rate: 72 },
      { time: '12:00', rate: 85 },
      { time: '16:00', rate: 78 },
      { time: '20:00', rate: 68 },
    ],
    hydrationLevel: 75, // percentage
    sleepHours: 7.5,
    steps: 8426,
  }

  // Mock data for last game
  const gameData = {
    distanceCovered: 9.7, // km
    sprintCount: 24,
    topSpeed: 32, // km/h
    passAccuracy: 87, // percentage
    possessionTime: 62, // minutes
    heatmap: [
      { zone: 'Defense', time: 15 },
      { zone: 'Midfield', time: 35 },
      { zone: 'Attack', time: 12 },
    ],
  }

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen pb-16 text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center p-4 text-sm text-gray-400">
        <span>9:41</span>
        <div className="flex gap-1">
          <span>●●●●</span>
          <span>WiFi</span>
          <span>100%</span>
        </div>
      </div>

      {/* Header */}
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button className="mr-4">
            <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
          </button>
          <h1 className="text-2xl font-bold">Performance Data</h1>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
          <button
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === 'watch' ? 'bg-[#c2ff00] text-black' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('watch')}
          >
            Watch Data
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === 'game' ? 'bg-[#c2ff00] text-black' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('game')}
          >
            Last Game
          </button>
        </div>

        {activeTab === 'watch' ? (
          // Watch Data
          <div className="space-y-6">
            {/* Heart Rate */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-[#c2ff00]" />
                Heart Rate
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={watchData.heartRate}>
                  <XAxis dataKey="time" stroke="#c2ff00" />
                  <YAxis stroke="#c2ff00" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                  <Line type="monotone" dataKey="rate" stroke="#c2ff00" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Hydration Level */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Droplets className="w-5 h-5 mr-2 text-[#c2ff00]" />
                Hydration Level
              </h2>
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-full border-4 border-[#c2ff00] flex items-center justify-center">
                  <Droplets className="w-8 h-8 text-[#c2ff00]" />
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-[#c2ff00]">{watchData.hydrationLevel}%</p>
                  <p className="text-gray-400">Hydrated</p>
                </div>
              </div>
            </div>

            {/* Sleep and Steps */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-2xl p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Watch className="w-4 h-4 mr-2 text-[#c2ff00]" />
                  Sleep
                </h3>
                <p className="text-3xl font-bold text-[#c2ff00]">{watchData.sleepHours}h</p>
                <p className="text-sm text-gray-400">Last night</p>
              </div>
              <div className="bg-gray-900 rounded-2xl p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-[#c2ff00]" />
                  Steps
                </h3>
                <p className="text-3xl font-bold text-[#c2ff00]">{watchData.steps}</p>
                <p className="text-sm text-gray-400">Today</p>
              </div>
            </div>
          </div>
        ) : (
          // Game Data
          <div className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-2xl p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-[#c2ff00]" />
                  Distance
                </h3>
                <p className="text-3xl font-bold text-[#c2ff00]">{gameData.distanceCovered} km</p>
              </div>
              <div className="bg-gray-900 rounded-2xl p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-[#c2ff00]" />
                  Sprints
                </h3>
                <p className="text-3xl font-bold text-[#c2ff00]">{gameData.sprintCount}</p>
              </div>
              <div className="bg-gray-900 rounded-2xl p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-[#c2ff00]" />
                  Top Speed
                </h3>
                <p className="text-3xl font-bold text-[#c2ff00]">{gameData.topSpeed} km/h</p>
              </div>
              <div className="bg-gray-900 rounded-2xl p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Timer className="w-4 h-4 mr-2 text-[#c2ff00]" />
                  Possession
                </h3>
                <p className="text-3xl font-bold text-[#c2ff00]">{gameData.possessionTime} min</p>
              </div>
            </div>

            {/* Pass Accuracy */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-[#c2ff00]" />
                Pass Accuracy
              </h2>
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-full border-4 border-[#c2ff00] flex items-center justify-center">
                  <Activity className="w-8 h-8 text-[#c2ff00]" />
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-[#c2ff00]">{gameData.passAccuracy}%</p>
                  <p className="text-gray-400">Accurate passes</p>
                </div>
              </div>
            </div>

            {/* Heatmap */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-[#c2ff00]" />
                Position Heatmap
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={gameData.heatmap} layout="vertical">
                  <XAxis type="number" stroke="#c2ff00" />
                  <YAxis dataKey="zone" type="category" stroke="#c2ff00" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                  <Bar dataKey="time" fill="#c2ff00" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-4 px-6">
                <button className="text-gray-600">
                    <Link to={'/dashboard'}>
                        <Home className="w-6 h-6" />
                    </Link>
                </button>

                <button className="text-gray-600">
                    <Link to={'/pre-game'}>
                        <Calendar className="w-6 h-6" />
                    </Link>
                </button>
                <button className="text-[#c2ff00]">
                    <Link to={'/activity'}>
                        <Activity className="w-6 h-6" />
                    </Link>
                </button>
                <button className="text-gray-600">
                    <Link to={'/user'}>
                        <User className="w-6 h-6" />
                    </Link>
                </button>
            </div>
    </div>
  )
}