'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
    {
        title: "Welcome to AthleteShield",
        description: "Your personal AI-powered sports performance assistant",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <motion.path
                    d="M100 10 L180 40 V100 C180 160 100 190 100 190 C100 190 20 160 20 100 V40 Z"
                    fill="#39FF14"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                    d="M100 30 L160 55 V100 C160 145 100 170 100 170 C100 170 40 145 40 100 V55 Z"
                    fill="black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                />
                <motion.path
                    d="M100 50 L140 70 V100 C140 130 100 150 100 150 C100 150 60 130 60 100 V70 Z"
                    fill="#39FF14"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
                />
            </svg>
        )
    },
    {
        title: "Track Your Performance",
        description: "Connect your wearables and see real-time stats",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <motion.circle
                    cx="100" cy="100" r="90"
                    fill="black" stroke="#FF00FF" strokeWidth="10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                    d="M40 100 Q70 40, 100 100 T160 100"
                    fill="none" stroke="#FF00FF" strokeWidth="6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                />
                <motion.circle cx="40" cy="100" r="5" fill="#FF00FF" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, duration: 0.3 }} />
                <motion.circle cx="100" cy="100" r="5" fill="#FF00FF" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2, duration: 0.3 }} />
                <motion.circle cx="160" cy="100" r="5" fill="#FF00FF" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.4, duration: 0.3 }} />
            </svg>
        )
    },
    {
        title: "Personalized Insights",
        description: "Get AI-driven recommendations to improve your game",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <motion.path
                    d="M20 100 C20 40, 180 40, 180 100 C180 160, 20 160, 20 100"
                    fill="#00FFFF"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                    d="M40 100 C40 60, 160 60, 160 100 C160 140, 40 140, 40 100"
                    fill="black"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                />
                <motion.circle cx="70" cy="90" r="15" fill="#00FFFF" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} />
                <motion.circle cx="130" cy="90" r="15" fill="#00FFFF" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 0.5 }} />
                <motion.path
                    d="M70 130 Q100 150, 130 130"
                    fill="none" stroke="#00FFFF" strokeWidth="6" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                />
            </svg>
        )
    },
    {
        title: "Injury Prevention",
        description: "Receive alerts and tips to stay in top form",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <motion.path
                    d="M100 10 L180 40 V100 C180 160 100 190 100 190 C100 190 20 160 20 100 V40 Z"
                    fill="#FF3131"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                    d="M100 30 L160 55 V100 C160 145 100 170 100 170 C100 170 40 145 40 100 V55 Z"
                    fill="black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                />
                <motion.path
                    d="M60 100 H140 M100 60 V140"
                    stroke="#FF3131" strokeWidth="10" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                />
            </svg>
        )
    },
    {
        title: "Team Collaboration",
        description: "Share progress and insights with your coach and teammates",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <motion.circle
                    cx="100" cy="100" r="90"
                    fill="black" stroke="#FFA500" strokeWidth="10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.circle cx="70" cy="80" r="25" fill="#FFA500" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 0.5 }} />
                <motion.circle cx="130" cy="80" r="25" fill="#FFA500" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, duration: 0.5 }} />
                <motion.circle cx="100" cy="140" r="25" fill="#FFA500" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4, duration: 0.5 }} />
                <motion.path
                    d="M70 80 L130 80 M70 80 L100 140 M130 80 L100 140"
                    stroke="black" strokeWidth="6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.6, duration: 1.5 }}
                />
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
            }, 8000) // Change slide every 8 seconds to allow for animations
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
        <div className="max-w-md mx-auto bg-gradient-to-b from-black to-gray-900 min-h-screen text-white flex flex-col">
            {/* Skip Button */}
            <motion.div
                className="absolute top-16 right-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <button
                    onClick={handleSkip}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label="Skip onboarding"
                >
                    <X className="w-5 h-5 text-[#c2ff00]" />
                </button>
            </motion.div>

            {/* Slideshow Content */}
            <div className="flex-grow flex flex-col justify-center items-center p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 w-64 h-64 p-8 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                        {slides[currentSlide].image}
                    </motion.div>
                </AnimatePresence>
                <motion.h2
                    className="text-3xl font-bold mb-4 text-center text-[#c2ff00]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {slides[currentSlide].title}
                </motion.h2>
                <motion.p
                    className="text-gray-300 text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {slides[currentSlide].description}
                </motion.p>

                {/* Navigation Dots */}
                <div className="flex justify-center space-x-2 mb-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index)
                                setIsAutoPlaying(false)
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide ? 'bg-[#c2ff00] w-6' : 'bg-gray-600'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Get Started Button */}
                {isLastSlide && (
                    <motion.button
                        onClick={handleComplete}
                        className="w-full max-w-xs mb-8 py-3 px-4 bg-[#c2ff00] text-black font-semibold rounded-lg hover:bg-[#a6d600] transition-colors flex items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        Get Started
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </motion.button>
                )}

                {/* Navigation Arrows */}
                <div className="flex justify-between w-full px-4">
                    <AnimatePresence>
                        {!isFirstSlide && (
                            <motion.button
                                onClick={goToPrevSlide}
                                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                                aria-label="Previous slide"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronLeft className="w-6 h-6 text-[#c2ff00]" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {!isLastSlide && (
                            <motion.button
                                onClick={goToNextSlide}
                                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors ml-auto"
                                aria-label="Next slide"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronRight className="w-6 h-6 text-[#c2ff00]" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}