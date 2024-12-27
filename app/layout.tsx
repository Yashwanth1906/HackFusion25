"use client";

// import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Providers } from "@/providers";
import React, { JSX } from "react";
import { Poppins } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Adjust weights as needed
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();

  return (
    <html lang="en" className={poppins.variable}>
      <Providers>
        <body>
          {pathname === "/" && <Navbar />}
          {children}
        </body>
      </Providers>
    </html>
  );
}
