'use client'
import { motion } from "motion/react"

export default function About() {
  return (
    <>
      <section className="py-16 px-8 bg-gray-100">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.75, ease: "linear" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">What is HackFusion 2025?</h2>
          <p className="text-lg text-gray-700">HackFusion-25 is a platform for innovation and teamwork. Challenge yourself, acquire new skills, and work with others to bring your ideas to life. Transform your ideas into reality and gain hands-on experience solving real-world problems.</p>
        </motion.div>
      </section>
      <section className="py-16 px-8 bg-white text-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6 text-center">Why Should You Participate?</h2>
          <ul className="list-disc list-inside text-lg">
            <li>Get hands-on experience with real-world problem-solving.</li>
            <li>Collaborate with peers across departments.</li>
            <li>Work under mentorship from industry experts.</li>
            <li>Showcase your talent and innovative ideas.</li>
          </ul>
        </motion.div>
      </section>
    </>
  )
}
