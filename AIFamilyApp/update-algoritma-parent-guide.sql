-- Algoritma: AI'ın Tarif Defteri dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Algoritma, bir sonuca ulaşmak için adım adım izlenen yol; yapay zekâ için tarif defteri gibidir.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Algoritma = adım adım talimatlar dizisi. Bir işi hep aynı mantıkla yapmak için kullanılır (örn. sıralama, filtreleme, karar verme). Yapay zekâ, verilerle birlikte algoritmalar kullanarak karar süreçlerini otomatikleştirir.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Algoritma, bir işi yapmak için izlediğimiz adımların listesi. Mesela kek yapmak için tarif kitabında 1-2-3 diye yazan sırayı düşün. Yapay zekânın da kendi tarifleri var; bu tariflere algoritma diyoruz.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Kek tarifi',
            'content', 'Kek yaparken önce unu koy, sonra şekeri ekle, sonra karıştır, sonra fırına ver… Bu adımların hepsi bir algoritma gibi. Sıra değişirse sonuç bozulabilir.'
          ),
          jsonb_build_object(
            'title', 'Diş fırçalama rutini',
            'content', 'Dişini fırçalarken hep aynı sırayı izliyorsun: fırçayı ıslat, macunu sık, önden başla, sonra arkalar… Bu da senin kişisel algoritman gibi.'
          ),
          jsonb_build_object(
            'title', 'Sosyal medyada içerik sıralama',
            'content', 'Uygulama sana önce en çok beğenilmiş, sonra ilgini çekecek gönderileri gösteriyor. Arkada çalışan algoritma, hangi içeriğin önce, hangisinin sonra geleceğine karar veriyor.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence aynı tarifi iki kişi uygularsa, sonuç hep aynı olur mu? Neden?',
          'Eğer bir algoritma sadece en çok izleneni göster derse, bu her zaman iyi midir?',
          'Kendi günlük hayatında, hep aynı sırayla yaptığın bir şey söyleyebilir misin?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Algoritma çok kafa karıştırıcı bir şey.',
            'right', 'Algoritma, bir işi yaparken izlediğimiz adımların planı aslında.'
          ),
          jsonb_build_object(
            'wrong', 'Algoritma her zaman doğru kararı verir.',
            'right', 'Algoritma, verilen kurallara göre çalışır. Kurallar eksik veya yanlışsa, sonuç da yanlış veya adaletsiz olabilir.'
          )
        )
      )
    )
  )
)
WHERE id = '2fa783d4-0659-4855-a486-30e1964b6dfd';
