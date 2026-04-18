-- ─────────────────────────────────────────────────────────────
-- Legacy Letters — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES ──────────────────────────────────────────────────
-- Extends Supabase auth.users with app-specific data
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null,
  full_name     text,
  letter_credits integer not null default 1,  -- 1 free trial credit on signup
  has_paid      boolean not null default false,
  referral_code text unique default substr(md5(random()::text), 1, 8),
  referred_by   text,
  consent_given boolean not null default false,
  consent_date  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, consent_given, consent_date)
  values (
    new.id,
    new.email,
    coalesce((new.raw_user_meta_data->>'consent_given')::boolean, false),
    case
      when new.raw_user_meta_data->>'consent_date' is not null
      then (new.raw_user_meta_data->>'consent_date')::timestamptz
      else now()
    end
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── LETTERS ───────────────────────────────────────────────────
create table if not exists public.letters (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references public.profiles(id) on delete cascade,
  recipient_name      text not null,
  recipient_email     text not null,
  recipient_relationship text,
  sender_name         text not null,
  from_note           text,
  event_type          text not null check (event_type in ('birthday','wedding','anniversary','graduation')),
  event_date          date not null,
  prompt_used         text,
  transcript          text,
  letter_text         text,
  year_referenced     text,
  status              text not null default 'draft'
                      check (status in ('draft','scheduled','sent','failed')),
  audio_storage_path  text,          -- Supabase Storage path
  pdf_storage_path    text,          -- Supabase Storage path
  -- Mailing address (optional)
  mailing_line1       text,
  mailing_line2       text,
  mailing_city        text,
  mailing_state       text,
  mailing_zip         text,
  mailing_country     text default 'US',
  -- Physical delivery
  physical_requested  boolean default false,
  physical_status     text check (physical_status in ('pending','printing','mailed','delivered')),
  lob_postcard_id     text,          -- Lob postcard ID after creation
  -- Package info
  package_id          text,
  stripe_session_id   text,
  -- Scheduling
  scheduled_send_at   timestamptz,   -- NULL = not scheduled
  sent_at             timestamptz,
  -- Timestamps
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ── PACKAGES / PURCHASES ──────────────────────────────────────
create table if not exists public.purchases (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references public.profiles(id) on delete cascade,
  stripe_session_id text unique,
  package_id        text not null,   -- 'pkg_3', 'pkg_6', 'pkg_10'
  letter_count      integer not null,
  amount_cents      integer not null,
  currency          text not null default 'usd',
  status            text not null default 'pending'
                    check (status in ('pending','paid','refunded','failed')),
  created_at        timestamptz not null default now()
);

-- ── EMAIL DELIVERY LOG ────────────────────────────────────────
create table if not exists public.email_deliveries (
  id          uuid primary key default uuid_generate_v4(),
  letter_id   uuid not null references public.letters(id) on delete cascade,
  to_email    text not null,
  subject     text,
  resend_id   text,           -- Resend message ID for tracking
  status      text not null default 'queued'
              check (status in ('queued','sent','delivered','bounced','failed')),
  sent_at     timestamptz,
  created_at  timestamptz not null default now()
);

-- ── UPDATED_AT TRIGGER ────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_letters_updated_at
  before update on public.letters
  for each row execute function public.set_updated_at();

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ── ROW LEVEL SECURITY ────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.letters enable row level security;
alter table public.purchases enable row level security;
alter table public.email_deliveries enable row level security;

-- Profiles: users see only their own
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Letters: users see only their own
create policy "Users can view own letters"
  on public.letters for select
  using (auth.uid() = user_id);

create policy "Users can insert own letters"
  on public.letters for insert
  with check (auth.uid() = user_id);

create policy "Users can update own letters"
  on public.letters for update
  using (auth.uid() = user_id);

create policy "Users can delete own draft letters"
  on public.letters for delete
  using (auth.uid() = user_id and status = 'draft');

-- Purchases: users see only their own
create policy "Users can view own purchases"
  on public.purchases for select
  using (auth.uid() = user_id);

-- Email deliveries: users see deliveries for their letters
create policy "Users can view own email deliveries"
  on public.email_deliveries for select
  using (
    exists (
      select 1 from public.letters
      where letters.id = email_deliveries.letter_id
        and letters.user_id = auth.uid()
    )
  );

-- ── STORAGE BUCKETS ───────────────────────────────────────────
-- Run these in Supabase Dashboard → Storage → New bucket
-- Or uncomment if using Supabase CLI:

-- insert into storage.buckets (id, name, public) values ('audio', 'audio', false);
-- insert into storage.buckets (id, name, public) values ('pdfs', 'pdfs', false);

-- Storage RLS: users can only access their own files
-- (paths are structured as: {user_id}/{letter_id}.{ext})

-- create policy "Users can upload own audio"
--   on storage.objects for insert
--   with check (bucket_id = 'audio' and auth.uid()::text = (storage.foldername(name))[1]);

-- create policy "Users can read own audio"
--   on storage.objects for select
--   using (bucket_id = 'audio' and auth.uid()::text = (storage.foldername(name))[1]);

-- create policy "Users can upload own pdfs"
--   on storage.objects for insert
--   with check (bucket_id = 'pdfs' and auth.uid()::text = (storage.foldername(name))[1]);

-- create policy "Users can read own pdfs"
--   on storage.objects for select
--   using (bucket_id = 'pdfs' and auth.uid()::text = (storage.foldername(name))[1]);

-- ── INDEXES ───────────────────────────────────────────────────
create index if not exists letters_user_id_idx on public.letters(user_id);
create index if not exists letters_status_idx on public.letters(status);
create index if not exists letters_event_date_idx on public.letters(event_date);
create index if not exists letters_scheduled_send_at_idx on public.letters(scheduled_send_at)
  where scheduled_send_at is not null and status = 'scheduled';
create index if not exists purchases_user_id_idx on public.purchases(user_id);
create index if not exists email_deliveries_letter_id_idx on public.email_deliveries(letter_id);
