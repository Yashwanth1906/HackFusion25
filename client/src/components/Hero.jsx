'use client'
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import CountDown from "./CountDown"
import {BACKEND_URL} from "../config/cosntants.js"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"

export default function Hero() {
  const [isAuth,setAuth] = useState(true);
  const googleAuth = async()=>{
    window.open(`${BACKEND_URL}/api/users/signin`,"__self");
  }
  const auth = async()=>{
    const response = await fetch(`${BACKEND_URL}/api/users/isauth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:'include',
    });
    if(response.ok){
      setAuth(true);
      const data = await response.json();
      alert(data.user.name);
    }
  }
  useEffect(()=>{
    auth();
  },[]);

  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-600 to-purple-700 text-white"
    style={{ backgroundImage: 'url(/bg4.jpeg)' }} 
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold"
      >
        School Of Computing Presents
      </motion.h1>
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
      {isAuth && (<motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md"
        onClick={()=>{redirect("/register")}}
      >
        Register Now
      </motion.button>)}
      {!isAuth && <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md"
      onClick={googleAuth}
      >
        Login With Google
        </motion.button>}
      
    </section>
  )
}