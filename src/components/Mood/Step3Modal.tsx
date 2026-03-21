/**
 * Componente del Paso 3: Diario / Notas del día
 * Permite al usuario escribir un breve texto sobre su día.
 */
export default function Step3Modal({ formData, setFormData }: any) {
  // Obtenemos el texto actual directamente del estado compartido
  const info = formData.info;

  // Función que se dispara cada vez que el usuario escribe en el textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Actualizamos el estado global 'formData'
    // Conservamos los datos anteriores (...formData) y solo sobreescribimos 'info'
    setFormData({ ...formData, info: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Título de la sección de escritura */}
      <h2 className="text-neutral-900 text-xl font-bold">
        Write about your day...
      </h2>
      
      <div className="flex flex-col gap-2">
        {/* Área de texto para la entrada del usuario */}
        <textarea
          value={info} // Componente controlado: su valor depende del estado 'info'
          onChange={handleChange} // Ejecuta handleChange al teclear
          maxLength={150} // Restricción de caracteres
          className="h-[150px] px-3 py-4 rounded-md border border-neutral-300 bg-neutral-0 text-neutral-600 text-sm italic focus:border-blue-500 outline-none transition-colors"
          placeholder="Today, I felt..."
        ></textarea>
        
        {/* Contador de caracteres (ej: 45/150) */}
        <span className="text-neutral-600 text-xs self-end">
          {info.length}/150
        </span>
      </div>
    </div>
  );
}
