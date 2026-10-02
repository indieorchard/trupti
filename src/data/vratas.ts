import { Vrata } from '@/types';

export const vratasData: Vrata[] = [
  {
    id: 'ekadashi',
    name_hi: 'एकादशी व्रत (वर्ष भर की 24-26 एकादशियां)',
    name_en: 'Ekadashi Vrata (All 24 Annual Observances)',
    deity_id: 'vishnu',
    deity_name: 'Lord Sri Hari Vishnu',
    frequency: 'Bi-monthly (Shukla and Krishna Paksha 11th Lunar Tithi)',
    tithi_info: 'शुक्ल व कृष्ण पक्ष की एकादशी तिथि',
    fasting_rules_hi: 'अन्न, अनाज, दालें और विशेषकर चावल का सेवन पूर्णतः वर्जित है। निर्जला (जल रहित), सजल (जल युक्त) या फलाहार (दूध, फल, कुट्टू, सिंघाड़ा, सेंधा नमक) किया जाता है।',
    fasting_rules_en: 'Strict prohibition of rice, grains, and beans. Observed as Nirjala (waterless) or Phalahar (fruits, milk, buckwheat, rock salt).',
    permitted_foods: ['दूध', 'फल', 'कुट्टू का आटा', 'सिंघाड़े का आटा', 'सेंधा नमक', 'साबूदाना', 'मखाना'],
    prohibited_foods: ['चावल', 'गेहूं', 'दालें', 'लहसुन-प्याज', 'मसालेदार तामसिक भोजन'],
    significance_hi: 'पद्म पुराण के अनुसार एकादशी का व्रत समस्त पापों को भस्म करने वाला, 10 इंद्रियों और मन को वश में करने वाला और अंतकाल में वैकुंठ की प्राप्ति कराने वाला परम व्रत है।',
    parana_guidelines_hi: 'द्वादशी तिथि के सूर्योदय के पश्चात तथा हरि वासर समाप्त होने से पूर्व पारण (व्रत खोलना) अनिवार्य है।',
    diet_rules: {
      permitted_hi: ['अगले दिन पारण के पश्चात सात्विक भोजन', 'केवल आचमन मात्र जल (पारण से पूर्व)'],
      prohibited_hi: ['दिन भर जल, फल अथवा अन्न का सर्वथा त्याग', 'चावल, दालें, नमक, मसाले'],
      water_rule_hi: 'सूर्योदय से अगले दिन सूर्योदय पर्यंत पूर्णतः निर्जला (बिना जल)।',
      elderly_guideline_hi: '६० वर्ष से अधिक उम्र, मधुमेह या बीपी की नियमित दवा लेने वाले वरिष्ठ साधकों हेतु शास्त्रोक्त नियम ("असमर्थे अनुकल्पः"): वे जल, नीम्बू पानी, नारियल जल अथवा दूध का सेवन कर सजल व्रत कर सकते हैं। प्राण रक्षा सर्वोपरि धर्म है।',
      parana_timing_hi: 'द्वादशी के सूर्योदय पश्चात, ब्राह्मण को जल से भरा कलश दान कर शीतल जल से व्रत खोलें।'
    }
  },
  {
    id: 'pradosha_vrata',
    name_hi: 'प्रदोष व्रत (त्रयोदशी)',
    name_en: 'Pradosha Vrata',
    deity_id: 'shiva',
    deity_name: 'Lord Shiva and Mata Parvati',
    frequency: 'Bi-monthly (Shukla and Krishna Trayodashi, sunset period)',
    tithi_info: 'त्रयोदशी तिथि (सूर्यास्त से 45 मिनट पूर्व व पश्चात का काल)',
    fasting_rules_hi: 'दिन भर उपवास रखें। प्रदोष काल (सूर्यास्त के समय) में शिवजी का दूध, जल, बेलपत्र से अभिषेक और पूजा के बाद ही सात्विक फलाहार या एकभुक्त भोजन करें।',
    fasting_rules_en: 'Fasting until sunset. Performing Shiva Abhishekam during the 1.5-hour sunset window (Pradosha Kala), followed by light sattvic meal.',
    permitted_foods: ['फल', 'दूध', 'पंचामृत', 'साबूदाना खीर', 'सेंधा नमक'],
    prohibited_foods: ['अन्न (पूजा से पूर्व)', 'तामसिक भोजन', 'मादक पदार्थ'],
    significance_hi: 'शनि प्रदोष से साढ़ेसाती और शनि दोष शांत होते हैं। सोम प्रदोष से मानसिक शांति, और भौम (मंगल) प्रदोष से ऋण मुक्ति मिलती है।',
    parana_guidelines_hi: 'प्रदोष काल की पूजा और आरती के पश्चात पारण करें।',
    diet_rules: {
      permitted_hi: ['दूध', 'पंचामृत', 'साबूदाना खीर', 'मखाना', 'सेब, केला आदि ताजे फल', 'सेंधा नमक (संध्या पूजा बाद)'],
      prohibited_hi: ['अनाज, दालें', 'लहसुन-प्याज', 'साधारण सफेद नमक', 'तली हुई चीजें'],
      water_rule_hi: 'सजल व्रत—दिन भर जल, छाछ अथवा दूध ले सकते हैं।',
      elderly_guideline_hi: 'दोपहर में हल्का फलाहार (दूध व सेब) लें। सूर्यास्त के समय शिवजी का अभिषेक कर सात्विक फलाहार ग्रहण करें।',
      parana_timing_hi: 'प्रदोष काल में शिव पूजा और आरती संपन्न करने के तुरंत पश्चात फलाहार से व्रत खोलें।'
    }
  },
  {
    id: 'somvar_vrata',
    name_hi: 'सोमवार व्रत (विशेषतः सावन सोमवार)',
    name_en: 'Somvar Vrata (Mondays & Shravan)',
    deity_id: 'shiva',
    deity_name: 'Lord Shiva (Chandrashekhara)',
    frequency: 'Weekly (Every Monday; especially in Shravana Month)',
    tithi_info: 'प्रत्येक सोमवार',
    fasting_rules_hi: 'प्रातः स्नान कर शिवजी को जल-बिल्वपत्र अर्पित करें। एकभुक्त (दोपहर बाद केवल एक समय बिना नमक का या सेंधा नमक युक्त भोजन) करें।',
    fasting_rules_en: 'Single sattvic meal without table salt after offering Bilva leaves and water to Shiva Lingam.',
    permitted_foods: ['फल', 'दूध', 'खीर', 'सिंघाड़े का हलवा'],
    prohibited_foods: ['सफेद नमक', 'अन्न (दोपहर से पूर्व)', 'लहसुन-प्याज'],
    significance_hi: 'चंद्रमा को अनुकूल करने, मानसिक तनाव व अवसाद को दूर करने तथा सुयोग्य जीवनसाथी और अखंड सौभाग्य की प्राप्ति हेतु।',
    parana_guidelines_hi: 'सायंकाल दीप दर्शन व शिव आरती के पश्चात भोजन ग्रहण करें।',
    diet_rules: {
      permitted_hi: ['एकभुक्त (दोपहर बाद एक समय बिना नमक का भोजन)', 'फल', 'दूध-खीर', 'सिंघाड़े का हलवा'],
      prohibited_hi: ['दिन के समय अन्न', 'सफेद नमक', 'हरी पत्तेदार सब्जियां (सावन में वर्जित)'],
      water_rule_hi: 'दिन में पर्याप्त जल और दूध ले सकते हैं।',
      elderly_guideline_hi: 'वरिष्ठ नागरिक दोनों समय फल, दूध और मखाना ले सकते हैं। दवाएं समय पर अवश्य लें।',
      parana_timing_hi: 'सायंकाल शिव दीप दर्शन और आरती के बाद बिना नमक अथवा सेंधा नमक युक्त भोजन ग्रहण करें।'
    }
  },
  {
    id: 'masik_shivaratri',
    name_hi: 'मासिक शिवरात्रि एवं महाशिवरात्रि',
    name_en: 'Maha Shivaratri & Masik Shivaratri',
    deity_id: 'shiva',
    deity_name: 'Lord Shiva & Mata Parvati',
    frequency: 'Monthly (Krishna Chaturdashi); Phalguna Krishna 14 for Maha Shivaratri',
    tithi_info: 'कृष्ण पक्ष की चतुर्दशी तिथि',
    fasting_rules_hi: 'रात्रि जागरण, चारों पहर में शिवलिंग का दुग्ध, दही, घी, मधु, गंगाजल (पंचामृत) से अभिषेक। पूर्ण उपवास या फलाहार।',
    fasting_rules_en: 'Night vigil (Jagran), four-pahar Rudrabhishek with Panchamrit, full fast or phalahar.',
    permitted_foods: ['फल', 'दूध', 'पंचामृत', 'सेंधा नमक'],
    prohibited_foods: ['अन्न', 'दालें', 'तेलयुक्त भोजन'],
    significance_hi: 'शिव और शक्ति के दिव्य मिलन की रात्रि। अहंकार और काम-क्रोध के संहार का दिन। महाशिवरात्रि पर व्रत करने वाले को मोक्ष की प्राप्ति निश्चित मानी गई है।',
    parana_guidelines_hi: 'अगले दिन प्रातःकाल सूर्योदय के बाद और चतुर्दशी तिथि समाप्त होने से पूर्व पारण।',
    diet_rules: {
      permitted_hi: ['फलाहार (कुट्टू, सिंघाड़ा)', 'दूध, पंचामृत', 'साबूदाना', 'सेंधा नमक'],
      prohibited_hi: ['अन्न, गेहूं, चावल', 'दालें', 'लहसुन-प्याज', 'मादक पदार्थ'],
      water_rule_hi: 'सजल अथवा फलाहारी उपवास।',
      elderly_guideline_hi: 'चारों पहर जागरण बुजुर्गों के लिए अनिवार्य नहीं है। प्रथम पहर (शाम 6 से 9 बजे) की पूजा कर हल्का फलाहार लेकर विश्राम करें।',
      parana_timing_hi: 'अगले दिन प्रातः सूर्योदय के बाद और चतुर्दशी तिथि समाप्त होने से पूर्व स्नान कर पारण करें।'
    }
  },
  {
    id: 'satyanarayan_purnima',
    name_hi: 'सत्यनारायण पूर्णिमा व्रत',
    name_en: 'Satyanarayan Vrata (Full Moon)',
    deity_id: 'vishnu',
    deity_name: 'Lord Satyanarayan (Vishnu)',
    frequency: 'Monthly (Purnima Tithi)',
    tithi_info: 'प्रत्येक पूर्णिमा तिथि',
    fasting_rules_hi: 'दिन भर उपवास रखकर सायंकाल श्री सत्यनारायण कथा का श्रवण करें। सपादभक्ष पंजीरी प्रसाद (भुना आटा, घी, चीनी, केला, दूध) ग्रहण करने के बाद फलाहार करें।',
    fasting_rules_en: 'Fasting until evening recitation of the 5 chapters of Satyanarayan Katha from Skanda Purana, followed by Sapadbhaksh Prasad.',
    permitted_foods: ['सपादभक्ष पंजीरी प्रसाद', 'पंचामृत', 'फल', 'दूध', 'सात्विक भोजन'],
    prohibited_foods: ['लहसुन-प्याज', 'तामसिक भोजन'],
    significance_hi: 'पारिवारिक सुख-शांति, गृहक्लेश निवारण, व्यापार में वृद्धि और सत्य के आचरण की प्रेरणा।',
    parana_guidelines_hi: 'कथा श्रवण व चंद्रमा को अर्घ्य देने के पश्चात प्रसाद ग्रहण कर पारण करें।',
    diet_rules: {
      permitted_hi: ['सपादभक्ष पंजीरी प्रसाद (भुना आटा, घी, चीनी, केला, पंचामृत)', 'फल', 'दूध', 'कथा पश्चात सात्विक भोजन'],
      prohibited_hi: ['कथा समाप्त होने से पूर्व अन्न ग्रहण', 'लहसुन-प्याज', 'मांसाहार व मदिरा'],
      water_rule_hi: 'दिन भर जल और पेय पदार्थ ले सकते हैं।',
      elderly_guideline_hi: 'दोपहर में फलाहार लें, शाम को सत्यनारायण कथा सुनते समय चरणामृत व पंजीरी ग्रहण कर व्रत पूर्ण करें।',
      parana_timing_hi: 'कथा श्रवण व आरती के पश्चात पंजीरी प्रसाद लेकर भोजन करें।'
    }
  },
  {
    id: 'navratri_vrata',
    name_hi: 'नवरात्रि व्रत (चैत्र व शारदीय)',
    name_en: 'Navratri Vrata (Chaitra & Sharad)',
    deity_id: 'durga',
    deity_name: 'Navadurga (Shailaputri to Siddhidatri)',
    frequency: 'Twice a year (9 days in Chaitra & 9 days in Ashvin)',
    tithi_info: 'शुक्ल प्रतिपदा से नवमी पर्यंत',
    fasting_rules_hi: 'घटस्थापना, अखंड ज्योति प्रज्वलन। नौ दिनों तक फलाहार (कुट्टू, सिंघाड़ा, साबूदाना, फल) अथवा केवल एक समय सात्विक भोजन। लहसुन, प्याज, मांस-मदिरा का पूर्ण त्याग।',
    fasting_rules_en: '9 days of Akhanda Jyoti, daily Durga Saptashati path, phalahar diet with Kuttu, Singhada, Sabudana, and seasonal fruits.',
    permitted_foods: ['कुट्टू का आटा', 'सिंघाड़े का आटा', 'साबूदाना', 'मखाना', 'सेंधा नमक', 'फल', 'दूध'],
    prohibited_foods: ['अन्न', 'दालें', 'सफेद नमक', 'हल्दी', 'लहसुन-प्याज'],
    significance_hi: 'शरीर के नौ द्वारों और छह आंतरिक शत्रुओं (काम, क्रोध, लोभ, मोह, मद, मत्सर) की शुद्धि। माँ भगवती के आशीर्वाद से सर्वकल्याण।',
    parana_guidelines_hi: 'दशमी तिथि को कन्या पूजन के पश्चात पारण संपन्न किया जाता है।',
    diet_rules: {
      permitted_hi: ['कुट्टू का आटा', 'सिंघाड़े का आटा', 'साबूदाना', 'मखाना', 'सेंधा नमक', 'सभी मौसमी फल', 'दूध, दही, पनीर'],
      prohibited_hi: ['अन्न, चावल, गेहूं', 'दालें', 'सफेद नमक', 'हल्दी', 'लहसुन-प्याज', 'सरसों का तेल'],
      water_rule_hi: 'दिन भर जल, छाछ और फलों का रस ग्रहण कर शरीर को हाइड्रेटेड रखें।',
      elderly_guideline_hi: 'नौ दिन लगातार निर्जल या कठिन उपवास न करें। दोनों समय सात्विक फलाहार (दूध, फल, साबूदाना खिचड़ी) ग्रहण करें। दवाएं बिना बाधा लें।',
      parana_timing_hi: 'दशमी तिथि को कन्या पूजन (कंजिका) कराने के पश्चात हलवा-पूड़ी-चने का प्रसाद ग्रहण कर पारण करें।'
    }
  },
  {
    id: 'karwa_chauth',
    name_hi: 'करवा चौथ व्रत',
    name_en: 'Karwa Chauth (Suhag Vrata)',
    deity_id: 'parvati',
    deity_name: 'Mata Parvati (Gauri), Shiva, Kartikeya, Ganesha & Moon',
    frequency: 'Annual (Kartik Krishna Chaturthi)',
    tithi_info: 'कार्तिक कृष्ण चतुर्थी',
    fasting_rules_hi: 'सूर्योदय से पूर्व सरगी ग्रहण करना। दिन भर निर्जला (बिना जल) व्रत। रात्रि में छलनी से चंद्र दर्शन और पति को देखने के पश्चात जल ग्रहण।',
    fasting_rules_en: 'Nirjala fast observed by married women from sunrise until moonrise for the longevity and prosperity of husbands.',
    permitted_foods: ['रात्रि चंद्रदर्शन के बाद सात्विक मिष्ठान्न व भोजन'],
    prohibited_foods: ['दिन भर जल व अन्न सर्वथा वर्जित'],
    significance_hi: 'अखंड सौभाग्य, दांपत्य प्रेम और पति की दीर्घायु की रक्षा हेतु सर्वमान्य व्रत।',
    parana_guidelines_hi: 'चंद्रमा को अर्घ्य देकर, पति के हाथों जल पीकर व्रत पूर्ण करें।',
    diet_rules: {
      permitted_hi: ['सूर्योदय पूर्व सरगी (दूध, फेनियां, फल, मेवे)', 'रात्रि चंद्र दर्शन के पश्चात संपूर्ण सात्विक भोजन'],
      prohibited_hi: ['सूर्योदय से चंद्रोदय तक जल एवं अन्न का पूर्ण त्याग'],
      water_rule_hi: 'सूर्योदय से चंद्रोदय तक निर्जला व्रत।',
      elderly_guideline_hi: 'गर्भवती, अस्वस्थ अथवा बुजुर्ग सुहागिनों हेतु सरगी के बाद जल, दूध या चाय लेने की शास्त्र सम्मत छूट है। स्वास्थ्य संकट में उपवास न रखें।',
      parana_timing_hi: 'रात्रि में चंद्रदेव को अर्घ्य देकर, पति के हाथों जल और मिष्ठान्न ग्रहण कर पारण करें।'
    }
  },
  {
    id: 'pitru_paksha_shraddha',
    name_hi: 'पितृपक्ष श्राद्ध एवं तर्पण (16 दिवसीय)',
    name_en: 'Pitru Paksha Annual Shraddha (16 Days)',
    deity_id: 'vishnu',
    deity_name: 'Pitru Devatas, Lord Yama & Bhagavan Vishnu',
    frequency: 'Annual (Bhadrapada Purnima to Ashvin Amavasya)',
    tithi_info: 'भाद्रपद पूर्णिमा से सर्वपितृ अमावस्या तक',
    fasting_rules_hi: 'पूर्वज जिस तिथि को परलोक सिधारे हों, उस तिथि के कुतुप-अपराह्न काल (~11:45 AM - 1:30 PM) में तिल, कुश, जल से तर्पण, पिंडदान, पंचबलि (गाय, कुत्ता, कौआ, चींटी, देव) और ब्राह्मण भोजन कराएं।',
    fasting_rules_en: 'Observing sacred austerity during Mahalaya Paksha to offer Tarpan, Pinda Daan, and Pancha Bali to ancestors on their lunar death tithis.',
    permitted_foods: ['खीर', 'पूड़ी', 'उड़द दाल की पकौड़ी', 'कद्दू', 'सेंधा नमक युक्त सात्विक भोजन'],
    prohibited_foods: ['लहसुन-प्याज', 'मसूर दाल', 'चना', 'हींग', 'काला नमक', 'सरसों'],
    significance_hi: 'पितृ ऋण से मुक्ति, पूर्वजों की आत्मा को शांति, वंश वृद्धि, और पारिवारिक सुख-समृद्धि।',
    parana_guidelines_hi: 'ब्राह्मणों और पंचबलि को भोजन कराने के पश्चात परिवार भोजन करे।'
  },
  {
    id: 'chhath_puja',
    name_hi: 'छठ पूजा (सूर्य षष्ठी महाव्रत)',
    name_en: 'Chhath Mahaparva (Surya Shashthi)',
    deity_id: 'surya',
    deity_name: 'भगवान सूर्य नारायण एवं छठी मइया',
    frequency: 'Annual',
    tithi_info: 'कार्तिक शुक्ल चतुर्थी से सप्तमी (४ दिवसीय)',
    fasting_rules_hi: '३६ घंटे का निर्जला व्रत। नहाय खाय, खरना, संध्या अर्घ्य और उषा अर्घ्य।',
    fasting_rules_en: '36-hour waterless fast honoring the Sun God and Chhathi Maiya.',
    permitted_foods: ['कद्दू भात', 'गुड़ की खीर', 'ठेकुआ', 'फल'],
    prohibited_foods: ['अन्न', 'जल (खरना से पारण तक)', 'साधारण नमक'],
    significance_hi: 'संतान रक्षा, दीर्घायु, कुष्ठ व चर्म रोगों से मुक्ति, और प्रकृति के प्रति कृतज्ञता का सबसे पवित्र पर्व। डूबते और उगते सूर्य को अर्घ्य दिया जाता है।',
    parana_guidelines_hi: 'सप्तमी के प्रातःकाल उदीयमान सूर्य को अर्घ्य देने के पश्चात ठेकुआ प्रसाद और अदरक-जल से पारण।',
    diet_rules: {
      permitted_hi: ['नहाय-खाय पर कद्दू-भात', 'खरना पर गुड़ की खीर व रोटी', 'पारण पर ठेकुआ व मौसमी फल'],
      prohibited_hi: ['३६ घंटे तक अन्न व जल का पूर्ण त्याग', 'सेंधा नमक के अतिरिक्त अन्य कोई नमक नहीं'],
      water_rule_hi: 'खरना की शाम से लेकर सप्तमी के सूर्योदय तक ३६ घंटे का अखंड निर्जला उपवास।',
      elderly_guideline_hi: 'बुजुर्ग व्रती यदि ३६ घंटे निर्जल नहीं रह सकते तो वे केवल सूर्य अर्घ्य सेवा में सम्मिलित हों अथवा सजल उपवास रखें।',
      parana_timing_hi: 'सप्तमी के प्रातःकाल उदीयमान सूर्य को अर्घ्य देने के पश्चात ठेकुआ प्रसाद और अदरक-जल से पारण।'
    }
  },
  {
    id: 'brihaspativar_vrata',
    name_hi: 'बृहस्पतिवार व्रत (गुरुवार व्रत)',
    name_en: 'Brihaspativar Vrata (Thursdays)',
    deity_id: 'vishnu',
    deity_name: 'बृहस्पति देव एवं भगवान विष्णु',
    frequency: 'Weekly',
    tithi_info: 'प्रत्येक गुरुवार',
    fasting_rules_hi: 'पीले वस्त्र धारण कर केले के वृक्ष की पूजा। चने की दाल और गुड़ का भोग। एक समय बिना नमक का भोजन।',
    fasting_rules_en: 'Wearing yellow, worshipping banana tree with chana dal and jaggery. One meal without salt.',
    permitted_foods: ['पीले रंग के फल', 'चने की दाल', 'बेसन'],
    prohibited_foods: ['नमक', 'केला (स्वयं खाना वर्जित)'],
    significance_hi: 'ज्ञान, विवेक, गुरु कृपा, शीघ्र विवाह और वैवाहिक सुख हेतु। केले के वृक्ष की पूजा कर चने की दाल व गुड़ अर्पित किया जाता है।',
    parana_guidelines_hi: 'सायंकाल दीप दर्शन व आरती के बाद पारण करें।',
    diet_rules: {
      permitted_hi: ['पीले रंग के फल (केला, पपीता, आम)', 'चने की दाल का हलवा / बेसन के लड्डू', 'सेंधा नमक (एक समय)'],
      prohibited_hi: ['नमक (बिना नमक का व्रत श्रेष्ठ माना गया है)', 'केले का फल स्वयं खाना वर्जित (केले की केवल पूजा होती है)'],
      water_rule_hi: 'दिन भर जल और फलाहार सुलभ है।',
      elderly_guideline_hi: 'बिना नमक के एक समय भोजन में चने की दाल और रोटी ले सकते हैं।',
      parana_timing_hi: 'सायंकाल दीप दर्शन व आरती के बाद पारण करें।'
    }
  },
  {
    id: 'santoshi_mata',
    name_hi: 'संतोषी माता शुक्रवार व्रत',
    name_en: 'Santoshi Mata Vrata (Fridays)',
    deity_id: 'durga',
    deity_name: 'माँ संतोषी (गणेश पुत्री)',
    frequency: 'Weekly (16 Fridays)',
    tithi_info: 'लगातार १६ शुक्रवार',
    fasting_rules_hi: 'गुड़ और भुने चने का भोग। खटाई खाना या स्पर्श करना पूर्णतः वर्जित है।',
    fasting_rules_en: 'Offering jaggery and roasted gram. Strict prohibition on eating or touching sour foods.',
    permitted_foods: ['गुड़', 'चना', 'फल', 'मीठा भोजन'],
    prohibited_foods: ['खट्टी चीजें', 'नींबू', 'दही', 'आमचूर'],
    significance_hi: 'मन में संतोष, पारिवारिक क्लेश मुक्ति, विवाह और परीक्षा में सफलता हेतु विख्यात व्रत। गुड़ और भुने चने का भोग लगाया जाता है।',
    parana_guidelines_hi: '१६ शुक्रवार पूर्ण होने पर उद्यापन में ८ बालकों को भोजन कराकर व्रत खोलें।',
    diet_rules: {
      permitted_hi: ['गुड़ और चना का प्रसाद', 'फल', 'मीठा भोजन'],
      prohibited_hi: ['खट्टी चीजें (नींबू, दही, इमली, टमाटर, आमचूर) का स्पर्श भी सर्वथा वर्जित', 'परिवार के सदस्यों द्वारा भी खटाई का त्याग'],
      water_rule_hi: 'दिन भर सजल उपवास।',
      elderly_guideline_hi: 'खट्टी चीजें न खाएं, शेष सात्विक भोजन एक समय ले सकते हैं।',
      parana_timing_hi: '१६ शुक्रवार पूर्ण होने पर उद्यापन में ८ बालकों को भोजन कराकर व्रत खोलें।'
    }
  }
];
