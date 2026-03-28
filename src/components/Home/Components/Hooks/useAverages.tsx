import { useMemo } from "react";
import Icons from "../../../Icons";

// Lo ponemos fuera del hook para que no se recargue cada vez
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
  // useMemo hace que las matemáticas solo se calculen si dataList cambia (Optimización Pro)
  const result = useMemo(() => {
    // 1. ¿Hay suficientes datos? Si no hay 5, abortamos y avisamos que está vacío
    if (!dataList || dataList.length < 5) {
      return { hasEnoughData: false };
    }

    // 2. Separamos los datos
    const last5 = dataList.slice(-5); // Los más recientes
    const previous5 = dataList.slice(-10, -5); // Los 5 anteriores a esos

    // 3. Calculamos los promedios (Sumamos y dividimos)
    const sumLast5 = last5.reduce((a, b) => a + b, 0);
    const avgLast5 = Math.round(sumLast5 / 5); // Redondeamos para que coincida con el diccionario

    // 4. Calculamos la tendencia (Trend)
    let trendIcon = "same";
    let trendText = "Same as the previous 5 check-ins";

    // Solo comparamos si tenemos al menos 10 datos en total
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

    // 5. Traducimos el número a la palabra mágica usando el diccionario
    const mainText =
      type === "mood" ? MOOD_DICTIONARY[avgLast5] : SLEEP_DICTIONARY[avgLast5]; // Ojo: en sleep puede que necesites redondear al valor más cercano del diccionario

    // Devolvemos el paquete completo
    return {
      hasEnoughData: true,
      mainText,
      trendIcon,
      trendText,
    };
  }, [dataList, type]);

  return result;
}
