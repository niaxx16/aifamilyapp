-- AI'ın Duyguları Var Mı? dersinin quiz bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'categorize',
    'question', 'Aşağıdaki durumları incele: Gerçek duygu mu, taklit mi, yoksa sadece program komutu mu?',
    'description', '❤️ Gerçek Hissediyor: İnsanlar ve canlılar gerçekten duygu hisseder\n🎭 Taklit Ediyor: AI duygu ifadelerini taklit eder ama hissetmez\n💻 Sadece Komut: Programlanmış tepki, duygu taklidi bile yok',
    'categories', jsonb_build_array('❤️ Gerçek Hissediyor', '🎭 Taklit Ediyor', '💻 Sadece Komut'),
    'items', jsonb_build_array(
      jsonb_build_object(
        'item', 'Arkadaşın senin hediyene çok sevindiği için gözleri doldu',
        'category', '❤️ Gerçek Hissediyor'
      ),
      jsonb_build_object(
        'item', 'Siri Çok mutlu oldum dedi',
        'category', '🎭 Taklit Ediyor'
      ),
      jsonb_build_object(
        'item', 'Hesap makinesi sonucu gösterdi',
        'category', '💻 Sadece Komut'
      ),
      jsonb_build_object(
        'item', 'Annen üzüldüğünde sesi titredi',
        'category', '❤️ Gerçek Hissediyor'
      ),
      jsonb_build_object(
        'item', 'ChatGPT Üzgünüm, yardımcı olamadım yazdı',
        'category', '🎭 Taklit Ediyor'
      ),
      jsonb_build_object(
        'item', 'Alarm saatte çaldı',
        'category', '💻 Sadece Komut'
      ),
      jsonb_build_object(
        'item', 'Köpeğin seni görünce kuyruğunu salladı',
        'category', '❤️ Gerçek Hissediyor'
      ),
      jsonb_build_object(
        'item', 'Oyun karakteri kaybedince ağlayan yüz yaptı',
        'category', '🎭 Taklit Ediyor'
      ),
      jsonb_build_object(
        'item', 'Fotoğraf uygulaması Resim kaydedildi mesajı gösterdi',
        'category', '💻 Sadece Komut'
      ),
      jsonb_build_object(
        'item', 'Bebek acıkınca ağladı',
        'category', '❤️ Gerçek Hissediyor'
      )
    )
  )
)
WHERE id = '860e2c32-b826-48db-bbc4-977ea5d43b93';
