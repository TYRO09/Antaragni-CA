# Incentives Section Architectural Migration

## Overview
This document records the exact 1-to-1 migration of the standalone Incentives layout into the Next.js `IncentivesSection` component. The migration establishes complete visual parity with the provided source of truth (`style.css` and `script.js`).

## Files Modified
1. **`src/app/globals.css`**
   - Appended the exact standalone CSS classes (`.stage-wrapper`, `.stage-container`, `.item-column`, `.spotlight-overlay`, etc.) to guarantee identical behavior for complex properties like CSS Container Queries (`container-type: size`) and chained `drop-shadow` filters.
   - Stripped original typography/color definitions (`#ffb84d`, `Montserrat`) from `.item-number` and `.item-name` to respect global Next.js theme branding.

2. **`src/components/sections/IncentivesSection.tsx`**
   - Completely replaced the brittle absolute-positioned Tailwind layout with the strict HTML structure of the standalone version.
   - Removed Framer Motion dependencies in favor of the vanilla CSS transition system from `script.js`.
   - Adapted Next.js `<Image />` component optimization to standard `<img />` tags for the products to strictly preserve their CSS relative scale percentages (`height: 100%`, `72%`, `105%`, `82%`).

## Systems Migrated

### 1. Stage Layout Structure & Pedestal System
- Utilized CSS Container Queries (`min(51cqw, 88cqh)`) to dynamically size the product wrapper heights relative to the width of the `stage-container`. 
- Products are grounded using a Flexbox row with `align-items: flex-end`, strictly aligning every image to the baseline pedestal regardless of viewport.

### 2. Product Scaling Hierarchy
Scale logic is applied strictly via inline height attributes on the `<img />` elements, bypassing the Tailwind arbitrary wrapper constraints:
- **Certificate**: `100%` height (Anchor scale)
- **Pronite Pass**: `72%` height
- **Merchandise**: `105%` height
- **Opportunities**: `82%` height

### 3. Lighting & Spotlight System
- Migrated the dual `radial-gradient` overlay from the CSS source of truth.
- Implemented the `requestAnimationFrame` linear interpolation (lerp) tracking loop from `script.js` via a `useRef` hook.
- Translates the entire gradient element `translateX()` for incredibly smooth motion.

### 4. Shadow & Hover Interaction System
- Preserved the complex dual-layer `drop-shadow` filter on products.
- Preserved the nested hover state: `.item-column` lifts and scales while `.item-img` scales independently for a parallax pop.
- Emits the triple-layer warm golden drop-shadow upon hover.

## Exclusions & Preservations
- **Cursor System**: The custom cursor and crosshair from the standalone script were explicitly omitted. The browser's default cursor behavior remains untouched.
- **Typography & Branding**: Maintained the existing Next.js typography (`EditorialHeading`) for the section header. The `item-label` contents inherited Next.js global brand colors (white/red) instead of the standalone orange theme.

## Remaining Differences
None affecting the visual layout of the stage elements. The product grounding, hierarchy scaling, pedestal width locking, and spotlight translation behavior achieve identical visual parity with the provided standalone source of truth.
