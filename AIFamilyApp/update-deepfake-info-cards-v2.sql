-- Deepfake dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Deepfake nedir?',
      'answer', 'Yapay zekâyla üretilmiş, sahte ama çok gerçek görünen video veya ses.',
      'example', 'Birinin yüzünün başka bir videonun üzerine yerleştirildiği, hiç söylemediği sözleri söylüyormuş gibi gösterildiği videolarda.'
    ),
    jsonb_build_object(
      'question', 'Deepfake videolar neden tehlikeli olabilir?',
      'answer', 'Yalan haber, iftira, alay ve zorbalık için kullanılabilir.',
      'example', '"Şok! İnanılmaz görüntüler!" gibi başlıklarla paylaşılan, bir kişinin itibarını zedeleyen videolarda.'
    ),
    jsonb_build_object(
      'question', 'Deepfake ile normal video arasındaki temel fark nedir?',
      'answer', 'Normal videoda kişi gerçekten o anda oradadır; deepfake''te görüntü ve/veya ses taklit edilir.',
      'example', 'Kişinin mimiklerinin doğal görünmediği, dudak hareketiyle sesin tam uyuşmadığı şüpheli videolarda.'
    ),
    jsonb_build_object(
      'question', 'Deepfake sadece ünlüler için mi yapılır?',
      'answer', 'Hayır, sıradan insanlar için de yapılabilir.',
      'example', 'Gençler arasında zorbalık amacıyla düzenlenmiş, sınıf arkadaşlarını hedef alan sahte videolarda.'
    ),
    jsonb_build_object(
      'question', 'Çocuğa vermek istediğimiz temel mesaj nedir?',
      'answer', '"Videoda gördüğün her şeyi hemen gerçek kabul etme."',
      'example', 'Çocuk, bir video görüp "Bak, kesin böyle olmuş!" dediğinde.'
    ),
    jsonb_build_object(
      'question', 'Şüpheli bir video için ilk soru ne olabilir?',
      'answer', '"Bu videonun kaynağı neresi?"',
      'example', 'Sadece isimsiz bir hesapta dolaşan, haber sitelerinde veya resmî kaynaklarda geçmeyen videolarda.'
    ),
    jsonb_build_object(
      'question', 'Neden "çok uç, çok şaşırtıcı" videolarda daha dikkatli olmalıyız?',
      'answer', 'Duygularımızı kışkırtarak düşündürmeden inanmamızı hedefleyebilir.',
      'example', '"Aşırı öfkelendirici" veya "inanılması zor" içeriklerde.'
    ),
    jsonb_build_object(
      'question', 'Çocuk deepfake videoyla karşılaşınca ne yapmalı?',
      'answer', 'Hemen inanmadan önce bir yetişkine sormalı ve paylaşmadan önce durmalı.',
      'example', 'Arkadaşlarının gönderdiği şüpheli bir videoyu başkalarına "forward" etmeden önce.'
    ),
    jsonb_build_object(
      'question', 'Deepfake''lerin olduğu dünyada hangi beceri çok önemli?',
      'answer', 'Görüntü ve sesleri eleştirel gözle sorgulama becerisi.',
      'example', '"Bu gerçek olabilir mi? Başka kaynaklar ne diyor?" diye düşünürken.'
    ),
    jsonb_build_object(
      'question', 'Ebeveyn olarak çocuğa hangi cümleyi öğretebiliriz?',
      'answer', '"Videoda gördüm diye değil, araştırdım diye inanırım."',
      'example', 'Herhangi bir videoyu referans alarak tartışma başlatmadan önce birlikte kontrol etmeye çalışırken.'
    )
  )
)
WHERE id = '602491e1-39e2-4df3-ad84-a2fb79cd4397';
