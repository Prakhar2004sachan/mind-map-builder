import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

function Button({ label, showIcon, icon, click, active }) {
  return (
    <motion.button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        active
          ? "bg-[#ec6281] text-white"
          : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white"
      } ${!label && "justify-center w-10 h-10"}`}
      onClick={click}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
    >
      {showIcon && (
        <motion.span
          className="text-lg"
          animate={{ rotate: active ? [0, 15, 0] : 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 0.6, 1],
          }}
        >
          {icon}
        </motion.span>
      )}
      {label && (
        <span className="whitespace-nowrap text-sm font-medium">{label}</span>
      )}
    </motion.button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  showIcon: PropTypes.bool,
  icon: PropTypes.node,
  click: PropTypes.func,
  active: PropTypes.bool,
};

Button.defaultProps = {
  showIcon: false,
  active: false,
  click: () => {},
};

export default Button;
