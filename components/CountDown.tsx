"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CountDownProps {
  targetDate: string | Date;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function CountDown({ targetDate }: CountDownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = new Date(targetDate).getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timerAnimations = {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <div className="mt-4 text-4xl font-bold">
      <div className="flex space-x-3 justify-center">
        {(["days", "hours", "minutes", "seconds"] as (keyof TimeLeft)[]).map(
          (unit) => (
            <div key={unit} className="text-center mx-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={timeLeft[unit]}
                  variants={timerAnimations}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "linear" }}
                  className="font-extrabold"
                >
                  {timeLeft[unit]}
                </motion.div>
              </AnimatePresence>
              <div className="text-center font-sans text-xl">
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
