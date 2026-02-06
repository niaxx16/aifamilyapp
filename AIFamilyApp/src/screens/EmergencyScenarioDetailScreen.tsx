import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

interface EmergencyScenario {
  id: string;
  title: string;
  emoji: string;
  situation: string;
  immediateActions: string[];
  talkingPoints: string[];
  preventionTips: string[];
  nextStep: {
    title: string;
    action: string;
    timeframe: string;
  };
  readingTime: number;
}

type EmergencyScenarioDetailRouteProp = RouteProp<
  { EmergencyScenarioDetail: { scenario: EmergencyScenario } },
  'EmergencyScenarioDetail'
>;

const EmergencyScenarioDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<EmergencyScenarioDetailRouteProp>();
  const { scenario } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acil Durum Rehberi</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.emoji}>{scenario.emoji}</Text>
          <Text style={styles.title}>{scenario.title}</Text>
        </View>

        {/* Situation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 Durum</Text>
          <Text style={styles.sectionText}>{scenario.situation}</Text>
        </View>

        {/* Immediate Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚨 Hemen Yapmanız Gerekenler</Text>
          {scenario.immediateActions.map((action, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{action}</Text>
            </View>
          ))}
        </View>

        {/* Talking Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Konuşma Önerileri</Text>
          {scenario.talkingPoints.map((point, index) => (
            <View key={index} style={styles.quoteItem}>
              <Text style={styles.quoteText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* Prevention Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛡️ Gelecekte Önlemek İçin</Text>
          {scenario.preventionTips.map((tip, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Next Step - Action Plan */}
        <View style={styles.nextStepCard}>
          <View style={styles.nextStepHeader}>
            <Text style={styles.nextStepIcon}>✅</Text>
            <Text style={styles.nextStepTitle}>{scenario.nextStep.title}</Text>
          </View>
          <Text style={styles.nextStepAction}>{scenario.nextStep.action}</Text>
          <View style={styles.nextStepFooter}>
            <Text style={styles.nextStepTimeframe}>⏰ {scenario.nextStep.timeframe}</Text>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#FF4444',
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  titleSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#FFE5E5',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 8,
  },
  listBullet: {
    fontSize: 16,
    color: '#FF4444',
    marginRight: 8,
    marginTop: 2,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  quoteItem: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4444',
  },
  quoteText: {
    fontSize: 14,
    color: '#333333',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  nextStepCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    elevation: 2,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nextStepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nextStepIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  nextStepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    flex: 1,
  },
  nextStepAction: {
    fontSize: 15,
    color: '#1B5E20',
    lineHeight: 22,
    marginBottom: 12,
    fontWeight: '500',
  },
  nextStepFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextStepTimeframe: {
    fontSize: 13,
    color: '#388E3C',
    fontWeight: 'bold',
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
});

export default EmergencyScenarioDetailScreen;
