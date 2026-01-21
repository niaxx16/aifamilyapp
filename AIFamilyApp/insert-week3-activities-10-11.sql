-- Hafta 3 Etkinlikleri: Makine Öğrenimi Laboratuvarı - 10-11 yaş grubu

-- Etkinlik 1: Seslerin Savaşı (Ses Projesi)
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
  'Seslerin Savaşı (Ses Projesi)',
  'Yapay zeka sadece görmekle kalmaz, duyabilir de! Teachable Machine ile kendi seslerini tanıyan bir AI modeli eğit. Alkış, ıslık ve sessizliği ayırt edebilen bir sistem oluştur.',
  'exploration',
  30,
  10,
  11,
  'Google Teachable Machine kullanarak ses tanıma modeli oluşturun. Alkış ve ıslık seslerini ayırt eden bir yapay zeka eğitin.',
  ARRAY['Mikrofonu olan bir bilgisayar/laptop', 'Sessiz bir oda (çok önemli!)'],
  20,
  3,
  2,
  'Yapay zeka karıştırdığında neden karıştırdı? Sesler birbirine mi benziyordu? Arka plan gürültüsü olmasaydı ne olurdu?',
  'Yapay zekanın sadece görüntüleri değil, ses dalgalarını da bir veri olarak algılayıp ayırt edebildiğini görmek.',
  'İşitsel Veri İşleme',
  '[
    {"step": 1, "title": "Siteyi Açın", "description": "teachablemachine.withgoogle.com adresine gidin. \"Get Started\" -> \"Audio Project\" (Ses Projesi) seçeneğine tıklayın."},
    {"step": 2, "title": "Arka Plan Gürültüsü (Kritik!)", "description": "İlk kutu \"Background Noise\"dur. \"Mic\" butonuna basın ve hiç konuşmadan, sadece odanın sessizliğini 20 saniye boyunca kaydedin. Açıklama: \"Bilgisayara önce sessizliğin ne olduğunu öğretmeliyiz ki diğer sesleri ayırt edebilsin.\""},
    {"step": 3, "title": "Alkış Sınıfı", "description": "İkinci kutunun adını \"Alkış\" yapın. \"Mic\" butonuna basın. Kayıt başlar başlamaz sürekli alkışlayın. Yaklaşık 20 saniye örnek toplayın (\"Extract Sample\" butonuna basarak örnekleri kaydedin)."},
    {"step": 4, "title": "Islık/Tıklatma Sınıfı", "description": "Yeni bir sınıf ekleyin (\"Add a class\"). Adını \"Islık\" (veya \"Parmak Şıklatma\") koyun. Yine 20 saniye boyunca sadece bu sesi çıkararak kaydedin."},
    {"step": 5, "title": "Eğitim", "description": "Ortadaki \"Train Model\" butonuna basın. Ses eğitimi görüntüden biraz daha uzun sürebilir, sabırla bekleyin."},
    {"step": 6, "title": "Test Zamanı", "description": "Sağ tarafta mikrofon açılacak. Sırayla alkışlayın veya ıslık çalın. Renkli barların (olasılık çubuklarının) nasıl yukarı aşağı hareket ettiğini izleyin."}
  ]'::jsonb,
  '[
    {"title": "Odaklanma", "description": "Sadece istenen sesi çıkarmaya (alkışlarken konuşmamaya) dikkat edebiliyor mu?"},
    {"title": "Analiz", "description": "Yapay zeka karıştırdığında (örneğin konuşunca alkış sanıyorsa), \"Neden karıştırdı? Sesler birbirine mi benziyor?\" diye sorgulayabiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Mikrofonu olan bir bilgisayar veya laptop", "optional": false},
    {"item": "Sessiz bir oda (Çok önemli - arka plan gürültüsü eğitimi bozar)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Vücut Dili Okuyucusu (Poz Projesi)
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
  'Vücut Dili Okuyucusu (Poz Projesi)',
  'Bilgisayar seni nasıl görüyor? Bir fotoğraf olarak değil, eklem noktalarından oluşan bir "çöp adam" olarak! Poz tahmini teknolojisini keşfet ve hareketlerini tanıyan bir AI eğit.',
  'exploration',
  35,
  10,
  11,
  'Teachable Machine Poz Projesi ile vücut hareketlerini tanıyan bir model oluşturun ve iskelet takibi teknolojisini keşfedin.',
  ARRAY['Web kamerası olan bir bilgisayar', 'Hareket edebilecek kadar alan'],
  25,
  3,
  2,
  'Bilgisayar seni nasıl gördü - yüzün ve kıyafetin mi yoksa sadece eklem noktaların mı? Veri çeşitliliği modeli nasıl etkiledi?',
  'Bilgisayarın bizi "fotoğraf" olarak değil, eklem noktalarından oluşan bir "çöp adam (iskelet)" olarak gördüğünü (Pose Estimation) anlamak.',
  'Fiziksel Hareket ve İskelet Takibi',
  '[
    {"step": 1, "title": "Projeyi Başlatın", "description": "Teachable Machine ana sayfasına gidin. Bu sefer \"Pose Project\" (Poz Projesi) seçin."},
    {"step": 2, "title": "İskeleti İnceleyin", "description": "Kamera açıldığında üzerinizde noktalar ve çizgiler belirecek. \"Bak, bilgisayar senin yüzünü veya kıyafetini görmüyor. Sadece omuzunu, dirseğini ve gözlerini birer nokta olarak takip ediyor. Tıpkı bir çöp adam gibi!\""},
    {"step": 3, "title": "Kollar Yukarı Sınıfı", "description": "Sınıf 1''in adını \"Kollar Yukarı\" yapın. Kollarınızı havaya kaldırın (Y harfi gibi). \"Webcam\" butonuna basılı tutarak bolca örnek (yaklaşık 100 tane) alın. Sağa sola hafifçe esneyin."},
    {"step": 4, "title": "Kollar Aşağı/T-Pose Sınıfı", "description": "Sınıf 2''nin adını \"Kollar Aşağı\" veya \"T-Pose\" yapın. Kollarınızı iki yana açın (T harfi gibi) veya indirin. Yine basılı tutarak örnek toplayın."},
    {"step": 5, "title": "Kafayı Eğ Sınıfı", "description": "Yeni bir sınıf ekleyin, adını \"Kafayı Eğ\" yapın. Kafanızı yana yatırarak örnekler toplayın."},
    {"step": 6, "title": "Eğit ve Oyna", "description": "\"Train Model\" butonuna basın. Eğitim bitince sağ tarafta test edin. Hareketleri yapın, bilgisayarın ne kadar hızlı tahmin ettiğini görün."}
  ]'::jsonb,
  '[
    {"title": "Teknolojik Farkındalık", "description": "Bilgisayarın \"görmek\" için sadece pikselleri değil, matematiksel noktaları (eklem yerlerini) kullandığını kavrayabiliyor mu?"},
    {"title": "Veri Çeşitliliği", "description": "Modeli eğitirken sadece tek bir duruş değil, hafif farklı açılardan durmanın (veri çeşitliliğinin) modeli daha akıllı yaptığını fark edebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Web kamerası olan bir bilgisayar veya laptop", "optional": false},
    {"item": "Hareket edebilecek kadar alan (en az 2 metre)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Güven Skoru (Yapay Zeka Emin mi?)
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
  'Güven Skoru: Yapay Zeka Emin mi?',
  'Yapay zeka "Kesinlikle bu!" demez, "Yüzde şu kadar ihtimalle bu" der. Güven skoru kavramını keşfet ve yapay zekanın ne zaman emin olduğunu, ne zaman kafasının karıştığını gözlemle.',
  'exploration',
  25,
  10,
  11,
  'Poz Projesi modelini kullanarak yapay zekanın güven skorunu (confidence score) ve olasılık kavramını keşfedin.',
  ARRAY['Az önce hazırlanan Poz Projesi (kapatmayın)', 'Not defteri (isteğe bağlı)'],
  20,
  3,
  2,
  'Yapay zeka ne zaman çok emindi? Ne zaman kararsız kaldı? Otonom arabalar düşük güven skorunda ne yapmalı?',
  'Yapay zekanın "Kesinlikle bu!" demediğini, "Yüzde şu kadar ihtimalle bu" dediğini (Olasılık/Confidence Score) anlamak. Gri alanları keşfetmek.',
  'Matematiksel Gözlem ve Yorumlama',
  '[
    {"step": 1, "title": "Barları İnceleyin", "description": "Test ekranının altındaki renkli çubuklara (Output) dikkat çekin. Yanlarında % (yüzde) sayıları yazar. \"Bu sayılara ''Güven Skoru'' denir. Yapay zeka ne kadar emin olduğunu söyler.\""},
    {"step": 2, "title": "Yüzde 100 Eminlik", "description": "Kollarınızı tam havaya kaldırın. \"Bak, ''Kollar Yukarı'' %99 veya %100 oldu. Bilgisayar çok emin.\""},
    {"step": 3, "title": "Kafa Karıştırma (Gri Alan)", "description": "\"Şimdi kollarını yavaş yavaş indir. Tam yukarıda değil, tam aşağıda da değil. Arada bir yerde (çapraz) tut.\""},
    {"step": 4, "title": "Olasılıkların Savaşı", "description": "Bu ara pozisyondayken barları izleyin. Barlar titremeye başlayacaktır. Örn: %45 Kollar Yukarı, %55 Kollar Aşağı. Soru: \"Bilgisayar neden karar veremiyor?\" Cevap: \"Çünkü bu hareket ne tam ona benziyor ne tam buna. Bilgisayar şu an tahmin yürütüyor: ''Galiba aşağıda ama emin değilim'' diyor.\""},
    {"step": 5, "title": "Gerçek Hayat Örneği", "description": "\"Otonom arabalar da böyledir. Bir nesne görürler ve ''%90 bu bir insan'' veya ''%40 bu bir poşet'' derler. Eğer güven skoru düşükse araba fren yapar. Emin olmak ister.\""},
    {"step": 6, "title": "Farklı Senaryolar Deneyin", "description": "Işığı kısın, uzaktan durun veya yarı yarıya kameraya girin. Güven skorunun nasıl değiştiğini gözlemleyin."}
  ]'::jsonb,
  '[
    {"title": "Matematiksel Yorumlama", "description": "Yüzdelik dilimlerin ne anlama geldiğini (yüksek sayı = yüksek eminlik) okuyabilmesi."},
    {"title": "Sınırları Anlama", "description": "Yapay zekanın her zaman net bir cevabı olmadığını, bazen \"arada kaldığını\" görmesi."}
  ]'::jsonb,
  '[
    {"item": "Az önce hazırlanan Poz Projesi (kapatmayın)", "optional": false},
    {"item": "Not defteri ve kalem (sonuçları kaydetmek için)", "optional": true}
  ]'::jsonb
);
