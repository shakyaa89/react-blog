import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  const fetchUserData = () => {
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!storedUser); // this will be false when logged out
  };

  useEffect(() => {
    fetchUserData();

    // Listen to login/logout event
    const handleAuthChange = () => {
      fetchUserData();
    };

    window.addEventListener("user-auth-changed", handleAuthChange);

    // Cleanup
    return () => {
      window.removeEventListener("user-auth-changed", handleAuthChange);
    };
  }, []);

  return (
    <div>
      {!isLoggedIn && (
        <div className="flex justify-end max-w-7xl mx-auto px-6 py-4">
          <Link
            to="/login"
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-3xl hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out"
          >
            Login &rarr;
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Blogify
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Discover stories, write your own, and connect with the community.
          Blogify is your space to share thoughts and learn from others.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to={isLoggedIn ? "/blog" : "/login"}
            className="bg-blue-600 text-white px-6 py-3 rounded-3xl shadow hover:bg-blue-700 transition"
          >
            Browse Posts
          </Link>
          <Link
            to={isLoggedIn ? "/about" : "/login"}
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-3xl hover:bg-blue-50 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
