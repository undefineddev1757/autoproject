import { Button } from '@/components/ui/button'
import { ArrowRight, Calculator, MessageCircle, Star } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen flex items-center pt-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        {/* ... existing content remains the same ... */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                ЗАКАЖИТЕ ВАШ АВТОМОБИЛЬ НАПРЯМУЮ С АУКЦИОНОВ ЯПОНИИ, КОРЕИ ИЛИ ЕВРОПЫ И{' '}
                <span className="text-blue-400">СЭКОНОМЬТЕ ДО 30% ОТ РЫНОЧНОЙ ЦЕНЫ</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Участвуйте в торгах онлайн вместе с нами! Полная прозрачность и честная цена без скрытых комиссий.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Подобрать автомобиль
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Смотреть каталог
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-gray-700">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">8+</div>
                <div className="text-gray-300">лет на рынке</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-gray-300">довольных клиентов</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">10%</div>
                <div className="text-gray-300">предоплата</div>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="relative">
            {/* Rating badge */}
            <div className="absolute top-4 right-4 z-10 bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <StarRating />
                <span className="font-semibold text-gray-900">4.9</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">рейтинг в Яндекс</div>
            </div>

            {/* Car image placeholder - would be replaced with actual car image */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">🚗</div>
                <div className="text-lg">Премиальные автомобили</div>
                <div className="text-sm">из Европы</div>
              </div>
            </div>

            {/* Floating contact buttons */}
            <div className="absolute bottom-4 left-4 flex space-x-3">
              <a
                href="https://wa.me/79654128726"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors shadow-lg"
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://t.me/globalstarauto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors shadow-lg"
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-16 border-t border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Гарантия качества</h3>
            <p className="text-gray-400 text-sm">Проверенные автомобили с документами</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Быстрая доставка</h3>
            <p className="text-gray-400 text-sm">От 7 до 30 дней в зависимости от модели</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Выгодные цены</h3>
            <p className="text-gray-400 text-sm">Экономия до 20% от рыночной стоимости</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Полное сопровождение</h3>
            <p className="text-gray-400 text-sm">От подбора до получения ключей</p>
          </div>
        </div>
      </div>
    </section>
  )
}
