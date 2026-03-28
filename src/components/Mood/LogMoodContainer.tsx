import { useState } from "react"; // Hook para manejar el estado del formulario y la navegación entre pasos
import Icons from "../Icons"; // Componente para mostrar iconos (aunque aquí no se usa directamente, se mantiene para consistencia)
import Step1Mood from "./Components/Step1Mood"; // Componente del Paso 1: Selección de humor
import Step2Tags from "./Components/Step2Tags"; // Componente del Paso 2: Selección de etiquetas (sentimientos)
import Step3Modal from "./Components/Step3Modal"; // Componente del Paso 3: Texto libre/diario
import Step4Hours from "./Components/Step4Hours"; // Componente del Paso 4: Horas de sueño

interface LogMoodFatherProps {
  onComplete?: (data: any) => void;
}

export default function LogMoodFather({ onComplete }: LogMoodFatherProps) {
  // Estado para controlar en qué paso del formulario se encuentra el usuario (1 a 4)
  const [currentStep, setCurrentStep] = useState(1);

  // Estado centralizado que guarda toda la información del formulario
  // Se pasa a los hijos para que estos puedan leer y actualizar los datos
  const [formData, setFormData] = useState({
    mood: "", // ID del humor seleccionado (Paso 1)
    tags: [], // Array de etiquetas seleccionadas (Paso 2)
    info: "", // Texto descriptivo del día (Paso 3)
    hours: "", // ID del rango de horas de sueño (Paso 4)
  });

  // Función que se ejecuta al finalizar todos los pasos (en el paso 4)
  const submitData = () => {
    console.log("Datos finales del formulario:", formData);
    if (onComplete) onComplete(formData);
  };

  // Función para calcular la clase CSS de las barras de progreso superiores
  // Si el paso actual es mayor o igual al número de la barra, esta se pinta de azul fuerte
  const getProgressClass = (stepNumber: number) => {
    return `h-1 w-full rounded-full transition-colors duration-300 ${
      currentStep >= stepNumber ? "bg-blue-600" : "bg-blue-200"
    }`;
  };

  // Maneja el avance al siguiente paso o el envío final de datos
  const handleNextStep = () => {
    currentStep < 4 ? setCurrentStep(currentStep + 1) : submitData();
  };

  // Función de validación: decide si el botón "Continue" debe estar habilitado o no
  const isStepValid = () => {
    // Definimos las reglas de validación para cada paso
    const stepValidations: Record<number, boolean> = {
      1: formData.mood !== "", // Paso 1: Debe haber un humor elegido
      2: formData.tags.length > 0, // Paso 2: Al menos una etiqueta elegida
      3: formData.info.trim() !== "", // Paso 3: El texto no debe estar vacío
      4: formData.hours !== "", // Paso 4: Debe haber un rango de horas elegido
    };

    // Retorna el resultado de la validación para el paso actual
    return stepValidations[currentStep] || false;
  };

  return (
    <div className="relative flex flex-col w-[335px] h-auto px-5 py-7 bg-gradient-light gap-6 rounded-2xl shadow-lg">
      <Icons
        name="close"
        size={14}
        strokeWidth={2}
        className="absolute top-2 right-2 text-neutral-500 cursor-pointer"
      />
      <h1 className="font-bold text-4xl text-neutral-900 tracking-[-0.3px]">
        Log your mood
      </h1>

      {/* Indicadores de progreso (las 4 barritas superiores) */}
      <div className="flex flex-row gap-2.5">
        <div className={getProgressClass(1)}></div>
        <div className={getProgressClass(2)}></div>
        <div className={getProgressClass(3)}></div>
        <div className={getProgressClass(4)}></div>
      </div>

      {/* Renderizado condicional de los pasos según el estado 'currentStep' */}
      <div className="min-h-[300px]">
        {currentStep === 1 && (
          <Step1Mood formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 2 && (
          <Step2Tags formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 3 && (
          <Step3Modal formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 4 && (
          <Step4Hours formData={formData} setFormData={setFormData} />
        )}
      </div>

      {/* Botón de acción (Continuar o Enviar) */}
      <div className="flex w-full">
        <button
          disabled={!isStepValid()} // Deshabilitado si no cumple la validación del paso actual
          className={`px-8 py-4 w-full rounded-xl text-neutral-0 text-2xl transition-all duration-200
            ${
              isStepValid()
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-blue-300 cursor-not-allowed opacity-70"
            }
          `}
          onClick={handleNextStep}
        >
          {currentStep < 4 ? "Continue" : "Submit"}
        </button>
      </div>
    </div>
  );
}
