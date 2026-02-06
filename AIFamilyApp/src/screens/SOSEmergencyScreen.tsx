import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
  readingTime: number; // dakika
}

const EMERGENCY_SCENARIOS: EmergencyScenario[] = [
  {
    id: '1',
    title: 'AI\'den Ödev Kopyalama',
    emoji: '📝',
    situation: 'Çocuğunuz AI kullanarak ödevini hazırlamış veya doğrudan kopyalamış.',
    immediateActions: [
      'Sakin kalın ve suçlamadan konuşun',
      'Çocuğunuzun neden bu yolu seçtiğini anlamaya çalışın',
      'Öğretmeniyle iletişime geçin (gerekirse)',
      'Ödevin tekrar yapılmasını istemeden önce konuşun'
    ],
    talkingPoints: [
      '"AI sana nasıl yardımcı oldu? Anlatır mısın?"',
      '"Ödevini kendi başına yapmakta zorlandığın yerler var mıydı?"',
      '"AI\'den yardım almak ile kopyalamak arasındaki farkı konuşalım"',
      '"Sana yardım edebilmek için neler yapabilirim?"'
    ],
    preventionTips: [
      'AI\'yi araştırma asistanı olarak kullanmayı öğretin',
      'Ödevlerde AI kullanım kurallarını birlikte belirleyin',
      'Çocuğunuzun ödev yükünü takip edin',
      'Zor konularda erken destek sunun'
    ],
    nextStep: {
      title: 'Bir Dahaki Sefere',
      action: 'Çocuğunuzla birlikte "AI Ödev Yardımcısı Kuralları" listesi oluşturun. Hangi durumlarda AI\'den yardım alınabileceğini, hangi durumlarda alınamayacağını yazılı hale getirin ve görünür bir yere asın.',
      timeframe: 'Bu hafta içinde yapın'
    },
    readingTime: 3
  },
  {
    id: '2',
    title: 'Aşırı AI Kullanımı',
    emoji: '📱',
    situation: 'Çocuğunuz günün önemli bir kısmını AI chatbot\'larıyla geçiriyor.',
    immediateActions: [
      'Kullanım süresini değil, içeriği inceleyin',
      'Çocuğunuzla ne konuştuğunu sormadan önce güven oluşturun',
      'Yargılamadan merakınızı gösterin',
      'Ekran süresini aniden kısıtlamayın'
    ],
    talkingPoints: [
      '"AI ile ne konuşmaktan hoşlanıyorsun?"',
      '"Sana nasıl yardımcı oluyor?"',
      '"Arkadaşlarınla da bu konuları konuşuyor musun?"',
      '"AI dışında zaman geçirmekten keyif aldığın neler var?"'
    ],
    preventionTips: [
      'Dengeli kullanım için birlikte kurallar belirleyin',
      'Alternatif aktiviteler planlayın',
      'Neden AI kullandığını anlamaya çalışın (yalnızlık, merak, ödev)',
      'Aile olarak AI-siz aktiviteler yapın'
    ],
    nextStep: {
      title: 'Bir Dahaki Sefere',
      action: 'Haftalık aile aktivite planı yapın. Her gün 30 dakika ekransız, birlikte kaliteli zaman geçirin. Çocuğunuzun ilgi alanlarına göre aktiviteler seçin ve takvime işleyin.',
      timeframe: 'Yarından itibaren başlayın'
    },
    readingTime: 4
  },
  {
    id: '3',
    title: 'Yanlış Bilgiyi Doğru Sanma',
    emoji: '❌',
    situation: 'Çocuğunuz AI\'den aldığı yanlış bilgiyi doğru olarak kabul ediyor.',
    immediateActions: [
      'Bilginin yanlış olduğunu nazikçe gösterin',
      'AI\'nin hata yapabileceğini açıklayın',
      'Doğru bilgiyi birlikte bulun',
      'Bunun öğrenme fırsatı olduğunu vurgulayın'
    ],
    talkingPoints: [
      '"AI\'nin cevabı ilginçmiş. Başka kaynaklardan da kontrol edelim mi?"',
      '"AI bazen hata yapabiliyor. Nasıl doğru olduğunu kontrol edebiliriz?"',
      '"Hangi bilgi kaynaklarının güvenilir olduğunu nasıl anlarız?"',
      '"Önemli konularda birden fazla kaynak kullanmanın önemi nedir?"'
    ],
    preventionTips: [
      'Bilgi doğrulama becerilerini öğretin',
      'AI\'nin nasıl çalıştığını basit şekilde anlatın',
      'Güvenilir kaynak nedir, öğretin',
      'Eleştirel düşünme alışkanlığı kazandırın'
    ],
    nextStep: {
      title: 'Bir Dahaki Sefere',
      action: 'Bir sonraki ödev veya araştırma projesinde, çocuğunuzla birlikte "3 Kaynak Kuralı"nı uygulayın: Aynı bilgiyi 3 farklı güvenilir kaynaktan doğrulayın. Bunu alışkanlık haline getirin.',
      timeframe: 'Bir sonraki ödevde uygulayın'
    },
    readingTime: 3
  },
  {
    id: '4',
    title: 'AI\'yi Arkadaş Anma',
    emoji: '💬',
    situation: 'Çocuğunuz AI chatbot\'u gerçek bir arkadaş gibi görüyor ve duygusal bağ kuruyor.',
    immediateActions: [
      'Aniden yasaklamak yerine anlayışlı olun',
      'Çocuğunuzun sosyal çevresini gözden geçirin',
      'AI ile ne konuştuğunu merakla sorun',
      'Gerçek arkadaşlıkların önemini konuşun'
    ],
    talkingPoints: [
      '"AI ile konuşmak sana nasıl hissettiriyor?"',
      '"Gerçek arkadaşlarınla AI ile konuşmak arasında fark var mı?"',
      '"Arkadaşlık senin için ne anlama geliyor?"',
      '"AI senin duygularını gerçekten hissedebilir mi?"'
    ],
    preventionTips: [
      'Sosyal aktivitelere katılımı teşvik edin',
      'AI ile insan arasındaki farkları açıklayın',
      'Empati ve duygusal zeka geliştirin',
      'Yüz yüze iletişim becerilerini güçlendirin'
    ],
    nextStep: {
      title: 'Bir Dahaki Sefere',
      action: 'Bu ay içinde çocuğunuzun bir arkadaşını eve davet edin veya sosyal bir aktiviteye katılmasını sağlayın. Gerçek arkadaşlıkları teşvik eden ortamlar oluşturun. Hafta sonu bir oyun gecesi düzenleyin.',
      timeframe: 'Bu ay içinde planlayın'
    },
    readingTime: 4
  },
  {
    id: '5',
    title: 'Uygunsuz İçerik Görme',
    emoji: '⚠️',
    situation: 'Çocuğunuz AI\'den yaşına uygun olmayan içerik almış veya uygunsuz sorular sormuş.',
    immediateActions: [
      'Sakin ve destekleyici olun',
      'Çocuğunuzu suçlamayın, merak doğaldır',
      'Ne gördüğünü veya sorduğunu nazikçe öğrenin',
      'Ebeveyn kontrollerini gözden geçirin'
    ],
    talkingPoints: [
      '"Bunu nerede gördün/öğrendin?"',
      '"Bu konuda soru sormak istediğin bir şey var mı?"',
      '"Bazı bilgiler yaşına uygun olmayabilir, birlikte öğrenelim"',
      '"Kafanı karıştıran bir şey gördüğünde benimle konuşabilirsin"'
    ],
    preventionTips: [
      'Yaş uygun AI araçları kullanın',
      'Ebeveyn kontrollerini aktif edin',
      'Açık iletişim kanalı oluşturun',
      'Dijital güvenlik kuralları belirleyin',
      'İnternet kullanımını zaman zaman birlikte yapın'
    ],
    nextStep: {
      title: 'Bir Dahaki Sefere',
      action: 'Bugün çocuğunuzla "Güvenli İnternet Anlaşması" imzalayın. Hangi siteleri/uygulamaları kullanabileceği, soru sorduğunda size geleceği konusunda net kurallar belirleyin. Uygulamalarda yaş kısıtlamaları aktif edin.',
      timeframe: 'Bugün yapın'
    },
    readingTime: 4
  }
];

type NavigationProp = StackNavigationProp<any>;

const SOSEmergencyScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleScenarioPress = (scenario: EmergencyScenario) => {
    navigation.navigate('EmergencyScenarioDetail', { scenario });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🆘 Acil Durum Rehberi</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Hızlı Yardım</Text>
          <Text style={styles.infoText}>
            Çocuğunuzla AI kullanımı konusunda acil bir durum mu yaşıyorsunuz?
            Aşağıdaki senaryolardan size en uygun olanı seçin ve anında çözüm önerilerine ulaşın.
          </Text>
        </View>

        {/* Emergency Scenarios */}
        <View style={styles.scenariosContainer}>
          {EMERGENCY_SCENARIOS.map((scenario) => (
            <TouchableOpacity
              key={scenario.id}
              style={styles.scenarioCard}
              onPress={() => handleScenarioPress(scenario)}
              activeOpacity={0.7}
            >
              <View style={styles.scenarioHeader}>
                <Text style={styles.scenarioEmoji}>{scenario.emoji}</Text>
                <View style={styles.scenarioTitleContainer}>
                  <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                  <Text style={styles.readingTime}>⏱️ {scenario.readingTime} dk okuma</Text>
                </View>
              </View>
              <Text style={styles.scenarioSituation} numberOfLines={2}>
                {scenario.situation}
              </Text>
              <View style={styles.scenarioFooter}>
                <Text style={styles.viewButton}>Çözümü Gör →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
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
  title: {
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
  infoCard: {
    backgroundColor: '#FFE5E5',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CC0000',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  scenariosContainer: {
    padding: 16,
  },
  scenarioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4444',
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scenarioEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  scenarioTitleContainer: {
    flex: 1,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  readingTime: {
    fontSize: 12,
    color: '#999999',
  },
  scenarioSituation: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  scenarioFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF4444',
  },
});

export default SOSEmergencyScreen;
