import React from "react";
import LoginForm from "@/components/auth/loginForm";

const Login = async () => {
  return (
    <div className="flex h-screen items-center justify-center px-36">
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="space-y-1 text-center">
          <h3 className="text-4xl font-bold">Sign In to your account</h3>
          <p className="text-sm text-gray-400">
            Enter your details to proceed further
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
