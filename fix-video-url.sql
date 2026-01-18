-- Doğru başlıkla video URL'sini güncelle (â harfi ile)

UPDATE lessons
SET video_url = 'https://youtube.com/shorts/st6Dmj01nIY'
WHERE id = 'e05e95e6-f8fe-4d78-beb0-18591840d11a';

-- Kontrol et
SELECT title, video_url
FROM lessons
WHERE id = 'e05e95e6-f8fe-4d78-beb0-18591840d11a';
