-- Veri Gizliliği ve Şirketler dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Veri gizliliği = Kişisel bilgilerimizin kimler tarafından, hangi amaçla, ne kadar süreyle kullanılacağına karar verme hakkı. Çocuk; oyun, uygulama ve yapay zekâ kullanırken farkında olmadan birçok iz bırakıyor. Amacımız: "Nerede ne paylaştığını fark eden, gerektiğinde durup soran çocuk" yetiştirmek.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Veri gizliliği = Kişisel bilgilerimizin kimler tarafından, hangi amaçla, ne kadar süreyle kullanılacağına karar verme hakkı. Çocuk; oyun, uygulama ve yapay zekâ kullanırken farkında olmadan birçok iz bırakıyor (ne izliyor, neye tıklıyor, ne kadar oynuyor…). Amacımız: "Her yere iz bırakan çocuk" değil, "Nerede ne paylaştığını fark eden, gerektiğinde durup soran çocuk". Çocuğa: "Her ''kabul ediyorum'' kutusunu tıklamak zorunda değilsin, anlamadığın yerde bize sorabilirsin" mesajını vermeliyiz.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Telefon ve tablet kullandığında, oynadığın oyunlar ve kullandığın uygulamalar seninle ilgili bazı şeyleri hatırlıyor: hangi videoları izlediğin, hangi oyunu ne kadar oynadığın, nereye tıkladığın gibi. Bu bilgi parçalarına veri diyoruz. Bu veriler bir araya gelince senin hakkında küçük bir ''dijital profil'' oluşuyor. Veri gizliliği ise şunu demek: ''Bu bilgilerimi kim görüyor, ne için kullanıyor, ne kadar saklıyor?'' Sen her gördüğün kutucuğa ''Kabul ediyorum'' demek zorunda değilsin. Bir uygulama senden konum, kamera, mikrofon gibi izinler istediğinde önce bana sorabilirsin. Çünkü senin bilgilerinin nerede ve nasıl kullanılacağına önce biz karar vermeliyiz. Bilgilerin değerli ve seni korumak bizim için çok önemli.'
      ),
      jsonb_build_object(
        'icon', '📱',
        'title', 'Günlük Hayattan 3 Somut Örnek',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Yeni bir uygulama yüklerken',
            'content', 'Bir uygulama yüklerken karşına uzun bir yazı ve altta ''Kabul ediyorum'' butonu çıkıyor ya… İşte o yazı, verilerinin nasıl kullanılacağını anlatmaya çalışıyor. Sen hepsini okumak zorunda değilsin, ama anlamadığında ''Önce aileme soracağım'' demen çok değerli.'
          ),
          jsonb_build_object(
            'title', 'Konum, kamera, mikrofon izinleri',
            'content', 'Bazı uygulamalar ''Konumuna erişmeme izin ver'', ''Kameranı kullanmama izin ver'' diye sorar. Gerçekten konuma ihtiyacı olmayan bir oyun bunu istiyorsa, ''Buna gerçekten gerek var mı?'' diye birlikte düşünelim.'
          ),
          jsonb_build_object(
            'title', 'Video platformlarında önerilen içerikler',
            'content', 'Bir video izledikten sonra sana benzer videolar öneriliyorsa, bu platform senin neleri sevdiğini verilerinden öğreniyor demektir. Bu her zaman kötü değil, ama şunu bilmen önemli: ''Ne izlediğin de bir veridir, kaydedilebilir.'''
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Çocuğuma Sorabileceğim 3 Basit Soru',
        'questions', jsonb_build_array(
          'Bu uygulama sence neden kamerana veya konumuna ihtiyaç duyuyor olabilir?',
          'Bu izin ekranını anlamadığında bana sormak ister misin?',
          'Sence her kutucuğu hemen işaretlemek mi iyi, yoksa önce bakıp sormak mı?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile Dikkat – Ne Demeli, Ne Dememeli?',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Her şeye izin ver, yoksa çalışmaz.',
            'right', 'Bazı izinler gerekli, bazıları gereksiz olabilir. Anlamadığında önce beraber bakalım, sonra izin veririz.'
          ),
          jsonb_build_object(
            'wrong', 'Okumaya gerek yok, hepsine kabul de geç.',
            'right', 'Hepsini okumamız mümkün değil ama ''kamera, mikrofon, konum'' gibi önemli izinlere en azından birlikte bakalım.'
          ),
          jsonb_build_object(
            'wrong', 'Yanlış izin verirsen başımıza iş açarsın.',
            'right', 'Yanlışlıkla bir şeye izin verirsen hemen bana söyle, birlikte düzeltiriz. Hata yapmandan değil, haber vermemenden endişe ederim.'
          )
        )
      )
    )
  )
)
WHERE id = '93c7b7f5-0e43-4466-8626-699b89827619';
