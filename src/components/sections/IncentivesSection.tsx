"use client";

import { useRef, useEffect } from "react";
import { EditorialHeading } from "../ui/EditorialHeading";
import { assets } from "@/lib/assets";
import { VisualEditor } from "../editor/VisualEditor";
import { EditableElement } from "../editor/EditableElement";
import { Spotlight } from "../lighting/Spotlight";
import { AmbientLight } from "../lighting/AmbientLight";
import { useReveal, useFadeUp } from "@/lib/animations";
import { motion } from "framer-motion";

export function IncentivesSection() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const stageAreaRef = useRef<HTMLDivElement>(null);

  const { ref: titleRef, controls: titleControls, initial: titleInitial } = useReveal(0.1);
  const { ref: tagRef, controls: tagControls, initial: tagInitial } = useFadeUp(0.3);

  useEffect(() => {
    // 1. Spotlight Lerp Tracking
    let requestRef: number;
    let mouseX = window.innerWidth / 2;
    let currentOffsetX = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
    };

    const tick = () => {
      if (spotlightRef.current) {
        const halfW = window.innerWidth / 2;
        const targetOffsetX = (mouseX - halfW) * 0.5; // reduced movement range for subtler effect
        currentOffsetX += (targetOffsetX - currentOffsetX) * 0.14;
        spotlightRef.current.style.transform = `translateX(${currentOffsetX}px)`;
      }
      requestRef = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handlePointerMove);
    requestRef = requestAnimationFrame(tick);

    // 2. Standalone Intro Animation
    if (stageAreaRef.current) {
      const items = stageAreaRef.current.querySelectorAll('.item-column') as NodeListOf<HTMLElement>;
      items.forEach((item, i) => {
        // Exclude EditableElement wrappers that are inside if they break, but EditableElement passes className
        item.style.opacity  = '0';
        item.style.transform = 'translateY(55px)';
        item.style.transition = 
          `opacity 0.95s ${0.55 + i * 0.14}s cubic-bezier(0.16, 1, 0.3, 1),
           transform 0.95s ${0.55 + i * 0.14}s cubic-bezier(0.16, 1, 0.3, 1)`;

        requestAnimationFrame(() => requestAnimationFrame(() => {
          item.style.opacity   = '1';
          item.style.transform = 'translateY(0)';
        }));
      });
    }

    return () => {
      cancelAnimationFrame(requestRef);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <VisualEditor>
      <section className="relative w-full flex flex-col pt-16 md:pt-24 pb-12 overflow-hidden border-t border-white/5 bg-[#050505] min-h-[90vh]">
        <div className="absolute inset-0 bg-[#050505] -z-10" />
        <AmbientLight color="white" intensity="faint" />

        <EditableElement id="spotlight" className="absolute inset-0 z-5 pointer-events-none">
          <div ref={spotlightRef} className="absolute inset-0 w-full h-full pointer-events-none">
            <Spotlight intensity="focused" position="top" />
          </div>
        </EditableElement>

        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col flex-1 relative z-10">
          
          <EditableElement id="title" className="flex flex-col items-start mb-6 md:mb-12 relative z-10 flex-shrink-0">
            <motion.div ref={titleRef as any} initial={titleInitial} animate={titleControls}>
              <EditorialHeading variant="section" className="text-foreground mb-4 md:mb-6">
                INCENTIVES
              </EditorialHeading>
            </motion.div>
            
            <motion.div ref={tagRef as any} initial={tagInitial} animate={tagControls}>
              <EditableElement id="taglines" className="flex flex-col gap-1 text-accent tracking-[0.2em] text-[13px] md:text-[15px] font-medium">
                <span>RECOGNITION.</span>
                <span>EXPERIENCE.</span>
                <span>GROWTH.</span>
                <span>LEGACY.</span>
              </EditableElement>
            </motion.div>
          </EditableElement>

          <div className="stage-wrapper mt-auto">
            <div className="stage-container">
              
              <EditableElement id="pedestals">
                <img 
                  src={assets.incentives.pedestals} 
                  alt="Exhibition Platforms" 
                  className="stage-base drop-shadow-2xl opacity-90 brightness-[0.85]" 
                />
              </EditableElement>

              <div className="stage-area" ref={stageAreaRef}>
                
                {/* 01: Certificate */}
                <div className="item-column">
                  <EditableElement id="certificate-image">
                    <div className="item-img-wrap">
                      <img 
                        src={assets.incentives.certificate} 
                        alt="Certificate" 
                        className="item-img"
                        style={{ height: "100%" }}
                      />
                    </div>
                  </EditableElement>
                  <EditableElement id="certificate-label" className="item-label">
                    <span className="item-number text-accent">01</span>
                    <span className="item-name text-white/70">CERTIFICATE</span>
                  </EditableElement>
                </div>

                {/* 02: Pronite Pass */}
                <div className="item-column">
                  <EditableElement id="pass-image">
                    <div className="item-img-wrap">
                      <img 
                        src={assets.incentives.pass} 
                        alt="Pronite Pass" 
                        className="item-img"
                        style={{ height: "72%" }}
                      />
                    </div>
                  </EditableElement>
                  <EditableElement id="pass-label" className="item-label">
                    <span className="item-number text-accent">02</span>
                    <span className="item-name text-white/70">PRONITE PASS</span>
                  </EditableElement>
                </div>

                {/* 03: Merchandise */}
                <div className="item-column">
                  <EditableElement id="merchandise-image">
                    <div className="item-img-wrap">
                      <img 
                        src={assets.incentives.merchandise} 
                        alt="Merchandise" 
                        className="item-img"
                        style={{ height: "105%" }}
                      />
                    </div>
                  </EditableElement>
                  <EditableElement id="merchandise-label" className="item-label">
                    <span className="item-number text-accent">03</span>
                    <span className="item-name text-white/70">MERCHANDISE</span>
                  </EditableElement>
                </div>

                {/* 04: Opportunities */}
                <div className="item-column">
                  <EditableElement id="opportunities-image">
                    <div className="item-img-wrap">
                      <img 
                        src={assets.incentives.opportunities} 
                        alt="Opportunities" 
                        className="item-img"
                        style={{ height: "82%" }}
                      />
                    </div>
                  </EditableElement>
                  <EditableElement id="opportunities-label" className="item-label">
                    <span className="item-number text-accent">04</span>
                    <span className="item-name text-white/70">OPPORTUNITIES</span>
                  </EditableElement>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </VisualEditor>
  );
}
