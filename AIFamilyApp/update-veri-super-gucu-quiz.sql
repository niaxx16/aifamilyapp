-- Yapay Zekânın Süper Gücü: Veri dersinin quiz bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'categorize',
    'question', 'Aşağıdaki durumları incele ve veri kalitesi açısından değerlendir!',
    'description', '✅ Kaliteli Veri: Çeşitli, doğru ve yeterli miktarda veri\n⚖️ Önyargılı Veri: Tek taraflı, adaletsiz sonuç üretebilecek veri\n⚠️ Eksik/Hatalı Veri: Güncel olmayan, eksik veya yanlış bilgi içeren veri',
    'categories', jsonb_build_array('✅ Kaliteli Veri', '⚖️ Önyargılı Veri', '⚠️ Eksik/Hatalı Veri'),
    'items', jsonb_build_array(
      jsonb_build_object(
        'item', 'Bir yüz tanıma sistemi için 50 bin farklı yaş, cinsiyet ve ırktan insanın fotoğrafı kullanılıyor',
        'category', '✅ Kaliteli Veri'
      ),
      jsonb_build_object(
        'item', 'Müzik öneri sistemi sadece 2020-2023 arası şarkıları biliyor',
        'category', '⚠️ Eksik/Hatalı Veri'
      ),
      jsonb_build_object(
        'item', 'İş başvuru değerlendirme AI ı sadece erkek yöneticilerin kararlarından öğrenmiş',
        'category', '⚖️ Önyargılı Veri'
      ),
      jsonb_build_object(
        'item', 'Hastalık teşhis sistemi 5 milyon farklı hastanın verisiyle eğitilmiş',
        'category', '✅ Kaliteli Veri'
      ),
      jsonb_build_object(
        'item', 'Kredi değerlendirme sistemi sadece zengin semtlerden veri toplamış',
        'category', '⚖️ Önyargılı Veri'
      ),
      jsonb_build_object(
        'item', 'Çeviri uygulaması bazı kelimeleri hiç öğrenmemiş',
        'category', '⚠️ Eksik/Hatalı Veri'
      ),
      jsonb_build_object(
        'item', 'Robot süpürge 1000 farklı ev planıyla eğitilmiş',
        'category', '✅ Kaliteli Veri'
      ),
      jsonb_build_object(
        'item', 'Okul başarı tahmin sistemi sadece özel okul öğrencilerinin notlarına bakıyor',
        'category', '⚖️ Önyargılı Veri'
      ),
      jsonb_build_object(
        'item', 'Hava durumu tahmini geçen yılın verilerini kullanıyor ama bu yılın verilerini almamış',
        'category', '⚠️ Eksik/Hatalı Veri'
      ),
      jsonb_build_object(
        'item', 'Oyun botu, oyuncuların kimlik bilgilerini silip sadece oyun hareketlerini kaydediyor',
        'category', '✅ Kaliteli Veri'
      )
    )
  )
)
WHERE id = '49b01d02-8ebf-4f0e-9d5b-d0fcd095e643';
