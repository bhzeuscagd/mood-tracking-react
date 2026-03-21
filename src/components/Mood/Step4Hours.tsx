/**
 * Componente del Paso 4: Horas de sueño
 * Permite al usuario seleccionar un rango de horas de sueño.
 */
// Lista de rangos de opciones de sueño fijas
const hoursOptions = [
  { id: "9_plus", label: "9+" },
  { id: "7_8", label: "7-8" },
  { id: "5_6", label: "5-6" },
  { id: "3_4", label: "3-4" },
  { id: "0_2", label: "0-2" },
];

export default function Step4Hours({ formData, setFormData }: any) {
  // Obtenemos el ID de las horas seleccionadas desde el estado global compartido
  const selectedHours = formData.hours;

  return (
    <div className="flex flex-col gap-4">
      {/* Título de la pregunta final del flujo */}
      <h2 className="text-neutral-900 text-lg font-medium">
        How many hours did you sleep today?
      </h2>
      
      <div className="flex flex-col gap-3">
        {/* Mapeamos el array de opciones de horas para renderizar cada botón/label */}
        {hoursOptions.map((hour: any) => {
          // Comprobamos si este rango es el que está seleccionado en el formData
          const isSelected = selectedHours === hour.id;
          
          return (
            <label
              key={hour.id}
              // Estilos dinámicos: si está seleccionado aplicamos borde azul y fondo sólido
              className={`
                flex items-center p-3 gap-2 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-600 bg-white shadow-sm text-blue-600" // Seleccionado
                    : "border-blue-100 bg-neutral-0 text-neutral-900 hover:bg-neutral-100" // No seleccionado
                }
              `}
              // Al hacer clic, actualizamos el campo 'hours' en el estado global 'formData'
              onClick={() => setFormData({ ...formData, hours: hour.id })}
            >
              {/* Input radio visual (se marca automáticamente si checked es true) */}
              <input
                type="radio"
                name="hours_radio"
                value={hour.id}
                checked={isSelected}
                readOnly // El cambio real lo hace el onClick del label padre
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              {/* Texto descriptivo de las horas (ej: "7-8 hours") */}
              <span className="font-medium">{hour.label} hours</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
