'use client'

import { useState } from 'react'
import { ChevronLeft, Activity, Clock, AlertTriangle, Heart, Moon, Brain, CheckCircle, Zap, Droplet, Dumbbell } from 'lucide-react'

export default function HealthStats() {
  const [activeTab, setActiveTab] = useState('overview')
  const [data] = useState({
    injury_probability: 65.5,
    risk_level: "High",
    health_status: {
      recovery_status: "Below Optimal",
      readiness_score: 72.5,
      risk_factors: [
        {
          factor: "Low HRV",
          severity: "High",
          impact: "High physiological stress"
        },
        {
          factor: "Insufficient Sleep",
          severity: "Medium",
          impact: "Reduced recovery capacity"
        }
      ]
    },
    risk_assessment: {
      probability_no_injury: 34.5,
      probability_injury: 65.5
    },
    recommendations: [
      {
        title: "Reduce Training Intensity",
        description: "Consider lowering the intensity of your workouts to allow for better recovery.",
        icon: Dumbbell,
        action: "Decrease workout intensity by 20-30% for the next 3-5 days."
      },
      {
        title: "Improve Sleep Quality",
        description: "Focus on enhancing your sleep patterns to boost recovery and performance.",
        icon: Moon,
        action: "Aim for 8-9 hours of sleep per night. Create a consistent sleep schedule and optimize your sleep environment."
      },
      {
        title: "Monitor HRV Trends",
        description: "Keep a close eye on your Heart Rate Variability to gauge your body's stress levels.",
        icon: Heart,
        action: "Track your morning HRV daily and look for any significant drops (>20%) as a sign to ease training."
      },
      {
        title: "Active Recovery Sessions",
        description: "Implement low-intensity activities to promote blood flow and recovery.",
        icon: Activity,
        action: "Include 20-30 minutes of light jogging, swimming, or cycling on rest days."
      }
    ],
    wearable_metrics: {
      resting_heart_rate: 62,
      hrv_trend: "Declining",
      sleep_quality: "Poor",
      recovery_score: 45,
      training_load: "High"
    }
  })

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen text-white p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="mr-4">
          <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
        </button>
        <h1 className="text-2xl font-bold text-white">Health Stats</h1>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
        {['overview', 'recommendations', 'details'].map((tab) => (
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
            {/* Injury Prediction Score */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Activity className="w-5 h-5 text-[#c2ff00] mr-2" />
                <h2 className="text-lg font-semibold text-white">Injury Prediction Score</h2>
              </div>
              <div className="flex justify-center items-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#4B5563"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#c2ff00"
                      strokeWidth="10"
                      strokeDasharray={`${data.injury_probability * 2.83} 283`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[#c2ff00]">{data.injury_probability}%</span>
                    <span className="text-sm text-white">Risk Level</span>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-white">Risk Level: <span className="text-[#c2ff00] font-bold">{data.risk_level}</span></p>
            </div>

            {/* Recovery Status */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-[#c2ff00] mr-2" />
                <h2 className="text-lg font-semibold text-white">Recovery Status</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-white opacity-80">Status</div>
                  <div className="text-xl font-bold text-[#c2ff00]">{data.health_status.recovery_status}</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-sm text-white opacity-80">Readiness</div>
                  <div className="text-xl font-bold text-[#c2ff00]">{data.health_status.readiness_score}%</div>
                </div>
              </div>
            </div>

            {/* Wearable Metrics */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-5 h-5 text-[#c2ff00] mr-2" />
                <h2 className="text-lg font-semibold text-white">Wearable Metrics</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-[#c2ff00] mr-2" />
                  <div>
                    <div className="text-sm text-white opacity-80">Heart Rate</div>
                    <div className="font-semibold text-white">{data.wearable_metrics.resting_heart_rate} bpm</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Brain className="w-4 h-4 text-[#c2ff00] mr-2" />
                  <div>
                    <div className="text-sm text-white opacity-80">HRV Trend</div>
                    <div className="font-semibold text-[#c2ff00]">{data.wearable_metrics.hrv_trend}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Moon className="w-4 h-4 text-[#c2ff00] mr-2" />
                  <div>
                    <div className="text-sm text-white opacity-80">Sleep Quality</div>
                    <div className="font-semibold text-[#c2ff00]">{data.wearable_metrics.sleep_quality}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 text-[#c2ff00] mr-2" />
                  <div>
                    <div className="text-sm text-white opacity-80">Recovery Score</div>
                    <div className="font-semibold text-white">{data.wearable_metrics.recovery_score}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-5 h-5 text-[#c2ff00] mr-2" />
                <h2 className="text-lg font-semibold text-white">Risk Factors</h2>
              </div>
              <div className="space-y-3">
                {data.health_status.risk_factors.map((factor, index) => (
                  <div key={index} className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">{factor.factor}</span>
                      <span className={`text-sm ${
                        factor.severity === 'High' ? 'text-[#c2ff00]' : 'text-white opacity-80'
                      }`}>
                        {factor.severity}
                      </span>
                    </div>
                    <p className="text-sm text-white opacity-80">{factor.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'recommendations' && (
          <>
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center mb-6">
                <Zap className="w-6 h-6 text-[#c2ff00] mr-2" />
                <h2 className="text-xl font-bold text-white">Action Plan</h2>
              </div>
              <div className="space-y-6">
                {data.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <recommendation.icon className="w-6 h-6 text-[#c2ff00] mr-2" />
                      <h3 className="text-lg font-semibold text-white">{recommendation.title}</h3>
                    </div>
                    <p className="text-sm text-white opacity-80 mb-3">{recommendation.description}</p>
                    <div className="bg-[#c2ff00] bg-opacity-20 p-3 rounded">
                      <p className="text-sm text-[#c2ff00] font-semibold">Action: {recommendation.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Droplet className="w-5 h-5 text-[#c2ff00] mr-2" />
                <h2 className="text-lg font-semibold text-white">Recovery Boost</h2>
              </div>
              <p className="text-sm text-white opacity-80 mb-4">
                Implementing these recommendations can potentially reduce your injury risk by up to 40% and improve your recovery score by 15-20 points.
              </p>
              <div className="bg-[#c2ff00] bg-opacity-20 p-4 rounded">
                <p className="text-sm text-[#c2ff00] font-semibold">
                  Pro Tip: Consistency is key. Stick to these recommendations for at least 2 weeks to see significant improvements in your performance and recovery metrics.
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'details' && (
          <div className="bg-gray-900/50 rounded-lg p-6">
            <p className="text-center text-white opacity-80">
              Detailed statistics and analysis will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}