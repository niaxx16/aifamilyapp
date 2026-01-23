-- İçerik Önerileri tablosu
CREATE TABLE IF NOT EXISTS content_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  suggestion TEXT NOT NULL,
  parent_id UUID REFERENCES parent_profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politikaları
ALTER TABLE content_suggestions ENABLE ROW LEVEL SECURITY;

-- Herkes öneri ekleyebilir (giriş yapmış kullanıcılar)
CREATE POLICY "Authenticated users can insert suggestions" ON content_suggestions
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Kullanıcılar kendi önerilerini görebilir
CREATE POLICY "Users can view own suggestions" ON content_suggestions
  FOR SELECT USING (
    parent_id IN (
      SELECT id FROM parent_profiles WHERE user_id = auth.uid()
    )
    OR parent_id IS NULL
  );
