# Changelog

## [0.2.0] - Phase 3 Completion
### Changed
- Refactored `FAQSection`, `SponsorsSection`, and `FinalCtaSection` to utilize the centralized animation framework (`src/lib/animations/`).
- Refactored `HeroSection`, `ExpectationsSection`, `ContactSection` and `IncentivesSection`.
- Eliminated all manual Framer Motion variants scattered across components, ensuring strict consistency with the custom cinematic easing `[0.16, 1, 0.3, 1]`.
- Verified and finalized the Visual Editor Hierarchy for `IncentivesSection` - items are now wrapped in individual `EditableElement`s inside `ProductContainer` logic.
- Standardized UI hooks such as `useFadeUp` and `useReveal` globally.

## [0.1.0] - Phase 2 Completion
### Added
- Centralized motion framework in `src/lib/animations/`.
- Cinematic custom easing constants.
### Fixed
- Responsive grid alignment issues across mobile screens.

## [0.3.0] - Phase 4 Completion
### Changed
- Replaced native `<img>` tags in `IncentivesSection` with `next/image` to optimize Largest Contentful Paint (LCP) and enforce strict, responsive dimension constraints.
- Recovered Visual Editor layout state (`src/config/incentives-layout.ts`) after corrupted `rotate` parameter caused a 404 router crash.
### Added
- Comprehensive SEO metadata including OpenGraph, Twitter Cards, and keywords added to `src/app/layout.tsx`.
- Refactored `themeColor` into Next.js 14 `viewport` export standard.
