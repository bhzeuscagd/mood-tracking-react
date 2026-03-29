import Icons from "../../../Icons";

interface TrendBarProps {
  height: string;
  colorClass: string;
  faceIconName: string;
  className?: string;
}

export default function TrendBar({
  height,
  colorClass,
  faceIconName,
  className = "",
}: TrendBarProps) {
  return (
  <div className={`flex-1 flex flex-col-reverse items-center justify-start h-full pb-12 ${className}`}>
      <div
        className={`w-10 rounded-full relative ${colorClass} transition-all duration-300 ease-out`}
        style={{ height }}
      >
        <Icons
          name={faceIconName}
          className="absolute top-1 left-1/2 -translate-x-1/2 w-7 h-7 fill-white"
        />
      </div>
    </div>
  );
}
