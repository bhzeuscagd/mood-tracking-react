import Icons from "../Icons"; // Importamos el componente de iconos para el checkmark

// Array de strings con todas las opciones de etiquetas disponibles para el usuario
const Tags = [
  "Joyful", "Down", "Anxious", "Calm", "Excited",
  "Frustrated", "Lonely", "Grateful", "Overwhelmed", "Motivated",
  "Irritable", "Peaceful", "Tired", "Hopeful", "Confident",
  "Stressed", "Content", "Disappointed", "Optimistic", "Restless",
];

/**
 * Componente del Paso 2: Selección de Etiquetas
 * Permite al usuario elegir hasta 3 etiquetas que describan su sentimiento.
 */
export default function Step2Tags({ formData, setFormData }: any) {
  // Obtenemos las etiquetas seleccionadas directamente del estado compartido 'formData'
  const selectedTags = formData.tags;

  // Función para marcar o desmarcar una etiqueta en el estado global
  const toggleTag = (tag: string) => {
    // Usamos la versión de función de setFormData para asegurar que trabajamos con el estado más reciente (prev)
    setFormData((prev: any) => ({
      ...prev, // Mantenemos el resto de campos (mood, info, hours) intactos
      tags: prev.tags.includes(tag) // Modificamos el array de 'tags'
        ? prev.tags.filter((t: string) => t !== tag) // Si ya estaba, lo quitamos
        : prev.tags.length < 3
          ? [...prev.tags, tag] // Si hay espacio (menos de 3), lo añadimos
          : prev.tags, // Si ya hay 3 elegidas, no hacemos nada
    }));
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

      {/* Contenedor de etiquetas con flex-wrap para que se ajusten al ancho disponible */}
      <div className="flex flex-wrap gap-2.5">
        {Tags.map((tag) => {
          // Comprobamos si esta etiqueta específica aparece en el array global de 'tags'
          const isSelected = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              // Clases dinámicas: Si está seleccionado aplicamos borde azul y sombra
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 text-sm transition-all duration-200
                ${
                  isSelected
                    ? "bg-white border-blue-600 text-blue-600 font-medium shadow-sm" // Seleccionado
                    : "bg-white/50 border-blue-100 text-neutral-900 hover:bg-white" // No seleccionado
                }
              `}
            >
              {/* Cuadrado visual que hace de "checkbox" personalizada */}
              <div
                className={`
                w-4 h-4 rounded-sm border flex items-center justify-center transition-colors
                ${isSelected ? "bg-blue-600 border-blue-600" : "border-neutral-200 bg-white"}
              `}
              >
                {/* Si está seleccionado, mostramos el icono de check de nuestro atlas */}
                {isSelected && (
                  <Icons name="check" size={10} className="text-neutral-0" />
                )}
              </div>
              {/* Texto de la etiqueta */}
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
