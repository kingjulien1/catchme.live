create table users (
  id uuid primary key default gen_random_uuid(),
  ig_user_id text not null unique,
  ig_scoped_user_id text,
  username text not null,
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
