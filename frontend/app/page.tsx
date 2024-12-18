

import About from "@/components/About";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { signIn, signOut } from "next-auth/react";

export default  function Home() {
  return(
    <>
      <Hero />
      <About />
      <Contact />
      <Footer />
    </>
    



  )
}
