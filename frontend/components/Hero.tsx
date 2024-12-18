// 'use client'
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import CountDown from "./CountDown"
// import {BACKEND_URL} from "../config/cosntants"
// import { useEffect, useState } from "react"
// import { redirect } from "next/navigation"

// export default function Hero() {
//   const [isAuth,setAuth] = useState(true);
//   const googleAuth = async()=>{
//     window.open(`${BACKEND_URL}/api/users/signin`,"__self");
//   }
//   const auth = async()=>{
//     const response = await fetch(`${BACKEND_URL}/api/users/isauth`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials:'include',
//     });
//     if(response.ok){
//       setAuth(true);
//       const data = await response.json();
//       alert(data.user.name);
//     }
//   }
//   useEffect(()=>{
//     auth();
//   },[]);

//   return (
//     <section id="home" className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-600 to-purple-700 text-white"
//     style={{ backgroundImage: 'url(/new1.jpeg)', backgroundSize: 'cover', 
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat', }} 
//     >
//       <motion.h1
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5, delay: 0.5 }}
//         className="mt-4 font-sans text-6xl"
//       >
//         School Of Computing 
//       </motion.h1>
//       <motion.h1
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5, delay: 0.5 }}
//         className="mt-4 font-sans text-xl"
//       >
//         Presents 
//       </motion.h1>
//       <motion.h1
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-3xl font-sans mt-4 font-bold"
//       >
//         HackFusion 2025!
//       </motion.h1>
      
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5, delay: 0.5 }}
//         className="mt-4 font-sans text-xl"
//       >
//         Innovate. Create. Collaborate.
//       </motion.p>
      
//       <CountDown targetDate={"2025-01-01T10:00:00"} />
//       {isAuth && (<motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         className="mt-8 font-sans px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md"
//         onClick={()=>{redirect("/register")}}
//       >
//         Register Now
//       </motion.button>)}
//       {!isAuth && <motion.button
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md"
//       onClick={googleAuth}
//       >
//         Login With Google
//         </motion.button>}
      
//     </section>
//   )
// }
'use client'

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import CountDown from "./CountDown"
import { BACKEND_URL } from "../config/cosntants"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"

export default function Hero() {
  const [isAuth, setAuth] = useState(true)

  const googleAuth = async () => {
    window.open(`${BACKEND_URL}/api/users/signin`, "__self")
  }

  const auth = async () => {
    const response = await fetch(`${BACKEND_URL}/api/users/isauth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.ok) {
      setAuth(true)
      const data = await response.json()
      alert(data.user.name)
    }
  }

  useEffect(() => {
    auth()
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: 'url(/new1.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/80 to-purple-700/80" />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-sans text-white font-medium tracking-tight"
        >
          School Of Computing
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-4 text-xl sm:text-2xl text-white/90 font-sans"
        >
          Presents
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-4 text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-white"
        >
          HackFusion 2025!
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-4 text-lg sm:text-xl text-white/90 font-sans"
        >
          Innovate. Create. Collaborate.
        </motion.p>

        <div className="mt-8">
          <CountDown targetDate="2025-01-01T10:00:00" />
        </div>

        <div className="mt-8">
          {isAuth ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg 
                        hover:bg-blue-50 transition-colors text-lg"
              onClick={() => redirect("/register")}
            >
              Register Now
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg 
                        hover:bg-blue-50 transition-colors text-lg"
              onClick={googleAuth}
            >
              Login With Google
            </motion.button>
          )}
        </div>
      </div>
    </section>
  )
}

