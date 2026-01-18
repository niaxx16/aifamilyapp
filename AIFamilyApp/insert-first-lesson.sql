-- İlk örnek modül: "Yapay Zeka Nedir?"

INSERT INTO lessons (
  id,
  title,
  description,
  content,
  content_type,
  duration,
  difficulty,
  category,
  subcategory,
  order_number,
  total_duration_minutes,
  module_content,
  completion_sections
) VALUES (
  gen_random_uuid(),
  'Yapay Zeka Nedir?',
  'AI''nin temel kavramlarını ve günlük hayattaki yerini keşfedin',
  'Bu modülde yapay zekanın ne olduğunu, nasıl çalıştığını ve hayatımızda nerede kullanıldığını öğreneceksiniz.',
  'interactive',
  5,
  1,
  'ai_basics',
  'temel_kavramlar',
  1,
  5,
  '{
    "video_section": {
      "url": "https://www.youtube.com/watch?v=example",
      "duration": 90,
      "description": "Yapay zeka nedir? Evinizdeki akıllı asistan nasıl size cevap verebiliyor? Bu kısa videoda AI''nin temellerini keşfedin!",
      "thumbnail": ""
    },
    "real_life_example": {
      "title": "Gerçek Hayattan: YouTube Önerileri",
      "scenario": "Çocuğum sürekli aynı tür videoları izliyor. YouTube nasıl onun ne izleyeceğini biliyor?",
      "explanation": "YouTube, yapay zeka kullanarak çocuğunuzun daha önce izlediği videoları, ne kadar süre izlediğini ve hangi videolara tıkladığını öğreniyor. Sonra benzer içerikleri öneriyor. Bu da AI''ın ''öğrenme'' yeteneğidir!"
    },
    "info_cards": [
      {
        "title": "AI Nasıl Öğrenir?",
        "content": "AI, milyonlarca örnek veri inceleyerek kalıplar bulur. Tıpkı çocuğunuzun bisiklet sürmeyi deneme yanılma ile öğrenmesi gibi, AI de defalarca pratik yaparak öğrenir.",
        "icon": "🧠"
      },
      {
        "title": "Veri Nedir?",
        "content": "Veri, AI''ın öğrenmek için kullandığı bilgidir. Fotoğraflar, metinler, sesler... Her şey veri olabilir. Ne kadar çok veri olursa, AI o kadar iyi öğrenir.",
        "icon": "📊"
      },
      {
        "title": "AI Neden Hata Yapar?",
        "content": "AI, gördüğü örneklerden öğrenir. Eğer yanlış veya eksik örnekler görürse, yanlış sonuçlar çıkarabilir. O yüzden AI''a %100 güvenmek yerine, sonuçları sorgulamamız önemli!",
        "icon": "⚠️"
      }
    ],
    "quiz": {
      "type": "matching",
      "question": "Hangisi yapay zeka kullanır? Eşleştirin:",
      "items": [
        {
          "left": "YouTube video önerileri",
          "right": "AI",
          "correct": true
        },
        {
          "left": "Akıllı telefon sesli asistan",
          "right": "AI",
          "correct": true
        },
        {
          "left": "Mikrodalga fırın",
          "right": "Robot",
          "correct": false
        },
        {
          "left": "ChatGPT",
          "right": "AI",
          "correct": true
        }
      ]
    },
    "parent_guide": {
      "title": "Çocuğunuza Nasıl Anlatabilirsiniz?",
      "explanation": "AI, sihirbaz değil! Sadece çok fazla bilgiyi okuyup tahmin yapıyor. Tıpkı sizin bir arkadaşınızın en sevdiği yemeği tahmin etmeniz gibi – onunla ne kadar çok vakit geçirirseniz, o kadar iyi tahmin edersiniz.",
      "daily_example": "Netflix''in size film önermesi, Spotify''ın müzik listesi oluşturması, hatta akıllı termostatın evi ısıtma saati öğrenmesi – hepsi AI sayesinde!",
      "task": "Bugün çocuğunuzla birlikte ChatGPT''ye ''neden'' ile başlayan 3 soru sorun. Cevapları birlikte okuyun ve ''Bu cevap doğru mu?'' diye tartışın. AI''ın her zaman doğru olmadığını gösterin!"
    },
    "badge": {
      "name": "AI Kaşifi",
      "icon": "🏅",
      "points": 10,
      "description": "Tebrikler! Yapay zekanın ne olduğunu öğrendiniz!"
    }
  }'::jsonb,
  '["video", "real_life", "info_cards", "quiz", "parent_guide"]'::jsonb
);
