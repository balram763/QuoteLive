import React, { useState } from "react";
import { FaMoon, FaPlus, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddPostBtn = () => {
  return (
    <Link
      to={"/post"}
      className="bg-blue-800 dark:bg-white  text-white fixed bottom-1/8 z-10 right-1/12 dark:text-black  p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
    >
      <FaPlus />
    </Link>
  );
};

export default AddPostBtn;
