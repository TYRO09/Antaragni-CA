"use client";

import { motion } from "framer-motion";
import { EditorialHeading } from "../ui/EditorialHeading";
import { VerticalLabel } from "../ui/VerticalLabel";
import { GridContainer } from "../layout/GridContainer";
import { lineDraw, scrollReveal } from "@/lib/animations";
import { useReveal, useFadeUp } from "@/lib/animations";
import { AmbientLight } from "../lighting/AmbientLight";

const expectations = [
  {
    number: "01",
    title: "Advertise",
    description: "PROMOTE EVERY EVENT\nWITH CREATIVITY AND\nMAXIMUM REACH.",
  },
  {
    number: "02",
    title: "Organize",
    description: "PLAN AHEAD, STAY\nSTRUCTURED, AND\nDELIVER SEAMLESSLY.",
  },
  {
    number: "03",
    title: "Conduct",
    description: "ENSURE DISCIPLINE,\nRESPECT, AND THE SPIRIT\nOF EXCELLENCE.",
  },
  {
    number: "04",
    title: "Coordinate",
    description: "BRING PEOPLE TOGETHER\nAND WORK AS ONE\nTOWARDS SUCCESS.",
  },
];

export function ExpectationsSection() {
  const { ref: headingRef, controls: headingControls, initial: headingInitial } = useReveal(0.1);
  const { ref: railRef, controls: railControls, initial: railInitial } = useFadeUp(0.6);

  return (
    <section id="responsibilities" className="relative w-full flex flex-col py-24 md:py-32 bg-black overflow-hidden">
      <GridContainer className="items-stretch">
        
        {/* Main Content Area (Left 11 Columns) */}
        <div className="col-span-1 md:col-span-7 lg:col-span-11 flex flex-col">
          
          {/* Top Label Block */}
          <div className="flex items-center gap-6 w-full mb-20 md:mb-32">
            <span className="text-accent text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap">
              WHAT WE EXPECT
            </span>
            <div className="h-[1px] flex-grow bg-accent" />
          </div>

          {/* Headline Block */}
          <div className="relative w-full flex flex-row items-center justify-between mb-24 md:mb-32">
            <motion.div 
              ref={headingRef as any}
              initial={headingInitial}
              animate={headingControls}
            >
              <EditorialHeading as="h2" variant="hero" className="text-[9vw] xl:text-[110px] text-foreground capitalize relative z-10 leading-[1.1]">
                What We Expect
              </EditorialHeading>
            </motion.div>

            {/* Decorative Diagonal Line */}
            <motion.div 
              className="hidden md:block w-[150px] md:w-[350px] lg:w-[500px] max-w-[calc(100vw-40px)] h-[1px] bg-accent mr-0 lg:mr-10" 
              style={{ transformOrigin: "left center" }}
              variants={lineDraw}
              initial="hidden"
              whileInView={{
                scaleX: 1,
                opacity: 1,
                rotate: -45, // Keep rotation here so scaleX works properly
                transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
              }}
              viewport={scrollReveal}
            />
          </div>

          {/* Expectation Grid */}
          <div className="w-full flex flex-col border-t border-accent/40 border-b py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {expectations.map((item, i) => (
                <ExpectationItem key={item.number} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Rail (1 Column) */}
        <motion.div 
          ref={railRef as any}
          initial={railInitial}
          animate={railControls}
          className="hidden lg:flex lg:col-span-1 flex-col items-end justify-start h-full pt-2"
        >
          <div className="relative flex flex-col items-center gap-6 h-full pb-32">
            <VerticalLabel label="ANTARAGNI '26" color="red" />
            <div className="w-[1px] h-full flex-grow bg-accent" />
          </div>
        </motion.div>

      </GridContainer>
    </section>
  );
}

function ExpectationItem({ item, index }: { item: any, index: number }) {
  const { ref, controls, initial } = useFadeUp(0.1 * index);
  return (
    <motion.div ref={ref as any} initial={initial} animate={controls} className="flex flex-col gap-6">
      {/* Number & Title */}
      <div className="flex flex-col gap-4">
        <span className="text-accent font-serif text-[18px] md:text-[22px] leading-none">
          {item.number}
        </span>
        <EditorialHeading as="h3" variant="number" className="text-foreground normal-case leading-none">
          {item.title}
        </EditorialHeading>
      </div>
      
      {/* Description */}
      <p className="text-muted text-[10px] md:text-[11px] uppercase tracking-[0.15em] leading-[1.8] whitespace-pre-line">
        {item.description}
      </p>
    </motion.div>
  );
}
