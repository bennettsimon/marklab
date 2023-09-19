import React from "react";
import { motion } from "framer-motion";

function PopUp({ visibility, onPopup, children, touchClose = false }) {
  return (
    <div
      onClick={() => {
        if (touchClose) onPopup(!visibility);
      }}
      className={`w-full h-full overflow-hidden overscroll-none p-12 grid place-items-center fixed z-10 top-0 left-0 bg-slate-900/30 backdrop-blur-sm transition-all duration-200 ${
        visibility ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {visibility ? (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          layout
          className="p-8 lg:px-12 lg:py-8 max-w-md rounded-3xl bg-white overflow-y-auto scrollbar-sm"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {children}
        </motion.div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PopUp;
