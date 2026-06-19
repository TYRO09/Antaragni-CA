# Component Dependency Map

## Page (src/app/page.tsx)
- **Location**: `src/app/page.tsx`
- **Purpose**: Main entry point assembling the entire landing page.
- **Dependencies**: Navbar, HeroSection, SpiritSection, IncentivesSection, ExpectationsSection, FAQSection, SponsorsSection, ContactSection, FinalCtaSection.

---

## Sections

**HeroSection**
- **Location**: `src/components/sections/HeroSection.tsx`
- **Purpose**: Initial landing impact, conveying the festival scale.
- **Dependencies**: GridContainer, EditorialHeading, BodyText, framer-motion.

**SpiritSection**
- **Location**: `src/components/sections/SpiritSection.tsx`
- **Purpose**: Cultural festival legacy and cinematic crowd backdrop.
- **Dependencies**: GridContainer, EditorialHeading, BodyText, MetadataLabel, StatisticBlock, framer-motion, next/image, `assets.ts`, `animations.ts`.

**IncentivesSection**
- **Location**: `src/components/sections/IncentivesSection.tsx`
- **Purpose**: Showcase ambassador rewards (pedestals, certificates, merch).
- **Dependencies**: GridContainer, EditorialHeading, next/image, `assets.ts`.

**ExpectationsSection**
- **Location**: `src/components/sections/ExpectationsSection.tsx`
- **Purpose**: Outline ambassador responsibilities.
- **Dependencies**: GridContainer, EditorialHeading.

**FAQSection**
- **Location**: `src/components/sections/FAQSection.tsx`
- **Purpose**: Accordion list of common questions.
- **Dependencies**: EditorialHeading, framer-motion.

**SponsorsSection**
- **Location**: `src/components/sections/SponsorsSection.tsx`
- **Purpose**: Display past/current sponsors in a grid or marquee.
- **Dependencies**: GridContainer, next/image, `assets.ts`.

**ContactSection**
- **Location**: `src/components/sections/ContactSection.tsx`
- **Purpose**: Team contact cards.
- **Dependencies**: GridContainer, next/image, `assets.ts`.

**FinalCtaSection**
- **Location**: `src/components/sections/FinalCtaSection.tsx`
- **Purpose**: Final push to register.
- **Dependencies**: GridContainer, EditorialHeading, framer-motion.

---

## Shared UI & Layout

**GridContainer**
- **Location**: `src/components/layout/GridContainer.tsx`
- **Purpose**: Enforce global 12-col grid alignment.
- **Dependencies**: None.

**EditorialHeading**
- **Location**: `src/components/ui/EditorialHeading.tsx`
- **Purpose**: Display Bodoni Moda serif typography.
- **Dependencies**: None.

**StatisticBlock**
- **Location**: `src/components/ui/StatisticBlock.tsx`
- **Purpose**: Display animated numbers with red accents.
- **Dependencies**: None.

---

## Development Rules

1. Never redesign approved sections without explicit instruction.
2. Never modify unrelated sections.
3. Update docs after every major change.
4. Record all approved design decisions in `DECISIONS.md`.
5. Record all unresolved issues in `KNOWN_ISSUES.md`.
6. Update `TODO.md` after every completed milestone.
