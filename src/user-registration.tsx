'use client'

import { useState } from 'react'
import { User, Upload, ChevronRight, Info, Activity, Heart, Dumbbell } from 'lucide-react'
import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function UserRegistration() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    teamName: '',
    playerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    height: '',
    weight: '',
    age: '',
    bodyFatPercentage: '',
    restingHeartRate: '',
    vo2Max: '',
    benchPress: '',
  })
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setError('')
      setLoading(true)
      await signUp(formData.email, formData.password)
      navigate('/health-connect')
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen pb-16 text-white">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create Your Athlete Profile</h1>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-[#c2ff00]" />
              )}
            </div>
            <label htmlFor="profile-upload" className="cursor-pointer flex items-center text-[#c2ff00]">
              <Upload className="w-5 h-5 mr-2" />
              Upload Profile Picture
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Basic Info Fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-400 mb-1">Team Name</label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              />
            </div>
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-400 mb-1">Player Name</label>
              <input
                type="text"
                id="playerName"
                name="playerName"
                value={formData.playerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              />
            </div>
          </div>

          {/* Athlete Body Matrix */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-[#c2ff00]" />
              Athlete Body Matrix
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-400 mb-1">Height (cm)</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                  required
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-400 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                  required
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-400 mb-1">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                  required
                />
              </div>
              <div>
                <label htmlFor="bodyFatPercentage" className="block text-sm font-medium text-gray-400 mb-1">Body Fat %</label>
                <input
                  type="number"
                  id="bodyFatPercentage"
                  name="bodyFatPercentage"
                  value={formData.bodyFatPercentage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                  required
                />
              </div>
              <div>
                <label htmlFor="restingHeartRate" className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-[#c2ff00]" />
                  Resting Heart Rate
                </label>
                <input
                  type="number"
                  id="restingHeartRate"
                  name="restingHeartRate"
                  value={formData.restingHeartRate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                  required
                />
              </div>
              <div>
                <label htmlFor="vo2Max" className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
                 
                  VO2 Max
                </label>
                <input
                  type="number"
                  id="vo2Max"
                  name="vo2Max"
                  value={formData.vo2Max}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                  required
                />
              </div>
              <div>
                <label htmlFor="benchPress" className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
                  <Dumbbell className="w-4 h-4 mr-1 text-[#c2ff00]" />
                  Bench Press (kg)
                </label>
                <input
                  type="number"
                  id="benchPress"
                  name="benchPress"
                  value={formData.benchPress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-800 focus:ring-3 focus:ring-[#c2ff00]"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-300">I agree to the <a href="#" className="text-[#c2ff00] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#c2ff00] hover:underline">Privacy Policy</a></label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#c2ff00] text-black font-semibold rounded-lg hover:bg-[#a6d600] transition duration-300 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Athlete Profile'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-6 flex items-center text-sm text-gray-400">
          <Info className="w-5 h-5 mr-2 text-[#c2ff00]" />
          <p>Your data is securely stored and used to provide personalized insights and recommendations.</p>
        </div>
      </div>
    </div>
  )
}