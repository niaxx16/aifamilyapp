-- Hafta 8 Etkinlikleri: Yapay Zeka ve Oyun (6-7 yaş grubu)

-- Etkinlik 1: Akıllı Rakip (XOX Mücadelesi)
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
  'Akıllı Rakip (XOX Mücadelesi)',
  'Bilgisayara karşı XOX oynayarak yapay zekanın nasıl strateji kurduğunu ve kazanmak için "karar verdiğini" keşfedin!',
  'game',
  15,
  6,
  7,
  'Google''a "XOX oyna" yazarak bilgisayara karşı oynayın ve yapay zekanın hamlelerini gözlemleyin.',
  ARRAY['Tablet, telefon veya bilgisayar', 'Google XOX oyunu veya kağıt kalem'],
  15,
  8,
  2,
  'Bilgisayar seni nasıl engelledi? Sence rastgele mi oynuyor yoksa bir planı mı var?',
  'Bilgisayara karşı basit bir oyun oynayarak, yapay zekanın rastgele hamleler yapmadığını, kazanmak veya rakibi engellemek için "karar verdiğini" göstermek.',
  'Dijital Oyun ve Gözlem',
  '[
    {"step": 1, "title": "Rakibi Tanıtın", "description": "\"Bugün seninle XOX oynayacağız ama rakibin ben değilim. Rakibin bu tabletin içindeki yapay zeka! Bakalım onu yenebilecek misin?\""},
    {"step": 2, "title": "İlk Tur (Gözlem)", "description": "Oyunu \"Orta\" veya \"Zor\" seviyeye ayarlayın. Çocuğunuzun oynamasına izin verin. Bilgisayarın hamlesini sesli yorumlayın: \"Aaa! Gördün mü? Senin kazanacağını anladı ve yolunu kesti! Seni engelledi.\""},
    {"step": 3, "title": "Nedenini Sorun", "description": "\"Sence bilgisayar neden O işaretini tam oraya koydu? Başka yere de koyabilirdi.\" Çocuğun, bilgisayarın bir amacı (kazanmak veya engellemek) olduğunu fark etmesini sağlayın."},
    {"step": 4, "title": "Taktik Denemesi", "description": "\"Hadi şimdi onu kandırmaya çalışalım.\" diyerek farklı bir strateji deneyin. Bilgisayarın bu yeni duruma nasıl tepki verdiğini izleyin."},
    {"step": 5, "title": "Yapay Zekaya Bağlayın", "description": "Oyun sonunda açıklayın: \"Bu bilgisayarın gözleri yok ama senin nereye hamle yaptığını biliyor. İçindeki program, ''Eğer buraya koyarsa, ben de şuraya koymalıyım yoksa kaybederim'' diye hesap yapıyor. İşte oyunlardaki yapay zeka böyle çalışır; kuralları bilir ve kazanmak için en iyi hamleyi hesaplar.\""}
  ]'::jsonb,
  '[
    {"title": "Stratejik Düşünme", "description": "Rakibin (bilgisayarın) hamlesine göre kendi hamlesini planlama."},
    {"title": "Dikkat", "description": "Bilgisayarın yaptığı \"engelleme\" hamlesini fark etme."},
    {"title": "Neden-Sonuç İlişkisi", "description": "\"Ben buraya koyduğum için o da buraya koydu\" mantığını kurma."},
    {"title": "Duygu Yönetimi", "description": "Bilgisayara yenilirse hayal kırıklığıyla baş etme ve \"Nasıl yenebilirim?\" diye tekrar deneme isteği."}
  ]'::jsonb,
  '[
    {"item": "Tablet, telefon veya bilgisayar", "optional": false},
    {"item": "Google''a \"XOX oyna\" yazarak açılan oyun veya kağıt kalem", "optional": false}
  ]'::jsonb
);

-- Etkinlik 2: Kendi Oyunumuzu Tasarlıyoruz
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
  'Kendi Oyunumuzu Tasarlıyoruz',
  'Oyun tasarımcısı olun! Kendi kurallarınızla bir masa oyunu oluşturarak bilgisayar oyunlarının arkasındaki mantığı keşfedin.',
  'creative',
  30,
  6,
  7,
  'Karton üzerine oyun yolu çizin, kurallar belirleyin ve kendi oyununuzu oynayın.',
  ARRAY['Büyük karton veya resim kağıdı', 'Renkli kalemler, cetvel', 'Piyon için küçük oyuncaklar', 'Zar'],
  20,
  8,
  2,
  'Kendi koyduğun kurallara uymak nasıl hissettirdi? Bilgisayar oyunları da böyle mi çalışıyor?',
  'Bir oyunun "kurallarını" (algoritmasını) sıfırdan oluşturarak, bilgisayar oyunlarının arkasındaki mantıksal yapıyı anlamak. "Kurallar olmazsa oyun (ve yapay zeka) çalışmaz."',
  'Tasarım ve Mantık Kurma (Algoritmik Düşünme)',
  '[
    {"step": 1, "title": "Tasarımcı Rolü", "description": "\"Bugün oyun oynamıyoruz, oyun yapıyoruz! Sen bir oyun tasarımcısısın. Bilgisayar oyunlarını yapan mühendisler gibi kendi oyunumuzu çizeceğiz.\""},
    {"step": 2, "title": "Yolu Çizin", "description": "Kartona \"Başlangıç\" ve \"Bitiş\" noktası olan kıvrımlı bir yol çizin. Yolu kutucuklara bölün."},
    {"step": 3, "title": "Kuralları (Algoritmayı) Belirleyin", "description": "Çocuğunuza \"Bu oyunun kuralları ne olsun?\" diye sorun ve \"Eğer... O zaman...\" kalıbını kullanarak özel kutucuklar boyayın: Kırmızı = 2 adım geri git (Ceza), Yeşil = bir daha zar at (Ödül), Mavi = 1 tur bekle."},
    {"step": 4, "title": "Oyunu Test Edin", "description": "Kuralları belirledikten sonra oyunu birlikte oynayın. Kurallara harfiyen uyun. \"Aaa kırmızıya geldin, kural neydi? Geri gitmen lazım!\""},
    {"step": 5, "title": "Yapay Zekaya Bağlayın", "description": "\"İşte bilgisayar oyunları da tam olarak böyle yapılır. Bilgisayarın içinde görünmez bir kağıtta bu kurallar yazar. Yapay zeka, ''Kırmızıya bastı, onu geri göndermeliyim'' der. Kuralları insanlar yazar, bilgisayarlar uygular.\""}
  ]'::jsonb,
  '[
    {"title": "Kural Oluşturma", "description": "Mantıklı ve uygulanabilir oyun kuralları üretme."},
    {"title": "Sıralı Düşünme", "description": "Oyunun akışını (başla, ilerle, engelle karşılaş, bitir) kurgulama."},
    {"title": "Kurallara Uyma", "description": "Kendi koyduğu kurallara oyun sırasında sadık kalma (özdenetim)."},
    {"title": "Yaratıcılık", "description": "Oyun tahtasını ve hikayesini (örneğin \"Uzay Yolu\" veya \"Orman Macerası\") görselleştirme."}
  ]'::jsonb,
  '[
    {"item": "Büyük bir karton veya resim kağıdı", "optional": false},
    {"item": "Renkli kalemler, cetvel", "optional": false},
    {"item": "Piyon olarak kullanmak için küçük oyuncaklar (lego adamı, düğme vb.)", "optional": false},
    {"item": "Zar", "optional": false}
  ]'::jsonb
);

-- Etkinlik 3: Fiziksel Kodlama Oyunu (Robot Oluyoruz)
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
  'Fiziksel Kodlama Oyunu (Robot Oluyoruz)',
  'Robot olun ve hedefe ulaşmak için kendi programınızı yazın! Kodlamanın temelini fiziksel olarak deneyimleyin.',
  'game',
  25,
  6,
  7,
  'Yerde ızgara oluşturun, yön kartlarıyla programı planlayın ve robot gibi hareket edin.',
  ARRAY['Yere yapıştırmak için kağıt bant', 'Yön okları çizilmiş kartlar (İleri, Geri, Sağ, Sol)', 'Hedef nesne (oyuncak)', 'Engeller (yastıklar)'],
  20,
  8,
  2,
  'Programında hata yaptığında nasıl düzelttin? Gerçek robotlar da böyle mi çalışıyor?',
  'Kodlamanın temeli olan "sıralı komut verme" mantığını fiziksel olarak deneyimlemek. Bir hedefe ulaşmak için gereken adımları önceden planlamak.',
  'Fiziksel Aktivite ve Temel Kodlama',
  '[
    {"step": 1, "title": "Sahneyi Hazırlayın", "description": "Odanın zeminine bantlarla 4x4 veya 5x5''lik bir ızgara (kareli alan) yapın. Bir kareye \"Robot\"u (çocuğu), başka bir kareye \"Hedefi\" (oyuncağı), aradaki bazı karelere de \"Engelleri\" (yastıkları) koyun."},
    {"step": 2, "title": "Görevi Tanımlayın", "description": "\"Sen bir robotsun ve pilin bitmek üzere! En kısa yoldan şarj istasyonuna (oyuncağa) ulaşman lazım ama yastıklara çarparsan bozulursun.\""},
    {"step": 3, "title": "Kodlama Aşaması", "description": "Çocuğunuz hemen yürümeye başlamasın! Önce elindeki ok kartlarını yere, ızgaranın dışına sırayla dizsin. \"Önce iki adım ileri, sonra bir adım sağa...\" gibi planı önceden yapmalı. Buna \"Program yazmak\" diyoruz."},
    {"step": 4, "title": "Programı Çalıştırın", "description": "Okları dizdikten sonra, çocuk sadece o okların sırasına göre hareket etsin. \"1. Kart: İleri git. 2. Kart: İleri git. 3. Kart: Sağa dön.\""},
    {"step": 5, "title": "Hata Ayıklama (Debugging)", "description": "Eğer yanlış bir kart koyduysa ve yastığa çarptıysa kızmayın. \"Hata! Programda bir yanlışlık var. Hadi kartlara dönüp hatayı bulalım ve düzeltelim.\" deyin."},
    {"step": 6, "title": "Yapay Zekaya Bağlayın", "description": "\"Robotlar ve yapay zeka kendi kendine hareket etmez. Mühendisler onlara gidecekleri yolu adım adım böyle kodlarlar. Sen de şimdi kendi beynini kodladın ve hedefe ulaştın!\""}
  ]'::jsonb,
  '[
    {"title": "Uzamsal Algı", "description": "Sağ, sol, ileri, geri kavramlarını doğru kullanma ve zihninde canlandırma."},
    {"title": "Planlama", "description": "Harekete geçmeden önce zihninde rotayı oluşturma yeteneği."},
    {"title": "Hata Analizi", "description": "Hedefe ulaşamadığında nerede yanlış yaptığını bulup düzeltme (Debugging) becerisi."},
    {"title": "Sıralama", "description": "Adımların sırasının (önce dönüp sonra mı gideceğim, gidip mi döneceğim?) önemini kavrama."}
  ]'::jsonb,
  '[
    {"item": "Yere yapıştırmak için kağıt bant (veya kare yer karoları)", "optional": false},
    {"item": "Kağıtlara çizilmiş yön okları (İleri, Geri, Sağ, Sol)", "optional": false},
    {"item": "Bir hedef nesne (örneğin bir kurabiye veya sevdiği oyuncak)", "optional": false},
    {"item": "Engeller (yastıklar, sandalyeler)", "optional": false}
  ]'::jsonb
);
