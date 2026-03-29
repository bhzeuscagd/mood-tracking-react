import { useState } from "react"; // Hook para manejar el estado del formulario y la navegación entre pasos
import Icons from "../Icons"; // Componente para mostrar iconos (aunque aquí no se usa directamente, se mantiene para consistencia)
import Step1Mood from "./Components/Step1Mood"; // Componente del Paso 1: Selección de humor
import Step2Tags from "./Components/Step2Tags"; // Componente del Paso 2: Selección de etiquetas (sentimientos)
import Step3Modal from "./Components/Step3Modal"; // Componente del Paso 3: Texto libre/diario
import Step4Hours from "./Components/Step4Hours"; // Componente del Paso 4: Horas de sueño
import { supabase } from "../../lib/supabase";

interface LogMoodFatherProps {
  onComplete?: (data: any) => void;
  onClose?: () => void;
}

export default function LogMoodFather({ onComplete, onClose }: LogMoodFatherProps) {
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

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Función que se ejecuta al finalizar todos los pasos (en el paso 4)
  const submitData = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      setLoading(false);
      setErrorMsg("Error: Please log in again to save your mood.");
      return;
    }

    const MOOD_SCORE_MAP: Record<string, number> = {
      "very-happy": 2, "happy": 1, "neutral": 0, "sad": -1, "very-sad": -2
    };

    const { error: insertError } = await supabase.from('daily_logs').insert([{
      user_id: session.user.id,
      mood_score: MOOD_SCORE_MAP[formData.mood] ?? 0,
      sleep_hours: formData.hours,
      tags: formData.tags,
      reflection: formData.info
    }]);

    setLoading(false);

    if (insertError) {
      setErrorMsg(insertError.message);
    } else {
      if (onComplete) onComplete(formData);
    }
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
    switch (currentStep) {
      case 1:
        return formData.mood !== "";
      case 2:
        return formData.tags.length > 0;
      case 3:
        return formData.info.trim() !== "";
      case 4:
        return formData.hours !== "";
      default:
        return false;
    }
  };

  return (
    <div className="relative flex flex-col w-full max-w-[335px] md:max-w-[530px] h-auto px-5 md:px-10 py-7 bg-gradient-light gap-6 rounded-2xl shadow-lg">
      <Icons
        name="close"
        size={14}
        strokeWidth={2}
        className="absolute top-5 right-5 text-neutral-500 cursor-pointer"
        onClick={onClose}
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
        {currentStep === 1 ? (
          <Step1Mood formData={formData} setFormData={setFormData} />
        ) : null}
        {currentStep === 2 ? (
          <Step2Tags formData={formData} setFormData={setFormData} />
        ) : null}
        {currentStep === 3 ? (
          <Step3Modal formData={formData} setFormData={setFormData} />
        ) : null}
        {currentStep === 4 ? (
          <Step4Hours formData={formData} setFormData={setFormData} />
        ) : null}
      </div>

      {errorMsg ? (
        <div className="w-full p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm">
          {errorMsg}
        </div>
      ) : null}

      {/* Botón de acción (Continuar o Enviar) */}
      <div className="flex w-full">
        <button
          disabled={!isStepValid() || loading} // Deshabilitado si no cumple la validación del paso actual
          className={`px-8 py-4 w-full rounded-xl text-neutral-0 text-2xl transition-all duration-200
            ${
              isStepValid() && !loading
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-blue-300 cursor-not-allowed opacity-70"
            }
          `}
          onClick={handleNextStep}
        >
          {loading ? "Submitting..." : currentStep < 4 ? "Continue" : "Submit"}
        </button>
      </div>
    </div>
  );
}
