import { useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ANIMATION_CONFIG } from "./animationConfig";

export function useCounter(endValue: number, duration: number = 2) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, ANIMATION_CONFIG.VIEWPORT);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, endValue, {
        duration: duration,
        ease: "easeOut", // standard ease out for counters
        onUpdate(v) {
          setValue(Math.floor(v));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, endValue, duration]);

  return { ref, value };
}
