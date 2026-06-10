-- Nur Academy
-- Supabase schema + RLS setup
-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;
create extension if not exists citext;

do $$ begin
  create type public.app_role as enum ('student', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.enrollment_status as enum ('active', 'completed', 'cancelled', 'suspended');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.payment_status as enum ('pending', 'submitted', 'approved', 'rejected', 'paid', 'refunded');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.support_status as enum ('open', 'in_review', 'resolved', 'closed');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.support_category as enum ('course_help', 'certificate', 'account', 'course_request', 'general_support');
exception when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
      and p.is_blocked = false
  );
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext unique not null,
  full_name text not null,
  role public.app_role not null default 'student',
  country text default '',
  language_preference text default 'English / Arabic',
  avatar_url text,
  is_blocked boolean not null default false,
  blocked_reason text default '',
  joined_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  title_ar text,
  description text default '',
  instructor_name text not null default 'Nur Academy',
  category text not null default 'Fiqh',
  level text not null default 'Beginner',
  price numeric(10,2) not null default 0 check (price >= 0),
  currency text not null default 'USD',
  thumb_emoji text default '📘',
  theme_color text default '#0B5240',
  badge text default 'Featured',
  badge_color text default '#C9A84C',
  playlist_id text,
  is_published boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_tracks (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  track_key text not null,
  label text not null,
  note text default '',
  language_code text,
  playlist_id text,
  first_video_id text,
  is_default boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, track_key)
);

create unique index if not exists course_tracks_one_default_per_course_idx
  on public.course_tracks (course_id)
  where is_default = true;

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  track_id uuid references public.course_tracks(id) on delete cascade,
  title text not null,
  description text default '',
  icon text default '📘',
  sort_order integer not null default 1,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  track_id uuid references public.course_tracks(id) on delete cascade,
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title text not null,
  description text default '',
  youtube_id text,
  video_url text,
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  duration_label text,
  is_free_preview boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  track_id uuid references public.course_tracks(id) on delete set null,
  status public.enrollment_status not null default 'active',
  payment_status public.payment_status not null default 'pending',
  payment_required boolean not null default false,
  enrolled_at timestamptz not null default now(),
  approved_at timestamptz,
  last_accessed_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists public.lesson_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  track_id uuid references public.course_tracks(id) on delete set null,
  module_id uuid not null references public.course_modules(id) on delete cascade,
  watched_seconds integer not null default 0 check (watched_seconds >= 0),
  last_position_seconds integer not null default 0 check (last_position_seconds >= 0),
  watch_percent numeric(5,2) not null default 0 check (watch_percent >= 0 and watch_percent <= 100),
  is_completed boolean not null default false,
  completed_at timestamptz,
  last_viewed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table if not exists public.course_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  track_id uuid references public.course_tracks(id) on delete set null,
  completed_lessons_count integer not null default 0 check (completed_lessons_count >= 0),
  total_lessons_count integer not null default 0 check (total_lessons_count >= 0),
  progress_percent numeric(5,2) not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  last_lesson_id uuid references public.lessons(id) on delete set null,
  certificate_eligible boolean not null default false,
  is_completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  track_id uuid references public.course_tracks(id) on delete set null,
  enrollment_id uuid references public.enrollments(id) on delete set null,
  certificate_code text not null unique,
  verification_token uuid not null default gen_random_uuid() unique,
  completion_date date not null default current_date,
  issued_at timestamptz not null default now(),
  pdf_path text,
  issued_by uuid references public.profiles(id) on delete set null,
  unique (user_id, course_id)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  enrollment_id uuid references public.enrollments(id) on delete set null,
  amount numeric(10,2) not null check (amount >= 0),
  currency text not null default 'USD',
  method text not null default 'manual',
  provider text,
  provider_payment_id text,
  proof_path text,
  status public.payment_status not null default 'pending',
  admin_note text,
  metadata jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete set null,
  enrollment_id uuid references public.enrollments(id) on delete set null,
  category public.support_category not null default 'general_support',
  subject text not null,
  message text not null,
  screenshot_path text,
  status public.support_status not null default 'open',
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references public.profiles(id) on delete set null
);

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists courses_published_idx on public.courses(is_published);
create index if not exists courses_created_by_idx on public.courses(created_by);
create index if not exists course_tracks_course_idx on public.course_tracks(course_id, sort_order);
create index if not exists modules_course_idx on public.course_modules(course_id, sort_order);
create index if not exists modules_track_idx on public.course_modules(track_id, sort_order);
create index if not exists lessons_course_idx on public.lessons(course_id, sort_order);
create index if not exists lessons_module_idx on public.lessons(module_id, sort_order);
create index if not exists lessons_track_idx on public.lessons(track_id, sort_order);
create index if not exists enrollments_user_idx on public.enrollments(user_id, enrolled_at desc);
create index if not exists enrollments_course_idx on public.enrollments(course_id);
create index if not exists lesson_progress_course_idx on public.lesson_progress(user_id, course_id);
create index if not exists course_progress_updated_idx on public.course_progress(user_id, updated_at desc);
create index if not exists certificates_user_idx on public.certificates(user_id, issued_at desc);
create index if not exists payments_user_idx on public.payments(user_id, submitted_at desc);
create index if not exists support_tickets_user_idx on public.support_tickets(user_id, created_at desc);
create index if not exists support_tickets_status_idx on public.support_tickets(status, updated_at desc);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
before update on public.courses
for each row execute procedure public.set_updated_at();

drop trigger if exists course_tracks_set_updated_at on public.course_tracks;
create trigger course_tracks_set_updated_at
before update on public.course_tracks
for each row execute procedure public.set_updated_at();

drop trigger if exists course_modules_set_updated_at on public.course_modules;
create trigger course_modules_set_updated_at
before update on public.course_modules
for each row execute procedure public.set_updated_at();

drop trigger if exists lessons_set_updated_at on public.lessons;
create trigger lessons_set_updated_at
before update on public.lessons
for each row execute procedure public.set_updated_at();

drop trigger if exists course_progress_set_updated_at on public.course_progress;
create trigger course_progress_set_updated_at
before update on public.course_progress
for each row execute procedure public.set_updated_at();

drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at
before update on public.payments
for each row execute procedure public.set_updated_at();

drop trigger if exists support_tickets_set_updated_at on public.support_tickets;
create trigger support_tickets_set_updated_at
before update on public.support_tickets
for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, ''), '@', 1), 'Nur Student'),
    'student'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.protect_profile_admin_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    new.role := old.role;
    new.is_blocked := old.is_blocked;
    new.blocked_reason := old.blocked_reason;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_admin_fields on public.profiles;
create trigger protect_profile_admin_fields
before update on public.profiles
for each row execute procedure public.protect_profile_admin_fields();

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_tracks enable row level security;
alter table public.course_modules enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.course_progress enable row level security;
alter table public.certificates enable row level security;
alter table public.payments enable row level security;
alter table public.support_tickets enable row level security;

drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
on public.profiles
for select
to authenticated
using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin"
on public.profiles
for update
to authenticated
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_delete_admin_only" on public.profiles;
create policy "profiles_delete_admin_only"
on public.profiles
for delete
to authenticated
using (public.is_admin());

drop policy if exists "courses_public_read" on public.courses;
create policy "courses_public_read"
on public.courses
for select
to anon, authenticated
using (is_published = true or public.is_admin());

drop policy if exists "courses_admin_manage" on public.courses;
create policy "courses_admin_manage"
on public.courses
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "course_tracks_public_read" on public.course_tracks;
create policy "course_tracks_public_read"
on public.course_tracks
for select
to anon, authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.courses c
    where c.id = course_tracks.course_id
      and c.is_published = true
  )
  or public.is_admin()
);

drop policy if exists "course_tracks_admin_manage" on public.course_tracks;
create policy "course_tracks_admin_manage"
on public.course_tracks
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "course_modules_public_read" on public.course_modules;
create policy "course_modules_public_read"
on public.course_modules
for select
to anon, authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.courses c
    where c.id = course_modules.course_id
      and c.is_published = true
  )
  or public.is_admin()
);

drop policy if exists "course_modules_admin_manage" on public.course_modules;
create policy "course_modules_admin_manage"
on public.course_modules
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "lessons_public_read" on public.lessons;
create policy "lessons_public_read"
on public.lessons
for select
to anon, authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.courses c
    where c.id = lessons.course_id
      and c.is_published = true
  )
  or public.is_admin()
);

drop policy if exists "lessons_admin_manage" on public.lessons;
create policy "lessons_admin_manage"
on public.lessons
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "enrollments_student_read_or_admin" on public.enrollments;
create policy "enrollments_student_read_or_admin"
on public.enrollments
for select
to authenticated
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "enrollments_student_create_or_admin" on public.enrollments;
create policy "enrollments_student_create_or_admin"
on public.enrollments
for insert
to authenticated
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "enrollments_admin_update" on public.enrollments;
create policy "enrollments_admin_update"
on public.enrollments
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "enrollments_admin_delete" on public.enrollments;
create policy "enrollments_admin_delete"
on public.enrollments
for delete
to authenticated
using (public.is_admin());

drop policy if exists "lesson_progress_student_read_or_admin" on public.lesson_progress;
create policy "lesson_progress_student_read_or_admin"
on public.lesson_progress
for select
to authenticated
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "lesson_progress_student_write_or_admin" on public.lesson_progress;
create policy "lesson_progress_student_write_or_admin"
on public.lesson_progress
for insert
to authenticated
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "lesson_progress_student_update_or_admin" on public.lesson_progress;
create policy "lesson_progress_student_update_or_admin"
on public.lesson_progress
for update
to authenticated
using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "lesson_progress_admin_delete" on public.lesson_progress;
create policy "lesson_progress_admin_delete"
on public.lesson_progress
for delete
to authenticated
using (public.is_admin());

drop policy if exists "course_progress_student_read_or_admin" on public.course_progress;
create policy "course_progress_student_read_or_admin"
on public.course_progress
for select
to authenticated
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "course_progress_student_write_or_admin" on public.course_progress;
create policy "course_progress_student_write_or_admin"
on public.course_progress
for insert
to authenticated
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "course_progress_student_update_or_admin" on public.course_progress;
create policy "course_progress_student_update_or_admin"
on public.course_progress
for update
to authenticated
using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "course_progress_admin_delete" on public.course_progress;
create policy "course_progress_admin_delete"
on public.course_progress
for delete
to authenticated
using (public.is_admin());

drop policy if exists "certificates_student_read_or_admin" on public.certificates;
create policy "certificates_student_read_or_admin"
on public.certificates
for select
to authenticated
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "certificates_admin_manage" on public.certificates;
create policy "certificates_admin_manage"
on public.certificates
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "payments_student_read_or_admin" on public.payments;
create policy "payments_student_read_or_admin"
on public.payments
for select
to authenticated
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "payments_student_create_or_admin" on public.payments;
create policy "payments_student_create_or_admin"
on public.payments
for insert
to authenticated
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "payments_admin_update_delete" on public.payments;
create policy "payments_admin_update_delete"
on public.payments
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "payments_admin_delete" on public.payments;
create policy "payments_admin_delete"
on public.payments
for delete
to authenticated
using (public.is_admin());

drop policy if exists "support_student_read_or_admin" on public.support_tickets;
create policy "support_student_read_or_admin"
on public.support_tickets
for select
to authenticated
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "support_student_create_or_admin" on public.support_tickets;
create policy "support_student_create_or_admin"
on public.support_tickets
for insert
to authenticated
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "support_admin_update" on public.support_tickets;
create policy "support_admin_update"
on public.support_tickets
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "support_admin_delete" on public.support_tickets;
create policy "support_admin_delete"
on public.support_tickets
for delete
to authenticated
using (public.is_admin());

-- Optional storage buckets for screenshots and certificates
insert into storage.buckets (id, name, public)
values ('support-screenshots', 'support-screenshots', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('certificate-pdfs', 'certificate-pdfs', false)
on conflict (id) do nothing;

drop policy if exists "support_screenshots_student_upload" on storage.objects;
create policy "support_screenshots_student_upload"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'support-screenshots'
  and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
);

drop policy if exists "support_screenshots_read_own_or_admin" on storage.objects;
create policy "support_screenshots_read_own_or_admin"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'support-screenshots'
  and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
);

drop policy if exists "support_screenshots_admin_delete" on storage.objects;
create policy "support_screenshots_admin_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'support-screenshots' and public.is_admin());

drop policy if exists "certificate_pdfs_read_own_or_admin" on storage.objects;
create policy "certificate_pdfs_read_own_or_admin"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'certificate-pdfs'
  and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
);

drop policy if exists "certificate_pdfs_admin_upload" on storage.objects;
create policy "certificate_pdfs_admin_upload"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'certificate-pdfs' and public.is_admin());

drop policy if exists "certificate_pdfs_admin_delete" on storage.objects;
create policy "certificate_pdfs_admin_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'certificate-pdfs' and public.is_admin());
