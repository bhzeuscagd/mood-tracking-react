import Icons from "../../../Icons";

interface AverageCardsProps {
  HeaderTitle: string;
  Title: string;
  Description: string;
}

export default function AverageCards({
  HeaderTitle,
  Title,
  Description,
}: AverageCardsProps) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <p className="text-xl font-bold text-gray-900">
        {HeaderTitle}
        <span className="text-neutral-600 text-sm font-normal">
          {" "}
          (Last 5 Check-ins)
        </span>
      </p>
      <div className="relative flex flex-col items-start gap-2 border border-blue-100 rounded-2xl px-8 py-10 w-full bg-blue-100 overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-900">{Title}</h2>
        <p className="text-sm text-neutral-600 font-normal">{Description}</p>
        <Icons
          name="bg-card-decoration"
          className="absolute right-0 -top-px opacity-100"
          width={61}
          height={150}
          strokeWidth={0}
        />
      </div>
    </div>
  );
}
