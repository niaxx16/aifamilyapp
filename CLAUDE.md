# AI Aile Rehberi - Proje Bilgileri

## Proje Ozeti
**Uygulama Adi:** AI Aile Rehberi
**Slogan:** "Birlikte ogren, bilincle yonlendir"
**Platform:** React Native + Expo (Mobil)
**Hedef Kitle:** Ebeveynler ve cocuklari (7-17 yas)

## Teknoloji Stack'i
- **Frontend:** React Native 0.81.5 + Expo 54 + TypeScript 5.9
- **Backend:** Supabase (Auth, Database, Storage)
- **State:** React Context (AuthContext, ChildContext)
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **Video:** expo-av

## Proje Yapisi
```
aifamilyapp/
├── AIFamilyApp/           # Ana mobil uygulama
│   ├── src/
│   │   ├── screens/       # Ekranlar
│   │   ├── context/       # AuthContext, ChildContext
│   │   ├── navigation/    # RootNavigator, BottomTabNavigator
│   │   ├── services/      # supabase.ts
│   │   ├── types/         # database.types.ts
│   │   └── utils/         # badgeUtils.ts
│   └── package.json
├── supabase/              # Supabase migration dosyalari
└── *.sql                  # SQL script dosyalari
```

## Ana Ekranlar
- **HomeScreen:** Ana sayfa, haftalik ilerleme
- **LearnScreen:** Ogrenme modulu, dersler
- **LessonDetailScreen:** Ders detaylari, videolar
- **PracticeScreen:** Aile etkinlikleri
- **ActivityDetailScreen:** Etkinlik detaylari
- **GuideScreen:** Rehberlik araclari
- **ProgressScreen:** Ilerleme takibi, rozetler
- **ProfileScreen:** Kullanici profili

## Onemli Dosyalar
- `src/services/supabase.ts` - Supabase baglantisi
- `src/context/AuthContext.tsx` - Kimlik dogrulama
- `src/context/ChildContext.tsx` - Cocuk profil yonetimi
- `src/navigation/RootNavigator.tsx` - Ana navigasyon
- `src/types/database.types.ts` - Veritabani tipleri

## Veritabani (Supabase)
Ana tablolar:
- `users` - Kullanicilar
- `parent_profiles` - Ebeveyn profilleri
- `children` - Cocuk profilleri
- `lessons` - Dersler
- `activities` - Etkinlikler
- `user_progress` - Kullanici ilerlemesi
- `badges` / `earned_badges` - Rozetler
- `reflection_questions` - Yansima sorulari

## Calisma Komutlari
```bash
cd AIFamilyApp
npm start          # Expo baslatir
npm run android    # Android emulator
npm run ios        # iOS simulator
```

## Notlar
- Haftalik icerik yapisi: Her hafta 3 etkinlik + 1 ders
- Gamification: Puan ve rozet sistemi mevcut
- Video icerikleri expo-av ile oynatiliyor
- Tum veriler Supabase'de saklanıyor

---

## AI Mentor Konfigurasyonu (Güncel: Ocak 2026)

### Supabase Edge Function
- **Function Adı:** `quick-api`
- **URL:** `https://ssfjcnotebecmwtxjryt.supabase.co/functions/v1/quick-api`
- **Kullanılan Model:** `gemini-2.5-flash` (gemini-2.0-flash kota sorunu yaşıyordu)
- **Secret:** `GEMINI_API_KEY` (Supabase Dashboard > Project Settings > Edge Functions > Secrets)

### Önemli
- API key **KOD İÇİNDE DEĞİL**, Supabase secrets'ta saklanıyor
- AIMentorScreen.tsx `supabase.functions.invoke('quick-api', ...)` kullanıyor
- Günlük mesaj limiti: 5 mesaj (AsyncStorage ile takip ediliyor)

### Edge Function Dosyası
- Yerel: `supabase/functions/ai-mentor/index.ts`
- Supabase'de: `quick-api` olarak deploy edilmiş

---

## İçerik Durumu

### Dersler
- 33 ders, 5 kategoride tamamlanmış

### Etkinlikler
- Hafta 1-7: Tüm yaş grupları için tamamlanmış
- 8-9 yaş: Hafta 1-8 tamamlanmış
- 10-11 yaş: Hafta 1-7 tamamlanmış (Hafta 8 eksik)

### Bekleyen SQL Dosyaları (commit edilmemiş)
- `insert-week3-activities-10-11.sql`
- `insert-week4-activities-10-11.sql`
- `insert-week5-activities-10-11.sql`
- `insert-week6-activities-10-11.sql`
- `insert-week7-activities-10-11.sql`

---

## Supabase Bilgileri
- **Project URL:** `https://ssfjcnotebecmwtxjryt.supabase.co`
- **Project Ref:** `ssfjcnotebecmwtxjryt`

---

## Son Yapılan Değişiklikler (18 Ocak 2026)
1. API key koddan kaldırıldı, Supabase Edge Function'a taşındı
2. Gemini modeli gemini-2.5-flash olarak güncellendi
3. Mikrofon butonu AI Mentor'dan kaldırıldı
4. .env.example güncellendi (GEMINI_API_KEY artık gerekli değil client'ta)
