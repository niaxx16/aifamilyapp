import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { DialogueScenario } from '../types/database.types';

type DialogueScenarioDetailRouteProp = RouteProp<
  { DialogueScenarioDetail: { scenario: DialogueScenario } },
  'DialogueScenarioDetail'
>;

interface Props {
  route: DialogueScenarioDetailRouteProp;
}

const DialogueScenarioDetailScreen: React.FC<Props> = ({ route }) => {
  const { scenario } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>💬</Text>
        <Text style={styles.title}>{scenario.title}</Text>

        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Yaş:</Text>
            <Text style={styles.metaValue}>{scenario.age_range}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Zorluk:</Text>
            <Text style={styles.metaValue}>{'⭐'.repeat(scenario.difficulty)}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Kategori:</Text>
            <Text style={styles.metaValue}>{scenario.category}</Text>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎭 Durum</Text>
          <Text style={styles.sectionText}>{scenario.situation}</Text>
        </View>

        {scenario.child_quote && (
          <View style={[styles.section, styles.quoteSection]}>
            <Text style={styles.sectionTitle}>👶 Çocuğun Sorusu/Yorumu</Text>
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>"{scenario.child_quote}"</Text>
            </View>
          </View>
        )}

        <View style={[styles.section, styles.responseSection]}>
          <Text style={styles.sectionTitle}>👨‍👩‍👧 Önerilen Ebeveyn Yanıtı</Text>
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>{scenario.parent_response}</Text>
          </View>
        </View>

        {scenario.explanation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Açıklama</Text>
            <Text style={styles.explanationText}>{scenario.explanation}</Text>
          </View>
        )}
      </View>

      <View style={styles.tipBox}>
        <Text style={styles.tipIcon}>✨</Text>
        <Text style={styles.tipTitle}>İpucu</Text>
        <Text style={styles.tipText}>
          Bu diyalog sadece bir örnektir. Kendi çocuğunuzun kişiliğine ve
          duruma göre uyarlamanız önemlidir. Her çocuk farklıdır!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#88B0D3',
    padding: 24,
    paddingTop: 16,
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    fontSize: 14,
    color: '#DBEAFE',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  contentContainer: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  quoteSection: {
    backgroundColor: '#DBEAFE',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  quoteContainer: {
    paddingLeft: 12,
  },
  quoteText: {
    fontSize: 16,
    color: '#1E3A8A',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  responseSection: {
    backgroundColor: '#D1FAE5',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  responseContainer: {
    paddingLeft: 12,
  },
  responseText: {
    fontSize: 16,
    color: '#065F46',
    lineHeight: 24,
  },
  explanationText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    textAlign: 'justify',
  },
  tipBox: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    alignItems: 'center',
  },
  tipIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default DialogueScenarioDetailScreen;
