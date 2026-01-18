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
