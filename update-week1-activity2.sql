-- Hafta 1, Etkinlik 2: Robot Arkadaşım - Güncelleme

UPDATE activities
SET
  title = 'Robot Arkadaşım',
  description = 'Yaratıcı rol yapma oyunuyla algoritma mantığını fiziksel olarak deneyimleyin. Komutların net olması gerektiğini eğlenceli bir şekilde öğrenin.',
  type = 'creative',
  duration = 25,
  points = 10,
  instructions = 'Bir robot ve programcı rol yapma oyunu oynayın. Robot rolündeki kişi sadece net komutlarla hareket eder. Adım adım talimatların önemini eğlenceli şekilde keşfedin.',
  image_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/1.2.png'
WHERE week_number = 1
  AND (title LIKE '%Robot%' OR title LIKE '%Sesli%' OR title = 'Robot Arkadaşım')
  AND age_min <= 6;

-- Eğer etkinlik yoksa ekle
INSERT INTO activities (
  title,
  description,
  type,
  duration,
  age_min,
  age_max,
  week_number,
  points,
  materials,
  instructions,
  image_url
)
SELECT
  'Robot Arkadaşım',
  'Yaratıcı rol yapma oyunuyla algoritma mantığını fiziksel olarak deneyimleyin. Komutların net olması gerektiğini eğlenceli bir şekilde öğrenin.',
  'creative',
  25,
  4,
  8,
  1,
  10,
  ARRAY['Hayal gücü'],
  'Bir robot ve programcı rol yapma oyunu oynayın. Robot rolündeki kişi sadece net komutlarla hareket eder. Adım adım talimatların önemini eğlenceli şekilde keşfedin.',
  'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/1.2.png'
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE title = 'Robot Arkadaşım' AND week_number = 1
);
