-- Supabase Storage video URL'sini güncelle

UPDATE lessons
SET video_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/1%20Yapay%20Zeka%20Nedir.mp4'
WHERE id = 'e05e95e6-f8fe-4d78-beb0-18591840d11a';

-- Kontrol et
SELECT title, video_url
FROM lessons
WHERE id = 'e05e95e6-f8fe-4d78-beb0-18591840d11a';
