"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Menu, X, Phone, Zap } from "lucide-react";
import { submitInquiry } from "@/lib/api";
import { StarRating } from "@/components/ui/star-rating";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackLoading, setCallbackLoading] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);

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
    setCallbackPhone(formatted);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "z-50 fixed inset-x-0 top-0 transition-all duration-500",
        scrolled
          ? "bg-black/60 backdrop-blur-lg border-b border-white/20 shadow-2xl"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link href="/">
            <Logo size="xl" variant="light" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { href: "#selector", label: "ПОДБОР АВТО" },
              { href: "#work", label: "ЭТАПЫ РАБОТЫ" },
              { href: "#contacts", label: "КОНТАКТЫ" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group text-gray-300 hover:text-white font-semibold tracking-wide transition-all duration-300 px-6 py-3 text-lg"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20" />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Phone */}
            <a
              href="tel:+79152031467"
              className="hidden lg:flex items-center space-x-3 text-white hover:text-blue-300 transition-all duration-300 group bg-white/5 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10 hover:border-blue-400/50"
            >
              <Phone className="w-6 h-6 group-hover:animate-pulse" />
              <span className="font-bold text-xl tracking-wide">
                +7 (915) 203-14-67
              </span>
            </a>

            {/* Social buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="https://t.me/gsat_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                <img 
                  src="/uploads/tg.png" 
                  alt="Telegram" 
                  className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" 
                />
              </a>
              <a
                href="https://wa.me/79152031467"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
              >
                <img 
                  src="/uploads/whatsapp.png" 
                  alt="WhatsApp" 
                  className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" 
                />
              </a>
            </div>

            {/* CTA Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="group hidden md:flex items-center relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 hover:from-orange-400 hover:via-red-400 hover:to-orange-400 text-white font-bold px-10 py-5 rounded-2xl shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0 text-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-white/20 to-orange-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Zap className="w-6 h-6 mr-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">ОБРАТНЫЙ ЗВОНОК</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900/95 backdrop-blur-md border border-white/20 max-w-md rounded-3xl">
                <div className="p-8">
                  <DialogTitle className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    Заказать обратный звонок
                  </DialogTitle>
                  <form
                    className="space-y-6"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setCallbackLoading(true);
                      try {
                        await submitInquiry({
                          name: callbackName,
                          phone: callbackPhone,
                          message: "Обратный звонок",
                        });
                        setCallbackSent(true);
                      } catch (err) {
                        console.error(err);
                      }
                      setCallbackLoading(false);
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        className="w-full p-5 rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:border-blue-400/50 focus:outline-none transition-all duration-300 text-lg placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="+7 (999) 000-00-00"
                        value={callbackPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className="w-full p-5 rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:border-blue-400/50 focus:outline-none transition-all duration-300 text-lg placeholder:text-white/50"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={callbackLoading}
                      className="group relative overflow-hidden w-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 hover:from-orange-400 hover:via-red-400 hover:to-orange-400 text-white font-semibold py-5 rounded-2xl shadow-lg border-0 text-lg disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-white/20 to-orange-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      {callbackLoading ? 'Отправляем...' : 'Заказать звонок'}
                    </Button>
                    {callbackSent && (
                      <p className="text-center text-green-300">Заявка отправлена!</p>
                    )}
                  </form>
                </div>
              </DialogContent>
            </Dialog>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-4 text-gray-300 hover:text-white transition-colors bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              {isMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-8 border-t border-white/10 bg-black/60 backdrop-blur-lg rounded-b-3xl mt-4">
            <nav className="flex flex-col space-y-4">
              {[
                { href: "#selector", label: "ПОДБОР АВТО" },
                { href: "#work", label: "ЭТАПЫ РАБОТЫ" },
                { href: "#contacts", label: "КОНТАКТЫ" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-all duration-300 py-4 px-6 rounded-2xl hover:bg-white/10 font-semibold text-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex items-center justify-between pt-6 border-t border-white/10 px-6">
                <a
                  href="tel:+79152031467"
                  className="text-white font-bold text-xl"
                >
                  +7 (915) 203-14-67
                </a>
                <div className="flex space-x-3">
                  <a
                    href="https://t.me/gsat_ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
                  >
                    <img 
                      src="/uploads/tg.png" 
                      alt="Telegram" 
                      className="w-7 h-7" 
                    />
                  </a>
                  <a
                    href="https://wa.me/79152031467"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg"
                  >
                    <img 
                      src="/uploads/whatsapp.png" 
                      alt="WhatsApp" 
                      className="w-7 h-7" 
                    />
                  </a>
                </div>
              </div>

              <Button className="group mt-6 mx-6 relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white font-bold py-5 rounded-2xl border-0 text-xl flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-white/20 to-orange-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="whitespace-nowrap">ОБРАТНЫЙ ЗВОНОК</span>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
