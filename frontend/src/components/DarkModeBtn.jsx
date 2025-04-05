import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeBtn = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };
  return (
    <button
      onClick={toggleDarkMode}
      className="bg-gray-800 dark:bg-white  text-white fixed top-1/8 z-10 left-1/12 dark:text-black  p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
    >
      {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
    </button>
  );
};

export default DarkModeBtn;
