import React, { useEffect, useState } from "react";

function CursorWrap() {
  /* Mouse track */
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    // Get mouse coordinate
    window.addEventListener("mousemove", (e) => {
      setX(e.clientX);
      setY(e.clientY);
    });
  });

  return (
    <div
      className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 h-16 w-16 grid place-content-center"
      style={{ left: x, top: y }}
    >
      <div className="absolute h-16 w-16 rounded-full border-gray-900/30 border grid place-content-center">
        <div className="w-3 h-3 rounded-full bg-gray-900"></div>
      </div>
      <div className="animate-ping absolute h-16 w-16 rounded-full border-gray-900/20 border grid place-content-center"></div>
    </div>
  );
}

export default CursorWrap;
