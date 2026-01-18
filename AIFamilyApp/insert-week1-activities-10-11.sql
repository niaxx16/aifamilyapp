-- Hafta 1 Etkinlikleri: Kurallar mı, Deneyimler mi? (Yapay Zeka Temelleri) - 10-11 yaş grubu

-- Etkinlik 1: Emoji Dedektifi (Karar Ağacı Mantığı)
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
  'Emoji Dedektifi (Karar Ağacı Mantığı)',
  'Yapay zeka gibi düşün! Evet/Hayır soruları sorarak veri havuzundan doğru cevabı bul. Karar Ağacı mantığını keşfet!',
  'game',
  25,
  10,
  11,
  'Karışık görseller arasından Evet/Hayır soruları ile eleme yaparak hedef görseli bulun. Stratejik sorular sormayı öğrenin.',
  ARRAY['Kağıt ve kalem', '16-20 farklı görsel (hayvanlar, meyveler, araçlar, eşyalar karışık)'],
  20,
  1,
  2,
  'Tek tek tahmin etmek mi yoksa grupları elemek mi daha hızlıydı? Doktorlar veya bankalar bu sistemi nasıl kullanıyor olabilir?',
  'Yapay zekanın verileri sınıflandırarak ve eleyerek sonuca nasıl ulaştığını (Karar Ağacı / Decision Tree) kavramak. "Tahmin" değil "Eleme" yaptığını görmek.',
  'Mantık ve Strateji Oyunu (Ekran Dışı)',
  '[
    {"step": 1, "title": "Veriyi Hazırlayın", "description": "Çocuğunuzun önüne karışık görsellerin olduğu kağıdı (veya ekranı) koyun. \"Bu bizim veri havuzumuz. Ben bunlardan birini aklımdan tutacağım, sen de bir Yapay Zeka gibi sorular sorarak hangisi olduğunu bulacaksın.\""},
    {"step": 2, "title": "Kuralı Belirleyin", "description": "\"Sadece ''Evet'' veya ''Hayır'' diyebileceğim sorular sorabilirsin.\""},
    {"step": 3, "title": "Stratejik Yönlendirme", "description": "Çocuğunuz \"Bu bir kedi mi?\" (Tekli tahmin) diye sorarsa onu durdurun. \"Bir yapay zeka böyle sorarsa işi çok uzun sürer. Seçeneklerin yarısını tek seferde eleyecek, daha kapsayıcı bir soru sor. Mesela: ''Bu canlı bir şey mi?''\""},
    {"step": 4, "title": "Görsel Eleme", "description": "Çocuğunuz \"Canlı mı?\" diye sorduğunda (örneğin tuttuğunuz şey Uçak ise) \"Hayır\" deyin. Kağıttaki tüm canlıların üzerini hemen çizin. \"Bak, tek bir soruyla veri havuzunun yarısını çöpe attık! Yapay zeka işte böyle hız kazanır.\""},
    {"step": 5, "title": "Sonuca Ulaşma", "description": "Soru 2: \"Yenen bir şey mi?\" -> Hayır. (Yiyecekler elendi). Soru 3: \"İnsanları taşır mı?\" -> Evet. (Eşyalar elendi, araçlar kaldı). Sonuç: Uçak!"},
    {"step": 6, "title": "Bağlantı Kurma", "description": "\"Doktorların kullandığı hastalık teşhis robotları veya bankadaki sistemler de böyle çalışır. ''Ateşi var mı? Evet. Öksürük var mı? Hayır.'' sorularıyla milyonlarca ihtimali elerler. Buna ''Karar Ağacı'' denir.\""}
  ]'::jsonb,
  '[
    {"title": "Stratejik Düşünme", "description": "Rastgele tahmin yerine kümeyi daraltan sorular sorabiliyor mu?"},
    {"title": "Sınıflandırma", "description": "Nesneleri özelliklerine göre (Canlı/Cansız, Araç/Eşya) zihninde gruplayabiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Kağıt ve kalem", "optional": false},
    {"item": "Ebeveynin hazırlayacağı Veri Havuzu: Kağıda çizilmiş veya telefondan açılmış 16-20 farklı görsel (Hayvanlar, meyveler, araçlar, eşyalar karışık)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Taş-Kağıt-Makas (Örüntü Tanıma)
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
  'Taş-Kağıt-Makas (Örüntü Tanıma)',
  'Yapay zekayı yenebilir misin? Bu akıllı oyun senin alışkanlıklarını öğreniyor ve seni yenmeye başlıyor. Desenini kırabilecek misin?',
  'exploration',
  25,
  10,
  11,
  'Afiniti Rock Paper Scissors sitesinde yapay zekaya karşı oynayın ve onun sizin örüntülerinizi nasıl öğrendiğini gözlemleyin.',
  ARRAY['Bilgisayar, tablet veya telefon', 'Web Sitesi: Afiniti Rock Paper Scissors'],
  20,
  1,
  2,
  'Yapay zeka seni nasıl yenmeye başladı? Geçmiş hamlelerinden ne öğrendi? Desenini değiştirince ne oldu?',
  'İnsanların rastgele davranamadığını, belirli alışkanlıkları (desenleri/örüntüleri) olduğunu ve yapay zekanın bu desenleri yakalayarak bizi yenebildiğini görmek.',
  'Dijital Deney ve Veri Analizi',
  '[
    {"step": 1, "title": "Meydan Okuma", "description": "\"Taş-kağıt-makas oyununda seni kimse yenemez mi? Bakalım bu yapay zekayı yenebilecek misin? Ama dikkat et, bu oyun senin zihnini okumaya çalışacak.\""},
    {"step": 2, "title": "Veri Toplama (İlk 10-15 El)", "description": "Çocuğunuz oynamaya başlasın. Ekranın altındaki grafiğe veya skora dikkat edin. İlk başta yapay zeka rastgele oynayacaktır. \"Şu an seni tanımaya çalışıyor. Henüz hakkında ''verisi'' yok, o yüzden rastgele atıyor.\""},
    {"step": 3, "title": "Öğrenme Aşaması (20+ El)", "description": "20. elden sonra yapay zeka çocuğunuzun hamlelerini tahmin etmeye başlayacaktır. \"Bak, sen farkında değilsin ama beynin bir kurala uyuyor. Belki de her ''Taş'' yaptıktan sonra ''Makas'' yapıyorsun. Bilgisayar bu alışkanlığını (deseni) fark etti!\""},
    {"step": 4, "title": "Deseni Kırmak", "description": "\"Hadi şimdi onu şaşırt! Aklına gelenin tam tersini yap veya gözünü kapatıp rastgele tuşlara bas.\" Strateji aniden değişince yapay zekanın kafasının nasıl karıştığını izleyin."},
    {"step": 5, "title": "Sonuç", "description": "\"Yapay zeka geleceği göremez, ama geçmişe bakarak geleceği tahmin eder. Senin geçmiş verilerin arttıkça, seni daha iyi tanır.\""}
  ]'::jsonb,
  '[
    {"title": "Öz Farkındalık", "description": "Kendi oyun stratejisinin (veya rastgele olamayışının) farkına varabiliyor mu?"},
    {"title": "Grafik Okuma", "description": "Ekrandaki öğrenme eğrisini ve yapay zekanın \"tahmin gücünün\" artışını takip edebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar, tablet veya telefon", "optional": false},
    {"item": "Web Sitesi: Google''a \"Afiniti Rock Paper Scissors\" yazarak ilk siteye girin", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Geleneksel Kod vs. Yapay Zeka (Tost Makinesi Analizi)
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
  'Geleneksel Kod vs. Yapay Zeka (Tost Makinesi Analizi)',
  'Mükemmel tostu yapan bir robot nasıl programlanır? Kural yazmak mı, örnek göstermek mi? İki farklı yaklaşımı karşılaştırın!',
  'conversation',
  25,
  10,
  11,
  'Tost yapan robot senaryosu üzerinden geleneksel programlama ile makine öğrenimi arasındaki farkı keşfedin.',
  ARRAY['Kağıt', 'Kalem'],
  15,
  1,
  1,
  'Hangi durumlarda kural yazmak (trafik ışığı), hangi durumlarda örnek göstermek (yüz tanıma) daha mantıklı? Neden?',
  '"Programlama" (Kural Yazmak) ile "Makine Öğrenimi" (Örnek Göstermek) arasındaki farkı somutlaştırmak.',
  'Kavramsal Tartışma ve Tasarım',
  '[
    {"step": 1, "title": "Senaryo", "description": "Çocuğunuza şunu sorun: \"Diyelim ki mükemmel tostu yapabilen süper bir robot icat edeceğiz. Bunu robota nasıl öğretiriz? İki yöntemimiz var.\""},
    {"step": 2, "title": "Yöntem 1: Geleneksel Kodlama", "description": "Kağıdın soluna \"Klasik Robot\" yazın. Çocuğunuzdan buna bir kural (algoritma) yazmasını isteyin. Muhtemel Cevap: \"Ekmeği koy -> 2 dakika ısıt -> Çıkar.\""},
    {"step": 3, "title": "Sorunu Bulun", "description": "\"Peki ya ekmek çok inceyse? 2 dakikada yanar. Ya buzluktan çıktıysa? 2 dakikada ısınmaz. Her durum için binlerce kural yazman gerekir. Bu çok zor!\""},
    {"step": 4, "title": "Yöntem 2: Yapay Zeka", "description": "Kağıdın sağına \"Yapay Zeka Robotu\" yazın. \"Buna süre kuralı vermeyelim. Onun yerine robota bir kamera takalım. Ona 1000 tane ''mükemmel kızarmış ekmek'' fotoğrafı ve 1000 tane ''yanmış kömür gibi ekmek'' fotoğrafı gösterelim. Robot bu fotoğraflara bakıp, ''Hımm, rengi altın sarısı olunca durmam lazım'' diye kendisi öğrensin.\""},
    {"step": 5, "title": "Tabloyu Tamamlayın", "description": "Klasik Kodlama: İnsan kuralı yazar -> Bilgisayar uygular. (Örn: Hesap Makinesi, Trafik Lambası). Yapay Zeka: İnsan örneği (veriyi) verir -> Bilgisayar kuralı kendi bulur. (Örn: YouTube Önerileri, Yüz Tanıma)."}
  ]'::jsonb,
  '[
    {"title": "Soyut Düşünme", "description": "\"Kural\" ile \"Öğrenme\" arasındaki farkı ayırt edebiliyor mu?"},
    {"title": "Problem Çözme", "description": "Hangi durumda kuralın (trafik ışığı), hangi durumda yapay zekanın (araba sürmek) daha mantıklı olduğunu tartışabiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Kağıt", "optional": false},
    {"item": "Kalem", "optional": false}
  ]'::jsonb
);
