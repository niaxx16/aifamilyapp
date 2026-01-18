-- AI Hata Yapabilir dersinin quiz bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'matching',
    'question', 'AI hata örneklerini, hata nedenlerinle eşleştir!',
    'description', 'Sol taraftaki her hata örneği için, sağ taraftan doğru nedeni seç.',
    'pairs', jsonb_build_array(
      jsonb_build_object(
        'id', 1,
        'left', 'ChatGPT 2024 seçim sonuçlarını yanlış söyledi',
        'right', 'Güncel olmayan veri'
      ),
      jsonb_build_object(
        'id', 2,
        'left', 'Yüz tanıma sistemi sadece açık tenli insanları tanıyor',
        'right', 'Önyargılı veri'
      ),
      jsonb_build_object(
        'id', 3,
        'left', 'Çeviri uygulaması bank kelimesini hem banka hem kıyı olarak çevirdi',
        'right', 'Bağlam eksikliği'
      ),
      jsonb_build_object(
        'id', 4,
        'left', 'Sohbet botu var olmayan bir kitap önerisi yaptı',
        'right', 'Halüsinasyon (Uydurma)'
      ),
      jsonb_build_object(
        'id', 5,
        'left', 'Müzik öneri sistemi klasik müzik seven birine rap öneriyor',
        'right', 'Yetersiz kullanıcı verisi'
      ),
      jsonb_build_object(
        'id', 6,
        'left', 'Spam filtresi önemli bir maili spam olarak işaretledi',
        'right', 'Yanlış sınıflandırma'
      ),
      jsonb_build_object(
        'id', 7,
        'left', 'AI asistan aynı soruya bugün ve dün farklı cevap verdi',
        'right', 'Olasılıksal çıktı'
      ),
      jsonb_build_object(
        'id', 8,
        'left', 'Görüntü tanıma husky köpeğini kurt olarak algıladı',
        'right', 'Benzer örnekler arası karışıklık'
      )
    )
  )
)
WHERE id = 'cecf2a61-2b37-4c62-98a5-a85e7c6be391';
