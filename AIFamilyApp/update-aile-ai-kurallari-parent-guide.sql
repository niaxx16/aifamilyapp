-- Aile İçi AI Kuralları dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Aile içi AI kullanım kuralları, çocukların güvenli ve sorumlu şekilde yapay zeka araçlarını kullanmasını sağlar. Birlikte belirlenen net sınırlar hem güvenlik hem de dijital vatandaşlık açısından önemlidir.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Aile içi AI kuralları = ekran süresi, izin sistemi, paylaşım sınırları, uygun araçlar, ödev politikası, ihlal sonuçları. Kurallar yaşa göre farklılaşmalı, birlikte belirlen meli, esnek ve güncellenebilir olmalı. Net sınırlar çocukların güvenli AI kullanımını destekler, dijital vatandaşlık becerilerini geliştirir.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Evde AI kullanımı için kurallar koyacağız, ama bu senin cezalandırılman için değil, seni korumak ve doğru kullanmayı öğrenmek için. Mesela ChatGPT kullanırken kişisel bilgilerini paylaşmayacaksın. Veya günde belli bir süre AI araçlarını kullanabilirsin. Kuralları birlikte belirleyelim, böylece adil olur.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Ekran süresi kuralı',
            'content', '"AI araçlarını (ChatGPT, görüntü oluşturma vb.) günde toplam 1 saat kullanabilirsin. Eğer ödev için kullanıyorsan, birlikte konuşalım ve belki süreyi uzatabiliriz."'
          ),
          jsonb_build_object(
            'title', 'İzin sistemi',
            'content', '"Yeni bir AI uygulaması kullanmak istiyorsan, önce bana göster. Birlikte bakalım güvenli mi, yaşına uygun mu."'
          ),
          jsonb_build_object(
            'title', 'Paylaşım sınırları',
            'content', '"AI ile konuşurken adını, okulunun ismini, adresini asla söyleme. Sadece genel sorular sor, özel bilgi verme."'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence AI kullanımı için hangi kurallar olmalı? Neyi yasaklayalım, neyi serbest bırakalım?',
          'Eğer bir arkadaşın AI ile ödevini yaptırıyorsa, bu adil mi? Neden?',
          'Kuralları çiğnersen ne olması gerektiğini düşünüyorsun? Nasıl bir sonucu adil bulursun?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'AI kullanımını tamamen yasaklamalıyız.',
            'right', 'AI kullanımını dengeli ve güvenli hale getirmeliyiz. Yasaklamak yerine doğru kullanmayı öğretelim.'
          ),
          jsonb_build_object(
            'wrong', 'Çocuğum büyük, kendi başına karar verebilir.',
            'right', 'Çocuklar yaşları ne olursa olsun rehberliğe ihtiyaç duyar. Birlikte kural oluşturmak güven ve iletişimi güçlendirir.'
          )
        )
      )
    )
  )
)
WHERE title = 'Aile İçi AI Kuralları';
