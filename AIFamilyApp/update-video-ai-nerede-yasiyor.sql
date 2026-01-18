-- "AI Nerede Yaşıyor?" dersinin video bölümünü ekle/güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{video_section}',
  jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/1.3-ai-nerede-yasiyor.mp4',
    'duration', 180,
    'description', 'Yapay zeka nerede yaşıyor? Telefonunuzda, evde, sokakta... AI''yı her yerde bulun!'
  )
)
WHERE id = '35c2dd0a-69e2-4fa4-ab0e-2ff516bc1b07';
