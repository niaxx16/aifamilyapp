-- Veri Gizliliği dersinin quiz bölümünü ekle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'true_false',
    'question', '',
    'items', jsonb_build_array(
      jsonb_build_object(
        'left', 'Her uygulamaya tüm izinleri (kamera, konum, mikrofon) vermek zorundayım.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Bir oyun uygulamasının konum bilgimi istemesi normaldir ve vermem gerekir.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Gizlilik politikasını okumadan "Kabul ediyorum" butonuna tıklarsam bir şey olmaz.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Video platformlarında "Çocuk profili" kullanmak daha güvenlidir.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Uygulamalar topladıkları verilerimi başka şirketlerle paylaşabilir.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Bir izin ekranını anlamadığımda önce aileme sormam önemlidir.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Çerezleri (cookies) kabul etmezsem hiçbir internet sitesini kullanamam.',
        'right', '',
        'correct', false
      )
    )
  )
)
WHERE id = '93c7b7f5-0e43-4466-8626-699b89827619';
