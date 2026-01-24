import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { supabase } from '../services/supabase';
import { Activity } from '../types/database.types';
import { useChild } from '../context/ChildContext';

// Avatar görselleri
const avatar1 = require('../../assets/avatars/avatar1.png');
const avatar2 = require('../../assets/avatars/avatar2.png');
const avatar3 = require('../../assets/avatars/avatar3.png');
const avatar4 = require('../../assets/avatars/avatar4.png');
const avatar5 = require('../../assets/avatars/avatar5.png');
const avatar6 = require('../../assets/avatars/avatar6.png');
const avatar7 = require('../../assets/avatars/avatar7.png');
const avatar8 = require('../../assets/avatars/avatar8.png');
const avatar9 = require('../../assets/avatars/avatar9.png');
const avatar10 = require('../../assets/avatars/avatar10.png');
const avatar11 = require('../../assets/avatars/avatar11.png');
const avatar12 = require('../../assets/avatars/avatar12.png');

const AVATARS = [
  { id: 'avatar1', source: avatar1 },
  { id: 'avatar2', source: avatar2 },
  { id: 'avatar3', source: avatar3 },
  { id: 'avatar4', source: avatar4 },
  { id: 'avatar5', source: avatar5 },
  { id: 'avatar6', source: avatar6 },
  { id: 'avatar7', source: avatar7 },
  { id: 'avatar8', source: avatar8 },
  { id: 'avatar9', source: avatar9 },
  { id: 'avatar10', source: avatar10 },
  { id: 'avatar11', source: avatar11 },
  { id: 'avatar12', source: avatar12 },
];

type NavigationProp = StackNavigationProp<any>;

const PracticeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { allChildren, activeChild, setActiveChild, refreshChildren } = useChild();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [viewingWeek, setViewingWeek] = useState(1); // Görüntülenen hafta
  const [maxAvailableWeek, setMaxAvailableWeek] = useState(1); // Veritabanındaki maksimum hafta

  // Veritabanındaki maksimum hafta sayısını çek
  const fetchMaxAvailableWeek = async (childAge: number) => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('week_number')
        .lte('age_min', childAge)
        .gte('age_max', childAge)
        .order('week_number', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setMaxAvailableWeek(data[0].week_number || 1);
      }
    } catch (error) {
      console.error('Max hafta çekilirken hata:', error);
    }
  };

  // Sayfa her focus aldığında etkinlikleri yenile
  useFocusEffect(
    React.useCallback(() => {
      // Aktif çocuğu kullan (ChildContext'ten gelen)
      const child = activeChild || (allChildren.length > 0 ? allChildren[0] : null);

      if (child) {
        const currentWeek = child.current_week || 1;
        setViewingWeek(currentWeek);
        fetchActivitiesForChild(child, currentWeek);
        fetchMaxAvailableWeek(child.age);
      }
    }, [activeChild, allChildren])
  );

  // Görüntülenen hafta değiştiğinde etkinlikleri yenile
  useEffect(() => {
    const child = activeChild || (allChildren.length > 0 ? allChildren[0] : null);
    if (child) {
      fetchActivitiesForChild(child, viewingWeek);
    }
  }, [viewingWeek, activeChild, allChildren]);

  const fetchActivitiesForChild = async (child: any, week: number) => {
    if (!child) return;

    setLoading(true);
    try {
      // Etkinlikleri çek - Seçilen çocuğun yaşına ve görüntülenen haftaya uygun olanlar
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .lte('age_min', child.age)        // age_min <= çocuğun yaşı
        .gte('age_max', child.age)        // age_max >= çocuğun yaşı
        .eq('week_number', week)          // Görüntülenen haftanın etkinlikleri
        .order('created_at', { ascending: true });

      if (activitiesError) throw activitiesError;

      // Tamamlanan etkinlikleri çek (ebeveyn profilinden)
      const parentId = child.parent_id;
      const { data: completedData, error: completedError } = await supabase
        .from('completed_activities')
        .select('activity_id')
        .eq('parent_id', parentId || child.id);

      if (completedError) throw completedError;

      setActivities(activitiesData || []);
      const completedSet = new Set(completedData?.map(c => c.activity_id) || []);
      setCompletedActivities(completedSet);
    } catch (error) {
      console.error('Etkinlikler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'game': return '🎮';
      case 'conversation': return '💬';
      case 'creative': return '🎨';
      case 'exploration': return '🔍';
      default: return '📝';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'game': return 'Oyun';
      case 'conversation': return 'Konuşma';
      case 'creative': return 'Yaratıcılık';
      case 'exploration': return 'Keşif';
      default: return 'Etkinlik';
    }
  };

  const isActivityCompleted = (activityId: string) => {
    return completedActivities.has(activityId);
  };

  const getAvatarSource = (avatarId: string) => {
    const avatar = AVATARS.find(a => a.id === avatarId);
    return avatar ? avatar.source : AVATARS[0].source;
  };

  const advanceToNextWeek = async () => {
    if (!activeChild) return;

    try {
      const currentWeek = activeChild.current_week || 1;
      const nextWeek = currentWeek + 1;

      // Çocuğun haftasını güncelle (unlock yeni hafta)
      const { error } = await supabase
        .from('parent_profiles')
        .update({ current_week: nextWeek })
        .eq('id', activeChild.id);

      if (error) throw error;

      // Context'i yenile
      await refreshChildren();

      // Yeni haftayı görüntüle
      setViewingWeek(nextWeek);
    } catch (error) {
      console.error('Sonraki haftaya geçerken hata:', error);
    }
  };

  const goToPreviousWeek = () => {
    if (viewingWeek > 1) {
      setViewingWeek(viewingWeek - 1);
    }
  };

  const goToNextWeek = () => {
    const maxWeek = activeChild?.current_week || 1;
    if (viewingWeek < maxWeek) {
      setViewingWeek(viewingWeek + 1);
    }
  };

  if (allChildren.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require('../../assets/activities-hero.png')}
          style={styles.header}
          imageStyle={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>ℹ️</Text>
            </View>
            <Text style={styles.infoTitle}>Çocuk Profili Gerekli</Text>
            <Text style={styles.infoText}>
              Yaş grubuna uygun etkinlikleri görebilmek için öncelikle çocuğunuzun profilini oluşturmanız gerekmektedir.
            </Text>
            <Text style={styles.infoSteps}>
              <Text style={styles.infoStepBold}>Nasıl başlarım?</Text>
              {'\n'}1. Profil sekmesine gidin
              {'\n'}2. "Çocuk Ekle" butonuna tıklayın
              {'\n'}3. Çocuğunuzun bilgilerini girin
              {'\n'}4. Bu sayfaya geri dönerek etkinlikleri keşfedin
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#193140" />
        <Text style={styles.loadingText}>Etkinlikler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../assets/activities-hero.png')}
        style={styles.header}
        imageStyle={styles.headerImage}
        resizeMode="cover"
      />

      {/* Çocuk Seçici */}
      {allChildren.length > 0 && (
        <View style={styles.childSelectorContainer}>
          <Text style={styles.childSelectorLabel}>Hangi çocuğunuz için etkinlik arıyorsunuz?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.childSelectorScroll}>
            {allChildren.map((child) => (
              <TouchableOpacity
                key={child.id}
                style={[
                  styles.childSelectorCard,
                  activeChild?.id === child.id && styles.childSelectorCardActive
                ]}
                onPress={() => setActiveChild(child)}
              >
                <Image
                  source={getAvatarSource(child.avatar)}
                  style={styles.childSelectorAvatarImage}
                />
                <Text style={[
                  styles.childSelectorName,
                  activeChild?.id === child.id && styles.childSelectorNameActive
                ]}>
                  {child.nickname}
                </Text>
                <Text style={styles.childSelectorAge}>{child.age} yaş</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.content}>
        {activities.length > 0 && (
          <View style={styles.weekSection}>
            <View style={styles.weekNavigationContainer}>
              <TouchableOpacity
                style={[styles.weekNavButton, viewingWeek <= 1 && styles.weekNavButtonDisabled]}
                onPress={goToPreviousWeek}
                disabled={viewingWeek <= 1}
              >
                <Text style={[styles.weekNavButtonText, viewingWeek <= 1 && styles.weekNavButtonTextDisabled]}>←</Text>
              </TouchableOpacity>

              <View style={styles.weekTitleContainer}>
                <Text style={styles.weekTitle}>🌟 Hafta {viewingWeek} Etkinlikleri</Text>
                {viewingWeek < (activeChild?.current_week || 1) && (
                  <Text style={styles.weekSubtitlePast}>Geçmiş Hafta</Text>
                )}
                {viewingWeek === (activeChild?.current_week || 1) && (
                  <Text style={styles.weekSubtitleCurrent}>Haftalık 3 etkinlik ile AI öğrenmeye devam edin</Text>
                )}
              </View>

              <TouchableOpacity
                style={[styles.weekNavButton, viewingWeek >= (activeChild?.current_week || 1) && styles.weekNavButtonDisabled]}
                onPress={goToNextWeek}
                disabled={viewingWeek >= (activeChild?.current_week || 1)}
              >
                <Text style={[styles.weekNavButtonText, viewingWeek >= (activeChild?.current_week || 1) && styles.weekNavButtonTextDisabled]}>→</Text>
              </TouchableOpacity>
            </View>

            {activities.slice(0, 3).map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={[
                  styles.weekActivityCard,
                  isActivityCompleted(activity.id) && styles.weekActivityCardCompleted
                ]}
                onPress={() => navigation.navigate('ActivityDetail', { activity, child: activeChild })}
              >
                <Text style={styles.weekActivityEmoji}>{getTypeEmoji(activity.type)}</Text>
                <View style={styles.weekActivityContent}>
                  <Text style={styles.weekActivityTitle}>{activity.title}</Text>
                  <Text style={styles.weekActivityMeta}>
                    {activity.duration} dakika • {getTypeLabel(activity.type)}
                  </Text>
                </View>
                {isActivityCompleted(activity.id) ? (
                  <Text style={styles.weekActivityCheck}>✓</Text>
                ) : (
                  <Text style={styles.weekActivityArrow}>→</Text>
                )}
              </TouchableOpacity>
            ))}

            {activities.length >= 3 &&
             activities.slice(0, 3).every(activity => isActivityCompleted(activity.id)) &&
             viewingWeek === (activeChild?.current_week || 1) && (
              viewingWeek < maxAvailableWeek ? (
                <View style={styles.allCompletedCard}>
                  <Text style={styles.allCompletedEmoji}>🎉</Text>
                  <Text style={styles.allCompletedTitle}>Harika İş Çıkardınız!</Text>
                  <Text style={styles.allCompletedText}>
                    Bu haftanın tüm etkinliklerini tamamladınız!
                  </Text>
                  <TouchableOpacity
                    style={styles.nextWeekButton}
                    onPress={advanceToNextWeek}
                  >
                    <Text style={styles.nextWeekButtonText}>Yeni Haftayı Aç 🔓</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.comingSoonCard}>
                  <Text style={styles.comingSoonEmoji}>🚀</Text>
                  <Text style={styles.comingSoonTitle}>Süper Başarı!</Text>
                  <Text style={styles.comingSoonText}>
                    Tebrikler! Şu ana kadar yayınlanan tüm etkinlikleri başarıyla tamamladınız.
                  </Text>
                  <View style={styles.comingSoonHighlight}>
                    <Text style={styles.comingSoonHighlightEmoji}>✨</Text>
                    <Text style={styles.comingSoonHighlightText}>
                      Yeni hafta etkinlikleri hazırlanıyor! Çok yakında {activeChild?.nickname || 'çocuğunuz'} için yepyeni maceralar eklenecek.
                    </Text>
                  </View>
                  <View style={styles.comingSoonTips}>
                    <Text style={styles.comingSoonTipsTitle}>Bu sürede neler yapabilirsiniz?</Text>
                    <Text style={styles.comingSoonTip}>📚 Önceki haftalardaki etkinlikleri tekrar yapın</Text>
                    <Text style={styles.comingSoonTip}>💬 Öğren bölümündeki dersleri keşfedin</Text>
                    <Text style={styles.comingSoonTip}>🏆 Kazandığınız rozetlere göz atın</Text>
                  </View>
                  <View style={styles.comingSoonBadge}>
                    <Text style={styles.comingSoonBadgeText}>🌟 Öncü Aile 🌟</Text>
                  </View>
                </View>
              )
            )}

            {activities.length >= 3 &&
             activities.slice(0, 3).every(activity => isActivityCompleted(activity.id)) &&
             viewingWeek < (activeChild?.current_week || 1) && (
              <View style={styles.pastWeekCompletedCard}>
                <Text style={styles.pastWeekCompletedEmoji}>✅</Text>
                <Text style={styles.pastWeekCompletedText}>
                  Bu haftanın tüm etkinliklerini tamamladınız!
                </Text>
              </View>
            )}
          </View>
        )}
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
  childSelectorContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  childSelectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  childSelectorScroll: {
    marginRight: -24,
  },
  childSelectorCard: {
    width: 100,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  childSelectorCardActive: {
    backgroundColor: '#E8F4F8',
    borderColor: '#32738C',
  },
  childSelectorAvatar: {
    fontSize: 36,
    marginBottom: 8,
  },
  childSelectorAvatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  childSelectorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  childSelectorNameActive: {
    color: '#193140',
  },
  childSelectorAge: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  content: {
    padding: 24,
  },
  weekSection: {
    marginBottom: 32,
  },
  weekNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weekNavButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F26B5E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  weekNavButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  weekNavButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  weekNavButtonTextDisabled: {
    color: '#9CA3AF',
  },
  weekTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  weekTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  weekSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  weekSubtitleCurrent: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
  weekSubtitlePast: {
    fontSize: 13,
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  weekActivityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  weekActivityCardCompleted: {
    backgroundColor: '#E8F4F8',
    borderColor: '#32738C',
  },
  weekActivityEmoji: {
    fontSize: 36,
    marginRight: 16,
  },
  weekActivityContent: {
    flex: 1,
  },
  weekActivityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  weekActivityMeta: {
    fontSize: 13,
    color: '#6B7280',
  },
  weekActivityCheck: {
    fontSize: 24,
    color: '#32738C',
    fontWeight: 'bold',
  },
  weekActivityArrow: {
    fontSize: 24,
    color: '#F26B5E',
    fontWeight: 'bold',
  },
  allCompletedCard: {
    backgroundColor: '#FEF0EE',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F26B5E',
    marginTop: 8,
  },
  allCompletedEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  allCompletedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 8,
    textAlign: 'center',
  },
  allCompletedText: {
    fontSize: 14,
    color: '#193140',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  nextWeekButton: {
    backgroundColor: '#F26B5E',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  nextWeekButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  pastWeekCompletedCard: {
    backgroundColor: '#E8F4F8',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#32738C',
    marginTop: 8,
  },
  pastWeekCompletedEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  pastWeekCompletedText: {
    fontSize: 14,
    color: '#193140',
    textAlign: 'center',
    fontWeight: '600',
  },
  // Coming Soon Card Styles
  comingSoonCard: {
    backgroundColor: '#FFF8E7',
    padding: 28,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F5A623',
    marginTop: 12,
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  comingSoonEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  comingSoonHighlight: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
    marginBottom: 20,
    width: '100%',
  },
  comingSoonHighlightEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  comingSoonHighlightText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
    fontWeight: '500',
  },
  comingSoonTips: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  comingSoonTipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonTip: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    paddingLeft: 4,
  },
  comingSoonBadge: {
    backgroundColor: '#32738C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  comingSoonBadgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  activityCard: {
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
  activityCardCompleted: {
    backgroundColor: '#E8F4F8',
    borderWidth: 2,
    borderColor: '#32738C',
  },
  activityEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityTitle: {
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
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityType: {
    fontSize: 14,
    color: '#6B7280',
  },
  activityDuration: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  activityAge: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
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

export default PracticeScreen;
