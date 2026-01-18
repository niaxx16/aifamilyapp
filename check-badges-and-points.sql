-- Check earned_badges table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'earned_badges'
ORDER BY ordinal_position;

-- Check if there's any data in earned_badges
SELECT * FROM earned_badges LIMIT 10;

-- Check parent_profiles total_points
SELECT id, name, total_points FROM parent_profiles;

-- Check badges table
SELECT * FROM badges;
