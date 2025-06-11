import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Euro, DollarSign } from "lucide-react";
import { SiAudi, SiBmw, SiMercedes, SiPorsche, SiLandrover } from "react-icons/si";
import { FaCarSide } from "react-icons/fa";

export function SavingsSection() {
  const savingsExamples = [
    {
      model: "Mercedes-Benz G63",
      year: "2024",
      russiaPrice: "38 500 000",
      europePrice: "33 750 000",
      savings: "4 750 000",
      savingsPercent: "12,3%",
      image: "🚙",
    },
    {
      model: "BMW X6M Competition",
      year: "2021",
      russiaPrice: "15 640 000",
      europePrice: "14 749 000",
      savings: "891 000",
      savingsPercent: "5,7%",
      image: "🚗",
    },
    {
      model: "Porsche Macan S",
      year: "2020",
      russiaPrice: "8 565 000",
      europePrice: "7 265 000",
      savings: "1 300 000",
      savingsPercent: "15,2%",
      image: "🏎️",
    },
  ];

  return (
    <section className="saraev-dark py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Экономия при покупке в Европе
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Реальные примеры экономии наших клиентов при покупке автомобилей
            премиум-класса в Европе
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {savingsExamples.map((car, index) => (
            <Card
              key={car.model}
              className="bg-white overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">{car.image}</div>
                <Badge className="saraev-blue mb-4">
                  Экономия {car.savingsPercent}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {car.model}
                    </h3>
                    <p className="text-gray-600">{car.year} год</p>
                  </div>

                  {/* Price comparison */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Цена в России:
                        </span>
                      </div>
                      <span className="font-semibold text-red-600">
                        {car.russiaPrice} ₽
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Euro className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Цена в Европе:
                        </span>
                      </div>
                      <span className="font-semibold text-green-600">
                        {car.europePrice} ₽
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          Экономия:
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600 text-lg">
                          {car.savings} ₽
                        </div>
                        <div className="text-sm text-blue-600">
                          {car.savingsPercent}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Brand logos section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Работаем с ведущими марками
          </h3>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 items-center max-w-4xl mx-auto">
            {/* Brand logos */}
            <div className="group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-white rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <SiAudi className="w-8 h-8 text-gray-900" />
              </div>
              <p className="text-white text-sm mt-2">Audi</p>
            </div>

            <div className="group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-white rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <SiBmw className="w-8 h-8 text-gray-900" />
              </div>
              <p className="text-white text-sm mt-2">BMW</p>
            </div>

            <div className="group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-white rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <SiMercedes className="w-8 h-8 text-gray-900" />
              </div>
              <p className="text-white text-sm mt-2">Mercedes</p>
            </div>

            <div className="group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-white rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <SiPorsche className="w-8 h-8 text-gray-900" />
              </div>
              <p className="text-white text-sm mt-2">Porsche</p>
            </div>

            <div className="group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-white rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <SiLandrover className="w-8 h-8 text-gray-900" />
              </div>
              <p className="text-white text-sm mt-2">Land Rover</p>
            </div>

            <div className="group cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-white rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <FaCarSide className="w-8 h-8 text-gray-900" />
              </div>
              <p className="text-white text-sm mt-2">Lexus</p>
            </div>
          </div>
        </div>

        {/* Additional benefits */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">📋</span>
            </div>
            <h4 className="text-white font-semibold mb-2">
              Полный пакет документов
            </h4>
            <p className="text-gray-300 text-sm">
              Все документы для постановки на учет в России
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🔒</span>
            </div>
            <h4 className="text-white font-semibold mb-2">
              Юридическая чистота
            </h4>
            <p className="text-gray-300 text-sm">
              Проверка на угон, залоги и ограничения
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🚚</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Доставка до дома</h4>
            <p className="text-gray-300 text-sm">
              Привозим автомобиль в удобное для вас место
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
