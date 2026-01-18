import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<any>;

const GuideScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <ImageBackground
        source={require('../../assets/guide-hero.png')}
        style={styles.heroSection}
        imageStyle={styles.heroImage}
        resizeMode="cover"
      />

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Category Grid - 2x3 */}
        <View style={styles.gridContainer}>
          <TouchableOpacity
            style={[styles.categoryCard, styles.categoryCardSOS]}
            onPress={() => navigation.navigate('SOSEmergency')}
            activeOpacity={0.8}
            accessible={true}
            accessibilityLabel="Acil Durum Rehberi"
            accessibilityHint="Acil durumlarda size yardımcı olacak rehber"
            accessibilityRole="button"
          >
            <Text style={styles.categoryEmoji}>🆘</Text>
            <Text style={styles.categoryTitle}>Acil Durum{'\n'}Rehberi (SOS)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.categoryCard, styles.categoryCardChat]}
            onPress={() => navigation.navigate('AIMentor')}
            activeOpacity={0.8}
            accessible={true}
            accessibilityLabel="Akıllı Sohbet Asistanı"
            accessibilityHint="AI destekli sohbet asistanı ile konuşun"
            accessibilityRole="button"
          >
            <Text style={styles.categoryEmoji}>💬</Text>
            <Text style={styles.categoryTitle}>Akıllı Sohbet{'\n'}Asistanı</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.categoryCard, styles.categoryCardLibrary]}
            onPress={() => navigation.navigate('ScenarioLibrary')}
            activeOpacity={0.8}
            accessible={true}
            accessibilityLabel="Senaryo Kütüphanesi"
            accessibilityHint="Örnek diyalog senaryolarını görüntüleyin"
            accessibilityRole="button"
          >
            <Text style={styles.categoryEmoji}>📚</Text>
            <Text style={styles.categoryTitleDark}>Senaryo{'\n'}Kütüphanesi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.categoryCard, styles.categoryCardPlan]}
            onPress={() => navigation.navigate('ActionPlan')}
            activeOpacity={0.8}
            accessible={true}
            accessibilityLabel="Kişisel Eylem Planı"
            accessibilityHint="Hedeflerinizi belirleyin ve takip edin"
            accessibilityRole="button"
          >
            <Text style={styles.categoryEmoji}>🎯</Text>
            <Text style={styles.categoryTitleDark}>Kişisel Eylem{'\n'}Planı</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.categoryCard, styles.categoryCardCalendar]}
            onPress={() => navigation.navigate('AICalendar')}
            activeOpacity={0.8}
            accessible={true}
            accessibilityLabel="AI Takvimi"
            accessibilityHint="AI ile ilgili etkinliklerinizi planlayın"
            accessibilityRole="button"
          >
            <Text style={styles.categoryEmoji}>🗓️</Text>
            <Text style={styles.categoryTitleDark}>AI Takvimi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.categoryCard, styles.categoryCardContract]}
            onPress={() => navigation.navigate('FamilyContract')}
            activeOpacity={0.8}
            accessible={true}
            accessibilityLabel="Aile Sözleşmesi"
            accessibilityHint="Aile kurallarınızı belirleyin"
            accessibilityRole="button"
          >
            <Text style={styles.categoryEmoji}>🏠</Text>
            <Text style={styles.categoryTitle}>Aile{'\n'}Sözleşmesi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  // Hero Section
  heroSection: {
    height: 220,
    overflow: 'hidden',
  },
  heroImage: {
    opacity: 1,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // Category Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48) / 2, // 2 columns with spacing
    minHeight: 160, // Erişilebilirlik: Minimum dokunma alanı
    aspectRatio: 1, // Square cards
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  categoryEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
  },
  categoryTitleDark: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#193140',
    textAlign: 'center',
    lineHeight: 18,
  },
  // Category specific colors (new palette)
  categoryCardSOS: {
    backgroundColor: '#F26B5E', // Mercan: Acil durum, dikkat
  },
  categoryCardChat: {
    backgroundColor: '#32738C', // Orta ton mavi: Güven, sakinlik, AI Mentor
  },
  categoryCardLibrary: {
    backgroundColor: '#A7CBD9', // Açık mavi: Bilgelik, deneyim, Senaryolar
  },
  categoryCardPlan: {
    backgroundColor: '#F2BFAC', // Somon: Büyüme, başarı, Hedefler
  },
  categoryCardCalendar: {
    backgroundColor: '#F5E185', // Sarı-bej: Planlama, düzen, Takvim
  },
  categoryCardContract: {
    backgroundColor: '#193140', // Koyu lacivert: Aile, güven, istikrar, Sözleşme
  },
});

export default GuideScreen;
