import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

function NodeButton({ label, buttonType, nodeClasses }) {
  const getColor = (type) => {
    switch (type) {
      case "inputNode":
        return "#6366f1"; // Indigo
      case "defaultNode":
        return "#ec6281"; // Pink (your app's accent color)
      case "outputNode":
        return "#10b981"; // Green
      default:
        return "#64748b"; // Slate
    }
  };

  const getGradient = (type) => {
    switch (type) {
      case "inputNode":
        return "from-indigo-600/20 to-indigo-600/5";
      case "defaultNode":
        return "from-pink-600/20 to-pink-600/5";
      case "outputNode":
        return "from-emerald-600/20 to-emerald-600/5";
      default:
        return "from-slate-600/20 to-slate-600/5";
    }
  };

  const onDragStart = (event) => {
    event.dataTransfer.setData("application/reactflow", buttonType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`
          px-4 py-3 mb-2 rounded-lg cursor-grab active:cursor-grabbing
          border border-zinc-700
          bg-gradient-to-br ${getGradient(buttonType)}
          hover:border-zinc-600 hover:shadow-lg
          transition-all duration-300
        `}
        style={{
          boxShadow: `0 0 10px 0 ${getColor(buttonType)}10`,
        }}
        onDragStart={onDragStart}
        draggable
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="flex items-center space-x-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: getColor(buttonType) }}
          />
          <span className="font-medium text-white">{label}</span>
        </div>

        <motion.div
          className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ backgroundColor: getColor(buttonType) }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

NodeButton.propTypes = {
  label: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  nodeClasses: PropTypes.string,
};

export default NodeButton;
