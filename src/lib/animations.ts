import { Variants } from "framer-motion";

export const EASING = [0.16, 1, 0.3, 1]; // Apple-like smooth cubic-bezier

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: EASING,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: EASING,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

export const revealMask: Variants = {
  hidden: { 
    clipPath: "inset(100% 0 0 0)"
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 1.2,
      ease: EASING,
    },
  },
};

export const revealMaskBottom: Variants = {
  hidden: { 
    clipPath: "inset(0 0 100% 0)"
  },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 1.2,
      ease: EASING,
    },
  },
};

export const lineDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: EASING,
    },
  },
};

// Reusable viewport config to trigger only once at 20% visibility
export const scrollReveal = { once: true, amount: 0.2 };
