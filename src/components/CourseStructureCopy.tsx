import { motion } from "framer-motion";

export default function CourseStructureCopy() {
  return (
    <section className="">
      {/* Заголовок с увеличенным отступом */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full h-40 flex flex-col gap-2 justify-center mx-auto text-center "
      >
        <h2 className="text-5xl font-medium">Как устроен курс</h2>
        <p className="text-xl text-gray-600">
          Инновационный формат, сочетающий кинематографичный видеоконтент и
          персональную поддержку
        </p>
      </motion.div>

      {/* Контейнер на всю ширину экрана */}
      <div className="w-full overflow-hidden">
        {/* Сетка из 3 колонок */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Блок 1: Видеоуроки */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8 bg-white items-center justify-center relative group h-[800px]"
            style={{
              background:
                "linear-gradient(157deg,rgba(255, 255, 255, 1) 0%, rgba(207, 181, 149, 0.43) 100%)",
            }}
          >
            <div className="flex justify-center items-center w-full">
              <div className="text-center flex flex-col items-center">
                <h3 className="text-[40px] w-max font-semibold text-black">
                  Киношные уроки
                </h3>
                <p className="max-w-[500px] text-[22px] font-light text-black/70 mb-4">
                  Профессиональный свет и 4K-съемка покажут каждую деталь работы
                  с кофе
                </p>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <img
                className="h-[500px] w-full object-cover"
                src="/images/coffe-cup-beans-table.png"
                alt="Киношные уроки"
              />
            </div>
          </motion.div>

          {/* Блок 2: Практика */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-8 items-center justify-center relative group h-[800px]"
            style={{
              background:
                "linear-gradient(23deg,rgba(255, 255, 255, 1) 0%, rgba(207, 181, 149, 0.43) 100%)",
            }}
          >
            <div className="flex justify-center items-center w-full">
              <div className="text-center flex flex-col items-center">
                <h3 className="text-[40px] w-max font-semibold text-black">
                  Персональный разбор
                </h3>
                <p className="max-w-[500px] text-[22px] font-light text-black/70 mb-4">
                  Присылайте видео вашей практики и получайте таймкод-разбор с
                  указанием ошибок
                </p>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <img
                className="h-[500px] w-full object-cover"
                src="/images/pers.png"
                alt="Персональный разбор"
              />
            </div>
          </motion.div>

          {/* Блок 4: Дубликат Практики */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-8 items-center justify-center relative group h-[800px]"
            style={{
              background:
                "linear-gradient(27deg,rgba(242, 242, 242, 1) 0%, rgba(207, 207, 207, 0.56) 100%)",
            }}
          >
            <div className="flex justify-center items-center w-full">
              <div className="text-center flex flex-col items-center">
                <h3 className="text-[40px] w-max font-semibold text-black">
                  Персональный разбор
                </h3>
                <p className="max-w-[500px] text-[22px] font-light text-black/70 mb-4">
                  Присылайте видео вашей практики и получайте таймкод-разбор с
                  указанием ошибок
                </p>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <img
                className="h-[500px] w-full object-cover"
                src="/images/pers.png"
                alt="Персональный разбор"
              />
            </div>
          </motion.div>

          {/* Блок 3: Поддержка */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8 bg-white items-center justify-center relative group h-[800px]"
            style={{
              background:
                "linear-gradient(333deg,rgba(255, 255, 255, 1) 0%, rgba(207, 207, 207, 0.43) 100%)",
            }}
          >
            <div className="flex justify-center items-center w-full">
              <div className="text-center flex flex-col items-center">
                <h3 className="text-[40px] w-max font-semibold text-black">
                  Экспертная поддержка
                </h3>
                <p className="max-w-[500px] text-[22px] font-light text-black/70 mb-4">
                  Чат с топ-баристами, где вы получите ответы на любые
                  технические вопросы
                </p>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <img
                className="h-[500px] w-full object-cover"
                src="/images/coffe-cup-beans-table.png"
                alt="Экспертная поддержка"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
