"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { EditorialHeading } from "../ui/EditorialHeading";
import { EditorialSubheading } from "../ui/EditorialSubheading";
import { VerticalLabel } from "../ui/VerticalLabel";
import { StatisticBlock } from "../ui/StatisticBlock";
import { GridContainer } from "../layout/GridContainer";
import { useStaggerHeading, useFadeUp, EASING } from "@/lib/animations";
import { useCounter } from "@/lib/animations/useCounter";
import { AtmosphericHaze } from "../lighting/AtmosphericHaze";
import { GradientDiffusion } from "../lighting/GradientDiffusion";
import { assets } from "@/lib/assets";

export function HeroSection() {
  const { scrollY } = useScroll();
  const archY = useTransform(scrollY, [0, 500], [0, 20]); // Subtle parallax (moving slightly opposite to scroll)
  const { ref: headingRef, controls: headingControls, containerVariants, childVariants } = useStaggerHeading(0.08, 0.2);
  const { ref: subRef, controls: subControls, initial: subInitial } = useFadeUp(0.6);
  const { ref: descRef, controls: descControls, initial: descInitial } = useFadeUp(0.8);
  const { ref: statsRef, controls: statsControls, initial: statsInitial } = useFadeUp(1.0);
  const { ref: stat1Ref, value: stat1Val } = useCounter(60, 2);
  const { ref: stat2Ref, value: stat2Val } = useCounter(150, 2);
  const { ref: stat3Ref, value: stat3Val } = useCounter(400, 2.5);

  return (
    <section id="home" className="relative w-full min-h-[calc(100vh-80px)] flex flex-col pt-12 md:pt-20 pb-20 overflow-hidden">
      {/* Background Volumetric Spotlight */}
      <motion.div 
        className="absolute top-[40%] right-[20%] w-[800px] h-[800px] opacity-[0.05] pointer-events-none mix-blend-screen" 
        style={{ y: archY }}
      >
        <Image src={assets.textures.spotlight} alt="spotlight" fill className="object-contain" priority />
      </motion.div>
      
      <GridContainer className="flex-grow relative z-10 items-center">
        {/* Left Side: Typography */}
        <div className="col-span-1 md:col-span-5 lg:col-span-7 flex flex-col justify-center">
          <motion.div
            ref={headingRef as any}
            variants={containerVariants}
            initial="hidden"
            animate={headingControls}
          >
            <EditorialHeading variant="hero" as="h1" className="mb-2 text-foreground">
              {"ANTARAGNI".split("").map((letter, index) => (
                <motion.span key={index} variants={childVariants} className="inline-block">
                  {letter}
                </motion.span>
              ))}
            </EditorialHeading>
          </motion.div>
          
          <motion.div
            ref={subRef as any}
            initial={subInitial}
            animate={subControls}
          >
            <EditorialSubheading className="mb-10 text-foreground">
              CAMPUS<br/>AMBASSADOR<br/>PROGRAM
            </EditorialSubheading>
          </motion.div>

          <motion.div 
            ref={descRef as any}
            initial={descInitial}
            animate={descControls}
            className="flex flex-col gap-1.5 mt-8 md:mt-12 text-[12px] font-sans font-semibold tracking-[0.2em] uppercase"
          >
            <p className="text-muted">LEAD CULTURE.</p>
            <p className="text-muted">CREATE IMPACT.</p>
            <p className="text-accent">BEYOND LIMITS.</p>
          </motion.div>
        </div>

        {/* Right Side: Stats */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4 flex flex-col justify-center relative mt-16 md:mt-0">
          
          {/* Silhouette Image with lighting */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none -z-10 ml-0 md:-ml-20 mt-10 overflow-hidden md:overflow-visible">
            <GradientDiffusion color="white" className="opacity-50" />
            <motion.div 
              className="relative w-[min(460px,100vw)] aspect-[1/2] max-h-[120vh]" 
              style={{ y: archY }}
            >
              <Image src={assets.hero.silhouette} alt="silhouette" fill className="object-contain" priority />
            </motion.div>
          </div>

          {/* Statistics Block */}
          <motion.div 
            ref={statsRef as any}
            initial={statsInitial}
            animate={statsControls}
            className="flex flex-col gap-16 items-end text-right z-10 relative"
          >
            <div ref={stat1Ref as any}>
              <StatisticBlock 
                value={stat1Val.toString()} 
                label={"YEARS\nOF LEGACY"} 
                className="items-end text-right"
              />
            </div>
            <div ref={stat2Ref as any}>
              <StatisticBlock 
                value={stat2Val.toString()} 
                suffix="K+"
                label={"ATTENDEES"} 
                className="items-end text-right"
              />
            </div>
            <div ref={stat3Ref as any}>
              <StatisticBlock 
                value={stat3Val.toString()} 
                suffix="+"
                label={"COLLEGES"} 
                className="items-end text-right"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Edge: Vertical Labels */}
        <motion.div 
          className="hidden lg:flex lg:col-span-1 flex-col items-end justify-between h-full py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: EASING }}
        >
          <div className="relative h-full flex flex-col items-center justify-between">
            {/* Top vertical label with line */}
            <div className="flex flex-col items-center gap-4">
              <VerticalLabel label="ANTARAGNI '26" color="red" />
              <div className="w-[1px] h-32 bg-accent opacity-50" />
            </div>

            {/* Bottom vertical label */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-[1px] h-32 bg-accent opacity-50" />
              <VerticalLabel label="IIT KANPUR" color="red" />
            </div>
          </div>
        </motion.div>

      </GridContainer>
    </section>
  );
}
