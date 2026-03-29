import { useState, useEffect } from "react";
import Icons from "../Icons";
import DropDownSetting from "../Setting/DropDownSetting";

export default function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("UserAvatar");
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleOpenSettings = () => setIsSettingsOpen(true);
  const handleCloseSettings = () => setIsSettingsOpen(false);

  return (
    <>
      <nav className="flex flex-row justify-between py-10 px-4">
        <div className="">
          <Icons name="logo" className="h-10 w-45 stroke-none" />
        </div>
        <div 
          className="flex flex-row gap-2.5 items-center cursor-pointer"
          onClick={handleOpenSettings}
        >
          {avatar ? (
            <img src={avatar} alt="User avatar" className="h-10 w-10 rounded-full object-cover shrink-0" />
          ) : (
            <Icons name="avatar-placeholder" className="stroke-none h-10 w-10" />
          )}
          <Icons name="dropdown-arrow" className="stroke-none h-2.5 w-2.5" />
        </div>
      </nav>

      {/* MODAL DE SETTINGS */}
      {isSettingsOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <DropDownSetting 
            onAvatarUpdate={setAvatar}
            onClose={handleCloseSettings}
            showLogout={true}
          />
        </div>
      ) : null}
    </>
  );
}
