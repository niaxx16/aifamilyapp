-- Hafta 3 etkinliklerine yansıma soruları ekle

-- Etkinlik 1: Müzik ve Ritim
UPDATE activities
SET reflection_question = 'Ritim desenlerini tahmin etmek kolay mıydı? Hangi desen en zordu?'
WHERE title = 'Müzik ve Ritim' AND week_number = 3;

-- Etkinlik 2: Örüntü Blokları
UPDATE activities
SET reflection_question = 'Blok desenlerindeki kuralı bulmak nasıldı? Kendi desenini yaratırken ne düşündün?'
WHERE title = 'Örüntü Blokları' AND week_number = 3;

-- Etkinlik 3: "Eğer... O Zaman..." Oyunu
UPDATE activities
SET reflection_question = '"Eğer... O zaman..." kurallarını uygulamak eğlenceli miydi? En sevdiğin kural hangisiydi?'
WHERE title = '"Eğer... O Zaman..." Oyunu' AND week_number = 3;

-- Tüm yansıma sorularını kontrol et
SELECT title, week_number, reflection_question
FROM activities
WHERE week_number = 3 AND age_min = 6 AND age_max = 7
ORDER BY created_at;
