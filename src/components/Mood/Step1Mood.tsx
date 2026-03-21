import Icons from "../Icons"; // Importamos el componente Icons para mostrar los emojis/iconos

// Definimos la lista de humores con sus propiedades: ID, nombre visible e icono correspondiente
const moodOptions = [
  { id: "very-happy", label: "Very Happy", Icon: "icon-very-happy-color" },
  { id: "happy", label: "Happy", Icon: "icon-happy-color" },
  { id: "neutral", label: "Neutral", Icon: "icon-neutral-color" },
  { id: "sad", label: "Sad", Icon: "icon-sad-color" },
  { id: "very-sad", label: "Very Sad", Icon: "icon-very-sad-color" },
];

/**
 * Componente del Paso 1: Selección de Humor
 * Recibe 'formData' (datos actuales) y 'setFormData' (función para actualizar) desde el padre.
 */
export default function Step1Mood({ formData, setFormData }: any) {
  return (
    <div className="flex flex-col gap-4">
      {/* Título principal de la pregunta */}
      <h2 className="text-neutral-900 text-lg font-medium">
        How was your mood today?
      </h2>
      <div className="flex flex-col gap-3">
        {/* Iteramos sobre cada opción de humor para crear las filas de selección */}
        {moodOptions.map((mood) => {
          // Comprobamos si este humor es el que está guardado en el estado global (formData)
          const isSelected = formData.mood === mood.id;
          
          return (
            <label
              key={mood.id}
              // Estilos dinámicos: si isSelected es true, aplicamos borde azul y fondo sólido
              className={`
                flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-600 bg-white shadow-sm text-blue-600" // Seleccionado
                    : "border-blue-100 bg-white/50 text-neutral-900 hover:bg-white" // No seleccionado
                }
              `}
              // Al hacer clic, actualizamos el estado global 'formData' manteniendo lo anterior (...formData)
              // pero cambiando el campo 'mood' por el ID seleccionado
              onClick={() => setFormData({ ...formData, mood: mood.id })}
            >
              <div className="flex items-center gap-3">
                {/* Input radio visual que se marca si este humor es el seleccionado */}
                <input
                  type="radio"
                  name="mood_radio"
                  value={mood.id}
                  checked={isSelected}
                  readOnly // React requiere readOnly o onChange; aquí el cambio lo maneja el label.onClick
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="font-medium">{mood.label}</span>
              </div>

              {/* Icono correspondiente al humor */}
              <Icons name={mood.Icon} className="w-8 h-8 stroke-none" />
            </label>
          );
        })}
      </div>
    </div>
  );
}
