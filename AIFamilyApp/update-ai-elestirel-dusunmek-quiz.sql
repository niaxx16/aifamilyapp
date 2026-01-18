-- AI'ya Karşı Eleştirel Düşünmek dersinin quiz bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'categorize',
    'question', 'AI sana bir bilgi verdiğinde tepkin ne olmalı?',
    'description', '✅ Doğru Tepki: Sorgulayan, kanıt arayan, çok kaynaklı yaklaşım\n⚠️ Kısmen Doğru: Bazı doğru adımlar ama eksik veya yetersiz\n❌ Yanlış Tepki: Körü körüne kabul, sorgulamama, tek kaynak',
    'categories', jsonb_build_array('✅ Doğru Tepki', '⚠️ Kısmen Doğru', '❌ Yanlış Tepki'),
    'items', jsonb_build_array(
      jsonb_build_object(
        'item', 'AI bir bilgi verdi, başka kaynaklardan da kontrol ediyorum',
        'category', '✅ Doğru Tepki'
      ),
      jsonb_build_object(
        'item', 'AI söyledi, doğrudur, hiç sorgulamıyorum',
        'category', '❌ Yanlış Tepki'
      ),
      jsonb_build_object(
        'item', 'AI nın cevabı mantıklı geldi ama yine de bir kez daha bakayım',
        'category', '✅ Doğru Tepki'
      ),
      jsonb_build_object(
        'item', 'AI güzel yazmış, doğru olduğunu varsayıyorum',
        'category', '❌ Yanlış Tepki'
      ),
      jsonb_build_object(
        'item', 'AI kaynak gösterdi ama kaynağın güvenilir olup olmadığını kontrol etmiyorum',
        'category', '⚠️ Kısmen Doğru'
      ),
      jsonb_build_object(
        'item', 'AI ya Bu bilginin kaynağı ne? diye soruyorum',
        'category', '✅ Doğru Tepki'
      ),
      jsonb_build_object(
        'item', 'AI bana tarih verdi, güncel mi diye kontrol ediyorum',
        'category', '✅ Doğru Tepki'
      ),
      jsonb_build_object(
        'item', 'AI nın dediklerini not alıyorum ama başka yere bakmıyorum',
        'category', '⚠️ Kısmen Doğru'
      ),
      jsonb_build_object(
        'item', 'AI iki farklı cevap verdi, hangisinin doğru olduğunu araştırıyorum',
        'category', '✅ Doğru Tepki'
      ),
      jsonb_build_object(
        'item', 'AI çok akıllı, her zaman doğruyu söyler',
        'category', '❌ Yanlış Tepki'
      )
    )
  )
)
WHERE id = 'd02905e1-0535-41d4-865b-eea3fc352329';
