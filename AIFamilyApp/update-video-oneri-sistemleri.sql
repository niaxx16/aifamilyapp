-- "Öneri Sistemleri Nasıl Çalışır?" dersinin video bölümünü ekle/güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{video_section}',
  jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/2.2-oneri-sistemleri.mp4',
    'duration', 180,
    'description', 'YouTube, Netflix ve Spotify önerileri nasıl çalışır? Öneri algoritmalarının sırlarını öğrenin!'
  )
)
WHERE id = 'e8642f64-b8bc-4e8d-ab0a-c5f28951d3d5';
