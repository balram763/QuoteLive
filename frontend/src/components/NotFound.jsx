import React from "react";
import nofound from "../assets/nofound.gif";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="max-w-xl border-4 border-pink-300 rounded-xl dark:border-blue-600 mx-auto p-6 transition-colors duration-300 
             bg-gradient-to-r dark:from-blue-900/90 shadow-2xl dark:to-black/90 from-purple-200 to-red-300 dark:text-white text-black text-center"
    >
      <h2 className="text-2xl font-bold text-white">Quote Not Found</h2>
      <img className="mt-10" src={nofound} alt="" />
      <Link to="/" className="text-blue-500  hover:underline">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
