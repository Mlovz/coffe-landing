import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const coffeeDrinks = [
  {
    id: 1,
    name: "Эспрессо",
    description:
      "Концентрированный кофейный напиток, приготовленный под давлением",
    origin: "Италия, 1901",
    recipe: "7-9 г кофе на 25-30 мл воды при 9 бар давления",
    image: "/images/hero1.jpg",
  },
  {
    id: 2,
    name: "Латте",
    description: "Эспрессо с большим количеством вспененного молока",
    origin: "США, 1980-е",
    recipe: "1/3 эспрессо, 2/3 молока с пенкой",
    image: "/images/hero2.jpg",
  },
  {
    id: 3,
    name: "Капучино",
    description:
      "Классический итальянский напиток с равными частями эспрессо, горячего молока и молочной пены",
    origin: "Италия, конец XVIII века",
    recipe: "1/3 эспрессо, 1/3 горячего молока, 1/3 молочной пены",
    image: "/images/hero1.jpg",
  },
  {
    id: 4,
    name: "Кортадо",
    description:
      "Испанский напиток, представляющий собой эспрессо с равным количеством теплого молока",
    origin: "Испания, XX век",
    recipe: "1 часть эспрессо, 1 часть теплого молока",
    image: "/images/hero2.jpg",
  },
  {
    id: 5,
    name: "Мокко",
    description:
      "Сладкий напиток на основе эспрессо с добавлением шоколадного сиропа и молока",
    origin: "Йемен, XVII век",
    recipe:
      "1 порция эспрессо, 1 часть шоколадного сиропа, 2 части горячего молока, взбитые сливки по желанию",
    image: "/images/hero1.jpg",
  },
  {
    id: 6,
    name: "Флэт Уайт",
    description:
      "Австралийский напиток, сочетающий эспрессо с микропеной из молока",
    origin: "Австралия/Новая Зеландия, 1980-е",
    recipe: "1 порция эспрессо, 2 части микропены из молока",
    image: "/images/hero2.jpg",
  },
  {
    id: 7,
    name: "Глясе",
    description:
      "Холодный кофе с шариком ванильного мороженого, популярный в летнее время",
    origin: "Франция, XIX век",
    recipe: "Охлажденный черный кофе, 1 шарик ванильного мороженого",
    image: "/images/hero1.jpg",
  },
  {
    id: 8,
    name: "Турецкий кофе",
    description:
      "Кофе, сваренный в джезве с мелко молотыми зернами, водой и сахаром",
    origin: "Османская империя, XVI век",
    recipe:
      "1 чайная ложка мелко молотого кофе, 1 стакан холодной воды, сахар по вкусу, сварить в джезве до появления пены",
    image: "/images/hero2.jpg",
  },
];

export default function DrinkGallery() {
  const [selectedDrink, setSelectedDrink] = useState<number | null>(null);
  const [hoveredDrink, setHoveredDrink] = useState<number | null>(null);

  return (
    <section className="bg-stone-50 pb-20 ">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-[40px] font-light z-10 pb-10 pt-20 text-stone-800 text-center"
      >
        Галерея напитков
      </motion.h2>

      {/* Grid с напитками */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {coffeeDrinks.map((drink) => (
            <motion.div
              key={drink.id}
              className="relative rounded-2xl overflow-hidden aspect-square"
              initial={false}
              animate={{
                scale:
                  hoveredDrink === drink.id || hoveredDrink === null ? 1 : 0.95,
                opacity:
                  hoveredDrink === drink.id || hoveredDrink === null ? 1 : 0.6,
                filter:
                  hoveredDrink === drink.id || hoveredDrink === null
                    ? "brightness(1)"
                    : "brightness(0.7)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onHoverStart={() => setHoveredDrink(drink.id)}
              onHoverEnd={() => setHoveredDrink(null)}
              onClick={() => setSelectedDrink(drink.id)}
            >
              <img
                src={drink.image}
                className="w-full h-full object-cover absolute inset-0"
                alt={drink.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <motion.div
                className="absolute bottom-0 left-0 p-6 text-white"
                initial={false}
                animate={{
                  y: hoveredDrink === drink.id ? 0 : 20,
                  opacity: hoveredDrink === drink.id ? 1 : 0.8,
                }}
              >
                <h3 className="text-2xl font-medium">{drink.name}</h3>
                <p className="text-stone-200 font-light">{drink.origin}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Модальное окно с деталями напитка */}
      <AnimatePresence>
        {selectedDrink && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-stone-100 max-w-4xl w-full rounded-3xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 z-10"
                onClick={() => setSelectedDrink(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {coffeeDrinks
                .filter((d) => d.id === selectedDrink)
                .map((drink) => (
                  <div key={drink.id} className="grid md:grid-cols-2">
                    <div className="h-64 md:h-full">
                      <img
                        src={drink.image}
                        className="w-full h-full object-cover"
                        alt={drink.name}
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-3xl font-light text-stone-800 mb-2">
                        {drink.name}
                      </h3>
                      <p className="text-stone-500 mb-6">{drink.origin}</p>
                      <p className="text-stone-700 mb-6">{drink.description}</p>
                      <div className="bg-stone-200/50 p-4 rounded-xl">
                        <h4 className="font-medium text-stone-800 mb-2">
                          Рецепт
                        </h4>
                        <p className="text-stone-600">{drink.recipe}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
