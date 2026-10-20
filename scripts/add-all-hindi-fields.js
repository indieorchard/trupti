/**
 * Comprehensive Hindi translation for ALL temple fields.
 * Adds deity_name_hi, best_time_hi, elderly_support_notes_hi for every temple.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'temples.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// First, remove any existing _hi fields so we don't duplicate
content = content.replace(/,\n\s*deity_name_hi: '[^']*'/g, '');
content = content.replace(/,\n\s*best_time_hi: '[^']*'/g, '');
content = content.replace(/,\n\s*elderly_support_notes_hi: '[^']*'/g, '');

// ============ DEITY NAME TRANSLATIONS ============
const deityHindi = {
  "Lord Badri Vishal (Vishnu)": "भगवान बद्री विशाल (विष्णु)",
  "Lord Jagannath, Balabhadra & Subhadra": "भगवान जगन्नाथ, बलभद्र एवं सुभद्रा",
  "Lord Dwarkadhish (Krishna)": "भगवान द्वारकाधीश (कृष्ण)",
  "Lord Ramanathaswamy (Jyotirlinga)": "भगवान रामनाथस्वामी (ज्योतिर्लिंग)",
  "Lord Kedarnath (Jyotirlinga)": "भगवान केदारनाथ (ज्योतिर्लिंग)",
  "Goddess Ganga & Lord Vishnu (Charan Paduka)": "माता गंगा एवं भगवान विष्णु (चरण पादुका)",
  "Goddess Ganga": "माता गंगा",
  "Goddess Yamuna": "माता यमुना",
  "Lord Somnath (First Jyotirlinga)": "भगवान सोमनाथ (प्रथम ज्योतिर्लिंग)",
  "Lord Mallikarjuna & Goddess Bhramaramba": "भगवान मल्लिकार्जुन एवं माता भ्रमराम्बा",
  "Lord Mahakaleshwar (Dakshinabhimukhi)": "भगवान महाकालेश्वर (दक्षिणाभिमुखी)",
  "Lord Omkareshwar & Mamleshwar": "भगवान ओंकारेश्वर एवं ममलेश्वर",
  "Lord Bhimashankar": "भगवान भीमाशंकर",
  "Lord Vishwanath (Kashi Ke Nath)": "भगवान विश्वनाथ (काशी के नाथ)",
  "Lord Trimbakeshwar (Trimurti Lingam)": "भगवान त्र्यम्बकेश्वर (त्रिमूर्ति लिंगम)",
  "Lord Baidyanath (Vaidyanatha)": "भगवान बैद्यनाथ (वैद्यनाथ)",
  "Lord Nageshwar (Protector from Poisons)": "भगवान नागेश्वर (विष से रक्षक)",
  "Lord Grishneshwar (12th Jyotirlinga)": "भगवान घृष्णेश्वर (12वाँ ज्योतिर्लिंग)",
  "Lord Venkateswara (Balaji)": "भगवान वेंकटेश्वर (बालाजी)",
  "Guruvayurappan (Unnikrishnan)": "गुरुवायूरप्पन (उन्नीकृष्णन)",
  "Lord Padmanabha in Ananthasayanam": "भगवान पद्मनाभ (अनन्तशयनम)",
  "Lord Ayyappa (Swamiye Saranam Ayyappa)": "भगवान अय्यप्पा (स्वामिये शरणम अय्यप्पा)",
  "Lord Ranganatha (Adisesha Sayanam)": "भगवान रंगनाथ (आदिशेष शयनम)",
  "Lord Shiva (Brihadeeswara)": "भगवान शिव (बृहदीश्वर)",
  "Lord Nataraja (Ananda Tandava) & Chidambara Rahasya": "भगवान नटराज (आनंद तांडव) एवं चिदम्बर रहस्य",
  "Lord Siddhivinayak (Right-Trunk Ganesha)": "भगवान सिद्धिविनायक (दक्षिण मुखी गणेश)",
  "Shri Sai Baba (Samadhi)": "श्री साईं बाबा (समाधि)",
  "Lord Vitthala (Vithoba) & Rakhumai": "भगवान विठ्ठल (विठोबा) एवं रखुमाई",
  "Lord Shani Deva (Swayambhu Black Stone)": "भगवान शनि देव (स्वयंभू काला पत्थर)",
  "Lord Shrinathji (Govardhannath)": "भगवान श्रीनाथजी (गोवर्धननाथ)",
  "Lord Brahma & Gayatri": "भगवान ब्रह्मा एवं गायत्री",
  "Barbarika / Shyam Baba (Sheesh Ke Daani)": "बर्बरीक / श्याम बाबा (शीश के दानी)",
  "Lord Bankey Bihari (Tribhanga Krishna)": "भगवान बांके बिहारी (त्रिभंग कृष्ण)",
  "Radha Krishna & Sita Rama": "राधा कृष्ण एवं सीता राम",
  "Lord Sri Krishna (Bal Gopal)": "भगवान श्री कृष्ण (बाल गोपाल)",
  "Lord Sankat Mochan Hanuman": "भगवान संकट मोचन हनुमान",
  "Bhagavan Sri Ram Lalla Sarkar": "भगवान श्री राम लला सरकार",
  "Lord Vishnu (40 cm footprint on rock)": "भगवान विष्णु (शिला पर 40 सेमी चरण चिह्न)",
  "Maa Bhavatarini (Kali)": "माँ भवतारिणी (काली)",
  "Maa Kali (Muktakeshi)": "माँ काली (मुक्तकेशी)",
  "Goddess Kamakhya (Yoni Peetha)": "माता कामाख्या (योनि पीठ)",
  "Goddess Mahalakshmi (Ambabai)": "माता महालक्ष्मी (अम्बाबाई)",
  "Goddess Meenakshi & Lord Sundareswarar": "माता मीनाक्षी एवं भगवान सुंदरेश्वर",
  "Goddess Kamakshi (Lalitha Maha Tripura Sundari)": "माता कामाक्षी (ललिता महा त्रिपुर सुंदरी)",
  "Goddess Chamundeshwari": "माता चामुण्डेश्वरी",
  "Goddess Biraja & Nabhi Gaya Pitru Tirtha": "माता बिरजा एवं नाभि गया पितृ तीर्थ",
  "Bhagwan Swaminarayan": "भगवान स्वामीनारायण",
  "Lord Surya (Sun God chariot)": "भगवान सूर्य देव (रथ)",
  "Lord Surya Narayana": "भगवान सूर्य नारायण",
  "Maa Vaishno Devi": "माँ वैष्णो देवी",
  "Goddess Vaishno Devi": "माँ वैष्णो देवी",
  "Lord Arunachaleswarar (Agni Tattva Lingam)": "भगवान अरुणाचलेश्वर (अग्नि तत्व लिंगम)",
  "Lord Balakrishna (Navagraha Kindi)": "भगवान बालकृष्ण (नवग्रह किंडी)",
  "Lord Dhandayuthapani (Murugan)": "भगवान दण्डायुधपाणि (मुरुगन)",
  "Lord Kartikeya (Subrahmanya)": "भगवान कार्तिकेय (सुब्रह्मण्य)",
  "Lord Harihara (Shiva-Vishnu combined)": "भगवान हरिहर (शिव-विष्णु संयुक्त)",
  "Goddess Sharadamba & Sri Vidyashankara": "माता शारदाम्बा एवं श्री विद्याशंकर",
  "Lord Neelkanth (Shiva)": "भगवान नीलकंठ (शिव)",
  "Lord Shiva & World's 2nd Tallest Shiva Statue": "भगवान शिव एवं विश्व की दूसरी सबसे ऊँची शिव प्रतिमा",
  "Sri Lakshmi Narayani": "श्री लक्ष्मी नारायणी",
  "Maa Amba (Viso Yantra)": "माँ अम्बा (विसो यंत्र)",
  "Maa Jwala Ji (Sacred Eternal Flames)": "माँ ज्वाला जी (पवित्र शाश्वत ज्वालाएँ)",
  "Maa Naina Devi (Eyes of Sati)": "माँ नैना देवी (सती के नेत्र)",
  "Maa Tara (Tantric Mahavidya)": "माँ तारा (तांत्रिक महाविद्या)",
  "Maha Kali, Maha Lakshmi & Maha Saraswati (Pindis)": "महा काली, महा लक्ष्मी एवं महा सरस्वती (पिंडी)",
  "Devi Durga, Lakshmi & Narayana": "देवी दुर्गा, लक्ष्मी एवं नारायण",
  "Lord Tungnath (Highest Shiva Temple on Earth)": "भगवान तुंगनाथ (पृथ्वी पर सर्वोच्च शिव मंदिर)",
};

// ============ BEST TIME TRANSLATIONS ============
const bestTimeHindi = {
  "May to October (closed in winter)": "मई से अक्टूबर (शीतकाल में बंद)",
  "May to October (Akshaya Tritiya to Bhai Dooj)": "मई से अक्टूबर (अक्षय तृतीया से भाई दूज)",
  "May to October": "मई से अक्टूबर",
  "May to June; October to November": "मई से जून; अक्टूबर से नवंबर",
  "October to March; Rath Yatra (June/July)": "अक्टूबर से मार्च; रथ यात्रा (जून/जुलाई)",
  "October to March": "अक्टूबर से मार्च",
  "October to April": "अक्टूबर से अप्रैल",
  "October to April; Shravan month": "अक्टूबर से अप्रैल; श्रावण मास",
  "October to April; Ambubachi Mela (June)": "अक्टूबर से अप्रैल; अम्बुबाची मेला (जून)",
  "October to February": "अक्टूबर से फरवरी",
  "October to February; Shravan month": "अक्टूबर से फरवरी; श्रावण मास",
  "October to March; Maha Shivaratri": "अक्टूबर से मार्च; महाशिवरात्रि",
  "October to March; Kumbh Mela": "अक्टूबर से मार्च; कुम्भ मेला",
  "October to March; Shravan Mela (Kanwar Yatra)": "अक्टूबर से मार्च; श्रावण मेला (कांवड़ यात्रा)",
  "October to March; Dev Deepawali": "अक्टूबर से मार्च; देव दीपावली",
  "October to March; Janmashtami & Holi": "अक्टूबर से मार्च; जन्माष्टमी एवं होली",
  "October to March; Janmashtami, Holi & Radhashtami": "अक्टूबर से मार्च; जन्माष्टमी, होली एवं राधाष्टमी",
  "October to March; Navratri & Janmashtami": "अक्टूबर से मार्च; नवरात्रि एवं जन्माष्टमी",
  "October to March; Phalgun Mela": "अक्टूबर से मार्च; फाल्गुन मेला",
  "October to March; Navratri": "अक्टूबर से मार्च; नवरात्रि",
  "October to March; Ram Navami & Diwali": "अक्टूबर से मार्च; रामनवमी एवं दीपावली",
  "October to March; Pushkar Fair (Kartik Purnima)": "अक्टूबर से मार्च; पुष्कर मेला (कार्तिक पूर्णिमा)",
  "October to March; Kali Puja / Diwali": "अक्टूबर से मार्च; काली पूजा / दीपावली",
  "October to March; Kali Puja": "अक्टूबर से मार्च; काली पूजा",
  "October to March; Sharad Navratri & Mahalaya": "अक्टूबर से मार्च; शारद नवरात्रि एवं महालया",
  "October to March; Chithirai Festival": "अक्टूबर से मार्च; चित्तिरै उत्सव",
  "October to March; Karthigai Deepam": "अक्टूबर से मार्च; कार्तिगै दीपम",
  "October to March; Natyanjali Dance Festival": "अक्टूबर से मार्च; नाट्यांजलि नृत्य उत्सव",
  "October to March; Konark Dance Festival (December)": "अक्टूबर से मार्च; कोणार्क नृत्य उत्सव (दिसंबर)",
  "October to March; Shivaratri (Rukuna Rath Yatra)": "अक्टूबर से मार्च; शिवरात्रि (रुकुण रथ यात्रा)",
  "October to March; Kiranotsav (Jan/Nov)": "अक्टूबर से मार्च; किरणोत्सव (जनवरी/नवंबर)",
  "October to March; Alpashy / Painkuni festival": "अक्टूबर से मार्च; अल्पशी / पंगुनि उत्सव",
  "October to March; Thaipusam & Panguni Uthiram": "अक्टूबर से मार्च; थाईपूसम एवं पंगुनि उत्तिरम",
  "October to March; Paryaya Festival": "अक्टूबर से मार्च; पर्याय उत्सव",
  "November to February": "नवंबर से फरवरी",
  "November to March; Vaikuntha Ekadashi": "नवंबर से मार्च; वैकुंठ एकादशी",
  "November to February; Makar Sankranti pilgrimage season": "नवंबर से फरवरी; मकर संक्रांति तीर्थ काल",
  "Mid-November to Mid-January (Mandala season); Vishu (April)": "मध्य नवंबर से मध्य जनवरी (मंडल काल); विषु (अप्रैल)",
  "September to March; Brahmotsavam": "सितंबर से मार्च; ब्रह्मोत्सवम",
  "September to March; Guru Purnima": "सितंबर से मार्च; गुरु पूर्णिमा",
  "September to March; Annakut / Diwali": "सितंबर से मार्च; अन्नकूट / दीपावली",
  "September to March; Mysuru Dasara": "सितंबर से मार्च; मैसूरु दशहरा",
  "September to March; Bhadrapadi Purnima": "सितंबर से मार्च; भाद्रपदी पूर्णिमा",
  "September to March; Skanda Sashti": "सितंबर से मार्च; स्कंद षष्ठी",
  "September to April; Navratri": "सितंबर से अप्रैल; नवरात्रि",
  "September to February; Pitru Paksha": "सितंबर से फरवरी; पितृ पक्ष",
  "March to November; Navratri": "मार्च से नवंबर; नवरात्रि",
  "January to March; Ambubachi Mela (June)": "जनवरी से मार्च; अम्बुबाची मेला (जून)",
  "July to September; year-round": "जुलाई से सितंबर; वर्षभर",
  "Year-round": "वर्षभर",
  "Year-round; Maha Shivaratri": "वर्षभर; महाशिवरात्रि",
  "Year-round; Navratri": "वर्षभर; नवरात्रि",
  "Year-round; Kartik Purnima": "वर्षभर; कार्तिक पूर्णिमा",
  "Year-round; Janmashtami": "वर्षभर; जन्माष्टमी",
  "Year-round; Dussehra": "वर्षभर; दशहरा",
  "Year-round; Ganesh Chaturthi": "वर्षभर; गणेश चतुर्थी",
  "Year-round; Pongal & Vaikunta Ekadasi": "वर्षभर; पोंगल एवं वैकुंठ एकादशी",
  "Ashadhi Ekadashi; Kartiki Ekadashi; October to March": "आषाढ़ी एकादशी; कार्तिकी एकादशी; अक्टूबर से मार्च",
  "All year round; Kumbh Mela and Kartik Purnima": "वर्षभर; कुम्भ मेला एवं कार्तिक पूर्णिमा",
  "All year round; Navratri & Shravan Ashtami": "वर्षभर; नवरात्रि एवं श्रावण अष्टमी",
  "All year round; Shani Amavasya & Saturdays": "वर्षभर; शनि अमावस्या एवं शनिवार",
  "All year round; Tuesdays and Angaraki Chaturthi": "वर्षभर; मंगलवार एवं अंगारकी चतुर्थी",
  "All year round; Tuesdays and Saturdays": "वर्षभर; मंगलवार एवं शनिवार",
};

// ============ ELDERLY SUPPORT NOTES TRANSLATIONS ============
const elderlyHindi = {
  "Helicopter services available from Dehradun/Phata; palanquin (doli) and pony services readily accessible.":
    "देहरादून/फाटा से हेलीकॉप्टर सेवा उपलब्ध; पालकी (डोली) एवं घोड़ा सेवा सुलभ।",
  "Battery cars run from Grand Road. Special Senior citizen assistance counters managed by temple police.":
    "ग्रैंड रोड से बैटरी कार सेवा। मंदिर पुलिस द्वारा वरिष्ठ नागरिक सहायता काउंटर।",
  "Wheelchair access via Swarg Dwar ramp. Elevators installed for elderly pilgrims to view main sanctum.":
    "स्वर्ग द्वार रैंप से व्हीलचेयर पहुँच। वरिष्ठ तीर्थयात्रियों हेतु लिफ्ट सुविधा।",
  "Special senior citizen line for direct sanctum darshan; motorized wheelchairs available at main gate.":
    "वरिष्ठ नागरिकों हेतु विशेष गर्भगृह दर्शन कतार; मुख्य द्वार पर मोटराइज़्ड व्हीलचेयर उपलब्ध।",
  "Helicopter booking highly recommended for seniors; Kandi and Palki (doli) services available from Gaurikund.":
    "वरिष्ठ नागरिकों के लिए हेलीकॉप्टर बुकिंग अनुशंसित; गौरीकुंड से कंडी एवं पालकी सेवा उपलब्ध।",
  "Vehicles reach near the temple complex; minimal walking required compared to Kedarnath/Yamunotri.":
    "वाहन मंदिर परिसर के निकट पहुँचते हैं; केदारनाथ/यमुनोत्री की तुलना में न्यूनतम पैदल चलना।",
  "6 km trek from Janki Chatti; palanquins (doli) and ponies strongly advised for elderly pilgrims.":
    "जानकी चट्टी से 6 किमी पैदल; वरिष्ठ तीर्थयात्रियों हेतु पालकी एवं टट्टू अनुशंसित।",
  "Fully paved rampways, free wheelchairs, battery buggies from car parking to temple entrance.":
    "पूर्ण पक्की रैंपवे, निःशुल्क व्हीलचेयर, कार पार्किंग से मंदिर प्रवेश तक बैटरी बग्गी।",
  "Dedicated \"Senior Citizen Darshan Queue\" with minimal waiting; elevator facility available near temple trust office.":
    "न्यूनतम प्रतीक्षा के साथ समर्पित वरिष्ठ नागरिक दर्शन कतार; मंदिर ट्रस्ट कार्यालय के पास लिफ्ट।",
  "Mahakal Lok corridor provides battery cars; special ramp lane into sanctum for senior citizens.":
    "महाकाल लोक गलियारे में बैटरी कार; वरिष्ठ नागरिकों हेतु गर्भगृह तक विशेष रैंप।",
  "Suspension bridge (Jhula Pul) connects island with lift service; boats also available across Narmada.":
    "झूला पुल द्वीप को लिफ्ट सेवा से जोड़ता है; नर्मदा पार नाव भी उपलब्ध।",
  "Ramps leading down to the temple; local doli service available for pilgrims unable to climb stairs.":
    "मंदिर तक रैंप; सीढ़ियाँ न चढ़ सकने वाले तीर्थयात्रियों हेतु स्थानीय डोली सेवा।",
  "Kashi Vishwanath Corridor is fully wheelchair-friendly with escalators, elevators, and battery cars from Ghat to Temple.":
    "काशी विश्वनाथ कॉरिडोर पूर्णतः व्हीलचेयर-मित्र; घाट से मंदिर तक एस्केलेटर, लिफ्ट एवं बैटरी कार।",
  "Special senior citizen lane; wheelchair assistance available at east gate entry.":
    "विशेष वरिष्ठ नागरिक लेन; पूर्वी द्वार पर व्हीलचेयर सहायता उपलब्ध।",
  "VIP Pass (Sheeghra Darshanam) available online and on-counter to bypass general rush.":
    "VIP पास (शीघ्र दर्शनम) ऑनलाइन एवं काउंटर पर उपलब्ध।",
  "Spacious flat ground with no major steps; wheelchair access directly into the sanctum hall.":
    "बिना बड़ी सीढ़ियों के विशाल समतल; गर्भगृह हॉल तक सीधी व्हीलचेयर पहुँच।",
  "Ramps available; peaceful temple ambiance with gentle queues on weekdays.":
    "रैंप उपलब्ध; कार्यदिवसों पर शांत मंदिर वातावरण एवं सौम्य कतारें।",
  "Ramps, electric wheelchairs, golf carts, and senior-only special queue assist elderly devotees from the outer gate.":
    "बाहरी द्वार से रैंप, विद्युत व्हीलचेयर, गोल्फ कार्ट एवं वरिष्ठ-विशेष कतार।",
  "Battery rickshaws connect Mathura Junction to Janmabhoomi; wheelchair facility at entry gate.":
    "मथुरा जंक्शन से जन्मभूमि तक बैटरी रिक्शा; प्रवेश द्वार पर व्हीलचेयर सुविधा।",
  "Ramps available leading to ghats; elderly sitting enclosures provided during the evening Ganga Aarti.":
    "घाटों तक रैंप; संध्या गंगा आरती के दौरान वरिष्ठ नागरिकों हेतु बैठने की व्यवस्था।",
  "Wheelchairs available at the temple entrance; minimal steps inside temple praharam.":
    "मंदिर प्रवेश पर व्हीलचेयर उपलब्ध; मंदिर प्राकार में न्यूनतम सीढ़ियाँ।",
  "Battery cars from Ardhkuwari to Bhawan; helicopter service from Katra to Sanjichhat; ropeway from Bhawan to Bhairon Ghati.":
    "अर्धकुमारी से भवन तक बैटरी कार; कटरा से सांझीछत तक हेलीकॉप्टर; भवन से भैरों घाटी तक रोपवे।",
  "VIP defence/senior passes available; stairs have railing support; palanquins available at hilltop parking.":
    "VIP/वरिष्ठ पास उपलब्ध; सीढ़ियों पर रेलिंग; पहाड़ी पार्किंग पर पालकी उपलब्ध।",
  "Senior citizen gate access to avoid crowd pushing; assisted wheelchair passage.":
    "भीड़ से बचने हेतु वरिष्ठ नागरिक द्वार; सहायक व्हीलचेयर मार्ग।",
  "Level entrances, dedicated queue for senior citizens, and wheelchair support at Mahadwar.":
    "समतल प्रवेश, वरिष्ठ नागरिकों हेतु समर्पित कतार, महाद्वार पर व्हीलचेयर सहायता।",
  "Road goes straight to hilltop; rampway from car park into temple; special Senior Citizen queue tickets.":
    "सड़क सीधे पहाड़ी तक; कार पार्क से मंदिर तक रैंप; वरिष्ठ नागरिक विशेष कतार टिकट।",
  "Battery cars from outer gate to eastern tower; free wheelchairs and assistants provided inside.":
    "बाहरी द्वार से पूर्वी गोपुरम तक बैटरी कार; अंदर निःशुल्क व्हीलचेयर एवं सहायक।",
  "Dedicated Senior Citizen / Physically Challenged quota with separate air-conditioned waiting hall and direct express darshan.":
    "वातानुकूलित प्रतीक्षालय एवं सीधे एक्सप्रेस दर्शन के साथ वरिष्ठ नागरिक/दिव्यांग कोटा।",
  "Exclusive early morning senior citizen queue (Senior Citizens Darshan) from 4:30 AM to 6:00 AM.":
    "सुबह 4:30 से 6:00 बजे तक विशेष वरिष्ठ नागरिक प्रातःकालीन दर्शन कतार।",
  "Dedicated Senior Citizen line at North Gate; free wheelchair assistance provided by Travancore Devaswom Board.":
    "उत्तरी द्वार पर वरिष्ठ नागरिक कतार; त्रावणकोर देवस्वम बोर्ड द्वारा निःशुल्क व्हीलचेयर सहायता।",
  "Tractor transport and traditional Doli (palanquin carried by four bearers) available from Pamba for elderly pilgrims.":
    "पम्पा से वरिष्ठ तीर्थयात्रियों हेतु ट्रैक्टर एवं पारंपरिक डोली (चार कहारों की पालकी) उपलब्ध।",
  "Battery cars navigate outer praharams; ramp pathways into sanctum enclosure; special Senior tickets available.":
    "बाहरी प्राकारों में बैटरी कार; गर्भगृह तक रैंप; वरिष्ठ विशेष टिकट उपलब्ध।",
  "Paved courtyards with minimal steps; smooth ramp entrance for wheelchairs.":
    "न्यूनतम सीढ़ियों वाले पक्के प्रांगण; व्हीलचेयर हेतु सुगम रैंप प्रवेश।",
  "Wheelchair friendly flat stone courtyards; Dikshithar priests assist elderly devotees directly.":
    "व्हीलचेयर-मित्र समतल पत्थर प्रांगण; दीक्षितार पुजारी वरिष्ठ भक्तों की सीधे सहायता करते हैं।",
  "Ramps through the main gopurams; battery car services operational for Girivalam circuit.":
    "मुख्य गोपुरमों से रैंप; गिरिवलम परिक्रमा हेतु बैटरी कार सेवा।",
  "Seating arrangements for elderly performing Ashlesha Bali; wheelchair ramp into the inner quadrangle.":
    "आश्लेषा बलि करने वाले वरिष्ठ नागरिकों हेतु बैठने की व्यवस्था; आंतरिक प्रांगण तक व्हीलचेयर रैंप।",
  "Elevator inside the 20-storey Rajagopuram allows senior citizens to view Arabian Sea and the statue effortlessly.":
    "20 मंजिला राजगोपुरम में लिफ्ट; वरिष्ठ नागरिक सहजता से अरब सागर एवं प्रतिमा देख सकते हैं।",
  "Direct darshan lane for senior citizens and pregnant women through Kanaka Kindi.":
    "कनक किंडी से वरिष्ठ नागरिकों एवं गर्भवती महिलाओं हेतु सीधा दर्शन मार्ग।",
  "Serene riverside atmosphere; wheelchair accessible pathways connecting Sharadamba and Vidyashankara temples.":
    "शांत नदी तटीय वातावरण; शारदाम्बा एवं विद्याशंकर मंदिरों को जोड़ने वाले व्हीलचेयर-सुलभ मार्ग।",
  "Dedicated Senior Citizen line at Gate 4; lifts and wheelchairs provided by the temple trust.":
    "गेट 4 पर वरिष्ठ नागरिक कतार; मंदिर ट्रस्ट द्वारा लिफ्ट एवं व्हीलचेयर।",
  "Free online and offline Senior Citizen pass for direct entry; wheelchairs and golf carts available in complex.":
    "सीधे प्रवेश हेतु निःशुल्क ऑनलाइन/ऑफलाइन वरिष्ठ नागरिक पास; परिसर में व्हीलचेयर एवं गोल्फ कार्ट।",
  "Separate \"Mukh Darshan\" queue for senior citizens who cannot stand in long Charan Sparsh lines.":
    "लंबी चरण स्पर्श कतार में न खड़े हो सकने वाले वरिष्ठ नागरिकों हेतु अलग मुख दर्शन कतार।",
  "Battery cars from parking to sanctum; flat platform accessible by wheelchair for elderly darshan.":
    "पार्किंग से गर्भगृह तक बैटरी कार; वरिष्ठ दर्शन हेतु व्हीलचेयर-सुलभ समतल मंच।",
  "Senior citizen entry token available at temple office to avoid crowding during short 30-minute Jhanki openings.":
    "30 मिनट की झांकी खुलने के समय भीड़ से बचने हेतु मंदिर कार्यालय में वरिष्ठ नागरिक टोकन।",
  "Ramps available for lower courtyard; handrails installed on the short flight of stairs leading to inner sanctum.":
    "निचले प्रांगण हेतु रैंप; गर्भगृह तक की छोटी सीढ़ियों पर हैंडरेल।",
  "Newly renovated covered zig-zag pathway with carpeted floors, mist fans, and separate elderly exit gate.":
    "नवीनीकृत ढका ज़िगज़ैग मार्ग; कालीन फर्श, मिस्ट पंखे एवं वरिष्ठ नागरिक विशेष निकास द्वार।",
  "E-rickshaws bring pilgrims near VIP alley; early morning Mangala/Shringar darshan recommended to avoid narrow lane rush.":
    "ई-रिक्शा VIP गली तक; भीड़ से बचने हेतु प्रातःकालीन मंगला/श्रृंगार दर्शन अनुशंसित।",
  "Extremely senior-friendly; expansive paved grounds, free battery carts, escalators, and elevator inside main temple.":
    "अत्यंत वरिष्ठ-मित्र; विशाल पक्के मैदान, निःशुल्क बैटरी कार्ट, एस्केलेटर एवं मुख्य मंदिर में लिफ्ट।",
  "Shaded courtyard, peaceful benches, wheelchair ramp entrance from rear gate.":
    "छायादार प्रांगण, शांत बेंच, पिछले द्वार से व्हीलचेयर रैंप प्रवेश।",
  "Wheelchair assistance provided by local Panda committees for senior citizens performing Shraddha rituals.":
    "श्राद्ध कर्म करने वाले वरिष्ठ नागरिकों हेतु स्थानीय पंडा समिति द्वारा व्हीलचेयर सहायता।",
  "Paved ramps from ghats; battery rickshaws from parking; wheelchair paths along the 12 Shiva temples.":
    "घाटों से पक्के रैंप; पार्किंग से बैटरी रिक्शा; 12 शिव मंदिरों के साथ व्हीलचेयर मार्ग।",
  "Spacious stone courtyard with shaded corridors; assistance available for elderly entering main sanctum.":
    "छायादार गलियारों वाला विशाल पत्थर प्रांगण; गर्भगृह प्रवेश हेतु वरिष्ठ सहायता।",
  "ASI provides wooden ramps and free manual wheelchairs for senior citizens around monument boundary.":
    "ASI द्वारा स्मारक परिसर में वरिष्ठ नागरिकों हेतु लकड़ी के रैंप एवं निःशुल्क व्हीलचेयर।",
  "VIP entry gate helps bypass regular serpentine queues; wheelchairs permitted up to main verandah.":
    "VIP प्रवेश द्वार से सामान्य कतार को बायपास; मुख्य बरामदे तक व्हीलचेयर अनुमत।",
  "Extremely senior-friendly; free wheelchairs, motorized golf carts, and smooth ramps across all halls.":
    "अत्यंत वरिष्ठ-मित्र; निःशुल्क व्हीलचेयर, मोटराइज़्ड गोल्फ कार्ट एवं सभी हॉल में सुगम रैंप।",
  "Bridge across the lake is wide and flat; wheelchairs available at front deori.":
    "झील पर पुल चौड़ा एवं समतल; सामने की डेवड़ी पर व्हीलचेयर उपलब्ध।",
  "Vehicles go up to the entrance gate; rampways facilitate elder access to sanctum.":
    "वाहन प्रवेश द्वार तक; रैंप से वरिष्ठ नागरिकों की गर्भगृह तक पहुँच।",
  "Paved walkways and gentle ramps; porter and palanquin support available from lower bazaar.":
    "पक्की पगडंडियाँ एवं सौम्य रैंप; निचले बाज़ार से कुली एवं पालकी सहायता।",
  "Modern cable car (ropeway) carries elderly directly to temple entrance within 5 minutes.":
    "आधुनिक केबल कार (रोपवे) वरिष्ठ नागरिकों को 5 मिनट में सीधे मंदिर प्रवेश तक ले जाती है।",
  "Ropeway at Gabbar Hill; golf carts within Ambaji temple precinct; wheelchair assistance at entry.":
    "गब्बर पहाड़ी पर रोपवे; अंबाजी मंदिर परिसर में गोल्फ कार्ट; प्रवेश पर व्हीलचेयर सहायता।",
  "Free battery-operated vehicles convey elderly throughout the entire star-shaped walking path.":
    "तारे के आकार की पूरी पैदल पथ में वरिष्ठ नागरिकों हेतु निःशुल्क बैटरी वाहन।",
  "Modern winch train and ropeway transport elderly pilgrims directly to hilltop temple in minutes.":
    "आधुनिक विंच ट्रेन एवं रोपवे वरिष्ठ तीर्थयात्रियों को मिनटों में पहाड़ी मंदिर तक ले जाते हैं।",
  "3.5 km paved trek from Chopta; pony/horse services readily available for elderly travelers.":
    "चोपता से 3.5 किमी पक्का ट्रेक; वरिष्ठ यात्रियों हेतु टट्टू/घोड़ा सेवा सुलभ।",
  "Flat temple grounds; seating arrangements available near Nabhi Gaya for elderly performing rituals.":
    "समतल मंदिर परिसर; नाभि गया के पास अनुष्ठान करने वाले वरिष्ठ नागरिकों हेतु बैठने की व्यवस्था।",
  "Smooth marble ramps and accessible corridors throughout.":
    "सम्पूर्ण परिसर में चिकने संगमरमर रैंप एवं सुलभ गलियारे।",
  "Paved walkways with railings around temple and along main ghats; volunteer assistance available during aarti.":
    "मंदिर एवं मुख्य घाटों पर रेलिंग सहित पक्की पगडंडियाँ; आरती के समय स्वयंसेवक सहायता।",
  "Battery car service available from city center; elderly-friendly ramp access to main sanctum.":
    "शहर केंद्र से बैटरी कार सेवा; गर्भगृह तक वरिष्ठ-मित्र रैंप पहुँच।",
  "Auto-rickshaws available from nearby Khatu town; temple trust arranges special darshan for differently-abled.":
    "निकटवर्ती खाटू नगर से ऑटो; मंदिर ट्रस्ट दिव्यांगजनों हेतु विशेष दर्शन व्यवस्था।",
  "Bhawan Board provides free battery car service, helicopter service from Katra.":
    "भवन बोर्ड निःशुल्क बैटरी कार सेवा; कटरा से हेलीकॉप्टर सेवा।",
  "Helicopter services available from Dehradun/Phata; palanquin (doli) and pony services readily accessible.":
    "देहरादून/फाटा से हेलीकॉप्टर सेवा उपलब्ध; पालकी (डोली) एवं घोड़ा सेवा सुलभ।",
};

// Now apply translations using line-by-line approach for reliability
const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  newLines.push(lines[i]);
  
  // Check for deity_name
  const deityMatch = lines[i].match(/deity_name:\s*'([^']+)'/);
  if (deityMatch && deityHindi[deityMatch[1]]) {
    const indent = lines[i].match(/^(\s*)/)[1];
    newLines.push(`${indent}deity_name_hi: '${deityHindi[deityMatch[1]]}',`);
  }
  
  // Check for best_time
  const bestMatch = lines[i].match(/best_time:\s*'([^']+)'/);
  if (bestMatch && bestTimeHindi[bestMatch[1]]) {
    const indent = lines[i].match(/^(\s*)/)[1];
    newLines.push(`${indent}best_time_hi: '${bestTimeHindi[bestMatch[1]]}',`);
  }
  
  // Check for elderly_support_notes
  const elderlyMatch = lines[i].match(/elderly_support_notes:\s*'([^']+)'/);
  if (elderlyMatch && elderlyHindi[elderlyMatch[1]]) {
    const indent = lines[i].match(/^(\s*)/)[1];
    newLines.push(`${indent}elderly_support_notes_hi: '${elderlyHindi[elderlyMatch[1]]}',`);
  }
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');

// Count results
const result = fs.readFileSync(filePath, 'utf-8');
const deityHiCount = (result.match(/deity_name_hi/g) || []).length;
const bestHiCount = (result.match(/best_time_hi/g) || []).length;
const elderlyHiCount = (result.match(/elderly_support_notes_hi/g) || []).length;
const totalTemples = (result.match(/deity_name:/g) || []).length;
const totalBest = (result.match(/best_time:/g) || []).length;
const totalElderly = (result.match(/elderly_support_notes:/g) || []).length;

console.log(`Temples: ${totalTemples}`);
console.log(`deity_name_hi: ${deityHiCount}/${totalTemples}`);
console.log(`best_time_hi: ${bestHiCount}/${totalBest}`);
console.log(`elderly_support_notes_hi: ${elderlyHiCount}/${totalElderly}`);

if (deityHiCount < totalTemples) {
  // Find unmatched
  const missing = [];
  const resultLines = result.split('\n');
  for (let i = 0; i < resultLines.length; i++) {
    const m = resultLines[i].match(/deity_name:\s*'([^']+)'/);
    if (m) {
      const nextLine = resultLines[i + 1] || '';
      if (!nextLine.includes('deity_name_hi')) {
        missing.push(m[1]);
      }
    }
  }
  console.log(`\nMissing deity_name_hi for:\n${missing.join('\n')}`);
}
