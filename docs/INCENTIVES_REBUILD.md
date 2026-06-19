# Incentives Section Rebuild Documentation

## Overview
This document records the architectural changes made to the `IncentivesSection` to implement a luxury exhibition stage design based on the reference architecture.

## Files Modified
- `src/components/sections/IncentivesSection.tsx`

## Architecture Systems

### 1. Pedestal Layout System
Replaced the scattered, absolute-positioned coordinate system with a `grid-cols-4` grid overlaying the full-width pedestal base image. This ensures products sit directly on the platforms and visually grounds them without empty floating spaces.

### 2. Product Scale Hierarchy
Product heights are now strictly controlled using percentage widths applied to their wrappers, keeping them responsive while maintaining exact visual weight ratios:
- **Certificate**: 100% relative baseline (wrapper `w-[90%]`)
- **Pronite Pass**: 72% relative height (wrapper `w-[60%]`)
- **Merchandise**: 105% relative height (wrapper `w-[95%]`)
- **Opportunities**: 82% relative height (wrapper `w-[75%]`)

### 3. Spotlight Tracking System
Implemented a dedicated spotlight layer overlay. A `pointermove` event listener on the stage container tracks mouse movements. Using `requestAnimationFrame` for buttery smooth performance, the listener updates `--mouse-x` and `--mouse-y` CSS variables. These variables drive a pointer-events-none `radial-gradient` that creates a warm, theatrical falloff overlay.

### 4. Grounding Shadow System
Removed faked DOM-based shadows (black blurred elements). Added a tiered CSS `drop-shadow` approach directly to the product wrappers to create depth:
- **Contact Shadow**: `drop-shadow(0px 8px 12px rgba(0,0,0,0.5))`
- **Ambient Depth**: `drop-shadow(0px 25px 60px rgba(0,0,0,0.6))` applied to the inner image wrapper.
- **Hover Enhancement**: `drop-shadow(0px 35px 80px rgba(255,180,90,0.15))` for a subtle golden ambient glow.

### 5. Hover Interaction System
Replaced generic bouncing transforms with subtle, luxury motion:
- `translateY(-8px)` combined with `scale(1.02)`.
- Removed cursor alterations (kept default browser pointer).
- Smooth `duration-500` CSS transitions apply uniformly.

### 6. Responsive Behavior
- Transitioned from hardcoded magic numbers to a pure fluid percentage layout using `grid`.
- Reusable Tailwind gap constants (`gap-2 sm:gap-4 md:gap-6 lg:gap-8`) maintain alignment across `768px`, `1024px`, `1280px`, and `1440px` breakpoints.
- Museum placards scale naturally (`text-[14px] sm:text-[20px] md:text-[26px]`).

### Future Editor Compatibility
The grid-based system replaces brittle absolute coordinate mapping, allowing future visual editors to easily drag-and-drop or inject new product columns into the grid without breaking the entire pedestal alignment.
