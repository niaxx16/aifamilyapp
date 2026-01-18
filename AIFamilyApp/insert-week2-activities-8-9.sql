-- Hafta 2 Etkinlikleri: Bilgisayarlar Nasıl Görür? - Pikseller ve Veri (8-9 yaş grubu)

-- Etkinlik 1: Piksel Sanatı (Analog Kodlama)
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
  'Piksel Sanatı (Analog Kodlama)',
  'Bilgisayar ekranındaki görüntülerin küçük renkli karelerden (piksellerden) oluştuğunu keşfedin. Kod komutlarıyla kendi piksel sanatınızı oluşturun!',
  'creative',
  25,
  8,
  9,
  'Kareli kağıt üzerinde satır satır verilen renk kodlarını takip ederek bir resim ortaya çıkarın.',
  ARRAY['Kareli matematik defteri sayfası veya kareli kağıt', 'Boya kalemleri (3-4 farklı renk)', 'Kurşun kalem'],
  15,
  2,
  1,
  'Sadece "2 kırmızı, 3 beyaz" gibi komutlara uydun ama ortaya bir resim çıktı. Bilgisayarlar da resimleri böyle mi saklıyor?',
  'Bilgisayar ekranındaki her görüntünün aslında küçük renkli karelerden (piksellerden) oluştuğunu ve bilgisayarların resimleri "kodlar" (sayılar/koordinatlar) olarak sakladığını anlamak.',
  'Sanat ve Mantık (Ekran Dışı)',
  '[
    {"step": 1, "title": "Kavramı Anlatın", "description": "\"Telefonun ekranına büyüteçle çok yakından baksaydık ne görürdük biliyor musun? Milyonlarca minik, renkli kare! Biz buna ''Piksel'' diyoruz. Bilgisayar ''Elma resmi göster'' dediğimizde aslında ''Kırmızı kareleri şuraya, yeşil kareleri şuraya koy'' diyor.\""},
    {"step": 2, "title": "Izgarayı Hazırlayın", "description": "Kareli kağıda 10x10''luk bir kare çizin (sınırlarını belirleyin)."},
    {"step": 3, "title": "Kodu Hazırlayın", "description": "Çocuğunuza resmi göstermeden bir \"Kod Kağıdı\" verin. Kodlar satır satır ne yapacağını söylesin. Örnek: 1. Satır: Hepsi Beyaz, 2. Satır: 2 Beyaz, 2 Kırmızı, 2 Beyaz, 2 Kırmızı, 2 Beyaz... (İnternetten ''Pixel Art Grid Templates'' aratarak hazır şablonlar bulabilirsiniz)."},
    {"step": 4, "title": "Boyama Zamanı", "description": "Çocuğunuzdan bilgisayar olmasını isteyin. \"Sen bir ekransın. Ben işlemciyim ve sana kodu gönderiyorum. Bakalım kodu doğru işleyip resmi ortaya çıkarabilecek misin?\""},
    {"step": 5, "title": "Sonuç", "description": "Kareler boyandığında ortaya çıkan şekli inceleyin. \"Gördün mü? Sen sadece ''2 kırmızı, 2 beyaz'' komutlarına uydun ama uzaktan bakınca bir kalp resmi oluştu. Bilgisayarlar da resimleri böyle görür: Sayılar listesi olarak!\""}
  ]'::jsonb,
  '[
    {"title": "Dikkat ve Odaklanma", "description": "Satırları ve kare sayılarını karıştırmadan takip edebiliyor mu?"},
    {"title": "Soyutlama", "description": "Küçük karelerin birleşerek büyük bir bütünü (resmi) oluşturduğunu kavrıyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Kareli matematik defteri sayfası veya çıktısı alınmış kareli kağıt", "optional": false},
    {"item": "Boya kalemleri (3-4 farklı renk)", "optional": false},
    {"item": "Kurşun kalem", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Quick, Draw! Analizi (Yapay Zeka Ressamı)
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
  'Quick, Draw! Analizi',
  'Yapay zekanın çizimlerinizi nasıl tanıdığını keşfedin! Çiziminizin hangi aşamasında nesneyi anladığını gözlemleyin.',
  'game',
  20,
  8,
  9,
  'Quick, Draw! sitesinde çizim yaparak yapay zekanın desen tanıma yeteneğini test edin.',
  ARRAY['Tablet, bilgisayar veya telefon', 'Web tarayıcısı (quickdraw.withgoogle.com)'],
  15,
  2,
  2,
  'Yapay zeka çiziminizi tam olarak hangi anda tanıdı? Hangi detay onu ikna etti?',
  'Yapay zekanın "Desen Tanıma" (Pattern Recognition) yeteneğini test etmek. Çizimin hangi aşamasında nesneyi tanıdığını fark etmek.',
  'Dijital Oyun ve Gözlem',
  '[
    {"step": 1, "title": "Siteye Girin", "description": "quickdraw.withgoogle.com adresini açın ve \"Hadi Başlayalım\" (Let''s Draw) butonuna basın. Oyun size \"Bir Kelebek Çiz\" gibi bir görev verecek (İngilizce olabilir, ebeveyn çevirmeli)."},
    {"step": 2, "title": "Görev", "description": "Çocuğunuz parmağıyla çizmeye başlasın. Ama burada önemli olan hızlı çizmek değil, dinlemek."},
    {"step": 3, "title": "Yapay Zekayı Dinleyin", "description": "Çizim sırasında dış ses (veya alttaki yazı) sürekli tahminlerde bulunur: \"Bir patates görüyorum... Bir daire görüyorum... Buldum! Bu bir kelebek!\""},
    {"step": 4, "title": "Kritik Anı Yakalayın", "description": "Çocuğunuza şunu sorun: \"Tam olarak neyi çizdiğinde anladı? Kanatlarını çizince mi? Yoksa antenlerini koyunca mı?\" Örnek: \"Bak, yuvarlak çizdiğinde ''Top'' sandı. Ama sapını çizdiğin an ''Elma'' olduğunu anladı. Demek ki ''Yuvarlak + Sap = Elma'' diye bir formülü var.\""},
    {"step": 5, "title": "Hata Analizi", "description": "Eğer yapay zeka bilemezse, oyun sonunda çiziminize tıklayın. Yapay zeka size \"Ben bunu şuna benzettim\" diyerek başka insanların çizimlerini gösterecek. \"Bak, diğer insanlar kelebeği böyle çizmiş, senin çizimin biraz farklı olduğu için tanıyamadı\" diye açıklayın."}
  ]'::jsonb,
  '[
    {"title": "El-Göz Koordinasyonu", "description": "Fare veya dokunmatik ekranla anlamlı şekiller çizebiliyor mu?"},
    {"title": "Analitik Düşünme", "description": "Yapay zekanın neden yanlış tahmin ettiğini veya hangi detayla doğruyu bulduğunu sorgulayabiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Tablet, bilgisayar veya telefon", "optional": false},
    {"item": "Web tarayıcısında quickdraw.withgoogle.com adresi", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Google Lens ile Doğa Dedektifliği
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
  'Google Lens ile Doğa Dedektifliği',
  'Yapay zekanın veri tabanıyla nasıl çalıştığını keşfedin! Kameranızla nesneleri tarayın ve milyonlarca resimle karşılaştırmasını izleyin.',
  'exploration',
  25,
  8,
  9,
  'Google Lens ile evdeki veya bahçedeki nesneleri tarayarak yapay zekanın nasıl tanıdığını gözlemleyin.',
  ARRAY['Akıllı telefon (Google uygulaması yüklü)', 'Evdeki bitki, oyuncak, kitap veya bahçedeki çiçek/böcek'],
  15,
  2,
  1,
  'Google Lens çiçeğin adını nereden bildi? Tanıyamadığı nesneler oldu mu? Neden tanıyamadı?',
  'Yapay zekanın "Veri Tabanı" ile nasıl çalıştığını anlamak. Gördüğü şeyi hafızasındaki milyonlarca resimle karşılaştırarak tanıdığını görmek.',
  'Gerçek Dünya Keşfi',
  '[
    {"step": 1, "title": "Dedektiflik Görevi", "description": "\"Hadi bahçeye (veya salona) çıkalım. Adını bilmediğimiz veya hakkında daha çok şey öğrenmek istediğimiz bir şey bulalım.\""},
    {"step": 2, "title": "Uygulamayı Açın", "description": "Google uygulamasındaki kamera ikonuna (Lens) basın."},
    {"step": 3, "title": "Tarama", "description": "Kamerayı nesneye tutun (örneğin bir çiçek). Ekranda küçük noktaların nesne üzerinde belirdiğini gösterin. \"Bak, şu an çiçeğin üzerindeki pikselleri, şekilleri inceliyor.\""},
    {"step": 4, "title": "Arama Butonuna Basın", "description": "Sonuçlar çıktığında inceleyin. \"Aaa bak! Bu çiçeğin adı Sardunya''ymış.\""},
    {"step": 5, "title": "Nasıl Bildi? (Önemli Kısım)", "description": "Çocuğunuza sorun: \"Sence telefon bu çiçeğin adını nereden bildi? Doğuştan mı biliyor?\" Açıklama: \"Hayır. İnternette milyonlarca çiçek fotoğrafı var. Yapay zeka, bizim çektiğimiz fotoğrafı o milyonlarca fotoğrafla ışık hızında karşılaştırdı. ''Hımm, bu resim en çok Sardunya resimlerine benziyor'' dedi ve cevabı getirdi.\""},
    {"step": 6, "title": "Deneme-Yanılma", "description": "Çok karışık bir nesne (örneğin buruşturulmuş bir kağıt veya çocuğun yaptığı karmaşık bir lego) gösterin. Tanıyamadığında \"Veri tabanında buna benzer bir şey bulamadı\" diyerek sınırlarını gösterin."}
  ]'::jsonb,
  '[
    {"title": "Merak", "description": "Teknolojiyi sadece oyun oynamak için değil, bilgi edinmek için kullanma isteği."},
    {"title": "Bağlantı Kurma", "description": "\"Fotoğraf çekmek\" ile \"Bilgi aramak\" arasındaki ilişkiyi kurması."},
    {"title": "Gözlem", "description": "Ekranda çıkan benzer görsellerle kendi çektiği nesne arasındaki ortak özellikleri (renk, desen) fark etmesi."}
  ]'::jsonb,
  '[
    {"item": "Akıllı telefon (Google uygulaması yüklü)", "optional": false},
    {"item": "Evdeki bir bitki, ilginç bir oyuncak, bir kitap kapağı veya bahçedeki bir böcek/çiçek", "optional": false}
  ]'::jsonb
);
