-- AI ile Sohbet Etmek dersinin quiz bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'true_false',
    'question', 'Aşağıdaki ifadeler doğru mu yanlış mı?',
    'items', jsonb_build_array(
      jsonb_build_object(
        'left', 'AI ile konuşurken adres, okul gibi kişisel bilgilerimi paylaşabilirim',
        'right', 'Yanlış',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'AI nın verdiği her cevabı başka kaynaklardan kontrol etmeliyim',
        'right', 'Doğru',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'AI ya net ve açık sorular sormak daha iyi sonuç verir',
        'right', 'Doğru',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'AI benim en iyi arkadaşım olabilir',
        'right', 'Yanlış',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'AI dan aldığım cevabı doğrudan ödev olarak teslim edebilirim',
        'right', 'Yanlış',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'AI dan fikir alıp kendi cümlelerimle yazmak doğrudur',
        'right', 'Doğru',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'AI her zaman doğru bilgi verir, hiç yanılmaz',
        'right', 'Yanlış',
        'correct', false
      )
    )
  )
)
WHERE id = 'c271bb84-53b8-476c-bba9-9c9ad0b9eb6f';
