-- "Gerçek Değil"i Anlamak dersi için içerik ekleme
UPDATE lessons
SET module_content = jsonb_build_object(
  'quiz', jsonb_build_object(
    'type', 'categorize',
    'question', 'Aşağıdaki durumları değerlendir: Gerçek mi, AI üretimi mi, emin değil miyiz?',
    'categories', jsonb_build_array('📷 Gerçek', '🤖 AI Üretimi', '❓ Şüpheli'),
    'description', '📷 Gerçek: Fotoğraf/video gerçek olaydan çekilmiş
🤖 AI Üretimi: Yapay zeka tarafından oluşturulmuş, gerçek değil
❓ Şüpheli: Kontrol etmeden emin olamayız',
    'items', jsonb_build_array(
      jsonb_build_object('item', 'Aile albümünüzdeki tatil fotoğrafları', 'category', '📷 Gerçek'),
      jsonb_build_object('item', 'Dinozorların şehirde yürüdüğü ultra gerçekçi video', 'category', '🤖 AI Üretimi'),
      jsonb_build_object('item', 'Ünlü birinin garip bir açıklama yaptığı ama kaynağı olmayan video', 'category', '❓ Şüpheli'),
      jsonb_build_object('item', 'ChatGPT nin yazdığı hikaye', 'category', '🤖 AI Üretimi'),
      jsonb_build_object('item', 'Haberde gördüğünüz deprem fotoğrafı (kaynak belirtilmemiş)', 'category', '❓ Şüpheli'),
      jsonb_build_object('item', 'Midjourney ile oluşturulmuş sanat eseri', 'category', '🤖 AI Üretimi'),
      jsonb_build_object('item', 'Kendi çektiğiniz kedi videosu', 'category', '📷 Gerçek'),
      jsonb_build_object('item', 'Sosyal medyada viral olan ama kimsenin kaynağını bilmediği şok görüntü', 'category', '❓ Şüpheli'),
      jsonb_build_object('item', 'Okulun resmi web sitesindeki etkinlik fotoğrafları', 'category', '📷 Gerçek'),
      jsonb_build_object('item', 'FaceApp ile yaşlandırılmış selfie', 'category', '🤖 AI Üretimi')
    )
  ),
  'info_cards', jsonb_build_array(
    jsonb_build_object(
      'question', '"Gerçek değil" ne demek?',
      'answer', 'Gerçekte olmayan ama varmış gibi gösterilen içerik.',
      'example', 'Abartılı videolar, şaşırtıcı haberler, "İnanamayacaksın!" diye başlayan içeriklerde.'
    ),
    jsonb_build_object(
      'question', 'Dijital olarak "düzenlenmiş" içerik ne demektir?',
      'answer', 'Üzerinde oynanmış, değiştirilmiş fotoğraf, video veya ses.',
      'example', 'Yüzü filtreyle tamamen değişmiş fotoğraflarda, rengi ve şekli abartılmış görüntülerde.'
    ),
    jsonb_build_object(
      'question', 'Filtre nedir?',
      'answer', 'Görüntünün üzerine eklenen süs, efekt veya düzeltme katmanı.',
      'example', 'Gözleri büyüten, cildi kusursuz yapan, hayvan kulakları ekleyen kamera efektlerinde.'
    ),
    jsonb_build_object(
      'question', 'Deepfake ne anlama gelir?',
      'answer', 'Birinin yüzünü ve sesini taklit eden, sahte ama gerçekçi görünen video.',
      'example', 'Bir kişinin aslında söylemediği sözleri söylüyormuş gibi gösteren videolarda.'
    ),
    jsonb_build_object(
      'question', 'Neden "Kaynak ne?" diye sormak önemli?',
      'answer', 'İçeriği kimin ürettiğini bilmek güvenilirliği anlamaya yardım eder.',
      'example', '"Bu haberi kim paylaşmış?", "Tanıdık bir kurum mu, yoksa isimsiz bir hesap mı?" diye baktığınızda.'
    ),
    jsonb_build_object(
      'question', 'Clickbait (tık tuzağı) nedir?',
      'answer', 'Çok abartılı başlıkla tıklatmaya çalışan ama içeriği zayıf olan paylaşım.',
      'example', '"Şok olacaksın!", "Doktorlar bile inanamadı!", "Sonuna kadar izleme!" gibi başlıklarda.'
    ),
    jsonb_build_object(
      'question', 'Kurgu ile gerçek arasındaki fark ne?',
      'answer', 'Kurgu, eğlenmek için uydurulmuş; gerçek, yaşanmış olaydır.',
      'example', 'Skeç videolarında, parodi hesaplarında, "Bu sadece mizah amaçlıdır" yazan içeriklerde.'
    ),
    jsonb_build_object(
      'question', '"Bu bana çok abartılı geliyor" demek neden önemli?',
      'answer', 'Abartı, genellikle içeriğin tam gerçek olmayabileceğine işaret eder.',
      'example', 'Uçan arabalar, olağanüstü güçler, mucize tedaviler, aşırı büyük para vaatleri içeren videolarda.'
    ),
    jsonb_build_object(
      'question', 'Bir içeriği kontrol etmek için ne yapabiliriz?',
      'answer', 'Farklı kaynaklara bakmak, arama motorunda haberin başlığını aratmak.',
      'example', '"Bu gerçekten olmuş mu?" diye merak ettiğinizde, başka sitelerde aynı haberi ararken.'
    ),
    jsonb_build_object(
      'question', 'Çocuğuma hangi temel cümleyi öğretebilirim?',
      'answer', '"Gördüğüm her şey gerçek olmayabilir, önce sorarım ve kontrol ederim."',
      'example', 'Çocuğun korkutan, şaşırtan veya çok ilginç gelen bir video/haberle karşılaştığında size gelip sormasında.'
    )
  ),
  'parent_guide', jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Yapay zeka artık çok gerçekçi görüntüler, videolar ve metinler üretebiliyor - çocukların neyin gerçek olduğunu ayırt etmesi kritik.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Deepfake ve AI-generated content, sahte ama gerçekçi içeriklerdir. Özellikle çocuklar için tehlikeli çünkü kolayca kandırılabilirler. Medya okuryazarlığı ve eleştirel düşünme becerileri, dijital çağda hayati önem taşıyor.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Artık bilgisayarlar, hiç olmayan şeyleri gerçek gibi gösterebiliyor. Mesela bir video görüyorsun, çok gerçek görünüyor ama aslında bilgisayar yapmış. Bu yüzden internetteki her şeye hemen inanmamalıyız.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Sosyal medyada viral video',
            'content', 'Çocuk şok edici bir video görüyor. Kaynağı yok, kimse nereden geldiğini bilmiyor. Büyük ihtimalle sahte veya bağlamından koparılmış.'
          ),
          jsonb_build_object(
            'title', 'AI sanat',
            'content', 'Midjourney ile uçan bir fil resmi yapılmış. Çok gerçekçi ama gerçek değil. Çocuk Bu gerçek mi? diye soruyor.'
          ),
          jsonb_build_object(
            'title', 'Deepfake ünlü',
            'content', 'Sevdiği bir YouTuber ın garip bir şey söylediği video dolaşıyor. Ama aslında deepfake, o kişi hiç öyle dememiş.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'İnternette gördüğün her şey gerçek mi?',
          'Bir video çok gerçekçi görünüyorsa, gerçek olduğundan emin olabilir miyiz?',
          'Şüphelendiğin bir şey gördüğünde ne yaparsın?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'right', 'Gördüğün her şeyi sorgulamak, akıllıca davranmaktır.',
            'wrong', 'İnternette gördüğün her şey gerçektir.'
          ),
          jsonb_build_object(
            'right', 'AI içerikler eğlenceli olabilir ama gerçek değildir.',
            'wrong', 'AI üretimi her zaman kötüdür.'
          )
        ),
        'footer', 'Medya okuryazarlığı, 21. yüzyılın en önemli becerisidir.'
      )
    )
  ),
  'video_section', jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/gercek-degil-anlamak.mp4',
    'duration', 210,
    'description', 'Deepfake nedir? AI üretimi içerikleri nasıl ayırt ederiz? Gerçek ile sahteyi ayırt etme becerisi kazanın!'
  ),
  'real_life_example', jsonb_build_object(
    'title', 'Gerçek Hayattan: Viral Sahte Video',
    'scenario', 'Çocuğunuz sosyal medyada şok edici bir video görüyor: "Dinozor bulundu!" Çok gerçekçi görünüyor, arkadaşları paylaşıyor.',
    'explanation', 'Birlikte videoyu inceleyin: Kaynak var mı? Haber sitelerinde var mı? Ters görsel arama yapın. Muhtemelen AI ile üretilmiş veya bağlamından koparılmış bir görüntü. Bu deneyim, çocuğa her viral içeriğe inanmaması gerektiğini öğretir.'
  )
)
WHERE id = '3883a806-4dda-44cb-b291-a4a987f9a3ba';
