-- 33 Ders Başlığını Tek Komutla Ekle

INSERT INTO lessons (
  title,
  description,
  category,
  subcategory,
  difficulty,
  order_number,
  duration,
  content,
  content_type
) VALUES
-- 🟢 1. TEMEL BİLGİ: "Yapay zekâyı anlamak" (9 modül)
('Yapay Zekâ Nedir?', 'AI''nin temel kavramlarını ve günlük hayattaki yerini keşfedin', 'ai_basics', 'temel_bilgi', 1, 1, 5, 'Yapay zeka temel kavramlar', 'interactive'),
('Robotlar ve AI Farkı', 'Robot ile yapay zeka arasındaki farkı öğrenin', 'ai_basics', 'temel_bilgi', 1, 2, 5, 'Robot ve AI farkları', 'interactive'),
('AI Nerede Yaşıyor?', 'Günlük hayatta AI''yı nerede bulabileceğinizi keşfedin', 'ai_basics', 'temel_bilgi', 1, 3, 5, 'AI örnekleri', 'interactive'),
('AI''ın Süper Gücü: Veri', 'AI''nın veriyle nasıl öğrendiğini anlayın', 'ai_basics', 'temel_bilgi', 1, 4, 6, 'Veri ve öğrenme', 'interactive'),
('Algoritma: AI''ın Tarif Defteri', 'Algoritmaların AI''da nasıl çalıştığını öğrenin', 'ai_basics', 'temel_bilgi', 2, 5, 6, 'Algoritma kavramı', 'interactive'),
('AI Hata Yapabilir', 'Yapay zekanın neden hata yaptığını anlayın', 'ai_basics', 'temel_bilgi', 1, 6, 5, 'AI hataları', 'interactive'),
('AI''ın Duyguları Var mı?', 'Yapay zekanın duygusal zekası hakkında bilgi edinin', 'ai_basics', 'temel_bilgi', 2, 7, 5, 'AI ve duygular', 'interactive'),
('AI ile Sohbet Etmek', 'Chatbot''larla nasıl etkileşim kuracağınızı öğrenin', 'ai_basics', 'temel_bilgi', 1, 8, 5, 'Chatbot kullanımı', 'interactive'),
('AI''ya Karşı Eleştirel Düşünmek', 'AI sonuçlarını nasıl sorgulayacağınızı öğrenin', 'ai_basics', 'temel_bilgi', 2, 9, 6, 'Eleştirel bakış', 'interactive'),

-- 🔵 2. GÜNLÜK HAYATTA AI: "Kullanırken farkında olmak" (6 modül)
('AI ve Oyunlar', 'Oyunlarda AI''nın nasıl kullanıldığını keşfedin', 'parenting_ai', 'gunluk_hayat', 1, 10, 5, 'Oyunlarda AI', 'interactive'),
('Öneri Sistemleri Nasıl Çalışır?', 'YouTube, Netflix gibi platformların öneri mekanizmalarını anlayın', 'parenting_ai', 'gunluk_hayat', 2, 11, 6, 'Öneri algoritmaları', 'interactive'),
('Komut Vermek Önemlidir', 'AI''ya doğru komut vermenin önemini öğrenin', 'parenting_ai', 'gunluk_hayat', 1, 12, 5, 'Prompt engineering', 'interactive'),
('"Gerçek Değil"i Anlamak', 'AI''nın ürettiği içeriklerin gerçekliğini sorgulama', 'parenting_ai', 'gunluk_hayat', 2, 13, 6, 'Gerçeklik algısı', 'interactive'),
('Doğru Bilgiyi Bulmak', 'AI kaynaklı bilgileri doğrulama yöntemleri', 'parenting_ai', 'gunluk_hayat', 2, 14, 6, 'Bilgi doğrulama', 'interactive'),
('AI ile Duygusal Etkileşim', 'AI''nın duygusal taklidini anlama', 'parenting_ai', 'gunluk_hayat', 2, 15, 5, 'Duygusal AI', 'interactive'),

-- 🟡 3. GÜVENLİK VE GİZLİLİK: "Kendini korumayı öğrenmek" (7 modül)
('Mahremiyetin İlk Adımı', 'Dijital mahremiyet temellerini öğrenin', 'ethics_safety', 'guvenlik', 1, 16, 5, 'Mahremiyet temelleri', 'interactive'),
('Kişisel Veri Nedir?', 'Hangi bilgilerin kişisel veri olduğunu anlayın', 'ethics_safety', 'guvenlik', 1, 17, 5, 'Kişisel veri', 'interactive'),
('Veri Gizliliği ve Şirketler', 'Şirketlerin veriyi nasıl kullandığını öğrenin', 'ethics_safety', 'guvenlik', 2, 18, 6, 'Veri kullanımı', 'interactive'),
('Dijital Ayak İzi', 'İnternette bıraktığınız izleri anlayın', 'ethics_safety', 'guvenlik', 2, 19, 6, 'Dijital iz', 'interactive'),
('"Deepfake" ve Gerçeklik', 'Deepfake teknolojisini ve risklerini öğrenin', 'ethics_safety', 'guvenlik', 3, 20, 7, 'Deepfake', 'interactive'),
('Algoritma ve Filtre Balonları', 'Filtre balonu etkisini anlayın', 'ethics_safety', 'guvenlik', 3, 21, 6, 'Filtre balonları', 'interactive'),
('Aile İçi AI Kuralları', 'Evde AI kullanım kuralları oluşturun', 'ethics_safety', 'guvenlik', 1, 22, 5, 'AI kuralları', 'interactive'),

-- 🟠 4. ELEŞTİREL DÜŞÜNME VE ETİK: "Değerleri korumak" (5 modül)
('AI Neden Hata Yapar?', 'Yapay zeka hatalarının nedenlerini anlayın', 'ethics_safety', 'etik', 2, 23, 6, 'AI hata analizi', 'interactive'),
('Önyargı: AI''ın Kör Noktası', 'AI''daki önyargıları keşfedin', 'ethics_safety', 'etik', 3, 24, 7, 'AI önyargıları', 'interactive'),
('Adil Olmak', 'AI''da adalet ve eşitlik kavramlarını öğrenin', 'ethics_safety', 'etik', 2, 25, 6, 'AI ve adalet', 'interactive'),
('Etik İkilemler', 'AI kullanımında etik zorlukları tartışın', 'ethics_safety', 'etik', 3, 26, 7, 'Etik problemler', 'interactive'),
('Telif Hakkı ve Yaratıcılık', 'AI ve telif hakları konusunu anlayın', 'ethics_safety', 'etik', 2, 27, 6, 'Telif ve AI', 'interactive'),

-- 🔴 5. UYGULAMA VE GELECEK: "Sorumlu ve yaratıcı kullanıcı olmak" (6 modül)
('Ödevlerde AI Kullanımı', 'AI''yı eğitimde sorumlu kullanmayı öğrenin', 'parenting_ai', 'gelecek', 2, 28, 6, 'Eğitimde AI', 'interactive'),
('AI ve Yaratıcılık', 'AI ile yaratıcı projeleri keşfedin', 'parenting_ai', 'gelecek', 2, 29, 6, 'Yaratıcı AI', 'interactive'),
('Büyük Dil Modelleri (ChatGPT)', 'ChatGPT gibi modelleri anlayın', 'parenting_ai', 'gelecek', 2, 30, 7, 'Dil modelleri', 'interactive'),
('Dijital Vatandaşlık ve AI', 'Dijital dünyada sorumlu davranış', 'parenting_ai', 'gelecek', 2, 31, 6, 'Dijital vatandaşlık', 'interactive'),
('Sorumlu Kullanıcı Olmak', 'AI''yı etik şekilde kullanma prensipleri', 'parenting_ai', 'gelecek', 2, 32, 6, 'Sorumlu kullanım', 'interactive'),
('AI''ın Gelecekteki Rolü', 'Yapay zekanın geleceğini öngörün', 'parenting_ai', 'gelecek', 3, 33, 7, 'AI geleceği', 'interactive');
