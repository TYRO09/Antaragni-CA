# Queries and API Mapping (`OLD_ANTARAGNI`)

Because the `packages/firebase` layer is generic, all specific database paths and mutation logic live inside the frontend React components. Here is the exact mapping of where and how the frontend calls the backend.

## 1. `antaragni_main` (The Main Website)
**Pattern:** Purely Read-Only fetching from CMS collections.
- `app/coreteam/page.tsx`: Calls `getSingleDoc('WebContents', 'coreTeam')` and `getSingleDoc('WebContentsNew', 'NEW_coreTeam')`.
- `app/media/page.tsx`: Calls `getSingleDoc` (presumably `WebContents` -> `media`).
- `app/merch/page.tsx`: Calls `getSingleDoc`.
- `app/gallery/page.tsx`: Calls `getSingleDoc`.
- `app/schedule/page.tsx`: Calls `getSingleDoc`.
- `components/Sponsors.tsx`: Calls `getSingleDoc`.

## 2. `events-registration`
**Pattern:** Direct writes bypassing the wrapper for specific events, and generic wrappers for user state.
- **Authentication**: `Header.tsx` uses `firebaseGoogleSignIn` and `firebaseLogout`.
- **Event Registrations**: Components like `Djwar_registration.tsx`, `Bug-rap_registration.tsx`, `Synchro_registration.tsx` bypass the generic wrappers. They import `db` directly and call:
  `addDoc(collection(db, "djwar25"), formData);`
- **User Dashboard**: `Registrations.tsx`, `AvailableCompetitions.tsx`, `Team.tsx` use `updateData` and `queryData` to map the user's UID to their specific registrations.

## 3. `ca` (Campus Ambassador)
**Pattern:** Read/Write gamified dashboard.
- **`components/Tasks.tsx`**: 
  - Reads available tasks: `getAllDocs("tasksCA25")`.
  - Reads user's completed tasks: `queryData("CAsSubmissions25", "id", user?.details.id)`.
  - Submits a task: `addData("CAsSubmissions25", data)`.
- **`components/Leaderboard.tsx`**:
  - Reads top CAs: `getSortedData("CAs25", "points", 20)`.
- **`components/InitialState.tsx`**:
  - Validates session: `firebaseGetUser("CAs25", setUser, setLoading)`. This is critical: the CA app ties your Firebase Auth UID to a document in the `CAs25` collection to fetch your points and college info.

## API / Endpoint Summary
There are **no custom Next.js API Routes** (`app/api/*`) used for database interaction. Everything is Client-Side fetching (or Server Components fetching directly from Firestore via Firebase Admin/Client SDK). This is a purely serverless frontend-to-database architecture.
