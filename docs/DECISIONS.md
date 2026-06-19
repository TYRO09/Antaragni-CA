# Design and Architecture Decisions

## Typography
Decision: Use Bodoni Moda for display serif.
Reason: Achieves the luxury fashion magazine aesthetic required for the brand.
Status: Approved

## Component Architecture
Decision: Create reusable UI primitives (EditorialHeading, BodyText, GridContainer).
Reason: Ensures strict visual consistency across all sections and centralizes styling logic.
Status: Approved

## Animation Framework
Decision: Use Framer Motion for scroll reveals and staggered animations.
Reason: Deep integration with React ecosystem and handles the necessary fade/clip-path animations efficiently.
Status: Approved

## Asset Management
Decision: Use centralized `assets.ts` dictionary.
Reason: Avoids hardcoded image paths across components, allowing easy global swapping when final 3D/photography assets arrive.
Status: Approved

## Spirit Of Antaragni
Decision: Use concert crowd hero image.
Reason: Creates emotional scale and festival energy. Matches the cinematic scale requirement.
Status: Approved

Decision: Apply image as an absolute positioned environmental backdrop instead of a grid-constrained card.
Reason: Prevents a "boxed" content card look and maintains the luxury immersive editorial layout. Edge gradients dissolve the image into the dark background.
Status: Approved
