"use client"; // これを追加

import React from "react";

const HomeButton = () => {
  return (
    <div className=" bg-amber-400 hover:bg-amber-300 cursor-pointer p-3 m-5 mt-13 rounded-lg">
      <button onClick={() => (window.location.href = "/")}>HomeButton</button>
    </div>
  );
};

export default HomeButton;
