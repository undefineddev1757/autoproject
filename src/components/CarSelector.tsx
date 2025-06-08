"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  brand: string;
  model: string;
  country: string;
  yearFrom: string;
  yearTo: string;
  priceFrom: string;
  priceTo: string;
}

const CAR_BRANDS = [
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Porsche",
  "Land Rover",
  "Lexus",
  "Volkswagen",
  "Toyota",
  "Nissan",
];

const COUNTRIES = ["Япония", "Корея", "Германия", "США"];

const YEARS = Array.from({ length: 20 }, (_, i) => (2024 - i).toString());

export function CarSelector() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    brand: "",
    model: "",
    country: "",
    yearFrom: "",
    yearTo: "",
    priceFrom: "",
    priceTo: "",
  });

  return (
    <section className="relative overflow-hidden py-24" id="selector">
      {/* Background with enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        {/* Animated background elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-in slide-in-from-bottom duration-1000">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-8">
            <Car className="w-5 h-5 text-indigo-400 mr-3" />
            <span className="text-indigo-200 text-lg font-medium">
              Найдем идеальный автомобиль для вас
            </span>
          </div>

          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
              ПОДБОР
            </span>{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              АВТОМОБИЛЯ
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-indigo-100/80 max-w-4xl mx-auto font-light leading-relaxed">
            Заполните критерии поиска и мы найдем лучшие варианты с аукционов
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main selector card */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl animate-in slide-in-from-bottom duration-1000 delay-300">
            {/* Accent lines */}
            <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-indigo-400/50 rounded-tl-2xl" />
            <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-purple-400/50 rounded-br-2xl" />

            <form
              className="space-y-8 relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                const params = new URLSearchParams();
                Object.entries(formData).forEach(([key, value]) => {
                  if (value) params.set(key, value);
                });
                router.push(`/contact?${params.toString()}`);
              }}
            >
              {/* First row */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Марка автомобиля
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, brand: value })
                    }
                  >
                    <SelectTrigger className="h-14 bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white">
                      <SelectValue placeholder="Выберите марку" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900/95 backdrop-blur-md border-white/20">
                      {CAR_BRANDS.map((brand) => (
                        <SelectItem
                          key={`brand-${brand}`}
                          value={brand}
                          className="text-white hover:bg-white/10"
                        >
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Модель
                  </label>
                  <Input
                    placeholder="Введите модель"
                    className="h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-indigo-400/50 focus:bg-white/15 transition-all duration-300"
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Страна
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, country: value })
                    }
                  >
                    <SelectTrigger className="h-14 bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white">
                      <SelectValue placeholder="Откуда привезти" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900/95 backdrop-blur-md border-white/20">
                      {COUNTRIES.map((country) => (
                        <SelectItem
                          key={country}
                          value={country}
                          className="text-white hover:bg-white/10"
                        >
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second row */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Год от
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, yearFrom: value })
                    }
                  >
                    <SelectTrigger className="h-14 bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white">
                      <SelectValue placeholder="2020" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900/95 backdrop-blur-md border-white/20">
                      {YEARS.map((year) => (
                        <SelectItem
                          key={year}
                          value={year}
                          className="text-white hover:bg-white/10"
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Год до
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, yearTo: value })
                    }
                  >
                    <SelectTrigger className="h-14 bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white">
                      <SelectValue placeholder="2024" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900/95 backdrop-blur-md border-white/20">
                      {YEARS.map((year) => (
                        <SelectItem
                          key={year}
                          value={year}
                          className="text-white hover:bg-white/10"
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Цена от (₽)
                  </label>
                  <Input
                    placeholder="1 000 000"
                    className="h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-indigo-400/50 focus:bg-white/15 transition-all duration-300"
                    onChange={(e) =>
                      setFormData({ ...formData, priceFrom: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Цена до (₽)
                  </label>
                  <Input
                    placeholder="5 000 000"
                    className="h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-indigo-400/50 focus:bg-white/15 transition-all duration-300"
                    onChange={(e) =>
                      setFormData({ ...formData, priceTo: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  type="submit"
                  className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-xl px-12 py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-white/20 to-indigo-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Search className="w-6 h-6 mr-3" />
                  Найти автомобили
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Popular brands showcase */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Популярные марки
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {["BMW", "Mercedes-Benz", "Audi", "Toyota", "Lexus", "Porsche"].map(
              (brand, index) => (
                <div
                  key={`brand-${brand}`}
                  className="group cursor-pointer bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-indigo-400/50 transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom duration-1000"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <div className="text-white font-semibold text-lg group-hover:text-indigo-300 transition-colors duration-300">
                    {brand}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
