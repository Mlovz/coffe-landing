import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { CoffeeStains } from "./CoffeeStains";

export const HeroSection = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Более легкие параллакс-эффекты
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Цвета для градиента
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      "linear-gradient(to bottom right, #111827, #7c2d12)",
      "linear-gradient(to bottom right, #7c2d12, #881337)",
      "linear-gradient(to bottom right, #881337, #312e81)",
      "linear-gradient(to bottom right, #312e81, #111827)",
    ]
  );

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  return (
    <motion.section
      ref={heroRef}
      style={{ backgroundImage: bgGradient }}
      className="relative h-screen overflow-hidden transition-colors duration-1000"
    >
      {/* Кофейные пятна */}
      <CoffeeStains />

      {/* Видео-фон */}
      <motion.video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        style={{ y: yBg }}
      >
        <source src="/videos/coffee-hero2.mp4" type="video/mp4" />
      </motion.video>

      {/* Параллакс-слой */}
      <motion.div
        className="absolute inset-0 bg-[url('/coffee-beans.png')] bg-cover opacity-10"
        style={{ y: yBg }}
      />

      <div className="container mx-auto h-full flex items-center px-6 relative z-10">
        <motion.div
          className="max-w-3xl space-y-8 backdrop-blur-sm bg-white/5 p-12 rounded-3xl border border-white/10"
          style={{
            y: yText,
            opacity: opacityText,
          }}
        >
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-6xl font-bold text-white"
          >
            Стань <motion.span className="text-amber-400">баристой</motion.span>
          </motion.h1>

          <motion.p className="text-xl text-gray-300">
            Освойте искусство кофейного мастерства с нуля до PRO за 8 недель
          </motion.p>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px -5px rgba(245, 158, 11, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-12 py-4 bg-amber-500 text-white text-lg font-semibold rounded-full relative overflow-hidden"
          >
            Начать обучение
          </motion.button>
        </motion.div>

        {/* Чашка с паром */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
          className="absolute right-32 top-1/3"
        >
          <img src="/images/coffe-cup.jpg" className="w-32" alt="Coffee Cup" />
        </motion.div>
      </div>

      {/* Индикатор скролла */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center"
          >
            <motion.div
              className="w-1 h-2 bg-amber-400 rounded-full mt-1"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
            />
          </motion.div>
          <span className="text-amber-400 mt-2 text-sm">Листайте вниз</span>
        </div>
      </motion.div>
    </motion.section>
  );
};
