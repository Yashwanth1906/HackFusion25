'use client'
import { motion } from "framer-motion";
import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Meteors } from "@/components/acertinity/meteors"
import { AnimeatedButton } from "@/components/acertinity/button"
import { StarsBackground } from "@/components/acertinity/stars-background"
import { ShootingStars } from "@/components/acertinity/shooting-stars"
import { FaGoogle } from 'react-icons/fa'
import { AuroraBackground } from "@/components/acertinity/aurora-backgorund";
export default function Signin() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      ></motion.div>
    <div className="flex flex-col items-center justify-center min-h-screen w-full ">
      <ShootingStars />
      <StarsBackground />
      
      <div className="w-full max-w-md px-4 sm:px-0">
        <div className="relative shadow-xl bg-white border-4 border-blue-500 px-4 py-8 overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <h1 className="font-bold text-xl text-black mb-4 relative z-50 w-full text-center">
            HACK FUSION'25
          </h1>
          
          <h2 className="font-bold text-xl text-black w-full text-center">Join the ultimate coding experience!</h2>

          
          <div className="mt-8 w-full">
            <div className="py-8 px-4 sm:px-10">
              <div className="space-y-6">
                

                <AnimeatedButton />
                
              </div>
            </div>
          </div>
          
          <Meteors number={40} />
        </div>
      </div>
    </div>
    </AuroraBackground >
  )
}

