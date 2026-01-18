-- Mahremiyetin İlk Adımı dersinin quiz bölümünü ekle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'categorize',
    'question', 'Bu bilgileri doğru kategoriye yerleştir!',
    'categories', jsonb_build_array('✅ Paylaşılabilir', '🔒 Gizli Tutmalı'),
    'description', '✅ Paylaşılabilir: Genel ve zararsız bilgiler
🔒 Gizli Tutmalı: Kişisel ve hassas bilgiler, kimseyle paylaşmamalısın',
    'items', jsonb_build_array(
      jsonb_build_object('item', 'Sevdiğim renk (mavi)', 'category', '✅ Paylaşılabilir'),
      jsonb_build_object('item', 'Tam ev adresim', 'category', '🔒 Gizli Tutmalı'),
      jsonb_build_object('item', 'En sevdiğim hayvan (kedi)', 'category', '✅ Paylaşılabilir'),
      jsonb_build_object('item', 'Okul adım ve sınıfım', 'category', '🔒 Gizli Tutmalı'),
      jsonb_build_object('item', 'Telefon numaram', 'category', '🔒 Gizli Tutmalı'),
      jsonb_build_object('item', 'Hobim (resim yapmak)', 'category', '✅ Paylaşılabilir'),
      jsonb_build_object('item', 'Oyun veya uygulama şifrem', 'category', '🔒 Gizli Tutmalı'),
      jsonb_build_object('item', 'Anne-babamın isimleri ve meslekleri', 'category', '🔒 Gizli Tutmalı'),
      jsonb_build_object('item', 'Favori sporum (futbol)', 'category', '✅ Paylaşılabilir'),
      jsonb_build_object('item', 'Tam adım ve soyadım', 'category', '🔒 Gizli Tutmalı')
    )
  )
)
WHERE id = 'f0d8e748-3034-4b42-bfcb-6af23fb9be9b';
