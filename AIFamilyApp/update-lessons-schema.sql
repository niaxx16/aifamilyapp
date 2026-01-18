-- Lessons tablosuna yeni modül yapısı için kolonlar ekle

-- JSON formatında modül içeriğini tutacak kolon
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS module_content JSONB;

-- Örnek modül içeriği yapısı:
/*
{
  "video_section": {
    "url": "https://...",
    "duration": 90,
    "description": "Mini video açıklaması",
    "thumbnail": "https://..."
  },
  "real_life_example": {
    "title": "Gerçek Hayattan",
    "scenario": "Oğlum hep aynı videoları izliyor.",
    "explanation": "Çünkü öneri sistemi onun zevkini öğrendi!"
  },
  "info_cards": [
    {
      "title": "AI nasıl öğrenir?",
      "content": "AI, milyonlarca örnek veri inceleyerek...",
      "icon": "🧠"
    },
    {
      "title": "Veri nedir?",
      "content": "Veri, AI'ın öğrenmek için kullandığı bilgidir...",
      "icon": "📊"
    }
  ],
  "quiz": {
    "type": "matching",
    "question": "AI örneklerini eşleştir",
    "items": [
      {"left": "YouTube önerileri", "right": "AI", "correct": true},
      {"left": "Mikrodalga fırın", "right": "Robot", "correct": false}
    ]
  },
  "parent_guide": {
    "title": "Çocuğuna Nasıl Anlatabilirim?",
    "explanation": "AI, sihirbaz değil! Sadece çok fazla bilgiyi okuyup tahmin yapıyor.",
    "daily_example": "Netflix'in film önermesi gibi...",
    "task": "ChatGPT'ye 'neden' ile başlayan 3 soru sorun, cevaplarını birlikte değerlendirin."
  },
  "badge": {
    "name": "Veri Koruyucu Aile",
    "icon": "🏅",
    "points": 10,
    "description": "Bu modülü tamamladınız!"
  }
}
*/

-- İstatistikler için kolon
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS total_duration_minutes INTEGER DEFAULT 5;

-- Tamamlanma kriteri
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS completion_sections JSONB DEFAULT '["video", "real_life", "info_cards", "quiz", "parent_guide"]'::jsonb;

COMMENT ON COLUMN lessons.module_content IS 'Modül içeriğini JSON formatında tutar: video, gerçek hayat örneği, bilgi kartları, quiz, ebeveyn rehberi, rozet';
COMMENT ON COLUMN lessons.total_duration_minutes IS 'Modülün toplam tahmini süresi (dakika)';
COMMENT ON COLUMN lessons.completion_sections IS 'Tamamlanması gereken bölümler listesi';
