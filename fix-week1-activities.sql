-- Hafta 1 etkinliklerini düzeltme

-- 1. Önce mevcut durumu görelim (bu sorguyu önce çalıştırın ve sonucu kontrol edin)
-- SELECT id, title, week_number, age_min, age_max, created_at FROM activities WHERE week_number = 1 ORDER BY title;

-- 2. Mükerrer "Robot Arkadaşım" kayıtlarından en eski olanları (veya istemediğiniz olanı) silin
-- Önce hangi kayıtlar olduğunu görmek için:
SELECT id, title, created_at, image_url FROM activities
WHERE week_number = 1 AND title = 'Robot Arkadaşım'
ORDER BY created_at;

-- En son eklenen (veya image_url olmayan) mükerrer kaydı silmek için:
-- DELETE FROM activities
-- WHERE id = 'BURAYA_SILINECEK_KAYDIN_ID_SINI_YAZI';

-- 3. "Yapay Zeka Nedir?" etkinliğinin olup olmadığını kontrol edin
SELECT id, title, week_number FROM activities
WHERE week_number = 1 AND title = 'Yapay Zeka Nedir?';

-- 4. Eğer "Yapay Zeka Nedir?" yoksa, ekleyin:
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
  'Yapay Zeka Nedir?',
  'Hikaye anlatımı ile yapay zeka kavramını tanıyın. Sihirli "öğrenme tozu" benzetmesiyle soyut kavramı somutlaştırın.',
  'conversation',
  15,
  4,
  8,
  1,
  10,
  ARRAY['Çocuğun sevdiği oyuncak'],
  'Çocuğunuzun sevdiği bir oyuncak elinize alın ve yapay zekayı "sihirli öğrenme tozu" benzetmesiyle tanıtın. Basit bir dille, oyun içinde yapay zekanın ne olduğunu anlatın.',
  'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/1.3.png'
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE title = 'Yapay Zeka Nedir?' AND week_number = 1
);
