'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Building, BookOpenCheck, Globe, StarIcon } from 'lucide-react';

export default function About() {
  // Carousel state and logic
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Sample image placeholders - replace with actual image paths
  const images = [
    "/WhatsApp Image 2024-12-17 at 13.44.12_be07e14f.jpg",
    "/WhatsApp Image 2024-12-17 at 22.25.58_7b555a5b.jpg",
    "/WhatsApp Image 2024-12-17 at 13.45.20_408bf04b.jpg",
    "/WhatsApp Image 2024-12-17 at 13.45.37_67c70875.jpg",
    "/WhatsApp Image 2024-12-17 at 13.46.06_604df4df.jpg",
    "/WhatsApp Image 2024-12-17 at 13.46.52_4dfe6e17.jpg",
    "/WhatsApp Image 2024-12-17 at 13.47.23_a81b3222.jpg",
  ]

  useEffect(() => {
    // Auto-scroll interval
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      )
    }, 3000) // Change image every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [images.length])

  // Existing animation variants
  
  const scrollVariants = {
    //@ts-ignore
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

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
    <div id="about" className="font-sans ">
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.3 }}
        className="py-16 px-8 "
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="min-h-[80vh] b rounded-3xl shadow-lg overflow-hidden">
            <div className="container rounded-3xl bg-gray-300 mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6"
              >
                <motion.h1 
                  variants={itemVariants}
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                
                  Chennai Institute of Technology
                </motion.h1>

                <motion.div 
                  variants={itemVariants}
                  className="relative bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600"
                >
                  <p className="text-xl text-gray-700 leading-relaxed italic">
                    "HackFusion-25: Where Innovation Meets Opportunity"
                  </p>
                </motion.div>

               
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    { 
                      icon: Building, 
                      title: "Inclusive", 
                      description: "Open to all departments, embracing diverse perspectives" 
                    },
                    { 
                      icon: BookOpenCheck, 
                      title: "Three-Round Challenge", 
                      description: "Rigorous evaluation process for innovative solutions" 
                    },
                    { 
                      icon: Globe, 
                      title: "Real-World Impact", 
                      description: "Transform ideas into practical technological solutions" 
                    },
                    { 
                      icon: StarIcon, 
                      title: "Professional Growth", 
                      description: "Develop skills beyond traditional classroom learning" 
                    }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
                    >
                       <feature.icon className="w-10 h-10 text-violet-900 mb-3" />
                      <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-100">{feature.description}</p>
                    </motion.div>
                  ))}

                </motion.div>

               
              </motion.div>

              {/* Right Column - Carousel */}
              <motion.div 
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
  className="relative w-full h-[500px] overflow-visible rounded-xl"
>
  <AnimatePresence mode="wait">
    <motion.img
      key={currentImageIndex}
      src={images[currentImageIndex]}
      alt={`Hackathon image ${currentImageIndex + 1}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ 
        duration: 0.5,
        ease: "easeInOut"
      }}
      className="absolute inset-0 w-full h-full object-cover"
    />
  </AnimatePresence>

  {/* Navigation dots */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {images.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImageIndex(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          currentImageIndex === index 
            ? 'bg-blue-600 scale-125' 
            : 'bg-gray-300 hover:bg-blue-300'
        }`}
      />
    ))}
  </div>
</motion.div>

            </div>
          </div>

          <motion.section
  initial="offscreen"
  whileInView="onscreen"
  viewport={{ once: false, amount: 0.3 }}
  // className="py-8 px-4 md:py-16 md:px-8 "
  className='py-16 px md:py-16 md:px-2'
>
  <div className="rounded-3xl bg-gray-300 max-w-4xl mx-auto">
    <motion.h2
      custom={-1}
      variants={scrollVariants}
      className="text-3xl md:text-4xl pt-10 font-bold mb-6 text-blue-800 text-center"
    >
      What is HackFusion?
    </motion.h2>
    
    <motion.div
      custom={1}
      variants={scrollVariants}
      className=" p-6 md:p-8 rounded-xl shadow-md text-left"
    >
      
      <p className="text-lg text-gray-600 leading-relaxed">
        HackFusion-25 is an extraordinary platform designed to inspire innovation, teamwork, and creativity among students. It is an annual hackathon that brings together talented minds across departments, encouraging them to tackle real-world problems through groundbreaking ideas and solutions.
      </p>
      <p className="text-lg text-gray-600 leading-relaxed mt-4">
        Whether it's a software application, a hardware prototype, or a unique tech concept, HackFusion-25 offers participants a chance to transform their ideas into reality. This event isn't limited to any one field—it's open to all departments, embracing diversity in thought, skill, and innovation.
      </p>
    </motion.div>
  </div>
</motion.section>

        </div>
      </motion.section>

      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.3 }}
        // className="py-16 px-8 "
        className="py-2 px-8 "

      >
        <div className="rounded-3xl bg-gray-300 max-w-4xl mx-auto">
          <motion.h2
            custom={-1}
            variants={scrollVariants}
            className="text-3xl pt-10 text-center font-bold mb-6 text-blue-800"

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

          <div className=" p-6 rounded-lg shadow-md">
            {[
              {
                number: 1,
                color: 'green',
                title: 'Round 1: Abstract Submission',
                description: 'Fill in the form and submit your written abstract by 10 AM on 25th December 2024.'
              },
              {
                number: 2,
                color: 'green',
                title: 'Round 2: Presentation',
                description: 'Shortlisted students will present their problem statement and innovative solution to an expert panel on 6th-8th January.'
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

      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.3 }}
        className="py-16 px-8 "
      >
        <div className="rounded-3xl bg-gray-300 max-w-4xl mx-auto">
          <motion.h2
            custom={-1}
            variants={scrollVariants}
            className="text-3xl pt-10 text-center font-bold mb-6 text-blue-800"
          >
            Rules and Regulations
          </motion.h2>

          <motion.div
            custom={1}
            variants={scrollVariants}
            className=" p-8 rounded-xl shadow-md"
          >
            {[
              {
                number: 1,
                title: 'Team Composition',
                description: 'Teams must have 4-5 members, with at least one female participant.'
              },
              {
                number: 2,
                title: 'Registration',
                description: 'The team leader must handle the registration and abstract submission.'
              },
              {
                number: 3,
                title: 'Submission Deadline',
                description: 'Abstract submissions close at 10:00 AM on January 2025',
              },{
                number: 4,
                title: 'Problem Domain',
                description: 'Teams may choose problem statements from any provided domain.'
              },
              {
                number: 5,
                title: 'Selection Process',
                description: 'Shortlisted teams will move to the presentation and final hackathon rounds.'
              },
              {
                number: 6,
                title: 'Team Diversity',
                description: 'Inter-departmental teams are encouraged.'
              }
            ].map((rule, index) => (
              <motion.div
                key={rule.number}
                custom={index % 2 === 0 ? -1 : 1}
                variants={scrollVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false, amount: 0.3 }}
                className="flex items-start mb-4 last:mb-0"
              >
                <span className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                  {rule.number}
                </span>
                <div>
                  <h3 className="font-semibold text-blue-800">{rule.title}</h3>
                  <p className="text-gray-600">{rule.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits of HackFusion Section */}
      <motion.section
  initial="offscreen"
  whileInView="onscreen"
  viewport={{ once: false, amount: 0.3 }}
  className="py-8 px-4 md:py-16 md:px-8"
>
  <div className="rounded-3xl bg-gray-300 max-w-4xl mx-auto">
    <motion.h2
      custom={-1}
      variants={scrollVariants}
      className="text-2xl pt-10 md:text-3xl text-center font-bold mb-6 text-blue-800"
    >
      What does HackFusion do for Students?
    </motion.h2>

    <motion.div
      custom={1}
      variants={scrollVariants}
      className=" p-6 md:p-8 rounded-xl shadow-md"
    >
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        HackFusion-25 is a transformative experience that equips students to excel academically and professionally:
      </p>

      {[
        {
          title: 'Encourages Collaboration',
          description: 'Students form interdisciplinary teams, learn to share ideas, respect diverse perspectives, and achieve collective goals.'
        },
        {
          title: 'Ignites Innovation',
          description: 'By tackling challenging problems, students unlock their creativity and bring unique solutions to life.'
        },
        {
          title: 'Builds Confidence',
          description: 'Presenting solutions to expert panels helps students improve communication, overcome fear, and gain confidence in their abilities.'
        },
        {
          title: 'Bridges Academia and Industry',
          description: 'The structured format introduces students to industry practices such as brainstorming, project design, prototyping, and evaluation—skills critical for future endeavors.'
        },
        {
          title: 'Prepares Future Leaders',
          description: 'From team management to problem-solving, HackFusion trains students to lead projects, adapt to dynamic challenges, and excel under pressure.'
        },
        {
          title: 'Encourages Inclusivity and Diversity',
          description: 'By mandating interdisciplinary teams with gender inclusivity, HackFusion promotes equal opportunities for all students, fostering a culture of respect and collaboration.'
        }
      ].map((benefit, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="mb-4 p-4 bg-blue-50 rounded-lg"
        >
          <h3 className="font-bold text-blue-800 mb-2">{benefit.title}</h3>
          <p className="text-gray-700">{benefit.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</motion.section>
    </div>
  )
}