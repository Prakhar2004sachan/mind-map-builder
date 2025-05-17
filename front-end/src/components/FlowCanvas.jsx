import React, { useCallback,  useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SelectionMode,
  useReactFlow,
  reconnectEdge,
} from "@xyflow/react";
import { initialEdges, initialNodes } from "../data/nodesData";

import "@xyflow/react/dist/style.css";
import CustomEdge from "../utils/CustomEdge";
// import EditableNode from "../utils/EditableNode";
import { useDnD } from "../utils/DnDContext";
import EditableDefaultNode from "../utils/EditableDefaultNode";
import EditableOutputNode from "../utils/EditableOutputNode";
import EditableInputNode from "../utils/EditableInputNode";

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

function FlowCanvas() {
    const edgeReconnectSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, []);

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

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("text/plain", nodeType);
    event.dataTransfer.effectAllowed = "move";
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
      console.log(newNode);

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, type]
  );

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="flex-1"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        colorMode="dark"
        fitView
        // style={{ background: "#121212" }}
      >
        <Controls />
        <MiniMap nodeStrokeWidth={2} nodeStrokeColor={"white"} />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;
