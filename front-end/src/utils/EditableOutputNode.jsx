import React from "react";
import { Handle, Position } from "@xyflow/react";
import EditableLabel from "./EditableLable";

const EditableOutputNode = ({ data, id, selected }) => (
  <div
    className={`bg-zinc-800 text-white px-4 py-2 rounded shadow border ${
      selected ? "border-blue-400" : ""
    }`}
  >
    <EditableLabel id={id} label={data.label} onChange={data.onLabelChange} />
    <Handle type="target" position={Position.Top} />
  </div>
);

export default EditableOutputNode;
