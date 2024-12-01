'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, Bluetooth, Watch, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

interface Device {
  id: string;
  name: string;
}

export default function SmartwatchLink() {
  const [isScanning, setIsScanning] = useState(false)
  const [devices, setDevices] = useState<Device[]>([])
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'failed'>('idle')

  // Simulated Bluetooth scanning
  const scanForDevices = () => {
    setIsScanning(true)
    // Simulated device discovery
    setTimeout(() => {
      setDevices([
        { id: '1', name: 'Athlete Watch Pro' },
        { id: '2', name: 'FitTracker 3000' },
        { id: '3', name: 'SportsBand X1' },
      ])
      setIsScanning(false)
    }, 3000)
  }

  // Simulated device connection
  const connectDevice = (device: Device) => {
    setSelectedDevice(device)
    setConnectionStatus('connecting')
    // Simulated connection process
    setTimeout(() => {
      setConnectionStatus(Math.random() > 0.2 ? 'connected' : 'failed')
    }, 2000)
  }

  useEffect(() => {
    scanForDevices()
  }, [])

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen pb-16 text-white">
      {/* Status Bar */}
      

      {/* Header */}
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button className="mr-4">
            <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
          </button>
          <h1 className="text-2xl font-bold">Link Your Smartwatch</h1>
        </div>

        {/* Instructional Text */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <Watch className="w-5 h-5 mr-2 text-[#c2ff00]" />
            How to Link Your Device
          </h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Ensure your smartwatch is turned on and Bluetooth is enabled.</li>
            <li>Place your smartwatch close to your phone.</li>
            <li>Select your device from the list below.</li>
            <li>Follow any additional prompts on your smartwatch if required.</li>
          </ol>
        </div>

        {/* Bluetooth Integration & Device List */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Bluetooth className="w-5 h-5 mr-2 text-[#c2ff00]" />
            Available Devices
          </h2>
          {isScanning ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-8 h-8 text-[#c2ff00] animate-spin" />
            </div>
          ) : devices.length > 0 ? (
            <ul className="space-y-3">
              {devices.map((device) => (
                <li key={device.id}>
                  <button
                    onClick={() => connectDevice(device)}
                    className="w-full text-left px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-150 ease-in-out flex justify-between items-center"
                  >
                    <span>{device.name}</span>
                    <Bluetooth className="w-5 h-5 text-[#c2ff00]" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center py-4">No devices found. Please try scanning again.</p>
          )}
        </div>

        {/* Scan/Rescan Button */}
        <button
          onClick={scanForDevices}
          className="w-full py-3 px-4 bg-gray-800 text-[#c2ff00] font-semibold rounded-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center mb-6"
        >
          {isScanning ? 'Scanning...' : 'Scan for Devices'}
          <RefreshCw className={`w-5 h-5 ml-2 ${isScanning ? 'animate-spin' : ''}`} />
        </button>

        {/* Connection Status */}
        {connectionStatus !== 'idle' && (
          <div className={`p-4 rounded-lg ${
            connectionStatus === 'connected' ? 'bg-green-900' : 
            connectionStatus === 'failed' ? 'bg-red-900' : 'bg-yellow-900'
          } mb-6`}>
            <div className="flex items-center">
              {connectionStatus === 'connected' && <CheckCircle className="w-6 h-6 text-green-400 mr-2" />}
              {connectionStatus === 'failed' && <XCircle className="w-6 h-6 text-red-400 mr-2" />}
              {connectionStatus === 'connecting' && <RefreshCw className="w-6 h-6 text-yellow-400 mr-2 animate-spin" />}
              <span className="font-semibold">
                {connectionStatus === 'connected' && 'Successfully connected to '}
                {connectionStatus === 'failed' && 'Failed to connect to '}
                {connectionStatus === 'connecting' && 'Connecting to '}
                {selectedDevice?.name}
              </span>
            </div>
            {connectionStatus === 'failed' && (
              <p className="mt-2 text-sm text-red-300">Please ensure your device is nearby and try again.</p>
            )}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-6 flex items-start text-sm text-gray-400">
          <Watch className="w-5 h-5 mr-2 text-[#c2ff00] flex-shrink-0 mt-1" />
          <p>
            Linking your smartwatch allows AthleteShield to access real-time data for more accurate performance tracking and insights.
          </p>
        </div>
      </div>
    </div>
  )
}