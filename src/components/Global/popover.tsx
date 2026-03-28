import Icons from "../Icons.tsx";

interface PopoverProps {
  textMood?: string;
  IconMood?: string;
  textSleep?: string;
  textReflections?: string;
  textTags?: string[]; // array de textos para los tags
}

const TitleStyle =
  "font-semibold text-sm text-neutral-600 line-height-[100%] font-reddit-sans";
const TextStyle =
  "text-neutral-900 text-md font-normal line-height-[140%] tracking-[0.3px] font-reddit-sans";

export default function Popover({
  textMood = "Very Happy",
  IconMood = "very-happy-color",
  textSleep = "9+ hours",
  textReflections = "Slept well and woke up ready to tackle new challenges.",
  textTags = ["Joyful", "Excited", "Grateful"],
}: PopoverProps) {
  return (
    <div
      className="relative flex flex-col max-w-[215px] w-max p-150 items-start gap-150 rounded-125 border-blue-100 bg-neutral-0
    before:content-[''] before:absolute before:top-[calc(10px+1px)] before:left-full
    before:w-0 before:h-0
    before:border-l-10 before:border-t-10 before:border-b-10
    before:border-t-transparent before:border-b-transparent before:border-l-blue-100
    after:content-[''] after:absolute after:top-[calc(10px+1px)] after:left-full
    after:w-0 after:h-0
    after:border-l-9 after:border-t-9 after:border-b-9
    after:border-t-transparent after:border-b-transparent after:border-l-white
    "
    >
      <h2 className={TitleStyle}>Mood</h2>
      <span className="flex items-center gap-125 text-neutral-900 text-md font-normal">
        <Icons name={IconMood} className="stroke-none" />{" "}
        <p className={TextStyle}>{textMood}</p>
      </span>

      <h2 className={TitleStyle}>Sleep</h2>
      <p className={TextStyle}>{textSleep}</p>
      <h2 className={TitleStyle}>Reflections</h2>
      <p className={TextStyle}>{textReflections}</p>
      <h2 className={TitleStyle}>Tags</h2>
      <p className={TextStyle}>
        {textTags.map((tag, index) => (
          <span key={index}>
            {tag}
            {index < textTags.length - 1 ? ", " : ""}
            {/* si el index es menor a la longitud del array menos 1, se agrega una coma */}
          </span>
        ))}
      </p>
    </div>
  );
}
