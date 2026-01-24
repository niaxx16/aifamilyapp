import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import { supabase } from '../services/supabase';
import { Lesson } from '../types/database.types';
import { useChild } from '../context/ChildContext';

type NavigationProp = StackNavigationProp<any>;

interface LearningCategory {
  id: string;
  name: string;
  emoji: string;
  theme: string;
  goal: string;
  color: string;
  bgColor: string;
  subcategory: string;
}

interface Podcast {
  id: string;
  title: string;
  emoji: string;
  description: string;
  duration: string;
  audioUrl?: string;
}

const PODCASTS: Podcast[] = [
  {
    id: 'p1',
    title: 'Yapay Zeka Çağında Yeni Ebeveynlik Rolleri',
    emoji: '❤️',
    description: '"Kontrol eden" değil, "rehberlik eden" ebeveyn olmanın ipuçları.',
    duration: '6 dk',
    audioUrl: 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/podcasts/audio/yeni-ebeveynlik-rolleri.mp3',
  },
  {
    id: 'p2',
    title: 'Yapay Zekâ Nedir, Neden Her Yerde?',
    emoji: '🧠',
    description: 'Yapay zekânın temelleri — karmaşık değil, hayatımızın içinde.',
    duration: '6 dk',
    audioUrl: 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/podcasts/audio/yapay-zeka-nedir-neden-her-yerde.mp3',
  },
  {
    id: 'p3',
    title: 'Çocuğum Yapay Zeka Kullanıyor Ne Yapmalıyım?',
    emoji: '💬',
    description: 'Yasaklamadan rehberlik etmenin yolları.',
    duration: '7 dk',
    audioUrl: 'https://ssfjcnotebecmwtxjryt.supabase.co/storage/v1/object/public/podcasts/audio/ne-yapmaliyim.mp3',
  },
  {
    id: 'p4',
    title: 'Robotlar mı Zeki, Yapay Zekâ mı?',
    emoji: '🤖',
    description: 'Beyin mi, beden mi? Aralarındaki farkı eğlenceli örneklerle anlatıyoruz.',
    duration: '10 dk',
  },
  {
    id: 'p5',
    title: 'AI Yanlış Bilgi Verirse Ne Yapmalı?',
    emoji: '🔍',
    description: 'Dijital dünyada "gerçek" ile "üretim"i ayırt etme rehberi.',
    duration: '11 dk',
  },
  {
    id: 'p6',
    title: 'Ekran Süresi mi, Öğrenme Süresi mi?',
    emoji: '🧩',
    description: 'Dengeli teknoloji kullanımı için aile içi stratejiler.',
    duration: '13 dk',
  },
  {
    id: 'p7',
    title: 'AI ve Yaratıcılık: Çocuğum Üretiyor mu, Tüketiyor mu?',
    emoji: '🎨',
    description: 'Yaratıcı üretimi destekleyen basit fikirler.',
    duration: '12 dk',
  },
  {
    id: 'p8',
    title: 'AI Bağımlılığı mı, Merak mı?',
    emoji: '⚠️',
    description: 'Çocuğun teknolojiyle kurduğu ilişkiyi anlamak.',
    duration: '11 dk',
  },
  {
    id: 'p9',
    title: 'Veri Gizliliği: Çocuğumun Dijital Ayak İzi',
    emoji: '🔒',
    description: 'Kişisel veriyi korumayı birlikte öğrenmek.',
    duration: '13 dk',
  },
  {
    id: 'p10',
    title: 'Geleceğe Hazırlık: AI ile Bilge Aile Olmak',
    emoji: '🌟',
    description: 'Ailenizle birlikte yapay zekâyı güvenle, bilinçle keşfetmek.',
    duration: '16 dk',
  },
];

const LEARNING_CATEGORIES: LearningCategory[] = [
  {
    id: '1',
    name: 'Temel Bilgi',
    emoji: '🟢',
    theme: 'Yapay zekayı anlamak',
    goal: 'Kavramları anlamak',
    color: '#193140',
    bgColor: '#E8F0F5',
    subcategory: 'temel_bilgi'
  },
  {
    id: '2',
    name: 'Günlük Hayatta AI',
    emoji: '🔵',
    theme: 'Kullanırken farkında olmak',
    goal: 'AI\'yı fark etmek',
    color: '#32738C',
    bgColor: '#E8F4F8',
    subcategory: 'gunluk_hayat'
  },
  {
    id: '3',
    name: 'Güvenlik ve Gizlilik',
    emoji: '🟡',
    theme: 'Kendini korumayı öğrenmek',
    goal: 'Kendini korumak',
    color: '#C5A84C',
    bgColor: '#FDF9E8',
    subcategory: 'guvenlik'
  },
  {
    id: '4',
    name: 'Eleştirel Düşünme ve Etik',
    emoji: '🟠',
    theme: 'Değerleri korumak',
    goal: 'Değerleri korumak',
    color: '#F26B5E',
    bgColor: '#FEF0EE',
    subcategory: 'etik'
  },
  {
    id: '5',
    name: 'Uygulama ve Gelecek',
    emoji: '🔴',
    theme: 'Sorumlu ve yaratıcı kullanıcı olmak',
    goal: 'Sorumlu kullanmak',
    color: '#F26B5E',
    bgColor: '#FEF0EE',
    subcategory: 'gelecek'
  }
];

const LearnScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { activeChild } = useChild();
  const isFocused = useIsFocused();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isPodcastExpanded, setIsPodcastExpanded] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingPodcastId, setPlayingPodcastId] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // Ekran her görünür olduğunda dersleri yenile
  // Ekran blur olduğunda ses dosyasını temizle
  useFocusEffect(
    React.useCallback(() => {
      if (activeChild) {
        fetchLessons();
      }

      // Cleanup: Screen blur/unmount olduğunda
      return () => {
        if (sound) {
          sound.unloadAsync().catch((error) => {
            console.error('Audio cleanup error:', error);
          });
        }
      };
    }, [activeChild, sound])
  );

  // Screen blur olduğunda ses dosyasını duraklat
  useEffect(() => {
    const pauseAudioOnBlur = async () => {
      if (!isFocused && sound) {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded && status.isPlaying) {
            await sound.pauseAsync();
          }
        } catch (error) {
          console.error('Audio pause error:', error);
        }
      }
    };

    pauseAudioOnBlur();
  }, [isFocused, sound]);

  const fetchLessons = async () => {
    if (!activeChild) return;

    try {
      // Dersleri çek
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .order('order_number', { ascending: true });

      if (lessonsError) throw lessonsError;

      // Tamamlanan dersleri çek (ebeveyn profilinden)
      const parentId = activeChild.parent_id;
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('parent_id', parentId || activeChild.id)
        .eq('completed', true);

      if (progressError) throw progressError;

      setLessons(lessonsData || []);
      const completedSet = new Set(progressData?.map(p => p.lesson_id) || []);
      setCompletedLessons(completedSet);
    } catch (error) {
      console.error('Dersler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.has(lessonId);
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'ai_basics': return '🤖';
      case 'parenting_ai': return '👨‍👩‍👧';
      case 'ethics_safety': return '🛡️';
      default: return '📚';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty);
  };

  const getLessonsByCategory = (subcategory: string) => {
    return lessons.filter(lesson => lesson.subcategory === subcategory);
  };

  const getCategoryProgress = (subcategory: string) => {
    const categoryLessons = getLessonsByCategory(subcategory);
    const completed = categoryLessons.filter(l => isLessonCompleted(l.id)).length;
    const total = categoryLessons.length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.has(categoryId);
  };

  const handlePodcastClick = async (podcast: Podcast) => {
    if (!podcast.audioUrl) {
      alert(`${podcast.title}\n\nBu bölüm için ses dosyası henüz yüklenmedi.`);
      return;
    }

    try {
      // Eğer aynı podcast çalıyorsa, durdur
      if (playingPodcastId === podcast.id && sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await sound.pauseAsync();
          setPlayingPodcastId(null);
          return;
        }
      }

      // Önceki ses dosyasını temizle
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        setPlayingPodcastId(null);
      }

      setIsLoadingAudio(true);

      // Ses URL'sini belirle
      let audioUri: string;

      // Eğer URL zaten tam bir URL ise (http:// veya https:// ile başlıyorsa), direkt kullan
      if (podcast.audioUrl.startsWith('http://') || podcast.audioUrl.startsWith('https://')) {
        audioUri = podcast.audioUrl;
        console.log('Full URL kullanılıyor:', audioUri);
      } else {
        // Değilse, Supabase Storage'dan public URL oluştur
        const { data } = supabase.storage
          .from('podcasts')
          .getPublicUrl(podcast.audioUrl);

        if (!data?.publicUrl) {
          alert('Ses dosyası URL\'i oluşturulamadı.\n\nLütfen şunları kontrol edin:\n\n1. Supabase Storage\'da "podcasts" bucket\'ını oluşturun\n2. Bucket\'ı public yapın (Settings > Public bucket: ON)\n3. Ses dosyasını yükleyin: audio/yeni-ebeveynlik-rolleri.mp3\n\n💡 VEYA daha kolay yol:\n\nSupabase Storage\'dan dosyanın tam URL\'ini kopyalayıp audioUrl alanına yapıştırın.');
          setIsLoadingAudio(false);
          return;
        }

        audioUri = data.publicUrl;
        console.log('Supabase Storage URL oluşturuldu:', audioUri);
      }

      // Ses dosyasını yükle ve çal
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setPlayingPodcastId(podcast.id);
    } catch (error: any) {
      console.error('Podcast yükleme hatası:', error);

      let errorMessage = 'Ses dosyası çalınamadı.\n\n';

      if (error.message?.includes('404')) {
        errorMessage += '❌ 404 - Ses dosyası bulunamadı.\n\nSupabase Storage\'da şunları kontrol edin:\n• Bucket adı: podcasts\n• Dosya yolu: audio/yeni-ebeveynlik-rolleri.mp3\n• Dosya yüklendi mi?\n\n💡 KOLAY ÇÖZÜM:\n1. Supabase\'de Storage > podcasts bucket\'ını açın\n2. Dosyaya sağ tıklayın > "Copy URL" seçin\n3. Kopyaladığınız URL\'i kodda audioUrl alanına yapıştırın';
      } else if (error.message?.includes('400')) {
        errorMessage += '❌ 400 - Geçersiz istek.\n\nMuhtemel sebepler:\n• Bucket public değil\n• Dosya yolu yanlış\n• Ses formatı desteklenmiyor\n\n💡 KOLAY ÇÖZÜM:\n1. Supabase\'de Storage > podcasts bucket\'ını açın\n2. Dosyaya sağ tıklayın > "Copy URL" seçin\n3. Kopyaladığınız URL\'i kodda audioUrl alanına yapıştırın\n\n(Tıpkı video URL\'leri gibi)';
      } else if (error.message?.includes('CORS')) {
        errorMessage += 'CORS hatası. Supabase projenizde CORS ayarlarını kontrol edin.';
      } else {
        errorMessage += `Hata detayı: ${error.message || 'Bilinmeyen hata'}\n\n💡 ÇÖZÜM ÖNERİSİ:\nSupabase Storage\'dan dosyanın tam URL\'ini alıp kodda kullanmayı deneyin.`;
      }

      alert(errorMessage);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded && status.didJustFinish) {
      setPlayingPodcastId(null);
    }
  };

  if (loading && activeChild) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#193140" />
        <Text style={styles.loadingText}>Dersler yükleniyor...</Text>
      </View>
    );
  }

  if (!activeChild) {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require('../../assets/learn-hero.png')}
          style={styles.header}
          imageStyle={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>📚</Text>
            </View>
            <Text style={styles.infoTitle}>Çocuk Profili Gerekli</Text>
            <Text style={styles.infoText}>
              Yaş grubuna uygun dersleri görebilmek için öncelikle çocuğunuzun profilini oluşturmanız gerekmektedir.
            </Text>
            <Text style={styles.infoSteps}>
              <Text style={styles.infoStepBold}>Nasıl başlarım?</Text>
              {'\n'}1. Profil sekmesine gidin
              {'\n'}2. "Çocuk Ekle" butonuna tıklayın
              {'\n'}3. Çocuğunuzun bilgilerini girin
              {'\n'}4. Bu sayfaya geri dönerek dersleri keşfedin
            </Text>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.infoButtonText}>Çocuk Profili Oluştur 👤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../assets/learn-hero.png')}
        style={styles.header}
        imageStyle={styles.headerImage}
        resizeMode="cover"
      />


      <View style={styles.content}>
        {LEARNING_CATEGORIES.map((category) => {
          const categoryLessons = getLessonsByCategory(category.subcategory);
          const progress = getCategoryProgress(category.subcategory);

          if (categoryLessons.length === 0) return null;

          const isExpanded = isCategoryExpanded(category.id);

          return (
            <View key={category.id} style={styles.categorySection}>
              {/* Kategori Başlığı - Tıklanabilir */}
              <TouchableOpacity
                style={[styles.categoryHeader, { backgroundColor: category.bgColor }]}
                onPress={() => toggleCategory(category.id)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryTitleRow}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  <View style={styles.categoryTitleContent}>
                    <Text style={[styles.categoryName, { color: category.color }]}>
                      {category.name}
                    </Text>
                    <Text style={styles.categoryTheme}>"{category.theme}"</Text>
                  </View>
                  <Text style={styles.accordionIcon}>
                    {isExpanded ? '▼' : '▶'}
                  </Text>
                </View>

                {/* İlerleme */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${progress.percentage}%`, backgroundColor: category.color }
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {progress.completed}/{progress.total} modül tamamlandı
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Kategori Dersleri - Sadece açıksa göster */}
              {isExpanded && categoryLessons.map((lesson) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={[
                    styles.lessonCard,
                    isLessonCompleted(lesson.id) && styles.lessonCardCompleted
                  ]}
                  onPress={() => navigation.navigate('LessonDetail', { lesson })}
                >
                  {lesson.subcategory === 'temel_bilgi' ? (
                    <Image
                      source={require('../../assets/icon-temel-bilgi.png')}
                      style={styles.lessonIcon}
                    />
                  ) : lesson.subcategory === 'gunluk_hayat' ? (
                    <Image
                      source={require('../../assets/icon-gunluk-hayat.png')}
                      style={styles.lessonIcon}
                    />
                  ) : lesson.subcategory === 'guvenlik' ? (
                    <Image
                      source={require('../../assets/icon-guvenlik-gizlilik.png')}
                      style={styles.lessonIcon}
                    />
                  ) : (
                    <Text style={styles.lessonEmoji}>{getCategoryEmoji(lesson.category)}</Text>
                  )}
                  <View style={styles.lessonContent}>
                    <View style={styles.lessonTitleRow}>
                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      {isLessonCompleted(lesson.id) && (
                        <Text style={styles.completedBadge}>✓</Text>
                      )}
                    </View>
                    <View style={styles.lessonMeta}>
                      <Text style={styles.lessonDuration}>{lesson.duration} dk</Text>
                      <Text style={styles.lessonDifficulty}> • {getDifficultyStars(lesson.difficulty)}</Text>
                    </View>
                  </View>
                  <Text style={styles.arrow}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

        {/* Podcast Section */}
        <View style={styles.podcastSection}>
          <TouchableOpacity
            style={styles.podcastHeader}
            onPress={() => setIsPodcastExpanded(!isPodcastExpanded)}
            activeOpacity={0.7}
          >
            <View style={styles.podcastTitleRow}>
              <Text style={styles.podcastHeaderEmoji}>🎧</Text>
              <View style={styles.podcastTitleContent}>
                <Text style={styles.podcastHeaderTitle}>Ailely Podcast Serisi</Text>
                <Text style={styles.podcastHeaderSubtitle}>
                  "Yapay Zekayı Birlikte Öğreniyoruz"
                </Text>
              </View>
              <Text style={styles.accordionIcon}>
                {isPodcastExpanded ? '▼' : '▶'}
              </Text>
            </View>
            <Text style={styles.podcastCount}>
              {PODCASTS.length} bölüm • Kulağa hazır içerikler
            </Text>
          </TouchableOpacity>

          {/* Podcast List */}
          {isPodcastExpanded && (
            <View style={styles.podcastList}>
              {PODCASTS.map((podcast, index) => (
                <TouchableOpacity
                  key={podcast.id}
                  style={styles.podcastCard}
                  onPress={() => handlePodcastClick(podcast)}
                  activeOpacity={0.7}
                >
                  <View style={styles.podcastNumber}>
                    <Text style={styles.podcastNumberText}>{index + 1}</Text>
                  </View>

                  <Text style={styles.podcastEmoji}>{podcast.emoji}</Text>

                  <View style={styles.podcastContent}>
                    <Text style={styles.podcastTitle}>{podcast.title}</Text>
                    <Text style={styles.podcastDescription}>{podcast.description}</Text>
                    <Text style={styles.podcastDuration}>⏱️ {podcast.duration}</Text>
                  </View>

                  <View style={[
                    styles.playButton,
                    podcast.audioUrl && styles.playButtonActive,
                    playingPodcastId === podcast.id && styles.playButtonPlaying
                  ]}>
                    {isLoadingAudio && playingPodcastId === podcast.id ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Text style={styles.playButtonIcon}>
                        {playingPodcastId === podcast.id ? '⏸' : '▶'}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    height: 220,
    overflow: 'hidden',
  },
  headerImage: {
    opacity: 1,
  },
  content: {
    padding: 16,
  },
  categorySection: {
    marginBottom: 12,
  },
  categoryHeader: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  accordionIcon: {
    fontSize: 18,
    color: '#9CA3AF',
    marginLeft: 12,
    fontWeight: 'bold',
  },
  categoryEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  categoryTitleContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  categoryTheme: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'right',
    fontWeight: '600',
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lessonCardCompleted: {
    backgroundColor: '#E8F4F8',
    borderWidth: 2,
    borderColor: '#32738C',
  },
  lessonEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  lessonIcon: {
    width: 44,
    height: 44,
    marginRight: 16,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  completedBadge: {
    fontSize: 20,
    color: '#32738C',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  lessonDifficulty: {
    fontSize: 12,
    color: '#F5E185',
  },
  arrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  // Podcast Styles
  podcastSection: {
    marginTop: 32,
    marginBottom: 24,
  },
  podcastHeader: {
    backgroundColor: '#F2BFAC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  podcastTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  podcastHeaderEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  podcastTitleContent: {
    flex: 1,
  },
  podcastHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 2,
  },
  podcastHeaderSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  podcastCount: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  podcastList: {
    gap: 12,
  },
  podcastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#F26B5E',
  },
  podcastNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF0EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  podcastNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F26B5E',
  },
  podcastEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  podcastContent: {
    flex: 1,
  },
  podcastTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 20,
  },
  podcastDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
    lineHeight: 18,
  },
  podcastDuration: {
    fontSize: 12,
    color: '#F26B5E',
    fontWeight: '500',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A7CBD9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  playButtonActive: {
    backgroundColor: '#32738C',
  },
  playButtonPlaying: {
    backgroundColor: '#F26B5E',
  },
  playButtonIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 2,
  },
  // Info Card Styles (No Child Profile)
  infoCard: {
    backgroundColor: '#FEF0EE',
    padding: 24,
    borderRadius: 16,
    marginTop: 24,
    borderWidth: 2,
    borderColor: '#F26B5E',
  },
  infoIconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    fontSize: 48,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#193140',
    lineHeight: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  infoSteps: {
    fontSize: 14,
    color: '#193140',
    lineHeight: 22,
    backgroundColor: '#F2BFAC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoStepBold: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#193140',
  },
  infoButton: {
    backgroundColor: '#F26B5E',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default LearnScreen;
