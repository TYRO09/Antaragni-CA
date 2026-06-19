# System Architecture

## Folder Structure
- `src/app/`: Next.js 14 App Router entry points (`page.tsx`, `layout.tsx`, `globals.css`).
- `src/components/layout/`: Core structural components (`Navbar.tsx`, `GridContainer.tsx`).
- `src/components/sections/`: Modular page sections mapping directly to the landing page flow.
- `src/components/ui/`: Reusable atom/molecule components (`EditorialHeading`, `BodyText`, `StatisticBlock`).
- `src/lib/`: Configuration and utilities (`animations.ts`, `assets.ts`).
- `public/assets/`: Static files (fonts, images, textures).
- `docs/`: Project memory and documentation system.

## Component Hierarchy
The main application shell (`app/page.tsx`) acts as the orchestrator, importing and stacking the modular sections sequentially:
1. `Navbar`
2. `HeroSection`
3. `SpiritSection`
4. `IncentivesSection`
5. `ExpectationsSection`
6. `FAQSection`
7. `SponsorsSection`
8. `ContactSection`
9. `FinalCtaSection`

## Page Composition
The page is composed of independent `<section>` blocks. Each block typically utilizes the `<GridContainer>` to maintain global alignment. Sections manage their own local animations via Framer Motion `whileInView` triggers, ensuring performance and scope isolation.

## Asset Organization
Assets are centralized via the `src/lib/assets.ts` dictionary. This prevents hardcoded paths across disparate components, allowing global swapping of assets (e.g., replacing placeholders with final 3D renders) from a single source of truth.
