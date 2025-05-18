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
      const isCollapsed = newCollapsedNodes.has(nodeId);

      const updatedNodes = state.nodes.map((node) => {
        if (node.parentNode === nodeId) {
          return {
            ...node,
            hidden: !isCollapsed, // hide children if collapsing
          };
        }
        return node;
      });

      if (isCollapsed) {
        newCollapsedNodes.delete(nodeId);
      } else {
        newCollapsedNodes.add(nodeId);
      }

      return {
        collapsedNodes: newCollapsedNodes,
        nodes: updatedNodes,
      };
    });
  },

  addNode: (nodeData) => {
    const currentNodes = Array.isArray(get().nodes) ? get().nodes : [];
    set({
      nodes: [...currentNodes, nodeData],
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

  updateNodeLabel: (id, newLabel) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      ),
    }));
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
