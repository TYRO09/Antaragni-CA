"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { AtmosphericHaze } from "../lighting/AtmosphericHaze";
import { LightBeam } from "../lighting/LightBeam";
import { assets } from "@/lib/assets";

const easeOut = [0.25, 0.1, 0.25, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: custom * 0.2, 
      duration: 1.2, 
      ease: easeOut 
    }
  })
};

const fadeVariant = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1, 
    transition: { 
      delay: custom * 0.2, 
      duration: 2, 
      ease: easeOut 
    }
  })
};

export function FinalCtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <motion.section 
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black border-t border-white/5"
    >
      {/* Background & Atmospheric Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Core Atmosphere */}
        <motion.div custom={0} variants={fadeVariant}>
          <AtmosphericHaze color="warm" intensity="heavy" />
        </motion.div>
        
        {/* Cinematic Beams crossing behind the silhouette */}
        <motion.div custom={1} variants={fadeVariant}>
          <LightBeam color="crimson" angle={25} className="w-[150vw] h-[600px] -left-[20%] top-[20%]" />
          <LightBeam color="crimson" angle={-25} className="w-[150vw] h-[600px] -right-[20%] top-[20%]" />
        </motion.div>

        {/* Silhouette Image (3rd) */}
        <motion.div 
          custom={2}
          variants={fadeVariant}
          className="absolute inset-0 w-full h-full"
          style={{ y: parallaxY }}
        >
          {/* Overlays for dark cinematic grading */}
          <div className="absolute inset-0 bg-black/40 z-0 mix-blend-multiply" />
          
          <Image 
            src={assets.cta.silhouette} 
            alt="Silhouette"
            fill
            className="object-contain object-bottom opacity-90 z-10 grayscale contrast-125 brightness-75"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10 opacity-70 pointer-events-none" />
          
          {/* Film Grain */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-screen z-20 pointer-events-none" style={{ backgroundImage: `url(${assets.textures.filmGrain})` }} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-30 w-full flex flex-col h-full min-h-screen px-6 md:px-10 lg:px-20 py-24">
        
        {/* Center Headline Block */}
        <div className="flex flex-col items-center justify-center flex-grow text-center mt-16 md:mt-24 pointer-events-none">
          
          <motion.span 
            custom={3}
            variants={fadeUpVariant}
            className="text-accent text-[10px] md:text-xs tracking-[0.3em] font-medium uppercase mb-6 md:mb-8"
          >
            READY TO
          </motion.span>
          
          <motion.h2 
            custom={4}
            variants={fadeUpVariant}
            className="font-serif text-[clamp(48px,9vw,140px)] leading-[0.9] text-foreground flex flex-col drop-shadow-2xl"
          >
            <span>REPRESENT</span>
            <span>ANTARAGNI?</span>
          </motion.h2>
          
        </div>

        {/* Bottom Elements: Copy & CTA */}
        <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-12 md:gap-6 items-center md:items-end mt-24 md:mt-auto pb-8 md:pb-12">
          
          {/* Bottom Left Copy (5th) */}
          <motion.div 
            custom={5}
            variants={fadeUpVariant}
            className="col-span-1 flex flex-col text-center md:text-left text-[10px] md:text-xs tracking-[0.2em] leading-[2.2] uppercase text-muted order-2 md:order-1 w-full"
          >
            <span>THIS ISN&apos;T JUST A ROLE.</span>
            <span className="text-accent font-medium mt-1 drop-shadow-md">IT&apos;S YOUR STAGE.</span>
          </motion.div>

          {/* CTA Button (6th) */}
          <motion.div 
            custom={6}
            variants={fadeUpVariant}
            className="col-span-1 flex justify-center order-1 md:order-2 w-full mb-8 md:mb-0"
          >
            <button className="group relative border border-accent/40 bg-black/20 backdrop-blur-sm px-6 md:px-10 py-4 lg:px-14 lg:py-5 transition-all duration-500 ease-out hover:border-accent hover:bg-accent/20 active:scale-[0.98] min-w-0 max-w-full">
              <span className="relative z-10 text-white text-[10px] md:text-[11px] lg:text-xs tracking-[0.3em] font-medium uppercase">
                APPLY NOW
              </span>
            </button>
          </motion.div>

          {/* Bottom Right Copy (5th) */}
          <motion.div 
            custom={5}
            variants={fadeUpVariant}
            className="col-span-1 flex flex-col text-center md:text-right text-[10px] md:text-xs tracking-[0.2em] leading-[2.2] uppercase text-muted order-3 md:order-3 w-full"
          >
            <span>THE LEGACY</span>
            <span className="text-accent font-medium mt-1 drop-shadow-md">CONTINUES WITH YOU.</span>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
}
