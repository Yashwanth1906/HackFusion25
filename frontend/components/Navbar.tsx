// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Home, Info, Contact, Menu, X } from 'lucide-react';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const scrollToSection = (elementId) => {
//     const element = document.getElementById(elementId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className={`
//       fixed 
//       top-0 
//       left-0 
//       right-0 
//       z-50 
//       flex 
//       justify-between 
//       items-center 
//       px-4 
//       py-2 
//       transition-all 
//       duration-300 
//       ease-in-out
//       ${isScrolled ? 'backdrop-blur-[8px] bg-white/30' : 'bg-transparent'}
//     `}> 
//       <div className="flex items-center">
//         <img 
//           src="/hackfusion_logo.png" 
//           alt="Logo" 
//           className="h-16 w-24"
//         />
//       </div>

//       <div className="hidden md:flex space-x-6">
//         <button 
//           onClick={() => scrollToSection('home')}
//           className={`
//             flex 
//             items-center 
//             space-x-2 
//             hover:underline 
//             transition
//             ${isScrolled ? 'text-black' : 'text-white'}
//           `}
//         >
//           <Home size={20} />
//           <span>Home</span>
//         </button>
//         <button 
//           onClick={() => scrollToSection('about')}
//           className={`
//             flex 
//             items-center 
//             space-x-2 
//             hover:underline 
//             transition
//             ${isScrolled ? 'text-black' : 'text-white'}
//           `}
//         >
//           <Info size={20} />
//           <span>About</span>
//         </button>
//         <button 
//           onClick={() => scrollToSection('contact')}
//           className={`
//             flex 
//             items-center 
//             space-x-2 
//             hover:underline 
//             transition
//             ${isScrolled ? 'text-black' : 'text-white'}
//           `}
//         >
//           <Contact size={20} />
//           <span>Contact</span>
//         </button>
//       </div>

//       {/* Mobile Menu Toggle */}
//       <div className="md:hidden">
//         <button 
//           onClick={toggleMobileMenu}
//           className={`
//             z-50 
//             relative 
//             ${isScrolled ? 'text-black' : 'text-white'}
//           `}
//         >
//           {isMobileMenuOpen ? <X className='text-black' size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {isMobileMenuOpen && (
//         <div className="
//           md:hidden 
//           fixed 
//           inset-0 
//           bg-white 
//           flex 
//           flex-col 
//           items-center 
//           justify-center 
//           space-y-6 
//           z-40
//         ">
//           <button 
//             onClick={() => scrollToSection('home')}
//             className="flex items-center space-x-2 text-2xl"
//           >
//             <Home size={24} />
//             <span>Home</span>
//           </button>
//           <button 
//             onClick={() => scrollToSection('about')}
//             className="flex items-center space-x-2 text-2xl"
//           >
//             <Info size={24} />
//             <span>About</span>
//           </button>
//           <button 
//             onClick={() => scrollToSection('contact')}
//             className="flex items-center space-x-2 text-2xl"
//           >
//             <Contact size={24} />
//             <span>Contact</span>
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Home, Info, Contact, Menu, X } from 'lucide-react';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
//   //@ts-ignore
//   const scrollToSection = (elementId) => {
//     const element = document.getElementById(elementId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2 transition-all duration-300 ease-in-out ${
//         isScrolled ? 'backdrop-blur-[8px] bg-white/30' : 'bg-transparent'
//       }`}
//     >
//       {/* Logo and Mobile Menu Button */}
//       <div className="flex items-center justify-between md:w-auto">
//         <img
//           src="/cit1.png"
//           alt="Logo"
//           className="h-14 w-30 md:h-28 md:w-44"
//         />
//         <button
//           onClick={toggleMobileMenu}
//           className={`md:hidden ml-auto ${
//             isScrolled ? 'text-black' : 'text-white'
//           }`}
//         >
//           {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex justify-center items-center space-x-6">
//         <button
//           onClick={() => scrollToSection('home')}
//           className={`flex items-center space-x-2 hover:underline transition ${
//             isScrolled ? 'text-black' : 'text-blue-700'
//           }`}
//         >
//           <Home size={20} />
//           <span>Home</span>
//         </button>
//         <button
//           onClick={() => scrollToSection('about')}
//           className={`flex items-center space-x-2 hover:underline transition ${
//             isScrolled ? 'text-black' : 'text-blue-700'
//           }`}
//         >
//           <Info size={20} />
//           <span>About</span>
//         </button>
//         <button
//           onClick={() => scrollToSection('contact')}
//           className={`flex items-center space-x-2 hover:underline transition ${
//             isScrolled ? 'text-black' : 'text-blue-700'
//           }`}
//         >
//           <Contact size={20} />
//           <span>Contact</span>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 bg-white flex flex-col items-center justify-center space-y-4 z-40 p-4">
//           <button
//             onClick={() => scrollToSection('home')}
//             className="flex items-center space-x-2 text-lg"
//           >
//             <Home size={24} />
//             <span>Home</span>
//           </button>
//           <button
//             onClick={() => scrollToSection('about')}
//             className="flex items-center space-x-2 text-lg"
//           >
//             <Info size={24} />
//             <span>About</span>
//           </button>
//           <button
//             onClick={() => scrollToSection('contact')}
//             className="flex items-center space-x-2 text-lg"
//           >
//             <Contact size={24} />
//             <span>Contact</span>
//           </button>
//         </div>
//       )}
//       <div className="flex items-center justify-between md:w-auto">
//         <img
//           src="/hackfusion_logo.png"
//           alt="Logo"
//           className="h-12 w-16 md:h-16 md:w-16"
//         />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
'use client'

import { useState, useEffect } from 'react'
import { Home, Info, Mail, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left logo */}
          <div className="flex-shrink-0">
            <img
              src="/cit1.png"
              alt="CIT Logo"
              className="h-14 w-auto md:h-16"
            />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {[
                { name: 'Home', icon: Home, id: 'home' },
                { name: 'About', icon: Info, id: 'about' },
                { name: 'Contact', icon: Mail, id: 'contact' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      isScrolled
                        ? 'text-gray-900 hover:bg-gray-100'
                        : 'text-white hover:bg-white/10'
                    }
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right logo */}
          <div className="flex-shrink-0">
            <img
              src="/hackfusion_logo.png"
              alt="HackFusion Logo"
              className="h-12 w-auto md:h-14"
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md 
                ${
                  isScrolled
                    ? 'text-gray-900 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }
              `}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg shadow-lg">
              {[
                { name: 'Home', icon: Home, id: 'home' },
                { name: 'About', icon: Info, id: 'about' },
                { name: 'Contact', icon: Mail, id: 'contact' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

