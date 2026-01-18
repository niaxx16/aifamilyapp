-- Hafta 1, Etkinlik 1: Akıllı Cihaz Avı - Güncelleme
-- Mevcut etkinliğin başlığını ve içeriğini güncelle

UPDATE activities
SET
  title = 'Akıllı Cihaz Avı',
  description = 'Çocuğunuzla birlikte evinizdeki akıllı cihazları keşfedin. Bu eğlenceli avcılık oyunuyla yapay zeka kavramına ilk adımı atın.',
  type = 'exploration',
  duration = 20,
  points = 10,
  instructions = 'Evinizdeki akıllı cihazları bulma oyunu oynayın. Her cihaz için "Bu neden akıllı?" sorusunu sorun ve çocuğunuzun gözlemlerini dinleyin.',
  image_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/1.1.png'
WHERE week_number = 1
  AND (title LIKE '%Yapay Zeka%' OR title LIKE '%Evdeki%' OR title = 'Akıllı Cihaz Avı')
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
  'Akıllı Cihaz Avı',
  'Çocuğunuzla birlikte evinizdeki akıllı cihazları keşfedin. Bu eğlenceli avcılık oyunuyla yapay zeka kavramına ilk adımı atın.',
  'exploration',
  20,
  4,
  8,
  1,
  10,
  ARRAY['Akıllı telefon', 'Tablet', 'Akıllı TV', 'Sesli asistan'],
  'Evinizdeki akıllı cihazları bulma oyunu oynayın. Her cihaz için "Bu neden akıllı?" sorusunu sorun ve çocuğunuzun gözlemlerini dinleyin.',
  'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/1.1.png'
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE title = 'Akıllı Cihaz Avı' AND week_number = 1
);
