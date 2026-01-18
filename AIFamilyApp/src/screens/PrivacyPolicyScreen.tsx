import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gizlilik Politikası</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={styles.updateDate}>Son Güncelleme: 7 Kasım 2025</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Giriş</Text>
          <Text style={styles.paragraph}>
            AI Aile Rehberi ("Uygulama") olarak, kullanıcılarımızın gizliliğine önem veriyoruz.
            Bu Gizlilik Politikası, uygulamayı kullanırken toplanan, işlenen ve saklanan kişisel
            verilerin nasıl yönetildiğini açıklamaktadır.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Toplanan Bilgiler</Text>
          <Text style={styles.paragraph}>
            Uygulamamızı kullanırken aşağıdaki bilgiler toplanabilir:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Kullanıcı profil bilgileri (ad, yaş, cinsiyet)</Text>
            <Text style={styles.listItem}>• Çocuk profil bilgileri (lakap, yaş, sınıf seviyesi)</Text>
            <Text style={styles.listItem}>• İlerleme ve tamamlama verileri</Text>
            <Text style={styles.listItem}>• Uygulama kullanım istatistikleri</Text>
            <Text style={styles.listItem}>• Tercihler ve ayarlar</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Bilgilerin Kullanımı</Text>
          <Text style={styles.paragraph}>
            Toplanan bilgiler şu amaçlarla kullanılır:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Kişiselleştirilmiş eğitim deneyimi sunmak</Text>
            <Text style={styles.listItem}>• İlerlemenizi takip etmek ve raporlamak</Text>
            <Text style={styles.listItem}>• Uygulama performansını iyileştirmek</Text>
            <Text style={styles.listItem}>• Teknik destek sağlamak</Text>
            <Text style={styles.listItem}>• Güvenlik ve dolandırıcılık önleme</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Veri Güvenliği</Text>
          <Text style={styles.paragraph}>
            Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri kullanıyoruz:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• SSL/TLS şifreleme ile veri aktarımı</Text>
            <Text style={styles.listItem}>• Güvenli veritabanı depolama (Supabase)</Text>
            <Text style={styles.listItem}>• Düzenli güvenlik güncellemeleri</Text>
            <Text style={styles.listItem}>• Erişim kontrolleri ve kimlik doğrulama</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Çocukların Gizliliği</Text>
          <Text style={styles.paragraph}>
            Uygulamamız aileler için tasarlanmıştır ve çocuklarla ilgili bilgilerin korunmasına
            özel önem veriyoruz. Çocuk profilleri yalnızca ebeveyn hesabı altında oluşturulabilir
            ve yönetilebilir. Çocuklardan doğrudan kişisel bilgi toplamıyoruz.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Üçüncü Taraf Hizmetleri</Text>
          <Text style={styles.paragraph}>
            Uygulamamız aşağıdaki üçüncü taraf hizmetlerini kullanmaktadır:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Supabase (Veritabanı ve Kimlik Doğrulama)</Text>
            <Text style={styles.listItem}>• Google Gemini (AI Asistan Özellikleri)</Text>
            <Text style={styles.listItem}>• Expo (Uygulama Geliştirme Platformu)</Text>
          </View>
          <Text style={styles.paragraph}>
            Bu hizmetlerin kendi gizlilik politikaları vardır ve kullanımları için ilgili
            politikalarını incelemenizi öneririz.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Veri Saklama</Text>
          <Text style={styles.paragraph}>
            Kişisel verileriniz, hesabınız aktif olduğu sürece saklanır. Hesabınızı silmek
            isterseniz, tüm verileriniz kalıcı olarak silinecektir. İlerleme kayıtları ve
            istatistiksel veriler anonim hale getirilerek saklanabilir.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Kullanıcı Hakları</Text>
          <Text style={styles.paragraph}>
            KVKK kapsamında aşağıdaki haklara sahipsiniz:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Kişisel verilerinizin işlenip işlenmediğini öğrenme</Text>
            <Text style={styles.listItem}>• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</Text>
            <Text style={styles.listItem}>• Verilerinizin düzeltilmesini veya silinmesini talep etme</Text>
            <Text style={styles.listItem}>• Verilerinizin aktarıldığı üçüncü kişileri bilme</Text>
            <Text style={styles.listItem}>• İşlemenin mevzuata aykırı olması halinde zararın giderilmesini isteme</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Çerezler (Cookies)</Text>
          <Text style={styles.paragraph}>
            Uygulamamız, kullanıcı deneyimini geliştirmek için oturum yönetimi ve tercih
            saklama amacıyla yerel depolama kullanır. Bu veriler cihazınızda saklanır ve
            üçüncü taraflarla paylaşılmaz.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Politika Güncellemeleri</Text>
          <Text style={styles.paragraph}>
            Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler olması
            durumunda uygulama içinden bildirim yapılacaktır. Politikanın güncel halini düzenli
            olarak kontrol etmenizi öneririz.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. İletişim</Text>
          <Text style={styles.paragraph}>
            Gizlilik politikamız hakkında sorularınız varsa veya haklarınızı kullanmak
            isterseniz bizimle iletişime geçebilirsiniz:
          </Text>
          <View style={styles.contactBox}>
            <Text style={styles.contactText}>📧 E-posta: destek@aifamilyapp.com</Text>
            <Text style={styles.contactText}>🌐 Web: www.aifamilyapp.com</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
            uyarınca hazırlanmıştır.
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
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  footerText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default PrivacyPolicyScreen;
