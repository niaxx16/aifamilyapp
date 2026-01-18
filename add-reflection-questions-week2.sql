-- Hafta 2 etkinliklerine yansıma soruları ekle

-- Etkinlik 1: Renk Gruplama Oyunu
UPDATE activities
SET reflection_question = 'Nesneleri renklerine göre gruplamak kolay mıydı? Hangi renk grubunda daha çok eşya vardı?'
WHERE title = 'Renk Gruplama Oyunu' AND week_number = 2;

-- Etkinlik 2: Duygu Kartları
UPDATE activities
SET reflection_question = 'Yüz ifadelerinden duyguları anlamak nasıldı? Hangi duyguyu bulmak en kolaydı, hangisi zor oldu?'
WHERE title = 'Duygu Kartları' AND week_number = 2;

-- Etkinlik 3: Benim Verilerim
UPDATE activities
SET reflection_question = 'Kendi verilerini (sevdiğin şeyleri) çizmek eğlenceli miydi? En çok hangi verini paylaşmak istedin?'
WHERE title = 'Benim Verilerim' AND week_number = 2;

-- Tüm yansıma sorularını kontrol et
SELECT title, week_number, reflection_question
FROM activities
WHERE week_number = 2 AND age_min = 6 AND age_max = 7
ORDER BY created_at;
