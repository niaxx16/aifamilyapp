-- Veri Gizliliği ve Şirketler dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Şirketler veriyi neden toplar?',
      'answer', 'Para kazanmak için.',
      'example', 'Reklam, ürün geliştirme, satış.'
    ),
    jsonb_build_object(
      'question', 'Verini nasıl kullanıyorlar?',
      'answer', 'Profil oluşturma.',
      'example', 'İlgilerine göre reklam gösterme.'
    ),
    jsonb_build_object(
      'question', 'Ücretsiz uygulamalarda asıl ürün ne?',
      'answer', 'Senin verilen.',
      'example', '"Bedava" uygulama, verinle para kazanır.'
    ),
    jsonb_build_object(
      'question', 'Gizlilik sözleşmesi ne işe yarar?',
      'answer', 'Kuralları açıklar.',
      'example', 'Hangi veri toplanır, nasıl kullanılır.'
    ),
    jsonb_build_object(
      'question', 'Veri satışı yasal mı?',
      'answer', 'Bazen evet, bazen hayır.',
      'example', 'İzinle satılabilir, yasalara bağlı.'
    ),
    jsonb_build_object(
      'question', 'Çerezler (cookies) ne yapar?',
      'answer', 'Seni takip eder.',
      'example', 'Hangi siteleri gezdiğini kaydeder.'
    ),
    jsonb_build_object(
      'question', 'Veri paylaşımı nedir?',
      'answer', 'Başka şirketlere aktarma.',
      'example', 'Reklam ağlarıyla veri paylaşımı.'
    ),
    jsonb_build_object(
      'question', 'Veri güvenliği nedir?',
      'answer', 'Verileri koruma.',
      'example', 'Şifreleme, güvenlik duvarları.'
    ),
    jsonb_build_object(
      'question', 'KVKK/GDPR nedir?',
      'answer', 'Veri koruma yasaları.',
      'example', 'Kişisel verilerin yasal çerçevesi.'
    ),
    jsonb_build_object(
      'question', 'Veri ihlalinde ne olur?',
      'answer', 'Şirket ceza alır.',
      'example', 'Milyonlarca liralık para cezası.'
    )
  )
)
WHERE title = 'Veri Gizliliği ve Şirketler';
