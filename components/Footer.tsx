import React from "react";

const Footer = () => {
  return (
    <section className="relative font-sans py-8 md:py-12 px-4 md:px-5  ">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
          Join HackFusion-25!
        </h2>
        <div className="mb-4">
          <p className="text-sm md:text-lg mb-2">
            We encourage all students to seize this opportunity to innovate and
            showcase their talents. Let&lsquo;s code, collaborate, and create!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4 md:mb-0">
          <button
            className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg font-medium text-green-400 bg-transparent border-2 border-green-400 rounded-lg cursor-pointer 
            shadow-[0_0_10px_#00FF00,inset_0_0_5px_#00FF00] 
            transition-all duration-300 
            hover:bg-green-400 hover:text-black 
            hover:shadow-[0_0_20px_#00FF00]
            w-full sm:w-auto"
          >
            Register Now
          </button>
          <button
            className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg font-medium text-green-400 bg-transparent border-2 border-green-400 rounded-lg cursor-pointer 
            shadow-[0_0_10px_#00FF00,inset_0_0_5px_#00FF00] 
            transition-all duration-300 
            hover:bg-green-400 hover:text-black 
            hover:shadow-[0_0_20px_#00FF00]
            w-full sm:w-auto"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Footer;
