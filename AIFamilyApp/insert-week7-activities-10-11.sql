-- Hafta 7 Etkinlikleri: Yapay Zeka ve Toplum - 10-11 yaş grubu

-- Etkinlik 1: Geleceğin Okulu (Kişiselleştirilmiş Eğitim)
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
  'Geleceğin Okulu: Kişiselleştirilmiş Eğitim',
  'Herkes aynı hızda öğrenmiyor! Yapay zeka destekli bir okul tasarla. Öğretmenler ve yapay zeka nasıl birlikte çalışabilir?',
  'creative',
  30,
  10,
  11,
  'Yapay zeka destekli bir okul sistemini tasarlayın. İnsan öğretmen ve yapay zeka asistanın görev dağılımını belirleyin.',
  ARRAY['Kağıt', 'Kalem'],
  20,
  7,
  2,
  'Yapay zeka öğretmenin yerini alır mı? İnsan öğretmen hangi işleri yapay zekadan daha iyi yapar?',
  'Eğitimde "herkese aynı ders" mantığı yerine, yapay zeka ile "kişiye özel ders" mantığını kavramak. YZ''nin öğretmenin yerini almadığını, ona süper güçler verdiğini anlamak.',
  'Beyin Fırtınası ve Tasarım',
  '[
    {"step": 1, "title": "Mevcut Durumu Analiz Edin", "description": "Çocuğa sorun: \"Sınıfta öğretmen bir konuyu anlatırken, sen çoktan anlamışsan ama arkadaşın anlamamışsa ne oluyor? Sıkılıyor musun?\" veya \"Sen anlamadığında öğretmen dersi durdurabiliyor mu?\" Sorun: Herkesin öğrenme hızı farklıdır ama ders hızı aynıdır."},
    {"step": 2, "title": "Yapay Zeka Öğretmen Asistanı", "description": "\"Hayal et: Her öğrencinin tabletinde bir Yapay Zeka Asistanı var. Adı ''Süper Hoca'' olsun.\""},
    {"step": 3, "title": "Senaryo 1: Hızlı Öğrenen", "description": "\"Sen matematiği çok sevdin, Süper Hoca sana hemen daha zor ve eğlenceli sorular veriyor.\""},
    {"step": 4, "title": "Senaryo 2: Desteğe İhtiyaç Duyan", "description": "\"Sen tarih dersinde zorlandın. Süper Hoca sana o konuyu senin sevdiğin Minecraft örnekleriyle tekrar anlatıyor.\""},
    {"step": 5, "title": "Tasarım Çizelgesi", "description": "Kağıdı ikiye bölün. Sol taraf: İnsan Öğretmen Ne Yapar? (İlham verir, sarılır, kavga edenleri barıştırır, oyun oynatır, ahlakı öğretir). Sağ taraf: Yapay Zeka Asistan Ne Yapar? (Ödevleri okur, eksikleri bulur, sınav kağıtlarını saniyede okur, kişiye özel soru hazırlar)."},
    {"step": 6, "title": "Sonuç", "description": "\"Gördün mü? Yapay zeka öğretmeni kovmuyor. Öğretmeni ''kağıt okuma'' işinden kurtarıyor ki öğretmen seninle daha çok ilgilensin.\""}
  ]'::jsonb,
  '[
    {"title": "Analitik Düşünme", "description": "Bir sistemdeki (okul) verimsizlikleri fark edebilmesi."},
    {"title": "İşbirliği Kurgusu", "description": "İnsan ve makinenin rakip değil, ekip olduğu bir senaryo kurabilmesi."}
  ]'::jsonb,
  '[
    {"item": "Kağıt", "optional": false},
    {"item": "Kalem", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Akıllı Şehir Tasarımı (Görünmez Zeka)
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
  'Akıllı Şehir Tasarımı: Görünmez Zeka',
  'Trafik sıkışıklığı, taşan çöpler, boşa yanan lambalar... Yapay zeka ile çalışan bir akıllı şehir tasarla ve sorunları çöz!',
  'creative',
  35,
  10,
  11,
  'Büyük bir kağıda şehir çizin, sorunları işaretleyin ve yapay zeka çözümlerini ekleyin.',
  ARRAY['Büyük karton veya resim kağıdı', 'Renkli kalemler'],
  25,
  7,
  2,
  'Akıllı şehirdeki nesneler birbirleriyle nasıl konuşuyor? Bu şehir nasıl enerji tasarrufu yapıyor?',
  '"Akıllı Şehir" (Smart City) kavramını öğrenmek. Yapay zekanın trafik, çöp ve enerji gibi büyük sorunları verilerle nasıl çözdüğünü görselleştirmek.',
  'Şehir Planlama ve Çizim',
  '[
    {"step": 1, "title": "Şehri Çizin", "description": "Kağıda basit bir şehir krokisi çizin: Yollar, binalar, park, hastane, okullar."},
    {"step": 2, "title": "Sorunları Ekleyin (Kırmızı Kalem)", "description": "Yollara kırmızı kalemle sıkışık trafik çizin. Sokaklara taşmış çöp kutuları çizin. Gündüz vakti boşuna yanan sokak lambaları çizin."},
    {"step": 3, "title": "Akıllı Trafik Işığı (Yeşil Kalem)", "description": "\"Bu ışıkta kamera var. Eğer ambulans geliyorsa sesi duyup hemen diğerlerine kırmızı, ambulansa yeşil yakıyor.\" Yeşil kalemle çözümü çizin."},
    {"step": 4, "title": "Akıllı Çöp Kutusu", "description": "\"Bu kutunun içinde sensör var. Dolduğu zaman çöp kamyonuna ''Ben doldum, gel beni al'' diye mesaj atıyor. Kamyon boş kutulara gitmekle vakit kaybetmiyor.\""},
    {"step": 5, "title": "Akıllı Lambalar", "description": "\"Sokakta kimse yoksa ışıklarını kısıyor, biri yürürken açıyor. Enerji tasarrufu!\""},
    {"step": 6, "title": "Büyük Resim", "description": "\"Bu şehirdeki her şey birbiriyle konuşuyor. Buna ''Nesnelerin İnterneti'' (IoT) denir. Yapay zeka bu konuşmaları yöneten beyindir.\""}
  ]'::jsonb,
  '[
    {"title": "Sistem Düşüncesi", "description": "Şehirdeki parçaların (ambulans, ışık, trafik) birbiriyle bağlantılı olduğunu anlaması."},
    {"title": "Verimlilik Odaklılık", "description": "Kaynakların (zaman, benzin, elektrik) boşa harcanmasını önleyen çözümler üretmesi."}
  ]'::jsonb,
  '[
    {"item": "Büyük karton veya resim kağıdı (A3 veya daha büyük)", "optional": false},
    {"item": "Renkli kalemler (en az kırmızı ve yeşil)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Meslek Kartları (Dönüşüm)
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
  'Meslek Kartları: Geleceğin Meslekleri',
  'Robotlar işimizi elimizden alacak mı? Hayır! Meslekler yok olmuyor, dönüşüyor. Sevdiğin mesleği analiz et ve geleceğin versiyonunu tasarla!',
  'creative',
  30,
  10,
  11,
  'Meslekleri analiz ederek hangi görevlerin yapay zekaya, hangilerinin insana ait olduğunu belirleyin.',
  ARRAY['Küçük not kağıtları veya kartonlar', 'Kalem'],
  20,
  7,
  2,
  'Hangi işler yapay zekaya verilebilir? Hangi işler sadece insan yapabilir? Geleceğin süper kahramanı kim?',
  '"Robotlar işimizi elimizden alacak" korkusunu yenmek ve "Meslekler yok olmuyor, dönüşüyor" fikrini yerleştirmek.',
  'Kariyer Planlama ve Gelecek Vizyonu',
  '[
    {"step": 1, "title": "Meslek Seçimi", "description": "Çocuktan bildiği veya olmak istediği 3 mesleği seçmesini isteyin (Örn: Doktor, Avukat, Futbolcu, Tasarımcı)."},
    {"step": 2, "title": "Kartları Hazırlayın", "description": "Her kağıda bir meslek yazın. Altına \"Görevi\" başlığı açın."},
    {"step": 3, "title": "Doktor Örneği - Analiz", "description": "Mesleğin yaptığı işleri parçalara ayırın: Hastalık verilerini incelemek -> Yapay Zeka (Milyonlarca veriyi saniyede tarar). Röntgen filmine bakıp küçük kırığı görmek -> Yapay Zeka (Gözünden bir şey kaçmaz)."},
    {"step": 4, "title": "İnsan Dokunuşu", "description": "Hastaya kötü haberi vermek ve onu teselli etmek -> İNSAN (YZ duygu hissedemez). Ameliyatta hassas kesim yapmak -> Robot Kol + İnsan Cerrah."},
    {"step": 5, "title": "Yeni Meslek Tanımı", "description": "Kartın en altına \"Geleceğin Doktoru\" yazın: \"Geleceğin doktoru her şeyi ezberleyen kişi değil; yapay zeka asistanını en iyi kullanan ve hastasıyla en iyi iletişim kuran kişidir.\""},
    {"step": 6, "title": "Sonuç", "description": "\"Hangi mesleği seçersen seç, yanına ''Yapay Zeka Kullanıcısı'' becerisini eklersen süper kahraman gibi olursun.\""}
  ]'::jsonb,
  '[
    {"title": "Ayrıştırma", "description": "Bir mesleğin içindeki \"tekrar eden/sıkıcı\" işlerle \"yaratıcı/duygusal\" işleri ayırt edebilmesi."},
    {"title": "Uyum Becerisi (Adaptasyon)", "description": "Teknolojiyi bir rakip değil, mesleği güçlendiren bir araç olarak konumlandırması."}
  ]'::jsonb,
  '[
    {"item": "Küçük not kağıtları veya kartonlar (en az 3 adet)", "optional": false},
    {"item": "Kalem", "optional": false}
  ]'::jsonb
);
