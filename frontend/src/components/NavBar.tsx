import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const linkClass =
    "text-gray-700 font-medium hover:text-blue-600 px-3 py-2 transition";

  const activeClass = "text-blue-600 font-semibold border-b-2 border-blue-600";

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
    }
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
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-auth-changed"));
  };

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <NavLink
            to="/"
            className="text-2xl font-bold text-blue-600 hover:opacity-80"
          >
            Blogify
          </NavLink>
          <div className="space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
            >
              About
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeClass}` : linkClass
              }
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
                className={({ isActive }) =>
                  isActive ? `${linkClass} ${activeClass}` : linkClass
                }
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
