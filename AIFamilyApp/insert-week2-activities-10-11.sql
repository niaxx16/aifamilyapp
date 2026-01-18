-- Hafta 2 Etkinlikleri: Veri Okuryazarlığı ve Büyük Veri - 10-11 yaş grubu

-- Etkinlik 1: Algoritma Dedektifliği (Beni Neden Seçtin?)
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
  'Algoritma Dedektifliği (Beni Neden Seçtin?)',
  'YouTube veya Netflix seni nasıl tanıyor? Öneri algoritmalarının arkasındaki sırları keşfet ve veri ayak izini gör!',
  'exploration',
  25,
  10,
  11,
  'YouTube, Netflix veya Spotify gibi platformlarda önerilerin arkasındaki mantığı keşfedin ve algoritmanın nasıl çalıştığını analiz edin.',
  ARRAY['Sık kullanılan bir platform (YouTube, Netflix, Spotify veya TikTok)', 'Ebeveyn kontrolünde erişim'],
  20,
  2,
  2,
  'Algoritma seni gerçekten tanıyor mu, yoksa sadece geçmiş tıklamalarını mı takip ediyor? Algoritmanın hata yaptığı bir öneri var mıydı?',
  '"Öneri Algoritmalarının" sihirli olmadığını, bizim geçmiş verilerimizi (izleme süresi, tür, tıklama) kullanarak matematiksel tahminler yaptığını anlamak.',
  'Dijital Analiz ve Tersine Mühendislik',
  '[
    {"step": 1, "title": "Giriş", "description": "Uygulamayı açın ve ana sayfaya gelin. Çocuğunuza şunu sorun: \"Sence bu uygulama senin ne sevdiğini nereden biliyor? Seni hiç görmedi, seninle konuşmadı.\""},
    {"step": 2, "title": "Dedektiflik Görevi", "description": "Ana sayfada önerilen bir videoyu veya filmi seçin. Soru: \"Bunu sana neden önerdi? Kanıt bulabilir misin?\""},
    {"step": 3, "title": "İpucu Arama", "description": "Genellikle uygulamalarda küçük yazılarla ipuçları vardır: \"Çünkü X filmini izledin\", \"Senin gibi kullanıcılar bunu da sevdi\", \"%98 Eşleşme\" gibi."},
    {"step": 4, "title": "Veri Noktalarını Tartışın", "description": "Uygulamanın hangi veri noktalarını topladığını listeleyin: Hangi videoda kaç dakika kaldın? Beğendin mi? Günün hangi saatinde izliyorsun?"},
    {"step": 5, "title": "Düşünce Deneyi", "description": "\"Eğer telefonunu alıp 5 saat boyunca hiç sevmediğin (örneğin örgü örme) videoları izlesem, yarın ana sayfan nasıl görünürdü?\" Cevap: \"Her yer örgü videosu dolardı.\""},
    {"step": 6, "title": "Sonuç", "description": "\"Demek ki yapay zeka seni tanımıyor, sadece senin ''Veri Ayak İzini'' takip ediyor.\""}
  ]'::jsonb,
  '[
    {"title": "Neden-Sonuç İlişkisi", "description": "Ekrandaki sonucun, kendi geçmiş eylemlerinden kaynaklandığını kavrayabiliyor mu?"},
    {"title": "Eleştirel Bakış", "description": "\"Bana bunu önerdi ama ben aslında bunu sevmem, sadece yanlışlıkla tıklamıştım\" diyerek algoritmanın hatalarını fark edebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Sık kullanılan bir platform (YouTube, Netflix, Spotify veya TikTok - ebeveyn kontrolünde)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Quick, Draw! ve Dünyanın Verisi
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
  'Quick, Draw! ve Dünyanın Verisi',
  'Yapay zeka senin çizimini nasıl tanıyor? Milyonlarca insanın çizimlerinden oluşan devasa veri setini keşfet!',
  'exploration',
  30,
  10,
  11,
  'Quick, Draw! oyununu oynayın, sonra veri setini inceleyerek milyonlarca çizimin yapay zekayı nasıl eğittiğini görün.',
  ARRAY['Bilgisayar veya tablet', 'Web Sitesi: quickdraw.withgoogle.com'],
  20,
  2,
  2,
  'Dünyadaki herkes saati farklı çizse de yapay zeka neden hepsini tanıyabiliyor? Veri seti ne kadar büyük olmalı?',
  '"Büyük Veri" (Big Data) kavramını somutlaştırmak. Yapay zekanın tek bir kişinin çizimiyle değil, milyonlarca insanın çizimiyle öğrendiğini görmek.',
  'Veri Görselleştirme ve Analiz',
  '[
    {"step": 1, "title": "Oyunu Oynayın", "description": "Siteye girin ve 6 tur çizim yapın. (Örn: Çalar Saat, Kedi, Ayakkabı...)"},
    {"step": 2, "title": "Veri Setine Giriş", "description": "Oyun bittiğinde sonuç ekranında çizimleriniz görünecek. Bir tanesine (örneğin \"Çalar Saat\") tıklayın."},
    {"step": 3, "title": "Dünyayı Keşfedin", "description": "Tıkladığınızda sayfa sizi aşağıya yönlendirecek. \"Yapay zeka saat şeklinin neye benzediğini işte böyle öğrendi.\" Ekranda binlerce, on binlerce başkaları tarafından çizilmiş saat resmi göreceksiniz. Aşağı kaydırın - bitmiyor!"},
    {"step": 4, "title": "Analiz Soruları", "description": "\"Bak, Brezilya''daki biri saati böyle çizmiş, Japonya''daki böyle. Ama hepsi yuvarlak, değil mi?\" \"Eğer dünyadaki herkes saati ''kare'' çizseydi, yapay zeka senin çizdiğin ''yuvarlak'' saati tanıyabilir miydi?\" (Hayır)"},
    {"step": 5, "title": "Ortalama Alma", "description": "\"Yapay zeka bu milyonlarca resmin üst üste koyulmuş hali gibidir. ''Ortalama Saat'' resmini öğrenir. O yüzden senin çizimin yamuk olsa bile ortalamaya benzediği için tanır.\""}
  ]'::jsonb,
  '[
    {"title": "Büyük Resmi Görme", "description": "Tekil veriden (kendi çizimi) büyük veriye (milyonlarca çizim) geçişi anlayabiliyor mu?"},
    {"title": "Sorgulama", "description": "Veri setinin kalitesinin yapay zekanın başarısını etkilediğini kavrayabiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "Web Sitesi: quickdraw.withgoogle.com", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Veri Etiketleme Oyunu (Otonom Araç Eğitimi)
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
  'Veri Etiketleme Oyunu (Otonom Araç Eğitimi)',
  'Tesla mühendisi ol! Sürücüsüz araç için trafik fotoğraflarını etiketle ve yapay zekanın nasıl eğitildiğini öğren.',
  'game',
  30,
  10,
  11,
  'Karmaşık trafik fotoğraflarında arabaları, yayaları ve trafik işaretlerini işaretleyerek veri etiketleme sürecini deneyimleyin.',
  ARRAY['Karmaşık bir trafik fotoğrafı (internetten "busy street view" araması)', 'Renkli kalemler veya ekran kalemi'],
  25,
  2,
  2,
  'Neden her nesneyi tek tek etiketlemek gerekiyor? Reklam panosundaki araba resmi ile gerçek araba arasındaki farkı yapay zekaya nasıl öğretirsin?',
  'Yapay zekanın kendi kendine öğrenmediğini, insanların ona verileri "Etiketleyerek" (Labeling) öğrettiğini anlamak. Otonom araçların dünyayı nasıl gördüğünü simüle etmek.',
  'Simülasyon (Kağıt Üzerinde veya Ekranda)',
  '[
    {"step": 1, "title": "Senaryo", "description": "\"Biz Tesla veya Google''ın mühendisleriyiz. Sürücüsüz bir araba eğitiyoruz. Ama araba şu an hiçbir şeyi tanımıyor. Ona resimdeki her şeyi öğretmemiz lazım.\""},
    {"step": 2, "title": "Kutu Çizme (Bounding Box)", "description": "\"Görevin: Fotoğraftaki BÜTÜN arabaları kırmızı kare içine al.\" Zorluk: Sadece öndeki net arabaları değil, uzaktaki, ağacın arkasında yarısı görünen, park halindeki arabaları da bulmalı."},
    {"step": 3, "title": "Hata Kontrolü", "description": "Çocuğunuz bitirdim dediğinde inceleyin. \"Aaa bak, şurada uzakta minik bir araba var, onu işaretlememişsin. Eğer bizim robot araba onu görmezse gidip ona çarpabilir! Veri etiketleme çok dikkat ister.\""},
    {"step": 4, "title": "Kategorileri Artırın", "description": "\"Şimdi yayaları (insanları) mavi kareye al.\" \"Trafik ışıklarını yeşil kareye al.\""},
    {"step": 5, "title": "Gri Alanlar (Kritik Düşünme)", "description": "Bir reklam panosundaki araba resmini gösterin. \"Bunu da ''Araba'' diye etiketlemeli miyiz? Eğer etiketlersek, robot araba tabeladaki resme çarpmamak için aniden fren yapabilir.\" Cevap: \"Bunu ''Araba Resmi'' diye ayrı bir kategori yapmalıyız.\""}
  ]'::jsonb,
  '[
    {"title": "Dikkat ve Detaycılık", "description": "Gizli veya belirsiz nesneleri fark edebiliyor mu?"},
    {"title": "Sınıflandırma Mantığı", "description": "Gerçek araba ile araba resmi arasındaki (bağlamsal) farkı ayırt edip yapay zekaya doğru öğretme bilinci oluşuyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Karmaşık bir trafik fotoğrafı (İnternetten \"busy street view\" diye aratılabilir)", "optional": false},
    {"item": "Renkli kalemler (veya tablet kullanılıyorsa ekran kalemi)", "optional": false}
  ]'::jsonb
);
