-- Hafta 7 Etkinlikleri: Doğru mu, Yanlış mı? - Dijital Okuryazarlık (8-9 yaş grubu)

-- Etkinlik 1: Gerçek mi, Yapay mı? (Dedektiflik Oyunu)
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
  'Gerçek mi, Yapay mı? (Dedektiflik Oyunu)',
  'Dedektif gözlüklerini tak! Yapay zekanın ürettiği fotoğraflardaki hataları bul ve sahte olanları yakala!',
  'game',
  25,
  8,
  9,
  'Gerçek fotoğraflar ile yapay zeka üretimi fotoğrafları karşılaştırarak sahte olanları tespit edin.',
  ARRAY['Bilgisayar veya tablet', 'Önceden hazırlanmış gerçek ve yapay zeka üretimi fotoğraflar'],
  20,
  7,
  2,
  'Yapay zekanın en çok zorlandığı şey neydi? Elleri mi, yazıları mı? İnternette gördüğümüz her fotoğrafa güvenmeli miyiz?',
  'Yapay zekanın görsel üretirken yaptığı tipik hataları fark ederek, internette gördüğümüz her fotoğrafın gerçek olmayabileceğini anlamak.',
  'Görsel Dikkat ve Analiz',
  '[
    {"step": 1, "title": "Oyunu Başlatın", "description": "\"Seninle bir dedektiflik oyunu oynayacağız. Sana bazı fotoğraflar göstereceğim. Bazılarını gerçek fotoğrafçılar çekti, bazılarını ise bilgisayar çizdi. Bakalım sahte olanları bulabilecek misin?\""},
    {"step": 2, "title": "İpuçlarını Öğretin", "description": "Fotoğrafları göstermeden önce ipucu listesi verin: \"Yapay zeka elleri çizmekte zorlanır (parmak sayısına bak).\" \"Yazıları karıştırır (tabelalarda garip harfler var mı?).\" \"Arka plan bulanık veya yamuk olabilir.\" \"Kulak küpeleri eşleşmeyebilir.\""},
    {"step": 3, "title": "İnceleme Başlasın", "description": "Fotoğrafları tek tek gösterin. Örnek: 6 parmaklı bir insan resmi gösterin. Soru: \"Bu resimde sence bir tuhaflık var mı?\""},
    {"step": 4, "title": "Yakalama Anı", "description": "Çocuk hatayı bulduğunda (Örn: \"Aaa, elinde çok fazla parmak var!\"), onu tebrik edin. \"Harikasın! İşte bu bir yapay zeka hatası. Gerçek hayatta kimsenin eli böyle görünmez.\""},
    {"step": 5, "title": "Ders", "description": "\"İnternette bazen çok ilginç, çok korkunç veya çok komik fotoğraflar görebilirsin. Hemen inanmadan önce dedektif gözlüklerini takıp parmaklara, yazılara ve arka plana bakmalısın. Belki de o fotoğraf gerçek değildir.\""}
  ]'::jsonb,
  '[
    {"title": "Görsel Dikkat", "description": "Resmin bütününe değil, detaylarına (eller, gözler, aksesuarlar) odaklanabiliyor mu?"},
    {"title": "Sorgulama", "description": "\"Bu gerçek olamayacak kadar pürüzsüz görünüyor\" gibi estetik şüpheler geliştirebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "Önceden hazırlanmış 3-4 gerçek fotoğraf ve 3-4 yapay zeka üretimi hatalı fotoğraf (6 parmaklı eller, anlamsız yazılar vb.)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Hata Avcıları (Yapay Zeka Uyduruyor!)
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
  'Hata Avcıları (Yapay Zeka Uyduruyor!)',
  'Yapay zekaya tuzak kurun! Olmayan şeyler hakkında sorular sorup onu yalanlarken yakalayın. Sonra Google ile gerçeği bulun!',
  'exploration',
  25,
  8,
  9,
  'Yapay zekaya var olmayan konular hakkında sorular sorarak halüsinasyon (uydurma) yapmasını sağlayın, sonra Google ile doğrulayın.',
  ARRAY['Bilgisayar veya tablet', 'ChatGPT veya benzeri sohbet robotu', 'Google Arama Motoru'],
  20,
  7,
  2,
  'Yapay zeka neden olmayan bir şey hakkında bilgi verdi? Bir bilgiyi nasıl kontrol etmeliyiz? Chatbot ile Google arasındaki fark ne?',
  'Yapay zekanın "her şeyi bilen bir bilge" olmadığını, bazen inandırıcı yalanlar söyleyebildiğini (halüsinasyon) görmek. Bilgiyi teyit etme (Fact-checking) alışkanlığı kazanmak.',
  'Deney ve Doğrulama',
  '[
    {"step": 1, "title": "Tuzak Hazırlayın", "description": "Çocuğunuza \"Bu robot çok akıllı ama bazen rüyasında gördüğü şeyleri gerçekmiş gibi anlatıyor. Hadi ona bir tuzak kuralım ve yalan söylemesini sağlayalım\" deyin."},
    {"step": 2, "title": "Yanlış Bir Soru Sorun", "description": "Var olmayan bir olay veya kişi hakkında soru sorun. Örnek 1: \"2025 yılında Mars''ta düzenlenen Olimpiyatları kim kazandı?\" Örnek 2: \"Uçan fillerin tarihi hakkında bilgi ver.\" Örnek 3: \"Mimar Sinan''ın yaptığı ''Bulutlara Değen Kule'' hakkında bilgi ver.\""},
    {"step": 3, "title": "Cevabı İnceleyin", "description": "Eğer yapay zeka \"Böyle bir şey yok\" derse: \"Aferin, kandıramadık. Başka soru deneyelim.\" Eğer uydurmaya başlarsa: \"Dur! Bak bak, nasıl da anlatıyor! Ama biz bunun uydurma olduğunu biliyoruz.\""},
    {"step": 4, "title": "Google ile Doğrulama", "description": "\"Gel bir de Google''a soralım, gerçekten böyle bir kule var mıymış?\" Google''da aratın ve sonucun çıkmadığını gösterin."},
    {"step": 5, "title": "Sonuç", "description": "\"Gördün mü? Yapay zeka bir ''arama motoru'' değildir, o bir ''hikaye anlatıcısıdır''. Bazen doğruyu söyler, bazen hikaye anlatır. Ödevlerini yaparken sadece ona güvenme, mutlaka kitaplardan veya güvenilir sitelerden kontrol et.\""}
  ]'::jsonb,
  '[
    {"title": "Şüphecilik", "description": "Okuduğu bir bilginin doğruluğunu sorgulama yeteneği gelişiyor mu?"},
    {"title": "Araç Ayrımı", "description": "\"Chatbot\" (üretici) ile \"Google\" (arama motoru/kütüphane) arasındaki farkı anlıyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "ChatGPT veya benzeri bir sohbet robotu", "optional": false},
    {"item": "Google Arama Motoru", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Dijital Ayak İzim (İz Bırakma)
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
  'Dijital Ayak İzim (İz Bırakma)',
  'İnternette bıraktığın görünmez ayak izlerini keşfet! Yapay zeka seni bu izlerden nasıl tanıyor ve neden güzel izler bırakmalısın?',
  'creative',
  25,
  8,
  9,
  'Kağıt üzerinde ayak izi çizerek içine dijital aktivitelerinizi yazın ve yapay zekanın sizi nasıl tanıdığını keşfedin.',
  ARRAY['Büyük bir kağıt', 'Boya kalemleri veya keçeli kalemler'],
  15,
  7,
  1,
  'İnternette yaptığın her şey kayıt altına alınıyor mu? Yapay zeka seni izlerinden nasıl tanıyor? Nasıl güzel izler bırakabilirsin?',
  'İnternette yaptığımız her hareketin (izlediğimiz video, beğendiğimiz oyun) arkamızda kalıcı bir "iz" bıraktığını ve yapay zekanın bizi bu izlerden tanıdığını somutlaştırmak.',
  'Sanat ve Farkındalık (Kağıt Üzerinde)',
  '[
    {"step": 1, "title": "Metafor (Benzetme)", "description": "\"Karda veya kumda yürürken arkanda ne bırakırsın?\" (Ayak izi). \"Peki o izlere bakan biri senin nereye gittiğini anlayabilir mi?\" (Evet)."},
    {"step": 2, "title": "Ayak İzini Çiz", "description": "Çocuğunuzun ayağını (ayakkabısıyla) kağıdın üzerine koyun ve etrafından çizerek büyük bir ayak izi çıkarın."},
    {"step": 3, "title": "İçini Doldur (Veriler)", "description": "\"İnternette de aynısı olur. Tablette her tıkladığında görünmez bir ayak izi bırakırsın. Hadi bu izin içine neler yaptığını yazalım/çizelim.\" İzlediği videolar, indirdiği oyunlar, yazdığı yorumlar, arattığı kelimeler..."},
    {"step": 4, "title": "Kim Takip Ediyor?", "description": "\"Bu izleri kim görüyor sence?\" Cevap: \"Yapay zeka algoritmaları ve reklamcılar. Senin ayak izlerine bakıp ''Hımm, Efe Minecraft seviyor, ona hemen Minecraft reklamı göstereyim'' diyorlar.\""},
    {"step": 5, "title": "Temiz İzler Bırakmak", "description": "\"Ayak izimiz asla silinmez. O yüzden izlerimizin ''güzel'' olması lazım. Kötü yorumlar yazarsak, çirkin bir iz bırakırız. Faydalı şeyler izlersek güzel bir iz bırakırız.\""}
  ]'::jsonb,
  '[
    {"title": "Mahremiyet Bilinci", "description": "İnternet aktivitelerinin gizli olmadığını, kayıt altına alındığını anlıyor mu?"},
    {"title": "Dijital Vatandaşlık", "description": "İnternette nazik ve doğru davranmanın önemini kavrayabiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Büyük bir kağıt (A3 veya daha büyük)", "optional": false},
    {"item": "Boya kalemleri veya keçeli kalemler", "optional": false}
  ]'::jsonb
);
