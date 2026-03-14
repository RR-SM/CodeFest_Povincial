# RRSM - CodeFest

A mobile app built with React Native (Expo) for monitoring Nepal's government infrastructure projects, budgets, and public procurement tenders. It promotes transparency and accountability through real-time data, AI-powered insights, and citizen reporting.

---

## Features

- **Dashboard** — Quick stats on active projects, total budget, open tenders, and completion rates
- **Budget Tracker** — Monitor government spending across infrastructure projects (NPR 398B+)
- **Projects** — Track progress of major national projects (e.g., Kathmandu-Terai Fast Track)
- **Tenders** — Browse open government procurement tenders
- **Transparency Reports** — Audit and accountability reports
- **Legal Framework** — Access relevant laws and regulations
- **AI Insights** — ML-powered anomaly detection and budget analysis
- **Report Issue** — Citizens can submit concerns directly
- **Multi-language Support** — Localization via LanguageContext
- **Dark/Light Theme** — System-aware theming

---

## Tech Stack

- [Expo](https://expo.dev) ~54 with Expo Router v6
- React Native 0.81 / React 19
- Firebase (Auth, Firestore)
- Supabase (database/storage)
- TailwindCSS (via NativeWind)
- TypeScript

---

## Prerequisites

- Node.js >= 18
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android Studio (for Android emulator) or Xcode (for iOS simulator)
- A physical device with Expo Go, or a configured emulator

---

## Setup

**1. Clone the repo**

```bash
git clone <repo-url>
cd rrsm-codefest
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment**

The app uses Supabase and Firebase. Update the credentials in:

- `app/config/supabase.ts` — replace `supabaseUrl` and `supabaseAnonKey` with your own project values
- `google-services.json` — replace with your Firebase project's config file (download from Firebase Console)

**4. Start the development server**

```bash
npm start
```

Then press:
- `a` to open on Android emulator
- `i` to open on iOS simulator
- Scan the QR code with Expo Go on a physical device

---

## Running on specific platforms

```bash
npm run android   # Android emulator/device
npm run ios       # iOS simulator (macOS only)
npm run web       # Browser
```

---

## Build (EAS)

This project uses [EAS Build](https://docs.expo.dev/build/introduction/) for production builds.

```bash
npm install -g eas-cli
eas login
eas build --platform android   # or ios
```

EAS project ID: `f29efafd-2ab6-483e-a0ec-ddc928bf4afb`

---

## Project Structure

```
app/
  (tabs)/         # Bottom tab screens (Home, Budget, Projects, Tenders, Settings)
  contexts/       # React contexts (Theme, Language, User)
  config/         # Supabase client config
  *.tsx           # Additional screens (AI Insights, Reports, Legal, etc.)
assets/           # Fonts, icons, images
constants/        # Shared icon/image references
```

---

## License

Private — all rights reserved.
