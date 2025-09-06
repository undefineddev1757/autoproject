export type CarItem = {
  id: number;
  brand: string;
  model: string;
  year: number;
  engine: string;
  fuelType: string;
  mileage: number;
  price: string;
  status: string;
  statusColor: string;
  image: string;
  available: boolean;
};

export const cars: CarItem[] = [
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

export function normalizeBrand(brand: string): string {
  return brand.toLowerCase().replace(/\s+/g, "-");
} 