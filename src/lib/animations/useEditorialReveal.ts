import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ANIMATION_CONFIG } from "./animationConfig";

export function useEditorialReveal(delay: number = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, ANIMATION_CONFIG.VIEWPORT);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: ANIMATION_CONFIG.DURATION,
          ease: ANIMATION_CONFIG.EASING,
          delay: delay,
        },
      });
    }
  }, [isInView, controls, delay]);

  const initial = {
    opacity: 0,
    y: 40,
    filter: "blur(12px)",
  };

  return { ref, controls, initial };
}
