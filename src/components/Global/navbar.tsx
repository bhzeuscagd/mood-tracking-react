import Icons from "../Icons";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between py-10 px-4">
      <div className="">
        <Icons name="logo" className="h-10 w-45 stroke-none" />
      </div>
      <div className="flex flex-row gap-2.5 items-center">
        <Icons name="avatar-placeholder" className="stroke-none h-10 w-10" />
        <Icons name="dropdown-arrow" className="stroke-none h-2.5 w-2.5" />
      </div>
    </nav>
  );
}
