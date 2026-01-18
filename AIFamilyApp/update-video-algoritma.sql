-- "Algoritma: AI'ın Tarif Defteri" dersinin video bölümünü ekle/güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{video_section}',
  jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/1.5-algoritma-tarif-defteri.mp4',
    'duration', 180,
    'description', 'Algoritma nedir? Yapay zeka nasıl adım adım düşünür? Tarif defteri benzetmesiyle öğrenin!'
  )
)
WHERE id = '2fa783d4-0659-4855-a486-30e1964b6dfd';
