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
  display_name text,
  location text,
  email text,
  specialisations text[],
  bio text,
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

create table user_account_options (
  user_id uuid primary key references users(id) on delete cascade,
  public_profile boolean not null default true,
  show_availability boolean not null default true,
  show_counts boolean not null default true,
  dm_requests boolean not null default true,
  booking_intros boolean not null default true,
  email_updates boolean not null default false,
  weekly_digest boolean not null default false,
  analytics_sharing boolean not null default false,
  updated_at timestamptz not null default now()
);

create table user_booking_settings (
  user_id uuid primary key references users(id) on delete cascade,
  status text not null default 'open' check (status in ('open','limited','closed')),
  min_notice text not null default '24 hours',
  max_advance text not null default '1 month',
  deposit_required text not null default 'No deposit',
  cancellation_policy text not null default 'Flexible (24h notice)',
  updated_at timestamptz not null default now()
);

create table user_booking_session_types (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  duration_label text,
  price_label text,
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index user_booking_session_types_user_id_idx on user_booking_session_types(user_id);

create table user_booking_requirements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  requirement_key text not null,
  is_enabled boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, requirement_key)
);

create index user_booking_requirements_user_id_idx on user_booking_requirements(user_id);

create table user_profile_display_settings (
  user_id uuid primary key references users(id) on delete cascade,
  banner_image_url text,
  layout_style text not null default 'grid' check (layout_style in ('grid','masonry','carousel')),
  show_followers boolean not null default true,
  show_experience boolean not null default true,
  show_location boolean not null default true,
  show_socials boolean not null default true,
  show_verified boolean not null default false,
  social_instagram text,
  social_facebook text,
  social_youtube text,
  social_x text,
  social_website text,
  updated_at timestamptz not null default now()
);
