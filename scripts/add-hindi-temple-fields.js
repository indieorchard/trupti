/**
 * Adds Hindi translation fields to temples.ts data.
 * Adds deity_name_hi, best_time_hi, elderly_support_notes_hi
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'temples.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Deity name translations
const deityHindi = {
  'Lord Badri Vishal (Vishnu)': 'भगवान बद्री विशाल (विष्णु)',
  'Lord Jagannath, Balabhadra & Subhadra': 'भगवान जगन्नाथ, बलभद्र एवं सुभद्रा',
  'Lord Dwarkadhish (Krishna)': 'भगवान द्वारकाधीश (कृष्ण)',
  'Lord Ramanathaswamy (Jyotirlinga)': 'भगवान रामनाथस्वामी (ज्योतिर्लिंग)',
  'Lord Kedarnath (Shiva Jyotirlinga)': 'भगवान केदारनाथ (शिव ज्योतिर्लिंग)',
  'Goddess Ganga (Gangotri)': 'माता गंगा (गंगोत्री)',
  'Goddess Yamuna (Yamunotri)': 'माता यमुना (यमुनोत्री)',
  'Lord Somnath (Shiva Jyotirlinga)': 'भगवान सोमनाथ (शिव ज्योतिर्लिंग)',
  'Lord Mallikarjuna (Shiva)': 'भगवान मल्लिकार्जुन (शिव)',
  'Lord Mahakaleshwar (Shiva)': 'भगवान महाकालेश्वर (शिव)',
  'Lord Omkareshwar (Shiva)': 'भगवान ओंकारेश्वर (शिव)',
  'Lord Bhimashankar (Shiva)': 'भगवान भीमाशंकर (शिव)',
  'Lord Vishwanath (Shiva Jyotirlinga)': 'भगवान विश्वनाथ (शिव ज्योतिर्लिंग)',
  'Lord Trimbakeshwar (Shiva)': 'भगवान त्र्यम्बकेश्वर (शिव)',
  'Lord Vaidyanath (Shiva)': 'भगवान वैद्यनाथ (शिव)',
  'Lord Nageshwar (Shiva)': 'भगवान नागेश्वर (शिव)',
  'Lord Grishneshwar (Shiva)': 'भगवान घृष्णेश्वर (शिव)',
  'Lord Rama': 'भगवान श्री राम',
  'Lord Krishna': 'भगवान श्री कृष्ण',
  'Lord Vishnu': 'भगवान विष्णु',
  'Goddess Kamakshi': 'माता कामाक्षी',
  'Goddess Vaishno Devi': 'माता वैष्णो देवी',
  'Goddess Kamakhya': 'माता कामाख्या',
  'Goddess Kali': 'माता काली',
  'Goddess Mahalakshmi': 'माता महालक्ष्मी',
  'Goddess Chamundeshwari': 'माता चामुण्डेश्वरी',
  'Goddess Meenakshi': 'माता मीनाक्षी',
  'Lord Venkateswara (Balaji)': 'भगवान वेंकटेश्वर (बालाजी)',
  'Lord Guruvayurappan (Krishna)': 'भगवान गुरुवायुरप्पन (कृष्ण)',
  'Lord Padmanabhaswamy (Vishnu)': 'भगवान पद्मनाभस्वामी (विष्णु)',
  'Lord Ayyappa': 'भगवान अय्यप्पा',
  'Lord Ranganatha (Vishnu)': 'भगवान रंगनाथ (विष्णु)',
  'Lord Brihadisvara (Shiva)': 'भगवान बृहदीश्वर (शिव)',
  'Lord Nataraja (Shiva)': 'भगवान नटराज (शिव)',
  'Lord Siddhivinayak (Ganesha)': 'भगवान सिद्धिविनायक (गणेश)',
  'Sai Baba': 'साईं बाबा',
  'Lord Vithoba (Vishnu)': 'भगवान विठोबा (विष्णु)',
  'Lord Shani Dev': 'भगवान शनि देव',
  'Lord Shrinathji (Krishna)': 'भगवान श्रीनाथजी (कृष्ण)',
  'Lord Brahma': 'भगवान ब्रह्मा',
  'Lord Khatushyam': 'भगवान खाटूश्याम',
  'Lord Bankey Bihari (Krishna)': 'भगवान बांके बिहारी (कृष्ण)',
  'Lord Krishna (Prem Mandir)': 'भगवान कृष्ण (प्रेम मंदिर)',
  'Lord Hanuman': 'भगवान हनुमान',
  'Lord Vishnu (Vishnupad)': 'भगवान विष्णु (विष्णुपद)',
  'Goddess Dakshina Kali': 'माता दक्षिणा काली',
  'Lord Lingaraj (Shiva)': 'भगवान लिंगराज (शिव)',
  'Lord Surya (Sun God)': 'भगवान सूर्य देव',
  'Lord Swaminarayan': 'भगवान स्वामीनारायण',
  'Lord Tungnath (Shiva)': 'भगवान तुंगनाथ (शिव)',
};

// Best time translations
const bestTimeHindi = {
  'May to October (closed in winter)': 'मई से अक्टूबर (शीतकाल में बंद)',
  'October to March; Rath Yatra (June/July)': 'अक्टूबर से मार्च; रथ यात्रा (जून/जुलाई)',
  'October to March': 'अक्टूबर से मार्च',
  'October to April': 'अक्टूबर से अप्रैल',
  'November to February': 'नवंबर से फरवरी',
  'October to February': 'अक्टूबर से फरवरी',
  'Year-round': 'वर्षभर',
  'Year-round; Maha Shivaratri': 'वर्षभर; महाशिवरात्रि',
  'Year-round; Navratri': 'वर्षभर; नवरात्रि',
  'Year-round; Kartik Purnima': 'वर्षभर; कार्तिक पूर्णिमा',
  'Year-round; Janmashtami': 'वर्षभर; जन्माष्टमी',
  'Year-round; Dussehra': 'वर्षभर; दशहरा',
  'Year-round; Ganesh Chaturthi': 'वर्षभर; गणेश चतुर्थी',
  'Year-round; Pongal & Vaikunta Ekadasi': 'वर्षभर; पोंगल एवं वैकुंठ एकादशी',
  'January to March; Ambubachi Mela (June)': 'जनवरी से मार्च; अम्बुबाची मेला (जून)',
  'November to February; Makar Sankranti pilgrimage season': 'नवंबर से फरवरी; मकर संक्रांति तीर्थ काल',
  'May to June; October to November': 'मई से जून; अक्टूबर से नवंबर',
  'September to March': 'सितंबर से मार्च',
  'July to September; year-round': 'जुलाई से सितंबर; वर्षभर',
};

// Elderly support notes translations
const elderlyHindi = {
  'Helicopter services available from Dehradun/Phata; palanquin (doli) and pony services readily accessible.':
    'देहरादून/फाटा से हेलीकॉप्टर सेवा उपलब्ध; पालकी (डोली) एवं घोड़ा सेवा सुलभ।',
  'Battery cars run from Grand Road. Special Senior citizen assistance counters managed by temple police.':
    'ग्रैंड रोड से बैटरी कार सेवा। मंदिर पुलिस द्वारा वरिष्ठ नागरिक सहायता काउंटर।',
  'Wheelchair access via Swarg Dwar ramp. Elevators installed for elderly pilgrims to view main sanctum.':
    'स्वर्ग द्वार रैंप से व्हीलचेयर पहुँच। वरिष्ठ तीर्थयात्रियों हेतु लिफ्ट सुविधा।',
  'Special senior citizen line for direct sanctum darshan; motorized wheelchairs available at main gate.':
    'वरिष्ठ नागरिकों हेतु विशेष गर्भगृह दर्शन कतार; मुख्य द्वार पर मोटराइज़्ड व्हीलचेयर उपलब्ध।',
  'Helicopter services and palanquins/ponies available from Phata/Guptkashi for elderly pilgrims.':
    'फाटा/गुप्तकाशी से वरिष्ठ तीर्थयात्रियों हेतु हेलीकॉप्टर एवं पालकी/टट्टू सेवा।',
  'Palanquin and pony services available; gentle slopes leading to temple.':
    'पालकी एवं टट्टू सेवा उपलब्ध; मंदिर तक सौम्य ढलान।',
  'Paved walkways with railings around temple and along main ghats; volunteer assistance available during aarti.':
    'मंदिर एवं मुख्य घाटों पर रेलिंग सहित पक्की पगडंडियाँ; आरती के समय स्वयंसेवक सहायता।',
  'Battery car service available from city center; elderly-friendly ramp access to main sanctum.':
    'शहर केंद्र से बैटरी कार सेवा; गर्भगृह तक वरिष्ठ-मित्र रैंप पहुँच।',
  'Auto-rickshaws available from nearby Khatu town; temple trust arranges special darshan for differently-abled.':
    'निकटवर्ती खाटू नगर से ऑटो उपलब्ध; मंदिर ट्रस्ट दिव्यांगजनों हेतु विशेष दर्शन व्यवस्था।',
  'Bhawan Board provides free battery car service, helicopter service from Katra.':
    'भवन बोर्ड निःशुल्क बैटरी कार सेवा प्रदान करता है; कटरा से हेलीकॉप्टर सेवा।',
};

// Add Hindi fields after each English field
for (const [en, hi] of Object.entries(deityHindi)) {
  const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(deity_name:\\s*'${escaped}')`, 'g');
  content = content.replace(regex, `$1,\n    deity_name_hi: '${hi}'`);
}

for (const [en, hi] of Object.entries(bestTimeHindi)) {
  const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(best_time:\\s*'${escaped}')`, 'g');
  content = content.replace(regex, `$1,\n    best_time_hi: '${hi}'`);
}

for (const [en, hi] of Object.entries(elderlyHindi)) {
  const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(elderly_support_notes:\\s*'${escaped}')`, 'g');
  content = content.replace(regex, `$1,\n      elderly_support_notes_hi: '${hi}'`);
}

fs.writeFileSync(filePath, content, 'utf-8');

// Count what we added
const deityHiCount = (content.match(/deity_name_hi/g) || []).length;
const bestHiCount = (content.match(/best_time_hi/g) || []).length;
const elderlyHiCount = (content.match(/elderly_support_notes_hi/g) || []).length;
console.log(`Added: ${deityHiCount} deity_name_hi, ${bestHiCount} best_time_hi, ${elderlyHiCount} elderly_support_notes_hi`);
