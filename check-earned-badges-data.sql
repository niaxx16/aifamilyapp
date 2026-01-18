-- Check all earned badges
SELECT
  id,
  parent_id,
  badge_type,
  badge_name,
  badge_emoji,
  category_id,
  earned_at
FROM earned_badges
ORDER BY earned_at DESC;

-- Check if there are any badges at all
SELECT COUNT(*) as total_badges FROM earned_badges;

-- Check the specific parent_id we're looking for
SELECT * FROM earned_badges
WHERE parent_id = '2edfe91e-b84d-4822-9eb9-cc7c21b60f7b';

-- Check RLS policies on earned_badges
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'earned_badges';
