import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.info('[YM] injecting loader...');
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              console.info('[YM] loader inserted, waiting for ym...');

              ym(103969698, "init", {
                ssr:true,
                webvisor:true,
                clickmap:true,
                ecommerce:"dataLayer",
                accurateTrackBounce:true,
                trackLinks:true
              });
              console.info('[YM] init called with counter 103969698');

              (function(){
                var tryCount = 0;
                var interval = setInterval(function(){
                  tryCount++;
                  if (typeof ym === 'function') {
                    console.info('[YM] ready, sending hit...');
                    try {
                      var url = location.pathname + location.search + location.hash;
                      ym(103969698, 'hit', url);
                      console.info('[YM] hit sent:', url);
                    } catch (e) {
                      console.warn('[YM] hit error:', e);
                    }
                    clearInterval(interval);
                  } else if (tryCount >= 50) { // ~5s
                    console.warn('[YM] not ready after 5s');
                    clearInterval(interval);
                  }
                }, 100);
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/103969698" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
