import React, { useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useReactFlow,
  reconnectEdge,
} from "@xyflow/react";
import { useDnD } from "../utils/DnDContext";
import { initialEdges, initialNodes } from "../data/nodesData";
import CustomEdge from "../utils/CustomEdge";
import EditableDefaultNode from "../utils/EditableDefaultNode";
import EditableOutputNode from "../utils/EditableOutputNode";
import EditableInputNode from "../utils/EditableInputNode";
import "@xyflow/react/dist/style.css";
import { useFlowHandlers } from "../utils/hooks/useFlowHandler";
import { filterNodesAndEdges } from "../utils/filterNodesAndEdges";
import { useFlowStore } from "../utils/store/flowStore";

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
  const { screenToFlowPosition, getEdge, } = useReactFlow();
  const [_,setType] = useDnD();
  
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeLabel,
    saveToFile,
    collapsedNodes,
    toggleNodeCollapse,
  } = useFlowStore(  );

  
  
  const onNodeClick = (event, node) => {
    toggleNodeCollapse(node.id);
  };
  
  const { visibleNodes, visibleEdges } = filterNodesAndEdges(
    nodes,
    edges,
    collapsedNodes
  );

  useEffect(() => {
    if (nodes.length === 0) {
      setNodes(initialNodes);
    }
    if (edges.length === 0) {
      setEdges(initialEdges);
    }
  }, [nodes.length, edges.length, setNodes, setEdges]);
  
  const handleLabelChange = (id, newLabel) => {
    updateNodeLabel(id, newLabel);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: nodeType,
        position,
        data: {
          label: "Double click to edit",
          onLabelChange: handleLabelChange,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition]
  );

  const {
    onNodeDrag,
    onNodesDelete,
    handleDragOver,
    handleDragStart,
    onNodeDragStop,
  } = useFlowHandlers({
    setEdges,
    setNodes,
    getEdge,
    screenToFlowPosition,
    nodes,
    edges,
  });

  const onReconnect = useCallback(
    (oldEdge, newConnection) => {
      console.log("Reconnecting Edge:", oldEdge, "->", newConnection);

      setEdges((currentEdges) =>
        currentEdges.map((edge) => {
          if (edge.id === oldEdge.id) {
            const updatedEdge = {
              ...edge,
              source: newConnection.source || edge.source,
              target: newConnection.target || edge.target,
              sourceHandle: newConnection.sourceHandle || edge.sourceHandle,
              targetHandle: newConnection.targetHandle || edge.targetHandle,
            };

            // Ensure unique ID for the edge based on both source and target
            updatedEdge.id = `${updatedEdge.source}->${updatedEdge.target}`;
            return updatedEdge;
          }
          return edge;
        })
      );
    },
    [setEdges]
  );

 


  return (
    <div ref={reactFlowWrapper} className="flex-1 relative w-full h-full">
      <button
        className="absolute z-10 right-[100px] top-[30px] bg-[#de1d61] px-4 py-1 text-sm rounded-full"
        onClick={saveToFile}
      >
        Save Flow
      </button>
      <ReactFlow
        nodes={visibleNodes}
        edges={visibleEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onConnect={onConnect}
        onDragStart={handleDragStart}
        onDrop={(e) => onDrop(e, getId, handleLabelChange)}
        onDragOver={handleDragOver}
        onReconnect={onReconnect}
        onNodesDelete={onNodesDelete}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        fitView
        colorMode="dark"
        attributionPosition="top-right"
      >
        <Controls />
        <MiniMap nodeStrokeWidth={2} nodeStrokeColor="white" />
        <Background variant="dots" gap={12} size={.5} />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;
