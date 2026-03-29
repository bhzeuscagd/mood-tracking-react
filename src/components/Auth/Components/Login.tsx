import { useState } from "react";
import Button from "../../Global/Button";
import { supabase } from "../../../lib/supabase";

const placeholderName = "text-neutral-900 font-normal text-md";
const placeholderInput = "px-4 py-3 border border-neutral-300 rounded-lg outline-none focus:border-blue-500 transition-colors";
const placeholderDescription = "text-neutral-600 text-lg";

export default function Login({ onSwitch, onLoginSuccess }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      onLoginSuccess();
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full max-w-[335px] md:max-w-[530px] bg-neutral-0 rounded-2xl shadow-2xl py-10 px-5 md:px-10 text-start">
      <h1 className="text-neutral-900 font-bold text-3xl text-start w-full">
        Welcome Back
      </h1>
      <p className={placeholderDescription}>
        Log in to continue tracking your mood and sleep.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <p className={placeholderName}>Email address</p>
        <input
          type="email"
          placeholder="name@mail.com"
          className={placeholderInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className={placeholderName}>Password</p>
        <input 
          type="password" 
          className={`${placeholderInput} flex-1 ${errorMsg ? "border-red-500! bg-red-50!" : ""}`} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMsg ? (
          <span className="text-red-500 font-medium text-sm -mt-2">
            {errorMsg === "Invalid login credentials" ? "Invalid email or password." : errorMsg}
          </span>
        ) : null}
        <Button type="submit" text={loading ? "Logging in..." : "Log In"} disabled={loading} />

        <p className={placeholderDescription + " text-center"}>
          Haven't got an account?{" "}
          <button type="button" onClick={onSwitch} className="text-blue-600 cursor-pointer font-medium hover:underline">
            Sign up.
          </button>
        </p>
      </form>
    </div>
  );
}
