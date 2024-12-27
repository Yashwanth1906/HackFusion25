"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 w-full",
        className,
      )}
    >
      {/* Left Glow */}
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "30rem" }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }}
        className="absolute inset-y-0 right-1/2  h-40 sm:h-48 md:h-56 w-[10rem] bg-gradient-conic from-blue-600 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
      />

      {/* Right Glow */}
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "30rem" }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }}
        className="absolute inset-y-0 left-1/2 h-56 w-[30rem] bg-gradient-conic  [--conic-position:from_290deg_at_center_top]"
      />

      {/* Bottom Glow */}
      <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-blue-800 blur-2xl"></div>
      <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-purple-600 opacity-50 blur-3xl"></div>
      <motion.div
        initial={{ width: "8rem" }}
        whileInView={{ width: "16rem" }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-blue-500 blur-2xl"
      ></motion.div>

      {/* Content */}
      <div className="relative z-50 flex flex-col items-center justify-center px-6">
        {children}
      </div>
    </div>
  );
};
