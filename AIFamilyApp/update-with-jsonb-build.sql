UPDATE lessons
SET
  module_content = jsonb_build_object(
    'video_section', jsonb_build_object(
      'url', 'https://www.youtube.com/watch?v=example',
      'duration', 90,
      'description', 'Yapay zeka nedir? Evinizdeki akilli asistan nasil size cevap verebiliyor? Bu kisa videoda AI nin temellerini kesfedin!',
      'thumbnail', ''
    ),
    'real_life_example', jsonb_build_object(
      'title', 'Gercek Hayattan: YouTube Onerileri',
      'scenario', 'Cocugum surekli ayni tur videolari izliyor. YouTube nasil onun ne izleyecegini biliyor?',
      'explanation', 'YouTube, yapay zeka kullanarak cocugunuzun daha once izledigi videolari, ne kadar sure izledigini ve hangi videolara tikladigini ogreniyor. Sonra benzer icerikleri oneriyor. Bu da AI nin ogrenme yetenegidir!'
    ),
    'info_cards', jsonb_build_array(
      jsonb_build_object('title', 'AI Nasil Ogrenir?', 'content', 'AI, milyonlarca ornek veri inceleyerek kaliplar bulur. Tipki cocugunuzun bisiklet surmeyi deneme yanilma ile ogrenmesi gibi, AI de defalarca pratik yaparak ogrenir.', 'icon', '🧠'),
      jsonb_build_object('title', 'Veri Nedir?', 'content', 'Veri, AI nin ogrenmek icin kullandigi bilgidir. Fotograflar, metinler, sesler... Her sey veri olabilir. Ne kadar cok veri olursa, AI o kadar iyi ogrenir.', 'icon', '📊'),
      jsonb_build_object('title', 'AI Neden Hata Yapar?', 'content', 'AI, gordugu orneklerden ogrenir. Eger yanlis veya eksik ornekler gorurse, yanlis sonuclar cikarabilir. O yuzden AI a yuzde 100 guvenmek yerine, sonuclari sorgulamamiz onemli!', 'icon', '⚠️')
    ),
    'quiz', jsonb_build_object(
      'type', 'matching',
      'question', 'Hangisi yapay zeka kullanir? Eslestirin:',
      'items', jsonb_build_array(
        jsonb_build_object('left', 'YouTube video onerileri', 'right', 'AI', 'correct', true),
        jsonb_build_object('left', 'Akilli telefon sesli asistan', 'right', 'AI', 'correct', true),
        jsonb_build_object('left', 'Mikrodalga firin', 'right', 'Robot', 'correct', false),
        jsonb_build_object('left', 'ChatGPT', 'right', 'AI', 'correct', true)
      )
    ),
    'parent_guide', jsonb_build_object(
      'title', 'Cocugunuza Nasil Anlatabilirsiniz?',
      'explanation', 'AI, sihirbaz degil! Sadece cok fazla bilgiyi okuyup tahmin yapiyor. Tipki sizin bir arkadasinizin en sevdigi yemegi tahmin etmeniz gibi onunla ne kadar cok vakit gecirirseniz, o kadar iyi tahmin edersiniz.',
      'daily_example', 'Netflix in size film onermesi, Spotify nin muzik listesi olusturmasi, hatta akilli termostatin evi isitma saati ogrenmesi hepsi AI sayesinde!',
      'task', 'Bugun cocugunuzla birlikte ChatGPT ye neden ile baslayan 3 soru sorun. Cevaplari birlikte okuyun ve Bu cevap dogru mu diye tartisin. AI nin her zaman dogru olmadigini gosterin!'
    ),
    'badge', jsonb_build_object(
      'name', 'AI Kasifi',
      'icon', '🏅',
      'points', 10,
      'description', 'Tebrikler! Yapay zekanin ne oldugunu ogrendiniz!'
    )
  ),
  total_duration_minutes = 5,
  completion_sections = '["video", "real_life", "info_cards", "quiz", "parent_guide"]'::jsonb,
  subcategory = 'temel_bilgi'
WHERE title = 'Yapay Zekâ Nedir?' AND order_number = 1;
