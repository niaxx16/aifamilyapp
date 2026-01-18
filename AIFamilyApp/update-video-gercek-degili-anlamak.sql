-- "Gerçek Değili Anlamak" dersinin video bölümünü ekle/güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{video_section}',
  jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/2.4-gercek-degili-anlamak.mp4',
    'duration', 180,
    'description', 'Deepfake nedir? AI üretimi içerikleri nasıl tanırız? Gerçek ve sahte arasındaki farkı öğrenin!'
  )
)
WHERE id = '3883a806-4dda-44cb-b291-a4a987f9a3ba';
