# तृप्ति (Trupti) — Your Gateway to Spiritual Fulfillment

> A mobile-responsive web companion for Sanatana Dharma practitioners, designed with love for the 60+ generation.

## 🪷 What is Trupti?

Trupti (तृप्ति — Soul-Contentment) is a digital spiritual companion that guides practitioners through structured spiritual journeys rooted in Hindu scriptures and traditions. Unlike content libraries, Trupti provides **pathways, not just pages.**

## ✨ Features (MVP)

- 🌅 **Prahar-Aware Home Screen** — adapts to the time of day with relevant guidance
- 📅 **Panchang Integration** — daily tithi, nakshatra, vrat info, sunrise/sunset
- ✅ **Daily Kriya Checklist** — interactive tracker for 10 daily spiritual practices
- 📿 **90-Day Moksha Sadhana** — structured 3-phase spiritual journey
- 🛕 **Temple Explorer** — Char Dham, Sapta Puri, 12 Jyotirlinga with virtual darshan
- 📖 **Sacred Text Reader** — Gita, Vishnu Sahasranama, Garuda Purana
- 🪔 **Audio Library** — offline-capable aartis, stotras, and mantras
- 📿 **Japa Mala Counter** — digital mala with tracking
- 🔤 **Bilingual** — Hindi (primary) + English toggle
- ♿ **Senior-First Design** — 56dp touch targets, 18sp+ fonts, WCAG AAA contrast

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom design system
- **Fonts:** Noto Sans/Serif Devanagari, Tiro Devanagari Hindi, Inter
- **Target:** Mobile-responsive PWA (installable on Android)

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Home (Today/Prahar view)
│   ├── journey/      # Journey pages
│   ├── knowledge/    # Knowledge library pages
│   ├── settings/     # Settings page
│   └── welcome/      # Onboarding flow
├── components/       # React components
│   ├── layout/       # Header, BottomNav
│   ├── home/         # PanchangStrip, DailyChecklist, QuickAccess
│   ├── journey/      # Journey-specific components
│   └── knowledge/    # Reader, Audio player
├── data/             # Seed data (JSON)
├── hooks/            # Custom hooks (useLanguage, useFontScale)
├── lib/              # Utilities
└── types/            # TypeScript types
```

## 🎨 Design System

- **Warm Cream Background:** `#FFFDF8`
- **Saffron Accent:** `#C25E00`
- **Temple Brass:** `#8D6E63`
- **Min Touch Target:** 56 × 56 dp
- **Min Font Size:** 18sp (Hindi body)
- **Persistent Font Scaler:** `[ अ- | अ | अ+ | अ++ ]`
- **Zero Ads. Ever.**

## 📜 License

© 2026 IndieOrchard. All rights reserved.

---

*तृप्ति — आत्मा की संतुष्टि का द्वार*
*(Trupti — Gateway to Soul-Contentment)*
