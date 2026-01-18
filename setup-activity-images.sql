-- 1. Activity Images bucket oluştur
INSERT INTO storage.buckets (id, name, public)
VALUES ('activity-images', 'activity-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Public erişim politikası
CREATE POLICY "Public Access for Activity Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'activity-images');

-- 3. Authenticated users upload politikası
CREATE POLICY "Auth Upload for Activity Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'activity-images');

-- 4. Activities tablosuna image_url kolonu ekle
ALTER TABLE activities
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 5. İlk etkinliğin görsel URL'ini güncelle (görseli yükledikten sonra URL'i buraya ekleyin)
-- UPDATE activities SET image_url = 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/activity-images/1.1.png' WHERE title = 'Akıllı Cihaz Avı';
