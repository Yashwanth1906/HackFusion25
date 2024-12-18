

import About from "@/components/About";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default  function Home() {
  return(
    <>
    <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover opacity-10 pointer-events-none" />
     <div className=" bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900">
        <Hero />
        <About />
        <Contact />
        {/* <Footer /> */}
      </div>
      
    </>
    



  )
}
