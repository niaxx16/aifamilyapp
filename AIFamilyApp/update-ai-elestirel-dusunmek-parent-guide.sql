-- AI'ya Karşı Eleştirel Düşünmek dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Yapay zekâ ne söylerse söylesin, neden böyle söylüyor olabilir? diye düşünmek, en önemli beceridir.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Eleştirel düşünme = sorgulamak, alternatifleri düşünmek, kanıt aramak. YZ çıktıları, verilerden ve algoritmalardan gelir; bu veriler önyargılı veya eksik olabilir. Çocuğa, YZ yi bir doğru makinesi değil, bir öneri kaynağı olarak görmeyi öğretmek kritik.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Yapay zekâ sana bir şey söylediğinde hemen Tamam, bu doğru demek zorunda değilsin. Bu neden böyle? diye sormak ve başka kaynaklara da bakmak çok önemli. Akıllı olmak, her söylenene inanmak değil; düşünerek karar vermektir.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Farklı cevaplar alma',
            'content', 'Aynı soruyu hem yapay zekâya hem bir ansiklopediye bakarak sorabiliriz. Sonuçlar farklıysa, Hangisi daha mantıklı, hangisinin kaynağı daha güçlü? diye tartışabiliriz.'
          ),
          jsonb_build_object(
            'title', 'Taraflı içerik',
            'content', 'Yapay zekâ, sadece belli bir bakış açısını yansıtan örneklerden öğrenmiş olabilir. Bu yüzden Bu cevap herkese adil mi? diye sormak önemli.'
          ),
          jsonb_build_object(
            'title', 'Abartılı cevaplar',
            'content', 'Bazı sistemler dikkat çekmek için abartılı ya da sansasyonel şeyler üretebilir. Bu bana biraz abartılı geldi, kanıtı var mı? diye düşünmek iyi bir refleks.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence yapay zekâ, her konuda adil olabilir mi?',
          'Bir cevap sana tuhaf veya aşırı gelirse ne yaparsın?',
          'Bir bilgiye inanmak için hangi soruları sormak iyi olur?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Yapay zekâ yanılmaz.',
            'right', 'Yapay zekâ bazen çok iyi işler çıkarır ama yanılması da normal; önemli olan bizim nasıl düşündüğümüz.'
          ),
          jsonb_build_object(
            'wrong', 'Yapay zekâ hep tehlikeli.',
            'right', 'Yapay zekâ, dikkatli ve sorgulayıcı kullanılırsa faydalı bir araç olabilir.'
          )
        )
      )
    )
  )
)
WHERE id = 'd02905e1-0535-41d4-865b-eea3fc352329';
