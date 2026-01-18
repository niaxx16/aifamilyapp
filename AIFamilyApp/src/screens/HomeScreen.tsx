import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image, Modal, TextInput, Alert } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../services/supabase';
import { useChild } from '../context/ChildContext';
import { EarnedBadge } from '../types/database.types';

type HomeScreenProps = {
  navigation: BottomTabNavigationProp<any>;
};

interface LessonBasic {
  id: string;
  title: string;
  duration: number;
}

interface ActivityBasic {
  id: string;
  title: string;
  duration: number;
}

interface CompletedLesson {
  lesson_id: string;
  completed: boolean;
  completed_at: string;
  lessons: LessonBasic;
}

interface CompletedActivity {
  activity_id: string;
  completed_at: string;
  activities: ActivityBasic;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { allChildren } = useChild();
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState<any | null>(null);
  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
  const [completedActivitiesCount, setCompletedActivitiesCount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [recentCompletedLessons, setRecentCompletedLessons] = useState<CompletedLesson[]>([]);
  const [recentCompletedActivities, setRecentCompletedActivities] = useState<CompletedActivity[]>([]);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);
  const [suggestModalVisible, setSuggestModalVisible] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      if (allChildren.length > 0) {
        const childToUse = allChildren[0];
        setSelectedChild(childToUse);
        fetchProgressDataForChild(childToUse);
      } else {
        setSelectedChild(null);
        setLoading(false);
      }
    }, [allChildren])
  );

  const fetchProgressDataForChild = async (child: any) => {
    if (!child) return;

    try {
      setLoading(true);

      // Ebeveyn profilini bul (child'ın parent_id'si)
      const { data: parentProfile } = await supabase
        .from('parent_profiles')
        .select('id, total_points')
        .eq('id', child.parent_id)
        .single();

      if (!parentProfile) {
        console.error('Ebeveyn profili bulunamadı');
        setLoading(false);
        return;
      }

      const parentId = parentProfile.id;

      const { count: totalLessonCount } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true });

      const { count: totalActivityCount } = await supabase
        .from('activities')
        .select('*', { count: 'exact', head: true });

      // Tüm çocukların tamamladığı dersler ve etkinlikler (ebeveyn bazlı)
      const { count: completedLessonsTotal } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('parent_id', parentId)
        .eq('completed', true);

      const { count: completedActivitiesTotal } = await supabase
        .from('completed_activities')
        .select('*', { count: 'exact', head: true })
        .eq('parent_id', parentId);

      const { data: completedLessonsData, error: lessonsError } = await supabase
        .from('user_progress')
        .select(`
          lesson_id,
          completed,
          completed_at,
          lessons (
            id,
            title,
            duration
          )
        `)
        .eq('parent_id', parentId)
        .eq('completed', true)
        .order('completed_at', { ascending: false })
        .limit(3);

      if (lessonsError) throw lessonsError;

      const { data: completedActivitiesData, error: activitiesError } = await supabase
        .from('completed_activities')
        .select(`
          activity_id,
          completed_at,
          activities (
            id,
            title,
            duration
          )
        `)
        .eq('parent_id', parentId)
        .order('completed_at', { ascending: false })
        .limit(3);

      if (activitiesError) throw activitiesError;

      setTotalLessons(totalLessonCount || 0);
      setTotalActivities(totalActivityCount || 0);
      setCompletedLessonsCount(completedLessonsTotal || 0);
      setCompletedActivitiesCount(completedActivitiesTotal || 0);
      setRecentCompletedLessons(completedLessonsData as CompletedLesson[] || []);
      setRecentCompletedActivities(completedActivitiesData as CompletedActivity[] || []);

      let totalMinutes = 0;
      completedLessonsData?.forEach((item: any) => {
        if (item.lessons?.duration) {
          totalMinutes += item.lessons.duration;
        }
      });
      completedActivitiesData?.forEach((item: any) => {
        if (item.activities?.duration) {
          totalMinutes += item.activities.duration;
        }
      });
      setTotalDuration(totalMinutes);

      // Ebeveyn profilinin puanlarını kullan
      setTotalPoints(parentProfile.total_points || 0);

      // Ebeveyn profilinin rozetlerini çek
      const { data: badgesData, error: badgesError } = await supabase
        .from('earned_badges')
        .select('*')
        .eq('parent_id', parentId)
        .order('earned_at', { ascending: false});

      if (badgesError) {
        console.error('Rozetler yüklenirken hata:', badgesError);
      }
      setEarnedBadges(badgesData || []);
    } catch (error) {
      console.error('İlerleme verileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const completed = new Date(timestamp);
    const diffMs = now.getTime() - completed.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Az önce';
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays === 1) return 'Dün';
    if (diffDays < 7) return `${diffDays} gün önce`;
    return `${Math.floor(diffDays / 7)} hafta önce`;
  };

  const handleSendSuggestion = async () => {
    if (!suggestion.trim()) {
      Alert.alert('Uyarı', 'Lütfen öneri yazınız.');
      return;
    }

    try {
      const { error } = await supabase
        .from('content_suggestions')
        .insert({
          suggestion: suggestion.trim(),
          parent_id: selectedChild?.id || null,
        });

      if (error) throw error;

      Alert.alert('Teşekkürler!', 'Öneriniz başarıyla gönderildi. En kısa sürede değerlendireceğiz.');
      setSuggestion('');
      setSuggestModalVisible(false);
    } catch (error) {
      console.error('Öneri gönderme hatası:', error);
      Alert.alert('Hata', 'Öneriniz gönderilemedi. Lütfen tekrar deneyin.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32738C" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (allChildren.length === 0 || !selectedChild) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Merhaba! 👋</Text>
              <Text style={styles.welcome}>AI Aile Rehberi'ne hoş geldiniz</Text>
            </View>
            <View style={styles.headerIllustration}>
              <Image
                source={require('../../assets/ebeveyn-cocuk1.png')}
                style={styles.headerImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View style={styles.emptyState}>
          <View style={styles.emptyIllustration}>
            <Text style={styles.emptyEmoji}>👨‍👩‍👧‍👦</Text>
          </View>
          <Text style={styles.emptyTitle}>Çocuk Profili Oluşturun</Text>
          <Text style={styles.emptyText}>
            Başlamak için önce çocuğunuzun profilini oluşturmanız gerekiyor.
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.emptyButtonText}>Profil Oluştur</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const totalContent = totalLessons + totalActivities;
  const completedContent = completedLessonsCount + completedActivitiesCount;
  const overallProgressPercentage = totalContent > 0 ? Math.round((completedContent / totalContent) * 100) : 0;

  const getChildrenNames = () => {
    if (allChildren.length === 0) return '';
    if (allChildren.length === 1) return `${allChildren[0].nickname}`;
    if (allChildren.length === 2) return `${allChildren[0].nickname} ve ${allChildren[1].nickname}`;

    const names = allChildren.slice(0, -1).map(c => c.nickname).join(', ');
    return `${names} ve ${allChildren[allChildren.length - 1].nickname}`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Modern Header with Illustration */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Merhaba! 👋</Text>
            <Text style={styles.welcome}>{getChildrenNames()} için öğrenme yolculuğu</Text>
          </View>
          <View style={styles.headerIllustration}>
            <Image
              source={require('../../assets/ebeveyn-cocuk1.png')}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Hero Progress Card */}
      <View style={styles.section}>
        <View style={styles.heroProgressCard}>
          <View style={styles.progressContent}>
            <Text style={styles.heroProgressLabel}>Genel İlerlemeniz</Text>
            <Text style={styles.heroProgressPercentage}>{overallProgressPercentage}%</Text>
            <View style={styles.heroProgressBar}>
              <View style={[styles.heroProgressFill, { width: `${overallProgressPercentage}%` }]} />
            </View>
          </View>
        </View>
      </View>

      {/* Gamification Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Başarılarınız 🎉</Text>
        <View style={styles.gamificationGrid}>
          <View style={styles.gamificationCard}>
            <View style={styles.gamificationIconContainer}>
              <Text style={styles.gamificationIcon}>⭐</Text>
            </View>
            <Text style={styles.gamificationNumber}>{totalPoints}</Text>
            <Text style={styles.gamificationLabel}>Toplam Puan</Text>
          </View>

          <View style={styles.gamificationCard}>
            <View style={styles.gamificationIconContainer}>
              <Text style={styles.gamificationIcon}>🏆</Text>
            </View>
            <Text style={styles.gamificationNumber}>{earnedBadges.length}</Text>
            <Text style={styles.gamificationLabel}>Rozet Kazandı</Text>
          </View>
        </View>
      </View>

      {/* Earned Badges Showcase */}
      {earnedBadges.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Kazanılan Rozetler</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesScroll}>
            {earnedBadges.map((badge) => (
              <View key={badge.id} style={styles.badgeShowcase}>
                <View style={styles.badgeGlow}>
                  <Text style={styles.badgeShowcaseIcon}>{badge.badge_emoji}</Text>
                </View>
                <Text style={styles.badgeShowcaseName}>{badge.badge_name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Learning Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Öğrenme İstatistikleri</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📚</Text>
            <Text style={styles.statNumber}>{completedLessonsCount}</Text>
            <Text style={styles.statLabel}>Ders Tamamlandı</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={styles.statNumber}>{completedActivitiesCount}</Text>
            <Text style={styles.statLabel}>Etkinlik Yapıldı</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⏱️</Text>
            <Text style={styles.statNumber}>{totalDuration}</Text>
            <Text style={styles.statLabel}>Toplam Dakika</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Learn')}
          >
            <View style={styles.quickActionIconBg}>
              <Text style={styles.quickActionIcon}>📚</Text>
            </View>
            <Text style={styles.quickActionLabel}>Öğren</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Practice')}
          >
            <View style={styles.quickActionIconBg}>
              <Text style={styles.quickActionIcon}>🎮</Text>
            </View>
            <Text style={styles.quickActionLabel}>Uygula</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Guide')}
          >
            <View style={styles.quickActionIconBg}>
              <Text style={styles.quickActionIcon}>🧭</Text>
            </View>
            <Text style={styles.quickActionLabel}>Rehber</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      {(recentCompletedLessons.length > 0 || recentCompletedActivities.length > 0) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Son Tamamlananlar</Text>
          {recentCompletedLessons.slice(0, 2).map((item) => (
            <View key={item.lesson_id} style={styles.activityCard}>
              <Text style={styles.activityIcon}>📚</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{item.lessons.title}</Text>
                <Text style={styles.activityTime}>{formatTimeAgo(item.completed_at)}</Text>
              </View>
              <Text style={styles.activityCheck}>✓</Text>
            </View>
          ))}
          {recentCompletedActivities.slice(0, 2).map((item) => (
            <View key={item.activity_id} style={styles.activityCard}>
              <Text style={styles.activityIcon}>🎮</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{item.activities.title}</Text>
                <Text style={styles.activityTime}>{formatTimeAgo(item.completed_at)}</Text>
              </View>
              <Text style={styles.activityCheck}>✓</Text>
            </View>
          ))}
        </View>
      )}

      {/* Content Suggestion */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.suggestionCard}
          onPress={() => setSuggestModalVisible(true)}
        >
          <View style={styles.suggestionIconContainer}>
            <Text style={styles.suggestionIcon}>💡</Text>
          </View>
          <View style={styles.suggestionContent}>
            <Text style={styles.suggestionTitle}>İçerik Öner</Text>
            <Text style={styles.suggestionDescription}>Görmek istediğiniz konuları bizimle paylaşın</Text>
          </View>
          <Text style={styles.suggestionArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Suggestion Modal */}
      <Modal
        visible={suggestModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSuggestModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>İçerik Öneriniz</Text>
              <TouchableOpacity onPress={() => setSuggestModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Ailely'de görmek istediğiniz konuları, dersleri veya etkinlikleri yazabilirsiniz.
              Tüm önerileriniz değerlendirilecektir.
            </Text>

            <TextInput
              style={styles.suggestionInput}
              placeholder="Önerinizi buraya yazın..."
              placeholderTextColor="#A7CBD9"
              multiline
              numberOfLines={6}
              value={suggestion}
              onChangeText={setSuggestion}
              textAlignVertical="top"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => {
                  setSuggestion('');
                  setSuggestModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonCancelText}>İptal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonSend}
                onPress={handleSendSuggestion}
              >
                <Text style={styles.modalButtonSendText}>Gönder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginTop: 16,
    fontSize: 16,
    color: '#32738C',
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#193140',
    paddingTop: 60,
    paddingBottom: 36,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
    maxWidth: '60%',
    zIndex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 36,
  },
  welcome: {
    fontSize: 15,
    color: '#A7CBD9',
    fontWeight: '500',
  },
  headerIllustration: {
    position: 'absolute',
    right: -65,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  headerImage: {
    width: 270,
    height: 270,
  },
  heroProgressCard: {
    backgroundColor: '#A7CBD9',
    borderRadius: 24,
    padding: 28,
    elevation: 4,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  progressContent: {
    alignItems: 'center',
  },
  heroProgressLabel: {
    fontSize: 16,
    color: '#193140',
    fontWeight: '600',
    marginBottom: 12,
  },
  heroProgressPercentage: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#F26B5E',
    marginBottom: 16,
  },
  heroProgressBar: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  heroProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  heroProgressInfo: {
    fontSize: 14,
    color: '#193140',
    fontWeight: '500',
  },
  gamificationGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  gamificationCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  gamificationIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F2BFAC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  gamificationIcon: {
    fontSize: 36,
  },
  gamificationNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 6,
  },
  gamificationLabel: {
    fontSize: 13,
    color: '#32738C',
    fontWeight: '600',
    textAlign: 'center',
  },
  badgeShowcase: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    alignItems: 'center',
    minWidth: 120,
    elevation: 3,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  badgeGlow: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F2BFAC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  badgeShowcaseIcon: {
    fontSize: 48,
  },
  badgeShowcaseName: {
    fontSize: 12,
    color: '#193140',
    textAlign: 'center',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 11,
    color: '#32738C',
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgesScroll: {
    flexDirection: 'row',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  quickActionIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F2BFAC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionIcon: {
    fontSize: 28,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#193140',
  },
  suggestionCard: {
    backgroundColor: '#32738C',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    marginBottom: 24,
  },
  suggestionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  suggestionIcon: {
    fontSize: 28,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  suggestionDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
  suggestionArrow: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(25, 49, 64, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 8,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#193140',
  },
  modalClose: {
    fontSize: 28,
    color: '#32738C',
    fontWeight: '300',
  },
  modalDescription: {
    fontSize: 14,
    color: '#32738C',
    lineHeight: 20,
    marginBottom: 20,
  },
  suggestionInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: '#193140',
    minHeight: 140,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalButtonCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#193140',
  },
  modalButtonSend: {
    flex: 1,
    backgroundColor: '#F26B5E',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#F26B5E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalButtonSendText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  activityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    color: '#193140',
    fontWeight: '600',
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 11,
    color: '#32738C',
    fontWeight: '500',
  },
  activityCheck: {
    fontSize: 18,
    color: '#32738C',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  emptyIllustration: {
    marginBottom: 20,
  },
  emptyEmoji: {
    fontSize: 80,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#32738C',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  emptyButton: {
    backgroundColor: '#F26B5E',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#F26B5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
