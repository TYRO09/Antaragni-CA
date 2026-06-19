import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ANIMATION_CONFIG } from "./animationConfig";

export function useImageReveal(delay: number = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, ANIMATION_CONFIG.VIEWPORT);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: ANIMATION_CONFIG.DURATION * 1.2, // Images can be slightly slower for cinematic feel
          ease: ANIMATION_CONFIG.EASING,
          delay: delay,
        },
      });
    }
  }, [isInView, controls, delay]);

  const initial = {
    opacity: 0,
    scale: 1.04,
    filter: "blur(10px)",
  };

  return { ref, controls, initial };
}
