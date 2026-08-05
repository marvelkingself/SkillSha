-- Create users table
create table users (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null unique,
  password text not null,
  program_interest text default 'AI Engineering Masterclass' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create bookings table
create table bookings (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  mobile text not null,
  date_time text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create certificates table
create table certificates (
  id uuid default gen_random_uuid() primary key,
  credential_id text not null unique,
  student_name text not null,
  course_name text not null,
  date_issued text not null,
  grade text not null,
  instructor text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create payments table
create table payments (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  program text not null,
  amount_type text not null,
  amount numeric not null,
  gst numeric not null,
  total numeric not null,
  payment_method text not null,
  status text default 'Success' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
