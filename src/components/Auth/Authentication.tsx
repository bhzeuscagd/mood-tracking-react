import { useState } from "react";

import Icons from "../Icons";
import Register from "./Components/Register";
import Login from "./Components/Login";

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <section className="bg-gradient-light h-screen w-screen py-20 px-4 flex flex-col  items-center gap-8">
      <Icons name="logo" className="h-10" strokeWidth={0} />
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Register onSwitch={() => setIsLogin(true)} />
      )}
    </section>
  );
}
