import CertificatePage, { exportCertificatePdf } from "./components/CertificatePage";
import { Component, useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import sealImage from "./assets/nur_seal.png";
import signatureImage from "./assets/signature.png";
import { supabase } from "./lib/supabase";
import HadiyaSupportCard from "./components/HadiyaSupportCard";
import { AASAN_ARABIC_GRAMMAR_PLAYLIST_ID, AASAN_ARABIC_GRAMMAR_PLAYLIST_ITEMS } from "./data/aasanArabicGrammarPlaylist";
import { AQIDAH_ENGLISH_PLAYLIST_ID, AQIDAH_ENGLISH_PLAYLIST_ITEMS } from "./data/aqidahEnglishPlaylist";
import { AQIDAH_NEW_PLAYLIST_ID, AQIDAH_NEW_PLAYLIST_ITEMS } from "./data/aqidahNewPlaylist";
import { AQIDAH_URDU_PLAYLIST_ID, AQIDAH_URDU_PLAYLIST_ITEMS } from "./data/aqidahUrduPlaylist";
import { AJOOROOMIYYA_PLAYLIST_ID, AJOOROOMIYYA_PLAYLIST_ITEMS } from "./data/ajooroomiyyaPlaylist";
import { ARABIYYA_BAYNA_YADAYK_PLAYLIST_ID, ARABIYYA_BAYNA_YADAYK_PLAYLIST_ITEMS } from "./data/arabiyyaBaynaYadaykPlaylist";
import { ARBI_KA_MUALLIM_PLAYLIST_ID, ARBI_KA_MUALLIM_PLAYLIST_ITEMS } from "./data/arbiKaMuallimPlaylist";
import { HAJJ_PLAYLIST_ID, HAJJ_PLAYLIST_ITEMS } from "./data/hajjPlaylist";
import { HIFZ_QURAN_PLAYLIST_ID, HIFZ_QURAN_PLAYLIST_ITEMS } from "./data/hifzQuranPlaylist";
import { INSURANCE_PLAYLIST_ID, INSURANCE_PLAYLIST_ITEMS } from "./data/insurancePlaylist";
import { LISANUL_QURAN_PLAYLIST_ID, LISANUL_QURAN_PLAYLIST_ITEMS } from "./data/lisanulQuranPlaylist";
import { ILM_UN_NAHW_PLAYLIST_ID, ILM_UN_NAHW_PLAYLIST_ITEMS } from "./data/ilmUnNahwPlaylist";
import { ILM_US_SARF_PLAYLIST_ID, ILM_US_SARF_PLAYLIST_ITEMS } from "./data/ilmUsSarfPlaylist";
import { ISLAMIC_BASICS_PLAYLIST_ID, ISLAMIC_BASICS_PLAYLIST_ITEMS } from "./data/islamicBasicsPlaylist";
import { MADANI_QAIDA_PLAYLIST_ID, MADANI_QAIDA_PLAYLIST_ITEMS } from "./data/madaniQaidaPlaylist";
import { MADINAH_ARABIC_BOOK_2_ENGLISH_PLAYLIST_ID, MADINAH_ARABIC_BOOK_2_ENGLISH_PLAYLIST_ITEMS } from "./data/madinahArabicBook2EnglishPlaylist";
import { MADINAH_ARABIC_BOOK_1_URDU_PLAYLIST_ID, MADINAH_ARABIC_BOOK_1_URDU_PLAYLIST_ITEMS } from "./data/madinahArabicBook1UrduPlaylist";
import { MADINAH_ARABIC_BOOK_2_URDU_PLAYLIST_ID, MADINAH_ARABIC_BOOK_2_URDU_PLAYLIST_ITEMS } from "./data/madinahArabicBook2UrduPlaylist";
import { MADINAH_ARABIC_BOOK_3_URDU_PLAYLIST_ID, MADINAH_ARABIC_BOOK_3_URDU_PLAYLIST_ITEMS } from "./data/madinahArabicBook3UrduPlaylist";
import { MADINAH_ARABIC_ENGLISH_PLAYLIST_ID, MADINAH_ARABIC_ENGLISH_PLAYLIST_ITEMS } from "./data/madinahArabicEnglishPlaylist";
import { MUSLIM_SHARIF_PLAYLIST_ID, MUSLIM_SHARIF_PLAYLIST_ITEMS } from "./data/muslimSharifPlaylist";
import { MUALIM_UL_QURAN_PLAYLIST_ID, MUALIM_UL_QURAN_PLAYLIST_ITEMS } from "./data/mualimUlQuranPlaylist";
import { NOORANI_QAIDA_A_PLAYLIST_ID, NOORANI_QAIDA_A_PLAYLIST_ITEMS } from "./data/nooraniQaidaAPlaylist";
import { NOORANI_QAIDA_B_PLAYLIST_ID, NOORANI_QAIDA_B_PLAYLIST_ITEMS } from "./data/nooraniQaidaBPlaylist";
import { PROPHETIC_LIFE_PLAYLIST_ID, PROPHETIC_LIFE_PLAYLIST_ITEMS } from "./data/propheticLifePlaylist";
import { PROPHETIC_PARENTING_PLAYLIST_ID, PROPHETIC_PARENTING_PLAYLIST_ITEMS } from "./data/propheticParentingPlaylist";
import { QAIDA_TRACK_TWO_PLAYLIST_ID, QAIDA_TRACK_TWO_PLAYLIST_ITEMS } from "./data/qaidaTrackTwoPlaylist";
import { RECITE_QURAN_PROPERLY_PLAYLIST_ID, RECITE_QURAN_PROPERLY_PLAYLIST_ITEMS } from "./data/reciteQuranProperlyPlaylist";
import { SHORT_SEERAH_PLAYLIST_ID, SHORT_SEERAH_PLAYLIST_ITEMS } from "./data/shortSeerahPlaylist";
import { SISTERS_TAJWEED_PLAYLIST_ID, SISTERS_TAJWEED_PLAYLIST_ITEMS } from "./data/sistersTajweedPlaylist";
import { TAJWEED_COURSE_PLAYLIST_ID, TAJWEED_COURSE_PLAYLIST_ITEMS } from "./data/tajweedCoursePlaylist";
import { TAJWEED_QIRAAT_PLAYLIST_ID, TAJWEED_QIRAAT_PLAYLIST_ITEMS } from "./data/tajweedQiraatPlaylist";
import { USOOL_HADITH_PLAYLIST_ID, USOOL_HADITH_PLAYLIST_ITEMS } from "./data/usoolHadithPlaylist";

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
    button{font:inherit}
    .navL{transition:color .2s;cursor:pointer}
    .navL:hover{color:${C.gold}!important}
    .nav-shell{position:relative;display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px}
    .nav-toggle{display:none;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;border:1px solid transparent;background:transparent;cursor:pointer;transition:all .2s}
    .nav-panel{display:flex;align-items:center;justify-content:space-between;gap:12px;flex:1}
    .nav-links{display:flex;align-items:center;gap:3px;flex-wrap:wrap}
    .nav-actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap;justify-content:flex-end}
    .footer-grid,.grid-4,.grid-3,.grid-2,.split-grid{display:grid}
    .footer-bottom{display:flex;justify-content:space-between;gap:14px}
    .tabs-scroll{overflow-x:auto;overflow-y:hidden;scrollbar-width:none}
    .tabs-scroll::-webkit-scrollbar{display:none}
    .table-wrap{overflow:auto}
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
    .contact-hero-shell,.contact-main-grid{width:min(100%,1180px);margin:0 auto}
    .contact-hero-actions,.contact-form-actions{display:flex;gap:12px;flex-wrap:wrap}
    .contact-hero-actions .btn,.contact-form-actions .btn{justify-content:center}
    .contact-info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;max-width:720px}
    .contact-quick-topics{display:flex;flex-wrap:wrap;gap:8px}
    .contact-card{min-width:0}

    @media (max-width:1100px){
      .grid-4{grid-template-columns:repeat(2,minmax(0,1fr))!important}
      .grid-3{grid-template-columns:repeat(2,minmax(0,1fr))!important}
      .split-grid{grid-template-columns:1fr!important}
      .dashboard-shell,.admin-shell{display:block!important}
      .dashboard-sidebar,.admin-sidebar{position:static!important;width:auto!important;top:auto!important;bottom:auto!important;overflow:visible!important;max-height:none!important}
      .dashboard-content,.admin-content{margin-left:0!important;padding:20px 20px 28px!important}
      .dashboard-sidebar{border-right:none!important;border-bottom:1px solid ${C.border}!important}
      .admin-sidebar{border-bottom:1px solid rgba(255,255,255,.12)!important}
      .lesson-main{flex-direction:column!important;overflow:visible!important}
      .lesson-content{overflow:visible!important}
      .lesson-sidebar{width:100%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,.06)!important}
      .home-stat-row,.course-detail-meta,.course-detail-heading,.dashboard-cert-footer,.admin-header,.profile-head{flex-wrap:wrap!important}
      .dashboard-highlight-grid{grid-template-columns:1fr!important}
    }

    @media (max-width:768px){
      .nav-shell{height:auto!important;min-height:64px!important;padding:12px 0!important}
      .nav-toggle{display:inline-flex!important}
      .nav-panel{display:none!important;position:absolute;top:calc(100% + 10px);left:0;right:0;flex-direction:column;align-items:stretch;gap:12px;padding:14px;background:rgba(255,255,255,.98);border:1px solid ${C.border};border-radius:18px;box-shadow:${C.sh}}
      .nav-panel.open{display:flex!important}
      .nav-links,.nav-actions{width:100%;flex-direction:column;align-items:stretch!important}
      .navL{text-align:center}
      .nav-actions .btn{width:100%;justify-content:center}
      .nav-avatar{width:100%!important;height:auto!important;border-radius:12px!important;padding:10px 14px!important}
      .footer-grid,.grid-4,.grid-3,.grid-2{grid-template-columns:1fr!important}
      .footer-bottom,.course-detail-heading,.course-detail-meta,.course-detail-instructor,.lesson-topbar,.lesson-actions,.dashboard-cert-footer,.profile-head,.admin-header{flex-direction:column!important;align-items:flex-start!important}
      .home-stat-row{gap:14px!important}
      .lesson-progress{width:100%!important}
      .lesson-spacer{display:none!important}
      .dashboard-content,.admin-content{padding:18px 14px 24px!important}
      .dashboard-sidebar,.admin-sidebar{padding:14px 12px!important}
      .auth-card{padding:28px 22px!important}
      .auth-name-grid{grid-template-columns:1fr!important}
      .action-row{width:100%;flex-direction:column!important}
      .action-row .btn{width:100%;justify-content:center}
      .table-wrap table{min-width:680px}
      .course-detail-enroll{width:100%!important}
      .contact-hero-shell,.contact-main-grid{width:100%!important}
      .contact-hero-actions,.contact-form-actions{flex-direction:column!important}
      .contact-hero-actions .btn,.contact-form-actions .btn{width:100%!important}
      .contact-info-grid{grid-template-columns:1fr!important;max-width:none!important}
      .contact-quick-topics{display:grid!important;grid-template-columns:1fr 1fr}
      .contact-card{padding:20px!important;border-radius:18px!important}
    }
  `;
  document.head.appendChild(s);
};

// ─── localStorage helpers ────────────────────────────────────────────────────
const PRIMARY_ADMIN_NAME = "Dar Ishfaq";
const PRIMARY_ADMIN_EMAIL = "moeedkamraan1123@gmail.com";
const PRIMARY_ADMIN_PASSWORD_HASH = "11ef569de49831adfc2176f885eee9b97c858782e285a7433d1cba44a7716f6e";
const LEGACY_DEMO_IDS = new Set(["nur_admin_demo", "nur_student_demo"]);
const LEGACY_DEMO_EMAILS = new Set(["admin@nuracademy.com", "student@nuracademy.com"]);
const WATCH_COMPLETE_THRESHOLD = 90;
const CERTIFICATE_WATCH_THRESHOLD = 75;
const WATCH_TICK_MS = 1000;
const YT_API_SRC = "https://www.youtube.com/iframe_api";
const BRAND_LOGO_SRC = `${import.meta.env.BASE_URL}favicon.png`;

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
  COURSES: "nur_courses_v1",
  SUPPORT: "nur_support_v1",
  YT_DURATIONS: "nur_youtube_durations_v1",
  LOGIN_EMAIL: "nur_login_email_v1",
};
const clearNurBrowserData = () => {
  ls.remove(K.USERS);
  ls.remove(K.SESSION);
  ls.remove(K.DATA);
  ls.remove(K.SUPPORT);
  ls.remove(K.YT_DURATIONS);
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const normalizeEmail = (value="") => value.trim().toLowerCase();
const isPrimaryAdminEmail = (value="") => normalizeEmail(value) === PRIMARY_ADMIN_EMAIL;
const isPrimaryAdminUser = (user) => Boolean(user) && (user.id === "nur_admin_primary" || isPrimaryAdminEmail(user.email));
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
const formatDateTime = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isFinite(date.getTime())
    ? date.toLocaleString("en-IN", {
      year:"numeric",
      month:"short",
      day:"numeric",
      hour:"numeric",
      minute:"2-digit",
    })
    : "—";
};
const escapeHtml = (value="") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
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
const dataUrlBytes = (dataUrl="") => {
  const parts = String(dataUrl).split(",", 2);
  const body = parts[1] || "";
  const padding = (body.match(/=*$/)?.[0].length || 0);
  return Math.max(0, Math.floor(body.length * 3 / 4) - padding);
};
const formatBytes = (bytes=0) => {
  const size = Math.max(0, safeNum(bytes, 0));
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(size >= 10 * 1024 ? 0 : 1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result || ""));
  reader.onerror = () => reject(new Error("The screenshot could not be read on this browser."));
  reader.readAsDataURL(file);
});
const loadImage = (src) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error("The screenshot preview could not be prepared."));
  image.src = src;
});
const SUPPORT_SCREENSHOT_TARGET_MIN_BYTES = 100 * 1024;
const SUPPORT_SCREENSHOT_TARGET_MAX_BYTES = 150 * 1024;
const SUPPORT_SCREENSHOT_TARGET_BYTES = 125 * 1024;
const SUPPORT_SCREENSHOT_MAX_DIMENSION = 1280;
const SUPPORT_SCREENSHOT_INPUT_ACCEPT = "image/png,image/jpeg,image/webp";
const renderSupportScreenshotCandidate = (image, maxDimension, quality) => {
  const longestSide = Math.max(image.naturalWidth || image.width || 1, image.naturalHeight || image.height || 1);
  const scale = Math.min(1, maxDimension / longestSide);
  const width = Math.max(1, Math.round((image.naturalWidth || image.width || 1) * scale));
  const height = Math.max(1, Math.round((image.naturalHeight || image.height || 1) * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser could not process the screenshot.");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);

  return {
    width,
    height,
    dataUrl: canvas.toDataURL("image/jpeg", quality),
  };
};
const normalizeSupportScreenshot = (raw=null) => {
  if (!raw || typeof raw !== "object") return null;
  const dataUrl = String(raw.dataUrl || "").trim();
  if (!dataUrl.startsWith("data:image/")) return null;
  return {
    name: String(raw.name || "support-screenshot.jpg").trim() || "support-screenshot.jpg",
    type: String(raw.type || "image/jpeg").trim() || "image/jpeg",
    dataUrl,
    size: Math.max(0, safeNum(raw.size, dataUrlBytes(dataUrl))),
    width: Math.max(0, safeNum(raw.width, 0)),
    height: Math.max(0, safeNum(raw.height, 0)),
  };
};
const prepareSupportScreenshot = async (file) => {
  if (!file) return null;
  if (!String(file.type || "").startsWith("image/")) {
    throw new Error("Please upload a PNG, JPG, or WebP screenshot.");
  }
  if (safeNum(file.size, 0) > 8 * 1024 * 1024) {
    throw new Error("Screenshot is too large. Please choose an image under 8 MB.");
  }

  const sourceUrl = await fileToDataUrl(file);
  const image = await loadImage(sourceUrl);
  const candidateDimensions = [SUPPORT_SCREENSHOT_MAX_DIMENSION, 1180, 1080, 960, 860, 760];
  const candidateQualities = [0.92, 0.88, 0.84, 0.8, 0.76, 0.72, 0.68, 0.64, 0.6, 0.56, 0.52, 0.48];
  let bestInRange = null;
  let bestUnderMax = null;
  let smallestOverMax = null;

  candidateDimensions.forEach(maxDimension => {
    candidateQualities.forEach(quality => {
      const candidate = renderSupportScreenshotCandidate(image, maxDimension, quality);
      const size = dataUrlBytes(candidate.dataUrl);
      const scoredCandidate = {
        ...candidate,
        size,
        quality,
        maxDimension,
        delta: Math.abs(size - SUPPORT_SCREENSHOT_TARGET_BYTES),
      };

      if (size >= SUPPORT_SCREENSHOT_TARGET_MIN_BYTES && size <= SUPPORT_SCREENSHOT_TARGET_MAX_BYTES) {
        if (!bestInRange || scoredCandidate.delta < bestInRange.delta) bestInRange = scoredCandidate;
        return;
      }

      if (size <= SUPPORT_SCREENSHOT_TARGET_MAX_BYTES) {
        if (!bestUnderMax || scoredCandidate.delta < bestUnderMax.delta) bestUnderMax = scoredCandidate;
        return;
      }

      if (!smallestOverMax || size < smallestOverMax.size) smallestOverMax = scoredCandidate;
    });
  });

  const finalCandidate = bestInRange || bestUnderMax;
  if (!finalCandidate) {
    throw new Error(`Screenshot is still too large after compression. Please choose a simpler image under ${formatBytes(SUPPORT_SCREENSHOT_TARGET_MAX_BYTES)}.`);
  }

  const baseName = String(file.name || "support-screenshot")
    .replace(/\.[^.]+$/, "")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "support-screenshot";

  return normalizeSupportScreenshot({
    name: `${baseName}.jpg`,
    type: "image/jpeg",
    dataUrl: finalCandidate.dataUrl,
    size: finalCandidate.size,
    width: finalCandidate.width,
    height: finalCandidate.height,
  });
};
const watchKey = (cid, lid) => `${cid}:${lid}`;
const getInitials = (name="Nur Student") =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join("") || "N";
const newUserId = () => `u_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
const newSupportId = () => `SUP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
const defaultStreak = () => ({ count:0, lastDate:null, history:[] });
const defaultWatchState = () => ({ watchedSeconds:0, duration:0, percent:0, completedAt:null, lastViewedAt:null, source:"watch" });
const defaultUserState = () => ({ enrollments:[], courseTracks:{}, seriesSelections:{}, progress:{}, notes:{}, streak:defaultStreak(), watch:{}, completions:{} });
const mergeUserState = (raw={}) => ({
  enrollments: [...(raw.enrollments || [])],
  courseTracks: { ...(raw.courseTracks || {}) },
  seriesSelections: { ...(raw.seriesSelections || {}) },
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
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) - h) + input.charCodeAt(i);
    h = h & h;
  }
  return "fallback_" + Math.abs(h).toString(16).padStart(8, "0");
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
const SUPPORT_CATEGORY_OPTIONS = [
  "Course Help",
  "Certificate",
  "Account",
  "Course Request",
  "General Support",
];
const SUPPORT_STATUS_META = {
  open: { label:"Open", color:C.gold },
  in_review: { label:"In Review", color:C.em },
  resolved: { label:"Resolved", color:C.green },
};
const normalizeSupportTicket = (raw={}) => ({
  ...raw,
  screenshot: normalizeSupportScreenshot(raw.screenshot),
});
const readSupportTickets = () => ls.get(K.SUPPORT, []).map(normalizeSupportTicket);
const writeSupportTickets = (updater) => {
  const current = readSupportTickets();
  const draft = clone(current);
  const next = updater(draft) || draft;
  try {
    localStorage.setItem(K.SUPPORT, JSON.stringify(next));
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("nur:data"));
  } catch {
    throw new Error("There is not enough browser storage left to save this support request. Remove the screenshot or clear old browser data and try again.");
  }
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
    const adminProfile = {
      id: "nur_admin_primary",
      name: PRIMARY_ADMIN_NAME,
      email: PRIMARY_ADMIN_EMAIL,
      role: "admin",
      joinedAt: dayKey(),
      country: "",
      language: "English / Arabic",
      blockedAt: null,
      blockedReason: "",
      passwordHash: PRIMARY_ADMIN_PASSWORD_HASH,
    };

    const existing = Auth.users();
    let nextUsers = existing.filter(user =>
      !LEGACY_DEMO_IDS.has(user.id) &&
      !LEGACY_DEMO_EMAILS.has(normalizeEmail(user.email))
    );

    const existingAdminIndex = nextUsers.findIndex(user => isPrimaryAdminUser(user));

    if (existingAdminIndex >= 0) {
      const currentAdmin = nextUsers[existingAdminIndex];
      nextUsers[existingAdminIndex] = {
        ...currentAdmin,
        id: currentAdmin.id || adminProfile.id,
        name: currentAdmin.name || PRIMARY_ADMIN_NAME,
        email: PRIMARY_ADMIN_EMAIL,
        role: "admin",
        joinedAt: currentAdmin.joinedAt || adminProfile.joinedAt,
        country: currentAdmin.country || adminProfile.country,
        language: currentAdmin.language || adminProfile.language,
        blockedAt: null,
        blockedReason: "",
        passwordHash: currentAdmin.passwordHash || PRIMARY_ADMIN_PASSWORD_HASH,
      };
    } else {
      nextUsers = [adminProfile, ...nextUsers];
    }

    if (!existing.length || JSON.stringify(existing) !== JSON.stringify(nextUsers)) {
      ls.set(K.USERS, nextUsers);
    }

    const allData = readAllUserData();
    const nextData = {};
    nextUsers.forEach(user => {
      nextData[user.id] = mergeUserState(allData[user.id] || {});
    });
    if (JSON.stringify(allData) !== JSON.stringify(nextData)) {
      ls.set(K.DATA, nextData);
    }

    const session = Auth.session();
    if (session?.id && !nextUsers.some(user => user.id === session.id)) {
      ls.remove(K.SESSION);
    }

    return nextUsers;
  },
  login: async ({ email, password }) => {
    await Auth.ensureSeeded();
    const normalized = normalizeEmail(email);
    const user = Auth.users().find(entry => entry.email === normalized);
    if (!user) throw new Error("No account found for that email.");

    const passwordHash = await hashText(password);
    if (passwordHash !== user.passwordHash) throw new Error("Incorrect email or password.");
    if (user.blockedAt) {
      throw new Error(user.blockedReason || "This account has been blocked by an administrator.");
    }

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
      blockedAt: null,
      blockedReason: "",
      passwordHash: await hashText(password),
    };

    ls.set(K.USERS, [...Auth.users(), user]);
    const allData = readAllUserData();
    allData[user.id] = defaultUserState();
    ls.set(K.DATA, allData);
    ls.set(K.SESSION, { id:user.id });
    return user;
  },
  resetPassword: async ({ email, password }) => {
    await Auth.ensureSeeded();
    const normalized = normalizeEmail(email);
    if (!normalized) throw new Error("Please enter your email.");
    if (String(password || "").trim().length < 8) throw new Error("Password must be at least 8 characters.");

    const users = Auth.users();
    const matchIndex = users.findIndex(user => user.email === normalized);
    if (matchIndex < 0) throw new Error("No account found for that email on this browser.");

    const nextUsers = [...users];
    nextUsers[matchIndex] = {
      ...nextUsers[matchIndex],
      passwordHash: await hashText(password),
    };

    ls.set(K.USERS, nextUsers);
    return nextUsers[matchIndex];
  },
  createUser: async ({ name, email, password, role="student", country="", language="English / Arabic" }) => {
    await Auth.ensureSeeded();
    if (!Auth.isAdmin()) throw new Error("Only administrators can add users.");

    const cleanedName = String(name || "").replace(/\s+/g, " ").trim();
    const normalizedEmail = normalizeEmail(email);
    const cleanedPassword = String(password || "");
    const cleanedRole = role === "admin" ? "admin" : "student";

    if (!cleanedName) throw new Error("Please enter a name.");
    if (!normalizedEmail) throw new Error("Please enter an email.");
    if (cleanedPassword.length < 8) throw new Error("Password must be at least 8 characters.");
    if (Auth.users().some(user => user.email === normalizedEmail)) {
      throw new Error("An account with that email already exists.");
    }

    const user = {
      id: newUserId(),
      name: cleanedName,
      email: normalizedEmail,
      role: cleanedRole,
      joinedAt: dayKey(),
      country: String(country || "").trim(),
      language: String(language || "English / Arabic").trim() || "English / Arabic",
      blockedAt: null,
      blockedReason: "",
      passwordHash: await hashText(cleanedPassword),
    };

    ls.set(K.USERS, [...Auth.users(), user]);
    Auth.ensureUserData(user.id);
    return user;
  },
  setRole: (userId, nextRole) => {
    if (!Auth.isAdmin()) throw new Error("Only administrators can change roles.");
    const role = nextRole === "admin" ? "admin" : "student";
    const session = Auth.session();
    const users = Auth.users();
    const match = users.find(user => user.id === userId);
    if (!match) throw new Error("User not found.");
    if (isPrimaryAdminUser(match) && role !== "admin") {
      throw new Error("The primary admin role cannot be removed.");
    }
    if (session?.id === userId && role !== "admin") {
      throw new Error("You cannot remove admin access from the account you are using right now.");
    }

    const nextUsers = users.map(user => user.id === userId ? { ...user, role } : user);
    ls.set(K.USERS, nextUsers);
    return nextUsers.find(user => user.id === userId) || null;
  },
  setBlocked: (userId, blocked, reason="") => {
    if (!Auth.isAdmin()) throw new Error("Only administrators can block users.");
    const session = Auth.session();
    const users = Auth.users();
    const match = users.find(user => user.id === userId);
    if (!match) throw new Error("User not found.");
    if (isPrimaryAdminUser(match)) {
      throw new Error("The primary admin account cannot be blocked.");
    }
    if (session?.id === userId) {
      throw new Error("You cannot block the account you are using right now.");
    }

    const nextUsers = users.map(user => user.id === userId ? {
      ...user,
      blockedAt: blocked ? dayKey() : null,
      blockedReason: blocked ? (String(reason || "").trim() || "Blocked by admin.") : "",
    } : user);
    ls.set(K.USERS, nextUsers);
    return nextUsers.find(user => user.id === userId) || null;
  },
  deleteUser: (userId) => {
    if (!Auth.isAdmin()) throw new Error("Only administrators can delete users.");
    const session = Auth.session();
    const users = Auth.users();
    const match = users.find(user => user.id === userId);
    if (!match) throw new Error("User not found.");
    if (isPrimaryAdminUser(match)) throw new Error("The primary admin account cannot be deleted.");
    if (session?.id === userId) throw new Error("You cannot delete the account you are using right now.");

    ls.set(K.USERS, users.filter(user => user.id !== userId));
    const allData = readAllUserData();
    delete allData[userId];
    ls.set(K.DATA, allData);
    return true;
  },
  resetUserPassword: async (userId, password) => {
    if (!Auth.isAdmin()) throw new Error("Only administrators can reset passwords.");
    const cleanedPassword = String(password || "");
    if (cleanedPassword.length < 8) throw new Error("Password must be at least 8 characters.");

    const users = Auth.users();
    const matchIndex = users.findIndex(user => user.id === userId);
    if (matchIndex < 0) throw new Error("User not found.");

    const nextUsers = [...users];
    nextUsers[matchIndex] = {
      ...nextUsers[matchIndex],
      passwordHash: await hashText(cleanedPassword),
    };
    ls.set(K.USERS, nextUsers);
    return nextUsers[matchIndex];
  },
  updateCurrentProfile: ({ name, email, country, language }) => {
    const session = Auth.session();
    if (!session?.id) throw new Error("You need to sign in first.");

    const cleanedName = name.replace(/\s+/g, " ").trim();
    const users = Auth.users();
    const currentUser = users.find(user => user.id === session.id);
    const normalizedEmail = normalizeEmail(email);
    const lockedPrimaryAdmin = isPrimaryAdminUser(currentUser);
    const finalEmail = lockedPrimaryAdmin ? PRIMARY_ADMIN_EMAIL : normalizedEmail;
    if (!cleanedName) throw new Error("Please enter your name.");
    if (!finalEmail) throw new Error("Please enter your email.");
    if (users.some(user => user.id !== session.id && user.email === finalEmail)) {
      throw new Error("Another account is already using that email.");
    }

    const nextUsers = users.map(user => user.id === session.id ? {
      ...user,
      name: cleanedName,
      email: finalEmail,
      role: lockedPrimaryAdmin ? "admin" : user.role,
      blockedAt: lockedPrimaryAdmin ? null : user.blockedAt,
      blockedReason: lockedPrimaryAdmin ? "" : user.blockedReason,
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
  selectedTrack: (id) => readCurrentUserData().courseTracks[String(id)] || null,
  selectedSeriesCourse: (id) => readCurrentUserData().seriesSelections[String(id)] || null,
  enroll: (id, options={}) => writeCurrentUserData(data => {
    const courseKey = String(id);
    if (!data.enrollments.includes(id)) data.enrollments.push(id);
    if (options.trackKey) data.courseTracks[courseKey] = options.trackKey;
    if (options.seriesChildId) data.seriesSelections[courseKey] = String(options.seriesChildId);
  }),
  setSeriesCourse: (id, childId) => writeCurrentUserData(data => {
    if (!childId) return;
    data.seriesSelections[String(id)] = String(childId);
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
      const hasExplicitPercent = Number.isFinite(Number(info.percent));
      const percent = hasExplicitPercent
        ? Math.max(currentWatch.percent, safeNum(info.percent, currentWatch.percent))
        : currentWatch.percent;

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
const mkLesson = (id, title, ytId, dur, opts={}) => {
  const normalizedYtId = typeof ytId === "string" ? ytId.trim() : ytId;
  const normalizedDuration = typeof dur === "string" ? dur.trim() : dur;
  return {
    id,
    title,
    youtubeId: normalizedYtId,       // ← replace "DEMO" with real YouTube video ID
    duration: normalizedDuration,
    free: opts.free || false,
    description: opts.desc || "",
    resources: opts.res || [],
  };
};
const mkModule = (id, title, icon, desc, lessons) => ({ id, title, icon, description: desc, lessons });
const aqidahEnglishLessonTitle = ({ index }) => `Lecture ${pad(index)} - Islamic Theology ${pad(index)}`;
const aqidahUrduLessonTitle = ({ index, sourceTitle }) => {
  const parts = String(sourceTitle || "")
    .split("|")
    .map(part => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const topic = parts.find(part => !/^episode[:\s-]*\d+/i.test(part) && !/ghulam rasool|official|last episode|dars e/i.test(part)) || parts[1] || parts[0];
  return `Lecture ${pad(index)} - ${topic || "Aqidah Lesson"}`;
};
const AQIDAH_MODULE_ICONS = ["☝️","🕌","📚","✨"];
const buildAqidahModules = (items, opts={}) =>
  chunk([...items].sort((a, b) => a.index - b.index), opts.groupSize || 5)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `aq${pad(item.index)}`,
        opts.lessonTitle ? opts.lessonTitle(item) : `Lecture ${pad(item.index)} - Aqidah`,
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 2,
          desc: `Imported from the ${opts.trackLabel || "Aqidah"} YouTube playlist.`,
        }
      ));

      return mkModule(
        `aqm${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lectures ${pad(start)}-${pad(end)}`,
        AQIDAH_MODULE_ICONS[idx % AQIDAH_MODULE_ICONS.length],
        `${opts.trackLabel || "Aqidah"} lectures ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const AQIDAH_DEFAULT_TRACK = "english";
const AQIDAH_TRACKS = {
  english: {
    key: "english",
    label: "English",
    note: "Full English Aqidah theology lecture series.",
    playlist: AQIDAH_ENGLISH_PLAYLIST_ID,
    modules: buildAqidahModules(AQIDAH_ENGLISH_PLAYLIST_ITEMS, {
      trackLabel: "English Aqidah",
      groupSize: 5,
      lessonTitle: aqidahEnglishLessonTitle,
    }),
    coursePatch: {
      instructor: "Dr. Bilal Philips",
    },
  },
  urdu: {
    key: "urdu",
    label: "Urdu",
    note: "Urdu Aqidah and Nazriyaat lecture series.",
    playlist: AQIDAH_URDU_PLAYLIST_ID,
    modules: buildAqidahModules(AQIDAH_URDU_PLAYLIST_ITEMS, {
      trackLabel: "Urdu Aqidah",
      groupSize: 3,
      lessonTitle: aqidahUrduLessonTitle,
    }),
    coursePatch: {
      instructor: "Allama Ghulam Rasool Qasmi",
    },
  },
};
const HAJJ_UMRAH_DEFAULT_TRACK = "hajj";
const HAJJ_UMRAH_TRACKS = {
  hajj: {
    key: "hajj",
    label: "Hajj",
    note: "Hajj-focused route using the full Hajj playlist.",
    playlist: "PLsF39TzFrYcXgSA2DwjvYK4Y6STrd7JY6",
    coursePatch: {
      desc: "Prepare for the rites of Hajj with a guided study path covering preparation, ihram, the major manasik, and essential pilgrim reminders.",
    },
    moduleOverrides: {
      m8a: {
        title: "Module 1 — Preparing for Hajj",
        description: "Preparation, intention, and entering ihram for Hajj.",
      },
      m8b: {
        title: "Module 2 — Core Hajj Rites",
        description: "The main rites of Hajj from arrival to completion.",
      },
    },
    lessonOverrides: {
      l8a1: {
        title: "Hajj Overview & Virtues",
        youtubeId: "cp_ISpIv_wA",
        description: "An opening Hajj-focused lesson introducing the journey, virtues, and mindset of the pilgrim.",
      },
      l8a2: {
        title: "Conditions, Pillars & Obligations of Hajj",
        description: "Who Hajj is required upon, what its pillars are, and which obligations must be observed.",
      },
      l8a3: {
        title: "Ihram, Talbiyah & Arrival",
        description: "Preparing for ihram, making the intention, and beginning the Hajj journey correctly.",
      },
      l8b1: {
        title: "Mina, Arafah & Muzdalifah",
        description: "The defining stations of Hajj and how the pilgrim moves through them.",
      },
      l8b2: {
        title: "Tawaf, Sa'i & Jamarat",
        description: "The main acts performed in Makkah and Mina during the days of Hajj.",
      },
      l8b3: {
        title: "Completion & Common Hajj Mistakes",
        description: "Finishing Hajj properly and avoiding the mistakes many pilgrims make.",
      },
    },
  },
  umrah: {
    key: "umrah",
    label: "Umrah",
    note: "Focused Umrah route using the provided Umrah lesson.",
    playlist: "",
    coursePatch: {
      desc: "Complete Umrah guide — rulings, duas, and step-by-step instructions according to authentic Sunnah.",
    },
    moduleOverrides: {
      m8a: {
        title: "Module 1 — Preparing for Umrah",
        description: "Everything before you travel for Umrah.",
      },
      m8b: {
        title: "Module 2 — Performing Umrah",
        description: "Step-by-step rituals in Makkah for Umrah.",
      },
    },
    lessonOverrides: {
      l8a1: {
        title: "Umrah Overview & Virtues",
        youtubeId: "VorGBNx9koY",
        description: "Authentic virtues of Umrah and a practical overview of the journey.",
      },
      l8a2: {
        title: "Conditions, Pillars & Obligations of Umrah",
        description: "Who must perform Umrah and its essential acts.",
      },
      l8a3: {
        title: "Entering Ihram for Umrah",
        description: "Miqat stations, ghusl, wearing ihram, and beginning the rite correctly.",
      },
      l8b3: {
        title: "Completion & Common Umrah Mistakes",
        description: "Hair shortening, exiting ihram, and key Umrah mistakes to avoid.",
      },
    },
  },
};
const qaidaLessonTitle = ({ index, sourceTitle }) => {
  const parts = String(sourceTitle || "")
    .split("|")
    .map(part => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const summary = parts.slice(0, 2).join(" / ") || `Qaida Lesson ${index}`;
  return `Lesson ${pad(index)} - ${summary}`;
};
const QAIDA_MODULE_ICONS = ["🔤","📝","📏","🌙","📘","🎯","✨","🧠","📚"];
const buildQaidaModules = (items, opts={}) =>
  chunk([...items].sort((a, b) => a.index - b.index), opts.groupSize || 10)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const title = `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`;
      const description = `${opts.trackLabel || "Qaida"} lessons ${start} to ${end}.`;
      const lessons = group.map(item => mkLesson(
        `l6${pad(item.index)}`,
        qaidaLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 3,
          desc: `Imported from the ${opts.trackLabel || "Qaida"} YouTube playlist.`,
        }
      ));

      return mkModule(
        `m6${String.fromCharCode(97 + idx)}`,
        title,
        QAIDA_MODULE_ICONS[idx % QAIDA_MODULE_ICONS.length],
        description,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const QAIDA_TRACKS = {
  nooraniClassic: {
    key: "nooraniClassic",
    label: "Noorani Qaida",
    note: "Full Noorani Qaida route using the main 116-lesson playlist.",
    playlist: NOORANI_QAIDA_A_PLAYLIST_ID,
    modules: buildQaidaModules(NOORANI_QAIDA_A_PLAYLIST_ITEMS, { trackLabel: "Noorani Qaida", groupSize: 12 }),
  },
  madaniJourney: {
    key: "madaniJourney",
    label: "Madani Qaida Journey",
    note: "A longer Madani Qaida route with 79 lesson parts.",
    playlist: QAIDA_TRACK_TWO_PLAYLIST_ID,
    modules: buildQaidaModules(QAIDA_TRACK_TWO_PLAYLIST_ITEMS, { trackLabel: "Madani Qaida Journey", groupSize: 10 }),
  },
  madaniClassic: {
    key: "madaniClassic",
    label: "Madani Qaida Classic",
    note: "The original Madani Qaida track with 77 lesson parts.",
    playlist: MADANI_QAIDA_PLAYLIST_ID,
    modules: buildQaidaModules(MADANI_QAIDA_PLAYLIST_ITEMS, { trackLabel: "Madani Qaida Classic", groupSize: 10 }),
  },
  nooraniBasics: {
    key: "nooraniBasics",
    label: "Noorani Basics",
    note: "Alternate 68-lesson Noorani Qaida playlist for a shorter route.",
    playlist: NOORANI_QAIDA_B_PLAYLIST_ID,
    modules: buildQaidaModules(NOORANI_QAIDA_B_PLAYLIST_ITEMS, { trackLabel: "Noorani Qaida Basics", groupSize: 12 }),
  },
};
const NOORANI_QAIDA_DEFAULT_TRACK = "nooraniClassic";
const MADANI_QAIDA_DEFAULT_TRACK = "madaniJourney";
const NOORANI_QAIDA_TRACKS = {
  nooraniClassic: QAIDA_TRACKS.nooraniClassic,
  nooraniBasics: QAIDA_TRACKS.nooraniBasics,
};
const MADANI_QAIDA_TRACKS = {
  madaniJourney: QAIDA_TRACKS.madaniJourney,
  madaniClassic: QAIDA_TRACKS.madaniClassic,
};

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

const mualimLessonTitle = ({ index, sourceTitle }) => {
  const raw = String(sourceTitle || "").replace(/\s+/g, " ").trim();
  if (raw === "[Hidden lesson]") return `Lesson ${pad(index)} - Hidden lesson`;

  const homework = raw.match(/Home Work\s*\|\s*Unit\s*#?\s*(\d+)\s*Lesson\s*([0-9-]+)/i);
  if (homework) return `Lesson ${pad(index)} - Homework: Unit ${homework[1]} Lessons ${homework[2]}`;

  const revision = raw.match(/Revision Unit\s*(\d+)/i);
  if (revision) return `Lesson ${pad(index)} - Revision Unit ${revision[1]}`;

  const surprise = raw.match(/Unexpected Quran Challenge\s*\|\s*Unit\s*([0-9,]+)/i);
  if (surprise) return `Lesson ${pad(index)} - Surprise Test: Units ${surprise[1].replace(/,/g, ", ")}`;

  const part = raw.match(/Part\s*(\d+)/i);
  if (part) return `Lesson ${pad(index)} - Part ${part[1]}`;

  return `Lesson ${pad(index)} - Muallim ul Quran`;
};
const MUALIM_MODULE_BLUEPRINT = [
  { title:"Module 1 - Unit 1 Foundations", icon:"📗", desc:"Opening lessons, homework checkpoints, and the first full revision.", range:[1, 7] },
  { title:"Module 2 - Unit 2 Expansion", icon:"📘", desc:"Parts 4 to 7 with the Unit 2 revision session.", range:[8, 12] },
  { title:"Module 3 - Unit 3 Practice", icon:"🧠", desc:"Parts 8 to 11 followed by the surprise test for Units 1 to 3.", range:[13, 17] },
  { title:"Module 4 - Unit 4 Progression", icon:"📝", desc:"Parts 12 to 18 continuing the direct Quran understanding challenge.", range:[18, 24] },
  { title:"Module 5 - Final Public Lessons", icon:"🏁", desc:"Parts 19 to 25 currently visible on the public playlist.", range:[25, 30] },
];
const buildMualimModules = (items) =>
  MUALIM_MODULE_BLUEPRINT.map((section, idx) => {
    const [start, end] = section.range;
    const lessons = items
      .filter(item => item.index >= start && item.index <= end)
      .map(item => mkLesson(
        `l10${pad(item.index)}`,
        mualimLessonTitle(item),
        item.youtubeId,
        item.duration || "Unavailable",
        {
          free: item.index <= 3,
          desc: item.sourceTitle === "[Hidden lesson]"
            ? "YouTube counts this lesson in the playlist total, but the video is currently hidden or unavailable in the public feed."
            : "Imported from the Muallim ul Quran Understand Quran Directly in 6 Months playlist.",
        }
      ));

    return mkModule(
      `m10${String.fromCharCode(97 + idx)}`,
      section.title,
      section.icon,
      section.desc,
      lessons
    );
  }).filter(section => section.lessons.length > 0);

const tajweedEpisodeNumber = ({ sourceTitle, index }) => {
  const match = String(sourceTitle || "").match(/EP\s*[-–]?\s*(\d+)/i);
  return match ? safeNum(match[1], index) : index;
};
const tajweedTopicTitle = ({ sourceTitle }) => {
  const usefulParts = String(sourceTitle || "")
    .split("|")
    .map(part => part.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter(part => !/^(2025|2026)$/i.test(part))
    .filter(part => !/^urdu$/i.test(part))
    .filter(part => !/^detailed$/i.test(part))
    .filter(part => !/^easy tajweed course$/i.test(part));

  return usefulParts.slice(0, 2).join(" / ") || "Tajweed Lesson";
};
const TAJWEED_MODULE_BLUEPRINT = [
  { title:"Module 1 - Foundations and Terminology", icon:"📚", desc:"Core terminology, common recitation mistakes, isti'adhah, and basmalah-related foundations.", range:[1, 6] },
  { title:"Module 2 - Tafkhim and Noon Sakinah", icon:"🟢", desc:"Raa, the word Allah, and the introduction to noon sakinah and tanween rules.", range:[7, 11] },
  { title:"Module 3 - Signs and Pronoun Rules", icon:"✍️", desc:"Special Quranic signs, meem sakin, ghunna, haa zameer, and sillah.", range:[12, 17] },
  { title:"Module 4 - Idgham Families", icon:"🔁", desc:"Idgham branches, laam tareef, and the difference between idgham and mushaddad.", range:[18, 24] },
  { title:"Module 5 - Hamza Rules", icon:"🧭", desc:"Foundational and advanced hamza rules across multiple Quran examples.", range:[25, 30] },
  { title:"Module 6 - Advanced Alif and Sakinain", icon:"✨", desc:"Harakah on hamzah, ijtima e sakinain, and silent alif cases.", range:[31, 34] },
];
const buildTajweedModules = (items) => {
  const ordered = [...items]
    .sort((a, b) => tajweedEpisodeNumber(a) - tajweedEpisodeNumber(b) || a.index - b.index)
    .map((item, idx) => ({
      ...item,
      sequence: idx + 1,
      episode: tajweedEpisodeNumber(item),
    }));

  return TAJWEED_MODULE_BLUEPRINT.map((section, idx) => {
    const [start, end] = section.range;
    const lessons = ordered
      .filter(item => item.sequence >= start && item.sequence <= end)
      .map(item => mkLesson(
        `l2${pad(item.sequence)}`,
        `Lesson ${pad(item.sequence)} - ${tajweedTopicTitle(item)}`,
        item.youtubeId,
        item.duration,
        {
          free: item.sequence <= 3,
          desc: `Imported from Qari Aqib's Easy Tajweed Course YouTube playlist (Episode ${pad(item.episode)}).`,
        }
      ));

    return mkModule(
      `m2${String.fromCharCode(97 + idx)}`,
      section.title,
      section.icon,
      section.desc,
      lessons
    );
  }).filter(section => section.lessons.length > 0);
};
const sistersTajweedLessonTitle = ({ index }) => {
  if (index === 2) return `Lesson ${pad(index)} - Course Trailer`;
  const day = index > 2 ? index - 1 : 1;
  return `Lesson ${pad(index)} - 180 Days Challenge Day ${pad(day)}`;
};
const SISTERS_TAJWEED_MODULE_ICONS = ["🧕","📖","✨","🌙","🪷","📝","🧠","🎯","🕊️","🏁"];
const buildSistersTajweedModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 10)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l14${pad(item.index)}`,
        sistersTajweedLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 3,
          desc: item.index === 2
            ? "Trailer lesson imported from Tayyba Quran Academy's long Tajweed course playlist."
            : "Imported from Tayyba Quran Academy's Learn Tajweed in 180 Days playlist for ladies and girls.",
        }
      ));

      return mkModule(
        `m14${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        SISTERS_TAJWEED_MODULE_ICONS[idx % SISTERS_TAJWEED_MODULE_ICONS.length],
        `Sisters-focused Tajweed lessons ${start} to ${end} from Tayyba Quran Academy.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const islamicBasicsLessonTitle = ({ index, sourceTitle }) => {
  const cleaned = String(sourceTitle || "")
    .replace(/\s+/g, " ")
    .replace(/^Beginners Guide to Islam Part \d+:\s*/i, "")
    .replace(/\s*\|\s*Beginners Guide to Islam$/i, "")
    .replace(/^Islam\s*\|\s*/i, "")
    .replace(/^How to say\s*/i, "")
    .replace(/^LEARN\s*-\s*/i, "")
    .replace(/^LEARN\s+/i, "")
    .replace(/^Arabic WORD by WORD\s*\|\s*/i, "")
    .replace(/^Word by Word\s*-\s*/i, "")
    .replace(/\s*-\s*WORD BY WORD$/i, "")
    .replace(/\s*-\s*Word by Word\s*-\s*/i, " / ")
    .replace(/\s*-\s*Word by Word.*$/i, "")
    .replace(/\s*&\s*Follow Along Actions\s*\(For Beginners\)\s*$/i, "")
    .replace(/\s*\|\s*Word-by-Word Breakdown for Beginners\s*$/i, "")
    .replace(/\s*\|\s*/g, " / ")
    .trim();

  return `Lesson ${pad(index)} - ${cleaned || "Islamic Basics"}`;
};
const ISLAMIC_BASICS_MODULE_BLUEPRINT = [
  { title:"Module 1 - Belief and Conversion", icon:"☪️", desc:"Core beliefs, pillars of faith, and embracing Islam.", range:[1, 3] },
  { title:"Module 2 - Purification and Salah", icon:"💧", desc:"Purification, wudu, ghusl, and the foundations of prayer.", range:[4, 5] },
  { title:"Module 3 - The Five Daily Prayers", icon:"🕌", desc:"Beginner walk-throughs for Fajr, Dhuhr, Asr, Maghrib, and Isha.", range:[6, 10] },
  { title:"Module 4 - Mosque and Essential Recitations", icon:"📖", desc:"Your first mosque visit, opening dua, Al-Fatihah, and a short surah.", range:[11, 14] },
  { title:"Module 5 - Prayer Words and Closing Duas", icon:"🤲", desc:"Bowing, prostration, tashahhud, and salat al-Ibrahimiyyah.", range:[15, 18] },
];
const buildIslamicBasicsModules = (items) =>
  ISLAMIC_BASICS_MODULE_BLUEPRINT.map((section, idx) => {
    const [start, end] = section.range;
    const lessons = items
      .filter(item => item.index >= start && item.index <= end)
      .map(item => mkLesson(
        `l9${pad(item.index)}`,
        islamicBasicsLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 3,
          desc: "Imported from Think Arabic's Beginners Guide to Islam YouTube playlist.",
        }
      ));

    return mkModule(
      `m9${String.fromCharCode(97 + idx)}`,
      section.title,
      section.icon,
      section.desc,
      lessons
    );
  }).filter(section => section.lessons.length > 0);
const insuranceLessonTitle = ({ index, sourceTitle }) => {
  const cleaned = String(sourceTitle || "")
    .replace(/\s+/g, " ")
    .replace(/^ruling on\s*/i, "")
    .replace(/^insurance company\s*/i, "Insurance company ")
    .replace(/[?]+$/g, "")
    .trim();

  return `Lesson ${pad(index)} - ${cleaned || "Insurance Ruling"}`;
};
const buildInsuranceModules = (items) => {
  const lessons = [...items]
    .sort((a, b) => a.index - b.index)
    .map(item => mkLesson(
      `l15${pad(item.index)}`,
      insuranceLessonTitle(item),
      item.youtubeId,
      item.duration,
      {
        free: true,
        desc: "Imported from Sheikh Aziz bin Farhan Al Anizi's Insurance YouTube playlist.",
      }
    ));

  return [
    mkModule(
      "m15a",
      "Module 1 - Insurance Cases",
      "🛡️",
      "Short fiqh rulings covering common insurance and warranty questions.",
      lessons
    ),
  ];
};
const shortSeerahLessonTitle = ({ index, sourceTitle }) => {
  const raw = String(sourceTitle || "").replace(/\s+/g, " ").trim();
  if (/don't miss out/i.test(raw)) return `Lesson ${pad(index)} - Series Introduction`;

  const cleaned = raw
    .replace(/\[EP\d+\]\s*/i, "")
    .replace(/- Story Of Muhammad.*$/i, "")
    .replace(/#SeerahSeries.*$/i, "")
    .replace(/-+\s*(Dr\.\s*)?Yasir Qadhi.*$/i, "")
    .replace(/Muhammad\s*\((?:ï·º|ﷺ)\)/gi, "Muhammad")
    .replace(/ï·º|ﷺ/g, "")
    .replace(/â/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  return `Lesson ${pad(index)} - ${cleaned || "Short Seerah Lesson"}`;
};
const buildShortSeerahModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 8)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l11${pad(item.index)}`,
        shortSeerahLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 3,
          desc: "Imported from the short Seerah YouTube playlist.",
        }
      ));

      return mkModule(
        `m11${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Episodes ${pad(start)}-${pad(end)}`,
        ["🌅","🕌","🛤️","🏙️","⭐","📜"][idx % 6],
        `A short Seerah playlist segment covering episodes ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const propheticLifeLessonTitle = ({ index, sourceTitle }) => {
  const cleaned = String(sourceTitle || "")
    .replace(/\s+/g, " ")
    .replace(/^\d+\s*-\s*/, "")
    .replace(/\s*-\s*The Prophetic Life in Focus.*$/i, "")
    .replace(/\s*-\s*Sh(?:aykh|\.)\s*Abdul-Rahim Reasat.*$/i, "")
    .trim();

  return `Lesson ${pad(index)} - ${cleaned || "Prophetic Life Lesson"}`;
};
const buildPropheticLifeModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 10)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l12${pad(item.index)}`,
        propheticLifeLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 2,
          desc: "Imported from the Prophetic Life in Focus YouTube playlist.",
        }
      ));

      return mkModule(
        `m12${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["🕋","🌅","🕌","🛤️","🏙️","⚔️","📜","✨","🕊️","⭐"][idx % 10],
        `Prophetic Life in Focus lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const propheticParentingLessonTitle = ({ index, sourceTitle }) => {
  const raw = String(sourceTitle || "").replace(/\s+/g, " ").trim();
  if (/q&a/i.test(raw)) return `Lesson ${pad(index)} - Parenting Q&A`;

  const cleaned = raw
    .replace(/^Prophetic Parenting:\s*/i, "")
    .replace(/^40 Hadiths on Raising Righteous Muslim Children\s*-\s*/i, "")
    .replace(/\s*-\s*Shaykh Faraz Rabbani.*$/i, "")
    .trim();

  return `Lesson ${pad(index)} - ${cleaned || "Prophetic Parenting Session"}`;
};
const buildPropheticParentingModules = (items) => [
  mkModule(
    "m13a",
    "Module 1 - Foundations and Guidance",
    "👨‍👩‍👧‍👦",
    "The main Prophetic Parenting sessions plus the concluding Q&A.",
    [...items].sort((a, b) => a.index - b.index).map(item => mkLesson(
      `l13${pad(item.index)}`,
      propheticParentingLessonTitle(item),
      item.youtubeId,
      item.duration,
      {
        free: item.index <= 2,
        desc: "Imported from the Prophetic Parenting YouTube playlist.",
      }
    ))
  ),
];
const cleanSourceTitle = (value="") => String(value || "").replace(/\s+/g, " ").trim();
const tajweedQiraatLessonTitle = ({ index, sourceTitle }) => {
  const cleaned = cleanSourceTitle(sourceTitle)
    .replace(/Tajweed[- ]ul[- ]Qira'?at Course\s*I?/i, "")
    .replace(/Hafiz Saeed Raza Baghdadi/i, "")
    .replace(/\bEpisode\b[:\s-]*\d+/i, "")
    .replace(/\s*\|\s*/g, " / ")
    .replace(/^[\s\-/:]+|[\s\-/:]+$/g, "")
    .trim();

  return `Episode ${pad(index)} - ${cleaned || "Tajweed ul Qira'at"}`;
};
const buildTajweedQiraatModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 5)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l16${pad(item.index)}`,
        tajweedQiraatLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 2,
          desc: "Imported from Hafiz Saeed Raza Baghdadi's Tajweed ul Qira'at YouTube playlist.",
        }
      ));

      return mkModule(
        `m16${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Episodes ${pad(start)}-${pad(end)}`,
        ["📖","🎙️","🟢","✨"][idx % 4],
        `Tajweed ul Qira'at episodes ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const arbiKaMuallimLessonTitle = ({ index, sourceTitle }) => {
  const cleaned = cleanSourceTitle(sourceTitle)
    .replace(/^Arbi ka muallim\s*/i, "")
    .replace(/^Book\s*/i, "Book ")
    .replace(/^Part-?\s*(\d+)/i, "Book $1")
    .replace(/Lecture no\.?\s*\d+/i, "")
    .replace(/\(+/g, "")
    .replace(/\)+/g, "")
    .replace(/\/\/?/g, " / ")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+/g, " ")
    .replace(/^[\s\-:/.]+|[\s\-:/.]+$/g, "")
    .trim();

  return `Lesson ${pad(index)} - ${cleaned || "Arbi ka Muallim"}`;
};
const ARBI_KA_MUALLIM_MODULE_BLUEPRINT = [
  { title:"Module 1 - Book 1 Foundations", icon:"📘", desc:"Opening lessons from Arbi ka Muallim Book 1.", range:[1, 14] },
  { title:"Module 2 - Book 2 Progression", icon:"🗣️", desc:"Arbi ka Muallim Book 2 lessons and early expansions.", range:[15, 26] },
  { title:"Module 3 - Book 3 Part 1", icon:"🧠", desc:"The first half of Book 3 with grammar and sentence-building lessons.", range:[27, 41] },
  { title:"Module 4 - Book 3 Part 2", icon:"✍️", desc:"The second half of Book 3 continuing applied Arabic study.", range:[42, 55] },
  { title:"Module 5 - Book 4 Part 1", icon:"📚", desc:"Advanced Book 4 lessons from the public playlist.", range:[56, 81] },
  { title:"Module 6 - Book 4 Part 2", icon:"🏁", desc:"Closing Book 4 lessons currently available on YouTube.", range:[82, 107] },
];
const buildArbiKaMuallimModules = (items) =>
  ARBI_KA_MUALLIM_MODULE_BLUEPRINT.map((section, idx) => {
    const [start, end] = section.range;
    const lessons = items
      .filter(item => item.index >= start && item.index <= end)
      .map(item => mkLesson(
        `l17${pad(item.index)}`,
        arbiKaMuallimLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 3,
          desc: "Imported from the Arbi ka Muallim Book 1 to 4 playlist by Amir Sohail.",
        }
      ));

    return mkModule(
      `m17${String.fromCharCode(97 + idx)}`,
      section.title,
      section.icon,
      section.desc,
      lessons
    );
  }).filter(section => section.lessons.length > 0);
const aasanArabicGrammarLessonTitle = ({ index, sourceTitle }) => {
  const cleaned = cleanSourceTitle(sourceTitle)
    .replace(/\|\s*Lecture\s*\d+\s*\|.*$/i, "")
    .replace(/^Lecture\s*\d+\s*:\s*/i, "")
    .replace(/\s*\|\s*By:.*$/i, "")
    .replace(/\s*\|\s*/g, " / ")
    .trim();

  return `Lesson ${pad(index)} - ${cleaned || "Arabic Grammar"}`;
};
const buildAasanArabicGrammarModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 14)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l18${pad(item.index)}`,
        aasanArabicGrammarLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 3,
          desc: "Imported from Asif Hameed's Aasan Arabic Grammar YouTube playlist.",
        }
      ));

      return mkModule(
        `m18${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["🧩","✒️","📚","🗣️","📖","🧠","📝","🏁"][idx % 8],
        `Aasan Arabic Grammar lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const madinahArabicLessonTitle = ({ index, sourceTitle }, bookLabel) => {
  const cleaned = cleanSourceTitle(sourceTitle)
    .replace(/\(URDU\)/gi, "")
    .replace(/Introduction to Madinah Arabic Book-?\d+/i, "Introduction")
    .replace(/Madinah Arabic Book-?\d+\s*,?\s*/gi, "")
    .replace(/Basic Quranic Grammar,\s*/i, "")
    .replace(/\s+\|\s+/g, " / ")
    .replace(/\s{2,}/g, " ")
    .replace(/^[\s\-:/.(),]+|[\s\-:/.(),]+$/g, "")
    .trim();

  return `Lesson ${pad(index)} - ${cleaned || bookLabel}`;
};
const buildMadinahArabicModules = (items, { trackKey, trackLabel, groupSize=8, freeCount=3, sourceLabel="Urdu" }) =>
  chunk([...items].sort((a, b) => a.index - b.index), groupSize)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l34${trackKey}${pad(item.index)}`,
        madinahArabicLessonTitle(item, trackLabel),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= freeCount,
          desc: `Imported from the Madinah Arabic ${trackLabel} ${sourceLabel} playlist.`,
        }
      ));

      return mkModule(
        `m34${trackKey}${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["📘","🗣️","✍️","🧠","📚","🧭","🏁"][idx % 7],
        `${trackLabel} lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const arabiyyaBaynaYadaykLessonTitle = ({ index, sourceTitle }) => {
  const raw = cleanSourceTitle(sourceTitle);
  const book = raw.match(/Book\s*(\d+)/i);
  const topic = raw
    .replace(/^Learn Arabic from scratch\s*:\s*/i, "")
    .replace(/Lesson\s*\d+\s*-\s*/i, "")
    .replace(/Al Arabiyya Bayna Yadayk/gi, "")
    .replace(/\|\s*Book\s*\d+/i, "")
    .replace(/\s*\|\s*/g, " / ")
    .replace(/^[\s\-:/.]+|[\s\-:/.]+$/g, "")
    .trim();

  const label = [book ? `Book ${book[1]}` : "", topic]
    .filter(Boolean)
    .join(" / ") || "Al Arabiyya Bayna Yadayk";

  return `Lesson ${pad(index)} - ${label}`;
};
const buildArabiyyaBaynaYadaykModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 8)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l33a${pad(item.index)}`,
        arabiyyaBaynaYadaykLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 3,
          desc: "Imported from the Learn Arabic from Scratch with Al Arabiyya Bayna Yadayk playlist.",
        }
      ));

      return mkModule(
        `m33a${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["📘","🗣️","✍️","🧠","📚","🧭","✨","🏁"][idx % 8],
        `Al Arabiyya Bayna Yadayk lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const ajooroomiyyaLessonTitle = ({ index, sourceTitle }) => {
  const raw = cleanSourceTitle(sourceTitle);
  if (/Full Explanation/i.test(raw)) {
    return `Lesson ${pad(index)} - Full Explanation of Al Ajooroomiyya`;
  }

  const lesson = raw.match(/Lesson\s*(\d+)\s*\/\s*36/i);
  const topic = raw
    .replace(/^Arabic Grammar\s*\|\s*/i, "")
    .replace(/Lesson\s*\d+\s*\/\s*36\s*\|\s*/i, "")
    .replace(/Al Ajoroomiyya\s*-\s*الآجرومية/i, "")
    .replace(/^[\s\-:/.]+|[\s\-:/.]+$/g, "")
    .trim();

  return `Lesson ${pad(index)} - ${topic || (lesson ? `Grammar Lesson ${lesson[1]}` : "Al Ajooroomiyya")}`;
};
const buildAjooroomiyyaModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 7)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l33b${pad(item.index)}`,
        ajooroomiyyaLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 2,
          desc: "Imported from the Arabic Grammar Al Ajooroomiyya playlist.",
        }
      ));

      return mkModule(
        `m33b${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["✒️","📚","🧠","📝","📖","🏁"][idx % 6],
        `Al Ajooroomiyya lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const ARABIC_LEARNING_PATH_DEFAULT_TRACK = "arabiyyaBaynaYadayk";
const ARABIC_LEARNING_PATH_TRACKS = {
  arabiyyaBaynaYadayk: {
    key: "arabiyyaBaynaYadayk",
    label: "Al Arabiyya Bayna Yadayk",
    note: "A full Arabic-from-scratch pathway using the Al Arabiyya Bayna Yadayk series across the linked playlist lessons.",
    playlist: ARABIYYA_BAYNA_YADAYK_PLAYLIST_ID,
    modules: buildArabiyyaBaynaYadaykModules(ARABIYYA_BAYNA_YADAYK_PLAYLIST_ITEMS),
  },
  ajooroomiyya: {
    key: "ajooroomiyya",
    label: "Al Ajooroomiyya Grammar",
    note: "A structured Arabic grammar route built from the Al Ajooroomiyya lesson series.",
    playlist: AJOOROOMIYYA_PLAYLIST_ID,
    modules: buildAjooroomiyyaModules(AJOOROOMIYYA_PLAYLIST_ITEMS),
  },
};
const MADINAH_ARABIC_URDU_SERIES_ID = 34;
const MADINAH_ARABIC_URDU_CHILD_IDS = {
  book1Urdu: 341,
  book2Urdu: 342,
  book3Urdu: 343,
};
const MADINAH_ARABIC_URDU_LEGACY_PREFIXES = {
  book1Urdu: `track-${MADINAH_ARABIC_URDU_SERIES_ID}-book1Urdu`,
  book2Urdu: `track-${MADINAH_ARABIC_URDU_SERIES_ID}-book2Urdu`,
  book3Urdu: `track-${MADINAH_ARABIC_URDU_SERIES_ID}-book3Urdu`,
};
const MADINAH_ARABIC_URDU_SERIES_CHILD_IDS = Object.values(MADINAH_ARABIC_URDU_CHILD_IDS);
const MADINAH_ARABIC_URDU_DEFAULT_TRACK = "book1Urdu";
const MADINAH_ARABIC_URDU_TRACKS = {
  book1Urdu: {
    key: "book1Urdu",
    label: "Book 1 (Urdu)",
    note: "Begin with Madinah Arabic Book 1 in Urdu, including the introductory grammar lessons and the full first-book pathway.",
    playlist: MADINAH_ARABIC_BOOK_1_URDU_PLAYLIST_ID,
    modules: buildMadinahArabicModules(MADINAH_ARABIC_BOOK_1_URDU_PLAYLIST_ITEMS, {
      trackKey: "b1",
      trackLabel: "Book 1 (Urdu)",
      groupSize: 8,
      freeCount: 3,
      sourceLabel: "Urdu",
    }),
  },
  book2Urdu: {
    key: "book2Urdu",
    label: "Book 2 (Urdu)",
    note: "Move into Madinah Arabic Book 2 in Urdu with the full lesson sequence arranged into manageable modules.",
    playlist: MADINAH_ARABIC_BOOK_2_URDU_PLAYLIST_ID,
    modules: buildMadinahArabicModules(MADINAH_ARABIC_BOOK_2_URDU_PLAYLIST_ITEMS, {
      trackKey: "b2",
      trackLabel: "Book 2 (Urdu)",
      groupSize: 9,
      freeCount: 3,
      sourceLabel: "Urdu",
    }),
  },
  book3Urdu: {
    key: "book3Urdu",
    label: "Book 3 (Urdu)",
    note: "Study Madinah Arabic Book 3 in Urdu with the advanced lessons grouped into a focused final track.",
    playlist: MADINAH_ARABIC_BOOK_3_URDU_PLAYLIST_ID,
    modules: buildMadinahArabicModules(MADINAH_ARABIC_BOOK_3_URDU_PLAYLIST_ITEMS, {
      trackKey: "b3",
      trackLabel: "Book 3 (Urdu)",
      groupSize: 7,
      freeCount: 3,
      sourceLabel: "Urdu",
    }),
  },
};
const MADINAH_ARABIC_ENGLISH_DEFAULT_TRACK = "book1English";
const MADINAH_ARABIC_ENGLISH_TRACKS = {
  book1English: {
    key: "book1English",
    label: "Book 1 (English)",
    note: "Start with Madinah Arabic Book 1 in English, including the opening Quranic Arabic concepts and the complete Book 1 lesson path from the playlist you shared.",
    playlist: MADINAH_ARABIC_ENGLISH_PLAYLIST_ID,
    modules: buildMadinahArabicModules(MADINAH_ARABIC_ENGLISH_PLAYLIST_ITEMS, {
      trackKey: "en1",
      trackLabel: "Book 1 (English)",
      groupSize: 8,
      freeCount: 3,
      sourceLabel: "English",
    }),
  },
  book2English: {
    key: "book2English",
    label: "Book 2 (English)",
    note: "Continue into Madinah Arabic Book 2 in English with the full second-book sequence organized into structured modules.",
    playlist: MADINAH_ARABIC_BOOK_2_ENGLISH_PLAYLIST_ID,
    modules: buildMadinahArabicModules(MADINAH_ARABIC_BOOK_2_ENGLISH_PLAYLIST_ITEMS, {
      trackKey: "en2",
      trackLabel: "Book 2 (English)",
      groupSize: 9,
      freeCount: 3,
      sourceLabel: "English",
    }),
  },
};
const sarfLessonTitle = ({ index, sourceTitle }) => {
  const parts = cleanSourceTitle(sourceTitle)
    .split("|")
    .map(part => part.trim())
    .filter(Boolean);
  const topic = [...parts].reverse().find(part => !/ilm us sarf|arabic grammar course|mufti muhammad|علم الصرف عربی گرائمر کورس/i.test(part));
  return `Lesson ${pad(index)} - ${topic || "Ilm us Sarf"}`;
};
const buildIlmUsSarfModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 11)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l23${pad(item.index)}`,
        sarfLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 3,
          desc: "Imported from the Ilm us Sarf Arabic grammar playlist by Mufti Muhammad.",
        }
      ));

      return mkModule(
        `m23${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["🧩","🗣️","📘"][idx % 3],
        `Ilm us Sarf lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const nahwLessonTitle = ({ index, sourceTitle }) => {
  const parts = cleanSourceTitle(sourceTitle)
    .split("||")
    .map(part => part.trim())
    .filter(Boolean);
  const topic = parts.find(part => !/ilm un nahw|basic arabic grammar|course lec no|mufti muhammad/i.test(part)) || parts[1] || parts[0];
  return `Lesson ${pad(index)} - ${topic || "Ilm un Nahw"}`;
};
const buildIlmUnNahwModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 7)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l24${pad(item.index)}`,
        nahwLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 3,
          desc: "Imported from the Ilm un Nahw Arabic grammar playlist by Mufti Muhammad.",
        }
      ));

      return mkModule(
        `m24${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["✍️","📚","🧠"][idx % 3],
        `Ilm un Nahw lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const hajjLessonTitle = ({ index, sourceTitle }) => {
  const cleaned = cleanSourceTitle(sourceTitle);
  if (/promo/i.test(cleaned)) return `Lesson ${pad(index)} - Series Introduction`;
  const episode = cleaned.match(/Ep\s*0?(\d+)/i);
  const topic = cleaned
    .replace(/Hajj Guide Step By Step/i, "")
    .replace(/Ep\s*0?\d+/i, "")
    .replace(/By Zaid Patel/i, "")
    .replace(/- iPlus TV/i, "")
    .replace(/--+/g, " ")
    .replace(/^[\s\-:/.]+|[\s\-:/.]+$/g, "")
    .trim();
  return `Lesson ${pad(index)} - ${topic || `Hajj Guide${episode ? ` Episode ${episode[1]}` : ""}`}`;
};
const buildHajjModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 5)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l8h${pad(item.index)}`,
        hajjLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 2,
          desc: "Imported from Zaid Patel's Hajj Guide Step by Step playlist.",
        }
      ));

      return mkModule(
        `m8h${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["🕋","🧳","🌙"][idx % 3],
        `Hajj guide lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const aqidahTahawiLessonTitle = ({ index, sourceTitle }) => {
  const raw = cleanSourceTitle(sourceTitle);
  const part = raw.match(/Part\s*0?(\d+)/i);
  const topic = raw
    .replace(/Aqidah At-?Tahawi/i, "")
    .replace(/Al Aqidah Al Tahawiyyah/i, "")
    .replace(/\[Part\s*\d+\]/i, "")
    .replace(/Part\s*\d+/i, "")
    .replace(/\|\s*Asrar Rashid.*$/i, "")
    .replace(/^-+|-+$/g, "")
    .trim();
  return `Lesson ${pad(index)} - ${topic || `Aqidah At-Tahawi${part ? ` Part ${part[1]}` : ""}`}`;
};
const buildAqidahTahawiModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 4)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l27${pad(item.index)}`,
        aqidahTahawiLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 2,
          desc: "Imported from the Aqidah At-Tahawi playlist by Asrar Rashid.",
        }
      ));

      return mkModule(
        `m27${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["☝️","🕌","📚","✨"][idx % 4],
        `Aqidah At-Tahawi lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const hifzLessonTitle = ({ index, sourceTitle }) => {
  const raw = cleanSourceTitle(sourceTitle);
  const lesson = raw.match(/Lesson\s*0?(\d+)/i);
  const topic = raw
    .replace(/Hifz Quran Online/gi, "")
    .replace(/Live Hifz ul Quran/gi, "")
    .replace(/Lesson\s*\d+/gi, "")
    .replace(/Memorize Quran/gi, "")
    .replace(/Learn Quran Online/gi, "")
    .replace(/in Urdu\/Hindi/gi, "")
    .replace(/-+\s*eQuranAcademy.*/gi, "")
    .replace(/@[\w]+/g, "")
    .replace(/^[\s\-|:/]+|[\s\-|:/]+$/g, "")
    .trim();
  return `Lesson ${pad(index)} - ${topic || `Hifz Quran${lesson ? ` Lesson ${lesson[1]}` : ""}`}`;
};
const buildHifzQuranModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 8)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l29${pad(item.index)}`,
        hifzLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 2,
          desc: "Imported from the Hifz Quran Urdu/Hindi playlist.",
        }
      ));

      return mkModule(
        `m29${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["🧠","📖","🌙","✨"][idx % 4],
        `Hifz Quran lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const reciteProperlyLessonTitle = ({ index, sourceTitle }) => {
  const raw = cleanSourceTitle(sourceTitle);
  const page = raw.match(/Page\s*(\d+)/i);
  return `Lesson ${pad(index)} - ${page ? `Juz 1 Page ${page[1]}` : raw.replace(/How to recite the Quran in the proper way/gi, "").trim() || "Recite Quran Properly"}`;
};
const buildReciteQuranProperlyModules = (items) =>
  chunk([...items].sort((a, b) => a.index - b.index), 5)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `l30${pad(item.index)}`,
        reciteProperlyLessonTitle(item),
        item.youtubeId,
        item.duration,
        {
          free: item.index <= 2,
          desc: "Imported from the Recite Quran Properly playlist.",
        }
      ));

      return mkModule(
        `m30${String.fromCharCode(97 + idx)}`,
        `Module ${idx + 1} - Lessons ${pad(start)}-${pad(end)}`,
        ["📖","🎙️","🧭","✨"][idx % 4],
        `Recitation practice lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const buildUmrahModules = () => [
  mkModule(
    "m21a",
    "Module 1 - Umrah Guide",
    "🕌",
    "A guided Umrah overview and practical step-by-step lesson.",
    [
      mkLesson(
        "l21a1",
        "Lesson 01 - Umrah Overview & Practical Guide",
        "VorGBNx9koY",
        "15:00",
        {
          free: true,
          desc: "Authentic Umrah guide lesson already linked in the app.",
        }
      ),
    ]
  ),
];
const usoolHadithLessonTitle = ({ index, sourceTitle }) => {
  const raw = cleanSourceTitle(sourceTitle);
  if (/promo/i.test(raw)) return `Lesson ${pad(index)} - Series Introduction`;
  const episode = raw.match(/Episode\s*0?(\d+)/i);
  return `Lesson ${pad(index)} - Usool e Hadith${episode ? ` Episode ${episode[1]}` : ""}`;
};
const muslimSharifLessonTitle = ({ index, sourceTitle }) => {
  const range = cleanSourceTitle(sourceTitle).match(/Hadees No\s*([0-9]+)\s*to\s*([0-9]+)/i);
  return `Lesson ${pad(index)} - ${range ? `Sahih Muslim Hadith ${range[1]}-${range[2]}` : "Sahih Muslim"}`;
};
const buildHadithSeriesModules = (items, opts={}) =>
  chunk([...items].sort((a, b) => a.index - b.index), opts.groupSize || 8)
    .map((group, idx) => {
      const start = group[0]?.index || 0;
      const end = group[group.length - 1]?.index || start;
      const lessons = group.map(item => mkLesson(
        `${opts.lessonPrefix || "h"}${pad(item.index)}`,
        opts.lessonTitle ? opts.lessonTitle(item) : `Lesson ${pad(item.index)}`,
        item.youtubeId,
        item.duration,
        {
          free: item.index <= (opts.freeCount || 2),
          desc: opts.lessonDesc || "Imported from the linked YouTube playlist.",
        }
      ));

      return mkModule(
        `${opts.modulePrefix || "hm"}${String.fromCharCode(97 + idx)}`,
        `${opts.seriesLabel} - Part ${idx + 1}`,
        (opts.icons || ["📜","📘","🧠","✨"])[idx % (opts.icons || ["📜","📘","🧠","✨"]).length],
        `${opts.seriesLabel} lessons ${start} to ${end}.`,
        lessons
      );
    })
    .filter(section => section.lessons.length > 0);
const COURSES = [

{
    id: 16, 
    slug: "tajweed-ul-qiraat",
    title: "Tajweed-ul-Qira'at Course", 
    titleAr: "دورة تجويد القراءات",
    instructor: "Hafiz Saeed Raza Baghdadi", 
    category: "Quran", 
    level: "Beginner",
    rating: 5.0, 
    students: 1540, 
    price: 0, 
    isFree: true,
    badge: "Urdu", 
    badgeC: C.gold,
    thumb: "📖", 
    color: "#2D6A4F",
    desc: "A complete Tajweed ul Qira'at course covering all 20 currently public episodes from the playlist you shared.",
    playlist: TAJWEED_QIRAAT_PLAYLIST_ID,
    modules: buildTajweedQiraatModules(TAJWEED_QIRAAT_PLAYLIST_ITEMS),
  },
  {
    id:2, slug:"tajweed-course",
    title:"Tajweed Course", titleAr:"علم التجويد",
    instructor:"Qari Aqib", category:"Quran", level:"Intermediate",
    rating:4.9, students:4120, price:0, isFree:true,
    badge:"Urdu", badgeC:C.gold,
    thumb:"📖", color:"#1A6B4E",
    desc:"A complete Urdu Tajweed video series covering terminology, noon sakinah and tanween, meem sakin, idgham families, hamza rules, and advanced Quran-reading cases.",
    playlist:TAJWEED_COURSE_PLAYLIST_ID,
    modules:buildTajweedModules(TAJWEED_COURSE_PLAYLIST_ITEMS),
  },
  {
    id:3, slug:"arabic-language",
    title:"Lisan ul Quran", titleAr:"لسان القرآن",
    instructor:"Amir Sohail", category:"Arabic", level:"Intermediate",
    rating:4.9, students:4320, price:0, isFree:true,
    badge:"Arabic", badgeC:C.gold,
    thumb:"🗣️", color:"#22577A",
    desc:"A full Lisan ul Quran series covering Quranic Arabic grammar, noun patterns, nominal and verbal sentences, jussive and passive forms, and advanced applied structures.",
    playlist:LISANUL_QURAN_PLAYLIST_ID,
    modules:buildLisanModules(LISANUL_QURAN_PLAYLIST_ITEMS),
  },
  {
    id:17, slug:"arbi-ka-muallim-book-1-4",
    title:"Arbi ka Muallim Book 1 to 4", titleAr:"عربی کا معلم",
    instructor:"Amir Sohail", category:"Arabic", level:"Beginner",
    rating:4.9, students:2980, price:0, isFree:true,
    badge:"Arabic", badgeC:C.gold,
    thumb:"📚", color:"#6C5A3B",
    desc:"A long Arabic-learning pathway covering Arbi ka Muallim Books 1 to 4 through the public playlist lessons currently available on YouTube.",
    playlist:ARBI_KA_MUALLIM_PLAYLIST_ID,
    modules:buildArbiKaMuallimModules(ARBI_KA_MUALLIM_PLAYLIST_ITEMS),
  },
  {
    id:18, slug:"aasan-arabic-grammar",
    title:"Aasan Arabic Grammar", titleAr:"آسان عربی قواعد",
    instructor:"Asif Hameed", category:"Arabic", level:"Intermediate",
    rating:4.9, students:3210, price:0, isFree:true,
    badge:"Grammar", badgeC:C.gold,
    thumb:"🧠", color:"#7A4F2A",
    desc:"A full Arabic grammar course covering nouns, compounds, jumla ismiyyah, pronouns, verbs, and applied Quranic parsing across the full public playlist.",
    playlist:AASAN_ARABIC_GRAMMAR_PLAYLIST_ID,
    modules:buildAasanArabicGrammarModules(AASAN_ARABIC_GRAMMAR_PLAYLIST_ITEMS),
  },
  {
    id:23, slug:"ilm-us-sarf",
    title:"Ilm us Sarf", titleAr:"علم الصرف",
    instructor:"Mufti Muhammad", category:"Arabic", level:"Beginner",
    rating:4.8, students:1840, price:0, isFree:true,
    badge:"Morphology", badgeC:C.gold,
    thumb:"🔤", color:"#6E4A2F",
    desc:"A structured Arabic morphology course covering the foundations of Ilm us Sarf through the full public playlist lessons.",
    playlist:ILM_US_SARF_PLAYLIST_ID,
    modules:buildIlmUsSarfModules(ILM_US_SARF_PLAYLIST_ITEMS),
  },
  {
    id:24, slug:"ilm-un-nahw",
    title:"Ilm un Nahw", titleAr:"علم النحو",
    instructor:"Mufti Muhammad", category:"Arabic", level:"Beginner",
    rating:4.8, students:1710, price:0, isFree:true,
    badge:"Syntax", badgeC:C.gold,
    thumb:"✒️", color:"#4E6A5E",
    desc:"A beginner-friendly Arabic syntax course covering core Nahw topics through the linked playlist lessons.",
    playlist:ILM_UN_NAHW_PLAYLIST_ID,
    modules:buildIlmUnNahwModules(ILM_UN_NAHW_PLAYLIST_ITEMS),
  },
  {
    id:10, slug:"mualim-ul-quran",
    title:"Mualim ul Quran", titleAr:"معلم القرآن",
    instructor:"Hamza Sabherwal & Dr. Ubaid", category:"Quran", level:"Beginner",
    rating:4.9, students:3870, price:0, isFree:true,
    badge:"Guided", badgeC:C.gold,
    thumb:"📙", color:"#2F6F4F",
    desc:"A structured Muallim ul Quran challenge focused on understanding Quran directly in six months through guided lessons, homework checkpoints, revision sessions, and test-based practice.",
    playlist:MUALIM_UL_QURAN_PLAYLIST_ID,
    modules:buildMualimModules(MUALIM_UL_QURAN_PLAYLIST_ITEMS),
  },
  {
    id:11, slug:"short-seerah-course",
    title:"Short Seerah Course", titleAr:"السيرة المختصرة",
    instructor:"Dr. Yasir Qadhi", category:"Seerah", level:"Beginner",
    rating:4.9, students:2180, price:0, isFree:true,
    badge:"English", badgeC:C.gold,
    thumb:"🕊️", color:"#315B4C",
    desc:"A shorter English Seerah journey through the life of Prophet Muhammad, organized from a compact playlist for learners who want a faster overview.",
    playlist:SHORT_SEERAH_PLAYLIST_ID,
    modules:buildShortSeerahModules(SHORT_SEERAH_PLAYLIST_ITEMS),
  },
  {
    id:12, slug:"prophetic-life",
    title:"Prophetic (SAW) Life", titleAr:"الحياة النبوية",
    instructor:"Shaykh Abdul-Rahim Reasat", category:"Seerah", level:"Intermediate",
    rating:4.9, students:2480, price:0, isFree:true,
    badge:"Detailed", badgeC:C.gold,
    thumb:"🕯️", color:"#3C5B6F",
    desc:"A detailed Prophetic Life in Focus series tracing the blessed life of the Messenger from Arabia before Islam through the major stages of his mission.",
    playlist:PROPHETIC_LIFE_PLAYLIST_ID,
    modules:buildPropheticLifeModules(PROPHETIC_LIFE_PLAYLIST_ITEMS),
  },
  {
    id:13, slug:"prophetic-parenting",
    title:"Prophetic Parenting", titleAr:"التربية النبوية",
    instructor:"Shaykh Faraz Rabbani", category:"Family", level:"All Levels",
    rating:4.9, students:1280, price:0, isFree:true,
    badge:"Family", badgeC:C.gold,
    thumb:"👨‍👩‍👧",
    color:"#6B4F3B",
    desc:"A concise Prophetic Parenting series on raising righteous Muslim children through forty hadith-based reflections and a closing Q&A.",
    playlist:PROPHETIC_PARENTING_PLAYLIST_ID,
    modules:buildPropheticParentingModules(PROPHETIC_PARENTING_PLAYLIST_ITEMS),
  },
  {
    id:31, slug:"noorani-qaida",
    title:"Noorani Qaida", titleAr:"القاعدة النورانية",
    instructor:"Nur Academy Qaida Faculty", category:"Quran", level:"Beginner",
    rating:4.9, students:3640, price:0, isFree:true,
    badge:"2 Options", badgeC:C.gold,
    thumb:"🌙", color:"#0F6B52",
    desc:"A Noorani Qaida learning path with two study options inside one card: the full Noorani Qaida route and the shorter Noorani Basics route.",
    playlist:NOORANI_QAIDA_TRACKS.nooraniClassic.playlist,
    defaultTrack:NOORANI_QAIDA_DEFAULT_TRACK,
    trackOptions:NOORANI_QAIDA_TRACKS,
    modules:NOORANI_QAIDA_TRACKS.nooraniClassic.modules,
  },
  {
    id:32, slug:"madani-qaida",
    title:"Madani Qaida", titleAr:"القاعدة المدنية",
    instructor:"Nur Academy Qaida Faculty", category:"Quran", level:"Beginner",
    rating:4.9, students:3380, price:0, isFree:true,
    badge:"2 Options", badgeC:C.gold,
    thumb:"📗", color:"#2F6F4F",
    desc:"A Madani Qaida card with two separate routes inside it: Madani Qaida Journey and Madani Qaida Classic.",
    playlist:MADANI_QAIDA_TRACKS.madaniJourney.playlist,
    defaultTrack:MADANI_QAIDA_DEFAULT_TRACK,
    trackOptions:MADANI_QAIDA_TRACKS,
    modules:MADANI_QAIDA_TRACKS.madaniJourney.modules,
  },
  {
    id:33, slug:"arabic-learning-path",
    title:"Arabic Learning Path", titleAr:"مسار تعلم العربية",
    instructor:"Nur Academy Arabic Faculty", category:"Arabic", level:"Beginner",
    rating:4.9, students:2860, price:0, isFree:true,
    badge:"2 Tracks", badgeC:C.gold,
    thumb:"🧭", color:"#355C7D",
    desc:"A dual-track Arabic studies card with Al Arabiyya Bayna Yadayk for full Arabic learning and Al Ajooroomiyya for focused grammar study.",
    playlist:ARABIC_LEARNING_PATH_TRACKS.arabiyyaBaynaYadayk.playlist,
    defaultTrack:ARABIC_LEARNING_PATH_DEFAULT_TRACK,
    trackOptions:ARABIC_LEARNING_PATH_TRACKS,
    modules:ARABIC_LEARNING_PATH_TRACKS.arabiyyaBaynaYadayk.modules,
  },
  {
    id:MADINAH_ARABIC_URDU_SERIES_ID, slug:"madinah-arabic-series-urdu",
    title:"Madinah Arabic Series (Urdu)", titleAr:"سلسلة العربية بالمدينة - أُردو",
    instructor:"Nur Academy Arabic Faculty", category:"Arabic", level:"Beginner",
    rating:4.9, students:1960, price:0, isFree:true,
    badge:"3 Books", badgeC:C.gold,
    thumb:"🕌", color:"#4F6F52",
    desc:"A free Madinah Arabic Urdu series that groups Book 1, Book 2, and Book 3 under one catalog card while keeping each book as its own internal study path.",
    isSeries:true,
    seriesCourseIds:MADINAH_ARABIC_URDU_SERIES_CHILD_IDS,
    defaultSeriesCourseId:MADINAH_ARABIC_URDU_CHILD_IDS.book1Urdu,
    modules:[],
  },
  {
    id:MADINAH_ARABIC_URDU_CHILD_IDS.book1Urdu, slug:"madinah-arabic-book-1-urdu",
    title:"Madinah Arabic Book 1 (Urdu)", titleAr:"العربية بالمدينة - الكتاب الأول - أُردو",
    instructor:"Nur Academy Arabic Faculty", category:"Arabic", level:"Beginner",
    rating:4.9, students:1960, price:0, isFree:true,
    badge:"Series", badgeC:C.gold,
    thumb:"🕌", color:"#4F6F52",
    desc:"Begin the Madinah Arabic journey with Book 1 in Urdu, covering the opening lessons, vocabulary patterns, and foundational grammar.",
    seriesOptionTitle:"Book 1 (Urdu)",
    seriesOptionDesc:"Start from the beginning with the Book 1 Urdu playlist and its foundational Arabic lessons.",
    parentSeriesId:MADINAH_ARABIC_URDU_SERIES_ID,
    hiddenFromCatalog:true,
    displayOrder:1,
    playlist:MADINAH_ARABIC_URDU_TRACKS.book1Urdu.playlist,
    modules:namespaceModules(MADINAH_ARABIC_URDU_TRACKS.book1Urdu.modules, MADINAH_ARABIC_URDU_LEGACY_PREFIXES.book1Urdu),
  },
  {
    id:MADINAH_ARABIC_URDU_CHILD_IDS.book2Urdu, slug:"madinah-arabic-book-2-urdu",
    title:"Madinah Arabic Book 2 (Urdu)", titleAr:"العربية بالمدينة - الكتاب الثاني - أُردو",
    instructor:"Nur Academy Arabic Faculty", category:"Arabic", level:"Intermediate",
    rating:4.9, students:1960, price:0, isFree:true,
    badge:"Series", badgeC:C.gold,
    thumb:"🕌", color:"#4F6F52",
    desc:"Continue with Book 2 in Urdu through structured grammar lessons, sentence patterns, and progressively deeper Arabic study.",
    seriesOptionTitle:"Book 2 (Urdu)",
    seriesOptionDesc:"Continue into Book 2 with the full Urdu lesson sequence organized into focused study modules.",
    parentSeriesId:MADINAH_ARABIC_URDU_SERIES_ID,
    hiddenFromCatalog:true,
    displayOrder:2,
    playlist:MADINAH_ARABIC_URDU_TRACKS.book2Urdu.playlist,
    modules:namespaceModules(MADINAH_ARABIC_URDU_TRACKS.book2Urdu.modules, MADINAH_ARABIC_URDU_LEGACY_PREFIXES.book2Urdu),
  },
  {
    id:MADINAH_ARABIC_URDU_CHILD_IDS.book3Urdu, slug:"madinah-arabic-book-3-urdu",
    title:"Madinah Arabic Book 3 (Urdu)", titleAr:"العربية بالمدينة - الكتاب الثالث - أُردو",
    instructor:"Nur Academy Arabic Faculty", category:"Arabic", level:"Advanced",
    rating:4.9, students:1960, price:0, isFree:true,
    badge:"Series", badgeC:C.gold,
    thumb:"🕌", color:"#4F6F52",
    desc:"Complete the Urdu series with Book 3 and its advanced lesson path, keeping progress and completion separate from the earlier books.",
    seriesOptionTitle:"Book 3 (Urdu)",
    seriesOptionDesc:"Move into the advanced Book 3 Urdu track while keeping its lessons and progress separate from the earlier books.",
    parentSeriesId:MADINAH_ARABIC_URDU_SERIES_ID,
    hiddenFromCatalog:true,
    displayOrder:3,
    playlist:MADINAH_ARABIC_URDU_TRACKS.book3Urdu.playlist,
    modules:namespaceModules(MADINAH_ARABIC_URDU_TRACKS.book3Urdu.modules, MADINAH_ARABIC_URDU_LEGACY_PREFIXES.book3Urdu),
  },
  {
    id:35, slug:"madinah-arabic-books-1-2-3-english",
    title:"Madinah Arabic Books 1, 2 & 3 (English)", titleAr:"العربية بالمدينة - الإنجليزية",
    instructor:"Nur Academy Arabic Faculty", category:"Arabic", level:"Beginner",
    rating:4.9, students:1420, price:0, isFree:true,
    badge:"2 Books", badgeC:C.gold,
    thumb:"📘", color:"#526D82",
    desc:"A free English Madinah Arabic pathway inside one course card. It currently includes Book 1 and Book 2 as selectable options, with Book 3 ready to be added when you share that playlist.",
    playlist:MADINAH_ARABIC_ENGLISH_TRACKS.book1English.playlist,
    defaultTrack:MADINAH_ARABIC_ENGLISH_DEFAULT_TRACK,
    trackOptions:MADINAH_ARABIC_ENGLISH_TRACKS,
    modules:MADINAH_ARABIC_ENGLISH_TRACKS.book1English.modules,
  },
  {
    id:26, slug:"aqidah-at-tahawi",
    title:"Aqidah At-Tahawi", titleAr:"العقيدة الطحاوية",
    instructor:"Asrar Rashid", category:"Aqidah", level:"Intermediate",
    rating:4.9, students:1860, price:0, isFree:true,
    badge:"Aqidah", badgeC:C.gold,
    thumb:"☝️", color:"#425B76",
    desc:"A structured Aqidah At-Tahawi course covering creed, divine attributes, decree, prophethood, and core Sunni belief foundations.",
    playlist:AQIDAH_NEW_PLAYLIST_ID,
    modules:buildAqidahTahawiModules(AQIDAH_NEW_PLAYLIST_ITEMS),
  },
  {
    id:27, slug:"hajj-course",
    title:"Hajj Course", titleAr:"دورة الحج",
    instructor:"Zaid Patel", category:"Fiqh", level:"Beginner",
    rating:4.8, students:1730, price:0, isFree:true,
    badge:"Hajj", badgeC:C.gold,
    thumb:"🕋", color:"#4E6C5D",
    desc:"A step-by-step Hajj guide covering preparation, ihram, major rites, and common practical questions through the full playlist.",
    playlist:HAJJ_PLAYLIST_ID,
    modules:buildHajjModules(HAJJ_PLAYLIST_ITEMS),
  },
  {
    id:28, slug:"hifz-quran",
    title:"Hifz Quran", titleAr:"حفظ القرآن",
    instructor:"eQuranAcademy", category:"Quran", level:"Intermediate",
    rating:4.9, students:2140, price:0, isFree:true,
    badge:"Hifz", badgeC:C.gold,
    thumb:"🧠", color:"#355C4D",
    desc:"A large Urdu/Hindi Hifz pathway for memorising short surahs, revision lessons, and extended hifz practice from the linked playlist.",
    playlist:HIFZ_QURAN_PLAYLIST_ID,
    modules:buildHifzQuranModules(HIFZ_QURAN_PLAYLIST_ITEMS),
  },
  {
    id:29, slug:"recite-quran-properly",
    title:"Recite Quran Properly", titleAr:"اقرأ القرآن بإتقان",
    instructor:"Alaa Elsayed", category:"Quran", level:"Beginner",
    rating:4.8, students:1470, price:0, isFree:true,
    badge:"Recitation", badgeC:C.gold,
    thumb:"🎙️", color:"#2C5D74",
    desc:"A guided recitation practice course focused on reading the Quran correctly page by page with slow, clear demonstration.",
    playlist:RECITE_QURAN_PROPERLY_PLAYLIST_ID,
    modules:buildReciteQuranProperlyModules(RECITE_QURAN_PROPERLY_PLAYLIST_ITEMS),
  },
  {
    id:30, slug:"complete-namaz-with-tajweed",
    title:"Complete Namaz with Tajweed", titleAr:"النماز مع التجويد",
    instructor:"Nur Academy",
    category:"Quran",
    level:"Beginner",
    rating:4.8,
    students:980,
    price:0,
    isFree:true,
    badge:"Short Course",
    badgeC:C.gold,
    thumb:"🤲",
    color:"#6A5740",
    desc:"A short practical lesson for learning the complete namaz recitation with proper tajweed.",
    playlist:"",
    modules:[
      mkModule(
        "m30na",
        "Module 1 - Namaz Recitation",
        "🤲",
        "One focused lesson for complete namaz recitation with tajweed.",
        [
          mkLesson(
            "l30na1",
            "Lesson 01 - Complete Namaz with Tajweed",
            "EBmgv8Z25Mc",
            "15:00",
            {
              free: true,
              desc: "Imported from the YouTube lesson you shared for complete namaz with tajweed.",
            }
          ),
        ]
      ),
    ],
  },
  {
    id:7, slug:"usool-e-hadith",
    title:"Usool e Hadith", titleAr:"أصول الحديث",
    instructor:"Shaikh Noorul Hasan Madani", category:"Hadith", level:"Intermediate",
    rating:4.8, students:1640, price:0, isFree:true,
    badge:"Hadith", badgeC:C.gold, thumb:"📜", color:"#1B4332",
    desc:"A full Usool e Hadith course covering the preservation, terminology, and foundations of the Hadith sciences.",
    playlist:USOOL_HADITH_PLAYLIST_ID,
    modules:buildHadithSeriesModules(USOOL_HADITH_PLAYLIST_ITEMS, {
      seriesLabel: "Usool e Hadith",
      lessonPrefix: "l7u",
      modulePrefix: "m7u",
      groupSize: 8,
      freeCount: 2,
      lessonTitle: usoolHadithLessonTitle,
      lessonDesc: "Imported from the Usool e Hadith playlist by Shaikh Noorul Hasan Madani.",
      icons: ["🔬","📚","🧠","🕯️"],
    }),
  },
  {
    id:22, slug:"sahih-muslim",
    title:"Sahih Muslim", titleAr:"صحيح مسلم",
    instructor:"Sunnat Pak", category:"Hadith", level:"Intermediate",
    rating:4.8, students:1540, price:0, isFree:true,
    badge:"Hadith", badgeC:C.gold, thumb:"📚", color:"#415A77",
    desc:"A standalone Sahih Muslim course using the Urdu translation playlist you shared.",
    playlist:MUSLIM_SHARIF_PLAYLIST_ID,
    modules:buildHadithSeriesModules(MUSLIM_SHARIF_PLAYLIST_ITEMS, {
      seriesLabel: "Sahih Muslim",
      lessonPrefix: "l7m",
      modulePrefix: "m7m",
      groupSize: 10,
      freeCount: 1,
      lessonTitle: muslimSharifLessonTitle,
      lessonDesc: "Imported from the Sahih Muslim Urdu translation playlist.",
      icons: ["📗","📙","📕","📘","📚","✨","🕯️","🏁"],
    }),
  },
];
const applyTrackToModules = (modules=[], lessonOverrides={}, moduleOverrides={}) => modules.map(mod => {
  const modulePatch = moduleOverrides[mod.id] || {};
  return {
    ...mod,
    ...modulePatch,
    lessons: mod.lessons.map(lesson => {
      const lessonPatch = lessonOverrides[lesson.id] || {};
      return {
        ...lesson,
        ...lessonPatch,
        youtubeId: lessonPatch.youtubeId || lesson.youtubeId,
      };
    }),
  };
});
const CATEGORY_OPTIONS = ["Quran","Arabic","Seerah","Aqidah","Hadith","Fiqh","Family"];
const LEVEL_OPTIONS = ["Beginner","Intermediate","Advanced","All Levels"];
const slugifyCourseValue = (value, fallback="course") => String(value || "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "") || fallback;
const buildAdminStarterModules = ({ id, playlist="", firstVideoId="", firstLessonTitle="", firstLessonDuration="" }) => [
  mkModule(
    `m${id}a`,
    "Module 1 - Getting Started",
    "📘",
    "Starter lesson added from the admin panel.",
    [
      mkLesson(
        `l${id}01`,
        firstLessonTitle || "Lesson 01 - Course Introduction",
        firstVideoId || "DEMO",
        firstLessonDuration || "15:00",
        {
          free: true,
          desc: playlist
            ? "Added from the admin panel. Use the linked playlist for the full lesson series."
            : "Added from the admin panel.",
        }
      ),
    ]
  ),
];
const usesAdminStarterModules = (course={}) => {
  const firstModule = Array.isArray(course.modules) ? course.modules[0] : null;
  const firstLesson = Array.isArray(firstModule?.lessons) ? firstModule.lessons[0] : null;
  return Boolean(
    course?.id &&
    Array.isArray(course.modules) &&
    course.modules.length === 1 &&
    firstModule?.id === `m${course.id}a` &&
    Array.isArray(firstModule.lessons) &&
    firstModule.lessons.length === 1 &&
    firstLesson?.id === `l${course.id}01`
  );
};
const buildAdminCourseFormState = (course=null) => ({
  title: course?.title || "",
  titleAr: course?.titleAr || "",
  instructor: course?.instructor || "",
  category: course?.category || "Fiqh",
  level: course?.level || "Beginner",
  thumb: course?.thumb || "📘",
  color: course?.color || C.em,
  playlist: course?.playlist || "",
  firstVideoId: course?.firstVideoId || "",
  firstLessonTitle: course?.firstLessonTitle || "Lesson 01 - Introduction",
  firstLessonDuration: course?.firstLessonDuration || "15:00",
  price: safeNum(course?.price, 0) > 0 ? String(safeNum(course.price, 0)) : "",
  status: course?.isVisible === false ? "draft" : "published",
  desc: course?.desc || "",
});
const normalizeCustomCourse = (raw={}) => {
  const id = safeNum(raw.id, 0);
  const title = String(raw.title || "").trim();
  if (!id || !title) return null;

  const price = Math.max(0, safeNum(raw.price, 0));
  const isVisible = raw.isVisible !== false;
  const course = {
    id,
    slug: slugifyCourseValue(raw.slug || title, `course-${id}`),
    title,
    titleAr: String(raw.titleAr || "").trim(),
    instructor: String(raw.instructor || "Nur Academy").trim(),
    category: CATEGORY_OPTIONS.includes(raw.category) ? raw.category : "Fiqh",
    level: LEVEL_OPTIONS.includes(raw.level) ? raw.level : "Beginner",
    rating: Math.max(0, safeNum(raw.rating, 4.8)),
    students: Math.max(0, safeNum(raw.students, 0)),
    price,
    isFree: price <= 0,
    isVisible,
    status: isVisible ? "published" : "draft",
    badge: String(raw.badge || "Custom").trim() || "Custom",
    badgeC: String(raw.badgeC || C.gold).trim() || C.gold,
    thumb: String(raw.thumb || "📘").trim() || "📘",
    color: String(raw.color || C.em).trim() || C.em,
    desc: String(raw.desc || "Custom course added from the admin panel.").trim() || "Custom course added from the admin panel.",
    playlist: String(raw.playlist || "").trim(),
    firstVideoId: String(raw.firstVideoId || "").trim(),
    firstLessonTitle: String(raw.firstLessonTitle || "").trim(),
    firstLessonDuration: String(raw.firstLessonDuration || "").trim(),
    createdAt: String(raw.createdAt || dayKey()).trim() || dayKey(),
    adminManaged: true,
  };

  course.modules = Array.isArray(raw.modules) && raw.modules.length
    ? raw.modules
    : buildAdminStarterModules(course);

  return course;
};
const readCustomCourses = () => ls.get(K.COURSES, []).map(normalizeCustomCourse).filter(Boolean);
const writeCustomCourses = (updater) => {
  const current = clone(ls.get(K.COURSES, []));
  const nextValue = typeof updater === "function" ? updater(current) || current : updater;
  const nextCourses = Array.isArray(nextValue) ? nextValue : current;
  ls.set(K.COURSES, nextCourses);
  return nextCourses.map(normalizeCustomCourse).filter(Boolean);
};
const isCourseVisible = (course={}) => {
  if (course.hiddenFromCatalog) return false;
  return course.adminManaged ? course.isVisible !== false : true;
};
const getCourseCatalog = ({ includeHidden=false }={}) => {
  const catalog = [...COURSES, ...readCustomCourses()];
  return includeHidden ? catalog : catalog.filter(isCourseVisible);
};
const getCourseById = (id) => getCourseCatalog({ includeHidden:true }).find(course => String(course.id) === String(id)) || null;
const findCatalogCourse = (courseLike) => {
  if (!courseLike) return null;
  return getCourseCatalog({ includeHidden:true }).find(course =>
    String(course.id) === String(courseLike.id) ||
    (course.slug && course.slug === courseLike.slug)
  ) || courseLike;
};
const sortSeriesCourses = (a, b) => {
  const orderDiff = safeNum(a?.displayOrder, 999) - safeNum(b?.displayOrder, 999);
  return orderDiff || String(a?.title || "").localeCompare(String(b?.title || ""));
};
const isSeriesCourse = (course={}) => Boolean(course?.isSeries && Array.isArray(course.seriesCourseIds) && course.seriesCourseIds.length > 0);
const getSeriesChildren = (courseLike) => {
  const course = findCatalogCourse(courseLike);
  if (!course) return [];

  const linkedChildren = Array.isArray(course.seriesCourseIds) && course.seriesCourseIds.length
    ? course.seriesCourseIds.map(id => getCourseById(id)).filter(Boolean)
    : getCourseCatalog({ includeHidden:true }).filter(child => String(child.parentSeriesId || "") === String(course.id));

  return [...linkedChildren].sort(sortSeriesCourses);
};
const getSeriesOptionLabel = (course={}) => course.seriesOptionTitle || course.title || "";
const getSeriesOptionDescription = (course={}) => course.seriesOptionDesc || course.desc || "";
const getNextCourseId = () => getCourseCatalog({ includeHidden:true }).reduce((max, course) => Math.max(max, safeNum(course.id, 0)), 0) + 1;
const prunePlaceholderModules = (modules=[]) => modules
  .map(module => ({
    ...module,
    lessons: module.lessons.filter(lesson => Boolean(getYtId(lesson.youtubeId))),
  }))
  .filter(module => module.lessons.length > 0);
const LEGACY_SERIES_MIGRATIONS = [
  {
    parentId: MADINAH_ARABIC_URDU_SERIES_ID,
    defaultChildId: MADINAH_ARABIC_URDU_CHILD_IDS.book1Urdu,
    trackToChildId: MADINAH_ARABIC_URDU_CHILD_IDS,
    prefixes: Object.entries(MADINAH_ARABIC_URDU_LEGACY_PREFIXES).map(([trackKey, prefix]) => ({
      trackKey,
      prefix,
      childId: MADINAH_ARABIC_URDU_CHILD_IDS[trackKey],
    })),
  },
];
const bucketLegacyLessonIds = (lessonIds=[], migration) => {
  const buckets = {};
  const remainder = [];

  lessonIds.forEach(id => {
    const lessonId = String(id);
    const match = migration.prefixes.find(entry => lessonId.startsWith(`${entry.prefix}-`) || lessonId === entry.prefix);
    if (match) {
      if (!buckets[match.childId]) buckets[match.childId] = [];
      buckets[match.childId].push(id);
      return;
    }
    remainder.push(id);
  });

  return { buckets, remainder };
};
const bucketLegacyWatchEntries = (watchEntries=[], migration) => {
  const buckets = {};
  const remainder = [];

  watchEntries.forEach(([key, value]) => {
    const lessonId = String(key).split(":").slice(1).join(":");
    const match = migration.prefixes.find(entry => lessonId.startsWith(`${entry.prefix}-`) || lessonId === entry.prefix);
    if (match) {
      if (!buckets[match.childId]) buckets[match.childId] = [];
      buckets[match.childId].push([lessonId, value]);
      return;
    }
    remainder.push([lessonId, value]);
  });

  return { buckets, remainder };
};
const inferLegacySeriesChildId = (state, migration, progressBuckets={}, watchBuckets={}) => {
  const parentKey = String(migration.parentId);
  const storedSeriesId = String(state.seriesSelections[parentKey] || "");
  if (migration.prefixes.some(entry => String(entry.childId) === storedSeriesId)) return storedSeriesId;

  const storedTrack = String(state.courseTracks[parentKey] || "");
  if (migration.trackToChildId[storedTrack]) return String(migration.trackToChildId[storedTrack]);

  const usageScores = migration.prefixes.map(entry => ({
    childId: String(entry.childId),
    score: (progressBuckets[entry.childId]?.length || 0) + (watchBuckets[entry.childId]?.length || 0),
  }));
  const activeBucket = usageScores.sort((a, b) => b.score - a.score)[0];
  if (activeBucket?.score > 0) return activeBucket.childId;

  return String(migration.defaultChildId);
};
const migrateLegacySeriesState = (state) => {
  let changed = false;
  const nextState = mergeUserState(state || {});

  LEGACY_SERIES_MIGRATIONS.forEach(migration => {
    const parentKey = String(migration.parentId);
    const legacyProgress = [...(nextState.progress[parentKey] || [])];
    const legacyWatchEntries = Object.entries(nextState.watch).filter(([key]) => key.startsWith(`${parentKey}:`));
    const { buckets: progressBuckets, remainder: progressRemainder } = bucketLegacyLessonIds(legacyProgress, migration);
    const { buckets: watchBuckets, remainder: watchRemainder } = bucketLegacyWatchEntries(legacyWatchEntries, migration);
    const activeChildId = inferLegacySeriesChildId(nextState, migration, progressBuckets, watchBuckets);

    if (String(nextState.seriesSelections[parentKey] || "") !== activeChildId) {
      nextState.seriesSelections[parentKey] = activeChildId;
      changed = true;
    }

    if (nextState.courseTracks[parentKey]) {
      delete nextState.courseTracks[parentKey];
      changed = true;
    }

    if (legacyProgress.length) {
      Object.entries(progressBuckets).forEach(([childId, lessonIds]) => {
        nextState.progress[childId] = [...new Set([...(nextState.progress[childId] || []), ...lessonIds])];
      });
      if (progressRemainder.length) {
        nextState.progress[activeChildId] = [...new Set([...(nextState.progress[activeChildId] || []), ...progressRemainder])];
      }
      delete nextState.progress[parentKey];
      changed = true;
    }

    if (legacyWatchEntries.length) {
      Object.entries(watchBuckets).forEach(([childId, entries]) => {
        entries.forEach(([lessonId, value]) => {
          nextState.watch[`${childId}:${lessonId}`] = {
            ...(nextState.watch[`${childId}:${lessonId}`] || {}),
            ...value,
          };
        });
      });
      if (watchRemainder.length) {
        watchRemainder.forEach(([lessonId, value]) => {
          nextState.watch[`${activeChildId}:${lessonId}`] = {
            ...(nextState.watch[`${activeChildId}:${lessonId}`] || {}),
            ...value,
          };
        });
      }
      legacyWatchEntries.forEach(([key]) => { delete nextState.watch[key]; });
      changed = true;
    }

    if (nextState.completions[parentKey]) {
      if (!nextState.completions[activeChildId]) nextState.completions[activeChildId] = nextState.completions[parentKey];
      delete nextState.completions[parentKey];
      changed = true;
    }
  });

  return changed ? nextState : state;
};
const pruneStoredCourseData = () => {
  const validCourseIds = new Set(getCourseCatalog({ includeHidden:true }).map(course => String(course.id)));
  const allData = readAllUserData();
  let changed = false;

  Object.keys(allData).forEach(userId => {
    const mergedState = mergeUserState(allData[userId] || {});
    const state = migrateLegacySeriesState(mergedState);
    const wasMigrated = state !== mergedState;
    const nextEnrollments = state.enrollments.filter(id => validCourseIds.has(String(id)));
    const nextCourseTracks = Object.fromEntries(Object.entries(state.courseTracks).filter(([courseId]) => validCourseIds.has(String(courseId))));
    const nextSeriesSelections = Object.fromEntries(Object.entries(state.seriesSelections).filter(([courseId, childId]) => validCourseIds.has(String(courseId)) && validCourseIds.has(String(childId))));
    const nextProgress = Object.fromEntries(Object.entries(state.progress).filter(([courseId]) => validCourseIds.has(String(courseId))));
    const nextCompletions = Object.fromEntries(Object.entries(state.completions).filter(([courseId]) => validCourseIds.has(String(courseId))));
    const nextWatch = Object.fromEntries(Object.entries(state.watch).filter(([key]) => validCourseIds.has(String(key).split(":")[0])));

    if (
      nextEnrollments.length !== state.enrollments.length ||
      Object.keys(nextCourseTracks).length !== Object.keys(state.courseTracks).length ||
      Object.keys(nextSeriesSelections).length !== Object.keys(state.seriesSelections).length ||
      Object.keys(nextProgress).length !== Object.keys(state.progress).length ||
      Object.keys(nextCompletions).length !== Object.keys(state.completions).length ||
      Object.keys(nextWatch).length !== Object.keys(state.watch).length ||
      wasMigrated
    ) {
      changed = true;
      allData[userId] = {
        ...state,
        enrollments: nextEnrollments,
        courseTracks: nextCourseTracks,
        seriesSelections: nextSeriesSelections,
        progress: nextProgress,
        completions: nextCompletions,
        watch: nextWatch,
      };
    }
  });

  if (changed) ls.set(K.DATA, allData);
};
const selectCourseTrackKey = (course, preferredTrackKey) => {
  if (!course?.trackOptions) return null;
  const keys = Object.keys(course.trackOptions);
  if (!keys.length) return null;
  const fallback = course.trackOptions[course.defaultTrack] ? course.defaultTrack : keys[0];
  const requested = preferredTrackKey || course.selectedTrackKey || DB.selectedTrack(course.id) || fallback;
  return course.trackOptions[requested] ? requested : fallback;
};
const getSeriesSelectionId = (courseLike, preferredChildId) => {
  const course = findCatalogCourse(courseLike);
  if (!isSeriesCourse(course)) return null;

  const children = getSeriesChildren(course);
  if (!children.length) return null;

  const validIds = new Set(children.map(child => String(child.id)));
  const fallback = validIds.has(String(course.defaultSeriesCourseId))
    ? String(course.defaultSeriesCourseId)
    : String(children[0].id);
  const requested = preferredChildId || courseLike?.activeSeriesCourseId || DB.selectedSeriesCourse(course.id) || fallback;
  return validIds.has(String(requested)) ? String(requested) : fallback;
};
const resolveCourseWithoutSeries = (courseLike) => {
  const baseCourse = findCatalogCourse(courseLike);
  if (!baseCourse?.trackOptions) {
    return baseCourse?.hidePlaceholderLessons
      ? { ...baseCourse, modules: prunePlaceholderModules(baseCourse.modules) }
      : baseCourse;
  }

  const trackKey = selectCourseTrackKey(baseCourse, courseLike?.selectedTrackKey);
  const track = trackKey ? baseCourse.trackOptions[trackKey] : null;
  if (!track) return baseCourse;
  const rawModules = track.modules?.length
    ? track.modules
    : applyTrackToModules(baseCourse.modules, track.lessonOverrides || {}, track.moduleOverrides || {});

  const resolvedCourse = {
    ...baseCourse,
    ...(track.coursePatch || {}),
    selectedTrackKey: trackKey,
    selectedTrackLabel: track.label,
    selectedTrackNote: track.note || "",
    playlist: track.playlist || baseCourse.playlist,
    modules: namespaceModules(rawModules, `track-${baseCourse.id}-${trackKey}`),
  };

  return resolvedCourse.hidePlaceholderLessons
    ? { ...resolvedCourse, modules: prunePlaceholderModules(resolvedCourse.modules) }
    : resolvedCourse;
};
const resolveCourse = (courseLike) => {
  if (!courseLike) return null;
  const baseCourse = findCatalogCourse(courseLike);
  const resolvedBase = resolveCourseWithoutSeries(courseLike);

  if (!isSeriesCourse(baseCourse)) return resolvedBase;

  const seriesCourses = getSeriesChildren(baseCourse).map(child => resolveCourse(child));
  const activeSeriesCourseId = getSeriesSelectionId(courseLike, courseLike?.activeSeriesCourseId);
  const activeSeriesCourse = seriesCourses.find(child => String(child.id) === String(activeSeriesCourseId)) || seriesCourses[0] || null;

  return {
    ...resolvedBase,
    activeSeriesCourseId: activeSeriesCourse?.id || null,
    activeSeriesCourse,
    seriesCourses,
    selectedSeriesLabel: activeSeriesCourse ? getSeriesOptionLabel(activeSeriesCourse) : "",
    selectedSeriesNote: activeSeriesCourse ? getSeriesOptionDescription(activeSeriesCourse) : "",
    playlist: activeSeriesCourse?.playlist || resolvedBase?.playlist,
    modules: activeSeriesCourse?.modules || [],
  };
};
const getCourseStudyCourse = (courseLike) => {
  const resolvedCourse = resolveCourse(courseLike);
  return resolvedCourse?.activeSeriesCourse || resolvedCourse;
};
const getCourseEnrollmentId = (courseLike) => {
  const resolvedCourse = resolveCourse(courseLike);
  return resolvedCourse?.parentSeriesId || resolvedCourse?.id || null;
};
const getCourseProgressIds = (courseLike) => {
  const studyCourse = getCourseStudyCourse(courseLike);
  return studyCourse ? DB.progress(studyCourse.id) : [];
};
const getCourseCompletionRecord = (courseLike) => {
  const studyCourse = getCourseStudyCourse(courseLike);
  return studyCourse ? DB.courseCompletion(studyCourse.id) : null;
};
const getCourseSelectionLabel = (course={}) => course.selectedSeriesLabel || course.selectedTrackLabel || "";
const getCourseSelectionNote = (course={}) => course.selectedSeriesNote || course.selectedTrackNote || "";
const getCourseDetailTarget = (courseLike) => {
  const resolvedCourse = resolveCourse(courseLike);
  if (!resolvedCourse) return null;
  if (!resolvedCourse.parentSeriesId) return resolvedCourse;
  return resolveCourse({ id: resolvedCourse.parentSeriesId }) || resolvedCourse;
};
const getCourseCertificateEntries = (courseLike) => {
  const resolvedCourse = resolveCourse(courseLike);
  if (!resolvedCourse) return [];

  if (resolvedCourse.isSeries) {
    return getSeriesChildren(resolvedCourse)
      .map(child => resolveCourse(child))
      .map(child => ({
        key: `${resolvedCourse.id}:${child.id}`,
        displayCourse: resolvedCourse,
        certificateCourse: child,
        completion: getCourseCompletionRecord(child),
        selectionLabel: getSeriesOptionLabel(child),
      }))
      .filter(entry => Boolean(entry.completion));
  }

  const certificateCourse = getCourseStudyCourse(resolvedCourse);
  const completion = getCourseCompletionRecord(resolvedCourse);
  if (!certificateCourse || !completion) return [];

  return [{
    key: String(certificateCourse.id),
    displayCourse: resolvedCourse,
    certificateCourse,
    completion,
    selectionLabel: getCourseSelectionLabel(resolvedCourse),
  }];
};
const AdminDB = {
  users: () => [...Auth.users()].sort((a, b) => {
    if (a.role === b.role) return a.name.localeCompare(b.name);
    return a.role === "admin" ? -1 : 1;
  }),
  customCourses: () => readCustomCourses(),
  createCourse: (form={}) => {
    if (!Auth.isAdmin()) throw new Error("Only administrators can add courses.");
    const title = String(form.title || "").trim();
    if (!title) throw new Error("Please enter a course title.");
    const price = Math.max(0, safeNum(form.price, 0));

    const rawCourse = {
      id: getNextCourseId(),
      slug: slugifyCourseValue(form.slug || title, `course-${Date.now()}`),
      title,
      titleAr: String(form.titleAr || "").trim(),
      instructor: String(form.instructor || "Nur Academy").trim() || "Nur Academy",
      category: CATEGORY_OPTIONS.includes(form.category) ? form.category : "Fiqh",
      level: LEVEL_OPTIONS.includes(form.level) ? form.level : "Beginner",
      rating: 5,
      students: 0,
      price,
      isFree: price <= 0,
      isVisible: form.status !== "draft",
      badge: String(form.badge || "Custom").trim() || "Custom",
      badgeC: String(form.badgeC || C.gold).trim() || C.gold,
      thumb: String(form.thumb || "📘").trim() || "📘",
      color: String(form.color || C.em).trim() || C.em,
      desc: String(form.desc || "Custom course added from the admin panel.").trim() || "Custom course added from the admin panel.",
      playlist: String(form.playlist || "").trim(),
      firstVideoId: String(form.firstVideoId || "").trim(),
      firstLessonTitle: String(form.firstLessonTitle || "").trim(),
      firstLessonDuration: String(form.firstLessonDuration || "").trim(),
      createdAt: dayKey(),
    };

    const course = normalizeCustomCourse(rawCourse);
    writeCustomCourses(courses => [...courses, course]);
    return course;
  },
  updateCourse: (courseId, form={}) => {
    if (!Auth.isAdmin()) throw new Error("Only administrators can edit courses.");
    const customCourses = readCustomCourses();
    const existing = customCourses.find(course => course.id === courseId);
    if (!existing) throw new Error("Only custom admin-added courses can be edited.");

    const title = String(form.title || "").trim();
    if (!title) throw new Error("Please enter a course title.");

    const price = Math.max(0, safeNum(form.price, existing.price || 0));
    const nextDraft = {
      ...existing,
      ...form,
      id: existing.id,
      slug: existing.slug,
      rating: existing.rating,
      students: existing.students,
      createdAt: existing.createdAt,
      price,
      isFree: price <= 0,
      isVisible: form.status !== "draft",
    };

    if (usesAdminStarterModules(existing)) {
      nextDraft.modules = buildAdminStarterModules({
        id: existing.id,
        playlist: String(nextDraft.playlist || "").trim(),
        firstVideoId: String(nextDraft.firstVideoId || "").trim(),
        firstLessonTitle: String(nextDraft.firstLessonTitle || "").trim(),
        firstLessonDuration: String(nextDraft.firstLessonDuration || "").trim(),
      });
    } else {
      nextDraft.modules = existing.modules;
    }

    const course = normalizeCustomCourse(nextDraft);
    writeCustomCourses(courses => courses.map(item => safeNum(item.id, 0) === courseId ? course : item));
    return course;
  },
  deleteCourse: (courseId) => {
    if (!Auth.isAdmin()) throw new Error("Only administrators can delete courses.");
    const customCourses = readCustomCourses();
    const target = customCourses.find(course => course.id === courseId);
    if (!target) throw new Error("Only custom admin-added courses can be deleted.");

    writeCustomCourses(courses => courses.filter(course => safeNum(course.id, 0) !== courseId));

    const allData = readAllUserData();
    Object.keys(allData).forEach(userId => {
      const state = mergeUserState(allData[userId] || {});
      const courseKey = String(courseId);
      state.enrollments = state.enrollments.filter(id => id !== courseId);
      delete state.courseTracks[courseKey];
      delete state.progress[courseKey];
      delete state.completions[courseKey];
      Object.keys(state.watch).forEach(key => {
        if (key.startsWith(`${courseKey}:`)) delete state.watch[key];
      });
      allData[userId] = state;
    });
    ls.set(K.DATA, allData);
    return true;
  },
  certificates: () => {
    const usersById = new Map(Auth.users().map(user => [user.id, user]));
    const coursesById = new Map(getCourseCatalog({ includeHidden:true }).map(course => [String(course.id), course]));
    return Object.entries(readAllUserData()).flatMap(([userId, raw]) => {
      const data = mergeUserState(raw || {});
      return Object.entries(data.completions || {}).map(([courseId, completion]) => ({
        user: usersById.get(userId) || { name:"Removed User", email:"", id:userId },
        course: coursesById.get(courseId) || { id:courseId, title:"Removed Course", titleAr:"" },
        completion,
      }));
    }).sort((a, b) => String(b.completion?.completedAt || "").localeCompare(String(a.completion?.completedAt || "")));
  },
  certificateStatusForUser: (userId) => {
    const data = mergeUserState(readAllUserData()[userId] || {});
    return getCourseCatalog({ includeHidden:true })
      .map(course => resolveCourse(course))
      .filter(course => totalLessons(course) > 0)
      .map(course => ({
        course,
        completion: data.completions[String(course.id)] || null,
        issued: Boolean(data.completions[String(course.id)]),
      }))
      .sort((a, b) => a.course.title.localeCompare(b.course.title));
  },
  resetLearning: (userId) => {
    if (!Auth.isAdmin()) throw new Error("Only administrators can reset course data.");
    const allData = readAllUserData();
    allData[userId] = defaultUserState();
    ls.set(K.DATA, allData);
    return true;
  },
};
const SupportDB = {
  all: () => [...readSupportTickets()].sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""))),
  forUser: (userId) => SupportDB.all().filter(ticket => ticket.userId === userId),
  submit: ({ user, subject, message, category="General Support", courseId="", courseTitle="", screenshot=null }) => {
    if (!user?.id) throw new Error("You need to sign in before sending a support request.");
    const cleanSubject = String(subject || "").replace(/\s+/g, " ").trim();
    const cleanMessage = String(message || "").trim();
    if (!cleanSubject) throw new Error("Please add a short subject.");
    if (cleanMessage.length < 12) throw new Error("Please add a little more detail so the academy can help.");

    const now = new Date().toISOString();
    const ticket = {
      id: newSupportId(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      category: SUPPORT_CATEGORY_OPTIONS.includes(category) ? category : "General Support",
      subject: cleanSubject,
      message: cleanMessage,
      courseId: String(courseId || "").trim(),
      courseTitle: String(courseTitle || "").trim(),
      screenshot: normalizeSupportScreenshot(screenshot),
      status: "open",
      adminNote: "",
      createdAt: now,
      updatedAt: now,
    };

    writeSupportTickets(tickets => [ticket, ...tickets]);
    return ticket;
  },
  update: (ticketId, patch={}) => {
    if (!Auth.isAdmin()) throw new Error("Only administrators can update support requests.");
    let updatedTicket = null;
    writeSupportTickets(tickets => tickets.map(ticket => {
      if (ticket.id !== ticketId) return ticket;
      updatedTicket = {
        ...ticket,
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      return updatedTicket;
    }));
    if (!updatedTicket) throw new Error("Support request not found.");
    return updatedTicket;
  },
  counts: () => {
    const tickets = SupportDB.all();
    return tickets.reduce((summary, ticket) => {
      const key = SUPPORT_STATUS_META[ticket.status] ? ticket.status : "open";
      summary.total += 1;
      summary[key] += 1;
      return summary;
    }, { total:0, open:0, in_review:0, resolved:0 });
  },
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
            The app now shows a safe fallback instead of staying blank. You can reload the page, or clear the browser-stored access data and start fresh.
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

const CATS = ["All", ...CATEGORY_OPTIONS];

// Helpers
const flatLessons = (course) => {
  const out = [];
  course.modules.forEach((mod, mi) => mod.lessons.forEach((ls, li) => out.push({ ...ls, mi, li })));
  return out;
};
const clampCourseIndex = (value, length) => {
  if (!length || length < 1) return 0;
  const num = safeNum(value, 0);
  return Math.max(0, Math.min(length - 1, num));
};
const lessonStatePosition = (course, lessonState={}) => {
  if (!course) return { mi: 0, li: 0 };

  const lookupId = String(lessonState?.lessonId || "").trim();
  if (lookupId) {
    const match = flatLessons(course).find(lesson => lesson.id === lookupId);
    if (match) return { mi: match.mi, li: match.li };
  }

  const mi = clampCourseIndex(lessonState?.mi, course.modules.length);
  const mod = course.modules[mi];
  const li = clampCourseIndex(lessonState?.li, mod?.lessons?.length || 0);
  return { mi, li };
};
const createLessonState = (courseLike, mi=0, li=0) => {
  const detailCourse = resolveCourse(courseLike);
  const course = detailCourse?.activeSeriesCourse || detailCourse;
  if (!course || !course.modules?.length) return null;

  const nextPosition = lessonStatePosition(course, { mi, li });
  const lesson = course.modules[nextPosition.mi]?.lessons?.[nextPosition.li] || null;
  return {
    course,
    courseId: course.id,
    courseSlug: course.slug,
    selectedTrackKey: course.selectedTrackKey || null,
    parentSeriesId: course.parentSeriesId || (detailCourse?.isSeries ? detailCourse.id : null),
    lessonId: lesson?.id || null,
    mi: nextPosition.mi,
    li: nextPosition.li,
  };
};
const totalLessons = (c) => c.modules.reduce((a,m) => a+m.lessons.length, 0);
const namespaceModules = (modules=[], prefix="") => {
  if (!prefix) return modules;
  return modules.map(module => ({
    ...module,
    id: `${prefix}-${module.id}`,
    lessons: module.lessons.map(lesson => ({
      ...lesson,
      id: `${prefix}-${lesson.id}`,
    })),
  }));
};
const courseDoneIds = (course, rawDoneIds=[]) => {
  if (!course) return [];
  const lessonIds = new Set(flatLessons(course).map(lesson => lesson.id));
  return (rawDoneIds || []).filter(id => lessonIds.has(id));
};
const courseProgressStats = (course, rawDoneIds) => {
  const studyCourse = course?.activeSeriesCourse || course;
  const doneSource = rawDoneIds === undefined
    ? (studyCourse ? DB.progress(studyCourse.id) : [])
    : rawDoneIds;
  const total = studyCourse ? totalLessons(studyCourse) : 0;
  const doneIds = courseDoneIds(studyCourse, doneSource);
  const completed = doneIds.length;
  return {
    doneIds,
    completed,
    total,
    pct: total > 0 ? Math.round(completed / total * 100) : 0,
  };
};
const getYtId = (v) => {
  const raw = typeof v === "string" ? v.trim() : v;
  if (!raw || raw==="DEMO") return null;
  for (const p of [/[?&]v=([^&#]+)/,/youtu\.be\/([^?&#]+)/,/embed\/([^?&#]+)/,/shorts\/([^?&#]+)/]) {
    const m = raw.match(p); if (m) return m[1];
  }
  return /^[a-zA-Z0-9_-]{11}$/.test(raw) ? raw : null;
};
const YT_DURATION_EVENT = "nur:yt-duration";
const MAX_DURATION_PROBES = 3;
let ytDurationCache = null;
const ytDurationRequests = new Map();
const ytDurationQueue = [];
let activeDurationProbes = 0;
const formatVideoDuration = (seconds) => {
  const total = Math.max(0, Math.round(safeNum(seconds, 0)));
  if (!total) return "";
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(secs)}`
    : `${minutes}:${pad(secs)}`;
};
const readYouTubeDurationCache = () => {
  if (ytDurationCache) return ytDurationCache;
  ytDurationCache = typeof window === "undefined" ? {} : ls.get(K.YT_DURATIONS, {});
  return ytDurationCache;
};
const parseDurationLabel = (value="") => {
  const parts = String(value || "").trim().split(":").map(part => Number(part));
  if (!parts.length || parts.some(part => !Number.isFinite(part))) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 1) return parts[0];
  return 0;
};
const courseWatchStats = (course) => {
  if (!course) return { averagePct:0, eligible:false, trackedLessons:0, watchedSeconds:0, totalSeconds:0 };

  const trackableLessons = flatLessons(course).filter(lesson => Boolean(getYtId(lesson.youtubeId)));
  if (!trackableLessons.length) {
    return { averagePct:100, eligible:true, trackedLessons:0, watchedSeconds:0, totalSeconds:0 };
  }

  let watchedSeconds = 0;
  let totalSeconds = 0;
  const durationCache = readYouTubeDurationCache();

  trackableLessons.forEach(lesson => {
    const watch = DB.watch(course.id, lesson.id);
    const videoId = getYtId(lesson.youtubeId);
    const duration = Math.max(
      safeNum(watch.duration, 0),
      parseDurationLabel(videoId ? durationCache[videoId] : ""),
      parseDurationLabel(lesson.duration),
      1
    );
    const lessonWatched = Math.min(
      duration,
      Math.max(
        safeNum(watch.watchedSeconds, 0),
        Math.round(duration * Math.max(0, safeNum(watch.percent, 0)) / 100)
      )
    );

    totalSeconds += duration;
    watchedSeconds += lessonWatched;
  });

  const averagePct = totalSeconds > 0 ? Math.round(watchedSeconds / totalSeconds * 100) : 0;
  return {
    averagePct,
    eligible: averagePct >= CERTIFICATE_WATCH_THRESHOLD,
    trackedLessons: trackableLessons.length,
    watchedSeconds,
    totalSeconds,
  };
};
const persistYouTubeDurationCache = (cache) => {
  ytDurationCache = cache;
  try {
    localStorage.setItem(K.YT_DURATIONS, JSON.stringify(cache));
  } catch {}
};
const cacheYouTubeDuration = (videoId, durationValue) => {
  const id = getYtId(videoId);
  const label = typeof durationValue === "string"
    ? durationValue
    : formatVideoDuration(durationValue);
  if (!id || !label) return "";

  const currentCache = readYouTubeDurationCache();
  if (currentCache[id] === label) return label;

  const nextCache = { ...currentCache, [id]: label };
  persistYouTubeDurationCache(nextCache);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(YT_DURATION_EVENT, { detail: { id, label } }));
  }
  return label;
};
const waitForYouTubeDuration = (player, timeoutMs=12000) => new Promise((resolve, reject) => {
  const startedAt = Date.now();
  const check = () => {
    try {
      const duration = Math.max(0, safeNum(player?.getDuration?.(), 0));
      if (duration > 0) {
        resolve(duration);
        return;
      }
    } catch {}

    if (Date.now() - startedAt >= timeoutMs) {
      reject(new Error("Timed out loading the YouTube duration."));
      return;
    }

    window.setTimeout(check, 250);
  };

  check();
});
const probeYouTubeDuration = async (id) => {
  const YT = await loadYouTubeAPI();
  return new Promise((resolve, reject) => {
    let settled = false;
    let player = null;
    const mount = document.createElement("div");
    mount.style.position = "fixed";
    mount.style.left = "-20000px";
    mount.style.top = "0";
    mount.style.width = "1px";
    mount.style.height = "1px";
    mount.style.opacity = "0";
    mount.style.pointerEvents = "none";
    document.body.appendChild(mount);

    const cleanup = () => {
      try {
        player?.destroy?.();
      } catch {}
      mount.remove();
    };
    const finish = (handler, value) => {
      if (settled) return;
      settled = true;
      cleanup();
      handler(value);
    };

    player = new YT.Player(mount, {
      width: "1",
      height: "1",
      videoId: id,
      playerVars: {
        autoplay: 0,
        controls: 0,
        rel: 0,
        playsinline: 1,
        modestbranding: 1,
      },
      events: {
        onReady: async (event) => {
          try {
            const seconds = await waitForYouTubeDuration(event.target);
            finish(resolve, cacheYouTubeDuration(id, seconds));
          } catch (error) {
            finish(reject, error);
          }
        },
        onError: (event) => {
          finish(reject, new Error(`YouTube duration probe failed (${safeNum(event?.data, 0)}).`));
        },
      },
    });
  });
};
const pumpYouTubeDurationQueue = () => {
  while (activeDurationProbes < MAX_DURATION_PROBES && ytDurationQueue.length) {
    const { id, resolve, reject } = ytDurationQueue.shift();
    activeDurationProbes += 1;

    probeYouTubeDuration(id)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        activeDurationProbes -= 1;
        ytDurationRequests.delete(id);
        pumpYouTubeDurationQueue();
      });
  }
};
const requestYouTubeDuration = (videoId) => {
  const id = getYtId(videoId);
  if (!id) return Promise.resolve("");

  const cached = readYouTubeDurationCache()[id];
  if (cached) return Promise.resolve(cached);
  if (ytDurationRequests.has(id)) return ytDurationRequests.get(id);

  const request = new Promise((resolve, reject) => {
    ytDurationQueue.push({ id, resolve, reject });
    pumpYouTubeDurationQueue();
  });

  ytDurationRequests.set(id, request);
  return request;
};
const useResolvedLessonDuration = (videoId, fallback="", options={}) => {
  const { allowProbe = !fallback } = options;
  const id = getYtId(videoId);
  const fallbackLabel = fallback || "Unavailable";
  const [duration, setDuration] = useState(() => {
    if (!id) return fallbackLabel;
    return readYouTubeDurationCache()[id] || fallbackLabel;
  });

  useEffect(() => {
    if (!id) {
      setDuration(fallbackLabel);
      return;
    }

    const cached = readYouTubeDurationCache()[id];
    if (cached) setDuration(cached);
    else setDuration(fallbackLabel);

    if (!allowProbe) return;

    let cancelled = false;
    const handleDuration = (event) => {
      if (event.detail?.id === id && event.detail?.label) {
        setDuration(event.detail.label);
      }
    };

    window.addEventListener(YT_DURATION_EVENT, handleDuration);
    requestYouTubeDuration(id)
      .then(label => {
        if (!cancelled && label) setDuration(label);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      window.removeEventListener(YT_DURATION_EVENT, handleDuration);
    };
  }, [allowProbe, fallbackLabel, id]);

  return duration || fallbackLabel;
};
const LessonDurationText = ({ videoId, fallback, style={}, allowProbe }) => {
  const duration = useResolvedLessonDuration(videoId, fallback, { allowProbe });
  return <span style={style}>⏱ {duration}</span>;
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

const openCertificatePrintWindow = (course, user, completion) => {
  if (typeof window === "undefined" || !course || !user || !completion) return;
  const popup = window.open("", "_blank", "noopener,noreferrer,width=1100,height=780");
  if (!popup) return;
  const logoSrc = new URL(BRAND_LOGO_SRC, window.location.href).href;
  const sealSrc = new URL(sealImage, window.location.href).href;
  const signatureSrc = new URL(signatureImage, window.location.href).href;
  const certificateLabel = getCourseSelectionLabel(course);
  const studentName = escapeHtml(user.name);
  const courseTitle = escapeHtml(certificateLabel ? `${course.title} (${certificateLabel})` : course.title);
  const courseTitleAr = escapeHtml(course.titleAr || "");
  const completedAt = escapeHtml(formatDay(completion.completedAt));
  const certificateId = escapeHtml(completion.certificateId);

  popup.document.write(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${courseTitle} Certificate</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Crimson+Pro:wght@600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Crimson+Pro:wght@600;700&display=swap');
      @page{size:landscape;margin:10mm}
      *{box-sizing:border-box}
      body{margin:0;background:radial-gradient(circle at top,#f3e9cf,#eadcbf 58%,#dfcfad 100%);font-family:Georgia,serif;color:#1a1a1a;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:0}
      .cert{position:relative;width:100%;max-width:277mm;min-height:184mm;background:linear-gradient(180deg,#fffdf6 0%,#f7ecd2 100%);border:1px solid rgba(18,79,58,.18);box-shadow:0 28px 80px rgba(78,54,15,.14);overflow:hidden;break-inside:avoid;page-break-inside:avoid}
      .cert::before,.cert::after{content:"";position:absolute;inset:18px;border:2px solid rgba(186,145,53,.52);pointer-events:none}
      .cert::after{inset:34px;border-width:1px;border-color:rgba(18,79,58,.14)}
      .corner{position:absolute;width:118px;height:118px;border:2px solid rgba(186,145,53,.52);opacity:.78;z-index:1}
      .corner.tl{top:20px;left:20px;border-right:none;border-bottom:none}
      .corner.tr{top:20px;right:20px;border-left:none;border-bottom:none}
      .corner.bl{bottom:20px;left:20px;border-right:none;border-top:none}
      .corner.br{bottom:20px;right:20px;border-left:none;border-top:none}
      .content{position:relative;padding:13mm 16mm 11mm;z-index:2}
      .bismillah{text-align:center;color:#0c8a61;font-size:19px;letter-spacing:.04em;margin-bottom:10px;font-family:"Amiri",Georgia,serif}
      .brand{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:10px}
      .brand-mark{width:60px;height:60px;border-radius:50%;background:#fffdf7;border:3px solid rgba(186,145,53,.55);box-shadow:0 10px 24px rgba(18,79,58,.12);padding:6px;display:flex;align-items:center;justify-content:center}
      .brand-mark img{width:100%;height:100%;object-fit:contain}
      .brand-copy{text-align:center}
      .brand-copy span{display:block;color:#9a7420;letter-spacing:.22em;text-transform:uppercase;font-size:10px;font-weight:700}
      .brand-copy strong{display:block;color:#0b5240;font-size:22px;margin-top:4px;font-family:"Amiri",Georgia,serif}
      .title-ar{text-align:center;font-size:26px;color:#0b5240;font-family:"Amiri",Georgia,serif;margin-top:8px}
      .title{text-align:center;font-size:34px;color:#493616;margin:2px 0 0;font-family:"Crimson Pro",Georgia,serif;font-weight:700;line-height:1.08}
      .divider{display:flex;align-items:center;justify-content:center;gap:10px;color:#b58d33;margin:10px 0 14px;font-size:12px;letter-spacing:.3em}
      .divider::before,.divider::after{content:"";width:60px;height:1px;background:linear-gradient(90deg,transparent,rgba(181,141,51,.75),transparent)}
      .lead{text-align:center;color:#5a564d;font-size:13px;line-height:1.55;max-width:760px;margin:0 auto}
      .label{text-align:center;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9a7420;margin-top:18px;font-weight:700}
      .student-name{text-align:center;font-size:40px;line-height:1.04;color:#0b5240;font-weight:700;margin:8px 0 6px;font-family:"Crimson Pro",Georgia,serif}
      .student-line{width:280px;max-width:70%;height:2px;background:linear-gradient(90deg,transparent,rgba(181,141,51,.92),transparent);margin:0 auto 12px}
      .course-name{text-align:center;font-size:25px;line-height:1.28;color:#473721;font-weight:700;max-width:760px;margin:8px auto 0;font-family:"Crimson Pro",Georgia,serif}
      .course-ar{text-align:center;font-size:16px;color:#0c8a61;margin-top:6px;font-family:"Amiri",Georgia,serif}
      .quote{margin:16px auto 0;max-width:620px;padding:10px 14px;border-top:1px solid rgba(181,141,51,.45);border-bottom:1px solid rgba(181,141,51,.45);text-align:center;background:rgba(255,250,240,.52)}
      .quote-ar{color:#0b5240;font-size:18px;font-family:"Amiri",Georgia,serif;margin-bottom:4px}
      .quote-en{color:#736b5f;font-size:11px;letter-spacing:.05em;text-transform:uppercase}
      .meta-row{margin-top:18px;display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center}
      .meta-card{background:rgba(255,255,255,.76);border:1px solid rgba(18,79,58,.12);padding:12px 14px;min-height:84px;text-align:center}
      .meta-card span{display:block;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9a7420;margin-bottom:6px;font-weight:700}
      .meta-card strong{display:block;font-size:16px;color:#0b5240;line-height:1.45;word-break:break-word}
      .seal{width:112px;height:112px;border-radius:50%;border:2px solid rgba(181,141,51,.8);background:radial-gradient(circle,#fff8e2 0%,#ecd28f 48%,#c59c2e 100%);display:flex;align-items:center;justify-content:center;box-shadow:0 14px 28px rgba(92,66,16,.18)}
      .seal-inner{width:86px;height:86px;border-radius:50%;border:2px solid rgba(255,255,255,.65);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#533707;padding:8px}
      .seal-inner span,.seal-inner small{text-transform:uppercase;letter-spacing:.16em;font-size:8px;line-height:1.4}
      .seal-inner strong{font-size:16px;margin:4px 0;line-height:1.05}
      .footer{margin-top:18px;display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:end}
      .signature-block{max-width:320px}
      .signature-block img{height:42px;object-fit:contain;display:block;margin-bottom:6px}
      .signature-line{height:1px;background:#0b5240}
      .signature-label{margin-top:6px;color:#5e584b;font-size:10px;text-transform:uppercase;letter-spacing:.18em}
      .official-seal{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:90px}
      .official-seal img{width:80px;height:auto;object-fit:contain;display:block;filter:drop-shadow(0 10px 18px rgba(120,33,33,.16));margin-bottom:6px}
      .official-seal-label{color:#7b6650;font-size:10px;text-transform:uppercase;letter-spacing:.16em;text-align:center}
      .foot-copy{text-align:right;color:#645d52;font-size:10px;line-height:1.55;max-width:240px}
      .foot-copy strong{display:block;color:#0b5240;font-size:14px;margin-bottom:4px}
      @media (max-width: 900px){
        .content{padding:42px 34px 34px}
        .brand{flex-direction:column;gap:12px}
        .title{font-size:38px}
        .title-ar{font-size:30px}
        .student-name{font-size:42px}
        .course-name{font-size:28px}
        .meta-row{grid-template-columns:1fr;justify-items:center}
        .meta-card{width:100%;max-width:520px;text-align:center}
        .footer{grid-template-columns:1fr;gap:22px}
        .signature-block{max-width:none}
        .foot-copy{text-align:left}
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="cert">
        <span class="corner tl"></span>
        <span class="corner tr"></span>
        <span class="corner bl"></span>
        <span class="corner br"></span>
        <div class="content">
          <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div class="brand">
            <div class="brand-mark"><img src="${logoSrc}" alt="Nur Academy logo" /></div>
            <div class="brand-copy">
              <span>Nur Academy</span>
              <strong>نور أكاديمي</strong>
            </div>
          </div>
          <div class="title-ar">شهادة إتمام</div>
          <h1 class="title">Certificate of Completion</h1>
          <div class="divider">✦ ✦ ✦</div>
          <div class="lead">With gratitude and recognition for sincere effort in seeking beneficial knowledge, this certificate is presented in honor of successful completion.</div>
          <div class="label">Presented To</div>
          <div class="student-name">${studentName}</div>
          <div class="student-line"></div>
          <div class="label">For Successfully Completing</div>
          <div class="course-name">${courseTitle}</div>
          ${courseTitleAr ? `<div class="course-ar">${courseTitleAr}</div>` : ""}
          <div class="quote">
            <div class="quote-ar">وَقُل رَّبِّ زِدْنِي عِلْمًا</div>
            <div class="quote-en">"My Lord, increase me in knowledge."</div>
          </div>
          <div class="meta-row">
            <div class="meta-card">
              <span>Completion Date</span>
              <strong>${completedAt}</strong>
            </div>
            <div class="seal">
              <div class="seal-inner">
                <span>Traditional</span>
                <strong>Ijazah</strong>
                <small>Inspired Presentation</small>
              </div>
            </div>
            <div class="meta-card">
              <span>Certificate ID</span>
              <strong>${certificateId}</strong>
            </div>
          </div>
          <div class="footer">
            <div class="signature-block">
              <img src="${signatureSrc}" alt="Instructor signature" />
              <div class="signature-line"></div>
              <div class="signature-label">Authorized Instructor</div>
            </div>
            <div class="official-seal">
              <img src="${sealSrc}" alt="Nur Academy official seal" />
              <div class="official-seal-label">Official Seal</div>
            </div>
            <div class="foot-copy">
              <strong>Issued by Nur Academy</strong>
              May this completion be a source of barakah, growth, and beneficial knowledge.
            </div>
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

const printCertificate = async (course, user, completion) => {
  if (typeof window === "undefined" || !course || !user || !completion) return;

  const mountNode = document.createElement("div");
  mountNode.style.position = "fixed";
  mountNode.style.left = "-20000px";
  mountNode.style.top = "0";
  mountNode.style.width = "1200px";
  mountNode.style.pointerEvents = "none";
  mountNode.setAttribute("aria-hidden", "true");
  document.body.appendChild(mountNode);

  const root = createRoot(mountNode);

  try {
    root.render(
      <CertificatePage
        user={user}
        course={course}
        completion={completion}
        onPrint={() => openCertificatePrintWindow(course, user, completion)}
      />
    );

    await wait(80);
    await new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)));

    const frame = mountNode.querySelector(".certificate-frame");
    if (!frame) {
      openCertificatePrintWindow(course, user, completion);
      return;
    }

    await exportCertificatePdf({
      element: frame,
      courseName: getCourseSelectionLabel(course) ? `${course.title} (${getCourseSelectionLabel(course)})` : course.title,
      studentName: user.name,
      onFallbackPrint: () => openCertificatePrintWindow(course, user, completion),
    });
  } catch (error) {
    console.error("Certificate export bootstrap failed:", error);
    openCertificatePrintWindow(course, user, completion);
  } finally {
    root.unmount();
    mountNode.remove();
  }
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

const Btn = ({ children, v="primary", onClick, style={}, size="md", icon, disabled=false, type="button" }) => {
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
    <button type={type} className="btn" disabled={disabled} onClick={onClick}
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
  const fallbackEmbedSrc = id
    ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
    : "";

  useEffect(() => {
    watchedRef.current = safeNum(initialWatchSeconds, 0);
    lastTimeRef.current = safeNum(initialWatchSeconds, 0);
  }, [initialWatchSeconds, id]);

  useEffect(() => {
    if (!id || !mountRef.current) return;

    let cancelled = false;
    let playerReady = false;
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
      if (duration > 0) cacheYouTubeDuration(id, duration);

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

    const fallbackToIframe = () => {
      if (cancelled) return;
      clearTick();
      onTrackingChange?.(false);
      try {
        playerRef.current?.destroy?.();
      } catch {}
      playerRef.current = null;
      setFallback(true);
    };

    const bootTimer = window.setTimeout(() => {
      if (!playerReady) fallbackToIframe();
    }, 4500);

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
          ...(typeof window !== "undefined" && window.location?.origin
            ? { origin: window.location.origin }
            : {}),
        },
        events: {
          onReady: (event) => {
            playerReady = true;
            window.clearTimeout(bootTimer);
            const resumeAt = safeNum(initialWatchSeconds, 0);
            const duration = Math.max(0, safeNum(event.target.getDuration?.(), 0));
            if (duration > 0) cacheYouTubeDuration(id, duration);
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
            playerReady = true;
            window.clearTimeout(bootTimer);
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
      window.clearTimeout(bootTimer);
      setFallback(true);
      onTrackingChange?.(false);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(bootTimer);
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
        src={fallbackEmbedSrc}
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
  const displayCourse = resolveCourse(course);
  const selectionLabel = getCourseSelectionLabel(displayCourse);
  const enrollmentCourseId = getCourseEnrollmentId(displayCourse);
  const [pct, setPct] = useState(0);
  const [enrolled, setEnrolled] = useState(Boolean(enrollmentCourseId) && DB.isEnrolled(enrollmentCourseId));
  const viewerId = currentUserId();
  useEffect(() => {
    const sync = () => {
      const stats = courseProgressStats(displayCourse);
      setPct(stats.pct);
      setEnrolled(Boolean(enrollmentCourseId) && DB.isEnrolled(enrollmentCourseId));
    };

    sync();
    window.addEventListener("nur:data", sync);
    return () => window.removeEventListener("nur:data", sync);
  }, [displayCourse.activeSeriesCourseId, displayCourse.id, displayCourse.selectedTrackKey, enrollmentCourseId, viewerId]);

  return (
    <div className="card" onClick={() => onClick(displayCourse)}
      style={{background:"white",borderRadius:16,overflow:"hidden",boxShadow:"0 4px 18px rgba(11,82,64,.07)",border:`1px solid ${C.border}`}}>
      <div style={{height:148,background:`linear-gradient(135deg,${displayCourse.color},${displayCourse.color}BB)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3rem",position:"relative",overflow:"hidden"}}>
        <Iso op={0.1} col="white"/>
        <span style={{position:"relative",zIndex:1,animation:"float 3s ease-in-out infinite"}}>{displayCourse.thumb}</span>
        <div style={{position:"absolute",top:10,left:10,zIndex:1}}>
          {displayCourse.badge&&<Badge col={displayCourse.badgeC}>{displayCourse.badge}</Badge>}
        </div>
        <div style={{position:"absolute",top:10,right:10,zIndex:1}}>
          <Badge col={displayCourse.isFree?C.em:C.gold}>{displayCourse.isFree?"Free":`$${displayCourse.price}`}</Badge>
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
          <Badge col={C.emL}>{displayCourse.category}</Badge>
          <Badge col={C.textL}>{displayCourse.level}</Badge>
          {enrolled&&selectionLabel&&<Badge col={C.gold}>{selectionLabel}</Badge>}
        </div>
        <h3 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.08rem",fontWeight:700,color:C.text,marginBottom:2,lineHeight:1.25}}>{displayCourse.title}</h3>
        <p style={{fontFamily:"'Amiri',serif",fontSize:".8rem",color:C.gold,marginBottom:7}}>{displayCourse.titleAr}</p>
        <p style={{fontSize:".78rem",color:C.textL,marginBottom:11,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{displayCourse.desc}</p>
        <div style={{display:"flex",gap:10,fontSize:".72rem",color:C.textM,marginBottom:10}}>
          <span>📦 {displayCourse.modules.length} modules</span>
          <span>📚 {totalLessons(displayCourse)} lessons</span>
          <span>👥 {displayCourse.students.toLocaleString()}</span>
        </div>
        {enrolled ? <PBar value={pct} label="Progress" thin/> : (
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Stars n={displayCourse.rating}/>
            <span style={{fontSize:".7rem",color:C.textL}}>{displayCourse.instructor.split(" ").pop()}</span>
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

  useEffect(() => {
    setOpen(course.modules[0]?.id ? [course.modules[0].id] : []);
  }, [course.id, course.selectedTrackKey]);

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
                        <div style={{fontSize:".68rem",color:C.textL,marginTop:1}}>
                          <LessonDurationText videoId={ls.youtubeId} fallback={ls.duration} />
                        </div>
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
  const [mobileOpen, setMobileOpen] = useState(false);
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
  useEffect(() => { setMobileOpen(false); }, [page, currentUser?.id]);
  useEffect(() => {
    const closeDesktopMenu = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener("resize", closeDesktopMenu);
    return () => window.removeEventListener("resize", closeDesktopMenu);
  }, []);

  const hero = ["home","login","register"].includes(page);
  const dark = scrolled || !hero || mobileOpen;
  const openPage = (nextPage) => {
    setPage(nextPage);
    setMobileOpen(false);
  };

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:dark?"rgba(255,255,255,.97)":"transparent",backdropFilter:dark?"blur(14px)":"none",borderBottom:dark?`1px solid ${C.border}`:"none",transition:"all .3s",padding:"0 5%"}}>
      <div className="nav-shell" style={{maxWidth:1200,margin:"0 auto"}}>
        <div onClick={() => setPage("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:36,height:36,borderRadius:8,background:`linear-gradient(135deg,${C.em},${C.emM})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 10px rgba(11,82,64,.28)"}}>
            <svg width="19" height="19" viewBox="0 0 22 22"><polygon points="11,2 13,8 19,8 14,12 16,18 11,14 6,18 8,12 3,8 9,8" fill="#C9A84C"/></svg>
          </div>
          <div>
            <div style={{fontFamily:"'Amiri',serif",fontSize:"1.1rem",fontWeight:700,color:dark?C.emD:"white",lineHeight:1}}>Nur Academy</div>
            <div style={{fontFamily:"'Amiri',serif",fontSize:".62rem",color:C.gold,lineHeight:1}}>نور أكاديمي</div>
          </div>
        </div>
        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMobileOpen(open => !open)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          style={{color:dark?C.emD:"white",borderColor:dark?`${C.em}22`:"rgba(255,255,255,.26)",background:dark?"rgba(11,82,64,.06)":"rgba(255,255,255,.1)"}}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
        <div className={`nav-panel${mobileOpen ? " open" : ""}`}>
          <div className="nav-links">
          {[["Home","home"],["Courses","courses"],["About","about"],["Contact","contact"]].map(([l,k])=>(
            <span key={k} className="navL" onClick={()=>openPage(k)}
              style={{padding:"6px 13px",borderRadius:7,fontWeight:600,fontSize:".83rem",color:page===k?C.gold:dark?C.textM:"rgba(255,255,255,.85)",background:page===k?`${C.gold}12`:"transparent"}}>{l}</span>
          ))}
          </div>
          {currentUser ? (
            <div className="nav-actions" style={{marginLeft:6}}>
              {streak>0&&<div style={{display:"flex",justifyContent:"center"}}><StreakWidget/></div>}
              {currentUser.role==="admin" ? (
                <>
                  <Btn size="sm" v="ghost" onClick={()=>openPage("admin")}>Admin Workspace</Btn>
                  <Btn size="sm" v="outline" onClick={()=>openPage("dashboard")}>Learner View</Btn>
                </>
              ) : (
                <Btn size="sm" v="ghost" onClick={()=>openPage("dashboard")}>Student Dashboard</Btn>
              )}
              <div className="nav-avatar" onClick={()=>openPage(currentUser.role==="admin" ? "admin" : "dashboard")} title={currentUser.name}
                style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:".8rem",cursor:"pointer",flexShrink:0}}>
                {getInitials(currentUser.name)}
              </div>
              <Btn size="sm" v="outline" onClick={()=>{ setMobileOpen(false); onSignOut(); }} style={{color:dark?C.em:"white",borderColor:dark?C.em:"rgba(255,255,255,.45)"}}>Sign Out</Btn>
            </div>
          ) : (
            <div className="nav-actions" style={{marginLeft:6}}>
              <Btn size="sm" v="outline" onClick={()=>openPage("login")} style={{color:dark?C.em:"white",borderColor:dark?C.em:"rgba(255,255,255,.45)"}}>Login</Btn>
              <Btn size="sm" v="gold" onClick={()=>openPage("register")}>Join Free</Btn>
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
      <div className="footer-grid grid-4" style={{gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:34,marginBottom:32}}>
        <div>
          <div style={{fontFamily:"'Amiri',serif",fontSize:"1.2rem",color:"white",marginBottom:2}}>Nur Academy</div>
          <div style={{fontFamily:"'Amiri',serif",color:C.gold,marginBottom:11,fontSize:".88rem"}}>نور أكاديمي</div>
          <p style={{fontSize:".78rem",lineHeight:1.7,color:"rgba(255,255,255,.48)",maxWidth:240}}>Spreading Islamic knowledge with clarity, authenticity, and love.</p>
          <div style={{marginTop:13,padding:10,background:"rgba(201,168,76,.08)",borderRadius:8,border:`1px solid ${C.borderM}`}}>
            <div style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:".82rem",textAlign:"center"}}>وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا</div>
          </div>
        </div>
        {[
          {t:"Courses",ls:["Tajweed ul Qira'at","Noorani Qaida","Madani Qaida","Aqidah At-Tahawi","Hifz Quran"]},
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
      <div className="footer-bottom" style={{paddingTop:14,fontSize:".72rem",color:"rgba(255,255,255,.3)"}}>
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
  const courseCatalog = getCourseCatalog();
  const displayCatalog = courseCatalog.map(course => resolveCourse(course));
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
        <div className="split-grid" style={{maxWidth:1200,margin:"0 auto",width:"100%",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"center"}}>
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
            <div className="home-stat-row" style={{display:"flex",gap:28}}>
              {[{v:`${displayCatalog.filter(c=>c.isFree).length}`,l:"Free Courses"},{v:String(displayCatalog.length),l:"Total Courses"},{v:String(displayCatalog.reduce((a,c)=>a+c.modules.length,0)),l:"Modules"},{v:"🔥",l:"Streak System"}].map((s,i)=>(
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
              {displayCatalog.slice(0,2).map((c,i)=>(
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
        <div className="grid-4" style={{maxWidth:1200,margin:"0 auto",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
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
          <div className="grid-3" style={{gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {courseCatalog.slice(0,6).map(c=><CourseCard key={c.id} course={c} onClick={c=>{setCourse(c);setPage("course-detail");}}/>)}
          </div>
          <div style={{textAlign:"center",marginTop:32}}>
            <Btn size="lg" v="outline" onClick={()=>setPage("courses")}>{`View All ${courseCatalog.length} Courses →`}</Btn>
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
  const courseCatalog = getCourseCatalog();
  const [cat, setCat] = useState("All");
  const [q,   setQ  ] = useState("");
  const [pr,  setPr ] = useState("All");

  const filtered = courseCatalog.filter(c =>
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
          <div className="grid-3" style={{gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
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
const CourseDetailPage = ({ course, setPage, setLesson, setCourse, loggedIn }) => {
  const baseCourse = resolveCourse(course);
  const isSeries = Boolean(baseCourse?.isSeries);
  const [trackKey, setTrackKey] = useState(baseCourse?.selectedTrackKey || baseCourse?.defaultTrack || null);
  const [seriesChildId, setSeriesChildId] = useState(baseCourse?.activeSeriesCourseId ? String(baseCourse.activeSeriesCourseId) : null);
  const courseView = resolveCourse({
    ...baseCourse,
    ...(isSeries ? { activeSeriesCourseId: seriesChildId } : { selectedTrackKey: trackKey }),
  });
  const studyCourse = courseView?.activeSeriesCourse || courseView;
  const enrollmentCourseId = courseView?.parentSeriesId || courseView?.id;
  const [enrolled, setEnrolled] = useState(Boolean(enrollmentCourseId) && DB.isEnrolled(enrollmentCourseId));
  const [doneIds,  setDoneIds ] = useState(studyCourse ? DB.progress(studyCourse.id) : []);
  const [tab,      setTab     ] = useState("modules");
  const [popped,   setPopped  ] = useState(false);

  useEffect(() => {
    if (!baseCourse) return;
    const sync = () => {
      const nextTrackKey = baseCourse.trackOptions
        ? (DB.selectedTrack(baseCourse.id) || baseCourse.selectedTrackKey || baseCourse.defaultTrack || null)
        : null;
      const nextSeriesChildId = baseCourse.isSeries
        ? getSeriesSelectionId(baseCourse, seriesChildId || baseCourse.activeSeriesCourseId)
        : null;
      const nextCourse = resolveCourse({
        ...baseCourse,
        ...(baseCourse.isSeries ? { activeSeriesCourseId: nextSeriesChildId } : { selectedTrackKey: nextTrackKey }),
      });
      const nextStudyCourse = nextCourse?.activeSeriesCourse || nextCourse;
      const nextEnrollmentCourseId = nextCourse?.parentSeriesId || nextCourse?.id;

      if (baseCourse.trackOptions) setTrackKey(nextTrackKey);
      if (baseCourse.isSeries) setSeriesChildId(nextSeriesChildId ? String(nextSeriesChildId) : null);
      setEnrolled(Boolean(nextEnrollmentCourseId) && DB.isEnrolled(nextEnrollmentCourseId));
      setDoneIds(nextStudyCourse ? DB.progress(nextStudyCourse.id) : []);
    };

    sync();
    window.addEventListener("nur:data", sync);
    return () => window.removeEventListener("nur:data", sync);
  }, [baseCourse?.activeSeriesCourseId, baseCourse?.defaultSeriesCourseId, baseCourse?.defaultTrack, baseCourse?.id, baseCourse?.selectedTrackKey, seriesChildId]);

  const courseData = courseView;
  const trackChoices = !courseData?.isSeries && courseData?.trackOptions ? Object.entries(courseData.trackOptions) : [];
  const seriesChoices = courseData?.isSeries ? courseData.seriesCourses || [] : [];
  const selectionLabel = getCourseSelectionLabel(courseData);
  const selectionNote = getCourseSelectionNote(courseData);
  const progress = courseData ? courseProgressStats(courseData, doneIds) : { doneIds:[], completed:0, total:0, pct:0 };
  const completion = courseData ? getCourseCompletionRecord(courseData) : null;
  const completedIds = progress.doneIds;
  const tot = progress.total;
  const dn  = progress.completed;
  const pct = progress.pct;
  const nextLesson = studyCourse ? flatLessons(studyCourse).find(item => !completedIds.includes(item.id)) || flatLessons(studyCourse)[0] : null;
  const parentSeriesCourse = courseData?.parentSeriesId ? resolveCourse({ id: courseData.parentSeriesId }) : null;
  useEffect(() => {
    if (studyCourse && completion) {
      setPage("certificate");
    }
  }, [completion?.certificateId, setPage, studyCourse?.id]);

  if (!courseData) return null;

  const handleEnroll = () => {
    if (!loggedIn) { setPage("login"); return; }
    const parentSeriesId = courseData.isSeries ? courseData.id : courseData.parentSeriesId || null;
    const seriesSelectionId = courseData.isSeries
      ? courseData.activeSeriesCourseId
      : (courseData.parentSeriesId ? courseData.id : null);
    if (parentSeriesId && seriesSelectionId) DB.setSeriesCourse(parentSeriesId, seriesSelectionId);
    DB.enroll(enrollmentCourseId, {
      trackKey: courseData.selectedTrackKey,
      seriesChildId: courseData.isSeries ? courseData.activeSeriesCourseId : undefined,
    });
    setEnrolled(true);
    setPopped(true); setTimeout(() => setPopped(false), 2200);
  };

  const handleLesson = (mi, li) => {
    if (!loggedIn) { setPage("login"); return; }
    const nextLessonState = createLessonState(courseData, mi, li);
    if (!nextLessonState) return;
    setLesson(nextLessonState); setPage("lesson");
  };
  const openStudyPathDetail = () => {
    if (!studyCourse) return;
    setCourse(studyCourse);
    setPage("course-detail");
  };

  const curId = null;

  return (
    <div className="page" style={{paddingTop:64,minHeight:"100vh",background:C.cream}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(160deg,${C.emD},${courseData.color})`,padding:"44px 5% 34px",position:"relative",overflow:"hidden"}}>
        <Iso op={0.07} col={C.gold}/>
        <div className="split-grid" style={{maxWidth:1200,margin:"0 auto",gridTemplateColumns:"1fr auto",gap:34,alignItems:"start",position:"relative",zIndex:1}}>
          <div>
            <Btn
              v="dark"
              size="sm"
              style={{marginBottom:14}}
              onClick={() => {
                if (parentSeriesCourse) {
                  setCourse(parentSeriesCourse);
                  setPage("course-detail");
                  return;
                }
                setPage("courses");
              }}
            >
              {parentSeriesCourse ? "← Back to Series" : "← Back to Courses"}
            </Btn>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              <Badge col={C.gold}>{courseData.category}</Badge>
              <Badge col="rgba(255,255,255,.45)">{courseData.level}</Badge>
              {selectionLabel&&<Badge col={C.gold}>{selectionLabel}</Badge>}
              {courseData.isFree&&<Badge col={C.emL}>Free</Badge>}
            </div>
            <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.95rem",color:"white",marginBottom:4}}>{courseData.title}</h1>
            <div style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:".98rem",marginBottom:11}}>{courseData.titleAr}</div>
            <p style={{color:"rgba(255,255,255,.7)",fontSize:".93rem",lineHeight:1.75,maxWidth:560,marginBottom:15}}>{courseData.desc}</p>
            <div className="course-detail-meta" style={{display:"flex",gap:18,fontSize:".8rem",color:"rgba(255,255,255,.62)",marginBottom:15}}>
              <span>👤 {courseData.instructor}</span>
              <span>📦 {studyCourse?.modules?.length || 0} modules</span>
              <span>📚 {tot} lessons</span>
              <span>👥 {courseData.students.toLocaleString()}</span>
            </div>
            <Stars n={courseData.rating} s={15}/>
            {enrolled&&<div style={{marginTop:12,maxWidth:310}}><PBar value={pct} label={`Your Progress: ${dn}/${tot} lessons`}/></div>}
          </div>
          {/* Enroll card */}
          <div className="course-detail-enroll" style={{background:"white",borderRadius:14,padding:22,minWidth:255,boxShadow:"0 14px 46px rgba(0,0,0,.2)"}}>
            <div style={{fontSize:"2rem",textAlign:"center",marginBottom:9}}>{courseData.thumb}</div>
            <div style={{textAlign:"center",marginBottom:14}}>
              <div style={{fontSize:"1.6rem",fontWeight:800,color:C.em}}>{courseData.isFree?"Free":`$${courseData.price}`}</div>
            </div>
            {trackChoices.length > 0 && (
              <div style={{marginBottom:14}}>
                <div style={{fontSize:".72rem",fontWeight:700,color:C.textM,letterSpacing:".06em",textTransform:"uppercase",marginBottom:8}}>Choose Course Option</div>
                <div style={{display:"grid",gap:8}}>
                  {trackChoices.map(([key, track]) => {
                    const active = courseData.selectedTrackKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setTrackKey(key);
                          if (enrolled) DB.enroll(courseData.id, { trackKey: key });
                        }}
                        style={{
                          width:"100%",
                          textAlign:"left",
                          padding:"10px 12px",
                          borderRadius:10,
                          border:`1px solid ${active ? C.em : C.border}`,
                          background:active ? `${C.em}0D` : C.cream,
                          cursor:"pointer",
                          opacity:1,
                        }}
                      >
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,marginBottom:3}}>
                          <span style={{fontWeight:700,color:active ? C.emD : C.text}}>{track.label}</span>
                          {active&&<span style={{fontSize:".68rem",fontWeight:700,color:C.gold}}>{enrolled ? "Active" : "Selected"}</span>}
                        </div>
                        <div style={{fontSize:".72rem",color:C.textL,lineHeight:1.5}}>{track.note}</div>
                      </button>
                    );
                  })}
                </div>
                <div style={{marginTop:8,fontSize:".69rem",lineHeight:1.55,color:C.textL}}>
                  {enrolled
                    ? `You are enrolled in this course. Switching options updates the active study path to ${selectionLabel}.`
                    : "Choose which option the learner should follow before enrolling in this course."}
                </div>
              </div>
            )}
            {courseData.isSeries && (
              <div style={{marginBottom:14,padding:"11px 12px",borderRadius:12,background:C.cream,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:".72rem",fontWeight:700,color:C.textM,letterSpacing:".06em",textTransform:"uppercase",marginBottom:6}}>Series Access</div>
                <div style={{fontWeight:800,color:C.emD,marginBottom:4}}>{selectionLabel || "Choose a course option"}</div>
                <div style={{fontSize:".75rem",lineHeight:1.6,color:C.textL}}>
                  {selectionNote || "Enroll once to unlock the currently selected book inside this Urdu Madinah Arabic series."}
                </div>
              </div>
            )}
            {!enrolled ? (
              <Btn v="gold" style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={handleEnroll}>
                {loggedIn ? (courseData.isSeries ? "🎓 Enroll in Series" : "🎓 Enroll Now") : "🔑 Login to Enroll"}
              </Btn>
            ) : (
              <div>
                {popped&&<div style={{textAlign:"center",fontSize:"1.3rem",marginBottom:7,animation:"pop .4s ease"}}>🎉 Enrolled!</div>}
                <Btn v="primary" style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={()=>{
                  if (courseData.isSeries) {
                    openStudyPathDetail();
                    return;
                  }
                  if (!nextLesson) return;
                  const nextLessonState = createLessonState(courseData, nextLesson.mi, nextLesson.li);
                  if (!nextLessonState) return;
                  setLesson(nextLessonState);
                  setPage("lesson");
                }}>
                  ▶ {courseData.isSeries ? "Open Selected Course" : (pct > 0 ? "Resume Course" : "Start Course")}
                </Btn>
                <div style={{marginTop:9}}><PBar value={pct} label={`${pct}% complete`}/></div>
              </div>
            )}
            <div style={{marginTop:13,fontSize:".73rem",color:C.textL}}>
              {["📦 "+(studyCourse?.modules?.length || 0)+" modules","📚 "+tot+" lessons","📝 Personal notes","🔥 Streak tracking","📜 Certificate"].map(f=><div key={f} style={{padding:"3px 0"}}>{f}</div>)}
            </div>
            {courseData.playlist && courseData.playlist!=="YOUR_PLAYLIST_ID_HERE"&&(
              <a href={`https://www.youtube.com/playlist?list=${courseData.playlist}`} target="_blank" rel="noreferrer"
                style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5,marginTop:11,padding:"7px",borderRadius:8,background:"#FF000012",color:"#CC0000",fontSize:".74rem",fontWeight:600,textDecoration:"none",border:"1px solid #FF000020"}}>
                ▶ View YouTube Playlist
              </a>
            )}
          </div>
        </div>
      </div>

      {courseData.isSeries ? (
        <div style={{maxWidth:1200,margin:"0 auto",padding:"30px 5% 44px"}}>
          <div className="split-grid" style={{gridTemplateColumns:"minmax(0,1.15fr) minmax(300px,.85fr)",gap:18,alignItems:"start",marginBottom:22}}>
            <div style={{background:"white",borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:C.sh}}>
              <div style={{fontSize:".72rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:6}}>Choose Course Option</div>
              <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.28rem",color:C.emD,marginBottom:10}}>Select the book you want to study inside this series</div>
              <div style={{fontSize:".8rem",lineHeight:1.7,color:C.textM,marginBottom:15}}>
                Each book remains a separate internal course with its own lessons, progress, and completion record. The main series enrollment unlocks the selected path below.
              </div>
              <div style={{display:"grid",gap:12}}>
                {seriesChoices.map((seriesCourse, index) => {
                  const active = String(courseData.activeSeriesCourseId) === String(seriesCourse.id);
                  const optionStats = courseProgressStats(seriesCourse);
                  const optionComplete = Boolean(getCourseCompletionRecord(seriesCourse));
                  return (
                    <button
                      key={seriesCourse.id}
                      type="button"
                      onClick={() => {
                        const nextId = String(seriesCourse.id);
                        setSeriesChildId(nextId);
                        if (loggedIn) DB.setSeriesCourse(courseData.id, nextId);
                      }}
                      style={{
                        width:"100%",
                        textAlign:"left",
                        padding:"15px 16px",
                        borderRadius:14,
                        border:`1px solid ${active ? C.em : C.border}`,
                        background:active ? `${C.em}0D` : "white",
                        cursor:"pointer",
                        transition:"all .2s",
                      }}
                    >
                      <div style={{display:"flex",justifyContent:"space-between",gap:14,alignItems:"flex-start",marginBottom:7,flexWrap:"wrap"}}>
                        <div>
                          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                            <span style={{fontSize:".68rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL}}>Option {index + 1}</span>
                            {active&&<Badge col={C.em}>{enrolled ? "Active" : "Selected"}</Badge>}
                            {optionComplete&&<Badge col={C.gold}>Completed</Badge>}
                          </div>
                          <div style={{fontWeight:800,fontSize:".92rem",color:active ? C.emD : C.text,marginBottom:4}}>{getSeriesOptionLabel(seriesCourse)}</div>
                          <div style={{fontSize:".76rem",lineHeight:1.65,color:C.textL,maxWidth:620}}>{getSeriesOptionDescription(seriesCourse)}</div>
                        </div>
                        <div style={{minWidth:110,textAlign:"right"}}>
                          <div style={{fontSize:".72rem",fontWeight:700,color:C.emD}}>{optionStats.pct}% done</div>
                          <div style={{fontSize:".68rem",color:C.textL,marginTop:3}}>{optionStats.completed}/{optionStats.total} lessons</div>
                        </div>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                        <div style={{fontSize:".72rem",color:C.textM}}>
                          {seriesCourse.modules.length} modules · {optionStats.total} lessons
                        </div>
                        <div style={{width:"min(220px,100%)"}}>
                          <PBar value={optionStats.pct} label={optionComplete ? "Completed" : `${optionStats.pct}% complete`} thin/>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{background:"white",borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:C.sh,position:"sticky",top:92}}>
              <div style={{fontSize:".72rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:6}}>Active Study Path</div>
              <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.26rem",color:C.emD,marginBottom:6}}>{selectionLabel}</div>
              <div style={{fontSize:".8rem",lineHeight:1.7,color:C.textM,marginBottom:14}}>{selectionNote}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:10,marginBottom:14}}>
                {[
                  { label:"Modules", value:String(studyCourse?.modules?.length || 0), color:C.em },
                  { label:"Lessons", value:String(tot), color:C.gold },
                  { label:"Progress", value:`${pct}%`, color:"#7C3AED" },
                  { label:"Price", value:courseData.isFree ? "Free" : `$${courseData.price}`, color:C.green },
                ].map(item => (
                  <div key={item.label} style={{padding:"11px 12px",borderRadius:12,background:C.cream,border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:".67rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:5}}>{item.label}</div>
                    <div style={{fontSize:"1.1rem",fontWeight:800,color:item.color}}>{item.value}</div>
                  </div>
                ))}
              </div>
              {enrolled ? (
                <Btn v="primary" style={{width:"100%",justifyContent:"center",marginBottom:12}} onClick={openStudyPathDetail}>
                  ▶ {pct > 0 ? "Resume Course" : "Start Course"}
                </Btn>
              ) : (
                <Btn v="gold" style={{width:"100%",justifyContent:"center",marginBottom:12}} onClick={handleEnroll}>
                  {loggedIn ? "🎓 Enroll in Series" : "🔑 Login to Enroll"}
                </Btn>
              )}
              <PBar value={pct} label={enrolled ? `Progress: ${dn}/${tot} lessons` : "Progress will follow the selected book"} />
              <div style={{marginTop:12,fontSize:".72rem",lineHeight:1.7,color:C.textL}}>
                {enrolled
                  ? "Changing the active option updates which internal book opens when the learner resumes this series."
                  : "Choose the desired book first. Once enrolled, the same selection is remembered for this learner on this browser."}
              </div>
            </div>
          </div>

          <div>
            <div className="course-detail-heading" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:14,marginBottom:18}}>
              <div>
                <div style={{fontSize:".72rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:6}}>Series Curriculum</div>
                <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.28rem",color:C.emD}}>{selectionLabel} Preview</h2>
              </div>
              {enrolled&&<Badge col={C.em}>{pct}% Complete</Badge>}
            </div>
            {studyCourse ? (
              <ModuleList course={studyCourse} doneIds={completedIds} isEnrolled={enrolled} onLesson={handleLesson} curId={curId}/>
            ) : (
              <div style={{background:"white",borderRadius:16,padding:"26px 22px",border:`1px solid ${C.border}`,color:C.textL}}>
                This series does not have an active study path yet.
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
      {/* Tabs */}
      <div style={{borderBottom:`1px solid ${C.border}`,background:"white",position:"sticky",top:64,zIndex:10}}>
        <div className="tabs-scroll" style={{maxWidth:1200,margin:"0 auto",padding:"0 5%",display:"flex"}}>
          {["modules","instructor","resources"].map(t=>(
            <button key={t} className={`tab${tab===t?" on":""}`} onClick={()=>setTab(t)} style={{textTransform:"capitalize"}}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:880,margin:"0 auto",padding:"34px 5%"}}>
        {tab==="modules"&&(
          <div>
            <div className="course-detail-heading" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.28rem",color:C.emD}}>{courseData.modules.length} Modules · {tot} Lessons</h2>
              {enrolled&&<Badge col={C.em}>{pct}% Complete</Badge>}
            </div>
            <ModuleList course={courseData} doneIds={completedIds} isEnrolled={enrolled} onLesson={handleLesson} curId={curId}/>
          </div>
        )}
        {tab==="instructor"&&(
          <div className="course-detail-instructor" style={{display:"flex",gap:20,padding:22,background:"white",borderRadius:14,border:`1px solid ${C.border}`}}>
            <div style={{width:68,height:68,borderRadius:"50%",flexShrink:0,background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"1.3rem",fontWeight:700}}>
              {courseData.instructor.split(" ").map(w=>w[0]).join("").slice(0,2)}
            </div>
            <div>
              <h3 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.12rem",color:C.text}}>{courseData.instructor}</h3>
              <p style={{color:C.gold,fontSize:".8rem",marginBottom:8}}>Islamic Scholar & Course Instructor</p>
              <p style={{color:C.textM,fontSize:".83rem",lineHeight:1.7}}>A respected Islamic scholar with extensive experience in teaching the Islamic sciences. All content is based on authentic Quran and Sunnah, following the methodology of the righteous predecessors.</p>
            </div>
          </div>
        )}
        {tab==="resources"&&(
          <div>
            <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.28rem",color:C.emD,marginBottom:16}}>Downloadable Resources</h2>
            {courseData.modules.map(mod=>{
              const withRes = mod.lessons.filter(l=>l.resources?.length>0);
              if (!withRes.length) return null;
              return (
                <div key={mod.id} style={{marginBottom:18}}>
                  <div style={{fontWeight:700,color:C.text,marginBottom:9,fontSize:".86rem"}}>{mod.title}</div>
                  {withRes.map(ls=>ls.resources?.map(r=>(
                    <div key={r} className="course-detail-heading" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"white",borderRadius:9,border:`1px solid ${C.border}`,marginBottom:6}}>
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
        </>
      )}
    </div>
  );
};

// ─── LESSON PLAYER ────────────────────────────────────────────────────────────
const LessonPage = ({ lessonData, setPage, setLesson, setCourse }) => {
  const sourceCourse = resolveCourse({
    ...(lessonData?.course || {}),
    id: lessonData?.courseId ?? lessonData?.course?.id,
    slug: lessonData?.courseSlug || lessonData?.course?.slug,
    selectedTrackKey: lessonData?.selectedTrackKey || lessonData?.course?.selectedTrackKey || null,
  });
  const detailCourse = getCourseDetailTarget(sourceCourse);
  const initialPosition = lessonStatePosition(sourceCourse, lessonData);
  const [mi,       setMi      ] = useState(initialPosition.mi);
  const [li,       setLi      ] = useState(initialPosition.li);
  const [sTab,     setSTab    ] = useState("chapters");
  const [doneIds,  setDoneIds ] = useState(DB.progress(sourceCourse?.id));
  const [confetti, setConfetti] = useState(false);
  const [watchInfo, setWatchInfo] = useState(sourceCourse ? DB.watch(sourceCourse.id, sourceCourse.modules[initialPosition.mi]?.lessons[initialPosition.li]?.id) : defaultWatchState());
  const [trackingSupported, setTrackingSupported] = useState(Boolean(getYtId(sourceCourse?.modules[initialPosition.mi]?.lessons[initialPosition.li]?.youtubeId)));
  const [courseCompleted, setCourseCompleted] = useState(null);
  const [certificateGate, setCertificateGate] = useState(null);
  const [gateDismissed, setGateDismissed] = useState(false);
  const completeTimer = useRef(null);
  const completionTriggered = useRef(false);
  const course = sourceCourse;

  useEffect(() => {
    if (!sourceCourse) return;
    const nextPosition = lessonStatePosition(sourceCourse, lessonData);
    setMi(nextPosition.mi);
    setLi(nextPosition.li);
  }, [lessonData?.courseId, lessonData?.courseSlug, lessonData?.lessonId, lessonData?.selectedTrackKey, sourceCourse?.id, sourceCourse?.selectedTrackKey]);

  if (!course) return null;

  const flat    = flatLessons(course);
  const curMod  = course.modules[mi];
  const curLs   = curMod?.lessons[li];
  const flatIdx = flat.findIndex(l=>l.id===curLs?.id);
  const progress = courseProgressStats(course, doneIds);
  const tot     = progress.total;
  const dn      = progress.completed;
  const pct     = progress.pct;
  const isDone  = doneIds.includes(curLs?.id);
  const hasTrackableVideo = Boolean(getYtId(curLs?.youtubeId));
  const lessonWatchPct = Math.max(0, watchInfo.percent || 0);
  const watchStats = courseWatchStats(course);
  const certificateReady = Boolean(DB.courseCompletion(course.id));
  const adminCertificateBypass = Auth.isAdmin();

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

  useEffect(() => {
    setCourseCompleted(null);
    setCertificateGate(null);
    setGateDismissed(false);
  }, [course?.id]);

  useEffect(() => () => clearTimeout(completeTimer.current), []);

  const goTo = (newMi, newLi) => { setMi(newMi); setLi(newLi); setConfetti(false); };
  const goPrev = () => { if(flatIdx>0){ const p=flat[flatIdx-1]; goTo(p.mi,p.li); } };
  const goNext = () => { if(flatIdx<tot-1){ const n=flat[flatIdx+1]; goTo(n.mi,n.li); } };
  const maybeIssueCertificate = useCallback((progressIds=DB.progress(course.id)) => {
    if (!course) return null;
    const hasFinishedCourse = courseDoneIds(course, progressIds).length === tot;
    if (!hasFinishedCourse) {
      setCertificateGate(null);
      setGateDismissed(false);
      return null;
    }
    if (DB.courseCompletion(course.id)) {
      setCertificateGate(null);
      setGateDismissed(false);
      return null;
    }

    const nextWatchStats = courseWatchStats(course);
    if (!adminCertificateBypass && !nextWatchStats.eligible) {
      setCertificateGate(nextWatchStats);
      return null;
    }

    setCertificateGate(null);
    setGateDismissed(false);
    return DB.finishCourse(course.id, { watchPercent: nextWatchStats.averagePct });
  }, [adminCertificateBypass, course, tot]);
  const markLessonComplete = useCallback((lesson) => {
    if (!course || !lesson) return;
    const currentProgress = DB.progress(course.id);
    if (currentProgress.includes(lesson.id)) return;

    DB.complete(course.id, lesson.id, {
      watchedSeconds: DB.watch(course.id, lesson.id).watchedSeconds,
      duration: DB.watch(course.id, lesson.id).duration,
      source: getYtId(lesson.youtubeId) ? "manual-fallback" : "manual",
    });
    DB.touch();

    const updated = DB.progress(course.id);
    setDoneIds(updated);

    if (lesson.id === curLs?.id) {
      completionTriggered.current = true;
      setWatchInfo(DB.watch(course.id, lesson.id));
    }

    const completion = maybeIssueCertificate(updated);
    if (completion) setCourseCompleted(completion);
  }, [course, curLs?.id, maybeIssueCertificate]);

  const completeLesson = useCallback((source="manual", payload={}) => {
    if (!course || !curLs || completionTriggered.current) return;

    completionTriggered.current = true;
    DB.complete(course.id, curLs.id, {
      ...payload,
      source,
    });
    DB.touch();

    const updated = DB.progress(course.id);
    setDoneIds(updated);
    setWatchInfo(DB.watch(course.id, curLs.id));
    const hasFinishedCourse = courseDoneIds(course, updated).length === tot;
    const completion = maybeIssueCertificate(updated);
    if (completion) setCourseCompleted(completion);

    setConfetti(true);
    clearTimeout(completeTimer.current);
    completeTimer.current = setTimeout(() => {
      setConfetti(false);
      if (!hasFinishedCourse && flatIdx < tot - 1) {
        const nextLesson = flatLessons(course)[flatIdx + 1];
        goTo(nextLesson.mi, nextLesson.li);
      }
    }, 1600);
  }, [course, curLs, flatIdx, maybeIssueCertificate, tot]);

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

    const completion = maybeIssueCertificate();
    if (completion) setCourseCompleted(completion);
  }, [completeLesson, course, curLs, maybeIssueCertificate]);

  const markDone = () => {
    if (isDone) return;
    completeLesson(hasTrackableVideo ? "manual-fallback" : "manual", {});
  };

  return (
    <div style={{paddingTop:64,background:"#0C0C0C",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      {/* Top bar */}
      <div className="lesson-topbar" style={{background:C.emD,padding:"8px 18px",display:"flex",alignItems:"center",gap:11,borderBottom:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
        <button onClick={()=>{ setCourse(detailCourse || course); setPage("course-detail"); }} style={{background:"none",border:"none",color:"rgba(255,255,255,.52)",cursor:"pointer",fontSize:".78rem",fontFamily:"'Nunito Sans',sans-serif",flexShrink:0}}>← Back</button>
        <span style={{color:"rgba(255,255,255,.18)"}}>|</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{color:"white",fontSize:".82rem",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{course.title}</div>
          <div style={{color:"rgba(255,255,255,.36)",fontSize:".68rem"}}>{curMod?.title} · Lesson {li+1}</div>
        </div>
        <div className="lesson-progress" style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
          <span style={{color:"rgba(255,255,255,.38)",fontSize:".72rem"}}>{pct}% done</span>
          <div style={{width:90}}><div className="pbar"><div className="pfill" style={{width:`${pct}%`}}/></div></div>
        </div>
      </div>

      <div className="lesson-main" style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* Video + info */}
        <div className="lesson-content" style={{flex:1,display:"flex",flexDirection:"column",overflow:"auto",minWidth:0}}>
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
            <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"flex-start",marginBottom:7}}>
              <h2 style={{fontFamily:"'Crimson Pro',serif",color:"white",fontSize:"1.18rem",marginBottom:0,flex:1}}>{curLs?.title}</h2>
              <button
                type="button"
                onClick={markDone}
                disabled={isDone}
                aria-label={isDone ? "Lecture completed" : "Mark lecture complete"}
                title={isDone ? "Lecture completed" : "Mark lecture complete"}
                style={{
                  width:28,
                  height:28,
                  borderRadius:8,
                  border:`1px solid ${isDone ? C.em : "rgba(255,255,255,.22)"}`,
                  background:isDone ? C.em : "transparent",
                  color:isDone ? "white" : "rgba(255,255,255,.72)",
                  display:"inline-flex",
                  alignItems:"center",
                  justifyContent:"center",
                  cursor:isDone ? "default" : "pointer",
                  flexShrink:0,
                }}
              >
                {isDone ? "✓" : ""}
              </button>
            </div>
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
                <div style={{marginTop:7,fontSize:".7rem",color:"rgba(255,255,255,.48)"}}>
                  {adminCertificateBypass
                    ? `Admin preview mode is active on this account. Certificates can be issued after all lessons are marked complete, even below ${CERTIFICATE_WATCH_THRESHOLD}% watch time.`
                    : `Certificate unlock: ${watchStats.averagePct}% total watch time. At least ${CERTIFICATE_WATCH_THRESHOLD}% is required.`}
                </div>
              </div>
            ) : (
              <div style={{marginBottom:12,padding:"10px 12px",borderRadius:10,background:"rgba(11,82,64,.18)",border:`1px solid ${C.em}38`,fontSize:".72rem",color:"rgba(255,255,255,.58)"}}>
                {curLs?.youtubeId === "DEMO"
                  ? "This lesson is still using a placeholder video ID, so completion stays manual until a real YouTube lesson is added."
                  : "This lesson is not currently available for in-site playback, so manual completion is shown instead."}
              </div>
            )}
            {!certificateReady && certificateGate && !adminCertificateBypass && (
              <div style={{marginBottom:12,padding:"11px 12px",borderRadius:10,background:"rgba(220,38,38,.12)",border:"1px solid rgba(220,38,38,.28)",fontSize:".74rem",color:"rgba(255,255,255,.76)",lineHeight:1.65}}>
                All lectures are marked complete, but the certificate is still locked until the learner reaches at least {CERTIFICATE_WATCH_THRESHOLD}% total watch time. Current watch time: <strong style={{color:"white"}}>{certificateGate.averagePct}%</strong>.
              </div>
            )}
            <div className="lesson-actions" style={{display:"flex",gap:9,alignItems:"center",flexWrap:"wrap"}}>
              <Btn size="sm" v="dark" onClick={goPrev} disabled={flatIdx===0} icon="◀">Prev</Btn>
              <Btn size="sm" v="dark" onClick={goNext} disabled={flatIdx===tot-1}>Next ▶</Btn>
              <div className="lesson-spacer" style={{flex:1}}/>
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
        <div className="lesson-sidebar" style={{width:310,background:"#111",borderLeft:"1px solid rgba(255,255,255,.05)",display:"flex",flexDirection:"column",flexShrink:0}}>
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
                            <div style={{fontSize:".6rem",color:"rgba(255,255,255,.24)",marginTop:1}}>
                              <LessonDurationText videoId={ls.youtubeId} fallback={ls.duration} />
                              {!isDn&&watchPct>0?` · ${watchPct}% watched`:""}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              if (isDn) return;
                              if (isCur) markDone();
                              else markLessonComplete(ls);
                            }}
                            aria-label={isDn ? "Lecture completed" : `Mark ${ls.title} complete`}
                            title={isDn ? "Lecture completed" : "Mark lecture complete"}
                            style={{
                              width:18,
                              height:18,
                              borderRadius:5,
                              border:`1px solid ${isDn ? C.em : "rgba(255,255,255,.22)"}`,
                              background:isDn ? C.em : "transparent",
                              color:isDn ? "white" : "transparent",
                              fontSize:".66rem",
                              display:"inline-flex",
                              alignItems:"center",
                              justifyContent:"center",
                              flexShrink:0,
                              cursor:isDn ? "default" : "pointer",
                            }}
                          >
                            ✓
                          </button>
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

      {courseCompleted && (
        <div className="overlay" style={{padding:"20px"}}>
          <div style={{width:"min(960px,100%)",maxHeight:"90vh",overflowY:"auto",background:"white",borderRadius:24,padding:"24px 22px",boxShadow:"0 28px 80px rgba(0,0,0,.28)"}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"flex-start",marginBottom:16}}>
              <div>
                <div style={{fontFamily:"'Amiri',serif",fontSize:"1.8rem",color:C.emD,marginBottom:6}}>Alhamdulillah! Course Completed</div>
                <div style={{fontSize:".9rem",color:C.textL,lineHeight:1.7}}>
                  Your certificate for <strong style={{color:C.text}}>{course.title}</strong> is now ready. You can open it now or return to your dashboard.
                </div>
              </div>
              <button onClick={()=>setCourseCompleted(null)} style={{background:"transparent",border:"none",fontSize:"1.4rem",cursor:"pointer",color:C.textL,lineHeight:1}}>×</button>
            </div>

            <div className="action-row" style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:18}}>
              <Btn v="gold" onClick={() => { setCourse(course); setPage("certificate"); }}>View Certificate</Btn>
              <Btn v="outline" onClick={() => { setCourseCompleted(null); setPage("dashboard"); }}>Go to Dashboard</Btn>
            </div>

            <div style={{fontSize:".78rem",color:C.textL,marginBottom:14}}>
              Certificate ID: <strong style={{color:C.emD}}>{courseCompleted.certificateId}</strong>
            </div>

            <HadiyaSupportCard style={{maxWidth:"none",boxShadow:"none"}} />
          </div>
        </div>
      )}

      {certificateGate && !courseCompleted && !gateDismissed && (
        <div className="overlay" style={{padding:"20px"}}>
          <div style={{width:"min(620px,100%)",background:"white",borderRadius:22,padding:"22px",boxShadow:"0 28px 80px rgba(0,0,0,.28)"}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD,marginBottom:4}}>Certificate Almost Ready</div>
                <div style={{fontSize:".88rem",color:C.textL,lineHeight:1.7}}>
                  The learner has completed every lecture, but certificates unlock only after at least {CERTIFICATE_WATCH_THRESHOLD}% total watch time.
                </div>
              </div>
              <button onClick={()=>setGateDismissed(true)} style={{background:"transparent",border:"none",fontSize:"1.4rem",cursor:"pointer",color:C.textL,lineHeight:1}}>×</button>
            </div>
            <div style={{padding:"12px 14px",borderRadius:12,background:C.cream,border:`1px solid ${C.border}`,marginBottom:16}}>
              <div style={{fontWeight:700,color:C.emD,marginBottom:5}}>Current course watch time: {certificateGate.averagePct}%</div>
              <div style={{fontSize:".8rem",color:C.textL,lineHeight:1.65}}>
                Keep watching lessons on the website until the learner reaches the certificate threshold. Manual checkboxes can mark lessons complete, but they do not count as watch time.
              </div>
            </div>
            <div className="action-row" style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <Btn v="primary" onClick={()=>setGateDismissed(true)}>Continue Watching</Btn>
              <Btn v="outline" onClick={() => { setGateDismissed(true); setPage("dashboard"); }}>Back to Dashboard</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── STUDENT DASHBOARD ────────────────────────────────────────────────────────
const DashboardPage = ({ setPage, setLesson, currentUser, onSignOut, onUserUpdated }) => {
  const courseCatalog = getCourseCatalog({ includeHidden:true });
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
  const [supportTickets, setSupportTickets] = useState([]);
  const [supportForm, setSupportForm] = useState({
    category: "Course Help",
    courseId: "",
    subject: "",
    message: "",
    screenshot: null,
  });
  const [supportMsg, setSupportMsg] = useState({ type:"", text:"" });
  const [supportAttachmentBusy, setSupportAttachmentBusy] = useState(false);

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
      const catalog = getCourseCatalog({ includeHidden:true });
      setCourses(catalog.filter(c => DB.enrolled().includes(c.id)).map(c => resolveCourse(c)));
      setAllProg(DB.allProgress());
      setNotes(DB.allNotes());
      setStreak(DB.streak());
      setCompletions(DB.allCompletions());
      setSupportTickets(SupportDB.forUser(currentUser.id));
    };
    sync();
    window.addEventListener("nur:data", sync);
    return () => window.removeEventListener("nur:data", sync);
  }, [currentUser?.id, sec]);

  if (!currentUser) return null;

  const totalDone  = courses.reduce((sum, enrolledCourse) => sum + courseProgressStats(enrolledCourse).completed, 0);
  const notesCount = Object.values(notes).filter(n=>n.trim()).length;
  const initials   = getInitials(currentUser.name);
  const firstName  = currentUser.name.split(" ")[0] || "Student";
  const completedCourseEntries = courses.flatMap(c => getCourseCertificateEntries(c));
  const activeSupportCount = supportTickets.filter(ticket => ticket.status !== "resolved").length;
  const nextCourse = courses.find(item => {
    const progress = courseProgressStats(item);
    return progress.total > 0 && progress.pct < 100;
  }) || courses[0] || null;
  const selectedSupportCourse = courses.find(item => String(item.id) === String(supportForm.courseId));

  const sideItems = [
    {icon:"📊",l:"Overview",k:"overview"},
    {icon:"📚",l:"My Courses",k:"courses"},
    {icon:"🏆",l:"Certificates",k:"certs"},
    {icon:"🛟",l:"Support",k:"support"},
    {icon:"👤",l:"Profile",k:"profile"},
  ];

  const openLesson = (c) => {
    const nextLessonState = createLessonState(c, 0, 0);
    if (!nextLessonState) return;
    setLesson(nextLessonState);
    setPage("lesson");
  };
  const openSpecificLesson = (course, mod, lesson) => {
    const mi = course.modules.indexOf(mod);
    const li = mod.lessons.indexOf(lesson);
    const nextLessonState = createLessonState(course, mi, li);
    if (!nextLessonState) return;
    setLesson(nextLessonState);
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
      setProfileMsg("Profile updated successfully.");
      window.setTimeout(() => setProfileMsg(""), 2200);
    } catch (error) {
      setProfileMsg(error.message);
    }
  };
  const handleSupportScreenshotChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setSupportAttachmentBusy(true);
    try {
      const screenshot = await prepareSupportScreenshot(file);
      setSupportForm(form => ({ ...form, screenshot }));
      setSupportMsg({ type:"", text:"" });
    } catch (error) {
      setSupportMsg({ type:"error", text:error.message });
    } finally {
      setSupportAttachmentBusy(false);
    }
  };
  const handleRemoveSupportScreenshot = () => {
    setSupportForm(form => ({ ...form, screenshot:null }));
  };
  const handleSupportSubmit = async (event) => {
    event.preventDefault();
    if (supportAttachmentBusy) {
      setSupportMsg({ type:"error", text:"Please wait while the screenshot finishes preparing." });
      return;
    }
    try {
      SupportDB.submit({
        user: currentUser,
        category: supportForm.category,
        courseId: supportForm.courseId,
        courseTitle: selectedSupportCourse?.title || "",
        subject: supportForm.subject,
        message: supportForm.message,
        screenshot: supportForm.screenshot,
      });
      setSupportForm({
        category: supportForm.category,
        courseId: "",
        subject: "",
        message: "",
        screenshot: null,
      });
      setSupportMsg({ type:"success", text:"Your support request has been saved in the academy workspace." });
      window.setTimeout(() => setSupportMsg({ type:"", text:"" }), 2400);
    } catch (error) {
      setSupportMsg({ type:"error", text:error.message });
    }
  };

  return (
    <div className="page dashboard-shell" style={{paddingTop:64,display:"flex",minHeight:"100vh",background:C.cream}}>
      {/* Sidebar */}
      <div className="dashboard-sidebar" style={{width:218,background:"white",borderRight:`1px solid ${C.border}`,padding:"18px 12px",position:"fixed",top:64,bottom:0,overflowY:"auto"}}>
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
        <div style={{marginTop:12,padding:"12px 10px",borderRadius:14,background:C.cream,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:".68rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:8}}>Learning Hub</div>
          <Btn v="gold" style={{width:"100%",justifyContent:"center"}} onClick={()=>setPage("courses")}>Browse All Courses</Btn>
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,marginTop:13,paddingTop:9}}>
          <div className="sL" style={{color:C.red}} onClick={onSignOut}><span>🚪</span>Sign Out</div>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content" style={{flex:1,marginLeft:218,padding:"26px 30px"}}>

        {/* ── Overview ── */}
        {sec==="overview"&&(
          <div className="page">
            <div style={{marginBottom:20}}>
              <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD}}>السلام عليكم، {firstName}! 👋</h1>
              <p style={{color:C.textL,fontSize:".83rem",marginTop:3}}>Welcome back to your Nur Academy learning space. Continue lessons, review certificates, and keep your study rhythm strong.</p>
            </div>
            {/* Stats */}
            <div className="grid-4" style={{gridTemplateColumns:"repeat(4,1fr)",gap:13,marginBottom:15}}>
              {[{icon:"📚",l:"Enrolled",v:courses.length,col:C.em},{icon:"✅",l:"Lessons Done",v:totalDone,col:C.green},{icon:"🔥",l:"Study Streak",v:streak.count||0,col:C.gold},{icon:"🏆",l:"Certificates",v:completedCourseEntries.length,col:"#7C3AED"}].map((s,i)=>(
                <div key={i} style={{background:"white",borderRadius:12,padding:16,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(11,82,64,.05)"}}>
                  <div style={{fontSize:"1.3rem",marginBottom:5}}>{s.icon}</div>
                  <div style={{fontSize:"1.35rem",fontWeight:800,color:s.col}}>{s.v}</div>
                  <div style={{fontSize:".7rem",color:C.textL,marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{background:"white",borderRadius:18,padding:"18px 20px",border:`1px solid ${C.border}`,marginBottom:18,boxShadow:C.sh}}>
              <div className="course-detail-heading" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,marginBottom:15}}>
                <div>
                  <div style={{fontSize:".72rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:6}}>Today in the Academy</div>
                  <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.32rem",color:C.emD,marginBottom:5}}>
                    {nextCourse ? `Continue ${nextCourse.title}` : "Begin your first course"}
                  </div>
                  <div style={{fontSize:".8rem",lineHeight:1.65,color:C.textM,maxWidth:620}}>
                    {nextCourse
                      ? "Your dashboard keeps the next lesson, certificates, and support requests in one place so you can study without losing momentum."
                      : "Browse the library, enroll in a course, and your learning path will appear here automatically."}
                  </div>
                </div>
                <div className="action-row" style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  <Btn v="primary" onClick={()=>nextCourse ? openLesson(nextCourse) : setPage("courses")}>{nextCourse ? "Resume Learning" : "Browse Courses"}</Btn>
                  <Btn v="outline" onClick={()=>setSec("certs")}>View Certificates</Btn>
                  <Btn v="gold" onClick={()=>setSec("support")}>Get Support</Btn>
                </div>
              </div>
              <div className="grid-3" style={{gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:12}}>
                {[
                  { title:"Study Notes", value:notesCount, detail:notesCount ? "Saved across your lessons" : "Start taking notes inside lessons", color:C.em },
                  { title:"Active Support", value:activeSupportCount, detail:activeSupportCount ? "Requests awaiting follow-up" : "No open support requests", color:C.gold },
                  { title:"Course Status", value:nextCourse ? `${courseProgressStats(nextCourse).pct}%` : "Ready", detail:nextCourse ? `${nextCourse.modules.length} modules in progress` : "Enroll to unlock your dashboard flow", color:"#7C3AED" },
                ].map(card => (
                  <div key={card.title} style={{padding:"13px 14px",borderRadius:14,background:C.cream,border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:".68rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:6}}>{card.title}</div>
                    <div style={{fontSize:"1.4rem",fontWeight:800,color:card.color,marginBottom:4}}>{card.value}</div>
                    <div style={{fontSize:".76rem",lineHeight:1.6,color:C.textM}}>{card.detail}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="split-grid" style={{gridTemplateColumns:"minmax(0,1.05fr) minmax(0,.95fr)",gap:16,marginBottom:22}}>
              <div><StreakWidget big/></div>
              <div style={{background:"white",borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:C.sh}}>
                <div style={{fontSize:".72rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:6}}>Student Workspace</div>
                <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.22rem",color:C.emD,marginBottom:10}}>A cleaner way to keep learning</div>
                <div style={{display:"grid",gap:12}}>
                  {[
                    { icon:"📖", title:"Continue where you stopped", detail:"Your enrolled courses remember progress and open back into the player quickly." },
                    { icon:"🏆", title:"Certificates stay organized", detail:"Eligible course completions remain available from one certificates section." },
                    { icon:"🛟", title:"Support stays attached to your account", detail:"Send course or certificate issues from inside the dashboard whenever you need help." },
                  ].map(item => (
                    <div key={item.title} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                      <div style={{width:38,height:38,borderRadius:12,background:`${C.em}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.05rem",flexShrink:0}}>{item.icon}</div>
                      <div>
                        <div style={{fontWeight:800,fontSize:".82rem",color:C.emD,marginBottom:3}}>{item.title}</div>
                        <div style={{fontSize:".76rem",lineHeight:1.6,color:C.textM}}>{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.18rem",color:C.emD,marginBottom:13}}>Continue Learning</h2>
            {courses.length===0 ? (
              <div style={{background:"white",borderRadius:12,padding:26,textAlign:"center",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:"2rem",marginBottom:9}}>📚</div>
                <Btn v="gold" onClick={()=>setPage("courses")} icon="🎓">Browse Courses</Btn>
              </div>
            ) : (
                <div className="grid-2 dashboard-highlight-grid" style={{gridTemplateColumns:"1fr 1fr",gap:13}}>
                {courses.slice(0,4).map(c=>{
                  const stats = courseProgressStats(c);
                  const tot = stats.total;
                  const dn  = stats.completed;
                  const pct = stats.pct;
                  const selectionLabel = getCourseSelectionLabel(c);
                  return (
                    <div key={c.id} style={{background:"white",borderRadius:12,padding:16,border:`1px solid ${C.border}`,cursor:"pointer",transition:"box-shadow .2s"}}
                      onClick={()=>openLesson(c)}
                      onMouseEnter={e=>e.currentTarget.style.boxShadow=C.sh}
                      onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:11}}>
                        <div style={{width:40,height:40,borderRadius:8,background:`${c.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.15rem"}}>{c.thumb}</div>
                        <div>
                          <div style={{fontWeight:700,fontSize:".84rem"}}>{c.title}</div>
                          <div style={{fontSize:".68rem",color:C.textL}}>{c.modules.length} modules · {tot} lessons{selectionLabel ? ` · ${selectionLabel}` : ""}</div>
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
                  const stats = courseProgressStats(c);
                  const tot = stats.total;
                  const dn  = stats.completed;
                  const pct = stats.pct;
                  const selectionLabel = getCourseSelectionLabel(c);
                  const progressIds = getCourseProgressIds(c);
                  return (
                    <div key={c.id} style={{background:"white",borderRadius:12,overflow:"hidden",border:`1px solid ${C.border}`}}>
                      <div style={{height:68,background:`linear-gradient(135deg,${c.color},${c.color}80)`,display:"flex",alignItems:"center",padding:"0 18px",gap:13,position:"relative"}}>
                        <Iso op={0.1} col="white"/>
                        <span style={{fontSize:"1.6rem",position:"relative",zIndex:1}}>{c.thumb}</span>
                        <div style={{position:"relative",zIndex:1,flex:1}}>
                          <div style={{color:"white",fontWeight:700,fontSize:".9rem"}}>{c.title}</div>
                          <div style={{color:"rgba(255,255,255,.5)",fontSize:".7rem"}}>{c.instructor} · {c.modules.length} modules{selectionLabel ? ` · ${selectionLabel}` : ""}</div>
                        </div>
                        {pct===100&&<div style={{position:"relative",zIndex:1}}><Badge col="white">✅ Complete</Badge></div>}
                      </div>
                      <div style={{padding:"14px 17px"}}>
                        <PBar value={pct} label={`Progress: ${dn}/${tot} lessons · ${pct}%`}/>
                        {/* Module breakdown */}
                        <div style={{marginTop:10,display:"flex",gap:5,flexWrap:"wrap"}}>
                          {c.modules.map(mod=>{
                            const mDn = mod.lessons.filter(l=>progressIds.includes(l.id)).length;
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
                            {pct===100?"🔁 Review":"▶ Resume"} →
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
                {courseCatalog.flatMap(course=>course.modules.flatMap(mod=>mod.lessons.filter(ls=>notes[ls.id]?.trim()).map(ls=>(
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
            {completedCourseEntries.length===0 ? (
              <div style={{background:"white",borderRadius:12,padding:32,textAlign:"center",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:"2.3rem",marginBottom:11}}>🏆</div>
                <div style={{fontWeight:600,marginBottom:5}}>No certificates yet</div>
                <div style={{fontSize:".8rem",color:C.textL}}>
                  {currentUser?.role === "admin"
                    ? "Finish the lessons in a course to unlock a printable certificate on this admin preview account."
                    : `Finish the lessons and reach at least ${CERTIFICATE_WATCH_THRESHOLD}% watch time in a course to unlock a printable certificate.`}
                </div>
              </div>
            ) : (
              <>
                {completedCourseEntries.map(entry=>{
                  const certificateCourse = entry.certificateCourse;
                  const displayCourse = entry.displayCourse;
                  const completion = entry.completion || {
                    completedAt: dayKey(),
                    certificateId: `NUR-${String(certificateCourse?.id || displayCourse.id).padStart(3, "0")}-${dayKey().replaceAll("-", "")}-${currentUser.id.slice(-4).toUpperCase()}`,
                  };
                  const selectionLabel = entry.selectionLabel;
                  return (
                    <div key={entry.key} style={{background:"white",borderRadius:14,border:`2px solid ${C.gold}32`,overflow:"hidden",marginBottom:18,boxShadow:C.shG}}>
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
                        <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.08rem",color:C.gold,fontWeight:700}}>{certificateCourse?.title || displayCourse.title}</div>
                        {selectionLabel&&<div style={{fontSize:".74rem",color:C.textL,marginTop:4}}>{selectionLabel}</div>}
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:".7rem",color:C.textL}}>
                          <span>📅 {formatDay(completion.completedAt)}</span>
                          <span>🔐 {completion.certificateId}</span>
                        </div>
                      </div>
                      <div className="dashboard-cert-footer" style={{padding:"11px 34px",background:"white",display:"flex",gap:8,justifyContent:"space-between",alignItems:"center",borderTop:`1px solid ${C.border}`}}>
                        <div style={{fontSize:".72rem",color:copyMsg?C.green:C.textL}}>{copyMsg || "Save or print your certificate directly from this learner workspace."}</div>
                        <div className="action-row" style={{display:"flex",gap:8}}>
                          <Btn size="sm" v="outline" onClick={()=>handleCopyId(completion.certificateId)}>🔑 Copy ID</Btn>
                          <Btn size="sm" v="gold" onClick={()=>printCertificate(certificateCourse || c, currentUser, completion)}>🖨 Print / Save PDF</Btn>
                        </div>
                    </div>
                  </div>
                )})}
                <div style={{marginTop:8}}>
                  <HadiyaSupportCard style={{maxWidth:"none",boxShadow:"none"}} />
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Support ── */}
        {sec==="support"&&(
          <div className="page">
            <div className="admin-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div>
                <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD,marginBottom:5}}>Support & Requests</h1>
                <div style={{fontSize:".82rem",color:C.textL,lineHeight:1.65,maxWidth:680}}>
                  Need help with a lesson, certificate, login, or course request? Send it from here and keep all academy follow-up attached to your student account.
                </div>
              </div>
              <Btn v="outline" onClick={()=>setPage("contact")}>Open Public Contact Page</Btn>
            </div>
            <div style={{background:"white",borderRadius:14,padding:"12px 14px",border:`1px solid ${C.border}`,boxShadow:C.sh,marginBottom:16,fontSize:".78rem",lineHeight:1.7,color:C.textM}}>
              Support requests are currently stored in this browser profile only. They will appear for the admin if both student and admin use the same browser data on this device; cross-device and cross-browser syncing needs the backend.
            </div>
            <div className="grid-2" style={{gridTemplateColumns:"minmax(320px,420px) 1fr",gap:16}}>
              <form onSubmit={handleSupportSubmit} style={{background:"white",borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:C.sh}}>
                <div style={{fontSize:".72rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:6}}>New Request</div>
                <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.28rem",color:C.emD,marginBottom:14}}>Send a message to the academy</div>
                <div style={{marginBottom:12}}>
                  <label style={{display:"block",fontSize:".69rem",fontWeight:700,color:C.textL,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>Category</label>
                  <select value={supportForm.category} onChange={event => setSupportForm(form => ({ ...form, category:event.target.value }))} style={{width:"100%",padding:"11px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:C.cream,fontSize:".84rem"}}>
                    {SUPPORT_CATEGORY_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:12}}>
                  <label style={{display:"block",fontSize:".69rem",fontWeight:700,color:C.textL,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>Course</label>
                  <select value={supportForm.courseId} onChange={event => setSupportForm(form => ({ ...form, courseId:event.target.value }))} style={{width:"100%",padding:"11px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:C.cream,fontSize:".84rem"}}>
                    <option value="">General academy request</option>
                    {courses.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:12}}>
                  <label style={{display:"block",fontSize:".69rem",fontWeight:700,color:C.textL,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>Subject</label>
                  <input value={supportForm.subject} onChange={event => setSupportForm(form => ({ ...form, subject:event.target.value }))} placeholder="Short summary of your issue" style={{width:"100%",padding:"11px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:C.cream,fontSize:".84rem"}} />
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:".69rem",fontWeight:700,color:C.textL,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>Message</label>
                  <textarea rows={7} value={supportForm.message} onChange={event => setSupportForm(form => ({ ...form, message:event.target.value }))} placeholder="Explain what happened and what kind of help you need." style={{width:"100%",padding:"11px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:C.cream,fontSize:".84rem",resize:"vertical",lineHeight:1.65}} />
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:".69rem",fontWeight:700,color:C.textL,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>Screenshot (Optional)</label>
                  <div style={{padding:"12px 13px",borderRadius:12,border:`1px solid ${C.border}`,background:C.cream}}>
                    <input type="file" accept={SUPPORT_SCREENSHOT_INPUT_ACCEPT} onChange={handleSupportScreenshotChange} style={{width:"100%",fontSize:".8rem"}} />
                    <div style={{marginTop:7,fontSize:".74rem",lineHeight:1.65,color:C.textL}}>
                      Upload a PNG, JPG, or WebP screenshot to help explain the issue. The image is compressed before being saved on this browser.
                    </div>
                    {supportAttachmentBusy && <div style={{marginTop:8,fontSize:".76rem",fontWeight:700,color:C.em}}>Preparing screenshot...</div>}
                    {supportForm.screenshot && (
                      <div style={{marginTop:12,padding:"10px 11px",borderRadius:12,background:"white",border:`1px solid ${C.border}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                          <div style={{fontSize:".74rem",fontWeight:700,color:C.emD}}>Attached: {supportForm.screenshot.name}</div>
                          <Btn size="sm" v="ghost" onClick={handleRemoveSupportScreenshot}>Remove</Btn>
                        </div>
                        <img src={supportForm.screenshot.dataUrl} alt="Support screenshot preview" style={{width:"100%",maxHeight:220,objectFit:"cover",borderRadius:10,border:`1px solid ${C.border}`,display:"block"}} />
                        <div style={{marginTop:7,fontSize:".72rem",color:C.textL}}>
                          {formatBytes(supportForm.screenshot.size)}
                          {supportForm.screenshot.width && supportForm.screenshot.height ? ` · ${supportForm.screenshot.width} × ${supportForm.screenshot.height}` : ""}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {supportMsg.text&&<div style={{marginBottom:12,fontSize:".78rem",color:supportMsg.type==="error"?C.red:C.green}}>{supportMsg.text}</div>}
                <Btn type="submit" v="primary" disabled={supportAttachmentBusy} style={{width:"100%",justifyContent:"center"}}>{supportAttachmentBusy ? "Preparing Screenshot..." : "Submit Support Request"}</Btn>
              </form>
              <div style={{display:"grid",gap:14}}>
                <div style={{background:"white",borderRadius:16,padding:20,border:`1px solid ${C.border}`,boxShadow:C.sh}}>
                  <div style={{fontSize:".72rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:6}}>Request Summary</div>
                  <div className="grid-3" style={{gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:10}}>
                    {[
                      { label:"Total", value:supportTickets.length, color:C.em },
                      { label:"Open", value:supportTickets.filter(ticket => ticket.status === "open").length, color:C.gold },
                      { label:"Resolved", value:supportTickets.filter(ticket => ticket.status === "resolved").length, color:C.green },
                    ].map(item => (
                      <div key={item.label} style={{padding:"11px 12px",borderRadius:12,background:C.cream,border:`1px solid ${C.border}`}}>
                        <div style={{fontSize:".68rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:5}}>{item.label}</div>
                        <div style={{fontSize:"1.2rem",fontWeight:800,color:item.color}}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{display:"grid",gap:12}}>
                  {supportTickets.length===0 ? (
                    <div style={{background:"white",borderRadius:16,padding:28,textAlign:"center",border:`1px solid ${C.border}`}}>
                      <div style={{fontSize:"2rem",marginBottom:10}}>🛟</div>
                      <div style={{fontWeight:700,color:C.emD,marginBottom:5}}>No support requests yet</div>
                      <div style={{fontSize:".8rem",color:C.textL,lineHeight:1.65}}>When you send a request, it will appear here with its current status and any admin response.</div>
                    </div>
                  ) : supportTickets.map(ticket => {
                    const statusMeta = SUPPORT_STATUS_META[ticket.status] || SUPPORT_STATUS_META.open;
                    return (
                      <div key={ticket.id} style={{background:"white",borderRadius:16,padding:18,border:`1px solid ${C.border}`,boxShadow:"0 6px 24px rgba(11,82,64,.06)"}}>
                        <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"flex-start",marginBottom:10}}>
                          <div>
                            <div style={{fontWeight:800,color:C.emD,marginBottom:3}}>{ticket.subject}</div>
                            <div style={{fontSize:".74rem",color:C.textL}}>
                              {ticket.courseTitle ? `${ticket.courseTitle} · ` : ""}{ticket.category} · {formatDateTime(ticket.createdAt)}
                            </div>
                          </div>
                          <Badge col={statusMeta.color}>{statusMeta.label}</Badge>
                        </div>
                        <div style={{fontSize:".82rem",lineHeight:1.7,color:C.textM,whiteSpace:"pre-wrap",marginBottom:12}}>{ticket.message}</div>
                        {ticket.screenshot && (
                          <div style={{marginBottom:12}}>
                            <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                              <div style={{fontSize:".68rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL}}>Attached Screenshot</div>
                              <a href={ticket.screenshot.dataUrl} target="_blank" rel="noreferrer" style={{fontSize:".74rem",fontWeight:700,color:C.em,textDecoration:"none"}}>Open Full Image</a>
                            </div>
                            <img src={ticket.screenshot.dataUrl} alt={`Support screenshot for ${ticket.subject}`} style={{width:"100%",maxHeight:240,objectFit:"cover",borderRadius:12,border:`1px solid ${C.border}`,display:"block",marginBottom:6}} />
                            <div style={{fontSize:".72rem",color:C.textL}}>{ticket.screenshot.name} · {formatBytes(ticket.screenshot.size)}</div>
                          </div>
                        )}
                        <div style={{padding:"10px 12px",borderRadius:12,background:C.cream,border:`1px solid ${C.border}`}}>
                          <div style={{fontSize:".68rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:5}}>Admin Follow-Up</div>
                          <div style={{fontSize:".78rem",lineHeight:1.65,color:C.textM}}>
                            {ticket.adminNote || "No internal follow-up has been added yet. The academy team will update the status once this request is reviewed."}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Profile ── */}
        {sec==="profile"&&(
          <div className="page" style={{maxWidth:520}}>
            <h1 style={{fontFamily:"'Amiri',serif",fontSize:"1.6rem",color:C.emD,marginBottom:18}}>Student Profile</h1>
            <div style={{background:"white",borderRadius:14,padding:26,border:`1px solid ${C.border}`}}>
              <div className="profile-head" style={{display:"flex",gap:15,alignItems:"center",marginBottom:22}}>
                <div style={{width:66,height:66,borderRadius:"50%",background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"1.4rem",fontWeight:700}}>{initials}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:".98rem"}}>{currentUser.name}</div>
                  <div style={{color:C.textL,fontSize:".78rem"}}>Student since {formatDay(currentUser.joinedAt || dayKey(), { year:"numeric", month:"short" })}</div>
                  <div style={{marginTop:6,fontSize:".72rem",color:C.textL}}>Keep your account details up to date so certificates and support replies stay accurate.</div>
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

// ─── Google SVG ────────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg style={{width:18,height:18,flexShrink:0}} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const signInWithGoogle = async () => {
  if (!supabase) {
    alert("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.");
    return;
  }
  const redirectTo = window.location.origin + "/";
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
  if (error) alert(error.message);
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const LoginPage = ({ setPage, onLogin }) => {
  const rememberedEmail = ls.get(K.LOGIN_EMAIL, "") || "";
  const [form, setForm] = useState({ email:rememberedEmail, password:"" });
  const [accessMode, setAccessMode] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(Boolean(rememberedEmail));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetForm, setResetForm] = useState({ email:"", password:"", confirm:"" });
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  const go = async () => {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const user = await Auth.login(form);
      if (accessMode === "admin" && user.role !== "admin") {
        Auth.signOut();
        throw new Error("This account does not have admin access. Use student sign in or contact the academy.");
      }
      if (rememberEmail) ls.set(K.LOGIN_EMAIL, user.email);
      else ls.remove(K.LOGIN_EMAIL);
      await wait(250);
      onLogin(user);
      setPage(user.role==="admin" ? "admin" : "dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!loading && form.email && form.password) go();
  };
  const toggleForgot = () => {
    setForgotOpen(open => !open);
    setResetError("");
    setNotice("");
    setResetForm(prev => ({
      email: prev.email || form.email,
      password: "",
      confirm: "",
    }));
  };
  const handleResetPassword = async () => {
    setResetError("");
    setNotice("");
    if (!resetForm.email.trim()) return setResetError("Please enter the account email.");
    if (resetForm.password.trim().length < 8) return setResetError("New password must be at least 8 characters.");
    if (resetForm.password !== resetForm.confirm) return setResetError("Password confirmation does not match.");

    setResetLoading(true);
    try {
      const updatedUser = await Auth.resetPassword({
        email: resetForm.email,
        password: resetForm.password,
      });
      setForm({ email: updatedUser.email, password: "" });
      setResetForm({ email: updatedUser.email, password: "", confirm: "" });
      setForgotOpen(false);
      setNotice("Password updated. Sign in with your new password.");
    } catch (err) {
      setResetError(err.message);
    } finally {
      setResetLoading(false);
    }
  };
  const authFeatures = accessMode === "admin"
    ? [
      { title:"Operational control", detail:"Review learners, manage course visibility, and inspect certificates." },
      { title:"Protected access", detail:"Admin accounts are assigned by the academy and are not created from public signup." },
      { title:"LMS workspace", detail:"Move from overview to users, courses, certificates, and support in one flow." },
    ]
    : [
      { title:"Structured learning", detail:"Enroll in courses, resume lessons, and keep your progress together." },
      { title:"Certificates", detail:"Eligible completions unlock downloadable certificates from your dashboard." },
      { title:"Direct support", detail:"Send course or certificate requests from inside the academy workspace." },
    ];

  return (
    <div className="page" style={{paddingTop:64,minHeight:"100vh",background:`linear-gradient(160deg,${C.emD},${C.em})`,padding:"92px 20px 40px",position:"relative",overflow:"hidden"}}>
      <Iso op={0.06} col={C.gold}/>
      <div className="split-grid" style={{maxWidth:1120,margin:"0 auto",gridTemplateColumns:"1.05fr minmax(360px,460px)",gap:28,alignItems:"center",position:"relative",zIndex:1}}>
        <div style={{color:"white"}}>
          <Badge col={C.gold}>{accessMode === "admin" ? "Nur Academy Admin Access" : "Nur Academy Student Portal"}</Badge>
          <h1 style={{fontFamily:"'Amiri',serif",fontSize:"clamp(2.2rem,5vw,3.5rem)",lineHeight:1.08,margin:"16px 0 8px"}}>
            {accessMode === "admin" ? "Enter the academy control room" : "Return to your learning journey"}
          </h1>
          <p style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:"1rem",marginBottom:16}}>
            {accessMode === "admin" ? "لوحة إدارة نور أكاديمي" : "بوابة الطالب في نور أكاديمي"}
          </p>
          <p style={{maxWidth:640,color:"rgba(255,255,255,.78)",lineHeight:1.8,fontSize:".95rem",marginBottom:18}}>
            {accessMode === "admin"
              ? "Sign in with your assigned academy admin account to manage students, courses, certificates, and support in one clean workspace."
              : "Sign in to continue courses, track progress, open certificates, and stay connected to your Nur Academy learning path."}
          </p>
          <div className="grid-3" style={{gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:12}}>
            {authFeatures.map(item => (
              <div key={item.title} style={{padding:"16px 16px 14px",borderRadius:18,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",backdropFilter:"blur(10px)"}}>
                <div style={{fontSize:".74rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.gold,marginBottom:7}}>{item.title}</div>
                <div style={{fontSize:".82rem",lineHeight:1.7,color:"rgba(255,255,255,.74)"}}>{item.detail}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:18,padding:"15px 16px",borderRadius:18,background:"rgba(201,168,76,.1)",border:"1px solid rgba(201,168,76,.22)",maxWidth:520}}>
            <div style={{fontSize:".7rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.gold,marginBottom:6}}>Role Structure</div>
            <div style={{fontSize:".82rem",lineHeight:1.7,color:"rgba(255,255,255,.74)"}}>
              Nur Academy currently uses only two frontend roles: <strong>Student</strong> and <strong>Admin</strong>. Public signup always creates student accounts. Admin access is managed separately.
            </div>
          </div>
        </div>
        <div className="auth-card" style={{background:"white",borderRadius:26,padding:34,width:"100%",position:"relative",zIndex:1,boxShadow:"0 26px 66px rgba(0,0,0,.24)"}}>
          <div style={{display:"flex",gap:8,marginBottom:18}}>
            {[
              ["student","Student Login"],
              ["admin","Admin Login"],
            ].map(([value, label]) => {
              const active = accessMode === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAccessMode(value)}
                  style={{
                    flex:1,
                    padding:"10px 12px",
                    borderRadius:12,
                    border:`1px solid ${active ? C.em : C.border}`,
                    background:active ? `${C.em}0D` : C.cream,
                    color:active ? C.emD : C.textM,
                    fontWeight:800,
                    fontSize:".8rem",
                    cursor:"pointer",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div style={{marginBottom:18}}>
            <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.5rem",color:C.emD,marginBottom:6}}>
              {accessMode === "admin" ? "Sign in to the admin workspace" : "Sign in to continue learning"}
            </h2>
            <p style={{fontSize:".82rem",lineHeight:1.65,color:C.textL}}>
              {accessMode === "admin"
                ? "Only assigned admin accounts can enter this area."
                : "Student accounts can access dashboards, course progress, certificates, and support."}
            </p>
          </div>
          <Divider/>
          <form onSubmit={handleSubmit} autoComplete="on" style={{marginTop:18}}>
            <div style={{marginBottom:13}}>
              <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Email</label>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}>📧</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  autoCapitalize="none"
                  value={form.email}
                  onChange={e=>setForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                  style={{width:"100%",padding:"10px 12px 10px 35px",borderRadius:10,border:`1px solid ${C.border}`,fontSize:".85rem",background:C.cream}}
                />
              </div>
            </div>
            <div style={{marginBottom:13}}>
              <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Password</label>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}>🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={e=>setForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  style={{width:"100%",padding:"10px 82px 10px 35px",borderRadius:10,border:`1px solid ${C.border}`,fontSize:".85rem",background:C.cream}}
                />
                <button
                  type="button"
                  onClick={()=>setShowPassword(open => !open)}
                  style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",border:"none",background:"none",color:C.em,fontWeight:700,fontSize:".72rem",cursor:"pointer"}}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,marginTop:-2,marginBottom:12,flexWrap:"wrap"}}>
              <label style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:".75rem",color:C.textM,cursor:"pointer"}}>
                <input
                  type="checkbox"
                  checked={rememberEmail}
                  onChange={e => {
                    const nextValue = e.target.checked;
                    setRememberEmail(nextValue);
                    if (!nextValue) ls.remove(K.LOGIN_EMAIL);
                  }}
                />
                Remember email
              </label>
              <button
                type="button"
                onClick={toggleForgot}
                style={{border:"none",background:"none",padding:0,color:C.em,fontSize:".75rem",fontWeight:700,cursor:"pointer"}}
              >
                {forgotOpen ? "Hide reset form" : "Forgot password?"}
              </button>
            </div>
            {forgotOpen&&(
              <div style={{marginBottom:13,padding:"14px",borderRadius:14,background:`${C.em}08`,border:`1px solid ${C.em}18`}}>
                <div style={{fontSize:".78rem",fontWeight:700,color:C.emD,marginBottom:4}}>Reset Password</div>
                <div style={{fontSize:".72rem",color:C.textL,lineHeight:1.6,marginBottom:10}}>
                  Enter the account email and choose a new password for this academy frontend preview.
                </div>
                <div style={{marginBottom:9}}>
                  <label style={{display:"block",fontSize:".68rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Email</label>
                  <input
                    type="email"
                    name="reset-email"
                    autoComplete="email"
                    autoCapitalize="none"
                    value={resetForm.email}
                    onChange={e=>setResetForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    style={{width:"100%",padding:"9px 11px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".82rem",background:"white"}}
                  />
                </div>
                <div style={{marginBottom:9}}>
                  <label style={{display:"block",fontSize:".68rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>New Password</label>
                  <input
                    type="password"
                    name="reset-password"
                    autoComplete="new-password"
                    value={resetForm.password}
                    onChange={e=>setResetForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Minimum 8 characters"
                    style={{width:"100%",padding:"9px 11px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".82rem",background:"white"}}
                  />
                </div>
                <div style={{marginBottom:9}}>
                  <label style={{display:"block",fontSize:".68rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Confirm Password</label>
                  <input
                    type="password"
                    name="reset-confirm-password"
                    autoComplete="new-password"
                    value={resetForm.confirm}
                    onChange={e=>setResetForm(prev => ({ ...prev, confirm: e.target.value }))}
                    placeholder="Re-enter new password"
                    style={{width:"100%",padding:"9px 11px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".82rem",background:"white"}}
                  />
                </div>
                {resetError&&<div style={{marginBottom:10,fontSize:".76rem",color:C.red}}>{resetError}</div>}
                <Btn
                  v="outline"
                  onClick={handleResetPassword}
                  disabled={resetLoading}
                  style={{width:"100%",justifyContent:"center"}}
                >
                  {resetLoading ? "Updating password..." : "Reset Password"}
                </Btn>
              </div>
            )}
            {notice&&<div style={{marginBottom:12,fontSize:".78rem",color:C.green}}>{notice}</div>}
            {error&&<div style={{marginBottom:12,fontSize:".78rem",color:C.red}}>{error}</div>}
            <button type="submit" className="btn" disabled={loading || !form.email || !form.password}
              style={{width:"100%",justifyContent:"center",padding:12,borderRadius:12,background:loading?C.textL:`linear-gradient(135deg,${C.em},${C.gold})`,color:"white",fontSize:".93rem",fontWeight:700,boxShadow:"0 4px 16px rgba(11,82,64,.24)"}}>
              {loading?<><div style={{width:15,height:15,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>Signing in…</>:accessMode === "admin" ? "Enter Admin Workspace" : "Enter Student Dashboard"}
            </button>
            <div style={{position:"relative",marginTop:16}}>
              <div style={{position:"absolute",inset:"0",display:"flex",alignItems:"center"}}>
                <div style={{width:"100%",borderTop:`1px solid ${C.border}`}}/>
              </div>
              <div style={{position:"relative",display:"flex",justifyContent:"center"}}>
                <span style={{background:"white",padding:"0 10px",fontSize:".7rem",textTransform:"uppercase",color:C.textL,letterSpacing:".06em",fontWeight:700}}>Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={signInWithGoogle}
              style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:"11px 16px",marginTop:14,borderRadius:12,border:`1px solid ${C.border}`,background:C.cream,color:C.textM,fontSize:".85rem",fontWeight:600,cursor:"pointer",transition:"all .2s"}}
            >
              <GoogleIcon/>
              <span>Sign in with Google</span>
            </button>

            <p style={{textAlign:"center",marginTop:16,fontSize:".78rem",color:C.textL}}>
              Need student access? <span onClick={()=>setPage("register")} style={{color:C.em,fontWeight:600,cursor:"pointer"}}>Create a student account</span>
            </p>
            <div style={{marginTop:12,padding:"12px 14px",background:C.cream,borderRadius:12,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:".69rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:5}}>Access Rules</div>
              <div style={{fontSize:".76rem",lineHeight:1.65,color:C.textM}}>
                Student signup creates student accounts only. Admin accounts are assigned by Nur Academy and are signed in from this same page using admin mode.
              </div>
            </div>
          </form>
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
    confirmPassword: "",
    agreed: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const go = async () => {
    setError("");
    if (!form.firstName.trim() || !form.lastName.trim()) return setError("Please enter your full name.");
    if (!form.email.trim()) return setError("Please enter your email.");
    if (form.password.trim().length < 8) return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirmPassword) return setError("Password confirmation does not match.");
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
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!loading) go();
  };

  return (
    <div className="page" style={{paddingTop:64,minHeight:"100vh",background:`linear-gradient(160deg,${C.emD},${C.em})`,padding:"92px 20px 40px",position:"relative",overflow:"hidden"}}>
      <Iso op={0.06} col={C.gold}/>
      <div className="split-grid" style={{maxWidth:1080,margin:"0 auto",gridTemplateColumns:"1fr minmax(360px,440px)",gap:28,alignItems:"center",position:"relative",zIndex:1}}>
        <div style={{color:"white"}}>
          <Badge col={C.gold}>Student Signup Only</Badge>
          <h1 style={{fontFamily:"'Amiri',serif",fontSize:"clamp(2.2rem,5vw,3.3rem)",lineHeight:1.08,margin:"16px 0 8px"}}>Create your Nur Academy student account</h1>
          <p style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:"1rem",marginBottom:16}}>إنشاء حساب الطالب في نور أكاديمي</p>
          <p style={{maxWidth:620,color:"rgba(255,255,255,.78)",lineHeight:1.8,fontSize:".95rem",marginBottom:18}}>
            Join the academy as a student to browse courses, enroll in classes, continue lessons, track completion, and unlock certificates when eligible.
          </p>
          <div className="grid-3" style={{gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:12}}>
            {[
              { title:"Student dashboard", detail:"Keep your courses, certificates, and support requests together." },
              { title:"Course progress", detail:"Resume lessons and track what you have already completed." },
              { title:"Admin protected", detail:"Admin accounts are never created from public signup." },
            ].map(item => (
              <div key={item.title} style={{padding:"16px 16px 14px",borderRadius:18,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",backdropFilter:"blur(10px)"}}>
                <div style={{fontSize:".74rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.gold,marginBottom:7}}>{item.title}</div>
                <div style={{fontSize:".82rem",lineHeight:1.7,color:"rgba(255,255,255,.74)"}}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="auth-card" style={{background:"white",borderRadius:26,padding:34,width:"100%",position:"relative",zIndex:1,boxShadow:"0 26px 66px rgba(0,0,0,.24)"}}>
          <div style={{marginBottom:18}}>
            <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.5rem",color:C.emD,marginBottom:6}}>Create student account</h2>
            <p style={{fontSize:".82rem",lineHeight:1.65,color:C.textL}}>
              This signup creates a <strong>student</strong> account only. Admin access is assigned separately by the academy.
            </p>
          </div>
          <Divider/>
          <form onSubmit={handleSubmit} autoComplete="on" style={{marginTop:18}}>
            <div className="auth-name-grid grid-2" style={{gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:11}}>
              {[["First Name","firstName","Ahmad"],["Last Name","lastName","Al-Farsi"]].map(([label,key,placeholder])=>(
                <div key={label}>
                  <label style={{display:"block",fontSize:".68rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>{label}</label>
                  <input
                    name={key}
                    autoComplete={key === "firstName" ? "given-name" : "family-name"}
                    value={form[key]}
                    onChange={e=>setForm(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    style={{width:"100%",padding:"9px 11px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:".83rem",background:C.cream}}/>
                </div>
              ))}
            </div>
            <div style={{marginBottom:11}}>
              <label style={{display:"block",fontSize:".68rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Email</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                autoCapitalize="none"
                value={form.email}
                onChange={e=>setForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="you@example.com"
                style={{width:"100%",padding:"9px 11px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:".83rem",background:C.cream}}/>
            </div>
            <div style={{marginBottom:11}}>
              <label style={{display:"block",fontSize:".68rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Password</label>
              <div style={{position:"relative"}}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  autoCapitalize="none"
                  value={form.password}
                  onChange={e=>setForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Minimum 8 characters"
                  style={{width:"100%",padding:"9px 74px 9px 11px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:".83rem",background:C.cream}}/>
                <button type="button" onClick={()=>setShowPassword(open => !open)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",border:"none",background:"none",color:C.em,fontWeight:700,fontSize:".72rem",cursor:"pointer"}}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div style={{marginBottom:11}}>
              <label style={{display:"block",fontSize:".68rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                autoCapitalize="none"
                value={form.confirmPassword}
                onChange={e=>setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Re-enter your password"
                style={{width:"100%",padding:"9px 11px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:".83rem",background:C.cream}}/>
            </div>
            <label style={{display:"flex",gap:7,alignItems:"flex-start",margin:"13px 0",cursor:"pointer"}}>
              <input type="checkbox" checked={form.agreed} onChange={e=>setForm(prev => ({ ...prev, agreed: e.target.checked }))} style={{marginTop:2,accentColor:C.em}}/>
              <span style={{fontSize:".76rem",color:C.textM,lineHeight:1.5}}>I agree to the <span style={{color:C.em}}>Terms</span> and <span style={{color:C.em}}>Privacy Policy</span></span>
            </label>
            {error&&<div style={{marginBottom:12,fontSize:".78rem",color:C.red}}>{error}</div>}
            <button type="submit" className="btn" disabled={loading}
              style={{width:"100%",justifyContent:"center",padding:12,borderRadius:12,background:loading?C.textL:`linear-gradient(135deg,${C.gold},${C.goldL})`,color:"white",fontSize:".93rem",fontWeight:700,boxShadow:"0 4px 16px rgba(201,168,76,.26)"}}>
              {loading?<><div style={{width:15,height:15,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>Creating…</>:"Create Student Account"}
            </button>

            <div style={{position:"relative",marginTop:16}}>
              <div style={{position:"absolute",inset:"0",display:"flex",alignItems:"center"}}>
                <div style={{width:"100%",borderTop:`1px solid ${C.border}`}}/>
              </div>
              <div style={{position:"relative",display:"flex",justifyContent:"center"}}>
                <span style={{background:"white",padding:"0 10px",fontSize:".7rem",textTransform:"uppercase",color:C.textL,letterSpacing:".06em",fontWeight:700}}>Or sign up with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={signInWithGoogle}
              style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:"11px 16px",marginTop:14,borderRadius:12,border:`1px solid ${C.border}`,background:C.cream,color:C.textM,fontSize:".85rem",fontWeight:600,cursor:"pointer",transition:"all .2s"}}
            >
              <GoogleIcon/>
              <span>Sign up with Google</span>
            </button>

            <p style={{textAlign:"center",marginTop:16,fontSize:".78rem",color:C.textL}}>
              Already have an account? <span onClick={()=>setPage("login")} style={{color:C.em,fontWeight:600,cursor:"pointer"}}>Sign In</span>
            </p>
            <div style={{marginTop:12,padding:"12px 14px",background:C.cream,borderRadius:12,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:".69rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:5}}>Before You Join</div>
              <div style={{fontSize:".76rem",lineHeight:1.65,color:C.textM}}>
                Public signup is for students only. Once you register, you can enroll in courses, continue lessons, track completion, and access support from your dashboard.
              </div>
            </div>
          </form>
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
      <div className="grid-4" style={{gridTemplateColumns:"repeat(4,1fr)",gap:15,marginBottom:30}}>
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
  const contactEmail = "mohdashfaq1416@gmail.com";
  const contactPhone = "+91 7006370956";
  const whatsappNumber = "917006370956";
  const quickTopics = ["New course request", "Certificate help", "Login issue", "General support"];
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Course request for Nur Academy",
    playlistUrl: "",
    message: "",
  });

  const suggestionPrompt = "Please write an email or send a message on WhatsApp if you think there should be a course from YouTube on this website.";
  const updateForm = (key, value) => setForm(current => ({ ...current, [key]: value }));
  const buildDraft = () => {
    const subject = form.subject.trim() || "Course request for Nur Academy";
    const body = [
      `Name: ${form.name.trim() || "Not provided"}`,
      `Email: ${form.email.trim() || "Not provided"}`,
      `Playlist URL: ${form.playlistUrl.trim() || "Not provided"}`,
      "",
      form.message.trim() || suggestionPrompt,
      "",
      "Please let me know if this course or request can be added to Nur Academy.",
    ].join("\n");

    return { subject, body };
  };

  const openEmailDraft = () => {
    const { subject, body } = buildDraft();
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const openWhatsAppDraft = () => {
    const { subject, body } = buildDraft();
    const text = `${subject}\n\n${body}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="page" style={{paddingTop:64}}>
      <div style={{background:`radial-gradient(circle at top right, rgba(201,168,76,.22), transparent 34%), linear-gradient(160deg,${C.emD},${C.em})`,padding:"58px 5% 48px",position:"relative",overflow:"hidden"}}>
        <Iso op={0.08} col={C.gold}/>
        <div className="split-grid contact-hero-shell" style={{gridTemplateColumns:"1.1fr .9fr",gap:34,alignItems:"center",position:"relative",zIndex:1}}>
          <div>
            <Badge col={C.gold}>Support • Course Requests • WhatsApp</Badge>
            <h1 style={{fontFamily:"'Amiri',serif",fontSize:"clamp(2rem,4vw,2.9rem)",color:"white",margin:"14px 0 6px"}}>Contact Nur Academy</h1>
            <p style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:"1rem",marginBottom:16}}>تواصل معنا</p>
            <p style={{color:"rgba(255,255,255,.78)",lineHeight:1.8,maxWidth:620,fontSize:".95rem",marginBottom:18}}>
              Need help with a course, login, certificate, or study path? Reach out directly and we will review it, in sha Allah. If you think a valuable YouTube course should be added to the academy, send the request here.
            </p>
            <div className="contact-hero-actions" style={{marginBottom:18}}>
              <Btn v="gold" onClick={openEmailDraft}>Write Email</Btn>
              <Btn v="dark" onClick={openWhatsAppDraft}>Message on WhatsApp</Btn>
            </div>
            <div className="contact-info-grid">
              {[
                { label:"Support Email", value:contactEmail },
                { label:"WhatsApp", value:contactPhone },
                { label:"Best For", value:"Course requests, login help, certificates" },
              ].map(item => (
                <div key={item.label} style={{padding:"14px 16px",borderRadius:14,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",backdropFilter:"blur(8px)"}}>
                  <div style={{fontSize:".67rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"rgba(255,255,255,.56)",marginBottom:5}}>{item.label}</div>
                  <div style={{fontSize:".88rem",lineHeight:1.55,color:"white"}}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-card" style={{background:"rgba(255,255,255,.08)",borderRadius:24,padding:22,border:"1px solid rgba(255,255,255,.12)",boxShadow:"0 24px 60px rgba(0,0,0,.18)",backdropFilter:"blur(10px)"}}>
            <div style={{fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:C.gold,marginBottom:8}}>Course Suggestion Notice</div>
            <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.38rem",fontWeight:700,color:"white",marginBottom:8}}>Request a YouTube course for the website</div>
            <p style={{color:"rgba(255,255,255,.78)",fontSize:".88rem",lineHeight:1.75,marginBottom:14}}>
              {suggestionPrompt}
            </p>
            <div style={{padding:"14px 16px",borderRadius:16,background:"rgba(201,168,76,.12)",border:"1px solid rgba(201,168,76,.28)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <span style={{fontSize:"1.2rem"}}>📩</span>
                <a href={`mailto:${contactEmail}`} style={{color:"white",fontWeight:700,textDecoration:"none"}}>{contactEmail}</a>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:"1.2rem"}}>💬</span>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" style={{color:"white",fontWeight:700,textDecoration:"none"}}>{contactPhone}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="split-grid contact-main-grid" style={{padding:"48px 5% 64px",background:C.cream,gridTemplateColumns:"1fr 1fr",gap:32}}>
        <div style={{display:"grid",gap:16}}>
          <div className="contact-card" style={{background:"white",borderRadius:20,padding:24,border:`1px solid ${C.border}`,boxShadow:C.sh}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:14}}>
              <div>
                <div style={{fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:5}}>Ways to Reach Us</div>
                <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.5rem",color:C.emD}}>Choose the easiest support route</h2>
              </div>
              <div style={{width:52,height:52,borderRadius:16,background:`linear-gradient(135deg,${C.em},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"1.4rem",flexShrink:0}}>✉️</div>
            </div>
            {[
              { icon:"📧", label:"Email", value:contactEmail, note:"Best for detailed course requests and website support.", href:`mailto:${contactEmail}` },
              { icon:"💬", label:"WhatsApp", value:contactPhone, note:"Best for quick messages and follow-up questions.", href:`https://wa.me/${whatsappNumber}` },
            ].map(item => (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                style={{display:"flex",gap:14,padding:"15px 16px",borderRadius:14,background:C.cream,border:`1px solid ${C.border}`,textDecoration:"none",marginBottom:12}}>
                <div style={{width:42,height:42,borderRadius:12,background:`${C.em}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0}}>{item.icon}</div>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:".68rem",fontWeight:700,color:C.textL,letterSpacing:".08em",textTransform:"uppercase",marginBottom:3}}>{item.label}</div>
                  <div style={{color:C.emD,fontWeight:700,marginBottom:4,wordBreak:"break-word"}}>{item.value}</div>
                  <div style={{fontSize:".78rem",lineHeight:1.6,color:C.textM}}>{item.note}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="contact-card" style={{background:`linear-gradient(180deg, white, ${C.gold}08)`,borderRadius:20,padding:24,border:`1px solid ${C.border}`,boxShadow:C.sh}}>
            <div style={{fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:6}}>What You Can Send</div>
            <h3 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.34rem",color:C.emD,marginBottom:12}}>Helpful reasons to contact the academy</h3>
            <div className="contact-quick-topics" style={{marginBottom:14}}>
              {quickTopics.map(topic => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => updateForm("subject", topic)}
                  style={{padding:"8px 12px",borderRadius:999,border:`1px solid ${C.border}`,background:"white",color:C.emD,fontSize:".77rem",fontWeight:700,cursor:"pointer"}}
                >
                  {topic}
                </button>
              ))}
            </div>
            <p style={{fontSize:".83rem",lineHeight:1.7,color:C.textM}}>
              Please include the course name or YouTube playlist link when possible. That makes it much easier to review your request and add the right content to Nur Academy.
            </p>
          </div>
        </div>
        <div className="contact-card" style={{background:"white",borderRadius:20,padding:26,border:`1px solid ${C.border}`,boxShadow:C.sh}}>
          <div style={{fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:C.textL,marginBottom:6}}>Write to Us</div>
          <h2 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.46rem",color:C.emD,marginBottom:10}}>Send your request in one step</h2>
          <p style={{fontSize:".83rem",color:C.textM,lineHeight:1.7,marginBottom:18}}>
            Fill this in and then choose email or WhatsApp. The message will open with your details already prepared.
          </p>
          {[["Name", "name", "text", "Your name"], ["Email", "email", "email", "your@email.com"], ["Subject", "subject", "text", "Course request for Nur Academy"], ["Playlist URL", "playlistUrl", "url", "https://www.youtube.com/playlist?list=..."]].map(([label, key, type, placeholder]) => (
            <div key={key} style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:".69rem",fontWeight:700,color:C.textL,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={event => updateForm(key, event.target.value)}
                placeholder={placeholder}
                style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1px solid ${C.border}`,background:C.cream,fontSize:".86rem",outline:"none"}}
              />
            </div>
          ))}
          <div style={{marginBottom:18}}>
            <label style={{display:"block",fontSize:".69rem",fontWeight:700,color:C.textL,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>Message</label>
            <textarea
              rows={7}
              value={form.message}
              onChange={event => updateForm("message", event.target.value)}
              placeholder="Please write an email or send a message on WhatsApp if you think there should be a course from YouTube on this website."
              style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1px solid ${C.border}`,background:C.cream,fontSize:".86rem",resize:"vertical",lineHeight:1.7,outline:"none"}}
            />
          </div>
          <div className="contact-form-actions" style={{marginBottom:14}}>
            <Btn v="primary" style={{flex:"1 1 220px"}} onClick={openEmailDraft}>Write Email</Btn>
            <Btn v="gold" style={{flex:"1 1 220px"}} onClick={openWhatsAppDraft}>Send on WhatsApp</Btn>
          </div>
          <div style={{padding:"12px 14px",borderRadius:14,background:`${C.em}08`,border:`1px solid ${C.border}`}}>
            <div style={{fontSize:".77rem",lineHeight:1.7,color:C.textM}}>
              We currently respond through email and WhatsApp, so these two buttons are the fastest way to reach us directly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN ────────────────────────────────────────────────────────────────────
const AdminPage = ({ setPage, currentUser }) => {
  const [sec, setSec] = useState("overview");
  const [users, setUsers] = useState(() => AdminDB.users());
  const [customCourses, setCustomCourses] = useState(() => AdminDB.customCourses());
  const [certificates, setCertificates] = useState(() => AdminDB.certificates());
  const [supportTickets, setSupportTickets] = useState(() => SupportDB.all());
  const [notice, setNotice] = useState({ type:"", text:"" });
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [courseForm, setCourseForm] = useState(() => buildAdminCourseFormState());
  const noticeTimer = useRef(null);
  const courseCatalog = getCourseCatalog({ includeHidden:true });
  const blockedCount = users.filter(user => user.blockedAt).length;
  const studentCount = users.filter(user => user.role !== "admin").length;
  const adminCount = users.filter(user => user.role === "admin").length;
  const publishedCourseCount = courseCatalog.filter(isCourseVisible).length;
  const draftCourseCount = customCourses.filter(course => course.isVisible === false).length;
  const recentUsers = [...users].sort((a, b) => String(b.joinedAt || "").localeCompare(String(a.joinedAt || ""))).slice(0, 5);
  const recentCertificates = certificates.slice(0, 6);
  const adminCertificateStatus = AdminDB.certificateStatusForUser(currentUser?.id || "");
  const adminIssuedCertificates = certificates.filter(record => record.user.id === currentUser?.id);
  const supportCounts = supportTickets.reduce((summary, ticket) => {
    const key = SUPPORT_STATUS_META[ticket.status] ? ticket.status : "open";
    summary.total += 1;
    summary[key] += 1;
    return summary;
  }, { total:0, open:0, in_review:0, resolved:0 });

  const sync = useCallback(() => {
    setUsers(AdminDB.users());
    setCustomCourses(AdminDB.customCourses());
    setCertificates(AdminDB.certificates());
    setSupportTickets(SupportDB.all());
  }, []);

  const flash = useCallback((text, type="success") => {
    setNotice({ text, type });
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice({ text:"", type:"" }), 2600);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("nur:data", sync);
    return () => {
      window.removeEventListener("nur:data", sync);
      window.clearTimeout(noticeTimer.current);
    };
  }, [sync]);

  const handleCreateUser = async (event) => {
    event.preventDefault();
    try {
      await Auth.createUser(userForm);
      setUserForm({ name:"", email:"", password:"", role:"student" });
      sync();
      flash("User added on this browser.");
      setSec("users");
    } catch (error) {
      flash(error.message, "error");
    }
  };

  const handleToggleRole = (user) => {
    try {
      const nextRole = user.role === "admin" ? "student" : "admin";
      Auth.setRole(user.id, nextRole);
      sync();
      flash(`${user.name} is now a ${nextRole}.`);
    } catch (error) {
      flash(error.message, "error");
    }
  };

  const handleToggleBlocked = (user) => {
    const nextBlocked = !user.blockedAt;
    const reason = nextBlocked
      ? (window.prompt(`Reason for blocking ${user.name}?`, user.blockedReason || "Blocked by admin.") || "").trim()
      : "";

    try {
      Auth.setBlocked(user.id, nextBlocked, reason);
      sync();
      flash(nextBlocked ? `${user.name} has been blocked.` : `${user.name} has been unblocked.`);
    } catch (error) {
      flash(error.message, "error");
    }
  };

  const handleDeleteUser = (user) => {
    if (!window.confirm(`Delete ${user.name} (${user.email}) from this browser?`)) return;
    try {
      Auth.deleteUser(user.id);
      sync();
      flash("User deleted from this browser.");
    } catch (error) {
      flash(error.message, "error");
    }
  };

  const handleResetPassword = async (user) => {
    const nextPassword = window.prompt(`Enter a new password for ${user.email}`, "");
    if (!nextPassword) return;
    try {
      await Auth.resetUserPassword(user.id, nextPassword);
      flash(`Password updated for ${user.email}.`);
    } catch (error) {
      flash(error.message, "error");
    }
  };

  const handleSaveCourse = (event) => {
    event.preventDefault();
    try {
      const isEditing = Boolean(editingCourseId);
      if (isEditing) {
        AdminDB.updateCourse(editingCourseId, courseForm);
      } else {
        AdminDB.createCourse(courseForm);
      }
      setCourseForm(buildAdminCourseFormState());
      setEditingCourseId(null);
      sync();
      flash(isEditing ? "Custom course updated." : "Custom course added.");
      setSec("courses");
    } catch (error) {
      flash(error.message, "error");
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course.id);
    setCourseForm(buildAdminCourseFormState(course));
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const handleCancelCourseEdit = () => {
    setEditingCourseId(null);
    setCourseForm(buildAdminCourseFormState());
  };

  const handleToggleCourseVisibility = (course) => {
    if (!course.adminManaged) return;
    try {
      AdminDB.updateCourse(course.id, {
        ...course,
        status: course.isVisible === false ? "published" : "draft",
      });
      if (editingCourseId === course.id) {
        setEditingCourseId(null);
        setCourseForm(buildAdminCourseFormState());
      }
      sync();
      flash(course.isVisible === false ? "Course published to the student catalog." : "Course moved to draft and hidden from the catalog.");
    } catch (error) {
      flash(error.message, "error");
    }
  };

  const handleDeleteCourse = (course) => {
    if (!window.confirm(`Delete the custom course "${course.title}" from this browser?`)) return;
    try {
      AdminDB.deleteCourse(course.id);
      if (editingCourseId === course.id) {
        setEditingCourseId(null);
        setCourseForm(buildAdminCourseFormState());
      }
      sync();
      flash("Custom course deleted.");
    } catch (error) {
      flash(error.message, "error");
    }
  };

  const handleResetAdminLearning = () => {
    if (!currentUser?.id) return;
    if (!window.confirm("Reset all enrolled courses, progress, watch time, notes, streak, and certificates for the current admin account on this browser?")) return;
    try {
      AdminDB.resetLearning(currentUser.id);
      sync();
      flash("Admin learning progress has been reset to zero on this browser.");
    } catch (error) {
      flash(error.message, "error");
    }
  };
  const handleSupportStatus = (ticket, status) => {
    const note = window.prompt(`Add or update an internal note for ${ticket.userName}`, ticket.adminNote || "");
    if (note === null) return;
    try {
      SupportDB.update(ticket.id, { status, adminNote: note.trim() });
      sync();
      flash(`Support request ${ticket.id} updated.`);
    } catch (error) {
      flash(error.message, "error");
    }
  };

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="page" style={{paddingTop:64,minHeight:"100vh",background:C.cream,display:"flex",alignItems:"center",justifyContent:"center",padding:"64px 20px"}}>
        <div style={{maxWidth:460,background:"white",borderRadius:16,padding:28,border:`1px solid ${C.border}`,boxShadow:C.sh,textAlign:"center"}}>
          <div style={{fontSize:"2.2rem",marginBottom:11}}>🔒</div>
          <h1 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.35rem",color:C.emD,marginBottom:8}}>Admin Access Required</h1>
          <p style={{fontSize:".84rem",color:C.textL,lineHeight:1.7,marginBottom:16}}>The admin workspace is available only to authenticated administrator accounts. Sign in with an approved academy admin account to manage students, courses, certificates, and support requests.</p>
          <Btn v="primary" onClick={()=>setPage("dashboard")}>Return to Dashboard</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="page admin-shell" style={{paddingTop:64,display:"flex",minHeight:"100vh",background:"#F0F0F5"}}>
      <div className="admin-sidebar" style={{width:200,background:C.emD,padding:"18px 10px",position:"fixed",top:64,bottom:0}}>
        <div style={{padding:"9px 6px 17px",borderBottom:"1px solid rgba(255,255,255,.1)",marginBottom:9}}>
          <div style={{fontFamily:"'Amiri',serif",color:C.gold,fontSize:".83rem"}}>نور أكاديمي</div>
          <div style={{color:"white",fontWeight:700,fontSize:".78rem"}}>Admin Workspace</div>
        </div>
        {[["📊","Overview","overview"],["👥","Users","users"],["📚","Courses","courses"],["🏆","Certificates","certs"],["🛟","Support","support"]].map(([ic,l,k])=>(
          <div key={k} onClick={()=>setSec(k)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 11px",borderRadius:7,cursor:"pointer",marginBottom:2,transition:"all .2s",background:sec===k?"rgba(201,168,76,.18)":"transparent",color:sec===k?C.gold:"rgba(255,255,255,.52)",fontSize:".8rem",fontWeight:sec===k?600:400}}>
            <span>{ic}</span>{l}
          </div>
        ))}
        <div onClick={()=>setPage("dashboard")} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 11px",cursor:"pointer",color:"rgba(255,100,100,.65)",fontSize:".8rem",marginTop:18}}>
          <span>🚪</span>Exit Admin
        </div>
      </div>
      <div className="admin-content" style={{flex:1,marginLeft:200,padding:"22px 26px"}}>
        {notice.text && (
          <div style={{marginBottom:16,padding:"11px 14px",borderRadius:12,background:notice.type==="error" ? "#FEE2E2" : "#ECFDF5",border:`1px solid ${notice.type==="error" ? "#FCA5A5" : "#A7F3D0"}`,color:notice.type==="error" ? "#991B1B" : "#065F46",fontSize:".8rem",fontWeight:700}}>
            {notice.text}
          </div>
        )}
        {sec==="overview"&&(
          <div className="page">
            <div className="admin-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div>
                <h1 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.45rem",color:"#1A1A2E",marginBottom:4}}>Admin Overview</h1>
                <div style={{fontSize:".8rem",color:"#6B7280"}}>Monitor learners, review course activity, and keep academy operations organized.</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <Btn v="outline" onClick={()=>setSec("users")}>Manage Users</Btn>
                <Btn v="gold" onClick={()=>setSec("courses")}>Add Course</Btn>
              </div>
            </div>
            <div style={{background:"white",borderRadius:12,padding:"13px 16px",boxShadow:"0 2px 8px rgba(0,0,0,.06)",marginBottom:16,fontSize:".78rem",color:"#6B7280",lineHeight:1.6}}>
              Frontend preview mode is active. Student and admin flows are live, and academy records in this workspace stay available on this device while you prepare the backend.
            </div>
            <div className="grid-4" style={{gridTemplateColumns:"repeat(4,1fr)",gap:13,marginBottom:20}}>
              {[{icon:"👥",l:"Students",v:String(studentCount),col:C.em},{icon:"📚",l:"Courses",v:String(courseCatalog.length),col:"#7C3AED"},{icon:"🏆",l:"Certificates",v:String(certificates.length),col:C.green},{icon:"🛟",l:"Open Support",v:String(supportCounts.open + supportCounts.in_review),col:C.gold}].map((s,i)=>(
                <div key={i} style={{background:"white",borderRadius:12,padding:16,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:"1.25rem",marginBottom:5}}>{s.icon}</div>
                  <div style={{fontSize:"1.35rem",fontWeight:800,color:s.col}}>{s.v}</div>
                  <div style={{fontSize:".68rem",color:"#6B7280",marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div className="grid-2" style={{gridTemplateColumns:"1.2fr .8fr",gap:16}}>
              <div className="table-wrap" style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{padding:"13px 17px",borderBottom:"1px solid #E5E7EB",fontWeight:700,fontSize:".86rem",color:"#1A1A2E"}}>Recent Users</div>
                <table>
                  <thead><tr>{["Name","Role","Joined","Status"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {recentUsers.map(user=>(
                      <tr key={user.id}>
                        <td>
                          <div style={{fontWeight:700,fontSize:".8rem"}}>{user.name}</div>
                          <div style={{fontSize:".66rem",color:"#9CA3AF"}}>{user.email}</div>
                        </td>
                        <td><Badge col={user.role==="admin" ? C.gold : C.em}>{user.role}</Badge></td>
                        <td style={{fontWeight:700}}>{formatDay(user.joinedAt)}</td>
                        <td><Badge col={user.blockedAt ? C.red : C.green}>{user.blockedAt ? "Blocked" : "Active"}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{background:"white",borderRadius:12,padding:18,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{fontWeight:700,fontSize:".92rem",color:"#1A1A2E",marginBottom:10}}>Quick Status</div>
                <div style={{display:"grid",gap:10,fontSize:".78rem",color:"#4B5563"}}>
                  <div style={{padding:"10px 12px",borderRadius:10,background:"#F9FAFB",border:"1px solid #E5E7EB"}}>{adminCount} admin account{adminCount===1?"":"s"} currently have management access.</div>
                  <div style={{padding:"10px 12px",borderRadius:10,background:"#F9FAFB",border:"1px solid #E5E7EB"}}>{customCourses.length} custom courses added on this browser.</div>
                  <div style={{padding:"10px 12px",borderRadius:10,background:"#F9FAFB",border:"1px solid #E5E7EB"}}>{publishedCourseCount} courses are currently visible to students in the catalog.</div>
                  <div style={{padding:"10px 12px",borderRadius:10,background:"#F9FAFB",border:"1px solid #E5E7EB"}}>{draftCourseCount} custom course{draftCourseCount===1?" is":"s are"} currently saved as drafts.</div>
                  <div style={{padding:"10px 12px",borderRadius:10,background:"#F9FAFB",border:"1px solid #E5E7EB"}}>{blockedCount} blocked user accounts right now.</div>
                  <div style={{padding:"10px 12px",borderRadius:10,background:"#F9FAFB",border:"1px solid #E5E7EB"}}>{recentCertificates.length} latest certificates are ready for review in the Certificates tab.</div>
                  <div style={{padding:"10px 12px",borderRadius:10,background:"#F9FAFB",border:"1px solid #E5E7EB"}}>{supportCounts.resolved} support requests have already been marked resolved.</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {sec==="users"&&(
          <div className="page">
            <h1 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.45rem",color:"#1A1A2E",marginBottom:18}}>User Management</h1>
            <div style={{background:"white",borderRadius:12,padding:"13px 16px",boxShadow:"0 2px 8px rgba(0,0,0,.06)",marginBottom:16,fontSize:".78rem",color:"#6B7280",lineHeight:1.65}}>
              Only accounts created in this same browser are visible here right now. If your classmate signed up on another phone, laptop, browser, or private window, that account will not appear until a shared backend and database are connected.
            </div>
            <div className="grid-2" style={{gridTemplateColumns:"minmax(320px,420px) 1fr",gap:16}}>
              <form onSubmit={handleCreateUser} style={{background:"white",borderRadius:12,padding:18,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{fontWeight:700,fontSize:".92rem",color:"#1A1A2E",marginBottom:12}}>Add User</div>
                {[["Name","name","text","Dar Ishfaq"],["Email","email","email","name@example.com"],["Password","password","password","At least 8 characters"]].map(([label,key,type,placeholder])=>(
                  <div key={key} style={{marginBottom:12}}>
                    <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>{label}</label>
                    <input type={type} value={userForm[key]} onChange={e=>setUserForm(form => ({ ...form, [key]: e.target.value }))} placeholder={placeholder} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".84rem"}} />
                  </div>
                ))}
                <div style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Role</label>
                  <select value={userForm.role} onChange={e=>setUserForm(form => ({ ...form, role: e.target.value }))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".84rem",background:"white"}}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <Btn type="submit" v="primary" style={{width:"100%",justifyContent:"center"}}>Create User</Btn>
              </form>
              <div className="table-wrap" style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{padding:"13px 17px",borderBottom:"1px solid #E5E7EB",fontWeight:700,fontSize:".86rem",color:"#1A1A2E"}}>All Users</div>
                <table>
                  <thead><tr>{["User","Role","Joined","Status","Actions"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {users.map(user=>{
                      const protectedAccount = isPrimaryAdminUser(user) || user.id === currentUser.id;
                      return (
                        <tr key={user.id}>
                          <td>
                            <div style={{fontWeight:700,fontSize:".8rem"}}>{user.name}</div>
                            <div style={{fontSize:".66rem",color:"#9CA3AF"}}>{user.email}</div>
                          </td>
                          <td><Badge col={user.role==="admin" ? C.gold : C.em}>{user.role}</Badge></td>
                          <td style={{fontWeight:700}}>{formatDay(user.joinedAt)}</td>
                          <td>
                            <Badge col={user.blockedAt ? C.red : C.green}>{user.blockedAt ? "Blocked" : "Active"}</Badge>
                            {user.blockedAt && <div style={{fontSize:".63rem",color:"#9CA3AF",marginTop:4}}>{user.blockedReason || "Blocked by admin."}</div>}
                          </td>
                          <td>
                            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                              <Btn size="sm" v="ghost" onClick={()=>handleResetPassword(user)}>Reset Password</Btn>
                              {!protectedAccount && <Btn size="sm" v="outline" onClick={()=>handleToggleRole(user)}>{user.role==="admin" ? "Make Student" : "Make Admin"}</Btn>}
                              {!protectedAccount && <Btn size="sm" v={user.blockedAt ? "success" : "danger"} onClick={()=>handleToggleBlocked(user)}>{user.blockedAt ? "Unblock" : "Block"}</Btn>}
                              {!protectedAccount && <Btn size="sm" v="danger" onClick={()=>handleDeleteUser(user)}>Delete</Btn>}
                              {protectedAccount && <span style={{fontSize:".68rem",color:"#9CA3AF",alignSelf:"center"}}>Protected</span>}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {sec==="courses"&&(
          <div className="page">
            <h1 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.45rem",color:"#1A1A2E",marginBottom:18}}>Course Management</h1>
            <div style={{background:"white",borderRadius:12,padding:"13px 16px",boxShadow:"0 2px 8px rgba(0,0,0,.06)",marginBottom:16,fontSize:".78rem",color:"#6B7280",lineHeight:1.65}}>
              Built-in academy courses stay protected here, while custom courses can be priced, saved as drafts, published to the student catalog, edited, or removed from this browser.
            </div>
            <div className="grid-2" style={{gridTemplateColumns:"minmax(340px,430px) 1fr",gap:16}}>
              <form onSubmit={handleSaveCourse} style={{background:"white",borderRadius:12,padding:18,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
                  <div style={{fontWeight:700,fontSize:".92rem",color:"#1A1A2E"}}>{editingCourseId ? "Edit Custom Course" : "Add Custom Course"}</div>
                  {editingCourseId && <Badge col={C.gold}>Editing Course</Badge>}
                </div>
                {[["Course Title","title","e.g. Fiqh of Prayer"],["Arabic Title","titleAr","e.g. فقه الصلاة"],["Instructor","instructor","e.g. Sheikh Name"],["Thumbnail Emoji","thumb","e.g. 📘"],["Theme Color","color","#0B5240"],["Playlist ID","playlist","e.g. PLxxxxxxxx"],["Featured Video ID","firstVideoId","e.g. dQw4w9WgXcQ"],["First Lesson Title","firstLessonTitle","Lesson 01 - Introduction"],["First Lesson Duration","firstLessonDuration","15:00"]].map(([label,key,placeholder])=>(
                  <div key={key} style={{marginBottom:12}}>
                    <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>{label}</label>
                    <input value={courseForm[key]} onChange={e=>setCourseForm(form => ({ ...form, [key]: e.target.value }))} placeholder={placeholder} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".84rem"}} />
                  </div>
                ))}
                <div className="grid-2" style={{gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  <div>
                    <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Category</label>
                    <select value={courseForm.category} onChange={e=>setCourseForm(form => ({ ...form, category: e.target.value }))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".84rem",background:"white"}}>
                      {CATEGORY_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Level</label>
                    <select value={courseForm.level} onChange={e=>setCourseForm(form => ({ ...form, level: e.target.value }))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".84rem",background:"white"}}>
                      {LEVEL_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid-2" style={{gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  <div>
                    <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Price (USD)</label>
                    <input type="number" min="0" step="0.01" value={courseForm.price} onChange={e=>setCourseForm(form => ({ ...form, price: e.target.value }))} placeholder="0.00" style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".84rem"}} />
                  </div>
                  <div>
                    <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Catalog Status</label>
                    <select value={courseForm.status} onChange={e=>setCourseForm(form => ({ ...form, status: e.target.value }))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".84rem",background:"white"}}>
                      <option value="published">Published</option>
                      <option value="draft">Draft / Hidden</option>
                    </select>
                  </div>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:".7rem",fontWeight:700,color:C.textM,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Description</label>
                  <textarea value={courseForm.desc} onChange={e=>setCourseForm(form => ({ ...form, desc: e.target.value }))} placeholder="Short course description" style={{width:"100%",minHeight:84,padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:".84rem",resize:"vertical"}} />
                </div>
                <div className="action-row" style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  <Btn type="submit" v="primary" style={{flex:"1 1 220px",justifyContent:"center"}}>{editingCourseId ? "Update Custom Course" : "Create Custom Course"}</Btn>
                  {editingCourseId && <Btn v="outline" style={{flex:"1 1 180px",justifyContent:"center"}} onClick={handleCancelCourseEdit}>Cancel Edit</Btn>}
                </div>
              </form>
              <div className="table-wrap" style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{padding:"13px 17px",borderBottom:"1px solid #E5E7EB",fontWeight:700,fontSize:".86rem",color:"#1A1A2E"}}>Course Catalog</div>
                <table>
                  <thead><tr>{["Course","Status","Pricing","Lessons","Source","Actions"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {courseCatalog.map(course=>(
                      <tr key={course.id}>
                        <td>
                          <div style={{display:"flex",gap:8,alignItems:"center"}}>
                            <div style={{width:30,height:30,borderRadius:6,background:`${course.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".9rem"}}>{course.thumb}</div>
                            <div>
                              <div style={{fontWeight:700,fontSize:".8rem"}}>{course.title}</div>
                              <div style={{fontSize:".66rem",color:"#9CA3AF"}}>{course.instructor} · {course.category}</div>
                              {course.playlist && <div style={{fontSize:".66rem",color:"#9CA3AF"}}>Playlist: {course.playlist}</div>}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                            <Badge col={isCourseVisible(course) ? C.green : C.gold}>{isCourseVisible(course) ? "Published" : "Draft"}</Badge>
                            {course.adminManaged && <Badge col={C.gold}>Custom</Badge>}
                          </div>
                        </td>
                        <td><Badge col={course.isFree ? C.em : C.gold}>{course.isFree ? "Free" : `$${Number(course.price || 0).toFixed(2)}`}</Badge></td>
                        <td style={{fontWeight:700}}>{totalLessons(course)}</td>
                        <td><Badge col={course.adminManaged ? C.gold : C.textL}>{course.adminManaged ? "Custom" : "Built In"}</Badge></td>
                        <td>
                          {course.adminManaged ? (
                            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                              <Btn size="sm" v="ghost" onClick={()=>handleEditCourse(course)}>Edit</Btn>
                              <Btn size="sm" v="outline" onClick={()=>handleToggleCourseVisibility(course)}>{course.isVisible === false ? "Publish" : "Hide"}</Btn>
                              <Btn size="sm" v="danger" onClick={()=>handleDeleteCourse(course)}>Delete</Btn>
                            </div>
                          ) : (
                            <span style={{fontSize:".68rem",color:"#9CA3AF"}}>Protected</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {sec==="certs"&&(
          <div className="page">
            <div className="admin-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <h1 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.45rem",color:"#1A1A2E"}}>Certificate Records</h1>
              <Btn v="danger" onClick={handleResetAdminLearning}>Reset My Course Progress</Btn>
            </div>
            <div className="grid-2" style={{gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <div style={{background:"white",borderRadius:12,padding:18,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{fontWeight:700,fontSize:".92rem",color:"#1A1A2E",marginBottom:10}}>Courses That Can Issue Certificates</div>
                <div style={{fontSize:".76rem",lineHeight:1.65,color:"#6B7280",marginBottom:12}}>
                  Every listed course below uses the same certificate flow. Students must finish all lessons and reach at least {CERTIFICATE_WATCH_THRESHOLD}% watch time on supported videos. On the current admin account, that watch-time rule is bypassed so you can preview certificates after marking lessons complete.
                </div>
                <div style={{display:"grid",gap:8}}>
                  {adminCertificateStatus.map(item => (
                    <div key={item.course.id} style={{display:"flex",justifyContent:"space-between",gap:10,padding:"10px 12px",borderRadius:10,background:"#F9FAFB",border:"1px solid #E5E7EB"}}>
                      <span style={{fontSize:".8rem",fontWeight:700,color:"#1A1A2E"}}>{item.course.title}</span>
                      <Badge col={item.issued ? C.green : C.gold}>{item.issued ? "Issued" : "Not Yet"}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:"white",borderRadius:12,padding:18,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{fontWeight:700,fontSize:".92rem",color:"#1A1A2E",marginBottom:10}}>Current Admin Account</div>
                <div style={{fontSize:".78rem",lineHeight:1.65,color:"#6B7280",marginBottom:12}}>
                  Signed in as <strong style={{color:"#1A1A2E"}}>{currentUser.email}</strong>. Issued certificates for this account on this browser: <strong style={{color:"#1A1A2E"}}>{adminIssuedCertificates.length}</strong>. This admin session can bypass the watch-time rule for certificate preview.
                </div>
                <div style={{display:"grid",gap:8}}>
                  {adminIssuedCertificates.length === 0 ? (
                    <div style={{padding:"12px 14px",borderRadius:10,background:"#F9FAFB",border:"1px solid #E5E7EB",fontSize:".78rem",color:"#6B7280"}}>
                      No certificate has been issued for the current admin account on this browser yet.
                    </div>
                  ) : adminIssuedCertificates.map((record, idx) => (
                    <div key={`${record.course.id}-${idx}`} style={{padding:"10px 12px",borderRadius:10,background:"#F9FAFB",border:"1px solid #E5E7EB"}}>
                      <div style={{fontWeight:700,fontSize:".8rem",color:"#1A1A2E",marginBottom:3}}>{record.course.title}</div>
                      <div style={{fontSize:".7rem",color:"#6B7280"}}>{record.completion.certificateId}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="table-wrap" style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
              <div style={{padding:"13px 17px",borderBottom:"1px solid #E5E7EB",fontWeight:700,fontSize:".86rem",color:"#1A1A2E"}}>Issued Certificates</div>
              <table>
                <thead><tr>{["Student","Course","Completed","Certificate ID"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {certificates.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{padding:"24px 14px",textAlign:"center",color:"#6B7280"}}>No certificates have been issued on this browser yet.</td>
                    </tr>
                  ) : certificates.map((record, idx)=>(
                    <tr key={`${record.user.id}-${record.course.id}-${idx}`}>
                      <td>
                        <div style={{fontWeight:700,fontSize:".8rem"}}>{record.user.name}</div>
                        <div style={{fontSize:".66rem",color:"#9CA3AF"}}>{record.user.email || record.user.id}</div>
                      </td>
                      <td style={{fontWeight:700}}>{record.course.title}</td>
                      <td>{formatDay(record.completion.completedAt)}</td>
                      <td style={{fontFamily:"monospace",fontSize:".74rem"}}>{record.completion.certificateId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {sec==="support"&&(
          <div className="page">
            <div className="admin-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div>
                <h1 style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.45rem",color:"#1A1A2E",marginBottom:4}}>Support Inbox</h1>
                <div style={{fontSize:".8rem",color:"#6B7280"}}>Review student issues, course requests, and certificate help requests from one place.</div>
              </div>
              <Btn v="outline" onClick={()=>setPage("contact")}>Open Contact Page</Btn>
            </div>
            <div style={{background:"white",borderRadius:12,padding:"13px 16px",boxShadow:"0 2px 8px rgba(0,0,0,.06)",marginBottom:16,fontSize:".78rem",color:"#6B7280",lineHeight:1.65}}>
              Support tickets appear here when they are submitted from the same browser profile. If the student used another phone, browser, or private window, the admin inbox will stay empty until a shared backend is connected.
            </div>
            <div className="grid-4" style={{gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:13,marginBottom:16}}>
              {[
                { label:"Total Requests", value:supportCounts.total, color:C.em },
                { label:"Open", value:supportCounts.open, color:C.gold },
                { label:"In Review", value:supportCounts.in_review, color:"#7C3AED" },
                { label:"Resolved", value:supportCounts.resolved, color:C.green },
              ].map(item => (
                <div key={item.label} style={{background:"white",borderRadius:12,padding:16,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:".68rem",fontWeight:700,color:"#6B7280",letterSpacing:".06em",textTransform:"uppercase",marginBottom:6}}>{item.label}</div>
                  <div style={{fontSize:"1.35rem",fontWeight:800,color:item.color}}>{item.value}</div>
                </div>
              ))}
            </div>
            {supportTickets.length === 0 ? (
              <div style={{background:"white",borderRadius:16,padding:32,textAlign:"center",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:"2rem",marginBottom:10}}>🛟</div>
                <div style={{fontWeight:700,color:"#1A1A2E",marginBottom:5}}>No support requests yet</div>
                <div style={{fontSize:".8rem",lineHeight:1.65,color:"#6B7280"}}>Student support requests will appear here once learners start submitting them from the dashboard.</div>
              </div>
            ) : (
              <div style={{display:"grid",gap:14}}>
                {supportTickets.map(ticket => {
                  const statusMeta = SUPPORT_STATUS_META[ticket.status] || SUPPORT_STATUS_META.open;
                  return (
                    <div key={ticket.id} style={{background:"white",borderRadius:16,padding:20,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                      <div className="admin-header" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14,marginBottom:12}}>
                        <div>
                          <div style={{fontWeight:800,fontSize:".96rem",color:"#1A1A2E",marginBottom:4}}>{ticket.subject}</div>
                          <div style={{fontSize:".76rem",lineHeight:1.6,color:"#6B7280"}}>
                            {ticket.userName} · {ticket.userEmail} · {ticket.category}
                            {ticket.courseTitle ? ` · ${ticket.courseTitle}` : ""}
                          </div>
                          <div style={{fontSize:".72rem",color:"#9CA3AF",marginTop:4}}>Created {formatDateTime(ticket.createdAt)} · Updated {formatDateTime(ticket.updatedAt)}</div>
                        </div>
                        <Badge col={statusMeta.color}>{statusMeta.label}</Badge>
                      </div>
                      <div style={{fontSize:".84rem",lineHeight:1.75,color:"#374151",whiteSpace:"pre-wrap",marginBottom:14}}>{ticket.message}</div>
                      {ticket.screenshot && (
                        <div style={{marginBottom:14}}>
                          <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                            <div style={{fontSize:".68rem",fontWeight:700,color:"#6B7280",letterSpacing:".06em",textTransform:"uppercase"}}>Student Screenshot</div>
                            <a href={ticket.screenshot.dataUrl} target="_blank" rel="noreferrer" style={{fontSize:".74rem",fontWeight:700,color:C.em,textDecoration:"none"}}>Open Full Image</a>
                          </div>
                          <img src={ticket.screenshot.dataUrl} alt={`Student screenshot for ${ticket.subject}`} style={{width:"100%",maxHeight:280,objectFit:"cover",borderRadius:12,border:"1px solid #E5E7EB",display:"block",marginBottom:6}} />
                          <div style={{fontSize:".72rem",color:"#6B7280"}}>{ticket.screenshot.name} · {formatBytes(ticket.screenshot.size)}</div>
                        </div>
                      )}
                      <div style={{padding:"12px 14px",borderRadius:12,background:"#F9FAFB",border:"1px solid #E5E7EB",marginBottom:14}}>
                        <div style={{fontSize:".68rem",fontWeight:700,color:"#6B7280",letterSpacing:".06em",textTransform:"uppercase",marginBottom:5}}>Internal Admin Note</div>
                        <div style={{fontSize:".78rem",lineHeight:1.65,color:"#4B5563"}}>{ticket.adminNote || "No admin note has been added yet."}</div>
                      </div>
                      <div className="action-row" style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        <Btn size="sm" v="outline" onClick={()=>handleSupportStatus(ticket, "open")}>Mark Open</Btn>
                        <Btn size="sm" v="primary" onClick={()=>handleSupportStatus(ticket, "in_review")}>Mark In Review</Btn>
                        <Btn size="sm" v="success" onClick={()=>handleSupportStatus(ticket, "resolved")}>Mark Resolved</Btn>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
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
    const forwardStorageSync = (event) => {
      const key = event?.key || null;
      if (!key || Object.values(K).includes(key)) {
        window.dispatchEvent(new CustomEvent("nur:data"));
      }
    };
    (async () => {
      await Auth.ensureSeeded();

      // Handle Google OAuth callback (Supabase session detected in URL)
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const googleUser = session.user;
          const email = googleUser.email || "";
          const name = googleUser.user_metadata?.full_name || googleUser.email?.split("@")[0] || "Student";
          const existing = Auth.users().find(u => u.email === email);
          if (existing) {
            ls.set(K.SESSION, { id: existing.id });
          } else {
            const newUser = {
              id: newUserId(),
              name,
              email,
              role: "student",
              joinedAt: dayKey(),
              country: "",
              language: "English / Arabic",
              blockedAt: null,
              blockedReason: "",
              passwordHash: "",
            };
            ls.set(K.USERS, [...Auth.users(), newUser]);
            const allData = readAllUserData();
            allData[newUser.id] = defaultUserState();
            ls.set(K.DATA, allData);
            ls.set(K.SESSION, { id: newUser.id });
          }
        }
      }

      pruneStoredCourseData();
      syncUser();
      if (active) setAuthReady(true);
    })();
    window.addEventListener("nur:data", syncUser);
    window.addEventListener("storage", forwardStorageSync);
    return () => {
      active = false;
      window.removeEventListener("nur:data", syncUser);
      window.removeEventListener("storage", forwardStorageSync);
    };
  }, []);
  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);
  useEffect(() => {
    if (!authReady) return;
    if (!currentUser && ["dashboard","lesson","admin","certificate"].includes(page)) setPage("login");
    if (currentUser && currentUser.role !== "admin" && page === "admin") setPage("dashboard");
    if (currentUser && ["login","register"].includes(page)) setPage(currentUser.role === "admin" ? "admin" : "dashboard");
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
  const activeCourse = course ? resolveCourse(course) : null;
  const certificateCourse = activeCourse?.activeSeriesCourse || activeCourse;
  const certificateCompletion = certificateCourse ? DB.courseCompletion(certificateCourse.id) : null;

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
        {page==="course-detail" && <CourseDetailPage course={course}   setPage={setPage} setLesson={setLesson} setCourse={setCourse} loggedIn={loggedIn}/>}
        {page==="lesson"        && <LessonPage       lessonData={lessonData} setPage={setPage} setLesson={setLesson} setCourse={setCourse}/>}
        {page==="dashboard"     && <DashboardPage    currentUser={currentUser} onSignOut={handleSignOut} onUserUpdated={handleUserUpdated} setPage={setPage} setLesson={(d)=>{ setLesson(d); setPage("lesson"); }}/>}
        {page==="admin"         && <AdminPage        currentUser={currentUser} setPage={setPage}/>}
        {page==="login"         && <LoginPage        setPage={setPage} onLogin={handleLogin}/>}
        {page==="register"      && <RegisterPage     setPage={setPage} onRegister={handleLogin}/>}
        {page==="about"         && <AboutPage/>}
        {page==="contact"       && <ContactPage/>}
        {page==="certificate" && (
          <CertificatePage
            user={currentUser}
            course={certificateCourse}
            completion={certificateCompletion}
            onPrint={() => {
              if (certificateCourse && currentUser && certificateCompletion) {
                openCertificatePrintWindow(certificateCourse, currentUser, certificateCompletion);
              }
            }}
          />
        )}
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
