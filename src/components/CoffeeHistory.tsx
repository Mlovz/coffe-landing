import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const coffeeTimelineData = [
  {
    era: "IX век",
    title: "Эфиопские истоки",
    description:
      "Легенда о пастухе Калди, открывшем тонизирующие свойства кофейных ягод",
    image: "/images/coffe-cup-beans-table.png",
    bgColor: "bg-amber-900/20",
  },
  {
    era: "XV век",
    title: "Арабские торговцы",
    description: "Первые кофейни в Мекке и технология обжарки зерен",
    image: "/images/create-coffe.jpg",
    bgColor: "bg-stone-800/20",
  },
  {
    era: "1683 год",
    title: "Вена: первая европейская кофейня",
    description: "Турецкие мешки с кофе как трофей после осады города",
    image: "/images/chat.jpg",
    bgColor: "bg-amber-700/20",
  },
  {
    era: "2025 год",
    title: "Современное искусство",
    description: "Молекулярный кофе и цифровые методы контроля экстракции",
    image: "/images/create-coffe4.jpeg",
    bgColor: "bg-black/20",
  },
];

const Indicator = ({ active }: { active: boolean }) => (
  <motion.button
    className="h-1.5 rounded-full cursor-pointer overflow-hidden relative group"
    initial={false}
    animate={{
      width: active ? 32 : 16,
    }}
    whileHover={{ scaleY: 1.5 }}
    transition={{
      type: "spring",
      stiffness: 500,
      damping: 30,
    }}
  >
    <AnimatePresence>
      {active ? (
        <motion.span
          className="absolute top-0 left-0 h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ width: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ) : (
        <motion.span
          className="absolute top-0 left-0 h-full bg-white/30 rounded-full"
          initial={{ width: "100%" }}
          animate={{ width: "100%" }}
          exit={{ width: 0 }}
        />
      )}
    </AnimatePresence>

    {/* Эффект свечения для активного индикатора */}
    {active && (
      <motion.span
        className="absolute inset-0 rounded-full bg-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    )}
  </motion.button>
);

export default function CoffeeHistory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);

  // Инициализация горизонтального скролла
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Рассчитываем общую ширину всех слайдов
    const width = slidesRef.current.reduce((acc, slide) => {
      return acc + (slide?.offsetWidth || 0);
    }, 0);
    setTotalWidth(width);

    // Создаем горизонтальный скролл
    gsap.to(container, {
      x: () => -(width - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ".history-scroll-trigger",
        start: "top top",
        end: () => `+=${width}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Рассчитываем текущий активный слайд
          const progress = self.progress;
          const newIndex = Math.round(
            progress * (coffeeTimelineData.length - 1)
          );
          setActiveIndex(newIndex);
        },
      },
    });

    // Параллакс и анимация текста для каждого слайда
    slidesRef.current.forEach((slide, index) => {
      if (!slide) return;

      const bg = slide.querySelector(".history-bg");
      const text = slide.querySelector(".history-text");

      // Анимация появления текста
      gsap.fromTo(
        text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: slide,
            start: "left center",
            end: "right center",
            scrub: true,
          },
        }
      );

      // Параллакс эффект для фона
      gsap.fromTo(
        bg,
        { scale: 1.2 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: slide,
            start: "left center",
            end: "right center",
            scrub: 1.5,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Обработчик клика на индикатор

  return (
    <>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-5xl font-light z-10 py-8 text-stone-800 text-center"
      >
        Эволюция кофейной культуры
      </motion.h2>
      <MotionConfig reducedMotion="user">
        <section className="history-scroll-trigger h-screen w-full overflow-hidden relative bg-stone-100">
          {/* Горизонтальный скролл-контейнер */}
          <div ref={containerRef} className="flex h-full w-max">
            {coffeeTimelineData.map((item, index) => (
              <div
                key={index}
                ref={(el: any) => (slidesRef.current[index] = el)}
                className={`relative h-full w-screen flex items-center justify-center ${item.bgColor}`}
              >
                {/* Фон с параллаксом */}
                <div className="history-bg absolute inset-0 overflow-hidden">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Текст с анимацией */}
                <div className="history-text relative z-10 max-w-2xl px-8 text-center opacity-0">
                  <span className="text-amber-200 text-lg">{item.era}</span>
                  <h3 className="text-5xl font-medium text-white mt-2 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-stone-100 text-xl font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Индикатор прокрутки */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {coffeeTimelineData.map((_, index) => (
              <Indicator key={index} active={activeIndex === index} />
            ))}
          </motion.div>
        </section>
      </MotionConfig>
    </>
  );
}
