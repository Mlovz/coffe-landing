import { useEffect, useRef } from "react";

// Создаем компонент CoffeeStains:
export const CoffeeStains = () => {
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Генерация 15-30 случайных пятен
    for (let i = 0; i < 15 + Math.floor(Math.random() * 15); i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 50 + Math.random() * 150;
      const opacity = 0.02 + Math.random() * 0.08;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 87, 42, ${opacity})`;
      ctx.filter = `blur(${10 + Math.random() * 20}px)`;
      ctx.fill();
    }
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
};
