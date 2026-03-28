import { useState } from "react";
import Navbar from "../Global/navbar";
import HomeHero from "./HomeHero";
import LogMoodContainer from "../Mood/LogMoodContainer";
import TodayMoodSummary from "./Components/TodayMoodSummary";
import AverageMoodSection from "./Components/AverageMoodSection";
import MoodSleepTrends from "./Components/MoodSleepTrend";

type LoggingStatus = "inicio" | "registrando" | "completado";

export default function HomeDasboard() {
  // 1. Estado para controlar qué componente se ve hoy
  const [status, setStatus] = useState<LoggingStatus>("inicio");
  
  // Estado para guardar los datos mapeados cuando se termine el form
  const [todayLogData, setTodayLogData] = useState<any>(null);

  // --- LÓGICA DE FLUJO ---

  const handleStartLogging = () => {
    setStatus("registrando");
  };

  const handleSaveSuccess = (dataLogged: any) => {
    // Mapeo de IDs de humor a puntajes numéricos
    const moodMap: Record<string, number> = {
      "very-happy": 2,
      "happy": 1,
      "neutral": 0,
      "sad": -1,
      "very-sad": -2,
    };

    // Mapeo de IDs de horas a texto amigable
    const sleepMap: Record<string, string> = {
      "9_plus": "9+ hours",
      "7_8": "7-8 hours",
      "5_6": "5-6 hours",
      "3_4": "3-4 hours",
      "0_2": "0-2 hours",
    };

    // Transformamos los datos del formulario a los props que espera TodayMoodSummary
    const mappedData = {
      moodScore: moodMap[dataLogged.mood] || 0,
      sleepHoursText: sleepMap[dataLogged.hours] || "0 hours",
      reflection: dataLogged.info,
      tags: dataLogged.tags,
    };

    setTodayLogData(mappedData);
    setStatus("completado");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0efff]">
      <Navbar />
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center gap-8">
        
        {/* --- SECCIÓN PRINCIPAL: FLUJO DE REGISTRO --- */}
        <div className="w-full flex justify-center">
          {status === "inicio" && (
            <HomeHero onLogClick={handleStartLogging} />
          )}

          {status === "registrando" && (
            <LogMoodContainer onComplete={handleSaveSuccess} />
          )}

          {status === "completado" && todayLogData && (
            <TodayMoodSummary 
              moodScore={todayLogData.moodScore} 
              sleepHoursText={todayLogData.sleepHoursText}
              reflection={todayLogData.reflection}
              tags={todayLogData.tags}
            />
          )}
        </div>

        {/* --- SECCIÓN SECUNDARIA: ESTADÍSTICAS --- */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_2.1fr] gap-6 mt-2">
          <AverageMoodSection 
            moodScore={todayLogData?.moodScore}
            sleepHoursText={todayLogData?.sleepHoursText}
          />
          <MoodSleepTrends />
        </div>

      </main>
    </div>
  );
}
