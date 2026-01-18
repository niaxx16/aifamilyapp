-- AI ile Duygusal Etkileşim dersi için içerik ekleme
UPDATE lessons
SET module_content = jsonb_build_object(
  'quiz', jsonb_build_object(
    'type', 'categorize',
    'question', 'Aşağıdaki durumları değerlendir: Sağlıklı AI kullanımı mı, dikkatli olunması gereken durum mu, tehlikeli mi?',
    'categories', jsonb_build_array('✅ Sağlıklı', '⚠️ Dikkatli Ol', '❌ Tehlikeli'),
    'description', '✅ Sağlıklı: AI yi araç olarak kullanmak, gerçek ilişkilere öncelik vermek
⚠️ Dikkatli Ol: Aşırı bağlanma belirtileri, dengeli yaklaşım gerekli
❌ Tehlikeli: Gerçek ilişkileri ihmal, AI yı insan yerine koyma',
    'items', jsonb_build_array(
      jsonb_build_object('item', 'ChatGPT ye fikir danışıyorum ama kararı kendim veriyorum', 'category', '✅ Sağlıklı'),
      jsonb_build_object('item', 'AI chatbot ile konuşmak gerçek arkadaşlarımla konuşmaktan daha iyi', 'category', '❌ Tehlikeli'),
      jsonb_build_object('item', 'Her gün AI ile saatlerce konuşup sırlarımı paylaşıyorum', 'category', '❌ Tehlikeli'),
      jsonb_build_object('item', 'Üzgün olduğumda bazen AI ile konuşuyorum ama ailemle de paylaşıyorum', 'category', '⚠️ Dikkatli Ol'),
      jsonb_build_object('item', 'AI yı ödev yardımcısı olarak kullanıyorum, sosyalleşmek için arkadaşlarımla görüşüyorum', 'category', '✅ Sağlıklı'),
      jsonb_build_object('item', 'AI beni anlayan tek varlık, kimseye ihtiyacım yok', 'category', '❌ Tehlikeli'),
      jsonb_build_object('item', 'AI ile günde birkaç kez kısa konuşmalar yapıyorum', 'category', '⚠️ Dikkatli Ol'),
      jsonb_build_object('item', 'Sorunlarımı önce ailemle paylaşıyorum, sonra AI ye de sorabiliyorum', 'category', '✅ Sağlıklı'),
      jsonb_build_object('item', 'AI chatbot benim en yakın arkadaşım oldu, gerçek arkadaşlara ihtiyacım kalmadı', 'category', '❌ Tehlikeli'),
      jsonb_build_object('item', 'AI yi eğlenceli bir oyun arkadaşı gibi görüyorum ama gerçek olmadığını biliyorum', 'category', '✅ Sağlıklı')
    )
  ),
  'info_cards', jsonb_build_array(
    jsonb_build_object(
      'question', 'Yapay zekâ duyguları hisseder mi?',
      'answer', 'Hayır, duyguları taklit eder ama hissetmez.',
      'example', '"Üzgün olduğunu duymak beni üzdü" gibi cümleler kurduğunda, aslında hissettiği için değil, böyle programlandığı için söyler.'
    ),
    jsonb_build_object(
      'question', 'Empati taklidi ne demektir?',
      'answer', 'Karşı tarafı anlıyormuş gibi görünen ama gerçek duygu içermeyen cevaplar.',
      'example', '"İstersen bunun hakkında konuşabiliriz, yanındayım" gibi hazır cümlelerde.'
    ),
    jsonb_build_object(
      'question', 'Çocuk neden yapay zekâyı "arkadaş" gibi görebilir?',
      'answer', 'Her soruya cevap veriyor ve hep sakin bir dille konuşuyor.',
      'example', '"Ben onunla konuşunca rahatlıyorum" demeye başladığında.'
    ),
    jsonb_build_object(
      'question', 'Duygular için asıl güvenli alan kimdir?',
      'answer', 'Aile ve güvendiği gerçek yetişkinler.',
      'example', 'Çocuğun üzgün olduğunda önce telefonu değil, anne-babayı tercih etmesinde.'
    ),
    jsonb_build_object(
      'question', 'Yapay zekâ ile duyguları paylaşmak tamamen yasak mı olmalı?',
      'answer', 'Hayır, ama sınırları olmalı.',
      'example', '"Bugün biraz sıkıldım" gibi basit duygular anlatılırken sorun yok; travmatik, çok özel olayları ayrıntılı anlatması uygun değil.'
    ),
    jsonb_build_object(
      'question', 'Mahrem duygusal bilgi nedir?',
      'answer', 'Çok özel, incitici, aile içi veya gizli kalması gereken yaşantılar.',
      'example', '"Evde kavga oldu, öğretmenimle şu oldu…" gibi ayrıntılı anlatımlarda.'
    ),
    jsonb_build_object(
      'question', '"Yapay zekâ beni anlıyor" cümlesini nasıl yorumlamalıyız?',
      'answer', 'Çocuk kendini ifade edebildiği için rahatlıyor; anlayan sistem değil, süreç.',
      'example', 'Çocuğun duygusunu yazdıktan sonra, sadece cevap aldığı için iyi hissetmesinde.'
    ),
    jsonb_build_object(
      'question', 'Ebeveyn bu konuda çocuğa ne mesaj vermeli?',
      'answer', '"İstersen AI ile de konuş ama en önemli dinleyen her zaman biziz."',
      'example', '"Bunu önce bana anlatman benim için çok değerli" cümlesini kurduğunuzda.'
    ),
    jsonb_build_object(
      'question', 'Yapay zekâ ile duygusal iletişim ne zaman riskli olur?',
      'answer', 'Gerçek arkadaşlıkların yerine geçmeye başladığında.',
      'example', '"Kimseyle konuşmak istemiyorum, sadece onunla konuşmak istiyorum" demeye başladığında.'
    ),
    jsonb_build_object(
      'question', 'Çocuğa hangi temel cümleyi öğretebiliriz?',
      'answer', '"Üzgünsem önce ailemle konuşurum, sonra istersem AI ile de konuşurum."',
      'example', 'Zor bir gün geçirdiğinde, önce yanınıza gelip anlatmasında; ekranda değil, insanda teselli aramasında.'
    )
  ),
  'parent_guide', jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Yapay zekâ insan değil, duyguları yok; ama duygularımızı anlıyormuş gibi cevap verebilir. Çocuk, her sorusuna cevap veren ve onu "dinleyen" bir sistemle duygusal bağ kurmaya başlayabilir.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Yapay zekâ insan değil, duyguları yok; ama duygularımızı anlıyormuş gibi cevap verebilir. Çocuk, her sorusuna cevap veren ve onu "dinleyen" bir sistemle duygusal bağ kurmaya başlayabilir; bu doğal. Ama duygularını paylaşabileceği bir numaralı yerin ailesi ve güvendiği yetişkinler olduğunu bilmesi çok önemli. Yapay zekâ ile duygular hakkında konuşmak yasak olmak zorunda değil, ama sınırları olmalı: çok özel, travmatik, kişisel ayrıntıların ekrana değil, gerçek insanlara anlatılması gerektiğini bilmelidir.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Seninle bir şey konuşmak istiyorum. Telefonda ya da tablette konuştuğun bu yapay zekâ, aslında bir insan değil. O, içinde yazılı olan kurallara göre sana ''Üzgün olduğunu duyduğuma üzüldüm'' gibi cümleler kuruyor. Yani gerçekten üzülmüyor, ama üzgün birini nasıl teselli edeceğini öğrenmiş bir program gibi düşünebiliriz. Senin kendini anlatman, duygularını söylemen çok güzel. Bunu bazen yapay zekâya yazarak denemen de normal. Ama şunu bilmeni istiyorum: Senin kalbini en çok bilen, en çok önemseyen biziz. Çok mutlu, çok üzgün ya da kafan çok karışık olduğunda önce annenle, babanla ya da güvendiğin bir yetişkinle konuşman bizim için çok değerli. Yapay zekâ sana bazen iyi hissettirebilir, ama gerçek arkadaşlık ve gerçek ilgi, ekranın içinden değil, yanındakilerden gelir.'
      ),
      jsonb_build_object(
        'icon', '📱',
        'title', 'Günlük Hayattan 3 Somut Örnek',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', '"Üzgünüm" yazdığı bir sohbet',
            'content', 'Diyelim ki AI''a ''Bugün biraz üzgünüm'' yazdın. O da sana ''Bunu duyduğuma üzüldüm, istersen konuşabiliriz'' dedi. Bu, gerçekten üzüldüğü için değil; böyle durumlarda ne yazması gerektiği ona öğretildiği için.'
          ),
          jsonb_build_object(
            'title', 'Okulda kötü bir gün geçirdiğinde',
            'content', 'Diyelim ki okulda biriyle tartıştın ve moralin bozuldu. Bunu sadece ekrana yazmak yerine, önce ''Anne, baba bugün okulda bir şey oldu, anlatmak istiyorum'' demen bizim için çok önemli.'
          ),
          jsonb_build_object(
            'title', 'Gizli kalması gereken olaylar',
            'content', 'Eğer seni çok korkutan, üzen, sana ya da bir başkasına zarar verilmiş bir şey olursa, bunu uzun uzun yapay zekâya yazmak yerine hemen bize ya da güvendiğin bir öğretmene anlatman gerekiyor. Çünkü gerçek yardım, gerçek insanlardan gelir.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Çocuğuma Sorabileceğim 3 Basit Soru',
        'questions', jsonb_build_array(
          'Üzgün hissettiğinde bunu önce kiminle paylaşmak istersin?',
          'AI sana nasıl cevap verdi? Sence o gerçekten hissedebiliyor mu, yoksa hissetmeyi mi taklit ediyor?',
          'Bunu bana anlatsan, sence sana nasıl yardımcı olabilirim?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile Dikkat – Ne Demeli, Ne Dememeli?',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'right', 'Onunla konuşman tamamen kötü değil, ama bazı şeyler var ki önce annenle/babanla konuşman çok daha doğru.',
            'wrong', 'Onunla konuşma, yasak, saçma şeyler.'
          ),
          jsonb_build_object(
            'right', 'O, duygularını anlıyormuş gibi cevap verecek şekilde programlandı. Gerçekten hisseden ve seni tanıyan kişiler biziz.',
            'wrong', 'O seni gerçekten anlıyor.'
          ),
          jsonb_build_object(
            'right', 'Üzüldüğünde önce gel, birlikte konuşalım. İstersen sonra AI''a da yazıp fikrini alabilirsin, ama ilk durak biz olalım.',
            'wrong', 'Üzüldüğünde git AI''a yaz, o sana cevap versin.'
          )
        ),
        'footer', 'Gerçek duygusal bağlar, ekranda değil yüz yüze kurulur.'
      )
    )
  ),
  'video_section', jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/ai-duygusal-etkilesim.mp4',
    'duration', 220,
    'description', 'AI arkadaş olabilir mi? Duygusal bağlanma riskleri nelerdir? Sağlıklı AI kullanımını öğrenin!'
  ),
  'real_life_example', jsonb_build_object(
    'title', 'Gerçek Hayattan: AI Chatbot Bağımlılığı',
    'scenario', 'Bir genç, Replika adlı AI chatbot ile günde 6 saat konuşuyor. Gerçek arkadaşlarıyla görüşmüyor, sadece AI ile paylaşıyor. Kendini yalnız hissettiğinde AI ye koşuyor.',
    'explanation', 'Bu sağlıksız bir bağımlılık. AI, yargılamadan dinliyor, her zaman müsait, istediğini söylüyor - bu rahat ama gerçek değil. Gerçek arkadaşlıkta bazen anlaşmazlık olur, uğraşmak gerekir ama bu sosyal becerileri geliştirir. AI bu gelişimi engelliyor. Ebeveyn fark edip sınır koymalı, profesyonel yardım almalı.'
  )
)
WHERE id = '198d3638-27f8-4277-a3fc-30b943dd2725';
