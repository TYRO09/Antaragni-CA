# Plan A: The Unified Turborepo (The Vercel Standard)

## Overview
This is the industry-standard approach for managing multiple related Next.js applications. Instead of splitting the code into 5 different GitHub repositories, you keep **everything in one single GitHub repository**. You use Turborepo to orchestrate the build system, and Vercel natively handles deploying the 5 separate apps from this single repository.

## Architecture
- **GitHub Repository**: 1 Repository (e.g., `antaragni26-monorepo`).
- **Apps**: `apps/antaragni_main`, `apps/ca`, `apps/events-registration`, `apps/docs`, `apps/web`.
- **Packages**: `packages/ui`, `packages/firebase`, `packages/store`, etc.
- **Vercel Projects**: 5 distinct Vercel Projects, all connected to the *same* GitHub repository.

## How it works (The Execution)
1. **Repository Setup**: You clean up the old `antaragni25` codebase, update dependencies, and rename the root workspace to reflect `antaragni26`.
2. **Vercel Setup**: 
   - Go to Vercel and "Add New Project". Select the `antaragni26-monorepo` GitHub repo.
   - During setup, set the **Root Directory** to `apps/ca`. Vercel will now treat this project specifically as the CA website.
   - Repeat this process 4 more times for the other apps, pointing to their respective `apps/*` directories, assigning them their domains (`ca.x.in`, `events.x.in`, etc.).
3. **Turborepo Magic**: Vercel automatically detects Turborepo. When a developer pushes a change to GitHub, Vercel analyzes the dependency graph. If a commit only touches `apps/ca`, Vercel will build and deploy `ca`, but it will smartly **ignore** the builds for the other 4 apps, saving build time. If you touch `packages/ui`, Vercel builds all 5 apps because they all depend on the UI package.

## Pros (Efficiency & Least Resistance)
- **Highest Efficiency / Zero Configuration**: Vercel and Next.js are built by the same company that makes Turborepo. It works out of the box with zero custom configuration.
- **Instant Local Development**: Developers can run `npm run dev` in the root, and Turborepo will start all 5 apps at once (if needed) and hot-reload changes instantly across the entire ecosystem.
- **Single Source of Truth**: There is only one `packages/ui` folder. You never have to worry about versions drifting out of sync.
- **Atomic Commits**: A developer can change a shared UI component and update the `ca` app to use it in the exact same Pull Request.

## Issues You Can Face (Cons)
- **Repository Size**: The repository can become large, potentially slowing down `git clone` or VS Code search (though usually only an issue at massive enterprise scale).
- **Access Control**: You cannot restrict access easily at the repo level. If a junior developer is hired to work on the `docs` site, they will have read/write access to the `main` and `ca` source code as well.
- **Noisy Git History**: Commits from the Docs team, CA team, and Web team will all be mixed together in a single `git log`.
