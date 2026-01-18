-- AI Family App - earned_badges RLS Policies
-- Güvenlik iyileştirmesi: Kullanıcılar sadece kendi çocuklarının badge'lerini görebilir/ekleyebilir

-- 1. RLS'i aktif et
ALTER TABLE earned_badges ENABLE ROW LEVEL SECURITY;

-- 2. SELECT policy: Kullanıcılar sadece kendi çocuklarının badge'lerini görebilir
CREATE POLICY "Users can view their children's badges"
ON earned_badges
FOR SELECT
USING (
  parent_id IN (
    SELECT id FROM parent_profiles
    WHERE user_id = auth.uid()
  )
);

-- 3. INSERT policy: Kullanıcılar sadece kendi çocuklarına badge ekleyebilir
CREATE POLICY "Users can insert badges for their children"
ON earned_badges
FOR INSERT
WITH CHECK (
  parent_id IN (
    SELECT id FROM parent_profiles
    WHERE user_id = auth.uid()
  )
);

-- 4. DELETE policy: Kullanıcılar kendi çocuklarının badge'lerini silebilir
CREATE POLICY "Users can delete their children's badges"
ON earned_badges
FOR DELETE
USING (
  parent_id IN (
    SELECT id FROM parent_profiles
    WHERE user_id = auth.uid()
  )
);

-- Kontrol sorguları:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'earned_badges';
-- SELECT policyname, cmd FROM pg_policies WHERE tablename = 'earned_badges';
