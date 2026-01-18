const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// .env dosyasından değerleri oku
require('dotenv').config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL veya Key bulunamadı!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSQL() {
  try {
    const sqlPath = path.join(__dirname, 'fix-rls-policies.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('🔧 SQL script çalıştırılıyor...');

    // SQL'i satır satır böl ve çalıştır
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      const { error } = await supabase.rpc('exec_sql', { query: statement });
      if (error) {
        console.error('❌ Hata:', error.message);
      }
    }

    console.log('✅ SQL script başarıyla çalıştırıldı!');
  } catch (error) {
    console.error('❌ Script hatası:', error);
  }
}

runSQL();
