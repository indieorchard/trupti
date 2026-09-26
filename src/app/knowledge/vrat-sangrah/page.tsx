'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { useFavorites } from '@/hooks/useFavorites';
import { getDeityImage } from '@/data/imageMap';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { ArrowLeft, Check, X, AlertCircle, Clock, Calendar, Sparkles, Heart } from 'lucide-react';

interface VratDetail {
  id: string;
  name_hi: string;
  name_en: string;
  deity_id: string;
  deity_name: string;
  tithi_info: string;
  frequency: string;
  significance_hi: string;
  significance_en: string;
  diet_rules: {
    permitted_hi: string[];
    prohibited_hi: string[];
    water_rule_hi: string;
    elderly_guideline_hi: string;
    parana_timing_hi: string;
  };
}

const detailedVratSangrah: VratDetail[] = [
  {
    id: 'nirjala_ekadashi',
    name_hi: 'निर्जला एकादशी व्रत (भीमसेनी एकादशी)',
    name_en: 'Nirjala Ekadashi (Bhimseni Ekadashi)',
    deity_id: 'vishnu',
    deity_name: 'भगवान श्री हरि विष्णु',
    tithi_info: 'ज्येष्ठ शुक्ल एकादशी',
    frequency: 'वार्षिक (वर्ष में एक बार)',
    significance_hi: 'वर्ष भर की 24 एकादशियों का पुण्य अकेले इस एक व्रत से प्राप्त हो जाता है। पांडव भीमसेन ने महर्षि व्यास के निर्देश पर इस महाकठिन व्रत को धारण किया था।',
    significance_en: 'The crown of all 24 Ekadashis, granting the accumulated spiritual merit of an entire year of fasts in a single day.',
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
    name_hi: 'प्रदोष व्रत (सोम, भौम, शनि प्रदोष)',
    name_en: 'Pradosha Vrata (Trayodashi)',
    deity_id: 'shiva',
    deity_name: 'भगवान शिव एवं माता पार्वती',
    tithi_info: 'शुक्ल व कृष्ण पक्ष की त्रयोदशी',
    frequency: 'मासिक (महीने में 2 बार)',
    significance_hi: 'सूर्यास्त के 45 मिनट पूर्व व पश्चात (प्रदोष काल) में भगवान शिव कैलाश पर आनंद तांडव करते हैं। शनि प्रदोष से साढ़ेसाती और पितृ दोष शांत होते हैं।',
    significance_en: 'Observed during twilight on Trayodashi when Shiva dances in supreme ecstasy, removing chronic diseases and planetary afflictions.',
    diet_rules: {
      permitted_hi: ['दूध', 'पंचामृत', 'साबूदाना खीर', 'मखाना', 'सेब, केला आदि ताजे फल', 'सेंधा नमक (संध्या पूजा बाद)'],
      prohibited_hi: ['अनाज, दालें', 'लहसुन-प्याज', 'साधारण सफेद नमक', 'तली हुई चीजें'],
      water_rule_hi: 'सजल व्रत—दिन भर जल, छाछ अथवा दूध ले सकते हैं।',
      elderly_guideline_hi: 'दोपहर में हल्का फलाहार (दूध व सेब) लें। सूर्यास्त के समय शिवजी का अभिषेक कर सात्विक फलाहार ग्रहण करें।',
      parana_timing_hi: 'प्रदोष काल में शिव पूजा और आरती संपन्न करने के तुरंत पश्चात फलाहार से व्रत खोलें।'
    }
  },
  {
    id: 'shravan_somvar',
    name_hi: 'सावन सोमवार व्रत एवं सोलह सोमवार',
    name_en: 'Shravan Somvar & 16 Somvar Vrata',
    deity_id: 'shiva',
    deity_name: 'भगवान शिव (भोलेनाथ)',
    tithi_info: 'श्रावण मास के समस्त सोमवार',
    frequency: 'साप्ताहिक (श्रावण मास)',
    significance_hi: 'मनोवांछित जीवनसाथी की प्राप्ति, दांपत्य कलह निवारण, चंद्र दोष शांति और मानसिक अवसाद से मुक्ति हेतु सर्वमान्य व्रत।',
    significance_en: 'Celebrated on Mondays of holy Shravan month for emotional harmony, planetary peace, and Shiva’s sheltering grace.',
    diet_rules: {
      permitted_hi: ['एकभुक्त (दोपहर बाद एक समय बिना नमक का भोजन)', 'फल', 'दूध-खीर', 'सिंघाड़े का हलवा'],
      prohibited_hi: ['दिन के समय अन्न', 'सफेद नमक', 'हरी पत्तेदार सब्जियां (सावन में वर्जित)'],
      water_rule_hi: 'दिन में पर्याप्त जल और दूध ले सकते हैं।',
      elderly_guideline_hi: 'वरिष्ठ नागरिक दोनों समय फल, दूध और मखाना ले सकते हैं। दवाएं समय पर अवश्य लें।',
      parana_timing_hi: 'सायंकाल शिव दीप दर्शन और आरती के बाद बिना नमक अथवा सेंधा नमक युक्त भोजन ग्रहण करें।'
    }
  },
  {
    id: 'maha_shivaratri',
    name_hi: 'महाशिवरात्रि व्रत',
    name_en: 'Maha Shivaratri Mahavrata',
    deity_id: 'shiva',
    deity_name: 'भगवान शिव एवं माता पार्वती',
    tithi_info: 'फाल्गुन कृष्ण चतुर्दशी',
    frequency: 'वार्षिक (सर्वोच्च शिव पर्व)',
    significance_hi: 'शिव-पार्वती का विवाह उत्सव एवं लिंगोद्भव दिवस। रात्रि के चारों पहर में रुद्राभिषेक करने से जन्म-जन्मांतर के पापों का क्षय और मोक्ष प्राप्त होता है।',
    significance_en: 'The Great Night of Shiva commemorating the divine union of Shiva and Shakti and the cosmic manifestation of the Lingam.',
    diet_rules: {
      permitted_hi: ['फलाहार (कुट्टू, सिंघाड़ा)', 'दूध, पंचामृत', 'साबूदाना', 'सेंधा नमक'],
      prohibited_hi: ['अन्न, गेहूं, चावल', 'दालें', 'लहसुन-प्याज', 'मादक पदार्थ'],
      water_rule_hi: 'सजल अथवा फलाहारी उपवास।',
      elderly_guideline_hi: 'चारों पहर जागरण बुजुर्गों के लिए अनिवार्य नहीं है। प्रथम पहर (शाम 6 से 9 बजे) की पूजा कर हल्का फलाहार लेकर विश्राम करें।',
      parana_timing_hi: 'अगले दिन प्रातः सूर्योदय के बाद और चतुर्दशी तिथि समाप्त होने से पूर्व स्नान कर पारण करें।'
    }
  },
  {
    id: 'navratri_vrata',
    name_hi: 'शारदीय एवं चैत्र नवरात्रि (९ दिवसीय)',
    name_en: 'Navratri Vrata (9 Sacred Days)',
    deity_id: 'durga',
    deity_name: 'माँ नवदुर्गा (शैलपुत्री से सिद्धिदात्री)',
    tithi_info: 'शुक्ल प्रतिपदा से नवमी पर्यंत',
    frequency: 'वर्ष में दो बार (चैत्र व आश्विन)',
    significance_hi: 'आद्यशक्ति जगदंबा के नौ रूपों की उपासना। शरीर के नौ द्वारों और काम, क्रोध, लोभ, मोह, मद, मत्सर की आंतरिक शुद्धि। अखंड ज्योति स्थापना।',
    significance_en: 'Nine nights of spiritual awakening invoking the nine divine forms of Mother Durga, concluding with Kanya Pujan.',
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
    name_hi: 'करवा चौथ व्रत (सौभाग्य व्रत)',
    name_en: 'Karwa Chauth (Suhag Vrata)',
    deity_id: 'parvati',
    deity_name: 'माता पार्वती (गौरी), शिव एवं चंद्रदेव',
    tithi_info: 'कार्तिक कृष्ण चतुर्थी',
    frequency: 'वार्षिक (सुहागिन महिलाओं हेतु)',
    significance_hi: 'अखंड सौभाग्य, दांपत्य जीवन में मधुरता और पति की दीर्घायु की रक्षा हेतु सर्वमान्य कठिन व्रत। रात्रि में छलनी से चंद्र दर्शन के बाद व्रत पूर्ण होता है।',
    significance_en: 'Sacred fast observed by married women from sunrise till moonrise for the health, protection, and longevity of spouses.',
    diet_rules: {
      permitted_hi: ['सूर्योदय पूर्व सरगी (दूध, फेनियां, फल, मेवे)', 'रात्रि चंद्र दर्शन के पश्चात संपूर्ण सात्विक भोजन'],
      prohibited_hi: ['सूर्योदय से चंद्रोदय तक जल एवं अन्न का पूर्ण त्याग'],
      water_rule_hi: 'सूर्योदय से चंद्रोदय तक निर्जला व्रत।',
      elderly_guideline_hi: 'गर्भवती, अस्वस्थ अथवा बुजुर्ग सुहागिनों हेतु सरगी के बाद जल, दूध या चाय लेने की शास्त्र सम्मत छूट है। स्वास्थ्य संकट में उपवास न रखें।',
      parana_timing_hi: 'रात्रि में चंद्रदेव को अर्घ्य देकर, पति के हाथों जल और मिष्ठान्न ग्रहण कर पारण करें।'
    }
  },
  {
    id: 'satyanarayan_purnima',
    name_hi: 'सत्यनारायण पूर्णिमा व्रत',
    name_en: 'Satyanarayan Vrata (Every Full Moon)',
    deity_id: 'vishnu',
    deity_name: 'भगवान श्री सत्यनारायण (विष्णु)',
    tithi_info: 'प्रत्येक मास की पूर्णिमा तिथि',
    frequency: 'मासिक (हर पूर्णिमा)',
    significance_hi: 'स्कंद पुराण के रेवा खंड में वर्णित। सत्य का आचरण, पारिवारिक सुख-शांति, दरिद्रता का नाश और गृहक्लेश की शांति हेतु सर्वश्रेष्ठ जनप्रिय व्रत।',
    significance_en: 'Monthly Full Moon observance reciting the 5 beloved chapters of Satyanarayan Katha, bestowing domestic peace and righteous living.',
    diet_rules: {
      permitted_hi: ['सपादभक्ष पंजीरी प्रसाद (भुना आटा, घी, चीनी, केला, पंचामृत)', 'फल', 'दूध', 'कथा पश्चात सात्विक भोजन'],
      prohibited_hi: ['कथा समाप्त होने से पूर्व अन्न ग्रहण', 'लहसुन-प्याज', 'मांसाहार व मदिरा'],
      water_rule_hi: 'दिन भर जल और पेय पदार्थ ले सकते हैं।',
      elderly_guideline_hi: 'दोपहर में फलाहार लें, शाम को सत्यनारायण कथा सुनते समय चरणामृत व पंजीरी ग्रहण कर व्रत पूर्ण करें।',
      parana_timing_hi: 'कथा श्रवण व आरती के पश्चात पंजीरी प्रसाद लेकर भोजन करें।'
    }
  },
  {
    id: 'chhath_puja',
    name_hi: 'छठ पूजा (सूर्य षष्ठी महाव्रत)',
    name_en: 'Chhath Mahaparva (Surya Shashthi)',
    deity_id: 'surya',
    deity_name: 'भगवान सूर्य नारायण एवं छठी मइया',
    tithi_info: 'कार्तिक शुक्ल चतुर्थी से सप्तमी (४ दिवसीय)',
    frequency: 'वार्षिक (लोक आस्था का महापर्व)',
    significance_hi: 'संतान रक्षा, दीर्घायु, कुष्ठ व चर्म रोगों से मुक्ति, और प्रकृति के प्रति कृतज्ञता का सबसे पवित्र पर्व। डूबते और उगते सूर्य को अर्घ्य दिया जाता है।',
    significance_en: 'The grand four-day Vedic festival of pure austerity dedicated to Sun God Surya and Chhathi Maiya on sacred riverbanks.',
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
    tithi_info: 'प्रत्येक गुरुवार',
    frequency: 'साप्ताहिक',
    significance_hi: 'ज्ञान, विवेक, गुरु कृपा, शीघ्र विवाह और वैवाहिक सुख हेतु। केले के वृक्ष की पूजा कर चने की दाल व गुड़ अर्पित किया जाता है।',
    significance_en: 'Weekly fast honoring Jupiter (Guru) and Lord Vishnu for wisdom, marital harmony, and success in education.',
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
    tithi_info: 'लगातार १६ शुक्रवार',
    frequency: 'साप्ताहिक (१६ शुक्रवार)',
    significance_hi: 'मन में संतोष, पारिवारिक क्लेश मुक्ति, विवाह और परीक्षा में सफलता हेतु विख्यात व्रत। गुड़ और भुने चने का भोग लगाया जाता है।',
    significance_en: 'Sixteen consecutive Friday fasts for inner contentment, domestic harmony, and removal of obstacles.',
    diet_rules: {
      permitted_hi: ['गुड़ और चना का प्रसाद', 'फल', 'मीठा भोजन'],
      prohibited_hi: ['खट्टी चीजें (नींबू, दही, इमली, टमाटर, आमचूर) का स्पर्श भी सर्वथा वर्जित', 'परिवार के सदस्यों द्वारा भी खटाई का त्याग'],
      water_rule_hi: 'दिन भर सजल उपवास।',
      elderly_guideline_hi: 'खट्टी चीजें न खाएं, शेष सात्विक भोजन एक समय ले सकते हैं।',
      parana_timing_hi: '१६ शुक्रवार पूर्ण होने पर उद्यापन में ८ बालकों को भोजन कराकर व्रत खोलें।'
    }
  }
];

export default function VratSangrahPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedVratId, setSelectedVratId] = useState(detailedVratSangrah[0].id);

  const activeVrat = detailedVratSangrah.find(v => v.id === selectedVratId) || detailedVratSangrah[0];
  const deityImg = getDeityImage(activeVrat.deity_id);

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      {/* Header Banner with Explicit Back button */}
      <div className="card bg-gradient-to-r from-blue-50 via-cream-50 to-indigo-100 border-indigo-200">
        <div className="flex items-start gap-3">
          <button
            onClick={() => router.push('/knowledge')}
            className="p-2 rounded-xl bg-white border border-indigo-200 text-indigo-800 hover:bg-cream-100 transition-colors shadow-2xs mt-0.5"
            aria-label={t('पीछे जाएं', 'Go back')}
          >
            <ArrowLeft size={20} className="stroke-[2.5]" />
          </button>
          <div className="flex-1">
            <h1 className="font-heading text-2xl text-indigo-950 font-bold">
              {t('व्रत संग्रह एवं आहार परामर्श', 'Vrat Sangrah & Diet Considerations')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'सनातन धर्म के प्रमुख व्रत, पूजा विधि, ग्राह्य-वर्जित फलाहार एवं वरिष्ठ नागरिकों (60+) हेतु स्वास्थ्य-रक्षा नियम।',
                'Major Hindu fasts, puja rituals, permitted/prohibited diets, and senior-friendly fasting exemptions.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Vrat Selector */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2 px-1">
          {t('व्रत का चयन करें', 'Select Vrat')}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {detailedVratSangrah.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVratId(v.id)}
              className={cn(
                'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]',
                selectedVratId === v.id
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
              )}
            >
              {t(v.name_hi, v.name_en)}
            </button>
          ))}
        </div>
      </div>

      {/* Active Vrat Detailed Card with Visual Deity Image */}
      {activeVrat && (
        <article id={activeVrat.id} className="card border-indigo-200 bg-white space-y-4 shadow-sm p-4">
          {/* Header with Visual Deity Image, Title & Favorite Button */}
          <div className="flex items-start gap-3.5 pb-3 border-b border-cream-200">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-xs border border-cream-200">
              <SmartImage
                src={deityImg}
                alt={activeVrat.deity_name}
                aspectRatio="square"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div>
                  <span className="inline-block text-[11px] font-bold bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full mb-1">
                    🕉️ {activeVrat.deity_name} • {activeVrat.frequency}
                  </span>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                    {t(activeVrat.name_hi, activeVrat.name_en)}
                  </h2>
                  <p className="text-xs text-text-muted mt-0.5 font-hindi truncate">
                    📅 <strong>{t('तिथि', 'Tithi')}:</strong> {activeVrat.tithi_info}
                  </p>
                </div>

                <FavoriteButton
                  item={{
                    id: activeVrat.id,
                    title_hi: activeVrat.name_hi,
                    title_en: activeVrat.name_en,
                    subtitle_hi: activeVrat.deity_name,
                    subtitle_en: activeVrat.deity_name,
                    type: 'vrat',
                    url: `/knowledge/vrat-sangrah#${activeVrat.id}`,
                    image_url: deityImg,
                    badge: '🗓️ व्रत संग्रह'
                  }}
                  className="p-1.5"
                />
              </div>
            </div>
          </div>

          {/* Spiritual Significance */}
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-200">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
              ✨ {t('व्रत का महत्व एवं फलश्रुति', 'Spiritual Significance')}
            </h3>
            <p className="text-body-hi text-text-secondary leading-relaxed">
              {t(activeVrat.significance_hi, activeVrat.significance_en)}
            </p>
          </div>

          {/* SECTION: RECOMMENDED DIET CONSIDERATIONS (आहार परामर्श) */}
          <section className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🥗</span>
              <h3 className="font-heading text-lg font-bold text-indigo-950">
                {t('आहार परामर्श एवं उपवास नियम', 'Dietary Guidelines & Rules')}
              </h3>
            </div>

            {/* Permitted & Prohibited Foods Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Permitted Foods (ग्राह्य / अनुमत आहार) */}
              <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm font-hindi">
                  <Check size={18} className="text-emerald-700 stroke-[2.5]" />
                  <span>{t('क्या खाएं (ग्राह्य फलाहार)', 'Permitted Foods')}</span>
                </div>
                <ul className="space-y-1 text-xs sm:text-sm text-text-secondary font-hindi pl-2">
                  {activeVrat.diet_rules.permitted_hi.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prohibited Foods (वर्जित आहार) */}
              <div className="p-3.5 bg-rose-50/70 rounded-xl border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm font-hindi">
                  <X size={18} className="text-rose-700 stroke-[2.5]" />
                  <span>{t('क्या न खाएं (पूर्ण वर्जित)', 'Strictly Prohibited')}</span>
                </div>
                <ul className="space-y-1 text-xs sm:text-sm text-text-secondary font-hindi pl-2">
                  {activeVrat.diet_rules.prohibited_hi.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Water / Hydration Guideline */}
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-start gap-2.5">
              <span className="text-xl">💧</span>
              <div className="text-xs sm:text-sm text-text-secondary">
                <strong className="text-blue-900 font-hindi">{t('जल एवं पेय नियम', 'Hydration Rule')}: </strong>
                <span>{activeVrat.diet_rules.water_rule_hi}</span>
              </div>
            </div>

            {/* CRITICAL FOR 60+: Elderly & Medical Health Consideration */}
            <div className="p-3.5 bg-amber-50 rounded-xl border-2 border-amber-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm font-hindi">
                <Heart size={18} className="text-amber-700 fill-amber-700" />
                <span>{t('वरिष्ठ नागरिकों (60+) एवं रोगियों हेतु विशेष छूट ("असमर्थे अनुकल्पः")', 'Senior & Health Considerations ("Asamarthe Anukalpah")')}</span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-hindi">
                {activeVrat.diet_rules.elderly_guideline_hi}
              </p>
              <div className="p-2 bg-white/70 rounded-lg text-[11px] text-amber-900/90 italic font-hindi">
                📖 <em>{t('स्मृति वचन: "शरीरमाद्यं खलु धर्मसाधनम्" — शरीर की रक्षा धर्म का प्रथम साधन है। अस्वस्थता में प्राण रक्षा सर्वोपरि है।', 'Scriptural principle: The physical body is the foremost instrument of Dharma. Health preservation takes precedence.')}</em>
              </div>
            </div>

            {/* Parana Timing & Method */}
            <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 flex items-start gap-2.5">
              <Clock size={18} className="text-indigo-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-text-secondary">
                <strong className="text-indigo-950 font-hindi">{t('पारण मुहूर्त एवं विधि', 'Parana (Breaking Fast)')}: </strong>
                <span>{activeVrat.diet_rules.parana_timing_hi}</span>
              </div>
            </div>
          </section>
        </article>
      )}
    </div>
  );
}
