import { useEffect, useState } from "react";
import Button from "../Global/Button";

//sufijos para los dias en ingles
const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

interface HomeHeroProps {
  onLogClick?: () => void;
}

export default function HomeHero({ onLogClick }: HomeHeroProps) {
  const [name, setName] = useState("Luisa");

  // 2. Sacamos las piezas
  const date = new Date();
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate(); // Sacamos el dia en numero
  const year = date.getFullYear();

  const fulldate = `${weekday}, ${month} ${day}${getOrdinalSuffix(day)}, ${year}`;

  useEffect(() => {
    const SavedName = localStorage.getItem("Username");
    if (SavedName) {
      setName(SavedName);
    }
  }, []); // hazlo solo al cargar []

  return (
    <section>
      <div className="flex flex-col gap-12 pt-8 px-4 text-center">
        <h1 className="text-blue-600 font-bold text-2xl">Hello, {name}!</h1>
        <h2 className="text-neutral-900 font-bold text-5xl">
          How are you feeling today?
        </h2>
        <p className="text-neutral-600 text-lg">{fulldate}</p>
        <Button text="Log today's mood" onClick={onLogClick} />
      </div>
    </section>
  );
}
