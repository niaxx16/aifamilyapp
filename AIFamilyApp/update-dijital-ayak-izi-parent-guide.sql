-- Dijital Ayak İzi dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Dijital ayak izi, internette yaptığımız her işlemin kaydıdır. Her tıklama, arama, beğeni ve paylaşım bir iz bırakır. Bu izler kalıcıdır ve dijital itibarımızı oluşturur.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Dijital ayak izi = internetteki tüm aktivitelerimizin kaydı. Aktif iz: bilinçli paylaşımlar (yorum, fotoğraf). Pasif iz: otomatik kayıtlar (IP adresi, gezinme geçmişi). Bu izler kalıcıdır, takip edilebilir ve gelecekte iş başvurularından sosyal ilişkilere kadar etki edebilir. Çocuklara dijital sorumluluğu öğretmenin temeli.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Dijital ayak izi, kumda yürürken bıraktığın ayak izleri gibi. İnternette her yaptığın şey bir iz bırakır: hangi sitelere girdin, ne aradın, neyi beğendin, ne yazdın… Hepsi kaydediliyor. Kumda ayak izleri silinebilir ama dijital izlerin çok uzun süre kalabilir. O yüzden dikkatli olmalısın.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Sosyal medya paylaşımı',
            'content', '"Bir fotoğraf paylaştığında, bu fotoğraf yıllarca orada kalabilir. Sildikten sonra bile başkaları kaydetmiş olabilir. Bu yüzden paylaşmadan önce düşünmelisin."'
          ),
          jsonb_build_object(
            'title', 'Arama geçmişi',
            'content', '"Google''da ne ararsan, Google bunu kaydeder. Hangi konulara ilgi duyduğunu öğrenir ve sana reklam gösterir. Bu senin dijital profilin."'
          ),
          jsonb_build_object(
            'title', 'Yorum yapmak',
            'content', '"Bir video altına yorum yaptığında, bu yorum senin adınla kalır. İleride biri senin hakkında araştırma yaparsa, bu yorumu görebilir."'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence sildiğin bir fotoğraf gerçekten yok olur mu? İnternetten tamamen silinir mi?',
          'Arama motorunda ne aradığın senin hakkında ne söyler?',
          'Yıllar sonra, paylaştığın bir şey sana zarar verebilir mi? Nasıl?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'İnternette yaptıklarım kimse görmez.',
            'right', 'İnternette yaptıkların kaydedilir, takip edilir ve gelecekte sana geri dönebilir.'
          ),
          jsonb_build_object(
            'wrong', 'Sildiğim şeyler tamamen yok olur.',
            'right', 'Silsen bile, kopyaları başka yerlerde kalabilir. Dijital izler kalıcıdır.'
          )
        )
      )
    )
  )
)
WHERE title = 'Dijital Ayak İzi';
