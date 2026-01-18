-- Hafta 5 Etkinlikleri: Yapay Zeka ile Etkileşim - Sesli Asistanlar (6-7 yaş grubu)

-- Etkinlik 1: Sesli Asistanla Sohbet
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
  'Sesli Asistanla Sohbet',
  'Yapay zekanın insan dilini nasıl anladığını ve cevap ürettiğini ilk elden deneyimleyin. Sesli asistanlarla eğlenceli bir sohbet başlatın!',
  'exploration',
  20,
  6,
  7,
  'Akıllı telefon veya hoparlördeki sesli asistanı çocuğunuzla birlikte keşfedin. Eğlenceli sorular sorun ve yapay zekanın nasıl öğrendiğini konuşun.',
  ARRAY['Akıllı telefon (Google Asistan, Siri) veya akıllı hoparlör (Google Home, Amazon Alexa)'],
  15,
  5,
  1,
  'Sesli asistan her sorumuzu anlayabildi mi? Sence neden bazı soruları daha iyi anladı?',
  'Yapay zekanın en etkileyici yönlerinden biri olan insan dilini ("doğal dil") nasıl anladığını ve cevap ürettiğini ilk elden deneyimlemek. Makinelerin sadece "evet/hayır" komutlarıyla değil, normal konuşma diliyle de iletişim kurabildiğini görmek.',
  'Etkileşimli Keşif (Doğal Dil İşleme)',
  '[
    {"step": 1, "title": "Hazırlık ve Tanıtım", "description": "Çocuğunuzla birlikte oturun ve \"Telefonumuzun (veya hoparlörümüzün) içinde bizimle konuşabilen, sorularımızı cevaplayan sihirli bir yardımcı olduğunu biliyor muydun? Onun adı Google Asistan/Siri. Hadi onunla tanışalım!\" diyerek merak uyandırın."},
    {"step": 2, "title": "Ebeveyn Modeli Olur", "description": "İlk olarak siz başlayın. Sesli asistanı aktive edin ve net bir sesle basit bir soru sorun: \"Merhaba, hava bugün nasıl olacak?\" Gelen cevabı birlikte dinleyin."},
    {"step": 3, "title": "Eğlenceli Sorularla Başlayın", "description": "Çocuğunuzun ilgisini çekecek sorularla devam edin: \"Bana bir kedi sesi taklidi yap.\", \"Bana bir fıkra anlatır mısın?\", \"Ay ne renk?\", \"En sevdiğin yemek ne?\" (Genellikle esprili bir cevap verirler.)"},
    {"step": 4, "title": "Sıra Çocukta", "description": "\"Şimdi sen bir soru sor bakalım. Aklına ne geliyorsa sorabilirsin,\" diyerek onu cesaretlendirin. Eğer asistan anlamazsa, \"Bazen makine kulakları bizim kadar iyi duyamıyor, haydi biraz daha net bir şekilde tekrar deneyelim,\" diyerek durumu normalleştirin."},
    {"step": 5, "title": "Yapay Zekaya Bağlantı Kurun", "description": "Sohbetin sonunda açıklayın: \"Ne kadar ilginç değil mi? Bu sihirli yardımcı, bizim konuştuğumuz kelimeleri anlıyor. Tıpkı bir bebeğin kelimeleri yavaş yavaş öğrenmesi gibi, mühendisler bu yapay zekaya milyonlarca insan konuşması, soru ve cevap dinletmişler. Böylece bizim ne demek istediğimizi ve nasıl cevap vermesi gerektiğini öğrenmiş.\""}
  ]'::jsonb,
  '[
    {"title": "Sözlü İletişim", "description": "Soru sormak için düşüncelerini net ve anlaşılır cümlelere dökme çabası."},
    {"title": "Merak ve Keşfetme Güdüsü", "description": "Asistanın yeteneklerini test etmek için kendi özgün sorularını üretmesi."},
    {"title": "Problem Çözme", "description": "Komutu anlaşılmadığında, ses tonunu veya kelimelerini değiştirerek tekrar denemesi."},
    {"title": "Soyut Kavramları Anlama", "description": "Cihazın içinde fiziksel olarak bir insan olmamasına rağmen, bir \"kişilik\" ile konuştuğu fikrini kabul etmesi."}
  ]'::jsonb,
  '[
    {"item": "Akıllı telefon (Google Asistan, Siri) veya akıllı hoparlör (Google Home, Amazon Alexa)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Komut Zinciri
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
  'Komut Zinciri',
  'Yapay zekanın birden fazla komutu nasıl anladığını ve sırayla işlediğini keşfedin. Algoritmik düşüncenin eğlenceli bir uygulaması!',
  'game',
  15,
  6,
  7,
  'Sesli asistana tek cümlede birden fazla komut verin ve sırayla nasıl gerçekleştirdiğini gözlemleyin.',
  ARRAY['Akıllı telefon veya akıllı hoparlör'],
  15,
  5,
  2,
  'Sesli asistan iki komutu da sırayla yapabildi mi? Sence hangisini önce yaptı ve neden?',
  'Yapay zekanın sadece tek bir komutu değil, birbiriyle bağlantılı birden fazla adımı içeren "komut zincirlerini" nasıl anladığını ve işlediğini görmek. Bu, algoritmik düşüncenin bir sonraki adımıdır.',
  'Görev Odaklı Oyun (Sıralı Talimatlar)',
  '[
    {"step": 1, "title": "Önceki Bilgiyi Hatırlatın", "description": "\"1. Haftadaki robot oyunumuzu hatırlıyor musun? Bana ileri git, sonra dön gibi adım adım komutlar veriyordun. Şimdi aynısını bu akıllı yardımcıya deneyeceğiz ama tek bir cümlede!\""},
    {"step": 2, "title": "Basit Bir Komut Zinciri Verin", "description": "Siz başlayın. Örneğin: \"Hey Google, bana en sevdiğim şarkıyı çal ve sesi %50 ye ayarla.\" Asistanın iki görevi de art arda yaptığını gözlemleyin."},
    {"step": 3, "title": "Çocuğun Kendi Zincirini Oluşturmasına Yardım Edin", "description": "\"Şimdi sıra sende. Akıllı yardımcıdan yapmasını istediğin iki şeyi düşünelim.\" Ona fikirler verin: \"10 a kadar say ve sonra alkış sesi çıkar.\", \"Yarın için sabah 7 ye alarm kur ve bana günaydın de.\", \"En yakın park nerede ve orası kaçta kapanıyor?\""},
    {"step": 4, "title": "Birlikte Deneyin", "description": "Çocuğunuzun seçtiği komut zincirini asistana birlikte söyleyin. Başarıyla gerçekleştiğinde bunu kutlayın."},
    {"step": 5, "title": "Yapay Zekaya Bağlayın", "description": "\"Muhteşem! Yapay zeka, cümlenin içindeki iki farklı isteği de anladı. Önce birinci görevi, sonra da ikinci görevi aklında tuttu ve sırayla yaptı. Tıpkı bir yemek tarifi okuyup adımları sırayla yapmak gibi! İşte bu, onun ne kadar akıllı olduğunu gösteriyor.\""}
  ]'::jsonb,
  '[
    {"title": "Planlama ve Sıralama", "description": "Bir hedefe ulaşmak için iki adımlı bir plan kurabilme."},
    {"title": "Mantıksal Bağlantı Kurma", "description": "Birbiriyle ilgili iki eylemi \"ve\" bağlacıyla birleştirerek anlamlı bir komut oluşturma."},
    {"title": "Karmaşık Talimatları Anlama", "description": "Tek adımlı komutlardan çok adımlı komutlara geçiş yapabilme yeteneği."},
    {"title": "Sebep-Sonuç İlişkisi", "description": "Verdiği komutun, cihaz üzerinde birden fazla eylemi tetiklediğini gözlemlemesi."}
  ]'::jsonb,
  '[
    {"item": "Akıllı telefon veya akıllı hoparlör", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Kendi Komutlarımızı Oluşturalım
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
  'Kendi Komutlarımızı Oluşturalım',
  'Hayal gücünüzü kullanarak geleceğin yapay zeka komutlarını tasarlayın! Teknolojinin sınırlarını zorlayan yaratıcı fikirler üretin.',
  'creative',
  25,
  6,
  7,
  'Çocuğunuzun hayal gücünü kullanarak yapay zekanın gelecekte yapabileceği komutları tasarlamasını ve çizmesini sağlayın.',
  ARRAY['Kağıt', 'Boya kalemleri', 'Keçeli kalemler'],
  15,
  5,
  1,
  'İcat ettiğin komut gerçek olsaydı hayatını nasıl değiştirirdi? Başka hangi harika komutlar icat edebilirsin?',
  'Çocuğun hayal gücünü kullanarak teknolojinin sınırlarını zorlamasını sağlamak. Yapay zekanın mevcut yeteneklerinin ötesinde, gelecekte neler yapabileceğini düşünmesini teşvik etmek.',
  'Yaratıcı Düşünme ve Tasarım (Ekran Dışı)',
  '[
    {"step": 1, "title": "Hayal Kurma Sorusu", "description": "\"Şimdi en eğlenceli kısma geldik. Bu akıllı yardımcının her, ama her şeyi yapabildiğini hayal et. Ondan ne istersin? İcat edeceğin en harika komut ne olurdu?\""},
    {"step": 2, "title": "Fikirleri Teşvik Edin", "description": "Çocuğunuzun aklına gelen ilk fikirleri destekleyin. Bunlar genellikle kendi dünyasındaki ihtiyaçlarla ilgilidir: \"Oyuncaklarımı benim yerime topla!\", \"Bana odamda bir salıncak yap!\", \"Canım sıkıldığında benimle saklambaç oyna!\""},
    {"step": 3, "title": "Hayali Komutu Çizin", "description": "\"Bu harika bir fikir! Hadi şimdi senin komutunu çizelim.\" Çocuğunuzun, kendisi komutu söylerken telefonun veya hoparlörün nasıl sihirli bir şekilde bu işi yaptığını resmetmesini isteyin."},
    {"step": 4, "title": "İşlevi Hakkında Konuşun", "description": "Çizim yaparken, \"Sence bu komut nasıl çalışırdı? Telefonun belki de küçük robot kolları mı olurdu? Yoksa oyuncaklara uçmayı mı öğretirdi?\" gibi sorularla yaratıcılığını daha da derinleştirin."},
    {"step": 5, "title": "Yapay Zekaya Bağlantı Kurun", "description": "\"Biliyor musun, senin bu çizdiğin hayal, gelecekte gerçek olabilir. Bugün kullandığımız bütün icatlar, önce senin gibi birinin hayal kurmasıyla başladı. Belki de büyüdüğünde sen, yapay zekaya böyle harika komutları öğreten bir mühendis olursun!\""}
  ]'::jsonb,
  '[
    {"title": "Yaratıcılık ve Hayal Gücü", "description": "Mevcut teknolojinin ötesinde yeni ve özgün fikirler üretebilme."},
    {"title": "İhtiyaç Belirleme", "description": "Kendi günlük yaşamında çözülmesini istediği bir problemi veya ihtiyacı tanımlayabilme."},
    {"title": "Görsel İfade", "description": "Soyut bir fikri veya hayali bir senaryoyu resim yoluyla somutlaştırabilme."},
    {"title": "İnovatif Düşünce", "description": "\"Daha iyi ne olabilir?\" veya \"Bu başka ne yapabilir?\" gibi geleceğe yönelik sorular sormaya başlaması."}
  ]'::jsonb,
  '[
    {"item": "Kağıt", "optional": false},
    {"item": "Boya kalemleri", "optional": false},
    {"item": "Keçeli kalemler", "optional": true}
  ]'::jsonb
);
