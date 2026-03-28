import Icons from "../../Icons";
import { MOOD_QUOTES } from "./Utils/chartUtils";

interface TodayMoodSummaryProps {
  moodScore: number;
  sleepHoursText: string;
  reflection: string;
  tags: string[];
}

export default function TodayMoodSummary({
  moodScore,
  sleepHoursText,
  reflection,
  tags,
}: TodayMoodSummaryProps) {
  const moodMap: Record<number, { name: string; icon: string }> = {
    2: { name: "Very Happy", icon: "very-happy-color" },
    1: { name: "Happy", icon: "happy-color" },
    0: { name: "Neutral", icon: "neutral-color" },
    "-1": { name: "Sad", icon: "sad-color" },
    "-2": { name: "Very Sad", icon: "very-sad-color" },
  };

  const { name: moodName, icon } = moodMap[moodScore] || moodMap[0];
  const todayQuote = MOOD_QUOTES[moodScore] || MOOD_QUOTES[0];

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">

      {/* DIV 1 (GRANDE - IZQUIERDA): Texto + Icono de cara */}
      <div className="lg:row-span-2 bg-neutral-0 rounded-3xl flex flex-col md:flex-row overflow-hidden relative shadow-sm border border-transparent min-h-[220px] p-6 md:p-8 items-center md:items-stretch">
        
        {/* Contenido (Textos + Cara móvil) */}
        <div className="flex flex-col justify-between flex-1 z-10 w-full md:pr-32 gap-6 md:gap-0">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-neutral-500 text-lg font-medium">I'm feeling</p>
            <h2 className="text-neutral-900 font-bold text-4xl">{moodName}</h2>
          </div>

          {/* Cara en móvil (flujo normal centrado) */}
          <div className="flex md:hidden justify-center items-center my-2">
            <Icons name={icon} size={200} className="stroke-none" />
          </div>

          <div className="flex flex-col items-center md:items-start gap-2 md:mt-8">
            <Icons name="quote" size={24} className="fill-blue-600 stroke-none" />
            <p className="text-neutral-900 italic font-medium text-[18px] leading-[130%] max-w-[246px] text-center md:text-left">
              “{todayQuote}”
            </p>
          </div>
        </div>

        {/* Cara grande desbordando por abajo (solo desktop) */}
        <div className="hidden md:block absolute right-4 bottom-[-20px] w-max">
          <Icons name={icon} size={250} className="stroke-none" />
        </div>
      </div>

      {/* DIV 2 (ARRIBA - DERECHA): Sleep */}
      <div className="flex p-5 flex-col items-start gap-4 flex-1 self-stretch rounded-2xl border border-blue-100 bg-neutral-0">
        <div className="flex items-center gap-2 text-neutral-500 text-sm">
          <Icons name="sleep" size={16} className="fill-current stroke-none" />
          <span>Sleep</span>
        </div>
        <p className="text-neutral-900 font-bold text-3xl">{sleepHoursText}</p>
      </div>

      {/* DIV 3 (ABAJO - DERECHA): Reflection + Tags */}
      <div className="flex p-5 flex-col items-start gap-4 flex-1 self-stretch rounded-2xl border border-blue-100 bg-neutral-0">
        <div className="flex items-center gap-2 text-neutral-500 text-sm">
          <Icons name="reflection" size={16} className="fill-current stroke-none" />
          <span>Reflection of the day</span>
        </div>
        <p className="text-neutral-700 text-base leading-relaxed">{reflection}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-3 mt-auto">
          {tags.map((tag) => (
            <span key={tag} className="text-neutral-600 italic text-[18px]">
              #{tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
