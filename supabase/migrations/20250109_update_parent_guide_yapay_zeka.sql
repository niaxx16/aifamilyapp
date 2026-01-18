-- Update "Yapay Zeka Nedir?" parent_guide with new card-based structure

UPDATE lessons
SET module_content = jsonb_set(
  module_content,
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'cards', jsonb_build_array(
      -- Kart 1: Ebeveyn için özet
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Yapay zekâ, bilgisayarların ve telefonların verilerden öğrenip tahmin yapabilmesi demek. İnsan gibi hissetmez, sadece gördüğü örneklere bakarak "bence cevap bu olabilir" der.'
      ),
      -- Kart 2: Çocuğa açıklama
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', '"Yapay zekâ, bilgisayarların beynine benziyor. Çok fazla örneğe bakarak bir süre sonra ''bunu daha önce görmüştüm'' deyip tahmin yapabiliyor. Yani sihir değil, çok çalışan bir bilgisayar."\n\nBunu söylerken elinle başını gösterip "beyin", telefon veya tableti gösterip "bilgisayarın beyni" diye işaret edebilirsin.'
      ),
      -- Kart 3: Günlük hayattan örnekler
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Video önerileri',
            'content', 'Fark ettin mi, sen çizgi film izledikçe sana benzer videolar çıkıyor. İşte bu, yapay zekânın "sen bunu seviyorsun galiba" diye tahmin etmesi.'
          ),
          jsonb_build_object(
            'title', 'Yüz tanıma',
            'content', 'Telefonun benim yüzümü görünce açılıyor ya, bu da yapay zekâ sayesinde. Yüzümü daha önceki fotoğraflardan öğreniyor.'
          ),
          jsonb_build_object(
            'title', 'Sesli asistan',
            'content', 'Telefon "Bugün hava 20 derece" dediğinde, aslında duyduğunu anlayan ve cevabı bulmaya çalışan bir yapay zekâ var.'
          )
        )
      ),
      -- Kart 4: Sorular
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence bir bilgisayar, yeni şeyler öğrenebilir mi? Nasıl öğrenir?',
          'Telefonun ya da tabletin, senin neleri sevdiğini fark etmiş olabilir mi?',
          'Yapay zekâ sence her zaman doğru mu bilir, yoksa bazen yanılabilir mi?'
        )
      ),
      -- Kart 5: Dile dikkat
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Yapay zekâ her şeyi bilir.',
            'right', 'Yapay zekâ çoğu zaman tahmin eder, bazen de yanlış yapabilir.'
          ),
          jsonb_build_object(
            'wrong', 'Yapay zekâ çok korkutucu.',
            'right', 'Yapay zekâ doğru kullanılırsa işimize yarayan bir araç, tıpkı elektrik gibi.'
          )
        ),
        'footer', 'Böylece merak duygusunu koruyup korku oluşturmamış olursun.'
      )
    )
  )
)
WHERE title = 'Yapay Zeka Nedir?';
