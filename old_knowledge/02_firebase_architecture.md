# Firebase Architecture (`OLD_ANTARAGNI`)

The central backend logic for the legacy monorepo is consolidated in `packages/firebase/src`. This package acts as the bridge to GCP/Firestore.

## 1. Initialization (`config.ts`)
The initialization relies purely on environment variables injected into the frontend build.
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  // ...
};
export const auth = getAuth(app);
export const db = getFirestore(app!);
export const storage = getStorage(app);
```
> [!IMPORTANT]
> The same exact environment variables are used across all 5 apps.

## 2. Firestore Wrappers (`firestore.ts`)
Instead of calling Firestore SDK directly in every component, the `packages/firebase` exports generic wrappers:
- `addData(collectionName, data)`: Wraps `addDoc()`.
- `setData(collectionName, id, data)`: Wraps `setDoc()`.
- `getAllDocs(collectionName)`: Fetches an entire collection.
- `getSingleDoc(collectionName, docId)`: Fetches one document.
- `updateData(collectionName, docId, data)`
- `deleteData(collectionName, docId)`
- `queryData(collectionName, searchBy, searchValue)`: Basic exact match query (`==`).
- `getSortedData(collectionName, order, limitTo)`: Used primarily by the CA leaderboard.

## 3. Authentication (`auth.ts`)
Authentication is extensive and supports multiple flows:
- **Email/Password**: `firebaseSignup`, `firebaseLogin`
- **Google OAuth**: `firebaseGoogleSignIn` (Using `signInWithPopup`)
- **Phone OTP**: `firebaseSendOTP`, `firebaseVerifyOTP`, `firebaseLinkPhone` (Includes invisible Recaptcha logic).
- **Session Observer**: `firebaseGetUser(document, setUser, setLoading)` dynamically queries an arbitrary user document based on `auth.currentUser.uid` when auth state changes.

## 4. Storage (`storage.ts`)
- `uploadFile(path, file)`: Uploads a file and returns the DownloadURL.
- `deleteFile(path)`

## Summary
The `packages/firebase` is extremely generic and highly reusable. It does **not** contain business logic (e.g., it doesn't know what a "CA Task" is). All business logic is deferred to the frontend apps. This makes it incredibly easy to migrate.
