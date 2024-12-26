'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CountDown from './CountDown';
import { useSession } from 'next-auth/react';
import {
  titleVariants,
  fadeInVariants,
  scaleUpVariants,
} from '../animations/textVariant';
import { staggerContainerVariants } from '../animations/containerVariant';
import { Spinner } from './Spinner';

export default function Hero() {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const handle = () => {
    if (!data) {
      router.push('/user/signin');
    } else {
      router.push('/user/home');
    }
  };

  return (
    <section
      id="home"
      className="h-screen flex flex-col items-center justify-center text-center  text-white"
    >
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <motion.h1
            variants={titleVariants}
            className="bg-gradient-to-r  from-blue-400 via-purple-400 to-pink-400 bg-300% animate-gradient py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            School Of Computing
          </motion.h1>
        </motion.div>

        <motion.h2
          custom={0.7}
          variants={fadeInVariants}
          className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mt-4 font-sans text-xl md:text-2xl"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
        >
          Presents
        </motion.h2>

        <motion.div
          variants={scaleUpVariants}
          whileHover={{ scale: 1.05 }}
          className="overflow-hidden"
        >
          <motion.h1
            animate={{
              backgroundPosition: ['0%', '100%'],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              },
            }}
            className="text-5xl md:text-7xl font-medium mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-300% animate-gradient"
          >
            HackFusion 2025!
          </motion.h1>
        </motion.div>

        <motion.p
          custom={1}
          variants={fadeInVariants}
          className="text-gray-300 mt-4 font-sans text-xl"
          whileHover={{
            scale: 1.05,
            color: '#ffffff',
            transition: { duration: 0.2 },
          }}
        >
          Innovate. Create. Collaborate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <CountDown targetDate={'2025-01-01T10:00:00'} />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.5,
            type: 'spring',
            stiffness: 400,
            damping: 10,
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
          }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-8 py-3 rounded-2xl shadow-lg shadow-purple-500/20 mt-8 font-sans text-white font-semibold"
          onClick={handle}
        >
          Register Now
        </motion.button>
      </motion.div>
    </section>
  );
}
