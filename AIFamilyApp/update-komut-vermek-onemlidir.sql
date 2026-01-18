-- Komut Vermek Önemlidir (Prompt Engineering) dersi için içerik ekleme
UPDATE lessons
SET module_content = jsonb_build_object(
  'quiz', jsonb_build_object(
    'type', 'categorize',
    'question', 'AI ya hangi komutlar daha iyi sonuç verir?',
    'categories', jsonb_build_array('✅ İyi Komut', '❌ Kötü Komut', '⚠️ Orta Komut'),
    'description', '✅ İyi Komut: Net, detaylı, bağlamlı
❌ Kötü Komut: Belirsiz, eksik, karışık
⚠️ Orta Komut: Anlaşılır ama geliştirilmeli',
    'items', jsonb_build_array(
      jsonb_build_object('item', 'Bir şey yaz', 'category', '❌ Kötü Komut'),
      jsonb_build_object('item', 'Bana 9 yaşındaki çocuklar için uzay hakkında 5 maddelik bilgi ver', 'category', '✅ İyi Komut'),
      jsonb_build_object('item', 'Masal anlat', 'category', '⚠️ Orta Komut'),
      jsonb_build_object('item', 'Bana ormanda geçen, bir tavşan ve tilkinin arkadaş olduğu kısa bir masal yaz', 'category', '✅ İyi Komut'),
      jsonb_build_object('item', 'Ne bileyim bir şeyler söyle', 'category', '❌ Kötü Komut'),
      jsonb_build_object('item', 'Dinozorlar hakkında bilgi ver', 'category', '⚠️ Orta Komut'),
      jsonb_build_object('item', 'T-Rex in boyutunu, yaşadığı dönemi ve ne yediğini basit cümlelerle açıkla', 'category', '✅ İyi Komut'),
      jsonb_build_object('item', 'Yardım et', 'category', '❌ Kötü Komut'),
      jsonb_build_object('item', 'Matematik ödevim için çarpma işlemini açıkla', 'category', '⚠️ Orta Komut'),
      jsonb_build_object('item', '3. sınıf seviyesinde, örneklerle 7x8 işlemini nasıl yapacağımı adım adım göster', 'category', '✅ İyi Komut')
    )
  ),
  'info_cards', jsonb_build_array(
    jsonb_build_object(
      'question', 'Komut (prompt) nedir?',
      'answer', 'Yapay zekâya verdiğimiz talep veya soru cümlesi.',
      'example', 'Sohbet ekranına "Bana 4. sınıf için kesir örnekleri üret" yazdığınızda, bu bir komuttur.'
    ),
    jsonb_build_object(
      'question', 'Neden net komut vermek önemlidir?',
      'answer', 'Ne kadar net olursak, çıkan sonuç o kadar işe yarar ve kontrollü olur.',
      'example', '"Soru yaz" yerine "5 tane, kısa, 4. sınıf seviyesinde Türkçe soru yaz" dediğinizde çok daha uygun içerik gelmesinde.'
    ),
    jsonb_build_object(
      'question', 'İyi bir komutta hangi soruların cevabı olmalı?',
      'answer', 'Ne istiyorum, kimin için istiyorum, nasıl istiyorum.',
      'example', '"9 yaş için, temel seviyede, madde madde açıklayan, örnekli bir özet yaz" gibi komutlarda.'
    ),
    jsonb_build_object(
      'question', 'Belirsiz komut neye yol açar?',
      'answer', 'Yarım, alakasız veya çok genel cevaplara.',
      'example', '"Sınavda çıkacak şeyleri yaz" gibi muğlak isteklerde, çıkan sonucun işine yaramamasında.'
    ),
    jsonb_build_object(
      'question', '"Yap ve bitir" komutları neden sakıncalı?',
      'answer', 'Çocuğun yerine düşünme ve üretme sorumluluğunu yapay zekâya verir.',
      'example', '"Bu kompozisyonu benim yerime yaz" dendiğinde, çocuk süreci hiç öğrenmeden sadece kopyaladığında.'
    ),
    jsonb_build_object(
      'question', 'Destekleyici komut nasıl olur?',
      'answer', 'Ödevi yapmak yerine, örnek ve açıklama isteyen komut.',
      'example', '"Bu problem türünden 3 örnek soru ve çözümlerini göster, sonra benzer bir soruyu çocuğum kendisi çözecek" dendiğinde.'
    ),
    jsonb_build_object(
      'question', 'Rol vererek komut vermek ne işe yarar?',
      'answer', 'Cevabın tonunu ve seviyesini ayarlamayı kolaylaştırır.',
      'example', '"5. sınıf fen öğretmeni gibi, çok basit bir dille açıkla" dediğinizde, daha anlaşılır cevap gelmesinde.'
    ),
    jsonb_build_object(
      'question', 'Komutta sınır koymak neden faydalı?',
      'answer', 'Uzunluk, tarz ve içerik sınırı, gereksiz kalabalığı engeller.',
      'example', '"En fazla 10 madde olsun, teknik terim kullanma, örnekleri günlük hayattan seç" diye eklediğinizde.'
    ),
    jsonb_build_object(
      'question', 'Komut verirken güvenlik için neye dikkat etmeliyiz?',
      'answer', 'Kişisel bilgi ve hassas detayları komuta yazmamalıyız.',
      'example', '"Benim çocuğum Ahmet, şu okulda, şu adreste okuyor, ona uygun etkinlikler yaz" diye ayrıntı vermekten kaçınmanızda.'
    ),
    jsonb_build_object(
      'question', 'Çocuğa komut yazdırmak hangi beceriyi geliştirir?',
      'answer', 'Düşünerek isteme, planlama ve kendini ifade etme becerisini.',
      'example', '"Şimdi birlikte yazalım: AI''dan ne isteyeceğiz, hangi seviyede, nasıl anlatmasını istiyoruz?" diye onu sürece katmanızda.'
    )
  ),
  'parent_guide', jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Yapay zekâ zihin okumuyor, sadece kendisine yazılan komutlara göre cevap üretiyor. Komut ne kadar net, açık ve ayrıntılı olursa, çıkan sonuç o kadar işe yarar oluyor.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Yapay zekâ zihin okumuyor, sadece kendisine yazılan komutlara göre cevap üretiyor. Komut ne kadar net, açık ve ayrıntılı olursa, çıkan sonuç o kadar işe yarar oluyor. "Ödevimi yap" yerine "4. sınıf, kesirler konusu, 5 tane örnek soru üret, cevapları en sonda ver" demek; hem daha kontrollü, hem daha eğitici. Hedef: Yapay zekâyı ödevini yapması için değil, çocuğun anlamasını desteklemesi için kullanmak.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Bak, bu yapay zekâ sihirli değil. Sen ne istersen onu anlamaya çalışıyor, ama aklını okumuyor. Eğer "Ödevimi yap" dersen, ne sınıfını bilir, ne konuyu, ne kaç soru istediğini… O yüzden ne istediğimizi net söylememiz gerekiyor. Mesela şöyle diyebilirsin: "5. sınıf düzeyinde, kesirlerle ilgili 5 tane örnek soru üret. Cevaplarını en sonda ver." Bu şekilde konuştuğunda hem daha iyi cevap alırsın hem de aslında söylemeden önce düşünmüş olursun: "Ben ne istiyorum, nasıl istiyorum?"'
      ),
      jsonb_build_object(
        'icon', '📱',
        'title', 'Günlük Hayattan 3 Somut Örnek',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Ödev örneği',
            'content', 'Kötü komut: "Fen ödevimi yap." Daha iyi komut: "6. sınıf düzeyinde, kuvvet ve hareket konusunda 3 örnek deney fikri ver. Her deneyin malzeme listesini ve 3 cümlelik açıklamasını yaz."'
          ),
          jsonb_build_object(
            'title', 'Özet isteme örneği',
            'content', 'Kötü komut: "Bu metni kısalt." Daha iyi komut: "4. sınıf öğrencisi için, 5 cümleyi geçmeyecek şekilde, en önemli fikirleri içeren kısa bir özet yaz."'
          ),
          jsonb_build_object(
            'title', 'Oyun tasarlama / etkinlik örneği',
            'content', 'Kötü komut: "Bir oyun bul." Daha iyi komut: "Evde hiçbir ekrana bakmadan oynayabileceğimiz, 10 dakikalık, 3 kişilik eğlenceli bir oyun öner. Kuralları adım adım açıkla."'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Çocuğuma Sorabileceğim 3 Yol Gösterici Soru',
        'questions', jsonb_build_array(
          'Şu anda tam olarak ne istiyorsun? Bilgi mi, örnek soru mu, oyun fikri mi?',
          'Bu cevabı kim kullanacak? Sen mi, arkadaşın mı, kaçıncı sınıf?',
          'Nasıl anlatmasını istersin? Kısa mı uzun mu, madde madde mi, hikâye gibi mi?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile Dikkat – Ne Demesem Daha İyi?',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'right', 'Önce ne istediğini birlikte düşünelim, sonra yazalım.',
            'wrong', 'Yaz gitsin, o halleder.'
          ),
          jsonb_build_object(
            'right', 'Ondan örnek isteyelim, ama ödevi sen kendin yap.',
            'wrong', 'Ödevini ona yaptır, bitsin.'
          ),
          jsonb_build_object(
            'right', 'Ne kadar net yazarsan, o kadar iyi cevap alırsın. Deneyelim, gerekirse ikinci komutla düzeltiriz.',
            'wrong', 'Yanlış yazarsan sorun değil, nasıl olsa düzeltir.'
          )
        ),
        'footer', 'Bu sorular, çocuğun önce kafasında netleştirmesini, sonra yazmasını sağlar.'
      )
    )
  ),
  'video_section', jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/komut-vermek-onemlidir.mp4',
    'duration', 150,
    'description', 'AI ya nasıl komut verirseniz, daha iyi sonuçlar alırsınız? Prompt engineering püf noktalarını öğrenin!'
  ),
  'real_life_example', jsonb_build_object(
    'title', 'Gerçek Hayattan: Ödev Yardımı',
    'scenario', 'Çocuğunuz ChatGPT ye Matematik ödevime yardım et yazıyor. AI genel bir cevap veriyor. Çocuk hayal kırıklığına uğruyor.',
    'explanation', 'Komut çok belirsiz. Eğer 2. sınıf seviyesinde, çarpma tablosu için oyun fikirleri ver deseydi, çok daha faydalı bir cevap alırdı. AI ne istediğinizi bilmiyor, siz söylemelisiniz. Bu, hem AI kullanımını hem de net ifade etme becerisini geliştirir.'
  )
)
WHERE id = '9fc09aa8-efce-4930-b283-d0df6b94f00a';
