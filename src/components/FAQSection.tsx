"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      question: "Из чего складывается стоимость автомобиля с аукциона?",
      answer: `Стоимость автомобиля включает:
• Стоимость автомобиля на аукционе
• Аукционные и транспортные сборы
• Оформление экспортных документов
• Страхование и логистика
• Таможенное оформление в России
• Таможенная пошлина и утилизационный сбор
• Наша комиссия за услуги

Все эти затраты прозрачно отображаются в нашем калькуляторе стоимости.`,
    },
    {
      question: "Порядок оплаты",
      answer: `Мы предлагаем гибкую систему оплаты:
• Полная предоплата (максимальная скидка)
• Оплата 50% + доплата при получении
• Минимальный задаток 10% + доплата поэтапно

От выбора схемы оплаты зависит итоговая стоимость автомобиля.`,
    },
    {
      question: "Нужно оплачивать всю сумму сразу?",
      answer:
        "Нет, у нас гибкая система оплаты. Вы можете оплатить всё сразу для получения максимальной скидки, а можете оплачивать частями по мере необходимости.",
    },
    {
      question: "Как заказать автомобиль, если его нет в каталоге?",
      answer:
        "Если вы не нашли подходящий вариант, просто отправьте нам заявку с описанием желаемого автомобиля. Мы найдем его на аукционах и предложим вам лучшие варианты.",
    },
    {
      question: "Есть ли возможность посмотреть автомобиль перед покупкой?",
      answer:
        "Да, мы можем организовать детальный осмотр автомобиля нашими представителями на аукционе или у дилера. Также предоставляем подробные фото и видео осмотр.",
    },
    {
      question: "Каких годов автомобили вы привозите?",
      answer:
        "Мы работаем с новыми автомобилями, а также с автомобилями возрастом до 5 лет. Основной фокус - на свежих автомобилях с минимальным пробегом.",
    },
    {
      question: "Каков процесс заказа автомобиля?",
      answer: `Процесс простой и прозрачный:
1. Выбираете автомобиль или оставляете заявку
2. Получаете расчет стоимости и консультацию
3. Подписываете договор и вносите предоплату
4. Мы находим и выкупаем автомобиль
5. Организуем доставку в Россию
6. Передаем вам готовый автомобиль с документами`,
    },
    {
      question: "Могу ли я заказать автомобиль под индивидуальные параметры?",
      answer:
        "Конечно! Мы подбираем автомобили под ваши индивидуальные требования: конкретную комплектацию, цвет, год выпуска, пробег и другие параметры.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-16 animate-in fade-in duration-1000">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ответы на самые популярные вопросы о покупке автомобилей с аукционов
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="border border-gray-600 rounded-lg overflow-hidden bg-gray-800/50 backdrop-blur-sm"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-6 text-left hover:bg-gray-700/50 transition-colors duration-200 flex items-center justify-between"
                  aria-expanded={openItems.has(index)}
                >
                  <span className="text-white font-semibold text-lg pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    {openItems.has(index) ? (
                      <ChevronUp className="w-4 h-4 text-white" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>

                {openItems.has(index) && (
                  <div className="px-6 pb-6 border-t border-gray-600">
                    <div className="pt-4 text-gray-300 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
