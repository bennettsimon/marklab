import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import animation from "../../config/animationVariant";

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={location.pathname}
        variants={animation.pageTransition}
        animate="visible"
        initial="hidden"
        exit="exit"
        className="w-full h-full relative overflow-hidden"
      >
        <motion.div
          variants={animation.containerWrap}
          className="absolute top-0 left-0 z-10 w-full h-full overflow-auto rotate-0"
        >
          {children}
        </motion.div>
        <motion.div
          variants={animation.maskWrap}
          className="absolute top-0 left-0 z-10 w-full h-full bg-black/60 pointer-events-none"
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
