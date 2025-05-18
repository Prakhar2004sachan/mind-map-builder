import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { create } from "zustand";

export const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  collapsedNodes: new Set(),

  setNodes: (nodes) => {
    if (typeof nodes === "function") {
      set((state) => ({
        nodes: nodes(state.nodes),
      }));
    } else if (Array.isArray(nodes)) {
      set({ nodes });
    } else {
      console.error("❌ setNodes was called with non-array:", nodes);
    }
  },

  setEdges: (edges) => {
    if (typeof edges === "function") {
      set((state) => ({
        edges: edges(state.edges),
      }));
    } else if (Array.isArray(edges)) {
      set({ edges });
    } else {
      console.error("❌ setEdges was called with non-array:", edges);
    }
  },

  onNodesChange: (changes) =>
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    }),

  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),

  onConnect: (connection) => {
    console.log("Connecting:", connection);
    set({
      edges: addEdge({ ...connection, type: "custom-edge" }, get().edges),
    });
  },

  toggleNodeCollapse: (nodeId) => {
    set((state) => {
      const newCollapsedNodes = new Set(state.collapsedNodes);
      if (newCollapsedNodes.has(nodeId)) {
        newCollapsedNodes.delete(nodeId);
      } else {
        newCollapsedNodes.add(nodeId);
      }
      return { collapsedNodes: newCollapsedNodes };
    });
  },

  updateNodeLabel: (nodeId, newLabel) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                label: newLabel,
                onLabelChange: (id, label) => get().updateNodeLabel(id, label),
              },
            }
          : node
      ),
    });
  },

  addNode: (nodeData) => {
    const currentNodes = Array.isArray(get().nodes) ? get().nodes : [];
    set({
      nodes: [...currentNodes, nodeData],
    });
  },

  // Key fix: Implementing edge update handler properly
  onEdgeUpdate: (oldEdge, newConnection) => {
    console.log("Updating edge:", oldEdge, "to", newConnection);

    set((state) => {
      // Find the edge to update
      const edgeIndex = state.edges.findIndex((e) => e.id === oldEdge.id);

      if (edgeIndex === -1) {
        console.error("Edge not found:", oldEdge.id);
        return state;
      }

      // Create a new array with the updated edge
      const newEdges = [...state.edges];
      newEdges[edgeIndex] = {
        ...oldEdge,
        source: newConnection.source || oldEdge.source,
        target: newConnection.target || oldEdge.target,
        sourceHandle: newConnection.sourceHandle || oldEdge.sourceHandle,
        targetHandle: newConnection.targetHandle || oldEdge.targetHandle,
      };

      return { edges: newEdges };
    });
  },

  resetFlow: () => {
    set({ nodes: [], edges: [], collapsedNodes: new Set() });
  },

  saveToFile: (fileName = "flow-data") => {
    const { nodes, edges } = get();
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  loadFromFile: async (file) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed.nodes || !parsed.edges) {
        throw new Error("Invalid JSON format");
      }
      set({ nodes: parsed.nodes, edges: parsed.edges });
    } catch (err) {
      console.error("Error loading file:", err);
      alert("Failed to load file. Please upload a valid flow JSON.");
    }
  },
  toggleAllNodeCollapse: () => {
    set((state) => {
      const newCollapsedNodes = new Set();

      const allCollapsed = state.nodes.every((node) =>
        state.collapsedNodes.has(node.id)
      );

      if (!allCollapsed) {
        state.nodes.forEach((node) => newCollapsedNodes.add(node.id));
      }


      return { collapsedNodes: newCollapsedNodes };
    });
  },
}));
