'use client';
import React, { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';

import { Phone, MapPin, Mail, Send, User, Smile } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div
      id="contact"
      className="flex font-sans items-center justify-center min-h-screen 
        p-4"
    >
      <div
        className="flex flex-col md:flex-row w-full max-w-5xl 
          bg-white shadow-2xl rounded-3xl overflow-hidden 
          border-2 border-blue-100"
      >
        {/* Contact Form */}
        <div className="w-full md:w-1/2 p-6 md:p-12 from-gray-900 via-blue-900 to-purple-900">
          <div className="mb-8 text-center">
            <h2
              className="text-2xl md:text-3xl font-bold mb-2 
                text-transparent bg-clip-text 
                bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900"
            >
              Get in Touch
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              We&apos;re eager to hear from you!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-2 left-3 bg-white 
                  px-1 text-xs md:text-sm text-violet-900"
              >
                Your Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <User className="ml-3 text-violet-900" size={20} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-2 py-2 md:px-3 md:py-3 pl-2 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    text-sm md:text-base"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="absolute -top-2 left-3 bg-white 
                  px-1 text-xs md:text-sm text-violet-900"
              >
                Your Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Mail className="ml-3 text-violet-900" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-2 py-2 md:px-3 md:py-3 pl-2 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    text-sm md:text-base"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="phone"
                className="absolute -top-2 left-3 bg-white 
                  px-1 text-xs md:text-sm text-violet-900"
              >
                Your Phone Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Phone className="ml-3 text-violet-900" size={20} />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-2 py-2 md:px-3 md:py-3 pl-2 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    text-sm md:text-base"
                  placeholder="+0123456789"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="message"
                className="absolute -top-2 left-3 bg-white 
                  px-1 text-xs md:text-sm text-violet-900"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-2 py-2 md:px-3 md:py-3 border border-gray-300 
                  rounded-lg focus:outline-none focus:ring-2 
                  focus:ring-blue-500 resize-none 
                  text-sm md:text-base"
                placeholder="What would you like to discuss?"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-b from-gray-900 to-purple-900
                hover:from-blue-600 hover:to-blue-700 text-white 
                font-semibold py-2 md:py-3 px-4 rounded-lg transition duration-300 
                ease-in-out transform hover:scale-[1.02] flex 
                items-center justify-center space-x-2 text-sm md:text-base"
            >
              <Send className="ml-3 text-white " size={16} />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div
          className="w-full md:w-1/2 bg-gradient-to-b from-gray-900  to-purple-900
          text-white flex flex-col justify-center items-center 
          p-6 md:p-12 text-center relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 opacity-10 bg-pattern"
            style={{
              backgroundImage: 'radial-gradient(white 8%, transparent 8%)',
              backgroundSize: '30px 30px',
            }}
          />

          <div className="relative z-10">
            <Smile size={60} className="mx-auto mb-4 md:mb-6 text-white/90" />
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
              Contact Information
            </h3>
            <p className="text-white/80 mb-4 md:mb-6 text-sm md:text-base">
              Feel free to reach out. We&apos;re here to help!
            </p>

            <div className="space-y-3 md:space-y-4 text-left w-full">
              <div className="flex items-center space-x-3 md:space-x-4">
                <Phone className="text-white" size={20} />
                <div>
                  <p className="font-semibold text-sm md:text-base">
                    Phone Numbers
                  </p>
                  <p className="text-white text-xs md:text-sm">
                    Staff Coordinators:
                  </p>
                  <p className="text-white/80 text-xs md:text-sm">
                    Bavani - +91 77083 77850
                  </p>
                  <p className="text-white text-xs md:text-sm ">
                    Student Coordinators:
                  </p>

                  <p className="text-white/80 text-xs md:text-sm">
                    Roopa - +91 86376 25516
                  </p>
                  <p className="text-white/80 text-xs md:text-sm">
                    Rishikesh - +91 86102 53720
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 md:space-x-4">
                <MapPin className="text-white" size={20} />
                <div>
                  <p className="font-semibold text-sm md:text-base">Location</p>
                  <p className="text-white/80 text-xs md:text-sm">
                    Kundrathur, Chennai
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 md:space-x-4">
                <Mail className="text-white" size={20} />
                <div>
                  <p className="font-semibold text-sm md:text-base">Email</p>
                  <p className="text-white/80 text-xs md:text-sm">
                    hackerz@citchennai.net
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
