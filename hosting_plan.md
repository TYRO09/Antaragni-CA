# Antaragni26 - Monorepo to Multi-Repo Separation Plan

## Overview
Separate 5 Next.js apps from a Turborepo monorepo into independent GitHub repos, each deploying to Vercel with custom subdomains, while sharing common packages via GitHub Packages.

---

## Target Repositories (5 App Repos + 1 Packages Repo)

| App Folder | Domain | New Repo Name |
|------------|--------|---------------|
| `antaragni_main` | `x.in` | `antaragni-main` |
| `ca` | `ca.x.in` | `antaragni-ca` |
| `events-registration` | `events.x.in` | `antaragni-events` |
| `docs` | `docs.x.in` | `antaragni-docs` |
| `web` | `web.x.in` | `antaragni-web` |

**Discard:** `ca-new`, `demo_site_CA`

---

## Shared Packages Strategy: GitHub Packages (Private)

### Packages to Publish
- `@repo/ui` — React component library (Radix UI, Tailwind, motion)
- `@repo/firebase` — Firebase config & helpers
- `@repo/store` — State management (Zustand/Redux)
- `@repo/model` — TypeScript types/interfaces
- `@repo/tailwind-config` — Shared Tailwind config
- `@repo/typescript-config` — Shared TS config
- `@repo/eslint-config` — Shared ESLint config
- `@repo/math` — Math utilities

### Publishing Setup
```json
// Each package's package.json
"publishConfig": {
  "registry": "https://npm.pkg.github.com/"
}
```

### Installation in App Repos
```ini
# .npmrc (in each app repo)
@repo:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

### Vercel Configuration
Add `NPM_TOKEN` (GitHub PAT with `read:packages` scope) as Environment Variable in each Vercel project.

---

## Domain & DNS Configuration

| Domain | Vercel Project | DNS Record |
|--------|----------------|------------|
| `x.in` | `antaragni-main` | A @ 76.76.21.21 + CNAME www cname.vercel-dns.com |
| `ca.x.in` | `antaragni-ca` | CNAME ca cname.vercel-dns.com |
| `events.x.in` | `antaragni-events` | CNAME events cname.vercel-dns.com |
| `docs.x.in` | `antaragni-docs` | CNAME docs cname.vercel-dns.com |
| `web.x.in` | `antaragni-web` | CNAME web cname.vercel-dns.com |

---

## Migration Phases

### Phase 1: Packages Repo (`antaragni-packages`)
1. Create new GitHub repo `antaragni-packages`
2. Copy `packages/*` → repo root `/packages/`
3. Add root `package.json` with workspaces
4. Add GitHub Actions workflow `.github/workflows/publish.yml`:
   - Trigger: version tag push (`v*`)
   - Run: `npm publish` for each package
5. Tag and push `v1.0.0` for all packages

### Phase 2: App Repos (×5)
For each app:
1. Create new GitHub repo (e.g., `antaragni-main`)
2. Copy app folder contents to repo root
3. Update `package.json`:
   ```json
   // Before (workspace)
   "@repo/ui": "*"
   // After (published)
   "@repo/ui": "^1.0.0"
   ```
4. Add `.npmrc` for GitHub Packages
5. Update `tsconfig.json`: Remove `@repo/*` path aliases
6. Update `next.config.ts`: Remove `transpilePackages: ['@repo/*']`
7. Move `.env.local` secrets → Vercel Environment Variables
8. Add CI workflow `.github/workflows/ci.yml` (lint, typecheck, build)
9. Add `vercel.json` if custom config needed

### Phase 3: Vercel & DNS
1. Import each repo as separate Vercel project
2. Configure custom domains in Vercel dashboard
3. Add `NPM_TOKEN` to each project's Environment Variables
4. Update DNS records at registrar
5. Verify SSL certificates provision

### Phase 4: Cleanup
1. Verify all 5 production sites
2. Archive old monorepo (rename to `antaragni25-monorepo-archive`)
3. Delete `ca-new`, `demo_site_CA` folders

---

## Repository Structure (Per App Repo)

```
antaragni-main/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── hooks/
├── public/
├── .github/workflows/ci.yml
├── .npmrc
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vercel.json
└── README.md
```

```
antaragni-packages/
├── packages/
│   ├── ui/
│   ├── firebase/
│   ├── store/
│   ├── model/
│   ├── tailwind-config/
│   ├── typescript-config/
│   ├── eslint-config/
│   └── math/
├── package.json          # root workspace config
├── turbo.json
└── .github/workflows/publish.yml
```

---

## Key File Changes Per App

| File | Change |
|------|--------|
| `package.json` | Replace workspace `*` with versioned deps (`^1.0.0`) |
| `.npmrc` | Add GitHub Packages registry config |
| `tsconfig.json` | Remove `paths` aliases for `@repo/*` |
| `next.config.ts` | Remove `transpilePackages` for `@repo/*` |
| `.env.local` | Move all secrets to Vercel Environment Variables |

---

## CI/CD Workflows

### App Repo CI (`.github/workflows/ci.yml`)
```yaml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, registry-url: https://npm.pkg.github.com }
      - run: npm ci
      - run: npm run lint
      - run: npm run check-types
      - run: npm run build
      - uses: actions/upload-artifact@v4
        if: always()
        with: { name: nextjs-build, path: .next }
```

### Packages Repo Publish (`.github/workflows/publish.yml`)
```yaml
name: Publish Packages
on:
  push:
    tags: ['v*']
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, registry-url: https://npm.pkg.github.com }
      - run: npm ci
      - run: npm run build --workspaces
      - run: npm publish --workspaces
        env: { NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }} }
```

---

## Environment Variables (Vercel)

Each app project needs:
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
FIREBASE_ADMIN_PRIVATE_KEY
FIREBASE_ADMIN_CLIENT_EMAIL
NPM_TOKEN (for @repo/* packages)
```

---

## Timeline Estimate

| Phase | Duration |
|-------|----------|
| Packages repo + publishing | 2-3 hours |
| 5 App repos setup | 5-6 hours |
| Vercel + DNS config | 1 hour |
| Testing & verification | 1-2 hours |
| **Total** | **~10-12 hours** |

---

## Rollback Plan
- Keep monorepo as `antaragni25-monorepo-archive` branch
- Each app repo maintains full history via `git filter-repo` or copy
- Vercel projects can be reverted to previous deployments instantly

---

## Next Steps
1. Create GitHub organization (e.g., `antaragni26`) or use personal account
2. Create `antaragni-packages` repo and publish v1.0.0
3. Create 5 app repos using template
4. Configure Vercel projects
5. Update DNS
6. Archive monorepo