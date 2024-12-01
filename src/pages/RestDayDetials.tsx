'use client'

import { useState } from 'react'
import { ChevronLeft, Calendar, Activity, Moon, Heart, Zap, ArrowDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const RestDayDetails = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [data] = useState({
    rest_days: 3,
    severity_level: "Moderate",
    return_date: "2024-03-25",
    training_regime: [
      "Day 1: Active recovery only",
      "Day 2: Light mobility work",
      "Day 3: Gradual return to training"
    ],
    health_based_adjustments: {
      original_rest_days: 2,
      adjusted_for_health: 3,
      adjustment_factors: [
        "Low recovery score",
        "High training load",
        "Poor sleep quality"
      ]
    },
    recovery_metrics: {
      sleep_debt: "8 hours",
      fatigue_score: 75,
      readiness_trend: "Decreasing",
      stress_level: "High"
    },
    recommended_targets: {
      sleep_hours: "8-9 hours",
      hrv_baseline: "> 65ms",
      resting_hr: "< 60bpm",
      recovery_score: "> 70%"
    }
  })

  const renderProgressBar = (value: number, max: number) => (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div className="bg-[#c2ff00] h-2.5 rounded-full" style={{ width: `${(value / max) * 100}%` }}></div>
    </div>
  )

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen text-white p-6">
      {/* Header */}
      <div className="flex items-center mb-6">

        <Link to="/details" className="mr-4">
          <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Recovery Plan</h1>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
        {['overview', 'metrics', 'targets'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === tab ? 'bg-[#c2ff00] text-black' : 'text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Recovery Overview */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-[#c2ff00] mr-2" />
                  <h2 className="text-lg font-semibold text-white">Recovery Overview</h2>
                </div>
                <span className="text-[#c2ff00] font-bold">{data.severity_level}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-white opacity-80">Rest Days</div>
                  <div className="text-2xl font-bold text-[#c2ff00]">{data.rest_days}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm text-white opacity-80">Return Date</div>
                  <div className="text-xl font-bold text-[#c2ff00]">{data.return_date}</div>
                </div>
              </div>
              <div className="space-y-2">
                {data.training_regime.map((day, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#c2ff00] rounded-full mr-2"></div>
                    <span className="text-sm text-white">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health-based Adjustments */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Activity className="w-5 h-5 text-[#c2ff00] mr-2" />
                <h2 className="text-lg font-semibold text-white">Health-based Adjustments</h2>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-white opacity-80">Original Rest Days</span>
                <span className="text-lg font-bold text-white">{data.health_based_adjustments.original_rest_days}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-white opacity-80">Adjusted Rest Days</span>
                <span className="text-lg font-bold text-[#c2ff00]">{data.health_based_adjustments.adjusted_for_health}</span>
              </div>
              <div className="space-y-2">
                {data.health_based_adjustments.adjustment_factors.map((factor, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#c2ff00] rounded-full mr-2"></div>
                    <span className="text-sm text-white">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'metrics' && (
          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-5 h-5 text-[#c2ff00] mr-2" />
              <h2 className="text-lg font-semibold text-white">Recovery Metrics</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white opacity-80">Sleep Debt</span>
                  <span className="text-lg font-bold text-[#c2ff00]">{data.recovery_metrics.sleep_debt}</span>
                </div>
                {renderProgressBar(8, 12)}
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white opacity-80">Fatigue Score</span>
                  <span className="text-lg font-bold text-[#c2ff00]">{data.recovery_metrics.fatigue_score}</span>
                </div>
                {renderProgressBar(data.recovery_metrics.fatigue_score, 100)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white opacity-80">Readiness Trend</span>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-[#c2ff00] mr-2">{data.recovery_metrics.readiness_trend}</span>
                  <ArrowDown className="w-4 h-4 text-red-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white opacity-80">Stress Level</span>
                <span className="text-lg font-bold text-[#c2ff00]">{data.recovery_metrics.stress_level}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'targets' && (
          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Heart className="w-5 h-5 text-[#c2ff00] mr-2" />
              <h2 className="text-lg font-semibold text-white">Recommended Targets</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Moon className="w-4 h-4 text-[#c2ff00] mr-2" />
                <div>
                  <div className="text-sm text-white opacity-80">Sleep Hours</div>
                  <div className="font-semibold text-white">{data.recommended_targets.sleep_hours}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Activity className="w-4 h-4 text-[#c2ff00] mr-2" />
                <div>
                  <div className="text-sm text-white opacity-80">HRV Baseline</div>
                  <div className="font-semibold text-white">{data.recommended_targets.hrv_baseline}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 text-[#c2ff00] mr-2" />
                <div>
                  <div className="text-sm text-white opacity-80">Resting HR</div>
                  <div className="font-semibold text-white">{data.recommended_targets.resting_hr}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-[#c2ff00] mr-2" />
                <div>
                  <div className="text-sm text-white opacity-80">Recovery Score</div>
                  <div className="font-semibold text-white">{data.recommended_targets.recovery_score}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RestDayDetails