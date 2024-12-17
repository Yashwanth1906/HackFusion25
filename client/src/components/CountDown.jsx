'use client'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

export default function CountDown({ targetDate }) {

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {

    const intereval = setInterval(() => {

      const now = new Date()
      const diff = new Date(targetDate) - now

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      } else {
        clearInterval(intereval)
      }
    }, 1000)

    return () => clearInterval(intereval)
  }, [targetDate])

  const timerAnimations = {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <div className="mt-4  text-4xl font-bold">
      <div className="flex space-x-3 justify-center">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit, index) => (
          <div key={unit} className="text-center mx-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={timeLeft[Object.keys(timeLeft)[index]]}
                variants={timerAnimations}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "linear" }}
                className="font-extrabold"
              >
                {timeLeft[Object.keys(timeLeft)[index]]}
              </motion.div>
            </AnimatePresence>
            <div className="text-center text-xl">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
