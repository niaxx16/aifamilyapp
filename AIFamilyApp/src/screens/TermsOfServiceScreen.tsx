import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsOfServiceScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kullanım Şartları</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={styles.updateDate}>Son Güncelleme: 7 Kasım 2025</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Kabul ve Onay</Text>
          <Text style={styles.paragraph}>
            AI Aile Rehberi uygulamasını ("Uygulama") kullanarak, bu Kullanım Şartları'nı
            ("Şartlar") okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
            Bu şartları kabul etmiyorsanız, lütfen uygulamayı kullanmayın.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Hizmet Tanımı</Text>
          <Text style={styles.paragraph}>
            AI Aile Rehberi, aileler için tasarlanmış bir yapay zeka eğitim platformudur.
            Uygulama şunları sunar:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Eğitici içerikler ve dersler</Text>
            <Text style={styles.listItem}>• Aile etkinlikleri ve senaryolar</Text>
            <Text style={styles.listItem}>• AI mentor ve rehberlik araçları</Text>
            <Text style={styles.listItem}>• İlerleme takibi ve rozet sistemi</Text>
            <Text style={styles.listItem}>• Kişiselleştirilmiş eylem planları</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Kullanıcı Hesapları</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>3.1. Hesap Oluşturma:</Text> Uygulamayı kullanabilmek için
            bir hesap oluşturmanız gerekebilir. Hesap bilgilerinizin doğruluğundan siz sorumlusunuz.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>3.2. Güvenlik:</Text> Hesap şifrenizi gizli tutmaktan ve
            hesabınızda gerçekleşen tüm aktivitelerden siz sorumlusunuz.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>3.3. Yaş Sınırı:</Text> Uygulamayı kullanabilmek için
            18 yaşında veya üzerinde olmalısınız. Çocuk profilleri yalnızca ebeveyn gözetiminde
            oluşturulabilir.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Kullanım Kuralları</Text>
          <Text style={styles.paragraph}>
            Uygulamayı kullanırken aşağıdaki kurallara uymanız gerekmektedir:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>✓ Uygulamayı yalnızca yasal amaçlarla kullanın</Text>
            <Text style={styles.listItem}>✓ Başkalarının haklarına saygı gösterin</Text>
            <Text style={styles.listItem}>✓ Doğru ve güncel bilgiler sağlayın</Text>
            <Text style={styles.listItem}>✗ Zararlı veya kötü amaçlı içerik paylaşmayın</Text>
            <Text style={styles.listItem}>✗ Sistemlere zarar vermeye çalışmayın</Text>
            <Text style={styles.listItem}>✗ Başkasının hesabını kullanmayın</Text>
            <Text style={styles.listItem}>✗ Telif haklarını ihlal etmeyin</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. İçerik ve Fikri Mülkiyet</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>5.1. Uygulama İçeriği:</Text> Uygulamadaki tüm içerik,
            tasarım, metin, grafik ve yazılım AI Aile Rehberi'nin mülkiyetindedir ve telif
            hakları ile korunmaktadır.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>5.2. Kullanım Lisansı:</Text> Size, uygulamayı kişisel
            ve ticari olmayan amaçlarla kullanmak için sınırlı, münhasır olmayan, devredilemez
            bir lisans verilmiştir.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>5.3. Kullanıcı İçeriği:</Text> Uygulamaya yüklediğiniz
            veya oluşturduğunuz içeriğin sorumluluğu size aittir.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. AI Asistan Kullanımı</Text>
          <Text style={styles.paragraph}>
            Uygulamamızdaki AI özellikleri (Gemini AI) üçüncü taraf bir hizmet olan Google
            tarafından sağlanmaktadır. AI yanıtları:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Yalnızca rehberlik amaçlıdır</Text>
            <Text style={styles.listItem}>• Profesyonel tavsiye yerine geçmez</Text>
            <Text style={styles.listItem}>• Bazen hatalı veya eksik olabilir</Text>
            <Text style={styles.listItem}>• Kendi değerlendirmenizle kullanılmalıdır</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Ücretlendirme ve Abonelik</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>7.1. Ücretsiz Hizmetler:</Text> Uygulamanın temel
            özellikleri ücretsiz olarak sunulmaktadır.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>7.2. Premium Özellikler:</Text> Gelecekte premium
            özellikler eklenebilir. Bu durumda fiyatlandırma ve şartlar açıkça belirtilecektir.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>7.3. İade Politikası:</Text> Ücretli hizmetler için
            iade koşulları satın alma sırasında belirtilecektir.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Sorumluluk Sınırlaması</Text>
          <Text style={styles.paragraph}>
            AI Aile Rehberi, uygulamanın kesintisiz, hatasız veya güvenli olacağını garanti
            etmez. Uygulama "olduğu gibi" sunulmaktadır. Yasal olarak izin verilen azami
            ölçüde, aşağıdakilerden sorumlu değiliz:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Veri kaybı veya hasar</Text>
            <Text style={styles.listItem}>• Hizmet kesintileri</Text>
            <Text style={styles.listItem}>• Üçüncü taraf içerik ve hizmetler</Text>
            <Text style={styles.listItem}>• Kullanıcı hatalarından kaynaklanan sorunlar</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Hizmetin Değiştirilmesi ve Sonlandırılması</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>9.1. Değişiklikler:</Text> Uygulamanın özelliklerini,
            içeriğini veya kullanılabilirliğini önceden haber vermeksizin değiştirme hakkımız
            saklıdır.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>9.2. Hesap Askıya Alma:</Text> Şartları ihlal eden
            hesapları askıya alma veya sonlandırma hakkımız vardır.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>9.3. Hizmet Sonlandırma:</Text> Hizmeti herhangi bir
            zamanda sonlandırma hakkımız saklıdır.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Gizlilik</Text>
          <Text style={styles.paragraph}>
            Kişisel verilerinizin toplanması ve kullanımı, Gizlilik Politikamızda detaylı
            olarak açıklanmıştır. Uygulamayı kullanarak Gizlilik Politikamızı kabul etmiş
            olursunuz.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Uyuşmazlık Çözümü</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>11.1. Uygulanacak Hukuk:</Text> Bu şartlar Türkiye
            Cumhuriyeti yasalarına tabidir.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>11.2. Yetki:</Text> Bu şartlardan doğan uyuşmazlıklarda
            İstanbul mahkemeleri ve icra daireleri yetkilidir.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>11.3. İletişim:</Text> Herhangi bir sorun veya şikayet
            için öncelikle bizimle iletişime geçmenizi öneririz.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Değişiklikler</Text>
          <Text style={styles.paragraph}>
            Bu Kullanım Şartları'nı zaman zaman güncelleyebiliriz. Önemli değişiklikler
            durumunda uygulama içinden bildirim yapılacaktır. Değişikliklerden sonra
            uygulamayı kullanmaya devam ederek yeni şartları kabul etmiş sayılırsınız.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. İletişim Bilgileri</Text>
          <Text style={styles.paragraph}>
            Bu şartlar hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:
          </Text>
          <View style={styles.contactBox}>
            <Text style={styles.contactText}>📧 E-posta: destek@aifamilyapp.com</Text>
            <Text style={styles.contactText}>🌐 Web: www.aifamilyapp.com</Text>
            <Text style={styles.contactText}>📍 Adres: İstanbul, Türkiye</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Bu Kullanım Şartları'nı kabul ederek, uygulamayı sorumlu ve yasal şekilde
            kullanacağınızı taahhüt etmiş olursunuz.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#193140',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  updateDate: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  bold: {
    fontWeight: '700',
    color: '#111827',
  },
  list: {
    marginLeft: 8,
    marginTop: 8,
  },
  listItem: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 6,
  },
  contactBox: {
    backgroundColor: '#A7CBD9',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#32738C',
  },
  contactText: {
    fontSize: 14,
    color: '#193140',
    fontWeight: '600',
    marginBottom: 6,
  },
  footer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F2BFAC',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F26B5E',
  },
  footerText: {
    fontSize: 12,
    color: '#193140',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default TermsOfServiceScreen;
