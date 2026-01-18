-- Hafta 2, Etkinlik 2: Duygu Kartları - Güncelleme

UPDATE activities
SET
  title = 'Duygu Kartları',
  description = 'Yüz ifadeleriyle duyguları tanıma oyunu. Yapay zekanın görsel verileri nasıl öğrendiğini eğlenceli bir şekilde keşfedin.',
  type = 'game',
  duration = 20,
  points = 10,
  instructions = 'Mutlu, üzgün, şaşkın ve kızgın yüz ifadeleri çizin. Taklit ve tahmin oyunuyla çocuğunuzla birlikte duygu tanıma pratiği yapın.',
  image_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/2.2.png'
WHERE week_number = 2
  AND age_min = 6
  AND age_max = 7
  AND (title LIKE '%Duygu%Kart%' OR title = 'Duygu Kartları');

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
  'Duygu Kartları',
  'Yüz ifadeleriyle duyguları tanıma oyunu. Yapay zekanın görsel verileri nasıl öğrendiğini eğlenceli bir şekilde keşfedin.',
  'game',
  20,
  6,
  7,
  2,
  10,
  ARRAY['Duygu yüzü kartları', 'Ayna (isteğe bağlı)'],
  'Mutlu, üzgün, şaşkın ve kızgın yüz ifadeleri çizin. Taklit ve tahmin oyunuyla çocuğunuzla birlikte duygu tanıma pratiği yapın.',
  'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/2.2.png'
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE title = 'Duygu Kartları' AND week_number = 2
);
