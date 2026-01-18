-- Hafta 6 Etkinlikleri: Yapay Zeka ve Görsel Tanıma (6-7 yaş grubu)

-- Etkinlik 1: Google Lens ile Keşif
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
  'Google Lens ile Keşif',
  'Akıllı telefon kamerasının baktığı şeyi nasıl tanıyabildiğini keşfedin. Yapay zekanın görsel dünyayı anlamlandırmasını canlı olarak deneyimleyin!',
  'exploration',
  20,
  6,
  7,
  'Google Lens veya benzer bir görsel arama özelliği ile evdeki nesneleri tarayın ve yapay zekanın nasıl tanıdığını gözlemleyin.',
  ARRAY['Akıllı telefon (Google Lens veya iPhone Görsel Arama)', 'Evdeki çeşitli nesneler (meyve, oyuncak, çiçek, kitap)'],
  15,
  6,
  1,
  'Telefon hangi nesneleri doğru tahmin etti? Sence neden bazılarını bilemedi?',
  'Akıllı telefon kamerasının sadece fotoğraf çekmekle kalmadığını, aynı zamanda baktığı şeyi "tanıyabildiğini" göstermek. Yapay zekanın görsel dünyayı nasıl anlamlandırdığını (görüntü işleme) canlı olarak deneyimlemek.',
  'Gözlem ve Gerçek Dünya Deneyimi (Nesne Tanıma)',
  '[
    {"step": 1, "title": "Oyunu Başlatın", "description": "\"Bugün telefonumuza sihirli bir gözlük takacağız! Normalde biz gözümüzle baktığımızda ''Bu bir elma'' deriz, değil mi? Bakalım telefonumuz da bizim gibi görebiliyor mu?\""},
    {"step": 2, "title": "Basit Bir Nesneyle Başlayın", "description": "Bir meyveyi (örneğin muz) masaya koyun. Google Lens uygulamasını açın ve kamerayı muza tutun."},
    {"step": 3, "title": "Sihirli Anı Yaşayın", "description": "Ekranda beliren küçük noktaları veya çerçeveleri gösterin. \"Bak, şu an telefon düşünüyor... Resme bakıyor...\" deyin. Sonuçlar çıktığında \"İnanılmaz! Bunun bir muz olduğunu bildi!\" diye tepki verin."},
    {"step": 4, "title": "Zorluk Seviyesini Artırın", "description": "\"Tamam, muz kolaydı. Bakalım bunu bilecek mi?\" diyerek daha spesifik bir şey deneyin. Örneğin evdeki bir çiçeği veya çocuğun sevdiği bir çizgi film karakterinin oyuncağını gösterin."},
    {"step": 5, "title": "Yapay Zekaya Bağlayın", "description": "\"Sence telefonun gözleri var mı? Hayır, sadece kamerası var. Ama içindeki yapay zeka, dünyadaki milyonlarca muz fotoğrafını incelemiş. Bu yüzden kameradan baktığında şekline ve rengine bakıp ''Hımm, sarı ve eğri... Bu bir muza benziyor!'' diyebiliyor.\""}
  ]'::jsonb,
  '[
    {"title": "Merak ve Sorgulama", "description": "\"Bunu da tanır mı?\", \"Şunu göstersek ne der?\" diyerek farklı nesneleri deneme isteği."},
    {"title": "İlişki Kurma", "description": "Ekranda çıkan benzer resimlerle, masadaki gerçek nesne arasındaki benzerliği (renk, şekil) fark etmesi."},
    {"title": "Teknolojik Farkındalık", "description": "Telefonun kamerayı bir \"göz\" gibi bilgi toplamak için kullandığını kavraması."}
  ]'::jsonb,
  '[
    {"item": "Akıllı telefon (Google Lens veya iPhone Görsel Arama özelliği)", "optional": false},
    {"item": "Evdeki çeşitli nesneler (meyve sepeti, oyuncak araba, saksı çiçeği, kitap, desenli yastık)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: "Bu Ne?" Çizim Oyunu
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
  '"Bu Ne?" Çizim Oyunu',
  'Quick, Draw! ile çizim yapın ve yapay zekanın canlı yayında tahmin etmesini izleyin. Çizim ne kadar basit olursa olsun, YZ temel hatlardan nesneyi tanıyabilir!',
  'game',
  20,
  6,
  7,
  'Quick, Draw! sitesinde çocuğunuz çizim yaparken yapay zekanın gerçek zamanlı tahminlerini izleyin.',
  ARRAY['Tablet veya dokunmatik ekranlı bilgisayar', 'Quick, Draw! web sitesi (quickdraw.withgoogle.com)'],
  15,
  6,
  2,
  'Bilgisayar hangi çizimlerini hemen tanıdı? Sence neden bazı çizimleri bilemedi?',
  'Çocuğun çizdiği bir şeyi yapay zekanın "canlı yayında" tahmin etmeye çalışmasını izlemek. Çizim ne kadar kötü olursa olsun, yapay zekanın temel hatlardan (desenlerden) yola çıkarak nesneyi tanıyabildiğini göstermek.',
  'Dijital Oyun (Makine Öğrenimi ve Tahmin)',
  '[
    {"step": 1, "title": "Siteyi Açın ve Görevi Anlatın", "description": "\"Şimdi çok komik bir resim oyunu oynayacağız. Sen ekrana parmağınla bir şey çizeceksin, bilgisayar da sen çizerken ne çizdiğini tahmin etmeye çalışacak. Bakalım senin resmini tanıyabilecek mi?\""},
    {"step": 2, "title": "Görevleri Okuyun (Çevirmen Rolü)", "description": "Oyun İngilizce komutlar verebilir (örneğin \"Draw a cat\" - Bir kedi çiz). Çocuğunuz okuma bilmediği için görevi siz söyleyin: \"Hadi, şimdi bir kedi çizmeni istiyor. Başla bakalım!\""},
    {"step": 3, "title": "Etkileşimi Yönetin", "description": "Çocuk çizmeye başladığı an bilgisayar sesli olarak \"Bir top görüyorum... Bir patates görüyorum...\" diye tahminlere başlar. Bu süreci heyecanla seslendirin: \"Bak yuvarlak çizince top sandı, ama bıyıkları yapınca kedi olduğunu anladı!\""},
    {"step": 4, "title": "Hatalara Gülün", "description": "Bazen yapay zeka bilemez. \"Aaa, senin güzel ağacını brokoli sandı!\" diyerek eğlenin. Bu, yapay zekanın her zaman mükemmel olmadığını, sadece şekillere bakarak tahmin yürüttüğünü öğretir."},
    {"step": 5, "title": "Yapay Zekaya Bağlayın", "description": "Oyun sonunda açıklayın: \"Bilgisayar senin çizdiğin kediyi nasıl tanıdı biliyor musun? Çünkü daha önce binlerce çocuğun çizdiği kedi resimlerine baktı. Üçgen kulaklar ve bıyıklar görünce ''Bu kesin kedi'' diyor.\" Sitede diğer insanların çizimlerini gösteren bölümü inceleyin."}
  ]'::jsonb,
  '[
    {"title": "İnce Motor Becerileri", "description": "Ekrana parmağıyla veya fareyle anlamlı şekiller çizme yeteneği."},
    {"title": "Geri Bildirimi Anlama", "description": "Bilgisayarın tahminlerine göre çizimine eklemeler yapma (Örneğin; \"Daha tanımadı, kuyruğunu da çizeyim\")."},
    {"title": "Sembolik Düşünme", "description": "Bir nesneyi en basit haliyle (birkaç çizgiyle) nasıl anlatacağını düşünmesi."}
  ]'::jsonb,
  '[
    {"item": "Tablet veya dokunmatik ekranlı bilgisayar (Fare ile de olur ama parmakla çizmek 6 yaş için daha kolaydır)", "optional": false},
    {"item": "Quick, Draw! web sitesi (quickdraw.withgoogle.com)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Yapay Zeka Sanatı
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
  'Yapay Zeka Sanatı',
  'Kelimelerinizi sanata dönüştürün! Yapay zekaya söylediğiniz şeyleri çizmesini söyleyin ve hayal gücünüzün sınırlarını zorlayın.',
  'creative',
  25,
  6,
  7,
  'Yapay zeka görsel oluşturma araçlarıyla çocuğunuzun hayal ettiği çılgın resimleri oluşturun.',
  ARRAY['Bilgisayar veya tablet', 'Yapay zeka görsel oluşturma aracı (Canva, Bing Image Creator veya Craiyon)'],
  15,
  6,
  1,
  'Yapay zeka ressam senin söylediklerini tam olarak çizebildi mi? Hangi kelimeyi değiştirince resim nasıl değişti?',
  'Yapay zekanın sadece var olanı tanımadığını, aynı zamanda "hayal de edebildiğini" (yeni görseller üretebildiğini) göstermek. Kelimelerin gücünü kullanarak görsel bir çıktı elde etmek.',
  'Yaratıcılık ve Tasarım (Üretken Yapay Zeka)',
  '[
    {"step": 1, "title": "Sihirli Ressamı Tanıtın", "description": "\"Biliyor musun, bilgisayarın içinde görünmez bir ressam yaşıyor. Ama bu ressamın elleri yok, sadece bizim sözlerimizi dinliyor. Biz ona ne söylersek, onu çiziyor. Hadi ona çılgın bir resim yaptıralım!\""},
    {"step": 2, "title": "Çılgın Bir Fikir Bulun", "description": "Çocuğunuzdan normalde yan yana gelmeyecek iki şeyi birleştirmesini isteyin. Örnek: \"Uzaya giden bir kedi\" veya \"Dondurma yiyen bir dinozor\"."},
    {"step": 3, "title": "Komutu Yazın (Prompting)", "description": "\"Söyle bakalım ressamımıza ne diyelim?\" Çocuğun söylediği cümleyi (örneğin \"Gözlüklü pembe bir fil\") kutucuğa yazın ve \"Oluştur\" tuşuna basın."},
    {"step": 4, "title": "Sonucu İnceleyin ve Değiştirin", "description": "Ekrana gelen resimlere birlikte bakın. \"Vay canına! Pembe fili yaptı ama gözlüğü unutmuş mu?\" veya \"Çok komik olmuş!\" diye yorumlayın. Sonra bir kelimeyi değiştirin: \"Hadi şimdi fili mavi yapalım\" deyin ve sonucun nasıl değiştiğini gösterin."},
    {"step": 5, "title": "Yapay Zekaya Bağlayın", "description": "\"Bu ressam (yapay zeka), bu resmi internetten bulup getirmedi. Bunu senin için sıfırdan boyadı! ''Fil'' deyince filin şeklini hatırladı, ''pembe'' deyince pembe boyayı kullandı. Tıpkı senin resim dersinde öğretmenin söylediklerini kağıda çizmen gibi.\""}
  ]'::jsonb,
  '[
    {"title": "Yaratıcı Düşünme ve İnovasyon", "description": "Gerçekte olmayan, hayali sahneleri zihninde canlandırıp kelimelere dökme."},
    {"title": "Kelime Dağarcığı ve Tanımlama", "description": "İstediği resmi elde etmek için detaylı sıfatlar kullanma (Kırmızı, uçan, mutlu vb.)."},
    {"title": "Neden-Sonuç İlişkisi", "description": "Söylediği (veya yazdırdığı) kelimelerin, ekrandaki resmi doğrudan değiştirdiğini fark etmesi."}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "Yapay zeka görsel oluşturma aracı (Canva Metinden Görsele, Bing Image Creator veya Craiyon)", "optional": false}
  ]'::jsonb
);
