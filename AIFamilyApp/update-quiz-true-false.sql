-- İlk dersin etkinlikler bölümünü doğru-yanlış soruları ile güncelle
-- 5 adet doğru-yanlış sorusu

UPDATE lessons
SET module_content = jsonb_set(
  module_content,
  '{quiz}',
  jsonb_build_object(
    'type', 'true_false',
    'question', '',
    'items', jsonb_build_array(
      jsonb_build_object(
        'left', 'Yapay zeka duygular hissedebilir ve üzülebilir.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Yapay zeka verilerden öğrenerek daha iyi hale gelebilir.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Algoritma, bilgisayara verilen adım adım talimatlardır.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Yapay zeka her zaman %100 doğru kararlar verir.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'İnsan zekası ve yapay zeka tamamen aynıdır.',
        'right', '',
        'correct', false
      )
    )
  )
)
WHERE title = 'Yapay Zekâ Nedir?' AND order_number = 1;
