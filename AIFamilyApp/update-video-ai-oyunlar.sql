-- "Yapay Zeka ve Oyunlar" dersinin video bölümünü ekle/güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{video_section}',
  jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/2.1-yapay-zeka-ve-oyun.mp4',
    'duration', 180,
    'description', 'Oyunlardaki yapay zeka nasıl çalışır? NPC karakterler nasıl karar verir? Oyun AI dünyasını keşfedin!'
  )
)
WHERE id = 'a92f7aa4-f626-4787-a143-733c8f9cb582';
