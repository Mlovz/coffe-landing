import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CourseStructure from "./components/CourseStructure";
import CourseStructureCopy from "./components/CourseStructureCopy";
import CoffeeHistory from "./components/CoffeeHistory";
import CoffeeProcess from "./components/CoffeeProcess";
// import Hero from './components/Hero';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="">
      {isLoading && <Preloader />}
      <Header />
      <Hero />
      <CoffeeHistory />
      <CoffeeProcess />
      <CourseStructureCopy />

      {/* Другие секции будут здесь */}
    </div>
  );
}
