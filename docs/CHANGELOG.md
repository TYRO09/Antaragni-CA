# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Created Phase tracking structure (`docs/screenshots/before` & `after`).
- Created autonomous agent protocol tracking files (`CHANGELOG.md`, `PERMISSIONS_REQUIRED.md`).

### Fixed (Phase 1: Responsive Stabilization)
- **Typography:** Applied `clamp()` to `EditorialHeading` and `EditorialSubheading` to prevent text overlap on mobile screens.
- **HeroSection:** Removed negative margin on mobile that caused horizontal overflow.
- **SpiritSection:** Fixed absolute positioning of the crowd image so it spans edge-to-edge on mobile (`w-[100vw]`).
- **IncentivesSection:** Fixed text wrapping collision on pedestals by adjusting font clamps and enforcing `break-word` and `hyphens`.
- **ContactSection:** Fixed tablet column span issues where 12 columns were pushed into an 8-column layout, causing stacking breaks.

### Added (Phase 2: Motion Framework)
- Created `src/lib/animations/index.ts` to export all motion hooks cleanly.
- Refactored `src/lib/animations.ts` to `src/lib/animations/variants.ts` to avoid naming conflicts.
- Implemented and applied `useStaggerHeading` to the HeroSection heading (`ANTARAGNI`).
- Applied `useReveal` to the SpiritSection heading.
- Applied `useFadeUp` to the SpiritSection paragraph.
- Applied `useImageReveal` to the SpiritSection image.
- Applied `useCounter` to the SpiritSection statistic.
