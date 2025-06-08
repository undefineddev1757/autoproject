"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Fuel, Gauge, MapPin, Eye } from "lucide-react";

export function CarCatalog() {
  const [selectedBrand, setSelectedBrand] = useState("all");

  const carBrands = [
    "all",
    "audi",
    "bmw",
    "mercedes-benz",
    "porsche",
    "land-rover",
  ];

  const cars = [
    {
      id: 1,
      brand: "audi",
      model: "RS 6 performance",
      year: 2024,
      engine: "4.0 л / 630 л.с.",
      fuelType: "бензин",
      mileage: 35,
      price: "23 490 000",
      status: "В наличии",
      statusColor: "bg-green-500",
      image: "🚗",
      available: true,
    },
    {
      id: 2,
      brand: "bmw",
      model: "X7 40d",
      year: 2024,
      engine: "3.0 л / 340 л.с.",
      fuelType: "дизель",
      mileage: 7500,
      price: "18 900 000",
      status: "В наличии",
      statusColor: "bg-green-500",
      image: "🚙",
      available: true,
    },
    {
      id: 3,
      brand: "bmw",
      model: "M5",
      year: 2024,
      engine: "4.4 л / 727 л.с.",
      fuelType: "гибрид",
      mileage: 25,
      price: "25 790 000",
      status: "В наличии",
      statusColor: "bg-green-500",
      image: "🏎️",
      available: true,
    },
    {
      id: 4,
      brand: "bmw",
      model: "760i",
      year: 2023,
      engine: "4.4 л / 544 л.с.",
      fuelType: "бензин",
      mileage: 7060,
      price: "20 615 000",
      status: "В наличии",
      statusColor: "bg-green-500",
      image: "🚗",
      available: true,
    },
    {
      id: 5,
      brand: "mercedes-benz",
      model: "AMG G63",
      year: 2019,
      engine: "4.0 л / 585 л.с.",
      fuelType: "бензин",
      mileage: 83030,
      price: "16 249 000",
      status: "В наличии",
      statusColor: "bg-green-500",
      image: "🚙",
      available: true,
    },
    {
      id: 6,
      brand: "porsche",
      model: "Cayenne S",
      year: 2020,
      engine: "2.9 л / 340 л.с.",
      fuelType: "бензин",
      mileage: 25,
      price: "15 797 865",
      status: "Под заказ",
      statusColor: "bg-blue-500",
      image: "🏎️",
      available: false,
    },
  ];

  const filteredCars =
    selectedBrand === "all"
      ? cars
      : cars.filter((car) => car.brand === selectedBrand);

  const getBrandDisplayName = (brand: string) => {
    const brandNames: { [key: string]: string } = {
      all: "Все марки",
      audi: "Audi",
      bmw: "BMW",
      "mercedes-benz": "Mercedes-Benz",
      porsche: "Porsche",
      "land-rover": "Land Rover",
    };
    return brandNames[brand] || brand;
  };

  return (
    <section className="bg-gray-50 py-16" id="catalog">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Каталог автомобилей
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Премиальные автомобили из Европы с проверенной историей и полным
            пакетом документов
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div className="flex items-center space-x-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Фильтры:</span>
            </div>

            {carBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedBrand === brand
                    ? "saraev-blue text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {getBrandDisplayName(brand)}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Найдено:{" "}
            <span className="font-semibold">{filteredCars.length}</span>{" "}
            автомобилей
          </p>
        </div>

        {/* Car Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredCars.map((car) => (
            <Card
              key={car.id}
              className="overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              {/* Status Badge */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 text-center">
                  <div className="text-6xl mb-4">{car.image}</div>
                </div>
                <Badge
                  className={`absolute top-4 left-4 ${car.statusColor} text-white`}
                >
                  {car.status}
                </Badge>
                {car.available && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
                    Доступен в лизинг
                  </Badge>
                )}
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Car Title */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {getBrandDisplayName(car.brand)} {car.model}
                    </h3>
                    <p className="text-gray-600">{car.year} год</p>
                  </div>

                  {/* Car Specs */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Gauge className="w-4 h-4" />
                      <span className="text-sm">ДВС: {car.engine}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Fuel className="w-4 h-4" />
                      <span className="text-sm">Тип ДВС: {car.fuelType}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">
                        Пробег: {car.mileage.toLocaleString()} км
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {car.price} ₽
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full saraev-blue hover:bg-blue-700 group-hover:scale-105 transition-transform">
                    <Eye className="w-4 h-4 mr-2" />
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 py-4">
            Загрузить еще
          </Button>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Не нашли подходящий автомобиль?
          </h3>
          <p className="text-gray-600 mb-6">
            Сообщите нам ваши пожелания, и мы найдем идеальный вариант
            специально для вас
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/saraev_catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Написать в Telegram
            </a>
            <a
              href="https://wa.me/79654128726"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
