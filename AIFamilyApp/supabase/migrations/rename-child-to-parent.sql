-- Rename child_profiles table to parent_profiles
ALTER TABLE child_profiles RENAME TO parent_profiles;

-- Rename child_id columns in related tables
ALTER TABLE user_progress RENAME COLUMN child_id TO parent_id;
ALTER TABLE earned_badges RENAME COLUMN child_id TO parent_id;

-- Update comments
COMMENT ON TABLE parent_profiles IS 'Ebeveyn profilleri - her ebeveyn icin ayri profil';
COMMENT ON COLUMN user_progress.parent_id IS 'Ebeveyn profil ID';
COMMENT ON COLUMN earned_badges.parent_id IS 'Ebeveyn profil ID';
