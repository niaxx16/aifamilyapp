-- "Komut Vermek Önemlidir" dersinin video URL'sini güncelle
UPDATE lessons
SET module_content = jsonb_set(
  module_content,
  '{video_section,url}',
  '"https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/2.3-komut-vermek.mp4"'
)
WHERE id = '9fc09aa8-efce-4930-b283-d0df6b94f00a';
