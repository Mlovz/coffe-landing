import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import Logo from "../assets/logo2.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  // Блокировка скролла при открытом поиске
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSearchOpen]);

  // Закрытие поиска при клике вне области
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      name: "Программа",
      link: "#program",
      submenu: [
        { name: "Чему научитесь", link: "#skills" },
        { name: "Преподаватели", link: "#teachers" },
        { name: "Расписание", link: "#schedule" },
        { name: "Сертификат", link: "#certificate" }, // Новое!
      ],
    },
    {
      name: "Карьера", // Новый раздел
      link: "#career",
      submenu: [
        { name: "Трудоустройство", link: "#jobs" },
        { name: "Стажировка", link: "#internship" },
        { name: "Истории выпускников", link: "#success" },
      ],
    },
    {
      name: "Блог", // Новый раздел
      link: "/blog",
      submenu: [
        { name: "Гайды", link: "/blog/guides" },
        { name: "Интервью", link: "/blog/interviews" },
      ],
    },
    {
      name: "Стоимость",
      link: "#price",
      submenu: [
        { name: "Тарифы", link: "#plans" },
        { name: "Рассрочка", link: "#installment" },
      ],
    },
    {
      name: "Контакты",
      link: "#contacts",
      submenu: [
        { name: "Чат поддержки", link: "#support" },
        { name: "Для партнёров", link: "#partners" },
      ],
    },
  ];

  return (
    <>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-20"
          />
        )}
      </AnimatePresence>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5.8 }}
        className={`flex justify-center items-center bg-[#f8f8f8] fixed top-0 w-full z-40 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "h-16" : "h-11"
        } ${isScrolled ? "text-white" : "text-black"}`}
      >
        <nav className="max-w-6xl w-full mx-auto px-6 py-4">
          <ul className={`flex gap-14 justify-center items-center`}>
            <li className="text-2xl font-semibold text-black">
              <img className="w-6 h-6" src={Logo} alt="" />
            </li>

            <div className="hidden md:flex gap-8">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className={`text-black text-[12px] hover:opacity-70 transition-opacity`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}

              <li className="flex items-center cursor-pointer">
                {isSearchOpen ? (
                  <AiOutlineClose
                    color="#000"
                    onClick={() => setIsSearchOpen(false)}
                  />
                ) : (
                  <AiOutlineSearch
                    color="#000"
                    onClick={() => setIsSearchOpen(true)}
                  />
                )}
              </li>
            </div>
          </ul>
        </nav>
      </motion.header>

      {/* Поисковая панель */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "400px" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full bg-white z-30 shadow-md flex justify-center"
            style={{
              paddingTop: "84px",
            }}
            ref={searchRef}
          >
            <div className="max-w-6xl w-full mx-auto  px-6 py-4">
              <div className="relative flex items-center gap-4">
                <div className="">
                  <AiOutlineSearch className="text-gray-400 text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="Поиск по сайту..."
                  className="w-full py-4 px-4 text-lg   outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              {/* Пример результатов поиска (можно динамически заполнять) */}
              {searchQuery && (
                <div className="mt-4 py-2">
                  <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    Результат по запросу "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
