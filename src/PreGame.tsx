'use client'

import { useState } from 'react'
import { ChevronLeft, AlertCircle, Home, Calendar, Activity, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PreGameForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    position: '',
    sleepHours: '',
    hydrationLevel: '5',
    mealTime: '',
    injuries: '',
    mentalState: '5',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
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
          <h1 className="text-2xl font-bold">Pre-Game Check-In</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-400">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-400">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="height" className="block text-sm font-medium text-gray-400">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="position" className="block text-sm font-medium text-gray-400">Playing Position</label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
              required
            >
              <option value="">Select position</option>
              <option value="forward">Forward</option>
              <option value="midfielder">Midfielder</option>
              <option value="defender">Defender</option>
              <option value="goalkeeper">Goalkeeper</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="sleepHours" className="block text-sm font-medium text-gray-400">Hours of Sleep Last Night</label>
            <input
              type="number"
              id="sleepHours"
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="hydrationLevel" className="block text-sm font-medium text-gray-400">Hydration Level (1-10)</label>
            <input
              type="range"
              id="hydrationLevel"
              name="hydrationLevel"
              min="1"
              max="10"
              value={formData.hydrationLevel}
              onChange={handleInputChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="mealTime" className="block text-sm font-medium text-gray-400">Last Meal Time</label>
            <input
              type="time"
              id="mealTime"
              name="mealTime"
              value={formData.mealTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="injuries" className="block text-sm font-medium text-gray-400">Current Injuries or Discomfort</label>
            <textarea
              id="injuries"
              name="injuries"
              value={formData.injuries}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
              rows={3}
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="mentalState" className="block text-sm font-medium text-gray-400">Mental Readiness (1-10)</label>
            <input
              type="range"
              id="mentalState"
              name="mentalState"
              min="1"
              max="10"
              value={formData.mentalState}
              onChange={handleInputChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-yellow-400">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">All information is kept confidential and used for injury prevention only.</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#c2ff00] text-black font-semibold rounded-lg hover:bg-[#a6d600] transition duration-300"
          >
            Submit Pre-Game Check-In
          </button>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-4 px-6">
        <button className="text-gray-600">
        <Link to={'/dashboard'}>
          <Home className="w-6 h-6" />
          </Link>
        </button>
        
        <button className="text-[#c2ff00]">
            <Link to={'/pre-game'}>
          <Calendar className="w-6 h-6" />
          </Link>
        </button>
        <button className="text-gray-600">
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