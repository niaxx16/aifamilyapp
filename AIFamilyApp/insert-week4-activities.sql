-- Hafta 4 Etkinlikleri: Makineler Nasıl Öğrenir? (6-7 yaş grubu)

-- Etkinlik 1: Sıcak-Soğuk Oyunu
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
  reflection_question
) VALUES (
  'Sıcak-Soğuk Oyunu',
  'Yapay zekanın pekiştirmeli öğrenme yöntemini fiziksel bir oyunla deneyimleyin. Çocuğunuz geri bildirimlerle (sıcak/soğuk) hedefe ulaşmayı öğrenecek.',
  'game',
  20,
  6,
  7,
  'Çocuğunuz odadan çıktıktan sonra bir nesne saklayın. Çocuk aramaya başladığında yaklaştıkça "sıcak", uzaklaştıkça "soğuk" diyerek geri bildirim verin. Tıpkı yapay zekanın pekiştirmeli öğrenme ile öğrendiği gibi!',
  ARRAY['Saklamak için çocuğun sevdiği küçük bir oyuncak veya herhangi bir nesne'],
  15,
  4,
  1,
  'Yapay zeka da "sıcak-soğuk" gibi geri bildirimlerle öğreniyor. Başka hangi oyunlarda puanlarla veya ödüllerle öğrenebiliriz?'
);

-- Etkinlik 2: Hayvanları Tahmin Et
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
  reflection_question
) VALUES (
  'Hayvanları Tahmin Et',
  'Yapay zekanın gözetimli öğrenme yöntemini canlandırın. Çocuğunuz "eğitim verisi" ile öğrenip yeni hayvanları tahmin edecek.',
  'conversation',
  15,
  6,
  7,
  'Çocuğunuza 3-4 hayvanı tanıtarak "eğitin". Her hayvanın özelliklerini söyleyin. Sonra daha önce göstermediğiniz bir hayvanı gösterip tahmin etmesini isteyin. Tıpkı yapay zekanın etiketli verilerle öğrendiği gibi!',
  ARRAY['Üzerinde farklı hayvan resimleri olan kartlar, çıkartmalar veya hayvan oyuncakları (3-4 tanesi eğitim, 1-2 tanesi test için)'],
  15,
  4,
  1,
  'Yapay zeka da binlerce örnek görerek öğreniyor. Sence bir yapay zekaya kedileri öğretmek için kaç kedi fotoğrafı gerekir?'
);

-- Etkinlik 3: Resim Tamamlama
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
  reflection_question
) VALUES (
  'Resim Tamamlama',
  'Yapay zekanın tahmin yürütme yeteneğini yaratıcı bir şekilde deneyimleyin. Çocuğunuz yarım resimleri tamamlayarak eksik bilgileri tahmin edecek.',
  'creative',
  20,
  6,
  7,
  'Önceden yarım bırakılmış basit resimler çizin (yarım güneş, tekerleksiz araba, çatısız ev). Çocuğunuzun bunları tahmin edip tamamlamasını isteyin. Sonra nasıl tahmin ettiğini sorun - tıpkı yapay zekanın önceki deneyimlerinden öğrendiği gibi!',
  ARRAY['Kağıt, boya kalemleri', 'Ebeveyn tarafından önceden çizilmiş yarım bırakılmış basit resimler'],
  15,
  4,
  1,
  'Senin beynin daha önce gördüğü şeyleri hatırlayarak eksik parçaları tamamladı. Yapay zeka da milyonlarca resme bakarak aynısını yapıyor!'
);
