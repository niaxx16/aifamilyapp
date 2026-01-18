-- Hafta 3, Etkinlik 1: Müzik ve Ritim - Güncelleme

UPDATE activities
SET
  title = 'Müzik ve Ritim',
  description = 'İşitsel desen tanıma oyunu. Ritim desenleri oluşturarak yapay zekanın tahmin yeteneğini keşfedin.',
  type = 'game',
  duration = 20,
  points = 10,
  instructions = 'Basit ritim desenleri oluşturun ve çocuğunuzla birlikte tekrarlayın. Ritim robotları olarak desen tanıma pratiği yapın.',
  image_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/3.1.png'
WHERE week_number = 3
  AND age_min = 6
  AND age_max = 7
  AND (title LIKE '%Müzik%Ritim%' OR title = 'Müzik ve Ritim');

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
  'Müzik ve Ritim',
  'İşitsel desen tanıma oyunu. Ritim desenleri oluşturarak yapay zekanın tahmin yeteneğini keşfedin.',
  'game',
  20,
  6,
  7,
  3,
  10,
  ARRAY['Müzik aleti veya alkış'],
  'Basit ritim desenleri oluşturun ve çocuğunuzla birlikte tekrarlayın. Ritim robotları olarak desen tanıma pratiği yapın.',
  'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/3.1.png'
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE title = 'Müzik ve Ritim' AND week_number = 3
);
