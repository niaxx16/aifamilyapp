-- Hafta 3, Etkinlik 3: "Eğer... O Zaman..." Oyunu - Güncelleme

UPDATE activities
SET
  title = '"Eğer... O Zaman..." Oyunu',
  description = 'Algoritmik düşünme oyunu. "Eğer... O zaman..." mantığıyla yapay zekanın karar verme sürecini fiziksel olarak deneyimleyin.',
  type = 'game',
  duration = 20,
  points = 10,
  instructions = 'Sihirli kelimelerle komut oyunu oynayın. "Eğer ben ellerimi çırparsam, o zaman sen zıpla" gibi kurallar koyun ve test edin.',
  image_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/3.3.png'
WHERE week_number = 3
  AND age_min = 6
  AND age_max = 7
  AND (title LIKE '%Eğer%Zaman%' OR title = '"Eğer... O Zaman..." Oyunu');

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
  '"Eğer... O Zaman..." Oyunu',
  'Algoritmik düşünme oyunu. "Eğer... O zaman..." mantığıyla yapay zekanın karar verme sürecini fiziksel olarak deneyimleyin.',
  'game',
  20,
  6,
  7,
  3,
  10,
  ARRAY['Sadece kendiniz ve hayal gücünüz!'],
  'Sihirli kelimelerle komut oyunu oynayın. "Eğer ben ellerimi çırparsam, o zaman sen zıpla" gibi kurallar koyun ve test edin.',
  'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/3.3.png'
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE title = '"Eğer... O Zaman..." Oyunu' AND week_number = 3
);
