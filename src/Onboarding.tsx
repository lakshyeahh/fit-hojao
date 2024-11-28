'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

const slides = [
    {
        title: "Welcome to AthleteShield",
        description: "Your personal AI-powered sports performance assistant",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <path d="M100 10 L180 40 V100 C180 160 100 190 100 190 C100 190 20 160 20 100 V40 Z" fill="#39FF14" />
                <path d="M100 30 L160 55 V100 C160 145 100 170 100 170 C100 170 40 145 40 100 V55 Z" fill="black" />
                <path d="M100 50 L140 70 V100 C140 130 100 150 100 150 C100 150 60 130 60 100 V70 Z" fill="#39FF14" />
            </svg>
        )
    },
    {
        title: "Track Your Performance",
        description: "Connect your wearables and see real-time stats",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <circle cx="100" cy="100" r="90" fill="black" stroke="#FF00FF" strokeWidth="10" />
                <path d="M40 100 Q70 40, 100 100 T160 100" fill="none" stroke="#FF00FF" strokeWidth="6" />
                <circle cx="40" cy="100" r="5" fill="#FF00FF" />
                <circle cx="100" cy="100" r="5" fill="#FF00FF" />
                <circle cx="160" cy="100" r="5" fill="#FF00FF" />
            </svg>
        )
    },
    {
        title: "Personalized Insights",
        description: "Get AI-driven recommendations to improve your game",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <path d="M20 100 C20 40, 180 40, 180 100 C180 160, 20 160, 20 100" fill="#00FFFF" />
                <path d="M40 100 C40 60, 160 60, 160 100 C160 140, 40 140, 40 100" fill="black" />
                <circle cx="70" cy="90" r="15" fill="#00FFFF" />
                <circle cx="130" cy="90" r="15" fill="#00FFFF" />
                <path d="M70 130 Q100 150, 130 130" fill="none" stroke="#00FFFF" strokeWidth="6" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Injury Prevention",
        description: "Receive alerts and tips to stay in top form",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <path d="M100 10 L180 40 V100 C180 160 100 190 100 190 C100 190 20 160 20 100 V40 Z" fill="#FF3131" />
                <path d="M100 30 L160 55 V100 C160 145 100 170 100 170 C100 170 40 145 40 100 V55 Z" fill="black" />
                <path d="M60 100 H140 M100 60 V140" stroke="#FF3131" strokeWidth="10" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Team Collaboration",
        description: "Share progress and insights with your coach and teammates",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <circle cx="100" cy="100" r="90" fill="black" stroke="#FFA500" strokeWidth="10" />
                <circle cx="70" cy="80" r="25" fill="#FFA500" />
                <circle cx="130" cy="80" r="25" fill="#FFA500" />
                <circle cx="100" cy="140" r="25" fill="#FFA500" />
                <path d="M70 80 L130 80 M70 80 L100 140 M130 80 L100 140" stroke="black" strokeWidth="6" />
            </svg>
        )
    }
]

export default function OnboardingSlideshow() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const navigate = useNavigate()
    const { setOnboarded } = useAuth()

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
            }, 5000) // Change slide every 5 seconds
        }
        return () => clearInterval(timer)
    }, [isAutoPlaying])

    const goToNextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide((prevSlide) => prevSlide + 1)
            setIsAutoPlaying(false)
        }
    }

    const goToPrevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prevSlide) => prevSlide - 1)
            setIsAutoPlaying(false)
        }
    }

    const handleSkip = () => {
        setOnboarded(true)
        navigate('/dashboard')
    }

    const handleComplete = () => {
        setOnboarded(true)
        navigate('/dashboard')
    }

    const isLastSlide = currentSlide === slides.length - 1
    const isFirstSlide = currentSlide === 0

    return (
        <div className="max-w-md mx-auto bg-black min-h-screen text-white flex flex-col">
            {/* Skip Button */}
            <div className="absolute top-16 right-4">
                <button
                    onClick={handleSkip}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label="Skip onboarding"
                >
                    <X className="w-5 h-5 text-[#c2ff00]" />
                </button>
            </div>

            {/* Slideshow Content */}
            <div className="flex-grow flex flex-col justify-center items-center p-6">
                <div className="mb-8 w-64 h-64 p-8 bg-gray-900 rounded-2xl flex items-center justify-center">
                    {slides[currentSlide].image}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">{slides[currentSlide].title}</h2>
                <p className="text-gray-300 text-center mb-8">{slides[currentSlide].description}</p>

                {/* Navigation Dots */}
                <div className="flex justify-center space-x-2 mb-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index)
                                setIsAutoPlaying(false)
                            }}
                            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-[#c2ff00]' : 'bg-gray-600'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Get Started Button */}
                {isLastSlide && (
                    <button
                        onClick={handleComplete}
                        className="w-full max-w-xs mb-8 py-3 px-4 bg-[#c2ff00] text-black font-semibold rounded-lg hover:bg-[#a6d600] transition-colors animate-fade-in flex items-center justify-center"
                    >
                        Get Started
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                )}

                {/* Navigation Arrows */}
                <div className="flex justify-between w-full px-4">
                    {!isFirstSlide && (
                        <button
                            onClick={goToPrevSlide}
                            className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors ${
                                isLastSlide ? 'opacity-0 transition-opacity duration-500' : ''
                            }`}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
                        </button>
                    )}
                    {!isLastSlide && (
                        <button
                            onClick={goToNextSlide}
                            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors ml-auto"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6 text-[#c2ff00]" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}