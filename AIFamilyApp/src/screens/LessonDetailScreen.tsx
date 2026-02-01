import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Lesson, ModuleContent } from '../types/database.types';
import { supabase } from '../services/supabase';
import { useChild } from '../context/ChildContext';
import { checkAndAwardPointBadges } from '../utils/badgeUtils';
import ConfettiCannon from 'react-native-confetti-cannon';

type LessonDetailRouteProp = RouteProp<
  { LessonDetail: { lesson: Lesson } },
  'LessonDetail'
>;

interface Props {
  route: LessonDetailRouteProp;
}

const LessonDetailScreen: React.FC<Props> = ({ route }) => {
  const { lesson } = route.params;
  const { allChildren } = useChild();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Map<number, boolean>>(new Map());
  const [categorizeAnswers, setCategorizeAnswers] = useState<Map<number, string>>(new Map());
  const [matchingAnswers, setMatchingAnswers] = useState<Map<number, number>>(new Map());
  const [selectedLeftItem, setSelectedLeftItem] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFirstAttempt, setQuizFirstAttempt] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showVideo, setShowVideo] = useState(false);
  const confettiRef = useRef<any>(null);
  const webViewRef = useRef<any>(null);
  const videoContainerRef = useRef<View>(null);
  const [videoSectionY, setVideoSectionY] = useState(0);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  // Video URL'ini module_content'ten veya lesson.video_url'den al
  const videoUrl = (lesson.module_content as any)?.video_section?.url || lesson.video_url;

  useEffect(() => {
    if (allChildren.length > 0) {
      checkLessonCompletion();
    }
  }, [allChildren]);

  const checkLessonCompletion = async () => {
    if (allChildren.length === 0) return;
    const firstChild = allChildren[0];

    const parentId = firstChild.parent_id;
    if (!parentId) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('completed, quiz_completed')
        .eq('parent_id', parentId)
        .eq('lesson_id', lesson.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setIsCompleted(data?.completed || false);
      // Eğer quiz daha önce tamamlanmışsa, artık puan eklenmesin
      if (data?.quiz_completed) {
        setQuizFirstAttempt(false);
      }
    } catch (error) {
      console.error('İlerleme kontrolü hatası:', error);
    }
  };

  const awardPoints = async (childId: string, points: number) => {
    try {
      // Mevcut puanı al
      const { data: childData } = await supabase
        .from('parent_profiles')
        .select('total_points')
        .eq('id', childId)
        .single();

      const currentPoints = childData?.total_points || 0;
      const newTotalPoints = currentPoints + points;

      // Puanı güncelle
      const { error } = await supabase
        .from('parent_profiles')
        .update({ total_points: newTotalPoints })
        .eq('id', childId);

      if (error) throw error;
      return newTotalPoints;
    } catch (error) {
      console.error('Puan verme hatası:', error);
      return 0;
    }
  };

  const checkCategoryCompletion = async (childId: string, subcategory: string | null) => {
    if (!subcategory) return false;

    try {
      // Bu kategorideki tüm dersleri al
      const { data: categoryLessons } = await supabase
        .from('lessons')
        .select('id')
        .eq('subcategory', subcategory);

      if (!categoryLessons || categoryLessons.length === 0) return false;

      // Bu çocuğun tamamladığı dersleri al
      const { data: completedLessons } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('parent_id', childId)
        .eq('completed', true);

      const completedIds = new Set(completedLessons?.map(p => p.lesson_id) || []);

      // Tüm dersler tamamlandı mı?
      return categoryLessons.every(lesson => completedIds.has(lesson.id));
    } catch (error) {
      console.error('Kategori tamamlama kontrolü hatası:', error);
      return false;
    }
  };

  const awardCategoryBadge = async (childId: string, subcategory: string) => {
    const CATEGORY_BADGES: { [key: string]: { name: string; emoji: string } } = {
      'temel_bilgi': { name: 'AI Öğrencisi', emoji: '🟢' },
      'gunluk_hayat': { name: 'AI Farkındalık Uzmanı', emoji: '🔵' },
      'guvenlik': { name: 'Dijital Koruyucu', emoji: '🟡' },
      'etik': { name: 'Etik Düşünür', emoji: '🟠' },
      'gelecek': { name: 'AI Lideri', emoji: '🔴' }
    };

    const badge = CATEGORY_BADGES[subcategory];
    if (!badge) return false;

    try {
      // Rozet zaten verilmiş mi kontrol et
      const { data: existing } = await supabase
        .from('earned_badges')
        .select('id')
        .eq('parent_id', childId)
        .eq('category_id', subcategory)
        .single();

      if (existing) return false; // Zaten verilmiş

      // Rozeti kaydet
      const { error } = await supabase
        .from('earned_badges')
        .insert({
          parent_id: childId,
          badge_type: 'category',
          badge_name: badge.name,
          badge_emoji: badge.emoji,
          category_id: subcategory
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Rozet verme hatası:', error);
      return false;
    }
  };

  const markLessonComplete = async () => {
    if (allChildren.length === 0) return;
    const firstChild = allChildren[0];

    // Ebeveyn profilinin ID'sini al
    const parentId = firstChild.parent_id;
    if (!parentId) {
      Alert.alert('Hata', 'Ebeveyn profili bulunamadı');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Dersi tamamla (ebeveyn profiline kaydet)
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          parent_id: parentId,
          lesson_id: lesson.id,
          completed: true,
          time_spent: lesson.duration,
          completed_at: new Date().toISOString(),
        }, {
          onConflict: 'parent_id,lesson_id',
        });

      if (progressError) throw progressError;

      // 2. Puan ekle (ebeveyn profiline)
      const points = lesson.points || 10;
      const newTotalPoints = await awardPoints(parentId, points);

      // 3. Puan bazlı rozetleri kontrol et (ebeveyn profiline)
      const pointBadges = await checkAndAwardPointBadges(parentId, newTotalPoints);

      setIsCompleted(true);

      // 4. Kategori tamamlanmış mı kontrol et (ebeveyn profilinden)
      const categoryCompleted = await checkCategoryCompletion(parentId, lesson.subcategory);
      let categoryBadgeAwarded = false;

      if (categoryCompleted && lesson.subcategory) {
        categoryBadgeAwarded = await awardCategoryBadge(parentId, lesson.subcategory);
      }

      // 5. Başarı mesajı göster
      if (categoryBadgeAwarded && pointBadges.length > 0) {
        // Hem kategori hem puan rozeti kazanıldı
        const CATEGORY_NAMES: { [key: string]: string } = {
          'temel_bilgi': 'Temel Bilgi',
          'gunluk_hayat': 'Günlük Hayatta AI',
          'guvenlik': 'Güvenlik ve Gizlilik',
          'etik': 'Eleştirel Düşünme ve Etik',
          'gelecek': 'Uygulama ve Gelecek'
        };
        const pointBadgeNames = pointBadges.map(b => `${b.emoji} ${b.name}`).join(', ');
        Alert.alert(
          '🎊 Harika Başarı!',
          `${CATEGORY_NAMES[lesson.subcategory || '']} kategorisini tamamladınız!\n\n${points} puan kazandınız!\n\nYeni Rozetler: ${pointBadgeNames} ve kategori rozeti! 🏆`,
          [{ text: 'Harika!' }]
        );
      } else if (categoryBadgeAwarded) {
        const CATEGORY_NAMES: { [key: string]: string } = {
          'temel_bilgi': 'Temel Bilgi',
          'gunluk_hayat': 'Günlük Hayatta AI',
          'guvenlik': 'Güvenlik ve Gizlilik',
          'etik': 'Eleştirel Düşünme ve Etik',
          'gelecek': 'Uygulama ve Gelecek'
        };

        Alert.alert(
          '🎊 Kategori Tamamlandı!',
          `${CATEGORY_NAMES[lesson.subcategory || '']} kategorisini tamamladınız! ${points} puan kazandınız ve bir rozet kazandınız! 🏆`,
          [{ text: 'Harika!' }]
        );
      } else if (pointBadges.length > 0) {
        // Sadece puan rozeti kazanıldı
        const pointBadgeNames = pointBadges.map(b => `${b.emoji} ${b.name}`).join(', ');
        Alert.alert(
          '🎉 Yeni Rozet!',
          `Dersi tamamladınız ve ${points} puan kazandınız!\n\nYeni Rozet: ${pointBadgeNames}\n\nToplam Puan: ${newTotalPoints}`,
          [{ text: 'Harika!' }]
        );
      } else {
        // Normal ders tamamlama - sadece puan
        Alert.alert(
          '🎉 Tebrikler!',
          `Dersi başarıyla tamamladınız!\n\n+${points} puan kazandınız!\nToplam Puan: ${newTotalPoints}`,
          [{ text: 'Tamam' }]
        );
      }
    } catch (error) {
      console.error('Ders tamamlama hatası:', error);
      Alert.alert(
        'Hata',
        'Ders tamamlanırken bir hata oluştu.',
        [{ text: 'Tamam' }]
      );
    } finally {
      setIsLoading(false);
    }
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

  const toggleCard = (index: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    setFlippedCards(newFlipped);
  };

  const toggleSection = (sectionName: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionName)) {
      newExpanded.delete(sectionName);
    } else {
      newExpanded.add(sectionName);
    }
    setExpandedSections(newExpanded);
  };

  const handleQuizAnswer = (questionIndex: number, answer: boolean) => {
    if (quizSubmitted) return; // Zaten gönderildiyse değiştirme
    const newAnswers = new Map(quizAnswers);
    newAnswers.set(questionIndex, answer);
    setQuizAnswers(newAnswers);
  };

  const handleCategorizeAnswer = (itemIndex: number, category: string) => {
    if (quizSubmitted) return; // Zaten gönderildiyse değiştirme
    const newAnswers = new Map(categorizeAnswers);
    newAnswers.set(itemIndex, category);
    setCategorizeAnswers(newAnswers);
  };

  const handleMatchingAnswer = (leftId: number, rightId: number) => {
    if (quizSubmitted) return;

    // Eğer bu left item zaten eşleştirilmişse, önce eski eşleştirmeyi kaldır
    const newAnswers = new Map(matchingAnswers);

    // Bu right item başka bir left'e eşleştirilmişse, o eşleştirmeyi kaldır
    for (const [key, value] of newAnswers.entries()) {
      if (value === rightId) {
        newAnswers.delete(key);
      }
    }

    newAnswers.set(leftId, rightId);
    setMatchingAnswers(newAnswers);
    setSelectedLeftItem(null); // Seçimi temizle
  };

  const submitQuiz = async () => {
    // Double submission önleme
    if (isSubmitting || quizSubmitted) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Doğru cevap sayısını hesapla
      const moduleContent: ModuleContent | null = lesson.module_content || null;

      let totalQuestions = 0;
      let correctCount = 0;

      if (moduleContent.quiz.type === 'matching') {
        // Matching tipi için pairs kullan
        if (!moduleContent?.quiz?.pairs) {
          setIsSubmitting(false);
          return;
        }

        totalQuestions = moduleContent.quiz.pairs.length;
        if (totalQuestions === 0) {
          Alert.alert('Hata', 'Bu quiz\'de soru bulunmuyor.');
          setIsSubmitting(false);
          return;
        }

        correctCount = Array.from(matchingAnswers.entries()).filter(([leftId, rightId]) => {
          const leftPair = moduleContent.quiz.pairs?.find((p: any) => p.id === leftId);
          const rightPair = moduleContent.quiz.pairs?.find((p: any) => p.id === rightId);
          return leftPair && rightPair && leftPair.right === rightPair.right;
        }).length;
      } else {
        // Diğer tipler için items kullan
        if (!moduleContent?.quiz?.items) {
          setIsSubmitting(false);
          return;
        }

        // ✅ BUG-H5 Fix: Validate quiz has questions before submission
        totalQuestions = moduleContent.quiz.items.length;
        if (totalQuestions === 0) {
          Alert.alert('Hata', 'Bu quiz\'de soru bulunmuyor.');
          setIsSubmitting(false);
          return;
        }

        if (moduleContent.quiz.type === 'true_false') {
          correctCount = Array.from(quizAnswers.entries()).filter(([idx, ans]) =>
            ans === moduleContent.quiz.items?.[idx]?.correct
          ).length;
        } else if (moduleContent.quiz.type === 'categorize') {
          correctCount = Array.from(categorizeAnswers.entries()).filter(([idx, ans]) =>
            ans === moduleContent.quiz.items?.[idx]?.category
          ).length;
        }
      }

      const allCorrect = correctCount === totalQuestions;

      // İlk çocuğu al
      if (allChildren.length === 0) {
        Alert.alert('Hata', 'Çocuk profili bulunamadı.');
        setIsSubmitting(false);
        return;
      }

      const firstChild = allChildren[0];

      // Atomik quiz submission - database function kullan
      const { data, error } = await supabase.rpc('submit_quiz_atomic', {
        p_parent_id: firstChild.id,
        p_lesson_id: lesson.id,
        p_correct_count: correctCount,
        p_total_questions: totalQuestions,
        p_is_first_attempt: quizFirstAttempt,
      });

      if (error) {
        console.error('Quiz submission error:', error);
        Alert.alert('Hata', 'Quiz gönderilemedi. Lütfen tekrar deneyin.');
        setIsSubmitting(false);
        return;
      }

      // Başarılı submission
      setQuizSubmitted(true);

      // Puan kazanıldıysa bildir
      if (data && data.points_earned > 0) {
        Alert.alert(
          'Tebrikler! 🎉',
          `${data.points_earned} puan kazandınız!\n\nToplam Puanınız: ${data.new_total_points}`,
          [{ text: 'Harika!' }]
        );

        // Puan rozetlerini kontrol et
        await checkAndAwardPointBadges(firstChild.id, data.new_total_points);
      }

      // Artık ilk deneme değil
      setQuizFirstAttempt(false);

      // Tüm cevaplar doğruysa konfeti göster
      if (allCorrect) {
        setShowConfetti(true);
        setShowCongrats(true);
        setTimeout(() => {
          setShowCongrats(false);
        }, 3000);
      }

    } catch (error) {
      console.error('Quiz submission fatal error:', error);
      Alert.alert('Hata', 'Beklenmeyen bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers(new Map());
    setCategorizeAnswers(new Map());
    setMatchingAnswers(new Map());
    setSelectedLeftItem(null);
    setQuizSubmitted(false);
    setQuizFirstAttempt(false);
    setShowConfetti(false);
  };

  const moduleContent: ModuleContent | null = lesson.module_content || null;
  const hasModuleContent = !!moduleContent;

  // Video pause on scroll functionality
  const pauseVideo = () => {
    if (webViewRef.current && !isVideoPaused) {
      // Inject JavaScript to pause HTML5 video
      const pauseScript = `
        var video = document.querySelector('video');
        if (video) {
          video.pause();
        }
        true;
      `;
      webViewRef.current.injectJavaScript(pauseScript);
      setIsVideoPaused(true);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const videoThreshold = 250; // Video container height approximately

    // If video is showing and user scrolled past the video section
    if (showVideo && scrollY > videoThreshold && !isVideoPaused) {
      pauseVideo();
    }

    // Reset pause state when user scrolls back to video section
    if (scrollY < videoThreshold && isVideoPaused) {
      setIsVideoPaused(false);
    }
  };

  // Video URL'sinin tipini belirle (YouTube mu, kendi sitesi mi?)
  const getVideoType = (url: string | null): 'youtube' | 'direct' | null => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    return 'direct'; // MP4, webm vb. direkt video dosyası
  };

  // YouTube video ID'sini URL'den çıkar
  const getYouTubeVideoId = (url: string | null): string | null => {
    if (!url) return null;

    // YouTube Shorts: https://youtube.com/shorts/VIDEO_ID
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return shortsMatch[1];

    // Regular YouTube: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return watchMatch[1];

    // Short URL: https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return shortMatch[1];

    return null;
  };

  const videoType = getVideoType(videoUrl);
  const videoId = videoType === 'youtube' ? getYouTubeVideoId(videoUrl) : null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {/* Konfeti ve Tebrik Mesajı */}
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{x: Dimensions.get('window').width / 2, y: 0}}
          autoStart={true}
          fadeOut={true}
          fallSpeed={3000}
        />
      )}
      {showCongrats && (
        <View style={styles.congratsOverlay}>
          <View style={styles.congratsCard}>
            <Text style={styles.congratsEmoji}>🎉</Text>
            <Text style={styles.congratsTitle}>TEBRİKLER!</Text>
            <Text style={styles.congratsText}>Tüm soruları doğru cevapladınız!</Text>
          </View>
        </View>
      )}

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>{getCategoryEmoji(lesson.category)}</Text>
        <Text style={styles.title}>{lesson.title}</Text>

        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Süre:</Text>
            <Text style={styles.metaValue}>{lesson.total_duration_minutes || lesson.duration} dakika</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Zorluk:</Text>
            <Text style={styles.metaValue}>{getDifficultyStars(lesson.difficulty)}</Text>
          </View>
        </View>

        {lesson.description && (
          <Text style={styles.description}>{lesson.description}</Text>
        )}
      </View>

      {/* Video Bölümü - Tıklanabilir */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.accordionHeader, styles.accordionHeaderVideo]}
          onPress={() => setShowVideo(!showVideo)}
          activeOpacity={0.7}
        >
          <Text style={styles.sectionIcon}>🎬</Text>
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>Videoyu İzle</Text>
            <Text style={styles.sectionSubtitle}>
              {videoUrl ? 'Ders videosunu izleyin' : 'Yakında eklenecek'}
            </Text>
          </View>
          <Text style={styles.chevron}>{showVideo ? '▼' : '▶'}</Text>
        </TouchableOpacity>

        {showVideo && (
          <View style={styles.videoContainer}>
            {videoUrl ? (
              videoType === 'youtube' && videoId ? (
                // YouTube Video
                <WebView
                  style={styles.video}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  allowsInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={false}
                  source={{
                    html: `
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <style>
                            * { margin: 0; padding: 0; }
                            body { background-color: #000; height: 100vh; display: flex; align-items: center; }
                            .video-container { position: relative; width: 100%; padding-bottom: 56.25%; }
                            .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
                          </style>
                        </head>
                        <body>
                          <div class="video-container">
                            <iframe
                              src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1"
                              frameborder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </body>
                      </html>
                    `
                  }}
                />
              ) : (
                // Direkt Video (MP4, WebM vb. - Supabase Storage)
                <WebView
                  ref={webViewRef}
                  style={styles.video}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  allowsInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={false}
                  source={{
                    html: `
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <style>
                            * { margin: 0; padding: 0; }
                            html, body {
                              width: 100%;
                              height: 100%;
                              margin: 0;
                              padding: 0;
                              overflow: hidden;
                              background-color: #000;
                            }
                            .video-wrapper {
                              position: relative;
                              width: 100%;
                              padding-bottom: 100%; /* 1:1 aspect ratio */
                              background-color: #000;
                            }
                            video {
                              position: absolute;
                              top: 0;
                              left: 0;
                              width: 100%;
                              height: 100%;
                              object-fit: cover; /* Tam kare doldurur, yanlar kesilir */
                            }
                          </style>
                        </head>
                        <body>
                          <div class="video-wrapper">
                            <video controls playsinline webkit-playsinline controlsList="nodownload">
                              <source src="${videoUrl}" type="video/mp4">
                              Tarayıcınız bu videoyu oynatamıyor.
                            </video>
                          </div>
                        </body>
                      </html>
                    `
                  }}
                />
              )
            ) : (
              // Video yoksa mesaj göster
              <View style={{padding: 20, alignItems: 'center'}}>
                <Text style={{color: '#666', fontSize: 16, textAlign: 'center'}}>
                  📹 Video içeriği yakında eklenecek
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Modül İçeriği Varsa */}
      {hasModuleContent ? (
        <View>
          {/* 1. Bilgi Kartları */}
          {moduleContent.info_cards && moduleContent.info_cards.length > 0 && (
            <View style={styles.section}>
              <TouchableOpacity
                style={[styles.accordionHeader, styles.accordionHeaderCards]}
                onPress={() => toggleSection('cards')}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionIcon}>📚</Text>
                <View style={styles.sectionHeaderText}>
                  <Text style={styles.sectionTitle}>Bilgi Kartları</Text>
                  <Text style={styles.sectionSubtitle}>{moduleContent.info_cards.length} soru • Tıkla ve öğren</Text>
                </View>
                <Text style={styles.chevron}>{expandedSections.has('cards') ? '▼' : '▶'}</Text>
              </TouchableOpacity>

              {expandedSections.has('cards') && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
                  {moduleContent.info_cards.map((card, index) => {
                    const isFlipped = flippedCards.has(index);
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[styles.infoCard, isFlipped && styles.infoCardFlipped]}
                        onPress={() => toggleCard(index)}
                        activeOpacity={0.7}
                      >
                        {!isFlipped ? (
                          <>
                            <Text style={styles.cardNumber}>{index + 1}</Text>
                            <Text style={styles.questionIcon}>❓</Text>
                            <Text style={styles.infoCardQuestion}>{card.question}</Text>
                            <Text style={styles.tapHint}>Cevap için tıkla</Text>
                          </>
                        ) : (
                          <>
                            <Text style={styles.cardNumber}>{index + 1}</Text>
                            <View style={styles.cardBackContent}>
                              <View style={styles.answerSection}>
                                <Text style={styles.answerLabel}>💡 Cevap</Text>
                                <Text style={styles.infoCardAnswer}>{card.answer}</Text>
                              </View>
                              {card.example && (
                                <View style={styles.exampleSection}>
                                  <Text style={styles.exampleLabel}>🌍 Nerede karşına çıkar?</Text>
                                  <Text style={styles.infoCardExample}>{card.example}</Text>
                                </View>
                              )}
                            </View>
                            <Text style={styles.tapHint}>Soruya dön</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          )}

          {/* 2. Etkinlikler */}
          {moduleContent.quiz && (
            <View style={styles.section}>
              <TouchableOpacity
                style={[styles.accordionHeader, styles.accordionHeaderQuiz]}
                onPress={() => toggleSection('quiz')}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionIcon}>🎮</Text>
                <View style={styles.sectionHeaderText}>
                  <Text style={styles.sectionTitle}>Etkinlikler</Text>
                  <Text style={styles.sectionSubtitle}>Bilgini test et</Text>
                </View>
                <Text style={styles.chevron}>{expandedSections.has('quiz') ? '▼' : '▶'}</Text>
              </TouchableOpacity>

              {expandedSections.has('quiz') && (
                <View style={styles.quizCard}>
                {moduleContent.quiz.type === 'true_false' ? (
                  <>
                    {/* ✅ BUG-H5 Fix: Validate quiz has items before rendering */}
                    {!moduleContent.quiz.items || moduleContent.quiz.items.length === 0 ? (
                      <View style={styles.emptyQuizContainer}>
                        <Text style={styles.emptyQuizText}>Bu derste henüz quiz sorusu eklenmemiş.</Text>
                      </View>
                    ) : (
                      <>
                        <Text style={styles.quizInstructions}>Aşağıdaki ifadelerin doğru mu yanlış mı olduğunu seçin:</Text>
                        {moduleContent.quiz.items.map((item, index) => {
                      const userAnswer = quizAnswers.get(index);
                      const isCorrect = quizSubmitted && userAnswer === item.correct;
                      const isWrong = quizSubmitted && userAnswer !== undefined && userAnswer !== item.correct;

                      return (
                        <View key={index} style={[
                          styles.quizItem,
                          quizSubmitted && isCorrect && styles.quizItemCorrect,
                          quizSubmitted && isWrong && styles.quizItemWrong,
                        ]}>
                          <Text style={styles.quizItemNumber}>{index + 1}.</Text>
                          <View style={styles.quizItemContent}>
                            <Text style={styles.quizItemText}>{item.left}</Text>

                            <View style={styles.quizButtons}>
                              <TouchableOpacity
                                style={[
                                  styles.quizButton,
                                  userAnswer === true && styles.quizButtonSelected,
                                  quizSubmitted && item.correct === true && styles.quizButtonCorrect,
                                ]}
                                onPress={() => handleQuizAnswer(index, true)}
                                disabled={quizSubmitted}
                              >
                                <Text style={[
                                  styles.quizButtonText,
                                  userAnswer === true && styles.quizButtonTextSelected,
                                ]}>Doğru</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={[
                                  styles.quizButton,
                                  userAnswer === false && styles.quizButtonSelected,
                                  quizSubmitted && item.correct === false && styles.quizButtonCorrect,
                                ]}
                                onPress={() => handleQuizAnswer(index, false)}
                                disabled={quizSubmitted}
                              >
                                <Text style={[
                                  styles.quizButtonText,
                                  userAnswer === false && styles.quizButtonTextSelected,
                                ]}>Yanlış</Text>
                              </TouchableOpacity>
                            </View>

                            {quizSubmitted && (
                              <Text style={isCorrect ? styles.resultCorrect : styles.resultWrong}>
                                {isCorrect ? '✅ Doğru!' : userAnswer === undefined ? '⚠️ Cevaplamadınız' : '❌ Yanlış'}
                              </Text>
                            )}
                          </View>
                        </View>
                      );
                    })}

                    {!quizSubmitted ? (
                      <TouchableOpacity
                        style={[
                          styles.submitButton,
                          (quizAnswers.size === 0 || isSubmitting) && styles.submitButtonDisabled
                        ]}
                        onPress={submitQuiz}
                        disabled={quizAnswers.size === 0 || isSubmitting}
                      >
                        <Text style={styles.submitButtonText}>
                          {isSubmitting ? 'Gönderiliyor...' : 'Değerlendir'}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <View style={styles.quizResult}>
                          <Text style={styles.quizResultText}>
                            Sonuç: {Array.from(quizAnswers.entries()).filter(([idx, ans]) =>
                              ans === moduleContent.quiz.items?.[idx]?.correct
                            ).length} / {moduleContent.quiz.items?.length || 0} Doğru
                          </Text>
                          {quizFirstAttempt && (
                            <Text style={styles.quizPointsText}>
                              +{Array.from(quizAnswers.entries()).filter(([idx, ans]) =>
                                ans === moduleContent.quiz.items?.[idx]?.correct
                              ).length} Puan Kazandınız! 🎉
                            </Text>
                          )}
                        </View>
                        <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
                          <Text style={styles.resetButtonText}>Tekrar Dene</Text>
                        </TouchableOpacity>
                      </>
                    )}
                      </>
                    )}
                  </>
                ) : moduleContent.quiz.type === 'categorize' ? (
                  <>
                    {/* Kategorizasyon Etkinliği */}
                    {!moduleContent.quiz.items || moduleContent.quiz.items.length === 0 ? (
                      <View style={styles.emptyQuizContainer}>
                        <Text style={styles.emptyQuizText}>Bu derste henüz etkinlik eklenmemiş.</Text>
                      </View>
                    ) : (
                      <>
                        <Text style={styles.quizInstructions}>{moduleContent.quiz.question}</Text>

                        {moduleContent.quiz.description && (
                          <View style={styles.quizDescriptionContainer}>
                            {moduleContent.quiz.description.split('\n').map((line, idx) => (
                              <Text key={idx} style={styles.quizDescriptionLine}>{line}</Text>
                            ))}
                          </View>
                        )}

                        {moduleContent.quiz.items.map((item, index) => {
                          const userAnswer = categorizeAnswers.get(index);
                          const isCorrect = quizSubmitted && userAnswer === item.category;
                          const isWrong = quizSubmitted && userAnswer && userAnswer !== item.category;

                          return (
                            <View key={index} style={[
                              styles.categorizeItem,
                              quizSubmitted && isCorrect && styles.quizItemCorrect,
                              quizSubmitted && isWrong && styles.quizItemWrong,
                            ]}>
                              <Text style={styles.categorizeItemName}>{item.item}</Text>

                              <View style={styles.categorizeButtons}>
                                {moduleContent.quiz.categories.map((category, catIndex) => {
                                  const isSelected = userAnswer === category;
                                  const isCorrectCategory = quizSubmitted && item.category === category;

                                  return (
                                    <TouchableOpacity
                                      key={catIndex}
                                      style={[
                                        styles.categoryButton,
                                        isSelected && styles.categoryButtonSelected,
                                        quizSubmitted && isCorrectCategory && styles.categoryButtonCorrect,
                                      ]}
                                      onPress={() => handleCategorizeAnswer(index, category)}
                                      disabled={quizSubmitted}
                                    >
                                      <Text style={[
                                        styles.categoryButtonText,
                                        isSelected && styles.categoryButtonTextSelected,
                                      ]}>{category}</Text>
                                    </TouchableOpacity>
                                  );
                                })}
                              </View>

                              {quizSubmitted && (
                                <Text style={isCorrect ? styles.resultCorrect : styles.resultWrong}>
                                  {isCorrect ? '✅ Doğru!' : userAnswer ? `❌ Yanlış (Doğru: ${item.category})` : '⚠️ Cevaplamadınız'}
                                </Text>
                              )}
                            </View>
                          );
                        })}

                        {!quizSubmitted ? (
                          <TouchableOpacity
                            style={[
                              styles.submitButton,
                              (categorizeAnswers.size === 0 || isSubmitting) && styles.submitButtonDisabled
                            ]}
                            onPress={submitQuiz}
                            disabled={categorizeAnswers.size === 0 || isSubmitting}
                          >
                            <Text style={styles.submitButtonText}>
                              {isSubmitting ? 'Gönderiliyor...' : 'Değerlendir'}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <>
                            <View style={styles.quizResult}>
                              <Text style={styles.quizResultText}>
                                Sonuç: {Array.from(categorizeAnswers.entries()).filter(([idx, ans]) =>
                                  ans === moduleContent.quiz.items?.[idx]?.category
                                ).length} / {moduleContent.quiz.items?.length || 0} Doğru
                              </Text>
                              {quizFirstAttempt && (
                                <Text style={styles.quizPointsText}>
                                  +{Array.from(categorizeAnswers.entries()).filter(([idx, ans]) =>
                                    ans === moduleContent.quiz.items?.[idx]?.category
                                  ).length} Puan Kazandınız! 🎉
                                </Text>
                              )}
                            </View>

                            <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
                              <Text style={styles.resetButtonText}>Tekrar Dene</Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : moduleContent.quiz.type === 'matching' ? (
                  <>
                    {/* Eşleştirme Etkinliği */}
                    {!moduleContent.quiz.pairs || moduleContent.quiz.pairs.length === 0 ? (
                      <View style={styles.emptyQuizContainer}>
                        <Text style={styles.emptyQuizText}>Bu derste henüz etkinlik eklenmemiş.</Text>
                      </View>
                    ) : (
                      <>
                        <Text style={styles.quizInstructions}>{moduleContent.quiz.question}</Text>

                        {moduleContent.quiz.description && (
                          <View style={styles.quizDescriptionContainer}>
                            {moduleContent.quiz.description.split('\n').map((line, idx) => (
                              <Text key={idx} style={styles.quizDescriptionLine}>{line}</Text>
                            ))}
                          </View>
                        )}

                        <View style={styles.matchingContainer}>
                          {/* Sol Taraf - Hata Örnekleri */}
                          <View style={styles.matchingColumn}>
                            <Text style={styles.matchingColumnTitle}>Hata Örnekleri</Text>
                            {moduleContent.quiz.pairs.map((pair: any, index: number) => {
                              const isSelected = selectedLeftItem === pair.id;
                              const isMatched = matchingAnswers.has(pair.id);
                              const matchedRightId = matchingAnswers.get(pair.id);

                              let displayStatus = '';
                              if (quizSubmitted && isMatched) {
                                const rightPair = moduleContent.quiz.pairs?.find((p: any) => p.id === matchedRightId);
                                const isCorrect = rightPair && pair.right === rightPair.right;
                                displayStatus = isCorrect ? '✅' : '❌';
                              }

                              return (
                                <TouchableOpacity
                                  key={pair.id}
                                  style={[
                                    styles.matchingLeftItem,
                                    isSelected && styles.matchingItemSelected,
                                    isMatched && styles.matchingItemMatched,
                                    quizSubmitted && isMatched && (
                                      displayStatus === '✅' ? styles.matchingItemCorrect : styles.matchingItemWrong
                                    ),
                                  ]}
                                  onPress={() => {
                                    if (!quizSubmitted) {
                                      setSelectedLeftItem(isSelected ? null : pair.id);
                                    }
                                  }}
                                  disabled={quizSubmitted}
                                >
                                  <View style={styles.matchingItemContent}>
                                    <Text style={styles.matchingItemNumber}>{index + 1}</Text>
                                    <Text style={styles.matchingItemText}>{pair.left}</Text>
                                    {displayStatus && <Text style={styles.matchingItemStatus}>{displayStatus}</Text>}
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                          </View>

                          {/* Sağ Taraf - Nedenler (Karıştırılmış) */}
                          <View style={styles.matchingColumn}>
                            <Text style={styles.matchingColumnTitle}>Hata Nedenleri</Text>
                            {moduleContent.quiz.pairs
                              .map((p: any) => ({ ...p }))
                              .sort(() => Math.random() - 0.5)
                              .map((pair: any, index: number) => {
                                const isUsed = Array.from(matchingAnswers.values()).includes(pair.id);
                                const matchingLeftId = Array.from(matchingAnswers.entries()).find(
                                  ([_, rightId]) => rightId === pair.id
                                )?.[0];

                                const leftIndex = matchingLeftId
                                  ? moduleContent.quiz.pairs.findIndex((p: any) => p.id === matchingLeftId)
                                  : -1;

                                return (
                                  <TouchableOpacity
                                    key={pair.id}
                                    style={[
                                      styles.matchingRightItem,
                                      isUsed && styles.matchingItemMatched,
                                      quizSubmitted && isUsed && styles.matchingItemMatchedSubmitted,
                                    ]}
                                    onPress={() => {
                                      if (!quizSubmitted && selectedLeftItem !== null) {
                                        handleMatchingAnswer(selectedLeftItem, pair.id);
                                      }
                                    }}
                                    disabled={quizSubmitted || selectedLeftItem === null}
                                  >
                                    <View style={styles.matchingItemContent}>
                                      {isUsed && leftIndex >= 0 && (
                                        <Text style={styles.matchingItemNumber}>{leftIndex + 1}</Text>
                                      )}
                                      <Text style={[
                                        styles.matchingItemText,
                                        !isUsed && !quizSubmitted && selectedLeftItem === null && styles.matchingItemTextFaded,
                                      ]}>{pair.right}</Text>
                                    </View>
                                  </TouchableOpacity>
                                );
                              })
                            }
                          </View>
                        </View>

                        {!quizSubmitted && selectedLeftItem !== null && (
                          <View style={styles.matchingHint}>
                            <Text style={styles.matchingHintText}>
                              👆 Sağ taraftan uygun nedeni seç
                            </Text>
                          </View>
                        )}

                        {!quizSubmitted ? (
                          <TouchableOpacity
                            style={[
                              styles.submitButton,
                              (matchingAnswers.size === 0 || isSubmitting) && styles.submitButtonDisabled
                            ]}
                            onPress={submitQuiz}
                            disabled={matchingAnswers.size === 0 || isSubmitting}
                          >
                            <Text style={styles.submitButtonText}>
                              {isSubmitting ? 'Gönderiliyor...' : 'Değerlendir'}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <>
                            <View style={styles.quizResult}>
                              <Text style={styles.quizResultText}>
                                Sonuç: {Array.from(matchingAnswers.entries()).filter(([leftId, rightId]) => {
                                  const leftPair = moduleContent.quiz.pairs?.find((p: any) => p.id === leftId);
                                  const rightPair = moduleContent.quiz.pairs?.find((p: any) => p.id === rightId);
                                  return leftPair && rightPair && leftPair.right === rightPair.right;
                                }).length} / {moduleContent.quiz.pairs?.length || 0} Doğru
                              </Text>
                              {quizFirstAttempt && (
                                <Text style={styles.quizPointsText}>
                                  +{Array.from(matchingAnswers.entries()).filter(([leftId, rightId]) => {
                                    const leftPair = moduleContent.quiz.pairs?.find((p: any) => p.id === leftId);
                                    const rightPair = moduleContent.quiz.pairs?.find((p: any) => p.id === rightId);
                                    return leftPair && rightPair && leftPair.right === rightPair.right;
                                  }).length} Puan Kazandınız! 🎉
                                </Text>
                              )}
                            </View>

                            <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
                              <Text style={styles.resetButtonText}>Tekrar Dene</Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* Diğer quiz tipleri için fallback */}
                    <Text style={styles.quizQuestion}>{moduleContent.quiz.question}</Text>
                    <Text style={styles.emptyQuizText}>Bu quiz tipi henüz desteklenmiyor.</Text>
                  </>
                )}
                </View>
              )}
            </View>
          )}

          {/* 3. Çocuğuma Nasıl Anlatırım? */}
          {moduleContent.parent_guide && (
            <View style={styles.section}>
              <TouchableOpacity
                style={[styles.accordionHeader, styles.accordionHeaderGuide]}
                onPress={() => toggleSection('guide')}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionIcon}>🧭</Text>
                <View style={styles.sectionHeaderText}>
                  <Text style={styles.sectionTitle}>{moduleContent.parent_guide.title}</Text>
                  <Text style={styles.sectionSubtitle}>Ebeveyn rehberi</Text>
                </View>
                <Text style={styles.chevron}>{expandedSections.has('guide') ? '▼' : '▶'}</Text>
              </TouchableOpacity>

              {expandedSections.has('guide') && (
                <>
                  {/* Yeni Format - Card-based */}
                  {moduleContent.parent_guide.cards ? (
                    <View style={styles.guideCardsContainer}>
                      {moduleContent.parent_guide.cards.map((card: any, index: number) => (
                        <View key={index} style={styles.parentGuideCard}>
                          {/* Card Header */}
                          <View style={styles.parentGuideCardHeader}>
                            <Text style={styles.parentGuideCardIcon}>{card.icon}</Text>
                            <Text style={styles.parentGuideCardTitle}>{card.title}</Text>
                          </View>

                          {/* Card Content - Simple Text */}
                          {card.content && (
                            <Text
                              style={styles.parentGuideCardContent}
                              android_hyphenationFrequency="normal"
                              textBreakStrategy="balanced"
                            >
                              {card.content.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim()}
                            </Text>
                          )}

                          {/* Card Content - Examples */}
                          {card.examples && card.examples.map((example: any, idx: number) => (
                            <View key={idx} style={styles.exampleBox}>
                              <Text
                                style={styles.exampleBoxTitle}
                                android_hyphenationFrequency="normal"
                                textBreakStrategy="balanced"
                              >
                                • {example.title}
                              </Text>
                              <Text
                                style={styles.exampleBoxContent}
                                android_hyphenationFrequency="normal"
                                textBreakStrategy="balanced"
                              >
                                {example.content.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim()}
                              </Text>
                            </View>
                          ))}

                          {/* Card Content - Questions */}
                          {card.questions && card.questions.map((question: string, idx: number) => (
                            <View key={idx} style={styles.questionBox}>
                              <Text style={styles.questionNumber}>{idx + 1}</Text>
                              <Text
                                style={styles.questionText}
                                android_hyphenationFrequency="normal"
                                textBreakStrategy="balanced"
                              >
                                {question.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim()}
                              </Text>
                            </View>
                          ))}

                          {/* Card Content - Language Tips */}
                          {card.tips && (
                            <>
                              {card.tips.map((tip: any, idx: number) => (
                                <View key={idx} style={styles.tipBox}>
                                  <View style={styles.tipWrong}>
                                    <Text style={styles.tipWrongIcon}>❌</Text>
                                    <Text
                                      style={styles.tipWrongText}
                                      android_hyphenationFrequency="normal"
                                      textBreakStrategy="balanced"
                                    >
                                      {tip.wrong.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim()}
                                    </Text>
                                  </View>
                                  <View style={styles.tipRight}>
                                    <Text style={styles.tipRightIcon}>✅</Text>
                                    <Text
                                      style={styles.tipRightText}
                                      android_hyphenationFrequency="normal"
                                      textBreakStrategy="balanced"
                                    >
                                      {tip.right.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim()}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                              {card.footer && (
                                <Text
                                  style={styles.tipFooter}
                                  android_hyphenationFrequency="normal"
                                  textBreakStrategy="balanced"
                                >
                                  {card.footer.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim()}
                                </Text>
                              )}
                            </>
                          )}
                        </View>
                      ))}
                    </View>
                  ) : (
                    /* Eski Format - Backward Compatibility */
                    <View style={styles.guideCardOld}>
                      <View style={styles.guideSectionOld}>
                        <Text style={styles.guideLabelOld}>💡 Basit Açıklama:</Text>
                        <Text style={styles.guideTextOld}>
                          {moduleContent.parent_guide.explanation || 'İçerik yakında eklenecek.'}
                        </Text>
                      </View>

                      <View style={styles.guideDividerOld} />

                      <Text style={styles.examplesHeaderOld}>🌍 Günlük Hayat Örnekleri:</Text>
                      {moduleContent.parent_guide.daily_examples && moduleContent.parent_guide.daily_examples.map((example: any, index: number) => (
                        <View key={index} style={styles.exampleItemOld}>
                          <Text style={styles.exampleNumberOld}>{index + 1}</Text>
                          <View style={styles.exampleContentOld}>
                            <Text style={styles.exampleTitleOld}>{example.title}</Text>
                            <Text style={styles.exampleDescriptionOld}>{example.example}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </>
              )}
            </View>
          )}
        </View>
      ) : (
        // Eski Format (Modül içeriği yoksa)
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>📖 Ders İçeriği</Text>
          <Text style={styles.content}>{lesson.content}</Text>
        </View>
      )}

      {/* Tamamlama Butonu */}
      {isCompleted ? (
        <View style={styles.completedBadge}>
          <Text style={styles.completedIcon}>✅</Text>
          <Text style={styles.completedText}>Bu dersi tamamladınız!</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.completeButton, isLoading && styles.completeButtonDisabled]}
          onPress={markLessonComplete}
          disabled={isLoading}
        >
          <Text style={styles.completeButtonText}>
            {isLoading ? 'Kaydediliyor...' : '✓ Dersi Tamamla'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#6B5B95',
    padding: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  emoji: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    fontSize: 14,
    color: '#E9D5FF',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#E9D5FF',
    textAlign: 'center',
    lineHeight: 22,
  },
  videoContainer: {
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    aspectRatio: 1, // 1:1 kare format
  },

  // Sections
  section: {
    marginTop: 16,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    gap: 12,
    borderLeftWidth: 4,
  },
  accordionHeaderVideo: {
    backgroundColor: '#EFF6FF',
    borderLeftColor: '#3B82F6',
  },
  accordionHeaderCards: {
    backgroundColor: '#F0FDF4',
    borderLeftColor: '#10B981',
  },
  accordionHeaderQuiz: {
    backgroundColor: '#FFF7ED',
    borderLeftColor: '#F59E0B',
  },
  accordionHeaderGuide: {
    backgroundColor: '#F5F3FF',
    borderLeftColor: '#8B5CF6',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  chevron: {
    fontSize: 18,
    color: '#6B5B95',
    fontWeight: 'bold',
  },
  sectionIcon: {
    fontSize: 32,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Video
  videoCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  videoDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  videoDuration: {
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
  },
  videoDurationText: {
    fontSize: 13,
    color: '#92400E',
    fontWeight: '600',
  },
  videoUrl: {
    fontSize: 13,
    color: '#6B5B95',
  },

  // Info Cards
  cardsScroll: {
    marginBottom: 8,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    width: 300,
    minHeight: 280,
    padding: 24,
    borderRadius: 20,
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  infoCardFlipped: {
    backgroundColor: '#6B5B95',
    borderColor: '#6B5B95',
  },
  cardNumber: {
    position: 'absolute',
    top: 12,
    left: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  questionIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  answerIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  infoCardQuestion: {
    fontSize: 19,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 16,
  },
  infoCardAnswer: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left',
    lineHeight: 24,
  },
  cardBackContent: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  answerSection: {
    marginBottom: 8,
  },
  answerLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FCD34D',
    marginBottom: 6,
  },
  exampleSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#34D399',
  },
  exampleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6EE7B7',
    marginBottom: 6,
  },
  infoCardExample: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 21,
    textAlign: 'left',
  },
  tapHint: {
    fontSize: 13,
    color: '#9CA3AF',
    fontStyle: 'italic',
    position: 'absolute',
    bottom: 14,
  },

  // Quiz
  quizCard: {
    backgroundColor: '#F5F3FF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#DDD6FE',
  },
  quizInstructions: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5B21B6',
    marginBottom: 16,
    lineHeight: 22,
  },
  quizDescriptionContainer: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  quizDescriptionLine: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 8,
  },
  quizQuestion: {
    fontSize: 17,
    fontWeight: '600',
    color: '#5B21B6',
    marginBottom: 16,
    lineHeight: 24,
  },
  quizItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    flexDirection: 'row',
    gap: 12,
  },
  quizItemNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B5B95',
  },
  quizItemContent: {
    flex: 1,
  },
  quizItemText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 8,
  },
  quizItemAnswer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B5B95',
  },
  quizItemCorrect: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  quizItemWrong: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },
  quizButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  quizButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  quizButtonSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#6B5B95',
  },
  quizButtonCorrect: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  quizButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  quizButtonTextSelected: {
    color: '#6B5B95',
  },
  resultCorrect: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
    marginTop: 6,
  },
  resultWrong: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
    marginTop: 6,
  },
  // Kategorize Etkinlik Stilleri
  categorizeItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categorizeItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  categorizeButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#6B5B95',
  },
  categoryButtonCorrect: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryButtonTextSelected: {
    color: '#6B5B95',
  },
  // Matching styles
  matchingContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  matchingColumn: {
    flex: 1,
  },
  matchingColumnTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5B21B6',
    marginBottom: 12,
    textAlign: 'center',
  },
  matchingLeftItem: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  matchingRightItem: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  matchingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  matchingItemNumber: {
    backgroundColor: '#8B5CF6',
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
  },
  matchingItemText: {
    flex: 1,
    fontSize: 13,
    color: '#1F2937',
    lineHeight: 18,
  },
  matchingItemTextFaded: {
    color: '#9CA3AF',
  },
  matchingItemStatus: {
    fontSize: 18,
  },
  matchingItemSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#8B5CF6',
    borderWidth: 3,
  },
  matchingItemMatched: {
    backgroundColor: '#F3F4F6',
    borderColor: '#8B5CF6',
  },
  matchingItemMatchedSubmitted: {
    opacity: 0.7,
  },
  matchingItemCorrect: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
    borderWidth: 3,
  },
  matchingItemWrong: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
    borderWidth: 3,
  },
  matchingHint: {
    backgroundColor: '#EDE9FE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  matchingHintText: {
    fontSize: 14,
    color: '#6B5B95',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#6B5B95',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  quizResult: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  quizResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400E',
  },
  quizPointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginTop: 8,
  },
  // ✅ BUG-H5 Fix: Empty quiz container styles
  emptyQuizContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyQuizText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  congratsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  congratsCard: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  congratsEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 12,
  },
  congratsText: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6B5B95',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B5B95',
  },

  // Parent Guide
  // Parent Guide - Card-based Design
  guideCardsContainer: {
    gap: 16,
    paddingTop: 12,
  },
  parentGuideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E0E7FF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
  },
  parentGuideCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  parentGuideCardIcon: {
    fontSize: 28,
  },
  parentGuideCardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4C1D95',
    flex: 1,
  },
  parentGuideCardContent: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  // Example Boxes
  exampleBox: {
    backgroundColor: '#F0FDF4',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  exampleBoxTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  exampleBoxContent: {
    fontSize: 14,
    color: '#047857',
    lineHeight: 22,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  // Question Boxes
  questionBox: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
    alignItems: 'flex-start',
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    backgroundColor: '#DBEAFE',
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 22,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  // Language Tips
  tipBox: {
    marginBottom: 14,
  },
  tipWrong: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 10,
    gap: 10,
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  tipWrongIcon: {
    fontSize: 18,
  },
  tipWrongText: {
    flex: 1,
    fontSize: 14,
    color: '#991B1B',
    lineHeight: 22,
    fontStyle: 'italic',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  tipRight: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 10,
    gap: 10,
    alignItems: 'flex-start',
  },
  tipRightIcon: {
    fontSize: 18,
  },
  tipRightText: {
    flex: 1,
    fontSize: 14,
    color: '#065F46',
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  tipFooter: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
    flexWrap: 'wrap',
  },

  // Old Format Styles (Backward Compatibility)
  guideCardOld: {
    backgroundColor: '#F0FDF4',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#BBF7D0',
  },
  guideSectionOld: {
    marginBottom: 20,
  },
  guideLabelOld: {
    fontSize: 15,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 10,
  },
  guideTextOld: {
    fontSize: 16,
    color: '#15803D',
    lineHeight: 25,
  },
  guideDividerOld: {
    height: 1,
    backgroundColor: '#86EFAC',
    marginVertical: 16,
  },
  examplesHeaderOld: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 16,
  },
  exampleItemOld: {
    flexDirection: 'row',
    backgroundColor: '#DCFCE7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    gap: 14,
  },
  exampleNumberOld: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#15803D',
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    textAlign: 'center',
    lineHeight: 36,
  },
  exampleContentOld: {
    flex: 1,
  },
  exampleTitleOld: {
    fontSize: 15,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 6,
  },
  exampleDescriptionOld: {
    fontSize: 15,
    color: '#15803D',
    lineHeight: 22,
  },

  // Badge
  badgeCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  badgeIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  badgeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  badgePoints: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
  },

  // Old Format
  contentContainer: {
    padding: 24,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
  },

  // Complete Button
  completeButton: {
    backgroundColor: '#6B5B95',
    marginHorizontal: 24,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  completeButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
    marginHorizontal: 24,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  completedIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  completedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#047857',
  },
});

export default LessonDetailScreen;
