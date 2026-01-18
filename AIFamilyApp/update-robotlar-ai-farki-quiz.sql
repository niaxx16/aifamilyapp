-- Robotlar ve AI Farkı dersinin quiz bölümünü güncelle
UPDATE lessons
SET module_content = jsonb_set(
  COALESCE(module_content, '{}'::jsonb),
  '{quiz}',
  jsonb_build_object(
    'type', 'categorize',
    'question', 'Aşağıdaki örnekleri doğru kategoriye yerleştir!',
    'categories', jsonb_build_array('Sadece Robot 🤖', 'Sadece AI 🧠', 'İkisi de 🤖🧠'),
    'items', jsonb_build_array(
      jsonb_build_object(
        'item', 'ChatGPT (Metin üreten program)',
        'category', 'Sadece AI 🧠'
      ),
      jsonb_build_object(
        'item', 'Oyuncak araba (uzaktan kumanda ile)',
        'category', 'Sadece Robot 🤖'
      ),
      jsonb_build_object(
        'item', 'Tesla Otopilot (Kendi kendine giden araba)',
        'category', 'İkisi de 🤖🧠'
      ),
      jsonb_build_object(
        'item', 'Spotify Müzik Önerileri',
        'category', 'Sadece AI 🧠'
      ),
      jsonb_build_object(
        'item', 'Robot Süpürge (Engelleri algılayan)',
        'category', 'İkisi de 🤖🧠'
      ),
      jsonb_build_object(
        'item', 'Fabrikadaki montaj kolu (programlı)',
        'category', 'Sadece Robot 🤖'
      ),
      jsonb_build_object(
        'item', 'Google Çeviri Uygulaması',
        'category', 'Sadece AI 🧠'
      ),
      jsonb_build_object(
        'item', 'Drone (Belirli rotayı takip eden)',
        'category', 'Sadece Robot 🤖'
      ),
      jsonb_build_object(
        'item', 'Alexa/Google Home (Sesli asistan cihazı)',
        'category', 'İkisi de 🤖🧠'
      ),
      jsonb_build_object(
        'item', 'Netflix Film Öneri Sistemi',
        'category', 'Sadece AI 🧠'
      )
    )
  )
)
WHERE title = 'Robotlar ve AI Farkı';
