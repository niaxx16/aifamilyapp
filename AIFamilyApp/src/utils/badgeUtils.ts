import { supabase } from '../services/supabase';

// Puan bazlı rozet seviyeleri
export const POINT_BADGES = [
  { points: 50, name: 'Başlangıç', emoji: '🥉', type: 'points_50' },
  { points: 100, name: 'Yükselen Yıldız', emoji: '🥈', type: 'points_100' },
  { points: 200, name: 'İlerleme Kahramanı', emoji: '🥇', type: 'points_200' },
  { points: 350, name: 'Süper Ebeveyn', emoji: '⭐', type: 'points_350' },
  { points: 500, name: 'AI Uzmanı', emoji: '🏆', type: 'points_500' },
  { points: 750, name: 'Efsane', emoji: '💎', type: 'points_750' },
  { points: 1000, name: 'Usta', emoji: '👑', type: 'points_1000' },
];

/**
 * Puan bazlı rozetleri kontrol eder ve yeni kazanılan rozetleri döndürür
 */
export const checkAndAwardPointBadges = async (childId: string, newTotalPoints: number) => {
  try {
    // Zaten kazanılmış puan rozetlerini al
    const { data: earnedBadges } = await supabase
      .from('earned_badges')
      .select('badge_type')
      .eq('parent_id', childId)
      .like('badge_type', 'points_%');

    const earnedTypes = new Set(earnedBadges?.map(b => b.badge_type) || []);

    // Kazanılması gereken yeni rozetleri bul
    const newBadges = POINT_BADGES.filter(
      badge => newTotalPoints >= badge.points && !earnedTypes.has(badge.type)
    );

    // Yeni rozetleri kaydet
    // ✅ BUG-H4 Fix: Duplicate badge prevention with upsert logic
    const awardedBadges = [];
    for (const badge of newBadges) {
      // Önce badge'in zaten verilmediğinden emin ol (race condition önlemi)
      const { data: existing } = await supabase
        .from('earned_badges')
        .select('id')
        .eq('parent_id', childId)
        .eq('badge_type', badge.type)
        .maybeSingle();

      // Eğer badge zaten verilmişse atla
      if (existing) {
        continue;
      }

      // Badge'i ekle (database unique constraint duplicate'leri engelleyecek)
      const { error } = await supabase
        .from('earned_badges')
        .insert({
          parent_id: childId,
          badge_type: badge.type,
          badge_name: badge.name,
          badge_emoji: badge.emoji,
          category_id: null,
        });

      // Unique constraint violation hariç hataları logla
      if (error && !error.message?.includes('unique_badge_per_parent')) {
        console.error('Badge insert hatası:', error);
      } else if (!error) {
        awardedBadges.push(badge);
      }
    }

    return awardedBadges;
  } catch (error) {
    console.error('Puan rozeti kontrolü hatası:', error);
    return [];
  }
};
