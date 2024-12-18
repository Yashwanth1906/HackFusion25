import About from "@/components/About";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session=await getServerSession(authOptions);
    if(!session)
    {
      redirect("/api/auth/signin");
    }
    else
    {
        redirect('/register')
    }
}

