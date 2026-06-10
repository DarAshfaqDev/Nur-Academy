# Nur Academy Backend Tab Prompt

Use this prompt in ChatGPT if you want it to create a dedicated backend-planning tab inside the existing Nur Academy frontend:

```md
Act as a senior full-stack engineer and frontend architect.

You are inside the existing **Nur Academy** codebase only.

Important:
- Work only inside **Nur Academy**
- Do not reference or modify any other academy/project
- Nur Academy is currently **frontend-only**
- Build only the frontend for this task
- Do **not** implement the actual backend yet
- Reuse the existing code structure, design language, and admin workspace patterns

## Goal

Create a new **admin-only tab** inside the existing Nur Academy admin workspace called:

- `Backend Setup`

This tab should act as a **professional backend planning and integration control center** for the LMS.

It should not connect to a real backend yet, but it should prepare the project for backend implementation and make the platform feel production-ready.

## Context

Nur Academy already has a frontend LMS with:
- student role
- admin role
- login/register/forgot-password
- student dashboard
- admin dashboard
- course catalog
- course player
- enrollments
- certificates
- support/issues
- custom admin-added courses
- local browser storage mock state

## What To Build

Add a new admin tab named `Backend Setup` in the current admin module.

The tab should include structured sections/cards such as:

1. **Backend Status Overview**
- show that the app is currently in frontend/local-storage mode
- explain what is mocked locally
- explain what will move to backend later

2. **Auth Migration Checklist**
- student signup
- admin account seeding
- login
- forgot password
- session handling
- role checks

3. **Database Planning Section**
- show the planned entities for:
  - profiles
  - courses
  - course tracks
  - modules
  - lessons
  - enrollments
  - progress
  - certificates
  - payments
  - support tickets
- present them in a clean LMS-style UI

4. **Supabase Readiness Section**
- environment variables checklist
- auth setup checklist
- storage buckets checklist
- RLS / policy checklist
- edge function checklist

5. **Migration Map**
- show which current local-storage systems should later migrate to backend tables
- include:
  - users
  - enrollments
  - progress
  - certificates
  - support requests
  - custom courses

6. **Backend Modules Roadmap**
- auth
- user management
- course management
- enrollments
- progress tracking
- certificates
- payments
- support/issues

7. **Recommended Implementation Phases**
- phase 1 auth + profiles
- phase 2 course schema + lessons
- phase 3 enrollments + progress
- phase 4 certificates + support
- phase 5 payments + admin controls

8. **Notes / Warnings**
- explain that cross-device syncing is not active yet
- explain that current records are browser-local
- show why backend integration is needed

## UX / Design Requirements

- Keep the design aligned with the existing Nur Academy admin workspace
- Maintain the Islamic premium feel already in the app
- Use the existing palette and spacing system
- Make the tab polished on mobile, tablet, and desktop
- Avoid generic placeholder cards
- Use clear stats, badges, status labels, and structured sections
- Make it feel like a real internal operations tab

## Technical Requirements

- Reuse existing buttons, badges, layout helpers, and admin sidebar/tab patterns
- Keep all data frontend-only and mock/static for now
- Use maintainable arrays/config objects where helpful
- Do not break existing admin or student flows
- Keep the code modular and readable
- Remove dead code if necessary, but do not over-refactor unrelated parts

## Deliverables

Implement directly in the codebase:
- add the `Backend Setup` tab to the admin sidebar/navigation
- create the tab content
- ensure responsive layout
- make sure the app still builds successfully

## Output Expectation

At the end, provide:
- short summary of what was added
- key files changed
- assumptions made
- whether the build passes
```
