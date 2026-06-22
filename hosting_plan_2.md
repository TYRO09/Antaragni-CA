# Antaragni26 - Hosting & Architecture Strategy (v2)

This document serves as the comprehensive architectural blueprint for the Antaragni26 ecosystem. It is divided into two parts: **Part 1** details the execution plan for migrating to a Multi-Repo architecture, and **Part 2** provides a critical assessment of this plan, including risks, anti-patterns, and recommended alternatives.

---

## PART 1: The Multi-Repo Migration Plan
*(A rewritten, clearer version of the original hosting plan)*

### 1.1 Overview
The objective is to dismantle the existing Antaragni25 Turborepo monorepo into a distributed architecture. The 5 Next.js applications will be separated into individual GitHub repositories, and the shared internal packages will be consolidated into a single packages repository. All apps will deploy to Vercel with custom subdomains, consuming shared code via GitHub Packages.

### 1.2 Target Repositories
The legacy monorepo will be split into 5 application repositories and 1 shared packages repository.

| Application/Folder | Target Domain | New GitHub Repo Name |
|--------------------|---------------|----------------------|
| `antaragni_main` | `x.in` | `antaragni-main` |
| `ca` | `ca.x.in` | `antaragni-ca` |
| `events-registration`| `events.x.in` | `antaragni-events` |
| `docs` | `docs.x.in` | `antaragni-docs` |
| `web` | `web.x.in` | `antaragni-web` |

*(Note: Folders `ca-new` and `demo_site_CA` from the legacy repo will be discarded).*

### 1.3 Shared Packages Strategy (GitHub Packages)
To maintain shared logic across separated apps, the `packages/` directory from the legacy monorepo will be moved to a new repository named `antaragni-packages`.

**Packages to be published as private GitHub Packages:**
- `@repo/ui` (React components, Tailwind, Radix UI, Framer Motion)
- `@repo/firebase` (Firebase initialization & helpers)
- `@repo/store` (State management)
- `@repo/model` (TypeScript interfaces)
- `@repo/tailwind-config`, `@repo/typescript-config`, `@repo/eslint-config` (Shared configs)
- `@repo/math` (Math utilities)

**Distribution Setup:**
- Each package's `package.json` must include `"publishConfig": { "registry": "https://npm.pkg.github.com/" }`.
- App repositories will authenticate using a `.npmrc` file and a GitHub Personal Access Token (`NPM_TOKEN`) to install these dependencies (e.g., `npm install @repo/ui@1.0.0`).

### 1.4 Domain & DNS Configuration (Vercel)
Each app repository will be connected to its own isolated Vercel project.

| Vercel Project | Target Domain | Required DNS Record |
|------------------|---------------|---------------------|
| `antaragni-main` | `x.in` | `A @ 76.76.21.21` + `CNAME www cname.vercel-dns.com` |
| `antaragni-ca` | `ca.x.in` | `CNAME ca cname.vercel-dns.com` |
| `antaragni-events` | `events.x.in` | `CNAME events cname.vercel-dns.com` |
| `antaragni-docs` | `docs.x.in` | `CNAME docs cname.vercel-dns.com` |
| `antaragni-web` | `web.x.in` | `CNAME web cname.vercel-dns.com` |

### 1.5 Migration Phases

**Phase 1: Establish `antaragni-packages`**
1. Create the `antaragni-packages` repository.
2. Port the legacy `packages/*` folders into this repo.
3. Configure GitHub Actions (`.github/workflows/publish.yml`) to automatically `npm publish` whenever a new version tag (e.g., `v1.0.0`) is pushed.

**Phase 2: Establish Application Repositories (x5)**
1. Create 5 separate GitHub repositories.
2. Port the legacy application code to the root of each new repo.
3. Update `package.json` to replace Turborepo workspace links (`"*"`) with strict versioned dependencies (`"^1.0.0"`).
4. Remove monorepo transpile configurations from `next.config.ts` and `tsconfig.json`.
5. Add `.npmrc` for GitHub Packages authentication.
6. Setup CI workflows (`.github/workflows/ci.yml`) for linting, type-checking, and building.

**Phase 3: Vercel & Environment Setup**
1. Import all 5 app repositories into Vercel as new projects.
2. Bind the custom domains and update DNS records.
3. Inject the `NPM_TOKEN` into Vercel Environment Variables so Vercel can pull the private packages during the build step.
4. Move local `.env.local` variables to Vercel's Environment Variables panel.

**Phase 4: Cleanup & Rollback**
1. Verify production stability.
2. Archive the legacy monorepo (rename branch to `antaragni25-monorepo-archive`).
3. If rollback is required, Vercel deployments can be reverted instantly, and the legacy monorepo remains intact.

### 1.6 Environment Variables Checklist
Every app requires the following standard Firebase and infrastructure variables in Vercel:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_ADMIN_PRIVATE_KEY`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `NPM_TOKEN` (Crucial for Vercel to install `@repo/*` packages)

---

## PART 2: Architectural Assessment & Critical Risks

While Part 1 outlines the mechanical steps to split the repository, doing so introduces significant operational overhead. Below is a critical analysis of where the plan can fail, what to avoid, and a highly recommended alternative.

### 2.1 Critical Risks: Where It Can Go Wrong

**A. The "Local Development" Nightmare (DX Downgrade)**
In a monorepo, if you change a button component in `@repo/ui`, the `ca` app instantly hot-reloads to show the change because of local workspace symlinking. 
**In the Multi-Repo plan:** If a developer wants to add a new property to a shared component in `@repo/ui` and use it in `antaragni-ca`, they must:
1. Make the change in `antaragni-packages`.
2. Commit, push, tag, and wait for GitHub Actions to publish `v1.0.1` to GitHub Packages.
3. Go to `antaragni-ca`, run `npm install @repo/ui@1.0.1`.
4. Finally, see the change locally.
*(Workaround: Developers will have to heavily rely on `npm link`, which is notoriously buggy with React hooks and Next.js and severely slows down workflow).*

**B. Versioning and "Dependency Hell"**
When `antaragni-packages` updates a core dependency (like `firebase` or `tailwind-config`), you now have to manually submit 5 Pull Requests across the 5 app repos to bump their `package.json` files to the new version.

**C. CI/CD Fragmentation**
Instead of maintaining one CI/CD workflow, you now have 6 sets of GitHub Actions. Updating a testing standard or a Node version means updating it in 6 different repositories.

### 2.2 What We Should Avoid

- **Avoid Manual Versioning:** If sticking to the multi-repo plan, avoid manually bumping package versions. Use automated tools like Changesets or Semantic Release.
- **Avoid Diverging Configurations:** Splitting repos makes it easy for teams to drift (e.g., `ca` repo uses Tailwind v3, `main` repo upgrades to Tailwind v4). The shared packages repo must strictly enforce its configs to avoid layout breaks.
- **Avoid Hardcoding Secrets:** Avoid checking in `.env.local` (used for local Firestore connections). Always use a secret manager or Vercel's env pulling (`vercel env pull`) for local development to ensure team members securely sync the correct credentials.

### 2.3 The Alternatives

**Alternative 1: Stay with Turborepo on Vercel (Highly Recommended)**
**Vercel actually acquired Turborepo because it is the optimal way to deploy multiple Next.js apps.** 
Instead of splitting the codebase, keep the existing `OLD_ANTARAGNI/antaragni25` structure. 
**How it works:**
- You create 5 Projects in Vercel.
- **All 5 projects point to the exact same GitHub repository.**
- In the Vercel dashboard, you set the "Root Directory" for each project (e.g., `apps/ca` for the CA project).
- Vercel automatically uses **Turborepo's dependency graph** to know when to rebuild. If someone edits `apps/docs`, Vercel intelligently knows *not* to deploy `apps/ca`. 
- **Pros:** Instant local development, atomic commits (update a UI component and the CA app in the same PR), single CI/CD pipeline, no need for GitHub Packages.

**Alternative 2: Git Submodules**
Keep the apps separate, but instead of using GitHub Packages, include `antaragni-packages` as a git submodule inside each app.
- **Pros:** Avoids the npm publishing delay. You pull the latest component code directly.
- **Cons:** Git submodules are notoriously difficult for junior developers to manage, leading to detached HEAD states and sync issues.

**Alternative 3: Monorepo with Nx**
Similar to Turborepo but uses Nx for task orchestration. Not recommended as a pivot right now since you already have Turborepo configured and Vercel natively optimizes for Turbo.

### 2.4 Final Recommendation
If the primary goal of splitting the repos is **Access Control** (e.g., you don't want the Docs team seeing or modifying the Main event code for security/organization), the Multi-Repo plan via GitHub Packages makes sense. However, you must implement tools like **Changesets** for automated semantic versioning of the packages, and **Dependabot** to auto-open PRs in your app repos when a new package is published.

If Access Control is *not* a strict issue, **Alternative 1 (Keeping Turborepo)** is vastly superior for speed, developer experience (DX), and maintenance overhead. Vercel is built from the ground up to support exactly what you had in the legacy monorepo.
