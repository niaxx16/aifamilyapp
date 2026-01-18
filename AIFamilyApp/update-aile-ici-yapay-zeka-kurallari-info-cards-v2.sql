-- Aile İçi Yapay Zekâ Kuralları dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Aile içi yapay zekâ kuralları nedir?',
      'answer', 'Evde YZ''nin nasıl, ne kadar ve hangi amaçla kullanılacağını belirleyen ortak anlaşmalar.',
      'example', '"Aile YZ Kuralları" diye buzdolabına/duvara astığınız basit liste veya notta.'
    ),
    jsonb_build_object(
      'question', 'Neden YZ''yi tamamen yasaklamak yerine kurallı kullanmak daha iyi?',
      'answer', 'Çünkü YZ hayatın bir parçası; önemli olan onu bilinçli ve kontrollü kullanmayı öğretmek.',
      'example', 'Çocuk YZ''yi merak ederken "Hayır, asla!" demek yerine "Gel, belli kurallarla birlikte kullanalım" dediğiniz anlarda.'
    ),
    jsonb_build_object(
      'question', 'Aile kuralları hangi başlıkları içerebilir?',
      'answer', 'Amaç, zaman, mahremiyet, içerik, sorumluluk.',
      'example', 'Kurallar listesini oluştururken ana başlıkları maddeler hâlinde yazarken.'
    ),
    jsonb_build_object(
      'question', 'YZ evde hangi amaçlar için kullanılabilir?',
      'answer', 'Öğrenme, araştırma, fikir üretme, metin düzenleme gibi destekleyici amaçlar için.',
      'example', 'Çocuk ödevde takıldığında "Önce sen düşün, sonra birlikte YZ''ye soralım" dediğinizde.'
    ),
    jsonb_build_object(
      'question', 'YZ ne için kullanılmamalı?',
      'answer', 'Ödevi kopyalatmak, başkasını taklit etmek, alaycı/zorbalık içeriği üretmek için.',
      'example', '"Bu şiiri tamamen YZ''ye yazdırayım, öğretmenime kendi yazdım diyeyim" dediğinde.'
    ),
    jsonb_build_object(
      'question', 'Zamanla ilgili nasıl bir kural konabilir?',
      'answer', 'Günlük/haftalık makul bir süre ve YZ kullanımının ödev, oyun ve dinlenme ile dengelenmesi.',
      'example', '"Günde en fazla şu kadar dakika YZ ile vakit geçirelim" şeklinde ev içi anlaşmalarda.'
    ),
    jsonb_build_object(
      'question', 'Mahremiyet açısından temel kural ne olmalı?',
      'answer', 'Çocuk tam adını, adresini, okulunu, telefonunu, şifrelerini YZ''ye yazmamalı.',
      'example', 'Çocuk YZ''ye kendini tanıtırken özel bilgileri yazmadan önce size sorduğunda.'
    ),
    jsonb_build_object(
      'question', 'İçerikle ilgili hangi sınır koyulabilir?',
      'answer', 'Çok kişisel, hassas, korkutucu veya yetişkinlere özel konular önce aileyle konuşulmalı.',
      'example', 'Çocuk "Bunu YZ''ye sorayım mı yoksa önce sana mı anlatayım?" diye kararsız kaldığında.'
    ),
    jsonb_build_object(
      'question', 'Sorumluluk kısmındaki temel mesaj nedir?',
      'answer', '"YZ çok şey bilir ama her zaman haklı değil; son karar bizde."',
      'example', 'YZ''nin verdiği bir yanıtı birlikte kontrol ederken, hatalı veya uygunsuz bir öneriyi reddederken.'
    ),
    jsonb_build_object(
      'question', 'Kuralları kiminle birlikte yazmak en sağlıklısıdır?',
      'answer', 'Çocukla birlikte, karşılıklı konuşarak.',
      'example', '"Bu kurala sen ne eklemek istersin?" diye sorup çocuğun da madde önermesine izin verdiğiniz anda.'
    )
  )
)
WHERE id = '56825e34-dd03-4078-9c9f-703512049ef8';
