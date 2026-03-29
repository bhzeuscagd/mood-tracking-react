interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-4 w-full rounded-xl text-neutral-0 text-2xl transition-all duration-200 cursor-pointer ${
        disabled ? "bg-blue-400 cursor-not-allowed opacity-70" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {text}
    </button>
  );
}
