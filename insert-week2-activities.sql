-- Week 2 Activities - Slightly more challenging than Week 1

-- Week 2 - Age 6-7
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
(
  'Akıllı Asistan ile Konuş 🗣️',
  'Evinizde varsa akıllı asistan (Alexa, Siri, Google Asistan) ile konuşarak yapay zeka ile nasıl iletişim kurulduğunu öğrenin.',
  'conversation',
  20,
  6,
  7,
  'Bu etkinlikte çocuğunuzla birlikte akıllı asistanın nasıl çalıştığını keşfedeceksiniz.',
  ARRAY['Akıllı telefon veya akıllı hoparlör', 'Kağıt ve kalem'],
  2,
  1,
  'Akıllı asistan hangi sorulara doğru cevap verdi, hangilerine veremedi?',
  5,
  NOW()
),
(
  'Yapay Zeka Çizim Yarışması 🎨',
  'Yapay zeka ve insan çizimlerini karşılaştırarak farkları keşfedin.',
  'creative',
  25,
  6,
  7,
  'Basit bir nesne çizimi yaparak yapay zekanın nasıl çizim yaptığını öğrenin.',
  ARRAY['Kağıt ve boya kalemleri', 'Akıllı telefon (isteğe bağlı)'],
  2,
  1,
  'Yapay zekanın çizimi seninkinden nasıl farklıydı?',
  5,
  NOW()
);

-- Week 2 - Age 8-9
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
(
  'Yapay Zeka Karar Ağacı 🌳',
  'Karar ağaçları ile yapay zekanın nasıl karar verdiğini öğrenin.',
  'game',
  25,
  8,
  9,
  'Basit sorularla hayvan tahmin oyunu yaparak karar ağaçlarını keşfedin.',
  ARRAY['Kağıt ve kalem'],
  2,
  2,
  'Karar ağacı kullanarak kaç soruda hayvanı tahmin edebildiniz?',
  7,
  NOW()
),
(
  'Veri Toplama Dedektifleri 🔎',
  'Yapay zekanın öğrenmek için veri topladığını anlayın ve kendi verilerinizi toplayın.',
  'exploration',
  30,
  8,
  9,
  'Bir hafta boyunca basit veriler toplayarak yapay zeka gibi düşünün.',
  ARRAY['Defter', 'Kalem', 'Grafik kağıdı'],
  2,
  2,
  'Topladığın verilerden hangi sonuçları çıkarabildin?',
  7,
  NOW()
);

-- Week 2 - Age 10-11
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
(
  'Makine Öğrenmesi Deneyi 🧪',
  'Basit bir makine öğrenmesi deneyi yaparak yapay zekanın nasıl öğrendiğini anlayın.',
  'game',
  35,
  10,
  11,
  'El yazısı rakamları tanıma oyunu ile makine öğrenmesini keşfedin.',
  ARRAY['Kağıt ve kalem', 'Zamanlayıcı'],
  2,
  3,
  'Pratik yaptıkça rakamları tanımak nasıl kolaylaştı?',
  10,
  NOW()
),
(
  'Yapay Zeka Etik Tartışması 💭',
  'Yapay zekanın etik kullanımı hakkında düşünün ve tartışın.',
  'conversation',
  30,
  10,
  11,
  'Gerçek hayattan örneklerle yapay zekanın doğru ve yanlış kullanımlarını tartışın.',
  ARRAY['Tartışma soruları listesi'],
  2,
  3,
  'Yapay zekanın insanlara yardım etmesi için en önemli kural ne olmalı?',
  10,
  NOW()
);
