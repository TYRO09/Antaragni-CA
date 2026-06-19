import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ANIMATION_CONFIG } from "./animationConfig";

export function useFadeUp(delay: number = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, ANIMATION_CONFIG.VIEWPORT);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
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
    y: 20,
  };

  return { ref, controls, initial };
}
