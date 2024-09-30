-- Migration script to alter users table

-- Alter table users to add created_at column
ALTER TABLE public.users
ADD COLUMN created_at timestamp with time zone DEFAULT current_timestamp NOT NULL;