'use client'

import { useState } from 'react'
import { ChevronLeft, Activity, Clock, AlertTriangle, ChevronRight } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Home, Calendar, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Details() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for injury prediction
  const injuryPredictionScore = 65
  const restTime = 72 // hours
  const probableInjuryParts = [
    { part: 'Knee', probability: 40 },
    { part: 'Ankle', probability: 30 },
    { part: 'Hamstring', probability: 20 },
    { part: 'Lower Back', probability: 10 },
  ]

  const pieChartData = [
    { name: 'Risk', value: injuryPredictionScore },
    { name: 'Safe', value: 100 - injuryPredictionScore },
  ]

  const COLORS = ['#c2ff00', '#333']

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen pb-16 text-white">
      {/* Status Bar */}
      

      {/* Header */}
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button className="mr-4">
            <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
          </button>
          <h1 className="text-2xl font-bold">Health Stats</h1>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
          <button
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === 'overview' ? 'bg-[#c2ff00] text-black' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === 'details' ? 'bg-[#c2ff00] text-black' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
        </div>

        {/* Main Stats */}
        <div className="space-y-6">
          {/* Injury Prediction Score */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-[#c2ff00]" />
                <Link to="/injury-prediction-details" className="flex items-center">
                  Injury Prediction Score
                  <ChevronRight className="w-5 h-5 ml-2 text-[#c2ff00]" />
                </Link>
              </div>
            </h2>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="50%" height={150}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="text-right">
                <p className="text-4xl font-bold text-[#c2ff00]">{injuryPredictionScore}%</p>
                <p className="text-gray-400">Risk Level</p>
              </div>
            </div>
          </div>

          {/* Rest Time */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#c2ff00]" />
                <Link to="/rest-day-details" className="flex items-center">
                  Recommended Rest Time
                  <ChevronRight className="w-5 h-5 ml-2 text-[#c2ff00]" />
                </Link>
              </div>
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-[#c2ff00]">{restTime}h</p>
                <p className="text-gray-400">If injury occurs</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-[#c2ff00] flex items-center justify-center">
                <Clock className="w-8 h-8 text-[#c2ff00]" />
              </div>
            </div>
          </div>

          {/* Probable Injury Parts */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-[#c2ff00]" />
                <Link to="/injury-part" className="flex items-center">
                  Probable Injury Parts
                  <ChevronRight className="w-5 h-5 ml-2 text-[#c2ff00]" />
                </Link>
              </div>
            </h2>
            <div className="space-y-3">
              {probableInjuryParts.map((part, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{part.part}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-700 rounded-full h-2 mr-2">
                      <div
                        className="bg-[#c2ff00] h-2 rounded-full"
                        style={{ width: `${part.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-[#c2ff00]">{part.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}