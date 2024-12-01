'use client'

import { useState } from 'react'
import { ChevronLeft, Activity, Zap, BarChart, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RecoveryPage() {
  const [recoveryProgress, setRecoveryProgress] = useState(65)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('nutrition')

  const recommendedExercises = [
    { name: 'Light Jogging', duration: '15 mins', intensity: 'Low' },
    { name: 'Stretching', duration: '10 mins', intensity: 'Low' },
    { name: 'Ice Bath', duration: '5 mins', intensity: 'Medium' },
    { name: 'Foam Rolling', duration: '10 mins', intensity: 'Medium' },
  ]

  const toggleExerciseCompletion = (exerciseName: string) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseName) 
        ? prev.filter(name => name !== exerciseName)
        : [...prev, exerciseName]
    )
  }

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen text-white p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link to="/dashboard" className="mr-4">
          <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
        </Link>
        <h1 className="text-2xl font-bold">Recovery</h1>
      </div>

      {/* Recovery Progress */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold text-[#c2ff00] mb-2">Recovery Progress</h2>
        <p className="text-sm text-gray-400 mb-4">You're on your way to full recovery</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm font-medium">{recoveryProgress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-[#c2ff00] h-2.5 rounded-full" 
            style={{width: `${recoveryProgress}%`}}
          ></div>
        </div>
      </div>

      {/* Recovery Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Activity className="w-5 h-5 mr-2 text-[#c2ff00]" />
            <h3 className="text-lg font-bold">Heart Rate</h3>
          </div>
          <p className="text-2xl font-bold">68 <span className="text-sm font-normal">bpm</span></p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 mr-2 text-[#c2ff00]" />
            <h3 className="text-lg font-bold">Energy Level</h3>
          </div>
          <p className="text-2xl font-bold">85<span className="text-sm font-normal">%</span></p>
        </div>
      </div>

      {/* Recommended Exercises */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold text-[#c2ff00] mb-2">Recommended Exercises</h2>
        <p className="text-sm text-gray-400 mb-4">Complete these to boost your recovery</p>
        <ul className="space-y-4">
          {recommendedExercises.map((exercise, index) => (
            <li key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{exercise.name}</p>
                <p className="text-sm text-gray-400">{exercise.duration} • {exercise.intensity} Intensity</p>
              </div>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  completedExercises.includes(exercise.name)
                    ? 'bg-[#c2ff00] text-black'
                    : 'bg-transparent border border-[#c2ff00] text-[#c2ff00]'
                }`}
                onClick={() => toggleExerciseCompletion(exercise.name)}
              >
                {completedExercises.includes(exercise.name) ? (
                  <>
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Done
                  </>
                ) : (
                  'Mark Done'
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Recovery Tips */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold text-[#c2ff00] mb-4">Recovery Tips</h2>
        <div className="flex mb-4">
          {['nutrition', 'sleep', 'mental'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-sm font-medium ${
                activeTab === tab
                  ? 'bg-[#c2ff00] text-black'
                  : 'bg-gray-800 text-white'
              } rounded-md mr-2 last:mr-0`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div>
          {activeTab === 'nutrition' && (
            <ul className="list-disc list-inside space-y-2">
              <li>Increase protein intake for muscle repair</li>
              <li>Stay hydrated with electrolyte-rich fluids</li>
              <li>Consume anti-inflammatory foods like berries and leafy greens</li>
            </ul>
          )}
          {activeTab === 'sleep' && (
            <ul className="list-disc list-inside space-y-2">
              <li>Aim for 8-10 hours of sleep per night</li>
              <li>Maintain a consistent sleep schedule</li>
              <li>Create a cool, dark, and quiet sleeping environment</li>
            </ul>
          )}
          {activeTab === 'mental' && (
            <ul className="list-disc list-inside space-y-2">
              <li>Practice mindfulness or meditation for 10 minutes daily</li>
              <li>Engage in light, enjoyable activities to reduce stress</li>
              <li>Visualize successful performance and recovery</li>
            </ul>
          )}
        </div>
      </div>

      {/* Recovery Timeline */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <h2 className="text-xl font-bold text-[#c2ff00] mb-2">Recovery Timeline</h2>
        <p className="text-sm text-gray-400 mb-4">Estimated return to full activity</p>
        <div className="flex items-center space-x-4 mb-4">
          <BarChart className="w-6 h-6 text-[#c2ff00]" />
          <div className="flex-1">
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-2 bg-[#c2ff00] rounded-full"
                style={{ width: `${recoveryProgress}%` }}
              ></div>
            </div>
          </div>
          <span className="font-medium">3 days</span>
        </div>
        <p className="text-sm text-gray-400">
          Keep following your recovery plan to ensure a safe return to play.
        </p>
      </div>
    </div>
  )
}