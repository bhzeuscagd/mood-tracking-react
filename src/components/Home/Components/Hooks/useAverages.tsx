import { useMemo } from "react";
import Icons from "../../../Icons";


const MOOD_DICTIONARY: Record<number, string> = {
  [-2]: "Very Sad",
  [-1]: "Sad",
  [0]: "Neutral",
  [1]: "Happy",
  [2]: "Very Happy",
};

const SLEEP_DICTIONARY: Record<number, string> = {
  1: "0-2 hours",
  3.5: "3-4 hours",
  5.5: "5-6 hours",
  7.5: "7-8 hours",
  9: "9+ hours",
};

export function useAverages(dataList: number[], type: "mood" | "sleep") {
  const result = useMemo(() => {

    if (!dataList || dataList.length < 5) {
      return { hasEnoughData: false };
    }


    const last5 = dataList.slice(-5);
    const previous5 = dataList.slice(-10, -5);


    const sumLast5 = last5.reduce((a, b) => a + b, 0);
    const avgLast5 = Math.round(sumLast5 / 5);


    let trendIcon = "same";
    let trendText = "Same as the previous 5 check-ins";


    if (dataList.length >= 10) {
      const sumPrev5 = previous5.reduce((a, b) => a + b, 0);
      const avgPrev5 = Math.round(sumPrev5 / 5);

      if (avgLast5 > avgPrev5) {
        trendIcon = "up";
        trendText = "Increase from the previous 5 check-ins";
      } else if (avgLast5 < avgPrev5) {
        trendIcon = "down";
        trendText = "Decrease from the previous 5 check-ins";
      }
    }


    const mainText =
      type === "mood" ? MOOD_DICTIONARY[avgLast5] : SLEEP_DICTIONARY[avgLast5];


    return {
      hasEnoughData: true,
      mainText,
      trendIcon,
      trendText,
    };
  }, [dataList, type]);

  return result;
}
