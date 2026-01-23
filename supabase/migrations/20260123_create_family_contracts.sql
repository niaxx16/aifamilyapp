-- Aile Sözleşmeleri tablosu
CREATE TABLE IF NOT EXISTS family_contracts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_profile_id UUID REFERENCES parent_profiles(id) ON DELETE CASCADE,
  parent_name TEXT NOT NULL,
  child_name TEXT NOT NULL,
  contract_date TEXT NOT NULL,
  rules JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politikaları
ALTER TABLE family_contracts ENABLE ROW LEVEL SECURITY;

-- Kullanıcı kendi sözleşmelerini görebilir
CREATE POLICY "Users can view own contracts" ON family_contracts
  FOR SELECT USING (
    parent_profile_id IN (
      SELECT id FROM parent_profiles WHERE user_id = auth.uid()
    )
  );

-- Kullanıcı sözleşme ekleyebilir
CREATE POLICY "Users can insert own contracts" ON family_contracts
  FOR INSERT WITH CHECK (
    parent_profile_id IN (
      SELECT id FROM parent_profiles WHERE user_id = auth.uid()
    )
  );

-- Kullanıcı kendi sözleşmelerini güncelleyebilir
CREATE POLICY "Users can update own contracts" ON family_contracts
  FOR UPDATE USING (
    parent_profile_id IN (
      SELECT id FROM parent_profiles WHERE user_id = auth.uid()
    )
  );

-- Kullanıcı kendi sözleşmelerini silebilir
CREATE POLICY "Users can delete own contracts" ON family_contracts
  FOR DELETE USING (
    parent_profile_id IN (
      SELECT id FROM parent_profiles WHERE user_id = auth.uid()
    )
  );

-- Updated_at otomatik güncelleme trigger'ı
CREATE OR REPLACE FUNCTION update_family_contracts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER family_contracts_updated_at
  BEFORE UPDATE ON family_contracts
  FOR EACH ROW
  EXECUTE FUNCTION update_family_contracts_updated_at();
