-- AI Family App - User Registration Trigger
-- BUG-H1 Fix: Registration Race Condition
-- Bu trigger auth.users'a yeni kullanıcı eklendiğinde otomatik olarak
-- public.users tablosuna profil kaydı oluşturur

-- 1. Trigger function oluştur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_name TEXT;
BEGIN
  -- Email'den kullanıcı adı oluştur
  v_user_name := SPLIT_PART(NEW.email, '@', 1);

  -- public.users tablosuna otomatik kayıt ekle
  INSERT INTO public.users (
    id,
    email,
    name,
    full_name,
    created_at
  ) VALUES (
    NEW.id,
    NEW.email,
    v_user_name,
    COALESCE(NEW.raw_user_meta_data->>'full_name', v_user_name),
    NOW()
  );

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Hata durumunda bile trigger başarısız olmasın
    RAISE WARNING 'Error creating user profile: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- 2. Trigger'ı kaldır (eğer varsa)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 3. Yeni trigger oluştur
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. Comment ekle
COMMENT ON FUNCTION public.handle_new_user() IS
'Otomatik user profili oluşturma - BUG-H1 düzeltmesi';

-- Test sorgusu:
-- Trigger'ın çalıştığını kontrol et
-- SELECT trigger_name, event_manipulation, event_object_table, action_statement
-- FROM information_schema.triggers
-- WHERE trigger_name = 'on_auth_user_created';

-- Yeni kullanıcı kaydı test etmek için:
-- 1. Uygulamadan yeni kullanıcı kaydı yap
-- 2. Kontrol et:
-- SELECT id, email, name, full_name, created_at
-- FROM public.users
-- ORDER BY created_at DESC
-- LIMIT 5;
