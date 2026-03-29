
interface IconsProps {
  name: string;
  size?: number;
  className?: string;
  label?: string;
  strokeWidth?: number;
  fill?: string;
  stroke?: string;
  width?: number | string;
  height?: number | string;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}


export default function Icons({
  name,
  size = 24,
  className = "",
  label = "",
  strokeWidth,
  fill = "",
  stroke = "none",
  ...rest
}: IconsProps) {


  const isDecorative = !label;

  const iconId = name.startsWith("icon-") ? name : `icon-${name}`;

  return (
    <svg
      className={`
        icon 
        ${iconId} 
        inline-block 
        align-middle 
        shrink-0 
        ${fill === "" ? "fill-current" : ""}
        ${stroke === "currentColor" ? "stroke-current" : ""}
        ${className}
      `}
      strokeWidth={strokeWidth}
      fill={fill}
      stroke={stroke}
      width={size}
      height={size}
      aria-hidden={isDecorative ? "true" : undefined}
      aria-label={label || undefined}
      role={label ? "img" : undefined}
      {...rest}
    >
      {}
      <use href={`/atlas.svg#${iconId}`} />
    </svg>
  );
}
