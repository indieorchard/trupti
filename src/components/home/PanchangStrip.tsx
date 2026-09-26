'use client';

import { useLanguage } from '@/hooks/useLanguage';

// MVP: Static sample panchang data (will be dynamic from DB later)
const samplePanchang = {
  tithi_hi: 'शुक्ल एकादशी',
  tithi_en: 'Shukla Ekadashi',
  var_hi: 'गुरुवार',
  var_en: 'Thursday',
  masa_hi: 'आश्विन',
  masa_en: 'Ashvin',
  nakshatra_hi: 'रोहिणी',
  nakshatra_en: 'Rohini',
  yoga_hi: 'शुभ',
  yoga_en: 'Shubh',
  sunrise: '6:12 AM',
  sunset: '6:04 PM',
  rahukaal: '1:30 - 3:00 PM',
  vratas: ['पापांकुशा एकादशी'],
};

export default function PanchangStrip() {
  const { t } = useLanguage();
  const p = samplePanchang;

  return (
    <section
      className="card"
      aria-label={t('आज का पंचांग', 'Today\'s Panchang')}
    >
      <h3 className="font-heading text-lg text-saffron-600 font-bold mb-3">
        📅 {t('आज का पंचांग', 'Today\'s Panchang')}
      </h3>

      <div className="grid grid-cols-2 gap-3 text-body-hi">
        <div>
          <span className="text-text-muted text-sm">{t('तिथि', 'Tithi')}</span>
          <p className="font-semibold">{t(p.tithi_hi, p.tithi_en)}</p>
        </div>
        <div>
          <span className="text-text-muted text-sm">{t('वार', 'Day')}</span>
          <p className="font-semibold">{t(p.var_hi, p.var_en)}</p>
        </div>
        <div>
          <span className="text-text-muted text-sm">{t('मास', 'Month')}</span>
          <p className="font-semibold">{t(p.masa_hi, p.masa_en)}</p>
        </div>
        <div>
          <span className="text-text-muted text-sm">{t('नक्षत्र', 'Nakshatra')}</span>
          <p className="font-semibold">{t(p.nakshatra_hi, p.nakshatra_en)}</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-cream-200 flex flex-wrap gap-4 text-sm text-text-secondary">
        <span>🌅 {t('सूर्योदय', 'Sunrise')}: <strong>{p.sunrise}</strong></span>
        <span>🌇 {t('सूर्यास्त', 'Sunset')}: <strong>{p.sunset}</strong></span>
        <span>🚫 {t('राहुकाल', 'Rahukaal')}: <strong>{p.rahukaal}</strong></span>
      </div>

      {p.vratas.length > 0 && (
        <div className="mt-3 pt-3 border-t border-cream-200">
          <span className="text-sacred-vermillion font-semibold text-body-hi">
            📿 {t('व्रत', 'Vrat')}: {p.vratas.join(', ')}
          </span>
        </div>
      )}
    </section>
  );
}
