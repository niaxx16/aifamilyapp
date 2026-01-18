-- Veri Gizliliği ve Şirketler dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Şirketler, kullanıcı verilerini toplayarak para kazanır. Ücretsiz uygulamalar bile kullanıcı verilerini kullanarak gelir elde eder. Veri gizliliğinin ne olduğunu ve haklarımızı bilmek önemlidir.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Teknoloji şirketleri kullanıcı verilerini toplayarak reklam geliri elde eder, ürün geliştirir, profillemeler yapar. "Ücretsiz" uygulamalar aslında kullanıcı verisiyle para kazanır. KVKK ve GDPR gibi yasalar bu veri kullanımını düzenler. Çocukların şirketlerin veri toplama motivasyonlarını anlaması önemli.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Bedava uygulama indirdiğinde aslında parasını ödemiyorsun, ama senin hakkındaki bilgilerle ödeme yapıyorsun. Uygulama şirketi senin ne izlediğini, nerelere tıkladığını görüyor ve bu bilgilerle sana reklam gösteriyor. Reklamverenler de o şirkete para ödüyor. Yani senin verin, para demek.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'YouTube reklamları',
            'content', '"YouTube bedava değil mi? diyebilirsin. Evet, ama sana gösterdiği reklamlardan para kazanıyor. Hangi videolara baktığını kaydediyor, böylece ilgini çeken reklamları gösterebiliyor."'
          ),
          jsonb_build_object(
            'title', 'Oyunlardaki izinler',
            'content', '"Oyun, konum, kamera ve rehber izni istiyor. Neden? Çünkü bu bilgileri toplayıp başka şirketlerle paylaşabilirler. O yüzden gereksiz izinler vermemelisin."'
          ),
          jsonb_build_object(
            'title', 'Çerez (cookie) bildirimi',
            'content', '"Bir siteye girdiğinde Çerezleri kabul ediyor musun? diye soruyor. Bu, senin gezdiğin sayfaların kaydedilmesine izin vermek demek."'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence ücretsiz bir oyun nasıl para kazanır? Sen para ödemiyorsan, onlar nereden kazanıyor?',
          'Bir uygulama neden konum izni isteyebilir? Bu bilgiyi ne yapmak için kullanabilirler?',
          'Verilerinin başka şirketlere satılmasını ister misin? Neden?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Bedava uygulamalar hiçbir şey istemez.',
            'right', 'Bedava uygulamalar senin verilerinle para kazanır. Parasız ürünse, sen ürünsün.'
          ),
          jsonb_build_object(
            'wrong', 'Verilerim zaten güvende, şirketler kötü şey yapmaz.',
            'right', 'Şirketler bazen verilerini izinsiz paylaşabilir, satabilir veya güvenlik açıkları olabilir. Dikkatli olmak gerekir.'
          )
        )
      )
    )
  )
)
WHERE title = 'Veri Gizliliği ve Şirketler';
