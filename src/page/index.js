import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./Home";
import App from "./App";
import About from "./About";
import PageTransition from "./common/pageTransition";
import animation from "../config/animationVariant";

function Router() {
  const location = useLocation();

  const [enter, setEnter] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setEnter(true);
    }, 2000);
  }, []);

  return (
    <Fragment>
      {/* reload遮罩 */}
      <motion.div
        variants={animation.initAnimation}
        initial="visible"
        animate="hidden"
        className="absolute top-[1px] left-0 z-50 w-full bg-black"
      >
        <div className="w-full h-full text-white font-bold text-8xl font-['Neptune'] grid place-content-center">
          <div className="h-[6rem] overflow-hidden">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: "-91%", transition: { duration: 2, delay: 0.6 } }}
              className="inline-block text-right w-16 break-all overflow-hidden"
            >
              01234567891
            </motion.div>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: "-91%", transition: { duration: 2, delay: 0.3 } }}
              className="inline-block text-right w-16 break-all overflow-hidden"
            >
              01234567890
            </motion.div>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: "-91%", transition: { duration: 2, delay: 0.1 } }}
              className="inline-block text-right w-16 break-all overflow-hidden"
            >
              01234567890
            </motion.div>
          </div>
        </div>
      </motion.div>

      {enter ? (
        <PageTransition>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<App />} />
          </Routes>
        </PageTransition>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default Router;
