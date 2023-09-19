import React, { Children } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import animation from "../../config/animationVariant";
import CursorWrap from "./component/cursorWrap";
import BackgroundContainer from "./component/backgroundContainer";

function Home() {
  const navigate = useNavigate();

  /* Slogan */
  const slogan = [
    "Mark Lab",
    "唯一的照片标记，只属于你",
    "MarkLab可以帮助你创建独一无二的照片标记，通过读取Exif原数据，按下快门一刻的光圈、快门、ISO、时间及地理位置等数据将被完美展示。",
  ];

  return (
    <motion.div className="w-full h-full bg-gray-50 overflow-hidden cursor-none">
      {/* Background Loop Image */}
      <BackgroundContainer />
      {/* Customise Cursor Style */}
      <CursorWrap />

      {/* Text Mask */}
      <div className="absolute max-w-full md:max-w-2xl lg:max-w-4xl h-auto md:h-full bottom-0 rounded-t-2xl md:rounded-none bg-white/95 z-10 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
        <div className="lg:w-4/5 px-8 pt-20 pb-24 md:p-20 lg:p-auto space-y-4 md:space-y-6">
          <motion.div
            variants={animation.textContainer}
            className="flex overscroll-none overflow-visible text-5xl md:text-8xl font-extrabold text-gray-900 whitespace-nowrap"
          >
            {Children.toArray(
              slogan[0].split("").map((w, i) => (
                <motion.h1
                  className={`${w === " " ? "mx-2" : "m-0"}`}
                  variants={animation.textChildren}
                  key={i}
                >
                  {w}
                </motion.h1>
              ))
            )}
          </motion.div>
          <motion.div
            variants={animation.textContainer}
            className="flex overscroll-none overflow-visible text-2xl md:text-5xl font-bold text-gray-900 whitespace-nowrap"
          >
            {Children.toArray(
              slogan[1].split("").map((w, i) => (
                <motion.h1
                  className={`${w === " " ? "mx-4" : "m-0"}`}
                  variants={animation.textChildren}
                  key={i}
                >
                  {w}
                </motion.h1>
              ))
            )}
          </motion.div>
          <motion.div
            variants={animation.textContainer}
            className="flex flex-wrap overscroll-none overflow-visible text-gray-500 text-sm leading-6 md:leading-7 pb-8 md:pb-10"
          >
            <motion.h1
              variants={{ transition: { delay: 1 }, ...animation.textChildren }}
            >
              {slogan[2]}
            </motion.h1>
          </motion.div>
          <motion.button
            variants={animation.fade}
            onClick={() => {
              navigate("/app");
            }}
            className="block group text-white leading-[3rem] text-xl rounded-xl overflow-hidden cursor-none hover:shadow-2xl transition"
          >
            <span className="py-6 px-10 gradient_1">Get Start</span>
            <span className="py-6 px-4 bg-white text-gray-900">
              <FontAwesomeIcon
                className="transition group-hover:-rotate-[30deg]"
                icon="fa-solid fa-arrow-right"
              />
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
