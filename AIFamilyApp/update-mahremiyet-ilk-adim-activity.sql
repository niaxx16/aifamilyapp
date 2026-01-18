-- Mahremiyetin İlk Adımı dersinin activity bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{activity}',
  jsonb_build_object(
    'title', '🎯 Bilgi Kartları: Güvenli mi, Gizli mi?',
    'duration', '10-15 dakika',
    'materials', jsonb_build_array(
      'Kağıt veya kartlar (10-15 adet)',
      'Kalem veya renkli kalemler',
      '2 kutu veya zarflar (Yeşil: Güvenli, Kırmızı: Gizli)'
    ),
    'objective', 'Ebeveyn ve çocuk birlikte hangi bilgilerin güvenle paylaşılabileceğini, hangilerinin özel tutulması gerektiğini öğrenir. Kavramları somutlaştırarak pekiştirir.',
    'steps', jsonb_build_array(
      jsonb_build_object(
        'step', 1,
        'title', 'Bilgi kartlarını hazırlayın',
        'description', 'Her karta bir bilgi türü yazın. Örnek: "Adın", "Sevdiğin renk", "Ev adresi", "Okul adı", "Favori hayvan", "Telefon numarası", "Şifre", "Doğum günü", "En sevdiğin oyun", "Sınıfın", "Anne-babanın mesleği", "Hobiler"'
      ),
      jsonb_build_object(
        'step', 2,
        'title', 'İki kategori belirleyin',
        'description', 'Yeşil kutu: "PAYLAŞMAK GÜVENLİ" (Genel bilgiler) / Kırmızı kutu: "GİZLİ TUTMALI" (Kişisel/Hassas bilgiler)'
      ),
      jsonb_build_object(
        'step', 3,
        'title', 'Birlikte sınıflandırın',
        'description', 'Her kartı çocukla birlikte okuyun. "Bu bilgiyi internette bir oyuna yazsan ne olur?" diye sorun. Birlikte karar vererek yeşil veya kırmızı kutuya koyun.'
      ),
      jsonb_build_object(
        'step', 4,
        'title', 'Tartışın ve pekiştirin',
        'description', 'Kırmızı kutudaki bilgilere tekrar bakın. "Neden bunlar özel?" sorusunu sorun. Çocuğun kendi cümleleriyle açıklamasını sağlayın. "Tam adres neden tehlikeli olabilir?" gibi sorular sorun.'
      ),
      jsonb_build_object(
        'step', 5,
        'title', 'Kuralı oluşturun',
        'description', 'Etkinlik sonunda çocukla birlikte basit bir kural yazın: "İnternette ASLA şunu paylaşmam: Tam adım, adresim, telefon numaram, şifrelerim, okul ve sınıf bilgim" ve bunu görünür bir yere asın.'
      )
    ),
    'discussion_points', jsonb_build_array(
      '💬 "Sevdiğin renk ile ev adresin arasında ne fark var? Hangisini herkesle paylaşabilirsin?"',
      '💬 "Biri internette sana okulunun adını sorarsa ne dersin?"',
      '💬 "Şifreni en yakın arkadaşınla bile paylaşmamalısın, neden?"'
    ),
    'expected_outcome', 'Çocuk, hangi bilgilerin "genel ve zararsız", hangilerinin "özel ve korunmalı" olduğunu somut örneklerle ayırt edebilir hale gelir. Ebeveyn de günlük hayatta bu ayrımı çocuğa hatırlatma fırsatı yakalar.',
    'tips', jsonb_build_array(
      '✅ Çocuğun yaşına göre kart sayısını ayarlayın (küçükler için 6-8 kart yeterli)',
      '✅ Yargılamadan, oyun havasında yapın',
      '✅ Yanlış cevaplarda "Hayır, yanlış!" demeyin, "Hmm, bir daha düşünelim" deyin',
      '✅ Etkinlik sonunda kartları bir zarfta saklayın, ilerleyen haftalarda tekrar oynatabilirsiniz'
    )
  )
)
WHERE id = 'f0d8e748-3034-4b42-bfcb-6af23fb9be9b';
