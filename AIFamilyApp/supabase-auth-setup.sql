-- AI Family App - Supabase Auth ve Kullanıcı Tabloları
-- Bu SQL dosyasını Supabase Dashboard > SQL Editor'de çalıştırın

-- 1. Users Tablosu (Genişletilmiş kullanıcı profili)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'parent' CHECK (role IN ('parent', 'child', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. User Profiles Tablosu (Çocuk profilleri için)
-- Bu tablo zaten var gibi görünüyor ama kontrol edelim
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER CHECK (age >= 3 AND age <= 18),
  avatar_url TEXT,
  interests TEXT[], -- İlgi alanları
  parent_id UUID REFERENCES public.users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Row Level Security (RLS) Politikaları

-- Users tablosu için RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Önce mevcut politikaları sil
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- Kullanıcı kendi kaydını görebilir
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Kullanıcı kendi kaydını güncelleyebilir
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Kayıt sırasında kullanıcı oluşturabilir
CREATE POLICY "Users can insert own profile"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User Profiles tablosu için RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Önce mevcut politikaları sil
DROP POLICY IF EXISTS "Users can view own child profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can create child profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own child profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can delete own child profiles" ON public.user_profiles;

-- Kullanıcı kendi çocuk profillerini görebilir
CREATE POLICY "Users can view own child profiles"
  ON public.user_profiles
  FOR SELECT
  USING (parent_id = auth.uid() OR user_id = auth.uid());

-- Kullanıcı kendi çocuk profillerini oluşturabilir
CREATE POLICY "Users can create child profiles"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (parent_id = auth.uid());

-- Kullanıcı kendi çocuk profillerini güncelleyebilir
CREATE POLICY "Users can update own child profiles"
  ON public.user_profiles
  FOR UPDATE
  USING (parent_id = auth.uid());

-- Kullanıcı kendi çocuk profillerini silebilir
CREATE POLICY "Users can delete own child profiles"
  ON public.user_profiles
  FOR DELETE
  USING (parent_id = auth.uid());

-- 4. Otomatik updated_at güncellemesi için trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Users tablosu için trigger
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- User Profiles tablosu için trigger
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5. Email Confirmation ayarları
-- Supabase Dashboard > Authentication > Settings kısmından:
-- - "Enable email confirmations" = AÇIK yapın
-- - "Confirm email" template'ini düzenleyin (opsiyonel)

-- 6. İndeksler (performans için)
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_parent_id ON public.user_profiles(parent_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);

-- 7. Test verisi (opsiyonel - silebilirsiniz)
-- Gerçek kullanımda bu kısım olmayacak, kayıt ekranından oluşturulacak
-- INSERT INTO public.users (id, email, full_name, role)
-- VALUES
-- ('00000000-0000-0000-0000-000000000001', 'test@example.com', 'Test User', 'parent');

-- Başarılı! Artık kullanıcı auth sistemi hazır.
