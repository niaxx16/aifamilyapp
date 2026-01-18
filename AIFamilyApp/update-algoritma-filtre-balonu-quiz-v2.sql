-- Algoritma ve Filtre Balonu dersinin quiz bölümünü ekle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'true_false',
    'question', '',
    'items', jsonb_build_array(
      jsonb_build_object(
        'left', 'Algoritma bana sadece doğru bilgileri gösterir, bu yüzden ekrandaki her şey doğrudur.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Filtre balonu, hep aynı tür içerikleri görmeme neden olur.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Algoritma benim ne izlediğimi, neye tıkladığımı ve ne kadar süre baktığımı takip eder.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Filtre balonunun hiçbir olumlu tarafı yoktur, her zaman kötüdür.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Ekranda gördüğüm videolar dünyanın tamamını değil, sadece küçük bir parçasını gösterir.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Farklı konularda aramalar yaparak filtre balonumu genişletebilirim.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Ana sayfama düşen videolar rastgele seçilir, hiçbir kural yoktur.',
        'right', '',
        'correct', false
      )
    )
  )
)
WHERE id = '5ca103be-7cf2-4e33-a925-d9cb85356466';
