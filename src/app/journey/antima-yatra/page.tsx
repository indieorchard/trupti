'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { Heart, Compass, CheckCircle2, Shield, BookOpen, AlertCircle } from 'lucide-react';

const dasaDaanItems = [
  { id: 1, name_hi: 'गोदान (अथवा उसका प्रतीक संकल्प)', desc_hi: 'वैतरणी नदी पार करने का आध्यात्मिक आधार माना गया है।' },
  { id: 2, name_hi: 'भूमि दान (अथवा तीर्थ सेवा)', desc_hi: 'पृथ्वी माता के ऋण से मुक्ति।' },
  { id: 3, name_hi: 'तिल दान (काले तिल)', desc_hi: 'यमदूतों और नकारात्मक ऊर्जा से रक्षा।' },
  { id: 4, name_hi: 'स्वर्ण दान', desc_hi: 'तेज और सूर्यलोक की प्राप्ति।' },
  { id: 5, name_hi: 'घृत (गाय का शुद्ध घी) दान', desc_hi: 'देवताओं की तृप्ति।' },
  { id: 6, name_hi: 'वस्त्र दान', desc_hi: 'जीवात्मा को मार्ग में वस्त्रों की सुलभता।' },
  { id: 7, name_hi: 'धान्य (अन्न) दान', desc_hi: 'परलोक मार्ग में तृप्ति और क्षुधा निवारण।' },
  { id: 8, name_hi: 'गुड़ दान', desc_hi: 'मधुर गति की प्राप्ति।' },
  { id: 9, name_hi: 'रौप्य (चांदी) दान', desc_hi: 'चंद्रलोक और पितृलोक में शांति।' },
  { id: 10, name_hi: 'लवण (सेंधा नमक) दान', desc_hi: 'यमभय और पापों का समूल नाश।' }
];

export default function AntimaYatraPage() {
  const { t } = useLanguage();

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-100 border-purple-200">
        <div className="flex items-start gap-3">
          <span className="text-4xl">🕊️</span>
          <div>
            <h1 className="font-heading text-2xl text-purple-900 font-bold">
              {t('अंतिम यात्रा — शांतिपूर्ण तैयारी एवं गरिमा', 'Antima Yatra — Peaceful Transition')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'सनातन शास्त्रों (गरुड़ पुराण व गीता) के अनुसार मृत्यु भय नहीं अपितु नए वस्त्र धारण करने की यात्रा है।',
                'Scriptural guidance for peaceful transition, universal forgiveness, Dasa Daan, and family rites.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Gita Wisdom Quote */}
      <div className="p-4 bg-cream-100 rounded-xl border border-cream-300 text-center space-y-2">
        <p className="font-sanskrit text-shloka text-saffron-950 font-bold leading-relaxed">
          वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि ।<br />
          तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥
        </p>
        <p className="text-xs text-text-muted italic">
          (श्रीमद्भगवद्गीता २.२२)
        </p>
        <p className="text-body-hi text-text-secondary">
          {t(
            'जैसे मनुष्य पुराने वस्त्रों को त्यागकर नए वस्त्र धारण करता है, वैसे ही जीवात्मा पुराने शरीर को छोड़कर नए शरीर को प्राप्त होती है।',
            'Just as a person sheds worn-out garments and puts on new ones, the soul casts off old bodies and enters into new ones.'
          )}
        </p>
      </div>

      {/* 1. Universal Forgiveness (क्षमापना) */}
      <section className="card border-purple-200 space-y-2.5">
        <div className="flex items-center gap-2">
          <Heart className="text-purple-700" size={20} />
          <h2 className="font-heading text-xl font-bold text-text-primary">
            {t('१. सार्वभौमिक क्षमापना (हृदय की मुक्ति)', '1. Universal Forgiveness (Kshamapana)')}
          </h2>
        </div>
        <p className="text-body-hi text-text-secondary leading-relaxed">
          {t(
            'देह त्याग से पूर्व मन में किसी के प्रति भी क्रोध, ईर्ष्या, वैर या गिला-शिकवा नहीं रहना चाहिए। दोनों हाथ जोड़कर मन ही मन कहें:',
            'Before the final hour, release all accumulated grudges, resentments, and debts of pride:'
          )}
        </p>
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-950 font-medium font-hindi text-body-hi leading-relaxed text-center">
          "खामेमि सव्वे जीवा, सव्वे जीवा खमंतु मे ।<br />
          मित्ती मे सव्वभूएसु, वेरं मज्झं न केणइ ॥"<br />
          <span className="text-xs text-text-muted mt-1 block">
            (मैं समस्त जीवों से क्षमा मांगता हूँ, सब जीव मुझे क्षमा करें। मेरी मित्रता सभी से है, किसी से कोई वैर नहीं।)
          </span>
        </div>
      </section>

      {/* 2. Dasa Daan (दस महादान) */}
      <section className="card border-cream-200 space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="text-saffron-600" size={20} />
          <h2 className="font-heading text-xl font-bold text-text-primary">
            {t('२. गरुड़ पुराणोक्त दस महादान', '2. Dasa Daan (Ten Sacred Offerings)')}
          </h2>
        </div>
        <p className="text-xs text-text-muted">
          {t(
            'गरुड़ पुराण के अनुसार जीवनकाल में अथवा अंतिम समय में ये दस दान जीवात्मा के मार्ग को सुगम बनाते हैं:',
            'The ten charitable gifts ordained by Garuda Purana to grant serenity to the departing soul:'
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {dasaDaanItems.map(item => (
            <div key={item.id} className="p-2.5 bg-cream-50 rounded-lg border border-cream-200 text-xs">
              <span className="font-bold text-saffron-800">{item.id}. {item.name_hi}</span>
              <p className="text-text-muted mt-0.5">{item.desc_hi}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Guide for Family (परिवार हेतु निर्देश) */}
      <section className="card border-blue-200 space-y-2.5">
        <div className="flex items-center gap-2">
          <BookOpen className="text-blue-700" size={20} />
          <h2 className="font-heading text-xl font-bold text-text-primary">
            {t('३. अंतिम समय में परिवार हेतु निर्देश', '3. Sacred Rites for Family at Final Moments')}
          </h2>
        </div>
        <ul className="space-y-2 text-body-hi text-text-secondary">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span><strong>तुलसी दल एवं गंगाजल:</strong> अंत समय में मुख में तुलसी दल और पवित्र गंगाजल की कुछ बूंदें अर्पित करें।</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span><strong>भगवद्गीता आठवां अध्याय पाठ:</strong> कान के पास धीरे-धीरे गीता के 8वें अध्याय (अक्षरब्रह्मयोग) अथवा विष्णु सहस्रनाम का पाठ करें।</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span><strong>हरि नाम संकीर्तन:</strong> कमरे में शांत स्वर में "हरे राम हरे कृष्ण" अथवा "ॐ नमो नारायणाय" का अखंड जप चलने दें। रोना-पीटना शांत रखें।</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span><strong>भूमि शयन:</strong> प्राण छूटने से पूर्व कुशासन अथवा कंबल पर गंगाजल छिड़ककर शरीर को उत्तर दिशा की ओर सिर करके लिटाएं।</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
