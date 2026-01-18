-- ✅ BUG-H4 Fix: Badge Duplicate Creation Prevention
-- Add unique constraint to prevent duplicate badge awards

-- First, remove any existing duplicates (keep only the first earned_at)
DELETE FROM earned_badges a
USING earned_badges b
WHERE a.id > b.id
  AND a.parent_id = b.parent_id
  AND a.badge_type = b.badge_type;

-- Add unique constraint to prevent future duplicates
ALTER TABLE earned_badges
ADD CONSTRAINT unique_badge_per_parent UNIQUE (parent_id, badge_type);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_earned_badges_parent_type
ON earned_badges(parent_id, badge_type);
