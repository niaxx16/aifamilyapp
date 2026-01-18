-- Deepfake dersinin quiz bölümünü ekle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'true_false',
    'question', '',
    'items', jsonb_build_array(
      jsonb_build_object(
        'left', 'Bir video çok gerçek görünüyorsa kesinlikle gerçektir, sahte olamaz.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Deepfake videolar sadece ünlü kişiler için yapılır, sıradan insanlar için yapılmaz.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Şüpheli bir video görünce hemen paylaşmak yerine önce bir yetişkine danışmalıyım.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Deepfake videolar sadece eğlence amaçlı kullanılır, zararlı değildir.',
        'right', '',
        'correct', false
      ),
      jsonb_build_object(
        'left', 'Bir videonun kaynağını ve güvenilirliğini kontrol etmek önemlidir.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Aşırı şaşırtıcı veya öfkelendirici videolarda daha dikkatli olmalıyım.',
        'right', '',
        'correct', true
      ),
      jsonb_build_object(
        'left', 'Bir videoda dudak hareketleri ile ses uyumsuzsa, bu deepfake işareti olabilir.',
        'right', '',
        'correct', true
      )
    )
  )
)
WHERE id = '602491e1-39e2-4df3-ad84-a2fb79cd4397';
