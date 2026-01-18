import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../services/supabase';
import { useChild } from '../context/ChildContext';

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

const ProgressScreen: React.FC = () => {
  const { activeChild } = useChild();
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'week' | 'month'>('all');
  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
  const [completedActivitiesCount, setCompletedActivitiesCount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [recentCompletedLessons, setRecentCompletedLessons] = useState<CompletedLesson[]>([]);
  const [recentCompletedActivities, setRecentCompletedActivities] = useState<CompletedActivity[]>([]);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      if (activeChild) {
        fetchProgressData();
      }
    }, [activeChild, selectedPeriod])
  );

  const fetchProgressData = async () => {
    if (!activeChild) return;

    try {
      // ✅ Server-side tarih hesaplaması (BUG-H3 fix)
      const { data: statsData, error: statsError } = await supabase
        .rpc('get_progress_stats', {
          p_parent_id: activeChild.id,
          p_period: selectedPeriod
        });

      if (statsError) throw statsError;

      // Toplam ders sayısı (sadece 'all' modunda)
      const { count: totalLessonCount } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true });

      // Toplam etkinlik sayısı (sadece 'all' modunda)
      const { count: totalActivityCount } = await supabase
        .from('activities')
        .select('*', { count: 'exact', head: true });

      // Tamamlanan dersler
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
        .eq('parent_id', activeChild.id)
        .eq('completed', true)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (lessonsError) throw lessonsError;

      // Tamamlanan etkinlikler
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
        .eq('parent_id', activeChild.id)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (activitiesError) throw activitiesError;

      // ✅ Server-side hesaplanan istatistikleri kullan
      setCompletedLessonsCount(statsData?.lessons_count || 0);
      setCompletedActivitiesCount(statsData?.activities_count || 0);
      setTotalDuration(statsData?.total_duration || 0);

      setTotalLessons(totalLessonCount || 0);
      setTotalActivities(totalActivityCount || 0);
      setRecentCompletedLessons(completedLessonsData as CompletedLesson[] || []);
      setRecentCompletedActivities(completedActivitiesData as CompletedActivity[] || []);
    } catch (error) {
      console.error('İlerleme verileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBadges = () => {
    const totalCompleted = completedLessonsCount + completedActivitiesCount;
    const badges = [];

    if (totalCompleted >= 1) {
      badges.push({ emoji: '🌟', name: 'Başlangıç', locked: false });
    } else {
      badges.push({ emoji: '🔒', name: '???', locked: true });
    }

    if (totalCompleted >= 3) {
      badges.push({ emoji: '📚', name: 'Öğrenmeyi Seven', locked: false });
    } else {
      badges.push({ emoji: '🔒', name: '???', locked: true });
    }

    if (totalCompleted >= 5) {
      badges.push({ emoji: '🎯', name: 'Odaklı', locked: false });
    } else {
      badges.push({ emoji: '🔒', name: '???', locked: true });
    }

    if (totalCompleted >= 10) {
      badges.push({ emoji: '🏆', name: 'Şampiyon', locked: false });
    } else {
      badges.push({ emoji: '🔒', name: '???', locked: true });
    }

    return badges;
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={styles.loadingText}>İlerleme yükleniyor...</Text>
      </View>
    );
  }

  const badges = getBadges();
  const lessonProgressPercentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
  const activityProgressPercentage = totalActivities > 0 ? Math.round((completedActivitiesCount / totalActivities) * 100) : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>İlerlemen 📊</Text>
        <Text style={styles.subtitle}>
          Gelişiminizi takip edin
        </Text>
      </View>

      {/* ✅ Period Sekmeler (BUG-H3 fix) */}
      <View style={styles.periodTabs}>
        <TouchableOpacity
          style={[styles.periodTab, selectedPeriod === 'all' && styles.periodTabActive]}
          onPress={() => setSelectedPeriod('all')}
        >
          <Text style={[styles.periodTabText, selectedPeriod === 'all' && styles.periodTabTextActive]}>
            Tümü
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.periodTab, selectedPeriod === 'week' && styles.periodTabActive]}
          onPress={() => setSelectedPeriod('week')}
        >
          <Text style={[styles.periodTabText, selectedPeriod === 'week' && styles.periodTabTextActive]}>
            Bu Hafta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.periodTab, selectedPeriod === 'month' && styles.periodTabActive]}
          onPress={() => setSelectedPeriod('month')}
        >
          <Text style={[styles.periodTabText, selectedPeriod === 'month' && styles.periodTabTextActive]}>
            Bu Ay
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{completedLessonsCount}</Text>
            <Text style={styles.statLabel}>Tamamlanan Ders</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{completedActivitiesCount}</Text>
            <Text style={styles.statLabel}>Etkinlik</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{totalDuration}</Text>
            <Text style={styles.statLabel}>Dakika</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rozetler 🏆</Text>
          <View style={styles.badgesContainer}>
            {badges.map((badge, index) => (
              <View key={index} style={[styles.badge, badge.locked && styles.badgeLocked]}>
                <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genel İlerleme</Text>
          <View style={styles.weeklyCard}>
            <View style={styles.weeklyRow}>
              <Text style={styles.weeklyLabel}>Dersler</Text>
              <Text style={styles.weeklyValue}>{completedLessonsCount} / {totalLessons} ✅</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${lessonProgressPercentage}%` }]} />
            </View>

            <View style={styles.weeklyRow}>
              <Text style={styles.weeklyLabel}>Etkinlikler</Text>
              <Text style={styles.weeklyValue}>{completedActivitiesCount} / {totalActivities} ✅</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${activityProgressPercentage}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Son Aktiviteler</Text>

          {recentCompletedLessons.length === 0 && recentCompletedActivities.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📝</Text>
              <Text style={styles.emptyText}>
                Henüz tamamlanmış ders veya etkinlik yok.
              </Text>
              <Text style={styles.emptySubtext}>
                Öğren ve Uygula sekmelerinden başlayın!
              </Text>
            </View>
          ) : (
            <>
              {recentCompletedLessons.map((item) => (
                <View key={item.lesson_id} style={styles.activityItem}>
                  <Text style={styles.activityEmoji}>📚</Text>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>
                      {item.lessons.title} dersini tamamladınız
                    </Text>
                    <Text style={styles.activityTime}>
                      {formatTimeAgo(item.completed_at)}
                    </Text>
                  </View>
                </View>
              ))}

              {recentCompletedActivities.map((item) => (
                <View key={item.activity_id} style={styles.activityItem}>
                  <Text style={styles.activityEmoji}>🎮</Text>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>
                      {item.activities.title} etkinliğini tamamladınız
                    </Text>
                    <Text style={styles.activityTime}>
                      {formatTimeAgo(item.completed_at)}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#F59E0B',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FDE68A',
  },
  content: {
    padding: 24,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6B5B95',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badge: {
    width: '22%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  badgeLocked: {
    opacity: 0.5,
  },
  badgeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  weeklyCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  weeklyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 8,
  },
  weeklyLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  weeklyValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#82BB5D',
    borderRadius: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  activityEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  // ✅ Period Tabs Styles (BUG-H3 fix)
  periodTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  periodTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  periodTabActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  periodTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ProgressScreen;
