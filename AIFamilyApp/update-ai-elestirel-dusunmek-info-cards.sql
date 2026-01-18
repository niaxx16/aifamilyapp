-- AI'ya Karşı Eleştirel Düşünmek dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'İlk adım nedir?',
      'answer', 'Kaynak sorgulama.',
      'example', 'Bu bilgiyi nereden aldı?'
    ),
    jsonb_build_object(
      'question', 'Kanıt nasıl istenir?',
      'answer', 'Referans talebi.',
      'example', 'Link/kitap/uzman adı ver.'
    ),
    jsonb_build_object(
      'question', 'Bilgi güncel mi?',
      'answer', 'Tarih kontrolü.',
      'example', 'Eski kuralların önerilmesi.'
    ),
    jsonb_build_object(
      'question', 'Çelişen cevaplar normal mi?',
      'answer', 'Evet, olasılıksal.',
      'example', 'Aynı soruya farklı yanıtlar.'
    ),
    jsonb_build_object(
      'question', 'Önyargı nasıl oluşur?',
      'answer', 'Taraflı veri.',
      'example', 'Tek bakış açılı örnekler.'
    ),
    jsonb_build_object(
      'question', '"Doğru gibi" hissetmesi yeterli mi?',
      'answer', 'Hayır, doğrula.',
      'example', 'Güzel yazılmış ama hatalı bilgi.'
    ),
    jsonb_build_object(
      'question', 'Korelasyon = nedensellik mi?',
      'answer', 'Hayır, karıştırma.',
      'example', 'İzleyen arttı, başarı arttı iddiaları.'
    ),
    jsonb_build_object(
      'question', 'Görsel/Video doğru mu?',
      'answer', 'Deepfake kontrolü.',
      'example', 'Tersine görsel arama, tutarsız ışık/eller.'
    ),
    jsonb_build_object(
      'question', 'İyi sorunun kuralı?',
      'answer', 'Kim–Ne–Nasıl–Kanıt.',
      'example', 'Kim diyor, neye dayanıyor, nasıl biliyor?'
    ),
    jsonb_build_object(
      'question', 'Son kararı kim verir?',
      'answer', 'İnsan yargısı.',
      'example', 'Ödev, sağlık, finans kararları.'
    )
  )
)
WHERE id = 'd02905e1-0535-41d4-865b-eea3fc352329';
