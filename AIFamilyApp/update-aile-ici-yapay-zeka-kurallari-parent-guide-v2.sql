-- Aile İçi Yapay Zekâ Kuralları dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Amaç: YZ''yi yasaklamak değil; "Evimizde bunu nasıl, ne kadar, ne için kullanacağımızı netleştirmek." Temel başlıklar: Ne için kullanırız, ne için kullanmayız, ne kadar, neleri yazmayız, son söz kimde. Hedef: "Yapay zekâyı korkuyla değil, sınırlarını bilen ve sorgulayan bir şekilde kullanan çocuk."',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Amaç: YZ''yi yasaklamak değil; "Evimizde bunu nasıl, ne kadar, ne için kullanacağımızı netleştirmek." Temel başlıklar: Ne için kullanırız? (öğrenme, fikir, destek) Ne için kullanmayız? (kopya, zorbalık, hile) Ne kadar kullanırız? (süre ve zaman sınırı) Neleri yazmayız? (kişisel bilgiler, mahremiyet) Son söz kimde? (YZ değil, çocuk + aile) Hedef: "Yapay zekâyı korkuyla değil, sınırlarını bilen ve sorgulayan bir şekilde kullanan çocuk."'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Evimizde yapay zekâ (AI) de tıpkı internet ve oyunlar gibi birlikte karar verdiğimiz kurallara göre çalışsın istiyorum. Çünkü AI çok güçlü bir araç. Bize yeni fikirler verebilir, ödevde takıldığımız yerde yol gösterebilir, merak ettiğimiz şeyleri açıklayabilir. Ama şunu bilmeni istiyorum: AI bir oyuncak değil, sihirli bir gerçek de değil. Yanlış da söyleyebilir, her dediği doğru olmayabilir. O yüzden bir anlaşma yapalım: AI''ı öğrenmek için, fikir bulmak için, metnini düzeltmek için kullanabiliriz. Ama ödevini baştan sona ona yazdırmak, başkasını taklit etmek ya da biriyle dalga geçmek için kullanmayız. Ayrıca: Tam adını, adresini, okulunun adını, telefonunu ve şifrelerini AI''a asla yazmıyorsun. Bunlar sadece sana ve ailemize ait. Eğer AI sana tuhaf, garip, seni rahatsız eden bir şey söylerse veya ne cevap vereceğini bilemezsen, bunu tek başına çözmek zorunda değilsin. Hemen bana gelip: ''Böyle bir şey söyledi, birlikte bakabilir miyiz?'' diyebilirsin. Yani kısacası, AI bizim evde yasak değil, ama kuralları olan bir yardımcı. Bu kuralları da seninle birlikte belirlemek istiyorum.'
      ),
      jsonb_build_object(
        'icon', '📱',
        'title', 'Günlük Hayattan 3 Somut Örnek',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Ödev Yaparken AI Kullanımı',
            'content', 'Bir ödevin var ve zorlanıyorsun. Önce kendin deniyorsun. Sonra diyorsun ki: ''Burası zor geldi, AI''a nasıl sorabilirim?'' AI''dan direkt ödevi yazmasını istemek yok. Ama ondan örnek istemek, bir konuyu daha iyi açıklamasını istemek serbest. Sonra kendi cümleni kendin kuruyorsun.'
          ),
          jsonb_build_object(
            'title', 'Mahremiyet Kuralı',
            'content', 'Diyelim ki AI sana ''Bana kendini anlat'' dedi. Sen genel şeylerden bahsedebilirsin: ''Resim yapmayı seviyorum, kedileri seviyorum'' gibi. Ama asla tam adını, adresini, okulunu, telefonunu, şifrelerini yazmıyorsun. Bu evimizin değişmeyen kuralı.'
          ),
          jsonb_build_object(
            'title', 'Tuhaf veya rahatsız edici bir cevap geldiğinde',
            'content', 'Bazen AI garip, saçma ya da seni rahatsız eden bir şey söyleyebilir. Böyle bir durumda ekranı kapatmak ya da tek başına çözmeye çalışmak zorunda değilsin. ''Böyle bir cevap verdi, birlikte bakabilir miyiz?'' dersen, bu çok doğru ve güçlü bir davranış olur.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Çocuğuma Sorabileceğim 3 Basit Soru',
        'questions', jsonb_build_array(
          'Sence AI''ı şu anda hangi amaçla kullanıyoruz? Yardım mı, kopya mı?',
          'Bu soruyu AI''a sormadan önce kendin biraz düşünmek ister misin?',
          'AI''ın söylediği bu şeye tamamen inanmalı mıyız, yoksa birlikte kontrol edelim mi?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile Dikkat – Ne Demeli, Ne Dememeli?',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Yapay zekâya yaklaşma, çok tehlikeli.',
            'right', 'Yapay zekâ güçlü bir araç. Yanında ben varken ve kurallarımıza uyarak onu güvenli bir şekilde kullanabiliriz.'
          ),
          jsonb_build_object(
            'wrong', 'Ne olursa olsun AI benden akıllı, ona uy.',
            'right', 'AI çok şey biliyor ama her zaman haklı değil. Son karar bizde. Beğenmediğin, yanlış bulduğun şeyleri yapmak zorunda değilsin.'
          ),
          jsonb_build_object(
            'wrong', 'Sana güvenmiyorum, bu yüzden kural koyuyorum.',
            'right', 'Sana güveniyorum, bu kuralları da tam tersine seni korumak ve birlikte öğrenmek için koyuyoruz. İstersen sen de kendi önerilerini ekleyebilirsin.'
          )
        )
      )
    )
  )
)
WHERE id = '56825e34-dd03-4078-9c9f-703512049ef8';
