-- Mahremiyetin İlk Adımı dersinin parent_guide bölümünü güncelle (Yeni Format)
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Mahremiyet = Çocuğun "Bu bilgi bana ait, herkesle paylaşmak zorunda değilim" diyebilmesi. Sadece bedenini değil, adını, adresini, okulunu, duygularını ve özel yaşantılarını da koruyabilmesi demek.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Mahremiyet = Çocuğun "Bu bilgi bana ait, herkesle paylaşmak zorunda değilim" diyebilmesi. Sadece bedenini değil, adını, adresini, okulunu, duygularını ve özel yaşantılarını da koruyabilmesi demek. Çocuk, dijital ortamda gördüğü her soruya otomatik cevap vermek zorunda olmadığını bilmeli. Ona şu güveni vermek önemli: "Bir uygulama ya da oyun senden bilgi isterse, bunu tek başına karar vermek zorunda değilsin, önce bize sorabilirsin."'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Telefonlarda, tabletlerde oyun oynarken veya bir uygulamaya girerken sana bazen sorular soruyorlar: "Adın ne? Kaç yaşındasın? Hangi okula gidiyorsun? Adresin ne?" gibi. Şunu bilmeni istiyorum: Her soruya cevap vermek zorunda değilsin. Bazı bilgiler var ki, bunlar sadece sana ve ailemize ait. Mesela tam adın, adresin, telefon numaran, okulunun adı, sınıfın, şifrelerin ve ailemizle ilgili özel şeyler… Bunları internette yazmak senin güvenliğin için doğru değil. Eğer bir oyun ya da yapay zekâ senden böyle bilgiler isterse, "Bunu önce anneme/babama soracağım" deme hakkın var. Çünkü senin güvende olman, her şeyden daha önemli.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Yeni bir oyuna kayıt olurken',
            'content', 'Diyelim ki yeni bir oyun açtın ve "Okulunun adını yaz" diye bir kutu çıktı. Böyle bir durumda hemen yazmak yerine, "Ben bunu önce aileme soracağım" diyebilirsin. Bazı oyunlar bu bilgiyi hiç bilmeden de çalışabilir.'
          ),
          jsonb_build_object(
            'title', 'Sohbet botu / yapay zekâ soru sorduğunda',
            'content', 'Bir sohbet ekranı sana "Bana kendinden bahset, nerede oturuyorsun?" diye yazdı diyelim. Sen sadece genel şeyler söyleyebilirsin: "Kitap okumayı seviyorum, resim yapmayı seviyorum" gibi. Ama tam adresini, okulunu veya sınıfını yazmana gerek yok.'
          ),
          jsonb_build_object(
            'title', 'Arkadaş grubunda birinin fotoğraf, adres istemesi',
            'content', 'Bir arkadaş grubunda biri "Evini çek, adresini yolla" gibi bir şey derse, bu da mahremiyete girer. Böyle durumlarda da "Hayır, bu bilgiyi paylaşmak istemiyorum" deme hakkın var ve istersen hemen bize söyleyebilirsin.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence adresini, okulunu herkesin bilmesi iyi bir fikir mi?',
          'Bu bilgiyi yazdığında, kimler görebilir olabilir?',
          'Bu soru için "Önce aileme soracağım" demek ister misin?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Hiçbir yerde hiçbir şey yazma, her şey tehlikeli.',
            'right', 'Bazı bilgiler var ki çok özel; onları ekranda yazmak güvenli değil. İstersen birlikte bakalım: Hangilerini yazabiliriz, hangilerini yazmayız?'
          ),
          jsonb_build_object(
            'wrong', 'Ben söylemeden hiçbir yere girmeyeceksin!',
            'right', 'Yeni bir oyun ya da uygulama açmak istediğinde, özellikle bilgi istiyorsa, önce bana gösterebilirsin. Böylece beraber karar veririz.'
          ),
          jsonb_build_object(
            'wrong', 'Sen ne anlarsın mahremiyetten?',
            'right', 'Bu senin için yeni bir konu, o yüzden birlikte öğreneceğiz. Aklına takılan her şeyi bana sorabilirsin, yanlış bir şey yapmaktan korkmana gerek yok; biz buradayız.'
          )
        )
      )
    )
  )
)
WHERE id = 'f0d8e748-3034-4b42-bfcb-6af23fb9be9b';
