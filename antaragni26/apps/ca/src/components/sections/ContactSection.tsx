"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import { GridContainer } from "../layout/GridContainer";
import { VerticalLabel } from "../ui/VerticalLabel";
import { cn } from "@/lib/utils";
import { assets } from "@/lib/assets";

interface TeamMember {
  name: string;
  role: string;
  department: string;
  mobile: string;
  email: string;
  instagram: string;
  linkedin: string;
  image_path: string;
}

// Initial fallback data
const fallbackTeam: TeamMember[] = [
  { name: "Hanuman Choudhary", role: "Organizer", department: "Hospitality and Transport", mobile: "7850923892", email: "", instagram: "", linkedin: "", image_path: assets.contact.gundeep },
  { name: "HARSH", role: "Organizer", department: "Hospitality and Transport", mobile: "", email: "", instagram: "", linkedin: "", image_path: assets.contact.harsh },
  { name: "VINEET", role: "Organizer", department: "Hospitality and Transport", mobile: "", email: "", instagram: "", linkedin: "", image_path: assets.contact.vineet },
  { name: "YASHASVI", role: "Organizer", department: "Hospitality and Transport", mobile: "", email: "", instagram: "", linkedin: "", image_path: assets.contact.yashasvi },
  { name: "SANCHIT", role: "Organizer", department: "Hospitality and Transport", mobile: "", email: "", instagram: "", linkedin: "", image_path: assets.contact.sanchit }
];

function parseCSV(text: string): TeamMember[] {
  const lines = text.split("\n").filter(l => l.trim() !== "");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim());
  return lines.slice(1).map(line => {
    // Basic CSV parse handling quotes if needed, otherwise simple split
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/(^"|"$)/g, '').trim());
    return headers.reduce((obj, header, i) => {
      obj[header as keyof TeamMember] = values[i] || "";
      return obj;
    }, {} as any) as TeamMember;
  });
}

// Fallback arrays removed as we handle it inside component

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

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

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

function TeamCard({ person, index }: { person: TeamMember, index: number }) {
  return (
    <motion.div 
      className="flex flex-col gap-4 lg:gap-5 group cursor-default w-full"
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative w-full aspect-square md:aspect-[3/4] overflow-hidden bg-[#0a0a0a] rounded-full md:rounded-none transition-all duration-500">
        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none z-10 mix-blend-overlay rounded-full md:rounded-none" />
        <Image 
          src={person.image_path || fallbackTeam[index % fallbackTeam.length].image_path} 
          alt={person.name}
          fill
          className="object-cover grayscale contrast-[1.15] brightness-[0.8] transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-100"
        />
      </div>
      <div className="flex flex-col items-center text-center px-1">
        <h4 className="text-foreground text-[16px] md:text-[18px] lg:text-[22px] font-medium tracking-[0.05em] transition-all duration-500 ease-out whitespace-nowrap">
          {person.name}
        </h4>
        <span className="text-foreground/90 text-[14px] md:text-[16px] mt-1.5 font-light">
          {person.role}
        </span>
        <span className="text-foreground/90 text-[14px] md:text-[16px] mt-1 font-light">
          {person.department}
        </span>
        {person.mobile && (
          <span className="text-foreground/90 text-[14px] md:text-[16px] mt-2 font-light">
            Mobile: {person.mobile}
          </span>
        )}
        
        <div className="flex items-center gap-4 mt-4 text-foreground/80">
          {person.email && (
            <a href={`mailto:${person.email}`} className="hover:text-white transition-colors">
              <Mail className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            </a>
          )}
          {person.instagram && (
            <a href={person.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <InstagramIcon className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          )}
          {person.linkedin && (
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <LinkedinIcon className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ContactSection() {
  const [teamData, setTeamData] = useState<TeamMember[]>(fallbackTeam);

  useEffect(() => {
    fetch('/data/team.csv')
      .then(res => {
        if (!res.ok) throw new Error("CSV not found");
        return res.text();
      })
      .then(text => {
        const parsed = parseCSV(text);
        if (parsed.length > 0) setTeamData(parsed);
      })
      .catch(err => console.warn("Failed to load team.csv, using fallback", err));
  }, []);

  return (
    <motion.section id="contact" 
      className="relative w-full flex flex-col py-20 md:py-32 overflow-hidden bg-black border-t border-white/5 min-h-[85vh] justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariant}
    >
      <GridContainer className="items-stretch h-full relative">
        
        {/* LEFT COLUMN: Editorial Text (approx 32%) */}
        <div className="col-span-1 md:col-span-4 flex flex-col justify-center relative z-10 h-full">
          
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

        {/* RIGHT COLUMN: Team Grid (approx 68%) */}
        <div className="col-span-1 md:col-span-8 flex flex-col justify-center h-full lg:pr-16 relative">
          
          {/* Desktop & Tablet 6-Col Internal Grid */}
          <div className="hidden md:grid grid-cols-6 gap-x-4 lg:gap-x-6 gap-y-12 lg:gap-y-16 w-full">
            {/* Top Row (3 items, 2 cols each) */}
            {teamData.slice(0, 3).map((person, i) => (
              <div key={i} className="col-span-2"><TeamCard person={person} index={i} /></div>
            ))}
            
            {/* Bottom Row (2 items, span 2 each, starting at col 2 and 4 to center beneath the 3 items) */}
            {teamData.slice(3, 5).map((person, i) => (
              <div key={i + 3} className={i === 0 ? "col-span-2 col-start-2" : "col-span-2 col-start-4"}><TeamCard person={person} index={i + 3} /></div>
            ))}
          </div>

          {/* Mobile Stack */}
          <div className="flex md:hidden flex-col gap-16 w-full items-center">
            {teamData.map((person, i) => (
              <div key={i} className="w-full max-w-[280px]">
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
