-- Hafta 7 Etkinlikleri: Öneri Sistemleri (6-7 yaş grubu)

-- Etkinlik 1: Müzik Zevkimiz (Sihirli DJ)
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
  'Müzik Zevkimiz (Sihirli DJ)',
  'Telefonunuzun içindeki görünmez DJ ile tanışın! Yapay zekanın müzik zevkinizi nasıl öğrendiğini ve size özel şarkılar önerdiğini keşfedin.',
  'exploration',
  20,
  6,
  7,
  'Müzik uygulamasında belirli bir tarz dinleyerek yapay zekanın önerilerini nasıl değiştirdiğini gözlemleyin.',
  ARRAY['Müzik dinleme uygulaması (Spotify, YouTube Music, Apple Music vb.) yüklü telefon veya tablet'],
  15,
  7,
  1,
  'DJ sana hangi şarkıları önerdi? Neden o şarkıları seçtiğini düşünüyorsun?',
  'Yapay zekanın, kullanıcının geçmişte ne dinlediğine bakarak gelecekte ne dinlemek isteyeceğini tahmin ettiğini göstermek. "Kişiselleştirme" kavramını müzik üzerinden deneyimlemek.',
  'İşitsel Keşif ve Kişiselleştirme',
  '[
    {"step": 1, "title": "DJ Karakterini Tanıtın", "description": "\"Bugün telefonumuzun içinde görünmez bir DJ olduğunu hayal edelim. Bu DJ''in adı ''Yapay Zeka DJ''. Onun görevi seni mutlu edecek şarkıları bulmak. Ama senin ne sevdiğini henüz bilmiyor. Hadi ona öğretelim!\""},
    {"step": 2, "title": "Belirli Bir Tarz Seçin", "description": "Çocuğunuzla birlikte sadece tek bir tür müzik dinlemeye başlayın. Örneğin, art arda 3-4 tane neşeli çocuk şarkısı veya Disney filmi şarkısı açın. (Bu sırada rock veya klasik müzik açmamaya özen gösterin)."},
    {"step": 3, "title": "Önerileri Kontrol Edin", "description": "3-4 şarkıdan sonra uygulamanın ana sayfasına veya \"Senin İçin Önerilenler / Radyo Başlat\" kısmına gidin."},
    {"step": 4, "title": "Sihirli Soruyu Sorun", "description": "Listede çıkan yeni şarkılara bakın. \"Aaa! Bak DJ bize hangi şarkıları sıraya koymuş? Bunlar az önce dinlediklerimize benziyor mu?\" diye sorun. Muhtemelen benzer türde çocuk şarkıları çıkacaktır."},
    {"step": 5, "title": "Deneyi Tersine Çevirin", "description": "\"Şimdi DJ''in kafasını karıştıralım mı?\" deyin ve bu sefer art arda 3-4 tane çok sakin, uyku müziği veya klasik müzik açın. Sayfayı yenileyin. \"Bak! Şimdi de sakin şarkılar önermeye başladı.\""},
    {"step": 6, "title": "Mantığı Açıklayın", "description": "\"Gördün mü? Bu Yapay Zeka DJ, kulaklarını dört açmış seni dinliyor. Sen neyi seçersen, ''Hımm, bu çocuk şu an hareketli şarkı seviyor, ona daha çok hareketli şarkı vereyim'' diyor. Seni mutlu etmek için senin zevkini öğreniyor.\""}
  ]'::jsonb,
  '[
    {"title": "Neden-Sonuç İlişkisi", "description": "\"Ben bunu dinlediğim için, o da bana bunu önerdi\" bağlantısını kurabilmesi."},
    {"title": "Farkındalık", "description": "Uygulamanın sunduğu listenin rastgele değil, kendi tercihlerine göre değiştiğini fark etmesi."},
    {"title": "Kategorizasyon", "description": "Hareketli şarkılarla sakin şarkıların farklı gruplar olduğunu işitsel olarak ayırt etmesi."}
  ]'::jsonb,
  '[
    {"item": "Müzik dinleme uygulaması (Spotify, YouTube Music, Apple Music vb.) yüklü telefon veya tablet", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Çizgi Film Maratonu (Dedektif Ekran)
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
  'Çizgi Film Maratonu (Dedektif Ekran)',
  'Video platformlarının ana sayfasındaki önerilerin neden orada olduğunu dedektif gibi araştırın! İzleme geçmişinizin etkisini keşfedin.',
  'exploration',
  15,
  6,
  7,
  'Netflix, Disney+ veya YouTube Kids gibi platformlarda önerilen içeriklerin neden sizin için seçildiğini analiz edin.',
  ARRAY['Netflix, Disney+ veya YouTube Kids gibi bir video platformu (Akıllı TV veya tablet üzerinde)'],
  15,
  7,
  1,
  'Önerilen çizgi filmler daha önce izlediklerine benziyorlar mıydı? Ortak özellikleri nelerdi?',
  'Video platformlarının ana sayfasındaki önerilerin rastgele olmadığını, izleme geçmişimize dayandığını görsel kapaklar üzerinden analiz etmek.',
  'Görsel Gözlem ve Analiz',
  '[
    {"step": 1, "title": "Ekranı İnceleyin", "description": "Uygulamayı açın ve ana sayfaya birlikte bakın. \"Bak burada ''Sen İzlediğin İçin'' veya ''Önerilenler'' yazıyor. Sence televizyon bu çizgi filmleri neden buraya koymuş?\""},
    {"step": 2, "title": "Ortak Özellik Avı", "description": "Önerilen çizgi filmlerin kapak resimlerine bakın. \"Gel bir dedektiflik yapalım. Biz geçen gün Paw Patrol (veya sevdiği başka bir şey) izlemiştik değil mi? O köpeklerle ilgiliydi. Peki, burada önerilen diğer çizgi filmlerde ne görüyorsun?\""},
    {"step": 3, "title": "Bağlantıları Bulun", "description": "Çocuğunuzun \"Burada da hayvanlar var!\" veya \"Bu da süper kahramanlı!\" demesini bekleyin. Bulamazsa siz yönlendirin: \"Bak bu önerdiği filmde de arabalar var, tıpkı senin sevdiğin Şimşek McQueen gibi.\""},
    {"step": 4, "title": "Yapay Zekaya Bağlayın", "description": "\"İşte televizyonun içindeki yapay zeka bir dedektif gibi çalışıyor. Senin izlediğin filmlere bakıyor ve ''Bu çocuk hayvanları ve maceraları seviyor'' diye not alıyor. Sonra bütün filmler arasından hayvanlı ve maceralı olanları bulup ''Bunu da sevebilirsin'' diye senin önüne getiriyor.\""}
  ]'::jsonb,
  '[
    {"title": "Görsel Analiz", "description": "Çizgi film afişleri arasındaki görsel benzerlikleri (renkler, karakter tipleri) fark etmesi."},
    {"title": "Mantıksal Çıkarım", "description": "Önerilen içeriğin, daha önce izlediği içerikle bağlantılı olduğunu anlaması."},
    {"title": "Eleştirel Düşünme", "description": "\"Bunu bana neden gösterdi?\" sorusunu sorma alışkanlığı kazanması."}
  ]'::jsonb,
  '[
    {"item": "Netflix, Disney+ veya YouTube Kids gibi bir video platformu (Akıllı TV veya tablet üzerinde)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Kendi Öneri Listem (Ben Robotum)
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
  'Kendi Öneri Listem (Ben Robotum)',
  'Bu sefer Yapay Zeka sen ol! Başkasının zevklerine göre öneri yaparak öneri sistemlerinin nasıl çalıştığını öğren.',
  'game',
  20,
  6,
  7,
  'Çocuğunuz bir öneri robotu rolüne girerek, verilen profile göre uygun nesneleri seçsin.',
  ARRAY['Çocuğun oyuncakları, kitaplar veya atıştırmalıklar', 'Kağıt ve kalem (Ebeveyn için)'],
  15,
  7,
  2,
  'Öneri robotu olunca nasıl hissettin? Başkasının sevdiği şeyleri tahmin etmek zor muydu?',
  'Bir öneri sisteminin (algoritmanın) çalışma mantığını çocuğun bizzat kendisinin kurmasını sağlamak. Başkasının zevkine göre tahmin yürütme (empati) becerisini geliştirmek.',
  'Empati ve Mantık Oyunu (Rol Yapma)',
  '[
    {"step": 1, "title": "Rolleri Değişin", "description": "\"Şimdi bilgisayarları kapatalım. Bu sefer Yapay Zeka SEN olacaksın! Ben de senin müşterinim.\""},
    {"step": 2, "title": "Müşteri Profilini Verin", "description": "Kendiniz için (veya hayali bir arkadaş için) bir profil çizin. Örneğin: \"Benim adım Ayşe. Ben dinozorları çok severim, yeşil rengi severim ve macera kitaplarına bayılırım. İşte benim verilerim bunlar.\""},
    {"step": 3, "title": "Öneri İsteyin", "description": "Önüne karışık bir yığın (bebekler, dinozorlar, arabalar, boya kalemleri, elma, çikolata vb.) koyun. \"Sevgili Robot, benim sevdiğim şeyleri öğrendin. Şimdi bu masadaki eşyalardan sence hangilerini sevebilirim? Bana 3 tane öneri seç.\""},
    {"step": 4, "title": "Seçimlerin Nedenini Sorun", "description": "Çocuk 3 nesne seçtiğinde (muhtemelen dinozor, yeşil bir lego ve bir macera kitabı seçecektir), en kritik soruyu sorun: \"Neden bunları seçtin?\""},
    {"step": 5, "title": "Cevabı Pekiştirin", "description": "Çocuğunuz \"Çünkü sen dinozor seviyorum dedin, bu da bir dinozor\" dediğinde onu alkışlayın. \"Harikasın! İşte öneri sistemi tam olarak budur. Benim hakkımda bildiklerini kullandın ve benim seveceğim şeyleri tahmin ettin.\""}
  ]'::jsonb,
  '[
    {"title": "Empati ve Perspektif Alma", "description": "Kendi zevklerine göre değil, karşısındaki kişinin (profilin) zevklerine göre seçim yapabilmesi."},
    {"title": "Veri Kullanımı", "description": "Verilen sözel bilgileri (dinozor, yeşil, macera) bir karar verme kriteri olarak kullanması."},
    {"title": "Sınıflandırma ve Eşleştirme", "description": "Masadaki karışık nesneler arasından profile uygun olanları ayıklayabilmesi."},
    {"title": "Sözel İfade", "description": "Seçiminin mantıklı gerekçesini açıklayabilmesi (\"Bunu seçtim çünkü...\")."}
  ]'::jsonb,
  '[
    {"item": "Çocuğun oyuncakları, birkaç kitap veya evdeki atıştırmalıklar", "optional": false},
    {"item": "Kağıt ve kalem (Ebeveyn not almak için kullanabilir)", "optional": true}
  ]'::jsonb
);
