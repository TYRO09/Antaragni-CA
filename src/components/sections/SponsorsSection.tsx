"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { EditorialHeading } from "../ui/EditorialHeading";
import { GridContainer } from "../layout/GridContainer";
import { cn } from "@/lib/utils";
import { assets } from "@/lib/assets";
import { AmbientLight } from "../lighting/AmbientLight";
import { useReveal, useFadeUp } from "@/lib/animations";

const sponsorGroups = [
  {
    title: "OUTREACH PARTNERS",
    logos: [
      { id: "L&T", src: assets.sponsors.intrcity, name: "Intrcity" }, // Replaced L&T with intrcity temporarily, user didn't provide L&T
      { id: "HDFC", src: assets.sponsors.vskills, name: "vSkills" }, // Replaced with vskills
    ],
  },
  {
    title: "GOODIES PARTNERS",
    logos: [
      { id: "SBI", src: assets.sponsors.easyShiksha, name: "EasyShiksha" },
      { id: "SAMSUNG", src: assets.sponsors.swashaa, name: "Swashaa" },
      { id: "HYUNDAI", src: assets.sponsors.urbanDrift, name: "Urban Drift" },
    ],
  },
  {
    title: "TRAVELLING PARTNER",
    logos: [
      { id: "productFolks", src: assets.sponsors.productFolks, name: "The Product Folks" },
      { id: "supervek", src: assets.sponsors.supervek, name: "Supervek" },
    ],
  },
];

// Local variants removed in favor of standardized hooks

// Subtle parallax hook
function useParallaxMouse() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to prevent wobble and lag
  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalize coordinates from -1 to 1 based on screen size
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    
    // Map to maximum 5px movement
    mouseX.set(x * 5);
    mouseY.set(y * 5);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return { smoothX, smoothY, handleMouseMove, resetMouse };
}

export function SponsorsSection() {
  const { smoothX, smoothY, handleMouseMove, resetMouse } = useParallaxMouse();
  const { ref: titleRef, controls: titleControls, initial: titleInitial } = useReveal(0.1);
  const { ref: metaRef, controls: metaControls, initial: metaInitial } = useFadeUp(0.6);

  return (
    <section 
      id="sponsors"
      className="relative w-full flex flex-col py-10 md:py-16 overflow-hidden bg-black border-t border-white/5 min-h-[85vh] lg:h-[90vh] justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
    >
      <AmbientLight color="white" intensity="faint" />
      <GridContainer className="items-center h-full flex flex-col relative z-10">
        
        {/* Main Content Area */}
        <div className="col-span-1 md:col-span-8 lg:col-span-12 flex flex-col w-full h-full justify-center">
          
          {/* Top Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between w-full mb-8 lg:mb-12">
            <motion.div
              ref={titleRef as any}
              initial={titleInitial}
              animate={titleControls}
              className="max-w-full"
            >
              <h2 className="text-accent text-[clamp(1.5rem,7vw,3rem)] font-medium uppercase tracking-[0.15em] md:tracking-[0.2em] break-words">
                OUR VALUED SUPPORTERS
              </h2>
            </motion.div>

            {/* Right Metadata Block */}
            <motion.div 
              ref={metaRef as any}
              initial={metaInitial}
              animate={metaControls}
              className="mt-6 md:mt-2 flex flex-col items-start md:items-end gap-1 shrink-0"
            >
              <span className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] uppercase">
                ANTARAGNI &apos;26
              </span>
              <span className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] uppercase">
                IIT KANPUR
              </span>
            </motion.div>
          </div>

          {/* Main Sponsor Wall */}
          <div className="w-full flex flex-col relative group/wall flex-grow justify-around max-h-[65vh]">
            
            {sponsorGroups.map((group, groupIndex) => (
              <SponsorGroup key={group.title} group={group} smoothX={smoothX} smoothY={smoothY} index={groupIndex} />
            ))}

            {/* Final Bottom Divider */}
            <div className="w-full h-[1px] bg-white/[0.12]" />
          </div>

        </div>
      </GridContainer>
    </section>
  );
}

function SponsorGroup({ group, smoothX, smoothY, index }: { group: any, smoothX: any, smoothY: any, index: number }) {
  const { ref, controls, initial } = useFadeUp(0.1 * index);
  return (
    <motion.div 
      ref={ref as any}
      initial={initial}
      animate={controls}
      className="w-full flex flex-col group/category"
    >
      <div className="w-full h-[1px] bg-white/[0.12]" />
      <div className="w-full py-6 md:py-8 flex flex-col items-center">
        <span className="text-accent text-[9px] md:text-[11px] font-medium uppercase mb-6 md:mb-8 text-center">
          {group.title}
        </span>
        <div className="w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-8 md:gap-x-16 lg:gap-x-24 group/logos px-4">
          {group.logos.map((sponsor: any) => (
            <motion.div 
              key={sponsor.id}
              whileHover={{ 
                scale: 1.03, 
                filter: "brightness(1.2)", 
                transition: { duration: 0.4 } 
              }}
              style={{ x: smoothX, y: smoothY }}
              className="flex items-center justify-center transition-opacity duration-300 opacity-80 hover:!opacity-100 group-hover/logos:opacity-40 cursor-default"
            >
              <div className="relative w-[clamp(80px,25vw,120px)] md:w-[160px] lg:w-[200px] h-[60px] md:h-[80px] lg:h-[100px] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                 <Image src={sponsor.src} alt={sponsor.name} fill className="object-contain" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
