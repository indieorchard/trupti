// =============================================
// TRUPTI - Core TypeScript Type Definitions
// =============================================

export type Language = 'hi' | 'en';

export type Pillar = 
  | 'self'           // स्वयं के लिए
  | 'lost'           // जो खो दिया
  | 'mental_peace'   // मानसिक शांति
  | 'kundali_dosh'   // कुंडली दोष
  | 'vidhis';        // विधियाँ

export type PillarInfo = {
  id: Pillar;
  emoji: string;
  title_hi: string;
  title_en: string;
  subtitle_hi: string;
  subtitle_en: string;
  color: string;
};

export type Prahar = 
  | 'brahma_muhurta'  // 4:00-6:00
  | 'pratah'          // 6:00-9:00
  | 'madhyahna'       // 9:00-12:00
  | 'aparahna'        // 12:00-15:00
  | 'sayam'           // 15:00-18:00
  | 'pradosha'        // 18:00-21:00
  | 'ratri'           // 21:00-0:00
  | 'nisha';          // 0:00-4:00

export interface PanchangData {
  date: string;
  tithi_hi: string;
  tithi_en: string;
  tithi_number: number;
  paksha: 'shukla' | 'krishna';
  nakshatra_hi: string;
  nakshatra_en: string;
  yoga_hi: string;
  yoga_en: string;
  karana_hi: string;
  karana_en: string;
  var_hi: string;
  var_en: string;
  masa_hi: string;
  masa_en: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  rahukaal: string;
  abhijit_muhurta: string;
  festivals_hi: string[];
  festivals_en: string[];
  vratas: string[];
}

export interface Deity {
  id: string;
  canonical_name: string;
  sanskrit_name: string;
  hindi_name: string;
  primary_aspect: 'vaishnava' | 'shaiva' | 'shakta' | 'ganapatya' | 'kaumara' | 'saurya' | 'smartha';
  consort?: string;
  vahana?: string;
  bija_mantra?: string;
  mool_mantra?: string;
  description_hi: string;
  description_en: string;
  iconography_hi: string;
  festivals: string[];
  key_temples: string[];
  image_url?: string;
}

export interface Temple {
  id: string;
  name: string;
  sanskrit_name?: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  deity_id: string;
  deity_name: string;
  circuit: string[];  // 'char_dham', 'jyotirlinga', 'sapta_puri', 'shakti_peetha', 'divya_desam', 'south_mahatirtha'
  significance_hi: string;
  significance_en: string;
  best_time: string;
  youtube_id?: string;
  darshan_timings?: string;
  accessibility?: {
    wheelchair: boolean;
    vip_darshan: boolean;
    battery_car: boolean;
    elderly_support_notes?: string;
  };
}

export interface ChantVerse {
  verse_number: number;
  type?: 'doha' | 'chaupai' | 'shloka' | 'stotra' | 'pauri';
  sanskrit: string;
  transliteration?: string;
  meaning_hi: string;
  meaning_en?: string;
}

export interface Mantra {
  id: string;
  name_hi: string;
  name_en: string;
  category: 'beej' | 'stotra' | 'chalisa' | 'aarti' | 'shloka' | 'stuti' | 'sukta';
  deity_id?: string;
  deity_name?: string;
  source?: string;
  text_sanskrit: string;
  text_transliteration: string;
  meaning_hi: string;
  meaning_en: string;
  verses?: ChantVerse[];
  audio_url?: string;
  youtube_id?: string;
  audio_duration?: number;
  recommended_count?: number;
  benefit_hi?: string;
}

export interface GitaChapter {
  chapter_number: number;
  title_sanskrit: string;
  title_hi: string;
  title_en: string;
  shlokas_count: number;
  summary_hi: string;
  summary_en: string;
  key_shloka?: {
    shloka_number: string;
    sanskrit: string;
    transliteration: string;
    meaning_hi: string;
    meaning_en: string;
  };
}

export interface GitaScripture {
  id: string;
  name_hi: string;
  name_en: string;
  sanskrit_name: string;
  source_text: string;
  narrator: string;
  listener: string;
  chapters_count: number;
  total_verses?: number;
  tradition: string; // Advaita, Vaishnava, Shaiva, etc.
  core_philosophy_hi: string;
  core_philosophy_en: string;
  chapters?: GitaChapter[];
  key_teachings_hi: string[];
  pdf_url?: string;
  archive_url?: string;
}

export interface VedaPurana {
  id: string;
  name_hi: string;
  name_en: string;
  sanskrit_name: string;
  category: 'veda' | 'purana' | 'upanishad' | 'itihasa';
  classification?: string; // Sattva/Rajas/Tamas for Puranas; Shukla/Krishna for Yajurveda; Mukhya for Upanishads
  traditional_author?: string;
  total_verses_or_suktas?: string;
  deity?: string;
  overview_hi: string;
  overview_en: string;
  key_sections: {
    title_hi: string;
    title_en: string;
    desc_hi: string;
    desc_en: string;
  }[];
  mahavakya?: string; // For Upanishads
  archive_url?: string;
}

export interface Vrata {
  id: string;
  name_hi: string;
  name_en: string;
  deity_id?: string;
  deity_name?: string;
  frequency: string;
  tithi_info?: string;
  fasting_rules_hi: string;
  fasting_rules_en: string;
  permitted_foods: string[];
  prohibited_foods: string[];
  significance_hi: string;
  parana_guidelines_hi?: string;
}

export interface Kriya {
  id: string;
  name_hi: string;
  name_en: string;
  time_of_day: string;
  description_hi: string;
  description_en: string;
  duration_minutes: number;
  category: 'japa' | 'pranayama' | 'yoga' | 'svadhyaya' | 'seva' | 'snana' | 'sandhya' | 'aarti';
  audio_url?: string;
  completed?: boolean;
}

export interface JourneyDay {
  day_number: number;
  phase: 'shuddhi' | 'samarpan' | 'moksha';
  phase_hi: string;
  title_hi: string;
  title_en: string;
  theme_hi: string;
  kriyas: string[];  // Kriya IDs
  readings: string[]; // Mantra/Text IDs
  reflection_hi: string;
  reflection_en: string;
}

export interface UserProgress {
  current_day: number;
  started_at: string;
  completed_kriyas: Record<string, boolean>; // date -> kriya_id -> completed
  japa_count: number;
  streak_days: number;
}

export interface FontScale {
  label: string;
  value: number;
}
