-- İlk oluşturduğum test derslerini sil
-- 33 yeni ders başlığından önceki tüm dersleri temizle

-- Önce "Yapay Zeka Nedir?" dışındaki module_content'i NULL olan veya
-- order_number > 33 olan dersleri silmek güvenli olabilir

-- Ama en güvenlisi: Tüm lessons tablosunu temizleyip 33 dersi yeniden eklemek
-- Eğer user_progress varsa o etkilenmez

-- OPSYON 1: Tüm dersleri sil (en güvenli baştan başlamak için)
DELETE FROM lessons;

-- OPSYON 2: Sadece eski test derslerini sil (33 yeni dersi koru)
-- DELETE FROM lessons WHERE created_at < '2025-02-02 00:00:00';

-- OPSYON 3: module_content NULL olan ve title '33 başlıkta olmayan' dersleri sil
-- Bu daha hassas ama karmaşık
