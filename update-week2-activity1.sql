-- Hafta 2, Etkinlik 1: Renk Gruplama Oyunu - Güncelleme

UPDATE activities
SET
  title = 'Renk Gruplama Oyunu',
  description = 'Nesneleri renklerine göre ayırarak yapay zekanın veriyi nasıl sınıflandırdığını keşfedin. Eğlenceli bir oyunla temel veri işleme kavramlarını öğrenin.',
  type = 'game',
  duration = 20,
  points = 10,
  instructions = 'Farklı renklerdeki nesneleri renklerine göre gruplara ayırın. "Renk Ayırma Robotu" olarak çocuğunuzla birlikte sınıflandırma oyunu oynayın.',
  image_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/2.1.png'
WHERE week_number = 2
  AND age_min <= 6
  AND (title LIKE '%Renk%Gruplama%' OR title = 'Renk Gruplama Oyunu');

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
  'Renk Gruplama Oyunu',
  'Nesneleri renklerine göre ayırarak yapay zekanın veriyi nasıl sınıflandırdığını keşfedin. Eğlenceli bir oyunla temel veri işleme kavramlarını öğrenin.',
  'game',
  20,
  4,
  8,
  2,
  10,
  ARRAY['Farklı renklerde küçük nesneler', 'Renkli kağıtlar veya kaseler'],
  'Farklı renklerdeki nesneleri renklerine göre gruplara ayırın. "Renk Ayırma Robotu" olarak çocuğunuzla birlikte sınıflandırma oyunu oynayın.',
  'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/2.1.png'
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE title = 'Renk Gruplama Oyunu' AND week_number = 2
);
