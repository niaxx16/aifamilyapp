-- Dijital Ayak İzi dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Dijital ayak izi nedir?',
      'answer', 'İnternette yaptığımız her şeyin geride bıraktığı izlerdir.',
      'example', 'İzlenen videolar, beğenilen gönderiler, yazılan yorumlar, yapılan aramalar.'
    ),
    jsonb_build_object(
      'question', 'Neden "ayak izi" benzetmesi kullanılıyor?',
      'answer', 'Çünkü tıpkı karda yürürken olduğu gibi, dijitalde de adımlarımız iz bırakır.',
      'example', 'Eski arama geçmişinde, izleme geçmişinde, eski sosyal medya paylaşımlarında.'
    ),
    jsonb_build_object(
      'question', 'Dijital ayak izi sadece paylaşımlar mı?',
      'answer', 'Hayır, tıklamalar, aramalar, izleme süresi gibi davranışlar da dahildir.',
      'example', '"Senin için önerilen videolar", "En çok oynadığın oyunlar" ekranlarında.'
    ),
    jsonb_build_object(
      'question', 'Silinen içerikler tamamen yok olur mu?',
      'answer', 'Her zaman değil; kopyalanmış, ekran görüntüsü alınmış veya sunucularda saklanmış olabilir.',
      'example', 'Paylaşıldıktan sonra başkalarının telefonunda/hesabında kalmış fotoğraf ve mesajlarda.'
    ),
    jsonb_build_object(
      'question', 'Dijital ayak izi ne için olumlu kullanılabilir?',
      'answer', 'İlgi alanlarına uygun içerik, film, oyun, müzik önermek için.',
      'example', '"Senin için seçtik", "Bunları da sevebilirsin" başlıklı öneri listelerinde.'
    ),
    jsonb_build_object(
      'question', 'Dijital ayak izinin riskli tarafı nedir?',
      'answer', 'Aceleyle, düşünmeden yapılan paylaşımların uzun süre görülebilmesi.',
      'example', 'Yıllar önce yazılmış kırıcı bir yorumun veya uygunsuz bir fotoğrafın tekrar gündeme gelmesinde.'
    ),
    jsonb_build_object(
      'question', 'Çocuğa hangi temel alışkanlığı kazandırmak isteriz?',
      'answer', '"Paylaşmadan önce düşün" alışkanlığını.',
      'example', 'Her fotoğraf, yorum veya video paylaşımından önce bir an durup "Bunu sonra görmek ister miyim?" diye sormasında.'
    ),
    jsonb_build_object(
      'question', 'Dijital ayak izi sadece sosyal medyada mı oluşur?',
      'answer', 'Hayır, oyunlarda, eğitim platformlarında, arama motorlarında da oluşur.',
      'example', 'Oyun süresi istatistiklerinde, "Son izlediklerin" listesinde, arama geçmişinde.'
    ),
    jsonb_build_object(
      'question', 'Ebeveyn olarak çocuğa nasıl özetleyebiliriz?',
      'answer', '"İnternette yaptığın her şey, görünmese bile bir iz bırakabilir."',
      'example', 'Çocuk "Nasıl olsa sonra silerim" diyerek bir şey paylaşmak üzereyken.'
    ),
    jsonb_build_object(
      'question', 'Dijital ayak izi farkındalığı çocuğa ne kazandırır?',
      'answer', 'Daha dikkatli, saygılı ve sorumlu dijital davranış.',
      'example', 'Kavga etmek yerine sakin kalmayı, alaycı paylaşım yerine düşünceli davranmayı seçmesinde.'
    )
  )
)
WHERE id = 'cde8f3ea-ff8b-4b4e-9e1b-a3057e2f9609';
