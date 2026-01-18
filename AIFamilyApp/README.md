# AI Family App

Yapay zeka okuryazarlığı eğitim platformu - Ebeveynler ve çocuklar için interaktif AI eğitimi

## 📱 Genel Bakış

AI Family App, 7-12 yaş arası çocuklar ve ebeveynleri için tasarlanmış, yapay zeka okuryazarlığı eğitimi sunan bir mobil uygulamadır. Uygulama, interaktif dersler, etkinlikler ve AI destekli mentor özellikleriyle kullanıcıların AI teknolojisini anlayıp sorumlu bir şekilde kullanmalarını hedefler.

## 🛠 Teknoloji Stack

### Frontend
- **React Native** (0.81.5) - Mobil uygulama framework
- **Expo** (SDK 54) - Development platform
- **TypeScript** (5.9.2) - Type safety
- **React Navigation** (7.x) - Navigasyon sistemi
  - Stack Navigator
  - Bottom Tab Navigator

### Backend & Veritabanı
- **Supabase** - Backend as a Service
  - PostgreSQL veritabanı
  - Authentication (email/password)
  - Real-time subscriptions
  - Storage (video, görsel varlıklar)
  - Row Level Security (RLS)

### State Management & Storage
- **React Context API** - Global state yönetimi
- **AsyncStorage** - Local storage (AI Mentor günlük limit)

### Önemli Kütüphaneler
- `@supabase/supabase-js` (2.78.0) - Supabase client
- `react-native-safe-area-context` (5.6.2) - Safe area handling
- `expo-av` (16.0.7) - Video player (deprecated, SDK 54'te kaldırılacak)
- `react-native-confetti-cannon` (1.5.2) - Konfeti animasyonları
- `expo-linear-gradient` (15.0.7) - Gradient stilleri

## 🎯 Ana Özellikler

### 1. Kullanıcı Yönetimi
- Email/password authentication
- Çoklu çocuk profili desteği
- Ebeveyn rehberlik sistemi

### 2. Öğren Modülü
- **Kategoriler:** Temel Bilgiler, Günlük Hayat, Güvenlik, Etik, Gelecek
- **Ders İçerikleri:**
  - Video açıklamaları
  - Gerçek hayat senaryoları
  - Bilgi kartları (flip card animasyonlu)
  - Ebeveyn rehber bölümü
  - İnteraktif quiz/etkinlikler
  - Başarı rozetleri

### 3. AI Mentor
- **Google Gemini 2.0 Flash** entegrasyonu
- Çocuk dostu AI sohbet asistanı
- Günlük kullanım limiti (5 soru/gün)
- Bağlamsal cevaplar (ders içeriği entegrasyonu)
- İçerik filtreleme ve güvenlik

### 4. Puan & Rozet Sistemi
- Quiz tamamlama puanları
- Milestone rozetleri (10, 25, 50, 100, 250 puan)
- Kullanıcı profil istatistikleri
- İlerleme takibi

### 5. İnteraktif Etkinlikler
Farklı etkinlik türleri:
- **True/False:** Doğru/Yanlış soruları
- **Categorize:** Çoklu kategoriye ayırma
- **Matching:** Eşleştirme etkinlikleri

## 📊 Veritabanı Yapısı

### Tablolar

#### `users`
```sql
- id (uuid, primary key)
- email (text)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `children`
```sql
- id (uuid, primary key)
- parent_id (uuid, foreign key → users)
- name (text)
- age (integer)
- avatar (text)
- total_points (integer, default: 0)
- created_at (timestamp)
```

#### `lessons`
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- category (text)
- category_key (text)
- difficulty (integer: 1-3)
- order_number (integer)
- estimated_minutes (integer)
- tags (text)
- content_type (text: 'interactive', 'video', 'reading')
- video_url (text, nullable)
- module_content (jsonb) ⭐
- created_at (timestamp)
- updated_at (timestamp)
```

#### `lesson_progress`
```sql
- id (uuid, primary key)
- child_id (uuid, foreign key → children)
- lesson_id (uuid, foreign key → lessons)
- completed (boolean, default: false)
- points_earned (integer, default: 0)
- completed_at (timestamp)
- created_at (timestamp)
```

#### `earned_badges`
```sql
- id (uuid, primary key)
- child_id (uuid, foreign key → children)
- badge_name (text)
- badge_icon (text)
- earned_at (timestamp)
```

## 🎓 Ders İçerik Yapısı (module_content JSONB)

```typescript
interface ModuleContent {
  video_section?: {
    url: string;
    duration: number;
    description: string;
  };

  real_life_example?: {
    title: string;
    scenario: string;
    explanation: string;
  };

  info_cards: Array<{
    question: string;
    answer: string;
    example: string;
  }>;

  parent_guide: {
    title: string;
    summary: string;
    cards: Array<{
      icon: string;
      title: string;
      content?: string;
      examples?: Array<{
        title: string;
        content: string;
      }>;
      questions?: string[];
      tips?: Array<{
        wrong: string;
        right: string;
      }>;
    }>;
  };

  quiz: {
    type: 'true_false' | 'categorize' | 'matching';
    question: string;
    description?: string;

    // true_false & categorize için
    items?: Array<{
      item?: string;      // categorize
      left?: string;      // true_false
      right?: string;     // true_false
      correct?: boolean;  // true_false
      category?: string;  // categorize
    }>;
    categories?: string[];  // categorize

    // matching için
    pairs?: Array<{
      id: number;
      left: string;
      right: string;
    }>;
  };

  badge?: {
    name: string;
    icon: string;
    points: number;
    description?: string;
  };
}
```

## 🎮 Quiz/Etkinlik Türleri

### 1. True/False (Doğru/Yanlış)
- Kullanıcı her ifade için Doğru/Yanlış seçer
- Submit sonrası doğru/yanlış feedback
- Örnek: "AI ile Sohbet Etmek" dersi

### 2. Categorize (Kategorilendirme)
- 2-3 kategori arasında seçim
- Her öğe için bir kategori seçilir
- Tanım açıklamaları gösterilir
- Örnekler:
  - "AI Nerede Yaşar?" - 2 kategori (AI Var/Yok)
  - "Veri Süper Gücü" - 3 kategori (Kaliteli/Önyargılı/Eksik)
  - "AI Duyguları" - 3 kategori (Gerçek/Taklit/Komut)

### 3. Matching (Eşleştirme)
- İki sütunlu düzen (Sol: Sorular, Sağ: Cevaplar)
- Kullanıcı soldan bir öğe seçer, sağdan eşleştirir
- Her cevap sadece bir kez kullanılabilir
- Numara sistemi ile eşleştirme gösterimi
- Örnek: "AI Hata Yapabilir" - Hata örnekleri ↔ Hata nedenleri

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- Expo CLI
- Android Studio / Xcode (native build için)
- Supabase hesabı

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
cp .env.example .env

# Supabase bilgilerini .env'ye ekle
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Development

```bash
# Expo development server
npm start

# Android emulator
npm run android

# iOS simulator (macOS)
npm run ios
```

### Production Build

```bash
# APK build (Android)
npx eas build --platform android --profile preview

# Production build
npx eas build --platform android --profile production
```

## 🔐 Güvenlik

### Row Level Security (RLS)
- Tüm tablolarda RLS etkin
- Kullanıcılar sadece kendi verilerine erişebilir
- Ebeveynler sadece kendi çocuklarının verilerini görebilir

### AI Mentor Güvenliği
- Günlük kullanım limiti (AsyncStorage)
- Çocuk dostu sistem promptları
- API key güvenliği (.env)

## 📱 Ekranlar ve Navigasyon

### Ana Navigasyon (Bottom Tabs)
1. **Öğren (LearnScreen)**
   - Kategori listesi
   - Ders kartları
   - İlerleme göstergeleri

2. **AI Mentor (AIMentorScreen)**
   - Sohbet arayüzü
   - Günlük limit göstergesi
   - Ders bağlamı entegrasyonu

3. **Profil (ProfileScreen)**
   - Çocuk profilleri
   - Puan/rozet gösterimi
   - İstatistikler

### Stack Navigation
- **LessonDetailScreen:** Ders içeriği ve quiz
- **AuthScreen:** Giriş/Kayıt
- **OnboardingScreen:** İlk kurulum

## 🎨 Tasarım Sistemi

### Renkler
- Primary: `#6B5B95` (Mor)
- Success: `#10B981` (Yeşil)
- Error: `#EF4444` (Kırmızı)
- Warning: `#F59E0B` (Turuncu)
- Info: `#3B82F6` (Mavi)

### Tipografi
- System fonts (iOS/Android native)
- Font weights: 400, 500, 600, 700

### Animasyonlar
- Flip card animasyonları (info cards)
- Konfeti efektleri (quiz tamamlama)
- Fade in/out transitions

## 📝 Son Güncellemeler (Bu Session)

### İçerik Güncellemeleri
1. **Parent Guide Yapısı:** Tüm dersler için yeni kart formatı
2. **Info Cards:** 9 ders için güncellendi
3. **Quiz/Etkinlikler:** 7 ders için yeni etkinlikler

### Yeni Özellikler
1. **Matching Quiz Tipi:** Eşleştirme etkinliği implementasyonu
2. **Quiz Description:** Kategorize etkinliklerinde tanım gösterimi
3. **3 Kategorili Sistemler:** Daha detaylı kategorilendirme

### Teknik İyileştirmeler
1. **Video URL Handling:** module_content.video_section desteği
2. **Quiz Validation:** Matching tipi için doğrulama
3. **UI/UX İyileştirmeleri:**
   - Eşleştirme etkinliği iki sütunlu düzen
   - Tanım kutularında satır satır gösterim
   - Responsive layout iyileştirmeleri

### API Güncellemeleri
- **Gemini AI:** 2.5-flash → 2.0-flash geçişi (503 hatası çözümü)

## 🐛 Bilinen Sorunlar

1. **expo-av Deprecation:** SDK 54'te expo-audio/expo-video'ya geçilecek
2. **Free Tier Queue:** EAS Build sırası uzun sürebilir

## 📄 Lisans

Bu proje özel kullanım içindir.

## 👥 Geliştirici

Ahmet Atasayar - ahmetatasayar06@gmail.com

---

**Son Güncelleme:** 13 Kasım 2025
**Versiyon:** 1.0.0
**Build:** EAS Build (Android APK)
