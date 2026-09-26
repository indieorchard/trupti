'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { templesData } from '@/data/temples';
import { cn } from '@/lib/utils';
import { Search, MapPin, Clock, Calendar, ExternalLink, Video, CheckCircle, Info } from 'lucide-react';

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
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-saffron-50 to-cream-100 border-saffron-200">
        <div className="flex items-start gap-3">
          <span className="text-4xl">🛕</span>
          <div>
            <h1 className="font-heading text-2xl text-saffron-700 font-bold">
              {t('भारत के 65+ पवित्र तीर्थ एवं मंदिर', '65+ Sacred Temples of India')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'चार धाम, द्वादश ज्योतिर्लिंग, सप्त पुरी और शक्तिपीठ — वर्चुअल दर्शन एवं वरिष्ठ तीर्थयात्री सहायता विवरण सहित।',
                'Char Dham, 12 Jyotirlingas, Sapta Puri & Shakti Peethas with virtual darshan and senior accessibility guide.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('मंदिर, शहर, राज्य या देवता खोजें...', 'Search temple, city, state or deity...')}
          className="w-full pl-12 pr-4 py-3 bg-white border border-cream-300 rounded-xl font-hindi text-body-hi focus:outline-none focus:ring-2 focus:ring-saffron-500 shadow-sm"
        />
      </div>

      {/* Circuit Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {circuits.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCircuit(c.id)}
            className={cn(
              'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]',
              selectedCircuit === c.id
                ? 'bg-saffron-600 text-white shadow-sm'
                : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
            )}
          >
            {t(c.label_hi, c.label_en)}
          </button>
        ))}
      </div>

      {/* Results Counter */}
      <div className="text-sm font-hindi text-text-muted px-1">
        {t(`कुल ${filteredTemples.length} मंदिर उपलब्ध`, `Showing ${filteredTemples.length} temples`)}
      </div>

      {/* Temples List */}
      <div className="space-y-4">
        {filteredTemples.map((temple) => (
          <article
            key={temple.id}
            id={temple.id}
            className="card hover:shadow-md transition-shadow border-cream-200"
          >
            {/* Header: Name, Deity, Location */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-heading text-xl font-bold text-text-primary">
                  {temple.name}
                </h2>
                {temple.sanskrit_name && (
                  <p className="font-sanskrit text-saffron-700 text-sm mt-0.5">
                    {temple.sanskrit_name}
                  </p>
                )}
                <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1.5">
                  <MapPin size={14} className="text-saffron-600" />
                  <span>{temple.city}, {temple.state}</span>
                  <span className="mx-1">•</span>
                  <span className="font-medium text-text-secondary">🕉️ {temple.deity_name}</span>
                </div>
              </div>
            </div>

            {/* Significance */}
            <p className="text-body-hi text-text-secondary mt-3 leading-relaxed">
              {t(temple.significance_hi, temple.significance_en)}
            </p>

            {/* Timings & Best Time */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-cream-50 p-2.5 rounded-lg border border-cream-200">
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
              <div className="mt-3 p-3 bg-amber-50/50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-saffron-800 mb-1.5">
                  <Info size={14} />
                  <span>{t('वरिष्ठ नागरिक एवं दिव्यांग सहायता', 'Senior & Accessibility Features')}</span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs mb-1.5">
                  {temple.accessibility.wheelchair && (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                      ♿ {t('व्हीलचेयर उपलब्ध', 'Wheelchair Available')}
                    </span>
                  )}
                  {temple.accessibility.vip_darshan && (
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
                      🎖️ {t('वरिष्ठ विशेष कतार / VIP', 'Senior / VIP Fast Lane')}
                    </span>
                  )}
                  {temple.accessibility.battery_car && (
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">
                      🛺 {t('बैटरी कार / गोल्फ कार्ट', 'Battery Cart Available')}
                    </span>
                  )}
                </div>

                {temple.accessibility.elderly_support_notes && (
                  <p className="text-xs text-text-secondary leading-normal">
                    {temple.accessibility.elderly_support_notes}
                  </p>
                )}
              </div>
            )}

            {/* Virtual Darshan YouTube Embed */}
            {activeVideoId === temple.id ? (
              <div className="mt-3 aspect-video rounded-xl overflow-hidden border border-cream-300">
                <iframe
                  src={`https://www.youtube.com/embed/${temple.youtube_id}?autoplay=1`}
                  title={temple.name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="mt-3.5 pt-3 border-t border-cream-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                {temple.youtube_id && (
                  <button
                    onClick={() => setActiveVideoId(activeVideoId === temple.id ? null : temple.id)}
                    className="px-3 py-1.5 rounded-lg bg-saffron-100 text-saffron-800 hover:bg-saffron-200 font-hindi text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[40px]"
                  >
                    <Video size={15} />
                    <span>
                      {activeVideoId === temple.id 
                        ? t('वीडियो बंद करें', 'Close Video') 
                        : t('वर्चुअल दर्शन (वीडियो)', 'Virtual Darshan')}
                    </span>
                  </button>
                )}

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${temple.latitude},${temple.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-cream-100 text-text-secondary hover:bg-cream-200 font-hindi text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[40px]"
                >
                  <MapPin size={15} />
                  <span>{t('मानचित्र / मार्ग', 'Map & Route')}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </article>
        ))}

        {filteredTemples.length === 0 && (
          <div className="text-center py-12 card text-text-muted">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-body-hi">
              {t('कोई मंदिर नहीं मिला। कृपया दूसरा शब्द खोजें।', 'No temples found matching your search.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
