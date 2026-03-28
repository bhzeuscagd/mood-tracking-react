interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  text,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-8 py-4 w-full rounded-xl text-neutral-0 text-2xl transition-all duration-200 bg-blue-600 hover:bg-blue-700 cursor-pointer"
    >
      {text}
    </button>
  );
}
