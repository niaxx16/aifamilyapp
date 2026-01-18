-- Doğru Bilgiyi Bulmak dersi için içerik ekleme
UPDATE lessons
SET module_content = jsonb_build_object(
  'quiz', jsonb_build_object(
    'type', 'matching',
    'question', 'Bilgi doğrulama yöntemlerini uygun durumlarla eşleştir!',
    'description', 'Sol taraftaki doğrulama yöntemini, sağ taraftaki durumla eşleştir.',
    'pairs', jsonb_build_array(
      jsonb_build_object(
        'id', 1,
        'left', 'ChatGPT bir tarihi olay anlattı',
        'right', 'Ansiklopedi veya güvenilir tarih sitesinden kontrol et'
      ),
      jsonb_build_object(
        'id', 2,
        'left', 'Sosyal medyada sağlık tavsiyesi gördün',
        'right', 'Doktor veya resmi sağlık sitesine danış'
      ),
      jsonb_build_object(
        'id', 3,
        'left', 'Viral bir haber gördün ama kaynak yok',
        'right', 'Güvenilir haber sitelerinde ara, bulunmazsa şüphelen'
      ),
      jsonb_build_object(
        'id', 4,
        'left', 'AI bir bilimsel gerçek söyledi',
        'right', 'Bilimsel makaleler veya eğitim sitelerinden doğrula'
      ),
      jsonb_build_object(
        'id', 5,
        'left', 'Bir fotoğrafın gerçek olup olmadığını merak ediyorsun',
        'right', 'Ters görsel arama yap, kaynağını bul'
      ),
      jsonb_build_object(
        'id', 6,
        'left', 'Arkadaşın sana şok edici bir bilgi söyledi',
        'right', 'Birden fazla kaynaktan kontrol et'
      ),
      jsonb_build_object(
        'id', 7,
        'left', 'AI matematik problemini çözdü',
        'right', 'Adımları kendin kontrol et veya başka hesap makinesiyle dene'
      ),
      jsonb_build_object(
        'id', 8,
        'left', 'Ünlü biri hakkında garip bir iddia okudun',
        'right', 'O kişinin resmi sosyal medya hesaplarına veya haber sitelerine bak'
      )
    )
  ),
  'info_cards', jsonb_build_array(
    jsonb_build_object(
      'question', 'Doğru bilgi ne demektir?',
      'answer', 'Gerçeklere dayanan, kanıtlanabilir ve tutarlı bilgi.',
      'example', 'Ders kitaplarında, resmî kurumların açıklamalarında, bilimsel kaynaklarda.'
    ),
    jsonb_build_object(
      'question', 'Neden tek kaynağa bakmak yeterli değil?',
      'answer', 'Tek kaynak hata, eksik bilgi veya yanlı bakış içerebilir.',
      'example', 'Bir haberi yalnızca tek bir sosyal medya hesabından görmek yerine, başka sitelerde de arama ihtiyacında.'
    ),
    jsonb_build_object(
      'question', 'Güvenilir kaynak ne demektir?',
      'answer', 'Kim olduğu belli, sorumluluk taşıyan ve denetlenebilen kişi/kurum.',
      'example', 'Resmî kurum siteleri, tanınmış eğitim/sağlık kuruluşları, bilinen yayınevleri.'
    ),
    jsonb_build_object(
      'question', 'Tarih bilgisi neden önemli?',
      'answer', 'Eski bir bilgi bugün için geçerli olmayabilir.',
      'example', 'Yıllar önce yazılmış bir sağlık ya da teknoloji yazısının hâlâ güncel sanılmasında.'
    ),
    jsonb_build_object(
      'question', 'Yapay zekâ verdiği cevaplarda hata yapabilir mi?',
      'answer', 'Evet, eksik, eski veya yanlış bilgi üretebilir.',
      'example', 'AI''den aldığınız cevabın öğretmeninizin anlattığıyla çelişmesi durumunda.'
    ),
    jsonb_build_object(
      'question', 'Neden "başka yerde de var mı?" diye bakmalıyız?',
      'answer', 'Bir bilginin birçok güvenilir kaynakta tekrarlanması, doğruluk ihtimalini artırır.',
      'example', 'Önemli bir haber ya da iddiayı hem haber sitelerinde, hem kurum açıklamalarında ararken.'
    ),
    jsonb_build_object(
      'question', '"Mantık süzgeci" ne demektir?',
      'answer', 'Bilgiyi akıl süzgecinden geçirip "Bu gerçekten olabilir mi?" diye sorgulamak.',
      'example', 'Mucize ilaç, çok kısa sürede zengin olma, aşırı abartılı iddialarla karşılaşıldığında.'
    ),
    jsonb_build_object(
      'question', 'Reklam ile bilgi arasındaki fark nedir?',
      'answer', 'Reklam ikna etmeye, bilgi bilgilendirmeye odaklanır.',
      'example', '"Bu ürünü hemen al" vurgulu metinler ile sade anlatan bilgilendirici yazılar arasındaki farkta.'
    ),
    jsonb_build_object(
      'question', 'Çocuğa hangi temel alışkanlığı kazandırmak isteriz?',
      'answer', '"Gördüğüm her şeye değil, kontrol ettiğime inanırım."',
      'example', 'Ödev cevabını, bir videodaki bilgiyi veya sosyal medyadaki iddiayı hemen kabul etmeden önce durup düşünmesinde.'
    ),
    jsonb_build_object(
      'question', 'Doğru bilgiyi ararken ebeveynin rolü nedir?',
      'answer', 'Yol göstermek, birlikte kontrol etmek ve iyi örnek olmak.',
      'example', 'Çocuğun "Bu doğru mu?" diye sorduğunda, "Birlikte bakalım" deyip kaynak kontrolünü onunla yapmanızda.'
    )
  ),
  'parent_guide', jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Çocuk artık sorularının cevabını önce ekranda arıyor. Ekranda gördüğü her bilgi doğru, tam ve tarafsız olmayabilir; yapay zekâ da hata yapabilir.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Çocuk artık sorularının cevabını önce ekranda arıyor. Ekranda gördüğü her bilgi doğru, tam ve tarafsız olmayabilir; yapay zekâ da hata yapabilir. Hedefimiz: "Tek cevaba bakıp hemen inanan çocuk" değil, "Bakıp, karşılaştırıp, sorgulayan çocuk." Bunun için: birden fazla kaynağa bakmak, kaynağın kim olduğunu sorgulamak ve "Bu mantıklı mı?" sorusunu alışkanlık haline getirmesini desteklemeliyiz.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Artık bir şey merak ettiğimizde hemen telefona, tablete bakıyoruz. Bu çok güzel, çünkü bilgiye çabuk ulaşabiliyoruz. Ama ekranda gördüğün her şeyin doğru olduğunu sanmak tehlikeli olabilir. Bazı bilgiler eksik, yanlış veya abartılı olabilir. O yüzden seninle şöyle bir kural yapalım: Bir bilgi gördüğünde hemen inanmak yerine, önce soralım: ''Bunu kim söylüyor? Başka nerede yazıyor? Mantıklı geliyor mu?'' Yani: ''Gördüm diye değil, kontrol ettim diye inanıyorum.'''
      ),
      jsonb_build_object(
        'icon', '📱',
        'title', 'Günlük Hayattan 3 Somut Örnek',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Ödev cevabı ararken',
            'content', 'Diyelim ki bir sorunun cevabını internette buldun. Hemen deftere yazmadan önce, aynı soruyu başka bir sitede de arayalım ya da not defterine/kitabına bakalım. Bakalım cevaplar birbirine benziyor mu?'
          ),
          jsonb_build_object(
            'title', 'Sağlıkla ilgili bir iddia',
            'content', 'İnternette ''Bu yiyecek her hastalığı iyileştirir'' gibi bir cümle gördüğünde önce birlikte düşünelim: ''Bu kadar mucize gibi bir şey doğru olabilir mi?'' Sonra da güvenilir bir sağlık kaynağına bakalım.'
          ),
          jsonb_build_object(
            'title', 'Şaşırtıcı bir haber/videoya rastladığında',
            'content', 'Eğer bir video ''Şok! Kimse inanamıyor!'' gibi çok abartılı başlıklarla geliyorsa, önce durup soralım: ''Bunu kim paylaşmış? Başka bir yerde de var mı? Yoksa sadece tıklatmak için mi böyle yazmışlar?'''
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Çocuğuma Sorabileceğim 3 Basit Soru',
        'questions', jsonb_build_array(
          'Bu bilgiyi kim söylemiş? Tanıdık, güvenilir bir yer mi?',
          'Bu bilgi başka bir yerde de aynı şekilde yazıyor mu?',
          'Bu sana mantıklı geliyor mu, yoksa biraz abartılı mı?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile Dikkat – Ne Demeli, Ne Dememeli?',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'right', 'İnternette çok faydalı bilgiler de var, yanlışlar da. Önemli olan, hangisinin hangisi olduğunu birlikte ayırt edebilmemiz.',
            'wrong', 'İnternettekilerin hepsi saçma, bakma.'
          ),
          jsonb_build_object(
            'right', 'AI bize fikir verebilir ama o da bazen yanılır. O yüzden ''AI böyle diyor, başka yerler ne diyor?'' diye bakarız.',
            'wrong', 'AI söylediğine göre doğrudur.'
          ),
          jsonb_build_object(
            'right', 'Ödevini hızlı bitirmekten daha önemlisi, doğru şeyi öğrenmen. O yüzden önce birlikte kontrol edelim.',
            'wrong', 'Ne bulursan yaz deftere, yeter ki bitsin.'
          )
        ),
        'footer', 'Bu alışkanlık, çocuğun tüm hayatı boyunca doğru kararlar almasını sağlar.'
      )
    )
  ),
  'video_section', jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/dogru-bilgiyi-bulmak.mp4',
    'duration', 190,
    'description', 'Doğru bilgiyi nasıl buluruz? Kaynak kontrolü nasıl yapılır? Fact-checking becerilerini geliştirin!'
  ),
  'real_life_example', jsonb_build_object(
    'title', 'Gerçek Hayattan: ChatGPT Tarihi Hata',
    'scenario', 'Çocuğunuz tarih ödevi için ChatGPT ye "Türkiye Cumhuriyeti ne zaman kuruldu?" diye soruyor. ChatGPT "1920" diyor.',
    'explanation', 'Yanlış! Doğrusu 1923. Birlikte ders kitabından veya TDK dan kontrol edin. AI bile yanılabilir. Bu deneyim, çocuğa her zaman kontrol etmesi gerektiğini öğretir. Ödevde AI kullanmak sorun değil, ama körü körüne güvenmek büyük hata!'
  )
)
WHERE id = '7e101e23-c06b-493c-9761-f95bb4568022';
