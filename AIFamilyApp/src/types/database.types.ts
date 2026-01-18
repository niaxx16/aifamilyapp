// Supabase veritabanı tipleri

// Modül içerik yapısı
export interface ModuleContent {
  video_section?: {
    url: string;
    duration: number; // saniye
    description: string;
    thumbnail?: string;
  };
  real_life_example?: {
    title: string;
    scenario: string;
    explanation: string;
  };
  info_cards?: Array<{
    question: string;
    answer: string;
  }>;
  quiz?: {
    type: 'matching' | 'true_false' | 'multiple_choice' | 'scenario';
    question: string;
    items?: Array<{
      left: string;
      right: string;
      correct: boolean;
    }>;
    options?: Array<{
      text: string;
      correct: boolean;
    }>;
  };
  parent_guide?: {
    title: string;
    explanation: string;
    daily_examples: Array<{
      title: string;
      example: string;
    }>;
    task?: string; // Artık kullanılmıyor ama backward compatibility için
  };
  badge?: {
    name: string;
    icon: string;
    points: number;
    description: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  content: string;
  content_type: 'text' | 'video' | 'infographic' | 'interactive';
  video_url: string | null;
  thumbnail_url: string | null;
  duration: number; // dakika
  difficulty: 1 | 2 | 3;
  category: 'ai_basics' | 'parenting_ai' | 'ethics_safety';
  subcategory: string | null;
  order_number: number;
  created_at: string;
  // Yeni modül yapısı
  module_content?: ModuleContent | null;
  total_duration_minutes?: number;
  completion_sections?: string[];
  // Puan sistemi
  points?: number;
}

export interface ActivityStep {
  step: number;
  title: string;
  description: string;
}

// Gözlem yapısı
export interface ActivityObservation {
  title: string;
  description: string;
}

// Detaylı malzeme yapısı
export interface ActivityMaterial {
  item: string;
  optional?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  description: string | null;
  type: 'game' | 'conversation' | 'creative' | 'exploration';
  duration: number;
  age_min: number;
  age_max: number;
  instructions: string;
  materials: string[] | null;
  created_at: string;
  // Puan sistemi
  points?: number;
  // Yeni haftalık sistem
  week_number?: number;
  difficulty_level?: number;
  steps?: ActivityStep[] | null;
  reflection_question?: string | null;
  image_url?: string | null;
  // Zengin içerik alanları (Supabase'den)
  purpose?: string | null;
  activity_type_label?: string | null;
  observations?: ActivityObservation[] | null;
  detailed_materials?: ActivityMaterial[] | null;
}

export interface DialogueScenario {
  id: string;
  title: string;
  situation: string;
  child_quote: string | null;
  parent_response: string;
  explanation: string | null;
  age_range: string;
  difficulty: 1 | 2 | 3;
  category: string;
  created_at: string;
}

export interface DailyTip {
  id: string;
  tip_text: string;
  category: 'explore' | 'question' | 'play';
  duration: number | null;
  age_range: string;
  follow_up: string | null;
  active: boolean;
  created_at: string;
}

export interface UserProgress {
  id: string;
  parent_id: string;
  lesson_id: string;
  completed: boolean;
  score: number | null;
  time_spent: number | null;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
  quiz_completed?: boolean;
}

export interface CompletedActivity {
  id: string;
  parent_id: string;
  activity_id: string;
  completed_at: string;
}

export interface ParentProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface ParentProfile {
  id: string;
  user_id: string; // auth.users'a referans
  parent_id?: string | null; // Ana ebeveyn profili için null, çocuk profilleri için parent ID
  nickname: string;
  age: number;
  grade_level: number | null;
  gender: 'boy' | 'girl' | 'other' | 'prefer_not_to_say' | null;
  avatar: string;
  interests: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  total_points?: number;
  display_name?: string | null;
  email?: string | null;
  current_week?: number; // Çocuğun hangi haftada olduğunu takip eder
}

// Backward compatibility alias
export type ChildProfile = ParentProfile;

export interface EarnedBadge {
  id: string;
  parent_id: string;
  badge_type: string;
  badge_name: string;
  badge_emoji: string;
  category_id: string | null;
  earned_at: string;
}
