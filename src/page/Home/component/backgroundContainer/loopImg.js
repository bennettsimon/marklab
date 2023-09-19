import React, { Children } from "react";

function LoopImg({ className, imgArr, direction }) {
  return (
    <div
      className={`${className} flex flex-col flex-1 items-center ${
        direction === "bottom" ? "animation_loop_ttb" : "animation_loop_btt"
      }`}
    >
      <div className="flex flex-col items-center absolute bottom-full">
        {Children.toArray(imgArr.map((i) => <img src={i} alt="" />))}
      </div>
      <div className="flex flex-col items-center">
        {Children.toArray(imgArr.map((i) => <img src={i} alt="" />))}
      </div>
    </div>
  );
}

export default LoopImg;
