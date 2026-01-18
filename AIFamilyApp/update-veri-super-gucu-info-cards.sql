-- Yapay Zekânın Süper Gücü: Veri dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Veri nedir?',
      'answer', 'Bilgi parçacıkları.',
      'example', 'Yazı, fotoğraf, ses, video.'
    ),
    jsonb_build_object(
      'question', 'YZ veriden ne yapar?',
      'answer', 'Örüntü öğrenir.',
      'example', 'Video önerileri, klavye tahmini.'
    ),
    jsonb_build_object(
      'question', 'Veri çeşitleri nelerdir?',
      'answer', 'Yapısal–yapısız.',
      'example', 'Tablolar vs. metin/görüntü.'
    ),
    jsonb_build_object(
      'question', 'Kalitesiz veri sonucu?',
      'answer', 'Hatalı tahmin.',
      'example', 'Yanlış öneri, yanlış sınıflama.'
    ),
    jsonb_build_object(
      'question', 'Önyargılı veri ne yapar?',
      'answer', 'Adaletsiz sonuç.',
      'example', 'Tek tip örnekten öğrenen modeller.'
    ),
    jsonb_build_object(
      'question', 'Etiketleme nedir?',
      'answer', 'Veriye anlam ekleme.',
      'example', 'Bu kedi diye işaretlenen fotoğraflar.'
    ),
    jsonb_build_object(
      'question', 'Anonimleştirme niçin?',
      'answer', 'Mahremiyet koruma.',
      'example', 'Kimliksizleştirilmiş sağlık verileri.'
    ),
    jsonb_build_object(
      'question', 'Eğitim ve çıkarım farkı?',
      'answer', 'Öğrenme vs. kullanma.',
      'example', 'Modeli eğitmek / soruya cevap vermek.'
    ),
    jsonb_build_object(
      'question', 'Aşırı uyum (overfitting) nedir?',
      'answer', 'Ezbere öğrenme.',
      'example', 'Eğitim verisine yapışan, genelleyemeyen model.'
    ),
    jsonb_build_object(
      'question', 'Dijital ayak izi ne demek?',
      'answer', 'Bıraktığın veri izleri.',
      'example', 'Aramalar, beğeniler, konum geçmişi.'
    )
  )
)
WHERE id = '49b01d02-8ebf-4f0e-9d5b-d0fcd095e643';
