import { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  return (
    <div>
      {showForgotPassword ? (
        <ForgotPassword onSuccess={() => setShowForgotPassword(false)} />
      ) : (
        <Login onForgotPassword={() => setShowForgotPassword(true)} />
      )}
    </div>
  );
};

export default Auth;
