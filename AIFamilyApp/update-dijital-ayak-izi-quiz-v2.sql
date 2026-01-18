-- Dijital Ayak İzi dersinin quiz bölümünü ekle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'true_false',
    'question', '',
    'items', jsonb_build_array(
      jsonb_build_object(
        'left', 'İnternetten sildiğim her şey tamamen yok olur, kimse göremez.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Sadece paylaşımlarım dijital iz bırakır, izlediğim videolar veya tıklamalarım bırakmaz.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Arkadaşımın fotoğrafını ondan izin almadan paylaşabilirim.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Dijital ayak izi her zaman kötü bir şeydir, hiç faydası yoktur.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Bir şey paylaşmadan önce "Bunu sonra görmek ister miyim?" diye düşünmeliyim.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'İzlediğim videolar ve yaptığım aramalar da dijital ayak izimin bir parçasıdır.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Bir paylaşımımın ekran görüntüsü alınmış olsa bile, ben silersem sorun çözülür.',
        'right', '',
        'correct', false
      )
    )
  )
)
WHERE id = 'cde8f3ea-ff8b-4b4e-9e1b-a3057e2f9609';
