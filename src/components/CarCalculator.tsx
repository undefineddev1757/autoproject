"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/api";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, Users, Settings, Zap } from "lucide-react";

export function CarCalculator() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    engine: "",
    budget: "",
    name: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 1) return numbers;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7)
      return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9)
      return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setFormData({ ...formData, phone: formatted });
  };

  const carBrands = [
    "Audi",
    "BMW",
    "Mercedes-Benz",
    "Porsche",
    "Land Rover",
    "Lexus",
    "Volkswagen",
    "Toyota",
    "Nissan",
    "Honda",
    "Hyundai",
    "Kia",
    "Mazda",
    "Subaru",
    "Ford",
    "Chevrolet",
    "Infiniti",
    "Mitsubishi",
    "Volvo",
    "Jeep",
    "Tesla",
  ];

  const years = Array.from({ length: 10 }, (_, i) => (2024 - i).toString());

  return (
    <section className="relative overflow-hidden py-24" id="calc">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-in slide-in-from-bottom duration-1000">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-8">
            <Calculator className="w-5 h-5 text-blue-400 mr-3" />
            <span className="text-blue-200 text-lg font-medium">
              Есть вопросы? мы поможем с выбором автомобиля
            </span>
          </div>

          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
            <span className="text-white">ОСТАЛИСЬ</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ВОПРОСЫ?
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-blue-100/80 max-w-4xl mx-auto font-light leading-relaxed">
            Заполните форму и наш специалист свяжется с вами в ближайшее время
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          {/* Main form card with glassmorphism */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl animate-in slide-in-from-bottom duration-1000 delay-300">
            {/* Accent lines */}
            <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-blue-400/50 rounded-tl-2xl" />
            <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-purple-400/50 rounded-br-2xl" />

            <form
              className="space-y-8 relative z-10"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                const message = "Запрос с формы \"Остались вопросы\"";
                try {
                  await submitInquiry({
                    name: formData.name,
                    phone: formData.phone,
                    message,
                  });
                  setIsSent(true);
                } catch (err) {
                  console.error(err);
                }
                setIsLoading(false);
              }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Ваше имя
                  </label>
                  <Input
                    placeholder="Введите ваше имя"
                    className="h-16 text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-blue-400/50 focus:bg-white/15 transition-all duration-300"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Телефон
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 z-10">
                      <span className="text-2xl">🇷🇺</span>
                    </div>
                    <Input
                      placeholder="+7 (999) 000-00-00"
                      className="h-16 text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder:text-white/50 pl-20 focus:border-blue-400/50 focus:bg-white/15 transition-all duration-300"
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      value={formData.phone}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="group relative overflow-hidden w-full h-16 text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6 mr-3" />
                    Отправить заявку
                  </>
                )}
              </Button>

              <p className="text-sm text-white/60 text-center leading-relaxed">
                Нажимая на кнопку, вы соглашаетесь с{" "}
                <a
                  href="/privacy"
                  className="text-blue-300 hover:text-blue-200 underline transition-colors duration-300"
                >
                  политикой конфиденциальности
                </a>
              </p>
            </form>
            {isSent && (
              <p className="text-center text-green-300 mt-4">Заявка отправлена!</p>
            )}
          </div>
        </div>

        {/* Quick stats with improved design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Clock,
              number: "5",
              text: "минут на заполнение",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: Zap,
              number: "24",
              text: "часа на ответ",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: Settings,
              number: "3-5",
              text: "вариантов подбора",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              icon: CheckCircle,
              number: "0₽",
              text: "стоимость консультации",
              gradient: "from-orange-500 to-red-500",
            },
          ].map((stat, index) => (
            <div
              key={stat.text}
              className="group text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${600 + index * 200}ms` }}
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-white/80 text-sm leading-relaxed font-medium">
                {stat.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
