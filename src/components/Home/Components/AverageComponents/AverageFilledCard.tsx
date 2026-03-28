import Icons from "../../../Icons";

interface AverageFilledCardProps {
  HeaderTitle: string;
  IconName: string; // Para cambiar entre carita o icono de Zzz
  MainText: string; // Ej: "Neutral" o "5-6 Hours"
  TrendIcon: "up" | "down" | "same"; // Decide qué flecha pintar
  TrendText: string; // Ej: "Increase from the previous..."
  BgColor: string; // Ej: "bg-[#82bdf4]" o "bg-[#4d66c9]"
  TextColor: string; // Ej: "text-neutral-900" o "text-white"
}

export default function AverageFilledCard({
  HeaderTitle,
  IconName,
  MainText,
  TrendIcon,
  TrendText,
  BgColor,
  TextColor,
}: AverageFilledCardProps) {
  return (
    <div className="flex flex-col gap-2 items-start w-full flex-1">
      <p className="font-bold text-gray-900 text-[18px]">
        {HeaderTitle}
        <span className="text-neutral-500 text-sm font-normal">
          {" "}
          (Last 5 Check-ins)
        </span>
      </p>

      {/* Aquí inyectamos el BgColor que le pases */}
      <div
        className={`relative flex flex-col justify-center items-start gap-3 md:gap-4 rounded-2xl p-6 md:px-8 md:py-8 w-full flex-1 ${BgColor} overflow-hidden text-white`}
      >
        {/* Decoración de fondo (tu mismo icono) */}
        <Icons
          name="bg-card-decoration"
          className="absolute right-0 top-0 h-full w-auto opacity-100 object-cover"
        />

        {/* Contenido principal (Icono + Texto Grande) */}
        <div className="relative z-10 flex items-center gap-3">
          <Icons name={IconName} className="w-8 h-8 fill-current" />
          <h2 className={`text-3xl font-bold ${TextColor}`}>{MainText}</h2>
        </div>

        {/* Tendencia (Flecha + Texto Pequeño) */}
        <div className="relative z-10 flex items-center gap-2 text-sm">
          <Icons
            name={
              TrendIcon === "up"
                ? "trend-increase"
                : TrendIcon === "down"
                  ? "trend-decrease"
                  : "trend-same"
            }
            size={16}
            className={`${TextColor} fill-current`}
          />
          <p className={`font-medium opacity-90 ${TextColor}`}>{TrendText}</p>
        </div>
      </div>
    </div>
  );
}
