-- Mahremiyetin İlk Adımı dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Dijital mahremiyet, özel bilgilerimizi internette güvende tutmaktır. AI uygulamaları dahil her dijital ortamda neleri paylaşıp paylaşmayacağımızı bilmek önemlidir.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Mahremiyet = özel bilgilerin korunması. Dijital dünyada isim, adres, fotoğraf, konum gibi kişisel veriler kötüye kullanılabilir. AI uygulamaları da bu verileri toplar ve işler. Çocukların hangi bilgilerin özel olduğunu, neden korunması gerektiğini anlaması çok kritik.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Mahremiyet, evinin kapısını kilitlemek gibi. Herkesin evine girmesini istemezsin değil mi? Aynı şekilde internette de bazı bilgilerin sadece sana ve ailene ait olması gerekiyor. İsminin, adresinin, fotoğraflarının herkese açık olması tehlikeli olabilir.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Oyun hesabı oluştururken',
            'content', '"Gerçek adını yazmana gerek yok. Kullanıcı adı olarak takma isim kullanabilirsin. Kimse senin gerçekte kim olduğunu bilmek zorunda değil."'
          ),
          jsonb_build_object(
            'title', 'AI chatbot ile konuşurken',
            'content', '"ChatGPT''ye soru sorarken, tam adını, okulunun ismini, adresini söyleme. Sadece öğrenmek istediğin şeyi sor."'
          ),
          jsonb_build_object(
            'title', 'Fotoğraf paylaşımı',
            'content', '"Bu fotoğrafı paylaşmadan önce düşünelim: Evimizin numarası görünüyor mu? Araba plakamız var mı? Bunlar özel bilgiler."'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Bir oyun sana tam adını, yaşını ve okulunun adını sorsa, bunları paylaşır mıydın? Neden?',
          'Sence yapay zeka uygulamaları, senin verdiğin bilgileri başkalarıyla paylaşabilir mi?',
          'İnternette bir yabancı seninle arkadaş olmak istese, ona evinin adresini verir miydin?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Herkes zaten her şeyimi biliyor, gizlemenin anlamı yok.',
            'right', 'Ne kadar az kişi özel bilgilerini bilirse, o kadar güvendesin. İnternette her şeyi herkes görmemeli.'
          ),
          jsonb_build_object(
            'wrong', 'AI uygulamalarına güvenebilirim, onlar bilgilerimi korur.',
            'right', 'AI uygulamaları verilerini saklıyor ve bazen başka şirketlerle paylaşabiliyor. Bu yüzden ne paylaştığına dikkat etmelisin.'
          )
        )
      )
    )
  )
)
WHERE title = 'Mahremiyetin İlk Adımı';
