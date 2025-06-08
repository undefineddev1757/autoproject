import { MessageCircle, Send, ArrowUp, Star } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container mx-auto px-6 relative">
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="absolute -top-6 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>

        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Logo and tagline */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">G</span>
                  </div>
                  <div>
                    <div className="text-white text-3xl font-bold tracking-wide">
                      GLOBALSTARAUTO
                    </div>
                    <div className="text-gray-400 text-sm tracking-wider uppercase">
                      Автомобили с аукционов мира
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                  Профессиональная поставка премиальных автомобилей с аукционов Японии, Кореи и Европы.
                  Гарантируем экономию до <span className="text-blue-400 font-semibold">30%</span> от рыночной цены
                  с полным юридическим сопровождением.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">8+</div>
                  <div className="text-gray-400 text-sm">лет опыта</div>
                </div>
                <div className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">2000+</div>
                  <div className="text-gray-400 text-sm">довольных клиентов</div>
                </div>
                <div className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">30%</div>
                  <div className="text-gray-400 text-sm">средняя экономия</div>
                </div>
                <div className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300">
                  <div className="flex justify-center mb-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">4.9</div>
                  <div className="text-gray-400 text-sm">рейтинг Яндекс</div>
                </div>
              </div>
            </div>

            {/* Contact & Navigation */}
            <div className="space-y-10">
              {/* Navigation */}
              <div>
                <h4 className="text-white font-bold text-xl mb-6">Навигация</h4>
                <nav className="space-y-4">
                  <a
                    href="#calc"
                    className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 py-2 font-medium"
                  >
                    → Подобрать автомобиль
                  </a>
                  <a
                    href="#work"
                    className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 py-2 font-medium"
                  >
                    → Этапы работы
                  </a>
                  <a
                    href="#contacts"
                    className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 py-2 font-medium"
                  >
                    → Контакты
                  </a>
                </nav>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-bold text-xl mb-6">Связаться с нами</h4>

                {/* Phone */}
                <a
                  href="tel:+74996477787"
                  className="block text-2xl font-bold text-white hover:text-blue-400 transition-colors mb-6 group"
                >
                  <span className="group-hover:underline">8 499 647-77-87</span>
                </a>

                {/* Social buttons */}
                <div className="flex space-x-4">
                  <a
                    href="https://t.me/globalstarauto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl px-6 py-4 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 group"
                    title="Telegram"
                  >
                    <Send className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">Telegram</span>
                  </a>
                  <a
                    href="https://wa.me/79654128726"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl px-6 py-4 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25 group"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">WhatsApp</span>
                  </a>
                </div>

                {/* Working hours */}
                <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <div className="text-gray-400 text-sm mb-1">Режим работы:</div>
                  <div className="text-white font-medium">Пн-Пт: 9:00-20:00</div>
                  <div className="text-white font-medium">Сб-Вс: 10:00-18:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700/50 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-center lg:text-left">
              <p className="text-sm">
                © 2024 GLOBALSTARAUTO. Все права защищены.
              </p>
              <p className="text-xs mt-1 opacity-75">
                Лицензия на осуществление деятельности № 123456
              </p>
            </div>

            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
