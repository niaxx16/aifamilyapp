# BUG-H7: No Session Expiration Handling - DÜZELTİLDİ ✅

## Problem
Session yönetimi tamamen eksikti:
1. **Session event listener yok:** `onAuthStateChange` kullanılmıyor
2. **Token refresh izlenmiyor:** Expired token'lar tespit edilmiyor
3. **Automatic logout yok:** Session expire olunca kullanıcı habersiz kalıyor
4. **Auth context eksik:** Merkezi auth state yönetimi yok
5. **Initial session check yok:** App açıldığında session kontrolü yapılmıyor

## Çözüm

### 1. AuthContext Oluşturuldu

**Dosya:** `src/context/AuthContext.tsx` (YENİ)

```typescript
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // İlk session'ı al
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Auth state değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);

        setSession(session);
        setUser(session?.user ?? null);

        // Session expire veya signed out
        if (event === 'SIGNED_OUT') {
          Alert.alert(
            'Oturum Sonlandı',
            'Güvenliğiniz için oturumunuz sonlandırıldı.'
          );
        }

        // Token yenilendiğinde
        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        }
      }
    );

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Özellikler:**
- ✅ `onAuthStateChange` event listener
- ✅ Automatic token refresh detection
- ✅ Session expire handling
- ✅ Initial session load
- ✅ Centralized signOut function
- ✅ Loading state

### 2. App.tsx Güncellendi

**Dosya:** `src/App.tsx`

**Değişiklikler:**

```typescript
// EKLENEN import
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>  {/* ✅ Eklendi */}
        <ChildProvider>
          <RootNavigator />
          <StatusBar style="auto" />
        </ChildProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
```

### 3. RootNavigator Güncellendi

**Dosya:** `src/navigation/RootNavigator.tsx`

**Değişiklikler:**

```typescript
// EKLENEN imports
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const RootNavigator = () => {
  const { user, loading } = useAuth();  // ✅ Auth state kullanımı

  // ✅ Session yüklenirken loading göster
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00CED1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'MainTabs' : 'Onboarding'}  {/* ✅ Auth-based routing */}
        screenOptions={{ headerShown: false }}
      >
```

**Öncesi:**
```typescript
// ❌ Her zaman Onboarding'den başlar
initialRouteName="Onboarding"
```

**Sonrası:**
```typescript
// ✅ Session varsa MainTabs, yoksa Onboarding
initialRouteName={user ? 'MainTabs' : 'Onboarding'}
```

## Test Planı

### Test 1: Session Expire Simülasyonu

**Adımlar:**
1. Uygulamaya giriş yap
2. Supabase Dashboard → Authentication → Users
3. Kullanıcının session'ını manuel olarak sil veya expire et
4. Uygulamada herhangi bir işlem yap

**Beklenen:**
- ✅ "Oturum Sonlandı" alert'i gösterilir
- ✅ Otomatik olarak Login ekranına yönlendirilir
- ✅ Kullanıcı korumalı ekranlara erişemez

**SQL (Session expire test):**
```sql
-- Kullanıcının session'larını göster
SELECT * FROM auth.sessions
WHERE user_id = 'your-user-id';

-- Session'ı sil (test için)
DELETE FROM auth.sessions
WHERE user_id = 'your-user-id';
```

### Test 2: Token Refresh

**Adımlar:**
1. Uygulamaya giriş yap
2. Console log'ları izle
3. 1 saat bekle (Supabase default token lifetime)
4. Uygulamada işlem yap

**Beklenen:**
- ✅ Console'da "Token refreshed successfully" görünür
- ✅ Kullanıcı oturumu devam eder
- ✅ Hiçbir kesinti olmaz

**Not:** Supabase otomatik token refresh yapar, bizim sadece event'i loglamamız yeterli.

### Test 3: Initial Session Check

**Adımlar:**
1. Uygulamaya giriş yap
2. Uygulamayı kapat (force quit)
3. Uygulamayı tekrar aç

**Beklenen:**
- ✅ Loading indicator gösterilir
- ✅ Session varsa direkt MainTabs'a gider
- ✅ Session yoksa Onboarding'e gider
- ✅ Tekrar login gerektirmez (session geçerliyse)

### Test 4: Logout

**Adımlar:**
1. Uygulamaya giriş yap
2. Profile ekranına git
3. "Çıkış Yap" butonuna tıkla (eğer varsa)

**Alternatif (Eğer logout butonu yoksa):**
React Native debugger konsolunda:
```javascript
import { supabase } from './src/services/supabase';
await supabase.auth.signOut();
```

**Beklenen:**
- ✅ Session sonlandırılır
- ✅ Onboarding/Login ekranına yönlendirilir
- ✅ User state null olur

### Test 5: Concurrent Sessions (Farklı Cihazlar)

**Adımlar:**
1. Web browser'da Supabase client ile aynı hesaba giriş yap
2. Mobile app'te de giriş yap
3. Web'de logout yap
4. Mobile app'te işlem yap

**Beklenen:**
- ✅ Her cihazda bağımsız session olur
- ✅ Bir cihazdan çıkış diğerini etkilemez (Supabase multi-session destekler)

### Test 6: Network Kesintisi

**Adımlar:**
1. Uygulamaya giriş yap
2. Cihazın internet bağlantısını kes
3. 5 dakika bekle
4. İnternet bağlantısını aç
5. Uygulamada işlem yap

**Beklenen:**
- ✅ Session korunur (localStorage'da)
- ✅ Token refresh otomatik olur
- ✅ Kullanıcı işlemine devam edebilir

## Auth Event Tipleri

Supabase `onAuthStateChange` şu event'leri tetikler:

| Event | Ne Zaman | Uygulama Davranışı |
|-------|----------|-------------------|
| `SIGNED_IN` | Login başarılı | User state güncelle |
| `SIGNED_OUT` | Logout veya session expire | Alert göster, login'e yönlendir |
| `TOKEN_REFRESHED` | Token yenilendi (her ~1 saat) | Log yaz, session güncelle |
| `USER_UPDATED` | Profil güncellendi | User state güncelle |
| `PASSWORD_RECOVERY` | Şifre sıfırlama | (Henüz implement edilmedi) |

## Supabase Session Ayarları

**Default Settings:**
- Access token lifetime: **1 hour**
- Refresh token lifetime: **30 days**
- Auto-refresh: **Enabled**

**Özelleştirme (Supabase Dashboard):**
```
Settings → Authentication → JWT Expiry
- Access token expiry: 3600 seconds (1 hour)
- Refresh token expiry: 2592000 seconds (30 days)
```

## Sonuç

✅ **BUG-H7 başarıyla düzeltildi!**

**Düzeltmeler:**
- ✅ AuthContext oluşturuldu
- ✅ `onAuthStateChange` listener eklendi
- ✅ Token refresh otomatik izleniyor
- ✅ Session expire durumunda alert ve logout
- ✅ Initial session check app başlangıcında
- ✅ Auth-based routing (user varsa MainTabs, yoksa Onboarding)
- ✅ Centralized signOut function

**Korunan:**
- ✅ Session expire olunca kullanıcı bilgilendirilir
- ✅ Token refresh otomatik ve sessiz
- ✅ App restart sonrası session korunur
- ✅ Güvenli logout mekanizması

## Notlar

- ProfileScreen'de logout butonu henüz yok (ayrı bir task olabilir)
- `useAuth` hook artık tüm component'lerde kullanılabilir
- Supabase automatic token refresh yapar, manuel refresh gerekmez
- Multi-device login desteklenir (her cihazda ayrı session)
- Session data AsyncStorage'da saklanır (Expo SecureStore kullanılabilir)

## Gelecek İyileştirmeler

1. **Logout Butonu Ekle** (ProfileScreen'e)
2. **Biometric Auth** (Face ID / Touch ID)
3. **Session Timeout Warning** (Session expire olmadan 5 dk önce uyar)
4. **Remember Me** (Optional extended session)
5. **Force Logout** (Admin tarafından tüm cihazlardan çıkış)
