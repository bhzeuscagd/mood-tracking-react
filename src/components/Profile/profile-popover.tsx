import Icons from "../Icons.tsx";

interface ProfilePopoverProps {
  name?: string;
  email?: string;
}

export default function ProfilePopover({
  name = "Lisa Maria",
  email = "lisa@email.com",
}: ProfilePopoverProps) {
  return (
    <div className="flex flex-col justify-center flex-star rounded-md bg-neutral-0 max-w-[343px] px-150 py-200 shadow-2xl gap-150">
      <h1 className="text-neutral-900 font-medium text-lg">{name}</h1>
      <p className="text-neutral-300 font-normal text-md">{email}</p>

      <span className="border-t border-blue-100"></span>

      <span className="flex items-center gap-125 text-neutral-900 text-md font-normal">
        <Icons name="settings" className="w-4 h-4 stroke-none" /> Settings
      </span>
      <span className="flex items-center gap-125 text-neutral-900 text-md font-normal">
        <Icons name="logout" className="w-4 h-4 stroke-none" /> Logout
      </span>
    </div>
  );
}
