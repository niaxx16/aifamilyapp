-- Add current_week column to parent_profiles table
-- This tracks which week's activities the child is currently on

ALTER TABLE parent_profiles
ADD COLUMN IF NOT EXISTS current_week INTEGER DEFAULT 1;

-- Update existing child profiles to start at week 1
UPDATE parent_profiles
SET current_week = 1
WHERE current_week IS NULL;
