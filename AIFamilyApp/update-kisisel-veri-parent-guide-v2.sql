-- Kişisel Veri Nedir dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Kişisel veri = Çocuğu tanımlayan veya tanınır hâle getiren her bilgi. Sadece ad–soyad değil; adres, telefon, okul adı, sınıf, fotoğraf, konum, kullanıcı adı, sağlık bilgileri de buna dahil.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Kişisel veri = Çocuğu tanımlayan veya tanınır hâle getiren her bilgi. Sadece ad–soyad değil; adres, telefon, okul adı, sınıf, fotoğraf, konum, kullanıcı adı, sağlık bilgileri de buna dahil. Çocuk için ana fikir: "Sevdiğim şeyi söylemek başka, adresimi/okulumu söylemek bambaşka." Amaç: Çocuğun, bu tür bilgileri her yerde, herkese yazmak zorunda olmadığını bilmesi ve gerekince "Bunu yazmadan önce aileme soracağım" diyebilmesi.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Sana bir şey anlatmak istiyorum. "Kişisel veri" diye bir kavram var. Bu, seni tanıtan özel bilgiler demek. Mesela: Tam adın, adresin, telefon numaran, okulunun adı, sınıfın, yüzünün göründüğü fotoğrafların, kullandığın hesap isimlerin… Bunların hepsi kişisel veri. İnternette bir yere bunları yazdığında, seni hiç tanımayan insanlar bile "Bu şu çocuk" diyebilir. Bu yüzden bu bilgiler her yere yazılmaz. Sevdiğin renk, en sevdiğin hayvan, sevdiğin oyun türü gibi şeyler daha genel bilgiler; bunlar seni bulmayı kolaylaştırmaz. Ama adresin, okulun veya telefonun sadece sana ve ailemize ait. Bir uygulama, oyun ya da yapay zekâ senden böyle bilgiler isterse, önce bize sorman çok önemli. Yani kısaca: "Bu bilgi beni tanıtır mı, beni bulmalarını kolaylaştırır mı?" diye düşünmeni istiyorum.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Yeni bir uygulamaya kayıt olurken',
            'content', 'Diyelim ki bir uygulama açtın ve sana diyor ki: "Tam adını, okulunu, adresini yaz." Bu tür soruları görünce gizli kuralın şu olsun: "Dur, önce aileme sorayım."'
          ),
          jsonb_build_object(
            'title', 'Sohbet ekranında "kendini tanıt" dendiğinde',
            'content', 'AI ya da sohbet botu sana "Bana kendini anlat" dediğinde, "Resim yapmayı seviyorum, kedileri seviyorum" diyebilirsin. Ama tam adını, adresini, okulunu yazmana gerek yok. Çünkü bunlar seni tanıtan kişisel veriler.'
          ),
          jsonb_build_object(
            'title', 'Oyun içinde arkadaş eklerken',
            'content', 'Bir oyun, "Konumunu paylaş, yakındaki oyuncuları bulalım" derse bu da kişisel veriye girer. Böyle durumlarda: "Konumumu paylaşmak istemiyorum, önce aileme soracağım" diyebilirsin.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Bu bilgi seni tanıtır mı, seni bulmalarını kolaylaştırır mı?',
          'Bu soruyu cevaplamadan önce bana sormak ister misin?',
          'Bunu tüm sınıfın bilse sorun olur mu? Olursa, internette yazmamak daha iyi.'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Hiçbir yere hiçbir şey yazma, internet çok tehlikeli.',
            'right', 'Bazı bilgiler var ki çok özel; onları yazmadan önce "Bu kişisel veri mi?" diye birlikte düşünelim.'
          ),
          jsonb_build_object(
            'wrong', 'Adresini yazdınsa yandık, mahvoldun.',
            'right', 'Eğer yanlışlıkla böyle bir bilgi yazarsan, hemen bana söyle. Beraber ne yapabileceğimize bakarız. Önemli olan, saklamak değil, paylaşmak.'
          ),
          jsonb_build_object(
            'wrong', 'Sen daha küçüksün, anlamazsın.',
            'right', 'Bu konular zor görünebilir ama birlikte öğrenebiliriz. Takıldığın her şeyi bana sorabilirsin, yanlış yapsan bile seni suçlamak için değil, korumak için yanındayım.'
          )
        )
      )
    )
  )
)
WHERE id = 'f5b9923d-31ea-4185-88ee-e9913a6a426e';
