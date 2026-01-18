-- Kişisel Veri Nedir dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Kişisel veri nedir?',
      'answer', 'Seni tanımlayan bilgiler.',
      'example', 'İsim, doğum tarihi, fotoğraf, parmak izi.'
    ),
    jsonb_build_object(
      'question', 'Hangi veriler kişiseldir?',
      'answer', 'Kimliğinle ilgili her şey.',
      'example', 'E-posta, telefon, IP adresi, konum.'
    ),
    jsonb_build_object(
      'question', 'Neden korunmalı?',
      'answer', 'Kötüye kullanılabilir.',
      'example', 'Kimlik hırsızlığı, dolandırıcılık.'
    ),
    jsonb_build_object(
      'question', 'AI kişisel veriyi nasıl kullanır?',
      'answer', 'Seni tanır, tahmin yapar.',
      'example', 'İlgi alanlarına göre öneri sunar.'
    ),
    jsonb_build_object(
      'question', 'Görünmez veriler var mı?',
      'answer', 'Evet, davranış verileri.',
      'example', 'Tıklama, gezinme, arama geçmişi.'
    ),
    jsonb_build_object(
      'question', 'Çocukların verisi özel mi?',
      'answer', 'Ekstra koruma gerekir.',
      'example', 'KVKK ve GDPR çocuk hakları.'
    ),
    jsonb_build_object(
      'question', 'Veri silme hakkım var mı?',
      'answer', 'Evet, unutulma hakkı.',
      'example', 'Hesap silme, veri talebi.'
    ),
    jsonb_build_object(
      'question', 'Biyometrik veri nedir?',
      'answer', 'Fiziksel özellikler.',
      'example', 'Yüz tanıma, parmak izi, ses tonu.'
    ),
    jsonb_build_object(
      'question', 'Hassas veri ne demek?',
      'answer', 'Çok özel bilgiler.',
      'example', 'Sağlık, din, etnik köken.'
    ),
    jsonb_build_object(
      'question', 'Veri ihlali nedir?',
      'answer', 'Yetkisiz erişim.',
      'example', 'Şifrelerin çalınması, sızıntı.'
    )
  )
)
WHERE title = 'Kişisel Veri Nedir?';
