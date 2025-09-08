"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { submitInquiry } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Phone, CheckCircle, Car } from "lucide-react";
import { useRouter } from "next/navigation";
import { cars } from "@/data/cars";

function ContactPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const params = Object.fromEntries(searchParams.entries());
    let message = "";
    if (Object.keys(params).length) {
      message = "Интересует автомобиль со следующими параметрами:\n";
      if (params.brand) message += `Марка: ${params.brand}\n`;
      if (params.model) message += `Модель: ${params.model}\n`;
      if (params.yearFrom) message += `Год от: ${params.yearFrom}\n`;
      if (params.yearTo) message += `Год до: ${params.yearTo}\n`;
      if (params.priceFrom) message += `Цена от: ${params.priceFrom}\n`;
      if (params.priceTo) message += `Цена до: ${params.priceTo}\n`;
    }

    try {
      await submitInquiry({ ...formData, message });
      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof Error && err.message === "duplicate") {
        setError("Заявка с таким телефоном или почтой уже была отправлена");
      } else {
        setError("Не удалось отправить заявку, попробуйте позже");
      }
      console.error(err);
    }

    setIsLoading(false);
  };

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

  const params = Object.fromEntries(searchParams.entries());
  const normalizeBrand = (brand: string) => brand.toLowerCase().replace(/\s+/g, "-");
  const toNumber = (value: string | undefined): number | undefined => {
    if (!value) return undefined;
    const digits = value.replace(/\D/g, "");
    return digits ? parseInt(digits, 10) : undefined;
  };

  const filteredCars = cars.filter((car) => {
    const brandOk = params.brand ? car.brand === normalizeBrand(params.brand) : true;
    const modelOk = params.model ? car.model.toLowerCase().includes(params.model.toLowerCase()) : true;
    const yearFromOk = params.yearFrom ? car.year >= Number(params.yearFrom) : true;
    const yearToOk = params.yearTo ? car.year <= Number(params.yearTo) : true;
    const priceFrom = toNumber(params.priceFrom);
    const priceTo = toNumber(params.priceTo);
    const carPrice = toNumber(car.price) || 0;
    const priceFromOk = priceFrom !== undefined ? carPrice >= priceFrom : true;
    const priceToOk = priceTo !== undefined ? carPrice <= priceTo : true;
    return brandOk && modelOk && yearFromOk && yearToOk && priceFromOk && priceToOk;
  });
  const previewCars = filteredCars.slice(0, 3);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
        {/* Background animations */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />

        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6 animate-pulse" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Заявка отправлена!
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Мы получили ваш запрос и свяжемся для обсуждения деталей подбора автомобиля.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center text-white/70">
                <Mail className="w-5 h-5 mr-3 text-indigo-400" />
                <span>{formData.email}</span>
              </div>
              <div className="flex items-center justify-center text-white/70">
                <Phone className="w-5 h-5 mr-3 text-indigo-400" />
                <span>{formData.phone}</span>
              </div>
            </div>

            <Button
              onClick={() => router.push("/")}
              className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-lg px-8 py-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-white/20 to-emerald-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-semibold">Вернуться на главную</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Button
              onClick={() => router.push("/")}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:border-indigo-400/50 text-white hover:bg-white/15 transition-all duration-300 rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="relative flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Назад к подбору</span>
              </div>
            </Button>
          </div>

          {/* Main form card */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/20 shadow-2xl">
            {/* Accent lines */}
            <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-indigo-400/50 rounded-tl-2xl" />
            <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-purple-400/50 rounded-br-2xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-4 sm:mb-6">
                  <Car className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-400 mr-2 sm:mr-3" />
                  <span className="text-indigo-200 text-sm sm:text-base md:text-lg font-medium">
                    Последний шаг
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                    ОСТАВЬТЕ
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    КОНТАКТЫ
                  </span>
                </h1>

            
              </div>

              {/* Preview results */}
              <div className="mb-8 sm:mb-10">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-6">
                  <p className="text-white text-base sm:text-lg mb-3">
                    {filteredCars.length > 0
                      ? `Мы подобрали ${filteredCars.length} авто по вашему запросу`
                      : "Мы нашли подходящие варианты — оставьте контакты, и мы вышлем подборку"}
                  </p>
                  {previewCars.length > 0 && (
                    <ul className="space-y-2 text-white/80 text-sm">
                      {previewCars.map((c) => (
                        <li key={c.id} className="flex justify-between">
                          <span>{c.brand.toUpperCase()} {c.model} · {c.year}</span>
                          <span>{c.price} ₽</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-white/90 text-base sm:text-lg font-medium flex items-center">
                      <Mail className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-indigo-400" />
                      Электронная почта
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-14 sm:h-16 text-base sm:text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-xl sm:rounded-2xl text-white placeholder:text-white/50 focus:border-indigo-400/50 focus:bg-white/15 transition-all duration-300 touch-manipulation"
                    />
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-white/90 text-base sm:text-lg font-medium flex items-center">
                      <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-indigo-400" />
                      Номер телефона
                    </label>
                    <Input
                      type="tel"
                      required
                      placeholder="+7 (999) 000-00-00"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="h-14 sm:h-16 text-base sm:text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-xl sm:rounded-2xl text-white placeholder:text-white/50 focus:border-indigo-400/50 focus:bg-white/15 transition-all duration-300 touch-manipulation"
                    />
                  </div>
                </div>

                {/* Additional info */}
                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-400/20">
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-lg mb-2">Что будет дальше?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/70">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold mb-2">
                          1
                        </div>
                        <span>Звонок менеджера</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold mb-2">
                          2
                        </div>
                        <span>Подбор вариантов</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400 font-bold mb-2">
                          3
                        </div>
                        <span>Участие в торгах</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2 sm:pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    size="lg"
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-base sm:text-lg md:text-xl px-8 sm:px-12 py-4 sm:py-6 md:py-8 rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none touch-manipulation"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-white/20 to-indigo-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    {isLoading ? (
                      <>
                        <div className="w-5 sm:w-6 h-5 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 sm:mr-3" />
                        <span className="font-semibold">Отправляем заявку...</span>
                      </>
                    ) : (
                      <>
                        <img src="/uploads/tg.png" alt="Telegram" className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
                        <span className="font-semibold">Отправить заявку</span>
                      </>
                    )}
                  </Button>
                </div>
                {error && <p className="text-red-400 text-center mt-4">{error}</p>}
              </form>

              {/* Privacy notice */}
              <div className="mt-8 text-center">
                <p className="text-white/50 text-sm leading-relaxed">
                  Нажимая кнопку "Отправить заявку", вы соглашаетесь с {""}
                  <span className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors">политикой конфиденциальности</span> {""}
                  и {""}
                  <span className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors">условиями использования</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="text-white text-xl">Загрузка...</div>
        </div>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
