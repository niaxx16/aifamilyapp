-- AI ve Oyunlar dersi için içerik ekleme
UPDATE lessons
SET module_content = jsonb_build_object(
  'quiz', jsonb_build_object(
    'type', 'categorize',
    'question', 'Oyunlarda AI kullanımını kategorilere ayır!',
    'categories', jsonb_build_array('🎮 AI Var', '🕹️ AI Yok', '🤖 Gelişmiş AI'),
    'description', '🎮 AI Var: Temel yapay zeka kullanılan oyunlar
🕹️ AI Yok: Sadece programlanmış kurallarla çalışan oyunlar
🤖 Gelişmiş AI: Öğrenen ve adapte olan yapay zeka',
    'items', jsonb_build_array(
      jsonb_build_object('item', 'Minecraft köylüleri (belirli rutinleri takip eder)', 'category', '🕹️ AI Yok'),
      jsonb_build_object('item', 'FIFA oyununda rakip takım stratejisi (oyuncunuza göre değişir)', 'category', '🤖 Gelişmiş AI'),
      jsonb_build_object('item', 'Pac-Man hayaletleri (basit takip algoritması)', 'category', '🎮 AI Var'),
      jsonb_build_object('item', 'Tetris blokları (rastgele düşer, karar vermez)', 'category', '🕹️ AI Yok'),
      jsonb_build_object('item', 'AlphaGo (satranç/go oyununda öğrenen AI)', 'category', '🤖 Gelişmiş AI'),
      jsonb_build_object('item', 'Call of Duty botları (oyuncunun seviyesine göre zorlaşır)', 'category', '🤖 Gelişmiş AI'),
      jsonb_build_object('item', 'Mario düşmanları (hep aynı hareketi yapar)', 'category', '🕹️ AI Yok'),
      jsonb_build_object('item', 'The Sims karakterleri (ihtiyaçlara göre karar verir)', 'category', '🎮 AI Var'),
      jsonb_build_object('item', 'Flappy Bird boruları (sadece hareket eder)', 'category', '🕹️ AI Yok'),
      jsonb_build_object('item', 'League of Legends NPC ler (takım stratejisine adapte olur)', 'category', '🤖 Gelişmiş AI')
    )
  ),
  'info_cards', jsonb_build_array(
    jsonb_build_object(
      'question', 'Yapay zekâ bir oyunu nasıl "akıllı" yapar?',
      'answer', 'Oyuncunun davranışlarını gözleyip oyunu ona göre ayarlar.',
      'example', 'Çocuğun zorlandığı bölümde daha kolay görev gelmesi.'
    ),
    jsonb_build_object(
      'question', 'NPC nedir?',
      'answer', 'Oyundaki yapay zekâ ile kontrol edilen karakter.',
      'example', 'Görev veren köylü, ipucu veren rehber, düşman karakterlerin davranışları.'
    ),
    jsonb_build_object(
      'question', 'Görüntü işleme oyunda ne işe yarar?',
      'answer', 'Kamera görüntüsünü analiz eder, hareketleri algılar.',
      'example', 'El hareketiyle zıplama, kameraya bakınca karakterin tepki vermesi.'
    ),
    jsonb_build_object(
      'question', 'Doğal dil işleme (NLP) ne sağlar?',
      'answer', 'Çocuğun yazdığını veya söylediğini anlamasını sağlar.',
      'example', '"Karakterle sohbet et" bölümlerinde, hikâye oluşturan oyunlarda.'
    ),
    jsonb_build_object(
      'question', 'Uyarlanabilir zorluk nedir?',
      'answer', 'Oyun, hızına ve başarına göre zorluk düzeyini değiştirir.',
      'example', 'Bir level''i hızlı geçince bir sonraki level''ın zorlaşması.'
    ),
    jsonb_build_object(
      'question', 'Yapay zekâ eğitsel oyunda ne yapar?',
      'answer', 'Çocuğun hangi konularda zorlandığını algılar ve oraya odaklanır.',
      'example', '"Bu konuda biraz daha pratik yapalım" ekranlarında.'
    ),
    jsonb_build_object(
      'question', 'YZ oyunlarda veri toplar mı?',
      'answer', 'Evet, çocuğun nasıl oynadığını analiz eder.',
      'example', '"En çok oynadığın bölüm", "En zorlandığın yer" raporlarında.'
    ),
    jsonb_build_object(
      'question', 'En büyük risklerden biri nedir?',
      'answer', 'Kontrolsüz ekran süresi.',
      'example', 'Çocuğun oyundan kopamaması, uyku düzeninin bozulması.'
    ),
    jsonb_build_object(
      'question', 'Kişisel bilgiler oyunlarda neden risklidir?',
      'answer', 'Bazı oyunlar gereksiz veri isteyebilir.',
      'example', 'Kullanıcı adı/yaş/email girişi isteyen oyun ekranları.'
    ),
    jsonb_build_object(
      'question', 'Aile için temel yaklaşım ne olmalı?',
      'answer', 'Oyun + gerçek yaşam dengesi.',
      'example', 'Oyun süresi planı, ortak oyun zamanları, içerik kontrolü.'
    )
  ),
  'parent_guide', jsonb_build_object(
    'title', 'Çocuğuma Nasıl Anlatırım?',
    'summary', 'Oyunlardaki yapay zekâ, çocuğun davranışlarına göre oyunu şekillendirir. Bu yüzden bazı görevler kolaylaşır, bazıları zorlaşır. Ama kişisel bilgilerimizi paylaşmayız ve oyun süresini dengede tutarız.',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'icon', '🧠',
        'title', 'Kendim İçin Özet (Ebeveyn)',
        'content', 'YZ → kişiselleştirme, uyum, öğrenme fırsatı. Risk → içerik, süre, gizlilik. Rolüm → rehberlik + sınır + kontrol'
      ),
      jsonb_build_object(
        'icon', '💬',
        'title', 'Çocuğuma Böyle Anlatabilirim',
        'content', 'Oyunlardaki yapay zekâ, seni izleyen kötü bir şey değil; oyunun nasıl daha eğlenceli olacağını anlamaya çalışan "akıllı bir yardımcı" gibi. Ama ona gerçek bilgilerimizi vermiyoruz. Ve oyun, hayatın sadece bir parçası.'
      ),
      jsonb_build_object(
        'icon', '📱',
        'title', 'Günlük Hayattan 3 Örnek',
        'examples', jsonb_build_array(
          jsonb_build_object(
            'title', 'Zorluk ayarı',
            'content', 'Bak, bu oyun zorluğu sana göre ayarladı—bu yapay zekâ.'
          ),
          jsonb_build_object(
            'title', 'Hikâye oluşturma',
            'content', 'Hikâyeyi sen başlattın, oyun devam ettirdi—bunu YZ yaptı.'
          ),
          jsonb_build_object(
            'title', 'Görüntü işleme',
            'content', 'Kameraya el salladın, menü açıldı—görüntü işleme çalıştı.'
          )
        )
      ),
      jsonb_build_object(
        'icon', '❓',
        'title', 'Sorabileceğim 3 Soru',
        'questions', jsonb_build_array(
          'Bu oyunun hangi kısmı sence akıllı?',
          'Bu oyunda hangi bilgileri vermemeliyiz?',
          'Oyun oynadıktan sonra kendini nasıl hissediyorsun?'
        )
      ),
      jsonb_build_object(
        'icon', '⚠️',
        'title', 'Dile Dikkat',
        'tips', jsonb_build_array(
          jsonb_build_object(
            'right', 'Oyun bazen yanılır, o yüzden dikkatli ol.',
            'wrong', 'Oyun seni her zaman anlar.'
          ),
          jsonb_build_object(
            'right', 'Biraz oyun + biraz hareket + biraz sohbet dengesi önemli.',
            'wrong', 'Ne kadar oynarsan o kadar iyi olursun.'
          ),
          jsonb_build_object(
            'right', 'Biz birlikte kontrol ettikten sonra güvenli olur.',
            'wrong', 'Oyun hep güvenlidir.'
          )
        ),
        'footer', 'Oyunlardaki YZ yi anlamak, teknolojiye karşı eleştirel bakış açısı kazandırır.'
      )
    )
  ),
  'video_section', jsonb_build_object(
    'url', 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/videos/ai-ve-oyunlar.mp4',
    'duration', 180,
    'description', 'Oyunlarda yapay zeka nasıl kullanılıyor? Düşman botlar nasıl karar veriyor? Bu videoda oyun AI nin sırlarını keşfedin!'
  ),
  'real_life_example', jsonb_build_object(
    'title', 'Gerçek Hayattan: Minecraft Köylüleri',
    'scenario', 'Minecraft oynayan çocuğunuz, köylülerin sabah çiftliğe gittiğini, akşam evlerine döndüğünü, yağmur yağınca sığındıklarını fark ediyor.',
    'explanation', 'Köylüler basit bir yapay zeka ile kontrol edilir. Günün saatine, hava durumuna ve tehlikeye göre karar verirler. Bu, oyun dünyasını daha canlı ve gerçekçi yapar. Basit kurallarla bile AI, oyunu daha eğlenceli hale getirebilir!'
  )
)
WHERE id = 'a92f7aa4-f626-4787-a143-733c8f9cb582';
