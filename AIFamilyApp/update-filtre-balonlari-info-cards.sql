-- Algoritma ve Filtre Balonları dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Filtre balonu nedir?',
      'answer', 'Kişiselleştirilmiş bilgi hapsi.',
      'example', 'Sadece sevdiğin içerikleri görme.'
    ),
    jsonb_build_object(
      'question', 'Nasıl oluşur?',
      'answer', 'Algoritmalar seni tanır.',
      'example', 'Geçmiş davranışlarından öğrenir.'
    ),
    jsonb_build_object(
      'question', 'Neden tehlikeli?',
      'answer', 'Farklı bakış açıları göremezsin.',
      'example', 'Tek taraflı bilgi, önyargı.'
    ),
    jsonb_build_object(
      'question', 'Sosyal medyada filtre balonu?',
      'answer', 'Benzer içerikler tekrar eder.',
      'example', 'Aynı tür videolar önerilir.'
    ),
    jsonb_build_object(
      'question', 'Echo chamber nedir?',
      'answer', 'Yankı odası, aynı fikirler.',
      'example', 'Sadece benzerlerle etkileşim.'
    ),
    jsonb_build_object(
      'question', 'Nasıl fark ederiz?',
      'answer', 'Çeşitlilik eksikliği.',
      'example', 'Hep aynı tarz içerikler görme.'
    ),
    jsonb_build_object(
      'question', 'Nasıl kırılır?',
      'answer', 'Farklı kaynaklar araştır.',
      'example', 'Farklı görüşleri oku, dinle.'
    ),
    jsonb_build_object(
      'question', 'Kişiselleştirme kötü mü?',
      'answer', 'Hayır, ama dengeli olmalı.',
      'example', 'Önerilere körü körüne bağlanma.'
    ),
    jsonb_build_object(
      'question', 'Haberlere etkisi?',
      'answer', 'Polarizasyon artırır.',
      'example', 'Tek taraflı haber tüketimi.'
    ),
    jsonb_build_object(
      'question', 'Çocuklar nasıl etkilenir?',
      'answer', 'Dünya görüşü daralmış olur.',
      'example', 'Eleştirel düşünme azalır.'
    )
  )
)
WHERE title = 'Algoritma ve Filtre Balonları';
