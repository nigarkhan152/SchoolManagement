import React from "react";
import { motion } from "framer-motion";

const ContentContainer = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default ContentContainer;