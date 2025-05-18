export const filterNodesAndEdges = (nodes, edges, collapsedNodes) => {
  if (!Array.isArray(nodes)) {
    console.error("❌ 'nodes' is not an array:", nodes);
    return { visibleNodes: [], visibleEdges: [] };
  }

  const buildChildrenMap = (edges) => {
    const map = {};
    edges.forEach(({ source, target }) => {
      if (!map[source]) map[source] = [];
      map[source].push(target);
    });
    return map;
  };

  const childrenMap = buildChildrenMap(edges);
  const visibleNodesSet = new Set();
  const endNodesSet = new Set(nodes.map((node) => node.id)); // Initially assume all are end nodes

  edges.forEach(({ source, target }) => {
    endNodesSet.delete(source); // If a node has an outgoing edge, it's not an end node
  });

  const hasIncomingEdge = new Set(edges.map((edge) => edge.target));
  const rootNodes = nodes.filter((node) => !hasIncomingEdge.has(node.id));

  const dfs = (nodeId) => {
    visibleNodesSet.add(nodeId);

    if (!collapsedNodes.has(nodeId) && childrenMap[nodeId]) {
      childrenMap[nodeId].forEach((childId) => dfs(childId));
    }
  };

  rootNodes.forEach((root) => dfs(root.id));

  const visibleNodes = nodes
    .map((node) => {
      const isVisible = visibleNodesSet.has(node.id);
      const isEndNode = endNodesSet.has(node.id);

      if (isVisible && isEndNode) {
        return {
          ...node,
          style: {
            border: "2px solid red",
            borderRadius: "8px",
            boxShadow: "2px 8px 15px rgba(255, 0, 0, 0.2)",
          },
        };
      }
      return node;
    })
    .filter((node) => visibleNodesSet.has(node.id)); // Filter after applying style

  const visibleEdges = edges.filter(
    (edge) =>
      visibleNodesSet.has(edge.source) && visibleNodesSet.has(edge.target)
  );

  return { visibleNodes, visibleEdges };
};
