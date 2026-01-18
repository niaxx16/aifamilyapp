-- Check parent_profiles table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'parent_profiles'
ORDER BY ordinal_position;

-- Check all parent_profiles records
SELECT *
FROM parent_profiles
ORDER BY created_at DESC;
