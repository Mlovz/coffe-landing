import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();

      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current
            .play()
            .catch((e) => console.error("Video play error:", e));

          if (textRef.current) {
            const chars = textRef.current.textContent?.split("") || [];
            textRef.current.innerHTML = chars
              .map(
                (char) =>
                  `<span class="inline-block opacity-0">${
                    char === " " ? "&nbsp;" : char
                  }</span>`
              )
              .join("");

            gsap.to(textRef.current.querySelectorAll("span"), {
              opacity: 1,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
              delay: 1.5,
            });
          }

          if (imageRef.current && overlayRef.current) {
            gsap.fromTo(
              imageRef.current,
              { scale: 1.1, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
              }
            );

            gsap.fromTo(
              overlayRef.current,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: "sine.inOut",
              }
            );
          }
        }
      }, 5000);

      // Анимация при скролле
      if (containerRef.current && rightSectionRef.current && videoRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=1000",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const easeProgress = gsap.utils.clamp(0, 1, progress * 1.2);

            // Видео-секция
            if (videoRef.current?.parentElement) {
              gsap.to(videoRef.current.parentElement, {
                scaleX: 1 + easeProgress * 1,
                transformOrigin: "left center",
                ease: "power2.out",
              });
            }

            // Правая секция
            if (rightSectionRef.current) {
              gsap.to(rightSectionRef.current, {
                xPercent: easeProgress * 100,
                opacity: 1 - easeProgress,
                ease: "power2.out",
              });
            }

            // Дополнительное движение видео вверх
            if (videoRef.current) {
              gsap.to(videoRef.current, {
                // y: -50 * easeProgress,
                // ease: "power2.out",
              });
            }
          },
          onLeaveBack: () => {
            // Возврат к исходному состоянию
            gsap.to(
              [videoRef.current?.parentElement, rightSectionRef.current],
              {
                scaleX: 1,
                xPercent: 0,
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              }
            );
          },
        });
      }

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row h-screen w-full overflow-hidden relative"
      >
        {/* Левая секция с видео */}
        <section className="video-parent relative w-full md:w-1/2">
          <video
            ref={videoRef}
            muted
            loop
            className="absolute inset-0 w-full md:h-[1000px] object-cover"
          >
            <source src="/videos/coffee-hero2.mp4" type="video/mp4" />
          </video>

          <div className="absolute w-full md:h-[1000px] bg-black/10 flex items-center justify-center">
            <h1
              ref={textRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center px-4"
            >
              {/* Стань бариста */}
            </h1>
          </div>
        </section>

        {/* Правая секция с фото */}
        <section
          ref={rightSectionRef}
          className="right-section relative w-full md:w-1/2 h-1/2 md:h-[800px]"
        >
          <motion.img
            ref={imageRef}
            src="/images/hero2.jpg"
            className="absolute inset-0 w-full md:h-[1000px] object-cover"
            alt="Кофейные зерна"
            initial={{ scale: 1.1, opacity: 0 }}
          />

          <div
            ref={overlayRef}
            className="absolute inset-0 md:h-[1000px] bg-black/30 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 6.5, duration: 0.8 }}
              className="text-center max-w-md flex flex-col items-center gap-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase">
                Искусство кофе
              </h2>
              <p className="text-white/90 ">
                Откройте для себя мир премиального кофе и мастерства бариста
              </p>
              <button className="w-[170px] h-[40px] bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors duration-300">
                Узнать больше
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
