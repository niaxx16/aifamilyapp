UPDATE lessons
SET
  module_content = '{
    "video_section": {
      "url": "https://www.youtube.com/watch?v=example",
      "duration": 90,
      "description": "Yapay zeka nedir? Evinizdeki akilli asistan nasil size cevap verebiliyor? Bu kisa videoda AI nin temellerini kesfedin!",
      "thumbnail": ""
    },
    "real_life_example": {
      "title": "Gercek Hayattan: YouTube Onerileri",
      "scenario": "Cocugum surekli ayni tur videolari izliyor. YouTube nasil onun ne izleyecegini biliyor?",
      "explanation": "YouTube, yapay zeka kullanarak cocugunuzun daha once izledigi videolari, ne kadar sure izledigini ve hangi videolara tikladigini ogreniyor. Sonra benzer icerikleri oneriyor. Bu da AI nin ogrenme yetenegidir!"
    },
    "info_cards": [
      {
        "title": "AI Nasil Ogrenir?",
        "content": "AI, milyonlarca ornek veri inceleyerek kaliplar bulur. Tipki cocugunuzun bisiklet surmeyi deneme yanilma ile ogrenmesi gibi, AI de defalarca pratik yaparak ogrenir.",
        "icon": "🧠"
      },
      {
        "title": "Veri Nedir?",
        "content": "Veri, AI nin ogrenmek icin kullandigi bilgidir. Fotograflar, metinler, sesler... Her sey veri olabilir. Ne kadar cok veri olursa, AI o kadar iyi ogrenir.",
        "icon": "📊"
      },
      {
        "title": "AI Neden Hata Yapar?",
        "content": "AI, gordugu orneklerden ogrenir. Eger yanlis veya eksik ornekler gorurse, yanlis sonuclar cikarabilir. O yuzden AI a yuzde 100 guvenmek yerine, sonuclari sorgulamamiz onemli!",
        "icon": "⚠️"
      }
    ],
    "quiz": {
      "type": "matching",
      "question": "Hangisi yapay zeka kullanir? Eslestirin:",
      "items": [
        {
          "left": "YouTube video onerileri",
          "right": "AI",
          "correct": true
        },
        {
          "left": "Akilli telefon sesli asistan",
          "right": "AI",
          "correct": true
        },
        {
          "left": "Mikrodalga firin",
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
      "title": "Cocugunuza Nasil Anlatabilirsiniz?",
      "explanation": "AI, sihirbaz degil! Sadece cok fazla bilgiyi okuyup tahmin yapiyor. Tipki sizin bir arkadasinizin en sevdigi yemegi tahmin etmeniz gibi onunla ne kadar cok vakit gecirirseniz, o kadar iyi tahmin edersiniz.",
      "daily_example": "Netflix in size film onermesi, Spotify nin muzik listesi olusturmasi, hatta akilli termostatin evi isitma saati ogrenmesi hepsi AI sayesinde!",
      "task": "Bugun cocugunuzla birlikte ChatGPT ye neden ile baslayan 3 soru sorun. Cevaplari birlikte okuyun ve Bu cevap dogru mu diye tartisin. AI nin her zaman dogru olmadigini gosterin!"
    },
    "badge": {
      "name": "AI Kasifi",
      "icon": "🏅",
      "points": 10,
      "description": "Tebrikler! Yapay zekanin ne oldugunu ogrendiniz!"
    }
  }'::jsonb,
  total_duration_minutes = 5,
  completion_sections = '["video", "real_life", "info_cards", "quiz", "parent_guide"]'::jsonb,
  subcategory = 'temel_bilgi'
WHERE title = 'Yapay Zekâ Nedir?' AND order_number = 1;
