-- İlk dersin bilgi kartlarını temel AI kavramlarıyla güncelle
-- 12 adet flip card - Yapay Zeka'nın temel kavramları

UPDATE lessons
SET module_content = jsonb_set(
  module_content,
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Yapay Zeka tam olarak ne demektir?',
      'answer', 'Bilgisayarların ve makinelerin insan gibi düşünmesi, öğrenmesi ve problem çözmesi'
    ),
    jsonb_build_object(
      'question', 'Algoritma nedir ve yapay zeka ile nasıl ilişkilidir?',
      'answer', 'Bilgisayara verilen adım adım talimatlar. AI algoritmalarla çalışır'
    ),
    jsonb_build_object(
      'question', 'Makine öğrenimi (Machine Learning) ne anlama gelir?',
      'answer', 'Bilgisayarların deneyimlerden öğrenerek kendini geliştirmesi'
    ),
    jsonb_build_object(
      'question', 'Yapay zeka hangi şeyleri yapabilir?',
      'answer', 'Örüntü bulma, tahmin yapma, sınıflandırma, karar verme'
    ),
    jsonb_build_object(
      'question', 'Yapay zeka hangi şeyleri yapamaz?',
      'answer', 'Duygu hissetme, yaratıcı düşünme, sezgi kullanma, ahlaki karar verme'
    ),
    jsonb_build_object(
      'question', 'Veri nedir ve yapay zeka için neden önemlidir?',
      'answer', 'Bilgi ve örnekler. AI verilerden öğrenir, veri olmadan çalışamaz'
    ),
    jsonb_build_object(
      'question', 'Yapay zeka nasıl öğrenir?',
      'answer', 'Binlerce örnek veri inceleyerek kalıplar ve kurallar bularak'
    ),
    jsonb_build_object(
      'question', 'İnsan zekası ile yapay zeka arasındaki temel fark nedir?',
      'answer', 'İnsan yaratıcı ve duygusal, AI sadece programlandığı işi yapar'
    ),
    jsonb_build_object(
      'question', 'Eğitim verisi ne demektir?',
      'answer', 'Yapay zekanın öğrenmek için kullandığı örnek bilgiler'
    ),
    jsonb_build_object(
      'question', 'Yapay zeka kararlarında her zaman objektif midir?',
      'answer', 'Hayır, eğitim verisindeki önyargıları da öğrenebilir'
    ),
    jsonb_build_object(
      'question', 'Doğal Dil İşleme (NLP) ne işe yarar?',
      'answer', 'Bilgisayarların insan dilini anlaması ve kullanması için'
    ),
    jsonb_build_object(
      'question', 'Yapay zeka gelecekte neleri değiştirebilir?',
      'answer', 'Sağlık, eğitim, ulaşım, iletişim ve çalışma şeklimizi'
    )
  )
)
WHERE title = 'Yapay Zekâ Nedir?' AND order_number = 1;
