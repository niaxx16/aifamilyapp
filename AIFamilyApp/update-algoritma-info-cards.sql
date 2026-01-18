-- Algoritma: AI'ın Tarif Defteri dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Algoritma nedir?',
      'answer', 'Adım adım talimatlar.',
      'example', 'Yemek tarifi, alışveriş listesi sırası.'
    ),
    jsonb_build_object(
      'question', 'AI algoritmayı nasıl kullanır?',
      'answer', 'Karar vermek için.',
      'example', 'Öneri sıralama, hata düzeltme.'
    ),
    jsonb_build_object(
      'question', '"If–else" ne demek?',
      'answer', 'Koşullu karar.',
      'example', 'Yağmur varsa şemsiye al.'
    ),
    jsonb_build_object(
      'question', 'Döngü (loop) nedir?',
      'answer', 'Tekrar eden adımlar.',
      'example', 'Listeyi tek tek kontrol etme.'
    ),
    jsonb_build_object(
      'question', 'Sıralama algoritması ne yapar?',
      'answer', 'Düzeni belirler.',
      'example', 'En çok izleneni üste koyma.'
    ),
    jsonb_build_object(
      'question', 'Filtreleme algoritması ne yapar?',
      'answer', 'İsteneni seçer.',
      'example', 'Yalnızca çocuk videoları göster.'
    ),
    jsonb_build_object(
      'question', 'Arama algoritması nedir?',
      'answer', 'Hızlı bulma yolu.',
      'example', 'Dosya, kişi, kelime arama.'
    ),
    jsonb_build_object(
      'question', 'Heüristik ne işe yarar?',
      'answer', 'Pratik kestirme.',
      'example', 'Navigasyonda hızlı rota tahmini.'
    ),
    jsonb_build_object(
      'question', 'Optimizasyon ne demek?',
      'answer', 'En iyiyi seçme.',
      'example', 'En kısa süre + az trafik rotası.'
    ),
    jsonb_build_object(
      'question', 'Hata yakalama (debug) nedir?',
      'answer', 'Sorun ayıklama.',
      'example', 'Uygulama çökmelerini düzeltme.'
    )
  )
)
WHERE id = '2fa783d4-0659-4855-a486-30e1964b6dfd';
