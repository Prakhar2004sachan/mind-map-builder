import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSimpleBezierPath,
  useReactFlow,
} from "@xyflow/react";
import { RxCross2 } from "react-icons/rx";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <RxCross2
          style={{
            color: "black !important",
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan bg-zinc-200 rounded-full p-1 size-4"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        />
      </EdgeLabelRenderer>
    </>
  );
}
