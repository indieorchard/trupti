'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { templesData } from '@/data/temples';
import { getTempleImage } from '@/data/imageMap';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { ArrowLeft, Search, MapPin, Clock, Calendar, ExternalLink, Video, CheckCircle, Info } from 'lucide-react';

const circuits = [
  { id: 'all', label_hi: 'सभी (65)', label_en: 'All (65)' },
  { id: 'char_dham', label_hi: 'चार धाम', label_en: 'Char Dham' },
  { id: 'jyotirlinga', label_hi: 'द्वादश ज्योतिर्लिंग (12)', label_en: '12 Jyotirlingas' },
  { id: 'sapta_puri', label_hi: 'सप्त मोक्ष पुरी', label_en: 'Sapta Puri' },
  { id: 'shakti_peetha', label_hi: 'शक्तिपीठ', label_en: 'Shakti Peethas' },
  { id: 'south_mahatirtha', label_hi: 'दक्षिण महातीर्थ', label_en: 'South Temples' },
  { id: 'north_india', label_hi: 'उत्तर भारत', label_en: 'North India' },
  { id: 'west_india', label_hi: 'पश्चिम भारत', label_en: 'West India' },
  { id: 'east_india', label_hi: 'पूर्व भारत', label_en: 'East India' },
];

export default function TemplesPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedCircuit, setSelectedCircuit] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const filteredTemples = templesData.filter(temple => {
    const matchesCircuit = selectedCircuit === 'all' || temple.circuit.includes(selectedCircuit);
    const matchesSearch = 
      temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (temple.sanskrit_name && temple.sanskrit_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      temple.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.deity_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.significance_hi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCircuit && matchesSearch;
  });

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      {/* Header Banner with Explicit Back Button */}
      <div className="card bg-gradient-to-r from-saffron-50 via-cream-50 to-orange-100 border-saffron-200">
        <div className="flex items-start gap-3">
          <button
            onClick={() => router.push('/journey')}
            className="p-2 rounded-xl bg-white border border-saffron-200 text-saffron-700 hover:bg-cream-100 transition-colors shadow-2xs mt-0.5"
            aria-label={t('पीछे जाएं', 'Go back')}
          >
            <ArrowLeft size={20} className="stroke-[2.5]" />
          </button>
          <div>
            <h1 className="font-heading text-2xl text-saffron-800 font-bold">
              {t('भारत के 65+ पवित्र तीर्थ एवं मंदिर', '65+ Sacred Temples of India')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'चार धाम, द्वादश ज्योतिर्लिंग, सप्त पुरी और शक्तिपीठ — पावन दर्शन एवं वरिष्ठ तीर्थयात्री सहायता विवरण सहित।',
                'Char Dham, 12 Jyotirlingas, Sapta Puri & Shakti Peethas with sacred darshan and senior pilgrim guide.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-saffron-700" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('मंदिर, शहर, राज्य या देवता का नाम खोजें...', 'Search temple, city, state, or deity...')}
          className="w-full pl-12 pr-4 py-3 bg-white border border-cream-300 rounded-2xl font-hindi text-body-hi focus:outline-none focus:ring-2 focus:ring-saffron-500 shadow-xs"
        />
      </div>

      {/* Circuit Filter Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {circuits.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCircuit(c.id)}
            className={cn(
              'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]',
              selectedCircuit === c.id
                ? 'bg-saffron-600 text-white shadow-xs'
                : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
            )}
          >
            {t(c.label_hi, c.label_en)}
          </button>
        ))}
      </div>

      {/* Count Indicator */}
      <div className="text-xs font-hindi text-text-muted px-1 flex items-center justify-between">
        <span>{t(`कुल ${filteredTemples.length} मंदिर उपलब्ध`, `Showing ${filteredTemples.length} temples`)}</span>
        <span>{t('⭐ स्टार करें ताकि एक क्लिक में सुलभ हो', '⭐ Star to save in 1 click')}</span>
      </div>

      {/* Temples List */}
      <div className="space-y-4">
        {filteredTemples.map((temple) => {
          const imgUrl = (temple as any).image_url || getTempleImage(temple.id, temple.circuit);

          return (
            <article
              key={temple.id}
              id={temple.id}
              className="card hover:shadow-md transition-shadow border-cream-200 bg-white overflow-hidden p-4 space-y-3"
            >
              {/* Image & Header */}
              <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden shadow-xs border border-cream-200 group">
                <SmartImage
                  src={imgUrl}
                  alt={temple.name}
                  aspectRatio="wide"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                {/* Overlay Badge for Circuit */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                  {temple.circuit.map(cir => (
                    <span
                      key={cir}
                      className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-xs text-saffron-800 shadow-2xs font-hindi"
                    >
                      {cir === 'jyotirlinga' ? '🕉️ ज्योतिर्लिंग' : cir === 'char_dham' ? '🪷 चार धाम' : cir === 'sapta_puri' ? '✨ मोक्ष पुरी' : '🛕 महातीर्थ'}
                    </span>
                  ))}
                </div>

                {/* Floating Star Button */}
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs rounded-xl shadow-xs">
                  <FavoriteButton
                    item={{
                      id: temple.id,
                      type: 'temple',
                      title_hi: temple.name,
                      title_en: temple.name,
                      subtitle_hi: `${temple.city}, ${temple.state}`,
                      subtitle_en: `${temple.city}, ${temple.state}`,
                      url: `/journey/temples#${temple.id}`,
                      image_url: imgUrl,
                      badge: '🛕 तीर्थ व मंदिर'
                    }}
                    className="p-1.5"
                  />
                </div>
              </div>

              {/* Title & Location */}
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text-primary leading-tight">
                      {temple.name}
                    </h2>
                    {temple.sanskrit_name && (
                      <p className="font-sanskrit text-saffron-700 text-sm mt-0.5">
                        {temple.sanskrit_name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1.5">
                  <MapPin size={14} className="text-saffron-600 flex-shrink-0" />
                  <span>{temple.city}, {temple.state}</span>
                  <span className="mx-1">•</span>
                  <span className="font-medium text-text-secondary">🕉️ {temple.deity_name}</span>
                </div>
              </div>

              {/* Significance */}
              <p className="text-body-hi text-text-secondary leading-relaxed">
                {t(temple.significance_hi, temple.significance_en)}
              </p>

              {/* Timings & Best Season */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-cream-50 p-2.5 rounded-xl border border-cream-200">
                {temple.darshan_timings && (
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <Clock size={14} className="text-saffron-600 flex-shrink-0" />
                    <span><strong>{t('दर्शन समय', 'Timings')}:</strong> {temple.darshan_timings}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <Calendar size={14} className="text-saffron-600 flex-shrink-0" />
                  <span><strong>{t('उत्तम समय', 'Best Season')}:</strong> {temple.best_time}</span>
                </div>
              </div>

              {/* Senior Accessibility Section */}
              {temple.accessibility && (
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-saffron-800">
                    <Info size={14} />
                    <span>{t('वरिष्ठ नागरिक एवं दिव्यांग सहायता', 'Senior & Accessibility Features')}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {temple.accessibility.wheelchair && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-medium">
                        ♿ {t('व्हीलचेयर उपलब्ध', 'Wheelchair Available')}
                      </span>
                    )}
                    {temple.accessibility.vip_darshan && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-medium">
                        🎖️ {t('वरिष्ठ विशेष कतार / VIP', 'Senior / VIP Fast Lane')}
                      </span>
                    )}
                    {temple.accessibility.battery_car && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-medium">
                        🛺 {t('बैटरी कार सेवा', 'Battery Car Service')}
                      </span>
                    )}
                  </div>

                  {temple.accessibility.elderly_support_notes && (
                    <p className="text-xs text-text-secondary italic pt-1 border-t border-amber-200/60">
                      💡 {temple.accessibility.elderly_support_notes}
                    </p>
                  )}
                </div>
              )}

              {/* Virtual Darshan Video */}
              {temple.youtube_id && (
                <div className="pt-2">
                  {activeVideoId === temple.id ? (
                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xs border border-cream-300">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${temple.youtube_id}?autoplay=1`}
                        title={`Virtual Darshan of ${temple.name}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveVideoId(temple.id)}
                      className="btn-secondary w-full text-sm py-2 min-h-[44px] flex items-center justify-center gap-2 border-saffron-300 bg-saffron-50/50 hover:bg-saffron-100"
                    >
                      <Video size={16} className="text-saffron-700" />
                      <span>{t('वर्चुअल पावन दर्शन (वीडियो)', 'Watch Virtual Darshan')}</span>
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}

        {filteredTemples.length === 0 && (
          <div className="text-center py-12 card text-text-muted">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-body-hi">
              {t('कोई मंदिर नहीं मिला। कृपया अन्य शब्द खोजें।', 'No temples found matching your query.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
