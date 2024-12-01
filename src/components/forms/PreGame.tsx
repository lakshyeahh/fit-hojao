'use client'

import { useState } from 'react'
import { ChevronLeft, Clock, Activity, Zap } from 'lucide-react'

export default function GameAssessment() {
  const [activeForm, setActiveForm] = useState<'pre' | 'post'>('pre')
  const [formData, setFormData] = useState({
    PlayerDay: '',
    PlayerGame: '',
    Temperature: '',
    StadiumType: '',
    FieldType: '',
    Weather: '',
    Position: '',
    PositionGroup: '',
    RosterPosition: '',
    Hydration: 50,
    MentalReadiness: 50,
    // Post-game specific fields
    MinutesPlayed: 0,
    PlayType: '',
    Fatigue: 50,
    SprintCount: 0
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handlePositionSelect = (position: string) => {
    setFormData(prevState => ({
      ...prevState,
      Position: position,
      PositionGroup: getPositionGroup(position),
      RosterPosition: getRosterPosition(position)
    }))
  }

  const getPositionGroup = (position: string) => {
    const groups = {
      DEF: ['CB', 'FB', 'LB', 'RB'],
      MID: ['CM', 'CDM', 'CAM'],
      FWD: ['ST', 'LW', 'RW'],
      GK: ['GK']
    }
    for (const [group, positions] of Object.entries(groups)) {
      if (positions.includes(position)) return group
    }
    return ''
  }

  const getRosterPosition = (position: string) => {
    const rosterPositions = {
      Defender: ['CB', 'FB', 'LB', 'RB'],
      Midfielder: ['CM', 'CDM', 'CAM'],
      Forward: ['ST', 'LW', 'RW'],
      Goalkeeper: ['GK']
    }
    for (const [roster, positions] of Object.entries(rosterPositions)) {
      if (positions.includes(position)) return roster
    }
    return ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
  }

  const PositionSelector = () => (
    <div className="relative w-full h-96 bg-green-800 rounded-lg overflow-hidden mb-6">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Field markings */}
        <rect x="0" y="0" width="100" height="100" fill="#2f9e44" />
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="white" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="9.15" fill="none" stroke="white" strokeWidth="0.5" />
        <rect x="20" y="0" width="60" height="16.5" fill="none" stroke="white" strokeWidth="0.5" />
        <rect x="20" y="83.5" width="60" height="16.5" fill="none" stroke="white" strokeWidth="0.5" />

        {/* Position buttons */}
        <PositionButton x="50" y="10" position="ST" />
        <PositionButton x="20" y="30" position="LW" />
        <PositionButton x="80" y="30" position="RW" />
        <PositionButton x="35" y="40" position="CAM" />
        <PositionButton x="65" y="40" position="CAM" />
        <PositionButton x="50" y="50" position="CM" />
        <PositionButton x="35" y="60" position="CDM" />
        <PositionButton x="65" y="60" position="CDM" />
        <PositionButton x="20" y="70" position="LB" />
        <PositionButton x="40" y="75" position="CB" />
        <PositionButton x="60" y="75" position="CB" />
        <PositionButton x="80" y="70" position="RB" />
        <PositionButton x="50" y="90" position="GK" />
      </svg>
    </div>
  )

  const PositionButton = ({ x, y, position }: { x: string, y: string, position: string }) => (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={() => handlePositionSelect(position)}
      className="cursor-pointer"
    >
      <circle
        r="3"
        fill={formData.Position === position ? "#c2ff00" : "white"}
        stroke="#c2ff00"
        strokeWidth="0.5"
      />
      <text
        textAnchor="middle"
        dy="0.3em"
        fontSize="2.5"
        fill="black"
        fontWeight="bold"
      >
        {position}
      </text>
    </g>
  )

  const timeOptions = [
    { value: 15, label: '15 mins', description: 'Quick session' },
    { value: 30, label: '30 mins', description: 'Half session' },
    { value: 45, label: '45 mins', description: 'Extended session' },
    { value: 60, label: '60 mins', description: 'Full session' },
    { value: 90, label: '90 mins', description: 'Full match' },
    { value: 120, label: '120 mins', description: 'Extended match' }
  ]

  const PlayTypeSelector = () => {
    const playTypes = [
      { value: 'Shot', icon: '🥅' },
      { value: 'Cross', icon: '↗️' },
      { value: 'Corner', icon: '🚩' },
      { value: 'Free Kick', icon: '⚽' },
      { value: 'Goal Kick', icon: '🥅' },
      { value: 'Throw In', icon: '🤾' },
      { value: 'Tackle', icon: '👟' },
      { value: 'Penalty', icon: '🎯' }
    ]

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-400">Primary Play Type</label>
        <div className="grid grid-cols-4 gap-2">
          {playTypes.map((type) => (
            <button
              key={type.value}
              className={`p-2 rounded-lg flex flex-col items-center justify-center ${
                formData.PlayType === type.value ? 'bg-[#c2ff00] text-black' : 'bg-gray-800 text-white'
              }`}
              onClick={() => setFormData({ ...formData, PlayType: type.value })}
            >
              <span className="text-2xl mb-1">{type.icon}</span>
              <span className="text-xs">{type.value}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const FatigueSelector = () => {
    const fatigueLevels = ['Low', 'Medium', 'High']
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-400">Fatigue Level</label>
        <div className="flex justify-between items-center bg-gray-800 rounded-lg p-2">
          <Activity className="w-6 h-6 text-gray-400" />
          {fatigueLevels.map((level, index) => (
            <button
              key={level}
              className={`px-4 py-2 rounded-md ${
                formData.Fatigue === (index + 1) * 33 ? 'bg-[#c2ff00] text-black' : 'text-white'
              }`}
              onClick={() => setFormData({ ...formData, Fatigue: (index + 1) * 33 })}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const SprintCountSelector = () => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-400">Number of Sprints</label>
        <div className="flex items-center space-x-4">
          <Zap className="w-6 h-6 text-[#c2ff00]" />
          <input
            type="number"
            name="SprintCount"
            value={formData.SprintCount}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
            min="0"
            max="100"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen text-white">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button className="mr-4">
            <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
          </button>
          <h1 className="text-2xl font-bold">
            {activeForm === 'pre' ? 'Pre-Game' : 'Post-Game'} Assessment
          </h1>
        </div>

        <div className="flex border-b border-gray-800 mb-6 rounded-xl">
          <button 
            onClick={() => setActiveForm('pre')}
            className={`w-1/2 py-3 text-center rounded-xl ${activeForm === 'pre' ? 'bg-[#c2ff00] text-black' : 'bg-black text-gray-400'}`}
          >
            Pre-Game
          </button>
          <button 
            onClick={() => setActiveForm('post')}
            className={`w-1/2 py-3 text-center rounded-xl ${activeForm === 'post' ? 'bg-[#c2ff00] text-black' : 'bg-black text-gray-400'}`}
          >
            Post-Game
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Player Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#c2ff00]">Player Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="PlayerDay" className="block text-sm font-medium text-gray-400 mb-1">Days since last game</label>
                <input
                  type="number"
                  id="PlayerDay"
                  name="PlayerDay"
                  value={formData.PlayerDay}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                  required
                />
              </div>
              <div>
                <label htmlFor="PlayerGame" className="block text-sm font-medium text-gray-400 mb-1">Games this season</label>
                <input
                  type="number"
                  id="PlayerGame"
                  name="PlayerGame"
                  value={formData.PlayerGame}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Match Conditions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#c2ff00]">Match Conditions</h2>
            <div>
              <label htmlFor="Temperature" className="block text-sm font-medium text-gray-400 mb-1">Temperature (°F)</label>
              <input
                type="number"
                id="Temperature"
                name="Temperature"
                value={formData.Temperature}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              />
            </div>
            <div>
              <label htmlFor="StadiumType" className="block text-sm font-medium text-gray-400 mb-1">Stadium Type</label>
              <select
                id="StadiumType"
                name="StadiumType"
                value={formData.StadiumType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              >
                <option value="">Select Stadium Type</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Retractable Roof">Retractable Roof</option>
              </select>
            </div>
            <div>
              <label htmlFor="FieldType" className="block text-sm font-medium text-gray-400 mb-1">Field Type</label>
              <select
                id="FieldType"
                name="FieldType"
                value={formData.FieldType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              >
                <option value="">Select Field Type</option>
                <option value="Natural">Natural</option>
                <option value="Synthetic">Synthetic</option>
              </select>
            </div>
            <div>
              <label htmlFor="Weather" className="block text-sm font-medium text-gray-400 mb-1">Weather</label>
              <select
                id="Weather"
                name="Weather"
                value={formData.Weather}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
                required
              >
                <option value="">Select Weather</option>
                <option value="Clear">Clear</option>
                <option value="Cloudy">Cloudy</option>
                <option value="Indoor">Indoor</option>
                <option value="Rain">Rain</option>
                <option value="Snow">Snow</option>
              </select>
            </div>
          </div>

          {/* Player Position */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#c2ff00]">Player Position</h2>
            <PositionSelector />
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Selected Position</label>
              <input
                type="text"
                value={formData.Position}
                readOnly
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Position Group</label>
              <input
                type="text"
                value={formData.PositionGroup}
                readOnly
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Roster Position</label>
              <input
                type="text"
                value={formData.RosterPosition}
                readOnly
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c2ff00]"
              />
            </div>
          </div>

          {/* Pre-Game Specific: Hydration and Mental Readiness */}
          {activeForm === 'pre' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#c2ff00]">Player Condition</h2>
              <div>
                <label htmlFor="Hydration" className="block text-sm font-medium text-gray-400 mb-1">Hydration Level</label>
                <input
                  type="range"
                  id="Hydration"
                  name="Hydration"
                  min="0"
                  max="100"
                  value={formData.Hydration}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              <div>
                <label htmlFor="MentalReadiness" className="block text-sm font-medium text-gray-400 mb-1">Mental Readiness</label>
                <input
                  type="range"
                  id="MentalReadiness"
                  name="MentalReadiness"
                  min="0"
                  max="100"
                  value={formData.MentalReadiness}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          )}

          {/* Post-Game Specific Fields */}
          {activeForm === 'post' && (
            <>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#c2ff00]">Game Information</h2>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Minutes to be Played</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {timeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, MinutesPlayed: option.value })}
                        className={`p-4 rounded-xl flex flex-col items-center justify-center ${
                          formData.MinutesPlayed === option.value
                            ? 'bg-[#c2ff00] text-black'
                            : 'bg-gray-900 text-white'
                        }`}
                      >
                        <span className="text-lg font-bold">{option.label}</span>
                        <span className="text-sm mt-1 opacity-80">{option.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <PlayTypeSelector />
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#c2ff00]">Physical Status</h2>
                <FatigueSelector />
                <SprintCountSelector />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#c2ff00] text-black font-semibold rounded-lg hover:bg-[#a6d600] transition-colors"
          >
            Submit {activeForm === 'pre' ? 'Pre-Game' : 'Post-Game'} Assessment
          </button>
        </form>
      </div>
    </div>
  )
}