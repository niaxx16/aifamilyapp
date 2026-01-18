-- AI Hata Yapabilir dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Yapay zekâ her zaman doğru bilmez, sadece tahmin eder. Yanılabilir ve bu normaldir.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'YZ, gördüğü verilerden tahmin üretir; garanti doğru değildir. Eksik, eski veya hatalı veri → yanlış sonuç üretmesine yol açar. Bu yüzden YZ nin cevapları kontrol edilmeli, son söz olarak görülmemelidir.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Yapay zekâ, çok okumuş ama bazen yanlış anlayan biri gibi. Bildiği şeylere bakarak cevap vermeye çalışıyor ama her zaman doğru olmayabiliyor. O yüzden Bu cevabı bir de kendim kontrol edeyim demek önemli.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Yanlış şarkı önerisi',
            'content', 'Bazen hiç sevmediğin bir şarkı öneriliyor ya, işte yapay zekâ sen bunu seversin diye tahmin etmiş ama yanılmış.'
          ),
          jsonb_build_object(
            'title', 'Yanlış yazım düzeltme',
            'content', 'Telefon bazen yazdığın kelimeyi yanlışlıkla başka bir şeye çeviriyor. Bu da bence böyle yazacaktın deyip hata yapması.'
          ),
          jsonb_build_object(
            'title', 'Harita yanlışı',
            'content', 'Navigasyon bazen gereksiz uzun yoldan götürebiliyor. Trafiği, yolları yanlış tahmin ettiği için senin için en iyi yolu bulamamış olabiliyor.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence bir insan hiç hata yapmaz mı? Ya yapay zekâ?',
          'Bir yapay zekâ sana tuhaf bir cevap verdiğinde ne yaparsın?',
          'Sence yapay zekâ neden bazen yanılıyor olabilir?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Yapay zekâ mükemmel.',
            'right', 'Yapay zekâ çoğu zaman işe yarar, ama yanlış yapması da normal.'
          ),
          jsonb_build_object(
            'wrong', 'Yanlış yaptı, demek ki çok kötü.',
            'right', 'Hata yapınca Nerede yanıldı? diye düşünmek, onu daha iyi anlamamıza yardım eder.'
          )
        )
      )
    )
  )
)
WHERE id = 'cecf2a61-2b37-4c62-98a5-a85e7c6be391';
