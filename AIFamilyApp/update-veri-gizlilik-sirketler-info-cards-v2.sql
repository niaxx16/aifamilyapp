-- Veri Gizliliği ve Şirketler dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Veri gizliliği nedir?',
      'answer', 'Kişisel verilerimizin kimlerce, hangi amaçla ve ne kadar süreyle kullanılacağını kontrol etme hakkımız.',
      'example', 'Uygulama kurarken karşımıza çıkan "Gizlilik Politikası", "KVKK / GDPR" metinlerinde.'
    ),
    jsonb_build_object(
      'question', 'Neden veri gizliliği özellikle çocuklar için önemli?',
      'answer', 'Çocuklar, hangi bilgiyi verdiklerinde ne olacağını tam öngöremeyebilir.',
      'example', 'Çocuğun oyun uğruna adresini, okulunu veya ilgi bilgilerini kolayca yazmaya razı olması durumunda.'
    ),
    jsonb_build_object(
      'question', 'Bir uygulama hangi verileri toplayabilir?',
      'answer', 'Ad, yaş, cihaz bilgisi, konum, izlenen videolar, tıklamalar, oyun süresi gibi pek çok veri.',
      'example', 'Video platformlarında "Önerilenler"in oluşmasında, oyunların "şu kadar saat oynadın" bilgisini göstermesinde.'
    ),
    jsonb_build_object(
      'question', '"İzinler" ekranı veri gizliliğiyle nasıl ilişkilidir?',
      'answer', 'Uygulamanın hangi telefon özelliğine erişeceğini gösterir.',
      'example', 'Yeni uygulama yüklerken "Kamera, mikrofon, konum, rehber erişimi istiyor" uyarılarında.'
    ),
    jsonb_build_object(
      'question', 'Her isteğe "İzin ver" demek gerekir mi?',
      'answer', 'Hayır, uygulamanın gerçekten ihtiyaç duyduğu izinler seçilmelidir.',
      'example', 'Bir boyama uygulamasının gereksiz yere konum ve rehbere erişim istemesinde.'
    ),
    jsonb_build_object(
      'question', '"Misafir modu / çocuk profili" ne işe yarar?',
      'answer', 'Daha az veri toplayan ve sınırlı yetkilerle çalışan güvenli kullanım alanı sunar.',
      'example', 'Video platformlarında "Çocuk profili", bazı oyun konsollarında "Guest/Child mode" ayarlarında.'
    ),
    jsonb_build_object(
      'question', 'Çerez (cookie) nedir?',
      'answer', 'Ziyaret edilen sitelerin, tercih ve hareketlerimizi hatırlamak için tuttuğu küçük veri dosyaları.',
      'example', '"Bu site çerez kullanmaktadır, kabul ediyor musunuz?" uyarı pencerelerinde.'
    ),
    jsonb_build_object(
      'question', '"Veri paylaşımı üçüncü taraflarla yapılabilir" ne demek?',
      'answer', 'Toplanan verilerin başka şirketlerle/reklam verenlerle de paylaşılabileceği anlamına gelir.',
      'example', 'Gizlilik sözleşmesinde geçen "iş ortaklarımızla paylaşabiliriz" ifadelerinde.'
    ),
    jsonb_build_object(
      'question', 'Çocuğa hangi temel cümleyi öğretebiliriz?',
      'answer', '"Anlamadığım izin veya kutucuk olursa önce aileme sorarım."',
      'example', 'Yeni oyun/uygulama yüklerken "Kabul ediyorum" ekranında duraksayıp size dönmesinde.'
    ),
    jsonb_build_object(
      'question', 'Ebeveyn olarak ilk adımımız ne olabilir?',
      'answer', 'Kendi cihazlarımızda izinleri gözden geçirmek ve bunu çocuğa göstererek açıklamak.',
      'example', 'Ayarlar → Uygulamalar → İzinler ekranında gereksiz kamera/konum/mikrofon izinlerini kapatırken.'
    )
  )
)
WHERE id = '93c7b7f5-0e43-4466-8626-699b89827619';
