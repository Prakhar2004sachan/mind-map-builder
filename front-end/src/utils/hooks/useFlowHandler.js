import { useCallback, useRef } from "react";
import {
  addEdge,
  reconnectEdge,
  getConnectedEdges,
  getOutgoers,
  getIncomers,
} from "@xyflow/react";
import { useDnD } from "../DnDContext";

export const useFlowHandlers = ({
  setEdges,
  setNodes,
  getEdge,
  screenToFlowPosition,
  nodes,
  edges,
}) => {
  const [_, setType] = useDnD();
  const edgeReconnectSuccessful = useRef(true);
  const overlappedEdgeRef = useRef(null);

  const onConnect = (connection) => {
    setEdges((eds) => addEdge({ ...connection, type: "custom-edge" }, eds));

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === connection.target) {
          return {
            ...node,
            data: {
              ...node.data,
              parent: connection.source,
            },
          };
        }
        return node;
      })
    );
      
  };

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

  const onNodeDrag = useCallback(
    (e, node) => {
      const nodeDiv = document.querySelector(
        `.react-flow__node[data-id="${node.id}"]`
      );
      if (!nodeDiv) return;

      const { left, top, width, height } = nodeDiv.getBoundingClientRect();
      const [centerX, centerY] = [left + width / 2, top + height / 2];
      const edgeId = document
        .elementsFromPoint(centerX, centerY)
        ?.find((el) => el.classList.contains("react-flow__edge-interaction"))
        ?.closest(".react-flow__edge")?.dataset?.id;

      if (edgeId) {
        getEdge(edgeId) &&
          setEdges((eds) =>
            eds.map((edge) =>
              edge.id === edgeId
                ? { ...edge, style: { stroke: "black" } }
                : edge
            )
          );
      } else if (overlappedEdgeRef.current) {
        setEdges((eds) =>
          eds.map((edge) =>
            edge.id === overlappedEdgeRef.current
              ? { ...edge, style: {} }
              : edge
          )
        );
      }

      overlappedEdgeRef.current = edgeId || null;
    },
    [getEdge, setEdges]
  );

  const onNodeDragStop = useCallback(
    (_, node) => {
      const edgeId = overlappedEdgeRef.current;
      const edge = getEdge(edgeId);

      if (!edge) return;

      setEdges((eds) => [
        ...eds.filter((e) => e.id !== edgeId),
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
      ]);
      overlappedEdgeRef.current = null;
    },
    [getEdge, setEdges]
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((e) => !connectedEdges.includes(e));
          const newEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
              type: "custom-edge",
            }))
          );
          return [...remainingEdges, ...newEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  const onDrop = useCallback(
    (event, getId, handleLabelChange) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setNodes((nds) => [
        ...nds,
        {
          id: getId(),
          type,
          position,
          data: {
            label: "Double click to edit",
            onLabelChange: handleLabelChange,
          },
        },
      ]);
    },
    [screenToFlowPosition, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return {
    onConnect,
    onReconnect,
    onReconnectStart,
    onReconnectEnd,
    onNodeDragStop,
    onNodeDrag,
    onNodesDelete,
    onDrop,
    onDragOver,
    onDragStart,
  };
};
