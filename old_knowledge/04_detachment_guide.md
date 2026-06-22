# Legacy Code Detachment & Integration Guide

This document outlines how to safely strip away the old frontend while retaining the backend logic, allowing you to connect the new Antaragni26 frontend to the existing Firebase database.

## 1. Preserving the Backend Core
Since you are following **Plan A (Unified Turborepo)**, you do not need to rewrite the backend. 
- **Action**: Keep the `packages/firebase` and `packages/model` directories exactly as they are.
- **Why**: The legacy code expertly isolates all Firebase logic into `packages/firebase/src`. This means your new frontend can simply import `addData`, `getSingleDoc`, and `auth` directly from `@repo/firebase` without worrying about initialization or config errors.

## 2. Detaching the Old Frontend

### Step 2.1: UI Components vs. Data Logic
The old apps (like `apps/ca` and `apps/events-registration`) heavily mix UI code with Data Fetching code inside their `.tsx` files.
- **Action**: Do not try to reuse the old React components (`.tsx` files). They are tied to old Tailwind classes, old generic UI (`@repo/ui`), and outdated GSAP/animation logic.
- **Strategy**: 
  1. Open the old component (e.g., `OLD_ANTARAGNI/antaragni25/apps/ca/src/components/Tasks.tsx`).
  2. Copy **only the functions** that interact with the database (e.g., `getAllTasks()`, `submit()`).
  3. Paste these functions into your **new frontend** files (e.g., inside a new React Hook or a Server Action).
  4. Build the new UI around these preserved functions.

### Step 2.2: Retaining the Authentication State
The old frontend relies on a global Zustand store (`@repo/store`) and an `InitialState.tsx` wrapper to observe the user's login session.
- **Action**: If you are keeping `@repo/store`, ensure you copy the `InitialState.tsx` component logic into the root layout (`app/layout.tsx`) of your new apps. 
- **Why**: This component calls `firebaseGetUser`, which actively listens for auth changes and fetches the user's document from the database (e.g., from the `CAs25` collection). If you forget this, the new frontend won't know if a user is logged in.

## 3. Integrating with the New Frontend

When you are ready to connect the new frontend (like the cinematic CA website discussed in `findings.md`), follow this workflow:

1. **Setup the Monorepo**: Ensure your new CA app is in `apps/ca` and has `@repo/firebase` in its `package.json` dependencies.
2. **Environment Variables**: Copy the old `.env.local` containing the Firebase API keys into the root of your new CA app.
3. **Write the New UI**: Create your new frontend components and layouts.
4. **Hook up the Data**: 
   - Instead of writing a new fetch logic, simply `import { getAllDocs } from "@repo/firebase"` and call it inside a `useEffect` or Server Component.
   - For form submissions, construct a JSON object matching the loose schema defined in `01_database_schema.md` and pass it to `addData("djwar25", formData)` or whichever collection is needed.

## Summary
The separation of concerns in the legacy codebase is actually very good. Because the backend is abstracted into a shared package (`@repo/firebase`), "detaching" simply means deleting the old `apps/*` folders, generating new `apps/*` folders with your new UI, and importing the old package functions. You don't need to rewrite the database layer.
