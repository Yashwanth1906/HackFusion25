"use client";
import { motion } from "framer-motion";

interface TimelineConnectorProps {
  isCompleted: boolean;
}

export function TimelineConnector({ isCompleted }: TimelineConnectorProps) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 h-full w-1">
      <motion.div
        className={`h-full w-full ${
          isCompleted ? "bg-blue-500" : "bg-gray-600"
        }`}
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </div>
  );
}
