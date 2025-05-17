import React, { useState, useEffect, useRef } from "react";

const EditableLabel = ({ id, label: initialLabel, onChange }) => {
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
      className="bg-zinc-700 px-2 py-1 rounded text-white outline-none w-full"
    />
  ) : (
    <p onDoubleClick={() => setEditing(true)}>{label}</p>
  );
};

export default EditableLabel;
