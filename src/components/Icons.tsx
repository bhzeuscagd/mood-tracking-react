// como usamos .tsx podemos utilizar props es para definir que tipo de datos son
// y los ? es para que sea opcional mismo astro
interface IconsProps {
  name: string;
  size?: number;
  className?: string;
  label?: string;
  strokeWidth?: number;
  fill?: string;
  stroke?: string;
}

// como es react debemos exportar la funcion con default
// y los ...rest es para que acepte cualquier otra propiedad que no este definida
// para los string es recomendable "" para que no de error, para lo otro si es opcional
// los dejamos vacion y si queremos darle uno por defecto se pone = 24 por ejemplo
export default function Icons({
  name,
  size = 24,
  className = "",
  label = "",
  strokeWidth,
  fill = "",
  stroke = "",
  ...rest
}: IconsProps) {
  //hay que poner los dos puntos y el nombre de la interface en tsx

  const isDecorative = !label; // si no hay label, es decorativo

  return (
    <svg
      width={size}
      height={size}
      // 1. Usamos className con ` ` para combinar las clases
      className={`
        icon 
        icon-${name} 
        inline-block 
        align-middle 
        shrink-0 
        fill-current 
        stroke-current 
        ${className}
      `}
      // 2. Usamos la lógica de accesibilidad simplificada
      strokeWidth={strokeWidth}
      fill={fill}
      stroke={stroke}
      aria-hidden={isDecorative ? "true" : undefined}
      aria-label={label || undefined}
      role={label ? "img" : undefined}
      {...rest}
    >
      {}
      <use href={`/atlas.svg#icon-${name}`} />
    </svg>
  );
}
