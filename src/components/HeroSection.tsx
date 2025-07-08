"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  MessageCircle,
  Star,
  Zap,
  Shield,
  Truck,
  FileText,
} from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";

export function HeroSection() {
  const scrollToCalculator = () => {
    const calcElement = document.getElementById("selector");
    if (calcElement) {
      calcElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-20 sm:pt-32 pb-16 sm:pb-20">
      {/* Advanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-8 sm:space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
            <Zap className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-200 text-xs sm:text-sm font-medium">
              Прямые поставки с аукционов
            </span>
          </div>

          <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                ЗАКАЖИТЕ ВАШ
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                АВТОМОБИЛЬ
              </span>
              <br />
              <span className="text-white/90">НАПРЯМУЮ</span>
            </h1>

            <div className="space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100/80 font-light leading-relaxed">
                Напрямую из Японии
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="h-1 w-12 sm:w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                <p className="text-base sm:text-lg text-purple-200 font-medium text-center">
                  Экономия до 30% от рыночной цены
                </p>
                <div className="h-1 w-12 sm:w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-300/80 leading-relaxed max-w-2xl mx-auto">
              Участвуйте в торгах онлайн вместе с нами! Полная прозрачность
              процесса и честная цена без скрытых комиссий.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center pt-4 w-full max-w-lg mx-auto">
            <Button
              onClick={scrollToCalculator}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Calculator className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
              Подобрать автомобиль
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-12 border-t border-white/10 w-full max-w-lg mx-auto">
            <div className="text-center group cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                8+
              </div>
              <div className="text-gray-300 text-xs sm:text-sm mt-1">
                лет на рынке
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-gray-300 text-xs sm:text-sm mt-1">
                довольных клиентов
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                10%
              </div>
              <div className="text-gray-300 text-xs sm:text-sm mt-1">
                предоплата
              </div>
            </div>
          </div>
        </div>

        {/* Bottom features with better mobile spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-white/10">
          {[
            {
              icon: Shield,
              title: "Гарантия качества",
              desc: "Проверенные автомобили с документами",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: Zap,
              title: "Быстрая доставка",
              desc: "От 7 до 30 дней в зависимости от модели",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: Truck,
              title: "Выгодные цены",
              desc: "Экономия до 20% от рыночной стоимости",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              icon: FileText,
              title: "Полное сопровождение",
              desc: "От подбора до получения ключей",
              gradient: "from-orange-500 to-red-500",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="group text-center cursor-pointer animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}
              >
                <feature.icon className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2 sm:mb-3 text-base sm:text-lg group-hover:text-blue-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
