-- AI Hata Yapabilir dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', '"AI hata yapabilir" ne demek?',
      'answer', 'Tahmin; garanti değil.',
      'example', 'Sohbet botu yanlış bilgi verebilir.'
    ),
    jsonb_build_object(
      'question', 'AI neden yanılır?',
      'answer', 'Hatalı/eksik veri.',
      'example', 'Eski haberleri doğru sanması.'
    ),
    jsonb_build_object(
      'question', '"Halüsinasyon" nedir?',
      'answer', 'Uydurma içerik üretme.',
      'example', 'Var olmayan kaynak/isim üretmesi.'
    ),
    jsonb_build_object(
      'question', 'Önyargı hatası neye bağlı?',
      'answer', 'Taraflı veri.',
      'example', 'Tek tip örnekten öğrenmiş model.'
    ),
    jsonb_build_object(
      'question', 'Güncellik neden önemli?',
      'answer', 'Eski veri yanlışı.',
      'example', 'Yeni kuralları atlaması.'
    ),
    jsonb_build_object(
      'question', 'Aynı soruya farklı cevap olur mu?',
      'answer', 'Evet, olasılıksal çıktı.',
      'example', 'Bugün ve yarın farklı yanıtlar.'
    ),
    jsonb_build_object(
      'question', 'İyi istem (prompt) ne sağlar?',
      'answer', 'Daha doğru bağlam.',
      'example', 'Net talep → daha tutarlı cevap.'
    ),
    jsonb_build_object(
      'question', 'Doğrulama nasıl yapılır?',
      'answer', 'İkinci kaynakla kontrol.',
      'example', 'Ansiklopedi, güvenilir site, uzman.'
    ),
    jsonb_build_object(
      'question', 'İnsan denetimi neden şart?',
      'answer', 'Son kararı insan verir.',
      'example', 'Ödev, sağlık, finans kararları.'
    ),
    jsonb_build_object(
      'question', 'Hata örneği?',
      'answer', 'Yanlış sınıflama/öneri.',
      'example', 'Harita yanlış rota, kötü çeviri.'
    )
  )
)
WHERE id = 'cecf2a61-2b37-4c62-98a5-a85e7c6be391';
