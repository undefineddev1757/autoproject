import { Shield, CheckCircle, Users, Award, Clock, Star } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";

export function GuaranteeSection() {
  const guarantees = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Юридическая защита",
      description:
        "Полное юридическое сопровождение сделки с гарантией безопасности",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Прозрачность процесса",
      description: "Вы видите весь процесс торгов в режиме реального времени",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Персональный менеджер",
      description: "Индивидуальное сопровождение от подбора до получения авто",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Контроль качества",
      description:
        "Тщательная проверка технического состояния каждого автомобиля",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Быстрая доставка",
      description: "Оптимальные сроки доставки с отслеживанием на каждом этапе",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Гарантия результата",
      description:
        "Возврат средств, если авто не соответствует заявленным характеристикам",
      gradient: "from-pink-500 to-purple-500",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 lg:py-32 animate-in fade-in slide-in-from-right-8 duration-1000 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 lg:mb-8">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Гарантируем идеальные
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              условия обслуживания
            </span>
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-blue-100/80 font-light leading-relaxed max-w-4xl mx-auto">
            Мы обеспечиваем высочайший уровень сервиса на каждом этапе
            сотрудничества. Ваше доверие - наша главная ценность.
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-16 lg:mb-24">
          {guarantees.map((guarantee, index) => (
            <div
              key={guarantee.title}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-white/30 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="relative z-10">
                <div
                  className={`flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${guarantee.gradient} rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl`}
                >
                  <div className="text-white group-hover:scale-110 transition-transform duration-300">
                    {guarantee.icon}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center group-hover:text-blue-300 transition-colors duration-300">
                  {guarantee.title}
                </h3>

                <p className="text-gray-300 text-center leading-relaxed text-sm sm:text-base">
                  {guarantee.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="relative overflow-hidden bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto border border-white/20 shadow-2xl">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Наши достижения говорят сами за себя
              </span>
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  value: "8+",
                  label: "лет на рынке",
                  gradient: "from-blue-400 to-cyan-400",
                },
                {
                  value: "2000+",
                  label: "довольных клиентов",
                  gradient: "from-purple-400 to-pink-400",
                },
                {
                  value: "30%",
                  label: "средняя экономия",
                  gradient: "from-green-400 to-emerald-400",
                },
                {
                  value: "100%",
                  label: "успешных сделок",
                  gradient: "from-orange-400 to-red-400",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center group cursor-pointer animate-in slide-in-from-bottom duration-1000"
                  style={{ animationDelay: `${index * 200 + 600}ms` }}
                >
                  <div
                    className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
