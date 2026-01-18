-- AI Nerede Yaşar dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'AI tek bir yerde "yaşar" mı?',
      'answer', 'Hayır, dağınık çalışır.',
      'example', 'Telefon, bilgisayar ve internet servisleri aynı anda rol alır.'
    ),
    jsonb_build_object(
      'question', '"Bulut" dediğimiz yer nedir?',
      'answer', 'Uzak veri merkezleri.',
      'example', 'ChatGPT, YouTube önerileri, çeviri servisleri.'
    ),
    jsonb_build_object(
      'question', 'Telefonun içindeki AI nasıl çalışır?',
      'answer', 'Cihaz-içi (on-device).',
      'example', 'Yüz tanıma, klavye tahmini, fotoğraf düzenleme.'
    ),
    jsonb_build_object(
      'question', '"Sunucu" ne işe yarar?',
      'answer', 'Güçlü işlem yapar.',
      'example', 'Soru buluta gider, cevap oradan geri gelir.'
    ),
    jsonb_build_object(
      'question', 'İnternet olmadan AI mümkün mü?',
      'answer', 'Sınırlı, yerel modeller.',
      'example', 'Offline çeviri, basit ses tanıma, oyun botları.'
    ),
    jsonb_build_object(
      'question', '"Edge AI" ne demek?',
      'answer', 'Cihazda karar verme.',
      'example', 'Robot süpürge haritalama, akıllı kamera uyarıları.'
    ),
    jsonb_build_object(
      'question', 'AI veriyi nerede kullanır?',
      'answer', 'Cihaz + bulut.',
      'example', 'Telefon ayarları (yerel), öneri sistemleri (bulut).'
    ),
    jsonb_build_object(
      'question', 'Mikrofon/kamera neyi temsil eder?',
      'answer', 'Girdi (duyular).',
      'example', 'Alexa beni duyuyor mu? → Mikrofon + bulut işlem.'
    ),
    jsonb_build_object(
      'question', 'Güvenlik ve izinler neden önemli?',
      'answer', 'Veri paylaşımı kontrolü.',
      'example', 'Uygulama izinleri: mikrofon, kamera, konum.'
    ),
    jsonb_build_object(
      'question', 'Aynı AI farklı cihazda olabilir mi?',
      'answer', 'Evet, çoklu ortam.',
      'example', 'Asistanın telefonu, hoparlörü ve TV de çalışması.'
    )
  )
)
WHERE id = '35c2dd0a-69e2-4fa4-ab0e-2ff516bc1b07';
