import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/hooks/useLanguage';
import { FontScaleProvider } from '@/hooks/useFontScale';
import BottomNav from '@/components/layout/BottomNav';
import Header from '@/components/layout/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'तृप्ति — Trupti | Your Gateway to Spiritual Fulfillment',
  description:
    'तृप्ति — आत्मा की संतुष्टि का द्वार। A digital spiritual companion for daily sadhana, vratas, pilgrimage, and the art of conscious living rooted in Sanatana Dharma.',
  keywords: [
    'trupti', 'तृप्ति', 'hindu', 'spiritual', 'sadhana', 'panchang',
    'mantra', 'aarti', 'gita', 'temple', 'pilgrimage', 'moksha',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
  themeColor: '#C25E00',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" dir="ltr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <FontScaleProvider>
            <div className="flex flex-col min-h-screen max-w-lg mx-auto w-full">
              <Header showFontScaler />
              <main className="flex-1 pb-24">
                {children}
              </main>
              <BottomNav />
            </div>
          </FontScaleProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
