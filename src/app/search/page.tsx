'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { Search, X, Sparkles, Clock, Mic, MicOff, TrendingUp, Compass, BookOpen } from 'lucide-react';
import { SearchResultItem } from '@/lib/db';

export default function SearchPage() {
  const { t, lang } = useLanguage();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [aiGuidance, setAiGuidance] = useState<{ hi: string; en: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Panchang-based dynamic trending topics based on current day of week
  const getPanchangTrending = () => {
    const day = new Date().getDay();
    switch (day) {
      case 1: // Monday (Somvar - Shiva)
        return [
          { text_hi: 'महामृत्युंजय मंत्र', text_en: 'Maha Mrityunjaya Mantra', query: 'महामृत्युंजय' },
          { text_hi: 'भगवान शिव', text_en: 'Lord Shiva', query: 'शिव' },
          { text_hi: 'काशी विश्वनाथ', text_en: 'Kashi Vishwanath', query: 'काशी विश्वनाथ' },
          { text_hi: 'प्रदोष व्रत', text_en: 'Pradosha Vrata', query: 'प्रदोष' },
          { text_hi: 'सोमनाथ ज्योतिर्लिंग', text_en: 'Somnath Temple', query: 'सोमनाथ' },
        ];
      case 2: // Tuesday (Mangalvar - Hanuman)
        return [
          { text_hi: 'श्री हनुमान चालीसा', text_en: 'Hanuman Chalisa', query: 'हनुमान चालीसा' },
          { text_hi: 'संकट मोचन स्तोत्र', text_en: 'Sankat Mochan', query: 'संकट मोचन' },
          { text_hi: 'बजरंग बाण', text_en: 'Bajrang Baan', query: 'बजरंग बाण' },
          { text_hi: 'अयोध्या राम मंदिर', text_en: 'Ayodhya Ram Mandir', query: 'अयोध्या' },
          { text_hi: 'सुंदरकांड', text_en: 'Sundarkand', query: 'हनुमान' },
        ];
      case 3: // Wednesday (Budhvar - Ganesha)
        return [
          { text_hi: 'भगवान गणेश', text_en: 'Lord Ganesha', query: 'गणेश' },
          { text_hi: 'सिद्धिविनायक मंदिर', text_en: 'Siddhivinayak Temple', query: 'सिद्धिविनायक' },
          { text_hi: 'गणेश संकटनाशन स्तोत्र', text_en: 'Ganesha Stotra', query: 'गणेश' },
          { text_hi: 'बुध ग्रह शांति', text_en: 'Budha Shanti', query: 'गणेश' },
        ];
      case 4: // Thursday (Guruvar - Vishnu/Brihaspati)
        return [
          { text_hi: 'श्रीमद्भगवद्गीता', text_en: 'Bhagavad Gita', query: 'भगवद्गीता' },
          { text_hi: 'भगवान विष्णु', text_en: 'Lord Vishnu', query: 'विष्णु' },
          { text_hi: 'बदरीनाथ धाम', text_en: 'Badrinath Dham', query: 'बदरीनाथ' },
          { text_hi: 'सत्यनारायण व्रत', text_en: 'Satyanarayan Vrat', query: 'सत्यनारायण' },
          { text_hi: 'विष्णु सहस्रनाम', text_en: 'Vishnu Sahasranama', query: 'विष्णु सहस्रनाम' },
        ];
      case 5: // Friday (Shukravar - Devi/Lakshmi)
        return [
          { text_hi: 'माँ दुर्गा चालीसा', text_en: 'Durga Chalisa', query: 'दुर्गा' },
          { text_hi: 'महालक्ष्मी स्तोत्र', text_en: 'Mahalakshmi Stotra', query: 'महालक्ष्मी' },
          { text_hi: 'वैष्णो देवी मंदिर', text_en: 'Vaishno Devi Temple', query: 'वैष्णो देवी' },
          { text_hi: 'कामाख्या शक्तिपीठ', text_en: 'Kamakhya Peetha', query: 'कामाख्या' },
          { text_hi: 'कनकधारा स्तोत्र', text_en: 'Kanakadhara Stotra', query: 'कनकधारा' },
        ];
      case 6: // Saturday (Shanivar - Shani Dev & Hanuman)
        return [
          { text_hi: 'शनि चालीसा व साढ़ेसाती', text_en: 'Shani Chalisa & Sade Sati', query: 'शनि' },
          { text_hi: 'शनि शिंगणापुर मंदिर', text_en: 'Shani Shingnapur', query: 'शनि शिंगणापुर' },
          { text_hi: 'हनुमान चालीसा', text_en: 'Hanuman Chalisa', query: 'हनुमान चालीसा' },
          { text_hi: 'कालभैरव अष्टकम्', text_en: 'Kalbhairav Ashtakam', query: 'कालभैरव' },
        ];
      default: // Sunday (Ravivar - Surya)
        return [
          { text_hi: 'भगवान सूर्य (आदित्य)', text_en: 'Lord Surya', query: 'सूर्य' },
          { text_hi: 'गायत्री महामंत्र', text_en: 'Gayatri Mantra', query: 'गायत्री' },
          { text_hi: 'कोणार्क सूर्य मंदिर', text_en: 'Konark Sun Temple', query: 'कोणार्क' },
          { text_hi: 'वैदिक शांति पाठ', text_en: 'Vedic Shanti Path', query: 'शांति पाठ' },
        ];
    }
  };

  const trendingTopics = getPanchangTrending();

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('trupti_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
    inputRef.current?.focus();
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term || term.trim().length === 0) return;
    const clean = term.trim();
    setRecentSearches(prev => {
      const updated = [clean, ...prev.filter(item => item !== clean)].slice(0, 6);
      try {
        localStorage.setItem('trupti_recent_searches', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('trupti_recent_searches');
    } catch (e) {}
  };

  // Perform instant search & AI intent resolution
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setAiGuidance(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const handler = setTimeout(async () => {
      try {
        // Fast DB search
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        const json = await res.json();
        if (json.success) {
          setResults(json.data || []);
        }

        // If query looks like a spiritual question or issue, query AI intent
        if (trimmed.length >= 3) {
          const aiRes = await fetch('/api/search/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: trimmed })
          });
          const aiJson = await aiRes.json();
          if (aiJson.success && aiJson.guidance_hi) {
            setAiGuidance({
              hi: aiJson.guidance_hi,
              en: aiJson.guidance_en || ''
            });
            if (aiJson.results && aiJson.results.length > 0) {
              setResults(prev => {
                const combined = [...prev];
                for (const r of aiJson.results) {
                  if (!combined.some(item => item.id === r.id)) {
                    combined.push(r);
                  }
                }
                return combined;
              });
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [query]);

  // Voice Search Handler via Web Speech API
  const handleVoiceSearch = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t('आपके ब्राउज़र में आवाज़ से खोजने की सुविधा समर्थित नहीं है।', 'Voice search is not supported in this browser.'));
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setQuery(transcript);
          saveRecentSearch(transcript);
        }
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  return (
    <div className="px-4 py-3 space-y-4 max-w-lg mx-auto">
      {/* Top Search Input Box */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-saffron-700" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveRecentSearch(query);
            }}
            placeholder={t('देवता, तीर्थ, मंत्र, गीता या व्रत खोजें...', 'Search deity, temple, mantra, gita...')}
            className="w-full pl-11 pr-20 py-3 bg-white border-2 border-saffron-300 focus:border-saffron-600 rounded-2xl font-hindi text-body-hi text-text-primary focus:outline-none shadow-sm transition-all"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="p-1.5 text-text-muted hover:text-text-primary rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label={t('साफ़ करें', 'Clear')}
              >
                <X size={18} />
              </button>
            ) : null}

            {/* Voice Input Button */}
            <button
              onClick={handleVoiceSearch}
              className={cn(
                'p-2 rounded-xl transition-all min-h-[48px] min-w-[48px] flex items-center justify-center',
                isListening
                  ? 'bg-sacred-vermillion text-white animate-pulse'
                  : 'text-saffron-700 hover:bg-cream-200'
              )}
              title={t('बोलकर खोजें', 'Voice Search')}
              aria-label={t('बोलकर खोजें', 'Voice Search')}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* AI Vedic Spiritual Intent Box (When available) */}
      {aiGuidance && (
        <section className="p-3.5 bg-gradient-to-r from-amber-50 via-cream-50 to-orange-50 border border-saffron-300 rounded-2xl shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">✨</span>
            <span className="text-xs font-bold text-saffron-800 uppercase tracking-wider font-hindi">
              {t('तृप्ति वैदिक मार्गदर्शन', 'Trupti Vedic Guidance')}
            </span>
          </div>
          <p className="font-hindi text-body-hi text-text-primary leading-relaxed">
            {t(aiGuidance.hi, aiGuidance.en)}
          </p>
        </section>
      )}

      {/* When Query is active: Results List */}
      {query ? (
        <section className="space-y-3" aria-label={t('खोज परिणाम', 'Search Results')}>
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-hindi text-text-muted">
              {isLoading
                ? t('खोज रहे हैं...', 'Searching...')
                : t(`${results.length} परिणाम मिले`, `Found ${results.length} results`)}
            </span>
          </div>

          <div className="space-y-2.5">
            {results.map((item) => (
              <article
                key={`${item.type}-${item.id}`}
                className="card flex items-center justify-between gap-3 p-3.5 hover:shadow-md transition-all border-cream-200 bg-white group"
              >
                <Link
                  href={item.url}
                  onClick={() => saveRecentSearch(query)}
                  className="flex items-center gap-3.5 flex-1 min-w-0"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-xs border border-cream-200">
                    <SmartImage
                      src={item.image_url}
                      alt={item.title}
                      aspectRatio="square"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[11px] font-bold text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded-md mb-1 font-hindi">
                      {item.badge}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-text-primary truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary truncate mt-0.5 font-hindi">
                      {item.subtitle}
                    </p>
                  </div>
                </Link>

                <div className="flex-shrink-0 flex items-center gap-1">
                  <FavoriteButton
                    item={{
                      id: item.id,
                      type: item.type as any,
                      title_hi: item.title,
                      title_en: item.title,
                      subtitle_hi: item.subtitle,
                      subtitle_en: item.subtitle,
                      url: item.url,
                      image_url: item.image_url,
                      badge: item.badge
                    }}
                    className="p-2"
                  />
                </div>
              </article>
            ))}

            {!isLoading && results.length === 0 && (
              <div className="card text-center py-12 text-text-muted space-y-2">
                <span className="text-4xl block">🔍</span>
                <p className="font-heading text-lg text-text-primary">
                  {t('कोई परिणाम नहीं मिला', 'No results found')}
                </p>
                <p className="text-sm font-hindi">
                  {t(
                    'कृपया वर्तनी जांचें या नीचे दिए गए प्रचलित विषयों में से चुनें।',
                    'Please check the spelling or pick from trending sacred topics below.'
                  )}
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* Empty Query: Trending & Recent Searches */
        <div className="space-y-5">
          {/* Panchang-driven Trending Searches */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-1.5 px-1">
              <TrendingUp size={18} className="text-saffron-600" />
              <h2 className="font-heading text-base font-bold text-text-primary">
                {t('आज के पंचांग अनुसार प्रचलित (ट्रेंडिंग)', 'Trending According to Today\'s Panchang')}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectTerm(topic.query)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-saffron-50 to-cream-100 hover:from-saffron-100 hover:to-orange-50 border border-saffron-200 text-saffron-900 font-hindi font-medium text-sm transition-all shadow-2xs hover:scale-105 active:scale-95"
                >
                  ⚡ {t(topic.text_hi, topic.text_en)}
                </button>
              ))}
            </div>
          </section>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <section className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-text-muted" />
                  <h2 className="font-heading text-base font-bold text-text-primary">
                    {t('हाल की खोजें (Recent Searches)', 'Recent Searches')}
                  </h2>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-text-muted hover:text-sacred-vermillion transition-colors font-hindi"
                >
                  {t('इतिहास साफ़ करें', 'Clear All')}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectTerm(term)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-text-secondary font-hindi text-sm transition-all"
                  >
                    <span>🕒</span>
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Quick Discover Collections */}
          <section className="space-y-2.5">
            <h2 className="font-heading text-base font-bold text-text-primary px-1">
              {t('लोकप्रिय आध्यात्मिक संग्रह', 'Popular Sacred Libraries')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                href="/knowledge/vrat-sangrah"
                className="card p-3.5 flex items-center gap-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-md transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🗓️</span>
                <div>
                  <h3 className="font-heading text-sm font-bold text-text-primary">
                    {t('व्रत संग्रह', 'Vrat Sangrah')}
                  </h3>
                  <p className="text-[11px] text-text-muted font-hindi">
                    {t('आहार नियम व पारण', 'Diet & Parana Rules')}
                  </p>
                </div>
              </Link>

              <Link
                href="/knowledge/aarti"
                className="card p-3.5 flex items-center gap-3 bg-gradient-to-br from-red-50 to-amber-50 border-red-200 hover:shadow-md transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🪔</span>
                <div>
                  <h3 className="font-heading text-sm font-bold text-text-primary">
                    {t('आरती संग्रह', 'Aarti Sangrah')}
                  </h3>
                  <p className="text-[11px] text-text-muted font-hindi">
                    {t('15+ संपूर्ण आरतियां', '15+ Sacred Aartis')}
                  </p>
                </div>
              </Link>

              <Link
                href="/journey/temples"
                className="card p-3.5 flex items-center gap-3 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:shadow-md transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🛕</span>
                <div>
                  <h3 className="font-heading text-sm font-bold text-text-primary">
                    {t('तीर्थ व मंदिर', 'Temples & Pilgrimage')}
                  </h3>
                  <p className="text-[11px] text-text-muted font-hindi">
                    {t('65+ पावन धाम', '65+ Holy Shrines')}
                  </p>
                </div>
              </Link>

              <Link
                href="/knowledge/gita"
                className="card p-3.5 flex items-center gap-3 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:shadow-md transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">📖</span>
                <div>
                  <h3 className="font-heading text-sm font-bold text-text-primary">
                    {t('गीता भंडार', 'Gita Treasury')}
                  </h3>
                  <p className="text-[11px] text-text-muted font-hindi">
                    {t('14+ पवित्र गीताएं', '14+ Sacred Gitas')}
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
