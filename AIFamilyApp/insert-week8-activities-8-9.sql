-- Hafta 8 Etkinlikleri: İyilik İçin Yapay Zeka (8-9 yaş grubu) - FİNAL HAFTASI

-- Etkinlik 1: Bir Sorun Bul (Empati Dedektifi)
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
  'Bir Sorun Bul (Empati Dedektifi)',
  'Mucit olmak için önce bir sorun bul! Çevrene dikkatli bak ve yapay zekanın insanlara, hayvanlara veya doğaya nasıl yardım edebileceğini keşfet.',
  'exploration',
  20,
  8,
  9,
  'Evinizde, çevrenizde veya dünyadaki sorunları gözlemleyerek yapay zeka ile çözülebilecek bir problem bulun.',
  ARRAY['Küçük bir not defteri (Fikir Defteri)', 'Kalem'],
  15,
  8,
  1,
  'Bulduğun sorunlardan hangisi seni en çok üzdü? Yapay zeka bu sorunu çözerse kim mutlu olur?',
  'Çocuğun çevresine dikkatli bakmasını ve yapay zekanın "insanlara yardım etmek" için kullanılabileceğini kavramasını sağlamak. Empati yeteneğini geliştirmek.',
  'Gözlem ve Beyin Fırtınası',
  '[
    {"step": 1, "title": "Görevi Tanımlayın", "description": "\"Bugün seninle bir mucit olacağız! Ama bir şey icat etmeden önce, neyi düzelteceğimizi bulmamız lazım. Yapay zeka en çok insanlara, hayvanlara veya doğaya yardım ettiğinde işe yarar.\""},
    {"step": 2, "title": "Keşif Turu", "description": "Evin içinde, bahçede veya sadece sohbet ederek zihinsel bir tur atın. Yaşlılar için: \"Anneannenin yaparken zorlandığı bir şey var mı?\" Doğa için: \"Sokaktaki kediler kışın üşüyor mu?\" Kendisi için: \"Okulda veya evde en çok neyden sıkılıyorsun?\""},
    {"step": 3, "title": "Sorun Listesi", "description": "Bulduğunuz 3 tane sorunu deftere yazın. Örnek: 1) Dedem gözlüğünü hep kaybediyor. 2) Sokak kedileri susuz kalıyor. 3) Odamdaki oyuncaklar çok dağılıyor."},
    {"step": 4, "title": "Seçim Yapın", "description": "\"Sence bunlardan hangisini çözersek dünya (veya evimiz) daha güzel bir yer olur?\" Bir tanesini seçin ve daire içine alın. Bu sorun, bir sonraki etkinlikteki icadınızın konusu olacak!"}
  ]'::jsonb,
  '[
    {"title": "Empati", "description": "Kendisi dışındaki canlıların (yaşlılar, hayvanlar) sorunlarını fark edip önemseyebiliyor mu?"},
    {"title": "Odaklanma", "description": "Genel bir şikayet yerine (her yer kötü) spesifik bir sorun (kediler susuz) bulabiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Küçük bir not defteri (Fikir Defteri olsun)", "optional": false},
    {"item": "Kalem", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: İcadını Tasarla (Prototip Atölyesi)
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
  'İcadını Tasarla (Prototip Atölyesi)',
  'Şimdi mucit olma zamanı! Bulduğun sorunu çözen yapay zekalı bir icat tasarla ve maketini yap!',
  'creative',
  35,
  8,
  9,
  'Atık malzemeler kullanarak yapay zeka destekli bir icadın maketini oluşturun. Sensör, beyin ve eylem kısımlarını tasarlayın.',
  ARRAY['Atık malzemeler (karton kutular, rulolar, şişeler)', 'Boya kalemleri, makas, yapıştırıcı, bant'],
  25,
  8,
  2,
  'İcadının gözü (sensörü) ne? Beyni nasıl karar veriyor? Ne yapıyor? Bu icat gerçekten yapılsa kimlere yardım eder?',
  'Soyut bir fikri somut bir modele dönüştürmek. Yapay zekanın çalışma mantığını (Sensör -> Veri -> Karar) tasarıma yedirmek.',
  'Maker (Kendin Yap) Etkinliği',
  '[
    {"step": 1, "title": "Planlama (Giriş-Çıkış)", "description": "Yapmaya başlamadan önce icadın \"Yapay Zeka\" kısmını konuşun. Gözü (Giriş Verisi): \"Bu robot sorunu nasıl anlayacak? Kamerası mı var, mikrofonu mu?\" Beyni (Karar): \"Neye karar verecek?\" Eylemi (Çıkış): \"Ne yapacak?\""},
    {"step": 2, "title": "İnşaat Başlasın", "description": "Malzemeleri kullanarak icadın bir maketini yapın. Bir kutuyu robotun gövdesi yapın. Rulolardan kamera yapıp üstüne yapıştırın. Düğmeler çizin."},
    {"step": 3, "title": "İsim Koyma", "description": "İcada havalı bir isim bulun. Örnek: \"Miya-Matik 3000\" veya \"Gözlük-Bulucu\" veya \"Kedi-Dostum\"."},
    {"step": 4, "title": "Detaylandırma", "description": "Üzerine \"Yapay Zeka ile Çalışır\" gibi etiketler yapıştırın. Çocuğunuzun icadını süslemesine izin verin. Sensörü, ekranı ve düğmeleri belirgin şekilde işaretleyin."}
  ]'::jsonb,
  '[
    {"title": "Yaratıcı Problem Çözme", "description": "Elindeki sınırlı malzemelerle (karton vs.) aklındaki tasarımı oluşturabiliyor mu?"},
    {"title": "Mantıksal Tutarlılık", "description": "İcadın parçaları mantıklı mı? Görmesi gerekiyorsa kamera/sensör koydu mu?"}
  ]'::jsonb,
  '[
    {"item": "Atık malzemeler (Karton kutular, tuvalet kağıdı ruloları, plastik şişeler)", "optional": false},
    {"item": "Boya kalemleri, makas, yapıştırıcı, bant", "optional": false},
    {"item": "Malzeme yoksa sadece kağıt üzerine detaylı çizim de olur", "optional": true}
  ]'::jsonb
);

-- Etkinlik 3: Gelecek Sunumu ve Sertifika Töreni
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
  'Gelecek Sunumu ve Sertifika Töreni',
  'Artık bir yapay zeka uzmanısın! İcadını dünyaya tanıt, gazeteci sorularını yanıtla ve "Geleceğin Mucidi" sertifikanı al!',
  'conversation',
  25,
  8,
  9,
  'Hazırlanan icadı aile üyelerine sunum yaparak tanıtın, soruları cevaplayın ve 8 haftalık programı sertifika töreniyle kutlayın.',
  ARRAY['Hazırlanan maket', 'Mikrofon (kumanda veya rulo)', 'İzleyiciler (aile veya oyuncaklar)', 'El yapımı Geleceğin Mucidi Sertifikası'],
  30,
  8,
  2,
  '8 hafta boyunca yapay zeka hakkında en çok neyi öğrendin? Artık yapay zekayı nasıl kullanacaksın?',
  'Çocuğun fikirlerini topluluk önünde ifade etmesi, özgüven kazanması ve 8 haftalık sürecin başarısını kutlamak.',
  'Sunum ve Kutlama',
  '[
    {"step": 1, "title": "Hazırlık", "description": "Çocuğunuza \"Sen şimdi büyük bir teknoloji şirketinin CEO''susun. İcadını dünyaya tanıtacaksın\" deyin."},
    {"step": 2, "title": "Sunum Soruları", "description": "Konuşmasında şu 3 soruya cevap vermesini isteyin: 1) Bu icadın adı ne? 2) Hangi sorunu çözüyor? 3) Yapay zeka bu icadın neresinde? (Nasıl çalışıyor?)"},
    {"step": 3, "title": "Sahne Senin", "description": "İzleyiciler yerini alsın. Çocuğunuz sahneye çıksın ve icadını anlatsın. Alkışlarla destekleyin!"},
    {"step": 4, "title": "Gazeteci Soruları", "description": "Sunum bitince el kaldırıp soru sorun: \"Sayın Mucit, bu icat yanlışlıkla başka bir hayvana da çalışır mı?\" (Önyargı hatırlatması). \"Bu icat insanların izni olmadan bilgi toplar mı?\" (Gizlilik hatırlatması)."},
    {"step": 5, "title": "Büyük Final - Sertifika Töreni", "description": "Alkışlar eşliğinde el yapımı sertifikayı verin: \"Bu sertifika, 8 haftadır yapay zekayı öğrenen, onu eğiten ve insanlık yararına kullanan [Çocuğun Adı]''na verilmiştir. Artık sen bir Geleceğin Mucidisin!\""}
  ]'::jsonb,
  '[
    {"title": "Sözlü İfade", "description": "Karmaşık bir fikri başkalarının anlayacağı şekilde basitleştirip anlatabiliyor mu?"},
    {"title": "Özgüven", "description": "Yaptığı işten gurur duyuyor ve sorulara mantıklı cevaplar verebiliyor mu?"},
    {"title": "Bütüncül Bakış", "description": "Geçmiş haftalarda öğrendiği (veri, hata, etik) kavramları projesinde hatırlıyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Hazırlanan maket (önceki etkinlikten)", "optional": false},
    {"item": "Mikrofon olarak kullanılacak bir nesne (kumanda veya rulo)", "optional": false},
    {"item": "İzleyiciler (Anne, baba, kardeşler veya dizilmiş oyuncak ayılar)", "optional": false},
    {"item": "El yapımı Geleceğin Mucidi Sertifikası", "optional": false}
  ]'::jsonb
);
