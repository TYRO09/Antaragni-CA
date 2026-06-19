"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GridContainer } from "../layout/GridContainer";
import { VerticalLabel } from "../ui/VerticalLabel";
import { cn } from "@/lib/utils";
import { assets } from "@/lib/assets";
import { GradientDiffusion } from "../lighting/GradientDiffusion";

const team = [
  { name: "RITVIK MALHOTRA", role: "OVERALL COORDINATOR" },
  { name: "ANANYA SINGH", role: "CREATIVE DIRECTOR" },
  { name: "VEDANT BANSAL", role: "OPERATIONS HEAD" },
  { name: "KAVYA IYER", role: "MARKETING DIRECTOR" },
  { name: "ARNAV RASTOGI", role: "DESIGN DIRECTOR" }
];

const placeholders = [
  assets.contact.gundeep,
  assets.contact.harsh,
  assets.contact.vineet,
  assets.contact.yashasvi,
  assets.contact.sanchit
];

// No spring effects, pure cinematic ease
const easeOut = [0.25, 0.1, 0.25, 1];

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: easeOut } 
  }
};

const fadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: easeOut, delay: 0.4 } }
};

const lineXVariant = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.4, ease: easeOut, delay: 0.2 } }
};

const lineYVariant = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.4, ease: easeOut, delay: 0.5 } }
};

const headingLineVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 1.2,
      ease: easeOut
    }
  })
};

const cardVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.9,
      ease: easeOut
    }
  })
};

function TeamCard({ person, index }: { person: any, index: number }) {
  return (
    <motion.div 
      className="flex flex-col gap-4 lg:gap-5 group cursor-pointer w-full"
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none z-10 mix-blend-overlay" />
        <Image 
          src={placeholders[index]} 
          alt={person.name}
          fill
          className="object-cover grayscale contrast-[1.15] brightness-[0.8] transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-100"
        />
      </div>
      <div className="flex flex-col items-center text-center px-1">
        <h4 className="text-foreground text-[9px] md:text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all duration-500 ease-out whitespace-nowrap">
          {person.name}
        </h4>
        <span className="text-accent text-[8px] md:text-[9px] uppercase tracking-[0.15em] mt-1.5">
          {person.role}
        </span>
      </div>
    </motion.div>
  );
}

export function ContactSection() {
  return (
    <motion.section 
      className="relative w-full flex flex-col py-20 md:py-32 overflow-hidden bg-black border-t border-white/5 min-h-[85vh] justify-center z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariant}
    >
      {/* Soft desk lamp illumination */}
      <GradientDiffusion color="white" className="opacity-20 max-w-[800px] left-0 translate-x-[-20%] pointer-events-none" />

      <GridContainer className="items-stretch h-full relative z-10">
        
        {/* LEFT COLUMN: Editorial Text */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4 flex flex-col justify-center relative z-10 h-full">
          
          <div className="flex items-center gap-4 mb-8 lg:mb-10 pt-16 md:pt-0 mt-auto md:mt-0">
            <span className="text-accent text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium whitespace-nowrap">
              OUR TEAM
            </span>
            <motion.div 
              variants={lineXVariant} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              className="h-[1px] bg-accent/40 w-full max-w-[60px] md:max-w-[80px] origin-left" 
            />
          </div>

          <div className="flex flex-col font-serif text-[clamp(40px,4.5vw,72px)] leading-[0.9] text-foreground mb-10 lg:mb-14">
            <motion.div custom={0} variants={headingLineVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              CONTACT
            </motion.div>
            <motion.div custom={1} variants={headingLineVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              US
            </motion.div>
          </div>

          <motion.div 
            variants={lineXVariant} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="h-[2px] w-8 bg-accent mb-8 lg:mb-10 origin-left" 
          />

          <motion.p 
            variants={fadeVariant} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-muted text-[10px] md:text-[11px] lg:text-xs leading-[2.4] tracking-[0.15em] uppercase max-w-[280px] pb-16 md:pb-0"
          >
            A collective of dreamers,<br/>
            thinkers, and doers.<br/><br/>
            United by purpose.<br/><br/>
            Driven by passion.<br/><br/>
            Committed to creating<br/>
            experiences that last<br/>
            beyond a lifetime.
          </motion.p>

        </div>

        {/* RIGHT COLUMN: Team Grid */}
        <div className="col-span-1 md:col-span-5 lg:col-span-8 flex flex-col justify-center h-full lg:pr-24 xl:pr-32 relative">
          
          {/* Desktop & Tablet 6-Col Internal Grid */}
          <div className="hidden md:grid grid-cols-6 gap-x-4 lg:gap-x-6 gap-y-12 lg:gap-y-16 w-full">
            {/* Top Row (3 items, 2 cols each) */}
            <div className="col-span-2"><TeamCard person={team[0]} index={0} /></div>
            <div className="col-span-2"><TeamCard person={team[1]} index={1} /></div>
            <div className="col-span-2"><TeamCard person={team[2]} index={2} /></div>
            
            {/* Bottom Row (2 items, span 2 each, starting at col 2 and 4 to center beneath the 3 items) */}
            <div className="col-span-2 col-start-2"><TeamCard person={team[3]} index={3} /></div>
            <div className="col-span-2 col-start-4"><TeamCard person={team[4]} index={4} /></div>
          </div>

          {/* Mobile Stack */}
          <div className="flex md:hidden flex-col gap-12 w-full items-center">
            {team.map((person, i) => (
              <div key={person.name} className="w-full max-w-[260px]">
                <TeamCard person={person} index={i} />
              </div>
            ))}
          </div>

        </div>

        {/* EDITORIAL FRAME ELEMENTS - Right Edge */}
        <div className="hidden lg:flex absolute right-6 md:right-10 lg:right-20 top-12 bottom-12 flex-col items-center pointer-events-none z-10 w-8">
          
          <motion.div 
            variants={fadeVariant} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="flex-shrink-0 mb-8 pt-8"
          >
            <VerticalLabel label="ANTARAGNI '26" color="red" />
          </motion.div>
          
          <motion.div 
            variants={lineYVariant} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="w-[1px] flex-grow bg-accent/40 origin-top" 
          />
          
          <motion.div 
            variants={lineXVariant} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="absolute bottom-0 right-1/2 w-16 h-[2px] bg-accent origin-right translate-y-8" 
          />
        </div>

      </GridContainer>
    </motion.section>
  );
}
