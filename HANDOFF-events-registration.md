# Handoff — Antaragni '26 Events-Registration Website Rebuild

## 1. Project Instructions

Verbatim project instructions configured for this project ("Antigravity-learning"):

> OLD Antaragni folder- OLD website code files
> CA - new ca portal files
> antaragni26 - new ca portal files
>
> you can reference them for any code structure query, what architecture to use kind of stuff, for design we will be makind sometihng new, later instruction will be in chat
>
> dont make any changes to any of them except antaragni26, and for that i also i suggest you to make a separate folder for "events-registration", as we will be working on this website for now, so copy files to it from old antaragni or antaragni26 folder, chose whichever is convenient to you
>
> Follow these instructions when working in this project.

Additional instructions given in chat (first message, paraphrased tightly):

- Keep most of the backend the same; design and code a premium, professional frontend for the events-registration website.
- Add missing pages: (1) first landing page = intro page for Antaragni with good animation / 3D model animation / cursor animation; (2) navbar with options to move to Roadtrips or Events site; (3) a landing page for each of those with a little intro, old gallery or artists; (4) a section/subpage to select your event/roadtrip.
- Inside each event/roadtrip page, the theme should match that event/roadtrip; keep whatever content is on current pages but change the frontend.
- The registration page on the events website needs its frontend redone too.
- Can host locally to inspect the current site; a `.env` file was already placed in the CA portal folder (there is also one in the events-registration app — see §7).
- Design expectation: "some good design style, some good animation throughout the website; my recommendation: a mix of Spotify Wrap / Lollapalooza."

No uploaded reference docs. The reference material is the mounted folder itself (see §7 for structure).

## 2. Goal & Scope

**Goal:** Rebuild the public **events-registration website** for Antaragni '26 (61st edition of IIT Kanpur's annual cultural festival, previously events.antaragni.in) inside the `antaragni26` turborepo, with a completely new premium/animated frontend while keeping the existing Firebase backend behavior unchanged.

**Users:** College students across India who register (individually or as teams) for on-campus competitions ("Events") and for travelling city-prelim battles ("Roadtrips": rock, rap, beatboxing, comedy, DJ, nationals finale). Secondary users: signed-in participants managing their profile/team/competition registrations via a dashboard.

**In scope:** `antaragni26/apps/events-registration` only — intro landing page, events landing/listing, roadtrips landing/listing, per-event and per-roadtrip detail pages, registration flow (profile completion + per-roadtrip forms), dashboard, header/footer/nav, design system, animations.

**Out of scope / do not touch:** `OLD_ANTARAGNI/` (antaragni25 code, reference only), `CA_FILES/` (reference only), other apps in `antaragni26` (`ca`, `web`, `antaragni_main`, `docs`), all shared `packages/*` (read/consume but don't modify — one exception noted in §6 about `packages/firebase` differences that already existed). Backend logic changes are out of scope ("port as-is" was explicitly chosen).

## 3. Key Decisions & Constraints

**User-approved decisions (asked via structured questions, answered explicitly):**

1. **Animation tech: GSAP + custom WebGL shaders** (not full three.js/react-three-fiber, not CSS-only). Reason: premium feel, fast load, works on low-end phones. `@react-three/fiber` and `raw-loader` were dropped from dependencies.
2. **Visual direction: Hybrid** — dark neon Spotify-Wrapped base sitewide; poster-collage/festival energy with per-event theming on detail pages.
3. **Scope strategy: full site skeleton first**, then iterative polish with the user.
4. **Backend: port as-is** — auth, Firestore reads/writes, registration form logic unchanged; only the UI layer is new. (The alternative offered — consolidating the 6 duplicated roadtrip registration components into one configurable form — was declined for now; it's a good future refactor.)

**Design system (implemented in `src/app/globals.css`):**

- Colors: background `#0a0612` (near-black violet), foreground `#f4f1fa`, primary `#c7f441` (electric lime), secondary `#ff6ec7` (hot pink), accent `#7c3aed` (electric violet). Extra CSS vars: `--lime`, `--pink`, `--violet`, `--orange: #ff8a3d`, `--cyan: #4dd8ff`.
- Tokens are overridden via a `@theme` block + `:root` block AFTER the imports of `@repo/tailwind-config` and `@repo/ui/styles.css`, so all ported components using `text-primary`, `bg-background`, `font-title`, etc. re-skin automatically (old theme was gold `#ffd700` on `#1a202c`).
- Fonts: **Unbounded** (display) + **Space Grotesk** (body) via `next/font/google`. **Critical trick:** they are mapped onto the shared variable slots `--font-rakkas` and `--font-inter` respectively, because `@repo/tailwind-config/shared-styles.css` uses `@theme inline` (which may inline `var(--font-rakkas)` into compiled `font-title` utilities), so overriding the variable name itself is the bulletproof path.
- Utility classes defined: `.text-gradient`, `.text-gradient-pink`, `.text-stroke`, `.text-stroke-lime`, `.glass`, `.chip`, `.btn-festival` (violet→pink gradient pill), `.btn-lime`, `.btn-ghost`, `.marquee-track` (+ `@keyframes marquee-x`, translateX(-50%) with duplicated content), `.grain-overlay` (SVG feTurbulence data-URI film grain), `.glow-card` (radial hover glow via `--mx`/`--my`), `.eyebrow`. Custom cursor enforced with `cursor: none` on fine pointers only.
- Per-category gradients (`CAT_THEME`, duplicated in `/events` page and `/events/[slug]` page — keep in sync): Performing Arts `#7c3aed→#ff6ec7`, Literary Arts `#4dd8ff→#7c3aed`, Media Arts `#ff8a3d→#ff6ec7`, Visual Arts `#4dd8ff→#c7f441`, Personality `#ff6ec7→#ff8a3d`, Fashion `#ff6ec7→#7c3aed`, Special Event `#c7f441→#4dd8ff`.
- Per-roadtrip themes (`TRIP_THEME`, in `/roadtrips` page and `/roadtrips/[slug]` page): BattleUnderground/bug-rap/bug-beatboxing `#ff8a3d→#e11d48`, synchro `#4dd8ff→#7c3aed`, comickaun `#c7f441→#ff8a3d`, junoon `#e11d48→#7c3aed`, djwar `#7c3aed→#4dd8ff`, nationals `#c7f441→#ff6ec7`.

**Stack / monorepo:**

- Turborepo (npm workspaces), app at `antaragni26/apps/events-registration`. Next.js **16.2.9** (matches installed root; old app was 15.4.2), React **^19.2.0**, Tailwind **v4** via `@tailwindcss/postcss` and `@repo/tailwind-config/postcss`. TypeScript 5.
- Deps kept: `gsap` + `@gsap/react`, `embla-carousel(-react)`, `react-hot-toast`, `react-markdown`, `class-variance-authority`, `short-unique-id` (was missing from old package.json but used by register page — added explicitly). Deps dropped: `@react-three/fiber`, `raw-loader`.
- Shared packages consumed: `@repo/firebase` (auth/config/firestore/storage/InitialState), `@repo/store` (zustand: `user {user: FirebaseUser, details: doc|null}`, `loading`, `initialAnimation`, setters), `@repo/ui` (Section, Input, Label/LabelInputContainer, Loader, LenisProvider — smooth scroll via lenis), `@repo/model`, `@repo/tailwind-config`, `@repo/typescript-config`, `@repo/eslint-config`. `@repo/ui` ships prebuilt `dist/` (no plain `build` script; dist is committed).
- `next.config.mjs` rewritten: no webpack/glsl config (shaders are inline TS template strings now); adds `images.remotePatterns` for `firebasestorage.googleapis.com` and `lh3.googleusercontent.com`.
- Dev server pinned to **port 3010** (`next dev --port 3010`) to avoid clashing with other apps.

**Data model / backend contract (unchanged, Firestore):**

- `eventsUsers2025` — one doc per auth uid: `{id: "ANT.XXXXXXXXXX", name, email, phone, whatsapp, gender, address, teamId: "TM.ANT.XXXXXXXXXX", teamName, college, collegeCity, year, fb, insta, isTeamLeader, dateTime, userComps: [{competition, link}]}`.
- `eventsTeams2025` — `{teamName, teamId, college, collegeCity, clubName?, clubEmail?}`.
- Per-roadtrip submission collections via `addDoc`, e.g. `junoon25` (analogous ones for the other roadtrip forms).
- `WebContentsNew` — CMS-ish docs: `events_<slug>` (special case: `events_ritambhara_New`), `new_<roadtripslug>`; each doc has `data: []` items with `flag.content` discriminators (`overview`, `heading`, `comp`, `contacts` for events; `contact`, `sponsor`, `schedule`, `partners` for roadtrips).
- Static data files: `src/data/events.ts` (12 events + `competitions` array + `eventsDetails`), `src/data/roadtrips.ts` (6 roadtrips), `src/data/colleges.ts` (~1068 lines of college options), `src/data/contact.ts`.
- Auth flow: Google sign-in (`firebaseGoogleSignIn`) → `/register` (profile completion, gated by `ProtectedRoute`: no user → `/`, has `details` → `/dashboard`) → `/dashboard`.

**Hard constraints:**

- Never modify `OLD_ANTARAGNI/` or `CA_FILES/`.
- Collection names intentionally left at **2025** (user hasn't asked to bump; flagged to them — see §6).
- User preference: concise, direct communication.

## 4. Current State — What's Been Done

All work is in `antaragni26/apps/events-registration/`. Chronology:

1. **Scaffolded the app** by copying `src/`, `public/`, `types/`, and configs from `OLD_ANTARAGNI/antaragni25/apps/events-registration/` (the antaragni26 app folder was empty except a stale `.next` cache, which was deleted after enabling delete permission). Wrote new `package.json` (§3 deps) and new `next.config.mjs`. `npm install` at repo root (added 147 packages). The app already contained a `.env.local` (Firebase web config).
2. **New design system**: rewrote `src/app/globals.css` (tokens + utilities per §3).
3. **New `src/app/layout.tsx`**: Unbounded + Space Grotesk mapped to `--font-rakkas`/`--font-inter`, new `Cursor`, dark glass-styled `Toaster`, kept `LenisProvider` + `ClientComponent`. Metadata: "Antaragni '26 — Events & Roadtrips | IIT Kanpur", 61st edition.
4. **Rewrote `src/components/clientComponent.tsx`**: keeps `InitialState document="eventsUsers2025"`, `Loader type={2}`, `SessionLoader`; replaced old r3f `Background`/`Mandala` with fixed full-screen `Aurora` + `.grain-overlay`; renders Header/main/Footer.
5. **New FX components in `src/components/fx/`**:
   - `Aurora.tsx` — raw WebGL (no libs) domain-warped fbm shader, 3 color uniforms (default `["#4c1d95","#be185d","#365314"]`), mouse parallax, vignette, DPR-capped, 0.6 resolution scale, pauses on hidden tab, respects `prefers-reduced-motion`, single-triangle fullscreen.
   - `Cursor.tsx` — lime dot + lagging ring (gsap quickTo), expands on interactive elements, shows label from `data-cursor-text` (e.g. "GO", "ENTER", "OPEN"), disabled on coarse pointers.
   - `Marquee.tsx` — duplicated-content infinite marquee, `duration`/`reverse`/`pauseOnHover` props.
   - `Reveal.tsx` — `Reveal` (ScrollTrigger stagger of children) and `RevealTitle` (per-word clip reveal).
6. **Rewrote `Header.tsx`** (kept all auth logic: `firebaseGoogleSignIn` → push `/register`, `firebaseLogout`, profile dropdown w/ click-outside, scrolled state): floating glass pill nav, wordmark "ANTARAGNI'26", links Home/Events/Roadtrips, lime Sign-in button, animated burger + full-screen mobile overlay with staggered big links; body scroll locked while open.
7. **Rewrote `Footer.tsx`**: marquee strip ("Antaragni '26 ✦ IIT Kanpur"), 3-column grid (about, Explore links incl. antaragni.in + ca.antaragni.in, Connect socials + events@antaragni.in), credits bar.
8. **New home page `src/app/page.tsx`** (client): Hero (letter-stagger GSAP intro on "ANTARAGNI" with alternating gradient/stroke letters, eyebrow "IIT Kanpur · 61st Edition · October 2026", scroll-scrub parallax fade, CTAs), rotated lime marquee Band (Music/Dance/…/EDM), Portals section (two 480px cards → /events and /roadtrips with duotone gradients + hover), About with GSAP `Counter` stats (60+ years, 300+ colleges, 40+ competitions, 15+ roadtrip cities), Legacy section (photo marquee from `/roadtrips/gallery-junoon/*` + `/events/*` images, reverse artist-name marquee: Sunidhi Chauhan, Amit Trivedi, Farhan Akhtar, Mohit Chauhan, KK, Javed Ali, Nucleya, The Local Train, Shaan, Salim–Sulaiman — **unverified list, see §6**), then ported `<Contact />` (renders `data/contact.ts` via `contact-card`).
9. **New `src/app/events/page.tsx`**: hero "PICK YOUR ARENA", sticky category filter pills (derived from data), 3-col card grid with per-category gradient duotone + index numbers, marquee CTA strip linking `/dashboard`.
10. **New `src/app/roadtrips/page.tsx`**: hero "ANTARAGNI ON TOUR", 3-step "how it works" glass cards, 6 themed trip cards (nationals card spans full width).
11. **Restyled `src/app/events/[slug]/page.tsx`**: kept `getSingleDoc("WebContentsNew", ...)` fetch (incl. ritambhara special case); new hero with breadcrumb chip, category-gradient title from `CAT_THEME`. `EventDetails.tsx`: tab bar → lime pill segmented control (logic untouched; MnM hides Competitions tab).
12. **Restyled `src/app/roadtrips/[slug]/page.tsx`** via targeted patches (all Firestore parsing, registration-form switch, BattleUnderground split page kept): added `TRIP_THEME`, new layered hero (bg image + duotone + chip + scroll cue), gradient PageSection headings, rounded-3xl split cards.
13. **Restyled `src/app/register/page.tsx`**: heading → "Claim Your ID" gradient + eyebrow, container → `.glass rounded-3xl`, submit → `.btn-festival "Complete Registration"`. All form state/validation/Firestore logic untouched.
14. **Restyled `src/app/dashboard/page.tsx`**: personalized heading ("Hey, {firstName}"), Antaragni ID chip, lime pill tabs. Child components (Profile, Team, Registrations, AvailableCompetitions) untouched — they inherit the new tokens.
15. **Stubbed `src/components/Background.tsx`** to `return null` (its r3f/three/glsl imports would fail typecheck after deps removal). `Mandala.tsx`, `LandingPage.tsx`, `Events.tsx`, `Overview/Guidelines/Competitions/Contacts`, `particles/*.glsl`, 6 roadtrip `*_registration.tsx` all remain (registration forms are actively used by roadtrip pages).
16. **Build fixes**: (a) added `baseUrl: "."` + `paths` for `react`/`react-dom` types in app `tsconfig.json` to fix duplicate `@types/react` JSX errors (root override pins 18.3.3 but app+ui have nested 19.2.17); (b) appended `declare module "splitting";` to `types/declarations.d.ts` (used by `About.tsx`).
17. **Verified**: `next build` passes (with fonts temporarily stubbed due to sandbox offline — then restored); routes `/`, `/_not-found`, `/dashboard`, `/events`, `/events/[slug]`, `/register`, `/roadtrips`, `/roadtrips/[slug]` compile; dev server on :3010 returns 200 with no error boundary on all 8 routes tested (incl. `/events/dance`, `/roadtrips/junoon`, `/roadtrips/BattleUnderground`).

**Tried and rejected/avoided:** full three.js hero (bundle/asset cost — user chose GSAP+shaders); consolidating the 6 roadtrip forms (user chose port-as-is); `raw-loader` glsl pipeline (Next 16 Turbopack doesn't use webpack config — shaders inlined as TS strings instead); running Chrome-based visual checks (sandbox dev server unreachable from user's browser).

## 5. The Plan — What's Next

1. **Visual QA pass on a real browser** (highest priority). Nothing has been *seen* rendered — only SSR/build verified. Run `npm run dev` (repo root or app dir), open http://localhost:3010, review every page desktop + mobile. Expect nits: hero letter-spacing at small widths, marquee speeds, cursor label size (`text-[3.5px]` scaled 3.2×), duotone opacity over some photos, sticky filter bar overlapping the fixed header at some widths.
2. **Polish iteration with the user, page by page** (they explicitly want "full skeleton first, then polish iteratively"). Ask which page first.
3. **Content passes**: replace the guessed past-artists list with the official one; real fest dates (currently "October 2026" placeholder); update `data/contact.ts` team contacts for 2026; refresh gallery images (currently reusing junoon gallery + old event photos); update stats numbers if the fest team wants different claims.
4. **2026 data migration decision**: bump Firestore collection names (`eventsUsers2025`→`...2026`, `eventsTeams2025`, `junoon25`, etc.) once the user confirms — requires matching Firestore rules changes on their side. Also the `WebContentsNew` docs must exist for '26 content.
5. **Registration forms redesign (deeper)**: the 6 roadtrip `*_registration.tsx` components got only token-level restyling; consider the declined-for-now consolidation into one configurable form + nicer multi-step UX on `/register`.
6. **Missing-from-old-site extras the user mentioned**: possible "old gallery or artists" subsections on the events/roadtrips landing pages (a basic version exists on home only); rulebook link is commented out in navLinks — ask if needed.
7. **Performance/a11y sweep**: Aurora on low-end devices (already 0.6× res), `prefers-reduced-motion` coverage for GSAP animations (only Aurora respects it so far), image `sizes`, keyboard focus states (custom cursor hides native affordances).
8. **Deployment**: not discussed at all — hosting target, domain (events.antaragni.in), CI, env management. Ask the user.

## 6. Open Questions & Gotchas

- **Firestore collections still say 2025.** Intentional (port-as-is), but a live '26 season needs new collections + security rules. User was told; awaiting their call.
- **Past-artists list on the home page is from model memory, not verified.** User was explicitly asked to swap in the accurate lineup. Don't present it as fact.
- **`next build` requires internet once** (Google Fonts download for Unbounded/Space Grotesk). In offline/sandboxed environments the build fails at font fetch; dev mode degrades gracefully to fallback fonts with warnings. If this becomes a problem, self-host via `next/font/local` (no suitable font files exist in the repo — `Resources/fonts/Bodoni_Moda` is empty).
- **Duplicate `@types/react` landmine**: root `package.json` has `overrides: {"@types/react": "18.3.3", "@types/react-dom": "18.3.0"}` while this app and `packages/ui` carry nested 19.2.17. Fixed locally via tsconfig `paths` pinning `react`/`react-dom` to the app's own copy. If someone reinstalls or dedupes node_modules, JSX type errors ("'Label' cannot be used as a JSX component") may reappear — the tsconfig fix is the remedy.
- **`@theme inline` in `@repo/tailwind-config`** may inline token values into compiled utilities. That's why fonts hijack the `--font-rakkas`/`--font-inter` variable names and why the app's globals re-declare tokens in both `@theme` and `:root`. If a token override ever "doesn't take", this is why. New bespoke components use raw CSS vars (`var(--lime)` etc.) which always work at runtime.
- **`CAT_THEME` and `TRIP_THEME` are each defined twice** (listing page + detail page). Keep in sync or extract to `src/data/themes.ts`.
- **Legacy dead files still present** (typechecked but unused): `Mandala.tsx`, `LandingPage.tsx`, `Events.tsx`, `particles/*.glsl`, stubbed `Background.tsx`. Safe to delete; deletion in the original environment required an explicit permission grant (`allow_cowork_file_delete`).
- **`Bug-beatboxing`/`bug-rap` slugs** are reachable only via the BattleUnderground split page (not in `data/roadtrips.ts` grid) — preserved old behavior.
- **Old site behaviors preserved**: register page validates 10-digit phone/WhatsApp; team dropdown built from `eventsTeams2025` filtered by college; "Other" college/team flows; club name/email required if team leader. Don't "fix" these without asking.
- **Header "Rulebook" link** is commented out (was commented out in old code too). Ask user if it returns for '26.
- **events.antaragni.in is fully client-rendered** — WebFetch returns only meta tags; use a real browser if the old live site must be inspected.
- The sandbox used previously killed background processes between shell calls and blocked arbitrary outbound network (npm registry allowed; fonts.gstatic.com blocked) — irrelevant on a normal dev machine but explains verification approach above.

## 7. Assets & References

**Live sites (old/current generation):**
- https://events.antaragni.in/ — current events site being replaced (client-rendered Next.js; title "Events Registration Antaragni"; meta: "The 60th edition… A rebirth of culture.")
- https://ca.antaragni.in/ — current CA portal (user pasted this twice, once labeled "current main antaragni"; the main site is https://antaragni.in, used in the new footer)

**Repo layout (mounted folder root = `Antigravity-learning/`):**
- `antaragni26/` — the active turborepo. Apps: `antaragni_main`, `ca` (working reference app), `docs`, `events-registration` (**the work product**), `web`. Packages: `eslint-config`, `firebase`, `math`, `model`, `store`, `tailwind-config`, `typescript-config`, `ui`.
- `OLD_ANTARAGNI/antaragni25/` — previous year's full monorepo; `apps/events-registration` is the source everything was ported from. **Read-only.**
- `CA_FILES/` — standalone CA portal source (`src/`, `public/`). **Read-only.**
- `Resources/` — `fonts/Bodoni_Moda` (empty), `images`, `logos`, `portraits`, `products`, `texture`.
- `HANDOFF-events-registration.md` — this document, saved at repo root.

**Env/secrets (exist, redacted):**
- `antaragni26/apps/events-registration/.env.local` — Firebase web app config consumed by `@repo/firebase` (`src/config.ts`). Present and working; do not commit/print.
- `antaragni26/apps/ca/.env.local` — same-shaped Firebase config for the CA app (user: "i have already put env file in ca portal folder").

**Key in-repo files to read first (fastest ramp-up):**
- `antaragni26/apps/events-registration/src/app/globals.css` (design system)
- `src/components/fx/{Aurora,Cursor,Marquee,Reveal}.tsx` (animation kit)
- `src/app/page.tsx`, `src/app/events/page.tsx`, `src/app/roadtrips/page.tsx` (new pages)
- `src/app/register/page.tsx`, `src/components/{Header,ProtectedRoute,Registrations,AvailableCompetitions}.tsx` (backend contract in action)
- `packages/firebase/index.ts` + `packages/store` (shared state/auth API)
- `src/data/{events,roadtrips,colleges,contact}.ts` (static content)

**External CDNs/services:** Google Fonts (Unbounded, Space Grotesk) at build time; Firebase Auth (Google provider) + Firestore + Storage at runtime; next/image remote patterns allow `firebasestorage.googleapis.com` and `lh3.googleusercontent.com`.

**Run commands:** `npm install` then `npm run dev` at `antaragni26/` root (turbo) or in the app dir → http://localhost:3010. `npm run build` in the app dir for a production check (needs internet for fonts).
