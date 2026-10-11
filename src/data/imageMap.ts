// =================================================================
// TRUPTI SACRED VISUAL ASSETS — WIKIMEDIA COMMONS ONLY
// All images sourced from Wikimedia Commons (public domain / CC)
// No stock photos. Every deity, temple, and scripture uses
// authentic paintings, temple photos, or manuscript scans.
// =================================================================

// Default fallback: Shiva Nataraja bronze from Met Museum
const DEFAULT_DEITY = '/images/deities/shiva.jpg';
const DEFAULT_TEMPLE = '/images/temples/badrinath.jpg';
const DEFAULT_SCRIPTURE = '/images/scriptures/bhagavad_gita.jpg';

export const DEITY_IMAGES: Record<string, string> = {
  shiva: '/images/deities/shiva.jpg',
  vishnu: '/images/deities/vishnu.jpg',
  krishna: '/images/deities/krishna.jpg',
  rama: '/images/deities/rama.jpg',
  ganesha: '/images/deities/ganesha.jpg',
  hanuman: '/images/deities/hanuman.jpg',
  durga: '/images/deities/durga.jpg',
  lakshmi: '/images/deities/lakshmi.jpg',
  saraswati: '/images/deities/saraswati.jpg',
  kali: '/images/deities/kali.jpg',
  parvati: '/images/deities/parvati.jpg',
  kartikeya: '/images/deities/kartikeya.jpg',
  ayyappa: '/images/deities/ayyappa.jpg',
  surya: '/images/deities/surya.jpg',
  kamakhya: '/images/deities/kamakhya.jpg',
  meenakshi: '/images/deities/meenakshi.jpg',
  jagannath: '/images/deities/jagannath.jpg',
  venkateswara: '/images/deities/venkateswara.jpg',
  vithoba: '/images/deities/vithoba.jpg',
  dattatreya: '/images/deities/dattatreya.jpg',
  narasimha: '/images/deities/narasimha.jpg',
  dhanvantari: '/images/deities/dhanvantari.jpg',
  kaal_bhairav: '/images/deities/kaal_bhairav.jpg',
  annapurna: '/images/deities/annapurna.jpg',
  radha: '/images/deities/radha.jpg',
  sita: '/images/deities/sita.jpg',
  brahma: '/images/deities/brahma.jpg',
  ganga: '/images/deities/ganga.jpg',
  yamuna: '/images/deities/yamuna.jpg',
  gayatri: '/images/deities/gayatri.jpg',
  chamundeshwari: '/images/deities/chamundeshwari.jpg',
  shani: '/images/deities/shani.jpg',
  tulsi: '/images/deities/tulsi.jpg',
  kubera: '/images/deities/kubera.jpg',
  tripura_sundari: '/images/deities/tripura_sundari.jpg'
};

export const TEMPLE_IMAGES: Record<string, string> = {
  badrinath: '/images/temples/badrinath.jpg',
  puri_jagannath: '/images/temples/puri_jagannath.jpg',
  dwarkadhish: '/images/temples/dwarkadhish.jpg',
  rameswaram: '/images/temples/rameswaram.jpg',
  kedarnath: '/images/temples/kedarnath.jpg',
  gangotri: '/images/temples/gangotri.jpg',
  yamunotri: '/images/temples/yamunotri.jpg',
  somnath: '/images/temples/somnath.jpg',
  mallikarjuna: '/images/temples/mallikarjuna.jpg',
  mahakaleshwar: '/images/temples/mahakaleshwar.jpg',
  omkareshwar: '/images/temples/omkareshwar.jpg',
  bhimashankar: '/images/temples/bhimashankar.jpg',
  kashi_vishwanath: '/images/temples/kashi_vishwanath.jpg',
  trimbakeshwar: '/images/temples/trimbakeshwar.jpg',
  baidyanath: '/images/temples/baidyanath.jpg',
  nageshwar: '/images/temples/nageshwar.jpg',
  grishneshwar: '/images/temples/grishneshwar.jpg',
  ram_mandir_ayodhya: '/images/temples/ram_mandir_ayodhya.jpg',
  krishna_janmabhoomi: '/images/temples/krishna_janmabhoomi.jpg',
  har_ki_pauri: '/images/temples/har_ki_pauri.jpg',
  kanchi_kamakshi: '/images/temples/kanchi_kamakshi.jpg',
  vaishno_devi: '/images/temples/vaishno_devi.jpg',
  kamakhya_temple: '/images/temples/kamakhya_temple.jpg',
  kalighat: '/images/temples/kalighat.jpg',
  kolhapur_mahalakshmi: '/images/temples/kolhapur_mahalakshmi.jpg',
  chamundeshwari_temple: '/images/temples/chamundeshwari_temple.jpg',
  meenakshi_temple: '/images/temples/meenakshi_temple.jpg',
  tirupati_balaji: '/images/temples/tirupati_balaji.jpg',
  guruvayur: '/images/temples/guruvayur.jpg',
  padmanabhaswamy: '/images/temples/padmanabhaswamy.jpg',
  sabarimala: '/images/temples/sabarimala.jpg',
  srirangam: '/images/temples/srirangam.jpg',
  brihadisvara: '/images/temples/brihadisvara.jpg',
  chidambaram: '/images/temples/chidambaram.jpg',
  siddhivinayak: '/images/temples/siddhivinayak.jpg',
  shirdi_sai: '/images/temples/shirdi_sai.jpg',
  pandharpur_vithoba: '/images/temples/pandharpur_vithoba.jpg',
  shani_shingnapur: '/images/temples/shani_shingnapur.jpg',
  nathdwara_shrinathji: '/images/temples/nathdwara_shrinathji.jpg',
  pushkar_brahma: '/images/temples/pushkar_brahma.jpg',
  khatushyamji: '/images/temples/khatushyamji.jpg',
  bankey_bihari: '/images/temples/bankey_bihari.jpg',
  prem_mandir: '/images/temples/prem_mandir.jpg',
  sankat_mochan_varanasi: '/images/temples/sankat_mochan_varanasi.jpg',
  vishnupad_gaya: '/images/temples/vishnupad_gaya.jpg',
  dakshineswar_kali: '/images/temples/dakshineswar_kali.jpg',
  lingaraj_temple: '/images/temples/lingaraj_temple.jpg',
  konark_sun_temple: '/images/temples/konark_sun_temple.jpg',
  akshardham_delhi: '/images/temples/akshardham_delhi.jpg',
  tungnath: '/images/temples/tungnath.jpg'
};

export const SCRIPTURE_IMAGES: Record<string, string> = {
  bhagavad_gita: '/images/scriptures/bhagavad_gita.jpg',
  ashtavakra_gita: '/images/scriptures/ashtavakra_gita.jpg',
  avadhuta_gita: '/images/scriptures/avadhuta_gita.jpg',
  uddhav_gita: '/images/scriptures/uddhav_gita.jpg',
  guru_gita: '/images/scriptures/guru_gita.jpg',
  rigveda: '/images/scriptures/rigveda.jpg',
  yajurveda: '/images/scriptures/yajurveda.jpg',
  samaveda: '/images/scriptures/samaveda.jpg',
  atharvaveda: '/images/scriptures/atharvaveda.jpg',
  garuda_purana: '/images/scriptures/garuda_purana.jpg',
  shiva_purana: '/images/scriptures/shiva_purana.jpg',
  vishnu_purana: '/images/scriptures/vishnu_purana.jpg',
  srimad_bhagavatam: '/images/scriptures/srimad_bhagavatam.jpg'
};

/**
 * Resolves the primary image URL for any deity
 */
export function getDeityImage(deityId?: string): string {
  if (!deityId) return DEFAULT_DEITY;
  return DEITY_IMAGES[deityId.toLowerCase()] || DEFAULT_DEITY;
}

/**
 * Resolves temple image with circuit fallback
 */
export function getTempleImage(templeId: string, circuit?: string[]): string {
  if (TEMPLE_IMAGES[templeId]) return TEMPLE_IMAGES[templeId];
  return DEFAULT_TEMPLE;
}

/**
 * Resolves image for a chant, aarti, or chalisa by looking up its presiding deity
 */
export function getChantImage(deityId?: string, category?: string): string {
  if (deityId && DEITY_IMAGES[deityId.toLowerCase()]) {
    return DEITY_IMAGES[deityId.toLowerCase()];
  }
  return DEFAULT_DEITY;
}

/**
 * Resolves image for any scripture
 */
export function getScriptureImage(scriptureId: string): string {
  return SCRIPTURE_IMAGES[scriptureId] || DEFAULT_SCRIPTURE;
}
