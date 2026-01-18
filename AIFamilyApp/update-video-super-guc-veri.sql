-- "AI'ın Süper Gücü: Veri" dersinin video bölümünü ekle/güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{video_section}',
  jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/1.4-super-guc-veri.mp4',
    'duration', 180,
    'description', 'Yapay zekanın en büyük gücü veri! Veri nedir, AI nasıl öğrenir ve kaliteli veri neden önemlidir?'
  )
)
WHERE id = '49b01d02-8ebf-4f0e-9d5b-d0fcd095e643';
