'use client'
import { motion } from "motion/react"
import CountDown from "./CountDown"

export default function Hero() {
  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-600 to-purple-700 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold"
      >
        Welcome to HackFusion 2025!
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="mt-4 text-xl"
      >
        Innovate. Create. Collaborate.
      </motion.p>
      
      <CountDown targetDate={"2025-01-01T10:00:00"} />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md"
      >
        Register Now
      </motion.button>
      
    </section>
  )
}
