-- Hafta 3 Etkinlikleri: Makine Öğrenimi (Bilgisayarı Eğitiyoruz) - 8-9 yaş grubu

-- Etkinlik 1: Teachable Machine ile İlk Modelim
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
  'Teachable Machine ile İlk Modelim',
  'Bir makineye "görerek öğrenmeyi" öğretin! Kendi yüz ifadelerinizi kullanarak yapay zekayı eğitin ve veri sayısı arttıkça nasıl akıllandığını gözlemleyin.',
  'exploration',
  30,
  8,
  9,
  'Google Teachable Machine sitesinde kendi yüz ifadelerinizi kullanarak bir yapay zeka modeli oluşturun.',
  ARRAY['Web kamerası olan bilgisayar veya laptop', 'İnternet bağlantısı'],
  20,
  3,
  2,
  'Bilgisayar senin yüzünü nasıl tanıdı? Ona kaç tane fotoğraf gösterdin? Az fotoğraf gösterseydin aynı şekilde tanır mıydı?',
  'Bir makineye "görerek öğrenmeyi" öğretmek. Veri (örnek fotoğraf) sayısı arttıkça makinenin daha akıllı hale geldiğini deneyimlemek.',
  'Dijital Deney ve Uygulama',
  '[
    {"step": 1, "title": "Siteyi Açın", "description": "teachablemachine.withgoogle.com adresine gidin. \"Get Started\" (Başla) butonuna, ardından \"Image Project\" (Görüntü Projesi) -> \"Standard Image Model\" seçeneklerine tıklayın."},
    {"step": 2, "title": "Sınıfları Belirleyin", "description": "Karşınıza \"Class 1\" ve \"Class 2\" yazan iki kutu gelecek. Class 1''in adını kalem ikonuna tıklayarak \"MUTLU\" olarak değiştirin. Class 2''nin adını \"ÜZGÜN\" olarak değiştirin."},
    {"step": 3, "title": "Mutlu Verisi Toplama", "description": "\"Webcam\" butonuna tıklayın. Çocuğunuz kameranın karşısına geçsin ve kocaman gülümsesin. O gülümserken siz \"Hold to Record\" (Kaydetmek için basılı tut) butonuna basılı tutun. Yaklaşık 30-40 tane fotoğraf çekene kadar bırakmayın. Çocuğunuz başını hafifçe sağa sola oynatsın ki makine her açıdan gülümsemeyi öğrensin."},
    {"step": 4, "title": "Üzgün Verisi Toplama", "description": "Aynı işlemi alttaki kutu için yapın. Çocuğunuz bu sefer üzgün surat yapsın ve yine butona basılı tutarak 30-40 fotoğraf çekin."},
    {"step": 5, "title": "Modeli Eğitme", "description": "Ortadaki \"Train Model\" (Modeli Eğit) butonuna basın. \"Lütfen sekmeyi kapatmayın\" uyarısı çıkar. Birkaç saniye bekleyin."},
    {"step": 6, "title": "Test Zamanı", "description": "Sağ taraftaki \"Preview\" (Önizleme) kutusunda kamera açılacak. Çocuğunuz şimdi kameraya gülümlesin. Alttaki barların nasıl hareket ettiğine bakın. \"Mutlu\" barı %100 oluyor mu? Sonra üzülsün. \"Üzgün\" barı yükseliyor mu?"},
    {"step": 7, "title": "Kutlama", "description": "\"Tebrikler! Sen az önce bir bilgisayara duyguları öğrettin. O doğuştan bunu bilmiyordu, senin yüzüne bakarak öğrendi.\""}
  ]'::jsonb,
  '[
    {"title": "Tutarlılık", "description": "Eğitim sırasında (fotoğraf çekilirken) hep aynı ifadeyi koruyabiliyor mu?"},
    {"title": "Neden-Sonuç", "description": "\"Ben butona bastım, o beni kaydetti, şimdi beni tanıyor\" akışını kavradı mı?"}
  ]'::jsonb,
  '[
    {"item": "Web kamerası olan bir bilgisayar veya laptop (Tabletlerde bazen zor olabilir)", "optional": false},
    {"item": "İnternet bağlantısı", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Veri Çöpçüsü (Hatalı Veri)
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
  'Veri Çöpçüsü (Hatalı Veri)',
  'Bilgisayar bilimlerindeki en önemli kuralı öğrenin: "Çöp girerse, çöp çıkar!" Yapay zekaya yanlış bilgi verince ne olduğunu deneyin.',
  'game',
  25,
  8,
  9,
  'Teachable Machine modelini yanlış verilerle eğiterek yapay zekanın nasıl yanıldığını gözlemleyin.',
  ARRAY['Önceki etkinlikteki Teachable Machine modeli', 'Bir peluş oyuncak, yastık veya maske', 'Elma ve muz (veya resimleri)'],
  20,
  3,
  2,
  'Bilgisayar neden yanlış cevap verdi? Bozuk muydu yoksa biz mi ona yanlış öğrettik?',
  'Bilgisayar bilimlerindeki en önemli kuralı öğrenmek: "Çöp girerse, çöp çıkar" (Garbage In, Garbage Out). Yapay zekaya yanlış veya eksik bilgi verirsek, yanlış karar vereceğini görmek.',
  'Deneme-Yanılma ve Eleştirel Düşünme',
  '[
    {"step": 1, "title": "Makineyi Kandıralım", "description": "Önceki modeliniz hala açıkken çocuğunuza şunu söyleyin: \"Bilgisayar mutlu ve üzgün olmayı öğrendi. Peki sence yüzünü eliyle kapatırsan ne der?\""},
    {"step": 2, "title": "Deneyin", "description": "Yüzü kapatarak test edin. Makine muhtemelen kafası karışarak rastgele bir cevap verecektir (Örn: %50 Mutlu, %50 Üzgün)."},
    {"step": 3, "title": "Açıklama", "description": "\"Bilemedi! Çünkü biz ona ''yüz kapalıyken ne yapacağını'' öğretmedik. Görmediği şeyi bilemez.\""},
    {"step": 4, "title": "Yanlış Öğretim (Hatalı Veri)", "description": "Sayfayı yenileyip yeni bir proje açın. Class 1''e \"ELMA\" yazın ama kameraya MUZ göstererek kaydedin. Class 2''ye \"MUZ\" yazın ama kameraya ELMA göstererek kaydedin."},
    {"step": 5, "title": "Modeli Eğitin", "description": "\"Train Model\" butonuna basın ve bekleyin."},
    {"step": 6, "title": "Sonuç", "description": "Şimdi kameraya Elma gösterin. Bilgisayar \"MUZ\" diyecektir!"},
    {"step": 7, "title": "Tartışma", "description": "\"Bilgisayar bozuk mu? Hayır. Bilgisayar yalan mı söylüyor? Hayır. O sadece bizim ona öğrettiğimizi söylüyor. Biz ona yanlış öğretirsek, o da yanlış bilir. Demek ki yapay zeka her zaman doğruyu söylemez, ona kimin ne öğrettiği önemlidir.\""}
  ]'::jsonb,
  '[
    {"title": "Sorgulama", "description": "Bilgisayarın hatasının aslında \"insan hatası\" (yanlış veri girişi) olduğunu fark edebiliyor mu?"},
    {"title": "Analiz", "description": "\"Neden bilemedi?\" sorusuna \"Çünkü bunu ona göstermedik\" cevabını verebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Önceki etkinlikteki Teachable Machine modeli (veya yeni proje)", "optional": false},
    {"item": "Bir peluş oyuncak, yastık veya maske (yüzü kapatmak için)", "optional": false},
    {"item": "Elma ve muz (gerçek veya resimleri)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Kendi Kuralını Koy (Sınıflandırma Oyunu)
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
  'Kendi Kuralını Koy (Sınıflandırma Oyunu)',
  'İnsan beyninin nasıl sınıflandırma yaptığını keşfedin! Kendi kurallarınızı oluşturup bir robot gibi nesneleri ayırın.',
  'game',
  20,
  8,
  9,
  'Karışık nesneleri kendi belirlediğiniz kurallara göre kutulara ayırarak sınıflandırma mantığını öğrenin.',
  ARRAY['Karışık nesne yığını (çoraplar, legolar, arabalar, kalemler)', 'İki veya üç boş kutu/sepet'],
  15,
  3,
  1,
  'Sadece "kırmızı" kuralı yetti mi? Kuralı neden değiştirmek zorunda kaldın? Bilgisayarlar için kural yazmak kolay mı zor mu?',
  'İnsan beyninin nasıl sınıflandırma yaptığını (kural tabanlı) fark etmek ve yapay zekanın bunu nasıl taklit etmeye çalıştığını anlamak.',
  'Fiziksel Oyun (Ekran Dışı)',
  '[
    {"step": 1, "title": "Görev", "description": "Nesneleri yere dökün. \"Sen bir Sınıflandırma Robotusun. Bu karışık eşyaları kutulara ayırman lazım. Ama önce bana kuralını söylemelisin.\""},
    {"step": 2, "title": "Kural Belirleme", "description": "Çocuğun bir kural seçmesini isteyin. Kural 1: \"Kırmızı olanlar buraya, mavi olanlar şuraya.\" (Renge göre). Kural 2: \"Yumuşak olanlar buraya, sert olanlar şuraya.\" (Dokuya göre)."},
    {"step": 3, "title": "Robot Gibi Uygulama", "description": "Çocuk eşyaları ayırırken onu zorlayın. Eğer kural \"Kırmızılar kutuya\" ise, elinize kırmızı ama çok saçma bir şey alın (örneğin kırmızı bir domates veya kırmızı bir çöp). \"Kuralına göre bunu da kutuya atmalısın, çünkü bu da kırmızı!\" deyin."},
    {"step": 4, "title": "Kuralın Zorluğu", "description": "\"Gördün mü? Sadece ''kırmızı'' kuralı yetmedi. Domatesi oyuncak kutusuna atamayız. O zaman kuralı değiştirmeliyiz: ''Kırmızı VE Oyuncak olanlar''.\""},
    {"step": 5, "title": "Bağlantı Kurma", "description": "\"İşte bilgisayarlar için her şeye tek tek kural yazmak çok zordur. ''Kırmızı olsun, yuvarlak olsun ama domates olmasın...'' Bu çok uzun sürer! O yüzden 1. etkinlikteki gibi onlara bol bol örnek fotoğraf gösteriyoruz ki kuralları kendileri bulsunlar.\""}
  ]'::jsonb,
  '[
    {"title": "Mantıksal Düşünme (Algoritma)", "description": "\"Eğer... O zaman...\" mantığını fiziksel nesneler üzerinde kurabiliyor mu?"},
    {"title": "Esneklik", "description": "Kuralı işe yaramadığında (kırmızı domates örneği) kuralı güncelleyip düzeltebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Karışık bir nesne yığını (Renkli çoraplar, legolar, küçük arabalar, kalemler)", "optional": false},
    {"item": "İki veya üç boş kutu/sepet", "optional": false}
  ]'::jsonb
);
