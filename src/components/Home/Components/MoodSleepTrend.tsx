import Icons from "../../Icons";
import TrendBar from "./MoodSleepTrendComponents/TrendBar";
import { MOOD_CONFIG, getMoodHeightPercent } from "./Utils/chartUtils";

export default function MoodSleepTrends() {
  const userMoodData = [
    { moodScore: -1 }, // March 31
    { moodScore: 1 },  // April 02
    { moodScore: -2 }, // April 04
    { moodScore: -1 }, // April 05
    { moodScore: 1 },  // April 07
    { moodScore: 2 },  // April 09
    { moodScore: -1 }, // April 10
    { moodScore: 0 },  // April 12
    { moodScore: 1 },  // April 13
    { moodScore: -2 }, // April 14
    { moodScore: 2 },  // April 15
  ];

  const yAxisLabels = [
    "9+ hours",
    "7-8 hours",
    "5-6 hours",
    "3-4 hours",
    "0-2 hours",
  ];

  const xAxisDays = [
    { month: "March", day: "31" },
    { month: "April", day: "02" },
    { month: "April", day: "04" },
    { month: "April", day: "05" },
    { month: "April", day: "07" },
    { month: "April", day: "09" },
    { month: "April", day: "10" },
    { month: "April", day: "12" },
    { month: "April", day: "13" },
    { month: "April", day: "14" },
    { month: "April", day: "15" },
  ];

  return (
    <div className="bg-slate-50 rounded-3xl p-6 w-full shadow-sm flex flex-col gap-6 h-full justify-between">
      <h2 className="text-neutral-900 font-bold text-2xl">
        Mood and sleep trends
      </h2>

      {/* Wrapper dinámico de Scroll para que las 11 barras no se aplasten en móviles */}
      <div className="relative flex-1 min-h-[260px] w-full flex flex-col overflow-x-auto rounded-xl">
        {/* Contenedor de la gráfica (Relative para poder empalmar capas, mínimo 600px para evitar aplastamiento) */}
        <div className="min-w-[700px] lg:min-w-0 flex-1 relative flex flex-col">
          {/* --- CAPA 1: FONDO (Etiquetas Y + Líneas Horizontales) --- */}
          {/* El pb-12 deja espacio abajo para que quepan los días */}
          <div className="absolute inset-0 flex flex-col justify-between pb-12">
            {yAxisLabels.map((label, index) => (
              <div key={index} className="flex items-center w-full relative">
                {/* Etiqueta izquierda (Horas) */}
                <div className="flex items-center gap-1.5 w-[85px] shrink-0 text-slate-500">
                  <span className="text-[10px] font-bold">zZ</span>
                  <span className="text-xs">{label}</span>
                </div>

                {/* Línea horizontal clarita */}
                <div className="flex-1 border-b border-slate-200/60"></div>
              </div>
            ))}
          </div>

          {/* --- CAPA 3: BARRAS (Los Datos Reales) --- */}
          <div className="absolute inset-x-0 top-0 bottom-0 left-[85px] flex justify-between">
            {userMoodData.map((dayData, index) => {
              const config = MOOD_CONFIG[dayData.moodScore];
              const height = getMoodHeightPercent(dayData.moodScore);

              return (
                <TrendBar
                  key={index}
                  height={height}
                  colorClass={config.color}
                  faceIconName={config.icon}
                />
              );
            })}
          </div>

          {/* --- CAPA 2: FRENTE (Etiquetas X - Días) --- */}
          {/* Lo anclamos al fondo (bottom-0) y le damos un margen izquierdo (ml-[85px]) para que no pise las horas */}
          <div className="absolute bottom-0 left-[85px] right-0 h-12 flex justify-between">
            {xAxisDays.map((date, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-end flex-1 pb-2"
              >
                <span className="text-[10px] text-slate-500">{date.month}</span>
                <span className="text-sm font-bold text-indigo-950">
                  {date.day}
                </span>
              </div>
            ))}
          </div>

          {/* --- DETALLE VISUAL: La barrita indicadora de scroll azul --- */}
          {/* Esto simula la línea azul que se ve debajo de los días en tu diseño */}
          <div className="absolute -bottom-1 left-[85px] right-4 h-[3px] bg-slate-200 rounded-full overflow-hidden">
            <div className="w-[60%] h-full bg-blue-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
