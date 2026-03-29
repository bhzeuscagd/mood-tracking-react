import AverageCards from "./AverageComponents/AverageEmptyCards";
import AverageFilledCard from "./AverageComponents/AverageFilledCard";
import { MOOD_CONFIG } from "./Utils/chartUtils";

interface AverageMoodSectionProps {
  moodScore?: number;
  sleepHoursText?: string;
}

const MOOD_NAME_MAP: Record<number, string> = {
  [-2]: "Very Sad",
  [-1]: "Sad",
  [0]: "Neutral",
  [1]: "Happy",
  [2]: "Very Happy",
};

export default function AverageMoodSection({ moodScore, sleepHoursText }: AverageMoodSectionProps) {
  if (moodScore === undefined) {
    return (
      <section className="flex flex-col gap-6 py-5 px-4 bg-neutral-0 border border-blue-100 rounded-2xl h-full justify-between">
        <AverageCards
          HeaderTitle="Average mood"
          Title="Keep tracking!"
          Description="Log 5 check-ins to see your average mood."
        />
        <AverageCards
          HeaderTitle="Average sleep"
          Title="Not enough data yet!"
          Description="Track 5 nights to view average sleep."
        />
      </section>
    );
  }

  const name = MOOD_NAME_MAP[moodScore] || "Neutral";
  const config = MOOD_CONFIG[moodScore] || MOOD_CONFIG[0];

  return (
    <section className="flex flex-col gap-6 py-5 px-4 bg-neutral-0 border border-blue-100 rounded-2xl h-full justify-between">
      <AverageFilledCard
        HeaderTitle="Average mood"
        IconName={config.icon}
        MainText={name}
        TrendIcon="same"
        TrendText="Same as the previous 5 check-ins"
        BgColor={config.color}
        TextColor="text-white"
      />
      <AverageFilledCard
        HeaderTitle="Average sleep"
        IconName="sleep"
        MainText={sleepHoursText || "0-2 hours"}
        TrendIcon="up"
        TrendText="Increase from the previous 5 check-ins"
        BgColor="bg-blue-600"
        TextColor="text-white"
      />
    </section>
  );
}
