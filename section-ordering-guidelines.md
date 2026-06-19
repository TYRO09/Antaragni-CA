# Section Ordering Guidelines

This document establishes the rules for composing and reordering independent section modules on the Antaragni Homepage.

## Current Section Order
1. `<Navbar />` (Sticky/Fixed Global layout)
2. `<HeroSection />`
3. `<SpiritSection />`
*(Future Sections: Incentives, What We Expect, Before You Apply, Contact, Sponsors, Final CTA)*

## Deferred Sections
- **Testimonial Section**: Temporarily removed to accelerate primary conversion-focused sections. May be reintroduced later between `SpiritSection` and `IncentivesSection`.

## Rules for Reordering
1. **Composition Level Only**: Reordering must **only** occur inside `src/app/page.tsx` by moving the `<SectionComponent />` tags. 
2. **Zero Internal Edits**: Do not modify the internal code of a section just because its position changed.
3. **Hierarchy Maintenance**: Ensure the visual flow makes sense contextually, but technically, the stack must always support arbitrary ordering.

## Rules for Adding Sections
1. **Independent File**: Every new section MUST be created as a standalone file inside `src/components/sections/` (e.g., `IncentivesSection.tsx`).
2. **Layout Ownership**: The outermost wrapper of the component MUST be a `<section>` tag containing its own internal `Y-axis` padding (e.g., `py-24 md:py-32`).
3. **No External Margins**: Avoid relying on `mt-` or `mb-` on the section container, as margins can collapse unpredictably when placed next to different components.

## Rules for Removing/Deferring Sections
1. **Safe Deletion**: A section can be temporarily or permanently removed by deleting its `<SectionComponent />` from `page.tsx`.
2. **Preserve Code**: When a section is "deferred" (like Testimonials), do not delete its `.tsx` file from the repository. Leave it in `src/components/sections/` for future reintroduction.

## Best Practices
- Keep components "dumb" to their position on the page.
- Limit cross-section communication. If two sections must share state, lift the state to the `page.tsx` component or use a React Context.
- Standardize top and bottom borders (e.g., `border-t border-white/5`) to naturally visually separate adjacent sections.
