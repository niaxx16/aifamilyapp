-- Algoritma ve Filtre Balonları dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Filtre balonu, algoritmaların sadece ilgi alanlarımıza uygun içerikleri göstermesiyle oluşan bilgi hapsidir. Bu durum bakış açımızı daraltır ve eleştirel düşünmeyi zorlaştırır.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Filtre balonu = algoritmalar kullanıcı davranışlarına göre kişiselleştirme yaparak sadece benzer içerikleri gösterir. Echo chamber (yankı odası) etkisi yaratır: sadece aynı fikirleri duyarsın. Polarizasyon, önyargı ve dar dünya görüşü riski var. Çocuklara farklı bakış açılarını aramayı, eleştirel düşünmeyi öğretmek çok önemli.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Filtre balonu, etrafında görünmez bir balon olduğunu düşün. YouTube, TikTok gibi uygulamalar senin sevdiğin şeyleri gösteriyor. Bu güzel gibi görünür ama sorun şu: farklı şeyleri görmüyorsun. Sadece senin gibi düşünen insanları, senin sevdiğin videoları görüyorsun. Bu da dünyayı tek taraflı görmene neden olur.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'YouTube önerileri',
            'content', '"Bir kez oyun videosu izlersen, sürekli oyun videoları önerilir. Belgesel, bilim, sanat videoları önerilmez. Böylece sadece oyun dünyasında kalırsın."'
          ),
          jsonb_build_object(
            'title', 'Haber akışı',
            'content', '"Sosyal medyada hep benzer haberleri görüyorsan, farklı bakış açılarını kaçırıyorsun demektir. Herkes aynı şeyi düşünüyor gibi gelir ama aslında öyle değil."'
          ),
          jsonb_build_object(
            'title', 'Arama sonuçları',
            'content', '"Google bile sana özel sonuçlar gösterir. Başka biri aynı şeyi aratsa, farklı sonuçlar görebilir. Bu da herkesin farklı bir gerçeklik görmesi demek."'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence sürekli aynı tarz videoları izlemek iyi mi? Neden farklı şeyler izlemek önemli?',
          'YouTube sana sadece sevdiğin videoları gösterirse, yeni şeyler öğrenemez misin?',
          'Herkesin farklı haberler görmesi nasıl bir problem yaratabilir?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Algoritma bana en iyiyi gösteriyor.',
            'right', 'Algoritma sana en çok ilgini çekeni gösteriyor, ama bu her zaman en doğru veya en faydalı değildir.'
          ),
          jsonb_build_object(
            'wrong', 'Hep aynı tür içerik izlemek sorun değil.',
            'right', 'Farklı konularda içerik izlemek, dünyayı daha geniş açıdan görmeni sağlar. Eleştirel düşünmek için çeşitlilik şart.'
          )
        )
      )
    )
  )
)
WHERE title = 'Algoritma ve Filtre Balonları';
