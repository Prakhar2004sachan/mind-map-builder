
export const filterNodesAndEdges = (nodes, edges, collapsedNodes) => {
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

  // DFS to collect visible nodes starting from root nodes (no incoming edges)
  const hasIncomingEdge = new Set(edges.map((edge) => edge.target));
  const rootNodes = nodes.filter((node) => !hasIncomingEdge.has(node.id));

  const dfs = (nodeId) => {
    visibleNodesSet.add(nodeId);
    if (!collapsedNodes.has(nodeId) && childrenMap[nodeId]) {
      childrenMap[nodeId].forEach((childId) => dfs(childId));
    }
  };

  rootNodes.forEach((root) => dfs(root.id));

  // Filter nodes & edges
  const visibleNodes = nodes.filter((node) => visibleNodesSet.has(node.id));
  const visibleEdges = edges.filter(
    (edge) =>
      visibleNodesSet.has(edge.source) && visibleNodesSet.has(edge.target)
  );

  return { visibleNodes, visibleEdges };
};
