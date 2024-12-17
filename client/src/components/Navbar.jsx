'use client';
import React, { useState, useEffect } from 'react';
import { Home, Info, Contact } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`
      fixed 
      top-0 
      left-0 
      right-0 
      z-50 
      flex 
      justify-between 
      items-center 
      px-4 
      py-2 
      transition-all 
      duration-300 
      ease-in-out
      ${isScrolled ? 'backdrop-blur-[8px] bg-white/30' : 'bg-transparent'}
    `}> 
      <div className="flex items-center">
        <img 
          src="/hackfusion_logo.png" 
          alt="Logo" 
          className="h-16 w-24"
        />
      </div>

      <div className="flex space-x-6">
        <button 
          onClick={() => scrollToSection('home')}
          className={`
            flex 
            items-center 
            space-x-2 
            hover:underline 
            transition
            ${isScrolled ? 'text-[#1E90FF]' : 'text-white'}
          `}
        >
          <Home size={20} />
          <span>Home</span>
        </button>
        <button 
          onClick={() => scrollToSection('about')}
          className={`
            flex 
            items-center 
            space-x-2 
            hover:underline 
            transition
            ${isScrolled ? 'text-[#1E90FF]' : 'text-white'}
          `}
        >
          <Info size={20} />
          <span>About</span>
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          className={`
            flex 
            items-center 
            space-x-2 
            hover:underline 
            transition
            ${isScrolled ? 'text-[#318beb]' : 'text-white'}
          `}
        >
          <Contact size={20} />
          <span>Contact</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;