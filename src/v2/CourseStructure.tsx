import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CourseStructure = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [progresss, setProgress] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Устанавливаем общую ширину контейнера
      const cards: any = gsap.utils.toArray(".structure-card");
      const totalWidth =
        cards.reduce((acc: any, card: any) => acc + card.offsetWidth + 48, 0) -
        window.innerWidth;

      // Анимация горизонтального скролла
      gsap.to(containerRef.current, {
        x: -1000,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          markers: false, // можно включить для дебага
          onUpdate: (self) => {
            const progress = Math.min(self.progress * 100, 100);
            setProgress(progress);
          },
        },
      });

      // Анимация появления карточек при входе в секцию
      gsap.from(".structure-card", {
        opacity: 0,
        y: 100,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top center",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "Теория",
      description: "Интерактивные уроки с видео и анимациями",
      icon: "📚",
      color: "bg-amber-100 text-amber-800",
    },
    {
      title: "Практика",
      description: "Домашние задания с обратной связью от экспертов",
      icon: "✍️",
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      title: "Разборы",
      description: "Анализ ваших работ и разбор ошибок",
      icon: "🔍",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Сообщество",
      description: "Доступ к чату с преподавателями и студентами",
      icon: "👥",
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Диплом",
      description: "Финальный проект и сертификат об окончании",
      icon: "🏆",
      color: "bg-rose-100 text-rose-800",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="aaa relative h-screen bg-white dark:bg-[#1a2e1a] overflow-hidden"
    >
      {/* Фиксированный заголовок */}
      <div className=" w-full pt-16 pointer-events-none z-10 flex items-center">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-12"
          >
            Как устроен курс
          </motion.h2>

          {/* Индикатор прогресса */}
        </div>
      </div>

      {/* Горизонтальный скролл */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden">
        <div
          ref={containerRef}
          className="h-screen w-max flex items-center pl-[20vw] py-32 overflow-x-auto"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex space-x-12 px-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="structure-card w-[320px] h-[420px] flex-shrink-0 rounded-3xl p-8 flex flex-col justify-between backdrop-blur-sm bg-[#1f361f] dark:bg-[#1f361f] border border-[#223d22] dark:border-[#223d22] shadow-xl scroll-snap-align-start"
              >
                <div>
                  <span
                    className={`text-5xl mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full ${step.color}`}
                  >
                    {step.icon}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}

            {/* Финальная карточка CTA */}
            <div className="structure-card w-[320px] h-[420px] flex-shrink-0 rounded-3xl p-8 flex flex-col justify-center items-center backdrop-blur-sm bg-gradient-to-br from-amber-500 to-amber-600 text-white scroll-snap-align-start">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Готовы начать?
              </h3>
              <p className="text-center mb-8 opacity-90">
                Присоединяйтесь к курсу и освойте профессию баристы
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-amber-600 rounded-full font-semibold"
              >
                Записаться
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 w-full max-w-md h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-8">
        <motion.div
          className="h-full bg-amber-500"
          style={{ width: `${progresss}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progresss}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      {/* Подсказка для скролла */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center text-gray-500 dark:text-gray-400 text-sm bg-[#1f361f] dark:bg-[#1f361f] px-4 py-2 rounded-full backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="mr-2">← Скролл вбок →</span>
        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-4 h-4"
        >
          ↔️
        </motion.div>
      </motion.div>
    </section>
  );
};
