import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeBtn = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("mode")=== "dark"){
      document.documentElement.setAttribute("data-theme", "dark");
      setDarkMode(true)
    }
  },[])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("mode","dark")

    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("mode","light")
    }
  };
  return (
    <button
      onClick={toggleDarkMode}
      className="bg-gray-800 dark:bg-white  text-white fixed bottom-2/10 z-20 left-1/12 dark:text-black  md:p-3 p-2 rounded-full shadow-lg hover:bg-blue-600 transition"
    >
      {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default DarkModeBtn;
