import { useState } from "react"; // Importamos useState para manejar la lista de etiquetas seleccionadas
import Icons from "../Icons"; // Importamos el componente de iconos para el checkmark

// Array de strings con todas las opciones de etiquetas disponibles
const Tags = [
  "Joyful",
  "Down",
  "Anxious",
  "Calm",
  "Excited",
  "Frustrated",
  "Lonely",
  "Grateful",
  "Overwhelmed",
  "Motivated",
  "Irritable",
  "Peaceful",
  "Tired",
  "Hopeful",
  "Confident",
  "Stressed",
  "Content",
  "Disappointed",
  "Optimistic",
  "Restless",
];

export default function Step2Tags() {
  // Estado que almacena un array de strings con las etiquetas elegidas por el usuario
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Función para marcar o desmarcar una etiqueta
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag) // Si ya estaba seleccionada, la eliminamos del array
        : prev.length < 3
          ? [...prev, tag] // Si no estaba y hay menos de 3 elegidas, la añadimos
          : prev, // Si ya hay 3 seleccionadas, no permitimos añadir más
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Sección de encabezado del paso 2 */}
      <div>
        <h3 className="text-neutral-900 text-3xl font-bold">
          How did you feel?
        </h3>
        <p className="text-neutral-600 text-md font-normal mb-4">
          Select up to three tags:
        </p>
      </div>

      {/* Contenedor de etiquetas con wrap para que bajen de línea automágicamente */}
      <div className="flex flex-wrap gap-2.5">
        {Tags.map((tag) => {
          // Comprobamos si esta etiqueta específica está en nuestro estado de seleccionadas
          const isSelected = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              // Clases dinámicas: cambian el borde y el fondo si la etiqueta está seleccionada
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 text-sm transition-all duration-200
                ${
                  isSelected
                    ? "bg-white border-blue-600 text-blue-600 font-medium shadow-sm" // Estilo seleccionado
                    : "bg-white/50 border-blue-100 text-neutral-900 hover:bg-white" // Estilo no seleccionado
                }
              `}
            >
              {/* Cuadro visual de checkbox */}
              <div
                className={`
                w-4 h-4 rounded-sm border flex items-center justify-center transition-colors
                ${isSelected ? "bg-blue-600 border-blue-600" : "border-neutral-200 bg-white"}
              `}
              >
                {/* Si la etiqueta está seleccionada, pintamos el icono de check blanco */}
                {isSelected && (
                  <Icons name="check" size={10} className="text-neutral-0" />
                )}
              </div>
              {/* Texto de la etiqueta (ej: "Joyful") */}
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
