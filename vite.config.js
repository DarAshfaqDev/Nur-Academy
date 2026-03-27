import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ─────────────────────────────────────────────────────────────────────────────
//  GITHUB PAGES SETUP
//  Change the base to match your GitHub repo name.
//  Example: repo is github.com/yourname/nur-academy  →  base: '/nur-academy/'
//  For local dev it auto-switches to '/'
// ─────────────────────────────────────────────────────────────────────────────
const isProd = process.env.NODE_ENV === 'production'
const deployTarget = process.env.DEPLOY_TARGET || ''
const githubBase = process.env.GITHUB_PAGES_BASE || '/nur-academy/'

export default defineConfig({
  plugins: [react()],
  base: isProd ? (deployTarget === 'github-pages' ? githubBase : '/') : '/',
  server: { port: 3000, open: true },
  build: { outDir: 'dist', sourcemap: false },
})
