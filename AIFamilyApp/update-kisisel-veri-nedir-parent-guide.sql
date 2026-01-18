-- Kişisel Veri Nedir dersinin parent_guide bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{parent_guide}',
  jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Kişisel veri, bir kişiyi tanımlayan her türlü bilgidir. İsim, fotoğraf, konum, davranışlar hepsi kişisel veridir ve korunması gerekir.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim için özet',
        'content', 'Kişisel veri = isim, adres, telefon, e-posta, IP adresi, konum, fotoğraf, ses, biyometrik veriler (yüz, parmak izi), alışkanlıklar, sağlık bilgileri gibi bir kişiyi tanımlayan her şey. AI sistemleri bu verileri kullanarak kişileri profillendirir, tahmin yapar. Çocukların hangi bilgilerin kişisel olduğunu bilmesi, dijital okuryazarlığın temelidir.'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma böyle anlatabilirim',
        'content', 'Kişisel veri, senin hakkındaki tüm bilgiler demek. Adın, yaşın, fotoğrafların, nerede yaşadığın, neleri sevdiğin, hangi videoları izlediğin… Hepsi senin "dijital kimlik kartın" gibi. Bu bilgiler yanlış ellere geçerse, seni tanımayan biri sanki seni tanıyormuş gibi davranabilir. Bu da tehlikeli olabilir.'
      ),
      jsonb_build_object(
        'icon', '🏠',
        'title', 'Günlük hayattan örnekler',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Uygulama kaydı',
            'content', '"Bir uygulama sana doğum tarihini, e-mail adresini soruyor. Bunlar kişisel veri. Uygulamaya güvenmiyorsan, ailene sor."'
          ),
          jsonb_build_object(
            'title', 'Yüz tanıma kilidi',
            'content', '"Telefonun seni yüzünden tanıyor. Yüzün de bir kişisel veri. Bu yüzden başka birinin telefonunu yüzünle açamamalısın."'
          ),
          jsonb_build_object(
            'title', 'Oyun profili',
            'content', '"Oyunda hangi karakteri seçtiğin, ne kadar süre oynadığın bile bir veridir. Oyun şirketi bunları kaydeder ve seni daha iyi tanımak için kullanır."'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 soru',
        'questions', jsonb_build_array(
          'Sence bir uygulamaya doğum tarihini vermek gerekli mi? Neden istiyor olabilirler?',
          'Telefonun kamera ile seni tanıdığında, bu kişisel veri sayılır mı?',
          'Bir oyun, hangi seviyelerde zorlandığını kaydediyorsa, bu senin hakkında ne söyler?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'wrong', 'Sadece isim ve soyisim kişisel veridir.',
            'right', 'İsim, fotoğraf, ses, konum, IP adresi, alışkanlıklar… hepsi kişisel veri. Her şey seni tanımlamaya yarar.'
          ),
          jsonb_build_object(
            'wrong', 'Kişisel veriler herkese açık olmalı.',
            'right', 'Kişisel veriler senin izninle paylaşılmalı. Kimseye otomatik olarak her şeyi vermek zorunda değilsin.'
          )
        )
      )
    )
  )
)
WHERE title = 'Kişisel Veri Nedir?';
