# Nur Academy Backend Prompt

Use the following prompt in ChatGPT when you are ready to generate the backend for Nur Academy:

```md
Act as a senior backend architect and product-minded full-stack engineer.

You are designing the backend for **Nur Academy**, an Islamic LMS platform.

Important constraints:
- This is for **Nur Academy only**
- Roles must be **only 2 roles**:
  1. `student`
  2. `admin`
- Do **not** introduce teacher, instructor, staff, or super-admin roles
- The current project already has a **frontend-only LMS** built in React/Vite
- The current frontend already includes:
  - student login/signup
  - admin login
  - student dashboard
  - admin dashboard
  - course catalog
  - enrollments
  - lesson player
  - progress tracking
  - certificates
  - support/issues
  - local browser storage mocks
- We now want a **real production-ready backend design**
- Prefer **Supabase-first architecture**
- Keep the design clean, scalable, secure, and practical for a real LMS

## Product Scope

Nur Academy needs backend support for:
- authentication
- student/admin role management
- course catalog
- lessons
- multilingual or multi-track courses where needed
- enrollments
- lesson progress tracking
- watch progress / certificate eligibility tracking
- certificates
- payments
- support/issues system
- admin course management
- admin student management

## What I need from you

Design the backend in a way that is implementation-ready. I want a response that covers:

1. **Architecture Overview**
- Recommended backend architecture for this LMS
- Why Supabase is a good fit here
- Which responsibilities should live in:
  - Supabase Auth
  - PostgreSQL tables
  - Row Level Security
  - Storage
  - Edge Functions / server functions
- Any optional services for payments, email, and PDF certificates

2. **Database Schema**
- Design the full relational schema
- Include core tables for:
  - profiles
  - roles
  - courses
  - course_tracks or language variants if needed
  - modules
  - lessons
  - enrollments
  - lesson_progress
  - course_progress
  - watch_tracking if needed
  - certificates
  - payments
  - payment_reviews or approvals if useful
  - support_tickets
  - support_messages or admin_notes if useful
  - audit logs if recommended
- For each table provide:
  - table purpose
  - important columns
  - primary keys
  - foreign keys
  - indexes
  - status fields / enums
- Mention which fields are required and which should be unique

3. **Supabase Table Design**
- Recommend the exact Supabase/Postgres tables
- Show how `auth.users` connects to app tables
- Recommend how to structure the `profiles` table
- Recommend whether roles should live in:
  - `profiles.role`
  - or a separate `user_roles` table
- Explain the tradeoff and give the best option for this project

4. **Row Level Security Policies**
- Provide recommended RLS policies for all major tables
- Students should only be able to:
  - read their own profile
  - update their own allowed profile fields
  - see public/published courses
  - see their own enrollments
  - see their own progress
  - see their own certificates
  - create their own support tickets
  - read their own support conversations
- Admins should be able to:
  - manage users
  - manage courses
  - manage lessons/modules
  - view all enrollments/progress
  - manage certificates
  - manage support tickets
  - review payments
- Include policy examples or SQL where useful

5. **Auth Design**
- Design the authentication and authorization flow
- Public signup must create **student accounts only**
- Admin accounts must not be created from public signup
- Recommend secure admin creation strategy
- Include:
  - signup
  - login
  - forgot password
  - email verification
  - session handling
  - route protection strategy
  - role-based access checks

6. **Course Structure Design**
- Courses must support:
  - free or paid pricing
  - published/draft visibility
  - playlists / video-based lessons
  - structured modules and lessons
  - optional course tracks such as:
    - Aqidah Urdu
    - Aqidah English
    - Hajj / Umrah options
    - Qaida variants
- Recommend the best schema to support:
  - one course with multiple tracks
  - track-specific lessons
  - track-specific enrollment choice

7. **Progress Tracking**
- Design a robust progress system for:
  - enrolled students
  - completed lessons
  - watch percentage where applicable
  - overall course completion percentage
  - continue-learning state
- Explain what should be stored at:
  - lesson level
  - module level
  - course level
- Include how certificate eligibility should be computed

8. **Certificates**
- Design certificate issuance backend logic
- Include:
  - unique certificate ID generation
  - issuance rules
  - eligibility conditions
  - certificate verification lookup
  - optional PDF storage strategy
- Recommend tables and fields for certificate templates/settings if needed

9. **Payments**
- Design a practical payment model even if payment UI is added later
- Include:
  - payment records
  - pricing snapshots
  - currency
  - payment status
  - manual approval or bank-transfer review if relevant
  - Stripe option if recommended
- Explain what the admin should see/review

10. **Support / Issue System**
- Design a clean support system for:
  - student-created tickets
  - admin updates
  - ticket statuses
  - notes / resolution tracking
- Recommend whether this should be:
  - one table
  - or tickets + messages tables

11. **API / Service Layer**
- Even if Supabase is used directly, define a clean API/service structure for the frontend
- Propose:
  - endpoint list or service methods
  - naming conventions
  - folder/module structure
- Include example endpoints or functions for:
  - auth
  - courses
  - enrollments
  - progress
  - certificates
  - payments
  - support
  - admin operations

12. **Storage Design**
- Recommend storage buckets if needed for:
  - certificate PDFs
  - logos/signatures/seals
  - course thumbnails
  - payment proof uploads
- Include security guidance for each bucket

13. **Recommended Backend Folder Structure**
- Propose a clean production-ready folder structure for:
  - Supabase SQL
  - edge functions
  - server utilities
  - validation schemas
  - service layer
  - admin-only logic

14. **Implementation Order**
- Give a practical phased build order:
  - Phase 1: auth + profiles + courses
  - Phase 2: enrollments + progress
  - Phase 3: certificates + support
  - Phase 4: payments + admin controls
- Mention dependencies between phases

15. **Migration Guidance**
- The frontend currently uses local storage mock data
- Explain how to migrate this frontend to the real backend later
- Mention:
  - replacing local auth
  - replacing local enrollments/progress
  - handling existing mock-only data

## Output Format

Return your answer in these sections:

1. Recommended Architecture
2. Database Schema
3. Supabase Tables and Relationships
4. RLS Policies
5. Auth and RBAC Flow
6. Course / Enrollment / Progress Design
7. Certificate Design
8. Payment Design
9. Support System Design
10. API / Service Layer
11. Storage Design
12. Folder Structure
13. Phased Implementation Plan
14. Risks and Best Practices

## Additional Requirements

- Be concrete, not generic
- Make the design production-minded
- Optimize for maintainability and security
- Assume the frontend is React/Vite and currently frontend-only
- Prefer pragmatic choices over overly complex enterprise patterns
- If you recommend SQL tables, include example columns
- If you recommend enums/status values, list them
- If you recommend policies, show examples
- Keep the solution realistic for a small-to-medium Islamic LMS product
```
