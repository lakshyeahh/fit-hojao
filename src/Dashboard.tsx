'use client'

import { useState, useEffect } from 'react'
import {  Home, Calendar, Activity, User, ChevronRight } from 'lucide-react'
import { LineChart, Line } from 'recharts'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [dateRange, setDateRange] = useState<Date[]>([])

    useEffect(() => {
        const today = new Date()
        const dates = []
        for (let i = -3; i <= 3; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            dates.push(date)
        }
        setDateRange(dates)
    }, [])

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric'
        })
    }

    // Mock data for the injury risk chart
    const injuryRiskData = Array.from({ length: 7 }, (_, i) => ({
        time: i,
        value: 50 + Math.random() * 30
    }))

    // Mock data for upcoming games
    const upcomingGames = [
        { opponent: 'Thunderbolts', date: 'Mar 15', time: '15:00', risk: 65 },
        { opponent: 'Cyclones', date: 'Mar 22', time: '18:30', risk: 42 },
    ]

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
                <div className="flex justify-between items-start mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        <User className="w-5 h-5" />
                    </div>
                </div>

                {/* Date Range Display */}
                <div className="flex justify-between mb-6 bg-gray-900 rounded-2xl p-2">
                    {dateRange.map((date, index) => {
                        const isToday = date.toDateString() === currentDate.toDateString()
                        return (
                            <div
                                key={index}
                                className={`text-center p-2 rounded-xl ${isToday ? 'bg-[#c2ff00] text-black' : ''}`}
                            >
                                <p className="text-xs">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                <p className={`text-sm font-bold ${isToday ? 'text-black' : 'text-white'}`}>
                                    {date.getDate()}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Upcoming Games */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Games</h2>
                    {upcomingGames.map((game, index) => (
                        <div key={index} className="bg-gray-900 rounded-2xl p-4 mb-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-[#c2ff00]">{game.opponent}</p>
                                    <p className="text-sm text-gray-400">{game.date} at {game.time}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-400">Risk</p>
                                    <p className="font-medium text-[#c2ff00]">{game.risk}%</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Injury Risk Status */}
                <div className="bg-gray-900 rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-xl font-semibold">Injury Risk</h2>
                            <p className="text-[#c2ff00] text-sm">Moderate risk level</p>
                        </div>
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            <span className="text-sm text-gray-400">Last 7 days</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl font-bold text-[#c2ff00]">65%</div>
                        <button className="text-sm text-[#c2ff00] flex items-center">
                            <Link to={'/details'}>
                                View Details
                            </Link>
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                    <div className="h-32 w-full">
                        <LineChart width={280} height={128} data={injuryRiskData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#c2ff00"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-900 rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <Activity className="w-5 h-5 text-[#c2ff00]" />
                                <span className="text-xs text-gray-400">Today</span>
                            </div>
                            <p className="text-sm text-gray-400">Training Load</p>
                            <p className="text-xl font-bold">High</p>
                        </div>
                        <div className="bg-gray-900 rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <Calendar className="w-5 h-5 text-blue-400" />
                                <span className="text-xs text-gray-400">Recovery</span>
                            </div>
                            <p className="text-sm text-gray-400">Time Needed</p>
                            <p className="text-xl font-bold">48h</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-4 px-6">
                <button className="text-[#c2ff00]">
                    <Link to={'/dashboard'}>
                        <Home className="w-6 h-6" />
                    </Link>
                </button>

                <button className="text-gray-600">
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