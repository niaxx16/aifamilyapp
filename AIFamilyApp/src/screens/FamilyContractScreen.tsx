import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { supabase } from '../services/supabase';
import { useChild } from '../context/ChildContext';
import { useAuth } from '../context/AuthContext';

interface ContractRule {
  id: string;
  emoji: string;
  text: string;
  selected: boolean;
  isCustom?: boolean;
}

interface ContractTemplate {
  id: string;
  name: string;
  emoji: string;
  description: string;
  rules: Omit<ContractRule, 'selected'>[];
}

const CONTRACT_TEMPLATES: ContractTemplate[] = [
  {
    id: 't1',
    name: 'Temel Kurallar',
    emoji: '📋',
    description: 'Tüm aileler için genel kurallar',
    rules: [
      { id: 'r1', emoji: '⏰', text: 'AI\'yi günde maksimum 30 dakika kullanırım' },
      { id: 'r2', emoji: '🔒', text: 'Kişisel bilgilerimi (adres, telefon, okul) AI\'ye vermem' },
      { id: 'r3', emoji: '👨‍👩‍👧', text: 'AI\'den öğrendiklerimi ailemle paylaşırım' },
      { id: 'r4', emoji: '❓', text: 'Anlamadığım bir şey olursa hemen anne/babama sorarım' },
      { id: 'r5', emoji: '🛑', text: 'AI benden rahatsız edici bir şey isterse hemen bildiririm' },
    ],
  },
  {
    id: 't2',
    name: 'Güvenlik Odaklı',
    emoji: '🔐',
    description: 'Güvenlik ve gizlilik öncelikli',
    rules: [
      { id: 'r6', emoji: '🔒', text: 'Adresimi, telefonumu ve tam ismimi AI\'ye söylemem' },
      { id: 'r7', emoji: '📸', text: 'Fotoğrafımı AI araçlarına yüklemeden önce izin alırım' },
      { id: 'r8', emoji: '🚫', text: 'Tanımadığım AI sitelerine girmem' },
      { id: 'r9', emoji: '👁️', text: 'AI ile konuşmalarımı ailemle gizlemem' },
      { id: 'r10', emoji: '⚠️', text: 'AI\'den gelen bilgileri başka kaynaklardan da kontrol ederim' },
    ],
  },
  {
    id: 't3',
    name: 'Ödev ve Öğrenme',
    emoji: '📚',
    description: 'Akademik dürüstlük kuralları',
    rules: [
      { id: 'r11', emoji: '✍️', text: 'Ödevlerimi önce kendim yaparım, sonra AI\'den kontrol isterim' },
      { id: 'r12', emoji: '🚫', text: 'AI\'ye ödevimi direkt yaptırmam, sadece yardım alırım' },
      { id: 'r13', emoji: '🧠', text: 'AI\'nin verdiği cevabı anlamadan kopyalamam' },
      { id: 'r14', emoji: '👨‍🏫', text: 'Öğretmenim sorduğunda AI kullandığımı söylerim' },
      { id: 'r15', emoji: '📖', text: 'AI ile öğrenirken notlarımı kendim alırım' },
    ],
  },
  {
    id: 't4',
    name: 'Ekran Süresi ve Denge',
    emoji: '⚖️',
    description: 'Sağlıklı dijital denge',
    rules: [
      { id: 'r16', emoji: '⏰', text: 'AI kullanımını belli saatlerde (örn: 17:00-18:00) yaparım' },
      { id: 'r17', emoji: '🎮', text: 'AI ile oynamadan önce gerçek arkadaşlarımla oynarım' },
      { id: 'r18', emoji: '🍽️', text: 'Yemek yerken ve aile zamanında AI kullanmam' },
      { id: 'r19', emoji: '😴', text: 'Yatmadan 1 saat önce AI kullanmayı bırakırım' },
      { id: 'r20', emoji: '🏃', text: 'Her gün en az 30 dakika dışarıda/spor yaparım' },
    ],
  },
];

const FamilyContractScreen: React.FC = () => {
  const navigation = useNavigation();
  const { activeChild } = useChild();
  const { user } = useAuth();

  const [hasContract, setHasContract] = useState(false);
  const [parentProfileId, setParentProfileId] = useState<string | null>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [selectedRules, setSelectedRules] = useState<ContractRule[]>([]);
  const [customRuleText, setCustomRuleText] = useState('');
  const [showCustomRuleInput, setShowCustomRuleInput] = useState(false);
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [contractDate, setContractDate] = useState(new Date().toLocaleDateString('tr-TR'));

  // Yeni state'ler
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contractId, setContractId] = useState<string | null>(null);

  // Mevcut sözleşmeyi yükle
  const loadContract = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Önce parent_profile_id'yi al
      const { data: parentProfile, error: parentError } = await supabase
        .from('parent_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (parentError) throw parentError;

      if (!parentProfile) {
        setLoading(false);
        return;
      }

      setParentProfileId(parentProfile.id);

      // Sonra sözleşmeyi yükle
      const { data, error } = await supabase
        .from('family_contracts')
        .select('*')
        .eq('parent_profile_id', parentProfile.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setContractId(data.id);
        setParentName(data.parent_name);
        setChildName(data.child_name);
        setContractDate(data.contract_date);
        setSelectedRules(data.rules as ContractRule[]);
        setHasContract(true);
      }
    } catch (error) {
      console.error('Sözleşme yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadContract();
    }, [loadContract])
  );

  const startFromTemplate = (template: ContractTemplate) => {
    const rules: ContractRule[] = template.rules.map(rule => ({
      ...rule,
      selected: true,
    }));
    setSelectedRules(rules);
    setShowTemplateSelector(false);
    setHasContract(true);
  };

  const startFromScratch = () => {
    setSelectedRules([]);
    setShowTemplateSelector(false);
    setHasContract(true);
  };

  const toggleRule = (ruleId: string) => {
    setSelectedRules(
      selectedRules.map(rule =>
        rule.id === ruleId ? { ...rule, selected: !rule.selected } : rule
      )
    );
  };

  const addCustomRule = () => {
    if (!customRuleText.trim()) return;

    const newRule: ContractRule = {
      id: `custom_${Date.now()}`,
      emoji: '✨',
      text: customRuleText.trim(),
      selected: true,
      isCustom: true,
    };

    setSelectedRules([...selectedRules, newRule]);
    setCustomRuleText('');
    setShowCustomRuleInput(false);
  };

  const removeCustomRule = (ruleId: string) => {
    setSelectedRules(selectedRules.filter(rule => rule.id !== ruleId));
  };

  const addMoreRules = () => {
    // Show all available rules from templates
    const allRules: ContractRule[] = [];
    CONTRACT_TEMPLATES.forEach(template => {
      template.rules.forEach(rule => {
        const exists = selectedRules.find(r => r.id === rule.id);
        if (!exists) {
          allRules.push({ ...rule, selected: false });
        }
      });
    });

    setSelectedRules([...selectedRules, ...allRules]);
  };

  const saveContract = async () => {
    const activeRules = selectedRules.filter(r => r.selected);

    if (activeRules.length === 0) {
      Alert.alert('Uyarı', 'Lütfen en az bir kural seçin.');
      return;
    }

    if (!parentName.trim() || !childName.trim()) {
      Alert.alert('Uyarı', 'Lütfen ebeveyn ve çocuk isimlerini girin.');
      return;
    }

    if (!parentProfileId) {
      Alert.alert('Hata', 'Ebeveyn profili bulunamadı.');
      return;
    }

    setSaving(true);

    try {
      const contractData = {
        parent_profile_id: parentProfileId,
        parent_name: parentName.trim(),
        child_name: childName.trim(),
        contract_date: contractDate,
        rules: selectedRules,
      };

      let result;

      if (contractId) {
        // Güncelle
        result = await supabase
          .from('family_contracts')
          .update(contractData)
          .eq('id', contractId)
          .select()
          .single();
      } else {
        // Yeni ekle
        result = await supabase
          .from('family_contracts')
          .insert(contractData)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      if (result.data) {
        setContractId(result.data.id);
      }

      Alert.alert(
        'Sözleşme Kaydedildi! 🎉',
        `${activeRules.length} kurallı AI Kullanım Sözleşmeniz kaydedildi!\n\nİmzalayanlar:\n👨‍👩‍👧 ${parentName}\n👦 ${childName}\n\n📅 Tarih: ${contractDate}`,
        [
          {
            text: 'PDF Oluştur ve Paylaş',
            onPress: generateAndSharePDF,
          },
          { text: 'Tamam' },
        ]
      );
    } catch (error: any) {
      console.error('Sözleşme kaydedilirken hata:', error);
      Alert.alert('Hata', error.message || 'Sözleşme kaydedilirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const generateAndSharePDF = async () => {
    const activeRules = selectedRules.filter(r => r.selected);

    const rulesHTML = activeRules.map((rule, index) => `
      <div style="margin-bottom: 12px; padding: 10px; background-color: #f5f5f5; border-radius: 8px;">
        <span style="font-size: 18px; margin-right: 8px;">${rule.emoji}</span>
        <span style="font-size: 14px;">${index + 1}. ${rule.text}</span>
      </div>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>AI Kullanım Sözleşmesi</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 3px solid #1E3A8A;
            }
            .title {
              font-size: 28px;
              color: #1E3A8A;
              margin-bottom: 10px;
            }
            .subtitle {
              font-size: 16px;
              color: #666;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #333;
              margin-bottom: 15px;
              padding-bottom: 5px;
              border-bottom: 1px solid #ddd;
            }
            .signatures {
              display: flex;
              justify-content: space-around;
              margin-top: 50px;
              padding-top: 30px;
              border-top: 2px solid #1E3A8A;
            }
            .signature-box {
              text-align: center;
              width: 200px;
            }
            .signature-line {
              border-bottom: 2px solid #333;
              height: 60px;
              margin-bottom: 10px;
            }
            .signature-name {
              font-size: 16px;
              font-weight: bold;
            }
            .signature-role {
              font-size: 12px;
              color: #666;
            }
            .date {
              text-align: center;
              margin-top: 30px;
              font-size: 14px;
              color: #666;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">📜 AI Kullanım Sözleşmesi</div>
            <div class="subtitle">Aile İçi Yapay Zeka Kullanım Kuralları</div>
          </div>

          <div class="section">
            <div class="section-title">📋 Kurallarımız (${activeRules.length} madde)</div>
            ${rulesHTML}
          </div>

          <div class="section">
            <div class="section-title">✍️ Taahhütler</div>
            <p>Biz aşağıda imzası bulunan taraflar, yukarıdaki kuralları okuduğumuzu, anladığımızı ve bunlara uymayı kabul ettiğimizi beyan ederiz.</p>
          </div>

          <div class="signatures">
            <div class="signature-box">
              <div class="signature-line"></div>
              <div class="signature-name">${parentName}</div>
              <div class="signature-role">Ebeveyn</div>
            </div>
            <div class="signature-box">
              <div class="signature-line"></div>
              <div class="signature-name">${childName}</div>
              <div class="signature-role">Çocuk</div>
            </div>
          </div>

          <div class="date">
            📅 Tarih: ${contractDate}
          </div>

          <div class="footer">
            Bu sözleşme AI Aile Rehberi uygulaması ile oluşturulmuştur.
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'AI Kullanım Sözleşmesi',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('Başarılı', `PDF oluşturuldu: ${uri}`);
      }
    } catch (error) {
      console.error('PDF oluşturulurken hata:', error);
      Alert.alert('Hata', 'PDF oluşturulurken bir hata oluştu.');
    }
  };

  const resetContract = () => {
    Alert.alert(
      'Sözleşmeyi Sıfırla',
      'Tüm kurallar ve imzalar silinecek. Emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: async () => {
            // Veritabanından sil
            if (contractId) {
              try {
                await supabase
                  .from('family_contracts')
                  .delete()
                  .eq('id', contractId);
              } catch (error) {
                console.error('Sözleşme silinirken hata:', error);
              }
            }

            setContractId(null);
            setHasContract(false);
            setSelectedRules([]);
            setParentName('');
            setChildName('');
            setContractDate(new Date().toLocaleDateString('tr-TR'));
          },
        },
      ]
    );
  };

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={{ marginTop: 16, color: '#666' }}>Yükleniyor...</Text>
      </View>
    );
  }

  // No Contract State
  if (!hasContract) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🏠 Aile Sözleşmesi</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Intro */}
          <View style={styles.introCard}>
            <Text style={styles.introEmoji}>📜</Text>
            <Text style={styles.introTitle}>AI Kullanım Sözleşmesi Oluşturun</Text>
            <Text style={styles.introText}>
              Çocuğunuzla birlikte AI kullanımı için sınırlar ve kurallar belirleyin.
              Hem ebeveyn hem çocuk imzalayacağı için katılım duygusu güçlenir.
            </Text>
          </View>

          {/* Start Options */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setShowTemplateSelector(true)}
            >
              <Text style={styles.startButtonEmoji}>📋</Text>
              <View style={styles.startButtonInfo}>
                <Text style={styles.startButtonTitle}>Hazır Şablondan Başla</Text>
                <Text style={styles.startButtonDescription}>
                  4 farklı şablon ile hızlıca başlayın
                </Text>
              </View>
              <Text style={styles.startButtonArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.startButton}
              onPress={startFromScratch}
            >
              <Text style={styles.startButtonEmoji}>✨</Text>
              <View style={styles.startButtonInfo}>
                <Text style={styles.startButtonTitle}>Sıfırdan Oluştur</Text>
                <Text style={styles.startButtonDescription}>
                  Kendi kurallarınızı ekleyin
                </Text>
              </View>
              <Text style={styles.startButtonArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Benefits */}
          <View style={styles.benefitsCard}>
            <Text style={styles.benefitsTitle}>📌 Neden Aile Sözleşmesi?</Text>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>✓</Text>
              <Text style={styles.benefitText}>Net sınırlar ve beklentiler oluşturur</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>✓</Text>
              <Text style={styles.benefitText}>Çocuk karar sürecine dahil olur</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>✓</Text>
              <Text style={styles.benefitText}>Sorumluluk bilinci gelişir</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>✓</Text>
              <Text style={styles.benefitText}>Anlaşmazlıklarda referans noktası olur</Text>
            </View>
          </View>
        </ScrollView>

        {/* Template Selector Modal */}
        <Modal
          visible={showTemplateSelector}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowTemplateSelector(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.templateModalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Şablon Seçin</Text>
                <TouchableOpacity
                  onPress={() => setShowTemplateSelector(false)}
                  style={styles.modalCloseButton}
                >
                  <Text style={styles.modalCloseButtonText}>×</Text>
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                {CONTRACT_TEMPLATES.map((template) => (
                  <TouchableOpacity
                    key={template.id}
                    style={styles.templateCard}
                    onPress={() => startFromTemplate(template)}
                  >
                    <Text style={styles.templateEmoji}>{template.emoji}</Text>
                    <View style={styles.templateInfo}>
                      <Text style={styles.templateName}>{template.name}</Text>
                      <Text style={styles.templateDescription}>{template.description}</Text>
                      <Text style={styles.templateRuleCount}>
                        {template.rules.length} kural içerir
                      </Text>
                    </View>
                    <Text style={styles.templateArrow}>→</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Contract Builder State
  const activeRules = selectedRules.filter(r => r.selected);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={resetContract} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📜 Sözleşme Oluştur</Text>
        <TouchableOpacity onPress={saveContract} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>💾</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Contract Preview */}
        <View style={styles.contractPreview}>
          <Text style={styles.contractTitle}>📜 AI Kullanım Sözleşmemiz</Text>
          <Text style={styles.contractSubtitle}>
            {activeRules.length} kural seçildi
          </Text>
        </View>

        {/* Rules Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kurallar</Text>
          <Text style={styles.sectionDescription}>
            Eklemek veya çıkarmak için kurallara tıklayın
          </Text>

          {selectedRules.map((rule, index) => (
            <View key={rule.id}>
              <TouchableOpacity
                style={[
                  styles.ruleCard,
                  rule.selected && styles.ruleCardSelected,
                ]}
                onPress={() => toggleRule(rule.id)}
              >
                <View style={styles.ruleCheckbox}>
                  {rule.selected ? (
                    <Text style={styles.ruleCheckboxChecked}>✓</Text>
                  ) : (
                    <View style={styles.ruleCheckboxEmpty} />
                  )}
                </View>

                <Text style={styles.ruleEmoji}>{rule.emoji}</Text>

                <Text
                  style={[
                    styles.ruleText,
                    rule.selected && styles.ruleTextSelected,
                  ]}
                >
                  {rule.text}
                </Text>

                {rule.isCustom && (
                  <TouchableOpacity
                    onPress={() => removeCustomRule(rule.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>🗑️</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Add Rule Buttons */}
        <View style={styles.addRuleSection}>
          <TouchableOpacity
            style={styles.addRuleButton}
            onPress={() => setShowCustomRuleInput(true)}
          >
            <Text style={styles.addRuleButtonText}>+ Özel Kural Ekle</Text>
          </TouchableOpacity>

          {selectedRules.length < 20 && (
            <TouchableOpacity
              style={styles.addMoreButton}
              onPress={addMoreRules}
            >
              <Text style={styles.addMoreButtonText}>📋 Daha Fazla Kural Göster</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Signatures Section */}
        <View style={styles.signaturesSection}>
          <Text style={styles.sectionTitle}>İmzalar</Text>

          <View style={styles.signatureCard}>
            <Text style={styles.signatureEmoji}>👨‍👩‍👧</Text>
            <TextInput
              style={styles.signatureInput}
              placeholder="Ebeveyn Adı"
              value={parentName}
              onChangeText={setParentName}
            />
          </View>

          <View style={styles.signatureCard}>
            <Text style={styles.signatureEmoji}>👦</Text>
            <TextInput
              style={styles.signatureInput}
              placeholder="Çocuk Adı"
              value={childName}
              onChangeText={setChildName}
            />
          </View>

          <View style={styles.dateCard}>
            <Text style={styles.dateLabel}>📅 Tarih:</Text>
            <Text style={styles.dateText}>{contractDate}</Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.finalSaveButton, saving && { opacity: 0.7 }]}
          onPress={saveContract}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.finalSaveButtonText}>Sözleşmeyi Kaydet ve İmzala</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Rule Input Modal */}
      <Modal
        visible={showCustomRuleInput}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCustomRuleInput(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.customRuleModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Özel Kural Ekle</Text>
              <TouchableOpacity
                onPress={() => setShowCustomRuleInput(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.customRuleInput}
              placeholder="Kural yazın... (örn: AI ile hafta sonları max 1 saat oynarım)"
              value={customRuleText}
              onChangeText={setCustomRuleText}
              multiline
              maxLength={200}
              autoFocus
            />

            <Text style={styles.customRuleHint}>
              💡 İpucu: Kuralı çocuğunuzun anlayabileceği basit bir dille yazın
            </Text>

            <TouchableOpacity
              style={styles.addCustomRuleButton}
              onPress={addCustomRule}
            >
              <Text style={styles.addCustomRuleButtonText}>Ekle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#1E3A8A',
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
  saveButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  // No Contract State
  introCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E3A8A',
    borderStyle: 'dashed',
  },
  introEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  introText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
  startButtonEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  startButtonInfo: {
    flex: 1,
  },
  startButtonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  startButtonDescription: {
    fontSize: 13,
    color: '#666666',
  },
  startButtonArrow: {
    fontSize: 24,
    color: '#CCCCCC',
  },
  benefitsCard: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitEmoji: {
    fontSize: 16,
    color: '#2ECC71',
    marginRight: 8,
    fontWeight: 'bold',
  },
  benefitText: {
    fontSize: 14,
    color: '#424242',
    flex: 1,
  },
  // Contract Builder State
  contractPreview: {
    backgroundColor: '#F8F9FA',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E3A8A',
    alignItems: 'center',
  },
  contractTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  contractSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 16,
  },
  ruleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  ruleCardSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2ECC71',
  },
  ruleCheckbox: {
    width: 24,
    height: 24,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleCheckboxEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  ruleCheckboxChecked: {
    fontSize: 20,
    color: '#2ECC71',
  },
  ruleEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  ruleTextSelected: {
    color: '#333333',
    fontWeight: '500',
  },
  removeButton: {
    padding: 4,
  },
  removeButtonText: {
    fontSize: 20,
  },
  addRuleSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  addRuleButton: {
    backgroundColor: '#1E3A8A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  addRuleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addMoreButton: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addMoreButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  signaturesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  signatureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  signatureEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  signatureInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    borderBottomWidth: 2,
    borderBottomColor: '#1E3A8A',
    paddingBottom: 8,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  finalSaveButton: {
    backgroundColor: '#2ECC71',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  finalSaveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  templateModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 36,
    color: '#999999',
    lineHeight: 36,
  },
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  templateEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  templateRuleCount: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  templateArrow: {
    fontSize: 24,
    color: '#CCCCCC',
  },
  customRuleModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '60%',
  },
  customRuleInput: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    fontSize: 15,
    color: '#333333',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#1E3A8A',
  },
  customRuleHint: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  addCustomRuleButton: {
    backgroundColor: '#1E3A8A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addCustomRuleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default FamilyContractScreen;
