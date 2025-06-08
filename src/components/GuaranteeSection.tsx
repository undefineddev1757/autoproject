import { Shield, CheckCircle, Users, Award, Clock, Star } from 'lucide-react'

export function GuaranteeSection() {
  const guarantees = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Юридическая защита',
      description: 'Полное юридическое сопровождение сделки с гарантией безопасности'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Прозрачность процесса',
      description: 'Вы видите весь процесс торгов в режиме реального времени'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Персональный менеджер',
      description: 'Индивидуальное сопровождение от подбора до получения авто'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Контроль качества',
      description: 'Тщательная проверка технического состояния каждого автомобиля'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Быстрая доставка',
      description: 'Оптимальные сроки доставки с отслеживанием на каждом этапе'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Гарантия результата',
      description: 'Возврат средств, если авто не соответствует заявленным характеристикам'
    }
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Гарантируем идеальные условия обслуживания
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Мы обеспечиваем высочайший уровень сервиса на каждом этапе сотрудничества.
            Ваше доверие - наша главная ценность.
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {guarantees.map((guarantee) => (
            <div
              key={guarantee.title}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto group-hover:bg-blue-200 transition-colors">
                <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                  {guarantee.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {guarantee.title}
              </h3>

              <p className="text-gray-600 text-center leading-relaxed">
                {guarantee.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Наши достижения говорят сами за себя
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">8+</div>
              <div className="text-gray-600">лет на рынке</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2000+</div>
              <div className="text-gray-600">довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
              <div className="text-gray-600">средняя экономия</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">успешных сделок</div>
            </div>
          </div>
        </div>

        {/* Testimonials Preview */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Что говорят наши клиенты
          </h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-gray-600 italic mb-4">
                "Сэкономил более 2 млн рублей на покупке BMW X6. Процесс был абсолютно прозрачным."
              </p>
              <div className="font-semibold text-gray-900">Александр К.</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-gray-600 italic mb-4">
                "Отличный сервис! Менеджер сопровождал на каждом этапе. Рекомендую всем!"
              </p>
              <div className="font-semibold text-gray-900">Мария С.</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-gray-600 italic mb-4">
                "Быстро, качественно, честно. Получил Mercedes E-Class в идеальном состоянии."
              </p>
              <div className="font-semibold text-gray-900">Дмитрий В.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
