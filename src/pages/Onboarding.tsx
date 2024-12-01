'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
    {
        title: "Welcome to Guardian",
        description: "Your personal AI-powered sports performance assistant",
        image: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64">
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="200"
                    viewBox="0 0 512 512"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <motion.path
                        fill="#B1DD01"
                        d="M254.000000,513.000000 C169.353867,513.000000 85.207733,513.000000 1.030800,513.000000 C1.030800,342.395508 1.030800,171.791016 1.030800,1.093254 C171.562820,1.093254 342.125702,1.093254 512.844299,1.093254 C512.844299,171.666550 512.844299,342.333252 512.844299,513.000000 C426.790985,513.000000 340.645477,513.000000 254.000000,513.000000 M152.031067,316.016632 C145.995560,310.541779 140.024597,304.992462 133.870102,299.654785 C132.638290,298.586487 130.706985,298.324707 129.098221,297.691010 C128.503281,299.293274 127.419754,300.887390 127.392975,302.499084 C127.224098,312.659821 127.110641,322.829559 127.400223,332.984314 C127.475487,335.623749 128.400543,338.782227 130.073074,340.720520 C133.631409,344.844238 137.936478,348.323578 142.198380,352.583954 C142.776962,353.077515 143.355545,353.571075 144.223801,354.664001 C154.281540,365.744476 164.411621,376.760559 174.361725,387.936859 C178.384399,392.455322 179.543884,392.570251 182.795288,387.495697 C188.807358,378.112427 194.242004,368.303345 200.878143,359.386841 C216.955612,337.784668 233.495285,316.523041 250.092026,295.314606 C252.513885,292.219788 252.588882,290.477356 249.817398,287.877350 C245.580032,283.902161 241.636703,279.613586 237.222214,274.894348 C230.516296,266.482880 229.905502,266.315552 223.485413,274.430664 C208.126663,293.844513 192.948318,313.401306 177.742523,332.935669 C174.490433,337.113556 173.993820,337.129120 170.229523,333.328003 C167.317810,330.387756 164.149841,327.701294 160.782532,324.316711 C157.978806,321.738159 155.175079,319.159637 152.031067,316.016632"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <motion.path
                        fill="#090B01"
                        d="M275.464508,364.492920 C270.295441,371.461761 265.271362,378.093933 260.422150,384.851593..."
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    />
                    {/* Add other paths with similar animations */}
                </motion.svg>
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
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[#c2ff00] w-6' : 'bg-gray-600'
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