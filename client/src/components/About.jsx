// 'use client'
// import { motion } from "motion/react"

// export default function About() {
//   return (
//     <>
//       <section className="py-16 px-8 bg-gray-100">
//         <motion.div
//           initial={{ opacity: 0, x: 0 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.5, duration: 0.75, ease: "linear" }}
//           className="max-w-4xl mx-auto text-center"
//         >
//           <h2 className="text-4xl font-bold mb-4">What is HackFusion 2025?</h2>
//           <p className="text-lg text-gray-700">HackFusion-25 is a platform for innovation and teamwork. Challenge yourself, acquire new skills, and work with others to bring your ideas to life. Transform your ideas into reality and gain hands-on experience solving real-world problems.</p>
//         </motion.div>
//       </section>
//       <section className="py-16 px-8 bg-white text-gray-800">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//           className="max-w-4xl mx-auto"
//         >
//           <h2 className="text-4xl font-bold mb-6 text-center">Why Should You Participate?</h2>
//           <ul className="list-disc list-inside text-lg">
//             <li>Get hands-on experience with real-world problem-solving.</li>
//             <li>Collaborate with peers across departments.</li>
//             <li>Work under mentorship from industry experts.</li>
//             <li>Showcase your talent and innovative ideas.</li>
//           </ul>
//         </motion.div>
//       </section>
//     </>
//   )
// }
'use client'
import { motion } from "framer-motion"

export default function About() {
  // Animation variants for consistent scroll reveal
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Event Introduction */}
      <section className="py-16 px-8 bg-gradient-to-b from-blue-50 to-gray-100">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-blue-800">Greetings from Chennai Institute of Technology</h2>
          <p className="text-lg text-gray-700">
            We are thrilled to announce our upcoming hackathon, "HackFusion-25". A platform designed to transform your innovative ideas into reality.
          </p>
        </motion.div>
      </section>

      {/* Event Description */}
      <section className="py-16 px-8 bg-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-800">What is HackFusion-25?</h2>
          <div className="space-y-4 text-gray-700">
            <p>HackFusion-25 is a platform for innovation and teamwork. Here, you can challenge yourself, acquire new skills, and work with others to bring your ideas to life.</p>
            <p>Participation offers hands-on experience and exposure to solving real-world problems. It's a significant step in your academic journey, transforming ideas into reality and providing a unique learning experience.</p>
          </div>
        </motion.div>
      </section>

      {/* Event Structure */}
      <section className="py-16 px-8 bg-gray-100">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Event Structure</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">1</span>
                <div>
                  <h3 className="font-semibold text-blue-700">Round 1: Abstract Submission</h3>
                  <p className="text-gray-600">Fill in the form and submit your written abstract by 10 AM on 22nd February 2024.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">2</span>
                <div>
                  <h3 className="font-semibold text-green-700">Round 2: Presentation</h3>
                  <p className="text-gray-600">Shortlisted students will present their problem statement and innovative solution to an expert panel on 27th-28th February.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="bg-purple-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">3</span>
                <div>
                  <h3 className="font-semibold text-purple-700">Round 3: Campus Hackathon</h3>
                  <p className="text-gray-600">A 6-hour hackathon at our campus including mentoring sessions, expert evaluations, and result announcement.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Rules and Regulations */}
      <section className="py-16 px-8 bg-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Rules and Regulations</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <ul className="space-y-3 list-disc list-outside pl-5 text-gray-700">
              <li>Each team must consist of 5 members, with at least one female participant.</li>
              <li>The team leader is responsible for filling out the registration form and submitting the team's written abstract.</li>
              <li>Abstract submission deadline is 10:00 AM on 22nd February 2024.</li>
              <li>Teams can choose a problem statement from any provided domains.</li>
              <li>Shortlisted teams will present to a panel of expert judges.</li>
              <li>Inter-department team formations are encouraged.</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-8 bg-gray-400 text-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Join HackFusion-24!</h2>
          <p className="text-lg mb-6">We encourage all students to seize this opportunity to innovate and showcase their talents. Let's code, collaborate, and create!</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300">
              Register Now
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}