import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import gsap from "gsap";

export const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef(null);
  const { scrollY } = useScroll();

  // Анимация прозрачности при скролле
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100)
      gsap.to(headerRef.current, {
        backdropFilter: "blur(10px)",
        duration: 0.3,
      });
    else
      gsap.to(headerRef.current, {
        backdropFilter: "blur(0px)",
        duration: 0.3,
      });
  });

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed top-0 z-50 w-full bg-[#1a2e1acc] dark:bg-[#1a2e1acc] backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent"
        >
          BaristaMaster
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {["home", "course", "benefits", "program", "reviews"].map((item) => (
            <motion.a
              key={item}
              href={`#${item}`}
              onHoverStart={() =>
                gsap.to(`.indicator-${item}`, { scaleX: 1, duration: 0.3 })
              }
              onHoverEnd={() =>
                !activeSection.includes(item) &&
                gsap.to(`.indicator-${item}`, { scaleX: 0, duration: 0.3 })
              }
              className="relative px-1 py-2 text-gray-700 dark:text-gray-300 uppercase text-sm font-medium"
            >
              {item}
              <motion.span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 origin-left indicator-${item}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeSection === item ? 1 : 0 }}
              />
            </motion.a>
          ))}
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-amber-500 text-white rounded-full font-medium shadow-lg shadow-amber-500/20"
        >
          Записаться
        </motion.button>
      </div>
    </motion.header>
  );
};
