import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

type OnboardingScreenProps = {
  navigation: StackNavigationProp<any>;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation: navProp }) => {
  const navigation = navProp as any;
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#00a4c4', '#0086a4', '#006884']}
      style={[styles.container, { paddingBottom: insets.bottom + 20 }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" />

      {/* Illustration Card */}
      <View style={styles.illustrationCard}>
        {/* Main Illustration Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/onboarding-illustration.png')}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Hoş geldin!</Text>
        <Text style={styles.subtitle}>
          Yapay zeka ile güvenli bir geleceğe hazırlanırken,{'\n'}
          ailenizle keyifli vakit geçirin.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.9}
        >
          <Text style={styles.primaryButtonText}>Başlayalım</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>
            Hesabın yok mu? <Text style={styles.linkText}>Kaydol</Text>
          </Text>
        </TouchableOpacity>

        {/* Footer Links */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.footerLink}>Gizlilik</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>•</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
            <Text style={styles.footerLink}>Şartlar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  illustrationCard: {
    borderRadius: 20,
    marginBottom: 40,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  // Main Illustration
  imageContainer: {
    width: '100%',
    height: height * 0.4,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0FFFF',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    width: width - 48,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#0086a4',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    paddingVertical: 12,
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: '#E0FFFF',
    fontSize: 14,
  },
  linkText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerLink: {
    color: '#E0FFFF',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  footerSeparator: {
    color: '#E0FFFF',
    fontSize: 13,
    marginHorizontal: 12,
  },
});

export default OnboardingScreen;
