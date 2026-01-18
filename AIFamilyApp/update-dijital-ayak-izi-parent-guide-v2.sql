-- Dijital Ayak İzi dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Dijital ayak izi = Çocuğun internette yaptığı her şeyin (izleme, tıklama, paylaşma, yorum yazma, arama, sohbet) geride bıraktığı izler. Amaç: "İnternette yaptığım şeyler kaybolmuyor, bu yüzden paylaşmadan önce düşünüyorum" farkındalığını kazandırmak.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Dijital ayak izi = Çocuğun internette yaptığı her şeyin (izleme, tıklama, paylaşma, yorum yazma, arama, sohbet) geride bıraktığı izler. Tıpkı karda yürürken bıraktığımız ayak izleri gibi, dijitalde de "görünmez izler" oluşuyor. Amaç: Çocuğu korkutmak değil; "İnternette yaptığım şeyler kaybolmuyor, bu yüzden paylaşmadan önce düşünüyorum." farkındalığını kazandırmak. Özellikle fotoğraf, yorum, mesaj ve video paylaşımlarında "sonradan karşıma çıkabilir" ihtimalini anlaması çok değerli.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Karlı bir günde yürüdüğümüzde arkanda ayak izlerin kalıyor, hatırlıyor musun? İşte internette yaptığın her şey de böyle dijital ayak izi bırakıyor. Video izlediğinde, bir gönderiyi beğendiğinde, bir yorum yazdığında, bir fotoğraf paylaştığında bunların çoğu bir yerde kaydediliyor. Bu her zaman kötü bir şey değil. Mesela hangi videoları sevdiğini hatırlayıp sana benzer videolar göstermeleri bu sayede oluyor. Ama şunu bilmen çok önemli: İnternete koyduğun bir fotoğrafı, yazdığın bir yorumu ya da yolladığın bir mesajı sonra tamamen silmek her zaman kolay değil. O yüzden internette bir şey yapmadan önce küçük bir kuralımız olsun: ''Paylaşmadan önce bir kez düşünüyorum. Bunu öğretmenim, arkadaşım ya da ileride bakınca ben görsem utanır mıyım, üzülür müyüm?'' Eğer cevabın ''Evet, üzülürüm'' ise o paylaşımı yapmana gerek yok demektir.'
      ),
      jsonb_build_object(
        'icon', '📱',
        'title', 'Günlük Hayattan 3 Somut Örnek',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Kırıcı bir yorum yazmak üzereyken',
            'content', 'Bir video veya fotoğrafın altına ''Ne kadar saçma!'' diye yazmak istedin diyelim. O yorum orada kalabilir, başkaları görebilir, ekran görüntüsü alabilir. Tıpkı karda bıraktığın iz gibi, o da bir dijital iz olur. Paylaşmadan önce ''Biri bana böyle yazsa ne hissederdim?'' diye düşünmek çok önemli.'
          ),
          jsonb_build_object(
            'title', 'Arkadaşın fotoğrafını paylaşmak',
            'content', 'Arkadaşının fotoğrafını çekip onun izni olmadan bir yere yüklediğinde, sadece kendi değil, onun da dijital ayak izini artırmış oluyorsun. Bu yüzden ''Önce sorayım, izin isterim'' demek, hem saygılı hem de güvenli bir davranış.'
          ),
          jsonb_build_object(
            'title', '''Nasıl olsa sonra silerim'' düşüncesi',
            'content', 'Bazen ''Şimdi paylaşayım, sonra silerim'' diye düşünebilirsin. Ama o sırada biri ekran görüntüsü almış olabilir. Yani sen silsen bile o iz başka yerlerde kalabilir. Bu yüzden ''Nasıl olsa silerim'' yerine ''Paylaşmaya gerçekten değer mi?'' diye düşünmek daha iyi.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Çocuğuma Sorabileceğim 3 Basit Soru',
        'questions', jsonb_build_array(
          'Bu paylaşımı öğretmenin ya da ailendeki büyükler görse ne hissedersin?',
          'Bu fotoğraf/yorum yıllar sonra karşına çıksa, hâlâ görmek ister misin?',
          'Bu yaptığın şey, internette nasıl bir iz bırakıyor sence?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile Dikkat – Ne Demeli, Ne Dememeli?',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'İnternet çok tehlikeli, hiçbir şey paylaşma.',
            'right', 'İnternette güzel şeyler paylaşabilirsin ama önce ''Bu bende nasıl bir iz bırakır?'' diye bir düşünmek harika olur.'
          ),
          jsonb_build_object(
            'wrong', 'Bir kere paylaştın mı, yandın zaten.',
            'right', 'Bazen hatalı şeyler paylaşabiliriz, önemli olan hemen fark edip bize söylemen ve birlikte çözüm aramamız. Hata yaparsan yalnız değilsin.'
          ),
          jsonb_build_object(
            'wrong', 'Sen anlamazsın, büyüklerin bile kafası karışıyor.',
            'right', 'Bu konular karışık görünebilir, birlikte öğrenmek için buradayım. Aklına takılan her şeyi sorabilirsin.'
          )
        )
      )
    )
  )
)
WHERE id = 'cde8f3ea-ff8b-4b4e-9e1b-a3057e2f9609';
