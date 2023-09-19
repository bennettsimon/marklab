import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import SpringBtn from "../../common/springBtn";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 place-content-center items-center px-6 md:px-0 py-4 md:py-10">
      {/* Back Button */}
      <div className="flex items-center justify-start">
        <SpringBtn
          onClick={() => {
            navigate("/");
          }}
          className="block group text-gray-700 md:hover:text-white leading-[3rem] rounded-2xl overflow-hidden transition"
        >
          <span className="p-2 md:p-6 md:bg-gray-50 md:group-hover:bg-gray-700 transition">
            <FontAwesomeIcon
              className="transition md:group-hover:-translate-x-1 md:mr-1 text-sm"
              icon="fa-solid fa-chevron-left"
            />
            <span className="hidden md:inline">Back</span>
          </span>
        </SpringBtn>
      </div>
      {/* LOGO */}
      <div className="text-center">
        <h1 className="text-xl md:text-3xl font-bold">MarkLab</h1>
      </div>
      {/* Other */}
      <div className="flex items-center justify-end">
        <ul className="text-gray-700 flex flex-nowrap gap-10">
          <li className="group">
            <SpringBtn
              onClick={() => {
                navigate("/about");
              }}
              className="block group text-gray-700 md:hover:text-white leading-[3rem] rounded-2xl overflow-hidden transition"
            >
              <span className="p-2 md:p-6 md:bg-gray-50 md:group-hover:bg-gray-700 transition">
                <span className="hidden md:inline">About</span>
                <FontAwesomeIcon
                  className="transition md:group-hover:translate-x-1 md:ml-1 text-sm"
                  icon="fa-solid fa-chevron-right"
                />
              </span>
            </SpringBtn>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
