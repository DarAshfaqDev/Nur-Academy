# Nur Academy

Nur Academy is a React + Vite Islamic learning website built to host YouTube-based courses with module-based lessons, watch progress, streak tracking, course completion, and printable certificates.

This project is designed to work well in two stages:

1. Initial static hosting on GitHub Pages
2. Later migration to Railway with a real backend and database

At the moment, the app is fully usable as a frontend-first product. User accounts, notes, progress, streaks, and certificates are stored in the browser so you can launch quickly without a backend.

## What This Project Does

- Hosts Islamic courses using YouTube videos
- Organizes lessons into modules and course pages
- Tracks lesson completion and course percentage
- Tracks daily learning streaks
- Saves personal notes per lesson
- Supports browser-local student login and registration
- Restricts admin access to admin users only
- Generates printable course completion certificates
- Supports real YouTube watch tracking when embedding is allowed
- Falls back to manual completion when a video cannot be tracked or embedded

## Current Real Playlist Courses

The project currently includes real imported playlist data for:

- Noorani Qaida
- Lisan ul Quran

Other courses in the UI can still be used as starter templates until you replace their placeholder lessons with real YouTube content.

## Tech Stack

- React 18
- Vite 5
- Plain React state and browser `localStorage`
- YouTube IFrame API for watch tracking

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The app runs on:

```txt
http://localhost:3000
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Demo Accounts

The app seeds demo accounts automatically in the browser on first load:

- Student: `student@nuracademy.com` / `NurStudent123!`
- Admin: `admin@nuracademy.com` / `NurAdmin123!`

Important:

- These accounts exist only inside the current browser
- If browser storage is cleared, the demo data resets
- This is intentional for GitHub Pages/static hosting

## How Progress and Streaks Work

- Each user has separate browser-local data
- Lesson completion is stored per signed-in user
- Course percentage is based on completed lessons
- Streaks increase when the user completes at least one lesson in a day
- Certificates unlock after all lessons in a course are completed

For real YouTube videos:

- The app uses the YouTube IFrame API
- A lesson auto-completes after 90% watch progress

Fallback behavior:

- If a video cannot be embedded on external websites, the app shows an "Open on YouTube" option
- If tracking is not available, the user can still use the manual `Mark Complete` button

## Important YouTube Limitation

Some YouTube videos or playlists cannot play inside websites because the video owner disables embedding.

When that happens:

- The app cannot force in-site playback
- The user must open the video on YouTube
- Manual completion remains available inside the app

If you want full in-site playback and reliable watch tracking, use videos from a channel that allows embedding.

## Adding a New YouTube Playlist

There are two main ways to add courses:

### Option 1. Replace a placeholder course

This is the easiest approach and is how the current playlist-based courses were added.

Steps:

1. Create a playlist data file inside `src/data/`
2. Export the playlist ID and lesson array
3. Import that file into `src/App.jsx`
4. Create a module builder for that playlist
5. Replace one of the placeholder courses inside the `COURSES` array

Example data file pattern:

```js
export const MY_PLAYLIST_ID = "PLxxxxxxxxxxxxxxxx";

export const MY_PLAYLIST_ITEMS = [
  { index: 1, youtubeId: "VIDEO_ID_1", duration: "12:34", sourceTitle: "Lesson 1" },
  { index: 2, youtubeId: "VIDEO_ID_2", duration: "10:21", sourceTitle: "Lesson 2" },
];
```

### Option 2. Manually add lesson IDs

At the top of `src/App.jsx` there is a built-in guide showing how to replace lesson `youtubeId` values.

You can use:

- A raw YouTube video ID such as `dQw4w9WgXcQ`
- Or a full YouTube URL

Lessons with `youtubeId: "DEMO"` remain placeholders until real video IDs are added.

## Project Structure

```txt
Nur Acadmy/
├─ public/
├─ src/
│  ├─ data/
│  │  ├─ nooraniQaidaPlaylist.js
│  │  └─ lisanulQuranPlaylist.js
│  └─ App.jsx
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## Deployment

### GitHub Pages

This project is already configured for GitHub Pages deployment.

Build/deploy command:

```bash
npm run deploy
```

Important:

- The current deploy script assumes your repository path is `/nur-academy/`
- If your GitHub repository name is different, update both:
  - `package.json`
  - `vite.config.js`

Current deploy script:

```json
"deploy": "vite build --base /nur-academy/ && gh-pages -d dist"
```

### Railway

When you move to Railway later:

- Keep the Vite production base as `/`
- Add a backend API
- Move auth from browser-only mode to real server auth
- Move progress, notes, certificates, and course management into a database
- Issue server-verified certificates instead of browser-generated ones

## Certificates

The app already supports certificate generation for completed courses.

Current behavior:

- Certificate IDs are generated in the browser
- Users can print or save the certificate as PDF

Recommended Railway upgrade later:

- Store certificate records in a database
- Generate server-verified certificate IDs
- Add downloadable certificate verification pages

## Current Limitations

Because this first version is designed for static hosting, the current app uses browser storage instead of a backend.

That means:

- Data is tied to the browser/device
- Admin tools are UI-only and read-only for now
- Certificates are not yet server-verified
- Users cannot sync progress across devices yet

## Recommended Next Steps

For the next phase of the project, the best improvements would be:

1. Add a Railway backend with a database
2. Move authentication to the backend
3. Store courses, playlists, students, notes, and completions in the database
4. Add certificate verification pages
5. Add instructor-managed course creation from the admin side

## Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "vite build --base /nur-academy/ && gh-pages -d dist"
}
```

## Notes for Production Use

This app is a strong first version for:

- launching quickly on GitHub Pages
- demonstrating the learning flow
- validating the course experience
- onboarding early students

For serious multi-user production use, Railway plus a backend database is the right next step.
