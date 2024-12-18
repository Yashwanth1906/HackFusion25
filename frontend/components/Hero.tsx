'use client'
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import CountDown from "./CountDown"
import {BACKEND_URL} from "../config/cosntants"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { useSession } from "next-auth/react"

export default  function Hero() {
    const {data,status}=useSession()
    const router=useRouter();
      if(status==='loading')
      {
        return <div>loading..</div>
      }
      
    const handle=()=>{
      if(!data)
      {
        router.push("/user/signin")
      }
      else
      {
        router.push("/user/register")
      }
    }

  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-600 to-purple-700 text-white"
    style={{ backgroundImage: 'url(/bg4.jpeg)' }} 
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="mt-4 text-2xl"
      >
        School Of Computing Presents
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl mt-4 font-bold"
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
       (<motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md"
        onClick={handle}
      >
        Register Now
      </motion.button>)
    
      
    </section>
  )
}