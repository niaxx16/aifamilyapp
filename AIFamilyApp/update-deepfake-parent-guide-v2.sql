-- Deepfake dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Deepfake = Yapay zekâ ile üretilen, sahte ama çok gerçek görünen video veya ses. Hedefimiz: "Video gördüm diye değil, kontrol ettim diye inanırım." refleksini kazandırmak. Amaç korkutmak değil, gördüğü her videoya hemen inanmamasını sağlamak.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Deepfake = Yapay zekâ ile üretilen, sahte ama çok gerçek görünen video veya ses. Bir kişinin yüzü, sesi, mimikleri taklit edilerek; sanki o kişi gerçekten konuşuyormuş ya da bir şey yapıyormuş gibi gösterilebilir. Çocuk (ve yetişkin) için risk: "Videoda gördüm, o zaman kesin doğrudur." Hedefimiz: "Video gördüm diye değil, kontrol ettim diye inanırım." refleksini kazandırmak. Amaç korkutmak değil, gördüğü her videoya hemen inanmamasını ve şüphelendiğinde mutlaka bir yetişkine sormasını sağlamak.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Sana internette yeni bir şeyden bahsedeceğim: Deepfake. Bu kelime, yapay zekâ kullanılarak sahte ama çok gerçek görünen videolar demek. Yani birinin yüzünü ve sesini alıp, hiç söylemediği sözleri söylemiş gibi ya da hiç gitmediği bir yerdeymiş gibi gösterebiliyorlar. Sen bir video izlediğinde, ''Bak, kendi gözlerimle görüyorum'' diyebilirsin. Ama artık her video %100 gerçek olmak zorunda değil. O yüzden özellikle; birini çok kötü gösteren, aşırı şaşırtıcı, çok uç videolar görünce hemen inanmak yerine şunu düşünmeni istiyorum: ''Acaba bu gerçekten doğru mu, yoksa sahte bir video olabilir mi?'' Eğer emin olamıyorsan, hemen paylaşmak yerine önce bana gelip ''Buna birlikte bakabilir miyiz?'' demen harika olur. Unutma: Videoda gördüğün her şeye değil, sorduğun ve araştırdığın şeylere inanmak daha güvenli.'
      ),
      jsonb_build_object(
        'icon', '📱',
        'title', 'Günlük Hayattan 3 Somut Örnek',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Arkadaş grubundan gelen "şok video"',
            'content', 'Diyelim ki arkadaşların sana ''Şuna bak, ne yapmış!'' diye bir video gönderdi. Videodaki kişi çok tanıdık biri ve çok kötü şeyler söylüyor. Böyle bir durumda hemen inanmak ve başkalarına göndermek yerine ''Bu gerçek olmayabilir, deepfake olabilir'' deyip önce bize gösterebilirsin.'
          ),
          jsonb_build_object(
            'title', 'Birini küçük düşüren video',
            'content', 'Bir video, birini çok utandırmak, dalga geçmek veya rezil etmek için yapılmışsa bu da tehlikeli olabilir. ''Bunu paylaşsam o kişi üzülür mü?'' diye düşünmek, hem saygılı hem de güvenli bir davranış.'
          ),
          jsonb_build_object(
            'title', '"Nasıl olsa videoda var" düşüncesi',
            'content', 'Biri ''Boşver, videoda var işte, görmüyor musun?'' dediğinde sen şöyle diyebilirsin: ''Artık sahte videolar da yapılabiliyor, önce bir bakalım, gerçekten doğru mu?'' Bu cümle, seni daha akıllı ve dikkatli yapar.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Çocuğuma Sorabileceğim 3 Basit Soru',
        'questions', jsonb_build_array(
          'Bu videoyu kim paylaşmış, tanıdık ve güvenilir biri mi?',
          'Bu video sana abartılı, aşırı ya da tuhaf geliyor mu?',
          'Bunu görmeden önce hiç başka yerde duydun mu? Başka kaynaklar ne diyor?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile Dikkat – Ne Demeli, Ne Dememeli?',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'İnternetteki videoların çoğu yalan, hiçbirine bakma.',
            'right', 'İnternette çok faydalı videolar da var, ama bazıları sahte olabilir. Önemli olan hemen inanmamak, önce düşünmek.'
          ),
          jsonb_build_object(
            'wrong', 'Sen anlamazsın, deepfake çok karışık şeyler.',
            'right', 'Bu konular biraz zor olabilir ama birlikte öğrenebiliriz. Aklına takılan videoları bana getirmen benim için çok değerli.'
          ),
          jsonb_build_object(
            'wrong', 'Böyle videolar izlersen başımıza iş açarsın.',
            'right', 'Şüpheli bir video görürsen, saklamak yerine hemen bana gösterirsen seni suçlamam, tam tersine aferin derim. Çünkü bu, sorumluluk aldığın anlamına gelir.'
          )
        )
      )
    )
  )
)
WHERE id = '602491e1-39e2-4df3-ad84-a2fb79cd4397';
