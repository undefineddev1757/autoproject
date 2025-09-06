"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Search, ArrowRight } from "lucide-react";
import {
  SiAudi,
  SiBmw,
  SiMercedes,
  SiPorsche,
  SiLandrover,
  SiToyota,
  SiHonda,
  SiHyundai,
  SiKia,
  SiMazda,
  SiFord,
  SiChevrolet,
  SiVolvo,
  SiJeep,
  SiTesla,
} from "react-icons/si";
import { FaCarSide } from "react-icons/fa";
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

const BRAND_ICONS: Record<string, React.ElementType> = {
  BMW: SiBmw,
  "Mercedes-Benz": SiMercedes,
  Audi: SiAudi,
  Toyota: SiToyota,
  Lexus: FaCarSide,
  Porsche: SiPorsche,
  Honda: SiHonda,
  Hyundai: SiHyundai,
  Kia: SiKia,
  Mazda: SiMazda,
  Ford: SiFord,
  Chevrolet: SiChevrolet,
  Volvo: SiVolvo,
  Jeep: SiJeep,
  Tesla: SiTesla,
  "Land Rover": SiLandrover,
};


const YEARS = Array.from({ length: 20 }, (_, i) => (2024 - i).toString());

const POPULAR_MODELS: Record<string, string[]> = {
  BMW: ["3 Series", "5 Series", "7 Series", "X3", "X5", "X7", "M5"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "G-Class", "AMG GT"],
  Audi: ["A4", "A6", "A8", "Q5", "Q7", "RS 6"],
  Toyota: ["Corolla", "Camry", "RAV4", "Land Cruiser", "Highlander", "Prado"],
  Lexus: ["IS", "ES", "RX", "NX", "LX"],
  Porsche: ["Cayenne", "Macan", "911", "Panamera", "Taycan"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot"],
  Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe"],
  Kia: ["Rio", "Ceed", "Sportage", "Sorento"],
  Mazda: ["Mazda3", "Mazda6", "CX-5", "CX-9"],
  Ford: ["Focus", "Mondeo", "Kuga", "Explorer"],
  Chevrolet: ["Cruze", "Malibu", "Equinox", "Tahoe"],
  Volvo: ["XC60", "XC90", "S60", "V60"],
  Jeep: ["Compass", "Cherokee", "Grand Cherokee", "Wrangler"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
  "Land Rover": ["Discovery", "Defender", "Range Rover", "Range Rover Sport"],
  Nissan: ["Qashqai", "X-Trail", "Teana", "Altima"],
  Subaru: ["Impreza", "Forester", "Outback", "XV"],
  Mitsubishi: ["Outlander", "Pajero", "ASX", "Lancer"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Touareg"],
};

export function CarSelector() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    brand: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    priceFrom: "",
    priceTo: "",
  });
  const [isCustomModel, setIsCustomModel] = useState(false);

  const selectedBrandModels = formData.brand ? POPULAR_MODELS[formData.brand] : undefined;

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
                for (const [key, value] of Object.entries(formData)) {
                  if (value) params.set(key, value);
                }
                router.push(`/contact?${params.toString()}`);
              }}
            >
              {/* First row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Марка автомобиля
                  </label>
                  <Select
                    onValueChange={(value) => {
                      setFormData({ ...formData, brand: value, model: "" });
                      setIsCustomModel(false);
                    }}
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
                  {selectedBrandModels ? (
                    <>
                      <Select
                        onValueChange={(value) => {
                          if (value === "__custom__") {
                            setIsCustomModel(true);
                            setFormData({ ...formData, model: "" });
                          } else {
                            setIsCustomModel(false);
                            setFormData({ ...formData, model: value });
                          }
                        }}
                      >
                        <SelectTrigger className="h-14 bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white">
                          <SelectValue placeholder="Выберите модель" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900/95 backdrop-blur-md border-white/20">
                          {selectedBrandModels.map((model) => (
                            <SelectItem key={`model-${model}`} value={model} className="text-white hover:bg-white/10">
                              {model}
                            </SelectItem>
                          ))}
                          <SelectItem value="__custom__" className="text-white hover:bg-white/10">
                            Другая модель (ввести вручную)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {isCustomModel && (
                        <Input
                          placeholder="Введите модель"
                          className="h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-indigo-400/50 focus:bg-white/15 transition-all duration-300 mt-3"
                          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                          value={formData.model}
                        />
                      )}
                    </>
                  ) : (
                    <Input
                      placeholder="Введите модель"
                      className="h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-indigo-400/50 focus:bg-white/15 transition-all duration-300"
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    />
                  )}
                </div>
              </div>

              {/* Second row */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Год от
                  </label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, yearFrom: value })}
                  >
                    <SelectTrigger className="h-14 bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white">
                      <SelectValue placeholder="2020" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900/95 backdrop-blur-md border-white/20">
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year} className="text-white hover:bg-white/10">
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
                    onValueChange={(value) => setFormData({ ...formData, yearTo: value })}
                  >
                    <SelectTrigger className="h-14 bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white">
                      <SelectValue placeholder="2024" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900/95 backdrop-blur-md border-white/20">
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year} className="text-white hover:bg-white/10">
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
                    onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Цена до (₽)
                  </label>
                  <Input
                    placeholder="5 000 000"
                    className="h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-indigo-400/50 focus:bg-white/15 transition-all duration-300"
                    onChange={(e) => setFormData({ ...formData, priceTo: e.target.value })}
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
            {[
              "BMW",
              "Mercedes-Benz",
              "Audi",
              "Toyota",
              "Porsche",
              "Honda",
              "Hyundai",
              "Kia",
              "Mazda",
              "Ford",
              "Chevrolet",
              "Volvo",
              "Jeep",
              "Tesla",
              "Land Rover",
            ].map((brand, index) => {
              const Icon = BRAND_ICONS[brand] || FaCarSide;
              return (
                <div
                  key={`brand-${brand}`}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300 animate-in slide-in-from-bottom"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold text-lg">
                      {brand}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
