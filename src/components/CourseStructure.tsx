import { motion } from "framer-motion";

export default function CourseStructure() {
  return (
    <section className="">
      {/* Заголовок с увеличенным отступом */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full h-40 flex flex-col gap-2 justify-center mx-auto px-6 mb-24 text-center "
      >
        <h2 className="text-5xl font-bold mb-6 uppercase">Как устроен курс</h2>
        <p className="text-xl text-gray-600">
          Инновационный формат, сочетающий кинематографичный видеоконтент и
          персональную поддержку
        </p>
      </motion.div>

      {/* Контейнер на всю ширину экрана */}
      <div className="w-full overflow-hidden">
        {/* Сетка из 3 колонок */}
        <div className="grid grid-cols-3 gap-0">
          {/* Блок 1: Видеоуроки */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative group"
          >
            <div className="absolute inset-0 z-10 flex justify-center items-center p-10 bg-black/60 ">
              <div className="max-w-md text-center">
                <h3 className="text-2xl font-semibold text-white mb-3 uppercase">
                  Киношные уроки
                </h3>
                <p className="text-gray-300 mb-4">
                  Профессиональный свет и 4K-съемка покажут каждую деталь работы
                  с кофе
                </p>
                <div className="h-px w-full bg-white/30 mb-4"></div>
                <span className="text-sm text-white/70">Доступ 24/7</span>
              </div>
            </div>
            {/* Замените на свое изображение */}
            <div className="aspect-[4/5] bg-gray-200 w-full">
              {/* Ваше изображение здесь */}
              <img
                className="h-full object-cover"
                src="/images/create-coffe1.jpg"
                alt=""
              />
              {/* <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
                <span className="text-white/30 text-lg">Barista Lesson 1</span>
              </div> */}
            </div>
          </motion.div>

          {/* Блок 2: Практика */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 z-10 flex justify-center items-center p-10 bg-black/60">
              <div className="max-w-md text-center">
                <h3 className="text-[36px] font-semibold text-white mb-3">
                  Персональный разбор
                </h3>
                <p className="text-gray-300 text-[18px]">
                  Присылайте видео вашей практики и получайте таймкод-разбор с
                  указанием ошибок
                </p>
                <div className="h-px w-full bg-white/30 mb-4"></div>
                <span className="text-sm text-white/70">
                  56 практических заданий
                </span>
              </div>
            </div>
            {/* Замените на свое изображение */}
            <div className="aspect-[4/5] bg-gray-200 w-full">
              {/* Ваше изображение здесь */}
              <img
                className="h-full object-cover"
                src="/images/pers.jpg"
                alt=""
              />
              {/* <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-900 to-amber-700">
                <span className="text-white/30 text-lg">Barista Practice</span>
              </div> */}
            </div>
          </motion.div>

          {/* Блок 3: Поддержка */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 z-10 flex justify-center items-center p-10 bg-black/60">
              <div className="max-w-md text-center">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Экспертная поддержка
                </h3>
                <p className="text-gray-300 mb-4">
                  Чат с топ-баристами, где вы получите ответы на любые
                  технические вопросы
                </p>
                <div className="h-px w-full bg-white/30 mb-4"></div>
                <span className="text-sm text-white/70">
                  Ответ в течение 2 часов
                </span>
              </div>
            </div>
            {/* Замените на свое изображение */}
            <div className="aspect-[4/5] bg-gray-200 w-full">
              {/* Ваше изображение здесь */}
              <img
                className="h-full object-cover"
                src="/images/chat.jpg"
                alt=""
              />
              {/* <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
                <span className="text-white/30 text-lg">Expert Support</span>
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
