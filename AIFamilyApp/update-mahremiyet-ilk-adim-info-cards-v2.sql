-- Mahremiyetin İlk Adımı dersinin info_cards bölümünü güncelle (Yeni Format)
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{info_cards}',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Mahremiyet ne demektir?',
      'answer', 'Kişinin kendine ait bilgileri ve alanı koruma hakkı.',
      'example', 'Çocuğun "Bunu herkes bilmek zorunda değil" diyebildiği durumlarda (duyguları, sırları, özel bilgileri).'
    ),
    jsonb_build_object(
      'question', 'Kişisel bilgi nedir?',
      'answer', 'Bir kişiyi tanımlayan özel bilgiler.',
      'example', 'İsim-soyisim, adres, telefon numarası, okul adı, sınıf, TC no, kullanıcı adı, e-posta vb. istendiğinde.'
    ),
    jsonb_build_object(
      'question', 'Hangi bilgiler "paylaşma" grubuna girer?',
      'answer', 'Tam ad, adres, telefon, okul ve sınıf, şifreler, aileye ait özel bilgiler.',
      'example', 'Oyun, uygulama veya form ekranında bu bilgiler alan olarak yazıldığında.'
    ),
    jsonb_build_object(
      'question', 'Hangi bilgiler görece "güvenli" ve genel sayılabilir?',
      'answer', 'Sevdiği renk, en sevdiği hayvan, hobi ve ilgi alanları gibi zararsız bilgiler.',
      'example', 'Profilini süslerken "En sevdiğin spor nedir?" gibi sorular geldiğinde.'
    ),
    jsonb_build_object(
      'question', 'Neden çocuk "Her soruya cevap vermek zorunda değil"?',
      'answer', 'Çünkü mahremiyet, bazı bilgileri kendine saklayabilme hakkıdır.',
      'example', '"Kayıt olmak için adresini yaz" dendiğinde, "Önce aileme soracağım" deme hakkına sahip olmasında.'
    ),
    jsonb_build_object(
      'question', 'Dijital ortamda mahremiyet neden daha önemli?',
      'answer', 'Paylaşılan bilgi hızla yayılabilir ve silinmesi zor olabilir.',
      'example', 'Bir fotoğrafın, mesajın veya formun ekran görüntüsünün kolayca başkalarına gönderilebilmesinde.'
    ),
    jsonb_build_object(
      'question', 'Çocuğa öğretebileceğimiz temel kural ne olabilir?',
      'answer', '"Tam adını, adresini, okulunu ve şifreni ekranda yazma."',
      'example', 'Yeni bir oyuna kaydolurken, sohbet botu veya AI "Bana kendinden bahset" dediğinde.'
    ),
    jsonb_build_object(
      'question', 'Mahremiyet ihlali nedir?',
      'answer', 'Kişinin izni olmadan özel bilgilerinin paylaşılması.',
      'example', 'Çocuğun fotoğrafının, isminin veya adresinin izinsiz bir grupta, sosyal medyada paylaşılmasında.'
    ),
    jsonb_build_object(
      'question', '"Önce aileme soracağım" demek neden güçlü bir cümle?',
      'answer', 'Çocuğun kararı tek başına almak zorunda olmadığını, arkasında ailesi olduğunu hissettirir.',
      'example', 'Uygulama ekstra bilgi istediğinde veya anlamadığı bir izin ekranı çıktığında.'
    ),
    jsonb_build_object(
      'question', 'Ebeveynin rolü bu konuda nedir?',
      'answer', 'Sınırları öğretmek, birlikte kontrol etmek ve çocuğa her zaman yanında olduğunu hissettirmek.',
      'example', 'Çocuğun "Bu bilgiyi yazmalı mıyım?" diye sorduğunda, "Beraber bakalım" diyerek ekranı birlikte incelemesinde.'
    )
  )
)
WHERE id = 'f0d8e748-3034-4b42-bfcb-6af23fb9be9b';
