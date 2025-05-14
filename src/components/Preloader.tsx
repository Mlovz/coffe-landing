import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#ffefdb]">
      <Player
        autoplay
        loop={false}
        src="/animations/coffee-loader1.json"
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
}
