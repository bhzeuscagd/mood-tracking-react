import Icons from "../../Icons";
import TrendBar from "./MoodSleepTrendComponents/TrendBar";
import { MOOD_CONFIG, getMoodHeightPercent } from "./Utils/chartUtils";

export interface TrendData {
  moodScore: number | null;
}
export interface TrendAxis {
  month: string;
  day: string;
}
interface MoodSleepTrendsProps {
  userMoodData?: TrendData[];
  xAxisDays?: TrendAxis[];
}

export default function MoodSleepTrends({ userMoodData: propData, xAxisDays: propAxis }: MoodSleepTrendsProps) {
  const userMoodData = propData || [
    { moodScore: -1 },
    { moodScore: 1 },
    { moodScore: -2 },
    { moodScore: -1 },
    { moodScore: 1 },
    { moodScore: 2 },
    { moodScore: -1 },
    { moodScore: 0 },
    { moodScore: 1 },
    { moodScore: -2 },
    { moodScore: 2 },
  ];

  const yAxisLabels = [
    "9+ hours",
    "7-8 hours",
    "5-6 hours",
    "3-4 hours",
    "0-2 hours",
  ];

  const xAxisDays = propAxis || [
    { month: "March", day: "31" },
    { month: "April", day: "02" },
    { month: "April", day: "04" },
    { month: "April", day: "05" },
    { month: "April", day: "07" },
    { month: "April", day: "09" },
    { month: "April", day: "10" },
    { month: "April", day: "12" },
    { month: "April", day: "13" },
    { month: "April", day: "14" },
    { month: "April", day: "15" },
  ];

  return (
    <div className="bg-slate-50 rounded-3xl p-6 w-full shadow-sm flex flex-col gap-6 h-full justify-between">
      <h2 className="text-neutral-900 font-bold text-2xl">
        Mood and sleep trends
      </h2>


      <div className="relative flex-1 min-h-[260px] w-full flex flex-col rounded-xl">

        <div className="w-full flex-1 relative flex flex-col h-full">

          <div className="absolute inset-0 flex flex-col justify-between pb-12">
            {yAxisLabels.map((label, index) => (
              <div key={index} className="flex items-center w-full relative">

                <div className="flex items-center gap-1.5 w-[85px] shrink-0 text-slate-500">
                  <span className="text-[10px] font-bold">zZ</span>
                  <span className="text-xs">{label}</span>
                </div>


                <div className="flex-1 border-b border-slate-200/60"></div>
              </div>
            ))}
          </div>


          <div className="absolute inset-x-0 top-0 bottom-0 left-[85px] flex justify-between">
            {userMoodData.map((dayData, index) => {

              let displayClass = "flex";
              if (index < userMoodData.length - 8) {
                displayClass = "hidden lg:flex";
              } else if (index < userMoodData.length - 3) {
                displayClass = "hidden md:flex";
              }

              if (dayData.moodScore === null || dayData.moodScore === undefined) {
                return (
                  <div key={index} className={`flex-1 flex justify-center ${displayClass}`}>
                  </div>
                );
              }

              const config = MOOD_CONFIG[dayData.moodScore] || MOOD_CONFIG[0];
              const height = getMoodHeightPercent(dayData.moodScore);

              return (
                <TrendBar
                  key={index}
                  height={height}
                  colorClass={config.color}
                  faceIconName={config.icon}
                  className={displayClass}
                />
              );
            })}
          </div>


          <div className="absolute bottom-0 left-[85px] right-0 h-12 flex justify-between">
            {xAxisDays.map((date, index) => {
              let displayClass = "flex";
              if (index < xAxisDays.length - 8) {
                displayClass = "hidden lg:flex";
              } else if (index < xAxisDays.length - 3) {
                displayClass = "hidden md:flex";
              }

              return (
                <div
                  key={index}
                  className={`flex-col items-center justify-end flex-1 pb-2 ${displayClass}`}
                >
                  <span className="text-[10px] text-slate-500">{date.month}</span>
                  <span className="text-sm font-bold text-indigo-950">
                    {date.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
