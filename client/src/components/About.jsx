'use client'
import { motion } from "motion/react"
import { useEffect } from 'react'

export default function About() {
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
    <div id="about" className="bg-gray-50">
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
                color: 'green',
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
                color: 'green',
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
    </div>
  )
}
