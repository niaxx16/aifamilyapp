import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

interface DialogueExchange {
  speaker: 'parent' | 'child';
  text: string;
  variation?: string;
}

interface Scenario {
  id: string;
  title: string;
  emoji: string;
  ageRange: string;
  category: 'güvenlik' | 'etik' | 'bağımlılık' | 'öğrenme' | 'duygusal';
  difficulty: 'kolay' | 'orta' | 'zor';
  situation: string;
  characters: string[];
  goodApproach: string[];
  avoidActions: string[];
  dialogue: DialogueExchange[];
  alternativeEnding?: DialogueExchange[];
  parentReview: {
    rating: number;
    comment: string;
    name: string;
  };
  expertNote: string;
  readingTime: number;
}

type ScenarioDetailRouteProp = RouteProp<
  { ScenarioDetail: { scenario: Scenario } },
  'ScenarioDetail'
>;

const ScenarioDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ScenarioDetailRouteProp>();
  const { scenario } = route.params;

  const [showGoodDialogue, setShowGoodDialogue] = useState(true);

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

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
        <Text style={styles.headerTitle}>Senaryo Detayı</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Scenario Title */}
        <View style={styles.titleSection}>
          <Text style={styles.emoji}>{scenario.emoji}</Text>
          <Text style={styles.title}>{scenario.title}</Text>
          <Text style={styles.situation}>{scenario.situation}</Text>
        </View>

        {/* Characters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Karakterler</Text>
          <Text style={styles.sectionText}>
            {scenario.characters.join(', ')}
          </Text>
        </View>

        {/* Good Approach */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Doğru Yaklaşım</Text>
          {scenario.goodApproach.map((step, index) => (
            <Text key={index} style={styles.listItem}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

        {/* Avoid Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>❌ Bunlardan Kaçının</Text>
          {scenario.avoidActions.map((action, index) => (
            <Text key={index} style={styles.listItem}>
              • {action}
            </Text>
          ))}
        </View>

        {/* Dialogue Tabs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Örnek Diyalog</Text>

          <View style={styles.dialogueTabs}>
            <TouchableOpacity
              style={[
                styles.dialogueTab,
                showGoodDialogue && styles.dialogueTabActive,
              ]}
              onPress={() => setShowGoodDialogue(true)}
            >
              <Text
                style={[
                  styles.dialogueTabText,
                  showGoodDialogue && styles.dialogueTabTextActive,
                ]}
              >
                ✅ İyi Yaklaşım
              </Text>
            </TouchableOpacity>

            {scenario.alternativeEnding && (
              <TouchableOpacity
                style={[
                  styles.dialogueTab,
                  !showGoodDialogue && styles.dialogueTabActive,
                ]}
                onPress={() => setShowGoodDialogue(false)}
              >
                <Text
                  style={[
                    styles.dialogueTabText,
                    !showGoodDialogue && styles.dialogueTabTextActive,
                  ]}
                >
                  ❌ Kötü Yaklaşım
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Dialogue Bubbles */}
          <View style={styles.dialogueContainer}>
            {(showGoodDialogue
              ? scenario.dialogue
              : scenario.alternativeEnding || []
            ).map((exchange, index) => (
              <View key={index}>
                <View
                  style={[
                    styles.dialogueBubble,
                    exchange.speaker === 'parent'
                      ? styles.dialogueBubbleParent
                      : styles.dialogueBubbleChild,
                  ]}
                >
                  <Text style={styles.dialogueSpeaker}>
                    {exchange.speaker === 'parent' ? '👨‍👩‍👧 Ebeveyn' : '👦 Çocuk'}
                  </Text>
                  <Text style={styles.dialogueText}>{exchange.text}</Text>

                  {exchange.variation && (
                    <View style={styles.variationBox}>
                      <Text style={styles.variationLabel}>🔄 Alternatif Tepki:</Text>
                      <Text style={styles.variationText}>{exchange.variation}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Parent Review */}
        <View style={[styles.section, styles.reviewSection]}>
          <Text style={styles.sectionTitle}>⭐ Ebeveyn Yorumu</Text>
          <Text style={styles.reviewStars}>
            {renderStars(scenario.parentReview.rating)}
          </Text>
          <Text style={styles.reviewComment}>"{scenario.parentReview.comment}"</Text>
          <Text style={styles.reviewName}>- {scenario.parentReview.name}</Text>
        </View>

        {/* Expert Note */}
        <View style={[styles.section, styles.expertSection]}>
          <Text style={styles.sectionTitle}>👩‍🏫 Uzman Notu</Text>
          <Text style={styles.expertText}>{scenario.expertNote}</Text>
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
    backgroundColor: '#9B59B6',
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
    backgroundColor: '#F3E5F5',
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
    marginBottom: 12,
  },
  situation: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 6,
  },
  dialogueTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  dialogueTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  dialogueTabActive: {
    backgroundColor: '#9B59B6',
  },
  dialogueTabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  dialogueTabTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dialogueContainer: {
    gap: 12,
  },
  dialogueBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  dialogueBubbleParent: {
    backgroundColor: '#E3F2FD',
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  dialogueBubbleChild: {
    backgroundColor: '#FFF9C4',
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  dialogueSpeaker: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555555',
    marginBottom: 6,
  },
  dialogueText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  variationBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  variationLabel: {
    fontSize: 11,
    color: '#9B59B6',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  variationText: {
    fontSize: 13,
    color: '#555555',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  reviewSection: {
    backgroundColor: '#FFF9E5',
  },
  reviewStars: {
    fontSize: 18,
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333333',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 13,
    color: '#666666',
    fontWeight: 'bold',
  },
  expertSection: {
    backgroundColor: '#E8F5E9',
  },
  expertText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 22,
  },
});

export default ScenarioDetailScreen;
