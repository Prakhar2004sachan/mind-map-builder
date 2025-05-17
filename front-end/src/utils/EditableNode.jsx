import React, { useState, useRef, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

function EditableNode({ data, id, selected }) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleDoubleClick = () => setEditing(true);

  const handleBlur = () => {
    setEditing(false);
    data.onLabelChange(id, label);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") inputRef.current.blur();
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`bg-zinc-800 text-white px-4 py-2 rounded shadow-lg border ${
        selected ? "border-blue-400" : null
      }`}
    >
      {editing ? (
        <input
          ref={inputRef}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-zinc-700 px-2 py-1 rounded text-white outline-none"
        />
      ) : (
        <p>{label}</p>
      )}

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default EditableNode;
