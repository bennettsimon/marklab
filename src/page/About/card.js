import React from "react";

export default function Card({ first, last, version, date, arr }) {
  return (
    <div className="snap-always snap-center scroll-m-6 shrink-0 w-96 relative">
      {/* hr */}
      {first ? (
        ""
      ) : (
        <div className="h-[1px] bg-slate-400 absolute top-1 left-0 w-1/2"></div>
      )}
      {last ? (
        ""
      ) : (
        <div className="h-[1px] bg-slate-400 absolute top-1 right-0 w-1/2"></div>
      )}
      <div className="h-[10px] w-5 bg-white absolute left-1/2 -translate-x-1/2 rounded-full grid place-content-center">
        <div className="h-[8px] w-[8px] bg-slate-600 rounded-full"></div>
      </div>
      {/* card */}
      <div className="w-full mt-8 px-8 cursor-pointer">
        <div
          className={`w-full rounded-2xl py-6 px-8 ${
            first
              ? "text-white gradient_1"
              : "group bg-gray-50 md:hover:bg-gray-700 text-slate-800 transition hover:text-white"
          }`}
        >
          <h1 className="text-2xl">Version {version}</h1>
          <span className="text-sm opacity-60">@{date}</span>
          <ul className="mt-4">
            {arr.map((i, index) => (
              <li>{index + 1 + ". " + i}</li>
            ))}
          </ul>
          <div className="mt-6 w-full text-right">
            <i className="font-thin">by Simon</i>
          </div>
        </div>
      </div>
    </div>
  );
}
