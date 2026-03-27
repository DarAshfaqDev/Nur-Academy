import { Component, useState, useEffect, useRef, useCallback } from "react";
import { LISANUL_QURAN_PLAYLIST_ID, LISANUL_QURAN_PLAYLIST_ITEMS } from "./data/lisanulQuranPlaylist";
import { NOORANI_QAIDA_PLAYLIST_ID, NOORANI_QAIDA_PLAYLIST_ITEMS } from "./data/nooraniQaidaPlaylist";

// ══════════════════════════════════════════════════════════════════════════════
//  🎬  HOW TO ADD YOUR YOUTUBE VIDEOS
//
//  1. Open any video from your YouTube course/playlist
//  2. Copy the Video ID from the URL:
//       youtube.com/watch?v=  >>>  dQw4w9WgXcQ  <<<
//  3. Find the lesson below and paste it:
//       youtubeId: "dQw4w9WgXcQ"
//  4. For a playlist set:
//       playlistId: "PLxxxxxxxxxxxxxxxxxx"
//
//  Full URLs also work: youtubeId: "https://youtu.be/dQw4w9WgXcQ"
//  Lessons with youtubeId: "DEMO" show a placeholder until you add the real ID.
// ══════════════════════════════════════════════════════════════════════════════

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  em: "#0B5240", emD: "#073729", emM: "#1A7A5E", emL: "#0F6B52",
  gold: "#C9A84C", goldL: "#E8C46A",
  cream: "#F9F6EF", creamD: "#EDE8DC",
  text: "#1A1A1A", textM: "#4A4A4A", textL: "#7A7A7A",
  border: "rgba(201,168,76,0.2)", borderM: "rgba(201,168,76,0.4)",
  red: "#DC2626", green: "#059669",
  sh: "0 8px 40px rgba(11,82,64,0.14)",
  shG: "0 4px 24px rgba(201,168,76,0.22)",
};

// ─── Global CSS ──────────────────────────────────────────────────────────────
const injectCSS = () => {
  if (document.getElementById("n-css")) return;
  const s = document.createElement("style");
  s.id = "n-css";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Crimson+Pro:wght@400;600;700&family=Nunito+Sans:wght@300;400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Nunito Sans',sans-serif;background:${C.cream};color:${C.text};overflow-x:hidden}
    #root{min-height:100vh}

    @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
    @keyframes pop{0%{transform:scale(0.4) rotate(-8deg);opacity:0}60%{transform:scale(1.15) rotate(2deg)}100%{transform:scale(1) rotate(0);opacity:1}}
    @keyframes slideR{from{transform:translateX(28px);opacity:0}to{transform:translateX(0);opacity:1}}

    .page{animation:fadeUp .4s ease forwards}
    .card{transition:transform .3s,box-shadow .3s;cursor:pointer}
    .card:hover{transform:translateY(-5px);box-shadow:0 18px 50px rgba(11,82,64,0.16)!important}
    .btn{transition:all .2s;cursor:pointer;border:none;font-family:'Nunito Sans',sans-serif;display:inline-flex;align-items:center;gap:6px;font-weight:600;letter-spacing:.01em}
    .btn:hover{filter:brightness(1.08);transform:translateY(-1px)}
    .btn:active{transform:translateY(0)}
    .btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important;filter:none!important}
    .navL{transition:color .2s;cursor:pointer}
    .navL:hover{color:${C.gold}!important}
    .sL{display:flex;align-items:center;gap:9px;padding:9px 13px;border-radius:10px;cursor:pointer;transition:all .2s;font-weight:500;font-size:.86rem;color:${C.textM}}
    .sL:hover{background:rgba(11,82,64,.08);color:${C.em}}
    .sL.on{background:${C.em};color:#fff}
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:${C.creamD}}
    ::-webkit-scrollbar-thumb{background:${C.em};border-radius:3px}
    input,textarea,select{font-family:'Nunito Sans',sans-serif;outline:none;transition:border-color .2s,box-shadow .2s}
    input:focus,textarea:focus,select:focus{border-color:${C.em}!important;box-shadow:0 0 0 3px rgba(11,82,64,.1)!important}
    .overlay{position:fixed;inset:0;background:rgba(0,0,0,.52);backdrop-filter:blur(5px);z-index:1000;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s}
    .badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:999px;font-size:.68rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
    .pbar{height:6px;background:${C.creamD};border-radius:3px;overflow:hidden}
    .pfill{height:100%;background:linear-gradient(90deg,${C.em},${C.gold});border-radius:3px;transition:width .9s ease}
    .tab{padding:11px 18px;border:none;background:none;font-family:'Nunito Sans',sans-serif;font-weight:600;font-size:.82rem;cursor:pointer;transition:all .2s;border-bottom:3px solid transparent;color:${C.textL}}
    .tab.on{color:${C.em};border-bottom-color:${C.em}}
    table{width:100%;border-collapse:collapse}
    thead tr{background:#F9FAFB}
    th{padding:10px 14px;text-align:left;font-size:.7rem;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid #E5E7EB}
    td{padding:12px 14px;border-bottom:1px solid #F3F4F6;font-size:.83rem;vertical-align:middle}
    tr:last-child td{border-bottom:none}
  `;
  document.head.appendChild(s);
};

// ─── localStorage helpers ────────────────────────────────────────────────────
const DEMO_ADMIN_EMAIL = "admin@nuracademy.com";
const DEMO_ADMIN_PASSWORD = "NurAdmin123!";
const DEMO_STUDENT_EMAIL = "student@nuracademy.com";
const DEMO_STUDENT_PASSWORD = "NurStudent123!";
const WATCH_COMPLETE_THRESHOLD = 90;
const WATCH_TICK_MS = 1000;
const YT_API_SRC = "https://www.youtube.com/iframe_api";

const ls = {
  get: (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch { return fb; } },
  set: (k, v)  => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("nur:data"));
    } catch {}
  },
  remove: (k) => {
    try {
      localStorage.removeItem(k);
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("nur:data"));
    } catch {}
  },
};

const K = {
  USERS: "nur_users_v2",
  SESSION: "nur_session_v2",
  DATA: "nur_data_v2",
};
const clearNurBrowserData = () => {
  ls.remove(K.USERS);
  ls.remove(K.SESSION);
  ls.remove(K.DATA);
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const normalizeEmail = (value="") => value.trim().toLowerCase();
const pad = (value) => String(value).padStart(2, "0");
const dayKey = (date=new Date()) => `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
const parseDayKey = (value) => {
  if (!value) return null;
  const [year, month, day] = String(value).split("-").map(Number);
  return year && month && day ? new Date(year, month - 1, day) : null;
};
const formatDay = (value, opts={ year:"numeric", month:"long", day:"numeric" }) => {
  const date = parseDayKey(value);
  return date ? date.toLocaleDateString("en-US", opts) : "—";
};
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const chunk = (items, size) => {
  const groups = [];
  for (let index = 0; index < items.length; index += size) groups.push(items.slice(index, index + size));
  return groups;
};
const safeNum = (value, fallback=0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};
const watchKey = (cid, lid) => `${cid}:${lid}`;
const getInitials = (name="Nur Student") =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join("") || "N";
const newUserId = () => `u_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
const defaultStreak = () => ({ count:0, lastDate:null, history:[] });
const defaultWatchState = () => ({ watchedSeconds:0, duration:0, percent:0, completedAt:null, lastViewedAt:null, source:"watch" });
const defaultUserState = () => ({ enrollments:[], progress:{}, notes:{}, streak:defaultStreak(), watch:{}, completions:{} });
const mergeUserState = (raw={}) => ({
  enrollments: [...(raw.enrollments || [])],
  progress: { ...(raw.progress || {}) },
  notes: { ...(raw.notes || {}) },
  streak: { ...defaultStreak(), ...(raw.streak || {}) },
  watch: { ...(raw.watch || {}) },
  completions: { ...(raw.completions || {}) },
});

const hashText = async (value) => {
  const input = String(value);
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const bytes = new TextEncoder().encode(input);
    const digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
  }
  return btoa(unescape(encodeURIComponent(input)));
};

const readAllUserData = () => ls.get(K.DATA, {});
const currentUserId = () => ls.get(K.SESSION, null)?.id || null;
const readCurrentUserData = () => {
  const userId = currentUserId();
  if (!userId) return defaultUserState();
  return mergeUserState(readAllUserData()[userId] || {});
};
const writeCurrentUserData = (updater) => {
  const userId = currentUserId();
  if (!userId) return null;
  const all = readAllUserData();
  const current = mergeUserState(all[userId] || {});
  const draft = clone(current);
  const next = mergeUserState(updater(draft) || draft);
  all[userId] = next;
  ls.set(K.DATA, all);
  return next;
};

const Auth = {
  users: () => ls.get(K.USERS, []),
  session: () => ls.get(K.SESSION, null),
  current: () => {
    const session = Auth.session();
    if (!session?.id) return null;
    return Auth.users().find(user => user.id === session.id) || null;
  },
  isAdmin: () => Auth.current()?.role === "admin",
  signOut: () => ls.remove(K.SESSION),
  ensureUserData: (userId) => {
    const all = readAllUserData();
    if (all[userId]) return;
    all[userId] = defaultUserState();
    ls.set(K.DATA, all);
  },
  ensureSeeded: async () => {
    const existing = Auth.users();
    if (existing.length) {
      existing.forEach(user => Auth.ensureUserData(user.id));
      return existing;
    }

    const [adminHash, studentHash] = await Promise.all([
      hashText(DEMO_ADMIN_PASSWORD),
      hashText(DEMO_STUDENT_PASSWORD),
    ]);

    const seeded = [
      {
        id: "nur_admin_demo",
        name: "Nur Academy Admin",
        email: DEMO_ADMIN_EMAIL,
        role: "admin",
        joinedAt: dayKey(),
        country: "United States",
        language: "English / Arabic",
        passwordHash: adminHash,
      },
      {
        id: "nur_student_demo",
        name: "Nur Demo Student",
        email: DEMO_STUDENT_EMAIL,
        role: "student",
        joinedAt: dayKey(),
        country: "United States",
        language: "English / Arabic",
        passwordHash: studentHash,
      },
    ];

    ls.set(K.USERS, seeded);
    const data = {};
    seeded.forEach(user => { data[user.id] = defaultUserState(); });
    ls.set(K.DATA, data);
    return seeded;
  },
  login: async ({ email, password }) => {
    await Auth.ensureSeeded();
    const normalized = normalizeEmail(email);
    const user = Auth.users().find(entry => entry.email === normalized);
    if (!user) throw new Error("No account found for that email.");

    const passwordHash = await hashText(password);
    if (passwordHash !== user.passwordHash) throw new Error("Incorrect email or password.");

    ls.set(K.SESSION, { id:user.id });
    Auth.ensureUserData(user.id);
    return user;
  },
  register: async ({ firstName, lastName, email, password }) => {
    await Auth.ensureSeeded();
    const normalized = normalizeEmail(email);
    if (Auth.users().some(entry => entry.email === normalized)) {
      throw new Error("An account with that email already exists.");
    }

    const user = {
      id: newUserId(),
      name: `${firstName} ${lastName}`.replace(/\s+/g, " ").trim(),
      email: normalized,
      role: "student",
      joinedAt: dayKey(),
      country: "",
      language: "English / Arabic",
      passwordHash: await hashText(password),
    };

    ls.set(K.USERS, [...Auth.users(), user]);
    const allData = readAllUserData();
    allData[user.id] = defaultUserState();
    ls.set(K.DATA, allData);
    ls.set(K.SESSION, { id:user.id });
    return user;
  },
  updateCurrentProfile: ({ name, email, country, language }) => {
    const session = Auth.session();
    if (!session?.id) throw new Error("You need to sign in first.");

    const cleanedName = name.replace(/\s+/g, " ").trim();
    const normalizedEmail = normalizeEmail(email);
    if (!cleanedName) throw new Error("Please enter your name.");
    if (!normalizedEmail) throw new Error("Please enter your email.");
    const users = Auth.users();
    if (users.some(user => user.id !== session.id && user.email === normalizedEmail)) {
      throw new Error("Another account is already using that email.");
    }

    const nextUsers = users.map(user => user.id === session.id ? {
      ...user,
      name: cleanedName,
      email: normalizedEmail,
      country: country.trim(),
      language: language.trim(),
    } : user);

    ls.set(K.USERS, nextUsers);
    return nextUsers.find(user => user.id === session.id) || null;
  },
};

const DB = {
  enrolled: () => readCurrentUserData().enrollments,
  isEnrolled: (id) => readCurrentUserData().enrollments.includes(id),
  enroll: (id) => writeCurrentUserData(data => {
    if (!data.enrollments.includes(id)) data.enrollments.push(id);
  }),

  progress: (cid) => readCurrentUserData().progress[String(cid)] || [],
  allProgress: () => readCurrentUserData().progress,
  complete: (cid, lid, info={}) => {
    const courseKey = String(cid);
    const lessonKey = watchKey(cid, lid);
    const completedAt = info.completedAt || dayKey();

    const next = writeCurrentUserData(data => {
      if (!data.progress[courseKey]) data.progress[courseKey] = [];
      if (!data.progress[courseKey].includes(lid)) data.progress[courseKey].push(lid);

      const currentWatch = { ...defaultWatchState(), ...(data.watch[lessonKey] || {}) };
      const duration = safeNum(info.duration, currentWatch.duration);
      const watchedSeconds = Math.max(currentWatch.watchedSeconds, safeNum(info.watchedSeconds, currentWatch.watchedSeconds));
      const percent = Math.max(currentWatch.percent, safeNum(info.percent, 100));

      data.watch[lessonKey] = {
        ...currentWatch,
        duration,
        watchedSeconds,
        percent,
        completedAt,
        lastViewedAt: completedAt,
        source: info.source || currentWatch.source || "manual",
      };
    });

    return next?.progress?.[courseKey] || [];
  },

  note: (lid) => readCurrentUserData().notes[lid] || "",
  allNotes: () => readCurrentUserData().notes,
  saveNote: (lid, txt) => writeCurrentUserData(data => { data.notes[lid] = txt; }),

  streak: () => readCurrentUserData().streak,
  touch: () => {
    const today = dayKey();
    const yesterday = dayKey(new Date(Date.now() - 86400000));
    let latest = defaultStreak();

    writeCurrentUserData(data => {
      const current = { ...defaultStreak(), ...(data.streak || {}) };
      if (current.lastDate === today) {
        latest = current;
        return;
      }

      latest = {
        count: current.lastDate === yesterday ? current.count + 1 : 1,
        lastDate: today,
        history: [...new Set([...(current.history || []).slice(-29), today])].slice(-30),
      };
      data.streak = latest;
    });

    return latest;
  },

  watch: (cid, lid) => readCurrentUserData().watch[watchKey(cid, lid)] || defaultWatchState(),
  saveWatch: (cid, lid, patch={}) => {
    let nextWatch = defaultWatchState();

    writeCurrentUserData(data => {
      const key = watchKey(cid, lid);
      const current = { ...defaultWatchState(), ...(data.watch[key] || {}) };
      const duration = Math.max(safeNum(patch.duration, current.duration), current.duration);
      const watchedSeconds = duration > 0
        ? Math.min(duration, Math.max(current.watchedSeconds, safeNum(patch.watchedSeconds, current.watchedSeconds)))
        : Math.max(current.watchedSeconds, safeNum(patch.watchedSeconds, current.watchedSeconds));
      const percent = duration > 0
        ? Math.min(100, Math.max(current.percent, Math.round(watchedSeconds / duration * 100)))
        : Math.max(current.percent, safeNum(patch.percent, current.percent));

      nextWatch = {
        ...current,
        ...patch,
        duration,
        watchedSeconds,
        percent,
        lastViewedAt: patch.lastViewedAt || current.lastViewedAt || dayKey(),
      };
      data.watch[key] = nextWatch;
    });

    return nextWatch;
  },

  courseCompletion: (cid) => readCurrentUserData().completions[String(cid)] || null,
  allCompletions: () => readCurrentUserData().completions,
  finishCourse: (cid, info={}) => {
    const userId = currentUserId() || "USER";
    const completedAt = info.completedAt || dayKey();
    let completion = null;

    writeCurrentUserData(data => {
      const key = String(cid);
      const existing = data.completions[key] || {};
      completion = {
        completedAt: existing.completedAt || completedAt,
        certificateId: existing.certificateId || `NUR-${String(cid).padStart(3, "0")}-${completedAt.replaceAll("-", "")}-${userId.slice(-4).toUpperCase()}`,
      };
      data.completions[key] = completion;
    });

    return completion;
  },
};

// ─── Course Data ─────────────────────────────────────────────────────────────
// Helper builders
const mkLesson = (id, title, ytId, dur, opts={}) => ({
  id, title,
  youtubeId: ytId,       // ← replace "DEMO" with real YouTube video ID
  duration: dur,
  free: opts.free || false,
  description: opts.desc || "",
  resources: opts.res || [],
});
const mkModule = (id, title, icon, desc, lessons) => ({ id, title, icon, description: desc, lessons });
const qaidaLessonTitle = ({ index, sourceTitle }) => {
  const parts = String(sourceTitle || "")
    .split("|")
    .map(part => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const summary = parts.slice(0, 2).join(" / ") || `Noorani Qaida Lesson ${index}`;
  return `Lesson ${pad(index)} - ${summary}`;
};
const QAIDA_MODULE_BLUEPRINT = [
  { title:"Module 1 - Alphabet Foundations", icon:"🔤", desc:"Arabic letters, dots, and joined-letter basics.", range:[1, 8] },
  { title:"Module 2 - Harakat Practice", icon:"📝", desc:"Zabar, zer, pesh, and early reading drills.", range:[9, 19] },
  { title:"Module 3 - Madd and Khada Zabar", icon:"📏", desc:"Madd letters, long vowels, and khada zabar practice.", range:[20, 30] },
  { title:"Module 4 - Khada Zer to Leen", icon:"🌙", desc:"Khada zer, ulta pesh, and leen letters.", range:[31, 40] },
  { title:"Module 5 - Takhti and Tanween", icon:"📘", desc:"Takhti lessons and tanween foundations.", range:[41, 51] },
  { title:"Module 6 - Izhar and Ikhfa", icon:"🎯", desc:"Izhar and ikhfa rules for tanween and noon sakin.", range:[52, 59] },
  { title:"Module 7 - Sukoon and Qalqalah", icon:"✨", desc:"Jazm, sukoon, qalqalah, and final review videos.", range:[60, 68] },
];
const buildQaidaModules = (items) =>
  QAIDA_MODULE_BLUEPRINT.map((section, idx) => {
    const [start, end] = section.range;
    const lessons = items
      .filter(item => item.index >= start && item.index <= end)
      .map(item => mkLesson(
        `l6${pad(item.index)}`,
        qaidaLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 3,
          desc: "Imported from Rasul Academy's Noorani Qaida in Urdu YouTube playlist.",
        }
      ));

    return mkModule(
      `m6${String.fromCharCode(97 + idx)}`,
      section.title,
      section.icon,
      section.desc,
      lessons
    );
  }).filter(section => section.lessons.length > 0);

const lisanLessonTitle = ({ index, sourceTitle }) => {
  if (sourceTitle === "[Private video]") {
    return `Lecture ${pad(index)} - Private video`;
  }

  let cleaned = String(sourceTitle || "")
    .replace(/^\d+-Lecture\s*\(Lisan-ul-Quran-2024\s*\)\s*By Amir Sohail\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  while (/^\(.+\)$/.test(cleaned)) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  cleaned = cleaned.replace(/^[\s\-:]+/, "").trim();

  return `Lecture ${pad(index)} - ${cleaned || "Lisan ul Quran"}`;
};
const LISAN_MODULE_BLUEPRINT = [
  { title:"Module 1 - Foundations", icon:"🗣️", desc:"Course opening lectures and early Quranic Arabic foundations.", range:[1, 9] },
  { title:"Module 2 - Noun Status and Mubtada", icon:"📘", desc:"Irab, diptotes, dual/plural nouns, and nominal sentence starters.", range:[10, 19] },
  { title:"Module 3 - Imperfect Compounds", icon:"🧩", desc:"Descriptive, demonstrative, and additional compound structures.", range:[20, 29] },
  { title:"Module 4 - Nominal Sentence Patterns", icon:"🧠", desc:"Expanded jumlah ismiyyah patterns, emphasis, and negation.", range:[30, 39] },
  { title:"Module 5 - Questions and Verbal Sentences", icon:"❓", desc:"Vocatives, interrogatives, relative nouns, and verbal sentence flow.", range:[40, 49] },
  { title:"Module 6 - Objects and Verb Usage", icon:"⚙️", desc:"Object usage, emphasis, negation, and present verb development.", range:[50, 59] },
  { title:"Module 7 - Jussive, Passive, and Majrurat", icon:"📚", desc:"Jussive and passive forms, commands, and majrurat patterns.", range:[60, 66] },
  { title:"Module 8 - Advanced Patterns and Closing", icon:"🏁", desc:"Past-tense types, mansubat, derived forms, and the final private lecture slot.", range:[67, 72] },
];
const buildLisanModules = (items) =>
  LISAN_MODULE_BLUEPRINT.map((section, idx) => {
    const [start, end] = section.range;
    const lessons = items
      .filter(item => item.index >= start && item.index <= end)
      .map(item => mkLesson(
        `l3${pad(item.index)}`,
        lisanLessonTitle(item),
        item.youtubeId,
        item.duration || "Private",
        {
          free: item.index <= 2,
          desc: item.sourceTitle === "[Private video]"
            ? "This lecture is currently private on YouTube and may not play inside the website."
            : "Imported from Amir Sohail's Lisan ul Quran 2024 YouTube playlist.",
        }
      ));

    return mkModule(
      `m3${String.fromCharCode(97 + idx)}`,
      section.title,
      section.icon,
      section.desc,
      lessons
    );
  }).filter(section => section.lessons.length > 0);

const COURSES = [
  {
    id:1, slug:"learn-quran",
    title:"Learn Quran", titleAr:"تعلم القرآن الكريم",
    instructor:"Sheikh Abdul Rahman", category:"Quran", level:"Beginner",
    rating:4.9, students:3240, price:0, isFree:true,
    badge:"Most Popular", badgeC:C.em,
    thumb:"🕌", color:C.em,
    desc:"Begin your Quran journey. Learn proper pronunciation, basic Tajweed, and read Arabic script from scratch.",
    // ↓ Replace with your actual YouTube Playlist ID
    playlist:"YOUR_PLAYLIST_ID_HERE",
    modules:[
      mkModule("m1a","Module 1 — Arabic Alphabet","ا","Master the 28 Arabic letters",[
        mkLesson("l1a1","Welcome & Course Overview","DEMO","8:30",{free:true,desc:"Introduction to your Quran learning journey. What you will achieve by the end.",res:["Course Syllabus.pdf","Alphabet Chart.pdf"]}),
        mkLesson("l1a2","Letters: Alif to Kha","DEMO","22:15",{free:true,desc:"The first 7 letters with correct mouth positioning.",res:["Letters Worksheet 1.pdf"]}),
        mkLesson("l1a3","Letters: Dal to Sheen","DEMO","19:45",{desc:"Letters 8-14. Practice reading and writing.",res:["Letters Worksheet 2.pdf"]}),
        mkLesson("l1a4","Letters: Sad to Ghayn","DEMO","21:10",{desc:"The emphatic letters unique to Arabic.",res:["Letters Worksheet 3.pdf"]}),
        mkLesson("l1a5","Letters: Fa to Ya — Complete","DEMO","20:30",{desc:"Final letters + full alphabet review.",res:["Complete Alphabet.pdf"]}),
      ]),
      mkModule("m1b","Module 2 — Reading Basics","◌","Vowels, Tanween and joining letters",[
        mkLesson("l1b1","Short Vowels — Fathah, Kasrah, Dammah","DEMO","25:10",{desc:"The three short vowels are the key to reading Arabic.",res:["Vowels Sheet.pdf"]}),
        mkLesson("l1b2","Long Vowels — Alif, Waw, Ya","DEMO","21:30",{desc:"Elongation vowels appear throughout the Quran."}),
        mkLesson("l1b3","Tanween & Sukoon","DEMO","18:00",{desc:"Double vowels and the rest sign.",res:["Tanween Notes.pdf"]}),
        mkLesson("l1b4","Shaddah — The Doubling Sign","DEMO","15:30",{desc:"Shaddah doubles a letter — critical for Quran recitation."}),
        mkLesson("l1b5","Joining Letters — Reading Words","DEMO","27:20",{desc:"Put it all together and start reading Arabic words!",res:["Word Practice.pdf"]}),
      ]),
      mkModule("m1c","Module 3 — Short Surahs","📖","Read & understand short Quranic chapters",[
        mkLesson("l1c1","Surah Al-Fatiha","DEMO","30:00",{free:true,desc:"Recited in every raka'ah. Full Tajweed + tafsir.",res:["Al-Fatiha Tafsir.pdf"]}),
        mkLesson("l1c2","Surah Al-Ikhlas","DEMO","18:30",{desc:"Worth a third of the Quran in reward."}),
        mkLesson("l1c3","Surah Al-Falaq & An-Nas","DEMO","22:00",{desc:"The two Surahs of refuge — morning & evening."}),
        mkLesson("l1c4","Course Review & Certificate Prep","DEMO","15:00",{desc:"Full review + prepare for your certificate.",res:["Final Assessment Guide.pdf"]}),
      ]),
    ],
  },
  {
    id:2, slug:"tajweed-course",
    title:"Tajweed Course", titleAr:"علم التجويد",
    instructor:"Ustadha Maryam Hassan", category:"Quran", level:"Intermediate",
    rating:4.8, students:2180, price:49, isFree:false,
    badge:"Top Rated", badgeC:C.gold,
    thumb:"📖", color:"#1A6B4E",
    desc:"Master the rules of Tajweed. Covers Makharij, Sifaat, Noon Sakinah, Meem Sakinah, and all Madd rules.",
    playlist:"YOUR_PLAYLIST_ID_HERE",
    modules:[
      mkModule("m2a","Module 1 — Foundations","📜","What is Tajweed and why it is obligatory",[
        mkLesson("l2a1","Introduction to Tajweed","DEMO","12:00",{free:true,desc:"History and importance of Tajweed.",res:["Tajweed Rules Summary.pdf"]}),
        mkLesson("l2a2","Why Correct Recitation Matters","DEMO","15:30",{free:true,desc:"Evidence from Quran and Sunnah on beautiful recitation."}),
        mkLesson("l2a3","Introduction to Makharij","DEMO","20:00",{desc:"The 17 articulation points.",res:["Makharij Diagram.pdf"]}),
      ]),
      mkModule("m2b","Module 2 — Makharij & Sifaat","🗣","Articulation points and letter characteristics",[
        mkLesson("l2b1","Makharij of the Throat","DEMO","22:15",{desc:"ء ه ع غ ح خ — six throat letters."}),
        mkLesson("l2b2","Makharij of the Tongue","DEMO","28:40",{desc:"18 letters from 10 tongue positions.",res:["Tongue Positions.pdf"]}),
        mkLesson("l2b3","Sifaat — Letter Characteristics","DEMO","25:00",{desc:"The 17 attributes and their opposites.",res:["Sifaat Card.pdf"]}),
        mkLesson("l2b4","Qalqalah — The Echo Letters","DEMO","18:30",{desc:"قطب جد — five letters with listening exercises."}),
      ]),
      mkModule("m2c","Module 3 — Core Rules","⚖️","Noon Sakinah, Meem Sakinah, and Madd",[
        mkLesson("l2c1","Rules of Noon Sakinah & Tanween","DEMO","30:00",{desc:"Izhaar, Idghaam, Iqlaab, Ikhfaa.",res:["Noon Sakinah Chart.pdf"]}),
        mkLesson("l2c2","Rules of Meem Sakinah","DEMO","22:00",{desc:"Three rules with extensive examples."}),
        mkLesson("l2c3","Rules of Madd — Elongation","DEMO","28:00",{desc:"All Madd types with measurements.",res:["Madd Complete Guide.pdf"]}),
        mkLesson("l2c4","Waqf & Ibtida — Stop & Start","DEMO","20:00",{desc:"Correct pausing and resuming during recitation."}),
        mkLesson("l2c5","Full Recitation Practice","DEMO","25:00",{desc:"Apply all rules to selected passages.",res:["Practice Passages.pdf"]}),
      ]),
    ],
  },
  {
    id:3, slug:"arabic-language",
    title:"Lisan ul Quran", titleAr:"لسان القرآن",
    instructor:"Amir Sohail", category:"Arabic", level:"Intermediate",
    rating:4.9, students:4320, price:0, isFree:true,
    badge:"72 Lectures", badgeC:C.gold,
    thumb:"🗣️", color:"#22577A",
    desc:"A full Lisan ul Quran series covering Quranic Arabic grammar, noun patterns, nominal and verbal sentences, jussive and passive forms, and advanced applied structures.",
    playlist:LISANUL_QURAN_PLAYLIST_ID,
    modules:buildLisanModules(LISANUL_QURAN_PLAYLIST_ITEMS),
  },
  {
    id:4, slug:"seerah-prophet",
    title:"Seerah of Prophet ﷺ", titleAr:"السيرة النبوية",
    instructor:"Sheikh Omar Suleiman", category:"Seerah", level:"All Levels",
    rating:5.0, students:4120, price:0, isFree:true,
    badge:"Free", badgeC:C.em,
    thumb:"🌙", color:C.emD,
    desc:"A comprehensive, moving journey through the blessed life of Prophet Muhammad ﷺ — from birth to passing.",
    playlist:"YOUR_PLAYLIST_ID_HERE",
    modules:[
      mkModule("m4a","Module 1 — Before Revelation","🌅","Arabia before Islam and early life",[
        mkLesson("l4a1","Pre-Islamic Arabia","DEMO","22:00",{free:true,desc:"Social, religious, and political landscape.",res:["Arabia Map.pdf"]}),
        mkLesson("l4a2","Birth of the Prophet ﷺ","DEMO","25:00",{free:true,desc:"The Year of the Elephant and early childhood."}),
        mkLesson("l4a3","Youth & Character (Al-Amin)","DEMO","20:00",{desc:"The trustworthy young man before prophethood."}),
        mkLesson("l4a4","Marriage to Khadijah رضي الله عنها","DEMO","18:00",{desc:"Their blessed marriage and family life."}),
      ]),
      mkModule("m4b","Module 2 — Makkah Period","🕌","Revelation, persecution and migration",[
        mkLesson("l4b1","The First Revelation — Cave Hira","DEMO","28:00",{desc:"The night that changed humanity forever."}),
        mkLesson("l4b2","Early Believers & Opposition","DEMO","24:00",{desc:"First Muslims and the Quraysh's brutal reaction.",res:["Early Muslims.pdf"]}),
        mkLesson("l4b3","Persecution & Migration to Abyssinia","DEMO","26:00",{desc:"When a Christian king protected the Muslims."}),
        mkLesson("l4b4","Year of Sorrow & Isra wal Mi'raj","DEMO","30:00",{desc:"Death of Khadijah and Abu Talib, then the night journey."}),
        mkLesson("l4b5","The Hijra to Madinah","DEMO","25:00",{desc:"The defining migration that marks the Islamic calendar.",res:["Hijra Route Map.pdf"]}),
      ]),
      mkModule("m4c","Module 3 — Madinah Period","⚔️","Building the state and major events",[
        mkLesson("l4c1","Constitution of Madinah","DEMO","22:00",{desc:"An extraordinary social contract between all communities."}),
        mkLesson("l4c2","Battle of Badr","DEMO","28:00",{desc:"313 vs 1000. Divine victory.",res:["Badr Timeline.pdf"]}),
        mkLesson("l4c3","Battle of Uhud — The Lesson","DEMO","26:00",{desc:"A lesson in obedience — why the archers left."}),
        mkLesson("l4c4","The Conquest of Makkah","DEMO","30:00",{desc:"The greatest act of mercy — forgiving all enemies."}),
        mkLesson("l4c5","The Final Sermon & Passing","DEMO","25:00",{desc:"His last words to humanity.",res:["Final Sermon Text.pdf"]}),
      ]),
    ],
  },
  {
    id:5, slug:"aqidah-course",
    title:"Aqidah Course", titleAr:"علم العقيدة",
    instructor:"Sheikh Bilal Philips", category:"Aqidah", level:"Beginner",
    rating:4.8, students:2760, price:59, isFree:false,
    badge:"Essential", badgeC:"#7B3F00",
    thumb:"⭐", color:"#2D6A4F",
    desc:"Establish a firm foundation in Islamic belief. Tawheed, Six Pillars of Iman, and core Islamic theology.",
    playlist:"YOUR_PLAYLIST_ID_HERE",
    modules:[
      mkModule("m5a","Module 1 — Tawheed","☝️","Pure Monotheism — the most important knowledge",[
        mkLesson("l5a1","Introduction to Aqidah","DEMO","15:00",{free:true,desc:"Why Aqidah is the foundation of everything."}),
        mkLesson("l5a2","Tawheed Al-Rububiyyah","DEMO","22:00",{desc:"Oneness of Allah's Lordship."}),
        mkLesson("l5a3","Tawheed Al-Uluhiyyah","DEMO","24:00",{desc:"Oneness in worship — the central message of all prophets."}),
        mkLesson("l5a4","Allah's Names & Attributes","DEMO","26:00",{desc:"What the Names and Attributes mean and do not mean.",res:["99 Names of Allah.pdf"]}),
      ]),
      mkModule("m5b","Module 2 — Pillars of Iman","🏛️","The six pillars every Muslim must know",[
        mkLesson("l5b1","Belief in Allah & His Angels","DEMO","20:00",{desc:"Foundations of belief in the unseen."}),
        mkLesson("l5b2","Belief in the Books & Prophets","DEMO","22:00",{desc:"Divine scriptures and all 25 named prophets.",res:["Divine Books.pdf"]}),
        mkLesson("l5b3","Belief in the Last Day","DEMO","25:00",{desc:"Death, resurrection, judgment, Paradise and Hell."}),
        mkLesson("l5b4","Belief in Divine Decree (Qada & Qadar)","DEMO","22:00",{desc:"Allah's complete knowledge and will.",res:["Qada Qadar Notes.pdf"]}),
      ]),
    ],
  },
  {
    id:6, slug:"learn-qaida",
    title:"Noorani Qaida", titleAr:"تعلم القاعدة النورانية",
    instructor:"Rasul Academy", category:"Quran", level:"Beginner",
    rating:4.9, students:5480, price:0, isFree:true,
    badge:"68 Videos", badgeC:C.gold,
    thumb:"🌟", color:C.em,
    desc:"A full 68-video Noorani Qaida series in Urdu covering letters, harakat, madd, tanween, ikhfa, sukoon, and qalqalah.",
    playlist:NOORANI_QAIDA_PLAYLIST_ID,
    modules:buildQaidaModules(NOORANI_QAIDA_PLAYLIST_ITEMS),
  },
  {
    id:7, slug:"hadith-studies",
    title:"Hadith Studies", titleAr:"دراسة الحديث النبوي",
    instructor:"Dr. Yasir Qadhi", category:"Hadith", level:"Intermediate",
    rating:4.7, students:1640, price:69, isFree:false,
    badge:null, thumb:"📜", color:"#1B4332",
    desc:"Study the prophetic traditions authentically. Covers 40 Hadith of Imam Nawawi with in-depth explanation.",
    playlist:"YOUR_PLAYLIST_ID_HERE",
    modules:[
      mkModule("m7a","Module 1 — Hadith Sciences","🔬","How Hadith were preserved and authenticated",[
        mkLesson("l7a1","What is a Hadith?","DEMO","18:00",{free:true,desc:"Definition, structure (isnad + matn), importance."}),
        mkLesson("l7a2","Classification of Hadith","DEMO","22:00",{desc:"Sahih, Hasan, Da'eef — grading system explained.",res:["Classification Chart.pdf"]}),
        mkLesson("l7a3","Major Hadith Collections","DEMO","20:00",{desc:"Bukhari, Muslim, the Six Books and their significance."}),
      ]),
      mkModule("m7b","Module 2 — 40 Hadith Nawawi","📚","The 40 most important Hadith explained",[
        mkLesson("l7b1","Hadith 1-5: Foundations of Deen","DEMO","30:00",{desc:"Intentions, Islam/Iman/Ihsan, permissible & forbidden.",res:["Hadith 1-5 Notes.pdf"]}),
        mkLesson("l7b2","Hadith 6-15: Rights & Character","DEMO","32:00",{desc:"Rights of Allah and people, Islamic ethics."}),
        mkLesson("l7b3","Hadith 16-30: Conduct & Piety","DEMO","30:00",{desc:"Leaving doubt, simplicity, and the middle path.",res:["Hadith 16-30 Notes.pdf"]}),
        mkLesson("l7b4","Hadith 31-42: Complete Review","DEMO","35:00",{desc:"Final Hadith with discussion and applications.",res:["Complete 40 Hadith Booklet.pdf"]}),
      ]),
    ],
  },
  {
    id:8, slug:"small-hajj",
    title:"Small Hajj (Umrah)", titleAr:"العمرة المباركة",
    instructor:"Sheikh Assim Al-Hakeem", category:"Fiqh", level:"All Levels",
    rating:4.9, students:3890, price:0, isFree:true,
    badge:"Free", badgeC:C.em,
    thumb:"🕋", color:"#0D4F3C",
    desc:"Complete Umrah guide — rulings, duas, and step-by-step instructions according to authentic Sunnah.",
    playlist:"YOUR_PLAYLIST_ID_HERE",
    modules:[
      mkModule("m8a","Module 1 — Preparing","🧳","Everything before you travel",[
        mkLesson("l8a1","Virtues of Umrah","DEMO","15:00",{free:true,desc:"Authentic Hadith on the reward of Umrah."}),
        mkLesson("l8a2","Conditions, Pillars & Obligations","DEMO","20:00",{desc:"Who must perform Umrah and its essential acts.",res:["Umrah Checklist.pdf"]}),
        mkLesson("l8a3","Entering Ihram","DEMO","22:00",{desc:"Miqat stations, ghusl, wearing Ihram, Talbiyah.",res:["Ihram Guide.pdf"]}),
      ]),
      mkModule("m8b","Module 2 — Performing Umrah","🕋","Step-by-step rituals in Makkah",[
        mkLesson("l8b1","Tawaf — Circling the Ka'bah","DEMO","25:00",{desc:"Seven circuits, direction, and duas.",res:["Tawaf Duas.pdf"]}),
        mkLesson("l8b2","Sa'i — Safa & Marwa","DEMO","22:00",{desc:"Hagar's blessed walk — correct performance.",res:["Sa'i Guide.pdf"]}),
        mkLesson("l8b3","Halq, Completion & Common Mistakes","DEMO","20:00",{desc:"Hair shortening, exiting Ihram, key mistakes to avoid.",res:["Complete Dua Booklet.pdf"]}),
      ]),
    ],
  },
  {
    id:9, slug:"islamic-basics",
    title:"Islamic Basics", titleAr:"أساسيات الإسلام",
    instructor:"Sheikh Ibrahim Dremali", category:"Fiqh", level:"Beginner",
    rating:4.8, students:6100, price:0, isFree:true,
    badge:"Foundation", badgeC:C.em,
    thumb:"☪️", color:C.em,
    desc:"Every Muslim's essential guide — Five Pillars, prayer, fasting, halal/haram basics, and daily Islamic practice.",
    playlist:"YOUR_PLAYLIST_ID_HERE",
    modules:[
      mkModule("m9a","Module 1 — Five Pillars","🏛️","The structure of Islamic practice",[
        mkLesson("l9a1","Shahadah — The Declaration","DEMO","18:00",{free:true,desc:"The most important statement a person can make.",res:["Shahadah Explanation.pdf"]}),
        mkLesson("l9a2","Salah — The Prayer","DEMO","35:00",{desc:"Complete guide to 5 daily prayers — times, movements, duas.",res:["Prayer Guide.pdf","Prayer Times Chart.pdf"]}),
        mkLesson("l9a3","Zakat — Obligatory Charity","DEMO","22:00",{desc:"Nisab, calculation, and who receives Zakat."}),
        mkLesson("l9a4","Sawm — Ramadan Fasting","DEMO","24:00",{desc:"Rules of fasting, what breaks it, spiritual dimensions."}),
        mkLesson("l9a5","Hajj — The Pilgrimage Overview","DEMO","20:00",{desc:"Conditions, pillars, and profound meaning of Hajj."}),
      ]),
      mkModule("m9b","Module 2 — Daily Islamic Life","🌙","Practical Islam from morning to night",[
        mkLesson("l9b1","Morning & Evening Adhkar","DEMO","25:00",{free:true,desc:"Prophetic remembrances that protect your day.",res:["Morning Evening Adhkar.pdf"]}),
        mkLesson("l9b2","Halal & Haram Essentials","DEMO","22:00",{desc:"Food, relationships, and business — the basics."}),
        mkLesson("l9b3","Islamic Manners (Adab)","DEMO","20:00",{desc:"How a Muslim speaks, dresses, eats, and interacts."}),
        mkLesson("l9b4","Death & What Comes After","DEMO","22:00",{desc:"Preparing for death, janazah rulings, comfort in grief.",res:["Janazah Guide.pdf"]}),
      ]),
    ],
  },
];
const resolveCourse = (courseLike) => {
  if (!courseLike) return null;
  return COURSES.find(course =>
    course.id === courseLike.id ||
    (course.slug && course.slug === courseLike.slug)
  ) || courseLike;
};

class AppCrashBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Nur Academy crashed:", error, info);
  }

  handleReload = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  handleReset = () => {
    clearNurBrowserData();
    if (typeof window !== "undefined") window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"32px",background:C.cream}}>
        <div style={{maxWidth:620,width:"100%",background:"white",borderRadius:18,padding:"28px",border:`1px solid ${C.border}`,boxShadow:C.sh}}>
          <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.6rem",color:C.emD,marginBottom:10}}>This page hit an app error</div>
          <p style={{fontSize:".9rem",lineHeight:1.7,color:C.textM,marginBottom:14}}>
            The app now shows a safe fallback instead of staying blank. You can reload the page, or clear the browser-only demo data and start fresh.
          </p>
          <div style={{padding:"10px 12px",borderRadius:10,background:C.cream,border:`1px solid ${C.border}`,fontSize:".78rem",color:C.textM,marginBottom:16}}>
            {this.state.error?.message || "Unknown runtime error"}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <button className="btn" onClick={this.handleReload} style={{background:C.em,color:"white",padding:"10px 16px",borderRadius:10}}>Reload Page</button>
            <button className="btn" onClick={this.handleReset} style={{background:C.gold,color:C.emD,padding:"10px 16px",borderRadius:10}}>Reset Browser Data</button>
          </div>
        </div>
      </div>
    );
  }
}

const CATS = ["All","Quran","Arabic","Seerah","Aqidah","Hadith","Fiqh"];

// Helpers
const flatLessons = (course) => {
  const out = [];
  course.modules.forEach((mod, mi) => mod.lessons.forEach((ls, li) => out.push({ ...ls, mi, li })));
  return out;
};
const totalLessons = (c) => c.modules.reduce((a,m) => a+m.lessons.length, 0);
const getYtId = (v) => {
  if (!v || v==="DEMO") return null;
  for (const p of [/[?&]v=([^&#]+)/,/youtu\.be\/([^?&#]+)/,/embed\/([^?&#]+)/,/shorts\/([^?&#]+)/]) {
    const m = v.match(p); if (m) return m[1];
  }
  return /^[a-zA-Z0-9_-]{11}$/.test(v) ? v : null;
};

const loadYouTubeAPI = () => {
  if (typeof window === "undefined") return Promise.reject(new Error("YouTube player is only available in the browser."));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (window.__nurYtApiPromise) return window.__nurYtApiPromise;

  window.__nurYtApiPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${YT_API_SRC}"]`);
    const timeout = window.setTimeout(() => reject(new Error("Timed out loading the YouTube API.")), 12000);
    const prevReady = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevReady === "function") prevReady();
      window.clearTimeout(timeout);
      resolve(window.YT);
    };

    if (!existing) {
      const script = document.createElement("script");
      script.src = YT_API_SRC;
      script.async = true;
      script.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error("Could not load the YouTube API."));
      };
      document.head.appendChild(script);
    }
  });

  return window.__nurYtApiPromise;
};

const printCertificate = (course, user, completion) => {
  if (typeof window === "undefined" || !course || !user || !completion) return;
  const popup = window.open("", "_blank", "noopener,noreferrer,width=1100,height=780");
  if (!popup) return;

  popup.document.write(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${course.title} Certificate</title>
    <style>
      body{margin:0;background:#f5efe2;font-family:Georgia,serif;color:#1a1a1a}
      .page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
      .cert{width:960px;background:linear-gradient(180deg,#fffdf7 0%,#f7f0df 100%);border:14px solid #0b5240;box-shadow:0 18px 60px rgba(11,82,64,.16)}
      .head{padding:34px 48px;background:linear-gradient(135deg,#073729,#0b5240);color:#fff;text-align:center}
      .brand{font-size:18px;letter-spacing:.08em;text-transform:uppercase;color:#e8c46a}
      .title{font-size:42px;font-weight:700;margin-top:10px}
      .body{padding:44px 60px;text-align:center}
      .arabic{font-size:26px;color:#c9a84c;margin-bottom:10px}
      .lead{font-size:18px;color:#666}
      .name{font-size:40px;font-weight:700;color:#073729;margin:24px 0 10px}
      .course{font-size:28px;font-weight:700;color:#c9a84c;margin-bottom:24px}
      .meta{display:flex;justify-content:space-between;gap:20px;border-top:2px solid rgba(201,168,76,.35);padding-top:22px;font-size:15px;color:#555}
    </style>
  </head>
  <body>
    <div class="page">
      <div class="cert">
        <div class="head">
          <div class="brand">Nur Academy · نور أكاديمي</div>
          <div class="title">Certificate of Completion</div>
        </div>
        <div class="body">
          <div class="arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <div class="lead">This certifies that</div>
          <div class="name">${user.name}</div>
          <div class="lead">has successfully completed</div>
          <div class="course">${course.title}</div>
          <div class="meta">
            <span>Issued: ${formatDay(completion.completedAt)}</span>
            <span>Certificate ID: ${completion.certificateId}</span>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`);
  popup.document.close();
  popup.focus();
  window.setTimeout(() => popup.print(), 350);
};

// ─── Atoms ────────────────────────────────────────────────────────────────────
const Iso = ({ op=0.06, col="#C9A84C" }) => (
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
    <defs>
      <pattern id="ip" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <g fill="none" stroke={col} strokeWidth=".8" opacity={op}>
          <polygon points="40,5 47,25 68,18 55,35 75,42 55,49 68,66 47,59 40,79 33,59 12,66 25,49 5,42 25,35 12,18 33,25"/>
          <polygon points="40,16 48,28 62,28 68,40 62,52 48,52 40,64 32,52 18,52 12,40 18,28 32,28"/>
          <polygon points="40,22 43,28 40,34 37,28"/><polygon points="40,46 43,52 40,58 37,52"/>
          <polygon points="16,40 22,37 28,40 22,43"/><polygon points="52,40 58,37 64,40 58,43"/>
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ip)"/>
  </svg>
);

const Divider = ({ col=C.gold }) => (
  <div style={{display:"flex",alignItems:"center",gap:10,margin:"6px 0"}}>
    <div style={{flex:1,height:1,background:`linear-gradient(to right,transparent,${col})`}}/>
    <svg width="17" height="17" viewBox="0 0 20 20" fill={col}><polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7"/></svg>
    <div style={{flex:1,height:1,background:`linear-gradient(to left,transparent,${col})`}}/>
  </div>
);

const Btn = ({ children, v="primary", onClick, style={}, size="md", icon, disabled=false }) => {
  const p = {sm:"7px 14px",md:"10px 22px",lg:"14px 34px"};
  const f = {sm:".78rem",md:".86rem",lg:".96rem"};
  const V = {
    primary: {background:C.em,color:"#fff",borderRadius:10,boxShadow:"0 3px 12px rgba(11,82,64,.25)"},
    gold:    {background:`linear-gradient(135deg,${C.gold},${C.goldL})`,color:"#fff",borderRadius:10,boxShadow:"0 3px 12px rgba(201,168,76,.3)"},
    outline: {background:"transparent",color:C.em,border:`2px solid ${C.em}`,borderRadius:10},
    ghost:   {background:"rgba(11,82,64,.08)",color:C.em,borderRadius:10},
    dark:    {background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.8)",border:"1px solid rgba(255,255,255,.2)",borderRadius:10},
    success: {background:C.green,color:"#fff",borderRadius:10,boxShadow:"0 3px 12px rgba(5,150,105,.25)"},
    danger:  {background:C.red,color:"#fff",borderRadius:8},
  };
  return (
    <button className="btn" disabled={disabled} onClick={onClick}
      style={{padding:p[size],fontSize:f[size],...V[v],...style}}>
      {icon&&<span>{icon}</span>}{children}
    </button>
  );
};

const Badge = ({ children, col=C.em }) => (
  <span className="badge" style={{background:`${col}18`,color:col,border:`1px solid ${col}38`}}>{children}</span>
);

const Stars = ({ n=5, s=13 }) => (
  <span style={{color:C.gold,fontSize:s}}>
    {"★".repeat(Math.floor(n))}{"☆".repeat(5-Math.floor(n))}
    <span style={{color:C.textL,fontSize:s-2,marginLeft:3}}>{n}</span>
  </span>
);

const PBar = ({ value, label, thin=false }) => (
  <div>
    {label&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:".75rem"}}>
      <span style={{color:C.textM}}>{label}</span>
      <span style={{color:C.em,fontWeight:700}}>{value}%</span>
    </div>}
    <div className="pbar" style={{height:thin?3:6}}><div className="pfill" style={{width:`${value}%`}}/></div>
  </div>
);

// ─── YouTube Player ───────────────────────────────────────────────────────────
const YTPlayer = ({ videoId, title, playlistId, initialWatchSeconds=0, onWatchProgress, onTrackingChange }) => {
  const id = getYtId(videoId);
  const mountRef = useRef(null);
  const playerRef = useRef(null);
  const tickRef = useRef(null);
  const watchedRef = useRef(safeNum(initialWatchSeconds, 0));
  const lastTimeRef = useRef(safeNum(initialWatchSeconds, 0));
  const [fallback, setFallback] = useState(false);
  const [playerError, setPlayerError] = useState(null);
  const watchUrl = id ? `https://www.youtube.com/watch?v=${id}${playlistId ? `&list=${playlistId}` : ""}` : "#";

  useEffect(() => {
    watchedRef.current = safeNum(initialWatchSeconds, 0);
    lastTimeRef.current = safeNum(initialWatchSeconds, 0);
  }, [initialWatchSeconds, id]);

  useEffect(() => {
    if (!id || !mountRef.current) return;

    let cancelled = false;
    setFallback(false);
    setPlayerError(null);

    const host = document.createElement("div");
    host.style.width = "100%";
    host.style.height = "100%";
    mountRef.current.replaceChildren(host);

    const clearTick = () => {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    };

    const emitProgress = (target, ended=false) => {
      if (!onWatchProgress || !target) return;
      const duration = Math.max(0, safeNum(target.getDuration?.(), 0));
      const currentTime = Math.max(0, safeNum(target.getCurrentTime?.(), 0));
      const delta = currentTime - lastTimeRef.current;

      if (delta > 0 && delta <= 4) watchedRef.current += delta;
      if (ended && duration > 0) watchedRef.current = Math.max(watchedRef.current, duration);

      const watchedSeconds = duration > 0 ? Math.min(duration, watchedRef.current) : watchedRef.current;
      const percent = duration > 0 ? Math.min(100, Math.round((watchedSeconds / duration) * 100)) : 0;

      lastTimeRef.current = currentTime;
      watchedRef.current = watchedSeconds;
      onWatchProgress({
        watchedSeconds,
        duration,
        percent,
        currentTime,
      });
    };

    const startTick = (target) => {
      clearTick();
      tickRef.current = window.setInterval(() => emitProgress(target), WATCH_TICK_MS);
    };

    loadYouTubeAPI().then(YT => {
      if (cancelled || !mountRef.current || !mountRef.current.contains(host)) return;
      onTrackingChange?.(true);
      playerRef.current = new YT.Player(host, {
        videoId: id,
        width: "100%",
        height: "100%",
        playerVars: {
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            const resumeAt = safeNum(initialWatchSeconds, 0);
            const duration = Math.max(0, safeNum(event.target.getDuration?.(), 0));
            if (resumeAt > 5 && duration > resumeAt + 5) {
              event.target.seekTo(resumeAt, true);
              lastTimeRef.current = resumeAt;
              watchedRef.current = resumeAt;
            }
            emitProgress(event.target);
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              startTick(event.target);
              return;
            }

            emitProgress(event.target, event.data === YT.PlayerState.ENDED);
            clearTick();
          },
          onError: (event) => {
            const code = safeNum(event?.data, 0);
            clearTick();
            setPlayerError(code);
            onTrackingChange?.(false);
            try {
              event?.target?.destroy?.();
            } catch {}
            playerRef.current = null;
            if (![100, 101, 150].includes(code)) setFallback(true);
          },
        },
      });
    }).catch(() => {
      setFallback(true);
      onTrackingChange?.(false);
    });

    return () => {
      cancelled = true;
      clearTick();
      try {
        if (playerRef.current?.destroy) playerRef.current.destroy();
      } catch {}
      playerRef.current = null;
      if (mountRef.current) mountRef.current.replaceChildren();
    };
  }, [id, onTrackingChange, onWatchProgress]);

  if (!id) return (
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${C.emD},${C.em})`,position:"relative",overflow:"hidden"}}>
      <Iso op={0.1} col={C.gold}/>
      <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"0 32px"}}>
        <div style={{fontSize:"2.8rem",marginBottom:12,animation:"float 3s ease-in-out infinite"}}>▶️</div>
        <div style={{fontFamily:"'Crimson Pro',serif",color:"white",fontSize:"1.15rem",fontWeight:700,marginBottom:8}}>{title}</div>
        <div style={{color:"rgba(255,255,255,.55)",fontSize:".78rem",marginBottom:18}}>Add your YouTube video ID to display the video here</div>
        <div style={{background:"rgba(0,0,0,.3)",borderRadius:10,padding:"14px 18px",border:`1px solid ${C.gold}38`,display:"inline-block",textAlign:"left"}}>
          <div style={{color:C.gold,fontSize:".68rem",fontWeight:700,marginBottom:5,textTransform:"uppercase",letterSpacing:".06em"}}>How to add your video</div>
          <div style={{color:"rgba(255,255,255,.65)",fontSize:".76rem",lineHeight:1.65}}>
            1. Copy the ID from youtube.com/watch?v=<strong style={{color:C.goldL}}>ID_HERE</strong><br/>
            2. Find this lesson in <code style={{color:C.goldL}}>App.jsx</code><br/>
            3. Set <code style={{color:C.goldL}}>youtubeId: "ID_HERE"</code>
          </div>
        </div>
      </div>
    </div>
  );

  if ([100, 101, 150].includes(playerError)) {
    const unavailable = playerError === 100;
    return (
      <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${C.emD},${C.em})`,position:"relative",overflow:"hidden",padding:"28px"}}>
        <Iso op={0.08} col={C.gold}/>
        <div style={{position:"relative",zIndex:1,maxWidth:560,textAlign:"center"}}>
          <div style={{fontSize:"3rem",marginBottom:12}}>{unavailable ? "⚠️" : "▶️"}</div>
          <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.45rem",fontWeight:700,color:"white",marginBottom:8}}>
            {unavailable ? "Video unavailable" : "This video cannot play inside your website"}
          </div>
          <div style={{fontSize:".86rem",lineHeight:1.7,color:"rgba(255,255,255,.78)",marginBottom:18}}>
            {unavailable
              ? "This YouTube video is private, removed, or no longer available."
              : "The video owner has disabled playback on external websites. Learners can still open it on YouTube and use the manual completion button below."}
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap"}}>
            <Btn v="gold" onClick={() => window.open(watchUrl, "_blank", "noopener,noreferrer")}>Open on YouTube</Btn>
            {playlistId && <Btn v="dark" onClick={() => window.open(`https://www.youtube.com/playlist?list=${playlistId}`, "_blank", "noopener,noreferrer")}>Open Playlist</Btn>}
          </div>
        </div>
      </div>
    );
  }

  if (fallback) {
    return (
      <iframe
        style={{width:"100%",height:"100%",border:"none",display:"block"}}
        src={`https://www.youtube.com/embed/${id}?enablejsapi=1&rel=0&modestbranding=1&color=white`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return <div ref={mountRef} style={{width:"100%",height:"100%"}} aria-label={title}/>;
};

// ─── Streak Widget ────────────────────────────────────────────────────────────
const StreakWidget = ({ big=false }) => {
  const [st, setSt] = useState(DB.streak());
  useEffect(() => {
    const sync = () => setSt(DB.streak());
    sync();
    window.addEventListener("nur:data", sync);
    return () => window.removeEventListener("nur:data", sync);
  }, []);

  const last7 = Array.from({length:7}, (_,i) => {
    const d = new Date(Date.now() - (6-i)*86400000);
    return { label:["Su","Mo","Tu","We","Th","Fr","Sa"][d.getDay()], date:dayKey(d) };
  });
  const hist = st.history || [];
  const cnt  = st.count || 0;

  if (!big) return cnt > 0 ? (
    <div style={{display:"flex",alignItems:"center",gap:4,background:`${C.gold}14`,padding:"4px 10px",borderRadius:999,border:`1px solid ${C.gold}35`}}>
      <span style={{fontSize:".9rem"}}>🔥</span>
      <span style={{fontSize:".76rem",fontWeight:700,color:C.gold}}>{cnt}</span>
    </div>
  ) : null;

  return (
    <div style={{background:"white",borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:C.shG}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
        <div style={{fontSize:"2.3rem",animation:cnt>=3?"pulse 2s infinite":"none"}}>🔥</div>
        <div>
          <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.8rem",fontWeight:700,color:C.gold,lineHeight:1}}>{cnt} Day{cnt!==1?"s":""}</div>
          <div style={{fontSize:".74rem",color:C.textL}}>
            {cnt===0?"Complete a lesson to start your streak!":cnt<3?"Great start! Keep going 💪":cnt<7?"You're on a roll! 🚀":cnt<30?"Incredible dedication! 🌟":"Mashallah! Unstoppable! 🏆"}
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:6,justifyContent:"space-between"}}>
        {last7.map((d,i) => {
          const active = hist.includes(d.date);
          return (
            <div key={i} style={{textAlign:"center",flex:1}}>
              <div style={{fontSize:".65rem",color:C.textL,marginBottom:4}}>{d.label}</div>
              <div style={{width:28,height:28,borderRadius:"50%",margin:"0 auto",background:active?`linear-gradient(135deg,${C.em},${C.gold})`:C.creamD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".68rem",color:active?"white":C.textL,boxShadow:active?"0 2px 8px rgba(11,82,64,.3)":"none"}}>
                {active?"✓":"·"}
              </div>
            </div>
          );
        })}
      </div>
      {cnt>0&&(
        <div style={{marginTop:12,padding:"7px 11px",background:`${C.em}08`,borderRadius:7,fontSize:".72rem",color:C.textM,textAlign:"center"}}>
          Last active: {formatDay(st.lastDate, { weekday:"long", month:"short", day:"numeric" })}
        </div>
      )}
    </div>
  );
};

// ─── Course Card ──────────────────────────────────────────────────────────────
const CourseCard = ({ course, onClick }) => {
  const [pct, setPct] = useState(0);
  const viewerId = currentUserId();
  const enrolled = DB.isEnrolled(course.id);
  useEffect(() => {
    const tot = totalLessons(course);
    const dn  = DB.progress(course.id).length;
    setPct(tot>0 ? Math.round(dn/tot*100) : 0);
  }, [course.id, viewerId]);

  return (
    <div className="card" onClick={() => onClick(course)}
      style={{background:"white",borderRadius:16,overflow:"hidden",boxShadow:"0 4px 18px rgba(11,82,64,.07)",border:`1px solid ${C.border}`}}>
      <div style={{height:148,background:`linear-gradient(135deg,${course.color},${course.color}BB)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3rem",position:"relative",overflow:"hidden"}}>
        <Iso op={0.1} col="white"/>
        <span style={{position:"relative",zIndex:1,animation:"float 3s ease-in-out infinite"}}>{course.thumb}</span>
        <div style={{position:"absolute",top:10,left:10,zIndex:1}}>
          {course.badge&&<Badge col={course.badgeC}>{course.badge}</Badge>}
        </div>
        <div style={{position:"absolute",top:10,right:10,zIndex:1}}>
          <Badge col={course.isFree?C.em:C.gold}>{course.isFree?"Free":`$${course.price}`}</Badge>
        </div>
        {enrolled&&pct>0&&(
          <div style={{position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",width:"82%",zIndex:1}}>
            <div style={{background:"rgba(255,255,255,.18)",borderRadius:3,height:4,overflow:"hidden"}}>
              <div style={{width:`${pct}%`,height:"100%",background:C.goldL}}/>
            </div>
          </div>
        )}
      </div>
      <div style={{padding:16}}>
        <div style={{display:"flex",gap:5,marginBottom:7}}>
          <Badge col={C.emL}>{course.category}</Badge>
          <Badge col={C.textL}>{course.level}</Badge>
        </div>
        <h3 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.08rem",fontWeight:700,color:C.text,marginBottom:2,lineHeight:1.25}}>{course.title}</h3>
        <p style={{fontFamily:"'Amiri',serif",fontSize:".8rem",color:C.gold,marginBottom:7}}>{course.titleAr}</p>
        <p style={{fontSize:".78rem",color:C.textL,marginBottom:11,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{course.desc}</p>
        <div style={{display:"flex",gap:10,fontSize:".72rem",color:C.textM,marginBottom:10}}>
          <span>📦 {course.modules.length} modules</span>
          <span>📚 {totalLessons(course)} lessons</span>
          <span>👥 {course.students.toLocaleString()}</span>
        </div>
        {enrolled ? <PBar value={pct} label="Progress" thin/> : (
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Stars n={course.rating}/>
            <span style={{fontSize:".7rem",color:C.textL}}>{course.instructor.split(" ").pop()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Module Accordion (Course Detail) ────────────────────────────────────────
const ModuleList = ({ course, doneIds, isEnrolled, onLesson, curId }) => {
  const [open, setOpen] = useState([course.modules[0]?.id]);
  const tog = (id) => setOpen(p => p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  return (
    <div>
      {course.modules.map((mod, mi) => {
        const modDone = mod.lessons.filter(l => doneIds.includes(l.id)).length;
        const isOpen  = open.includes(mod.id);
        const modPct  = Math.round(modDone/mod.lessons.length*100);
        return (
          <div key={mod.id} style={{marginBottom:8,borderRadius:12,overflow:"hidden",border:`1px solid ${C.border}`,background:"white"}}>
            {/* Module header */}
            <div onClick={() => tog(mod.id)}
              style={{padding:"13px 15px",cursor:"pointer",display:"flex",alignItems:"center",gap:11,background:isOpen?`${C.em}05`:"white",transition:"background .2s"}}>
              <div style={{width:34,height:34,borderRadius:8,background:`linear-gradient(135deg,${C.em},${C.emM})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"1rem",flexShrink:0}}>{mod.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:".87rem",color:C.text}}>{mod.title}</div>
                <div style={{fontSize:".7rem",color:C.textL,marginTop:1}}>{modDone}/{mod.lessons.length} lessons · {mod.description}</div>
                <div style={{marginTop:5,display:"flex",alignItems:"center",gap:6}}>
                  <div className="pbar" style={{flex:1,height:3}}><div className="pfill" style={{width:`${modPct}%`}}/></div>
                  <span style={{fontSize:".62rem",color:C.em,fontWeight:700}}>{modPct}%</span>
                </div>
              </div>
              <span style={{color:C.textL,fontSize:".82rem",flexShrink:0}}>{isOpen?"▲":"▼"}</span>
            </div>
            {/* Lessons */}
            {isOpen&&(
              <div style={{borderTop:`1px solid ${C.border}`}}>
                {mod.lessons.map((ls, li) => {
                  const done    = doneIds.includes(ls.id);
                  const current = ls.id === curId;
                  const locked  = !isEnrolled && !ls.free;
                  return (
                    <div key={ls.id} onClick={() => !locked && onLesson(mi, li)}
                      style={{padding:"11px 16px",display:"flex",alignItems:"center",gap:10,cursor:locked?"default":"pointer",background:current?`${C.em}0B`:"white",borderLeft:current?`3px solid ${C.gold}`:"3px solid transparent",borderBottom:li<mod.lessons.length-1?`1px solid ${C.border}`:"none",transition:"all .15s",opacity:locked?.55:1}}
                      onMouseEnter={e=>{if(!locked&&!current) e.currentTarget.style.background=`${C.em}05`;}}
                      onMouseLeave={e=>{if(!current) e.currentTarget.style.background="white";}}>
                      <div style={{width:24,height:24,borderRadius:"50%",flexShrink:0,background:done?C.em:current?`${C.gold}28`:C.creamD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".62rem",fontWeight:700,color:done?"white":current?C.gold:C.textL}}>
                        {done?"✓":locked?"🔒":li+1}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:".82rem",fontWeight:current?700:500,color:done?C.textL:C.text,textDecoration:done?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ls.title}</div>
                        <div style={{fontSize:".68rem",color:C.textL,marginTop:1}}>⏱ {ls.duration}</div>
                      </div>
                      {ls.free&&!done&&<Badge col={C.gold}>Free</Badge>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── Notes Editor ─────────────────────────────────────────────────────────────
const NotesEditor = ({ lessonId }) => {
  const [text, setText] = useState(DB.note(lessonId));
  const [saved, setSaved] = useState(true);
  const timer = useRef(null);

  useEffect(() => { setText(DB.note(lessonId)); setSaved(true); }, [lessonId]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onChange = useCallback((v) => {
    setText(v); setSaved(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { DB.saveNote(lessonId, v); setSaved(true); }, 700);
  }, [lessonId]);

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
        <div style={{fontSize:".72rem",fontWeight:700,color:C.textM,textTransform:"uppercase",letterSpacing:".05em"}}>📝 My Notes</div>
        <div style={{fontSize:".68rem",color:saved?C.green:C.gold,display:"flex",alignItems:"center",gap:4}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:saved?C.green:C.gold,display:"inline-block"}}/>
          {saved?"Saved":"Saving…"}
        </div>
      </div>
      <textarea value={text} onChange={e=>onChange(e.target.value)}
        placeholder={"Take notes on this lesson…\n\nThey are saved automatically and\nvisible in your Dashboard → Notes."}
        style={{flex:1,resize:"none",padding:12,borderRadius:10,border:`1px solid ${C.border}`,fontSize:".82rem",lineHeight:1.65,color:C.text,background:C.cream,fontFamily:"'Nunito Sans',sans-serif",minHeight:180}}/>
      {text&&<div style={{marginTop:6,fontSize:".68rem",color:C.textL}}>{text.length} chars · {text.trim().split(/\s+/).filter(Boolean).length} words</div>}
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = ({ page, setPage, currentUser, onSignOut }) => {
  const [scrolled, setScrolled] = useState(false);
  const [streak, setStreak] = useState(currentUser ? DB.streak().count || 0 : 0);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY>20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const sync = () => setStreak(currentUser ? DB.streak().count || 0 : 0);
    sync();
    window.addEventListener("nur:data", sync);
    return () => window.removeEventListener("nur:data", sync);
  }, [page, currentUser?.id]);

  const hero = ["home","login","register"].includes(page);
  const dark = scrolled || !hero;

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:dark?"rgba(255,255,255,.97)":"transparent",backdropFilter:dark?"blur(14px)":"none",borderBottom:dark?`1px solid ${C.border}`:"none",transition:"all .3s",padding:"0 5%"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div onClick={() => setPage("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:36,height:36,borderRadius:8,background:`linear-gradient(135deg,${C.em},${C.emM})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 10px rgba(11,82,64,.28)"}}>
            <svg width="19" height="19" viewBox="0 0 22 22"><polygon points="11,2 13,8 19,8 14,12 16,18 11,14 6,18 8,12 3,8 9,8" fill="#C9A84C"/></svg>
          </div>
          <div>
            <div style={{fontFamily:"'Amiri',serif",fontSize:"1.1rem",fontWeight:700,color:dark?C.emD:"white",lineHeight:1}}>Nur Academy</div>
            <div style={{fontFamily:"'Amiri',serif",fontSize:".62rem",color:C.gold,lineHeight:1}}>نور أكاديمي</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:3}}>
          {[["Home","home"],["Courses","courses"],["About","about"],["Contact","contact"]].map(([l,k])=>(
            <span key={k} className="navL" onClick={()=>setPage(k)}
              style={{padding:"6px 13px",borderRadius:7,fontWeight:600,fontSize:".83rem",color:page===k?C.gold:dark?C.textM:"rgba(255,255,255,.85)",background:page===k?`${C.gold}12`:"transparent"}}>{l}</span>
          ))}
          {currentUser ? (
            <div style={{display:"flex",alignItems:"center",gap:7,marginLeft:6}}>
              {streak>0&&<StreakWidget/>}
              <Btn size="sm" v="ghost" onClick={()=>setPage("dashboard")}>Dashboard</Btn>
              {currentUser.role==="admin"&&<Btn size="sm" v="ghost" onClick={()=>setPage("admin")}>Admin</Btn>}
              <div onClick={()=>setPage("dashboard")} title={currentUser.name}
                style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:".8rem",cursor:"pointer"}}>
                {getInitials(currentUser.name)}
              </div>
              <Btn size="sm" v="outline" onClick={onSignOut} style={{color:dark?C.em:"white",borderColor:dark?C.em:"rgba(255,255,255,.45)"}}>Sign Out</Btn>
            </div>
          ) : (
            <div style={{display:"flex",gap:7,marginLeft:6}}>
              <Btn size="sm" v="outline" onClick={()=>setPage("login")} style={{color:dark?C.em:"white",borderColor:dark?C.em:"rgba(255,255,255,.45)"}}>Login</Btn>
              <Btn size="sm" v="gold" onClick={()=>setPage("register")}>Join Free</Btn>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{background:C.emD,color:"rgba(255,255,255,.7)",padding:"48px 5% 24px",position:"relative",overflow:"hidden"}}>
    <Iso op={0.04} col={C.gold}/>
    <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:34,marginBottom:32}}>
        <div>
          <div style={{fontFamily:"'Amiri',serif",fontSize:"1.2rem",color:"white",marginBottom:2}}>Nur Academy</div>
          <div style={{fontFamily:"'Amiri',serif",color:C.gold,marginBottom:11,fontSize:".88rem"}}>نور أكاديمي</div>
          <p style={{fontSize:".78rem",lineHeight:1.7,color:"rgba(255,255,255,.48)",maxWidth:240}}>Spreading Islamic knowledge with clarity, authenticity, and love.</p>
          <div style={{marginTop:13,padding:10,background:"rgba(201,168,76,.08)",borderRadius:8,border:`1px solid ${C.borderM}`}}>
            <div style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:".82rem",textAlign:"center"}}>وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا</div>
          </div>
        </div>
        {[
          {t:"Courses",ls:["Learn Quran","Tajweed","Arabic Language","Seerah","Aqidah"]},
          {t:"Platform",ls:["About Us","Instructors","Blog","Contact","Certificates"]},
          {t:"Support", ls:["Help Center","Community","Privacy Policy","Terms"]},
        ].map(col=>(
          <div key={col.t}>
            <div style={{color:C.gold,fontWeight:700,marginBottom:11,fontSize:".76rem",letterSpacing:".06em",textTransform:"uppercase"}}>{col.t}</div>
            {col.ls.map(l=>(
              <div key={l} style={{color:"rgba(255,255,255,.38)",fontSize:".78rem",marginBottom:8,cursor:"pointer",transition:"color .2s"}}
                onMouseEnter={e=>e.target.style.color=C.goldL} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.38)"}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <Divider col={C.gold}/>
      <div style={{display:"flex",justifyContent:"space-between",paddingTop:14,fontSize:".72rem",color:"rgba(255,255,255,.3)"}}>
        <span>© {new Date().getFullYear()} Nur Academy — جميع الحقوق محفوظة</span>
        <span>Made with ❤️ for the Muslim Ummah</span>
      </div>
    </div>
  </footer>
);

// ══════════════════════════════════════════════════════════════════════════════
//  PAGES
// ══════════════════════════════════════════════════════════════════════════════

// ─── HOME ─────────────────────────────────────────────────────────────────────
const HomePage = ({ setPage, setCourse }) => {
  const [ti, setTi] = useState(0);
  const testimonials = [
    {name:"Aisha Rahman",role:"Student, USA",text:"Nur Academy transformed my relationship with the Quran. The Tajweed course was exceptional — I now recite with real confidence. JazakAllahu Khayran!",av:"A"},
    {name:"Mohammed Al-Farsi",role:"Student, UK",text:"The Seerah course moved me to tears. Sheikh Omar's teaching brought the Prophet ﷺ to life. This platform is a true blessing for the Ummah.",av:"M"},
    {name:"Fatima Hassan",role:"Student, Canada",text:"As a revert, the Islamic Basics course gave me such a strong foundation. The instructors are patient, knowledgeable, and incredibly kind.",av:"F"},
  ];
  useEffect(()=>{ const t=setInterval(()=>setTi(p=>(p+1)%testimonials.length),4200); return ()=>clearInterval(t); },[]);

  return (
    <div className="page">
      {/* Hero */}
      <section style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.emD} 0%,${C.em} 55%,${C.emM} 100%)`,display:"flex",alignItems:"center",padding:"92px 5% 52px",position:"relative",overflow:"hidden"}}>
        <Iso op={0.07} col={C.gold}/>
        <div style={{position:"absolute",top:-100,right:-100,width:480,height:480,borderRadius:"50%",background:"rgba(201,168,76,.05)",border:"1px solid rgba(201,168,76,.1)"}}/>
        <div style={{maxWidth:1200,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"center"}}>
          <div>
            <div style={{textAlign:"center",marginBottom:4}}>
              <div style={{fontFamily:"'Amiri',serif",fontSize:"1.3rem",color:C.gold,letterSpacing:2}}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
            </div>
            <Divider col={C.gold}/>
            <div style={{marginTop:18,marginBottom:11}}><Badge col={C.gold}>🕌 Online Islamic Academy</Badge></div>
            <h1 style={{fontFamily:"'Amiri',serif",fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:700,color:"white",lineHeight:1.2,marginBottom:9}}>
              Learn Islam with<span style={{display:"block",color:C.goldL}}>Clarity & Wisdom</span>
            </h1>
            <h2 style={{fontFamily:"'Amiri',serif",fontSize:"1.15rem",color:"rgba(255,255,255,.42)",marginBottom:17,fontWeight:400}}>تعلم الإسلام بوضوح وحكمة</h2>
            <p style={{color:"rgba(255,255,255,.7)",fontSize:".97rem",lineHeight:1.8,maxWidth:450,marginBottom:28}}>
              Join <strong style={{color:C.goldL}}>12,000+ students</strong> learning Quran, Tajweed, Arabic, Seerah, and more — with YouTube video lessons, personal notes, streak tracking, and module-based courses.
            </p>
            <div style={{display:"flex",gap:11,flexWrap:"wrap",marginBottom:28}}>
              <Btn size="lg" v="gold" onClick={()=>setPage("courses")} icon="📚">Browse Courses</Btn>
              <Btn size="lg" onClick={()=>setPage("register")} style={{background:"rgba(255,255,255,.1)",color:"white",border:"1px solid rgba(255,255,255,.3)",borderRadius:10}}>Join Free Today</Btn>
            </div>
            <div style={{display:"flex",gap:28}}>
              {[{v:`${COURSES.filter(c=>c.isFree).length}`,l:"Free Courses"},{v:"9",l:"Total Courses"},{v:String(COURSES.reduce((a,c)=>a+c.modules.length,0)),l:"Modules"},{v:"🔥",l:"Streak System"}].map((s,i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.4rem",fontWeight:700,color:C.gold}}>{s.v}</div>
                  <div style={{fontSize:".68rem",color:"rgba(255,255,255,.48)",textTransform:"uppercase",letterSpacing:".05em"}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Hero card */}
          <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{background:"rgba(255,255,255,.07)",backdropFilter:"blur(16px)",borderRadius:20,border:"1px solid rgba(255,255,255,.12)",padding:26,width:"100%",maxWidth:355,boxShadow:"0 22px 70px rgba(0,0,0,.26)"}}>
              <div style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:".88rem",marginBottom:13,textAlign:"center"}}>Live Platform Preview</div>
              <div style={{background:"rgba(201,168,76,.12)",borderRadius:11,padding:"11px 15px",marginBottom:13,border:`1px solid rgba(201,168,76,.22)`,display:"flex",alignItems:"center",gap:11}}>
                <span style={{fontSize:"1.8rem"}}>🔥</span>
                <div>
                  <div style={{color:"white",fontWeight:700,fontSize:".92rem"}}>7 Day Streak!</div>
                  <div style={{color:C.goldL,fontSize:".7rem"}}>Complete a lesson daily to keep it</div>
                </div>
              </div>
              {COURSES.slice(0,2).map((c,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,.05)",borderRadius:10,padding:"11px 14px",marginBottom:8,border:"1px solid rgba(255,255,255,.08)"}}>
                  <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:7}}>
                    <span style={{fontSize:"1.2rem"}}>{c.thumb}</span>
                    <div>
                      <div style={{color:"white",fontSize:".8rem",fontWeight:600}}>{c.title}</div>
                      <div style={{color:"rgba(255,255,255,.4)",fontSize:".67rem"}}>{c.modules.length} modules · {totalLessons(c)} lessons</div>
                    </div>
                  </div>
                  <div style={{background:"rgba(255,255,255,.1)",borderRadius:3,height:4,overflow:"hidden"}}>
                    <div style={{width:`${[68,34][i]}%`,height:"100%",background:`linear-gradient(90deg,${C.em},${C.gold})`}}/>
                  </div>
                  <div style={{textAlign:"right",fontSize:".62rem",color:C.goldL,marginTop:2}}>{[68,34][i]}%</div>
                </div>
              ))}
              <Btn v="gold" style={{width:"100%",justifyContent:"center",marginTop:5}} onClick={()=>setPage("courses")}>Start Learning →</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* Feature pills */}
      <section style={{padding:"52px 5%",background:C.creamD}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          {[
            {icon:"▶️",t:"YouTube Videos",d:"Embed your YouTube playlist — your lessons, your way."},
            {icon:"🔥",t:"Daily Streaks",d:"Build a learning habit. Don't break the chain!"},
            {icon:"📊",t:"Progress Tracking",d:"Per-module progress bars with percentage completion."},
            {icon:"📝",t:"Personal Notes",d:"Take notes on any lesson. Auto-saved, always available."},
          ].map((f,i)=>(
            <div key={i} style={{background:"white",borderRadius:13,padding:"20px 16px",border:`1px solid ${C.border}`,boxShadow:"0 2px 10px rgba(11,82,64,.05)"}}>
              <div style={{fontSize:"1.7rem",marginBottom:8}}>{f.icon}</div>
              <div style={{fontFamily:"'Crimson Pro',serif",fontWeight:700,fontSize:".98rem",color:C.emD,marginBottom:4}}>{f.t}</div>
              <div style={{fontSize:".78rem",color:C.textL,lineHeight:1.6}}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section style={{padding:"64px 5%",background:C.cream}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:38}}>
            <div style={{fontFamily:"'Amiri',serif",color:C.gold,marginBottom:5}}>ما تعلمه</div>
            <h2 style={{fontFamily:"'Amiri',serif",fontSize:"2rem",color:C.emD}}>Islamic Courses</h2>
            <Divider/>
            <p style={{color:C.textM,maxWidth:440,margin:"9px auto",fontSize:".88rem",lineHeight:1.7}}>Each course has YouTube video lessons, structured modules, and personal note-taking.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {COURSES.slice(0,6).map(c=><CourseCard key={c.id} course={c} onClick={c=>{setCourse(c);setPage("course-detail");}}/>)}
          </div>
          <div style={{textAlign:"center",marginTop:32}}>
            <Btn size="lg" v="outline" onClick={()=>setPage("courses")}>View All 9 Courses →</Btn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{padding:"64px 5%",background:`linear-gradient(160deg,${C.emD},${C.em})`,position:"relative",overflow:"hidden"}}>
        <Iso op={0.05} col={C.gold}/>
        <div style={{maxWidth:680,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
          <h2 style={{fontFamily:"'Amiri',serif",fontSize:"1.85rem",color:"white",marginBottom:6}}>Student Stories</h2>
          <Divider col={C.gold}/>
          <div key={ti} style={{background:"rgba(255,255,255,.07)",backdropFilter:"blur(10px)",borderRadius:17,padding:34,border:"1px solid rgba(255,255,255,.1)",marginTop:26,animation:"fadeIn .5s"}}>
            <div style={{fontSize:"2.5rem",color:C.gold,fontFamily:"serif",lineHeight:1,marginBottom:11}}>"</div>
            <p style={{fontSize:".98rem",lineHeight:1.8,color:"rgba(255,255,255,.85)",fontStyle:"italic",marginBottom:22}}>{testimonials[ti].text}</p>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12}}>
              <div style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:".95rem"}}>{testimonials[ti].av}</div>
              <div style={{textAlign:"left"}}>
                <div style={{fontWeight:700,color:"white",fontSize:".88rem"}}>{testimonials[ti].name}</div>
                <div style={{fontSize:".72rem",color:"rgba(255,255,255,.48)"}}>{testimonials[ti].role}</div>
              </div>
              <Stars n={5} s={14}/>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:14}}>
            {testimonials.map((_,i)=>(
              <div key={i} onClick={()=>setTi(i)} style={{width:i===ti?19:6,height:6,borderRadius:3,cursor:"pointer",background:i===ti?"white":"rgba(255,255,255,.28)",transition:"all .3s"}}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── COURSES ──────────────────────────────────────────────────────────────────
const CoursesPage = ({ setPage, setCourse }) => {
  const [cat, setCat] = useState("All");
  const [q,   setQ  ] = useState("");
  const [pr,  setPr ] = useState("All");

  const filtered = COURSES.filter(c =>
    (cat==="All"||c.category===cat) &&
    (c.title.toLowerCase().includes(q.toLowerCase())||c.desc.toLowerCase().includes(q.toLowerCase())) &&
    (pr==="All"||(pr==="Free"?c.isFree:!c.isFree))
  );

  return (
    <div className="page" style={{paddingTop:64,minHeight:"100vh",background:C.cream}}>
      <div style={{background:`linear-gradient(135deg,${C.emD},${C.em})`,padding:"44px 5%",position:"relative",overflow:"hidden"}}>
        <Iso op={0.06} col={C.gold}/>
        <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
          <h1 style={{fontFamily:"'Amiri',serif",fontSize:"2.1rem",color:"white",marginBottom:5}}>Islamic Courses</h1>
          <p style={{fontFamily:"'Amiri',serif",color:C.gold,marginBottom:22}}>YouTube · Modules · Progress Tracking · Notes</p>
          <div style={{maxWidth:510,margin:"0 auto",position:"relative"}}>
            <input placeholder="Search courses…" value={q} onChange={e=>setQ(e.target.value)}
              style={{width:"100%",padding:"12px 17px 12px 43px",borderRadius:11,border:"none",fontSize:".88rem",background:"white",boxShadow:"0 6px 22px rgba(0,0,0,.15)"}}/>
            <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:C.textL}}>🔍</span>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"32px 5%"}}>
        <div style={{display:"flex",gap:9,marginBottom:24,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{padding:"6px 13px",borderRadius:999,border:`1px solid ${C.border}`,background:cat===c?C.em:"white",color:cat===c?"white":C.textM,fontSize:".76rem",fontWeight:600,cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif",transition:"all .2s"}}>{c}</button>
            ))}
          </div>
          <select value={pr} onChange={e=>setPr(e.target.value)} style={{padding:"6px 11px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".76rem",background:"white",color:C.textM}}>
            {["All","Free","Paid"].map(p=><option key={p}>{p}</option>)}
          </select>
          <span style={{fontSize:".76rem",color:C.textL,marginLeft:"auto"}}>{filtered.length} courses</span>
        </div>
        {filtered.length>0 ? (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {filtered.map(c=><CourseCard key={c.id} course={c} onClick={c=>{setCourse(c);setPage("course-detail");}}/>)}
          </div>
        ) : (
          <div style={{textAlign:"center",padding:"72px 20px",color:C.textL}}>
            <div style={{fontSize:"2.5rem",marginBottom:11}}>🔍</div>
            <div style={{fontWeight:600}}>No courses found</div>
            <div style={{fontSize:".8rem",marginTop:5}}>Try adjusting your filters</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── COURSE DETAIL ────────────────────────────────────────────────────────────
const CourseDetailPage = ({ course, setPage, setLesson, loggedIn }) => {
  course = resolveCourse(course);
  const [enrolled, setEnrolled] = useState(DB.isEnrolled(course?.id));
  const [doneIds,  setDoneIds ] = useState(DB.progress(course?.id));
  const [tab,      setTab     ] = useState("modules");
  const [popped,   setPopped  ] = useState(false);

  useEffect(() => {
    if (!course) return;
    setEnrolled(DB.isEnrolled(course.id));
    setDoneIds(DB.progress(course.id));
  }, [course?.id]);

  if (!course) return null;

  const tot = totalLessons(course);
  const dn  = doneIds.length;
  const pct = tot>0 ? Math.round(dn/tot*100) : 0;

  const handleEnroll = () => {
    if (!loggedIn) { setPage("login"); return; }
    DB.enroll(course.id); setEnrolled(true);
    setPopped(true); setTimeout(() => setPopped(false), 2200);
  };

  const handleLesson = (mi, li) => {
    if (!loggedIn) { setPage("login"); return; }
    setLesson({ course, mi, li }); setPage("lesson");
  };

  const curId = null;

  return (
    <div className="page" style={{paddingTop:64,minHeight:"100vh",background:C.cream}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(160deg,${C.emD},${course.color})`,padding:"44px 5% 34px",position:"relative",overflow:"hidden"}}>
        <Iso op={0.07} col={C.gold}/>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr auto",gap:34,alignItems:"start",position:"relative",zIndex:1}}>
          <div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              <Badge col={C.gold}>{course.category}</Badge>
              <Badge col="rgba(255,255,255,.45)">{course.level}</Badge>
              {course.isFree&&<Badge col={C.emL}>Free</Badge>}
            </div>
            <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.95rem",color:"white",marginBottom:4}}>{course.title}</h1>
            <div style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:".98rem",marginBottom:11}}>{course.titleAr}</div>
            <p style={{color:"rgba(255,255,255,.7)",fontSize:".93rem",lineHeight:1.75,maxWidth:560,marginBottom:15}}>{course.desc}</p>
            <div style={{display:"flex",gap:18,fontSize:".8rem",color:"rgba(255,255,255,.62)",marginBottom:15}}>
              <span>👤 {course.instructor}</span>
              <span>📦 {course.modules.length} modules</span>
              <span>📚 {tot} lessons</span>
              <span>👥 {course.students.toLocaleString()}</span>
            </div>
            <Stars n={course.rating} s={15}/>
            {enrolled&&<div style={{marginTop:12,maxWidth:310}}><PBar value={pct} label={`Your Progress: ${dn}/${tot} lessons`}/></div>}
          </div>
          {/* Enroll card */}
          <div style={{background:"white",borderRadius:14,padding:22,minWidth:255,boxShadow:"0 14px 46px rgba(0,0,0,.2)"}}>
            <div style={{fontSize:"2rem",textAlign:"center",marginBottom:9}}>{course.thumb}</div>
            <div style={{textAlign:"center",marginBottom:14}}>
              <div style={{fontSize:"1.6rem",fontWeight:800,color:C.em}}>{course.isFree?"Free":`$${course.price}`}</div>
            </div>
            {!enrolled ? (
              <Btn v="gold" style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={handleEnroll}>
                {loggedIn?"🎓 Enroll Now":"🔑 Login to Enroll"}
              </Btn>
            ) : (
              <div>
                {popped&&<div style={{textAlign:"center",fontSize:"1.3rem",marginBottom:7,animation:"pop .4s ease"}}>🎉 Enrolled!</div>}
                <Btn v="primary" style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={()=>{setLesson({course,mi:0,li:0});setPage("lesson");}}>
                  {dn>0?"▶ Continue":"▶ Start Course"}
                </Btn>
                <div style={{marginTop:9}}><PBar value={pct} label={`${pct}% complete`}/></div>
              </div>
            )}
            <div style={{marginTop:13,fontSize:".73rem",color:C.textL}}>
              {["📦 "+course.modules.length+" modules","📚 "+tot+" lessons","📝 Personal notes","🔥 Streak tracking","📜 Certificate"].map(f=><div key={f} style={{padding:"3px 0"}}>{f}</div>)}
            </div>
            {course.playlist!=="YOUR_PLAYLIST_ID_HERE"&&(
              <a href={`https://www.youtube.com/playlist?list=${course.playlist}`} target="_blank" rel="noreferrer"
                style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5,marginTop:11,padding:"7px",borderRadius:8,background:"#FF000012",color:"#CC0000",fontSize:".74rem",fontWeight:600,textDecoration:"none",border:"1px solid #FF000020"}}>
                ▶ View YouTube Playlist
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{borderBottom:`1px solid ${C.border}`,background:"white",position:"sticky",top:64,zIndex:10}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 5%",display:"flex"}}>
          {["modules","instructor","resources"].map(t=>(
            <button key={t} className={`tab${tab===t?" on":""}`} onClick={()=>setTab(t)} style={{textTransform:"capitalize"}}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:880,margin:"0 auto",padding:"34px 5%"}}>
        {tab==="modules"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.28rem",color:C.emD}}>{course.modules.length} Modules · {tot} Lessons</h2>
              {enrolled&&<Badge col={C.em}>{pct}% Complete</Badge>}
            </div>
            <ModuleList course={course} doneIds={doneIds} isEnrolled={enrolled} onLesson={handleLesson} curId={curId}/>
          </div>
        )}
        {tab==="instructor"&&(
          <div style={{display:"flex",gap:20,padding:22,background:"white",borderRadius:14,border:`1px solid ${C.border}`}}>
            <div style={{width:68,height:68,borderRadius:"50%",flexShrink:0,background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"1.3rem",fontWeight:700}}>
              {course.instructor.split(" ").map(w=>w[0]).join("").slice(0,2)}
            </div>
            <div>
              <h3 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.12rem",color:C.text}}>{course.instructor}</h3>
              <p style={{color:C.gold,fontSize:".8rem",marginBottom:8}}>Islamic Scholar & Course Instructor</p>
              <p style={{color:C.textM,fontSize:".83rem",lineHeight:1.7}}>A respected Islamic scholar with extensive experience in teaching the Islamic sciences. All content is based on authentic Quran and Sunnah, following the methodology of the righteous predecessors.</p>
            </div>
          </div>
        )}
        {tab==="resources"&&(
          <div>
            <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.28rem",color:C.emD,marginBottom:16}}>Downloadable Resources</h2>
            {course.modules.map(mod=>{
              const withRes = mod.lessons.filter(l=>l.resources?.length>0);
              if (!withRes.length) return null;
              return (
                <div key={mod.id} style={{marginBottom:18}}>
                  <div style={{fontWeight:700,color:C.text,marginBottom:9,fontSize:".86rem"}}>{mod.title}</div>
                  {withRes.map(ls=>ls.resources?.map(r=>(
                    <div key={r} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"white",borderRadius:9,border:`1px solid ${C.border}`,marginBottom:6}}>
                      <span style={{color:C.red}}>📄</span>
                      <span style={{flex:1,fontSize:".82rem",color:C.text}}>{r}</span>
                      <span style={{fontSize:".68rem",color:C.textL,marginRight:8}}>{ls.title}</span>
                      <Btn size="sm" v="ghost">📥 Download</Btn>
                    </div>
                  )))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── LESSON PLAYER ────────────────────────────────────────────────────────────
const LessonPage = ({ lessonData, setPage, setLesson }) => {
  const sourceCourse = resolveCourse(lessonData?.course);
  const { mi: initMi, li: initLi } = lessonData || {};
  const [mi,       setMi      ] = useState(initMi||0);
  const [li,       setLi      ] = useState(initLi||0);
  const [sTab,     setSTab    ] = useState("chapters");
  const [doneIds,  setDoneIds ] = useState(DB.progress(sourceCourse?.id));
  const [confetti, setConfetti] = useState(false);
  const [watchInfo, setWatchInfo] = useState(sourceCourse ? DB.watch(sourceCourse.id, sourceCourse.modules[initMi||0]?.lessons[initLi||0]?.id) : defaultWatchState());
  const [trackingSupported, setTrackingSupported] = useState(Boolean(getYtId(sourceCourse?.modules[initMi||0]?.lessons[initLi||0]?.youtubeId)));
  const completeTimer = useRef(null);
  const completionTriggered = useRef(false);
  const course = sourceCourse;

  if (!course) return null;

  const flat    = flatLessons(course);
  const curMod  = course.modules[mi];
  const curLs   = curMod?.lessons[li];
  const flatIdx = flat.findIndex(l=>l.id===curLs?.id);
  const tot     = flat.length;
  const dn      = doneIds.length;
  const pct     = tot>0 ? Math.round(dn/tot*100) : 0;
  const isDone  = doneIds.includes(curLs?.id);
  const hasTrackableVideo = Boolean(getYtId(curLs?.youtubeId));
  const lessonWatchPct = isDone ? 100 : Math.max(0, watchInfo.percent || 0);

  useEffect(() => {
    if (!course || !curLs) return;
    clearTimeout(completeTimer.current);
    const progress = DB.progress(course.id);
    setDoneIds(progress);
    setWatchInfo(DB.watch(course.id, curLs.id));
    setTrackingSupported(Boolean(getYtId(curLs.youtubeId)));
    setConfetti(false);
    completionTriggered.current = progress.includes(curLs.id);
  }, [course, curLs]);

  useEffect(() => () => clearTimeout(completeTimer.current), []);

  const goTo = (newMi, newLi) => { setMi(newMi); setLi(newLi); setConfetti(false); };
  const goPrev = () => { if(flatIdx>0){ const p=flat[flatIdx-1]; goTo(p.mi,p.li); } };
  const goNext = () => { if(flatIdx<tot-1){ const n=flat[flatIdx+1]; goTo(n.mi,n.li); } };

  const completeLesson = useCallback((source="manual", payload={}) => {
    if (!course || !curLs || completionTriggered.current) return;

    completionTriggered.current = true;
    DB.complete(course.id, curLs.id, {
      ...payload,
      percent: payload.percent ?? 100,
      source,
    });
    DB.touch();

    const updated = DB.progress(course.id);
    setDoneIds(updated);
    setWatchInfo(DB.watch(course.id, curLs.id));

    if (updated.length === tot) DB.finishCourse(course.id);

    setConfetti(true);
    clearTimeout(completeTimer.current);
    completeTimer.current = setTimeout(() => {
      setConfetti(false);
      if (flatIdx < tot - 1) {
        const nextLesson = flatLessons(course)[flatIdx + 1];
        goTo(nextLesson.mi, nextLesson.li);
      }
    }, 1600);
  }, [course, curLs, flatIdx, tot]);

  const handleWatchProgress = useCallback((payload) => {
    if (!course || !curLs) return;
    const nextWatch = DB.saveWatch(course.id, curLs.id, {
      watchedSeconds: payload.watchedSeconds,
      duration: payload.duration,
      percent: payload.percent,
      lastViewedAt: dayKey(),
      source: "watch",
    });
    setWatchInfo(nextWatch);

    if (nextWatch.percent >= WATCH_COMPLETE_THRESHOLD && !completionTriggered.current) {
      completeLesson("watch", nextWatch);
    }
  }, [completeLesson, course, curLs]);

  const markDone = () => {
    if (isDone) return;
    completeLesson(hasTrackableVideo ? "manual-fallback" : "manual", {
      percent: 100,
      watchedSeconds: watchInfo.watchedSeconds,
      duration: watchInfo.duration,
    });
  };

  return (
    <div style={{paddingTop:64,background:"#0C0C0C",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      {/* Top bar */}
      <div style={{background:C.emD,padding:"8px 18px",display:"flex",alignItems:"center",gap:11,borderBottom:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
        <button onClick={()=>setPage("course-detail")} style={{background:"none",border:"none",color:"rgba(255,255,255,.52)",cursor:"pointer",fontSize:".78rem",fontFamily:"'Nunito Sans',sans-serif",flexShrink:0}}>← Back</button>
        <span style={{color:"rgba(255,255,255,.18)"}}>|</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{color:"white",fontSize:".82rem",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{course.title}</div>
          <div style={{color:"rgba(255,255,255,.36)",fontSize:".68rem"}}>{curMod?.title} · Lesson {li+1}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
          <span style={{color:"rgba(255,255,255,.38)",fontSize:".72rem"}}>{pct}% done</span>
          <div style={{width:90}}><div className="pbar"><div className="pfill" style={{width:`${pct}%`}}/></div></div>
        </div>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* Video + info */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"auto",minWidth:0}}>
          {/* 16:9 player */}
          <div style={{background:"#000",position:"relative",width:"100%"}}>
            <div style={{paddingTop:"56.25%",position:"relative"}}>
              <div style={{position:"absolute",inset:0}}>
                <YTPlayer
                  key={`${course.id}-${curLs?.id}`}
                  videoId={curLs?.youtubeId}
                  title={curLs?.title}
                  playlistId={course?.playlist}
                  initialWatchSeconds={watchInfo.watchedSeconds}
                  onWatchProgress={handleWatchProgress}
                  onTrackingChange={setTrackingSupported}
                />
              </div>
            </div>
          </div>

          {/* Lesson info */}
          <div style={{padding:"18px 22px",background:"#151515",borderTop:"1px solid rgba(255,255,255,.04)"}}>
            <div style={{fontSize:".68rem",color:"rgba(255,255,255,.3)",marginBottom:6}}>{curMod?.title} · Lesson {li+1} of {curMod?.lessons.length}</div>
            <h2 style={{fontFamily:"'Crimson Pro',serif",color:"white",fontSize:"1.18rem",marginBottom:7}}>{curLs?.title}</h2>
            {curLs?.description&&<p style={{color:"rgba(255,255,255,.46)",fontSize:".8rem",lineHeight:1.6,marginBottom:12}}>{curLs.description}</p>}
            {hasTrackableVideo ? (
              <div style={{marginBottom:12,padding:"10px 12px",borderRadius:10,background:"rgba(201,168,76,.08)",border:`1px solid ${C.gold}28`}}>
                <div style={{display:"flex",justifyContent:"space-between",gap:10,marginBottom:5,fontSize:".72rem"}}>
                  <span style={{color:"rgba(255,255,255,.55)"}}>Watch progress</span>
                  <span style={{color:C.goldL,fontWeight:700}}>{lessonWatchPct}%</span>
                </div>
                <div style={{height:4,background:"rgba(255,255,255,.1)",borderRadius:999,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${lessonWatchPct}%`,background:`linear-gradient(90deg,${C.em},${C.gold})`}}/>
                </div>
                <div style={{marginTop:7,fontSize:".7rem",color:"rgba(255,255,255,.48)"}}>
                  {trackingSupported
                    ? `This lesson auto-completes once the learner has watched ${WATCH_COMPLETE_THRESHOLD}% of the video.`
                    : "YouTube tracking is unavailable on this device right now, so a manual completion fallback is shown below."}
                </div>
              </div>
            ) : (
              <div style={{marginBottom:12,padding:"10px 12px",borderRadius:10,background:"rgba(11,82,64,.18)",border:`1px solid ${C.em}38`,fontSize:".72rem",color:"rgba(255,255,255,.58)"}}>
                This lesson is still using a placeholder video ID, so completion stays manual until a real YouTube lesson is added.
              </div>
            )}
            <div style={{display:"flex",gap:9,alignItems:"center",flexWrap:"wrap"}}>
              <Btn size="sm" v="dark" onClick={goPrev} disabled={flatIdx===0} icon="◀">Prev</Btn>
              <Btn size="sm" v="dark" onClick={goNext} disabled={flatIdx===tot-1}>Next ▶</Btn>
              <div style={{flex:1}}/>
              {confetti ? (
                <div style={{display:"flex",alignItems:"center",gap:6,color:C.goldL,fontWeight:700,fontSize:".85rem",animation:"pop .4s ease"}}>
                  🎉 Complete! 🔥 Streak updated!
                </div>
              ) : isDone ? (
                <Btn size="sm" v="ghost" disabled>✓ Completed</Btn>
              ) : hasTrackableVideo && trackingSupported ? (
                <div style={{padding:"8px 12px",borderRadius:999,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",fontSize:".74rem",color:"rgba(255,255,255,.62)"}}>
                  Auto-completes at {WATCH_COMPLETE_THRESHOLD}% watched
                </div>
              ) : (
                <Btn size="sm" v="success" onClick={markDone}>
                  ✓ Mark Complete
                </Btn>
              )}
            </div>
          </div>

          {/* Resources */}
          {curLs?.resources?.length>0&&(
            <div style={{padding:"14px 22px",background:"#111",borderTop:"1px solid rgba(255,255,255,.03)"}}>
              <div style={{fontSize:".68rem",color:"rgba(255,255,255,.3)",fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:9}}>📄 Lesson Resources</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {curLs.resources.map(r=>(
                  <div key={r} style={{padding:"6px 12px",borderRadius:7,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.09)",cursor:"pointer",fontSize:".73rem",color:"rgba(255,255,255,.62)",display:"flex",gap:5,alignItems:"center"}}>
                    <span>📥</span>{r}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{width:310,background:"#111",borderLeft:"1px solid rgba(255,255,255,.05)",display:"flex",flexDirection:"column",flexShrink:0}}>
          {/* Sidebar tabs */}
          <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,.05)",flexShrink:0}}>
            {[{k:"chapters",l:"📦 Chapters"},{k:"notes",l:"📝 Notes"},{k:"files",l:"📄 Files"}].map(t=>(
              <button key={t.k} onClick={()=>setSTab(t.k)}
                style={{flex:1,padding:"10px 5px",border:"none",background:"none",color:sTab===t.k?"white":"rgba(255,255,255,.36)",fontSize:".69rem",fontWeight:600,cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif",borderBottom:sTab===t.k?`2px solid ${C.gold}`:"2px solid transparent",transition:"all .2s"}}>
                {t.l}
              </button>
            ))}
          </div>

          {/* Chapters tab */}
          {sTab==="chapters"&&(
            <div style={{flex:1,overflowY:"auto",padding:"10px 9px"}}>
              {course.modules.map((mod, modI)=>{
                const mDone = mod.lessons.filter(l=>doneIds.includes(l.id)).length;
                const mPct  = Math.round(mDone/mod.lessons.length*100);
                return (
                  <div key={mod.id} style={{marginBottom:7}}>
                    {/* Module header */}
                    <div style={{padding:"8px 10px",borderRadius:7,background:"rgba(255,255,255,.04)",marginBottom:3}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{display:"flex",gap:6,alignItems:"center"}}>
                          <span style={{fontSize:".85rem"}}>{mod.icon}</span>
                          <span style={{color:"rgba(255,255,255,.65)",fontSize:".74rem",fontWeight:600}}>{mod.title}</span>
                        </div>
                        <span style={{fontSize:".6rem",color:mDone===mod.lessons.length?C.gold:"rgba(255,255,255,.28)",fontWeight:700}}>{mDone}/{mod.lessons.length}</span>
                      </div>
                      <div style={{marginTop:4}}>
                        <div style={{height:2,background:"rgba(255,255,255,.07)",borderRadius:1,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${mPct}%`,background:`linear-gradient(90deg,${C.em},${C.gold})`}}/>
                        </div>
                      </div>
                    </div>
                    {/* Lesson list */}
                    {mod.lessons.map((ls, lsi)=>{
                      const isDn  = doneIds.includes(ls.id);
                      const isCur = ls.id === curLs?.id;
                      const watchPct = Math.max(0, DB.watch(course.id, ls.id).percent || 0);
                      return (
                        <div key={ls.id} onClick={()=>goTo(modI,lsi)}
                          style={{padding:"8px 10px",cursor:"pointer",display:"flex",gap:8,alignItems:"center",background:isCur?`${C.em}1A`:"transparent",borderLeft:isCur?`2px solid ${C.gold}`:"2px solid transparent",borderRadius:7,marginBottom:2,transition:"all .15s"}}
                          onMouseEnter={e=>{if(!isCur)e.currentTarget.style.background="rgba(255,255,255,.03)"}}
                          onMouseLeave={e=>{if(!isCur)e.currentTarget.style.background="transparent"}}>
                          <div style={{width:21,height:21,borderRadius:"50%",flexShrink:0,background:isDn?C.em:isCur?`${C.gold}28`:"rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".6rem",fontWeight:700,color:isDn?"white":isCur?C.gold:"rgba(255,255,255,.28)"}}>
                            {isDn?"✓":lsi+1}
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:".74rem",color:isCur?"white":"rgba(255,255,255,.52)",fontWeight:isCur?600:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ls.title}</div>
                            <div style={{fontSize:".6rem",color:"rgba(255,255,255,.24)",marginTop:1}}>⏱ {ls.duration}{!isDn&&watchPct>0?` · ${watchPct}% watched`:""}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          {/* Notes tab */}
          {sTab==="notes"&&(
            <div style={{flex:1,padding:"12px",display:"flex",flexDirection:"column"}}>
              <NotesEditor lessonId={curLs?.id}/>
            </div>
          )}

          {/* Files tab */}
          {sTab==="files"&&(
            <div style={{flex:1,overflowY:"auto",padding:"12px"}}>
              <div style={{fontSize:".68rem",color:"rgba(255,255,255,.3)",fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:9}}>This Lesson</div>
              {curLs?.resources?.length ? curLs.resources.map(r=>(
                <div key={r} style={{padding:"9px 11px",background:"rgba(255,255,255,.05)",borderRadius:8,border:"1px solid rgba(255,255,255,.07)",marginBottom:6,cursor:"pointer"}}>
                  <div style={{display:"flex",gap:7,alignItems:"center"}}>
                    <span>📄</span>
                    <span style={{color:"rgba(255,255,255,.65)",fontSize:".75rem",flex:1}}>{r}</span>
                    <span style={{color:C.gold,fontSize:".7rem"}}>↓</span>
                  </div>
                </div>
              )) : <div style={{color:"rgba(255,255,255,.28)",fontSize:".75rem",textAlign:"center",marginTop:18}}>No files for this lesson</div>}
              <div style={{fontSize:".68rem",color:"rgba(255,255,255,.3)",fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",margin:"15px 0 8px"}}>All Course Files</div>
              {course.modules.flatMap(m=>m.lessons.flatMap(l=>(l.resources||[]).map(r=>({r,ln:l.title})))).map(({r,ln},i)=>(
                <div key={i} style={{padding:"7px 10px",background:"rgba(255,255,255,.03)",borderRadius:7,marginBottom:4}}>
                  <div style={{color:"rgba(255,255,255,.55)",fontSize:".72rem"}}>📄 {r}</div>
                  <div style={{color:"rgba(255,255,255,.22)",fontSize:".62rem",marginTop:2}}>{ln}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── STUDENT DASHBOARD ────────────────────────────────────────────────────────
const DashboardPage = ({ setPage, setLesson, currentUser, onSignOut, onUserUpdated }) => {
  const [sec,         setSec        ] = useState("overview");
  const [courses,     setCourses    ] = useState([]);
  const [allProg,     setAllProg    ] = useState({});
  const [notes,       setNotes      ] = useState({});
  const [streak,      setStreak     ] = useState(DB.streak());
  const [completions, setCompletions] = useState(DB.allCompletions());
  const [profile,     setProfile    ] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    country: currentUser?.country || "",
    language: currentUser?.language || "English / Arabic",
  });
  const [profileMsg,  setProfileMsg ] = useState("");
  const [copyMsg,     setCopyMsg    ] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    setProfile({
      name: currentUser.name,
      email: currentUser.email,
      country: currentUser.country || "",
      language: currentUser.language || "English / Arabic",
    });
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const sync = () => {
      setCourses(COURSES.filter(c => DB.enrolled().includes(c.id)));
      setAllProg(DB.allProgress());
      setNotes(DB.allNotes());
      setStreak(DB.streak());
      setCompletions(DB.allCompletions());
    };
    sync();
    window.addEventListener("nur:data", sync);
    return () => window.removeEventListener("nur:data", sync);
  }, [currentUser?.id, sec]);

  if (!currentUser) return null;

  const totalDone  = Object.values(allProg).reduce((a,arr)=>a+arr.length, 0);
  const notesCount = Object.values(notes).filter(n=>n.trim()).length;
  const initials   = getInitials(currentUser.name);
  const firstName  = currentUser.name.split(" ")[0] || "Student";
  const completedCourses = courses.filter(c => {
    const total = totalLessons(c);
    return total > 0 && DB.progress(c.id).length === total;
  });

  const sideItems = [
    {icon:"📊",l:"Overview",k:"overview"},
    {icon:"📚",l:"My Courses",k:"courses"},
    {icon:"🔥",l:"Streak",k:"streak"},
    {icon:"📝",l:"My Notes",k:"notes"},
    {icon:"🏆",l:"Certificates",k:"certs"},
    {icon:"👤",l:"Profile",k:"profile"},
  ];

  const openLesson = (c) => { setLesson({course:c,mi:0,li:0}); setPage("lesson"); };
  const openSpecificLesson = (course, mod, lesson) => {
    const mi = course.modules.indexOf(mod);
    const li = mod.lessons.indexOf(lesson);
    setLesson({ course, mi, li });
    setPage("lesson");
  };
  const handleCopyId = async (certificateId) => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(certificateId);
      setCopyMsg("Certificate ID copied.");
      window.setTimeout(() => setCopyMsg(""), 1800);
    } catch {
      setCopyMsg("Could not copy on this browser.");
      window.setTimeout(() => setCopyMsg(""), 1800);
    }
  };
  const handleProfileSave = () => {
    try {
      const updatedUser = Auth.updateCurrentProfile(profile);
      onUserUpdated(updatedUser);
      setProfileMsg("Profile saved on this browser.");
      window.setTimeout(() => setProfileMsg(""), 2200);
    } catch (error) {
      setProfileMsg(error.message);
    }
  };

  return (
    <div className="page" style={{paddingTop:64,display:"flex",minHeight:"100vh",background:C.cream}}>
      {/* Sidebar */}
      <div style={{width:218,background:"white",borderRight:`1px solid ${C.border}`,padding:"18px 12px",position:"fixed",top:64,bottom:0,overflowY:"auto"}}>
        <div style={{textAlign:"center",padding:"15px 0 18px",borderBottom:`1px solid ${C.border}`,marginBottom:11}}>
          <div style={{width:56,height:56,borderRadius:"50%",margin:"0 auto 8px",background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"1.15rem",fontWeight:700}}>{initials}</div>
          <div style={{fontWeight:700,fontSize:".88rem"}}>{currentUser.name}</div>
          <div style={{fontSize:".7rem",color:C.textL,marginTop:2}}>{currentUser.email}</div>
          {streak.count>0&&(
            <div style={{marginTop:7,display:"inline-flex",alignItems:"center",gap:4,background:`${C.gold}12`,padding:"4px 10px",borderRadius:999,border:`1px solid ${C.gold}28`}}>
              <span>🔥</span><span style={{fontSize:".74rem",fontWeight:700,color:C.gold}}>{streak.count} day streak</span>
            </div>
          )}
        </div>
        {sideItems.map(it=>(
          <div key={it.k} className={`sL${sec===it.k?" on":""}`} onClick={()=>setSec(it.k)}>
            <span>{it.icon}</span>{it.l}
          </div>
        ))}
        <div style={{borderTop:`1px solid ${C.border}`,marginTop:13,paddingTop:9}}>
          <div className="sL" style={{color:C.red}} onClick={onSignOut}><span>🚪</span>Sign Out</div>
        </div>
      </div>

      {/* Content */}
      <div style={{flex:1,marginLeft:218,padding:"26px 30px"}}>

        {/* ── Overview ── */}
        {sec==="overview"&&(
          <div className="page">
            <div style={{marginBottom:20}}>
              <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD}}>السلام عليكم، {firstName}! 👋</h1>
              <p style={{color:C.textL,fontSize:".83rem",marginTop:3}}>Track your learning, streak, certificates, and notes in one place.</p>
            </div>
            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13,marginBottom:15}}>
              {[{icon:"📚",l:"Enrolled",v:courses.length,col:C.em},{icon:"✅",l:"Lessons Done",v:totalDone,col:C.green},{icon:"🔥",l:"Day Streak",v:streak.count||0,col:C.gold},{icon:"🏆",l:"Certificates",v:completedCourses.length,col:"#7C3AED"}].map((s,i)=>(
                <div key={i} style={{background:"white",borderRadius:12,padding:16,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(11,82,64,.05)"}}>
                  <div style={{fontSize:"1.3rem",marginBottom:5}}>{s.icon}</div>
                  <div style={{fontSize:"1.35rem",fontWeight:800,color:s.col}}>{s.v}</div>
                  <div style={{fontSize:".7rem",color:C.textL,marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{background:"white",borderRadius:12,padding:"14px 16px",border:`1px solid ${C.border}`,marginBottom:22}}>
              <div style={{fontWeight:700,fontSize:".82rem",color:C.emD,marginBottom:4}}>GitHub Pages mode</div>
              <div style={{fontSize:".78rem",color:C.textL,lineHeight:1.65}}>
                Accounts, notes, progress, streaks, and certificates are stored in this browser right now so you can launch the first version statically. When you move to Railway, this same UI can point to a real backend and database.
              </div>
            </div>
            <div style={{marginBottom:22}}><StreakWidget big/></div>
            <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.18rem",color:C.emD,marginBottom:13}}>Continue Learning</h2>
            {courses.length===0 ? (
              <div style={{background:"white",borderRadius:12,padding:26,textAlign:"center",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:"2rem",marginBottom:9}}>📚</div>
                <Btn v="gold" onClick={()=>setPage("courses")} icon="🎓">Browse Courses</Btn>
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13}}>
                {courses.slice(0,4).map(c=>{
                  const tot = totalLessons(c);
                  const dn  = DB.progress(c.id).length;
                  const pct = tot>0?Math.round(dn/tot*100):0;
                  return (
                    <div key={c.id} style={{background:"white",borderRadius:12,padding:16,border:`1px solid ${C.border}`,cursor:"pointer",transition:"box-shadow .2s"}}
                      onClick={()=>openLesson(c)}
                      onMouseEnter={e=>e.currentTarget.style.boxShadow=C.sh}
                      onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:11}}>
                        <div style={{width:40,height:40,borderRadius:8,background:`${c.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.15rem"}}>{c.thumb}</div>
                        <div>
                          <div style={{fontWeight:700,fontSize:".84rem"}}>{c.title}</div>
                          <div style={{fontSize:".68rem",color:C.textL}}>{c.modules.length} modules · {tot} lessons</div>
                        </div>
                      </div>
                      <PBar value={pct} label={`${dn}/${tot} lessons`}/>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── My Courses ── */}
        {sec==="courses"&&(
          <div className="page">
            <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD,marginBottom:18}}>My Courses</h1>
            {courses.length===0 ? (
              <div style={{textAlign:"center",padding:"52px 20px"}}>
                <div style={{fontSize:"2.5rem",marginBottom:11}}>📚</div>
                <Btn v="gold" onClick={()=>setPage("courses")}>Browse Courses</Btn>
              </div>
            ) : (
              <div style={{display:"grid",gap:13}}>
                {courses.map(c=>{
                  const tot = totalLessons(c);
                  const dn  = DB.progress(c.id).length;
                  const pct = tot>0?Math.round(dn/tot*100):0;
                  return (
                    <div key={c.id} style={{background:"white",borderRadius:12,overflow:"hidden",border:`1px solid ${C.border}`}}>
                      <div style={{height:68,background:`linear-gradient(135deg,${c.color},${c.color}80)`,display:"flex",alignItems:"center",padding:"0 18px",gap:13,position:"relative"}}>
                        <Iso op={0.1} col="white"/>
                        <span style={{fontSize:"1.6rem",position:"relative",zIndex:1}}>{c.thumb}</span>
                        <div style={{position:"relative",zIndex:1,flex:1}}>
                          <div style={{color:"white",fontWeight:700,fontSize:".9rem"}}>{c.title}</div>
                          <div style={{color:"rgba(255,255,255,.5)",fontSize:".7rem"}}>{c.instructor} · {c.modules.length} modules</div>
                        </div>
                        {pct===100&&<div style={{position:"relative",zIndex:1}}><Badge col="white">✅ Complete</Badge></div>}
                      </div>
                      <div style={{padding:"14px 17px"}}>
                        <PBar value={pct} label={`Progress: ${dn}/${tot} lessons · ${pct}%`}/>
                        {/* Module breakdown */}
                        <div style={{marginTop:10,display:"flex",gap:5,flexWrap:"wrap"}}>
                          {c.modules.map(mod=>{
                            const mDn = mod.lessons.filter(l=>DB.progress(c.id).includes(l.id)).length;
                            const mPct = Math.round(mDn/mod.lessons.length*100);
                            return (
                              <div key={mod.id} style={{padding:"3px 9px",borderRadius:7,background:C.creamD,fontSize:".68rem",color:C.textM}}>
                                {mod.icon} {mod.title.replace(/Module \d+ — /,"").split(" — ")[0]} · <strong style={{color:mPct===100?C.em:C.textM}}>{mPct}%</strong>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{display:"flex",justifyContent:"flex-end",marginTop:9}}>
                          <Btn size="sm" v="primary" onClick={()=>openLesson(c)}>
                            {dn===0?"▶ Start":pct===100?"🔁 Review":"▶ Continue"} →
                          </Btn>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Streak ── */}
        {sec==="streak"&&(
          <div className="page">
            <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD,marginBottom:18}}>🔥 Learning Streak</h1>
            <div style={{maxWidth:480}}>
              <StreakWidget big/>
              <div style={{background:"white",borderRadius:14,padding:22,border:`1px solid ${C.border}`,marginTop:15}}>
                <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.08rem",fontWeight:700,color:C.text,marginBottom:13}}>How streaks work</div>
                {[
                  {icon:"📺",t:"Watch lessons on-site",d:`Real YouTube lessons auto-complete after ${WATCH_COMPLETE_THRESHOLD}% watched.`},
                  {icon:"📚",t:"Complete a lesson",d:"Each day you finish at least one lesson, that day counts toward your streak."},
                  {icon:"🔥",t:"Build your streak",d:"Consecutive study days keep the chain alive."},
                  {icon:"💔",t:"Don't break it",d:"Missing a day resets the streak back to 1."},
                ].map((s,i)=>(
                  <div key={i} style={{display:"flex",gap:11,marginBottom:13}}>
                    <span style={{fontSize:"1.2rem",flexShrink:0}}>{s.icon}</span>
                    <div>
                      <div style={{fontWeight:700,fontSize:".83rem",color:C.text}}>{s.t}</div>
                      <div style={{fontSize:".76rem",color:C.textL,lineHeight:1.5}}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:`linear-gradient(135deg,${C.emD},${C.em})`,borderRadius:14,padding:20,marginTop:13,textAlign:"center",position:"relative",overflow:"hidden"}}>
                <Iso op={0.08} col={C.gold}/>
                <div style={{position:"relative",zIndex:1}}>
                  <div style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:".92rem",marginBottom:3}}>اطلبوا العلم من المهد إلى اللحد</div>
                  <div style={{color:"rgba(255,255,255,.55)",fontSize:".72rem"}}>"Seek knowledge from the cradle to the grave"</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Notes ── */}
        {sec==="notes"&&(
          <div className="page">
            <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD,marginBottom:18}}>📝 My Notes</h1>
            {Object.keys(notes).filter(id=>notes[id].trim()).length===0 ? (
              <div style={{background:"white",borderRadius:12,padding:32,textAlign:"center",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:"2.3rem",marginBottom:11}}>📝</div>
                <div style={{fontWeight:600,color:C.text,marginBottom:5}}>No notes yet</div>
                <div style={{fontSize:".8rem",color:C.textL,marginBottom:14}}>Take notes inside any lesson. They auto-save and appear here for this learner only.</div>
                <Btn v="primary" onClick={()=>setPage("courses")}>Open a Course</Btn>
              </div>
            ) : (
              <div style={{display:"grid",gap:11}}>
                {COURSES.flatMap(course=>course.modules.flatMap(mod=>mod.lessons.filter(ls=>notes[ls.id]?.trim()).map(ls=>(
                  <div key={ls.id} style={{background:"white",borderRadius:12,padding:18,border:`1px solid ${C.border}`}}>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:11}}>
                      <span style={{fontSize:"1.05rem"}}>{course.thumb}</span>
                      <div>
                        <div style={{fontWeight:700,fontSize:".82rem",color:C.text}}>{ls.title}</div>
                        <div style={{fontSize:".68rem",color:C.textL}}>{course.title} · {mod.title}</div>
                      </div>
                      <Btn size="sm" v="ghost" style={{marginLeft:"auto"}} onClick={()=>openSpecificLesson(course, mod, ls)}>Open →</Btn>
                    </div>
                    <div style={{background:C.cream,borderRadius:8,padding:"9px 13px",fontSize:".8rem",color:C.textM,lineHeight:1.65,whiteSpace:"pre-wrap",maxHeight:110,overflow:"hidden",position:"relative"}}>
                      {notes[ls.id]}
                      <div style={{position:"absolute",bottom:0,left:0,right:0,height:28,background:`linear-gradient(transparent,${C.cream})`}}/>
                    </div>
                  </div>
                ))))}
              </div>
            )}
          </div>
        )}

        {/* ── Certificates ── */}
        {sec==="certs"&&(
          <div className="page">
            <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD,marginBottom:18}}>🏆 Certificates</h1>
            {completedCourses.length===0 ? (
              <div style={{background:"white",borderRadius:12,padding:32,textAlign:"center",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:"2.3rem",marginBottom:11}}>🏆</div>
                <div style={{fontWeight:600,marginBottom:5}}>No certificates yet</div>
                <div style={{fontSize:".8rem",color:C.textL}}>Complete every lesson in a course to unlock a printable certificate.</div>
              </div>
            ) : completedCourses.map(c=>{
              const completion = completions[String(c.id)] || {
                completedAt: dayKey(),
                certificateId: `NUR-${String(c.id).padStart(3, "0")}-${dayKey().replaceAll("-", "")}-${currentUser.id.slice(-4).toUpperCase()}`,
              };
              return (
              <div key={c.id} style={{background:"white",borderRadius:14,border:`2px solid ${C.gold}32`,overflow:"hidden",marginBottom:18,boxShadow:C.shG}}>
                <div style={{background:`linear-gradient(135deg,${C.emD},${C.em})`,padding:"22px 34px",position:"relative",overflow:"hidden"}}>
                  <Iso op={0.1} col={C.gold}/>
                  <div style={{position:"relative",zIndex:1,textAlign:"center"}}>
                    <div style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:"1rem",marginBottom:2}}>نور أكاديمي · Nur Academy</div>
                    <div style={{fontFamily:"'Amiri',serif",color:"white",fontSize:"1.55rem",fontWeight:700}}>Certificate of Completion</div>
                  </div>
                </div>
                <div style={{padding:"20px 34px",textAlign:"center",background:C.cream}}>
                  <div style={{borderTop:`2px solid ${C.gold}28`,borderBottom:`2px solid ${C.gold}28`,padding:"14px 0",margin:"0 0 14px"}}>
                    <div style={{color:C.textL,fontSize:".78rem",marginBottom:5}}>This certifies that</div>
                    <div style={{fontFamily:"'Amiri',serif",fontSize:"1.35rem",color:C.emD,fontWeight:700}}>{currentUser.name}</div>
                    <div style={{color:C.textL,fontSize:".78rem",margin:"5px 0"}}>has successfully completed</div>
                    <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.08rem",color:C.gold,fontWeight:700}}>{c.title}</div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:".7rem",color:C.textL}}>
                    <span>📅 {formatDay(completion.completedAt)}</span>
                    <span>🔐 {completion.certificateId}</span>
                  </div>
                </div>
                <div style={{padding:"11px 34px",background:"white",display:"flex",gap:8,justifyContent:"space-between",alignItems:"center",borderTop:`1px solid ${C.border}`}}>
                  <div style={{fontSize:".72rem",color:copyMsg?C.green:C.textL}}>{copyMsg || "Print now on GitHub Pages. Later, Railway can issue server-verified certificates."}</div>
                  <div style={{display:"flex",gap:8}}>
                    <Btn size="sm" v="outline" onClick={()=>handleCopyId(completion.certificateId)}>🔑 Copy ID</Btn>
                    <Btn size="sm" v="gold" onClick={()=>printCertificate(c, currentUser, completion)}>🖨 Print / Save PDF</Btn>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}

        {/* ── Profile ── */}
        {sec==="profile"&&(
          <div className="page" style={{maxWidth:520}}>
            <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD,marginBottom:18}}>My Profile</h1>
            <div style={{background:"white",borderRadius:14,padding:26,border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",gap:15,alignItems:"center",marginBottom:22}}>
                <div style={{width:66,height:66,borderRadius:"50%",background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"1.4rem",fontWeight:700}}>{initials}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:".98rem"}}>{currentUser.name}</div>
                  <div style={{color:C.textL,fontSize:".78rem"}}>Student since {formatDay(currentUser.joinedAt || dayKey(), { year:"numeric", month:"short" })}</div>
                  <div style={{marginTop:6,fontSize:".72rem",color:C.textL}}>Stored locally in this browser until your Railway backend is connected.</div>
                </div>
              </div>
              {[["Full Name","name"],["Email","email"],["Country","country"],["Language","language"]].map(([l,key])=>(
                <div key={l} style={{marginBottom:13}}>
                  <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>{l}</label>
                  <input value={profile[key]} onChange={e=>setProfile(prev => ({ ...prev, [key]: e.target.value }))}
                    style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".85rem",background:C.cream}}/>
                </div>
              ))}
              {profileMsg&&<div style={{marginBottom:12,fontSize:".78rem",color:profileMsg.includes("saved")?C.green:C.red}}>{profileMsg}</div>}
              <Btn v="primary" onClick={handleProfileSave}>Save Changes</Btn>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const LoginPage = ({ setPage, onLogin }) => {
  const [form, setForm] = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const go = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await Auth.login(form);
      await wait(250);
      onLogin(user);
      setPage(user.role==="admin" ? "admin" : "dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{paddingTop:64,minHeight:"100vh",background:`linear-gradient(160deg,${C.emD},${C.em})`,display:"flex",alignItems:"center",justifyContent:"center",padding:"64px 20px 36px",position:"relative"}}>
      <Iso op={0.06} col={C.gold}/>
      <div style={{background:"white",borderRadius:20,padding:38,maxWidth:410,width:"100%",position:"relative",zIndex:1,boxShadow:"0 26px 66px rgba(0,0,0,.24)"}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{width:46,height:46,borderRadius:11,background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 9px"}}>
            <svg width="23" height="23" viewBox="0 0 22 22"><polygon points="11,2 13,8 19,8 14,12 16,18 11,14 6,18 8,12 3,8 9,8" fill="white"/></svg>
          </div>
          <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.45rem",color:C.emD}}>Welcome Back</h1>
          <p style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:".88rem"}}>أهلاً وسهلاً</p>
        </div>
        <Divider/>
        <div style={{marginTop:18}}>
          {[["Email","email","student@you.com","📧"],["Password","password","Minimum 8 characters","🔒"]].map(([label,type,placeholder,icon])=>(
            <div key={label} style={{marginBottom:13}}>
              <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>{label}</label>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}>{icon}</span>
                <input type={type} value={form[type]} onChange={e=>setForm(prev => ({ ...prev, [type]: e.target.value }))}
                  placeholder={placeholder}
                  style={{width:"100%",padding:"10px 12px 10px 35px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:".85rem",background:C.cream}}/>
              </div>
            </div>
          ))}
          {error&&<div style={{marginBottom:12,fontSize:".78rem",color:C.red}}>{error}</div>}
          <button className="btn" onClick={go} disabled={loading || !form.email || !form.password}
            style={{width:"100%",justifyContent:"center",padding:12,borderRadius:11,background:loading?C.textL:`linear-gradient(135deg,${C.em},${C.gold})`,color:"white",fontSize:".93rem",fontWeight:700,boxShadow:"0 4px 16px rgba(11,82,64,.24)"}}>
            {loading?<><div style={{width:15,height:15,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>Signing in…</>:"Sign In →"}
          </button>
          <p style={{textAlign:"center",marginTop:14,fontSize:".78rem",color:C.textL}}>
            No account? <span onClick={()=>setPage("register")} style={{color:C.em,fontWeight:600,cursor:"pointer"}}>Join Free</span>
          </p>
          <div style={{marginTop:11,padding:"10px 12px",background:`${C.gold}0E`,borderRadius:8,border:`1px solid ${C.gold}22`}}>
            <div style={{fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:5}}>Local demo accounts</div>
            <div style={{fontSize:".72rem",color:C.textM,lineHeight:1.65}}>
              Student: <strong>{DEMO_STUDENT_EMAIL}</strong> / <strong>{DEMO_STUDENT_PASSWORD}</strong><br/>
              Admin: <strong>{DEMO_ADMIN_EMAIL}</strong> / <strong>{DEMO_ADMIN_PASSWORD}</strong>
            </div>
            <div style={{fontSize:".68rem",color:C.textL,marginTop:6}}>These accounts live only in this browser while the site is hosted statically.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── REGISTER ─────────────────────────────────────────────────────────────────
const RegisterPage = ({ setPage, onRegister }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const go = async () => {
    setError("");
    if (!form.firstName.trim() || !form.lastName.trim()) return setError("Please enter your full name.");
    if (!form.email.trim()) return setError("Please enter your email.");
    if (form.password.trim().length < 8) return setError("Password must be at least 8 characters.");
    if (!form.agreed) return setError("Please accept the terms to continue.");

    setLoading(true);
    try {
      const user = await Auth.register(form);
      await wait(250);
      onRegister(user);
      setPage("dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{paddingTop:64,minHeight:"100vh",background:`linear-gradient(160deg,${C.emD},${C.em})`,display:"flex",alignItems:"center",justifyContent:"center",padding:"64px 20px 36px",position:"relative"}}>
      <Iso op={0.06} col={C.gold}/>
      <div style={{background:"white",borderRadius:20,padding:38,maxWidth:430,width:"100%",position:"relative",zIndex:1,boxShadow:"0 26px 66px rgba(0,0,0,.24)"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.45rem",color:C.emD}}>Join Nur Academy</h1>
          <p style={{fontFamily:"'Amiri',serif",color:C.gold}}>انضم إلى نور أكاديمي</p>
        </div>
        <Divider/>
        <div style={{marginTop:18}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:11}}>
            {[["First Name","firstName","Ahmad"],["Last Name","lastName","Al-Farsi"]].map(([label,key,placeholder])=>(
              <div key={label}>
                <label style={{display:"block",fontSize:".68rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>{label}</label>
                <input value={form[key]} onChange={e=>setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{width:"100%",padding:"8px 11px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".83rem",background:C.cream}}/>
              </div>
            ))}
          </div>
          {[["Email","email","student@you.com"],["Password","password","Minimum 8 characters"]].map(([label,key,placeholder])=>(
            <div key={label} style={{marginBottom:11}}>
              <label style={{display:"block",fontSize:".68rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>{label}</label>
              <input type={key==="password"?"password":"email"} value={form[key]} onChange={e=>setForm(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{width:"100%",padding:"8px 11px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".83rem",background:C.cream}}/>
            </div>
          ))}
          <label style={{display:"flex",gap:7,alignItems:"flex-start",margin:"13px 0",cursor:"pointer"}}>
            <input type="checkbox" checked={form.agreed} onChange={e=>setForm(prev => ({ ...prev, agreed: e.target.checked }))} style={{marginTop:2,accentColor:C.em}}/>
            <span style={{fontSize:".76rem",color:C.textM,lineHeight:1.5}}>I agree to the <span style={{color:C.em}}>Terms</span> and <span style={{color:C.em}}>Privacy Policy</span></span>
          </label>
          {error&&<div style={{marginBottom:12,fontSize:".78rem",color:C.red}}>{error}</div>}
          <button className="btn" onClick={go} disabled={loading}
            style={{width:"100%",justifyContent:"center",padding:12,borderRadius:11,background:loading?C.textL:`linear-gradient(135deg,${C.gold},${C.goldL})`,color:"white",fontSize:".93rem",fontWeight:700,boxShadow:"0 4px 16px rgba(201,168,76,.26)"}}>
            {loading?<><div style={{width:15,height:15,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>Creating…</>:"🌟 Create Free Account"}
          </button>
          <p style={{textAlign:"center",marginTop:13,fontSize:".78rem",color:C.textL}}>
            Already have an account? <span onClick={()=>setPage("login")} style={{color:C.em,fontWeight:600,cursor:"pointer"}}>Sign In</span>
          </p>
          <div style={{marginTop:11,padding:"8px 12px",background:`${C.gold}0E`,borderRadius:8,border:`1px solid ${C.gold}22`,textAlign:"center"}}>
            <div style={{fontSize:".68rem",color:C.textM}}>Accounts created on GitHub Pages stay in this browser until you move auth to Railway.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const AboutPage = () => (
  <div className="page" style={{paddingTop:64}}>
    <div style={{background:`linear-gradient(160deg,${C.emD},${C.em})`,padding:"56px 5%",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <Iso op={0.07} col={C.gold}/>
      <div style={{position:"relative",zIndex:1,maxWidth:640,margin:"0 auto"}}>
        <h1 style={{fontFamily:"'Amiri',serif",fontSize:"2.1rem",color:"white",marginBottom:4}}>About Nur Academy</h1>
        <p style={{fontFamily:"'Amiri',serif",color:C.gold,marginBottom:15}}>عن نور أكاديمي</p>
        <Divider col={C.gold}/>
        <p style={{color:"rgba(255,255,255,.68)",lineHeight:1.8,marginTop:15,fontSize:".93rem"}}>
          Nur Academy brings authentic Islamic knowledge to your screen — with YouTube-powered lessons, structured modules, personal notes, and daily streak tracking. The name "Nur" (نور) means light — because knowledge is the light that guides the believer.
        </p>
      </div>
    </div>
    <div style={{padding:"56px 5%",background:C.cream,maxWidth:980,margin:"0 auto"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:15,marginBottom:30}}>
        {[{v:"2020",l:"Founded"},{v:"80+",l:"Countries"},{v:"45+",l:"Scholars"},{v:"12K+",l:"Students"}].map(s=>(
          <div key={s.l} style={{background:"white",borderRadius:12,padding:20,textAlign:"center",border:`1px solid ${C.border}`}}>
            <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.75rem",fontWeight:700,color:C.em}}>{s.v}</div>
            <div style={{fontSize:".73rem",color:C.textL,marginTop:3}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{padding:22,background:`${C.em}07`,borderRadius:13,borderLeft:`4px solid ${C.gold}`}}>
        <p style={{fontFamily:"'Amiri',serif",color:C.emD,fontSize:".96rem",lineHeight:1.7,fontStyle:"italic"}}>
          "Seeking knowledge is an obligation upon every Muslim." — Prophet Muhammad ﷺ
        </p>
      </div>
    </div>
  </div>
);

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const ContactPage = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="page" style={{paddingTop:64}}>
      <div style={{background:`linear-gradient(160deg,${C.emD},${C.em})`,padding:"50px 5%",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <Iso op={0.07} col={C.gold}/>
        <h1 style={{fontFamily:"'Amiri',serif",fontSize:"2rem",color:"white",position:"relative",zIndex:1}}>Contact Us</h1>
        <p style={{fontFamily:"'Amiri',serif",color:C.gold,position:"relative",zIndex:1}}>تواصل معنا</p>
      </div>
      <div style={{padding:"48px 5%",background:C.cream,maxWidth:950,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:44}}>
        <div>
          <h2 style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD,marginBottom:18}}>Get In Touch</h2>
          {[{icon:"📧",l:"Email",v:"info@nuracademy.com"},{icon:"💬",l:"WhatsApp",v:"+1 (555) 123-4567"},{icon:"🌍",l:"Community",v:"discord.gg/nuracademy"}].map((c,i)=>(
            <div key={i} style={{display:"flex",gap:12,marginBottom:13,padding:13,background:"white",borderRadius:10,border:`1px solid ${C.border}`}}>
              <span style={{fontSize:"1.3rem"}}>{c.icon}</span>
              <div><div style={{fontWeight:700,fontSize:".76rem",color:C.textM,textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>{c.l}</div><div style={{color:C.em,fontSize:".83rem"}}>{c.v}</div></div>
            </div>
          ))}
        </div>
        <div style={{background:"white",borderRadius:16,padding:28,border:`1px solid ${C.border}`,boxShadow:C.sh}}>
          {!sent ? (
            <>
              <h3 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.18rem",color:C.emD,marginBottom:17}}>Send a Message</h3>
              {[["Name","text","Ahmad Al-Farsi"],["Email","email","ahmad@email.com"],["Subject","text","Course inquiry"]].map(([l,t,ph])=>(
                <div key={l} style={{marginBottom:12}}>
                  <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>{l}</label>
                  <input type={t} placeholder={ph} style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".83rem"}}/>
                </div>
              ))}
              <div style={{marginBottom:16}}>
                <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Message</label>
                <textarea rows={4} placeholder="How can we help?" style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".83rem",resize:"vertical"}}/>
              </div>
              <Btn v="primary" style={{width:"100%",justifyContent:"center"}} onClick={()=>setSent(true)}>📨 Send Message</Btn>
            </>
          ) : (
            <div style={{textAlign:"center",padding:"30px 0"}}>
              <div style={{fontSize:"2.6rem",marginBottom:11}}>✅</div>
              <h3 style={{fontFamily:"'Amiri',serif",fontSize:"1.28rem",color:C.em,marginBottom:5}}>JazakAllahu Khayran!</h3>
              <p style={{color:C.textM,fontSize:".84rem"}}>We'll respond within 24 hours, in sha Allah.</p>
              <Btn v="outline" style={{marginTop:15}} onClick={()=>setSent(false)}>Send Another</Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN ────────────────────────────────────────────────────────────────────
const AdminPage = ({ setPage, currentUser }) => {
  const [sec,     setSec    ] = useState("overview");
  const [showAdd, setShowAdd] = useState(false);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="page" style={{paddingTop:64,minHeight:"100vh",background:C.cream,display:"flex",alignItems:"center",justifyContent:"center",padding:"64px 20px"}}>
        <div style={{maxWidth:460,background:"white",borderRadius:16,padding:28,border:`1px solid ${C.border}`,boxShadow:C.sh,textAlign:"center"}}>
          <div style={{fontSize:"2.2rem",marginBottom:11}}>🔒</div>
          <h1 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.35rem",color:C.emD,marginBottom:8}}>Admin Access Required</h1>
          <p style={{fontSize:".84rem",color:C.textL,lineHeight:1.7,marginBottom:16}}>The admin panel is now limited to signed-in admin accounts only. Use the seeded admin login or connect real role-based auth when you move to Railway.</p>
          <Btn v="primary" onClick={()=>setPage("dashboard")}>Return to Dashboard</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{paddingTop:64,display:"flex",minHeight:"100vh",background:"#F0F0F5"}}>
      <div style={{width:200,background:C.emD,padding:"18px 10px",position:"fixed",top:64,bottom:0}}>
        <div style={{padding:"9px 6px 17px",borderBottom:"1px solid rgba(255,255,255,.1)",marginBottom:9}}>
          <div style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:".83rem"}}>نور أكاديمي</div>
          <div style={{color:"white",fontWeight:700,fontSize:".78rem"}}>Admin Panel</div>
        </div>
        {[["📊","Overview","overview"],["📚","Courses","courses"],["👥","Students","students"],["📝","Quizzes","quizzes"]].map(([ic,l,k])=>(
          <div key={k} onClick={()=>setSec(k)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 11px",borderRadius:7,cursor:"pointer",marginBottom:2,transition:"all .2s",background:sec===k?"rgba(201,168,76,.18)":"transparent",color:sec===k?C.gold:"rgba(255,255,255,.52)",fontSize:".8rem",fontWeight:sec===k?600:400}}>
            <span>{ic}</span>{l}
          </div>
        ))}
        <div onClick={()=>setPage("dashboard")} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 11px",cursor:"pointer",color:"rgba(255,100,100,.65)",fontSize:".8rem",marginTop:18}}>
          <span>🚪</span>Exit Admin
        </div>
      </div>
      <div style={{flex:1,marginLeft:200,padding:"22px 26px"}}>
        {sec==="overview"&&(
          <div className="page">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <h1 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.45rem",color:"#1A1A2E"}}>Admin Overview</h1>
              <Btn v="gold" icon="+" onClick={()=>setShowAdd(true)}>Add Course</Btn>
            </div>
            <div style={{background:"white",borderRadius:12,padding:"13px 16px",boxShadow:"0 2px 8px rgba(0,0,0,.06)",marginBottom:16,fontSize:".78rem",color:"#6B7280",lineHeight:1.6}}>
              This admin panel is read-only while you are on GitHub Pages. When you move to Railway, connect these screens to your API for real course, student, and certificate management.
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13,marginBottom:20}}>
              {[{icon:"👥",l:"Students",v:"12,847",col:C.em},{icon:"📚",l:"Courses",v:"9",col:C.gold},{icon:"📦",l:"Total Modules",v:String(COURSES.reduce((a,c)=>a+c.modules.length,0)),col:"#7C3AED"},{icon:"💰",l:"Revenue",v:"$18,940",col:C.green}].map((s,i)=>(
                <div key={i} style={{background:"white",borderRadius:12,padding:16,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:"1.25rem",marginBottom:5}}>{s.icon}</div>
                  <div style={{fontSize:"1.35rem",fontWeight:800,color:s.col}}>{s.v}</div>
                  <div style={{fontSize:".68rem",color:"#6B7280",marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
              <div style={{padding:"13px 17px",borderBottom:"1px solid #E5E7EB",fontWeight:700,fontSize:".86rem",color:"#1A1A2E"}}>All Courses</div>
              <table>
                <thead><tr>{["Course","Category","Modules","Lessons","Students","Price"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {COURSES.map(c=>(
                    <tr key={c.id}>
                      <td>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <div style={{width:30,height:30,borderRadius:6,background:`${c.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".9rem"}}>{c.thumb}</div>
                          <div><div style={{fontWeight:600,fontSize:".8rem"}}>{c.title}</div><div style={{fontSize:".66rem",color:"#9CA3AF"}}>{c.instructor}</div></div>
                        </div>
                      </td>
                      <td><Badge col={C.em}>{c.category}</Badge></td>
                      <td style={{fontWeight:700}}>{c.modules.length}</td>
                      <td style={{fontWeight:700}}>{totalLessons(c)}</td>
                      <td style={{fontWeight:700}}>{c.students.toLocaleString()}</td>
                      <td><Badge col={c.isFree?C.em:C.gold}>{c.isFree?"Free":`$${c.price}`}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {sec!=="overview"&&(
          <div className="page">
            <h1 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.45rem",color:"#1A1A2E",marginBottom:18,textTransform:"capitalize"}}>{sec}</h1>
            <div style={{background:"white",borderRadius:12,padding:28,textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
              <div style={{fontSize:"1.8rem",marginBottom:11}}>🛠️</div>
              <div style={{color:"#6B7280",fontSize:".85rem",marginBottom:14}}>Connect to your FastAPI backend to manage {sec} via the REST API.</div>
              <div style={{padding:"12px 16px",background:"#F9FAFB",borderRadius:8,fontSize:".75rem",color:"#374151",textAlign:"left",fontFamily:"monospace",display:"inline-block"}}>
                GET /api/admin/{sec}<br/>POST /api/admin/{sec}<br/>PUT /api/admin/{sec}/&#123;id&#125;<br/>DELETE /api/admin/{sec}/&#123;id&#125;
              </div>
            </div>
          </div>
        )}
      </div>
      {showAdd&&(
        <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)setShowAdd(false);}}>
          <div style={{background:"white",borderRadius:17,padding:30,maxWidth:490,width:"90%"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.25rem",color:C.emD}}>Add New Course</h2>
              <button onClick={()=>setShowAdd(false)} style={{background:"none",border:"none",fontSize:"1.3rem",cursor:"pointer"}}>×</button>
            </div>
            {[["Course Title","text","e.g. Fiqh of Prayer"],["Arabic Title","text","e.g. فقه الصلاة"],["YouTube Playlist ID","text","e.g. PLxxxxxxxxxxx"],["Instructor","text","Sheikh Name"]].map(([l,t,ph])=>(
              <div key={l} style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>{l}</label>
                <input type={t} placeholder={ph} style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".85rem"}}/>
              </div>
            ))}
            <div style={{display:"flex",gap:9,marginTop:4}}>
              <Btn v="outline" onClick={()=>setShowAdd(false)}>Cancel</Btn>
              <Btn v="primary" onClick={()=>setShowAdd(false)}>✓ Create Course</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page,       setPage      ] = useState("home");
  const [currentUser,setCurrentUser] = useState(null);
  const [authReady,  setAuthReady ] = useState(false);
  const [course,     setCourse    ] = useState(null);
  // lessonData: { course, mi (moduleIndex), li (lessonIndex) }
  const [lessonData, setLesson] = useState(null);

  useEffect(() => {
    injectCSS();
    let active = true;
    const syncUser = () => { if (active) setCurrentUser(Auth.current()); };
    (async () => {
      await Auth.ensureSeeded();
      syncUser();
      if (active) setAuthReady(true);
    })();
    window.addEventListener("nur:data", syncUser);
    return () => {
      active = false;
      window.removeEventListener("nur:data", syncUser);
    };
  }, []);
  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);
  useEffect(() => {
    if (!authReady) return;
    if (!currentUser && ["dashboard","lesson","admin"].includes(page)) setPage("login");
    if (currentUser && currentUser.role !== "admin" && page === "admin") setPage("dashboard");
  }, [authReady, currentUser, page]);

  const loggedIn = Boolean(currentUser);
  const handleLogin = (user) => setCurrentUser(user);
  const handleUserUpdated = (user) => setCurrentUser(user);
  const handleSignOut = () => {
    Auth.signOut();
    setCurrentUser(null);
    setLesson(null);
    setPage("home");
  };

  const noNav    = ["lesson"].includes(page);
  const noFooter = ["lesson","dashboard","admin","login","register"].includes(page);

  if (!authReady) {
    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:C.cream}}>
        <div style={{textAlign:"center"}}>
          <div style={{width:56,height:56,borderRadius:"50%",margin:"0 auto 14px",background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:"1.1rem"}}>{`نور`}</div>
          <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.15rem",color:C.emD}}>Preparing Nur Academy…</div>
        </div>
      </div>
    );
  }

  return (
    <AppCrashBoundary>
      <div style={{minHeight:"100vh"}}>
        {!noNav&&<Navbar page={page} setPage={setPage} currentUser={currentUser} onSignOut={handleSignOut}/>}

        {page==="home"          && <HomePage        setPage={setPage} setCourse={setCourse}/>}
        {page==="courses"       && <CoursesPage      setPage={setPage} setCourse={setCourse}/>}
        {page==="course-detail" && <CourseDetailPage course={course}   setPage={setPage} setLesson={setLesson} loggedIn={loggedIn}/>}
        {page==="lesson"        && <LessonPage       lessonData={lessonData} setPage={setPage} setLesson={setLesson}/>}
        {page==="dashboard"     && <DashboardPage    currentUser={currentUser} onSignOut={handleSignOut} onUserUpdated={handleUserUpdated} setPage={setPage} setLesson={(d)=>{ setLesson(d); setPage("lesson"); }}/>}
        {page==="admin"         && <AdminPage        currentUser={currentUser} setPage={setPage}/>}
        {page==="login"         && <LoginPage        setPage={setPage} onLogin={handleLogin}/>}
        {page==="register"      && <RegisterPage     setPage={setPage} onRegister={handleLogin}/>}
        {page==="about"         && <AboutPage/>}
        {page==="contact"       && <ContactPage/>}

        {!noFooter&&<Footer/>}

        {/* Floating admin shortcut */}
        {currentUser?.role==="admin"&&!["admin","lesson"].includes(page)&&(
          <button className="btn" onClick={()=>setPage("admin")}
            style={{position:"fixed",bottom:20,right:20,zIndex:200,background:C.emD,color:C.gold,border:`1px solid ${C.gold}28`,padding:"8px 14px",borderRadius:10,fontSize:".73rem",boxShadow:"0 6px 18px rgba(0,0,0,.25)"}}>
            ⚙️ Admin
          </button>
        )}
      </div>
    </AppCrashBoundary>
  );
}
