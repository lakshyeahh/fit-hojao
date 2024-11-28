'use client'

import { useEffect, useState } from 'react';
import { Activity, Heart, Footprints, Scale, Moon, Timer, Flame, Route, AlertCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HealthData {
  steps: number;
  heartRate: {
    resting: number;
    average: number;
    history: Array<{ time: string; value: number }>;
  };
  sleep?: {
    duration: number;
    quality: number;
    history: Array<{ date: string; duration: number; quality: number }>;
  };
  weight?: number;
  calories?: number;
  distance?: number;
  activeMinutes?: number;
  weeklyActivity: Array<{ date: string; steps: number; calories: number; distance: number }>;
}

// Mock data
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
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toLocaleDateString(),
      steps: Math.floor(6000 + Math.random() * 6000),
      calories: Math.floor(1800 + Math.random() * 800),
      distance: 3 + Math.random() * 4
    };
  }).reverse()
};

const HealthMetricCard = ({ 
  icon: Icon, 
  title, 
  value, 
  unit = '', 
  subValue = null 
}: { 
  icon: any, 
  title: string, 
  value: any, 
  unit?: string,
  subValue?: { label: string, value: string | number } | null
}) => (
  <div className="bg-gray-900 p-4 rounded-xl">
    <div className="flex items-center mb-2">
      <Icon className="w-5 h-5 text-[#c2ff00] mr-2" />
      <span className="text-gray-400">{title}</span>
    </div>
    <div>
      {value !== null && value !== undefined ? (
        <>
          <p className="text-xl font-bold">
            {typeof value === 'number' ? value.toLocaleString() : value} {unit}
          </p>
          {subValue && (
            <p className="text-sm text-gray-400">
              {subValue.label}: {subValue.value}
            </p>
          )}
        </>
      ) : (
        <div className="flex items-center text-yellow-500">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span className="text-sm">No data</span>
        </div>
      )}
    </div>
  </div>
);

export default function Analytics() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoogleFitData = async () => {
    try {
      console.log('Attempting to fetch Google Fit data...');
      const accessToken = localStorage.getItem('google_fit_token');
      console.log('Token retrieval:', { 
        hasToken: !!accessToken,
        tokenLength: accessToken?.length
      });

      if (!accessToken) {
        throw new Error('No Google Fit access token found');
      }

      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      console.log('Making API request to:', `${baseUrl}/api/googlefit/data`);
      
      const response = await fetch(`${baseUrl}/api/googlefit/data`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API request failed:', errorData);
        throw new Error(errorData.error || 'Failed to fetch Google Fit data');
      }

      const apiData = await response.json();
      console.log('Successfully fetched data:', apiData);

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
      } as HealthData);
    } catch (err) {
      console.error('Error in fetchGoogleFitData:', err);
      setError('Failed to load health data');
      // Fallback to mock data in case of error
      setHealthData(MOCK_HEALTH_DATA as HealthData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleFitData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#c2ff00]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchGoogleFitData}
            className="px-4 py-2 bg-[#c2ff00] text-black rounded-lg hover:bg-[#a6d600]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!healthData) return null;

  const metrics = [
    {
      icon: Footprints,
      title: 'Daily Steps',
      value: healthData.steps,
      unit: ''
    },
    {
      icon: Heart,
      title: 'Heart Rate',
      value: healthData.heartRate.average,
      unit: 'bpm',
      subValue: {
        label: 'Resting',
        value: `${healthData.heartRate.resting} bpm`
      }
    },
    {
      icon: Flame,
      title: 'Calories',
      value: Math.round(healthData.calories || 0),
      unit: 'kcal'
    },
    {
      icon: Route,
      title: 'Distance',
      value: healthData.distance,
      unit: 'km'
    },
    {
      icon: Timer,
      title: 'Active Time',
      value: healthData.activeMinutes,
      unit: 'min'
    },
    {
      icon: Moon,
      title: 'Sleep',
      value: healthData.sleep ? (healthData.sleep.duration / 3600).toFixed(1) : null,
      unit: 'h',
      subValue: healthData.sleep ? {
        label: 'Quality',
        value: `${healthData.sleep.quality}%`
      } : null
    },
    {
      icon: Scale,
      title: 'Weight',
      value: healthData.weight,
      unit: 'kg'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-8">Health Analytics</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <HealthMetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Heart Rate Chart */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Heart className="w-6 h-6 text-[#c2ff00] mr-2" />
            Heart Rate Today
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData.heartRate.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Line type="monotone" dataKey="value" stroke="#c2ff00" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep Chart */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Moon className="w-6 h-6 text-[#c2ff00] mr-2" />
            Sleep History
          </h2>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p>Sleep data not available from Google Fit</p>
              <p className="text-sm">Connect a sleep tracking device to see this data</p>
            </div>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-gray-900 rounded-xl p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="w-6 h-6 text-[#c2ff00] mr-2" />
            Weekly Activity
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData.weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Line type="monotone" dataKey="steps" stroke="#c2ff00" strokeWidth={2} />
                <Line type="monotone" dataKey="calories" stroke="#FF6B6B" strokeWidth={2} />
                <Line type="monotone" dataKey="distance" stroke="#4ECDC4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Health Summary */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="w-6 h-6 text-[#c2ff00] mr-2" />
          Health Summary
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Daily Step Goal (10,000)</span>
            <div className="flex items-center">
              <span className="text-[#c2ff00]">
                {Math.min(100, Math.round((healthData.steps / 10000) * 100))}%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Active Minutes Goal (30)</span>
            <div className="flex items-center">
              <span className="text-[#c2ff00]">
                {Math.min(100, Math.round(((healthData.activeMinutes || 0) / 30) * 100))}%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Sleep Quality</span>
            <div className="flex items-center">
              <span className="text-[#c2ff00]">{healthData.sleep?.quality}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}