-- Activities tablosuna puan sistemi ekle

-- 1. activities tablosuna points kolonu ekle
ALTER TABLE activities ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 15;

-- Yorum
COMMENT ON COLUMN activities.points IS 'Etkinligi tamamladiginda kazanilan puan (derslerden biraz daha fazla)';

-- 2. Mevcut aktivitelere puan ata
UPDATE activities SET points = 15 WHERE points IS NULL;
