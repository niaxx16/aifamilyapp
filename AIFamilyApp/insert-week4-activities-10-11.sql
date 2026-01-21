-- Hafta 4 Etkinlikleri: Doğal Dil İşleme (NLP) - 10-11 yaş grubu

-- Etkinlik 1: Semantris (Kelime Çağrışım Oyunu)
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
  'Semantris: Kelime Çağrışım Oyunu',
  'Yapay zeka kelimeleri sadece harf olarak değil, anlam olarak anlıyor! Google''ın Semantris oyunuyla kelime çağrışımlarını test et ve anlamsal zekayı keşfet.',
  'game',
  25,
  10,
  11,
  'Google Semantris oyununu oynayarak yapay zekanın kelimeleri anlam olarak nasıl eşleştirdiğini keşfedin.',
  ARRAY['Bilgisayar veya tablet', 'Google Semantris web sitesi'],
  20,
  4,
  2,
  'Yapay zeka "Yaz" kelimesinde "Ateş" harfleri olmadığı halde neden sıcakla ilişkilendirdi? Anlamsal zeka ne demek?',
  'Yapay zekanın kelimeleri sadece harf olarak değil, "anlam" olarak eşleştirdiğini (Semantik Bağ) görmek.',
  'Kelime Oyunu ve Hız',
  '[
    {"step": 1, "title": "Oyunu Açın", "description": "Google''a \"Semantris\" yazın ve ilk siteye girin. \"Play Arcade\" butonuna basın."},
    {"step": 2, "title": "Mantığı Anlayın", "description": "Ekrana yukarıdan kelimeler düşecek. Göreviniz, o kelimelerle alakalı bir kelime yazmak. Örnek: Ekranda \"Moon\" (Ay) yazıyorsa, \"Sun\" (Güneş), \"Night\" (Gece) veya \"Space\" (Uzay) yazabilirsiniz."},
    {"step": 3, "title": "Anlam Bağını Görün", "description": "Yapay zeka, yazdığınız kelime ile ekrandaki kelime arasındaki \"anlam bağını\" ölçer. Eğer bağ güçlüyse kelimeyi patlatır ve puan verir."},
    {"step": 4, "title": "Deneme Yapın", "description": "Ekranda \"School\" (Okul) varsa, \"Student\" (Öğrenci) yazın. Kelimenin nasıl hızla aşağı inip patladığını izleyin."},
    {"step": 5, "title": "Soyut Düşünme Zorluğu", "description": "Ekranda \"Hot\" (Sıcak) varsa, sadece \"Fire\" (Ateş) değil, \"Summer\" (Yaz) yazmayı deneyin. \"Bak, ''Yaz'' kelimesinde ''Ateş'' harfleri yok ama yapay zeka yazın sıcak olduğunu biliyor. Buna ''Anlamsal Zeka'' diyoruz.\""},
    {"step": 6, "title": "Türkçe Alternatif", "description": "Eğer İngilizce zor gelirse, ChatGPT''yi açın ve şu komutu verin: \"Benimle kelime çağrışım oyunu oyna. Ben bir kelime yazacağım, sen onunla en alakalı kelimeyi tahmin et ve nedenini söyle.\""}
  ]'::jsonb,
  '[
    {"title": "Kelime Dağarcığı", "description": "Kelimeler arasındaki ilişkileri (zıt anlam, eş anlam, sebep-sonuç) hızlıca kurabilmesi."},
    {"title": "Hız ve Refleks", "description": "Düşünen bir bilgisayara karşı zamanla yarışması."}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "Google Semantris web sitesi (Arcade modu önerilir)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Duygu Dedektifi (Sentiment Analysis)
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
  'Duygu Dedektifi: Yapay Zeka Duyguları Okuyabilir mi?',
  'Bir cümleyi okuduğunda yazarın mutlu mu yoksa kızgın mı olduğunu yapay zeka nasıl anlıyor? Duygu analizi teknolojisini keşfet ve yapay zekayı ironiyle test et!',
  'exploration',
  30,
  10,
  11,
  'ChatGPT veya MonkeyLearn kullanarak cümlelerin duygu analizini yapın ve yapay zekanın ironiyi anlayıp anlamadığını test edin.',
  ARRAY['Bilgisayar', 'ChatGPT veya MonkeyLearn web sitesi'],
  25,
  4,
  2,
  'Yapay zeka ironiyi anladı mı? "Harika, telefonumu kırdım" cümlesindeki gerçek duyguyu nasıl buldu?',
  'Bilgisayarların bir cümleyi okuduğunda yazarın "kızgın" mı yoksa "mutlu" mu olduğunu nasıl anladığını (Duygu Analizi - Sentiment Analysis) keşfetmek.',
  'Analiz ve Gözlem',
  '[
    {"step": 1, "title": "Aracı Açın", "description": "ChatGPT''yi açın ve \"Bu cümlenin duygusu nedir: Pozitif mi Negatif mi?\" diye sorabilirsiniz. Alternatif olarak monkeylearn.com/sentiment-analysis-online/ adresini kullanabilirsiniz."},
    {"step": 2, "title": "Pozitif Test", "description": "Bir cümle yazın: \"Bu dondurma dünyanın en güzel tatlısı!\" Yapay zekanın cevabı: Pozitif / Mutlu olmalı."},
    {"step": 3, "title": "Negatif Test", "description": "Başka bir cümle deneyin: \"Siparişim çok geç geldi ve soğuktu. Berbat bir hizmet.\" Yapay zekanın cevabı: Negatif / Kızgın olmalı."},
    {"step": 4, "title": "Zor Test: İroni/Sarkazm", "description": "İşte yapay zekanın en çok zorlandığı yer! Cümle: \"Harika! Telefonumu yere düşürüp kırdım, tam da ihtiyacım olan şeydi.\" Soru: \"Burada ''Harika'' dedin ama aslında üzgünsün. Bakalım yapay zeka anlayacak mı?\""},
    {"step": 5, "title": "Sonucu İnceleyin", "description": "Eski yapay zekalar \"Harika\" kelimesini görünce \"Pozitif\" derdi. Yeni modeller (ChatGPT-4 gibi) bunun \"Sarkazm (İğneleme)\" olduğunu anlayabilir. Sonucu birlikte inceleyin."},
    {"step": 6, "title": "Gerçek Hayat Bağlantısı", "description": "\"Büyük şirketler (Trendyol, Yemeksepeti gibi) binlerce yorumu tek tek okuyamaz. İşte bu yapay zekayı kullanırlar. YZ onlara ''Bugün müşterilerin %80''i kızgın'' raporu verir.\""}
  ]'::jsonb,
  '[
    {"title": "Duygusal Farkındalık", "description": "Kelimelerin ötesindeki duyguyu (alaycılık, hayal kırıklığı) metne dökebilmesi."},
    {"title": "Teknoloji Kullanımı", "description": "Şirketlerin müşteri memnuniyetini nasıl ölçtüğüne dair bir içgörü kazanması."}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "ChatGPT veya MonkeyLearn web sitesi (monkeylearn.com/sentiment-analysis-online/)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Deyimler ve Mecazlar (Chatbot'u Şaşırt)
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
  'Deyimler ve Mecazlar: Chatbot''u Şaşırt!',
  'Yapay zeka deyimleri gerçek anlamıyla mı yoksa mecaz anlamıyla mı anlıyor? Türkçe deyimlerle chatbot''u test et ve kültürel zekanın önemini keşfet!',
  'game',
  25,
  10,
  11,
  'ChatGPT, Gemini veya Copilot kullanarak Türkçe deyimleri test edin ve yapay zekanın mecaz anlam ile gerçek anlam arasındaki farkı anlayıp anlamadığını keşfedin.',
  ARRAY['ChatGPT, Gemini veya Copilot', 'Türkçe deyimler listesi (isteğe bağlı)'],
  20,
  4,
  2,
  'Yapay zeka deyimleri anladı mı? Kültürü öğrenmek neden matematikten daha zor?',
  'Yapay zekanın kelimeleri "gerçek anlamıyla" mı yoksa "mecaz anlamıyla" mı anladığını test etmek. (Literal vs. Figurative)',
  'Dil Bilgisi ve Mantık',
  '[
    {"step": 1, "title": "Meydan Okuma", "description": "\"Yapay zeka çok zeki ama bazen deyimleri anlamayıp saçmalayabiliyor. Hadi onu deneyelim.\""},
    {"step": 2, "title": "Deyim Testi 1: Görselleştirme", "description": "Eğer görsel oluşturma aracınız varsa (Canva AI, Bing Image Creator) şunu deneyin: \"Etekleri zil çalan bir kadın çiz.\" Sonuç: Yapay zeka muhtemelen eteğinde gerçek ziller asılı olan bir kadın çizecektir. Ders: \"Gördün mü? O kelime kelime anlıyor (Literal). Ama biz Türkçede bunu ''çok sevinmek'' anlamında kullanırız.\""},
    {"step": 3, "title": "Deyim Testi 2: Çeviri", "description": "Chatbot''a sorun: \"Şu cümlenin İngilizcesi nedir: ''Bu işi yaparken kılı kırk yardım''.\" İnceleme: Bakalım \"Splitting hairs\" (doğru deyim) mi diyecek, yoksa \"Cutting the hair forty times\" (saçma çeviri) mi diyecek?"},
    {"step": 4, "title": "Uydurma Deyim Testi", "description": "Gelişmiş modeller doğruyu bilir ama çocuğu şaşırtmak için uydurma bir deyim sorabilirsiniz: \"Damdaki saksağan vur beline kazmayı ne demek?\" Yapay zekanın ne cevap vereceğini izleyin."},
    {"step": 5, "title": "Farklı Deyimler Deneyin", "description": "Daha fazla deyim test edin: \"Armut piş ağzıma düş\", \"Balık kavağa çıkınca\", \"Hem nalına hem mıhına\". Hangileri doğru anlaşıldı?"},
    {"step": 6, "title": "Kültürel Zeka Dersi", "description": "\"Yapay zeka dilleri matematik gibi öğrenir. Ama deyimler, o ülkenin kültürüdür. Kültürü öğrenmek matematikten daha zordur.\""}
  ]'::jsonb,
  '[
    {"title": "Dil Bilgisi", "description": "Mecaz anlam ile gerçek anlam arasındaki farkı ayırt edebilmesi."},
    {"title": "Sorgulama", "description": "Yapay zekanın çeviri yaparken kültürel hatalar yapabileceğini fark etmesi."}
  ]'::jsonb,
  '[
    {"item": "ChatGPT, Gemini veya Copilot (herhangi bir chatbot)", "optional": false},
    {"item": "Türkçe deyimler listesi (isteğe bağlı)", "optional": true}
  ]'::jsonb
);
