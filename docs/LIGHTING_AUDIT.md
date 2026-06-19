# Cinematic Lighting Audit

## Global Lighting Strategy
- **Shared Environment**: The website exists in a single, dark, atmospheric physical space.
- **Primary Light Source**: A soft, massive volumetric light coming from the top-center/top-left. It casts soft, diffused highlights on objects.
- **Secondary Light Source**: Deep crimson ambient reflections from the "ground" or surrounding walls, injecting energy into the shadows.
- **Scroll Journey**: 
  - Starts with grand, stage-like diffusion (Hero).
  - Cools down to focused, stark minimalism (Expectations).
  - Thickens with atmospheric haze and crowd energy (Spirit).
  - Sharpens into precise, museum-like displays (Incentives).
  - Quiets down for professional neutrality (Sponsors, Contact).
  - Erupts into a warm, emotional climax (Final CTA).
- **Color Strategy**: Base is Near Black. White creates the focal highlights. Crimson acts as the energy/ambient fill. Muted Gold is reserved only for elite prestige moments (if any).

---

## Section Audit

### 1. Hero Section
- **Current Visual State**: Large typography, stats, and a silhouette image.
- **Existing Light Sources**: A static `spotlight.png` image with 5% opacity and `mix-blend-screen`.
- **Missing Depth**: The spotlight is flat. The silhouette feels cut out rather than existing *within* the light.
- **Missing Atmosphere**: Needs volumetric diffusion to feel like the moments before a stage performance begins.
- **Missing Hierarchy**: The light doesn't guide the eye strongly enough to the primary typography.
- **Lighting Opportunities**: Replace the static PNG with a massive, CSS-rendered `AtmosphericHaze` and a `GradientDiffusion` that blooms softly behind the silhouette.
- **Priority**: High (Sets the mood).

### 2. Expectations Section (Why Become Ambassador)
- **Current Visual State**: Minimalist text over a dark background with a diagonal red accent line.
- **Existing Light Sources**: None. Completely flat.
- **Missing Depth**: Typography feels printed on the screen rather than carved out of darkness.
- **Missing Atmosphere**: Needs subtle darkness variation so it doesn't feel like a #000 void.
- **Missing Hierarchy**: The red line and typography compete equally.
- **Lighting Opportunities**: A very faint, almost invisible `AmbientLight` that slightly warms the dark background and provides a soft glow around the text without feeling like a "glow effect".
- **Priority**: Medium.

### 3. Spirit of Antaragni
- **Current Visual State**: Large crowd image with text overlay and statistics.
- **Existing Light Sources**: A 600px white blur with 5% opacity mimicking a spotlight.
- **Missing Depth**: The light feels painted on top of the image rather than interacting with the crowd.
- **Missing Atmosphere**: The festival energy feels dry. It needs haze.
- **Missing Hierarchy**: The crowd image boundaries are masked, but the light doesn't emphasize the center of the crowd.
- **Lighting Opportunities**: Implement `AtmosphericHaze` with a soft crimson base to create a "thick" festival air. Remove the obvious white circle and replace it with a diffused `LightField`.
- **Priority**: High.

### 4. Incentives Section
- **Current Visual State**: Floating reward items with text labels.
- **Existing Light Sources**: None.
- **Missing Depth**: Objects appear to float in a vacuum.
- **Missing Atmosphere**: Lacks the premium, physical feel of a high-end fashion or museum display.
- **Missing Hierarchy**: The eye doesn't know which object to look at first.
- **Lighting Opportunities**: Implement subtle `Spotlight` effects pouring down from above, and faint floor reflections to ground the objects. "Museum lighting."
- **Priority**: High.

### 5. Sponsors Section
- **Current Visual State**: Grids of logos.
- **Existing Light Sources**: None.
- **Missing Depth**: Flat logos on black.
- **Missing Atmosphere**: Intentionally minimal, but currently too stark.
- **Missing Hierarchy**: All logos have equal weight.
- **Lighting Opportunities**: Extremely subtle, neutral `AmbientLight` washing over the grid. Almost invisible.
- **Priority**: Low.

### 6. Contact Section
- **Current Visual State**: Form fields and editorial text.
- **Existing Light Sources**: An inset shadow (`mix-blend-overlay`).
- **Missing Depth**: The form fields feel very digital.
- **Missing Atmosphere**: Needs a human, tactile, editorial feel.
- **Missing Hierarchy**: The form shouldn't glow, but the area should feel lit.
- **Lighting Opportunities**: A soft, wide `GradientDiffusion` that acts as a gentle desk lamp illuminating the work area.
- **Priority**: Medium.

### 7. Final CTA Section
- **Current Visual State**: Large button, silhouette, film grain.
- **Existing Light Sources**: Heavy red and white radial gradients (`blur-[80px]`).
- **Missing Depth**: The gradients are harsh and feel like "effects" rather than physical light.
- **Missing Atmosphere**: It feels like a glowing UI component rather than an emotional climax.
- **Missing Hierarchy**: The light competes with the button instead of focusing on it.
- **Lighting Opportunities**: Rebuild using `AtmosphericHaze` and `LightBeam` to create a warm, cinematic sunrise/climax effect. The light should wrap around the elements, not just sit behind them.
- **Priority**: High.
