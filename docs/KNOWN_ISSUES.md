# Known Issues

## Incentives Section
Status: In Progress
Known Problems:
- Object scaling inconsistency between the varying reward items.
- Pedestal perspective alignment needs refinement to correctly support the reward items without looking disconnected.
- Layout composition not finalized.
Notes: Visual editor planned to allow exact absolute positioning adjustments.

## Spirit Section
Status: Resolved / Monitoring
Known Problems:
- Next/Image container previously collapsed to 0px height due to flexbox cross-axis alignment (`items-center`) lacking an explicit height, causing `overflow-hidden` to hide the image entirely.
- Framer motion `fadeUp` transform override caused the image to drop below its absolute centered position.
Notes: Fixed by explicitly defining height/width percentages and using the `fadeIn` animation variant without `y` translations. Requires rigorous responsive QA on mobile screens.

## Global Assets
Status: Pending
Known Problems:
- Relying on placeholder structures for missing SVG monograms, 3D photorealistic renders, and high-contrast cinematic photography.
Notes: Waiting on asset delivery from design/3D team.
