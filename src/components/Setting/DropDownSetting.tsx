import Icons from "../Icons";

const titletext = "text-neutral-900 text-lg font-semibold";
const descriptiontext = "text-neutral-600 text-lg";

export default function DropDownSetting() {
  return (
    <div className="relative flex flex-col py-10 px-5 items-start gap-6 w-[335px] h-auto rounded-xl bg-neutral-0">
      <Icons
        name="close"
        size={14}
        strokeWidth={2}
        className="absolute top-2 right-2 text-neutral-500 cursor-pointer"
      />
      <div>
        <h1 className="font-bold text-neutral-900 text-3xl">
          Update your profile
        </h1>
        <p className={descriptiontext}>
          Personalice your account with your name and photo.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className={titletext}>Name</p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 border border-neutral-600 bg-neutral-0 shadow-sm rounded-lg"
        />
        <div className="flex flex-row gap-5 mt-4">
          <Icons name="avatar-placeholder" className="stroke-none w-16 h-16" />
          <div className="flex flex-col gap-2 items-start">
            <h2 className={titletext}>Upload Image</h2>
            <p className={descriptiontext + "text-sm"}>
              Max 250KB, PNG or JPEG
            </p>
            <button className="text-neutral-900 text-lg font-semibold px-4 py-2 rounded-lg border border-neutral-900">
              Upload
            </button>
          </div>
        </div>
        <div className="flex w-full mt-5">
          <button className="justify-center bg-blue-600 px-8 py-4 w-full rounded-lg text-neutral-0 font-semibold text-xl">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
