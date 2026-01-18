-- Algoritma: AI'ın Tarif Defteri dersinin quiz bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'categorize',
    'question', 'Aşağıdaki adımların sırası doğru mu, yanlış mı, yoksa sıra önemli değil mi?',
    'description', '✅ Doğru Sıra: Adımlar doğru sırada, sonuç başarılı\n❌ Yanlış Sıra: Adımlar yanlış sırada, sonuç hatalı olur\n🔄 Sıra Önemsiz: Hangi sırada olursa olsun sonuç aynı',
    'categories', jsonb_build_array('✅ Doğru Sıra', '❌ Yanlış Sıra', '🔄 Sıra Önemsiz'),
    'items', jsonb_build_array(
      jsonb_build_object(
        'item', 'Kek yaparken: Önce malzemeleri karıştır, sonra fırına koy, sonra pişir',
        'category', '✅ Doğru Sıra'
      ),
      jsonb_build_object(
        'item', 'Kek yaparken: Önce fırına koy, sonra karıştır, sonra malzemeleri al',
        'category', '❌ Yanlış Sıra'
      ),
      jsonb_build_object(
        'item', 'Alışveriş çantasına elma, ekmek ve peyniri herhangi bir sırada koy',
        'category', '🔄 Sıra Önemsiz'
      ),
      jsonb_build_object(
        'item', 'AI eğitimi: Önce veriyi topla, sonra modeli eğit, sonra test et',
        'category', '✅ Doğru Sıra'
      ),
      jsonb_build_object(
        'item', 'Diş fırçalama: Önce dişleri kurut, sonra fırçala, sonra macunu sür',
        'category', '❌ Yanlış Sıra'
      ),
      jsonb_build_object(
        'item', 'Oyun kurmak için: Önce oyna, sonra yükle, sonra indir',
        'category', '❌ Yanlış Sıra'
      ),
      jsonb_build_object(
        'item', 'Sınıftaki 5 arkadaşına doğum günü daveti dağıtıyorsun',
        'category', '🔄 Sıra Önemsiz'
      ),
      jsonb_build_object(
        'item', 'Hesap makinesinde 5+3 işlemi: Önce 5 e bas, sonra + ya bas, sonra 3 e bas',
        'category', '✅ Doğru Sıra'
      ),
      jsonb_build_object(
        'item', 'Müzik listesine şarkı ekliyorsun, hangi sırada olursa olsun hepsini dinleyebilirsin',
        'category', '🔄 Sıra Önemsiz'
      ),
      jsonb_build_object(
        'item', 'Robot süpürge: Önce temizle, sonra haritayı oluştur, sonra engelleri algıla',
        'category', '❌ Yanlış Sıra'
      )
    )
  )
)
WHERE id = '2fa783d4-0659-4855-a486-30e1964b6dfd';
