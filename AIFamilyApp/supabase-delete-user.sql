-- Delete user by email
-- Replace 'your-email@example.com' with the actual email address

-- First, find the user ID
SELECT id, email, created_at
FROM auth.users
WHERE email = 'your-email@example.com';

-- Delete from auth.users (this will cascade to public.users)
DELETE FROM auth.users
WHERE email = 'your-email@example.com';

-- Verify deletion
SELECT id, email
FROM auth.users
WHERE email = 'your-email@example.com';

-- If you see no results, the user was successfully deleted
