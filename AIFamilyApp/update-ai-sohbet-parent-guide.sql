-- AI ile Sohbet Etmek dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Yapay zekâ ile sohbet etmek, soru sorup fikir almak için güzel bir yol olabilir; ama o gerçek bir arkadaş değil, bir araçtır.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'YZ ile sohbet etmek, araştırma, fikir üretme, deneme-yanılma için faydalıdır. Ancak çocuk, YZ yi duygusal bir arkadaş, otorite ya da her şeyi bilen öğretmen olarak görmemelidir. Sınırlar: kişisel bilgi paylaşmama, körü körüne inanmama, tek kaynaktan beslenmeme.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Yapay zekâ ile konuşmak, akıllı bir sözlükle ya da fikir makinesiyle konuşmak gibi. Ondan fikir isteyebilirsin, sorular sorabilirsin ama o bir insan değil. En önemli kişi hâlâ sensin; kararları sen veriyorsun.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Masal yazdırmak',
            'content', 'Ona Bana uzayda geçen bir masal yaz diyebilirsin. Sonra birlikte Bu hikâyede neleri değiştirmek istersin? diye düşünebilirsiniz.'
          ),
          jsonb_build_object(
            'title', 'Soru sormak ama sorgulamak',
            'content', 'Tarih ya da bilimle ilgili bir soru sorduğunda, sonra bir kitaptan veya güvendiğin bir kaynaktan da kontrol ederek cevapları karşılaştırabilirsin.'
          ),
          jsonb_build_object(
            'title', 'Fikir istemek',
            'content', 'Resim çizerken Bana ilginç bir karakter fikri ver diyebilirsin. Ama hangisini kullanacağına yine sen karar veriyorsun.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Yapay zekâdan neler sormayı seviyorsun?',
          'Sence yapay zekânın verdiği her cevaba hemen inanmak doğru mu?',
          'Bir sorunun cevabını hem yapay zekâya hem kitaba sorsak, farklı olursa ne yaparız?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Yapay zekâ senin en iyi arkadaşın olabilir.',
            'right', 'Yapay zekâ, soru sorabileceğin bir araç; gerçek arkadaşların insanlar.'
          ),
          jsonb_build_object(
            'wrong', 'Ne sorarsan sor, her zaman doğrudur.',
            'right', 'Bazı cevaplar doğru, bazıları eksik olabilir. O yüzden kontrol etmek önemli.'
          )
        )
      )
    )
  )
)
WHERE id = 'c271bb84-53b8-476c-bba9-9c9ad0b9eb6f';
