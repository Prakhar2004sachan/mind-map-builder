import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { create } from "zustand";
export const useFlowStore = create((set, get) => ({
  // Node state
  nodes: [],
  edges: [],

  // Flow operations
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  // Node changes
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // Edge changes
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  // Connection changes
  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, type: "custom-edge" }, get().edges),
    });
  },

  // Update node label
  updateNodeLabel: (nodeId, newLabel) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                label: newLabel,
              },
            }
          : node
      ),
    });
  },

  // Add new node
  addNode: (nodeData) => {
    set({
      nodes: [...get().nodes, nodeData],
    });
  },
  saveToFile: () => {
    const { nodes, edges } = get();
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "flow-data.json";
    a.click();

    URL.revokeObjectURL(url);
  },

  loadFromFile: async (file) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      console.log("Parsed File Content:", parsed);

      if (!parsed.nodes || !parsed.edges) throw new Error("Invalid JSON");

      set({ nodes: parsed.nodes, edges: parsed.edges });
    } catch (err) {
      console.error("Error loading file:", err);
      alert("Failed to load file. Please upload a valid flow JSON.");
    }
  },
}));
  