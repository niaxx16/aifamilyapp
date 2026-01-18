-- Hafta 6 Etkinlikleri: Üretken Yapay Zeka ve Sanat (8-9 yaş grubu)

-- Etkinlik 1: Hayalindeki Kitap Kapağı
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
  'Hayalindeki Kitap Kapağı',
  'Hiç yazılmamış bir kitabın kapağını tasarlayın! Kalem yerine kelimeler kullanarak yapay zekaya hayalinizdeki resmi çizdirin.',
  'creative',
  30,
  8,
  9,
  'Canva veya Bing Image Creator kullanarak hayal ettiğiniz bir kitap kapağını kelimelerle tarif edip oluşturun.',
  ARRAY['Bilgisayar veya tablet', 'Canva veya Bing Image Creator'],
  20,
  6,
  2,
  'Yazdığın kelimeler değişince resim nasıl değişti? Yapay zeka hayalindekine ne kadar benzetti?',
  'Kelimelerin (Prompt) görsele nasıl dönüştüğünü görmek. Zihindeki soyut bir hayali somut bir resme çevirmek.',
  'Tasarım ve Yaratıcılık',
  '[
    {"step": 1, "title": "Hazırlık", "description": "Çocuğunuza \"Bugün seninle hiç yazılmamış bir kitabın kapağını tasarlayacağız. Ama kalem kullanmayacağız, kelimeleri kullanacağız!\" deyin."},
    {"step": 2, "title": "Fikir Bulma", "description": "Çılgın bir kitap ismi uydurun. Örnek: \"Uzayda Kaybolan Dondurma Kamyonu\" veya \"Süper Kahraman Kediler Okulu\"."},
    {"step": 3, "title": "Prompt Yazma", "description": "Aracı açın ve çocuğunuzla birlikte tarifi yazın. Kötü Tarif: \"Kedi okulu.\" İyi Tarif: \"Sırt çantası takan sevimli kediler, bir okul bahçesinde, güneşli bir gün, çizgi film tarzında, renkli.\""},
    {"step": 4, "title": "Sihirli An", "description": "\"Oluştur\" butonuna basın ve bekleme süresindeki heyecanı paylaşın."},
    {"step": 5, "title": "Sonucu İnceleme", "description": "Ekrana gelen 4 farklı resme bakın. \"Vay canına! Senin hayalindeki buna benziyor muydu?\" \"Bak, şu kedinin kuyruğunu unutmuş, yapay zeka bazen şapşallık yapabiliyor!\" (Hatalara gülmek önemlidir)."},
    {"step": 6, "title": "Revize Etme", "description": "Eğer beğenmediyse, \"Hadi tarifi değiştirelim. Belki ''uzayda'' olsun isteriz?\" diyerek yeni bir deneme yapın."}
  ]'::jsonb,
  '[
    {"title": "İfade Gücü", "description": "Görsel bir sahneyi kelimelerle betimleyebiliyor mu?"},
    {"title": "Teknoloji Okuryazarlığı", "description": "Yazdığı metnin doğrudan ekrandaki resmi değiştirdiğini fark ediyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "Canva (Sihirli Medya) veya Bing Image Creator (bing.com/images/create)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Tarzını Seç (Stil Transferi)
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
  'Tarzını Seç (Stil Transferi)',
  'Aynı konuyu farklı sanat tarzlarında görün! Yapay zekanın fotoğraf, piksel sanatı ve yağlı boya gibi stilleri nasıl bildiğini keşfedin.',
  'exploration',
  25,
  8,
  9,
  'Aynı konuyu (örneğin bisiklete binen dinozor) farklı sanat tarzlarında oluşturarak stilleri karşılaştırın.',
  ARRAY['Bilgisayar veya tablet', 'Canva veya Bing Image Creator'],
  20,
  6,
  2,
  'Aynı dinozor neden üç resimde farklı görünüyor? Yapay zeka bu sanat tarzlarını nereden biliyor?',
  'Yapay zekanın sadece "nesneleri" değil, "sanat tarzlarını" da bildiğini keşfetmek. Aynı konuyu farklı stillerde görerek görsel kültür kazanmak.',
  'Sanat Tarihi ve Teknoloji',
  '[
    {"step": 1, "title": "Tek Bir Konu Seçin", "description": "Çok basit bir konu belirleyin. Örneğin: \"Bisiklete binen bir dinozor.\""},
    {"step": 2, "title": "Stil 1: Gerçekçi (Fotoğraf)", "description": "Komut: \"Bisiklete binen bir dinozor, gerçek fotoğraf gibi, ormanda.\" Sonucu inceleyin. \"Sanki birisi ormana gidip fotoğrafını çekmiş gibi, değil mi?\""},
    {"step": 3, "title": "Stil 2: Piksel Sanatı", "description": "Komut: \"Bisiklete binen bir dinozor, piksel sanatı (pixel art), 8-bit, video oyunu gibi.\" Sonucu inceleyin. \"Bak, 2. haftada öğrendiğimiz kare kare piksellerden oluşmuş!\""},
    {"step": 4, "title": "Stil 3: Yağlı Boya", "description": "Komut: \"Bisiklete binen bir dinozor, yağlı boya tablosu, Van Gogh tarzında, renkli fırça darbeleri.\" Sonucu inceleyin. \"Fırça izlerini görüyor musun?\""},
    {"step": 5, "title": "Karşılaştırma", "description": "3 resmi yan yana açın. \"Konu aynı (dinozor) ama anlatış biçimi (tarz) farklı. Yapay zeka dünyadaki bütün resim tarzlarını öğrenmiş.\""}
  ]'::jsonb,
  '[
    {"title": "Görsel Ayırt Etme", "description": "\"Fotoğraf\" ile \"Çizim\" veya \"Boyama\" arasındaki farkı ayırt edebiliyor mu?"},
    {"title": "Kavram Eşleştirme", "description": "\"Piksel\", \"Yağlı boya\" gibi sanat terimlerini görsel karşılıklarıyla eşleştirebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "Canva veya Bing Image Creator", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Sanatçı İmzası (Etik Tartışma)
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
  'Sanatçı İmzası (Etik Tartışma)',
  'Bu resmi kim yaptı: Sen mi, yapay zeka mı? Emek, yaratıcılık ve dürüstlük üzerine önemli bir sohbet yapın!',
  'conversation',
  20,
  8,
  9,
  'Oluşturduğunuz resimlerden birini kullanarak "Bu resmi kim yaptı?" sorusu üzerinden yapay zeka etiğini tartışın.',
  ARRAY['Oluşturduğunuz resimlerden birinin çıktısı veya ekran görüntüsü', 'Kalem (opsiyonel, imza için)'],
  15,
  6,
  1,
  'Yapay zeka ile resim yaptığında bunu başkalarına nasıl anlatmalısın? "Ben çizdim" demek doğru mu?',
  '"Bu resmi kim yaptı?" sorusu üzerinden yapay zeka etiğine giriş yapmak. Emek, araç ve yaratıcılık kavramlarını tartışmak.',
  'Felsefe ve Etik Sohbeti',
  '[
    {"step": 1, "title": "Soruyu Sorun", "description": "Çocuğunuzun yaptığı en güzel resme bakarken aniden şunu sorun: \"Bu resmi kim yaptı? Sen mi, yoksa bilgisayar mı?\""},
    {"step": 2, "title": "Cevabı Tartışın", "description": "Eğer \"Bilgisayar yaptı\" derse: \"Ama sen ''mavi kedi'' demeseydin bilgisayar boş boş duracaktı. Fikir sendendi.\" Eğer \"Ben yaptım\" derse: \"Ama boyamayı sen yapmadın, elin hiç yorulmadı. Bilgisayar çizdi.\""},
    {"step": 3, "title": "Kamera Örneği", "description": "\"Bir fotoğrafçı fotoğraf çektiğinde, resmi ''kamera'' mı yapmış olur yoksa ''fotoğrafçı'' mı? Kamera sadece bir alettir, değil mi? Burada da yapay zeka senin çok gelişmiş bir fırçan veya kameran.\""},
    {"step": 4, "title": "İmza Töreni", "description": "\"O zaman bu resim bir ortak çalışma! Hadi altına imzamızı atalım.\" Resmin altına şöyle bir imza atmasını isteyin: \"Tasarım: [Çocuğun Adı] + YZ\" (Örn: Efe + Yapay Zeka)."},
    {"step": 5, "title": "Sonuç", "description": "\"Yapay zekayı kullandığımızda dürüst olmalıyız. ''Bunu ben elimle çizdim'' dersek yalan olur. Ama ''Bunu ben tasarladım ve yapay zeka ile ürettim'' dersek harika olur.\""}
  ]'::jsonb,
  '[
    {"title": "Dürüstlük ve Etik", "description": "Teknolojiyi kullanırken emeğin kaynağını doğru ifade etme bilinci oluştu mu?"},
    {"title": "Sahiplenme", "description": "Yapay zekayı korkulacak bir rakip değil, kendi yaratıcılığını destekleyen bir \"yardımcı\" olarak görüyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Oluşturduğunuz resimlerden birinin çıktısı veya ekran görüntüsü", "optional": false},
    {"item": "Kalem (imza atmak için, opsiyonel)", "optional": true}
  ]'::jsonb
);
