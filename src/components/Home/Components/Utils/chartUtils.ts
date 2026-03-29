


export const MOOD_CONFIG: Record<number, { color: string; icon: string }> = {
  [-2]: { color: "bg-red-300", icon: "very-sad-white" }, 
  [-1]: { color: "bg-indigo-200", icon: "sad-white" },           
  [0]:  { color: "bg-blue-300", icon: "neutral-white" },       
  [1]:  { color: "bg-green-300", icon: "happy-white" },         
  [2]:  { color: "bg-amber-300", icon: "very-happy-white" },    
};


export const getMoodHeightPercent = (score: number): string => {
  const map: Record<number, string> = {
    [-2]: "35%", 
    [-1]: "60%", 
    [0]:  "75%", 
    [1]:  "85%", 
    [2]:  "100%", 
  };
  return map[score] || "10%";
};


export const MOOD_QUOTES: Record<number, string> = {
  [-2]: "You are stronger than you think; the storm will pass.",
  [-1]: "Every day is a fresh start. Take it easy today.",
  [0]:  "A calm mind brings inner strength and self-confidence.",
  [1]:  "Count your age by friends, not years. Count your life by smiles, not tears.",
  [2]:  "The purpose of our lives is to be happy. Keep shining!",
};