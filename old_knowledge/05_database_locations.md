# Firebase Database Locations (Exact Paths)

By analyzing the source code across the entire legacy monorepo, here are the exact Firestore collections and document IDs used by each application. This maps exactly *where* your data is stored in the cloud.

---

## 1. CMS & Main Content (`antaragni_main`)
All main website content is fetched from two primary collections: **`WebContents`** and **`WebContentsNew`**.

**Collection: `WebContents`**
- `Merch` (Merchandise data)
- `gallery` (Gallery images and links)
- `coreTeam` (Previous iteration of the core team)

**Collection: `WebContentsNew`**
- `applandingpagenew` (Landing page / Hero / About data / Attractions / Stars)
- `sponsorsnew` (Sponsors list)
- `NewQueries` (FAQs or Queries data)
- `NEW_coreTeam` (Current iteration of the core team)
- `schedule` (Festival schedule)
- `events_ritambhara_New` (Specific CMS data for Ritambhara event)
- `events_{slug}` (Dynamic document ID based on the event slug URL)

---

## 2. Event Registrations (`events-registration`)
The event registration app writes user data, teams, and forms directly to the following collections:

**User & Team Management Collections**
- **`eventsUsers2025`**: Stores individual user profiles. It is updated and queried by UID and `teamId`.
- **`eventsTeams2025`**: Stores the created teams for team-based events.

**Individual Event Form Collections**
Each specific event registration form submits data to its own dedicated collection. Based on the code structure, these collections include:
- **`djwar25`**
- **`bugrap25`** (Inferred from Bug-rap_registration)
- **`synchro25`** (Inferred from Synchro_registration)
- **`comickaun25`** (Inferred from Comickaun_registration)
- **`junoon25`** (Inferred from Junoon_registration)
- **`roadtrip25`** (Inferred from Roadtrip_registration)
- **`bugbeatboxing25`** (Inferred from Bug-beatboxing_registration)

---

## 3. Campus Ambassador (`ca`)
The Campus Ambassador portal interacts with gamification and user collections:

**CA User Management**
- **`CAs25`**: Stores the profiles, points, and referral IDs of the Campus Ambassadors. 
  - *Usage:* Queried for leaderboards (`getSortedData("CAs25", "points", 20)`), checked during registration for referrers, and updated when points are awarded.

**CA Tasks & Submissions**
- **`tasksCA25`**: Stores the list of available tasks for the CAs.
  - *Usage:* Fetched entirely using `getAllDocs("tasksCA25")`.
- **`CAsSubmissions25`**: Stores the proof links and completion records submitted by CAs.
  - *Usage:* Queried to show a CA their past submissions (`queryData("CAsSubmissions25", "id", ...)`) and written to when a CA clicks "Submit".

**CA Ideas**
- **`CAsIdeas25`**: Stores feedback or ideas submitted through the CA portal via the `Ideas.tsx` component.
