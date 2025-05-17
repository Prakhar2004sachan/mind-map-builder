import React from "react";
import { Handle, Position } from "@xyflow/react";
import EditableLabel from "./EditableLable";

const EditableInputNode = ({ data, id, selected }) => (
  <div
    className={`bg-zinc-800 text-white px-4 py-2 rounded shadow border ${
      selected ? "border-blue-400" : ""
    }`}
  >
    <EditableLabel id={id} label={data.label} onChange={data.onLabelChange} />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </div>
);

export default EditableInputNode;
