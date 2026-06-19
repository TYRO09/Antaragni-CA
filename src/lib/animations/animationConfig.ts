export const ANIMATION_CONFIG = {
  // Luxury cinematic easing, smooth decel (similar to Expo.easeOut or custom GSAP ease)
  EASING: [0.16, 1, 0.3, 1], // Very elegant ease out
  DURATION: 1.2,
  
  // Scroll trigger configuration (Start: top 85%)
  // -15% at the bottom means the element needs to be 15% up from the bottom of the screen to trigger
  VIEWPORT: { once: true, margin: "0px 0px -15% 0px" } as const,
};
