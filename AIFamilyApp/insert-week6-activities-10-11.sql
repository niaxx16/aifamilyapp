-- Hafta 6 Etkinlikleri: Etik, Önyargı ve Deepfake - 10-11 yaş grubu

-- Etkinlik 1: Moral Machine (Zor Kararlar)
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
  'Moral Machine: Zor Kararlar',
  'Frenleri patlayan bir otonom araba kaza yapacaksa kimi kurtarmalı? MIT''nin ünlü Ahlak Makinesi ile yapay zekanın etik kararlarını sen ver!',
  'exploration',
  30,
  10,
  11,
  'MIT Moral Machine simülasyonunu kullanarak otonom araçların etik ikilemlerini deneyimleyin ve kendi ahlaki pusulanızı keşfedin.',
  ARRAY['Bilgisayar veya tablet', 'moralmachine.mit.edu web sitesi'],
  25,
  6,
  3,
  'En zor karar hangisiydi? Gerçek otonom arabalar bu kararları nasıl vermeli? Kim kodlamalı?',
  'Yapay zekanın (örneğin sürücüsüz arabaların) hayat memat meselesi kararları nasıl vereceğini, bu kararları kimin (mühendislerin mi, toplumun mu?) kodlaması gerektiğini tartışmak.',
  'Etik Simülasyon ve Tartışma',
  '[
    {"step": 1, "title": "Siteye Girin", "description": "moralmachine.mit.edu adresine gidin. \"Start Judging\" (Yargılamaya Başla) butonuna basın. Dil İngilizce açılırsa sol üstten Türkçe yapabilirsiniz."},
    {"step": 2, "title": "Senaryoyu Anlatın", "description": "\"Bu arabanın frenleri patladı. Ya dümdüz gidip yayalara çarpacak ya da direksiyonu kırıp duvara çarpacak (içindekiler ölecek). Kararı sen vereceksin.\""},
    {"step": 3, "title": "İkilemleri Çözün", "description": "Karşınıza zor sorular gelecek. Çocuğa neden o seçimi yaptığını mutlaka sorun: Yaşlı çift mi genç sporcu mu? Kurallara uyan mı ihlal eden mi? Doktor mu hırsız mı?"},
    {"step": 4, "title": "Sonuçları İnceleyin", "description": "Test bitince sistem \"Senin Ahlaki Pusulan\" diye bir rapor verir. \"Bak, sen genelde ''insan sayısını'' kurtarmaya odaklanmışsın\" veya \"Sen ''kurallara uyanları'' korumuşsun\" gibi."},
    {"step": 5, "title": "Büyük Soru", "description": "\"Peki sence gerçek arabaları üreten firmalar (Tesla, Google vb.) bu arabaları nasıl kodlamalı? Arabayı satın alanı mı korumalı, yoksa sokaktaki çocuğu mu?\""},
    {"step": 6, "title": "Tartışma", "description": "Bu kararları kim vermeli? Mühendisler mi? Hükümetler mi? Toplum mu? Her seçeneğin artı ve eksilerini tartışın."}
  ]'::jsonb,
  '[
    {"title": "Etik Muhakeme", "description": "Verdiği kararın gerekçesini (Adalet, Fayda, Yaşam Hakkı) açıklayabilmesi."},
    {"title": "Empati", "description": "Karar verirken zorlanması ve \"Doğru cevap yok\" gerçeğini kabullenmesi."}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "moralmachine.mit.edu web sitesi (Türkçe dil desteği var)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Deepfake Dedektifi (Gözlerine İnanma)
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
  'Deepfake Dedektifi: Gözlerine İnanma!',
  'Videolar bile sahte olabilir! Yapay zeka bir insana söylemediği sözleri söyletebilir. Deepfake''leri nasıl tespit edeceğini öğren ve bir dedektif gibi hataları bul!',
  'exploration',
  30,
  10,
  11,
  'Deepfake videolarını inceleyerek sahtelik ipuçlarını (göz kırpma, dudak senkronu, kenar bulanıklıkları) tespit etmeyi öğrenin.',
  ARRAY['Bilgisayar veya tablet', 'YouTube (güvenli Deepfake örnekleri)'],
  25,
  6,
  2,
  'Deepfake''i tespit etmek için hangi ipuçlarına baktın? İnternette şok edici bir video görünce ne yapmalısın?',
  'Videoların bile sahte olabileceğini, yapay zekanın bir insana söylemediği sözleri söyletebileceğini öğrenmek ve sahteliği ayırt edecek ipuçlarını yakalamak.',
  'Görsel Analiz ve Medya Okuryazarlığı',
  '[
    {"step": 1, "title": "Tanım", "description": "\"Photoshop ile fotoğrafların değiştirildiğini biliyorsun. Artık yapay zeka ile videolar da değiştiriliyor. Buna Deepfake denir. Biri senin videonu alıp, sana hiç söylemediğin şeyleri söyletebilir.\""},
    {"step": 2, "title": "Örnek İzleme", "description": "YouTube''dan ünlü bir Deepfake videosu açın (Örn: TikTok''taki sahte Tom Cruise veya Salvador Dali Müzesi). \"Bu adam Tom Cruise değil. Sadece ona benzeyen bir oyuncu, ama yüzünü yapay zeka ile dönüştürmüşler.\""},
    {"step": 3, "title": "Hata Avı - Göz Kırpma", "description": "\"Gözleri normal kırpılıyor mu? Yoksa çok mu donuk?\" Yapay zeka bazen göz kırpmayı unutur veya doğal görünmez."},
    {"step": 4, "title": "Hata Avı - Dudak ve Kenarlar", "description": "\"Sesiyle dudakları tam uyuşuyor mu?\" \"Yüzünün kenarlarına, saçlarına veya kulaklarına bak. Bulanıklık veya titreme var mı?\""},
    {"step": 5, "title": "Tehlikeyi Konuşun", "description": "\"Bu teknoloji film çekmek için harika. Ama kötü niyetli biri, okul müdürümüzün videosunu yapıp ''Okullar sonsuza kadar tatil!'' dedirtse ne olur?\" Cevap: Herkes inanır, kaos çıkar."},
    {"step": 6, "title": "Altın Kural", "description": "\"İnternette şok edici, garip veya çok saçma bir video görürsen, hemen inanma. Kaynağını kontrol et. Güvenilir haber sitelerinde de var mı bak.\""}
  ]'::jsonb,
  '[
    {"title": "Şüphecilik", "description": "\"Gözümle gördüğüme inanırım\" kuralının dijital dünyada geçerli olmadığını anlaması."},
    {"title": "Detaycılık", "description": "Videodaki teknik hataları (pikselleşme, uyumsuzluk) fark edebilmesi."}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "YouTube - Ebeveyn tarafından önceden seçilmiş güvenli Deepfake örnekleri (Deep Tom Cruise, Salvador Dali Museum)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Filtre Balonu (Neden Herkes Haklı?)
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
  'Filtre Balonu: Neden Herkes Haklı Sanıyor?',
  'Sosyal medya algoritmaları seni bir balona hapsetmiş olabilir! Neden farklı düşünen insanları göremiyorsun? Kendi filtre balonunu çiz ve nasıl patlatabileceğini öğren!',
  'creative',
  25,
  10,
  11,
  'Kağıt üzerinde kendi filtre balonunuzu çizerek algoritmaların bizi nasıl yankı odalarına hapsettiğini görselleştirin.',
  ARRAY['Kağıt', 'Renkli kalemler'],
  20,
  6,
  2,
  'Filtre balonunun içinde kalmak neden tehlikeli? Balonunu nasıl patlatabilirsin?',
  'Sosyal medya algoritmalarının bizi nasıl bir "yankı odasına" (Filter Bubble) hapsettiğini, neden farklı düşünen insanları göremediğimizi anlamak.',
  'Çizim ve Kavramsal Anlatım (Ekran Dışı)',
  '[
    {"step": 1, "title": "Çizim", "description": "Kağıdın ortasına bir çöp adam çizin (Bu sensin). Etrafına büyük bir baloncuk çizin."},
    {"step": 2, "title": "İlgi Alanları", "description": "Çocuğa sorun: \"En sevdiğin 3 şey ne?\" (Örn: Minecraft, Futbol, Pizza). Bunları balonun İÇİNE yazın."},
    {"step": 3, "title": "Sevmedikleri", "description": "\"Hiç ilgilenmediğin veya sevmediğin 3 şey ne?\" (Örn: Bale, Haberler, Brokoli). Bunları balonun DIŞINA yazın."},
    {"step": 4, "title": "Algoritmanın Görevi", "description": "\"Yapay zeka senin balonun içinde mutlu olmanı ister. O yüzden sana SÜREKLİ Minecraft ve Futbol videoları gösterir. Balonun duvarlarını kalınlaştırır.\""},
    {"step": 5, "title": "Sonuç: Körlük", "description": "\"Bir süre sonra ne olur? Sen sanırsın ki dünyadaki herkes sadece Minecraft oynuyor. Dışarıdaki ''Bale'' sevenleri hiç görmezsin. Başka bir arkadaşın da sadece Bale seviyorsa, o da seni görmez. İkiniz birbirinizi anlamayan iki yabancı olursunuz. Buna ''Filtre Balonu'' denir.\""},
    {"step": 6, "title": "Çözüm", "description": "\"Arada sırada balonunu iğneyle delmen lazım! Hiç izlemediğin belgeselleri izle, farklı fikirleri oku ki yapay zeka seni tek bir kutuya hapsetmesin.\" Balona küçük delikler çizin."}
  ]'::jsonb,
  '[
    {"title": "Sosyal Farkındalık", "description": "İnternette gördüğü dünyanın, gerçek dünyanın tamamı olmadığını kavraması."},
    {"title": "Algoritma Mantığı", "description": "\"Bana sadece sevdiğimi gösteriyor\" mantığının uzun vadeli sonucunu (kutuplaşma) anlayabilmesi."}
  ]'::jsonb,
  '[
    {"item": "Kağıt (A4 veya daha büyük)", "optional": false},
    {"item": "Renkli kalemler", "optional": false}
  ]'::jsonb
);
