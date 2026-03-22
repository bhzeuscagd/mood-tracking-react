interface ButtonProps {
  text: string;
  onClick: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button className="px-8 py-4 w-full rounded-xl text-neutral-0 text-2xl transition-all duration-200 bg-blue-600 hover:bg-blue-700 cursor-pointer">
      <p>{text}</p>
    </button>
  );
}
