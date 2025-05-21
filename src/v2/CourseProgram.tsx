import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export const CourseProgram = () => {
  const [activeModule, setActiveModule] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<(HTMLDivElement | null)[]>([]);

  const modules = [
    {
      title: "Введение в профессию",
      duration: "2 недели",
      lessons: [
        "История кофе и кофейной культуры",
        "Основные виды кофейных напитков",
        "Профессиональная терминология",
        "Оборудование и инструменты баристы",
      ],
    },
    {
      title: "Основы работы с эспрессо",
      duration: "3 недели",
      lessons: [
        "Технология приготовления эспрессо",
        "Помол и экстракция",
        "Калибровка кофемолки",
        "Темперирование и утрамбовка",
      ],
    },
    {
      title: "Молочные напитки",
      duration: "3 недели",
      lessons: [
        "Техника вспенивания молока",
        "Латте-арт базовый уровень",
        "Классические молочные напитки",
        "Авторские рецептуры",
      ],
    },
    {
      title: "Альтернативные методы заваривания",
      duration: "2 недели",
      lessons: [
        "Френч-пресс и кемекс",
        "Аэропресс: техники приготовления",
        "Холодное заваривание",
        "Фильтр-кофе: особенности",
      ],
    },
    {
      title: "Работа с гостями и меню",
      duration: "2 недели",
      lessons: [
        "Психология обслуживания",
        "Составление кофейной карты",
        "Работа с возражениями",
        "Управление очередью",
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers = modules.map((_, index) => {
        return ScrollTrigger.create({
          trigger: modulesRef.current[index],
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => setActiveModule(index),
          onEnterBack: () => setActiveModule(index),
          markers: false, // Уберите в продакшене
        });
      });

      return () => triggers.forEach((t) => t.kill());
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#1a2e1a]" id="program">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-900 dark:text-white"
      >
        Программа курса
      </motion.h2>

      <div ref={containerRef} className="relative flex">
        {/* Фиксированный прогресс-бар */}
        <div className="w-1/4 sticky top-0 h-screen flex items-center justify-center">
          <div className="relative h-3/4 w-px bg-gray-200 dark:bg-gray-700">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${
                  index <= activeModule ? "text-amber-500" : "text-gray-400"
                }`}
                style={{
                  top: `${(index / (modules.length - 1)) * 100}%`,
                }}
                initial={false}
                animate={{
                  scale: index === activeModule ? 1.2 : 1,
                  opacity: index === activeModule ? 1 : 0.6,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <span className="text-3xl mb-2">{index + 1}</span>
                <motion.span
                  className="text-lg font-medium whitespace-nowrap dark:text-white"
                  animate={{
                    opacity: index === activeModule ? 1 : 0,
                    y: index === activeModule ? 0 : 10,
                  }}
                >
                  {module.title}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Контентная часть */}
        <div className="w-3/4">
          {modules.map((module, index) => (
            <div
              key={index}
              ref={(el) => (modulesRef.current[index] = el)}
              className="h-[60vh] flex items-center justify-center px-10 mb-10"
            >
              <motion.div
                className={`w-full h-full p-8 rounded-xl shadow-lg ${
                  activeModule === index
                    ? "bg-amber-50 dark:bg-[#1f361f] border-1 border-[#223d22]"
                    : "bg-white dark:bg-[#1a2e1a]"
                }`}
                initial={false}
                animate={{
                  opacity: activeModule === index ? 1 : 0.5,
                  scale: activeModule === index ? 1 : 0.95,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: activeModule === index ? 1 : 0.7,
                  }}
                >
                  <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {module.duration}
                  </p>

                  <motion.ul
                    className="space-y-3"
                    initial={false}
                    animate={{
                      opacity: activeModule === index ? 1 : 0,
                      y: activeModule === index ? 0 : 20,
                    }}
                    transition={{
                      delay: activeModule === index ? 0.3 : 0,
                      duration: 0.4,
                    }}
                  >
                    {module.lessons.map((lesson, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {lesson}
                        </span>
                      </li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
