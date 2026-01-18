-- Hafta 1 Etkinlikleri: Zeka mı, Kural mı? - Temel Kavramlar (8-9 yaş grubu)

-- Etkinlik 1: Tost Makinesi vs. Robot Süpürge (Karşılaştırma)
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
  'Tost Makinesi vs. Robot Süpürge',
  'Evdeki cihazları inceleyerek "otomasyon" ile "yapay zeka" arasındaki farkı keşfedin. Hangi makineler sadece kural izliyor, hangileri düşünüyor?',
  'conversation',
  20,
  8,
  9,
  'Evdeki elektronik eşyaları karşılaştırarak hangilerinin sadece kurallara uyduğunu, hangilerinin çevresini algılayıp karar verdiğini analiz edin.',
  ARRAY['Kağıt ve kalem (Tablo çizmek için)', 'Evdeki akılsız elektronik eşyalar (Tost makinesi, su ısıtıcı)', 'Evdeki akıllı eşyalar veya internet videoları (Robot süpürge, otonom araç)'],
  15,
  1,
  1,
  'Evdeki hangi cihazlar sadece kurallara uyuyor, hangileri çevresini algılayıp karar veriyor? Aralarındaki en büyük fark ne?',
  '"Otomasyon" (her zaman aynı şeyi yapma) ile "Yapay Zeka" (duruma göre davranma) arasındaki farkı anlamak.',
  'Analiz ve Tartışma',
  '[
    {"step": 1, "title": "Tabloyu Hazırlayın", "description": "Kağıdı ortadan ikiye bölün. Sol tarafa \"Kuralcı Makineler\", sağ tarafa \"Düşünen Makineler\" yazın."},
    {"step": 2, "title": "Tost Makinesini İnceleyin", "description": "Çocuğunuzla tost makinesinin başına gidin. Sorun: \"Bu makineye ekmeği koyup düğmeye bastığımızda ne yapıyor?\" (Isıtıyor). \"Peki, ekmek yanmaya başlarsa kendi kendine durmayı biliyor mu? Kokuyu alıp ''Eyvah yanıyor!'' diyebilir mi?\" (Hayır, süresi bitene kadar çalışır)."},
    {"step": 3, "title": "Sonuç: Kuralcı Makine", "description": "\"Demek ki bu sadece bir kurala uyuyor: ''Düğmeye basılınca ısın.'' Çevresine bakmıyor.\" Sol tarafa yazın."},
    {"step": 4, "title": "Robot Süpürgeyi İnceleyin", "description": "Varsa robot süpürgeyi, yoksa bir otonom araba videosunu izleyin. \"Bu süpürge önüne bir sandalye çıkınca ne yapıyor?\" (Duruyor, etrafından dolaşıyor). \"Tost makinesi gibi dümdüz gitmeye devam edip çarpıyor mu?\" (Hayır, sensörleriyle görüyor ve karar değiştiriyor)."},
    {"step": 5, "title": "Sonuç: Düşünen Makine", "description": "\"İşte buna Yapay Zeka diyoruz. Çevresini algılıyor ve ne yapacağına o an karar veriyor.\" Sağ tarafa yazın."},
    {"step": 6, "title": "Sınıflandırma Oyunu", "description": "Evdeki diğer eşyaları sayın (Çamaşır makinesi, tablet, vantilatör). Hangisi sadece kuralcı, hangisi akıllı? Birlikte tabloya yerleştirin."}
  ]'::jsonb,
  '[
    {"title": "Analitik Düşünme", "description": "Bir cihazın davranışına bakarak onun çalışma prensibini (sabit mi, değişken mi) çözebiliyor mu?"},
    {"title": "Kavramlaştırma", "description": "\"Algılamak\" (sensör) kelimesinin makineler için ne anlama geldiğini kavrıyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Kağıt ve kalem (Tablo çizmek için)", "optional": false},
    {"item": "Evdeki akılsız elektronik eşyalar (Tost makinesi, su ısıtıcı, saç kurutma makinesi)", "optional": false},
    {"item": "Evdeki akıllı eşyalar veya internetten resmi/videosu gösterilecek cihazlar (Robot süpürge, akıllı termostat, otonom araç)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Turing Oyunu (İnsan mı, Bilgisayar mı?)
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
  'Turing Oyunu (İnsan mı, Bilgisayar mı?)',
  'Ünlü Turing Testini canlandırın! Bir makinenin insanı taklit edebileceğini ama insan gibi hissedemeyeceğini keşfedin.',
  'game',
  25,
  8,
  9,
  'Ebeveyn robot veya insan rolüne girer, çocuk sorular sorarak hangisi olduğunu tahmin etmeye çalışır.',
  ARRAY['İki sandalye', 'Paravan, battaniye veya arkası dönük oturma düzeni'],
  15,
  1,
  2,
  'Robot olduğunu en çok nereden anladın? Hangi sorular en iyi ipuçlarını verdi?',
  'Ünlü "Turing Testi"ni canlandırmak. Bir makinenin insanı taklit edebileceğini ama insan gibi "hissedemeyeceğini" oyunla keşfetmek.',
  'Rol Yapma Oyunu (Drama)',
  '[
    {"step": 1, "title": "Hikayeyi Anlatın", "description": "\"Eskiden Alan Turing diye bir matematikçi varmış. ''Bir gün makineler o kadar iyi konuşacak ki, karşımızdakinin insan mı yoksa makine mi olduğunu anlayamayacağız'' demiş. Gel seninle bu testi yapalım.\""},
    {"step": 2, "title": "Sahne Kurulumu", "description": "Ebeveyn bir paravanın veya koltuğun arkasına geçer. Çocuk ebeveyni göremez."},
    {"step": 3, "title": "Oyun Başlasın", "description": "Çocuğa \"Bana sorular soracaksın. Ben bazen bir ROBOT gibi, bazen de KENDİM (İNSAN) gibi cevap vereceğim. Sen hangisi olduğumu tahmin edeceksin\" deyin."},
    {"step": 4, "title": "Rol Örnekleri", "description": "Robot cevabı (Monoton sesle): \"Sistemlerim normal çalışıyor. Enerji seviyem yüzde seksen.\" veya \"Ben yemek yemem. Elektrik ile çalışırım.\" İnsan cevabı: \"Biraz yorgunum ama seninle oyun oynadığım için mutluyum.\" veya \"Tabii ki mantı! Yanında da yoğurtla harika olur.\""},
    {"step": 5, "title": "Zorluk Seviyesini Artırın", "description": "Robot taklidi yaparken bazen insanı kandırmaya çalışın. \"Yemek yemem ama verilerime göre insanlar pizzayı çok seviyor.\" gibi kafa karıştırıcı cevaplar verin."},
    {"step": 6, "title": "Değerlendirme", "description": "Oyundan sonra sorun: \"Robot olduğumu en çok nereden anladın? Hangi cevapta seni kandırmayı başardım?\""}
  ]'::jsonb,
  '[
    {"title": "Eleştirel Dinleme", "description": "Kelimelerin arkasındaki duygu eksikliğini veya aşırı mantıksallığı fark edebiliyor mu?"},
    {"title": "Sorgulama", "description": "Karşısındakinin kimliğini ortaya çıkarmak için stratejik sorular (Örn: \"Ağlayabilir misin?\") sorabiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "İki sandalye", "optional": false},
    {"item": "Arayı kapatmak için bir paravan, battaniye veya sadece arkası dönük oturma düzeni", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Dijital Asistanı Sorguluyoruz
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
  'Dijital Asistanı Sorguluyoruz',
  'Gerçek bir yapay zeka ile konuşarak onun sınırlarını keşfedin. Bilgi sahibi olmak ile bilinç sahibi olmak arasındaki farkı görün!',
  'exploration',
  20,
  8,
  9,
  'Dijital asistana hem bilgi soruları hem de duygu/tercih soruları sorarak yapay zekanın sınırlarını test edin.',
  ARRAY['Akıllı telefon veya tablet (Siri, Google Asistan vb.)'],
  15,
  1,
  1,
  'Dijital asistan hangi soruları kolayca cevapladı? Hangi sorularda zorlandı veya kaçamak cevap verdi? Bu sence ne anlama geliyor?',
  'Gerçek bir yapay zeka ile konuşarak onun sınırlarını, sadece bilgiye sahip olduğunu ama bilince (duygulara, kişisel zevklere) sahip olmadığını görmek.',
  'Teknoloji ile Etkileşim',
  '[
    {"step": 1, "title": "Asistanı Tanıtın", "description": "\"Telefonumuzun içinde bizimle konuşan bir asistan var. Az önceki oyundaki gibi bakalım o insan mı yoksa robot mu? Onu biraz terletelim!\""},
    {"step": 2, "title": "Bilgi Soruları (Kolay)", "description": "Önce bildiği şeyleri sorun: \"Türkiye''nin başkenti neresi?\", \"3 artı 5 kaç eder?\" Yorum: \"Bak, ansiklopedi gibi her şeyi biliyor. Bu onun zeki olduğunu gösterir mi? Yoksa sadece iyi bir hafızası mı var?\""},
    {"step": 3, "title": "Duygu ve Tercih Soruları (Zor)", "description": "Şimdi onu zorlayacak sorular sorun: \"En sevdiğin renk ne?\", \"Hiç aşık oldun mu?\", \"Canın acıyor mu?\", \"Bu akşam ne yemek istersin?\""},
    {"step": 4, "title": "Cevapları Analiz Edin", "description": "Asistanın verdiği kaçamak cevapları yakalayın. \"Bak, ''Yemek yiyemem'' dedi. Ya da ''Ben bir yapay zekayım, duygularım yok'' dedi. Bize dürüst davranıyor.\""},
    {"step": 5, "title": "Sonuç", "description": "\"Bu asistan çok yardımcı, çok bilgili ama ''canlı'' değil. Sadece insanlar tarafından kodlanmış çok gelişmiş bir papağan gibi, kelimeleri birleştiriyor ama ne hissettiğimizi tam olarak anlayamaz.\""}
  ]'::jsonb,
  '[
    {"title": "Teknoloji Okuryazarlığı", "description": "Dijital asistanın bir insan olmadığını, bir \"araç\" olduğunu anlaması."},
    {"title": "İletişim", "description": "Bir makineyle iletişim kurarken net ifadeler kullanma becerisi."},
    {"title": "Sınırları Fark Etme", "description": "Yapay zekanın matematikte iyi ama duygularda yetersiz olduğunu ayırt etmesi."}
  ]'::jsonb,
  '[
    {"item": "Akıllı telefon veya tablet (Siri, Google Asistan vb. açık olsun)", "optional": false}
  ]'::jsonb
);
