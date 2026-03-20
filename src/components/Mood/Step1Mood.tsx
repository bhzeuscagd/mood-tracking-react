import { useState } from "react"; // Importamos useState de React para controlar el estado de la selección
import Icons from "../Icons"; // Importamos el componente Icons para mostrar los emojis/iconos

// Definimos la lista de humores con sus propiedades: ID, nombre visible e icono correspondiente
const moodOptions = [
  { id: "very-happy", label: "Very Happy", Icon: "icon-very-happy-color" },
  { id: "happy", label: "Happy", Icon: "icon-happy-color" },
  { id: "neutral", label: "Neutral", Icon: "icon-neutral-color" },
  { id: "sad", label: "Sad", Icon: "icon-sad-color" },
  { id: "very-sad", label: "Very Sad", Icon: "icon-very-sad-color" },
];

export default function Step1Mood() {
  // Definimos el estado 'selectedMood' que guardará el ID del humor seleccionado actualmente
  const [selectedMood, setSelectedMood] = useState("");

  return (
    <div className="flex flex-col gap-4">
      {/* Título principal de la pregunta */}
      <h2 className="text-neutral-900 text-lg font-medium">
        How was your mood today?
      </h2>
      <div className="flex flex-col gap-3">
        {/* Iteramos sobre cada opción de humor para crear las filas de selección */}
        {moodOptions.map((mood) => {
          // Variable booleana que indica si este humor específico es el seleccionado
          const isSelected = selectedMood === mood.id;
          return (
            <label
              key={mood.id}
              // Clases dinámicas de Tailwind: cambian el borde y el fondo según si está seleccionado o no
              className={`
                flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-600 bg-white shadow-sm" // Estilo si está seleccionado (borde azul)
                    : "border-blue-100 bg-white/50 text-neutral-900 hover:bg-white" // Estilo base (borde claro)
                }
              `}
              // Al hacer clic en cualquier parte del label, se actualiza el estado con el ID de este humor
              onClick={() => setSelectedMood(mood.id)}
            >
              <div className="flex items-center gap-3">
                {/* Botón de radio nativo que se marca visualmente si isSelected es true */}
                <input
                  type="radio"
                  name="mood_radio"
                  value={mood.id}
                  checked={isSelected}
                  readOnly // Evitamos errores de React ya que el cambio lo manejamos con el onClick del label
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                {/* Nombre del humor (ej. "Very Happy") */}
                <span className="font-medium">{mood.label}</span>
              </div>

              {/* El icono del humor correspondiente, con stroke-none para que se vea el relleno de color */}
              <Icons name={mood.Icon} className="w-8 h-8 stroke-none" />
            </label>
          );
        })}
      </div>
    </div>
  );
}
