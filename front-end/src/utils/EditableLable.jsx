import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Enhanced EditableLabel with animations and improved styling
const EditableLabel = ({
  id,
  label: initialLabel,
  onChange,
  className = "",
}) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(initialLabel);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
    onChange?.(id, label);
  };

  return editing ? (
    <input
      ref={inputRef}
      value={label}
      onChange={(e) => setLabel(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current.blur()}
      className="bg-zinc-800 px-3 py-1 rounded text-white outline-none border border-zinc-600 focus:border-indigo-500 transition-all duration-300 w-full shadow-inner "
    />
  ) : (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`px-3 py-1 cursor-pointer hover:bg-zinc-700 rounded transition-colors ${className}`}
      onClick={() => setEditing(true)}
    >
      {label}
    </motion.div>
  );
};

export default EditableLabel;
