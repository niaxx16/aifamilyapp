-- "Deepfake" ve Gerçeklik dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Deepfake, yapay zeka kullanarak gerçekçi sahte görüntü veya ses oluşturma teknolojisidir. Dezenformasyon ve manipülasyon için kullanılabilir, bu yüzden gördüklerimizi sorgulamayı öğrenmeliyiz.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Deepfake = AI ile sahte video/ses üretimi. Gerçek kişilerin yüzü başka videolara yerleştirilir veya sesi klonlanır. Dezenformasyon, dolandırıcılık, itibar zedeleme için kullanılabilir. Çocukların dijital içerikleri eleştirel gözle değerlendirmeleri, kaynak doğrulaması yapmaları önemli. Deepfake tespit araçları var ama mükemmel değil.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Deepfake, bilgisayarın yaptığı çok gerçekçi sahte video demek. Mesela birisi senin yüzünü başka bir videoya koyabilir, sanki sen oradaymışsın gibi gösterir. Veya senin sesini taklit edebilir. Gerçek değil ama çok inandırıcı olabiliyor. Bu yüzden internette gördüğün her şeye hemen inanmamalısın.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Sahte haber videosu',
            'content', '"Bir ünlü kişi videoda bir şey söylüyor gibi görünüyor ama aslında o hiç öyle dememiş. Yapay zeka onu öyle konuşturmuş. Bu dezenformasyon yaratabilir."'
          ),
          jsonb_build_object(
            'title', 'Sesli arama dolandırıcılığı',
            'content', '"Bazen dolandırıcılar birinin sesini klonlayıp telefon ediyor. Anne-baban seni aradı sanıyorsun ama aslında başkası. Bu çok tehlikeli."'
          ),
          jsonb_build_object(
            'title', 'Film efektleri',
            'content', '"Filmlerde ölen bir aktör dijital olarak geri getirilebiliyor. Bu deepfake\'in iyi kullanımı. Ama kötü amaçlı da kullanılabilir."'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Bir videoda birisinin bir şey söylediğini görsen, bunun gerçek olduğundan nasıl emin olursun?',
          'Sence deepfake teknolojisi hangi kötü amaçlar için kullanılabilir?',
          'Birisi senin yüzünü kullanarak sahte bir video yaparsa, ne hissedersin?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Videoda gördüysem kesinlikle doğrudur.',
            'right', 'Videolar artık yapay zeka ile kolayca manipüle edilebiliyor. Her gördüğüne inanmamalısın.'
          ),
          jsonb_build_object(
            'wrong', 'Deepfake sadece ünlüleri etkiler.',
            'right', 'Deepfake herkesi etkileyebilir. Senin de görüntün veya sesin kullanılabilir.'
          )
        )
      )
    )
  )
)
WHERE title = '"Deepfake" ve Gerçeklik';
