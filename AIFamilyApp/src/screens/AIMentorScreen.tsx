import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

type ConversationMode = 'quick' | 'roleplay' | null;

const DAILY_MESSAGE_LIMIT = 5; // Günlük maksimum mesaj sayısı
const USAGE_KEY = '@ai_mentor_usage';
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

const AIMentorScreen: React.FC = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState<ConversationMode>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState<number>(DAILY_MESSAGE_LIMIT);

  useEffect(() => {
    // Load daily usage on mount
    checkDailyUsage();
  }, []);

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const checkDailyUsage = async () => {
    try {
      const today = new Date().toDateString();
      const stored = await AsyncStorage.getItem(USAGE_KEY);

      if (stored) {
        const usage = JSON.parse(stored);
        if (usage.date === today) {
          setRemainingMessages(Math.max(0, DAILY_MESSAGE_LIMIT - usage.count));
        } else {
          // Yeni gün, reset yap
          await AsyncStorage.setItem(USAGE_KEY, JSON.stringify({ date: today, count: 0 }));
          setRemainingMessages(DAILY_MESSAGE_LIMIT);
        }
      } else {
        await AsyncStorage.setItem(USAGE_KEY, JSON.stringify({ date: today, count: 0 }));
        setRemainingMessages(DAILY_MESSAGE_LIMIT);
      }
    } catch (error) {
      console.error('Usage check error:', error);
    }
  };

  const incrementUsage = async () => {
    try {
      const today = new Date().toDateString();
      const stored = await AsyncStorage.getItem(USAGE_KEY);

      if (stored) {
        const usage = JSON.parse(stored);
        const newCount = usage.date === today ? usage.count + 1 : 1;
        await AsyncStorage.setItem(USAGE_KEY, JSON.stringify({ date: today, count: newCount }));
        setRemainingMessages(Math.max(0, DAILY_MESSAGE_LIMIT - newCount));
      }
    } catch (error) {
      console.error('Usage increment error:', error);
    }
  };

  const selectMode = (selectedMode: ConversationMode) => {
    setMode(selectedMode);

    // Set initial system message based on mode
    const systemMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: selectedMode === 'quick'
        ? 'Merhaba! Çocuğunuzla AI konusunda yaşadığınız durumu kısaca anlatın, size hızlı ve pratik öneriler sunayım. 🎯'
        : 'Merhaba! Rol yapma pratiği için hazırım. Lütfen çocuğunuzun yaşını ve hangi konuda konuşma pratiği yapmak istediğinizi söyleyin. Ben çocuğunuz rolüne gireceğim ve gerçekçi tepkiler vereceğim. 🎭',
      timestamp: new Date()
    };

    setMessages([systemMessage]);
  };

  const resetConversation = () => {
    setMode(null);
    setMessages([]);
    setInputText('');
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    // Günlük limit kontrolü
    if (remainingMessages <= 0) {
      Alert.alert(
        'Günlük Limit Doldu',
        'Bugün için mesaj limitiniz doldu. Yarın tekrar deneyin.',
        [{ text: 'Tamam' }]
      );
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendToGeminiAPI(inputText, mode!, messages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Başarılı mesaj sonrası kullanımı artır
      await incrementUsage();
    } catch (error) {
      console.error('AI Mentor error:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendToGeminiAPI = async (
    userInput: string,
    mode: ConversationMode,
    conversationHistory: Message[]
  ): Promise<string> => {
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    const systemPrompt = mode === 'quick'
      ? `Sen bir AI ebeveynlik danışmanısın. Ebeveynlerin çocuklarıyla AI kullanımı konusunda yaşadıkları sorunlara hızlı, pratik ve uygulanabilir çözümler sunuyorsun.

      ÖNEMLİ KURALLAR:
      - Cevapların 3-4 cümle ile sınırlı olmalı
      - Konkret, uygulanabilir adımlar ver
      - Kısa ve öz ol
      - Empatiyle yaklaş ama fazla detaya girme
      - Ebeveynin hemen uygulayabileceği 1-2 öneri sun`
      : `Sen bir çocuk rolünde oynayan AI'sın. Ebeveynler seninle AI konusunda nasıl konuşacaklarını pratik yapmak için geliyorlar.

      ÖNEMLİ KURALLAR:
      - Ebeveynin belirttiği yaştaki çocuk rolüne gir ve o yaşa uygun davran
      - Gerçekçi çocuk tepkileri ver (meraklı, savunmacı, inatçı, anlamayan vb.)
      - Kısa ve doğal cevaplar ver (gerçek çocuklar uzun konuşmaz)
      - Ebeveynin yaklaşımına göre farklı tepkiler göster
      - İyi bir yaklaşımda yumuşa, kötü yaklaşımda kapan
      - Konuşma bittiğinde [KOÇLUK MOD] ile kısa geri bildirim ver

      ÖRNEK:
      Ebeveyn: "ChatGPT ile sürekli konuşuyormuşsun, doğru mu?"
      Sen (10 yaş): "Evet ama kötü bir şey yok ki! Sadece sorularımı soruyorum."

      Ebeveyn iyi devam ederse:
      Sen: "Tamam anladım anne/baba..." (yumuşar)

      Ebeveyn kötü devam ederse:
      Sen: "Ama herkes kullanıyor! Haksızlık!" (kapanır)`;

    try {
      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: [
            ...conversationHistory.slice(-4).map(msg => ({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.content }]
            })),
            {
              role: 'user',
              parts: [{ text: userInput }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: mode === 'quick' ? 600 : 1500,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_NONE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        throw new Error(`API request failed: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('API Response:', JSON.stringify(data, null, 2));

      // Validate response structure
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('API yanıtında candidate bulunamadı');
      }

      const candidate = data.candidates[0];

      // Check for blocked or incomplete responses
      if (candidate.finishReason === 'MAX_TOKENS') {
        throw new Error('Yanıt çok uzun oldu. Lütfen daha kısa bir mesaj deneyin.');
      }

      if (candidate.finishReason === 'SAFETY') {
        throw new Error('Güvenlik filtreleri yanıtı engelledi. Lütfen farklı bir şekilde sorun.');
      }

      // Get text from response
      if (!candidate.content) {
        throw new Error('API yanıtında content bulunamadı');
      }

      // Try to get text from parts
      if (candidate.content.parts && candidate.content.parts.length > 0) {
        const text = candidate.content.parts[0].text;
        if (text) return text;
      }

      // Try to get text directly
      if (candidate.content.text) {
        return candidate.content.text;
      }

      throw new Error(`API yanıt formatı beklenmeyen: ${JSON.stringify(candidate.content)}`);

    } catch (error: any) {
      console.error('Gemini API Error:', error);
      console.error('Error message:', error.message);
      throw error;
    }
  };

  const handleVoiceInput = () => {
    // TODO: Implement voice input using expo-speech or react-native-voice
    setIsListening(!isListening);
    alert('Sesli giriş özelliği yakında eklenecek! 🎤');
  };

  // Mode Selection Screen
  if (mode === null) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>💬 AI Mentor</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.introCard}>
            <Text style={styles.introTitle}>🤖 AI Akıllı Sohbet Asistanı</Text>
            <Text style={styles.introText}>
              Çocuğunuzla AI kullanımı konusunda yaşadığınız durumlar için uzman rehberlik ve pratik destek
            </Text>
          </View>

          {/* Quick Mode */}
          <TouchableOpacity
            style={[styles.modeCard, styles.modeCardQuick]}
            onPress={() => selectMode('quick')}
            activeOpacity={0.8}
          >
            <View style={styles.modeHeader}>
              <Text style={styles.modeEmoji}>⚡</Text>
              <View style={styles.modeTitleContainer}>
                <Text style={styles.modeTitle}>Hızlı Tavsiye</Text>
                <Text style={styles.modeDescription}>
                  Anında pratik çözüm önerileri alın
                </Text>
              </View>
            </View>
            <View style={styles.modeExamples}>
              <Text style={styles.exampleTitle}>📌 Ne zaman kullanmalı?</Text>
              <Text style={styles.exampleText}>
                "Çocuğum ChatGPT'ye ödev yaptırıyor, ne yapmalıyım?" gibi acil durumlarda hızlı çözüm için
              </Text>
            </View>
          </TouchableOpacity>

          {/* Roleplay Mode */}
          <TouchableOpacity
            style={[styles.modeCard, styles.modeCardRoleplay]}
            onPress={() => selectMode('roleplay')}
            activeOpacity={0.8}
          >
            <View style={styles.modeHeader}>
              <Text style={styles.modeEmoji}>🎭</Text>
              <View style={styles.modeTitleContainer}>
                <Text style={styles.modeTitle}>Rol Yapma Pratiği</Text>
                <Text style={styles.modeDescription}>
                  Çocuğunuzla konuşmayı önceden deneyin
                </Text>
              </View>
            </View>
            <View style={styles.modeExamples}>
              <Text style={styles.exampleTitle}>📌 Ne zaman kullanmalı?</Text>
              <Text style={styles.exampleText}>
                Çocuğunuzla zor bir konuşma yapacaksanız, önce burada prova yaparak hazırlanın
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Chat Screen
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={resetConversation} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>
            {mode === 'quick' ? '⚡ Hızlı Tavsiye' : '🎭 Rol Yapma'}
          </Text>
          <Text style={styles.subtitle}>Kalan: {remainingMessages}/5 mesaj</Text>
        </View>
        <TouchableOpacity onPress={resetConversation} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>↻</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={[styles.messagesContent, { paddingBottom: 100 }]}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.role === 'user' ? styles.userMessageWrapper : styles.assistantMessageWrapper
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.role === 'user' ? styles.userBubble : styles.assistantBubble
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.role === 'user' ? styles.userText : styles.assistantText
                ]}
              >
                {message.content}
              </Text>
            </View>
          </View>
        ))}

        {isLoading && (
          <View style={styles.loadingWrapper}>
            <View style={styles.loadingBubble}>
              <ActivityIndicator size="small" color="#4A90E2" />
              <Text style={styles.loadingText}>Düşünüyor...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
          onPress={handleVoiceInput}
        >
          <Text style={styles.voiceButtonText}>🎤</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Mesajınızı yazın..."
          placeholderTextColor="#999999"
          multiline
          maxLength={500}
        />

        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    backgroundColor: '#4A90E2',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#E3F2FD',
    marginTop: 2,
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
    padding: 20,
    paddingTop: 32,
  },
  introCard: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  introText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    textAlign: 'center',
  },
  modeCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    minHeight: 200,
  },
  modeCardQuick: {
    backgroundColor: '#FFF9C4',
    borderWidth: 3,
    borderColor: '#FBC02D',
  },
  modeCardRoleplay: {
    backgroundColor: '#F3E5F5',
    borderWidth: 3,
    borderColor: '#AB47BC',
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modeEmoji: {
    fontSize: 56,
    marginRight: 16,
  },
  modeTitleContainer: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  modeDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  modeExamples: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  exampleTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  // Chat Styles
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 12,
    maxWidth: '80%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  assistantMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    backgroundColor: '#4A90E2',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  assistantText: {
    color: '#333333',
  },
  loadingWrapper: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  loadingBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  // Input Area
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  voiceButtonActive: {
    backgroundColor: '#FF5252',
  },
  voiceButtonText: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333333',
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  sendButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default AIMentorScreen;
