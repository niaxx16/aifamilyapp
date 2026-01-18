-- Aile İçi Yapay Zekâ Kuralları dersinin quiz bölümünü ekle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'true_false',
    'question', '',
    'items', jsonb_build_array(
      jsonb_build_object(
        'left', 'Yapay zekâyı tamamen yasaklamak, kurallı kullanmaktan daha güvenlidir.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'YZ ile ödevi baştan sona yazdırmak yerine, konuyu anlamak için kullanmalıyım.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Tam adımı, adresimi, okulumu ve telefonumu YZ''ye yazmamam gerekir.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'YZ her zaman doğru söyler, bu yüzden söylediklerine sorgulamadan inanmalıyım.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'YZ tuhaf veya rahatsız edici bir cevap verirse, bunu aileyle paylaşmalıyım.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Aile içi YZ kurallarını sadece ebeveynler belirlemeli, çocuklar söz sahibi olmamalı.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'YZ kullanımında son karar ailemde ve benimdir, YZ''de değil.',
        'right', '',
        'correct', true
      )
    )
  )
)
WHERE id = '56825e34-dd03-4078-9c9f-703512049ef8';
