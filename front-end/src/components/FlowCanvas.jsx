import React, { useCallback, useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  reconnectEdge,
  getConnectedEdges,
  getOutgoers,
  getIncomers,
} from "@xyflow/react";

import { initialEdges, initialNodes } from "../data/nodesData";
import CustomEdge from "../utils/CustomEdge";
import { useDnD } from "../utils/DnDContext";
import EditableDefaultNode from "../utils/EditableDefaultNode";
import EditableOutputNode from "../utils/EditableOutputNode";
import EditableInputNode from "../utils/EditableInputNode";

import "@xyflow/react/dist/style.css";

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

const defaultEdgeOptions = {
  interactionWidth: 75,
};

function FlowCanvas() {
  const edgeReconnectSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialEdges);
  const { screenToFlowPosition, updateEdge, getEdge } =
    useReactFlow();
  const [setType] = useDnD();

  const overlappedEdgeRef = useRef(null);

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const onNodeDragStop = useCallback(
    (event, node) => {
      const edgeId = overlappedEdgeRef.current;
      if (!edgeId) return;

      const edge = getEdge(edgeId);
      if (!edge) return;

      // Remove old edge
      setEdges((eds) => eds.filter((e) => e.id !== edgeId));

      // Add new edges
      const newEdges = [
        {
          id: `${edge.source}->${node.id}`,
          source: edge.source,
          target: node.id,
          type: "custom-edge",
        },
        {
          id: `${node.id}->${edge.target}`,
          source: node.id,
          target: edge.target,
          type: "custom-edge",
        },
      ];

      setEdges((eds) => [...eds, ...newEdges]);
      overlappedEdgeRef.current = null;
    },
    [getEdge, setEdges]
  );

  const onNodeDrag = useCallback(
    (e, node) => {
      const nodeDiv = document.querySelector(
        `.react-flow__node[data-id="${node.id}"]`
      );
      if (!nodeDiv) return;

      const rect = nodeDiv.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const edgeElement = document
        .elementsFromPoint(centerX, centerY)
        .find((el) => el.classList.contains("react-flow__edge-interaction"));

      const edgeWrapper = edgeElement?.closest(".react-flow__edge");
      const edgeId = edgeWrapper?.dataset.id;

      if (edgeId) {
        updateEdge(edgeId, { style: { stroke: "black" } });
      } else if (overlappedEdgeRef.current) {
        updateEdge(overlappedEdgeRef.current, { style: {} });
      }

      overlappedEdgeRef.current = edgeId || null;
    },
    [updateEdge]
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
    event.dataTransfer.setData("application/reactflow", nodeType);
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

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition]
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
              type: "custom-edge",
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
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
        onNodesDelete={onNodesDelete}
        onNodeDragStop={onNodeDragStop}
        onNodeDrag={onNodeDrag}
        defaultEdgeOptions={defaultEdgeOptions}
        colorMode="dark"
        fitView
      >
        <Controls />
        <MiniMap nodeStrokeWidth={2} nodeStrokeColor="white" />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;
