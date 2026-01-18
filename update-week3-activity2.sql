-- Hafta 3, Etkinlik 2: Örüntü Blokları - Güncelleme

UPDATE activities
SET
  title = 'Örüntü Blokları',
  description = 'Görsel desen tanıma ve kural çıkarma oyunu. Blok örüntüleriyle yapay zekanın mantık yürütme yeteneğini keşfedin.',
  type = 'game',
  duration = 25,
  points = 10,
  instructions = 'Farklı renklerde blokları kullanarak basit örüntüler oluşturun. Çocuğunuzun kuralı keşfetmesini ve tahmin etmesini sağlayın.',
  image_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/3.2.png'
WHERE week_number = 3
  AND age_min = 6
  AND age_max = 7
  AND (title LIKE '%Örüntü%Blok%' OR title = 'Örüntü Blokları');

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
  'Örüntü Blokları',
  'Görsel desen tanıma ve kural çıkarma oyunu. Blok örüntüleriyle yapay zekanın mantık yürütme yeteneğini keşfedin.',
  'game',
  25,
  6,
  7,
  3,
  10,
  ARRAY['Farklı renklerde bloklar veya Legolar'],
  'Farklı renklerde blokları kullanarak basit örüntüler oluşturun. Çocuğunuzun kuralı keşfetmesini ve tahmin etmesini sağlayın.',
  'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/3.2.png'
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE title = 'Örüntü Blokları' AND week_number = 3
);
