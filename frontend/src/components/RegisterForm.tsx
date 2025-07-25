import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [phonenum, setPhoneNum] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      pass,
      phonenum,
      gender,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        userData
      );

      if (response.status === 201) {
        alert("User Register Successfully!");
        navigate("/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Register
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          className="w-full px-4 py-2 border rounded-md"
        />
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
        <input
          type="text"
          placeholder="Phone Number"
          value={phonenum}
          onChange={(e) => {
            setPhoneNum(e.target.value);
            setError("");
          }}
          className="w-full px-4 py-2 border rounded-md"
        />
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            setError("");
          }}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {error && <p className="font-bold text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
