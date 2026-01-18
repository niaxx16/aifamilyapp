-- Hafta 5 Etkinlikleri: Yapay Zeka ile Konuşmak (8-9 yaş grubu)

-- Etkinlik 1: Robot Ressam (Detaylı Tarif Oyunu)
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
  'Robot Ressam (Detaylı Tarif Oyunu)',
  'Ebeveyn robot ressam olsun! Komutlarınız ne kadar detaylı olursa resim o kadar güzel olur. Yapay zekaya nasıl doğru talimat verileceğini öğrenin!',
  'creative',
  20,
  8,
  9,
  'Ebeveyn robot ressam rolüne girer, çocuk komut verir. Detaylı ve detaysız komutların farklı sonuçlar verdiğini keşfedin.',
  ARRAY['Kağıt', 'Kalem veya boya kalemleri'],
  15,
  5,
  1,
  'İlk çizim ile ikinci çizim neden farklı oldu? Yapay zekaya komut verirken hangi kelimeleri kullanmalıyız?',
  'Bilgisayarların kelimeleri ne kadar "gerçek" (literal) algıladığını anlamak. Detay vermeden kurulan cümlelerin yanlış anlaşılmaya müsait olduğunu görmek.',
  'Fiziksel / Kağıt-Kalem Oyunu (Ekran Dışı)',
  '[
    {"step": 1, "title": "Rolleri Dağıtın", "description": "\"Ben bir Yapay Zeka Robot Ressamım. Sen de benim kullanıcısın. Bana ne çizmem gerektiğini söyleyeceksin, ben de çizimin aynısını yapacağım. Ama dikkat et, ben sadece söylediğin şeyi çizerim, aklımdan uydurmam!\""},
    {"step": 2, "title": "İlk Tur (Eksik Komut)", "description": "Çocuğunuzdan size bir komut vermesini isteyin. Çocuk: \"Bir ev çiz.\" Ebeveyn (Robot): Kağıdın en köşesine, küçücük, kapısı ve penceresi olmayan basit bir kare ve üzerine üçgen çizin."},
    {"step": 3, "title": "Şaşkınlık Anı", "description": "Çocuk: \"Ama kapısı yok! Çok küçük oldu!\" Ebeveyn: \"Komutunda ''kapı'' veya ''büyük'' demedin. Ben sadece ''ev'' duydum.\""},
    {"step": 4, "title": "İkinci Tur (Detaylı Komut)", "description": "\"Hadi tekrar dene. Bu sefer daha fazla detay ver.\" Çocuk: \"Sayfanın ortasına büyük bir ev çiz. Ortasında bir kapısı, iki tane penceresi olsun. Çatısında duman tüten bir baca olsun.\" Şimdi tam olarak dediği gibi çizin."},
    {"step": 5, "title": "Karşılaştırma", "description": "İki resmi yan yana koyun. \"Gördün mü? İkisi de ''ev'' ama senin kelimelerin değiştikçe sonuç ne kadar güzelleşti. Yapay zekayla konuşurken de ''sihirli kelimeleri'' (sıfatları) kullanmalıyız.\""}
  ]'::jsonb,
  '[
    {"title": "Betimleme Yeteneği", "description": "Zihnindeki görüntüyü kelimelere dökebiliyor mu?"},
    {"title": "Hata Düzeltme", "description": "İlk denemede eksik olanı fark edip ikinci denemede düzeltebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Kağıt (en az 2 sayfa)", "optional": false},
    {"item": "Kalem veya boya kalemleri", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Hikaye Tamamlama (Kelime Sihirbazlığı)
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
  'Hikaye Tamamlama (Kelime Sihirbazlığı)',
  'Yapay zekaya hikaye yazdırın! Basit bir komut ile detaylı bir komutun ne kadar farklı sonuçlar verdiğini keşfedin. Prompt mühendisliğinin ilk adımı!',
  'creative',
  25,
  8,
  9,
  'ChatGPT veya Gemini ile önce basit, sonra detaylı komutlar vererek hikaye yazdırın ve sonuçları karşılaştırın.',
  ARRAY['Bilgisayar veya tablet', 'ChatGPT, Gemini veya Copilot (ebeveyn hesabı ile)'],
  20,
  5,
  2,
  'İki hikaye de kedi hakkındaydı ama biri neden daha eğlenceli oldu? Yapay zekaya ne kadar çok detay verirsen ne olur?',
  'Yapay zekaya verilen komut (prompt) değiştikçe, üretilen hikayenin nasıl değiştiğini görmek. "Prompt Mühendisliği"nin temeli.',
  'Dijital Etkileşim (Chatbot Kullanımı)',
  '[
    {"step": 1, "title": "Basit Başlangıç", "description": "Yapay zekayı açın. Çocuğunuza \"Hadi ona kısa bir hikaye yazdıralım\" deyin. Komut 1: \"Bir kedi hakkında hikaye yaz.\""},
    {"step": 2, "title": "Sıradan Sonuç", "description": "Yapay zeka muhtemelen çok sıradan, \"Bir varmış bir yokmuş, pamuk adında bir kedi varmış...\" diye başlayan bir hikaye yazacak. Okuyun ve \"Biraz sıkıcı değil mi?\" diye sorun."},
    {"step": 3, "title": "Sihirli Kelimeleri Ekleyin", "description": "\"Hadi şimdi ona daha çok detay verelim. Kedinin adı ne olsun? Nereye gitsin? Komik mi olsun korkunç mu?\""},
    {"step": 4, "title": "Detaylı Komut", "description": "Komut 2: \"Uzaya giden ''Roket Pati'' adında bir kedi hakkında çok komik bir hikaye yaz. Kedi uzayda uçan pizzalarla karşılaşsın.\""},
    {"step": 5, "title": "Karşılaştırma", "description": "Çıkan sonucu sesli okuyun (veya çocuk okusun). Muhtemelen çok daha eğlenceli ve yaratıcı olacaktır."},
    {"step": 6, "title": "Tartışma", "description": "\"Bak, bilgisayar aynı bilgisayar. Ama ikinci hikaye neden daha güzel oldu? Çünkü sen ona tam olarak ne istediğini söyledin. Sen ne kadar iyi anlatırsan, o da o kadar iyi yazar.\""}
  ]'::jsonb,
  '[
    {"title": "Yaratıcılık", "description": "Sıradan bir konuyu (kedi) ilginç hale getirecek detaylar (uzay, pizza) ekleyebiliyor mu?"},
    {"title": "Okuduğunu Anlama", "description": "İki metin arasındaki kalite farkını ayırt edebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "ChatGPT, Gemini veya Copilot (ebeveyn hesabı ile açılmış)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Bilmece Üreticisi (Zorluk Seviyesi Ayarlama)
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
  'Bilmece Üreticisi (Zorluk Seviyesi Ayarlama)',
  'Yapay zekaya rol verdirin! Aynı konuda hem kolay hem zor bilmece sormasını isteyin ve nasıl farklı davrandığını gözlemleyin.',
  'game',
  20,
  8,
  9,
  'Yapay zekadan aynı konu hakkında farklı zorluk seviyelerinde bilmeceler isteyin ve hedef kitleye göre nasıl değiştiğini keşfedin.',
  ARRAY['Bilgisayar veya tablet', 'ChatGPT, Gemini veya Copilot'],
  20,
  5,
  2,
  'Aynı cevap (buzdolabı) için iki farklı bilmece sorduk. Yapay zeka neden farklı anlattı? Ona ne dediğimiz önemli mi?',
  'Yapay zekanın "rol yapabildiğini" ve istediğimiz zorluk seviyesine göre (hedef kitleye göre) davranabildiğini keşfetmek.',
  'Oyun ve Mantık',
  '[
    {"step": 1, "title": "Oyun Kurulumu", "description": "\"Bu yapay zeka çok iyi bilmece biliyormuş. Hadi bizimle bir oyun oynasın.\""},
    {"step": 2, "title": "Kolay Seviye", "description": "İlk komutu verin: \"Bana bir buzdolabı ile ilgili, 6 yaşındaki bir çocuğun bilebileceği çok kolay bir bilmece sor.\" Beklenen sonuç: \"İçi soğuktur, yiyecekleri saklar. Kapağını açınca ışığı yanar. Ben neyim?\" gibi basit bir şey olacaktır."},
    {"step": 3, "title": "Zor Seviye", "description": "\"Bu çok kolaydı! Hadi onu zorlayalım.\" Komut: \"Şimdi yine buzdolabı ile ilgili ama büyüklerin bile zorlanacağı, çok zor ve şifreli bir bilmece sor.\""},
    {"step": 4, "title": "Karmaşık Sonuç", "description": "Yapay zeka muhtemelen kış, kutuplar, elektrik ve saklama ile ilgili daha şiirsel ve karmaşık bir bilmece yazacaktır."},
    {"step": 5, "title": "Analiz", "description": "\"Vay canına! Cevap yine ''buzdolabı'' ama anlatış şekli nasıl değişti? Çünkü ona ''6 yaşında çocuk gibi davran'' veya ''zor sor'' dedik. Yapay zeka, kiminle konuştuğunu ona söylersen ona göre davranır.\""},
    {"step": 6, "title": "Bonus: Hata Düzeltme", "description": "Eğer yapay zeka cevabı hemen verirse (bilmeceyi sormadan cevabı söylerse), çocuğunuza \"Hayır cevabı söyleme, sadece bilmeceyi sor\" diyerek komutu düzelttirin."}
  ]'::jsonb,
  '[
    {"title": "Empati ve Hedef Kitle", "description": "\"6 yaşındaki çocuk\" ile \"Büyük insan\" arasındaki anlama farkını kavrayıp, yapay zekayı buna göre yönlendirebiliyor mu?"},
    {"title": "Problem Çözme", "description": "Yapay zeka cevabı hemen verdiğinde, komutu düzeltebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "ChatGPT, Gemini veya Copilot (ebeveyn hesabı ile)", "optional": false}
  ]'::jsonb
);
