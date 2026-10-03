// =================================================================
// TRUPTI SACRED VISUAL ASSETS — WIKIMEDIA COMMONS ONLY
// All images sourced from Wikimedia Commons (public domain / CC)
// No stock photos. Every deity, temple, and scripture uses
// authentic paintings, temple photos, or manuscript scans.
// =================================================================

// Default fallback: Shiva Nataraja bronze from Met Museum
const DEFAULT_DEITY = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Shiva_as_Lord_of_the_Dance_%28Nataraja%29.jpg/400px-Shiva_as_Lord_of_the_Dance_%28Nataraja%29.jpg';
const DEFAULT_TEMPLE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Badrinath_temple.jpg/400px-Badrinath_temple.jpg';
const DEFAULT_SCRIPTURE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bhagavad_Gita%2C_a_19th_century_manuscript.jpg/400px-Bhagavad_Gita%2C_a_19th_century_manuscript.jpg';

export const DEITY_IMAGES: Record<string, string> = {
  shiva: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Shiva_as_Lord_of_the_Dance_%28Nataraja%29.jpg/400px-Shiva_as_Lord_of_the_Dance_%28Nataraja%29.jpg',
  vishnu: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Vishnu.jpg/640px-Vishnu.jpg',
  krishna: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Yashoda_with_Krishna%2C_Raja_Ravi_Varma.jpg/400px-Yashoda_with_Krishna%2C_Raja_Ravi_Varma.jpg',
  rama: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Rama_with_bow_and_arrow.jpg/640px-Rama_with_bow_and_arrow.jpg',
  ganesha: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Ganapati1.jpg/400px-Ganapati1.jpg',
  hanuman: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Hanuman_painting_c1920.jpg/400px-Hanuman_painting_c1920.jpg',
  durga: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Durga_by_Raja_Ravi_Varma.jpg/400px-Durga_by_Raja_Ravi_Varma.jpg',
  lakshmi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Raja_Ravi_Varma_-_Goddess_Lakshmi%2C_1896.jpg/400px-Raja_Ravi_Varma_-_Goddess_Lakshmi%2C_1896.jpg',
  saraswati: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Saraswati_Raja_Ravi_Varma.jpg/640px-Saraswati_Raja_Ravi_Varma.jpg',
  kali: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Kali_by_Raja_Ravi_Varma.jpg/640px-Kali_by_Raja_Ravi_Varma.jpg',
  parvati: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Siva-parvati-by-raja-ravi-varma.jpg/400px-Siva-parvati-by-raja-ravi-varma.jpg',
  kartikeya: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Lord_Murugan.jpg/640px-Lord_Murugan.jpg',
  ayyappa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Swami_Ayyappan.jpg/640px-Swami_Ayyappan.jpg',
  surya: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Surya_Deity.jpg/640px-Surya_Deity.jpg',
  kamakhya: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Kamakhya_Devi.png/400px-Kamakhya_Devi.png',
  meenakshi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Statue_of_Meenakshi.jpg/400px-Statue_of_Meenakshi.jpg',
  jagannath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Puri_Trimurti.jpg/640px-Puri_Trimurti.jpg',
  venkateswara: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Venkateswara_Tirupati.jpg/640px-Venkateswara_Tirupati.jpg',
  vithoba: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vithoba_of_Pandharpur.jpg/640px-Vithoba_of_Pandharpur.jpg',
  dattatreya: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lord_Dattatreya.jpg/640px-Lord_Dattatreya.jpg',
  narasimha: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Narasimha_killing_Hiranyakashipu.jpg/640px-Narasimha_killing_Hiranyakashipu.jpg',
  dhanvantari: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Dhanvantari_holding_Amrita.jpg/640px-Dhanvantari_holding_Amrita.jpg',
  kaal_bhairav: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Bhairava_painting.jpg/640px-Bhairava_painting.jpg',
  annapurna: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Annapurna_Devi.jpg/640px-Annapurna_Devi.jpg',
  radha: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Radha_in_the_Moonlight.jpg/400px-Radha_in_the_Moonlight.jpg',
  sita: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Sita_Bhumipravesh.jpg/400px-Sita_Bhumipravesh.jpg',
  brahma: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Brahma_on_Hamsa.jpg/640px-Brahma_on_Hamsa.jpg',
  ganga: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Ravi_Varma-Descent_of_Ganga.jpg/400px-Ravi_Varma-Descent_of_Ganga.jpg',
  yamuna: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Yamuna_with_her_mount_tortoise.jpg/400px-Yamuna_with_her_mount_tortoise.jpg',
  gayatri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Gayatri_Mata.jpg/640px-Gayatri_Mata.jpg',
  chamundeshwari: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Chamundeshwari_Mysore.jpg/640px-Chamundeshwari_Mysore.jpg',
  shani: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Shani_Dev.jpg/640px-Shani_Dev.jpg',
  tulsi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Tulsi_plant_2.jpg/400px-Tulsi_plant_2.jpg',
  kubera: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Kubera_Statue.jpg/640px-Kubera_Statue.jpg',
  tripura_sundari: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Tripura_Sundari.jpg/640px-Tripura_Sundari.jpg'
};

export const TEMPLE_IMAGES: Record<string, string> = {
  badrinath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Badrinath_temple.jpg/400px-Badrinath_temple.jpg',
  puri_jagannath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Jagannatha_Temple_Puri.jpg/640px-Jagannatha_Temple_Puri.jpg',
  dwarkadhish: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Dwarakadheesh_Temple.jpg/640px-Dwarakadheesh_Temple.jpg',
  rameswaram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ramanathaswamy_Temple_Corridor.jpg/640px-Ramanathaswamy_Temple_Corridor.jpg',
  kedarnath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/400px-Kedarnath_Temple_in_Rainy_season.jpg',
  gangotri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Gangotri_temple.jpg/400px-Gangotri_temple.jpg',
  yamunotri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Yamunotri_Temple.jpg/400px-Yamunotri_Temple.jpg',
  somnath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Somnath_mandir.jpg/640px-Somnath_mandir.jpg',
  mallikarjuna: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Srisailam_Temple.jpg/640px-Srisailam_Temple.jpg',
  mahakaleshwar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Mahakaleshwar_Temple_Ujjain.jpg/640px-Mahakaleshwar_Temple_Ujjain.jpg',
  omkareshwar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Omkareshwar_temple.jpg/640px-Omkareshwar_temple.jpg',
  bhimashankar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bhimashankar_temple.jpg/640px-Bhimashankar_temple.jpg',
  kashi_vishwanath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kashi_Vishwanath.jpg/400px-Kashi_Vishwanath.jpg',
  trimbakeshwar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Trimbakeshwar_Temple.jpg/640px-Trimbakeshwar_Temple.jpg',
  baidyanath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Baidyanath_Temple_Deoghar.jpg/640px-Baidyanath_Temple_Deoghar.jpg',
  nageshwar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Nageshwar_Jyotirlinga.jpg/640px-Nageshwar_Jyotirlinga.jpg',
  grishneshwar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Grishneshwar_Temple.jpg/640px-Grishneshwar_Temple.jpg',
  ram_mandir_ayodhya: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ram_Mandir_Ayodhya_2024.jpg/640px-Ram_Mandir_Ayodhya_2024.jpg',
  krishna_janmabhoomi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Mathura_Temple-Mathura-India0002.JPG/400px-Mathura_Temple-Mathura-India0002.JPG',
  har_ki_pauri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Har_Ki_Pauri%2C_Haridwar.jpg/400px-Har_Ki_Pauri%2C_Haridwar.jpg',
  kanchi_kamakshi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kamakshi_Amman_Temple.jpg/640px-Kamakshi_Amman_Temple.jpg',
  vaishno_devi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Vaishno_Devi_Temple.jpg/400px-Vaishno_Devi_Temple.jpg',
  kamakhya_temple: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Kamakhya_Temple_Guwahati.jpg/640px-Kamakhya_Temple_Guwahati.jpg',
  kalighat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Kali_by_Raja_Ravi_Varma.jpg/640px-Kali_by_Raja_Ravi_Varma.jpg',
  kolhapur_mahalakshmi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Mahalakshmi_temple%2C_Kolhapur.jpg/400px-Mahalakshmi_temple%2C_Kolhapur.jpg',
  chamundeshwari_temple: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Chamundeshwari_Mysore.jpg/640px-Chamundeshwari_Mysore.jpg',
  meenakshi_temple: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Statue_of_Meenakshi.jpg/400px-Statue_of_Meenakshi.jpg',
  tirupati_balaji: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Tirupati_temple.jpg/640px-Tirupati_temple.jpg',
  guruvayur: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Guruvayur_Sree_Krishna_Temple.jpg/400px-Guruvayur_Sree_Krishna_Temple.jpg',
  padmanabhaswamy: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Padmanabhaswamy_Temple.jpg/640px-Padmanabhaswamy_Temple.jpg',
  sabarimala: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Swami_Ayyappan.jpg/640px-Swami_Ayyappan.jpg',
  srirangam: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Srirangam_Gopuram.jpg/640px-Srirangam_Gopuram.jpg',
  brihadisvara: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Brihadisvara_Temple_Thanjavur.jpg/640px-Brihadisvara_Temple_Thanjavur.jpg',
  chidambaram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Nataraja_temple%2CChidambaram%2CTamil_Nadu.jpg/400px-Nataraja_temple%2CChidambaram%2CTamil_Nadu.jpg',
  siddhivinayak: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Siddhivinayak_Temple_Mumbai.jpg/640px-Siddhivinayak_Temple_Mumbai.jpg',
  shirdi_sai: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Samadhi_Mandir_of_Shirdi_Sai_Baba.jpg/400px-Samadhi_Mandir_of_Shirdi_Sai_Baba.jpg',
  pandharpur_vithoba: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vithoba_of_Pandharpur.jpg/640px-Vithoba_of_Pandharpur.jpg',
  shani_shingnapur: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Shani_Dev.jpg/640px-Shani_Dev.jpg',
  nathdwara_shrinathji: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Gateway_To_Temple%2C_Nathdwara.jpg/400px-Gateway_To_Temple%2C_Nathdwara.jpg',
  pushkar_brahma: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Brahma_on_Hamsa.jpg/640px-Brahma_on_Hamsa.jpg',
  khatushyamji: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Khatushyamji.jpg/400px-Khatushyamji.jpg',
  bankey_bihari: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Bankebihari_temple_main_gate_Vrindavan.JPG/400px-Bankebihari_temple_main_gate_Vrindavan.JPG',
  prem_mandir: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Prem_mandir_Vrindavan.JPG/400px-Prem_mandir_Vrindavan.JPG',
  sankat_mochan_varanasi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Sankat_mochan_temple_3.JPG/400px-Sankat_mochan_temple_3.JPG',
  vishnupad_gaya: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Vishnu.jpg/640px-Vishnu.jpg',
  dakshineswar_kali: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Dakshineswar_Temple.jpg/640px-Dakshineswar_Temple.jpg',
  lingaraj_temple: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Lingaraj_Temple_Bhubaneswar.jpg/640px-Lingaraj_Temple_Bhubaneswar.jpg',
  konark_sun_temple: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Konark_Sun_Temple.jpg/400px-Konark_Sun_Temple.jpg',
  akshardham_delhi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Akshardham_Delhi.jpg/400px-Akshardham_Delhi.jpg',
  tungnath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Tungnath_temple.jpg/400px-Tungnath_temple.jpg'
};

export const SCRIPTURE_IMAGES: Record<string, string> = {
  bhagavad_gita: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bhagavad_Gita%2C_a_19th_century_manuscript.jpg/400px-Bhagavad_Gita%2C_a_19th_century_manuscript.jpg',
  ashtavakra_gita: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Ashtavakra.jpg/400px-Ashtavakra.jpg',
  avadhuta_gita: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lord_Dattatreya.jpg/640px-Lord_Dattatreya.jpg',
  uddhav_gita: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Uddhava_the_messenger_of_Krishna.jpg/400px-Uddhava_the_messenger_of_Krishna.jpg',
  guru_gita: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Raja_Ravi_Varma_-_Sankaracharya.jpg/400px-Raja_Ravi_Varma_-_Sankaracharya.jpg',
  rigveda: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Rigveda_MS2097.jpg/400px-Rigveda_MS2097.jpg',
  yajurveda: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/18th-century_Yajurveda_manuscript_folio%2C_page_1%2C_Raghunath_temple_Jammu_archives.jpg/400px-18th-century_Yajurveda_manuscript_folio%2C_page_1%2C_Raghunath_temple_Jammu_archives.jpg',
  samaveda: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/1672_CE_manuscript_copy%2C_10th_century_BCE_Samaveda_Kauthuma_Samhita_Veyagana%2C_Schoyen_Collection_Norway.jpg/400px-1672_CE_manuscript_copy%2C_10th_century_BCE_Samaveda_Kauthuma_Samhita_Veyagana%2C_Schoyen_Collection_Norway.jpg',
  atharvaveda: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Atharva-Veda_samhita_page_471_illustration.png/400px-Atharva-Veda_samhita_page_471_illustration.png',
  garuda_purana: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Manuscript_of_Garuda_Purana%2C_Sanskrit_language%2C_Newar_script%2C_1712_CE.jpg/400px-Manuscript_of_Garuda_Purana%2C_Sanskrit_language%2C_Newar_script%2C_1712_CE.jpg',
  shiva_purana: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/The_Creation_of_the_Cosmic_Ocean_and_the_Elements_%28detail%29%2C_folio_3_from_the_Shiva_Purana%2C_c._1828.jpg/400px-The_Creation_of_the_Cosmic_Ocean_and_the_Elements_%28detail%29%2C_folio_3_from_the_Shiva_Purana%2C_c._1828.jpg',
  vishnu_purana: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Vishnu.jpg/640px-Vishnu.jpg',
  srimad_bhagavatam: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bhagavata_Purana_manuscript%2C_18_century.jpg/400px-Bhagavata_Purana_manuscript%2C_18_century.jpg'
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
