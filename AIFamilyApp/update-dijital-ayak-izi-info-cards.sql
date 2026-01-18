-- Dijital Ayak İzi dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Dijital ayak izi nedir?',
      'answer', 'İnternette bıraktığın izler.',
      'example', 'Tıklamalar, beğeniler, aramalar.'
    ),
    jsonb_build_object(
      'question', 'Aktif vs. pasif iz farkı?',
      'answer', 'Bilinçli vs. otomatik.',
      'example', 'Yorum yazmak vs. IP kaydı.'
    ),
    jsonb_build_object(
      'question', 'Neden önemli?',
      'answer', 'Kalıcı ve takip edilebilir.',
      'example', 'Yıllar sonra bile bulunabilir.'
    ),
    jsonb_build_object(
      'question', 'Sosyal medya ve dijital iz?',
      'answer', 'Her paylaşım kalıcıdır.',
      'example', 'Fotoğraf, yorum, beğeni.'
    ),
    jsonb_build_object(
      'question', 'Arama geçmişi neden önemli?',
      'answer', 'İlgi alanlarını ortaya koyar.',
      'example', 'Google, Bing aramalarınızı saklar.'
    ),
    jsonb_build_object(
      'question', 'Dijital izi temizleyebilir miyiz?',
      'answer', 'Kısmen evet.',
      'example', 'Hesap silme, veri talepizleri.'
    ),
    jsonb_build_object(
      'question', 'Meta veri nedir?',
      'answer', 'Veri hakkında veri.',
      'example', 'Fotoğraf çekim yeri, zamanı.'
    ),
    jsonb_build_object(
      'question', 'Online alışveriş izi?',
      'answer', 'Ne aradığın, ne aldığın.',
      'example', 'Sepet geçmişi, ödeme bilgisi.'
    ),
    jsonb_build_object(
      'question', 'Dijital itibar nedir?',
      'answer', 'Online imajın.',
      'example', 'Paylaşımların seni temsil eder.'
    ),
    jsonb_build_object(
      'question', 'Geleceğe etkisi var mı?',
      'answer', 'Evet, iş başvurularında.',
      'example', 'İşverenler sosyal medyaya bakar.'
    )
  )
)
WHERE title = 'Dijital Ayak İzi';
