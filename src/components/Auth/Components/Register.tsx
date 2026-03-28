import { useState } from "react";

import Button from "../../Global/Button";

const placeholderName = "text-neutral-900 font-normal text-md";
const placeholderInput = "px-4 py-3 border border-neutral-300 rounded-lg";
const placeholderDescription = "text-neutral-600 text-lg";

export default function Register({ onSwitch, onRegisterSuccess }: any) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulamos que el registro fue un éxito y lo mandamos a Onboarding:
    onRegisterSuccess();
  };
  return (
    <div className="flex flex-col gap-8 items-center  bg-neutral-0 rounded-2xl shadow-2xl py-10 px-4 text-start">
      <h1 className="text-neutral-900 font-bold text-3xl text-start w-full">
        Create an account
      </h1>
      <p className={placeholderDescription}>
        Join to track your daily mood and sleep with ease.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <p className={placeholderName}>Email address</p>
        <input
          type="email"
          placeholder="name@mail.com"
          className={placeholderInput}
        />
        <p className={placeholderName}>Password</p>
        <input type="password" className={placeholderInput} />
        <Button type="submit" text="Sign Up" />

        <p className={placeholderDescription + " text-center"}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-blue-600 cursor-pointer"
          >
            Log in.
          </button>
        </p>
      </form>
    </div>
  );
}
