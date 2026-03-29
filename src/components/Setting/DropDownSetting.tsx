import { useState, useRef, useEffect } from "react";

import Icons from "../Icons";
import { supabase } from "../../lib/supabase";

interface DropDownSettingProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onClose?: () => void;
  onAvatarUpdate?: (avatar: string) => void;
  onSubmitSuccess?: () => void;
  showLogout?: boolean;
}

const titletext = "text-neutral-900 text-lg font-semibold";
const descriptiontext = "text-neutral-600 text-lg";

export default function DropDownSetting({
  title = "Update your profile",
  description = "Personalice your account with your name and photo.",
  buttonText = "Save changes",
  onClose,
  onAvatarUpdate,
  onSubmitSuccess,
  showLogout,
}: DropDownSettingProps) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedName = localStorage.getItem("Username");
    if (savedName) setName(savedName);
    const savedAvatar = localStorage.getItem("UserAvatar");
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 250 * 1024) {
      setErrorMsg("Image exceeds maximum size of 250KB");
      return;
    }
    
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setErrorMsg("Please upload a valid PNG or JPEG image");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatar(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("Username", name);
    if (avatar) {
      localStorage.setItem("UserAvatar", avatar);
      if (onAvatarUpdate) onAvatarUpdate(avatar);
    }
    window.dispatchEvent(new Event("profileUpdated"));
    
    if (onClose) {
      onClose();
    }

    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  return (
    <div className="relative flex flex-col py-10 px-5 md:px-10 items-start gap-6 w-full max-w-[335px] md:max-w-[530px] h-auto rounded-xl bg-neutral-0 shadow-xl">
      {onClose ? (
        <Icons
          name="close"
          strokeWidth={2}
          className="absolute top-5 right-5 text-neutral-500 cursor-pointer h-5 w-5"
          onClick={onClose}
        />
      ) : null}
      <div>
        <h1 className="font-bold text-neutral-900 text-3xl">{title}</h1>
        <p className={descriptiontext}>{description}</p>
      </div>
      <form onSubmit={HandleSubmit} className="flex flex-col gap-2 w-full">
        <label htmlFor="settings-name" className={titletext}>Name</label>
        <input
          id="settings-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Appleseed"
          className="w-full px-4 py-2 border border-neutral-600 bg-neutral-0 shadow-sm rounded-lg"
        />
        <div className="flex flex-row gap-5 mt-4">
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover shrink-0" />
          ) : (
            <Icons name="avatar-placeholder" className="stroke-none w-16 h-16 shrink-0" />
          )}
          <div className="flex flex-col gap-2 items-start">
            <h2 className={titletext}>Upload Image</h2>
            <p className={descriptiontext + " text-sm"}>
              Max 250KB, PNG or JPEG
            </p>
            {errorMsg ? <p className="text-red-500 text-xs font-semibold">{errorMsg}</p> : null}
            
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            
            <button
              type="button"
              onClick={handleUploadClick}
              className="text-neutral-900 text-lg font-semibold px-4 py-2 rounded-lg border border-neutral-900"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full mt-5 gap-3">
          <button
            type="submit"
            className="justify-center bg-blue-600 px-8 py-4 w-full rounded-lg text-neutral-0 font-semibold text-xl hover:bg-blue-700 transition"
          >
            {buttonText}
          </button>

          {showLogout ? (
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                localStorage.clear();
                window.location.href = "/";
              }}
              className="text-red-500 font-medium hover:underline text-center mt-2"
            >
              Log out
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
