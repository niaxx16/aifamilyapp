-- AI'ın Duyguları Var Mı? dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Yapay zekâ konuşabilir, cevap verebilir ama hissetmez. Duyguları taklit eder, gerçekten yaşamaz.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'YZ, bilinç veya duygu sahibi değildir. Üzgünüm, sevindim gibi ifadeleri, gördüğü örneklere dayanarak taklit eder. Çocuklar için sınır önemli: YZ = araç; gerçek bağ kurulan şey = insanlar.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Yapay zekâ bazen Üzgünüm ya da Seninle konuşmak çok güzel diyebilir. Ama bunları gerçekten hissetmez, sadece öğrendiği cümleleri kullanır. Yani o bir program; hisleri olan bir insan ya da arkadaş değil.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Sesli asistan konuşması',
            'content', 'Telefon ya da tablet Bugün sana nasıl yardımcı olabilirim? deyince, bu onun kibar biri olduğu için değil, böyle programlandığı için.'
          ),
          jsonb_build_object(
            'title', 'Oyundaki karakter',
            'content', 'Bir oyun karakteri üzgün surat yapıyor diye gerçekten üzgün olmuyor; tasarlayan kişi öyle çizdiği için öyle görünüyor.'
          ),
          jsonb_build_object(
            'title', 'Otomatik mail/mesaj',
            'content', 'Talebinizi aldığımıza çok sevindik gibi mailler geliyor ya, aslında seninle sevinen biri yok; hazır yazılmış cümleler çalışıyor.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence bir bilgisayar mutlu ya da üzgün olabilir mi?',
          'Yapay zekâ Seni seviyorum derse, bu gerçek mi olur, neden?',
          'Sence duygular, sadece insanlara ve canlılara mı aittir?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Yapay zekâ bizi çok seviyor.',
            'right', 'Yapay zekâ, sevdiğini söyleyebilir ama bu sadece bir cümledir, duygu değil.'
          ),
          jsonb_build_object(
            'wrong', 'Yapay zekâ kötü niyetli.',
            'right', 'Yapay zekâ niyetli olmaz. Onu yapan insanlar nasıl kullanırsa, öyle davranır.'
          )
        )
      )
    )
  )
)
WHERE id = '860e2c32-b826-48db-bbc4-977ea5d43b93';
