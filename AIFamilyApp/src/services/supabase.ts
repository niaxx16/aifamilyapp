import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase yapılandırması - Environment variable'lardan alınıyor
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Zorunlu yapılandırma kontrolü
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase yapılandırması eksik! .env dosyasında EXPO_PUBLIC_SUPABASE_URL ve EXPO_PUBLIC_SUPABASE_ANON_KEY tanımlı olmalı.'
  );
}

// Supabase client'i oluştur
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // ✅ AsyncStorage ile session persist et
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Test bağlantısı için yardımcı fonksiyon
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) throw error;

    console.log('✅ Supabase bağlantısı başarılı!');
    return true;
  } catch (error) {
    console.error('❌ Supabase bağlantı hatası:', error);
    return false;
  }
};
