'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { RotateCcw, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';

const japaMantras = [
  { id: 'shiva', name_hi: 'ॐ नमः शिवाय', name_en: 'Om Namah Shivaya', deity: 'शिव' },
  { id: 'gayatri', name_hi: 'गायत्री मंत्र (ॐ भूर्भुवः स्वः...)', name_en: 'Gayatri Mantra', deity: 'गायत्री' },
  { id: 'mrityunjaya', name_hi: 'महामृत्युंजय मंत्र (ॐ त्र्यम्बकं...)', name_en: 'Maha Mrityunjaya Mantra', deity: 'महाकाल' },
  { id: 'krishna', name_hi: 'हरे कृष्ण हरे राम', name_en: 'Hare Krishna Maha Mantra', deity: 'श्रीकृष्ण' },
  { id: 'ram', name_hi: 'श्री राम जय राम जय जय राम', name_en: 'Sri Rama Jaya Rama', deity: 'श्रीराम' },
  { id: 'vasudeva', name_hi: 'ॐ नमो भगवते वासुदेवाय', name_en: 'Om Namo Bhagavate Vasudevaya', deity: 'विष्णु' },
  { id: 'ganesha', name_hi: 'ॐ गं गणपतये नमः', name_en: 'Om Gam Ganapataye Namah', deity: 'गणेश' },
];

export default function JapaPage() {
  const { t } = useLanguage();
  const [selectedMantra, setSelectedMantra] = useState(japaMantras[0]);
  const [beadCount, setBeadCount] = useState(0);
  const [malasCompleted, setMalasCompleted] = useState(0);
  const [totalJapa, setTotalJapa] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load lifetime japa count from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('trupti_total_japa');
      if (saved) setTotalJapa(parseInt(saved, 10));
    }
  }, []);

  // Web Audio Click sound generator
  const playClickSound = (isMalaComplete = false) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isMalaComplete) {
        // Bell resonance for mala complete (108)
        osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz healing bell tone
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } else {
        // Soft wooden bead click
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // AudioContext unavailable
    }
  };

  const handleBeadTap = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(25); // Subtle tactile haptic tick
    }

    const nextCount = beadCount + 1;
    const newTotal = totalJapa + 1;
    setTotalJapa(newTotal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('trupti_total_japa', newTotal.toString());
    }

    if (nextCount >= 108) {
      setBeadCount(0);
      setMalasCompleted(m => m + 1);
      playClickSound(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([80, 50, 120]); // Celebration vibration on mala completion
      }
    } else {
      setBeadCount(nextCount);
      playClickSound(false);
    }
  };

  const handleReset = () => {
    if (window.confirm(t('क्या आप वर्तमान माला शून्य करना चाहते हैं?', 'Reset current mala to zero?'))) {
      setBeadCount(0);
    }
  };

  const progressPercent = Math.round((beadCount / 108) * 100);

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-amber-50 to-orange-100 border-saffron-300">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="text-4xl">📿</span>
            <div>
              <h1 className="font-heading text-2xl text-saffron-800 font-bold">
                {t('डिजिटल जप माला (108 मणके)', 'Digital Japa Mala (108 Beads)')}
              </h1>
              <p className="text-body-hi text-text-secondary mt-1">
                {t('शांत मन से अपनी दैनिक नाम साधना संपन्न करें।', 'Count your daily mantra repetitions with mindfulness.')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-white border border-cream-300 text-saffron-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>

      {/* Mantra Selector */}
      <div className="card space-y-2 border-cream-200">
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
          {t('जप हेतु मंत्र चुनें', 'Select Mantra for Japa')}
        </label>
        <select
          value={selectedMantra.id}
          onChange={(e) => {
            const m = japaMantras.find(x => x.id === e.target.value);
            if (m) setSelectedMantra(m);
          }}
          className="w-full p-3.5 bg-cream-50 border border-cream-300 rounded-xl font-hindi text-body-hi font-medium focus:ring-2 focus:ring-saffron-500 min-h-[52px]"
        >
          {japaMantras.map(m => (
            <option key={m.id} value={m.id}>
              {m.name_hi} ({m.deity})
            </option>
          ))}
        </select>
      </div>

      {/* Japa Bead Visual Counter Card */}
      <div className="card border-saffron-300 bg-gradient-to-b from-white to-cream-50 text-center py-6 px-4 space-y-4 shadow-sm">
        {/* Active Mantra Banner */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
          <p className="font-sanskrit text-2xl font-bold text-saffron-950 leading-relaxed">
            {selectedMantra.name_hi}
          </p>
        </div>

        {/* Circular Progress & Bead Counter */}
        <div className="relative w-56 h-56 mx-auto flex flex-col items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-cream-200 stroke-current"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Progress Stroke */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-saffron-600 stroke-current transition-all duration-150"
              strokeWidth="7"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * beadCount) / 108}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Central Counter Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-5xl font-heading font-black text-saffron-800">
              {beadCount}
            </span>
            <span className="text-sm font-hindi font-medium text-text-muted mt-1">
              / 108 {t('मणके', 'Beads')}
            </span>
            <span className="text-xs text-saffron-700 font-bold mt-0.5">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Large Senior-First Tap Button */}
        <button
          onClick={handleBeadTap}
          className="w-full py-5 bg-gradient-to-r from-saffron-600 to-saffron-700 active:scale-[0.98] text-white rounded-2xl shadow-lg font-hindi text-2xl font-bold transition-all flex items-center justify-center gap-3 min-h-[72px]"
          aria-label={t('एक जप गिनें (टैप करें)', 'Count one repetition (Tap)')}
        >
          <span>📿</span>
          <span>{t('जप करें (यहाँ स्पर्श करें)', 'Tap to Count Japa')}</span>
        </button>

        {/* Malas Counter & Reset Controls */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-white rounded-xl border border-cream-200 text-left">
            <span className="text-xs text-text-muted block">{t('पूर्ण मालाएँ', 'Completed Malas')}</span>
            <p className="text-2xl font-bold text-saffron-800">{malasCompleted}</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-cream-200 text-left">
            <span className="text-xs text-text-muted block">{t('कुल कुल जप संख्या', 'Total Chants')}</span>
            <p className="text-2xl font-bold text-saffron-800">{totalJapa}</p>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs text-text-muted hover:text-saffron-700 flex items-center gap-1 font-hindi"
          >
            <RotateCcw size={13} />
            <span>{t('माला रीसेट करें', 'Reset Current Mala')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
