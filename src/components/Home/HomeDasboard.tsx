import { useState, useEffect } from "react";
import Navbar from "../Global/navbar";
import HomeHero from "./HomeHero";
import LogMoodContainer from "../Mood/LogMoodContainer";
import TodayMoodSummary from "./Components/TodayMoodSummary";
import AverageMoodSection from "./Components/AverageMoodSection";
import MoodSleepTrends from "./Components/MoodSleepTrend";
import { supabase } from "../../lib/supabase";

type LoggingStatus = "inicio" | "registrando" | "completado";


const MOOD_MAP: Record<string, number> = {
  "very-happy": 2,
  "happy": 1,
  "neutral": 0,
  "sad": -1,
  "very-sad": -2,
};

const SLEEP_MAP: Record<string, string> = {
  "9_plus": "9+ hours",
  "7_8": "7-8 hours",
  "5_6": "5-6 hours",
  "3_4": "3-4 hours",
  "0_2": "0-2 hours",
};

export default function HomeDasboard() {
  const [status, setStatus] = useState<LoggingStatus>("inicio");
  const [todayLogData, setTodayLogData] = useState<any>(null);
  const [trendData, setTrendData] = useState<any[] | undefined>(undefined);
  const [trendAxis, setTrendAxis] = useState<any[] | undefined>(undefined);
  const [loadingDb, setLoadingDb] = useState(true);


  useEffect(() => {
    async function loadData() {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        window.location.href = "/";
        return;
      }

      const { data, error } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(11);

      if (data && !error) {

        const todayStr = new Date().toISOString().split('T')[0];
        const todayLog = data.find((d: any) => d.created_at.startsWith(todayStr));
        
        if (todayLog) {
          setTodayLogData({
            moodScore: todayLog.mood_score,
            sleepHoursText: SLEEP_MAP[todayLog.sleep_hours] || todayLog.sleep_hours,
            reflection: todayLog.reflection,
            tags: todayLog.tags,
          });
          setStatus("completado");
        }


        const reversed = [...data].reverse();
        const freshMood = reversed.map((d: any) => ({ moodScore: d.mood_score }));
        const freshAxis = reversed.map((d: any) => {
          const dt = new Date(d.created_at);
          return { month: dt.toLocaleString('en-US', {month:'short'}), day: dt.getDate().toString().padStart(2, '0') };
        });


        while (freshMood.length < 11) {
          freshMood.unshift({ moodScore: null }); 
          freshAxis.unshift({ month: "--", day: "--" });
        }

        setTrendData(freshMood);
        setTrendAxis(freshAxis);
      }
      setLoadingDb(false);
    }
    loadData();
  }, []);



  const handleStartLogging = () => {
    setStatus("registrando");
  };

  const handleSaveSuccess = (dataLogged: any) => {

    const mappedData = {
      moodScore: MOOD_MAP[dataLogged.mood] || 0,
      sleepHoursText: SLEEP_MAP[dataLogged.hours] || "0 hours",
      reflection: dataLogged.info,
      tags: dataLogged.tags,
    };

    setTodayLogData(mappedData);
    setStatus("completado");
  };

  const handleCloseModal = () => setStatus("inicio");

  return (
    <div className="flex flex-col min-h-screen bg-[#f0efff]">
      <Navbar />
      <div className="flex-1 p-4 md:p-8 flex flex-col items-center gap-8">
        {loadingDb ? (
          <div className="flex flex-1 w-full justify-center items-center">
            <span className="text-xl text-neutral-500 font-medium">Loading your dashboard...</span>
          </div>
        ) : (
          <>

        <div className="w-full flex flex-col justify-center items-center gap-8">
          <HomeHero 
            onLogClick={handleStartLogging} 
            hideButton={status === "completado"}
          />

          {status === "completado" && todayLogData ? (
            <TodayMoodSummary 
              moodScore={todayLogData.moodScore} 
              sleepHoursText={todayLogData.sleepHoursText}
              reflection={todayLogData.reflection}
              tags={todayLogData.tags}
            />
          ) : null}
        </div>


        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_2.1fr] gap-6 mt-2">
          <AverageMoodSection 
            moodScore={todayLogData?.moodScore}
            sleepHoursText={todayLogData?.sleepHoursText}
          />
          <MoodSleepTrends userMoodData={trendData} xAxisDays={trendAxis} />
        </div>


        {status === "registrando" ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <LogMoodContainer 
              onComplete={(data) => {
                handleSaveSuccess(data);

                window.location.reload();
              }} 
              onClose={handleCloseModal}
            />
          </div>
        ) : null}
          </>
        )}
      </div>
    </div>
  );
}
