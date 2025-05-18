import React from "react";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import EditableLabel from "./EditableLable";

// Animated Default Node with blue gradient and animations
const EditableDefaultNode = ({ data, id, selected }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className={`px-4 py-3 rounded-lg shadow-lg bg-gradient-to-br from-blue-900 to-blue-800 text-white ${
        selected ? "ring-2 ring-blue-400 ring-opacity-70" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-400 border-2 border-blue-900"
      />
      <EditableLabel
        id={id}
        label={data.label}
        onChange={data.onLabelChange}
        className="font-medium"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-400 border-2 border-blue-900"
      />
    </motion.div>
  );
};

export default EditableDefaultNode;
