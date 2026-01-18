-- Yapay Zeka Nedir dersinin video_section URL'sini düzelt
UPDATE lessons
SET module_content = jsonb_set(
  module_content,
  '{video_section,url}',
  '"https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/1%20Yapay%20Zeka%20Nedir.mp4"'
)
WHERE id = 'e05e95e6-f8fe-4d78-beb0-18591840d11a';
