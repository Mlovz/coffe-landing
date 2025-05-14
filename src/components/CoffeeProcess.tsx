import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const coffeeProcessSteps = [
  {
    id: 1,
    title: "Отбор зерен",
    description: "Только лучшие зерна сортируются вручную для идеального вкуса",
    icon: "🌱",
    image: "/images/coffe-cup-beans-table.png",
  },
  {
    id: 2,
    title: "Обжарка",
    description: "Точный контроль температуры раскрывает уникальный аромат",
    icon: "🔥",
    image: "/images/chat.jpg",
  },
  {
    id: 3,
    title: "Помол",
    description: "Свежий помол непосредственно перед приготовлением",
    icon: "⚙️",
    image: "/images/create-coffe.jpg",
  },
  {
    id: 4,
    title: "Заваривание",
    description: "Искусство экстракции для идеального баланса вкусов",
    icon: "☕",
    image: "/images/hero2.jpg",
  },
];

export default function CoffeeProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      coffeeProcessSteps.forEach((_, index) => {
        const step = stepsRef.current[index];
        if (!step) return;

        ScrollTrigger.create({
          trigger: step,
          start: "top 60%", // Изменена точка срабатывания
          end: "bottom 40%",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-[40px] font-light z-10 pb-10 pt-20 text-stone-800 text-center"
      >
        От зерна до чашки
      </motion.h2>

      <div ref={containerRef} className="relative bg-stone-50 flex ">
        {/* Фиксированный прогресс-бар */}
        <div className="w-1/4 sticky top-0 h-screen flex items-center justify-center">
          <div className="relative h-3/4 w-px bg-stone-200">
            {coffeeProcessSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${
                  index <= activeStep ? "text-amber-600" : "text-stone-400"
                }`}
                style={{
                  top: `${(index / (coffeeProcessSteps.length - 1)) * 100}%`,
                }}
                initial={false}
                animate={{
                  scale: index === activeStep ? 1.2 : 1,
                  opacity: index === activeStep ? 1 : 0.6,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <span className="text-3xl mb-2">{step.icon}</span>
                <motion.span
                  className="text-[18px] font-medium whitespace-nowrap"
                  animate={{
                    opacity: index === activeStep ? 1 : 0,
                    y: index === activeStep ? 0 : 10,
                  }}
                >
                  {step.title}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Контентная часть с 80% высотой */}
        <div className="w-3/4">
          {coffeeProcessSteps.map((step, index) => (
            <div
              key={step.id}
              ref={(el: any) => (stepsRef.current[index] = el)}
              className="h-[80vh] flex items-center justify-center px-20 mb-10" // 80vh + margin-bottom
            >
              <motion.div
                className="w-full h-full relative rounded-2xl overflow-hidden shadow-xl"
                initial={false}
                animate={{
                  opacity: activeStep === index ? 1 : 0.3,
                  scale: activeStep === index ? 1 : 0.95,
                  filter: activeStep === index ? "none" : "brightness(0.7)",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <img
                  src={step.image}
                  className="w-full h-full object-cover absolute inset-0"
                  alt={step.title}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor:
                      activeStep === index
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(0,0,0,0.3)",
                  }}
                />
                <motion.div
                  className="absolute bottom-10 left-10 max-w-md"
                  initial={false}
                  animate={{
                    opacity: activeStep === index ? 1 : 0,
                    y: activeStep === index ? 0 : 20,
                  }}
                  transition={{
                    delay: activeStep === index ? 0.3 : 0,
                    duration: 0.4,
                  }}
                >
                  <h3 className="text-[36px] font-light text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[20px] font-light text-white/80">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
