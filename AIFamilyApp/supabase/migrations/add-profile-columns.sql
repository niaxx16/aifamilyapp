-- Add missing columns to parent_profiles table for child profile creation
ALTER TABLE parent_profiles
ADD COLUMN IF NOT EXISTS nickname VARCHAR(100),
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS grade_level INTEGER,
ADD COLUMN IF NOT EXISTS gender VARCHAR(50),
ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT '👤',
ADD COLUMN IF NOT EXISTS interests TEXT[];

COMMENT ON COLUMN parent_profiles.nickname IS 'Profil ismi (ebeveyn veya cocuk)';
COMMENT ON COLUMN parent_profiles.age IS 'Yas bilgisi';
COMMENT ON COLUMN parent_profiles.grade_level IS 'Sinif seviyesi';
COMMENT ON COLUMN parent_profiles.gender IS 'Cinsiyet bilgisi';
COMMENT ON COLUMN parent_profiles.avatar IS 'Avatar emoji';
COMMENT ON COLUMN parent_profiles.interests IS 'Ilgi alanlari';
