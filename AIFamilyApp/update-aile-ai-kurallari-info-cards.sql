-- Aile İçi AI Kuralları dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Neden aile kuralları gerekli?',
      'answer', 'Güvenli AI kullanımı için.',
      'example', 'Ne paylaşılır, ne zaman kullanılır.'
    ),
    jsonb_build_object(
      'question', 'Kurallar nasıl oluşturulur?',
      'answer', 'Birlikte karar verin.',
      'example', 'Aile toplantısında tartışın.'
    ),
    jsonb_build_object(
      'question', 'Yaş grubuna göre kurallar?',
      'answer', 'Evet, farklı olmalı.',
      'example', '6 yaş vs 12 yaş farklı sınırlar.'
    ),
    jsonb_build_object(
      'question', 'Ekran süresi sınırı koymalı mıyız?',
      'answer', 'Evet, dengeli olmalı.',
      'example', 'Günde 1-2 saat AI kullanımı.'
    ),
    jsonb_build_object(
      'question', 'Hangi AI araçları uygun?',
      'answer', 'Yaşa ve amaca uygun olanlar.',
      'example', 'Eğitim odaklı, güvenli içerikler.'
    ),
    jsonb_build_object(
      'question', 'İzin sistemi nasıl olmalı?',
      'answer', 'Ebeveyn onayı şart.',
      'example', 'Yeni uygulama önce sorulmalı.'
    ),
    jsonb_build_object(
      'question', 'Paylaşım kuralları?',
      'answer', 'Kişisel veri paylaşılmaz.',
      'example', 'İsim, adres, okul söylenmez.'
    ),
    jsonb_build_object(
      'question', 'AI ile ödev yapmak?',
      'answer', 'Yardımcı olarak, kopya olarak değil.',
      'example', 'Araştırma için evet, yazdırmak için hayır.'
    ),
    jsonb_build_object(
      'question', 'Kural ihlali olursa ne olur?',
      'answer', 'Sonuçlar net olmalı.',
      'example', 'Uyarı, izin kısıtlaması.'
    ),
    jsonb_build_object(
      'question', 'Kurallar güncellenebilir mi?',
      'answer', 'Evet, esnek olun.',
      'example', 'Çocuk büyüdükçe, kurallar değişir.'
    )
  )
)
WHERE title = 'Aile İçi AI Kuralları';
