'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Calculator, CheckCircle } from 'lucide-react'

export function CarCalculator() {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    engine: '',
    budget: '',
    name: '',
    phone: ''
  })

  const carBrands = [
    'Audi', 'BMW', 'Mercedes-Benz', 'Porsche', 'Land Rover', 'Lexus', 'Volkswagen'
  ]

  const years = Array.from({ length: 10 }, (_, i) => (2024 - i).toString())

  return (
    <section className="bg-gray-50 py-16" id="calc">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-blue-600 text-lg mb-4 italic">
            [ подберем автомобиль под ваши параметры и бюджет ]
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            ОСТАЛИСЬ <span className="text-blue-600">ВОПРОСЫ?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Заполните форму и наш специалист свяжется с вами в ближайшее время
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input
                    placeholder="Ваше имя"
                    className="h-14 text-lg border-gray-300 rounded-xl bg-gray-100 placeholder:text-gray-500"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <span className="text-2xl">🇷🇺</span>
                  </div>
                  <Input
                    placeholder="+7 (999) 999-99-99"
                    className="h-14 text-lg border-gray-300 rounded-xl bg-gray-100 placeholder:text-gray-500 pl-16"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <Button
                size="lg"
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Отправить заявку
              </Button>

              <p className="text-sm text-gray-500 text-center">
                Нажимая на кнопку, вы соглашаетесь с{' '}
                <a href="/privacy" className="text-red-500 hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-sm text-gray-600">минут на заполнение</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
            <div className="text-sm text-gray-600">часа на ответ</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">3-5</div>
            <div className="text-sm text-gray-600">вариантов подбора</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">0₽</div>
            <div className="text-sm text-gray-600">стоимость консультации</div>
          </div>
        </div>
      </div>
    </section>
  )
}
