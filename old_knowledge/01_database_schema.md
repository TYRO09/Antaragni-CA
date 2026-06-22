# Database Schema & Models (`OLD_ANTARAGNI`)

The legacy monorepo is highly implicit when it comes to database types. It does not enforce a strict structural schema across the board, opting instead to pass raw Firestore `DocumentData` to the frontend components.

## `packages/model`
There are only two strictly defined TS interfaces in the entire `packages/model/index.ts` file:

```typescript
export type ContactItem = {
	name: string;
	contact: number;
	insta: string;
	linkedin: string;
	image: string;
};

export type SponsorItem = {
  name: string;
  image: string;
  url: string;
};
```

## Discovered Collections via Frontend Source Code
By analyzing the React components across the apps, we have deduced the following dynamic schema mapping:

### 1. `WebContents` / `WebContentsNew`
This serves as the primary CMS for the `antaragni_main` app.
- **coreTeam / NEW_coreTeam**: Contains nested `TeamMember` objects.
  - Structure: `{ Id, name: { content: string }, vertical: { content: string }, Email, phone, Linkedin, instagram, facebook, pic: { content: { ref, url } } }`
- **media, merch, queries, gallery, schedule, attractions**: Assumed to contain CMS arrays similar to coreTeam, fetched via `getSingleDoc`.

### 2. Event Registrations (e.g., `djwar25`, `bugrap25`, `synchro25`)
Each event seems to have its own dynamic collection explicitly pushed to from `events-registration`.
- **Form Data Shape** (Dynamic per event):
  ```typescript
  type EventRegistration = {
    "Name": string;
    "Email Id": string;
    "Contact": string;
    "City": string;
    "Alternate Number"?: string;
    // Plus event-specific fields like:
    "Song Link"?: string;
    "Facebook Link"?: string;
    "Instagram Link"?: string;
  }
  ```

### 3. Campus Ambassador (`CAs25`, `tasksCA25`, `CAsSubmissions25`)
The CA app utilizes three main collections for its gamified dashboard:
- **`tasksCA25`**: Stores active tasks for CAs.
  - Structure: `{ desc: string, points: string, deadline: timestamp }`
- **`CAsSubmissions25`**: Stores the proof links submitted by CAs.
  - Structure: `{ taskId, taskDesc, taskPoints, uid, id, name, email, phone, link, college, collegeCity }`
- **`CAs25`**: The Leaderboard user objects.
  - Structure: `{ id: string, name: string, points: number, email, phone, college }`

## Summary
The database is heavily "Schema-on-Read". To detach this, the new frontend must either accept these loosely typed objects, or we must introduce a strict Validation layer (like Zod) when fetching from Firestore in the new frontend.
