-- Hafta 1, Etkinlik 3: Yapay Zeka Nedir? - Güncelleme

UPDATE activities
SET
  title = 'Yapay Zeka Nedir?',
  description = 'Hikaye anlatımı ile yapay zeka kavramını tanıyın. Sihirli "öğrenme tozu" benzetmesiyle soyut kavramı somutlaştırın.',
  type = 'conversation',
  duration = 15,
  points = 10,
  instructions = 'Çocuğunuzun sevdiği bir oyuncak elinize alın ve yapay zekayı "sihirli öğrenme tozu" benzetmesiyle tanıtın. Basit bir dille, oyun içinde yapay zekanın ne olduğunu anlatın.',
  image_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/1.3.png'
WHERE week_number = 1
  AND age_min <= 6
  AND (title LIKE '%Yapay Zeka%Nedir%' OR title = 'Yapay Zeka Nedir?');

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
