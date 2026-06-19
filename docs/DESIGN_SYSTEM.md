# Design System

## Typography
- **Fonts**:
  - Sans Serif: `Helvetica Neue` (var(--font-sans)) used for body text, metadata, and modern structural elements.
  - Serif: `Bodoni Moda` (var(--font-serif)) used for display headings, conveying a luxury, premium editorial feel.
- **Hierarchy**:
  - Display Headings (large, serif, high contrast)
  - Editorial Subheadings (serif, medium contrast)
  - Body Text (sans-serif, muted)
  - Metadata / Small Caps (sans-serif, tracking wide, often red accent)

## Colors
- **Backgrounds**: Pure black / dark (`bg-background`) to create a cinematic canvas.
- **Accents**: Striking Red (`accent`) used for metadata labels, statistics values, and lines to draw attention.
- **Neutrals**: White and off-white (`foreground`) for primary text, with muted grays (`muted`) for secondary copy and borders (`border-white/5`).

## Layout
- **Spacing System**: Section spacing defined as `section` (160px) and `section-sm` (80px) in `tailwind.config.ts`.
- **Grid Structure**: 12-column underlying grid via `GridContainer` component (`grid-cols-2 md:grid-cols-6 lg:grid-cols-12`). Elements often span 5-6 columns to create asymmetrical, balanced editorial layouts.

## Visual Language
- **Aesthetic**: Luxury editorial, premium fashion magazine, cinematic, brutalist.
- **Color Palette**: Monochrome (black and white) with stark Red accents.
- **Imagery**: Immersive environmental backdrops, volumetric spotlights, film grain textures (`mix-blend-screen`), and large-scale atmospheric photography (e.g., concert crowds).

## Animation Language
- **System**: Framer Motion
- **Scroll Behavior**: Viewport-triggered scroll reveals (`scrollReveal` configured for `once: true, amount: 0.2`).
- **Reveal Effects**:
  - `fadeUp`: Smooth cubic-bezier upward fade for typography.
  - `fadeIn`: Subtle opacity transition for background images.
  - `revealMaskBottom`: Clip-path mask reveals (`inset(0 0 100% 0)` to `inset(0)`).
  - `staggerContainer`: Sequential loading of grid elements and list items.
