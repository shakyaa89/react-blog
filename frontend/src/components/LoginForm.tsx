import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = {
      email,
      pass,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        loginData
      );

      if (response.status === 200) {
        alert("Logged in successfully!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event("user-auth-changed"));
        navigate("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="w-full px-4 py-2 border rounded-md"
        />

        {error && <p className="font-bold text-red-500 text-center">{error}</p>}
        <Link
          to={"/register"}
          className="cursor-pointer underline text-blue-500"
        >
          Register
        </Link>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
