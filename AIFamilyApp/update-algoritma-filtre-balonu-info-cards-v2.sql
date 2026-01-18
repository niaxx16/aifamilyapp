-- Algoritma ve Filtre Balonu dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Algoritma nedir?',
      'answer', 'Bir platformun "Kime ne gösterelim?" sorusuna cevap veren görünmez kural seti.',
      'example', 'Video platformlarında, sosyal medyada, oyun mağazalarında önerilen içerik listelerinde.'
    ),
    jsonb_build_object(
      'question', 'Algoritma neleri takip eder?',
      'answer', 'Ne izlediğimizi, neye tıkladığımızı, neyi beğendiğimizi ve ne kadar süre baktığımızı.',
      'example', '"Senin için seçtik", "Bunları da sevebilirsin" gibi kişiselleştirilmiş bölümlerde.'
    ),
    jsonb_build_object(
      'question', 'Filtre balonu nedir?',
      'answer', 'Sadece belirli tür içerikleri görmemize neden olan daraltılmış dijital ortam.',
      'example', 'Çocuğun ekranında hep aynı tür videoların, aynı tarz içeriklerin görünmeye başlamasında.'
    ),
    jsonb_build_object(
      'question', 'Filtre balonu nasıl oluşur?',
      'answer', 'Algoritmanın, geçmiş tercihlere bakarak hep benzer içerikleri önermesiyle.',
      'example', 'Bir kez belli bir konuya takıldıktan sonra ana sayfanın neredeyse tamamen o konuyla dolmasında.'
    ),
    jsonb_build_object(
      'question', 'Filtre balonunun olumlu tarafı ne olabilir?',
      'answer', 'İlgi alanına uygun, sevdiği konularda içerikleri kolay bulmayı sağlar.',
      'example', 'Bilim, müzik, eğitim gibi faydalı konulara yoğunlaşıldığında gelen zengin önerilerde.'
    ),
    jsonb_build_object(
      'question', 'Filtre balonunun riskli tarafı nedir?',
      'answer', 'Çocuğun hep aynı bakış açısını görüp, dünyanın daha dar olduğunu sanması.',
      'example', 'Tek tip düşünce, aşırı şiddet veya toksik içeriklerin ekranda sürekli tekrar etmesinde.'
    ),
    jsonb_build_object(
      'question', 'Neden "Algoritma gösteriyor diye doğru" diyemeyiz?',
      'answer', 'Algoritma "doğruyu" değil, "ilgi çekici olanı" ve "tıklananı" öne çıkarır.',
      'example', 'Daha çok izlenen ama bilgi olarak hatalı veya abartılı videoların üst sıralarda görünmesinde.'
    ),
    jsonb_build_object(
      'question', 'Çocuğa hangi temel farkındalığı kazandırmak isteriz?',
      'answer', '"Ekranda gördüğüm şey, tüm dünya değil; algoritmanın seçtiği küçük bir parça."',
      'example', 'Çocuk "Herkes böyle düşünüyor" dediğinde, aslında hep aynı tür içerikleri gördüğünü fark ettirmeye çalışırken.'
    ),
    jsonb_build_object(
      'question', 'Filtre balonunu nasıl genişletebiliriz?',
      'answer', 'Farklı konular aratarak, farklı tür videolara, içeriklere bilinçli olarak bakarak.',
      'example', 'Beraber "bilim deneyleri, belgesel, müzik, spor" gibi yeni aramalar yapıp akışı çeşitlendirirken.'
    ),
    jsonb_build_object(
      'question', 'Çocuğa öğretebileceğimiz kısa cümle ne olabilir?',
      'answer', '"Sadece önüme geleni değil, merak ettiğimi de ararım."',
      'example', 'Ana sayfaya düşen içeriklere ek olarak, çocuğun kendi arama çubuğunu kullanmaya başladığı anlarda.'
    )
  )
)
WHERE id = '5ca103be-7cf2-4e33-a925-d9cb85356466';
