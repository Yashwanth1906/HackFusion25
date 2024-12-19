'use client'
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import CountDown from "./CountDown"
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
    <section id="home" className="h-screen flex flex-col items-center justify-center text-center  text-white"
    // style={{ backgroundImage: 'url(/xx.jpeg)', backgroundSize: 'cover', 
    //   backgroundPosition: 'center',
    //   backgroundRepeat: 'no-repeat', }} 
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-7xl font-bold mt-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 "

      >
        School Of Computing 
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="font-bold  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mt-4 font-sans text-xl"

      >
        Presents 
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-7xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"

      >
        HackFusion 2025!
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-gray-300 mt-4 font-sans text-xl"

      >
        Innovate. Create. Collaborate.
      </motion.p>
      
      <CountDown targetDate={"2025-01-01T10:00:00"} />
       <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}

        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-8 py-2 rounded-2xl shadow-lg shadow-purple-500/20 mt-8 px-6 py-3 font-sans bg-white text-white font-semibold rounded-lg shadow-md"

        onClick={handle}

       
      >
        Register Now
      </motion.button>
    
      
    </section>
  )
}
