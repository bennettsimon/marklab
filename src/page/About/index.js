import React, { Children } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import SpringBtn from "../common/springBtn";
import Card from "./card";
import log from "../../config/log.json";

function About() {
  const navigate = useNavigate();
  return (
    <motion.div className="w-full h-full md:px-16 flex flex-col bg-white overflow-hidden relative">
      {/* navbar */}
      <div className="grid grid-cols-2 place-content-center items-center px-6 md:px-0 py-4 md:py-10">
        {/* LOGO */}
        <div className="text-left">
          <h1 className="text-xl md:text-3xl font-bold">ABOUT</h1>
        </div>
        {/* Back Button */}
        <div className="flex items-center justify-end">
          <SpringBtn
            onClick={() => {
              navigate(-1);
            }}
            className="block group text-gray-700 md:hover:text-white leading-[3rem] rounded-2xl overflow-hidden transition"
          >
            <span className="p-2 md:p-6 md:bg-gray-50 md:group-hover:bg-gray-700 transition">
              <FontAwesomeIcon className="" icon="fa-solid fa-xmark" />
            </span>
          </SpringBtn>
        </div>
      </div>

      {/* log scroll */}
      <div className="h-4/5 md:h-[calc(100%-16rem)] grid place-content-center gap-12 md:gap-24">
        <div className="w-full text-center">
          <h1 className="text-6xl md:text-8xl italic">What's New</h1>
          <span className="hidden md:block text-slate-300 md:text-sm italic">
            To know what's new in the the current version and to see more
            details about each update.
          </span>
          {/* business card */}
          <div className="px-6 w-full grid place-content-center mt-4">
            <div className="rounded-2xl bg-slate-50 px-6 py-4 flex justify-between items-center gap-8">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={require("../../asset/img/avatar.jpg")} alt="" />
              </div>
              <div className="text-left">
                <h1 className="text-xl mb-1">HI, I'M SIMON</h1>
                <div className="flex items-center gap-2">
                  <SpringBtn
                    onClick={() => window.open("mailto:hisimon.me@gmail.com")}
                    className="text-slate-300 hover:text-gray-800 transition"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-envelope" />
                  </SpringBtn>
                  <SpringBtn
                    onClick={() =>
                      window.open("http://www.hisimon.me", "_blank")
                    }
                    className="text-slate-300 hover:text-gray-800 transition"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-compass" />
                  </SpringBtn>
                  <SpringBtn
                    onClick={() =>
                      window.open("http://www.hisimon.me", "_blank")
                    }
                    className="text-slate-300 hover:text-gray-800 transition"
                  >
                    <FontAwesomeIcon icon="fa-brands fa-github" />
                  </SpringBtn>
                  <SpringBtn
                    onClick={() =>
                      window.open("http://www.hisimon.me", "_blank")
                    }
                    className="text-slate-300 hover:text-gray-800 transition"
                  >
                    <FontAwesomeIcon icon="fa-brands fa-twitter" />
                  </SpringBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex snap-x snap-mandatory overflow-x-auto">
          <div className="hidden md:block snap-always snap-center shrink-0 w-96"></div>
          {Children.toArray(
            log
              .reverse()
              .map((i, index) => (
                <Card
                  first={index === 0}
                  last={index === log.length - 1}
                  version={i.version}
                  date={i.date}
                  arr={i.log}
                />
              ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default About;
