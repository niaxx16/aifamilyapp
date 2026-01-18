-- Kişisel Veri Nedir dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Kişisel veri nedir?',
      'answer', 'Bir kişiyi tanımlayan veya tanınır hâle getiren her türlü bilgi.',
      'example', 'Ad–soyad, adres, telefon, fotoğraf gibi bilgiler istenirken.'
    ),
    jsonb_build_object(
      'question', 'Kişisel veri sadece isim midir?',
      'answer', 'Hayır, isim dışında pek çok bilgi kişisel veridir.',
      'example', '"Okulun neresi?", "Telefon numaran ne?", "Ev adresin?" gibi sorularda.'
    ),
    jsonb_build_object(
      'question', 'Kişisel veriye örnek verebilir misin?',
      'answer', 'Ad, soyad, adres, telefon, e-posta, okul adı, sınıf, fotoğraf, konum.',
      'example', 'Kayıt formlarında, üyelik ekranlarında, profil bilgilerinde.'
    ),
    jsonb_build_object(
      'question', 'Bir fotoğraf kişisel veri sayılır mı?',
      'answer', 'Evet, yüzü görünen fotoğraf kişisel veridir.',
      'example', 'Çocuğun yüzünün net göründüğü fotoğraflar sosyal medyada paylaşıldığında.'
    ),
    jsonb_build_object(
      'question', 'Oyun içi kullanıcı adı kişisel veri olabilir mi?',
      'answer', 'Evet, başka bilgilerle birleştiğinde çocuğu tanınır hâle getirebilir.',
      'example', 'Aynı kullanıcı adını sosyal medya, oyun ve forumlarda tekrar tekrar kullandığında.'
    ),
    jsonb_build_object(
      'question', 'Konum bilgisi (nerede olduğumuz) kişisel veri midir?',
      'answer', 'Evet, bir kişinin nerede olduğunu gösteren bilgi kişisel veridir.',
      'example', '"Konumunu paylaş", "Yakındaki arkadaşlarını bul" diyen uygulamalarda.'
    ),
    jsonb_build_object(
      'question', 'Genel bilgi ile kişisel veri arasındaki fark nedir?',
      'answer', 'Genel bilgi tanımlar; kişisel veri bulmayı ve tanımayı sağlar.',
      'example', '"En sevdiğin renk?" (genel) ile "Ev adresin?" (kişisel veri) sorularını karşılaştırırken.'
    ),
    jsonb_build_object(
      'question', 'Sağlık bilgileri kişisel veri midir?',
      'answer', 'Evet, üstelik "özel nitelikli" kişisel veridir.',
      'example', 'Çocuğun hastalıkları, alerjileri, özel gereksinimleri hakkında bilgi istenirken.'
    ),
    jsonb_build_object(
      'question', 'Kişisel veriler dijital ortamda ne yapılabilir?',
      'answer', 'Toplanabilir, saklanabilir, işlenebilir ve başka yerlerle paylaşılabilir.',
      'example', '"Verilerinizi üçüncü taraflarla paylaşabiliriz" yazan gizlilik sözleşmelerinde.'
    ),
    jsonb_build_object(
      'question', 'Çocuğa verebileceğimiz temel mesaj ne olabilir?',
      'answer', '"Tam adım, adresim, telefonum, okulum ve şifrem bana aittir."',
      'example', 'Çocuk yeni bir oyun/uygulama denerken, bu bilgileri yazmadan önce durup düşünmesinde.'
    )
  )
)
WHERE id = 'f5b9923d-31ea-4185-88ee-e9913a6a426e';
