import Button from "../../Global/Button";

const placeholderName = "text-neutral-900 font-normal text-md";
const placeholderInput = "px-4 py-3 border border-neutral-300 rounded-lg";
const placeholderDescription = "text-neutral-600 text-lg";

export default function Register({ onSwitch }: any) {
  return (
    <div className="flex flex-col gap-8 items-center  bg-neutral-0 rounded-2xl shadow-2xl py-10 px-4 text-start">
      <h1 className="text-neutral-900 font-bold text-3xl text-start w-full">
        Welcome Back
      </h1>
      <p className={placeholderDescription}>
        Log in to continue tracking your mood and sleep.
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
        <Button text="Log In" onClick={() => {}} />

        <p className={placeholderDescription + " text-center"}>
          Haven't got an account?{" "}
          <button onClick={onSwitch} className="text-blue-600">
            Sign up.
          </button>
        </p>
      </div>
    </div>
  );
}
