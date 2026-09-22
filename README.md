# 🪔 Trupti - Your Gateway to Spirituality

> **A cross-platform mobile application for Android & iOS built with React Native and Expo.**

[![Expo](https://img.shields.io/badge/Expo-SDK%2057-black?style=flat&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?style=flat&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Platforms-Android%20%7C%20iOS-brightgreen?style=flat)]()

---

## 📖 Overview

**Trupti** is a dedicated spiritual companion mobile application engineered for seamless daily devotion, meditation, and spiritual learning across Android and iOS devices.

### Core Features
- **Daily Darshan & Thought**: Inspiring spiritual quotes, daily thoughts, and tithi/panchang.
- **Mantras, Chants & Aartis**: High quality audio chanting, stotrams, and aarti library with background playback capability.
- **Prayer & Scripture Reader**: Clean typography for reading sacred texts, chalisa, and shlokas with Hindi, Sanskrit, and English translations.
- **Sadhana & Meditation Timer**: Focus timer and daily streak tracker to nurture daily spiritual practices.
- **Cross-Platform Parity**: Unified TypeScript codebase delivering 60+ FPS native performance on both Android and iOS.

---

## 🏛️ Project Architecture

```
trupti/
├── app/                      # File-based routing (Expo Router)
│   ├── (tabs)/               # Bottom tab navigation
│   │   ├── index.tsx         # Home / Daily Darshan & Highlights
│   │   ├── explore.tsx       # Chants, Prayers & Spiritual Library
│   │   └── _layout.tsx       # Tab bar navigation configuration
│   ├── +not-found.tsx        # 404 handler
│   └── _layout.tsx           # Root navigation & theme provider
├── assets/
│   └── images/               # App icons, splash screens, and imagery
├── components/               # Reusable UI widgets, cards, and theme elements
├── constants/                # App colors, spiritual themes, and typography
├── app.json                  # Expo, Android (package) & iOS (bundle ID) configuration
├── package.json              # Project dependencies and run scripts
└── tsconfig.json             # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or higher (tested on Node 24)
- **npm**: `v9.x` or higher
- **Expo Go App**: Download on your physical [Android (Google Play)](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS (App Store)](https://apps.apple.com/app/expo-go/id982107779) phone for instant live testing.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run start
```
Scan the QR code displayed in the terminal using the Expo Go app on Android, or the Camera app on iOS.

---

## 📱 Building & Running on Android & iOS

### Running on Android
- **Via Physical Device**: Scan the Metro QR code with Expo Go.
- **Via Android Emulator / Native Build**:
  ```bash
  npm run android
  ```

### Running on iOS
- **Without a Mac (from Windows)**: Scan the QR code using the iOS Camera app to launch directly inside the **Expo Go** app.
- **Via Cloud Production Build (EAS)**:
  ```bash
  npx eas-cli build -p ios
  ```

---

## 📄 License & Attribution

- **Organization**: [Indie Orchard](https://github.com/indieorchard)
- **Repository**: [indieorchard/trupti](https://github.com/indieorchard/trupti)
