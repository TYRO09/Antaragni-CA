"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EditorialHeading } from "../ui/EditorialHeading";
import { BodyText } from "../ui/BodyText";
import { MetadataLabel } from "../ui/MetadataLabel";
import { StatisticBlock } from "../ui/StatisticBlock";
import { GridContainer } from "../layout/GridContainer";
import { fadeUp, staggerContainer, scrollReveal } from "@/lib/animations";
import { useEditorialReveal } from "@/lib/animations/useEditorialReveal";
import { useFadeUp } from "@/lib/animations/useFadeUp";
import { useImageReveal } from "@/lib/animations/useImageReveal";
import { useCounter } from "@/lib/animations/useCounter";
import { assets } from "@/lib/assets";
import { AtmosphericHaze } from "../lighting/AtmosphericHaze";

export function SpiritSection() {
  const { ref: headingRef, controls: headingControls, initial: headingInitial } = useEditorialReveal(0.1);
  const { ref: textRef, controls: textControls, initial: textInitial } = useFadeUp(0.3);
  const { ref: imgRef, controls: imgControls, initial: imgInitial } = useImageReveal(0.2);
  const { ref: statRef, value: statValue } = useCounter(10, 2);

  return (
    <section className="relative w-full flex flex-col py-24 md:py-32 overflow-hidden border-t border-white/5">
      <GridContainer className="items-start">
        
        {/* Left Side: Typography & Legacy Copy */}
        <div className="col-span-1 md:col-span-5 lg:col-span-6 flex flex-col pt-10 relative z-10">
          <motion.div 
            ref={headingRef as any} 
            initial={headingInitial} 
            animate={headingControls} 
            className="max-w-full overflow-hidden"
          >
            <EditorialHeading variant="section" className="mb-10 text-foreground break-words hyphens-auto">
              SPIRIT OF<br/>ANTARAGNI
            </EditorialHeading>
          </motion.div>
          
          <motion.div 
            ref={textRef as any} 
            initial={textInitial} 
            animate={textControls}
          >
            <BodyText className="mb-12 max-w-[480px]">
              Born in 1965, Antaragni is North India&apos;s largest cultural festival, 
              hosted by IIT Kanpur. Every year, we welcome over 150,000 students 
              from 400+ colleges for a celebration of creativity and talent. 
              Our stages have been graced by global icons like KSHMR, Adnan Sami, 
              and Shankar-Ehsaan-Loy. Join us as we write the next chapter in our legacy.
            </BodyText>
          </motion.div>

          <hr className="w-16 border-t border-accent mb-8 opacity-50" />
          
          <div>
            <MetadataLabel color="red">
              CULTURE. CREATIVITY. CONNECTION.
            </MetadataLabel>
          </div>
        </div>

        {/* Right Side: Hero Image Area */}
        <div className="col-span-1 md:col-span-3 lg:col-span-6 relative mt-16 md:mt-0 min-h-[500px] flex items-center justify-center pointer-events-none">
          {/* Replaced static circle with AtmosphericHaze */}
          <AtmosphericHaze color="crimson" intensity="dense" />
          
          {/* Hero Image Area */}
          <motion.div 
            ref={imgRef as any}
            initial={imgInitial}
            animate={imgControls}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:right-[-5%] w-[100%] md:w-[120%] lg:w-[110%] h-[120%] min-h-[600px] lg:min-h-[800px] flex items-center justify-center origin-center pointer-events-none z-0"
          >
             <Image 
               src={assets.spirit.crowd} 
               alt="Spirit of Antaragni Crowd" 
               fill 
               className="object-cover object-[center_70%] opacity-85 mix-blend-lighten" 
             />
             
             {/* Fade masks to dissolve the image boundaries into the background */}
             <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/20 to-background" />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-90" />
             <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-50" />
             <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-60" />
          </motion.div>
        </div>
      </GridContainer>

      {/* Bottom Row: Statistics */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 mt-32 min-w-0">
        <motion.div 
          className="w-full grid grid-cols-2 md:grid-cols-5 border-t border-b border-white/5 py-12 md:py-16 gap-y-12 relative min-w-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollReveal}
        >
          
          <motion.div ref={statRef as any} variants={fadeUp} className="col-span-1 border-r border-white/5 flex justify-center">
            <StatisticBlock 
              value={statValue.toString()} 
              suffix="K+"
              label={"VOICES\nUNITED"} 
              valueColor="red"
              labelColor="gray"
              className="items-center text-center"
            />
          </motion.div>
          
          <motion.div variants={fadeUp} className="col-span-1 md:border-r border-white/5 flex justify-center">
            <StatisticBlock 
              value="50" 
              suffix="+"
              label={"COLLEGES\nPARTICIPATING"} 
              valueColor="red"
              labelColor="gray"
              className="items-center text-center"
            />
          </motion.div>
          
          <motion.div variants={fadeUp} className="col-span-1 border-r border-white/5 flex justify-center">
            <StatisticBlock 
              value="3.5" 
              label={"DAYS OF\nTRANSFORMATION"} 
              valueColor="red"
              labelColor="gray"
              className="items-center text-center"
            />
          </motion.div>
          
          <motion.div variants={fadeUp} className="col-span-1 md:border-r border-white/5 flex justify-center">
            <StatisticBlock 
              value="1" 
              label={"LEGACY THAT\nCONTINUES"} 
              valueColor="red"
              labelColor="gray"
              className="items-center text-center"
            />
          </motion.div>
          
          <motion.div variants={fadeUp} className="col-span-2 md:col-span-1 flex justify-center">
            <StatisticBlock 
              value="∞" 
              label={"MEMORIES\nCREATED"} 
              valueColor="red"
              labelColor="gray"
              className="items-center text-center"
            />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
