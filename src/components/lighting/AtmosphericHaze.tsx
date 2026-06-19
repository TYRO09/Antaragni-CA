"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AtmosphericHazeProps {
  className?: string;
  intensity?: "light" | "dense" | "heavy";
  color?: "white" | "crimson" | "warm";
}

const colorMap = {
  white: ["from-white/20", "from-white/10"],
  crimson: ["from-accent/20", "from-accent/10"],
  warm: ["from-[#f5e6d3]/20", "from-[#f5e6d3]/10"], // very soft warm white
};

export function AtmosphericHaze({
  className,
  intensity = "dense",
  color = "white"
}: AtmosphericHazeProps) {
  
  const opacityClass = 
    intensity === "light" ? "opacity-30" : 
    intensity === "dense" ? "opacity-60" : "opacity-90";

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen z-0", opacityClass, className)}>
      {/* Primary vast diffusion */}
      <motion.div 
        initial={{ opacity: 0.8, scale: 1 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-transparent blur-[120px]",
          colorMap[color][0]
        )}
      />
      
      {/* Secondary core density */}
      <motion.div 
        initial={{ opacity: 0.5, y: 0 }}
        animate={{ opacity: 0.8, y: -20 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className={cn(
          "absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] to-transparent blur-[160px]",
          colorMap[color][1]
        )}
      />
    </div>
  );
}
