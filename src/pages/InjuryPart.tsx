'use client'

import { useState } from 'react'
import { ChevronLeft, AlertTriangle, Zap, Activity, Footprints, Dumbbell, Moon, Shield, Clipboard, BarChart } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface PreventionCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
}

const PreventionCard = ({ title, items, icon: Icon }: PreventionCardProps) => (
  <div className="bg-gray-800 rounded-lg p-4 flex flex-col h-full">
    <div className="flex items-center mb-3">
      <Icon className="w-5 h-5 text-[#c2ff00] mr-2" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <ul className="list-none space-y-2 flex-grow">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <div className="w-2 h-2 bg-[#c2ff00] rounded-full mt-2 mr-2"></div>
          <span className="text-sm text-white">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const InjuryPart = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [data] = useState({
    predicted_injury_location: "Ankle",
    injury_risk_by_location: {
      Ankle: 45.5,
      Knee: 25.2,
      Foot: 15.8,
      Heel: 8.3,
      Toes: 5.2
    },
    highest_risk_area: "Ankle",
    biomechanical_factors: {
      movement_patterns: {
        area: "Ankle",
        concerns: ["High impact loading", "Reduced stability"]
      },
      fatigue_indicators: {
        local_muscle_fatigue: "Moderate",
        movement_quality: "Declining"
      }
    },
    recommendations: [
      "Focus on ankle stability exercises",
      "Monitor landing mechanics",
      "Regular mobility work",
      "Consider supportive equipment"
    ],
    preventive_measures: {
      equipment: [
        "Ankle supports",
        "Proper boot fitting",
        "Compression socks"
      ],
      exercises: [
        "Balance board work",
        "Ankle mobility drills",
        "Proprioception training"
      ],
      monitoring: [
        "Regular stability assessment",
        "Post-match ankle review"
      ]
    },
    health_correlations: {
      sleep_impact: "High correlation with ankle stability",
      fatigue_effect: "Increased risk when recovery score < 50",
      training_load: "Consider reducing high-impact activities"
    }
  })

  const renderBarChart = (data: Record<string, number>) => {
    const maxValue = Math.max(...Object.values(data))
    return (
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <div className="w-20 text-sm text-white">{key}</div>
            <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#c2ff00]"
                style={{ width: `${(value / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="w-12 text-right text-sm text-white">{value.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen text-white p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="mr-4">
          <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
        </button>
        <h1 className="text-2xl font-bold text-white">Injury Risk Assessment</h1>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
        {['overview', 'biomechanics', 'prevention'].map((tab) => (
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
            {/* Injury Risk Overview */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-[#c2ff00] mr-2" />
                  <h2 className="text-lg font-semibold text-white">Injury Risk Overview</h2>
                </div>
                <span className="text-[#c2ff00] font-bold">{data.predicted_injury_location}</span>
              </div>
              <p className="text-sm text-white mb-4">
                Highest risk area: <span className="text-[#c2ff00] font-bold">{data.highest_risk_area}</span>
              </p>
              {renderBarChart(data.injury_risk_by_location)}
            </div>

            {/* Recommendations */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Zap className="w-5 h-5 text-[#c2ff00] mr-2" />
                <h2 className="text-lg font-semibold text-white">Recommendations</h2>
              </div>
              <ul className="space-y-2">
                {data.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-[#c2ff00] rounded-full mt-2 mr-2"></div>
                    <span className="text-sm text-white">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === 'biomechanics' && (
          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-5 h-5 text-[#c2ff00] mr-2" />
              <h2 className="text-lg font-semibold text-white">Biomechanical Factors</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-semibold text-[#c2ff00] mb-2">Movement Patterns</h3>
                <p className="text-sm text-white mb-2">Area of concern: {data.biomechanical_factors.movement_patterns.area}</p>
                <ul className="list-disc list-inside text-sm text-white">
                  {data.biomechanical_factors.movement_patterns.concerns.map((concern, index) => (
                    <li key={index}>{concern}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-md font-semibold text-[#c2ff00] mb-2">Fatigue Indicators</h3>
                <p className="text-sm text-white">Local Muscle Fatigue: {data.biomechanical_factors.fatigue_indicators.local_muscle_fatigue}</p>
                <p className="text-sm text-white">Movement Quality: {data.biomechanical_factors.fatigue_indicators.movement_quality}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prevention' && (
          <>
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-[#c2ff00] mr-2" />
                <h2 className="text-lg font-semibold text-white">Preventive Measures</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PreventionCard title="Equipment" items={data.preventive_measures.equipment} icon={Footprints} />
                <PreventionCard title="Exercises" items={data.preventive_measures.exercises} icon={Dumbbell} />
                <PreventionCard title="Monitoring" items={data.preventive_measures.monitoring} icon={Clipboard} />
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <BarChart className="w-5 h-5 text-[#c2ff00] mr-2" />
                    <h3 className="text-md font-semibold text-white">Health Correlations</h3>
                  </div>
                  <ul className="list-none space-y-2">
                    <li className="text-sm text-white">
                      <span className="text-[#c2ff00]">Sleep:</span> {data.health_correlations.sleep_impact}
                    </li>
                    <li className="text-sm text-white">
                      <span className="text-[#c2ff00]">Fatigue:</span> {data.health_correlations.fatigue_effect}
                    </li>
                    <li className="text-sm text-white">
                      <span className="text-[#c2ff00]">Training:</span> {data.health_correlations.training_load}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default InjuryPart