-- Algoritma ve Filtre Balonu dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Algoritma = Platformun "Bu çocuğa şimdi ne gösterelim?" sorusuna cevap veren görünmez kural seti. Filtre balonu = Hep aynı tür içeriklerin gösterildiği, ekranın "dünyanın küçük bir parçasına" dönüştüğü durum. Amacımız: "Ekranda gördüğüm her şey dünya değil, algoritmanın seçtiği küçük bir parça." farkındalığını kazandırmak.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Kısa Özet (Ebeveyn)',
        'content', 'Algoritma = Platformun "Bu çocuğa şimdi ne gösterelim?" sorusuna cevap veren görünmez kural seti. Çocuğun ne izlediğini, neye tıkladığını, neleri beğendiğini ve ne kadar süre baktığını izleyip buna göre öneri yapar. Filtre balonu = Hep aynı tür içeriklerin gösterildiği, ekranın "dünyanın küçük bir parçasına" dönüştüğü durum. Amacımız: "Ekranda gördüğüm her şey dünya değil, algoritmanın seçtiği küçük bir parça." farkındalığını çocuğa kazandırmak.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Telefonunda ya da tabletinde bazen fark etmişsindir: Bir konuya takılınca, karşına hep o konuyla ilgili videolar çıkmaya başlıyor. İşte bunun sebebi algoritma. Algoritma, senin neleri izlediğine bakıp ''Demek ki bunları seviyor, o zaman benzerlerini göstereyim'' diyen görünmez bir yardımcı gibi. Bu bazen güzel; sevdiklerini daha kolay bulmanı sağlıyor. Ama bir de şöyle bir tarafı var: Hep aynı tür videoları izlemeye başlarsan, ekran sanki küçük bir balona dönüşüyor. Biz buna filtre balonu diyoruz. Yani sen sadece o balonun içindekileri görüyorsun, başka konuları, başka fikirleri daha az görüyorsun. Oysa dünya, ekranındaki o küçük parçadan çok daha büyük ve çok daha çeşitli. O yüzden sadece önüme gelenleri değil, merak ettiğim farklı şeyleri de kendim aramayı öğrenmen çok önemli.'
      ),
      jsonb_build_object(
        'icon', '📱',
        'title', 'Günlük Hayattan 3 Somut Örnek',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Hep aynı tür kısa videolar',
            'content', 'Diyelim ki uzun süre sadece komik kısa videolar izledin. Bir süre sonra ana sayfanda neredeyse sadece komik videolar belirmeye başlar. İşte algoritma şöyle der: ''Bu çocuk onları seviyor, hep onu göstereyim.'' Ama bilim, sanat, oyun geliştirici videolar gibi başka şeyleri daha az görmeye başlarsın.'
          ),
          jsonb_build_object(
            'title', 'Sadece tek bir fikirle ilgili videolar',
            'content', 'Bir konu hakkında hep aynı fikri savunan videolar izlersen, algoritma o fikri güçlendiren videoları öne çıkarır. Böylece sanki dünya üzerinde herkes öyle düşünüyormuş gibi hissedebilirsin. Oysa başka bakış açıları da var.'
          ),
          jsonb_build_object(
            'title', 'Balonu genişletmek',
            'content', 'Bazen bilerek yeni şeyler aramak balonu genişletir. Örneğin bir gün komik videolar, ertesi gün bilim deneyi, sonra bir belgesel ararsan ekranın daha renkli ve dengeli olur.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Çocuğuma Sorabileceğim 3 Basit Soru',
        'questions', jsonb_build_array(
          'Sence neden hep bu tür videolar karşına çıkıyor olabilir?',
          'Bu gördüklerin, sence dünyanın tamamını mı gösteriyor, yoksa sadece bir kısmını mı?',
          'Bugün ekranındaki balonu biraz genişletmek için farklı bir konuda video aramak ister misin?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile Dikkat – Ne Demeli, Ne Dememeli?',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Telefon seni kandırıyor, hiçbir şeye güvenme.',
            'right', 'Telefon sana sevdiğin şeylere benzeyen videolar getirmeye çalışıyor, ama bu gördüklerinin hepsi değil, sadece bir kısmı. Bazen senin de yeni şeyler araman çok iyi olur.'
          ),
          jsonb_build_object(
            'wrong', 'Hep aynı videolara bakma, yasak!',
            'right', 'Bu videoları seviyorsun, anlıyorum. Ama istersen beraber farklı konular da keşfedelim, dünyanı biraz daha genişletelim.'
          ),
          jsonb_build_object(
            'wrong', 'Algoritma, filtre balonu… Sen anlamazsın.',
            'right', 'Bu kelimeler zor gibi durabilir ama aslında basit: Telefon senin neyi sevdiğini kendi kendine tahmin etmeye çalışıyor. İstersen birlikte bakıp nasıl çalıştığını çözebiliriz.'
          )
        )
      )
    )
  )
)
WHERE id = '5ca103be-7cf2-4e33-a925-d9cb85356466';
