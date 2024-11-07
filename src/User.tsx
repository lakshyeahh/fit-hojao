'use client'

import { ChevronLeft, Mail, Phone, Calendar, MapPin } from 'lucide-react'


export default function User() {
  // Mock data for the athlete
  const athlete = {
    name: 'John Doe',
    position: 'Midfielder',
    team: 'FC United',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dob: 'May 15, 1995',
    location: 'New York, USA',
    imageUrl: 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2024/03/09/17099790837619.jpg'
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
          <h1 className="text-2xl font-bold">Athlete Profile</h1>
        </div>

        {/* Athlete Image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48">
            <Image
              src={athlete.imageUrl}
              alt={athlete.name}
              fill // Correct usage of fill in Next.js Image component
              className="object-contain rounded-full"
            />
          </div>
        </div>

        {/* Athlete Info */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{athlete.name}</h2>
          <p className="text-[#c2ff00] text-lg mb-1">{athlete.position}</p>
          <p className="text-gray-400">{athlete.team}</p>
        </div>

        {/* Athlete Details */}
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-2xl p-4 flex items-center">
            <Mail className="w-6 h-6 mr-4 text-[#c2ff00]" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p>{athlete.email}</p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 flex items-center">
            <Phone className="w-6 h-6 mr-4 text-[#c2ff00]" />
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p>{athlete.phone}</p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 flex items-center">
            <Calendar className="w-6 h-6 mr-4 text-[#c2ff00]" />
            <div>
              <p className="text-sm text-gray-400">Date of Birth</p>
              <p>{athlete.dob}</p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 flex items-center">
            <MapPin className="w-6 h-6 mr-4 text-[#c2ff00]" />
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p>{athlete.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
