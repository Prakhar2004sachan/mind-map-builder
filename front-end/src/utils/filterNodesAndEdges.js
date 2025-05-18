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
  const nonEndNodesSet = new Set(); // Nodes that have outgoing edges

  edges.forEach(({ source }) => {
    nonEndNodesSet.add(source); // Nodes with outgoing edges are not end nodes
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
      const isNonEndNode = nonEndNodesSet.has(node.id);

      return {
        ...node,
        data: {
          ...node.data,
          hasNotification: isVisible && isNonEndNode,
        },
      };
    })
    .filter((node) => visibleNodesSet.has(node.id));

  const visibleEdges = edges.filter(
    (edge) =>
      visibleNodesSet.has(edge.source) && visibleNodesSet.has(edge.target)
  );

  return { visibleNodes, visibleEdges };
};
