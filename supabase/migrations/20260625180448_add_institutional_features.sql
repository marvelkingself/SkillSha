-- Create courses registry table
create table courses_registry (
  id uuid default gen_random_uuid() primary key,
  course_id text not null,
  module_title text not null,
  lesson_title text not null,
  lesson_content text not null,
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create student progress table
create table student_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references users(id) on delete cascade,
  course_id text not null,
  completed_lessons text[] default '{}'::text[] not null,
  last_accessed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  progress_percentage numeric default 0 not null,
  unique (user_id, course_id)
);

-- Create assignments table
create table assignments (
  id uuid default gen_random_uuid() primary key,
  course_id text not null,
  title text not null,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create submissions table
create table submissions (
  id uuid default gen_random_uuid() primary key,
  student_id uuid not null references users(id) on delete cascade,
  assignment_id uuid not null references assignments(id) on delete cascade,
  file_url text not null,
  grade text,
  feedback text,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create bulletins table
create table bulletins (
  id uuid default gen_random_uuid() primary key,
  course_id text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create presentations table
create table presentations (
  id uuid default gen_random_uuid() primary key,
  course_id text not null,
  title text not null,
  slides_data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
