import React from "react";

function ExifInput({ title, value }) {
  return (
    <div className="grid place-items-center grid-rows-2 px-2 pt-6 md:p-6 pb-2 md:pb-3">
      <div className="w-full bg-gray-100 text-gray-600 p-2 text-center rounded-xl whitespace-nowrap overflow-hidden">
        {value}
      </div>
      <span className="text-sm text-gray-800">{title}</span>
    </div>
  );
}

export default ExifInput;
