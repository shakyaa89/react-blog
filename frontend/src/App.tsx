import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BlogPage from "./pages/BlogPage";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkLoginStatus = () => {
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!storedUser);
  };

  useEffect(() => {
    checkLoginStatus();

    const handleAuthChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("user-auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("user-auth-changed", handleAuthChange);
    };
  }, []);

  return (
    <>
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </>
  );
}

export default App;
