import React from "react";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import EditableLabel from "./EditableLable";

// Animated Output Node with purple gradient and animations
const EditableOutputNode = ({ data, id, selected }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className={`px-4 py-3 rounded-lg shadow-lg bg-gradient-to-br from-purple-900 to-purple-800 text-white ${
        selected ? "ring-2 ring-purple-400 ring-opacity-70" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-400 border-2 border-purple-900"
      />
      <EditableLabel
        id={id}
        label={data.label}
        onChange={data.onLabelChange}
        className="font-medium"
      />
    </motion.div>
  );
};

export default EditableOutputNode;
