-- Create blogs table in Supabase
create table if not exists blogs (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  category text,
  keyword text,
  seo_score integer default 0,
  status text default 'draft',
  excerpt text,
  content jsonb not null,
  featured_image text,
  featured_image_base64 text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create agent_settings table in Supabase
create table if not exists agent_settings (
  id integer primary key default 1,
  blogs_per_day integer default 10,
  min_words integer default 1000,
  max_words integer default 2000,
  publishing_time text default '09:00',
  auto_publish boolean default true,
  target_country text default 'India',
  target_language text default 'English',
  target_audience text default 'Students, Career Switchers',
  website_niche text default 'IT Training',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create agent_runs table in Supabase
create table if not exists agent_runs (
  id text primary key,
  date text not null,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  topics_selected jsonb default '[]'::jsonb,
  blogs_generated integer default 0,
  blogs_published integer default 0,
  blogs_failed integer default 0,
  status text default 'running',
  logs jsonb default '[]'::jsonb,
  errors jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
