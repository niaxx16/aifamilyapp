-- RLS politikalarını ve constraint'leri düzelt

-- parent_profiles için RLS
ALTER TABLE parent_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Herkes parent_profiles'ı okuyabilir" ON parent_profiles;
DROP POLICY IF EXISTS "Herkes parent_profiles'a yazabilir" ON parent_profiles;
DROP POLICY IF EXISTS "Herkes parent_profiles'ı güncelleyebilir" ON parent_profiles;

CREATE POLICY "Herkes parent_profiles'ı okuyabilir"
  ON parent_profiles FOR SELECT
  USING (true);

CREATE POLICY "Herkes parent_profiles'a yazabilir"
  ON parent_profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Herkes parent_profiles'ı güncelleyebilir"
  ON parent_profiles FOR UPDATE
  USING (true);

-- child_profiles için RLS
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Herkes child_profiles'ı okuyabilir" ON child_profiles;
DROP POLICY IF EXISTS "Herkes child_profiles'a yazabilir" ON child_profiles;
DROP POLICY IF EXISTS "Herkes child_profiles'ı güncelleyebilir" ON child_profiles;
DROP POLICY IF EXISTS "Herkes child_profiles'ı silebilir" ON child_profiles;

CREATE POLICY "Herkes child_profiles'ı okuyabilir"
  ON child_profiles FOR SELECT
  USING (true);

CREATE POLICY "Herkes child_profiles'a yazabilir"
  ON child_profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Herkes child_profiles'ı güncelleyebilir"
  ON child_profiles FOR UPDATE
  USING (true);

CREATE POLICY "Herkes child_profiles'ı silebilir"
  ON child_profiles FOR DELETE
  USING (true);

-- user_progress için RLS (yeni yapıyla)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Herkes user_progress'i okuyabilir" ON user_progress;
DROP POLICY IF EXISTS "Herkes user_progress'e yazabilir" ON user_progress;
DROP POLICY IF EXISTS "Herkes user_progress'i güncelleyebilir" ON user_progress;

CREATE POLICY "Herkes user_progress'i okuyabilir"
  ON user_progress FOR SELECT
  USING (true);

CREATE POLICY "Herkes user_progress'e yazabilir"
  ON user_progress FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Herkes user_progress'i güncelleyebilir"
  ON user_progress FOR UPDATE
  USING (true);

-- completed_activities için RLS
ALTER TABLE completed_activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Herkes completed_activities'i okuyabilir" ON completed_activities;
DROP POLICY IF EXISTS "Herkes completed_activities'e yazabilir" ON completed_activities;
DROP POLICY IF EXISTS "Herkes completed_activities'i güncelleyebilir" ON completed_activities;

CREATE POLICY "Herkes completed_activities'i okuyabilir"
  ON completed_activities FOR SELECT
  USING (true);

CREATE POLICY "Herkes completed_activities'e yazabilir"
  ON completed_activities FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Herkes completed_activities'i güncelleyebilir"
  ON completed_activities FOR UPDATE
  USING (true);

-- completed_activities unique constraint'ini kontrol et ve gerekirse düzelt
-- Önce mevcut constraint'i kaldır
ALTER TABLE completed_activities DROP CONSTRAINT IF EXISTS unique_child_activity;

-- Yeni constraint ekle
ALTER TABLE completed_activities
  ADD CONSTRAINT unique_child_activity UNIQUE (child_id, activity_id);
