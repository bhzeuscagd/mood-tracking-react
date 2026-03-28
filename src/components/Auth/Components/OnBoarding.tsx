import DropDownSetting from "../../Setting/DropDownSetting";

export default function OnBoarding() {
  return (
    <div className="flex items-center justify-center">
      <DropDownSetting
        title="Personalice your Experience"
        description="Add your name and a profile picture to make Mood yours."
        buttonText="Start tracking"
        InitialName="Jane Appleseed"
      />
    </div>
  );
}
