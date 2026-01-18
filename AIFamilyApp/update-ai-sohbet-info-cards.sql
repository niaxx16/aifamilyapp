-- AI ile Sohbet Etmek dersinin info_cards bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'AI ile sohbet neden faydalı?',
      'answer', 'Hızlı fikir/yanıt.',
      'example', 'Ödev fikri, yazı taslağı, plan oluşturma.'
    ),
    jsonb_build_object(
      'question', 'Kişisel bilgi vermeli miyim?',
      'answer', 'Hayır, paylaşma.',
      'example', 'Adres, okul, TC, fotoğraf gibi veriler.'
    ),
    jsonb_build_object(
      'question', 'İyi bir istem (prompt) nasıl olur?',
      'answer', 'Net ve bağlamlı.',
      'example', '5 madde, 100 kelime, 9 yaşa uygun.'
    ),
    jsonb_build_object(
      'question', 'Çoklu tur sohbet ne sağlar?',
      'answer', 'Daha iyi doğruluk.',
      'example', 'Önce özetle, sonra örnek ver.'
    ),
    jsonb_build_object(
      'question', 'Her cevap kesin doğru mu?',
      'answer', 'Hayır, tahmin.',
      'example', 'Kaynak iste, ikinci kaynakla kontrol.'
    ),
    jsonb_build_object(
      'question', 'Rol vererek konuşmak işe yarar mı?',
      'answer', 'Evet, odak sağlar.',
      'example', 'Fen öğretmeni gibi açıkla.'
    ),
    jsonb_build_object(
      'question', 'Sınırlar nasıl belirlenir?',
      'answer', 'Kısıt ekle.',
      'example', '100 kelime, tablo, emoji yok.'
    ),
    jsonb_build_object(
      'question', 'Uygunsuz içerik üretirse?',
      'answer', 'Durdur/raporla.',
      'example', 'Yeni sohbet aç, filtreleri kullan.'
    ),
    jsonb_build_object(
      'question', 'Kaynaklı yanıt nasıl isterim?',
      'answer', 'Kanıt talep et.',
      'example', 'Kaynak linki/isim ver.'
    ),
    jsonb_build_object(
      'question', 'Çocuklar için altın kural?',
      'answer', 'Sorgula, paylaşma.',
      'example', 'Doğru mu?, Gereksiz bilgi verme.'
    )
  )
)
WHERE id = 'c271bb84-53b8-476c-bba9-9c9ad0b9eb6f';
