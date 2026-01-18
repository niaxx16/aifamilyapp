import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, Text, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

import RootNavigator from './src/navigation/RootNavigator';
import { testSupabaseConnection } from './src/services/supabase';
import { ChildProvider } from './src/context/ChildContext';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  useEffect(() => {
    // Uygulama açıldığında Supabase bağlantısını test et
    testSupabaseConnection();

    // Tüm Text ve TextInput componentleri için varsayılan font ayarla
    const defaultTextProps = Text.defaultProps || {};
    Text.defaultProps = {
      ...defaultTextProps,
      style: [{ fontFamily: 'OpenSans_400Regular' }, defaultTextProps.style]
    };

    const defaultInputProps = TextInput.defaultProps || {};
    TextInput.defaultProps = {
      ...defaultInputProps,
      style: [{ fontFamily: 'OpenSans_400Regular' }, defaultInputProps.style]
    };
  }, []);

  // Fontlar yüklenene kadar loading göster
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ChildProvider>
          <RootNavigator />
          <StatusBar style="auto" />
        </ChildProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
