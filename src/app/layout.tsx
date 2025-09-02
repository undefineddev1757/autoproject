import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { YandexMetricaProvider } from "next-yandex-metrica";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Star Auto - Премиум автомобили из Японии",
  description:
    "Профессиональный подбор и доставка премиум автомобилей напрямую из Японии. Полный спектр услуг по импорту японских авто.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <YandexMetricaProvider
          tagID={103969698}
          initParameters={{
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            ecommerce: "dataLayer",
          }}
          router="app"
        >
          {children}
        </YandexMetricaProvider>
      </body>
    </html>
  );
}
