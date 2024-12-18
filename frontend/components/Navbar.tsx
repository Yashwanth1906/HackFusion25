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
'use client';
import React, { useState, useEffect } from 'react';
import { Home, Info, Contact, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //@ts-ignore
  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed font-sans top-0 left-0 right-0 z-50 flex justify-between items-center  transition-all duration-300 ease-in-out ${
        isScrolled ? 'backdrop-blur-[8px] bg-white/30' : 'bg-transparent'
      }`}
    >
      {/* Logo and Mobile Menu Button */}
      <div className="flex items-center justify-between md:w-auto">
        <img
          src="/cit1.png"
          alt="Logo"
          className="p-2 h-14 w-30 md:h-24 md:w-44"
        />
        <button
          onClick={toggleMobileMenu}
          className={`md:hidden ml-auto ${
            isScrolled ? 'text-black' : 'text-white'
          }`}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center items-center space-x-20">
        <button
          onClick={() => scrollToSection('home')}
          className={`flex items-center space-x-2 hover:underline transition ${
            isScrolled ? 'text-black' : 'text-white'
          }`}
        >
          <Home size={20} />
          <span>Home</span>
        </button>
        <button
          onClick={() => scrollToSection('about')}
          className={`flex items-center space-x-2 hover:underline transition ${
            isScrolled ? 'text-black' : 'text-white'
          }`}
        >
          <Info size={20} />
          <span>About</span>
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className={`flex items-center space-x-2 hover:underline transition ${
            isScrolled ? 'text-black' : 'text-white'
          }`}
        >
          <Contact size={20} />
          <span>Contact</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white flex flex-col items-center justify-center space-y-4 z-40 p-4">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 text-lg"
          >
            <Home size={24} />
            <span>Home</span>
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="flex items-center space-x-2 text-lg"
          >
            <Info size={24} />
            <span>About</span>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="flex items-center space-x-2 text-lg"
          >
            <Contact size={24} />
            <span>Contact</span>
          </button>
        </div>
      )}
      <div className="flex items-center justify-between md:w-auto">
        <img
          src="/hackfusion_logo.png"
          alt="Logo"
          className="p-2 h-12 w-16 md:h-16 md:w-20"
        />
      </div>
    </nav>
  );
};

export default Navbar;
