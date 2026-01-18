-- Mahremiyetin İlk Adımı dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Mahremiyet nedir?',
      'answer', 'Özel bilgilerin korunması.',
      'example', 'İsim, adres, fotoğraf, telefon.'
    ),
    jsonb_build_object(
      'question', 'Dijital mahremiyet neden önemli?',
      'answer', 'Kötü niyetli kullanım riski.',
      'example', 'Dolandırıcılık, kimlik hırsızlığı.'
    ),
    jsonb_build_object(
      'question', 'Hangi bilgiler özeldir?',
      'answer', 'Kimlik bilgileri ve konum.',
      'example', 'Tam isim, ev adresi, okul adı.'
    ),
    jsonb_build_object(
      'question', 'AI uygulamalarında mahremiyet?',
      'answer', 'Verdiğin bilgiyi saklar.',
      'example', 'Chatbot konuşmaları, fotoğraflar.'
    ),
    jsonb_build_object(
      'question', 'İzin vermek nedir?',
      'answer', 'Kullanım hakkı tanımak.',
      'example', 'Konum, kamera, mikrofon erişimi.'
    ),
    jsonb_build_object(
      'question', 'Gizlilik ayarları ne işe yarar?',
      'answer', 'Kimin göreceğini belirler.',
      'example', 'Profil gizliliği, paylaşım ayarları.'
    ),
    jsonb_build_object(
      'question', 'Şifre neden önemli?',
      'answer', 'İlk savunma hattı.',
      'example', 'Güçlü şifre = daha zor kırılır.'
    ),
    jsonb_build_object(
      'question', 'Ne paylaşmamalıyım?',
      'answer', 'Hassas kişisel detaylar.',
      'example', 'Şifre, banka bilgisi, tam adres.'
    ),
    jsonb_build_object(
      'question', 'Yabancılarla bilgi paylaşımı?',
      'answer', 'Çok riskli.',
      'example', 'Online tanımadığın kişilere dikkat.'
    ),
    jsonb_build_object(
      'question', 'Aile kuralları neden gerekli?',
      'answer', 'Güvenli sınırlar oluşturur.',
      'example', 'Ne paylaşılır, ne paylaşılmaz.'
    )
  )
)
WHERE title = 'Mahremiyetin İlk Adımı';
