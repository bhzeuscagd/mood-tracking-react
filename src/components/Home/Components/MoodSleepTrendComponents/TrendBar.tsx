import Icons from "../../../Icons";

interface TrendBarProps {
  height: string; // Ej: "70%"
  colorClass: string; // Ej: "bg-[#7ed37c]" (verde)
  faceIconName: string; // Ej: "happy-face"
}

export default function TrendBar({
  height,
  colorClass,
  faceIconName,
}: TrendBarProps) {
  return (
    // Contenedor principal de la barra (ocupa 1/5 del ancho de la gráfica)
    // Usamos flex-col-reverse para que crezca de abajo hacia arriba fácilmente
    <div className="flex-1 flex flex-col-reverse items-center justify-start h-full pb-12">
      {/* La Barra (Cápsula redondeada) */}
      <div
        className={`w-10 rounded-full relative ${colorClass} transition-all duration-300 ease-out`}
        style={{ height }} // ¡Aquí está la magia de la altura dinámica!
      >
        {/* El Icono de la carita (blanco) sobre la barra */}
        <Icons
          name={faceIconName}
          className="absolute top-1 left-1/2 -translate-x-1/2 w-7 h-7 fill-white"
        />
      </div>
    </div>
  );
}
