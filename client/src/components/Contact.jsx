'use client'
import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Send, 
  User, 
  Smile 
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div 
      id="contact" 
      className="flex items-center justify-center min-h-screen 
        bg-gradient-to-br bg-gray-100 p-4"
    >
      <div 
        className="flex w-full max-w-5xl bg-white shadow-2xl 
          rounded-3xl overflow-hidden border-2 border-green-100"
      >
        {/* Contact Form */}
        <div className="w-1/2 p-12 bg-white">
          <div className="mb-8 text-center">
            <h2 
              className="text-3xl font-bold mb-2 
                text-transparent bg-clip-text 
                bg-gradient-to-r from-green-500 to-emerald-600"
            >
              Get in Touch
            </h2>
            <p className="text-gray-500">We're eager to hear from you!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label 
                htmlFor="name" 
                className="absolute -top-2 left-3 bg-white 
                  px-1 text-sm text-gray-500"
              >
                Your Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <User className="ml-3 text-green-500" size={20} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-3 pl-2 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label 
                htmlFor="email" 
                className="absolute -top-2 left-3 bg-white 
                  px-1 text-sm text-gray-500"
              >
                Your Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Mail className="ml-3 text-green-500" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-3 pl-2 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label 
                htmlFor="message" 
                className="absolute -top-2 left-3 bg-white 
                  px-1 text-sm text-gray-500"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-3 border border-gray-300 
                  rounded-lg focus:outline-none focus:ring-2 
                  focus:ring-green-500 resize-none"
                placeholder="What would you like to discuss?"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 
                hover:from-green-600 hover:to-emerald-700 text-white 
                font-semibold py-3 px-4 rounded-lg transition duration-300 
                ease-in-out transform hover:scale-[1.02] flex 
                items-center justify-center space-x-2"
            >
              <Send size={20} />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div 
          className="w-1/2 bg-gradient-to-br from-green-500 to-emerald-600 
            text-white flex flex-col justify-center items-center p-12 
            text-center relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div 
            className="absolute inset-0 opacity-10 bg-pattern" 
            style={{
              backgroundImage: 'radial-gradient(white 8%, transparent 8%)',
              backgroundSize: '30px 30px'
            }}
          />

          <div className="relative z-10">
            <Smile size={80} className="mx-auto mb-6 text-white/90" />
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="text-white/80 mb-6">
              Feel free to reach out. We're here to help!
            </p>

            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-4">
                <Phone className="text-white" size={24} />
                <div>
                  <p className="font-semibold">Phone Numbers</p>
                  <p className="text-white/80">+91 93454 89016</p>
                  <p className="text-white/80">+91 86102 53720</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="text-white" size={24} />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-white/80">Kundrathur, Chennai</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="text-white" size={24} />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-white/80">contact@example.com</p>
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