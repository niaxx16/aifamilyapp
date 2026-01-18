-- Yapay Zeka Nedir dersinin video_url'sini kontrol et

SELECT title, video_url
FROM lessons
WHERE title LIKE '%Yapay Zeka Nedir%';

-- Tüm derslerin video_url kolonunu kontrol et
SELECT id, title, video_url
FROM lessons
ORDER BY order_number;
