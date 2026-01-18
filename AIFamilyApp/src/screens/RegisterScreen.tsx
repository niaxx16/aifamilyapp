import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../services/supabase';

const { width } = Dimensions.get('window');

type RegisterScreenProps = {
  navigation: StackNavigationProp<any>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation: navProp }) => {
  const navigation = navProp as any;
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptAge, setAcceptAge] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Hata', 'Devam etmek için Kullanım Şartları ve Gizlilik Politikasını kabul etmelisiniz');
      return;
    }

    if (!acceptAge) {
      Alert.alert('Hata', 'Devam etmek için 18 yaşından büyük olduğunuzu onaylamalısınız');
      return;
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Hata', 'Geçerli bir email adresi giriniz');
      return;
    }

    // Şifre kontrolü
    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            email: email.trim(),
            marketing_consent: acceptMarketing,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // User profili artık database trigger ile otomatik oluşturuluyor
        // BUG-H1 fix: handle_new_user() trigger fonksiyonu

        Alert.alert(
          'Başarılı!',
          'Hesabınız oluşturuldu. Şimdi giriş yapabilirsiniz.',
          [
            {
              text: 'Giriş Yap',
              onPress: () => navigation.replace('Login'),
            },
          ]
        );
      }
    } catch (error: any) {
      Alert.alert('Kayıt Hatası', error.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    Alert.alert('Yakında', `${provider} ile kayıt özelliği yakında eklenecek`);
  };

  return (
    <LinearGradient
      colors={['#00a4c4', '#0086a4', '#006884']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>İptal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.headerButtonRight}>Oturum aç</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Kaydol</Text>

            {/* Social Register Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialRegister('Google')}
                disabled={loading}
              >
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.socialLabel}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialRegister('Microsoft')}
                disabled={loading}
              >
                <Text style={styles.socialIcon}>M</Text>
                <Text style={styles.socialLabel}>Microsoft</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialRegister('Apple')}
                disabled={loading}
              >
                <Text style={styles.socialIcon}></Text>
                <Text style={styles.socialLabel}>Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialRegister('Clever')}
                disabled={loading}
              >
                <Text style={styles.socialIcon}>C</Text>
                <Text style={styles.socialLabel}>Clever</Text>
              </TouchableOpacity>
            </View>

            {/* Email Button */}
            <TouchableOpacity
              style={styles.emailButton}
              onPress={() => {}}
              disabled={loading}
            >
              <Text style={styles.emailButtonText}>İş e-postası ile devam et</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <Text style={styles.dividerText}>veya</Text>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>E-posta</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Şifre</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="En az 6 karakter"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? '👁' : '👁'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Şifre Tekrar</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifrenizi tekrar girin"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁' : '👁'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms & Privacy Consent - ZORUNLU */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAcceptTerms(!acceptTerms)}
              disabled={loading}
            >
              <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>
                <Text style={styles.requiredStar}>* </Text>
                <Text
                  style={styles.termsLink}
                  onPress={() => navigation.navigate('TermsOfService')}
                >
                  Kullanım Şartları
                </Text>
                {' '}ve{' '}
                <Text
                  style={styles.termsLink}
                  onPress={() => navigation.navigate('PrivacyPolicy')}
                >
                  Gizlilik Politikası
                </Text>
                'nı okudum ve kabul ediyorum.
              </Text>
            </TouchableOpacity>

            {/* Age Verification - ZORUNLU */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAcceptAge(!acceptAge)}
              disabled={loading}
            >
              <View style={[styles.checkbox, acceptAge && styles.checkboxChecked]}>
                {acceptAge && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>
                <Text style={styles.requiredStar}>* </Text>
                18 yaşından büyük olduğumu onaylıyorum.
              </Text>
            </TouchableOpacity>

            {/* Marketing Consent - Opsiyonel */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAcceptMarketing(!acceptMarketing)}
              disabled={loading}
            >
              <View style={[styles.checkbox, acceptMarketing && styles.checkboxChecked]}>
                {acceptMarketing && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>
                AI Family App ve bağlı şirketlerden bilgi, teklif, öneri ve güncellemeler almak istiyorum.
              </Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                (!email || !password || !confirmPassword || !acceptTerms || !acceptAge || loading) && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={!email || !password || !confirmPassword || !acceptTerms || !acceptAge || loading}
              activeOpacity={0.9}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.continueButtonText}>Devam et</Text>
              )}
            </TouchableOpacity>

            {/* Required Fields Note */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                <Text style={styles.requiredStar}>*</Text> işaretli alanlar zorunludur.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerButtonRight: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 24,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  socialLabel: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
  },
  emailButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  emailButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerText: {
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    padding: 12,
  },
  eyeIcon: {
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#00CED1',
    borderColor: '#00CED1',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  continueButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  termsContainer: {
    marginTop: 10,
  },
  termsText: {
    color: '#666',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  termsLink: {
    color: '#000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  requiredStar: {
    color: '#F26B5E',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
