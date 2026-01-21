import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase yapılandırması - Environment variable'lardan veya fallback değerlerden alınıyor
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://ssfjcnotebecmwtxjryt.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZmpjbm90ZWJlY213dHhqcnl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjE0OTcsImV4cCI6MjA3NzUzNzQ5N30._EvYLvMWIymslDyUxQFUzrUZzvOHNmxz71WTmPbqbrM';

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
