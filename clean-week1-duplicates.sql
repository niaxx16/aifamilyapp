-- Hafta 1 mükerrer kayıtları temizleme

-- 1. Yeni eklenen mükerrer "Akıllı Cihaz Avı" kaydını sil (2025-11-21 tarihli)
DELETE FROM activities
WHERE id = 'baf9fde7-a9d2-4cf1-96cb-b3538727ad9b';

-- 2. Yeni eklenen mükerrer "Robot Arkadaşım" kaydını sil (2025-11-04 18:35 tarihli)
DELETE FROM activities
WHERE id = '33c9b128-9f46-4bdd-be8f-582bbd4ab6f5';

-- 3. Eski kayıtları güncelle (image_url ve diğer alanlar eksikse)
UPDATE activities
SET
  description = 'Çocuğunuzla birlikte evinizdeki akıllı cihazları keşfedin. Bu eğlenceli avcılık oyunuyla yapay zeka kavramına ilk adımı atın.',
  type = 'exploration',
  duration = 20,
  points = 10,
  instructions = 'Evinizdeki akıllı cihazları bulma oyunu oynayın. Her cihaz için "Bu neden akıllı?" sorusunu sorun ve çocuğunuzun gözlemlerini dinleyin.',
  materials = ARRAY['Akıllı telefon', 'Tablet', 'Akıllı TV', 'Sesli asistan']
WHERE id = '6cb4ec11-2c01-462d-a207-3e35a0b3cad0';

UPDATE activities
SET
  description = 'Yaratıcı rol yapma oyunuyla algoritma mantığını fiziksel olarak deneyimleyin. Komutların net olması gerektiğini eğlenceli bir şekilde öğrenin.',
  type = 'creative',
  duration = 25,
  points = 10,
  instructions = 'Bir robot ve programcı rol yapma oyunu oynayın. Robot rolündeki kişi sadece net komutlarla hareket eder. Adım adım talimatların önemini eğlenceli şekilde keşfedin.',
  materials = ARRAY['Hayal gücü']
WHERE id = 'abc7c3a4-382d-4704-bc04-7acea2f52c94';

-- 4. Kontrol: Hafta 1'deki etkinlikleri listele
SELECT id, title, week_number, age_min, age_max, image_url
FROM activities
WHERE week_number = 1
ORDER BY title;
