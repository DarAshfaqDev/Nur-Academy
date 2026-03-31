# Nur Academy

Nur Academy is a thoughtfully designed Islamic learning platform built with React and Vite. It brings structured, YouTube-powered courses into a focused LMS-style experience with enrollment, progress tracking, notes, certificates, admin controls, and a clean learning flow for students.

The project is currently frontend-first and works fully in the browser, which makes it easy to launch, test, and iterate without waiting for a backend. At the same time, the structure is strong enough to grow into a full production LMS later.

## Why This Project Exists

A lot of valuable Islamic content already exists on YouTube, but it is often difficult to study in an organized way. Nur Academy turns those playlists into course journeys with modules, lesson progression, watch tracking, completion rules, and a more intentional student experience.

The goal is simple: make beneficial knowledge easier to access, easier to follow, and more respectful of how people actually learn.

## Highlights

- Structured Islamic courses built from real YouTube playlists
- Course enrollment with remembered progress per user
- Multi-track course support, including the Qaida course with three study paths
- Lesson completion tracking with manual completion when needed
- Real watch-time tracking when YouTube embedding allows it
- Printable course certificates with a watch-time eligibility rule
- Personal lesson notes saved automatically
- Daily streak tracking
- Admin tools for managing users and custom courses
- Contact and course-request flow for suggesting new YouTube courses
- Optional Hadiya support prompt after course completion

## Current Course Library

The current catalog includes courses across Quran, Arabic, Seerah, Hadith, Family, and Fiqh, including:

- Tajweed-ul-Qira'at Course
- Tajweed Course
- Qaida Course with `Madani Qaida`, `Noorani Qaida`, and `Noorani Basics`
- Mualim ul Quran
- Lisan ul Quran
- Arbi ka Muallim Book 1 to 4
- Aasan Arabic Grammar
- Ilm us Sarf
- Ilm un Nahw
- Short Seerah Course
- Prophetic (SAW) Life
- Prophetic Parenting
- Usool e Hadith
- Sahih Muslim
- Islamic Basics
- Insurance Rulings

Course content is sourced from imported YouTube playlists stored in [`src/data`](src/data), then transformed into modules inside [`src/App.jsx`](src/App.jsx).

## How It Works

### Learning Experience

- Students can browse courses, enroll, and resume where they left off
- Enrolled state is remembered in browser storage
- Qaida supports multiple internal study tracks under one course card
- Lessons can be marked complete manually with a square completion control
- When available, YouTube watch progress is tracked inside the player

### Certificates

- Certificates unlock only after all lessons in a course are completed
- Learners must also reach at least `75%` total watch time across the course
- Certificates can be saved or printed as PDF

### Admin Experience

- A seeded primary admin account exists locally in the browser
- The primary admin can manage users and custom courses from the in-app admin area
- Admin features include user control, role management, blocking, and course management for admin-created content

For security, this repository does not document a public plaintext admin password. On a local copy, use the seeded admin account configured in `src/App.jsx` and the in-app reset flow if you need to set a fresh password in your browser session.

## Tech Stack

- React 18
- Vite 5
- Browser `localStorage` for current data persistence
- YouTube IFrame API for embedded playback and watch tracking
- `html2canvas` and `jspdf` for certificate export

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Vite will usually start the app at:

```txt
http://localhost:5173
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Available Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "vite build --base /nur-academy/ && gh-pages -d dist"
}
```

## Project Structure

```txt
Nur Academy/
├─ public/
├─ scripts/
│  └─ youtube_playlist_import.py
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ Certificate.jsx
│  │  ├─ CertificatePage.jsx
│  │  └─ HadiyaSupportCard.jsx
│  ├─ data/
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## Adding or Updating Courses

Nur Academy is designed so new YouTube courses can be added without rebuilding the whole product architecture.

### Playlist-based workflow

1. Import playlist data into `src/data/`
2. Export a playlist ID and lesson array
3. Create a module builder in [`src/App.jsx`](src/App.jsx)
4. Register the course in the `COURSES` array

Each playlist item follows a simple pattern:

```js
export const MY_PLAYLIST_ID = "PLxxxxxxxxxxxxxxxx";

export const MY_PLAYLIST_ITEMS = [
  { index: 1, youtubeId: "VIDEO_ID_1", duration: "12:34", sourceTitle: "Lesson 1" },
  { index: 2, youtubeId: "VIDEO_ID_2", duration: "08:51", sourceTitle: "Lesson 2" },
];
```

### Import helper

The repository also includes [`scripts/youtube_playlist_import.py`](scripts/youtube_playlist_import.py) to speed up playlist imports and reduce manual work.

## Deployment

### GitHub Pages

The project is already set up for a GitHub Pages-style deployment flow.

```bash
npm run deploy
```

If your repository name is not `nur-academy`, update the base path in:

- [`package.json`](package.json)
- [`vite.config.js`](vite.config.js)

### Future Backend Migration

The current version is intentionally local-first, but it is also a good base for a future backend migration. A next phase could move:

- authentication to a real auth provider
- progress and notes into a database
- certificate records into server-side storage
- course management into a persistent admin backend
- cross-device sync into a proper user account system

## Current Limitations

Because the app is currently browser-based, there are a few important limitations:

- user data is stored per browser, not per cloud account
- progress does not sync across devices
- certificates are generated client-side
- some YouTube videos may not allow embedding on external websites

When YouTube embedding is blocked, Nur Academy falls back gracefully by giving learners a direct YouTube link and a manual completion option.

## Support and Course Requests

If you think a useful YouTube course should be added to the website, you can contact the academy directly:

- Email: `mohdashfaq1416@gmail.com`
- WhatsApp: `+91 7006370956`

This is especially helpful for suggesting new playlists, missing topics, or better course sources.

## Vision

Nur Academy is not just a video directory. The vision is to build an Islamic learning platform that feels calm, respectful, structured, and genuinely useful for students of knowledge.

The current version already offers a strong learning experience on static hosting, and it is well positioned to grow into a more complete LMS over time.
