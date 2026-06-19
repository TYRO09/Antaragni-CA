# AI Handoff Document

This file is intended for a new AI model or developer.

---

# IMPORTANT ROADMAP CHANGE
The testimonial section shown in the original design references has been intentionally deferred.
Do NOT implement this section unless explicitly instructed.

Current implementation order:
Hero
↓
Spirit of Antaragni
↓
Incentives
↓
What We Expect
↓
Before You Apply
↓
Contact
↓
Sponsors
↓
Final CTA

The testimonial section may be restored later.

---

# Project Summary
What is being built?
An ultra-premium, brutalist editorial web experience for a collegiate cultural festival named "ANTARAGNI". It functions as a landing page to attract and recruit campus ambassadors.

Why is it being built?
To create a high-impact, prestigious first impression, using cinematic contrasts and dramatic typography to convey exclusivity.

Current progress percentage: 40% (Hero, Spirit, Asset Infrastructure, and Incentives completed).

---

# Read These Files First
1. project-state.md (Current project state and tasks)
2. website-reconstruction-spec.md (Main architectural and design vision)
3. frontend-design-system.md (Design system, typography, colors)
4. asset-manifest.md (Strict rules on what visual assets are allowed)
5. src/assets/registry.ts (Centralized asset path manager)

---

# Current Status
Current Phase: Implementation Phase
Current Milestone: Contact Section V1
Current Build Status: Passing (Build & Lint)
Current Branch: Des_implementation
Current Active Section: Contact Us
Next Immediate Task: Implement Contact Us V1 (layout, typography, structure)

---

# What Has Been Completed
- All markdown specification files outlining the design, implementation, components, and animations have been created.
- Project memory documentation has been set up.
- Fixed ESLint configuration.
- Added `Bodoni Moda` Google font to serve as the main display serif.
- Implemented core reusable typography and layout components.
- Implemented `HeroSection` V1 and `SpiritSection` V1.
- Implemented `IncentivesSection` V1 (Corrected to a unified editorial showcase composition).
- Implemented `ExpectationsSection` V1 (What We Expect).
- Implemented `FAQSection` V1 (Before You Apply).
- Created `public/` directory structure for upcoming assets.
- Implemented strongly-typed `src/assets/registry.ts`.
- Completed Architecture Audit confirming 10/10 modularity for flexible section reordering without layout collapse.

---

# What Is Currently Being Worked On
- The implementation of the remaining sections ("Incentives", "What We Expect", etc.) following the established typographic baseline.

---

# Known Issues
Issue: Missing Visual Assets
Root Cause: Real photographic silhouettes and 3D renders have not been supplied yet.
Status: Open
Fix Recommendation: Continue using the CSS volumetric spotlight and shape placeholders. Do not attempt to generate or import random stock imagery.

---

# Architectural Rules
* Use Next.js App Router.
* Use TypeScript.
* Use Tailwind CSS for styling.
* Use Framer Motion for animations (when implemented).
* No Canvas or WebGL backgrounds.
* No Placeholder Assets (use structural CSS instead of random images).
* No Emoji-Based Design or rounded corners (`border-radius: 0`).
* Stick strictly to `#050505` background and pure white / crimson red typography.
* Implement a binary typography scale: Massive, condensed serif headings (`EditorialHeading`) vs. microscopic, wide-tracked sans-serif metadata (`MetadataLabel`).

---

# Important Decisions
- `Bodoni Moda` is selected as the primary display font.
- Component architecture prioritizes heavily abstracted typography wrappers over inline Tailwind spam for texts, ensuring global consistency.
- Section transitions are dictated purely by negative space (160px+) and hairline dividers (1px `#262626`).

---

# Immediate Next Task
Implement the next sections: "Spirit of Antaragni" and the horizontal "Stats Bar". Re-use the `StatisticBlock`, `EditorialHeading`, and `GridContainer` components created during the Hero V1 build.

---

# Warnings
- DO NOT stray from the defined color palette (Black `#050505`, White, Gray, Red `#D92323`).
- DO NOT use CSS drop shadows (`box-shadow: none`). Volume should come from lighting in the images.
- DO NOT tighten up the spacing. The huge negative space (up to 160px gaps) is mandatory for the premium aesthetic.

---

# Success Criteria
Before moving to full section development, the following must be true:
- The app builds successfully.
- `npm run lint` completes without warnings or hanging.
- Global CSS properly reflects the background color and typography requirements.
