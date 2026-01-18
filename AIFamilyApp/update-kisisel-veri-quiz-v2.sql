-- Kişisel Veri Nedir dersinin quiz bölümünü ekle (Doğru format)
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'true_false',
    'question', '',
    'items', jsonb_build_array(
      jsonb_build_object(
        'left', 'Sadece adım ve soyadım kişisel veridir, başka hiçbir bilgi kişisel veri değildir.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Yüzümün göründüğü bir fotoğraf kişisel veri sayılır.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Konum bilgim (nerede olduğum) kişisel veridir.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'En sevdiğim renk veya hayvan kişisel veridir.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Oyun kullanıcı adım, başka bilgilerle birleştiğinde beni tanınır hale getirebilir.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Sağlık bilgilerim (hastalık, alerji) normal kişisel veri gibidir.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Telefon numaram ve okul adım internette paylaşılmamalıdır.',
        'right', '',
        'correct', true
      )
    )
  )
)
WHERE id = 'f5b9923d-31ea-4185-88ee-e9913a6a426e';
