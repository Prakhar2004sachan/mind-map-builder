import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SelectionMode,
} from "@xyflow/react";
import { initialEdges,initialNodes } from "../data/nodesData";

import "@xyflow/react/dist/style.css";
import CustomEdge from "../utils/CustomEdge";
import EditableNode from "../utils/EditableNode";

const nodeTypes = {
    editable: EditableNode,
}
const edgeTypes = {
  "custom-edge": CustomEdge,
};
const panOnDrag = [1, 2];


function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const handleLabelChange = (id, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label: newLabel,
                onLabelChange: handleLabelChange,
              },
            }
          : node
      )
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        panOnScroll
        selectionOnDrag
        panOnDrag={panOnDrag}
        selectionMode={SelectionMode.Partial}
        colorMode="dark"
        fitView
        // style={{ background: "#121212" }}
      >
        <Controls />
        <MiniMap
          nodeStrokeWidth={2}
          nodeStrokeColor={"white"}
        />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;
