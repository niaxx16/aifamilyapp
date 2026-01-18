import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ActionStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface WeeklyPlan {
  id: string;
  weekTitle: string;
  category: string;
  categoryEmoji: string;
  startDate: Date;
  steps: ActionStep[];
  completedCount: number;
}

interface PlanTemplate {
  id: string;
  title: string;
  category: string;
  emoji: string;
  description: string;
  steps: Omit<ActionStep, 'completed'>[];
}

const PLAN_TEMPLATES: PlanTemplate[] = [
  {
    id: '1',
    title: 'AI Güvenlik Temelleri',
    category: 'Güvenlik',
    emoji: '🔒',
    description: 'Çocuğunuza AI kullanırken güvenlik temellerini öğretin.',
    steps: [
      {
        id: 's1',
        title: 'Gizli Bilgi Sohbeti',
        description: 'Çocuğunuzla hangi bilgilerin AI\'ye söylenmemesi gerektiği hakkında 10 dakika konuşun.',
      },
      {
        id: 's2',
        title: 'Birlikte Güvenlik Kuralları',
        description: '3-5 maddelik "AI Güvenlik Kuralları" listesi oluşturun ve odaya asın.',
      },
      {
        id: 's3',
        title: 'Senaryo Pratiği',
        description: 'Senaryo kütüphanesinden "Gizli Bilgiler" senaryosunu birlikte okuyun.',
      },
    ],
  },
  {
    id: '2',
    title: 'Sağlıklı AI İletişimi',
    category: 'İletişim',
    emoji: '💬',
    description: 'Çocuğunuzla AI hakkında açık iletişim kurun.',
    steps: [
      {
        id: 's1',
        title: 'AI Kullanım Keşfi',
        description: 'Çocuğunuzun hangi AI araçlarını kullandığını sorun ve birlikte inceleyin.',
      },
      {
        id: 's2',
        title: 'Duygu Paylaşımı',
        description: 'AI kullanımı hakkında neler hissettiğinizi karşılıklı paylaşın.',
      },
      {
        id: 's3',
        title: 'AI Mentor Pratiği',
        description: 'AI Mentor\'da "Hızlı Tavsiye" modu ile bir senaryo deneyin.',
      },
    ],
  },
  {
    id: '3',
    title: 'Ödev ve AI Dengesi',
    category: 'Öğrenme',
    emoji: '📝',
    description: 'AI\'yi öğrenme aracı olarak doğru kullanmayı öğretin.',
    steps: [
      {
        id: 's1',
        title: 'AI Ödev Kuralları',
        description: 'Ne zaman AI kullanılabilir, ne zaman kullanılamaz kuralları belirleyin.',
      },
      {
        id: 's2',
        title: 'Örnek Ödev Takibi',
        description: 'Bir ödevde AI\'yi nasıl kullandığını gözlemleyin ve geri bildirim verin.',
      },
      {
        id: 's3',
        title: 'Öğrenme Değerlendirmesi',
        description: 'AI olmadan aynı konuyu açıklayıp açıklayamadığını kontrol edin.',
      },
    ],
  },
  {
    id: '4',
    title: 'Eleştirel Düşünme',
    category: 'Düşünme',
    emoji: '🧠',
    description: 'Çocuğunuza AI\'nin söylediklerini sorgulamayı öğretin.',
    steps: [
      {
        id: 's1',
        title: 'Doğruluk Testi',
        description: 'AI\'nin verdiği bir cevabı birlikte başka kaynaklardan kontrol edin.',
      },
      {
        id: 's2',
        title: 'Sorgulama Soruları',
        description: '"Bu doğru mu?", "Nereden biliyor?" gibi sorular sormayı alışkanlık haline getirin.',
      },
      {
        id: 's3',
        title: 'Deepfake Tespiti',
        description: 'Senaryo kütüphanesinden "Deepfake" senaryosunu okuyun.',
      },
    ],
  },
  {
    id: '5',
    title: 'Duygusal Bağlılık Dengesi',
    category: 'Duygusal',
    emoji: '💭',
    description: 'AI ile sağlıklı duygusal sınırlar oluşturun.',
    steps: [
      {
        id: 's1',
        title: 'Gerçek Arkadaşlık Sohbeti',
        description: 'AI ile gerçek arkadaşlar arasındaki farkı konuşun.',
      },
      {
        id: 's2',
        title: 'Ekran Dışı Aktivite',
        description: 'Hafta içi bir gün çocuğunuzla ekran dışı kaliteli vakit geçirin.',
      },
      {
        id: 's3',
        title: 'Duygu Tanıma',
        description: 'AI\'nin duygular hissedemediğini somut örneklerle gösterin.',
      },
    ],
  },
  {
    id: '6',
    title: 'AI Araçlarını Tanıyalım',
    category: 'Keşif',
    emoji: '🔍',
    description: 'Çocuğunuzla birlikte AI araçlarını güvenli şekilde keşfedin.',
    steps: [
      {
        id: 's1',
        title: 'Yeni Araç Keşfi',
        description: 'Çocuğunuzun ilgilendiği bir AI aracını birlikte inceleyin.',
      },
      {
        id: 's2',
        title: 'Güvenlik Kontrolü',
        description: 'O aracın güvenlik ayarlarını birlikte kontrol edin.',
      },
      {
        id: 's3',
        title: 'Kullanım Sınırları',
        description: 'Bu aracı ne için, ne kadar süre kullanılabileceğini kararlaştırın.',
      },
    ],
  },
];

const ActionPlanScreen: React.FC = () => {
  const navigation = useNavigation();

  const [currentPlan, setCurrentPlan] = useState<WeeklyPlan | null>(null);
  const [showPlanSelector, setShowPlanSelector] = useState(false);
  const [completedPlans, setCompletedPlans] = useState<WeeklyPlan[]>([]);

  const createPlanFromTemplate = (template: PlanTemplate) => {
    const newPlan: WeeklyPlan = {
      id: Date.now().toString(),
      weekTitle: `${template.title}`,
      category: template.category,
      categoryEmoji: template.emoji,
      startDate: new Date(),
      steps: template.steps.map(step => ({ ...step, completed: false })),
      completedCount: 0,
    };
    setCurrentPlan(newPlan);
    setShowPlanSelector(false);
  };

  const toggleStepCompletion = (stepId: string) => {
    if (!currentPlan) return;

    const updatedSteps = currentPlan.steps.map(step =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );

    const completedCount = updatedSteps.filter(s => s.completed).length;

    setCurrentPlan({
      ...currentPlan,
      steps: updatedSteps,
      completedCount,
    });
  };

  const completePlan = () => {
    if (!currentPlan) return;

    // Tamamlanan planları kaydet
    setCompletedPlans([...completedPlans, currentPlan]);
    setCurrentPlan(null);
  };

  const getWeekDateRange = (startDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const formatDate = (date: Date) => {
      return `${date.getDate()} ${date.toLocaleDateString('tr-TR', { month: 'short' })}`;
    };

    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  // No Plan State
  if (!currentPlan) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🎯 Kişisel Eylem Planı</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Intro */}
          <View style={styles.noPlanCard}>
            <Text style={styles.noPlanEmoji}>📋</Text>
            <Text style={styles.noPlanTitle}>Haftalık Eylem Planı Oluşturun</Text>
            <Text style={styles.noPlanText}>
              Her hafta 3 basit adımla çocuğunuzla AI konusunda sağlıklı alışkanlıklar geliştirin.
              Aşağıdan bir plan seçin veya AI'den öneri alın.
            </Text>
          </View>

          {/* Previous Plans */}
          {completedPlans.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>✅ Tamamlanan Planlar ({completedPlans.length})</Text>
              {completedPlans.slice(-3).reverse().map((plan) => (
                <View key={plan.id} style={styles.completedPlanCard}>
                  <View style={styles.completedPlanHeader}>
                    <Text style={styles.completedPlanEmoji}>{plan.categoryEmoji}</Text>
                    <View style={styles.completedPlanInfo}>
                      <Text style={styles.completedPlanTitle}>{plan.weekTitle}</Text>
                      <Text style={styles.completedPlanDate}>{getWeekDateRange(plan.startDate)}</Text>
                    </View>
                    <Text style={styles.completedBadge}>
                      {plan.completedCount}/{plan.steps.length}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Plan Templates */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📚 Hazır Planlar</Text>
            <Text style={styles.sectionDescription}>
              Her plan 3 basit adımdan oluşur ve 1 hafta içinde tamamlanabilir.
            </Text>

            {PLAN_TEMPLATES.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={styles.templateCard}
                onPress={() => createPlanFromTemplate(template)}
                activeOpacity={0.7}
              >
                <View style={styles.templateHeader}>
                  <Text style={styles.templateEmoji}>{template.emoji}</Text>
                  <View style={styles.templateInfo}>
                    <Text style={styles.templateTitle}>{template.title}</Text>
                    <Text style={styles.templateCategory}>{template.category}</Text>
                  </View>
                  <Text style={styles.templateArrow}>→</Text>
                </View>
                <Text style={styles.templateDescription}>{template.description}</Text>
                <View style={styles.templateFooter}>
                  <Text style={styles.templateStepCount}>📋 {template.steps.length} Adım</Text>
                  <Text style={styles.templateDuration}>⏱️ 1 Hafta</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* AI Suggestion Button */}
          <TouchableOpacity
            style={styles.aiSuggestButton}
            onPress={() => {
              // TODO: AI öneri sistemi
              alert('AI Öneri Sistemi: Çocuğunuzun yaşı ve ihtiyaçlarına göre kişiselleştirilmiş plan önerisi yakında eklenecek!');
            }}
          >
            <Text style={styles.aiSuggestEmoji}>🤖</Text>
            <Text style={styles.aiSuggestText}>AI Bana Özel Plan Öner</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Active Plan State
  const progressPercentage = (currentPlan.completedCount / currentPlan.steps.length) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🎯 Bu Haftanın Planı</Text>
        <TouchableOpacity onPress={completePlan} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>✓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Plan Header */}
        <View style={styles.activePlanHeader}>
          <Text style={styles.activePlanEmoji}>{currentPlan.categoryEmoji}</Text>
          <Text style={styles.activePlanTitle}>{currentPlan.weekTitle}</Text>
          <Text style={styles.activePlanDate}>{getWeekDateRange(currentPlan.startDate)}</Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {currentPlan.completedCount} / {currentPlan.steps.length} tamamlandı
            </Text>
          </View>
        </View>

        {/* Steps */}
        <View style={styles.stepsSection}>
          <Text style={styles.stepsSectionTitle}>Bu Haftanın Adımları</Text>

          {currentPlan.steps.map((step, index) => (
            <TouchableOpacity
              key={step.id}
              style={[
                styles.stepCard,
                step.completed && styles.stepCardCompleted,
              ]}
              onPress={() => toggleStepCompletion(step.id)}
              activeOpacity={0.7}
            >
              <View style={styles.stepHeader}>
                <View style={styles.stepCheckbox}>
                  {step.completed ? (
                    <Text style={styles.stepCheckboxChecked}>✓</Text>
                  ) : (
                    <Text style={styles.stepCheckboxNumber}>{index + 1}</Text>
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitle,
                      step.completed && styles.stepTitleCompleted,
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={[
                      styles.stepDescription,
                      step.completed && styles.stepDescriptionCompleted,
                    ]}
                  >
                    {step.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Motivation Card */}
        {currentPlan.completedCount === currentPlan.steps.length && (
          <View style={styles.motivationCard}>
            <Text style={styles.motivationEmoji}>🎉</Text>
            <Text style={styles.motivationTitle}>Harika İş Çıkardınız!</Text>
            <Text style={styles.motivationText}>
              Bu haftanın tüm adımlarını tamamladınız. Yeni bir plan başlatmak için sağ üstteki
              ✓ butonuna basın.
            </Text>
          </View>
        )}

        {/* Tips Card */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 İpucu</Text>
          <Text style={styles.tipsText}>
            • Adımları hafta boyunca yayarak yapmak daha etkilidir{'\n'}
            • Her adımı tamamladıktan sonra kutlayın{'\n'}
            • Çocuğunuzla birlikte keyif alın, zorlama yapmayın
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#2ECC71',
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
  resetButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  // No Plan State
  noPlanCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2ECC71',
    borderStyle: 'dashed',
  },
  noPlanEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  noPlanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  noPlanText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  completedPlanCard: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  completedPlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedPlanEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  completedPlanInfo: {
    flex: 1,
  },
  completedPlanTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  completedPlanDate: {
    fontSize: 12,
    color: '#999999',
  },
  completedBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2ECC71',
  },
  templateCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  templateEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  templateInfo: {
    flex: 1,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  templateCategory: {
    fontSize: 12,
    color: '#2ECC71',
    fontWeight: '600',
  },
  templateArrow: {
    fontSize: 24,
    color: '#CCCCCC',
  },
  templateDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  templateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  templateStepCount: {
    fontSize: 13,
    color: '#999999',
  },
  templateDuration: {
    fontSize: 13,
    color: '#999999',
  },
  aiSuggestButton: {
    backgroundColor: '#4A90E2',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  aiSuggestEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  aiSuggestText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Active Plan State
  activePlanHeader: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2ECC71',
  },
  activePlanEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  activePlanTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  activePlanDate: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 20,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ECC71',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#2ECC71',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stepsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  stepsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  stepCardCompleted: {
    borderColor: '#2ECC71',
    backgroundColor: '#F0FFF4',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepCheckbox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepCheckboxNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999999',
  },
  stepCheckboxChecked: {
    fontSize: 24,
    color: '#2ECC71',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  stepTitleCompleted: {
    color: '#2ECC71',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  stepDescriptionCompleted: {
    color: '#27AE60',
  },
  motivationCard: {
    backgroundColor: '#FFF9E5',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  motivationEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  tipsCard: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 13,
    color: '#424242',
    lineHeight: 20,
  },
});

export default ActionPlanScreen;
