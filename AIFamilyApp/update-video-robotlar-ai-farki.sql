-- "Robotlar ve AI Farkı" dersinin video bölümünü ekle/güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{video_section}',
  jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/1.2-robotlar-ve-ai-farki.mp4',
    'duration', 180,
    'description', 'Robot ve yapay zeka aynı şey mi? Aralarındaki farkı eğlenceli örneklerle öğrenin!'
  )
)
WHERE id = '33907d03-c801-416b-b923-8cccdcacc2f6';
