-- AI Nerede Yaşar? dersinin içeriğini güncelle
UPDATE lessons
SET module_content = jsonb_build_object(
  'video_section', jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/3-ai-nerede-yasiyor.mp4',
    'duration', 120,
    'description', 'AI aslında her yerde! Telefonunuzdan oyunlara, evinizdeki akıllı cihazlardan internete kadar AI ile çevrilisiniz. Bu videoda AI nın günlük hayatta nerede saklandığını keşfedin!'
  ),
  'real_life_example', jsonb_build_object(
    'title', 'Gerçek Hayattan: Sabah Rutini',
    'scenario', 'Çocuğunuz sabah uyanıyor: Telefonda alarm çalıyor, kahvaltıda YouTube videosu izliyor, okula giderken Google Haritalar kullanıyorsunuz. Hepsinde AI var!',
    'explanation', 'Alarm uygulaması uyku düzeninizi öğrenir ve ideal uyandırma saatini önerir. YouTube hangi videoları izlediğinizi öğrenip benzer içerikler gösterir. Google Haritalar trafik durumunu tahmin edip en hızlı yolu bulur. AI artık günlük hayatımızın her anında!'
  ),
  'info_cards', jsonb_build_array(
    jsonb_build_object(
      'question', 'Telefonunda AI var mı?',
      'answer', 'Evet! Sesli asistan (Siri, Google), fotoğraf düzenleme, yüz tanıma, klavye otomatik tamamlama hepsi AI.',
      'example', 'Fotoğraf çekerken arka planı bulanıklaştırması, otomatik filtre önermesi.'
    ),
    jsonb_build_object(
      'question', 'YouTube ve Netflix te AI var mı?',
      'answer', 'Evet! Hangi videoları izlediğini öğreniyor ve sana benzer içerikler öneriyor.',
      'example', 'Minecraft videosu izlersen sürekli oyun videoları önermesi.'
    ),
    jsonb_build_object(
      'question', 'Oyunlarda AI var mı?',
      'answer', 'Evet! Oyundaki rakipler (botlar) AI kullanarak seninle savaşır, karar verir.',
      'example', 'Futbol oyununda bilgisayar takımının hareketleri, stratejileri.'
    ),
    jsonb_build_object(
      'question', 'Google Haritalar da AI var mı?',
      'answer', 'Evet! Trafik durumunu tahmin eder, en hızlı yolu bulur, varış saatini söyler.',
      'example', 'Saat 17:00 da yola çıkarsan 30 dakika, 18:00 da çıkarsan 50 dakika demesi.'
    ),
    jsonb_build_object(
      'question', 'Akıllı ev cihazlarında AI var mı?',
      'answer', 'Evet! Alexa, Google Home gibi asistanlar, akıllı termostatlar AI ile çalışır.',
      'example', 'Alexa müzik aç deyince seni anlaması, akıllı termostatın hangi saatte ısıtacağını öğrenmesi.'
    ),
    jsonb_build_object(
      'question', 'E-posta kutusunda AI var mı?',
      'answer', 'Evet! Spam (gereksiz) mailleri otomatik ayırır, önemli mailleri üste çıkarır.',
      'example', 'Reklam maillerinin spam klasörüne gitmesi.'
    ),
    jsonb_build_object(
      'question', 'Sosyal medyada AI var mı?',
      'answer', 'Evet! Instagram, TikTok hangi içerikleri beğeneceğini tahmin edip sana gösterir.',
      'example', 'Kedili videolara like atarsan sürekli kedi içeriği gelmesi.'
    ),
    jsonb_build_object(
      'question', 'Arama motorlarında AI var mı?',
      'answer', 'Evet! Google arama yaptığında kelimeni tamamlar, en iyi sonuçları üstte gösterir.',
      'example', 'yap yazdığında yapay zeka, yapışkan, yaprak diye öneri çıkması.'
    ),
    jsonb_build_object(
      'question', 'Çeviri uygulamalarında AI var mı?',
      'answer', 'Evet! Google Translate gibi uygulamalar AI ile dilleri öğrenir ve çevirir.',
      'example', 'İngilizce bir cümleyi anında Türkçe ye çevirmesi.'
    ),
    jsonb_build_object(
      'question', 'Hangi cihazda AI YOK?',
      'answer', 'Normal lamba, kağıt kalem, top, bisiklet gibi basit eşyalarda AI yok.',
      'example', 'Işığı açtığında sadece yanar, hiçbir şey öğrenmez veya tahmin etmez.'
    )
  ),
  'parent_guide', jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Yapay zeka artık sadece bilim kurgu değil, günlük hayatımızın her yerinde. Telefon, oyun, video önerileri, harita... Hepsi AI kullanıyor. AI sihirli bir güç değil, sadece veri toplayıp öğrenen ve tahmin yapan bir yazılım. Çocuğunuza AI nın nerede olduğunu göstermek, teknolojiye bilinçli yaklaşmasını sağlar.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'AI, bir sürü örnek görerek öğrenen bilgisayar programı. Tıpkı sen bisiklet sürmeyi deneyerek öğrendiğin gibi, AI de milyonlarca video, fotoğraf veya metin okuyarak öğreniyor. Sonra sana en sevdiğin şeyleri tahmin etmeye çalışıyor. YouTube nın sana sürekli oyun videosu önermesi bu yüzden! Sen oyun videosu izlediğin için, AI da Ah, bu çocuk oyun seviyor diye öğreniyor.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Sabah Rutini',
            'content', 'Sabah alarm çalıyor (AI uyku düzenini öğrendi), kahvaltıda YouTube açıyorsunuz (AI video öneriyor), okula giderken Google Haritalar kullanıyorsunuz (AI trafik tahmin ediyor). Henüz saat 9 olmadı ama 3 kere AI kullandınız!'
          ),
          jsonb_build_object(
            'title', 'Oyun Zamanı',
            'content', 'Çocuğunuz oyun oynarken karşısındaki rakip bot (bilgisayar oyuncusu) aslında AI. Hareketlerinizi izleyip size göre strateji geliştiriyor. Bazen kazanmanızı sağlayıp bazen zorlaştırıyor ki oyun eğlenceli olsun.'
          ),
          jsonb_build_object(
            'title', 'Aile Film Gecesi',
            'content', 'Netflix açtığınızda size öneri geliyor. Nasıl biliyor ne izlemek istediğinizi? AI, ailenizin daha önce izlediği filmleri, ne kadar izlediğinizi, hangi sahnelerde ileri sardığınızı öğreniyor. Sonra benzer filmleri öneriyor.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Evimizde kaç tane AI kullanan cihaz var sence? Birlikte sayayım mı?',
          'YouTube sana neden hep aynı tür videoları öneriyor? AI bunu nasıl biliyor?',
          'Sence AI her zaman doğru tahmin yapar mı? Hiç yanlış öneri aldın mı?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'AI herşeyi biliyor, çok akıllı!',
            'right', 'AI sadece gördüğü örneklerden öğrenir, her şeyi bilmez.'
          ),
          jsonb_build_object(
            'wrong', 'AI seni izliyor, korkmalısın.',
            'right', 'AI veri topluyor, bunu bilmek ve dikkatli olmak önemli.'
          ),
          jsonb_build_object(
            'wrong', 'AI robottur.',
            'right', 'AI bir yazılım, robotlar fiziksel makineler. İkisi farklı.'
          )
        ),
        'footer', 'AI yi gizemli değil, anlaşılır hale getirin.'
      )
    )
  ),
  'quiz', jsonb_build_object(
    'type', 'categorize',
    'question', 'Her cihaz için doğru grubu seç!',
    'categories', jsonb_build_array('AI Var 🤖', 'AI Yok 🔌'),
    'items', jsonb_build_array(
      jsonb_build_object(
        'item', 'Robot Süpürge',
        'category', 'AI Var 🤖'
      ),
      jsonb_build_object(
        'item', 'Hesap Makinesi',
        'category', 'AI Yok 🔌'
      ),
      jsonb_build_object(
        'item', 'Spotify (Müzik Önerileri)',
        'category', 'AI Var 🤖'
      ),
      jsonb_build_object(
        'item', 'Akıllı Termostat',
        'category', 'AI Var 🤖'
      ),
      jsonb_build_object(
        'item', 'Dijital Kamera',
        'category', 'AI Yok 🔌'
      ),
      jsonb_build_object(
        'item', 'Google Çeviri',
        'category', 'AI Var 🤖'
      ),
      jsonb_build_object(
        'item', 'Akıllı Saat (Sağlık Takibi)',
        'category', 'AI Var 🤖'
      ),
      jsonb_build_object(
        'item', 'Mikrodalga Fırın',
        'category', 'AI Yok 🔌'
      ),
      jsonb_build_object(
        'item', 'Netflix Film Önerileri',
        'category', 'AI Var 🤖'
      ),
      jsonb_build_object(
        'item', 'USB Bellek',
        'category', 'AI Yok 🔌'
      )
    )
  ),
  'badge', jsonb_build_object(
    'name', 'AI Dedektifi',
    'icon', '🔍',
    'points', 10,
    'description', 'Tebrikler! AI nın günlük hayatta nerede olduğunu keşfettiniz!'
  )
)
WHERE id = '35c2dd0a-69e2-4fa4-ab0e-2ff516bc1b07';
