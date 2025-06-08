import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ContactSection() {
  return (
    <section className="bg-gray-50 py-16 animate-in fade-in slide-in-from-bottom-8 duration-1000" id="contacts">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Контакты
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Свяжитесь с нами удобным способом. Мы всегда готовы ответить на ваши вопросы
            и помочь с выбором автомобиля мечты.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Social Links */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Свяжитесь с нами
            </h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://t.me/globalstarauto"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Telegram</span>
                <span className="text-sm text-gray-600">Быстрые ответы</span>
              </a>

              <a
                href="https://wa.me/79654128726"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <span className="font-semibold text-gray-900">WhatsApp</span>
                <span className="text-sm text-gray-600">Онлайн чат</span>
              </a>

              <a
                href="tel:+74996477787"
                className="group flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Телефон</span>
                <span className="text-sm text-gray-600">+7 (499) 647-77-87</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-gray-200 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">📍</div>
            <h4 className="text-xl font-bold text-gray-700 mb-2">Карта офиса</h4>
            <p className="text-gray-600">
              Москва, ул. Краснопролетарская, д. 17, стр. 4, офис 082
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
