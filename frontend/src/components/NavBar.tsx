import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!storedUser);
  };

  useEffect(() => {
    loadUser();

    // Listen to login/logout event
    const handleAuthChange = () => {
      loadUser();
    };

    window.addEventListener("user-auth-changed", handleAuthChange);

    // Cleanup
    return () => {
      window.removeEventListener("user-auth-changed", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-auth-changed"));
  };

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:opacity-80"
          >
            Blogify
          </Link>
          <div className="space-x-4">
            <NavLink
              to="/"
              className="text-gray-700 font-medium hover:text-blue-600 px-3 py-2 transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-gray-700 font-medium hover:text-blue-600 px-3 py-2 transition"
            >
              About
            </NavLink>
            <NavLink
              to="/blog"
              className="text-gray-700 font-medium hover:text-blue-600 px-3 py-2 transition"
            >
              Posts
            </NavLink>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 font-medium hover:text-blue-600 px-3 py-2 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="text-gray-700 font-medium hover:text-blue-600 px-3 py-2 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
