-- Yapay Zekânın Süper Gücü: Veri dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Yapay zekânın süper gücü veridir; ne kadar çok ve doğru veri görürse, o kadar iyi tahmin yapar.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Veri = yazı, sayı, fotoğraf, ses, video gibi her tür bilgi. Yapay zekâ, binlerce/milyonlarca örneğe bakarak kalıpları öğrenir. Yanlış, eksik veya önyargılı veri → yanlış veya adaletsiz sonuçlar üretebilir.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Veri, yapay zekânın yediği yemek gibi. Ne kadar çok ve kaliteli yemek yerse, o kadar güçlü olur. Ama bozuk yemek yerse hasta olduğu gibi, yanlış verilere bakarsa da yanlış kararlar verebilir.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Video önerileri',
            'content', 'YouTube sana hangi videoları göstereceğine, senin daha önce neleri izlediğin verisine bakarak karar veriyor. Yani senin izleme verilerini kullanıyor.'
          ),
          jsonb_build_object(
            'title', 'Harita ve trafik',
            'content', 'Navigasyon, hangi yolda trafik olduğunu anlamak için yoldaki diğer araçlardan gelen hız ve konum verilerine bakıyor. Bu veriler olmasa, en hızlı yolu tahmin edemezdi.'
          ),
          jsonb_build_object(
            'title', 'Fotoğraf galerisinde yüz gruplama',
            'content', 'Telefonun Bu fotoğraflar annenle, bunlar seninle diye grupluyorsa, yüz verilerini kullanarak kim kimdir öğreniyor.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence bir yapay zekâ, hiç futbol maçı görmeden iyi bir yorum yapabilir mi?',
          'Eğer yapay zekâya hep tek tip insanın fotoğrafını gösterirsek, bu adil olur mu?',
          'Senin hakkında çok az veri olan bir uygulama, seni ne kadar iyi tanıyabilir?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Yapay zekâ kendi kendine bir anda akıllı oluyor.',
            'right', 'Yapay zekâ, gösterdiğimiz verilerden zamanla öğrenerek akıllanıyor.'
          ),
          jsonb_build_object(
            'wrong', 'Veri sadece teknik bir şey.',
            'right', 'Veri, bizim paylaştığımız fotoğraflar, yazdıklarımız, izlediklerimiz gibi hayatımızla ilgili parçalar. Bu yüzden ne paylaştığımıza dikkat etmek önemli.'
          )
        )
      )
    )
  )
)
WHERE id = '49b01d02-8ebf-4f0e-9d5b-d0fcd095e643';
