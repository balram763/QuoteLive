import React from "react";
import image from "../assets/block2.gif";

const Loading = () => {
  return (
    <div className="flex top-5 justify-center align-items-center">
      <img src={image} alt="" />
    </div>
  );
};

export default Loading;
