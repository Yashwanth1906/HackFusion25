
// 'use client'
// import { motion } from "framer-motion"
// import { useEffect } from 'react'

// export default function About() {
//   // Animation variants for more dynamic scroll reveals
//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut"
//       }
//     }
//   };

//   const staggerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { 
//       opacity: 1, 
//       x: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const buttonVariants = {
//     hover: { 
//       scale: 1.05,
//       transition: { duration: 0.3 }
//     },
//     tap: { scale: 0.95 }
//   };

//   // Load Common Ninja script on component mount
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = "https://cdn.commoninja.com/sdk/latest/commonninja.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="bg-gray-50">
//       {/* Event Introduction */}
//       <section className="py-16 px-8 bg-gradient-to-b from-blue-50 to-gray-100">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           className="max-w-4xl mx-auto text-center"
//         >
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-4xl font-bold mb-4 text-blue-800"
//           >
//             Greetings from Chennai Institute of Technology
//           </motion.h2>
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="text-lg text-gray-700"
//           >
//             We are thrilled to announce our upcoming hackathon, "HackFusion-25". A platform designed to transform your innovative ideas into reality.
//           </motion.p>
//         </motion.div>
//       </section>

//       {/* Event Structure with Staggered Animations */}
//       <section className="py-16 px-8 bg-gray-100">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           className="max-w-4xl mx-auto"
//         >
         
//           <h2 className="text-3xl text-center font-bold mb-6 text-blue-800">Event Structure</h2>
//           <iframe src="https://widgets.commoninja.com/iframe/968e1bee-2abd-404a-b9cc-942607754248" width="100%" height="100%" frameBorder="0" scrolling="no"></iframe>
//           <motion.div 
//             variants={staggerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             className="bg-white p-6 rounded-lg shadow-md"
//           >
//             {[
//               {
//                 number: 1,
//                 color: 'blue',
//                 title: 'Round 1: Abstract Submission',
//                 description: 'Fill in the form and submit your written abstract by 10 AM on 22nd February 2024.'
//               },
//               {
//                 number: 2,
//                 color: 'green',
//                 title: 'Round 2: Presentation',
//                 description: 'Shortlisted students will present their problem statement and innovative solution to an expert panel on 27th-28th February.'
//               },
//               {
//                 number: 3,
//                 color: 'purple',
//                 title: 'Round 3: Campus Hackathon',
//                 description: 'A 6-hour hackathon at our campus including mentoring sessions, expert evaluations, and result announcement.'
//               }
//             ].map((round) => (
//               <motion.div 
//                 key={round.number}
//                 variants={itemVariants}
//                 className="flex items-start mb-4 last:mb-0"
//               >
//                 <span className={`bg-${round.color}-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0`}>
//                   {round.number}
//                 </span>
                
//                 <div>
//                   <h3 className={`font-semibold text-${round.color}-700`}>{round.title}</h3>
//                   <p className="text-gray-600">{round.description}</p>
//                 </div>
//               </motion.div>
              
//             ))}
//           </motion.div>
//         </motion.div>
//       </section>
      

//       {/* Call to Action with Animated Buttons */}
//       <section className="py-16 px-8 bg-gray-400 text-white">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           className="max-w-4xl mx-auto text-center"
//         >
//           <h2 className="text-4xl font-bold mb-4">Join HackFusion-24!</h2>
//           <p className="text-lg mb-6">We encourage all students to seize this opportunity to innovate and showcase their talents. Let's code, collaborate, and create!</p>
//           <div className="flex justify-center space-x-4">
//             <motion.button 
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
//             >
//               Register Now
//             </motion.button>
//             <motion.button 
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
//             >
//               Learn More
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Common Ninja Component Container */}
      
//  </div>
//   )
// }
'use client'
import { motion } from "framer-motion"
import { useEffect } from 'react'

export default function About() {
  // Consistent left-right scroll animation variants
  const scrollVariants = {
    offscreen: (direction) => ({
      x: direction < 0 ? -100 : 100,
      opacity: 0
    }),
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.01,
        duration: 0.9
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 4,
      transition: { duration: 0.7 }
    },
    tap: { scale: 0.95 }
  };

  // Load Common Ninja script on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.commoninja.com/sdk/latest/commonninja.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Event Introduction */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.3 }}
        className="py-16 px-8 bg-gradient-to-b from-blue-50 to-gray-100"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            custom={-1}
            variants={scrollVariants}
            className="text-4xl font-bold mb-4 text-blue-800"
          >
            Greetings from Chennai Institute of Technology
          </motion.h2>
          <motion.p 
            custom={1}
            variants={scrollVariants}
            className="text-lg text-gray-700"
          >
            We are thrilled to announce our upcoming hackathon, "HackFusion-25". A platform designed to transform your innovative ideas into reality.
          </motion.p>
        </div>
      </motion.section>

      {/* Event Structure */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.3 }}
        className="py-16 px-8 bg-gray-100"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            custom={-1}
            variants={scrollVariants}
            className="text-3xl text-center font-bold mb-6 text-blue-800"
          >
            Event Structure
          </motion.h2>
          
          <iframe 
            src="https://widgets.commoninja.com/iframe/968e1bee-2abd-404a-b9cc-942607754248" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no"
          ></iframe>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            {[
              {
                number: 1,
                color: 'blue',
                title: 'Round 1: Abstract Submission',
                description: 'Fill in the form and submit your written abstract by 10 AM on 22nd February 2024.'
              },
              {
                number: 2,
                color: 'green',
                title: 'Round 2: Presentation',
                description: 'Shortlisted students will present their problem statement and innovative solution to an expert panel on 27th-28th February.'
              },
              {
                number: 3,
                color: 'purple',
                title: 'Round 3: Campus Hackathon',
                description: 'A 6-hour hackathon at our campus including mentoring sessions, expert evaluations, and result announcement.'
              }
            ].map((round, index) => (
              <motion.div 
                key={round.number}
                custom={index % 2 === 0 ? -1 : 1}
                variants={scrollVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false, amount: 0.3 }}
                className="flex items-start mb-4 last:mb-0"
              >
                <span className={`bg-${round.color}-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0`}>
                  {round.number}
                </span>
                
                <div>
                  <h3 className={`font-semibold text-${round.color}-700`}>{round.title}</h3>
                  <p className="text-gray-600">{round.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.3 }}
        className="py-16 px-8 bg-gray-400 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            custom={-1}
            variants={scrollVariants}
            className="text-4xl font-bold mb-4"
          >
            Join HackFusion-24!
          </motion.h2>
          <motion.p 
            custom={1}
            variants={scrollVariants}
            className="text-lg mb-6"
          >
            We encourage all students to seize this opportunity to innovate and showcase their talents. Let's code, collaborate, and create!
          </motion.p>
          <div className="flex justify-center space-x-4">
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
            >
              Register Now
            </motion.button>
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}