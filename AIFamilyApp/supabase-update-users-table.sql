-- AI Family App - Users Table Update
-- Run this SQL in Supabase Dashboard SQL Editor

-- 1. Add missing columns to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'parent',
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 2. Add CHECK constraint for role
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'users_role_check'
  ) THEN
    ALTER TABLE public.users
    ADD CONSTRAINT users_role_check
    CHECK (role IN ('parent', 'child', 'admin'));
  END IF;
END $$;

-- 3. Set email column as NOT NULL
DO $$
BEGIN
  ALTER TABLE public.users
  ALTER COLUMN email SET NOT NULL;
EXCEPTION
  WHEN others THEN
    NULL;
END $$;

-- 4. Add UNIQUE constraint for email
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'users_email_key'
  ) THEN
    ALTER TABLE public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
  END IF;
END $$;

-- 5. Update existing users full_name from email
UPDATE public.users
SET full_name = COALESCE(full_name, SPLIT_PART(email, '@', 1))
WHERE full_name IS NULL;

-- 6. Set full_name as NOT NULL
ALTER TABLE public.users
ALTER COLUMN full_name SET NOT NULL;

-- 7. Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 8. Recreate trigger
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Success! Users table updated.
