import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex justify-start items-center flex-col min-h-screen min-w-screen">
      <div className="flex justify-start min-w-7xl mx-auto px-6 py-4 mb-40">
        <Link
          to="/"
          className="text-blue-600 border border-blue-600 px-4 py-2 rounded-3xl hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out"
        >
          &larr; Go Back
        </Link>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
