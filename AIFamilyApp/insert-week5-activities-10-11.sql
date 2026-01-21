-- Hafta 5 Etkinlikleri: Üretken Yapay Zeka (Prompt Mühendisliği) - 10-11 yaş grubu

-- Etkinlik 1: Prompt Savaşları (Kelimelerin Gücü)
INSERT INTO activities (
  title,
  description,
  type,
  duration,
  age_min,
  age_max,
  instructions,
  materials,
  points,
  week_number,
  difficulty_level,
  reflection_question,
  purpose,
  activity_type_label,
  steps,
  observations,
  detailed_materials
) VALUES (
  'Prompt Savaşları: Kelimelerin Gücü',
  'Yapay zekadan harika görseller almak için kelimeler ne kadar önemli? Ebeveynle yarışarak prompt mühendisliğinin sırlarını keşfet ve en iyi resmi sen oluştur!',
  'creative',
  30,
  10,
  11,
  'Bing Image Creator veya Canva kullanarak ebeveynle yarışın. Aynı konuda farklı promptlarla görseller oluşturup karşılaştırın.',
  ARRAY['Bilgisayar veya tablet', 'Bing Image Creator veya Canva'],
  25,
  5,
  2,
  'Basit prompt ile detaylı prompt arasındaki fark ne kadardı? Hangi kelimeler sonucu en çok değiştirdi?',
  'Yapay zekadan istediğimiz sonucu almak için "sıfatların", "sanat tarzlarının" ve "detayların" ne kadar önemli olduğunu yarışarak öğrenmek.',
  'Yaratıcılık ve Yarışma',
  '[
    {"step": 1, "title": "Yarışma Kuralları", "description": "\"Seninle bir yarışma yapacağız. İkimiz de aynı şeyi çizdirmeye çalışacağız: ''Uzayda sörf yapan bir astronot''. Ama kimin resmi daha havalı olursa o kazanacak!\""},
    {"step": 2, "title": "1. Tur - Ebeveynin Sırası (Kötü Örnek)", "description": "Ebeveyn çok basit bir komut yazsın: \"Uzayda sörf yapan astronot.\" Çıkan resme bakın. Muhtemelen standart, biraz sıkıcı bir resim olacaktır."},
    {"step": 3, "title": "2. Tur - Çocuğun Sırası (Mühendislik)", "description": "Çocuğa taktik verin: \"Benimki çok sade oldu. Sen şimdi onu süsle. Işık nasıl olsun? Astronotun kıyafeti ne renk? Arka planda ne var? Çizim mi olsun fotoğraf mı?\""},
    {"step": 4, "title": "Gelişmiş Prompt Örneği", "description": "Örnek: \"Uzayda, renkli bir nebulanın önünde, parlak gümüş kıyafetli bir astronot, neon ışıklı bir sörf tahtasıyla sörf yapıyor. Dijital sanat tarzında, 4K çözünürlük, çok detaylı.\""},
    {"step": 5, "title": "Sonuçları Karşılaştırma", "description": "İki resmi yan yana koyun. Fark inanılmaz olacaktır. Ders: \"Yapay zeka bir ressamdır ama ne çizeceğini ona sen söylersin. Kelimelerin ne kadar detaylıysa, resim o kadar sana özel olur.\""},
    {"step": 6, "title": "Rövanş", "description": "Şimdi çocuğun seçtiği çılgın bir konuda (Örn: \"Dondurma yiyen dinozor\") tekrar yarışın."}
  ]'::jsonb,
  '[
    {"title": "Betimleme Yeteneği", "description": "Zihnindeki hayali, uygun sıfatlarla (parlak, karanlık, neşeli, fütüristik) kelimelere dökebilmesi."},
    {"title": "Estetik Algı", "description": "Görselin kalitesini, tarzını ve kompozisyonunu eleştirebilmesi."}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "Bing Image Creator (bing.com/images/create) veya Canva Sihirli Medya", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Hikaye Ortaklığı (Sen Başla, O Devam Etsin)
INSERT INTO activities (
  title,
  description,
  type,
  duration,
  age_min,
  age_max,
  instructions,
  materials,
  points,
  week_number,
  difficulty_level,
  reflection_question,
  purpose,
  activity_type_label,
  steps,
  observations,
  detailed_materials
) VALUES (
  'Hikaye Ortaklığı: Sen Başla, O Devam Etsin',
  'Yapay zeka senin yazarlık ortağın olsun! Bir hikaye başlat, yapay zekanın devam ettirmesini izle, beğenmediğin yerleri düzelt. İnsan kontrolünün önemini keşfet!',
  'creative',
  35,
  10,
  11,
  'ChatGPT veya Gemini ile birlikte hikaye yazın. Çocuk başlasın, yapay zeka devam ettirsin, çocuk yönlendirsin.',
  ARRAY['Metin tabanlı yapay zeka (ChatGPT, Gemini veya Copilot)', 'Not defteri (isteğe bağlı)'],
  25,
  5,
  2,
  'Yapay zekayı yönlendirmeseydin hikaye nasıl olurdu? Neden insan kontrolü önemli?',
  'Yapay zekayı "ödevi yapan makine" olarak değil, "fikir veren yardımcı (Co-Pilot)" olarak kullanmayı öğrenmek. İnsan kontrolünün (Human-in-the-loop) önemini kavramak.',
  'İşbirliği ve Mantık Kontrolü',
  '[
    {"step": 1, "title": "Senaryo", "description": "\"Bugün bir hikaye yazacağız ama tek başına değilsin. Yapay zeka senin yazarlık ortağın olacak.\""},
    {"step": 2, "title": "Giriş (Çocuk Yazar)", "description": "Çocuktan ilginç bir giriş cümlesi yazmasını isteyin. Örnek: \"2050 yılında İstanbul''da, kedilerin konuşmasını sağlayan bir tasma icat edildi ve işler karıştı.\""},
    {"step": 3, "title": "Gelişme (Yapay Zeka)", "description": "Bu cümleyi yapay zekaya yazın ve \"Hikayeyi devam ettir ama çok komik olsun\" komutunu ekleyin. Yapay zeka bir paragraf yazacaktır."},
    {"step": 4, "title": "Müdahale ve Yönlendirme (Kritik!)", "description": "Çıkan metni okuyun. Muhtemelen bazı yerleri saçma veya sıkıcı olacaktır. Çocuğa söyleyin: \"Burada kediler hemen dünyayı ele geçirmiş, bu çok hızlı oldu. Ona söyle, düzeltsin.\""},
    {"step": 5, "title": "Düzeltme Komutu", "description": "Yeni komut: \"Hayır, hemen dünyayı ele geçirmesinler. Önce sadece balıkçılardan bedava balık istesinler. Hikayeyi buna göre düzelt.\""},
    {"step": 6, "title": "Final ve Ders", "description": "Hikayeyi paslaşarak bitirin. Ders: \"Gördün mü? Eğer kontrolü tamamen ona bırakırsak saçmalayabilir. Ama sen onu bir yönetmen gibi yönlendirirsen harika bir iş çıkarır.\""}
  ]'::jsonb,
  '[
    {"title": "Yönetim Becerisi", "description": "Yapay zekanın ürettiği içeriği beğenmeyip, spesifik düzeltmelerle yönlendirebilmesi."},
    {"title": "Mantıksal Tutarlılık", "description": "Hikayedeki kopuklukları veya mantık hatalarını fark edebilmesi."}
  ]'::jsonb,
  '[
    {"item": "Metin tabanlı yapay zeka (ChatGPT, Gemini veya Copilot)", "optional": false},
    {"item": "Not defteri (hikayeyi kaydetmek için)", "optional": true}
  ]'::jsonb
);

-- Etkinlik 3: Telif Hakkı Tartışması (Sanat Kimin?)
INSERT INTO activities (
  title,
  description,
  type,
  duration,
  age_min,
  age_max,
  instructions,
  materials,
  points,
  week_number,
  difficulty_level,
  reflection_question,
  purpose,
  activity_type_label,
  steps,
  observations,
  detailed_materials
) VALUES (
  'Telif Hakkı Tartışması: Sanat Kimin?',
  'Yapay zeka Van Gogh tarzında resim yapınca, bu resim kime ait? Sana mı, bilgisayara mı, yoksa Van Gogh''a mı? Emek, esinlenme ve kopyalama kavramlarını tartış!',
  'conversation',
  25,
  10,
  11,
  'Yapay zekanın ürettiği sanat eserlerinin kime ait olduğunu tartışın. Emek, esinlenme ve kopyalama kavramlarını sorgulayın.',
  ARRAY['Sohbet ortamı', 'Van Gogh Yıldızlı Gece resmi (isteğe bağlı)'],
  20,
  5,
  3,
  'Yapay zekayla üretilen bir resim kime ait? Yapay zeka kullanınca altına yazmak neden dürüstlüktür?',
  '10-11 yaşındaki bir çocuğun "emek", "esinlenme" ve "kopyalama" kavramlarını sorgulamasını sağlamak.',
  'Felsefe ve Etik Tartışma',
  '[
    {"step": 1, "title": "Vaka Analizi", "description": "Çocuğa Van Gogh''un \"Yıldızlı Gece\" tablosunu gösterin. \"Bu resmi Van Gogh yaptı, değil mi? Emeği ona ait.\""},
    {"step": 2, "title": "Sorunu Ortaya Atın", "description": "\"Şimdi bilgisayara gidip ''Bana Van Gogh tarzında, Yıldızlı Gece''ye benzeyen bir İstanbul resmi yap'' dersem, saniyeler içinde yapıyor.\" Soru: \"Bu yeni resmi kim yaptı? Ben mi? Bilgisayar mı? Yoksa Van Gogh mu?\""},
    {"step": 3, "title": "Tartışmayı Derinleştirin", "description": "Çocuğun cevabına göre karşıt görüş sunun (Şeytanın Avukatlığı): Çocuk \"Bilgisayar yaptı\" derse -> \"Ama ben söylemesem yapmazdı. Fikir benimdi.\" Çocuk \"Sen yaptın\" derse -> \"Ama ben hiç fırça kullanmadım, Van Gogh''un stilini taklit ettim.\""},
    {"step": 4, "title": "Gerçek Dünya Örneği", "description": "\"Bir sınavda arkadaşının kağıdına bakıp aynısını yazarsan bu ''kopya'' olur. Ama arkadaşının çalışma yöntemini öğrenip kendi cümlelerinle yazarsan bu ''öğrenmek'' olur. Yapay zeka şu an bu ikisinin arasında gri bir bölgede.\""},
    {"step": 5, "title": "Sonuç", "description": "Kesin bir doğru cevap yoktur. Amaç çocuğun bu karmaşayı fark etmesidir. \"Bu yüzden yapay zeka ile bir şey üretince altına ''Yapay Zeka ile oluşturulmuştur'' yazmak dürüstlüktür.\""},
    {"step": 6, "title": "Kendi Görüşünü Sor", "description": "\"Peki sen ne düşünüyorsun? Yarın okulda bir resim ödevi için yapay zeka kullansaydın, öğretmenine söyler miydin?\""}
  ]'::jsonb,
  '[
    {"title": "Etik Sorgulama", "description": "Teknolojinin getirdiği yeni hak ihlalleri üzerine düşünebilmesi."},
    {"title": "Argüman Geliştirme", "description": "Kendi fikrini (resim benimdir/bilgisayarındır) mantıklı sebeplerle savunabilmesi."}
  ]'::jsonb,
  '[
    {"item": "Sohbet ortamı (ekran dışı etkinlik)", "optional": false},
    {"item": "Van Gogh''un \"Yıldızlı Gece\" tablosunun resmi (telefondan gösterilebilir)", "optional": true}
  ]'::jsonb
);
