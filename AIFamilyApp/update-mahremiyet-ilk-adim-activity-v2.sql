-- Mahremiyetin İlk Adımı dersinin activity (quiz) bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{activity}',
  jsonb_build_object(
    'type', 'matching',
    'title', 'Hangi Bilgi Nereye Ait?',
    'instruction', 'Aşağıdaki bilgileri doğru kategoriye sürükleyin',
    'categories', jsonb_build_array(
      jsonb_build_object(
        'id', 'safe',
        'name', '✅ Paylaşılabilir',
        'color', '#4CAF50'
      ),
      jsonb_build_object(
        'id', 'private',
        'name', '🔒 Gizli Tutmalı',
        'color', '#F44336'
      )
    ),
    'items', jsonb_build_array(
      jsonb_build_object(
        'id', 1,
        'text', 'Sevdiğim renk',
        'correctCategory', 'safe',
        'feedback', 'Doğru! Sevdiğin renk genel bir bilgidir, herkesle paylaşabilirsin.'
      ),
      jsonb_build_object(
        'id', 2,
        'text', 'Tam ev adresim',
        'correctCategory', 'private',
        'feedback', 'Doğru! Ev adresi çok özel bir bilgidir, kimseyle paylaşmamalısın.'
      ),
      jsonb_build_object(
        'id', 3,
        'text', 'En sevdiğim hayvan',
        'correctCategory', 'safe',
        'feedback', 'Doğru! Favori hayvanın zararsız bir bilgidir.'
      ),
      jsonb_build_object(
        'id', 4,
        'text', 'Okul adım ve sınıfım',
        'correctCategory', 'private',
        'feedback', 'Doğru! Okul ve sınıf bilgisi seni tanımlar, gizli tutmalısın.'
      ),
      jsonb_build_object(
        'id', 5,
        'text', 'Telefon numaram',
        'correctCategory', 'private',
        'feedback', 'Doğru! Telefon numarası kişisel bilgidir, paylaşılmamalı.'
      ),
      jsonb_build_object(
        'id', 6,
        'text', 'Hobim (resim yapmak)',
        'correctCategory', 'safe',
        'feedback', 'Doğru! Hobi ve ilgi alanların genel bilgilerdir.'
      ),
      jsonb_build_object(
        'id', 7,
        'text', 'Oyun şifrem',
        'correctCategory', 'private',
        'feedback', 'Doğru! Şifreler asla kimseyle paylaşılmamalı.'
      ),
      jsonb_build_object(
        'id', 8,
        'text', 'Anne-babamın mesleği',
        'correctCategory', 'private',
        'feedback', 'Doğru! Aile bilgileri özeldir, internette paylaşılmamalı.'
      ),
      jsonb_build_object(
        'id', 9,
        'text', 'Favori sporum',
        'correctCategory', 'safe',
        'feedback', 'Doğru! Favori sporun herkesle paylaşabileceğin bir bilgidir.'
      ),
      jsonb_build_object(
        'id', 10,
        'text', 'Tam adım ve soyadım',
        'correctCategory', 'private',
        'feedback', 'Doğru! Tam isim kişisel veridir, sadece gerekli yerlerde kullanılmalı.'
      )
    ),
    'successMessage', 'Harika! Hangi bilgilerin güvenli, hangilerinin gizli olduğunu ayırt edebiliyorsun! 🎉',
    'points', 10
  )
)
WHERE id = 'f0d8e748-3034-4b42-bfcb-6af23fb9be9b';
