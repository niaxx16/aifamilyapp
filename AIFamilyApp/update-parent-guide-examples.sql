-- İlk dersin parent_guide bölümünü güncelle
-- Günlük hayat örneklerini çoğalt

UPDATE lessons
SET module_content = jsonb_set(
  module_content,
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'explanation', 'Yapay zeka, bilgisayarların insanlar gibi öğrenmesini ve düşünmesini sağlayan bir teknolojidir. Tıpkı çocukların deneyimlerden öğrenmesi gibi, yapay zeka da verilerden öğrenir ve zamanla daha iyi hale gelir.',
    'daily_examples', jsonb_build_array(
      jsonb_build_object(
        'title', 'YouTube Önerileri',
        'example', 'YouTube''da izlediğimiz videolar yapay zeka tarafından analiz ediliyor. Eğer dinazor videoları izliyorsan, yapay zeka bunu fark ediyor ve sana daha fazla dinazor videosu öneriyor. Bu sayede senin ilgini çekecek içerikleri bulman kolaylaşıyor.'
      ),
      jsonb_build_object(
        'title', 'Akıllı Telefonun Yüz Tanıma',
        'example', 'Telefonunu yüzünle açtığında, yapay zeka yüzünü hatırlıyor. İlk başta yüzünün fotoğraflarını çekiyor ve öğreniyor. Sonra her seferinde seni tanıyabiliyor. Tıpkı annenin seni kalabalıkta tanıması gibi!'
      ),
      jsonb_build_object(
        'title', 'Sesli Asistan (Siri, Alexa)',
        'example', 'Telefona veya akıllı hoparlöre "Hava durumu nasıl?" diye sorduğunda, yapay zeka sesini duyuyor, ne dediğini anlıyor ve cevap veriyor. Bu, arkadaşınla konuşman gibi ama karşında bir bilgisayar var.'
      ),
      jsonb_build_object(
        'title', 'Çeviri Uygulamaları',
        'example', 'Google Translate gibi uygulamalar yapay zeka kullanıyor. Telefonunu bir İngilizce yazıya tuttuğunda, anında Türkçe''ye çeviriyor. Hatta konuşarak da çeviri yapabiliyorsun - sanki yanında bir tercüman varmış gibi!'
      )
    )
  )
)
WHERE title = 'Yapay Zekâ Nedir?' AND order_number = 1;
