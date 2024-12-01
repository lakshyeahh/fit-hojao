'use client'

import { useEffect, useState } from 'react'
import { Activity, Heart, Footprints, Scale, Moon, Timer, Flame, Route, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface HealthData {
  steps: number
  heartRate: {
    resting: number
    average: number
    history: Array<{ time: string; value: number }>
  }
  sleep?: {
    duration: number
    quality: number
    history: Array<{ date: string; duration: number; quality: number }>
  }
  weight?: number
  calories?: number
  distance?: number
  activeMinutes?: number
  weeklyActivity: Array<{ date: string; steps: number; calories: number; distance: number }>
}

// Mock data (unchanged)
const MOCK_HEALTH_DATA: Partial<HealthData> = {
  heartRate: {
    resting: 65,
    average: 75,
    history: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: Math.floor(65 + Math.random() * 20)
    }))
  },
  weeklyActivity: Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return {
      date: date.toLocaleDateString(),
      steps: Math.floor(6000 + Math.random() * 6000),
      calories: Math.floor(1800 + Math.random() * 800),
      distance: 3 + Math.random() * 4
    }
  }).reverse()
}

const HealthMetricCard = ({ 
  icon: Icon, 
  title, 
  value, 
  unit = '', 
  subValue = null,
  trend = null
}: { 
  icon: React.ElementType
  title: string
  value: number | string | null
  unit?: string
  subValue?: { label: string, value: string | number } | null
  trend?: { direction: 'up' | 'down', value: number } | null
}) => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
    <div className="flex items-center mb-4">
      <div className="p-3 bg-gray-700 rounded-full mr-4">
        <Icon className="w-6 h-6 text-[#c2ff00]" />
      </div>
      <span className="text-gray-300 font-semibold">{title}</span>
    </div>
    <div>
      {value !== null && value !== undefined ? (
        <>
          <p className="text-3xl font-bold text-white mb-2">
            {typeof value === 'number' ? value.toLocaleString() : value} <span className="text-lg text-gray-400">{unit}</span>
          </p>
          {subValue && (
            <p className="text-sm text-gray-400">
              {subValue.label}: <span className="text-gray-300">{subValue.value}</span>
            </p>
          )}
          {trend && (
            <div className={`flex items-center mt-2 ${trend.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trend.direction === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-sm font-semibold">{trend.value}%</span>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center text-yellow-500">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="text-sm font-semibold">No data available</span>
        </div>
      )}
    </div>
  </div>
)

const ChartCard = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg">
    <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
      <Icon className="w-6 h-6 text-[#c2ff00] mr-3" />
      {title}
    </h2>
    {children}
  </div>
)

export default function Analytics() {
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeChart, setActiveChart] = useState<'heartRate' | 'weeklyActivity'>('heartRate')

  const fetchGoogleFitData = async () => {
    try {
      console.log('Attempting to fetch Google Fit data...')
      const accessToken = localStorage.getItem('google_fit_token')
      console.log('Token retrieval:', { 
        hasToken: !!accessToken,
        tokenLength: accessToken?.length
      })

      if (!accessToken) {
        throw new Error('No Google Fit access token found')
      }

      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      console.log('Making API request to:', `${baseUrl}/api/googlefit/data`)
      
      const response = await fetch(`${baseUrl}/googlefit/data`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('API request failed:', errorData)
        throw new Error(errorData.error || 'Failed to fetch Google Fit data')
      }

      const apiData = await response.json()
      console.log('Successfully fetched data:', apiData)

      // Combine API data with mock data
      setHealthData({
        ...MOCK_HEALTH_DATA,
        steps: apiData.steps,
        heartRate: {
          resting: apiData.heartRate?.resting ?? MOCK_HEALTH_DATA.heartRate!.resting,
          average: apiData.heartRate?.average ?? MOCK_HEALTH_DATA.heartRate!.average,
          history: MOCK_HEALTH_DATA.heartRate!.history
        },
        calories: apiData.calories,
        distance: apiData.distance,
        activeMinutes: apiData.activeMinutes,
        weight: apiData.weight,
        weeklyActivity: MOCK_HEALTH_DATA.weeklyActivity!
      } as HealthData)
    } catch (err) {
      console.error('Error in fetchGoogleFitData:', err)
      setError('Failed to load health data')
      // Fallback to mock data in case of error
      setHealthData(MOCK_HEALTH_DATA as HealthData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGoogleFitData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="w-16 h-16 border-4 border-[#c2ff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4 text-lg">{error}</p>
          <button 
            onClick={fetchGoogleFitData}
            className="px-6 py-3 bg-[#c2ff00] text-black rounded-full font-semibold hover:bg-[#a6d600] transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!healthData) return null

  const metrics = [
    {
      icon: Activity,
      title: 'Steps',
      value: healthData.steps?.toString() || '0',
      unit: '',
      trend: { direction: 'up' as const, value: 5 }
    },
    {
      icon: Heart,
      title: 'Heart Rate',
      value: healthData.heartRate?.average?.toString() || '0',
      unit: 'bpm',
      subValue: healthData.heartRate ? {
        label: 'Resting',
        value: `${healthData.heartRate.resting} bpm`
      } : null,
      trend: { direction: 'down' as const, value: 2 }
    },
    {
      icon: Flame,
      title: 'Calories',
      value: Math.round(healthData.calories || 0),
      unit: 'kcal',
      trend: { direction: 'up' as const, value: 8 }
    },
    {
      icon: Route,
      title: 'Distance',
      value: healthData.distance,
      unit: 'km',
      trend: { direction: 'up' as const, value: 3 }
    },
    {
      icon: Timer,
      title: 'Active Time',
      value: healthData.activeMinutes,
      unit: 'min',
      trend: { direction: 'up' as const, value: 10 }
    },
    {
      icon: Moon,
      title: 'Sleep',
      value: healthData.sleep ? (healthData.sleep.duration / 3600).toFixed(1) : null,
      unit: 'h',
      subValue: healthData.sleep ? {
        label: 'Quality',
        value: `${healthData.sleep.quality}%`
      } : null,
      trend: healthData.sleep ? { direction: 'up' as const, value: 5 } : null
    },
    {
      icon: Scale,
      title: 'Weight',
      value: healthData.weight,
      unit: 'kg',
      trend: { direction: 'down' as const, value: 1 }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-12 text-center text-[#c2ff00]">Health Analytics</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map((metric, index) => (
          <HealthMetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Heart Rate Chart */}
        <ChartCard title="Heart Rate Today" icon={Heart}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData.heartRate.history}>
                <defs>
                  <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c2ff00" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#c2ff00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Area type="monotone" dataKey="value" stroke="#c2ff00" fillOpacity={1} fill="url(#heartRateGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Sleep Chart */}
        <ChartCard title="Sleep History" icon={Moon}>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <p className="text-lg mb-2">Sleep data not available from Google Fit</p>
              <p className="text-sm">Connect a sleep tracking device to see this data</p>
            </div>
          </div>
        </ChartCard>

        {/* Weekly Activity Chart */}
        <ChartCard title="Weekly Activity" icon={Activity}>
          <div className="flex justify-end mb-4">
            <select 
              className="bg-gray-800 text-white rounded-md p-2 text-sm"
              onChange={(e) => setActiveChart(e.target.value as 'heartRate' | 'weeklyActivity')}
              value={activeChart}
            >
              <option value="heartRate">Heart Rate</option>
              <option value="weeklyActivity">Weekly Activity</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === 'heartRate' ? (
                <LineChart data={healthData.heartRate.history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#c2ff00" strokeWidth={2} dot={false} />
                </LineChart>
              ) : (
                <LineChart data={healthData.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Line type="monotone" dataKey="steps" stroke="#c2ff00" strokeWidth={2} />
                  <Line type="monotone" dataKey="calories" stroke="#FF6B6B" strokeWidth={2} />
                  <Line type="monotone" dataKey="distance" stroke="#4ECDC4" strokeWidth={2} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Health Summary */}
      <ChartCard title="Health Summary" icon={Activity}>
        <div className="space-y-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Daily Step Goal (10,000)</span>
              <span className="text-[#c2ff00] font-semibold">
                {Math.min(100, Math.round((healthData.steps / 10000) * 100))}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-[#c2ff00] h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, Math.round((healthData.steps / 10000) * 100))}%` }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Active Minutes Goal (30)</span>
              <span className="text-[#c2ff00] font-semibold">
                {Math.min(100, Math.round(((healthData.activeMinutes || 0) / 30) * 100))}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-[#c2ff00] h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, Math.round(((healthData.activeMinutes || 0) / 30) * 100))}%` }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Sleep Quality</span>
              <span className="text-[#c2ff00] font-semibold">{healthData.sleep?.quality || 'N/A'}%</span>
            </div>
            {healthData.sleep && (
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-[#c2ff00] h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${healthData.sleep.quality}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </ChartCard>
    </div>
  )
}