-- Öneri Sistemleri Nasıl Çalışır dersi için içerik ekleme
UPDATE lessons
SET module_content = jsonb_build_object(
  'quiz', jsonb_build_object(
    'type', 'true_false',
    'question', 'Öneri sistemleri hakkında aşağıdaki ifadeler doğru mu yanlış mı?',
    'items', jsonb_build_array(
      jsonb_build_object(
        'left', 'YouTube sadece izlediğim videoları baz alarak öneri yapar',
        'right', 'Yanlış',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Öneri sistemleri benim geçmiş davranışlarımdan öğrenir',
        'right', 'Doğru',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Netflix bana benzer insanların izlediklerini de önerebilir',
        'right', 'Doğru',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Spotify her zaman tamamen rastgele şarkı önerir',
        'right', 'Yanlış',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Öneri sistemleri bazen filtre balonu oluşturabilir',
        'right', 'Doğru',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Amazon sadece aradığım ürünleri önerir',
        'right', 'Yanlış',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Öneri algoritmaları hep en iyi sonucu verir',
        'right', 'Yanlış',
        'correct', false
      )
    )
  ),
  'info_cards', jsonb_build_array(
    jsonb_build_object(
      'question', 'Öneri sistemi nedir?',
      'answer', 'Ne seveceğimizi tahmin eden dijital yardımcı.',
      'example', '"Senin için seçtik", "Sana özel öneriler" yazan video, müzik, alışveriş bölümlerinde.'
    ),
    jsonb_build_object(
      'question', 'Öneri sistemi hangi bilgilere bakar?',
      'answer', 'Tıklama, izleme, arama ve beğeni davranışlarına.',
      'example', 'Hangi videoyu açtığımız, hangi ürüne uzun süre baktığımız, hangi şarkıyı tekrar dinlediğimizde.'
    ),
    jsonb_build_object(
      'question', '"Kullanıcı profili" ne demektir?',
      'answer', 'İlgi alanlarımızı özetleyen dijital portre.',
      'example', '"Sence şu tür filmleri seviyorsun" gibi otomatik tahminlerde.'
    ),
    jsonb_build_object(
      'question', 'Kişiselleştirme (personalization) nedir?',
      'answer', 'Her kişiye farklı içerik sunulması.',
      'example', 'Çocuğun izlediğine göre ana sayfanın değişmesi, bizim baktığımız ürünlere göre liste düzenlenmesi.'
    ),
    jsonb_build_object(
      'question', 'Filtre balonu (filter bubble) ne anlama gelir?',
      'answer', 'Hep benzer içeriklerin içinde sıkışmak.',
      'example', 'Bir süre sonra ana sayfada hep aynı tür video, haber veya ürünlerle karşılaşıldığında.'
    ),
    jsonb_build_object(
      'question', 'Öneri sistemi bir algoritma mıdır?',
      'answer', 'Evet, karar veren kural setidir.',
      'example', '"Şunu izleyenler bunları da izledi" veya "Bu ürünü alanlar şunları da aldı" listelerinde.'
    ),
    jsonb_build_object(
      'question', 'Makine öğrenmesi bu işin neresinde?',
      'answer', 'Veriden öğrenen öneri beyni.',
      'example', 'Zamanla önerilerin "bizi daha iyi tanıyormuş gibi" olmasında; sistem eski davranışlardan ders çıkarır.'
    ),
    jsonb_build_object(
      'question', 'Öneri sistemi sadece içerik mi önerir?',
      'answer', 'Hayır, ürün, kişi, uygulama da önerir.',
      'example', '"Bu kişiyle bağlantı kur", "Bu uygulamayı dene", "Bu oyunu seviyorsan şuna bak" ekranlarında.'
    ),
    jsonb_build_object(
      'question', 'Reklam ile öneri arasında fark var mı?',
      'answer', 'Reklam para ile öne çıkar, öneri davranışa göre.',
      'example', '"Sponsorlu" veya "Reklam" etiketi taşıyan içeriklerle, normal öneri listelerinin yan yana görünmesinde.'
    ),
    jsonb_build_object(
      'question', 'Kullanıcı öneri sistemini etkileyebilir mi?',
      'answer', 'Evet, tıklama ve ayarlarla yön verir.',
      'example', '"İlgilenmiyorum", "Bunu gösterme" seçeneklerine tıklayınca, geçmişi temizleyince veya izleme süresini değiştirince.'
    )
  ),
  'parent_guide', jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Öneri sistemleri, çocukların ne izlediğini öğrenerek benzer içerikler sunar; bu hem faydalı hem de dikkatli kullanılmalıdır.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Öneri sistemleri, "Neyi sevdiğini tahmin eden dijital yardımcılar" gibidir. Tıkladığın, izlediğin, dinlediğin, beğendiğin şeyleri izler; sonra "Bunu da seversin" diye yeni içerikler önerir. Avantajı: Aradığını hızlı bulursun. Riski: Hep benzer içerik gösterip çocuğu dar bir balonun içine sıkıştırabilir, süresini uzatabilir, her gösterilenin "iyi" olduğu hissini verebilir. Önemli nokta: Önerileri algoritma yapar, seçim ve sınır koyma aileye aittir.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Telefonun ya da tabletin, sana videoları, oyunları ve ürünleri rastgele göstermiyor. İçinde, neye tıkladığını ve neleri sevdiğini takip eden görünmez bir yardımcı var. Sen futbol videosu izlersen, "Demek ki bunu seviyor" deyip sana daha çok futbol videosu gösteriyor. Yani ekran, "Sen bunlara baktın, bunlara da bak istersin" diye tahmin yapıyor. Ama bu, karşına çıkan her şeyin senin için iyi, doğru veya faydalı olduğu anlamına gelmiyor. O yüzden birlikte karar veriyoruz: Neye bakacağız, ne kadar bakacağız, neye "hayır" diyeceğiz.'
      ),
      jsonb_build_object(
        'icon', '📱',
        'title', 'Günlük Hayattan 3 Somut Örnek',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Video uygulaması',
            'content', 'Çocuğun futbol/çizgi film/şaka videoları izledikçe ana sayfada hep benzer videolar görünmesi. "Bak, sen bu tür videoları izlediğin için ekran sana bunları önermeye devam ediyor."'
          ),
          jsonb_build_object(
            'title', 'Müzik uygulaması',
            'content', 'Bir şarkıyı çok dinleyince buna benzeyen şarkılarla otomatik liste oluşturması. "Sen bu tür şarkıları seviyorsun diye benzerlerini üst üste koyuyor."'
          ),
          jsonb_build_object(
            'title', 'Oyun ve alışveriş',
            'content', 'Bir oyuna veya oyuncak türüne bakınca "Bunu alanlar şunlara da baktı" tarzı listelerin çıkması. "Demek ki sen bu tarza ilgi duydun, sistem de aynı tarafa doğru seni çekmeye çalışıyor."'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Çocuğuma Sorabileceğim 3 Soru',
        'questions', jsonb_build_array(
          'Sence bu video/oyun/ürün neden karşına çıktı? (Cevabı "çünkü tıkladım / benzerini izledim" olsun diye yönlendirebilirsin.)',
          'Bu karşına çıkan şey senin için gerçekten iyi mi, yoksa sadece eğlenceli mi?',
          'Sadece bunun gibi şeylere bakarsan, acaba neleri kaçırıyor olabilirsin? (Farklı tür içerik denemesi için kapı açar.)'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile Dikkat – Ne Demeli, Ne Dememeli?',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'right', 'Uygulama, sen neye tıkladığına bakıp tahmin ediyor, bazen de yanılabiliyor.',
            'wrong', 'Uygulama seni çok iyi tanıyor, neyi sevdiğini biliyor.'
          ),
          jsonb_build_object(
            'right', 'Karşına çıkan her şey sana göre seçilmiş olabilir, ama bu hepsinin iyi ve doğru olduğu anlamına gelmez. O yüzden birlikte karar veriyoruz.',
            'wrong', 'Karşına çıkanlar sana uygundur, gönül rahatlığıyla izle.'
          ),
          jsonb_build_object(
            'right', 'Ekran sadece öneri yapıyor, asıl seçimi sen ve biz birlikte yapıyoruz.',
            'wrong', 'Ekran ne gösterirse onu izle.'
          )
        ),
        'footer', 'Bu sorular, çocuğun kafasında basit bir "eleştirel filtre" oluşturur.'
      )
    )
  ),
  'video_section', jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/oneri-sistemleri.mp4',
    'duration', 200,
    'description', 'YouTube, Netflix, Spotify nasıl ne izleyeceğinizi biliyor? Öneri algoritmalarının sırrını keşfedin!'
  ),
  'real_life_example', jsonb_build_object(
    'title', 'Gerçek Hayattan: YouTube Önerileri',
    'scenario', 'Çocuğunuz bir Minecraft videosu izliyor. Video bitince otomatik olarak başka bir Minecraft videosu başlıyor. Sonra bir başkası, bir başkası... Bir saatte 10 video izlemiş.',
    'explanation', 'YouTube öneri algoritması, çocuğunuzun Minecraft videolarını izlediğini öğreniyor ve benzer içerikler sunuyor. Ayrıca hangi videoları sonuna kadar izlediğini, hangilerinde çıktığını takip ediyor. Bu bilgilerle daha iyi öneriler yapıyor. Ama dikkat: bu bazen "video tuzağına" düşmeye neden olabilir!'
  )
)
WHERE id = 'e8642f64-b8bc-4e8d-ab0a-c5f28951d3d5';
