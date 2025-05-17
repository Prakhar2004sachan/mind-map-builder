import React, { useCallback, useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import { useDnD } from "../utils/DnDContext";
import { initialEdges, initialNodes } from "../data/nodesData";
import CustomEdge from "../utils/CustomEdge";
import EditableDefaultNode from "../utils/EditableDefaultNode";
import EditableOutputNode from "../utils/EditableOutputNode";
import EditableInputNode from "../utils/EditableInputNode";
import "@xyflow/react/dist/style.css";
import { useFlowHandlers } from "../utils/hooks/useFlowHandler";

const nodeTypes = {
  inputNode: EditableInputNode,
  defaultNode: EditableDefaultNode,
  outputNode: EditableOutputNode,
};

const edgeTypes = {
  "custom-edge": CustomEdge,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const defaultEdgeOptions = { interactionWidth: 75 };

function FlowCanvas() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, getEdge } = useReactFlow();
  const [setType] = useDnD();

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

  const {
    onConnect,
    onReconnect,
    onReconnectStart,
    onReconnectEnd,
    onNodeDragStop,
    onNodeDrag,
    onNodesDelete,
    onDrop,
  } = useFlowHandlers({
    setEdges,
    setNodes,
    getEdge,
    screenToFlowPosition,
    nodes,
    edges,
  });

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleSave = () => {
    const fileContent = `export const nodes = ${JSON.stringify(
      nodes,
      null,
      2
    )};\nexport const edges = ${JSON.stringify(edges, null, 2)};`;
    const blob = new Blob([fileContent], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const name = prompt("Enter file name (without .js):", "MyFlow");
    if (!name) return;

    a.download = `${name}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={reactFlowWrapper} className="flex-1 relative w-full h-full">
      <button
        className="absolute z-10 right-[100px] top-[30px] bg-[#de1d61] px-4 py-1 text-sm rounded-full"
        onClick={handleSave}
      >
        Save Flow
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onConnect={onConnect}
        onDragStart={onDragStart}
        onDrop={(e) => onDrop(e, getId, handleLabelChange)}
        onDragOver={onDragOver}
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        onNodesDelete={onNodesDelete}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        fitView
        colorMode="dark"
        attributionPosition="top-right"
      >
        <Controls />
        <MiniMap nodeStrokeWidth={2} nodeStrokeColor="white" />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;
