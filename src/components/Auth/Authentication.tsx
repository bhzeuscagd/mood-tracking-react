import { useState } from "react";

import Icons from "../Icons";
import Register from "./Components/Register";
import Login from "./Components/Login";
import OnBoarding from "./Components/OnBoarding";

export default function Authentication() {
  const [CurrentPage, setCurrentPage] = useState("login");
  return (
    <section className="bg-gradient-light h-screen w-screen py-20 px-4 flex flex-col  items-center gap-8">
      <Icons name="logo" className="h-10" strokeWidth={0} />
      {CurrentPage === "login" && (
        <Login onSwitch={() => setCurrentPage("register")} />
      )}
      {CurrentPage === "register" && (
        <Register
          onSwitch={() => setCurrentPage("login")}
          onRegisterSuccess={() => setCurrentPage("onboarding")}
        />
      )}
      {CurrentPage === "onboarding" && <OnBoarding />}
    </section>
  );
}
