import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const baristaTools = [
  {
    id: 1,
    name: "Профессиональная кофемолка",
    description: "Обеспечивает равномерный помол для идеальной экстракции",
    icon: "⚙️",
    image: "/images/hero2.jpg",
  },
  {
    id: 2,
    name: "Темпер",
    description: "Для равномерного уплотнения кофейной таблетки",
    icon: "🔘",
    image: "/images/hero1.jpg",
  },
  {
    id: 3,
    name: "Эспрессо-машина",
    description: "Профессиональное оборудование для бариста",
    icon: "☕",
    image: "/images/hero2.jpg",
  },
  {
    id: 4,
    name: "Молочник для латте-арта",
    description: "Нержавеющий питчер с узким носиком для создания латте-арта",
    icon: "🥛",
    image: "/images/hero1.jpg",
  },
  {
    id: 5,
    name: "Весы с таймером",
    description: "Точные весы для контроля дозировки и времени экстракции",
    icon: "⏱️",
    image: "/images/hero2.jpg",
  },
  {
    id: 6,
    name: "WDT-инструмент",
    description: "Для равномерного распределения молотого кофе в портафильтре",
    icon: "🖇️",
    image: "/images/hero1.jpg",
  },
];

export default function BaristaToolsCopy() {
  const [activeTool, setActiveTool] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      baristaTools.forEach((_, index) => {
        const tool = toolsRef.current[index];
        if (!tool) return;

        ScrollTrigger.create({
          trigger: tool,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveTool(index),
          onEnterBack: () => setActiveTool(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-stone-100 pb-20">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-[40px] font-light z-10 pb-10 pt-20 text-stone-800 text-center"
      >
        Инструменты бариста
      </motion.h2>

      <div
        ref={containerRef}
        className="relative bg-stone-100 flex w-[50%] mx-auto justify-center"
      >
        {/* Контентная часть с 75% шириной и меньшими блоками */}
        <div className="w-3/4">
          {baristaTools.map((tool, index) => (
            <div
              key={tool.id}
              ref={(el: any) => (toolsRef.current[index] = el)}
              className="h-[50vh] flex items-center justify-center px-10 mb-4" // Уменьшенная высота блоков
            >
              <motion.div
                className="w-full h-full relative rounded-xl overflow-hidden shadow-lg" // Более скромные тени
                initial={false}
                animate={{
                  opacity: activeTool === index ? 1 : 0.5,
                  scale: activeTool === index ? 1 : 0.95,
                  filter: activeTool === index ? "none" : "brightness(0.8)",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <img
                  src={tool.image}
                  className="w-full h-full object-cover absolute inset-0"
                  alt={tool.name}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor:
                      activeTool === index
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(0,0,0,0.4)",
                  }}
                />
                <motion.div
                  className="absolute bottom-6 left-6 right-6"
                  initial={false}
                  animate={{
                    opacity: activeTool === index ? 1 : 0,
                    y: activeTool === index ? 0 : 10,
                  }}
                  transition={{
                    delay: activeTool === index ? 0.2 : 0,
                    duration: 0.3,
                  }}
                >
                  <h3 className="text-[24px] font-medium text-white mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-[16px] font-light text-white/80">
                    {tool.description}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Фиксированный прогресс-бар справа */}
        <div className="w-1/4 sticky top-0 h-screen flex items-center justify-center">
          <div className="relative h-3/4 w-px bg-stone-300">
            {baristaTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${
                  index <= activeTool ? "text-amber-600" : "text-stone-500"
                }`}
                style={{
                  top: `${(index / (baristaTools.length - 1)) * 100}%`,
                }}
                initial={false}
                animate={{
                  scale: index === activeTool ? 1.1 : 1,
                  opacity: index === activeTool ? 1 : 0.6,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <span className="text-2xl mb-1">{tool.icon}</span>
                <motion.span
                  className="text-[16px] font-medium whitespace-nowrap"
                  animate={{
                    opacity: index === activeTool ? 1 : 0,
                    y: index === activeTool ? 0 : 5,
                  }}
                >
                  {tool.name}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
