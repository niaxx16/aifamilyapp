-- Hafta 2, Etkinlik 3: Benim Verilerim - Güncelleme

UPDATE activities
SET
  title = 'Benim Verilerim',
  description = 'Kişisel veri kavramına sanat yoluyla giriş yapın. Çocuğunuzun tercihlerini ve özelliklerini görselleştirerek "veri" kavramını keşfedin.',
  type = 'creative',
  duration = 25,
  points = 10,
  instructions = 'Çocuğunuzla birlikte kişisel özelliklerini anlatan bir poster oluşturun. Sevdiği renkler, yemekler, oyuncaklar gibi bilgileri resimlerle ifade edin.',
  image_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/2.3.png'
WHERE week_number = 2
  AND age_min = 6
  AND age_max = 7
  AND (title LIKE '%Benim%Verilerim%' OR title = 'Benim Verilerim');

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
  'Benim Verilerim',
  'Kişisel veri kavramına sanat yoluyla giriş yapın. Çocuğunuzun tercihlerini ve özelliklerini görselleştirerek "veri" kavramını keşfedin.',
  'creative',
  25,
  6,
  7,
  2,
  10,
  ARRAY['Büyük kağıt veya karton', 'Boya kalemleri', 'Keçeli kalemler'],
  'Çocuğunuzla birlikte kişisel özelliklerini anlatan bir poster oluşturun. Sevdiği renkler, yemekler, oyuncaklar gibi bilgileri resimlerle ifade edin.',
  'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/2.3.png'
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE title = 'Benim Verilerim' AND week_number = 2
);
