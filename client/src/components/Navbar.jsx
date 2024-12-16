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
          src="/logo1.png" 
          alt="Logo" 
          className="h-16 w-24"
        />
      </div>

      <div className="flex space-x-6">
        <a 
          href="#home" 
          className="flex items-center space-x-2 text-black hover:underline transition"
        >
          <Home size={20} />
          <span>Home</span>
        </a>
        <a 
          href="#about" 
          className="flex items-center space-x-2 text-black hover:underline transition"
        >
          <Info size={20} />
          <span>About</span>
        </a>
        <a 
          href="#contact" 
          className="flex items-center space-x-2 text-black hover:underline transition"
        >
          <Contact size={20} />
          <span>Contact</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;