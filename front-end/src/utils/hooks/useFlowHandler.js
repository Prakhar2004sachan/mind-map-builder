import { useCallback, useRef } from "react";
import { useFlowStore } from "../store/flowStore";
import { useDnD } from "../DnDContext";
import { getConnectedEdges, getIncomers, getOutgoers, useReactFlow } from "@xyflow/react";

export const useFlowHandlers = () => {
  const [_, setType] = useDnD();
  const overlappedEdgeRef = useRef(null);

  const { nodes, edges, setEdges,setNodes, onConnect, onReconnect, addNode } =
    useFlowStore();
    const { updateEdge, getEdge, addEdges } = useReactFlow();

    const onNodeDragStop = useCallback(
      (event, node) => {
        const edgeId = overlappedEdgeRef.current;
        if (!edgeId) return;
        const edge = getEdge(edgeId);
        if (!edge) return;

        updateEdge(edgeId, { source: edge.source, target: node.id, style: {} });

        addEdges({
          id: `${node.id}->${edge.target}`,
          type: "custom-edge",
          source: node.id,
          target: edge.target,
        });

        overlappedEdgeRef.current = null;
      },
      [getEdge, addEdges, updateEdge]
    );

    const onNodeDrag= useCallback(
      (e, node) => {
        const nodeDiv = document.querySelector(
          `.react-flow__node[data-id=${node.id}]`
        );

        if (!nodeDiv) return;

        const rect = nodeDiv.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const edgeFound = document
          .elementsFromPoint(centerX, centerY)
          .find((el) =>
            el.classList.contains("react-flow__edge-interaction")
          )?.parentElement;

        const edgeId = edgeFound?.dataset.id;

        if (edgeId) updateEdge(edgeId, { style: { stroke: "black" } });
        else if (overlappedEdgeRef.current)
          updateEdge(overlappedEdgeRef.current, { style: {} });

        overlappedEdgeRef.current = edgeId || null;
      },
      [updateEdge]
    );

  const handleDrop = useCallback(
    (event, getId) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = { x: event.clientX, y: event.clientY };
      addNode({
        id: getId(),
        type,
        position,
        data: { label: "New Node" },
      });
    },
    [addNode]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

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
              type: "custom-edge",
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );


  return {
    onConnect,
    onReconnect,
    handleDrop,
    handleDragOver,
    handleDragStart,
    onNodesDelete,
    onNodeDragStop,
    onNodeDrag
  };
};
