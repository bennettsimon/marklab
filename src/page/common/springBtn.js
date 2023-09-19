import React from "react";
import { motion } from "framer-motion";

export default function SpringBtn({ className, ...props }) {
  return (
    <motion.button
      disabled={props.disable}
      className={`disabled:opacity-50 disabled:cursor-default ${className}`}
      whileTap={props.disabled ? "" : { scale: 0.8 }}
      {...props}
    />
  );
}
