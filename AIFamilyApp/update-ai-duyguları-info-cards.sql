-- AI'ın Duyguları Var Mı? dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'AI nın duyguları var mı?',
      'answer', 'Hayır, taklit eder.',
      'example', 'Sohbet botunun üzgünüm demesi.'
    ),
    jsonb_build_object(
      'question', 'Neden "üzgünüm" diyebilir?',
      'answer', 'Kalıp cümle/öğrenme.',
      'example', 'Müşteri hizmeti botları.'
    ),
    jsonb_build_object(
      'question', 'Bilinç sahibi mi?',
      'answer', 'Hayır, program.',
      'example', 'İnsan gibi konuşsa da bilinçsiz.'
    ),
    jsonb_build_object(
      'question', 'Duygu analizi ne yapar?',
      'answer', 'Metin tonunu sınıflar.',
      'example', 'Olumlu/olumsuz yorum algılama.'
    ),
    jsonb_build_object(
      'question', 'Yapay empati nedir?',
      'answer', 'Duyguyu taklit eden yanıt.',
      'example', 'Seni anlıyorum diyen asistanlar.'
    ),
    jsonb_build_object(
      'question', 'Niyet ve değerleri var mı?',
      'answer', 'Hayır, veriye bağlı.',
      'example', 'Cevaplar örneklerden türetilir.'
    ),
    jsonb_build_object(
      'question', 'Affective computing ne?',
      'answer', 'Duygu tanıma teknolojisi.',
      'example', 'Yüz/ ses analizi yapan uygulamalar.'
    ),
    jsonb_build_object(
      'question', 'Neden "insan gibi" geliyor?',
      'answer', 'Dil kalıpları/örüntü.',
      'example', 'Akıcı sohbet eden modeller.'
    ),
    jsonb_build_object(
      'question', 'Kişiselleştirme tehlikesi?',
      'answer', 'Aşırı bağ kurma riski.',
      'example', 'Botu arkadaş sanmak.'
    ),
    jsonb_build_object(
      'question', 'Çocuklara nasıl anlatmalı?',
      'answer', 'Taklit, gerçek değil.',
      'example', 'Oyunda üzgün görünen karakterin aslında kod olması.'
    )
  )
)
WHERE id = '860e2c32-b826-48db-bbc4-977ea5d43b93';
