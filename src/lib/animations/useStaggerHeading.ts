import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ANIMATION_CONFIG } from "./animationConfig";

export function useStaggerHeading(staggerDelay: number = 0.08, delay: number = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, ANIMATION_CONFIG.VIEWPORT);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: ANIMATION_CONFIG.DURATION,
        ease: ANIMATION_CONFIG.EASING,
      },
    },
  };

  return { ref, controls, containerVariants, childVariants };
}
