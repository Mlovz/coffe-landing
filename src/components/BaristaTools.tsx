import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTransform, useMotionValue, useSpring } from "framer-motion";

const baristaTools = [
  {
    id: 1,
    name: "Профессиональная кофемолка",
    description: "Обеспечивает равномерный помол для идеальной экстракции",
    specs: [
      "Тип: Жерновая",
      "Материал: Керамические жернова",
      "Настройки помола: 60 ступеней",
      "Скорость вращения: 1400 об/мин",
    ],
    image: "/images/hero2.jpg",
    video: "/videos/grinder-demo.mp4",
  },
  {
    id: 2,
    name: "Темпер",
    description: "Для равномерного уплотнения кофейной таблетки",
    specs: [
      "Материал: Алюминиевый сплав",
      "Диаметр: 58.5 мм",
      "Вес: 500 г",
      "Покрытие: Матовое анодирование",
    ],
    image: "/images/hero1.jpg",
    video: "/videos/tamper-demo.mp4",
  },
  {
    id: 3,
    name: "Эспрессо-машина",
    description: "Профессиональное оборудование для бариста",
    specs: [
      "Давление: 9 бар",
      "Бойлер: Двойной, 1.5 л",
      "Температура: 92-96°C",
      "Материал: Нержавеющая сталь",
    ],
    image: "/images/hero2.jpg",
    video: "/videos/machine-demo.mp4",
  },
  {
    id: 4,
    name: "Молочник для латте-арта",
    description: "Нержавеющий питчер с узким носиком для создания латте-арта",
    specs: [
      "Объем: 600 мл",
      "Материал: Нержавеющая сталь",
      "Форма носика: Узкий для точного наливания",
      "Ручка: Эргономичная",
    ],
    image: "/images/hero1.jpg",
    video: "/videos/pitcher-demo.mp4",
  },
  {
    id: 5,
    name: "Весы с таймером",
    description: "Точные весы для контроля дозировки и времени экстракции",
    specs: [
      "Точность: ±0.1 г",
      "Максимальный вес: 2 кг",
      "Функции: Встроенный таймер, автоотключение",
      "Дисплей: LED-подсветка",
    ],
    image: "/images/hero2.jpg",
    video: "/videos/scale-demo.mp4",
  },
  {
    id: 6,
    name: "WDT-инструмент",
    description:
      "Инструмент для равномерного распределения молотого кофе в портафильтре",
    specs: [
      "Материал: Нержавеющая сталь",
      "Количество игл: 8",
      "Диаметр игл: 0.3 мм",
      "Ручка: Деревянная",
    ],
    image: "/images/hero1.jpg",
    video: "/videos/wdt-demo.mp4",
  },
  {
    id: 7,
    name: "Нижний портафильтр (без дна)",
    description: "Позволяет наблюдать за экстракцией и выявлять каналы",
    specs: [
      "Диаметр: 58 мм",
      "Материал: Хромированная латунь",
      "Ручка: Деревянная",
      "Совместимость: Универсальная",
    ],
    image: "/images/hero2.jpg",
    video: "/videos/portafilter-demo.mp4",
  },
  {
    id: 8,
    name: "Нок-бокс",
    description: "Контейнер для удаления использованного кофе после экстракции",
    specs: [
      "Материал: Пластик с резиновым покрытием",
      "Размеры: 15x15x15 см",
      "Особенности: Нескользящее основание, съемный стержень",
      "Цвет: Черный",
    ],
    image: "/images/hero1.jpg",
    video: "/videos/knockbox-demo.mp4",
  },
  {
    id: 9,
    name: "Пак-скрин",
    description:
      "Сетка для равномерного распределения воды и защиты душевой сетки",
    specs: [
      "Диаметр: 58 мм",
      "Толщина: 1.7 мм",
      "Материал: Нержавеющая сталь",
      "Преимущества: Улучшает экстракцию, облегчает очистку",
    ],
    image: "/images/hero2.jpg",
    video: "/videos/puckscreen-demo.mp4",
  },
  {
    id: 10,
    name: "Дозирующая воронка",
    description:
      "Упрощает засыпку молотого кофе в портафильтр, предотвращая рассыпание",
    specs: [
      "Диаметр: 58 мм",
      "Материал: Алюминий",
      "Особенности: Магнитное крепление",
      "Цвет: Черный матовый",
    ],
    image: "/images/hero1.jpg",
    video: "/videos/dosing-funnel-demo.mp4",
  },
  {
    id: 11,
    name: "Дозирующая чашка",
    description:
      "Позволяет точно отмерить и перенести молотый кофе в портафильтр",
    specs: [
      "Объем: 60 мл",
      "Материал: Нержавеющая сталь",
      "Особенности: Антистатическое покрытие",
      "Совместимость: Портафильтры 58 мм",
    ],
    image: "/images/hero2.jpg",
    video: "/videos/dosing-cup-demo.mp4",
  },
  {
    id: 12,
    name: "Тампинг-станция",
    description:
      "Обеспечивает стабильную поверхность для темпинга и защищает рабочее место",
    specs: [
      "Материал: Силикон и нержавеющая сталь",
      "Размеры: 15x20 см",
      "Особенности: Нескользящая поверхность",
      "Цвет: Черный",
    ],
    image: "/images/hero1.jpg",
    video: "/videos/tamping-station-demo.mp4",
  },
  {
    id: 13,
    name: "Коврик для темпинга",
    description: "Защищает столешницу и обеспечивает устойчивость при темпинге",
    specs: [
      "Материал: Силикон",
      "Размеры: 15x20 см",
      "Особенности: Углубление для портафильтра",
      "Цвет: Черный",
    ],
    image: "/images/hero2.jpg",
    video: "/videos/tamping-mat-demo.mp4",
  },
  {
    id: 14,
    name: "Щетка для группы",
    description:
      "Предназначена для очистки группы эспрессо-машины от остатков кофе",
    specs: [
      "Материал: Пластик и нейлон",
      "Длина: 15 см",
      "Особенности: Угловая форма для удобства",
      "Цвет: Черный",
    ],
    image: "/images/hero1.jpg",
    video: "/videos/group-brush-demo.mp4",
  },
  {
    id: 15,
    name: "Микрофибровая салфетка",
    description:
      "Используется для очистки оборудования и поддержания чистоты на рабочем месте",
    specs: [
      "Материал: Микрофибра",
      "Размеры: 30x30 см",
      "Цвет: Серый",
      "Особенности: Быстро впитывает влагу",
    ],
    image: "/images/hero2.jpg",
    video: "/videos/microfiber-cloth-demo.mp4",
  },
];

export default function BaristaTools() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const rotateY = useTransform(x, [-100, 100], [15, -15]);

  return (
    <section className="bg-stone-100 py-24 px-6 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl font-light text-stone-800 text-center mb-16"
      >
        Инструменты бариста
      </motion.h2>

      {/* 3D карусель */}
      <motion.div
        ref={carouselRef}
        className="relative h-[500px] max-w-6xl mx-auto"
        style={{ perspective: "2000px" }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-12"
          style={{
            x: springX,
            rotateY,
          }}
          drag="x"
          dragConstraints={carouselRef}
          dragElastic={0.1}
          onDrag={(e, { offset }) => x.set(offset.x)}
        >
          {baristaTools.map((tool) => (
            <motion.div
              key={tool.id}
              className="relative w-80 h-96 flex-shrink-0 rounded-2xl bg-white shadow-xl overflow-hidden cursor-pointer"
              whileHover={{
                y: -20,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setSelectedTool(tool.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-200" />
              <motion.img
                src={tool.image}
                className="absolute w-full h-full object-cover"
                alt={tool.name}
                initial={false}
                whileHover={{
                  scale: 1.05,
                  transition: { delay: 0.1 },
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-xl font-medium text-white">{tool.name}</h3>
                <p className="text-stone-300 font-light">{tool.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Модальное окно с деталями */}
      <AnimatePresence>
        {selectedTool && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {baristaTools
              .filter((t) => t.id === selectedTool)
              .map((tool) => (
                <motion.div
                  key={tool.id}
                  className="relative bg-white max-w-6xl w-full rounded-3xl overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <button
                    className="absolute top-6 right-6 text-stone-500 hover:text-stone-800 z-10"
                    onClick={() => setSelectedTool(null)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>

                  <div className="grid md:grid-cols-2">
                    <div className="h-96 md:h-full bg-stone-100 flex items-center justify-center p-12">
                      <img
                        src={tool.image}
                        className="w-full h-full object-contain"
                        alt={tool.name}
                      />
                    </div>
                    <div className="p-12">
                      <h3 className="text-3xl font-light text-stone-800 mb-4">
                        {tool.name}
                      </h3>
                      <p className="text-stone-600 mb-8">{tool.description}</p>

                      <div className="mb-8">
                        <h4 className="text-xl font-medium text-stone-800 mb-4">
                          Технические характеристики
                        </h4>
                        <ul className="space-y-2">
                          {tool.specs.map((spec, i) => (
                            <li key={i} className="text-stone-600 flex">
                              <span className="text-stone-400 mr-2">•</span>
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-stone-100 rounded-xl overflow-hidden">
                        <video
                          src={tool.video}
                          className="w-full"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
