-- Eksik etkinlikleri ekle - Her yaş grubu için 3 etkinlik olacak şekilde

-- HAFTA 1 - Eksik 3. etkinlikler
INSERT INTO activities (
  title,
  description,
  type,
  duration,
  age_min,
  age_max,
  instructions,
  materials,
  week_number,
  difficulty_level,
  reflection_question,
  points,
  created_at
) VALUES
-- Hafta 1 - Age 6-7 (3. etkinlik)
(
  'Robotların İşleri 🤖',
  'Evde ve dışarıda robotların hangi işleri yaptığını keşfedin.',
  'exploration',
  15,
  6,
  7,
  'Robotların günlük hayatta nerede kullanıldığını araştırın ve resmini çizin.',
  ARRAY['Kağıt ve boya kalemleri', 'Aile ile gezinti'],
  1,
  1,
  'Robotlar hangi işlerde insanlara yardımcı oluyorlar?',
  5,
  NOW()
),
-- Hafta 1 - Age 8-9 (3. etkinlik)
(
  'Ses Tanıma Oyunu 🎤',
  'Yapay zekanın sesleri nasıl tanıdığını öğrenin ve ses oyunları yapın.',
  'game',
  20,
  8,
  9,
  'Farklı sesler kaydedip yapay zeka gibi tanımlamaya çalışın.',
  ARRAY['Akıllı telefon', 'Ses kayıt uygulaması'],
  1,
  2,
  'Hangi sesleri tanımak daha kolaydı, hangilerini tanımak daha zordu?',
  7,
  NOW()
),
-- Hafta 1 - Age 10-11 (3. etkinlik)
(
  'Algoritma Tasarımı 📐',
  'Günlük rutinlerinizi algoritma olarak yazın ve yapay zekanın mantığını anlayın.',
  'creative',
  25,
  10,
  11,
  'Sabah rutininizi adım adım algoritma olarak yazın ve optimize edin.',
  ARRAY['Kağıt ve kalem', 'Akış diyagramı şablonu (isteğe bağlı)'],
  1,
  3,
  'Rutinini algoritma olarak yazmak hangi adımları daha verimli hale getirdi?',
  10,
  NOW()
);

-- HAFTA 2 - Eksik 3. etkinlikler
INSERT INTO activities (
  title,
  description,
  type,
  duration,
  age_min,
  age_max,
  instructions,
  materials,
  week_number,
  difficulty_level,
  reflection_question,
  points,
  created_at
) VALUES
-- Hafta 2 - Age 6-7 (3. etkinlik)
(
  'Yapay Zeka Yardımcıları 🦸',
  'Yapay zekanın günlük hayatta nasıl yardımcı olduğunu keşfedin.',
  'exploration',
  20,
  6,
  7,
  'Ailenizin kullandığı yapay zeka uygulamalarını bulun ve ne işe yaradıklarını öğrenin.',
  ARRAY['Akıllı telefon', 'Kağıt ve kalem'],
  2,
  1,
  'En çok hangi yapay zeka yardımcısını kullanıyorsunuz?',
  5,
  NOW()
),
-- Hafta 2 - Age 8-9 (3. etkinlik)
(
  'Örüntü Bulma Ustası 🔢',
  'Yapay zekanın örüntü bulma yeteneğini öğrenin ve kendiniz örüntüler bulun.',
  'game',
  25,
  8,
  9,
  'Sayı ve şekil dizilerinde örüntüler bularak yapay zeka gibi düşünün.',
  ARRAY['Kağıt ve kalem', 'Renkli kalemler'],
  2,
  2,
  'Örüntüleri bulmak sana hangi konularda yardımcı olabilir?',
  7,
  NOW()
),
-- Hafta 2 - Age 10-11 (3. etkinlik)
(
  'Yapay Zeka ve Geleceğimiz 🚀',
  'Gelecekte yapay zekanın nasıl kullanılabileceğini hayal edin ve tasarlayın.',
  'creative',
  35,
  10,
  11,
  'Geleceğin bir yapay zeka uygulamasını tasarlayın ve sunun.',
  ARRAY['Kağıt', 'Kalemler', 'İnternet (araştırma için)'],
  2,
  3,
  'Tasarladığın yapay zeka uygulaması hangi problemi çözüyor?',
  10,
  NOW()
);
