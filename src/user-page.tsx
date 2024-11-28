'use client'

import { useState } from 'react'
import { ChevronLeft, User, Edit, Calendar, Dumbbell, Ruler, Weight, Trophy, Home, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserDetails() {
  const [user, setUser] = useState({
    name: 'Cristiano Ronaldo',
    age: 38,
    sport: 'Football',
    position: 'Forward',
    height: 187, // cm
    weight: 85, // kg
    achievements: [
      'League MVP 2023',
      'National Team Selection',
      '100 Professional Matches'
    ]
  })

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen pb-16 text-white">
      {/* Status Bar */}
      

      {/* Header */}
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button className="mr-4">
            <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
          </button>
          <h1 className="text-2xl font-bold">Athlete Profile</h1>
        </div>

        {/* Profile Picture and Name */}
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mr-4">
            <User className="w-12 h-12 text-[#c2ff00]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-400">{user.sport} - {user.position}</p>
          </div>
          <button className="ml-auto">
            <Edit className="w-5 h-5 text-[#c2ff00]" />
          </button>
        </div>

        {/* User Details */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-[#c2ff00] mr-2" />
                <div>
                  <p className="text-sm text-gray-400">Age</p>
                  <p className="font-semibold">{user.age} years</p>
                </div>
              </div>
              <div className="flex items-center">
                <Dumbbell className="w-5 h-5 text-[#c2ff00] mr-2" />
                <div>
                  <p className="text-sm text-gray-400">Sport</p>
                  <p className="font-semibold">{user.sport}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Ruler className="w-5 h-5 text-[#c2ff00] mr-2" />
                <div>
                  <p className="text-sm text-gray-400">Height</p>
                  <p className="font-semibold">{user.height} cm</p>
                </div>
              </div>
              <div className="flex items-center">
                <Weight className="w-5 h-5 text-[#c2ff00] mr-2" />
                <div>
                  <p className="text-sm text-gray-400">Weight</p>
                  <p className="font-semibold">{user.weight} kg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            <ul className="space-y-3">
              {user.achievements.map((achievement, index) => (
                <li key={index} className="flex items-center">
                  <Trophy className="w-5 h-5 text-[#c2ff00] mr-2" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Performance Summary */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Injury Risk</p>
                <p className="text-2xl font-bold text-[#c2ff00]">Low</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Fitness Level</p>
                <p className="text-2xl font-bold text-[#c2ff00]">High</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Recent Games</p>
                <p className="text-2xl font-bold text-[#c2ff00]">5</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg. Performance</p>
                <p className="text-2xl font-bold text-[#c2ff00]">8.5/10</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button className="w-full py-3 px-4 bg-[#c2ff00] text-black font-semibold rounded-lg hover:bg-[#a6d600] transition duration-300">
            View Detailed Stats
          </button>
          <button className="w-full py-3 px-4 bg-gray-800 text-[#c2ff00] font-semibold rounded-lg hover:bg-gray-700 transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>

    
    </div>
  )
}