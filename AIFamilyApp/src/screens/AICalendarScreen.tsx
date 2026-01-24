import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Activity {
  id: string;
  day: 'monday' | 'wednesday' | 'friday' | 'sunday';
  dayLabel: string;
  type: 'video' | 'game' | 'chat' | 'project';
  typeEmoji: string;
  typeLabel: string;
  duration: string;
  title: string;
  description: string;
  completed: boolean;
}

interface WeeklyTheme {
  id: string;
  weekNumber: number;
  theme: string;
  themeEmoji: string;
  description: string;
  activities: Activity[];
}

interface MonthlyTheme {
  id: string;
  month: string;
  monthEmoji: string;
  title: string;
  description: string;
  weeks: WeeklyTheme[];
}

const MONTHLY_THEMES: MonthlyTheme[] = [
  {
    id: 'm1',
    month: 'Ocak',
    monthEmoji: '📚',
    title: 'AI Temelleri',
    description: 'AI\'nin ne olduğunu ve nasıl çalıştığını keşfediyoruz.',
    weeks: [
      {
        id: 'w1',
        weekNumber: 1,
        theme: 'AI Dedektifi Oluyoruz',
        themeEmoji: '🔍',
        description: 'AI\'yi gerçek hayatta tanıyoruz',
        activities: [
          {
            id: 'a1',
            day: 'monday',
            dayLabel: 'Pazartesi',
            type: 'video',
            typeEmoji: '🎓',
            typeLabel: 'Ders',
            duration: '5 dk',
            title: 'AI Nasıl Öğrenir?',
            description: 'Kısa bir video izleyerek AI\'nin nasıl öğrendiğini keşfedin. Çocuğunuza "Sen nasıl öğreniyorsun?" diye sorun ve karşılaştırın.',
            completed: false,
          },
          {
            id: 'a2',
            day: 'wednesday',
            dayLabel: 'Çarşamba',
            type: 'game',
            typeEmoji: '🎮',
            typeLabel: 'Oyun',
            duration: '15 dk',
            title: 'Gerçek mi AI mi?',
            description: 'Telefonda birlikte görseller bulun. Sırayla "Bu gerçek mi AI yapımı mı?" tahmin edin. En çok doğru bileni kutlayın!',
            completed: false,
          },
          {
            id: 'a3',
            day: 'friday',
            dayLabel: 'Cuma',
            type: 'chat',
            typeEmoji: '💭',
            typeLabel: 'Sohbet',
            duration: '10 dk',
            title: 'Hafta Değerlendirmesi',
            description: '"Bu hafta AI hakkında ne öğrendik?" sorusunu sorun. Çocuğunuzun kendi cümleleriyle anlatmasını dinleyin.',
            completed: false,
          },
          {
            id: 'a4',
            day: 'sunday',
            dayLabel: 'Pazar',
            type: 'project',
            typeEmoji: '🎨',
            typeLabel: 'Proje',
            duration: '30 dk',
            title: 'AI Resim Eleştirmeni',
            description: 'AI ile birlikte bir resim oluşturun. Sonra o resmi analiz edin: "Bu gerçekçi mi?", "AI neleri iyi yaptı?", "Neleri garip?"',
            completed: false,
          },
        ],
      },
      {
        id: 'w2',
        weekNumber: 2,
        theme: 'Evdeki AI Araçları',
        themeEmoji: '🏠',
        description: 'Günlük hayatta AI nerede?',
        activities: [
          {
            id: 'a5',
            day: 'monday',
            dayLabel: 'Pazartesi',
            type: 'video',
            typeEmoji: '🎓',
            typeLabel: 'Ders',
            duration: '5 dk',
            title: 'Siri ve Alexa Nasıl Çalışır?',
            description: 'Sesli asistanların nasıl çalıştığını öğrenin. Sonra evdeki sesli asistanla birlikte deneyler yapın.',
            completed: false,
          },
          {
            id: 'a6',
            day: 'wednesday',
            dayLabel: 'Çarşamba',
            type: 'game',
            typeEmoji: '🎮',
            typeLabel: 'Etkinlik',
            duration: '15 dk',
            title: 'AI Avı',
            description: 'Evde AI kullanan cihazları bulun. Her biri için "Bu AI nasıl yardımcı oluyor?" sorusunu yanıtlayın.',
            completed: false,
          },
          {
            id: 'a7',
            day: 'friday',
            dayLabel: 'Cuma',
            type: 'chat',
            typeEmoji: '💭',
            typeLabel: 'Sohbet',
            duration: '10 dk',
            title: 'AI Olmadan Nasıl Olurdu?',
            description: '"AI olmasa hayatımız nasıl değişirdi?" sorusunu tartışın. Geçmişte insanlar nasıl yapıyordu?',
            completed: false,
          },
          {
            id: 'a8',
            day: 'sunday',
            dayLabel: 'Pazar',
            type: 'project',
            typeEmoji: '🎨',
            typeLabel: 'Proje',
            duration: '30 dk',
            title: 'Aile AI Haritası',
            description: 'Bir kağıda evinizin haritasını çizin. AI kullanan her cihazı işaretleyin ve etiketleyin.',
            completed: false,
          },
        ],
      },
      {
        id: 'w3',
        weekNumber: 3,
        theme: 'AI ile Sohbet Etmek',
        themeEmoji: '💬',
        description: 'ChatGPT ve benzeri araçlarla doğru iletişim kurmayı öğreniyoruz',
        activities: [
          {
            id: 'a17',
            day: 'monday',
            dayLabel: 'Pazartesi',
            type: 'video',
            typeEmoji: '🎓',
            typeLabel: 'Ders',
            duration: '5 dk',
            title: 'AI\'ye Nasıl Soru Sorulur?',
            description: 'İyi ve kötü soru örneklerini inceleyin. "Ödev yap" yerine "Şunu anlamama yardım et" farkını konuşun.',
            completed: false,
          },
          {
            id: 'a18',
            day: 'wednesday',
            dayLabel: 'Çarşamba',
            type: 'game',
            typeEmoji: '🎮',
            typeLabel: 'Oyun',
            duration: '15 dk',
            title: 'Prompt Yarışması',
            description: 'Aynı konuda farklı sorular sorun. Hangisi daha iyi cevap aldı? En iyi "prompt"u seçin.',
            completed: false,
          },
          {
            id: 'a19',
            day: 'friday',
            dayLabel: 'Cuma',
            type: 'chat',
            typeEmoji: '💭',
            typeLabel: 'Sohbet',
            duration: '10 dk',
            title: 'AI Doğru mu Söylüyor?',
            description: 'AI\'dan aldığınız bir cevabı birlikte kontrol edin. Doğru mu? Nasıl teyit ederiz?',
            completed: false,
          },
          {
            id: 'a20',
            day: 'sunday',
            dayLabel: 'Pazar',
            type: 'project',
            typeEmoji: '🎨',
            typeLabel: 'Proje',
            duration: '30 dk',
            title: 'Hikaye Yazma Ortaklığı',
            description: 'AI ile birlikte kısa bir hikaye yazın. Siz bir cümle, AI bir cümle. Sonucu birlikte değerlendirin.',
            completed: false,
          },
        ],
      },
      {
        id: 'w4',
        weekNumber: 4,
        theme: 'AI ve Yaratıcılık',
        themeEmoji: '🎨',
        description: 'AI\'yı yaratıcı projeler için nasıl kullanırız?',
        activities: [
          {
            id: 'a21',
            day: 'monday',
            dayLabel: 'Pazartesi',
            type: 'video',
            typeEmoji: '🎓',
            typeLabel: 'Ders',
            duration: '5 dk',
            title: 'AI Sanatı Nedir?',
            description: 'AI ile yapılmış sanat eserlerini inceleyin. Bu gerçek sanat mı? Tartışın.',
            completed: false,
          },
          {
            id: 'a22',
            day: 'wednesday',
            dayLabel: 'Çarşamba',
            type: 'game',
            typeEmoji: '🎮',
            typeLabel: 'Oyun',
            duration: '15 dk',
            title: 'Hayal Et, AI Çizsin',
            description: 'Çocuğunuz hayal ettiği bir şeyi tarif etsin, AI görsel oluştursun. Hayaline ne kadar yakın?',
            completed: false,
          },
          {
            id: 'a23',
            day: 'friday',
            dayLabel: 'Cuma',
            type: 'chat',
            typeEmoji: '💭',
            typeLabel: 'Sohbet',
            duration: '10 dk',
            title: 'İnsan mı AI mı Daha Yaratıcı?',
            description: 'Yaratıcılık nedir? AI yaratıcı olabilir mi? Bu konuyu birlikte tartışın.',
            completed: false,
          },
          {
            id: 'a24',
            day: 'sunday',
            dayLabel: 'Pazar',
            type: 'project',
            typeEmoji: '🎨',
            typeLabel: 'Proje',
            duration: '30 dk',
            title: 'AI Destekli Proje',
            description: 'AI yardımıyla bir doğum günü kartı, poster veya davetiye tasarlayın. Sonucu bastırıp kullanın!',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'm2',
    month: 'Şubat',
    monthEmoji: '🔒',
    title: 'AI Güvenliği',
    description: 'AI ile güvenli şekilde nasıl etkileşime girilir öğreniyoruz.',
    weeks: [
      {
        id: 'w3',
        weekNumber: 1,
        theme: 'Gizli Bilgiler',
        themeEmoji: '🤫',
        description: 'AI\'ye ne söyleyip ne söylemeyeceğimizi öğreniyoruz',
        activities: [
          {
            id: 'a9',
            day: 'monday',
            dayLabel: 'Pazartesi',
            type: 'video',
            typeEmoji: '🎓',
            typeLabel: 'Ders',
            duration: '5 dk',
            title: 'Hangi Bilgiler Gizli?',
            description: 'Senaryo kütüphanesinden "Gizli Bilgiler Paylaştım" senaryosunu birlikte okuyun.',
            completed: false,
          },
          {
            id: 'a10',
            day: 'wednesday',
            dayLabel: 'Çarşamba',
            type: 'game',
            typeEmoji: '🎮',
            typeLabel: 'Oyun',
            duration: '15 dk',
            title: 'Gizli mi Değil mi?',
            description: 'Sırayla bilgi örnekleri verin: "Adres", "Yaş", "En sevdiğim renk". Çocuk "Gizli" veya "Gizli değil" desin.',
            completed: false,
          },
          {
            id: 'a11',
            day: 'friday',
            dayLabel: 'Cuma',
            type: 'chat',
            typeEmoji: '💭',
            typeLabel: 'Sohbet',
            duration: '10 dk',
            title: 'Neden Gizli Tutuyoruz?',
            description: '"Gizli bilgileri neden korumamız gerekiyor?" sorusunu tartışın. Gerçek örnekler verin.',
            completed: false,
          },
          {
            id: 'a12',
            day: 'sunday',
            dayLabel: 'Pazar',
            type: 'project',
            typeEmoji: '🎨',
            typeLabel: 'Proje',
            duration: '30 dk',
            title: 'Gizlilik Posteri',
            description: 'Bir poster yapın: "AI\'ye Söyleme Listesi" ve "AI\'ye Söyleyebilirsin Listesi". Odaya asın.',
            completed: false,
          },
        ],
      },
      {
        id: 'w4',
        weekNumber: 2,
        theme: 'Deepfake Dedektifleri',
        themeEmoji: '🎭',
        description: 'Sahte içeriği nasıl tespit ederiz?',
        activities: [
          {
            id: 'a13',
            day: 'monday',
            dayLabel: 'Pazartesi',
            type: 'video',
            typeEmoji: '🎓',
            typeLabel: 'Ders',
            duration: '5 dk',
            title: 'Deepfake Nedir?',
            description: 'Senaryo kütüphanesinden "Deepfake ile Aldatıldım" senaryosunu okuyun.',
            completed: false,
          },
          {
            id: 'a14',
            day: 'wednesday',
            dayLabel: 'Çarşamba',
            type: 'game',
            typeEmoji: '🎮',
            typeLabel: 'Oyun',
            duration: '15 dk',
            title: 'Gerçek Video Avı',
            description: 'YouTube\'da birlikte video izleyin. "Bu gerçek mi?" diye 3 soru sorun ve cevapları analiz edin.',
            completed: false,
          },
          {
            id: 'a15',
            day: 'friday',
            dayLabel: 'Cuma',
            type: 'chat',
            typeEmoji: '💭',
            typeLabel: 'Sohbet',
            duration: '10 dk',
            title: 'Kontrol Listesi',
            description: 'Bir video izlediğimizde nasıl kontrol edebiliriz? 3 maddelik liste oluşturun.',
            completed: false,
          },
          {
            id: 'a16',
            day: 'sunday',
            dayLabel: 'Pazar',
            type: 'project',
            typeEmoji: '🎨',
            typeLabel: 'Proje',
            duration: '30 dk',
            title: 'Dedektif Rehberi',
            description: 'Bir "Sahte İçerik Tespit Rehberi" oluşturun: İpuçları, kontrol soruları, örnek durumlar.',
            completed: false,
          },
        ],
      },
      {
        id: 'w5',
        weekNumber: 3,
        theme: 'Güvenli Şifreler ve Hesaplar',
        themeEmoji: '🔐',
        description: 'Dijital hesaplarımızı nasıl koruruz?',
        activities: [
          {
            id: 'a25',
            day: 'monday',
            dayLabel: 'Pazartesi',
            type: 'video',
            typeEmoji: '🎓',
            typeLabel: 'Ders',
            duration: '5 dk',
            title: 'Güçlü Şifre Nasıl Olur?',
            description: 'İyi ve kötü şifre örneklerini inceleyin. "123456" neden kötü? Güçlü şifre nasıl oluşturulur?',
            completed: false,
          },
          {
            id: 'a26',
            day: 'wednesday',
            dayLabel: 'Çarşamba',
            type: 'game',
            typeEmoji: '🎮',
            typeLabel: 'Oyun',
            duration: '15 dk',
            title: 'Şifre Kırma Oyunu',
            description: 'Basit şifreler oluşturup birbirinizin şifresini tahmin etmeye çalışın. Hangisi daha güvenli?',
            completed: false,
          },
          {
            id: 'a27',
            day: 'friday',
            dayLabel: 'Cuma',
            type: 'chat',
            typeEmoji: '💭',
            typeLabel: 'Sohbet',
            duration: '10 dk',
            title: 'Hesabım Çalınırsa Ne Olur?',
            description: 'Birinin hesabınıza girerse neler yapabilir? Bu senaryoyu konuşun ve önlemleri tartışın.',
            completed: false,
          },
          {
            id: 'a28',
            day: 'sunday',
            dayLabel: 'Pazar',
            type: 'project',
            typeEmoji: '🎨',
            typeLabel: 'Proje',
            duration: '30 dk',
            title: 'Aile Şifre Sistemi',
            description: 'Aile için güvenli şifre oluşturma kuralları belirleyin. Bir "şifre güvenlik kontrol listesi" yapın.',
            completed: false,
          },
        ],
      },
      {
        id: 'w6',
        weekNumber: 4,
        theme: 'Online Davranış Kuralları',
        themeEmoji: '🤝',
        description: 'İnternette nasıl davranmalıyız?',
        activities: [
          {
            id: 'a29',
            day: 'monday',
            dayLabel: 'Pazartesi',
            type: 'video',
            typeEmoji: '🎓',
            typeLabel: 'Ders',
            duration: '5 dk',
            title: 'Dijital Vatandaşlık',
            description: 'İnternette de gerçek hayattaki gibi kurallar var. Nazik olmak, saygılı olmak ne demek?',
            completed: false,
          },
          {
            id: 'a30',
            day: 'wednesday',
            dayLabel: 'Çarşamba',
            type: 'game',
            typeEmoji: '🎮',
            typeLabel: 'Oyun',
            duration: '15 dk',
            title: 'Doğru mu Yanlış mı?',
            description: 'Online davranış senaryoları okuyun. Her biri için "Doğru" veya "Yanlış" deyin ve nedenini açıklayın.',
            completed: false,
          },
          {
            id: 'a31',
            day: 'friday',
            dayLabel: 'Cuma',
            type: 'chat',
            typeEmoji: '💭',
            typeLabel: 'Sohbet',
            duration: '10 dk',
            title: 'Siber Zorbalık Nedir?',
            description: 'Online zorbalık örneklerini konuşun. Böyle bir durumla karşılaşınca ne yapmalı?',
            completed: false,
          },
          {
            id: 'a32',
            day: 'sunday',
            dayLabel: 'Pazar',
            type: 'project',
            typeEmoji: '🎨',
            typeLabel: 'Proje',
            duration: '30 dk',
            title: 'Aile İnternet Sözleşmesi',
            description: 'Birlikte bir "Aile İnternet Kullanım Sözleşmesi" hazırlayın. Herkes imzalasın!',
            completed: false,
          },
        ],
      },
    ],
  },
];

const STORAGE_KEY = 'ai_calendar_completed_activities';

const AICalendarScreen: React.FC = () => {
  const navigation = useNavigation();

  const [selectedMonth, setSelectedMonth] = useState<MonthlyTheme>(MONTHLY_THEMES[0]);
  const [selectedWeek, setSelectedWeek] = useState<WeeklyTheme>(MONTHLY_THEMES[0].weeks[0]);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());

  // Kaydedilmiş tamamlanan aktiviteleri yükle
  const loadCompletedActivities = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const completedIds = JSON.parse(saved) as string[];
        setCompletedActivities(new Set(completedIds));
      }
    } catch (error) {
      console.error('Takvim verisi yüklenirken hata:', error);
    }
  }, []);

  // Sayfa her açıldığında yükle
  useFocusEffect(
    useCallback(() => {
      loadCompletedActivities();
    }, [loadCompletedActivities])
  );

  // Tamamlanan aktiviteleri kaydet
  const saveCompletedActivities = async (completedIds: Set<string>) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...completedIds]));
    } catch (error) {
      console.error('Takvim verisi kaydedilirken hata:', error);
    }
  };

  const toggleActivityCompletion = (activityId: string) => {
    const newCompleted = new Set(completedActivities);

    if (newCompleted.has(activityId)) {
      newCompleted.delete(activityId);
    } else {
      newCompleted.add(activityId);
    }

    setCompletedActivities(newCompleted);
    saveCompletedActivities(newCompleted);
  };

  // Aktivitenin tamamlanıp tamamlanmadığını kontrol et
  const isActivityCompleted = (activityId: string) => {
    return completedActivities.has(activityId);
  };

  const getCompletionStats = () => {
    const total = selectedWeek.activities.length;
    const completed = selectedWeek.activities.filter(a => isActivityCompleted(a.id)).length;
    return { total, completed, percentage: (completed / total) * 100 };
  };

  const stats = getCompletionStats();

  const getDayColor = (type: string) => {
    switch (type) {
      case 'video': return '#32738C';
      case 'game': return '#A7CBD9';
      case 'chat': return '#F2BFAC';
      case 'project': return '#F26B5E';
      default: return '#999999';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🗓️ AI Takvimi</Text>
        <TouchableOpacity onPress={() => setShowMonthSelector(true)} style={styles.calendarButton}>
          <Text style={styles.calendarButtonText}>📅</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Month Info */}
        <TouchableOpacity
          style={styles.monthCard}
          onPress={() => setShowMonthSelector(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.monthEmoji}>{selectedMonth.monthEmoji}</Text>
          <Text style={styles.monthTitle}>{selectedMonth.month}: {selectedMonth.title}</Text>
          <Text style={styles.monthDescription}>{selectedMonth.description}</Text>
          <View style={styles.changeMonthButton}>
            <Text style={styles.changeMonthButtonText}>Ay Değiştir 📅</Text>
          </View>
        </TouchableOpacity>

        {/* Week Selector */}
        <View style={styles.weekSelectorSection}>
          <Text style={styles.sectionTitle}>Hafta Seçin</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
            {selectedMonth.weeks.map((week) => (
              <TouchableOpacity
                key={week.id}
                style={[
                  styles.weekChip,
                  selectedWeek.id === week.id && styles.weekChipActive,
                ]}
                onPress={() => setSelectedWeek(week)}
              >
                <Text
                  style={[
                    styles.weekChipText,
                    selectedWeek.id === week.id && styles.weekChipTextActive,
                  ]}
                >
                  Hafta {week.weekNumber}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Current Week Theme */}
        <View style={styles.weekThemeCard}>
          <Text style={styles.weekThemeEmoji}>{selectedWeek.themeEmoji}</Text>
          <Text style={styles.weekThemeTitle}>Hafta {selectedWeek.weekNumber}: {selectedWeek.theme}</Text>
          <Text style={styles.weekThemeDescription}>{selectedWeek.description}</Text>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${stats.percentage}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {stats.completed} / {stats.total} tamamlandı
            </Text>
          </View>
        </View>

        {/* Weekly Activities */}
        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Bu Haftanın Aktiviteleri</Text>

          {selectedWeek.activities.map((activity) => {
            const completed = isActivityCompleted(activity.id);
            return (
              <TouchableOpacity
                key={activity.id}
                style={[
                  styles.activityCard,
                  completed && styles.activityCardCompleted,
                  { borderLeftColor: getDayColor(activity.type) },
                ]}
                onPress={() => setSelectedActivity(activity)}
                activeOpacity={0.7}
              >
                <View style={styles.activityHeader}>
                  <View style={styles.activityDay}>
                    <Text style={styles.activityDayLabel}>{activity.dayLabel}</Text>
                    <Text style={styles.activityTypeEmoji}>{activity.typeEmoji}</Text>
                  </View>

                  <View style={styles.activityInfo}>
                    <View style={styles.activityTitleRow}>
                      <Text style={[styles.activityTitle, completed && styles.activityTitleCompleted]}>
                        {activity.title}
                      </Text>
                      <TouchableOpacity
                        style={styles.activityCheckbox}
                        onPress={() => toggleActivityCompletion(activity.id)}
                      >
                        {completed ? (
                          <Text style={styles.activityCheckboxChecked}>✓</Text>
                        ) : (
                          <View style={styles.activityCheckboxEmpty} />
                        )}
                      </TouchableOpacity>
                    </View>

                    <View style={styles.activityMeta}>
                      <Text style={styles.activityMetaText}>{activity.typeLabel}</Text>
                      <Text style={styles.activityMetaText}>•</Text>
                      <Text style={styles.activityMetaText}>{activity.duration}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Motivation */}
        {stats.completed === stats.total && stats.total > 0 && (
          <View style={styles.motivationCard}>
            <Text style={styles.motivationEmoji}>🎉</Text>
            <Text style={styles.motivationTitle}>Harika! Haftalık Plan Tamamlandı!</Text>
            <Text style={styles.motivationText}>
              Bu haftanın tüm aktivitelerini tamamladınız. Sonraki haftaya geçebilirsiniz!
            </Text>
          </View>
        )}

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Takvim Kullanım İpuçları</Text>
          <Text style={styles.tipsText}>
            • Aktiviteleri baskı altında değil, keyifle yapın{'\n'}
            • Hafta içi yetişemediniz mi? Sorun değil, hafta sonuna taşıyın{'\n'}
            • Çocuğunuz bir aktiviteyi sevmediyse atlayabilirsiniz{'\n'}
            • Her aktivite sonrası kutlama yapmayı unutmayın! 🎊
          </Text>
        </View>
      </ScrollView>

      {/* Activity Detail Modal */}
      <Modal
        visible={selectedActivity !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedActivity(null)}
      >
        {selectedActivity && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTypeEmoji}>{selectedActivity.typeEmoji}</Text>
                <TouchableOpacity
                  onPress={() => setSelectedActivity(null)}
                  style={styles.modalCloseButton}
                >
                  <Text style={styles.modalCloseButtonText}>×</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalDay}>{selectedActivity.dayLabel}</Text>
              <Text style={styles.modalTitle}>{selectedActivity.title}</Text>

              <View style={styles.modalMetaRow}>
                <View style={styles.modalMetaItem}>
                  <Text style={styles.modalMetaLabel}>Tür</Text>
                  <Text style={styles.modalMetaValue}>{selectedActivity.typeLabel}</Text>
                </View>
                <View style={styles.modalMetaItem}>
                  <Text style={styles.modalMetaLabel}>Süre</Text>
                  <Text style={styles.modalMetaValue}>{selectedActivity.duration}</Text>
                </View>
              </View>

              <View style={styles.modalDescriptionSection}>
                <Text style={styles.modalSectionTitle}>📝 Nasıl Yapılır?</Text>
                <Text style={styles.modalDescription}>{selectedActivity.description}</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.modalCompleteButton,
                  isActivityCompleted(selectedActivity.id) && styles.modalCompleteButtonCompleted,
                ]}
                onPress={() => {
                  toggleActivityCompletion(selectedActivity.id);
                  setSelectedActivity(null);
                }}
              >
                <Text style={styles.modalCompleteButtonText}>
                  {isActivityCompleted(selectedActivity.id) ? '✓ Tamamlandı' : 'Tamamla'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>

      {/* Month Selector Modal */}
      <Modal
        visible={showMonthSelector}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMonthSelector(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.monthSelectorContent}>
            <View style={styles.monthSelectorHeader}>
              <Text style={styles.monthSelectorTitle}>Ay Seçin</Text>
              <TouchableOpacity
                onPress={() => setShowMonthSelector(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
              {MONTHLY_THEMES.map((month) => (
                <TouchableOpacity
                  key={month.id}
                  style={[
                    styles.monthSelectorCard,
                    selectedMonth.id === month.id && styles.monthSelectorCardActive,
                  ]}
                  onPress={() => {
                    setSelectedMonth(month);
                    setSelectedWeek(month.weeks[0]);
                    setShowMonthSelector(false);
                  }}
                >
                  <Text style={styles.monthSelectorEmoji}>{month.monthEmoji}</Text>
                  <View style={styles.monthSelectorInfo}>
                    <Text style={styles.monthSelectorMonth}>{month.month}</Text>
                    <Text style={styles.monthSelectorTheme}>{month.title}</Text>
                    <Text style={styles.monthSelectorDescription}>{month.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#193140',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  calendarButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarButtonText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  monthCard: {
    backgroundColor: '#F2BFAC',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F26B5E',
  },
  monthEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  monthDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  changeMonthButton: {
    backgroundColor: '#F26B5E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  changeMonthButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  weekSelectorSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  weekScroll: {
    flexDirection: 'row',
  },
  weekChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  weekChipActive: {
    backgroundColor: '#F26B5E',
    borderColor: '#F26B5E',
  },
  weekChipText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  weekChipTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  weekThemeCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#32738C',
  },
  weekThemeEmoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 12,
  },
  weekThemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  weekThemeDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F26B5E',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: '#F26B5E',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activitiesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activityCardCompleted: {
    backgroundColor: '#F9FFF9',
    opacity: 0.8,
  },
  activityHeader: {
    flexDirection: 'row',
  },
  activityDay: {
    width: 80,
    alignItems: 'center',
    marginRight: 12,
  },
  activityDayLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 6,
  },
  activityTypeEmoji: {
    fontSize: 32,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 8,
  },
  activityTitleCompleted: {
    color: '#999999',
    textDecorationLine: 'line-through',
  },
  activityCheckbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityCheckboxEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  activityCheckboxChecked: {
    fontSize: 20,
    color: '#2ECC71',
  },
  activityMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  activityMetaText: {
    fontSize: 12,
    color: '#999999',
  },
  motivationCard: {
    backgroundColor: '#FFF9E5',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  motivationEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  motivationText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  tipsCard: {
    backgroundColor: '#E8F5E9',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 13,
    color: '#424242',
    lineHeight: 22,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTypeEmoji: {
    fontSize: 48,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 36,
    color: '#999999',
    lineHeight: 36,
  },
  modalDay: {
    fontSize: 14,
    color: '#F26B5E',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  modalMetaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  modalMetaItem: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 12,
    borderRadius: 8,
  },
  modalMetaLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  modalMetaValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalDescriptionSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 24,
  },
  modalCompleteButton: {
    backgroundColor: '#F26B5E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCompleteButtonCompleted: {
    backgroundColor: '#95A5A6',
  },
  modalCompleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Month Selector
  monthSelectorContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '70%',
  },
  monthSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthSelectorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  monthSelectorCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F7FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  monthSelectorCardActive: {
    borderColor: '#F26B5E',
    backgroundColor: '#F2BFAC',
  },
  monthSelectorEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  monthSelectorInfo: {
    flex: 1,
  },
  monthSelectorMonth: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  monthSelectorTheme: {
    fontSize: 16,
    color: '#F26B5E',
    fontWeight: '600',
    marginBottom: 4,
  },
  monthSelectorDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
});

export default AICalendarScreen;
