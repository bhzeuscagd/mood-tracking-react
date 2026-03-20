import Icons from "../Icons";
import Step1Mood from "./Step1Mood";
import Step2Tags from "./Step2Tags";

const LogOption = "h-1 w-full bg-blue-600 rounded-full";

export default function LogMoodFather() {
  return (
    <div className="flex flex-col w-[335px] h-auto px-5 py-7 bg-gradient-light gap-6 rounded-2xl">
      <h1 className="font-bold text-4xl text-neutral-900 tracking-[-0.3px]">
        Log your mood
      </h1>
      <div className="flex flex-row gap-2.5">
        <div className={LogOption}></div>
        <div className={LogOption}></div>
        <div className={LogOption}></div>
        <div className={LogOption}></div>
      </div>
      <div>
        <Step2Tags />
      </div>
      <div className="flex w-full">
        <button className="bg-blue-600 px-8 py-4 w-full rounded-xl text-neutral-0 text-2xl">
          Continue
        </button>
      </div>
    </div>
  );
}
