import Button from "../../Global/Button";

const placeholderName = "text-neutral-900 font-normal text-md";
const placeholderInput = "px-4 py-3 border border-neutral-300 rounded-lg";
const placeholderDescription = "text-neutral-600 text-lg";

export default function Register({ onSwitch }: any) {
  return (
    <div className="flex flex-col gap-8 items-center  bg-neutral-0 rounded-2xl shadow-2xl py-10 px-4 text-start">
      <h1 className="text-neutral-900 font-bold text-3xl text-start w-full">
        Create an account
      </h1>
      <p className={placeholderDescription}>
        Join to track your daily mood and sleep with ease.
      </p>

      <div className="flex flex-col gap-4 w-full">
        <p className={placeholderName}>Email address</p>
        <input
          type="email"
          placeholder="name@mail.com"
          className={placeholderInput}
        />
        <p className={placeholderName}>Password</p>
        <input type="password" className={placeholderInput} />
        <Button text="Sign Up" onClick={() => {}} />

        <p className={placeholderDescription + " text-center"}>
          Already have an account?{" "}
          <button onClick={onSwitch} className="text-blue-600">
            Log in.
          </button>
        </p>
      </div>
    </div>
  );
}
