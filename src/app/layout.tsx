import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientBody from "./ClientBody";
import YandexMetrika from "../components/YandexMetrika";

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
    <html
      lang="en"
      className={`scroll-smooth ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>

    
        {/* /Top.Mail.Ru counter */}
      </head>
      <body suppressHydrationWarning className="antialiased">
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<div><img src="https://top-fwz1.mail.ru/counter?id=3682588;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>',
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<div><img src="https://mc.yandex.ru/watch/103969698" style="position:absolute; left:-9999px;" alt="" /></div>',
          }}
        />
        <YandexMetrika />
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
