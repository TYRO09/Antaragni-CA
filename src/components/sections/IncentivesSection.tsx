"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EditorialHeading } from "../ui/EditorialHeading";
import { fadeUp, scrollReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { assets } from "@/lib/assets";

export function IncentivesSection() {
  return (
    <section id="incentives" className="relative w-full flex flex-col pt-16 md:pt-24 pb-12 overflow-hidden border-t border-white/5 bg-[#050505]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[#050505] -z-10" />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Typography Header Block */}
        <div className="flex flex-col items-start mb-6 md:mb-12 relative z-10">
          <EditorialHeading variant="section" className="text-foreground mb-4 md:mb-6">
            INCENTIVES
          </EditorialHeading>
          
          <div className="flex flex-col gap-1 text-accent tracking-[0.2em] text-[13px] md:text-[15px] font-medium">
            <span>RECOGNITION.</span>
            <span>EXPERIENCE.</span>
            <span>GROWTH.</span>
            <span>LEGACY.</span>
          </div>
        </div>

        {/* The Exhibition Showcase (Perfect Absolute Compositing) */}
        <div className="relative w-full mt-4 md:mt-8 mb-24 md:mb-40 max-w-[1200px] mx-auto">
          
          {/* Base Pedestals - Drives the responsive height of the entire showcase */}
          <div className="w-full opacity-[0.9] brightness-[0.8] z-0">
             <Image src={assets.incentives.pedestals} alt="Exhibition Platforms" width={1536} height={1024} className="w-full h-auto drop-shadow-2xl" priority />
          </div>

          {/* Absolute 3D Overlay - Maps exactly to the 4 pedestal blocks in the image */}
          <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
            
            {/* 01: Certificate */}
            <motion.div variants={fadeUp} className="absolute w-[24%] md:w-[18%] left-[21%] bottom-[43%] md:bottom-[41%] -translate-x-1/2 flex flex-col items-center group pointer-events-auto">
              
              {/* Fixed Floor Shadow */}
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[55%] h-[4px] bg-black/95 blur-[2px] rounded-[100%] z-0" />
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[30%] h-[1px] bg-black blur-[0.5px] rounded-[100%] z-0" />

              {/* Translating Image */}
              <div className="w-full relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                 <Image 
                   src={assets.incentives.certificate} 
                   alt="Certificate" 
                   width={1024} height={1536} 
                   className="w-full h-auto scale-[0.95] md:scale-[1.0] origin-bottom translate-y-[1%] md:translate-y-[0%] translate-x-[1%]" 
                   priority 
                 />
              </div>

              {/* Museum Placard on Pedestal Face */}
              <div className="absolute top-[100%] mt-8 md:mt-14 flex flex-col items-center text-center w-[150%] z-20">
                <span className="text-accent font-serif text-[20px] md:text-[26px] mb-1 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">01</span>
                <span className="text-white/70 tracking-[0.15em] text-[8px] md:text-[9px] leading-[1.6] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">CERTIFICATE<br/>OF APPRECIATION</span>
              </div>
            </motion.div>

            {/* 02: Pronite Pass */}
            <motion.div variants={fadeUp} className="absolute w-[18%] md:w-[13%] left-[41%] bottom-[43%] md:bottom-[41%] -translate-x-1/2 flex flex-col items-center group pointer-events-auto z-10">
              
              {/* Fixed Floor Shadow */}
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[45%] h-[3px] bg-black/95 blur-[1.5px] rounded-[100%] z-0" />
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[20%] h-[1px] bg-black blur-[0.5px] rounded-[100%] z-0" />

              {/* Translating Image */}
              <div className="w-full relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                 <Image 
                   src={assets.incentives.pass} 
                   alt="Pronite Pass" 
                   width={1024} height={1536} 
                   // Pulled down heavily to ground the transparent card base
                   className="w-full h-auto scale-[1.4] md:scale-[1.5] origin-bottom translate-y-[26%] md:translate-y-[28%] translate-x-[-1%]" 
                   priority 
                 />
              </div>

              {/* Museum Placard on Pedestal Face */}
              <div className="absolute top-[100%] mt-8 md:mt-14 flex flex-col items-center text-center w-[150%] z-20">
                <span className="text-accent font-serif text-[20px] md:text-[26px] mb-1 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">02</span>
                <span className="text-white/70 tracking-[0.15em] text-[8px] md:text-[9px] leading-[1.6] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">PRONITE PASS</span>
              </div>
            </motion.div>

            {/* 03: Merchandise (Hero Anchor) */}
            <motion.div variants={fadeUp} className="absolute w-[30%] md:w-[28%] left-[60%] bottom-[43%] md:bottom-[41%] -translate-x-1/2 flex flex-col items-center group pointer-events-auto z-20">
              
              {/* Fixed Floor Shadow */}
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[70%] h-[6px] bg-black/95 blur-[3px] rounded-[100%] z-0" />
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[35%] h-[2px] bg-black blur-[1px] rounded-[100%] z-0" />

              {/* Translating Image */}
              <div className="w-full relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                 <Image 
                   src={assets.incentives.merchandise} 
                   alt="Merchandise" 
                   width={1024} height={1536} 
                   // Shifted right so the bottle is perfectly centered, scaling massive
                   className="w-full h-auto scale-[1.2] md:scale-[1.25] origin-bottom translate-x-[7%] md:translate-x-[9%] translate-y-[-1%] md:translate-y-[-2%]" 
                   priority 
                 />
              </div>

              {/* Museum Placard on Pedestal Face */}
              <div className="absolute top-[100%] mt-8 md:mt-14 flex flex-col items-center text-center w-[120%] z-20">
                <span className="text-accent font-serif text-[20px] md:text-[26px] mb-1 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">03</span>
                <span className="text-white/70 tracking-[0.15em] text-[8px] md:text-[9px] leading-[1.6] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">MERCHANDISE</span>
              </div>
            </motion.div>

            {/* 04: Opportunities */}
            <motion.div variants={fadeUp} className="absolute w-[24%] md:w-[18%] left-[80%] bottom-[43%] md:bottom-[41%] -translate-x-1/2 flex flex-col items-center group pointer-events-auto">
              
              {/* Fixed Floor Shadow */}
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[55%] h-[4px] bg-black/95 blur-[2px] rounded-[100%] z-0" />
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[30%] h-[1px] bg-black blur-[0.5px] rounded-[100%] z-0" />

              {/* Translating Image */}
              <div className="w-full relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                 <Image 
                   src={assets.incentives.opportunities} 
                   alt="Opportunities" 
                   width={1024} height={1536} 
                   className="w-full h-auto scale-[1.35] md:scale-[1.45] origin-bottom translate-y-[0%] md:translate-y-[-1%] translate-x-[-1%]" 
                   priority 
                 />
              </div>

              {/* Museum Placard on Pedestal Face */}
              <div className="absolute top-[100%] mt-8 md:mt-14 flex flex-col items-center text-center w-[150%] z-20">
                <span className="text-accent font-serif text-[20px] md:text-[26px] mb-1 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">04</span>
                <span className="text-white/70 tracking-[0.15em] text-[8px] md:text-[9px] leading-[1.6] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">OPPORTUNITIES</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
