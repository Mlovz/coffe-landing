import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import CourseStructure from "./components/CourseStructure";
import CourseStructureCopy from "./components/CourseStructureCopy";
import CoffeeHistory from "./components/CoffeeHistory";
import CoffeeProcess from "./components/CoffeeProcess";
import DrinkGallery from "./components/DrinkGallery";
import BaristaTools from "./components/BaristaTools";
import BaristaToolsCopy from "./components/BaristaToolsСopy";
import { Header } from "./components/Header";
// import Hero from './components/Hero';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <div className="">
      {isLoading && <Preloader />}
      <Header />
      <Hero />
      <CoffeeHistory />
      <CoffeeProcess />
      <DrinkGallery />
      <BaristaTools />
      <BaristaToolsCopy />
      <CourseStructureCopy />

      {/* Другие секции будут здесь */}
    </div>
  );
}
