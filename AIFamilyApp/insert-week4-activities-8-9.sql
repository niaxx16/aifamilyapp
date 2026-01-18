-- Hafta 4 Etkinlikleri: Yapay Zeka ve Okyanuslar (8-9 yaş grubu)

-- Etkinlik 1: Balık mı, Çöp mü? (Sınıflandırma ve Eğitim)
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
  'Balık mı, Çöp mü? (Sınıflandırma ve Eğitim)',
  'Küçük bir robota okyanusu temizlemeyi öğretin! Ona balık ve çöp arasındaki farkı göstererek yapay zeka eğitimini deneyimleyin.',
  'exploration',
  25,
  8,
  9,
  'Code.org AI for Oceans etkinliğinde robota balık ve çöp arasındaki farkı öğreterek okyanusu temizlemesini sağlayın.',
  ARRAY['Bilgisayar veya tablet', 'İnternet bağlantısı (Code.org sitesi)'],
  20,
  4,
  1,
  'Robota kaç tane örnek gösterdin? Az örnek gösterseydin robot aynı başarıyla çalışır mıydı? Robotun başarısı neye bağlı?',
  'Bir yapay zeka modelini eğitmek için ona çok sayıda örnek (veri) göstermemiz gerektiğini uygulamalı olarak öğrenmek.',
  'Dijital Eğitim Simülasyonu',
  '[
    {"step": 1, "title": "Hikayeyi Başlatın", "description": "Code.org''daki etkinliği açın (studio.code.org/s/oceans). Ekranda \"A.I.\" adında küçük sevimli bir robot göreceksiniz. \"Bu robot okyanusları temizlemek istiyor ama neyin balık neyin çöp olduğunu bilmiyor. Ona sen öğretmenlik yapacaksın!\""},
    {"step": 2, "title": "İlk Aşamayı Başlatın", "description": "\"Devam\" butonuna basarak ilk seviyeye gelin. Ekrana bir nesne gelecek. İki buton var: \"Balık\" ve \"Balık Değil (Çöp)\"."},
    {"step": 3, "title": "Öğretmeye Başlayın", "description": "Ekrana bir balık geldiğinde çocuğunuz \"Balık\" butonuna bassın. Ekrana bir şişe veya lastik geldiğinde \"Balık Değil\" butonuna bassın. Bu işlemi yaparken robotun tepesindeki barın dolduğunu gösterin. \"Bak, her tıkladığında robotun beynine yeni bir bilgi gidiyor.\""},
    {"step": 4, "title": "Devam Edin", "description": "Sistem \"Yeterli\" diyene kadar (yaklaşık 10-15 tane) nesneyi sınıflandırın. Ne kadar çok yaparsa robot o kadar iyi öğrenir."},
    {"step": 5, "title": "Test Edin", "description": "\"Devam\" diyerek robotun kendi kendine çalışmasını izleyin. Robot okyanusa dalacak ve öğrendiklerine göre çöpleri toplamaya başlayacak."},
    {"step": 6, "title": "Kutlama", "description": "\"Harika! Senin öğrettiklerin sayesinde çöpleri ayırabiliyor. Robot doğuştan bunu bilmiyordu, SEN ona öğrettin!\""}
  ]'::jsonb,
  '[
    {"title": "Kategorizasyon", "description": "Ekrana gelen nesnenin canlı mı yoksa atık mı olduğunu hızlıca ayırt edebiliyor mu?"},
    {"title": "Sorumluluk", "description": "Robotun başarısının, kendi verdiği eğitimle doğrudan ilgili olduğunu kavrıyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "İnternet bağlantısı (Code.org sitesi açılacak)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Yapay Zeka Yanılıyor (Önyargı/Bias Deneyi)
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
  'Yapay Zeka Yanılıyor (Önyargı/Bias Deneyi)',
  'Robota eksik bilgi verince ne olur? "Önyargı" kavramını keşfedin ve yapay zekanın neden hata yapabileceğini anlayın!',
  'game',
  25,
  8,
  9,
  'Code.org etkinliğinde robota kasıtlı olarak eksik veya yanlış bilgi vererek önyargının nasıl oluştuğunu gözlemleyin.',
  ARRAY['Bilgisayar veya tablet', 'Code.org AI for Oceans etkinliği'],
  20,
  4,
  2,
  'Robot yeşil balıkları neden çöpe attı? Robot kötü niyetli miydi yoksa biz mi ona eksik öğrettik? Bu duruma ne diyoruz?',
  '"Önyargı" (Bias) kavramını öğrenmek. Eğer robota sadece belirli özellikteki balıkları öğretirsek, diğer balıkları tanıyamayacağını görmek.',
  'Kasıtlı Hata Yapma ve Gözlem',
  '[
    {"step": 1, "title": "Deney Zamanı", "description": "Çocuğunuza şunu teklif edin: \"Gel robotu biraz şaşırtalım ve ona eksik bilgi verelim. Bakalım ne olacak?\""},
    {"step": 2, "title": "Eksik Öğretim", "description": "Eğitim ekranına geri dönün. Çocuğunuzdan SADECE KIRMIZI (veya sadece yuvarlak) balıklara \"Balık\" demesini isteyin. Ekrana YEŞİL (veya uzun) bir balık geldiğinde, o bir balık olmasına rağmen onu atlayın veya yanlışlıkla \"Çöp\" deyin."},
    {"step": 3, "title": "Sonucu İzleyin", "description": "Robotu çalıştırın. Robot okyanusa daldığında ne yapıyor? Muhtemelen kırmızı balıkları kurtarıyor ama yeşil balıkları çöp sanıp atıyor!"},
    {"step": 4, "title": "Kritik Tartışma", "description": "Robot hata yaptığında çocuğunuza sorun: \"Robot neden yeşil balıkları çöpe attı? Robot kötü niyetli mi?\""},
    {"step": 5, "title": "Önyargı Kavramı", "description": "Açıklayın: \"Hayır. Robot sadece bizim öğrettiğimizi yaptı. Biz ona ''Sadece kırmızılar balıktır'' gibi davrandık. Yeşil balıkları hiç görmediği için onları çöp sandı. Buna ''Önyargı'' diyoruz. Eksik bilgi verirsek, yapay zeka hata yapar.\""},
    {"step": 6, "title": "Düzeltme", "description": "\"Şimdi geri dönüp yeşil balıkları da öğretelim mi? Böylece robot adaletli davransın!\""}
  ]'::jsonb,
  '[
    {"title": "Neden-Sonuç İlişkisi", "description": "Hatanın robottan değil, \"eğitim verisinden\" kaynaklandığını anlayabiliyor mu?"},
    {"title": "Adalet Duygusu", "description": "Yeşil balıkların haksız yere atılmasından rahatsızlık duyup düzeltmek istiyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "Code.org AI for Oceans etkinliği (önceki etkinlikten devam)", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Okyanusu Temizle (Gri Alanlar)
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
  'Okyanusu Temizle (Gri Alanlar)',
  'Balina balık mıdır? Her şey siyah-beyaz değildir! Yapay zekanın kararsız kaldığı durumları keşfedin ve etik kararlar verin.',
  'conversation',
  25,
  8,
  9,
  'Code.org etkinliğinin son aşamalarında yeni deniz canlılarıyla karşılaşarak zor kararlar verin ve robota doğru sınıflandırmayı öğretin.',
  ARRAY['Bilgisayar veya tablet', 'Code.org AI for Oceans etkinliği (son aşamalar)'],
  20,
  4,
  2,
  'Balina bir balık değil ama onu çöpe atmalı mıydık? Yapay zekaya kelimeleri mi yoksa asıl amacımızı mı öğretmeliyiz?',
  'Gerçek hayatta her şeyin siyah-beyaz (balık veya çöp) olmadığını, yapay zekanın "kararsız" kalabileceği durumları yönetmeyi öğrenmek.',
  'Etik ve Karar Verme',
  '[
    {"step": 1, "title": "Yeni Canlılar", "description": "Etkinlik ilerledikçe ekrana Balina, Ahtapot veya Deniz Yıldızı gelecek. Bunlar standart \"balık\" tanımına uymuyor."},
    {"step": 2, "title": "Zor Karar", "description": "Çocuğunuza sorun: \"Balina bir balık mı? Teknik olarak balina bir memelidir, balık değildir. Ama görevimiz ''Okyanusu Temizlemek''. Balina çöplerle birlikte atılmalı mı? Yoksa suda mı kalmalı?\""},
    {"step": 3, "title": "Etik Karar", "description": "\"Suda kalmalı\" kararı verirse, onları da \"Balık\" kategorisine (veya Code.org''da ''Suya Ait'' kategorisine) eklemesi gerektiğini anlatın."},
    {"step": 4, "title": "Amacı Anlat", "description": "\"Bak, yapay zeka bazen kelimelere takılabilir. Bizim ona asıl amacımızı (denizde yaşaması gerekenler) doğru anlatmamız lazım. ''Balık'' değil, ''Deniz Canlısı'' diye düşünmeliyiz.\""},
    {"step": 5, "title": "Final Temizliği", "description": "Tüm deniz canlılarını (ahtapotlar, balinalar dahil) doğru şekilde etiketleyip robotu son kez çalıştırın."},
    {"step": 6, "title": "Kutlama", "description": "Robotun okyanusu tertemiz yapmasını ve tüm canlıların mutlu yüzmesini izleyerek etkinliği kutlayın. \"Senin sayende robot, farklılıkları öğrendi ve okyanusu kurtardı!\""}
  ]'::jsonb,
  '[
    {"title": "Esnek Düşünme", "description": "\"Balık\" kategorisini \"Denizde yaşayan canlılar\" olarak genişletebiliyor mu?"},
    {"title": "Problem Çözme", "description": "Karşılaştığı yeni bir durumu (balina), mevcut kurallara göre nasıl sınıflandıracağına karar verebiliyor mu?"}
  ]'::jsonb,
  '[
    {"item": "Bilgisayar veya tablet", "optional": false},
    {"item": "Code.org AI for Oceans etkinliği (son aşamalar)", "optional": false}
  ]'::jsonb
);
