"use client";

import { Phone, Mail } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  return (
    <section className="relative overflow-hidden py-16" id="contacts">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Animated background elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-in slide-in-from-bottom duration-1000">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              КОНТАКТЫ
            </span>
          </h2>

          <p className="text-xl text-blue-100/80 max-w-3xl mx-auto font-light leading-relaxed">
            Свяжитесь с нами удобным способом. Мы всегда готовы помочь с выбором
            автомобиля мечты.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact methods */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center">
              <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-blue-400/50 rounded-tr-2xl" />

              <a
                href="https://t.me/gsat_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-500">
                  <img 
                    src="/uploads/tg.png" 
                    alt="Telegram" 
                    className="w-10 h-10" 
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  Telegram
                </h3>
              </a>
              
              <p 
                className="text-blue-200/80 text-sm cursor-pointer hover:text-blue-100 transition-colors"
                onClick={() => copyToClipboard('@gsat_ru', 'Telegram')}
              >
                @gsat_ru
              </p>
              {copiedText === 'Telegram' && (
                <p className="text-green-400 text-xs mt-1 animate-pulse">Скопировано!</p>
              )}
              <p className="text-sm text-blue-300/60 mt-2">
                Быстрые ответы 24/7
              </p>
            </div>

            <div className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center">
              <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-green-400/50 rounded-tr-2xl" />

              <a
                href="https://wa.me/79823258220"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 group-hover:scale-110 transition-all duration-500">
                  <img 
                    src="/uploads/whatsapp.png" 
                    alt="WhatsApp" 
                    className="w-10 h-10" 
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors duration-300">
                  WhatsApp
                </h3>
              </a>
              
              <p 
                className="text-green-200/80 text-sm cursor-pointer hover:text-green-100 transition-colors"
                onClick={() => copyToClipboard('+7 (915) 203-14-67', 'WhatsApp')}
              >
                +7 (915) 203-14-67
              </p>
              {copiedText === 'WhatsApp' && (
                <p className="text-green-400 text-xs mt-1 animate-pulse">Скопировано!</p>
              )}
              <p className="text-sm text-green-300/60 mt-2">
                Онлайн консультации
              </p>
            </div>

            <div className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center">
              <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-purple-400/50 rounded-tr-2xl" />

              <a
                href="tel:+79010784098"
                className="block"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-500">
                  <Phone className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  Телефон
                </h3>
              </a>
              
              <p 
                className="text-purple-200/80 text-sm cursor-pointer hover:text-purple-100 transition-colors"
                onClick={() => copyToClipboard('+7 (901) 078-40-98', 'Телефон')}
              >
                +7 (901) 078-40-98
              </p>
              {copiedText === 'Телефон' && (
                <p className="text-green-400 text-xs mt-1 animate-pulse">Скопировано!</p>
              )}
           
            </div>

            <div className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center">
              <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-yellow-400/50 rounded-tr-2xl" />

              <a
                href="mailto:support@globalstarauto.ru"
                className="block"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/50 group-hover:scale-110 transition-all duration-500">
                  <Mail className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                  Email
                </h3>
              </a>
              
              <p 
                className="text-yellow-200/80 text-xs cursor-pointer hover:text-yellow-100 transition-colors break-all"
                onClick={() => copyToClipboard('support@globalstarauto.ru', 'Email')}
              >
                support@globalstarauto.ru
              </p>
              {copiedText === 'Email' && (
                <p className="text-green-400 text-xs mt-1 animate-pulse">Скопировано!</p>
              )}
              <p className="text-sm text-yellow-300/60 mt-2">Ответ в течение дня</p>
            </div>
          </div>

          {/* Office address */}
          {/* <div className="mt-16 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-4">📍</div>
              <h4 className="text-xl font-bold text-white mb-2">
                Офис в Москве
              </h4>
              <p className="text-gray-300">
                ул. Краснопролетарская, д. 17, стр. 4, офис 082
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
