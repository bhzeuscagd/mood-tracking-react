import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

import Icons from "../Icons";
import Register from "./Components/Register";
import Login from "./Components/Login";
import OnBoarding from "./Components/OnBoarding";

export default function Authentication() {
  const [CurrentPage, setCurrentPage] = useState("login");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleLoginSuccess();
      }
    });
  }, []);

  const handleSwitchToRegister = () => setCurrentPage("register");
  const handleSwitchToLogin = () => setCurrentPage("login");
  const handleRegisterSuccess = () => setCurrentPage("verify_email");

  const handleLoginSuccess = () => {
    const hasName = localStorage.getItem("Username");
    if (!hasName) {
      setCurrentPage("onboarding");
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <div className="flex-1 w-full py-10 px-4 flex flex-col items-center gap-8">
      <Icons name="logo" className="h-10 w-[180px]" strokeWidth={0} />
      {CurrentPage === "login" ? (
        <Login onSwitch={handleSwitchToRegister} onLoginSuccess={handleLoginSuccess} />
      ) : null}
      {CurrentPage === "register" ? (
        <Register
          onSwitch={handleSwitchToLogin}
          onRegisterSuccess={handleRegisterSuccess}
        />
      ) : null}
      {CurrentPage === "verify_email" ? (
        <div className="flex flex-col gap-6 items-center w-full max-w-[335px] md:max-w-[530px] bg-neutral-0 rounded-2xl shadow-2xl py-12 px-5 md:px-10 text-center">
          <h1 className="text-neutral-900 font-bold text-3xl w-full">
            Check your email
          </h1>
          <p className="text-neutral-600 text-lg">
            We've sent you a confirmation link. Please verify your account, then you can log in.
          </p>
          <button 
            type="button"
            onClick={handleSwitchToLogin}
            className="mt-4 bg-blue-600 text-white px-8 py-3 w-full rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Log In
          </button>
        </div>
      ) : null}
      {CurrentPage === "onboarding" ? <OnBoarding /> : null}
    </div>
  );
}
