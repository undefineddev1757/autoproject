import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import YandexMetrikaInitializer from "@/components/yandex-metrika/YandexMetrikaInitializer";
import YandexMetrikaContainer from "@/components/yandex-metrika/YandexMetrikaContainer";
import { YM_COUNTER_ID, analyticsEnabled } from "@/components/yandex-metrika/constants";

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
      <head>
        <YandexMetrikaInitializer
          id={YM_COUNTER_ID}
          initParameters={{ ssr: true, webvisor: true, clickmap: true, ecommerce: "dataLayer", accurateTrackBounce: true, trackLinks: true, defer: true }}
        />
      </head>
      <body>
        {children}
        <YandexMetrikaContainer enabled={analyticsEnabled} />
      </body>
    </html>
  );
}
