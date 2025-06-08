import { CheckCircle, Search, CreditCard, FileText, Truck, Key } from 'lucide-react'

export function WorkSteps() {
  const steps = [
    {
      number: '01',
      title: 'Консультация и подбор',
      description: 'Обсуждаем ваши пожелания, бюджет и требования к автомобилю. Подбираем лучшие варианты.',
      icon: <Search className="w-8 h-8" />,
      details: ['Изучение ваших потребностей', 'Подбор оптимальных вариантов', 'Проверка истории автомобиля', 'Расчет полной стоимости']
    },
    {
      number: '02',
      title: 'Бронирование и договор',
      description: 'Заключаем договор, вносите предоплату от 10% и бронируем выбранный автомобиль.',
      icon: <FileText className="w-8 h-8" />,
      details: ['Подписание договора', 'Внесение предоплаты', 'Бронирование автомобиля', 'Юридическое сопровождение']
    },
    {
      number: '03',
      title: 'Покупка и оформление',
      description: 'Покупаем автомобиль в Европе, оформляем все необходимые документы для вывоза.',
      icon: <CreditCard className="w-8 h-8" />,
      details: ['Покупка в автосалоне', 'Оформление документов', 'Таможенное оформление', 'Страхование на время доставки']
    },
    {
      number: '04',
      title: 'Логистика и доставка',
      description: 'Организуем транспортировку автомобиля в Россию на автовозе с полным страхованием.',
      icon: <Truck className="w-8 h-8" />,
      details: ['Загрузка на автовоз', 'Отслеживание доставки', 'Таможенное оформление в РФ', 'Транспортировка до места назначения']
    },
    {
      number: '05',
      title: 'Передача ключей',
      description: 'Передаем вам готовый к эксплуатации автомобиль с полным пакетом документов.',
      icon: <Key className="w-8 h-8" />,
      details: ['Финальная проверка авто', 'Оформление в ГИБДД', 'Передача документов', 'Получение ключей']
    }
  ]

  return (
    <section className="saraev-dark py-16" id="work">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Как мы работаем
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Прозрачный процесс от консультации до получения ключей.
            Полное сопровождение на каждом этапе с гарантией результата.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connection Line - only show between steps on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-blue-400 z-10" />
                )}

                {/* Step Card */}
                <div className="bg-gray-800 rounded-lg p-6 h-full hover:bg-gray-700 transition-colors group">
                  {/* Step Number */}
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4 mx-auto group-hover:bg-blue-500 transition-colors">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <div className="space-y-2">
                      {step.details.map((detail) => (
                        <div key={detail} className="flex items-center space-x-2 text-xs text-gray-400">
                          <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline for Mobile */}
        <div className="lg:hidden mt-12">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-400" />

            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="relative pl-16">
                  {/* Step dot */}
                  <div className="absolute left-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{step.number}</span>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="text-white font-bold mb-2">{step.title}</h4>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Готовы начать?
            </h3>
            <p className="text-gray-300 mb-6">
              Получите бесплатную консультацию и узнайте точную стоимость вашего будущего автомобиля
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+74996477787"
                className="px-8 py-3 saraev-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Позвонить сейчас
              </a>
              <a
                href="https://wa.me/79654128726"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-blue-400 mb-2">7-30</div>
            <div className="text-gray-300 text-sm">дней доставка</div>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-blue-400 mb-2">10%</div>
            <div className="text-gray-300 text-sm">минимальная предоплата</div>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
            <div className="text-gray-300 text-sm">довольных клиентов</div>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
            <div className="text-gray-300 text-sm">юридическая чистота</div>
          </div>
        </div>
      </div>
    </section>
  )
}
