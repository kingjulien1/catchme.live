create table users (
  id uuid primary key default gen_random_uuid(),
  ig_user_id text unique,
  ig_scoped_user_id text,
  username text not null unique,
  name text,
  account_type text,
  profile_picture_url text,
  followers_count integer,
  media_count integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table instagram_tokens (
  user_id uuid primary key references users(id) on delete cascade,
  access_token_encrypted text not null,
  token_expires_at timestamptz,
  updated_at timestamptz not null default now()
);

create table visits (
  id uuid primary key default gen_random_uuid(),
  author_user_id uuid not null references users(id) on delete cascade,
  destination_user_id uuid references users(id) on delete set null,
  destination_instagram_handle text not null,
  visit_location text not null,
  visit_start_time timestamptz not null,
  visit_end_time timestamptz,
  visit_type text not null check (visit_type in ('guest', 'residency', 'convention', 'workshop', 'popup', 'other')),
  description text,
  bookings_open boolean not null default false,
  appointment_only boolean not null default false,
  age_18_plus boolean not null default false,
  deposit_required boolean not null default false,
  digital_payments boolean not null default false,
  custom_requests boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index visits_author_user_id_idx on visits(author_user_id);
create index visits_destination_user_id_idx on visits(destination_user_id);
create index visits_start_time_idx on visits(visit_start_time);
create index visits_status_idx on visits(status);
