-- Kişisel Veri Nedir dersinin quiz bölümünü ekle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'true_false',
    'question', 'Aşağıdaki ifadeler doğru mu, yanlış mı?',
    'description', 'Kişisel veri kavramını pekiştirmek için bu soruları cevaplayın',
    'items', jsonb_build_array(
      jsonb_build_object(
        'statement', 'Sadece adım ve soyadım kişisel veridir, başka hiçbir bilgi kişisel veri değildir.',
        'answer', false,
        'explanation', 'Yanlış! Adres, telefon, okul adı, fotoğraf, konum gibi pek çok bilgi de kişisel veridir.'
      ),
      jsonb_build_object(
        'statement', 'Yüzümün göründüğü bir fotoğraf kişisel veri sayılır.',
        'answer', true,
        'explanation', 'Doğru! Yüzün net göründüğü fotoğraflar seni tanımlar, bu yüzden kişisel veridir.'
      ),
      jsonb_build_object(
        'statement', 'Konum bilgim (nerede olduğum) kişisel veridir.',
        'answer', true,
        'explanation', 'Doğru! Nerede olduğunu gösteren konum bilgisi kişisel veridir ve korunmalıdır.'
      ),
      jsonb_build_object(
        'statement', 'En sevdiğim renk veya hayvan kişisel veridir.',
        'answer', false,
        'explanation', 'Yanlış! Bunlar genel bilgilerdir. Seni tanımlamaz veya bulmayı kolaylaştırmaz.'
      ),
      jsonb_build_object(
        'statement', 'Oyun kullanıcı adım, başka bilgilerle birleştiğinde beni tanınır hale getirebilir.',
        'answer', true,
        'explanation', 'Doğru! Aynı kullanıcı adını farklı yerlerde kullanırsan, seni tanımlamak kolaylaşır.'
      ),
      jsonb_build_object(
        'statement', 'Sağlık bilgilerim (hastalık, alerji) normal kişisel veri gibidir, özel bir önemi yoktur.',
        'answer', false,
        'explanation', 'Yanlış! Sağlık bilgileri "özel nitelikli kişisel veri"dir, daha fazla koruma gerektirir.'
      ),
      jsonb_build_object(
        'statement', 'Telefon numaram ve okul adım internette paylaşılmamalıdır.',
        'answer', true,
        'explanation', 'Doğru! Telefon ve okul bilgileri seni tanımlayan kişisel verilerdir, korunmalıdır.'
      )
    )
  )
)
WHERE id = 'f5b9923d-31ea-4185-88ee-e9913a6a426e';
