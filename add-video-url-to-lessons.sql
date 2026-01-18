-- Add video_url column to lessons table

ALTER TABLE lessons
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Update first lesson with video URL
-- YouTube Shorts format: https://youtube.com/shorts/VIDEO_ID
-- Video ID: st6Dmj01nIY

UPDATE lessons
SET video_url = 'https://youtube.com/shorts/st6Dmj01nIY'
WHERE title = 'Yapay Zeka Nedir?';
