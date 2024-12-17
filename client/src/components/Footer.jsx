// import React from 'react';

// const Footer = () => {
//   return (
//     <section className="py-16 px-8 bg-gray-400 text-white">
//       <div className="max-w-4xl mx-auto text-center">
//         <h2 className="text-4xl font-bold mb-4">
//           Join HackFusion-24!
//         </h2>
//         <p className="text-lg mb-6">
//           We encourage all students to seize this opportunity to innovate and showcase their talents. Let's code, collaborate, and create!
//         </p>
//         <div className="flex justify-center space-x-4">
//           <button 
//             className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
//           >
//             Register Now
//           </button>
//           <button 
//             className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Learn More
//           </button>
          
//         </div>
//       </div>
//        <div>
//         {/* Import dotLottie player script */}
//         <script
//           src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
//           type="module"
//         ></script>
//         <dotlottie-player
//           src="https://lottie.host/b16bfff1-7378-466a-9692-f3ed3ed529b5/KnNE15ZbS7.lottie"
//           background="transparent"
//           speed="1"
//           style={{ width: "300px", height: "300px" }} // React style object
//           loop
//           autoplay
//         ></dotlottie-player>
//       </div>
//     </section>
//   );
// };

// export default Footer;
import React from 'react';

const Footer = () => {
  return (
    <section className="relative  py-12 px-5 bg-gray-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Join HackFusion-25!
        </h2>
        <p className="text-lg mb-4">
          We encourage all students to seize this opportunity to innovate and 
        </p>
        <p className="text-lg mb-4">
        showcase their talents. Let's code, collaborate, and create!</p>
        <div className="flex justify-center space-x-4">
        <button className="px-6 py-3 text-lg font-medium text-green-400 bg-transparent border-2 border-green-400 rounded-lg cursor-pointer shadow-[0_0_10px_#00FF00,inset_0_0_5px_#00FF00] transition-all duration-300 hover:bg-green-400 hover:text-black hover:shadow-[0_0_20px_#00FF00]">
          Register Now
        </button>
        <button className="px-6 py-3 text-lg font-medium text-green-400 bg-transparent border-2 border-green-400 rounded-lg cursor-pointer shadow-[0_0_10px_#00FF00,inset_0_0_5px_#00FF00] transition-all duration-300 hover:bg-green-400 hover:text-black hover:shadow-[0_0_20px_#00FF00]">
          Learn More
        </button>

        </div>
      </div>
      
      {/* Lottie Player */}
      <div className="absolute bottom-0 right-0">
        {/* Import dotLottie player script */}
        <script
          src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
          type="module"
        ></script>
        <dotlottie-player
          src="https://lottie.host/b16bfff1-7378-466a-9692-f3ed3ed529b5/KnNE15ZbS7.lottie"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }} // Adjust size if needed
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </section>
  );
};

export default Footer;
