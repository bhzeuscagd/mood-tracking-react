import Icons from "../Icons";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between py-10 px-4 bg-neutral-0">
      <div className="">
        <Icons name="logo" className="w-40 h-10 stroke-none" />
      </div>
      <div className="flex flex-row gap-2.5">
        <Icons name="avatar-placeholder" className="stroke-none h-10 w-auto" />
        <Icons name="dropdown-arrow" className="stroke-none h-auto w-2.5" />
      </div>
    </nav>
  );
}
