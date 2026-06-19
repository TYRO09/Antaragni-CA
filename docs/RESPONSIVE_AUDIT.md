# Responsive Stability Audit

## 1. Hero
**Status**: RESOLVED
**Issues Found**:
* Silhouette image used fixed `w-[460px] h-[920px]`, which caused clipping and scaling issues on narrow mobile screens (e.g., 360px).
* Typography wrapping broke on high browser zoom (125%+).
**Fix Strategy**:
* Converted fixed dimensions on the silhouette to relative sizing (`w-[min(460px,100vw)] aspect-[1/2] max-h-[120vh]`).

## 2. Why Become Ambassador (Expectations)
**Status**: RESOLVED
**Issues Found**:
* Diagonal decorative line used fixed width `w-[150px] md:w-[350px]`, causing horizontal overflow on very small devices.
**Fix Strategy**:
* Added `max-w-[calc(100vw-40px)]` for the decorative line.

## 3. Spirit of Antaragni
**Status**: RESOLVED
**Issues Found**:
* "SPIRIT OF ANTARAGNI" heading clipped out of bounds on mobile zoom.
* Stat blocks grid could break on 125% zoom.
**Fix Strategy**:
* Added `max-w-full overflow-hidden` and `break-words hyphens-auto` to the heading.
* Added `min-w-0` to the grid container and the items to enforce flex constraints gracefully.

## 4. Incentives
**Status**: RESOLVED
**Issues Found**:
* Stage platforms overflowed horizontally on 375px because label text lengths forced the flex containers to expand.
**Fix Strategy**:
* Set `.item-column` to `min-width: 0` so flex columns can shrink below content size.
* Modified `.item-name` (e.g. "OPPORTUNITIES") with `word-break: break-word; hyphens: auto;` and reduced letter spacing bounds (`clamp(0.1em, 0.26em, 0.26em)`).

## 5. Sponsors
**Status**: RESOLVED
**Issues Found**:
* "OUR VALUED SUPPORTERS" heading overflowed viewport due to `whitespace-nowrap`.
* Logos used `w-[120px]` with `gap-x-12` (48px) which caused grid overflow on 360px.
**Fix Strategy**:
* Removed `whitespace-nowrap` on heading and applied `clamp` sizing.
* Adjusted gap to `gap-x-6 md:gap-x-16` and used `w-[clamp(80px,25vw,120px)]` for mobile logos.

## 6. Contact
**Status**: RESOLVED
**Issues Found**:
* Editorial frame elements used absolute positioning on the right edge which overlapped content on 125% zoom.
**Fix Strategy**:
* Added `lg:pr-24 xl:pr-32` padding to offset the absolute framing.

## 7. Final CTA
**Status**: RESOLVED
**Issues Found**:
* CTA button padding caused overflow on very small screens.
**Fix Strategy**:
* Adjusted to `px-6 md:px-10` and added `min-w-0 max-w-full`.
