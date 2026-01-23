import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  Modal,
  Image,
  ImageBackground,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { supabase } from '../services/supabase';
import { ChildProfile, ParentProfile, EarnedBadge } from '../types/database.types';
import { useChild } from '../context/ChildContext';

// Avatar görselleri - statik import
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

const INTERESTS = [
  'Teknoloji',
  'Bilim',
  'Oyun',
  'Sanat',
  'Müzik',
  'Spor',
  'Okuma',
  'Doğa',
  'Matematik',
  'Kodlama'
];

type NavigationProp = StackNavigationProp<any>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { activeChild, allChildren, setActiveChild, refreshChildren } = useChild();
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditParentModal, setShowEditParentModal] = useState(false);
  const [editingChild, setEditingChild] = useState<ChildProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [parentProfile, setParentProfile] = useState<ParentProfile | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);
  const [parentNickname, setParentNickname] = useState('');

  // Form states
  const [nickname, setNickname] = useState('');
  const [selectedAge, setSelectedAge] = useState(8);
  const [selectedGrade, setSelectedGrade] = useState(3);
  const [selectedGender, setSelectedGender] = useState<'boy' | 'girl' | 'other' | 'prefer_not_to_say'>('boy');
  const [selectedAvatar, setSelectedAvatar] = useState('👦');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchParentProfile();
      fetchPointsAndBadges();
    }, [allChildren])
  );

  const fetchParentProfile = async () => {
    try {
      // Giriş yapan kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.log('Kullanıcı girişi yapılmamış');
        return;
      }

      const { data, error } = await supabase
        .from('parent_profiles')
        .select('*')
        .eq('user_id', user.id)
        .is('parent_id', null) // Ana ebeveyn profilini al (parent_id NULL olanı)
        .maybeSingle(); // single() yerine maybeSingle() - kayıt yoksa null döner, hata vermez

      if (error) throw error;

      // Eğer profil yoksa oluştur
      if (!data) {
        const { data: newProfile, error: createError } = await supabase
          .from('parent_profiles')
          .insert({
            user_id: user.id,
            nickname: user.email?.split('@')[0] || 'Ebeveyn',
            age: 35,
            is_active: false, // Ebeveyn profili aktif değil
          })
          .select()
          .single();

        if (createError) throw createError;
        setParentProfile(newProfile);
      } else {
        setParentProfile(data);
      }
    } catch (error) {
      console.error('Ebeveyn profili yüklenirken hata:', error);
    }
  };

  const fetchPointsAndBadges = async () => {
    if (allChildren.length === 0) return;
    const firstChild = allChildren[0];

    const parentId = firstChild.parent_id;
    if (!parentId) return;

    try {
      // Ebeveyn profilinin toplam puanını çek
      const { data: parentData } = await supabase
        .from('parent_profiles')
        .select('total_points')
        .eq('id', parentId)
        .single();

      setTotalPoints(parentData?.total_points || 0);

      // Ebeveyn profilinin rozetlerini çek
      const { data: badgesData } = await supabase
        .from('earned_badges')
        .select('*')
        .eq('parent_id', parentId)
        .order('earned_at', { ascending: false });

      setEarnedBadges(badgesData || []);
    } catch (error) {
      console.error('Puan ve rozet yüklenirken hata:', error);
    }
  };

  const resetForm = () => {
    setNickname('');
    setSelectedAge(8);
    setSelectedGrade(3);
    setSelectedGender('boy');
    setSelectedAvatar('avatar1');
    setSelectedInterests([]);
  };

  const addChild = async () => {
    if (!nickname.trim()) {
      Alert.alert('Hata', 'Lütfen bir lakap girin.');
      return;
    }

    setSaving(true);
    try {
      // Giriş yapan kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert('Hata', 'Lütfen giriş yapın.');
        return;
      }

      // Ebeveyn profili al
      const { data: parentData } = await supabase
        .from('parent_profiles')
        .select('id')
        .eq('user_id', user.id)
        .is('parent_id', null)
        .maybeSingle();

      if (!parentData) {
        Alert.alert('Hata', 'Ebeveyn profili bulunamadı. Lütfen sayfayı yenileyin.');
        return;
      }

      // Yeni çocuk profili ekle
      const { error } = await supabase
        .from('parent_profiles')
        .insert({
          parent_id: parentData.id, // Ana ebeveyn profil ID'si
          nickname: nickname.trim(),
          age: selectedAge,
          grade_level: selectedGrade,
          gender: selectedGender,
          avatar: selectedAvatar,
          interests: selectedInterests,
          is_active: allChildren.length === 0, // İlk çocuksa aktif yap
        });

      if (error) throw error;

      Alert.alert('Başarılı', 'Çocuk profili eklendi!');
      setShowAddModal(false);
      resetForm();
      await refreshChildren();
    } catch (error) {
      console.error('Çocuk eklenirken hata:', error);
      Alert.alert('Hata', 'Çocuk profili eklenirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const updateParentNickname = async () => {
    if (!parentNickname.trim()) {
      Alert.alert('Hata', 'Lütfen bir kullanıcı adı girin.');
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert('Hata', 'Lütfen giriş yapın.');
        return;
      }

      const { error } = await supabase
        .from('parent_profiles')
        .update({ nickname: parentNickname.trim() })
        .eq('user_id', user.id)
        .is('parent_id', null);

      if (error) throw error;

      Alert.alert('Başarılı', 'Kullanıcı adı güncellendi!');
      setShowEditParentModal(false);
      await fetchParentProfile();
    } catch (error) {
      console.error('Kullanıcı adı güncellenirken hata:', error);
      Alert.alert('Hata', 'Kullanıcı adı güncellenirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const editChild = (child: ChildProfile) => {
    setEditingChild(child);
    setNickname(child.nickname);
    setSelectedAge(child.age);
    setSelectedGrade(child.grade_level || 3);
    setSelectedGender(child.gender || 'boy');
    setSelectedAvatar(child.avatar);
    setSelectedInterests(child.interests || []);
    setShowEditModal(true);
  };

  const updateChild = async () => {
    if (!nickname.trim() || !editingChild) {
      Alert.alert('Hata', 'Lütfen bir lakap girin.');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('parent_profiles')
        .update({
          nickname: nickname.trim(),
          age: selectedAge,
          grade_level: selectedGrade,
          gender: selectedGender,
          avatar: selectedAvatar,
          interests: selectedInterests,
        })
        .eq('id', editingChild.id);

      if (error) throw error;

      Alert.alert('Başarılı', 'Profil güncellendi!');
      setShowEditModal(false);
      setEditingChild(null);
      resetForm();
      await refreshChildren();
    } catch (error) {
      console.error('Profil güncellenirken hata:', error);
      Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const deleteChild = async (child: ChildProfile) => {
    Alert.alert(
      'Emin misiniz?',
      `${child.nickname} profilini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              // Önce ilgili verileri sil
              // 1. Tamamlanan aktiviteleri sil
              await supabase
                .from('completed_activities')
                .delete()
                .eq('parent_id', child.id);

              // 2. Kullanıcı ilerlemesini sil
              await supabase
                .from('user_progress')
                .delete()
                .eq('parent_id', child.id);

              // 3. Kazanılan rozetleri sil
              await supabase
                .from('earned_badges')
                .delete()
                .eq('parent_id', child.id);

              // 4. Son olarak profili sil
              const { data, error } = await supabase
                .from('parent_profiles')
                .delete()
                .eq('id', child.id)
                .select();

              if (error) throw error;

              if (!data || data.length === 0) {
                throw new Error('Profil silinemedi. Yetki sorunu olabilir.');
              }

              Alert.alert('Başarılı', 'Profil silindi.');
              await refreshChildren();
            } catch (error: any) {
              console.error('Çocuk silinirken hata:', error);
              Alert.alert('Hata', error.message || 'Profil silinirken bir hata oluştu.');
            }
          },
        },
      ]
    );
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const getGenderLabel = (gender: string | null) => {
    switch (gender) {
      case 'boy': return 'Erkek';
      case 'girl': return 'Kız';
      case 'other': return 'Diğer';
      case 'prefer_not_to_say': return 'Belirtmek istemiyorum';
      default: return 'Belirtilmemiş';
    }
  };

  const getAvatarSource = (avatarId: string) => {
    const avatar = AVATARS.find(a => a.id === avatarId);
    console.log('Looking for avatar:', avatarId, 'Found:', avatar ? 'yes' : 'no');
    return avatar ? avatar.source : AVATARS[0].source;
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Hesabı Sil',
      'Hesabınızı silmek istediğinizden emin misiniz?\n\nBu işlem:\n• Tüm çocuk profillerini\n• Tüm ilerleme verilerini\n• Kazanılan rozetleri\n• Hesap bilgilerinizi\n\nkalıcı olarak silecektir.\n\nBu işlem geri alınamaz!',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Hesabı Sil',
          style: 'destructive',
          onPress: () => confirmDeleteAccount(),
        },
      ]
    );
  };

  const confirmDeleteAccount = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert('Hata', 'Kullanıcı bulunamadı.');
        return;
      }

      // 1. Önce çocuk profillerini sil (parent_id'si olan kayıtlar)
      const { error: childrenError } = await supabase
        .from('parent_profiles')
        .delete()
        .eq('user_id', user.id)
        .not('parent_id', 'is', null);

      if (childrenError) {
        console.error('Çocuk profilleri silinirken hata:', childrenError);
      }

      // 2. Kazanılan rozetleri sil
      if (parentProfile?.id) {
        const { error: badgesError } = await supabase
          .from('earned_badges')
          .delete()
          .eq('parent_id', parentProfile.id);

        if (badgesError) {
          console.error('Rozetler silinirken hata:', badgesError);
        }

        // 3. Tamamlanan aktiviteleri sil
        const { error: activitiesError } = await supabase
          .from('completed_activities')
          .delete()
          .eq('parent_id', parentProfile.id);

        if (activitiesError) {
          console.error('Aktiviteler silinirken hata:', activitiesError);
        }
      }

      // 4. Ana ebeveyn profilini sil
      const { error: parentError } = await supabase
        .from('parent_profiles')
        .delete()
        .eq('user_id', user.id)
        .is('parent_id', null);

      if (parentError) {
        console.error('Ebeveyn profili silinirken hata:', parentError);
      }

      // 5. Kullanıcı oturumunu kapat
      await supabase.auth.signOut();

      Alert.alert(
        'Hesap Silindi',
        'Hesabınız ve tüm verileriniz başarıyla silindi.',
        [{ text: 'Tamam' }]
      );

    } catch (error) {
      console.error('Hesap silinirken hata:', error);
      Alert.alert('Hata', 'Hesap silinirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../assets/profile-hero.png')}
        style={styles.header}
        imageStyle={styles.headerImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        {/* Ebeveyn Profili */}
        {parentProfile && (
          <View style={styles.parentCard}>
            <View style={styles.parentHeader}>
              <View style={styles.parentAvatar}>
                <Text style={styles.parentAvatarText}>👤</Text>
              </View>
              <View style={styles.parentInfo}>
                <Text style={styles.parentLabel}>Ebeveyn Profili</Text>
                <View style={styles.parentNameRow}>
                  <Text style={styles.parentName}>
                    {parentProfile.nickname || 'Kullanıcı'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowEditParentModal(true)}
                    style={styles.editIconButton}
                  >
                    <Text style={styles.editIcon}>✏️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Puan ve Rozet Bölümü */}
            <View style={styles.statsSection}>
              <View style={styles.pointsCard}>
                <Text style={styles.pointsEmoji}>⭐</Text>
                <View>
                  <Text style={styles.pointsValue}>{totalPoints}</Text>
                  <Text style={styles.pointsLabel}>Toplam Puan</Text>
                </View>
              </View>

              <View style={styles.badgesCard}>
                <Text style={styles.badgesTitle}>🏆 Kazanılan Rozetler</Text>
                {earnedBadges.length === 0 ? (
                  <Text style={styles.noBadgesText}>
                    Henüz rozet kazanılmadı. Bir kategoriyi tamamlayarak rozet kazanın!
                  </Text>
                ) : (
                  <View style={styles.badgesList}>
                    {earnedBadges.map((badge) => (
                      <View key={badge.id} style={styles.badgeItem}>
                        <Text style={styles.badgeEmoji}>{badge.badge_emoji}</Text>
                        <Text style={styles.badgeName}>{badge.badge_name}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        )}


        {/* Çocuk Profilleri Listesi */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Çocuklarım</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.addButtonText}>+ Çocuk Ekle</Text>
            </TouchableOpacity>
          </View>

          {allChildren.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>👨‍👩‍👧‍👦</Text>
              <Text style={styles.emptyText}>Çocuğunuz için profil oluşturun</Text>
              <Text style={styles.emptySubtext}>
                Her çocuğunuz için ayrı profil ekleyerek yaşa uygun içerikler sunabilirsiniz
              </Text>
            </View>
          ) : (
            allChildren.map((child) => (
              <View key={child.id} style={styles.childCard}>
                <View style={styles.childCardContent}>
                  <Image
                    source={getAvatarSource(child.avatar)}
                    style={styles.childAvatarImage}
                  />
                  <View style={styles.childInfo}>
                    <Text style={styles.childName}>{child.nickname}</Text>
                    <Text style={styles.childMeta}>
                      {child.age} yaş • {child.grade_level}. sınıf • {getGenderLabel(child.gender)}
                    </Text>
                    {child.interests && child.interests.length > 0 && (
                      <View style={styles.childInterests}>
                        {child.interests.slice(0, 3).map((interest, idx) => (
                          <Text key={idx} style={styles.childInterestTag}>
                            {interest}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editChild(child)}
                  >
                    <Text style={styles.editButtonText}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteChild(child)}
                  >
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Yasal ve Ayarlar Bölümü */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yasal ve Destek</Text>

          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <View style={styles.settingsItemLeft}>
              <Text style={styles.settingsIcon}>🔒</Text>
              <Text style={styles.settingsText}>Gizlilik Politikası</Text>
            </View>
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => navigation.navigate('TermsOfService')}
          >
            <View style={styles.settingsItemLeft}>
              <Text style={styles.settingsIcon}>📄</Text>
              <Text style={styles.settingsText}>Kullanım Şartları</Text>
            </View>
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => {
              Alert.alert(
                'İletişim',
                'Sorularınız için bize ulaşın:\n\nE-posta: destek@aifamilyapp.com\nWeb: www.aifamilyapp.com'
              );
            }}
          >
            <View style={styles.settingsItemLeft}>
              <Text style={styles.settingsIcon}>📧</Text>
              <Text style={styles.settingsText}>Bize Ulaşın</Text>
            </View>
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>

          {/* Hesap Silme */}
          <TouchableOpacity
            style={styles.deleteAccountItem}
            onPress={handleDeleteAccount}
            disabled={loading}
          >
            <View style={styles.settingsItemLeft}>
              <Text style={styles.settingsIcon}>🗑️</Text>
              <Text style={styles.deleteAccountText}>Hesabımı Sil</Text>
            </View>
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.appVersion}>
            <Text style={styles.appVersionText}>AI Aile Rehberi v1.0.0</Text>
          </View>
        </View>
      </View>

      {/* Çocuk Ekleme Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowAddModal(false)}
      >
        <ScrollView
          style={styles.modalContainer}
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Yeni Çocuk Profili</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {/* Lakap */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Lakap / İsim</Text>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                placeholder="ör: Büyük kardeş, Küçük kardeş"
                placeholderTextColor="#9CA3AF"
                autoCorrect={false}
                autoCapitalize="words"
                keyboardType="default"
              />
            </View>

            {/* Avatar */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Avatar</Text>
              <View style={styles.avatarGrid}>
                {AVATARS.map((avatar) => (
                  <TouchableOpacity
                    key={avatar.id}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === avatar.id && styles.avatarOptionSelected
                    ]}
                    onPress={() => setSelectedAvatar(avatar.id)}
                  >
                    <Image source={avatar.source} style={styles.avatarImage} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Yaş */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Yaş (6-11)</Text>
              <View style={styles.optionGrid}>
                {[6, 7, 8, 9, 10, 11].map((age) => (
                  <TouchableOpacity
                    key={age}
                    style={[
                      styles.option,
                      selectedAge === age && styles.optionSelected
                    ]}
                    onPress={() => setSelectedAge(age)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedAge === age && styles.optionTextSelected
                    ]}>
                      {age}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sınıf */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Sınıf (1-5)</Text>
              <View style={styles.optionGrid}>
                {[1, 2, 3, 4, 5].map((grade) => (
                  <TouchableOpacity
                    key={grade}
                    style={[
                      styles.option,
                      selectedGrade === grade && styles.optionSelected
                    ]}
                    onPress={() => setSelectedGrade(grade)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedGrade === grade && styles.optionTextSelected
                    ]}>
                      {grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Cinsiyet */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Cinsiyet (Opsiyonel)</Text>
              <View style={styles.genderGrid}>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    selectedGender === 'boy' && styles.genderOptionSelected
                  ]}
                  onPress={() => setSelectedGender('boy')}
                >
                  <Text style={styles.genderEmoji}>👦</Text>
                  <Text style={[
                    styles.genderText,
                    selectedGender === 'boy' && styles.genderTextSelected
                  ]}>
                    Erkek
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    selectedGender === 'girl' && styles.genderOptionSelected
                  ]}
                  onPress={() => setSelectedGender('girl')}
                >
                  <Text style={styles.genderEmoji}>👧</Text>
                  <Text style={[
                    styles.genderText,
                    selectedGender === 'girl' && styles.genderTextSelected
                  ]}>
                    Kız
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* İlgi Alanları */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>İlgi Alanları (Opsiyonel)</Text>
              <View style={styles.interestGrid}>
                {INTERESTS.map((interest) => (
                  <TouchableOpacity
                    key={interest}
                    style={[
                      styles.interestChip,
                      selectedInterests.includes(interest) && styles.interestChipSelected
                    ]}
                    onPress={() => toggleInterest(interest)}
                  >
                    <Text style={[
                      styles.interestText,
                      selectedInterests.includes(interest) && styles.interestTextSelected
                    ]}>
                      {interest}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton, saving && styles.buttonDisabled]}
                onPress={addChild}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>

      {/* Çocuk Düzenleme Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          setShowEditModal(false);
          setEditingChild(null);
          resetForm();
        }}
      >
        <ScrollView
          style={styles.modalContainer}
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Profili Düzenle</Text>
            <TouchableOpacity onPress={() => {
              setShowEditModal(false);
              setEditingChild(null);
              resetForm();
            }}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {/* Lakap */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Lakap / İsim</Text>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                placeholder="ör: Büyük kardeş, Küçük kardeş"
                placeholderTextColor="#9CA3AF"
                autoCorrect={false}
                autoCapitalize="words"
                keyboardType="default"
              />
            </View>

            {/* Avatar */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Avatar</Text>
              <View style={styles.avatarGrid}>
                {AVATARS.map((avatar) => (
                  <TouchableOpacity
                    key={avatar.id}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === avatar.id && styles.avatarOptionSelected
                    ]}
                    onPress={() => setSelectedAvatar(avatar.id)}
                  >
                    <Image source={avatar.source} style={styles.avatarImage} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Yaş */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Yaş (6-11)</Text>
              <View style={styles.optionGrid}>
                {[6, 7, 8, 9, 10, 11].map((age) => (
                  <TouchableOpacity
                    key={age}
                    style={[
                      styles.option,
                      selectedAge === age && styles.optionSelected
                    ]}
                    onPress={() => setSelectedAge(age)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedAge === age && styles.optionTextSelected
                    ]}>
                      {age}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sınıf */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Sınıf (1-5)</Text>
              <View style={styles.optionGrid}>
                {[1, 2, 3, 4, 5].map((grade) => (
                  <TouchableOpacity
                    key={grade}
                    style={[
                      styles.option,
                      selectedGrade === grade && styles.optionSelected
                    ]}
                    onPress={() => setSelectedGrade(grade)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedGrade === grade && styles.optionTextSelected
                    ]}>
                      {grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Cinsiyet */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Cinsiyet (Opsiyonel)</Text>
              <View style={styles.genderGrid}>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    selectedGender === 'boy' && styles.genderOptionSelected
                  ]}
                  onPress={() => setSelectedGender('boy')}
                >
                  <Text style={styles.genderEmoji}>👦</Text>
                  <Text style={[
                    styles.genderText,
                    selectedGender === 'boy' && styles.genderTextSelected
                  ]}>
                    Erkek
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    selectedGender === 'girl' && styles.genderOptionSelected
                  ]}
                  onPress={() => setSelectedGender('girl')}
                >
                  <Text style={styles.genderEmoji}>👧</Text>
                  <Text style={[
                    styles.genderText,
                    selectedGender === 'girl' && styles.genderTextSelected
                  ]}>
                    Kız
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* İlgi Alanları */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>İlgi Alanları (Opsiyonel)</Text>
              <View style={styles.interestGrid}>
                {INTERESTS.map((interest) => (
                  <TouchableOpacity
                    key={interest}
                    style={[
                      styles.interestChip,
                      selectedInterests.includes(interest) && styles.interestChipSelected
                    ]}
                    onPress={() => toggleInterest(interest)}
                  >
                    <Text style={[
                      styles.interestText,
                      selectedInterests.includes(interest) && styles.interestTextSelected
                    ]}>
                      {interest}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowEditModal(false);
                  setEditingChild(null);
                  resetForm();
                }}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton, saving && styles.buttonDisabled]}
                onPress={updateChild}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? 'Güncelleniyor...' : 'Güncelle'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>

      {/* Ebeveyn Kullanıcı Adı Düzenleme Modal */}
      <Modal
        visible={showEditParentModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowEditParentModal(false)}
        onShow={() => setParentNickname(parentProfile?.nickname || '')}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Kullanıcı Adı Düzenle</Text>
            <TouchableOpacity onPress={() => setShowEditParentModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Kullanıcı Adı</Text>
              <TextInput
                style={styles.input}
                value={parentNickname}
                onChangeText={setParentNickname}
                placeholder="Kullanıcı adınızı girin"
                placeholderTextColor="#9CA3AF"
                autoCorrect={false}
                autoCapitalize="none"
                maxLength={20}
              />
              <Text style={styles.helpText}>
                Bu isim profil sayfanızda görünecektir. Gerçek isminizi kullanmak zorunda değilsiniz.
              </Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowEditParentModal(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                onPress={updateParentNickname}
                disabled={saving || !parentNickname.trim()}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </Text>
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
  header: {
    height: 220,
    overflow: 'hidden',
    backgroundColor: '#193140',
  },
  headerImage: {
    opacity: 1,
  },
  content: {
    padding: 24,
  },
  parentCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  parentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parentAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#32738C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  parentAvatarText: {
    fontSize: 32,
  },
  parentInfo: {
    flex: 1,
  },
  parentLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  parentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  parentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  editIconButton: {
    padding: 4,
  },
  editIcon: {
    fontSize: 18,
  },
  parentEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  pointsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2BFAC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  pointsEmoji: {
    fontSize: 36,
    marginRight: 16,
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#193140',
  },
  pointsLabel: {
    fontSize: 14,
    color: '#193140',
    fontWeight: '600',
  },
  badgesCard: {
    backgroundColor: '#A7CBD9',
    padding: 16,
    borderRadius: 12,
  },
  badgesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 12,
  },
  noBadgesText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  badgesList: {
    gap: 8,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#32738C',
  },
  badgeEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#193140',
  },
  activeChildCard: {
    backgroundColor: '#F2BFAC',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#F26B5E',
  },
  activeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F26B5E',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  activeChildHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeAvatar: {
    fontSize: 48,
    marginRight: 16,
  },
  activeChildInfo: {
    flex: 1,
  },
  activeChildName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  activeChildMeta: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#F26B5E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  childCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  childCardActive: {
    borderColor: '#F26B5E',
    backgroundColor: '#F2BFAC',
  },
  childCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  childAvatar: {
    fontSize: 40,
    marginRight: 16,
  },
  childAvatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  childMeta: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  childInterests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  childInterestTag: {
    fontSize: 11,
    color: '#32738C',
    backgroundColor: '#A7CBD9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeBadge: {
    backgroundColor: '#F26B5E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 24,
  },
  deleteButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#193140',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalClose: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 24,
  },
  formSection: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  avatarOption: {
    width: 60,
    height: 60,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarOptionSelected: {
    backgroundColor: '#A7CBD9',
    borderColor: '#32738C',
  },
  avatarEmoji: {
    fontSize: 32,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: '#A7CBD9',
    borderColor: '#32738C',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  optionTextSelected: {
    color: '#32738C',
  },
  genderGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  genderOption: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  genderOptionSelected: {
    backgroundColor: '#A7CBD9',
    borderColor: '#32738C',
  },
  genderEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  genderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  genderTextSelected: {
    color: '#32738C',
  },
  interestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  interestChipSelected: {
    backgroundColor: '#A7CBD9',
    borderColor: '#32738C',
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  interestTextSelected: {
    color: '#32738C',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#F26B5E',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#E5E7EB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  helpText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 8,
    lineHeight: 18,
  },
  // Settings Section
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingsText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  settingsArrow: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  appVersion: {
    alignItems: 'center',
    marginTop: 16,
    paddingBottom: 40,
  },
  appVersionText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  deleteAccountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  deleteAccountText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '500',
  },
});

export default ProfileScreen;
