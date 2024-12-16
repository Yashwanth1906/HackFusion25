import React from 'react';

const Footer = () => {
  return (
    <section className="py-16 px-8 bg-gray-400 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Join HackFusion-24!
        </h2>
        <p className="text-lg mb-6">
          We encourage all students to seize this opportunity to innovate and showcase their talents. Let's code, collaborate, and create!
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
          >
            Register Now
          </button>
          <button 
            className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Footer;