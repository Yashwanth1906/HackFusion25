"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Home, Info, Contact, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //@ts-expect-error: Suppressing type error for document.getElementById; elementId is assumed to exist in the DOM.
  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed font-sans top-0 left-0 right-0 z-50 flex justify-between items-center  transition-all duration-300 ease-in-out ${
        isScrolled ? "backdrop-blur-[8px] bg-white/20" : "bg-transparent"
      }`}
    >
      {/* Logo and Mobile Menu Button */}
      <div className="flex items-center justify-between md:w-auto">
        <Image
          src="/cit1.png"
          alt="Logo"
          width={80}
          height={80}
          className="p-2 h-14 w-30 md:h-24 md:w-44"
        />
        <button
          onClick={toggleMobileMenu}
          className={`md:hidden ml-auto ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center items-center space-x-20">
        <button
          onClick={() => scrollToSection("home")}
          className={`flex items-center space-x-2 hover:underline transition ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          <Home size={20} />
          <span>Home</span>
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className={`flex items-center space-x-2 hover:underline transition ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          <Info size={20} />
          <span>About</span>
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className={`flex items-center space-x-2 hover:underline transition ${
            isScrolled ? "text-black" : "text-white"
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
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-2 text-lg"
          >
            <Home size={24} />
            <span>Home</span>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="flex items-center space-x-2 text-lg"
          >
            <Info size={24} />
            <span>About</span>
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="flex items-center space-x-2 text-lg"
          >
            <Contact size={24} />
            <span>Contact</span>
          </button>
        </div>
      )}
      <div className="flex items-center justify-between md:w-auto">
        <Image
          src="/hackfusion_logo.png"
          alt="Logo"
          width={64}
          height={48}
          className="p-2 h-12 w-16 md:h-16 md:w-20"
        />
      </div>
    </nav>
  );
};

export default Navbar;
