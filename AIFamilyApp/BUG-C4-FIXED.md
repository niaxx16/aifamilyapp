# BUG-C4: Quiz Submission Race Condition - DÜZELTİLDİ ✅

## Problem
Quiz submission sırasında:
1. **Race condition:** Mevcut puanı oku → hesapla → güncelle (atomik değil)
2. **Duplicate submission:** Hızlı 2 kez tıklanabilir
3. **Yanlış puan:** İki submission aynı değeri okuyup ikisi de +puan ekleyebilir

## Çözüm

### 1. SQL Atomic Function Oluşturuldu

**Dosya:** `submit-quiz-atomic.sql`

```sql
CREATE OR REPLACE FUNCTION submit_quiz_atomic(
  p_parent_id UUID,
  p_lesson_id UUID,
  p_correct_count INTEGER,
  p_total_questions INTEGER,
  p_is_first_attempt BOOLEAN
)
RETURNS JSONB
```

**Özellikler:**
- ✅ Transaction içinde atomik puan güncelleme
- ✅ Duplicate quiz completion kontrolü
- ✅ İlk tamamlamada puan verme
- ✅ `ON CONFLICT` ile duplicate INSERT önleme
- ✅ Tek database round-trip

### 2. React Component Güncellendi

**Dosya:** `src/screens/LessonDetailScreen.tsx`

**Değişiklikler:**

#### A. `isSubmitting` State Eklendi (Satır 30)
```typescript
const [isSubmitting, setIsSubmitting] = useState(false);
```

#### B. `submitQuiz` Fonksiyonu Tamamen Yeniden Yazıldı (Satır 302-383)

**Öncesi:**
```typescript
const submitQuiz = async () => {
  setQuizSubmitted(true);

  // ❌ Race condition:
  const { data: childData } = await supabase
    .from('parent_profiles')
    .select('total_points')
    .eq('id', firstChild.id)
    .single();

  const currentPoints = childData?.total_points || 0;
  const newTotalPoints = currentPoints + correctCount;

  // ❌ Atomik değil:
  await supabase
    .from('parent_profiles')
    .update({ total_points: newTotalPoints })
    .eq('id', firstChild.id);

  // ❌ Ayrı call:
  await supabase
    .from('user_progress')
    .upsert({ quiz_completed: true });
};
```

**Sonrası:**
```typescript
const submitQuiz = async () => {
  // ✅ Double submission önleme
  if (isSubmitting || quizSubmitted) return;

  setIsSubmitting(true);

  try {
    // ✅ Tek atomik call
    const { data, error } = await supabase.rpc('submit_quiz_atomic', {
      p_parent_id: firstChild.id,
      p_lesson_id: lesson.id,
      p_correct_count: correctCount,
      p_total_questions: totalQuestions,
      p_is_first_attempt: quizFirstAttempt,
    });

    if (error) throw error;

    setQuizSubmitted(true);

    // ✅ Puan kazanıldıysa bildir
    if (data.points_earned > 0) {
      Alert.alert('Tebrikler! 🎉',
        `${data.points_earned} puan kazandınız!`);
    }

  } catch (error) {
    Alert.alert('Hata', 'Quiz gönderilemedi.');
  } finally {
    setIsSubmitting(false);
  }
};
```

#### C. Submit Button Disabled Edildi (Satır 713-724)

```typescript
<TouchableOpacity
  style={[
    styles.submitButton,
    (quizAnswers.size === 0 || isSubmitting) && styles.submitButtonDisabled
  ]}
  onPress={submitQuiz}
  disabled={quizAnswers.size === 0 || isSubmitting} // ✅ isSubmitting eklendi
>
  <Text style={styles.submitButtonText}>
    {isSubmitting ? 'Gönderiliyor...' : 'Değerlendir'} {/* ✅ Loading text */}
  </Text>
</TouchableOpacity>
```

## Test Planı

### Test 1: Race Condition Testi
**Adımlar:**
1. Bir quiz'e gir ve cevapla
2. "Değerlendir" butonuna hızlıca 10 kez tıkla

**Beklenen:**
- ✅ Sadece 1 kez submit olmalı
- ✅ Buton disabled olmalı (Gönderiliyor... yazmalı)
- ✅ Puan sadece 1 kez eklenmeli

**Kontrol:**
```sql
-- Aynı parent_id ve lesson_id için sadece 1 kayıt olmalı
SELECT parent_id, lesson_id, COUNT(*)
FROM user_progress
GROUP BY parent_id, lesson_id
HAVING COUNT(*) > 1;
-- Sonuç: 0 rows (duplicate yok)
```

### Test 2: Yavaş Network Testi
**Adımlar:**
1. Chrome DevTools → Network → Slow 3G
2. Quiz'i tamamla ve gönder
3. Gönderme sırasında birkaç kez daha tıkla

**Beklenen:**
- ✅ İlk tıklama işlemi devam ederken diğer tıklamalar ignore edilmeli
- ✅ "Gönderiliyor..." yazısı görünmeli
- ✅ Sadece 1 submission olmalı

### Test 3: İlk vs İkinci Deneme
**Adımlar:**
1. Quiz'i ilk kez tamamla → Puan: +8
2. "Sıfırla" ile reset et
3. Tekrar tamamla → Puan: +0 (ilk deneme değil)

**Beklenen:**
- ✅ İlk denemede puan verilmeli
- ✅ İkinci denemede puan verilmemeli
- ✅ Database'de `p_is_first_attempt = false` kontrolü çalışmalı

### Test 4: App Crash During Submission
**Adımlar:**
1. Quiz başlat
2. Submit et
3. Hemen uygulamayı kapat (force quit)
4. Tekrar aç ve puanları kontrol et

**Beklenen:**
- ✅ Transaction tamamlanmışsa: Puan verilmiş olmalı
- ✅ Transaction tamamlanmamışsa: Puan verilmemiş olmalı
- ✅ Hiçbir durumda partial update olmamalı (puan var ama progress yok gibi)

### Test 5: Concurrent Users (Simülasyon)
**SQL Test:**
```sql
-- Terminal 1'de:
SELECT submit_quiz_atomic(
  'user-id-1'::UUID,
  'lesson-id'::UUID,
  8, 10, true
);

-- Aynı anda Terminal 2'de:
SELECT submit_quiz_atomic(
  'user-id-1'::UUID,
  'lesson-id'::UUID,
  8, 10, true
);
```

**Beklenen:**
- ✅ İkinci çağrı `quiz_completed = TRUE` görerek puan vermemeli
- ✅ Toplam puan: initial + 8 (sadece 1 kez)

## Supabase Setup

SQL function'ını çalıştır:

```bash
# Supabase Dashboard → SQL Editor
# submit-quiz-atomic.sql dosyasını kopyala-yapıştır
# "Run" butonuna tıkla
```

**Test et:**
```sql
-- Test query
SELECT submit_quiz_atomic(
  'your-parent-id'::UUID,
  'your-lesson-id'::UUID,
  8,  -- correct_count
  10, -- total_questions
  true -- is_first_attempt
);

-- Sonuç kontrol
SELECT * FROM parent_profiles WHERE id = 'your-parent-id';
SELECT * FROM user_progress WHERE parent_id = 'your-parent-id'
  AND lesson_id = 'your-lesson-id';
```

## Sonuç

✅ **BUG-C4 başarıyla düzeltildi!**

**Düzeltmeler:**
- ✅ Atomic database function ile race condition önlendi
- ✅ Double submission önlendi (`isSubmitting` state)
- ✅ Button disabled state eklendi
- ✅ Loading indicator eklendi ("Gönderiliyor...")
- ✅ Error handling iyileştirildi
- ✅ Success feedback eklendi (Alert with points)

**Korunan:**
- ✅ Quiz sadece 1 kez submit edilir
- ✅ Puanlar doğru verilir
- ✅ İlk deneme sonrası tekrar puan verilmez
- ✅ Database consistency korunur

## Notlar

- `awardPoints` fonksiyonu henüz kaldırılmadı çünkü `handleCompleteLesson` içinde kullanılıyor
- Quiz submission artık güvenli ama lesson completion için de atomic function eklenmeli (BUG-C4'ün devamı)
- Transaction isolation level: PostgreSQL default (READ COMMITTED) yeterli
