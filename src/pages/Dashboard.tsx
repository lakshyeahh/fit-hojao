'use client'

import { useState, useEffect } from 'react'
import { Home, Calendar, Activity, User, ChevronRight, Zap, Droplet, Brain, Heart, Dumbbell, Flame, TrendingUp, AlertTriangle } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [dateRange, setDateRange] = useState<Date[]>([])
    const [greeting, setGreeting] = useState('')

    useEffect(() => {
        const today = new Date()
        const dates = []
        for (let i = -3; i <= 3; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            dates.push(date)
        }
        setDateRange(dates)

        const hour = today.getHours()
        if (hour < 12) setGreeting('Good morning')
        else if (hour < 18) setGreeting('Good afternoon')
        else setGreeting('Good evening')
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

    // Mock data for performance insights
    const performanceData = [
        { name: 'Speed', value: 85 },
        { name: 'Agility', value: 70 },
        { name: 'Strength', value: 90 },
        { name: 'Endurance', value: 75 },
    ]

    return (
        <div className="max-w-md mx-auto bg-black min-h-screen pb-16 text-white">
            {/* Status Bar */}
           

            {/* Header */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">{greeting}, CR7</h1>
                        <p className="text-gray-400">Let's check your performance</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                        <User className="w-6 h-6" />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <Link to="/pre-game" className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-1">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs text-center">Pre-Game Check</span>
                    </Link>
                    <Link to="/recovery" className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-1">
                            <Droplet className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs text-center">Recovery</span>
                    </Link>
                    <Link to="/training" className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center mb-1">
                            <Dumbbell className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs text-center">Training</span>
                    </Link>
                    <Link to="/activity" className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-1">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs text-center">Insights</span>
                    </Link>
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
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={injuryRiskData}>
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#c2ff00"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                            <span>High impact on ankle detected</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                            <span>Improved knee stability</span>
                        </div>
                    </div>
                </div>

                {/* Performance Insights */}
                <div className="bg-gray-900 rounded-2xl p-4 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Performance Insights</h2>
                    <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData}>
                                <XAxis dataKey="name" stroke="#ffffff" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                                <Bar dataKey="value" fill="#c2ff00" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                        Your strength has improved by 5% this week.
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-900 rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <Flame className="w-5 h-5 text-[#c2ff00]" />
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
                        <div className="bg-gray-900 rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <Heart className="w-5 h-5 text-red-400" />
                                <span className="text-xs text-gray-400">HRV</span>
                            </div>
                            <p className="text-sm text-gray-400">Latest Reading</p>
                            <p className="text-xl font-bold">65ms</p>
                        </div>
                        <div className="bg-gray-900 rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <Brain className="w-5 h-5 text-purple-400" />
                                <span className="text-xs text-gray-400">Readiness</span>
                            </div>
                            <p className="text-sm text-gray-400">Today's Score</p>
                            <p className="text-xl font-bold">82%</p>
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