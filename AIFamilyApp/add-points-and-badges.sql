-- Puan ve rozet sistemi için database guncellemeleri

-- 1. child_profiles tablosuna toplam puan kolonu ekle
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS total_points INTEGER DEFAULT 0;

-- 2. lessons tablosuna puan kolonu ekle (her ders icin kazanilan puan)
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 10;

-- 3. Kazanilan rozetleri tutmak icin tablo olustur
CREATE TABLE IF NOT EXISTS earned_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  badge_type VARCHAR(50) NOT NULL,
  badge_name VARCHAR(100) NOT NULL,
  badge_emoji VARCHAR(10) NOT NULL,
  category_id VARCHAR(50),
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, badge_type, category_id)
);

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_earned_badges_child ON earned_badges(child_id);
CREATE INDEX IF NOT EXISTS idx_earned_badges_category ON earned_badges(category_id);

-- Yorum
COMMENT ON TABLE earned_badges IS 'Cocuklarin kazandigi rozetleri tutar';
COMMENT ON COLUMN child_profiles.total_points IS 'Cocugun kazandigi toplam puan';
COMMENT ON COLUMN lessons.points IS 'Dersi tamamladiginda kazanilan puan';
