"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EditorialHeading } from "../ui/EditorialHeading";
import { GridContainer } from "../layout/GridContainer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { assets } from "@/lib/assets";

const faqData = [
  {
    id: "01",
    title: "APPLICATION",
    description: "Everything you need to know about applying to the Antaragni Campus Ambassador Program.",
    content: null,
  },
  {
    id: "02",
    title: "SELECTION",
    description: "Understand our selection process and what we look for in an ambassador.",
    content: null,
  },
  {
    id: "03",
    title: "RESPONSIBILITIES",
    description: "What will you do as an ambassador? Roles, tasks and expectations.",
    content: (
      <div className="flex flex-col gap-12 mt-12 mb-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full">
          {/* Q1 */}
          <div className="flex-1 flex flex-col gap-4">
            <span className="text-accent text-[12px] font-sans font-bold">Q1</span>
            <h4 className="text-[18px] md:text-[22px] font-sans font-medium text-foreground pr-8">
              What are the core responsibilities?
            </h4>
          </div>
          {/* Vertical Divider (Desktop) / Horizontal (Mobile handled by flex layout naturally if we don't add borders, let's add border to left on desktop) */}
          <div className="hidden md:block w-[1px] bg-white/10" />
          <div className="flex-[1.5] flex items-center">
            <p className="text-muted text-[13px] md:text-[15px] leading-[1.8] font-sans">
              Ambassadors act as cultural leaders on campus. You will promote Antaragni, build engagement, coordinate activities, and represent the festival with passion and responsibility.
            </p>
          </div>
        </div>
        
        {/* Horizontal Divider */}
        <div className="w-full h-[1px] bg-white/10" />

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full">
          {/* Q2 */}
          <div className="flex-1 flex flex-col gap-4">
            <span className="text-accent text-[12px] font-sans font-bold">Q2</span>
            <h4 className="text-[18px] md:text-[22px] font-sans font-medium text-foreground pr-8">
              How much time is required?
            </h4>
          </div>
          <div className="hidden md:block w-[1px] bg-white/10" />
          <div className="flex-[1.5] flex items-center">
            <p className="text-muted text-[13px] md:text-[15px] leading-[1.8] font-sans">
              The program is flexible and designed to fit around your academics. You are expected to dedicate consistent time, especially closer to festival season.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "04",
    title: "BENEFITS",
    description: "Discover the perks, learning opportunities and experiences you will gain.",
    content: null,
  },
  {
    id: "05",
    title: "EVENTS",
    description: "Learn about Antaragni and the scale of experiences you will be a part of.",
    content: null,
  },
];

export function FAQSection() {
  const [expandedId, setExpandedId] = useState<string>("03");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="faq" className="relative w-full flex flex-col pt-24 pb-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background Volumetric Spotlight */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] opacity-[0.25] pointer-events-none mix-blend-screen origin-top-left rotate-[-15deg]">
        <Image src={assets.textures.spotlight} alt="spotlight" fill className="object-contain" priority />
      </div>

      <GridContainer className="relative z-10">
        
        {/* Top Hero Area */}
        <div className="col-span-1 md:col-span-8 flex flex-col mb-24 md:mb-32">
          <EditorialHeading 
            as="h2" 
            variant="hero" 
            className="text-[15vw] md:text-[140px] leading-[0.85] text-foreground flex flex-col mb-12"
          >
            <span>BEFORE</span>
            <span>YOU</span>
            <span>APPLY</span>
          </EditorialHeading>
          
          <div className="flex flex-col gap-4 mt-6">
            <p className="text-muted text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-sans font-semibold leading-[1.8] max-w-[300px]">
              Questions are natural.<br/>
              Clarity empowers you<br/>
              to take the first step.
            </p>
            <div className="w-12 h-[2px] bg-accent mt-2" />
          </div>
        </div>

        {/* Right Side Editorial Label */}
        <div className="hidden md:flex col-span-4 flex-col items-end justify-center mb-32 h-full">
          <div className="flex flex-row items-center gap-6 mt-32">
            <div className="w-[1px] h-20 bg-white/20" />
            <div className="flex flex-col gap-4">
              <span className="text-foreground text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-sans font-semibold">
                FREQUENTLY<br/>ASKED QUESTIONS
              </span>
              <div className="w-8 h-[2px] bg-accent" />
            </div>
          </div>
        </div>

        {/* FAQ Accordion Experience */}
        <div className="col-span-1 md:col-span-12 flex flex-col mt-10">
          <div className="w-full h-[1px] bg-white/10" />
          
          {faqData.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div 
                key={item.id} 
                className={cn(
                  "flex flex-col w-full border-b border-white/10 transition-colors duration-500",
                  isExpanded ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                )}
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full flex flex-col md:flex-row items-start md:items-center py-10 md:py-14 gap-8 md:gap-12 group text-left cursor-pointer outline-none"
                >
                  {/* Number */}
                  <span className={cn(
                    "text-[40px] md:text-[60px] font-serif leading-none transition-colors duration-500 w-[80px]",
                    isExpanded ? "text-white" : "text-white/60 group-hover:text-white"
                  )}>
                    {item.id}
                  </span>
                  
                  {/* Title */}
                  <motion.div 
                    className="flex-1 flex"
                    animate={{ x: isExpanded ? 10 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <EditorialHeading 
                      as="h3" 
                      className={cn(
                        "text-[32px] md:text-[50px] leading-none transition-colors duration-500",
                        isExpanded ? "text-white" : "text-white/80 group-hover:text-white"
                      )}
                    >
                      {item.title}
                    </EditorialHeading>
                  </motion.div>

                  {/* Description & Icon container */}
                  <div className="flex-1 flex flex-row items-center justify-between gap-8 md:gap-16 w-full md:w-auto">
                    <p className={cn(
                      "text-[12px] md:text-[14px] font-sans leading-[1.6] transition-colors duration-500 max-w-[300px]",
                      isExpanded ? "text-white/80" : "text-muted group-hover:text-white/60"
                    )}>
                      {item.description}
                    </p>
                    
                    <motion.div 
                      className="text-white text-[24px] font-light flex items-center justify-center w-8 h-8 opacity-60 group-hover:opacity-100"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      {isExpanded ? "—" : "＋"}
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && item.content && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-0 md:pl-[128px] pr-0 md:pr-12 pb-16">
                        <div className="w-full h-[1px] bg-white/10" />
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                        >
                          {item.content}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </GridContainer>
    </section>
  );
}
