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

create table instagram_sync_settings (
  user_id uuid primary key references users(id) on delete cascade,
  auto_sync_posts boolean not null default true,
  import_captions boolean not null default true,
  include_videos boolean not null default true,
  sync_profile_photo boolean not null default false,
  show_followers boolean not null default true,
  show_instagram_link boolean not null default true,
  notify_sync_success boolean not null default true,
  notify_sync_error boolean not null default true,
  updated_at timestamptz not null default now()
);

create index instagram_sync_settings_user_id_idx on instagram_sync_settings(user_id);

create table venues (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references users(id) on delete set null,
  venue_name text not null,
  event_name text,
  description text,
  event_start_time timestamptz,
  event_end_time timestamptz,
  location_label text,
  address_line text,
  city text,
  country text,
  contact_email text,
  website_url text,
  ticket_url text,
  instagram_handle text,
  banner_image_url text,
  capacity integer,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table visits (
  id uuid primary key default gen_random_uuid(),
  author_user_id uuid not null references users(id) on delete cascade,
  venue_id uuid references venues(id) on delete set null,
  slug text unique,
  visit_type text not null check (visit_type in ('guest', 'residency', 'convention', 'workshop', 'popup', 'other')),
  visit_location text,
  visit_start_time timestamptz,
  visit_end_time timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index visits_author_user_id_idx on visits(author_user_id);
create index visits_start_time_idx on visits(visit_start_time);
create index visits_status_idx on visits(status);

create table visit_options (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid not null references visits(id) on delete cascade,
  booking_status text check (booking_status in ('open', 'limited', 'closed')),
  booking_method text,
  cancellation_policy text,
  appointment_only boolean,
  deposit_required boolean,
  deposit_amount numeric(10, 2),
  price_min numeric(10, 2),
  price_max numeric(10, 2),
  age_policy text,
  digital_payments boolean,
  languages_spoken text,
  custom_requests boolean,
  walk_ins_welcome boolean,
  portfolio_photos boolean,
  flash_designs boolean,
  touch_ups_included boolean,
  cover_ups_accepted boolean,
  special_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (visit_id)
);

create index visit_options_visit_id_idx on visit_options(visit_id);

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

create table visit_linked_accounts (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid not null references visits(id) on delete cascade,
  account_user_id uuid references users(id) on delete set null,
  account_handle text not null,
  account_type text not null default 'destination' check (account_type in ('destination','partner')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index visit_linked_accounts_visit_id_idx on visit_linked_accounts(visit_id);
create index visit_linked_accounts_account_user_id_idx on visit_linked_accounts(account_user_id);
