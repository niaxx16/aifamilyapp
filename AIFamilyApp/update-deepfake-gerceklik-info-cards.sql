-- "Deepfake" ve Gerçeklik dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Deepfake nedir?',
      'answer', 'AI ile sahte görüntü/ses.',
      'example', 'Olmayan konuşma, sahte video.'
    ),
    jsonb_build_object(
      'question', 'Nasıl yapılır?',
      'answer', 'Yapay zeka ile yüz değiştirme.',
      'example', 'GANs, neural networks kullanımı.'
    ),
    jsonb_build_object(
      'question', 'Neden tehlikeli?',
      'answer', 'Dezenformasyon yayılır.',
      'example', 'Sahte haberler, dolandırıcılık.'
    ),
    jsonb_build_object(
      'question', 'Nasıl anlaşılır?',
      'answer', 'Detaylara dikkat.',
      'example', 'Garip göz kırpma, senkronizasyon.'
    ),
    jsonb_build_object(
      'question', 'Yasal mı?',
      'answer', 'Kötü amaçlıysa hayır.',
      'example', 'Sahtekarlık, iftira suçtur.'
    ),
    jsonb_build_object(
      'question', 'İyi kullanım var mı?',
      'answer', 'Evet, sanat ve eğlence.',
      'example', 'Film efektleri, eğitici içerikler.'
    ),
    jsonb_build_object(
      'question', 'Sesli deepfake nedir?',
      'answer', 'Sahte ses klonlama.',
      'example', 'Birinin sesiyle konuşma yaratma.'
    ),
    jsonb_build_object(
      'question', 'Nasıl korunuruz?',
      'answer', 'Kaynak doğrulama.',
      'example', 'Güvenilir haber kaynaklarına bakma.'
    ),
    jsonb_build_object(
      'question', 'Deepfake dedektörü var mı?',
      'answer', 'Evet, ama tam değil.',
      'example', 'AI ile AI mücadelesi.'
    ),
    jsonb_build_object(
      'question', 'Gelecekte nasıl olacak?',
      'answer', 'Daha gerçekçi olacak.',
      'example', 'Tespit zorlaşacak.'
    )
  )
)
WHERE title = '"Deepfake" ve Gerçeklik';
