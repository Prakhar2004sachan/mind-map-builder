// Nodes
export const initialNodes = [
  {
    id: "1",
    type: "defaultNode",
    position: { x: 0, y: 0 },
    data: { label: "Operating System" },
  },

  // Level 1 Subsystems
  {
    id: "2",
    type: "defaultNode",
    position: { x: -400, y: 100 },
    data: { label: "Process Management" },
  },
  {
    id: "3",
    type: "defaultNode",
    position: { x: 0, y: 100 },
    data: { label: "Memory Management" },
  },
  {
    id: "4",
    type: "defaultNode",
    position: { x: 400, y: 100 },
    data: { label: "File System" },
  },
  {
    id: "5",
    type: "defaultNode",
    position: { x: 800, y: 100 },
    data: { label: "Security & Protection" },
  },

  // Level 2 under Process Management
  {
    id: "6",
    type: "defaultNode",
    position: { x: -550, y: 220 },
    data: { label: "Scheduling Algorithms" },
  },
  {
    id: "7",
    type: "defaultNode",
    position: { x: -400, y: 220 },
    data: { label: "Inter-process Communication (IPC)" },
  },
  {
    id: "8",
    type: "defaultNode",
    position: { x: -250, y: 220 },
    data: { label: "Process Synchronization" },
  },

  // Level 3 under Scheduling Algorithms
  {
    id: "9",
    type: "defaultNode",
    position: { x: -600, y: 340 },
    data: { label: "FCFS (First Come First Serve)" },
  },
  {
    id: "10",
    type: "defaultNode",
    position: { x: -500, y: 340 },
    data: { label: "Round Robin" },
  },
  {
    id: "11",
    type: "defaultNode",
    position: { x: -400, y: 340 },
    data: { label: "Priority Scheduling" },
  },

  // Level 2 under Memory Management
  {
    id: "12",
    type: "defaultNode",
    position: { x: -150, y: 220 },
    data: { label: "Virtual Memory" },
  },
  {
    id: "13",
    type: "defaultNode",
    position: { x: 0, y: 220 },
    data: { label: "Paging & Segmentation" },
  },
  {
    id: "14",
    type: "defaultNode",
    position: { x: 150, y: 220 },
    data: { label: "Memory Allocation" },
  },

  // Level 3 under Virtual Memory
  {
    id: "15",
    type: "defaultNode",
    position: { x: -200, y: 340 },
    data: { label: "Page Replacement Algorithms" },
  },
  {
    id: "16",
    type: "defaultNode",
    position: { x: -150, y: 340 },
    data: { label: "Thrashing" },
  },

  // Level 2 under File System
  {
    id: "17",
    type: "defaultNode",
    position: { x: 250, y: 220 },
    data: { label: "Directory Structure" },
  },
  {
    id: "18",
    type: "defaultNode",
    position: { x: 400, y: 220 },
    data: { label: "File Allocation Methods" },
  },
  {
    id: "19",
    type: "defaultNode",
    position: { x: 550, y: 220 },
    data: { label: "File Access Methods" },
  },

  // Level 3 under Directory Structure
  {
    id: "20",
    type: "defaultNode",
    position: { x: 200, y: 340 },
    data: { label: "Single-Level Directory" },
  },
  {
    id: "21",
    type: "defaultNode",
    position: { x: 300, y: 340 },
    data: { label: "Two-Level Directory" },
  },
  {
    id: "22",
    type: "defaultNode",
    position: { x: 400, y: 340 },
    data: { label: "Hierarchical Directory" },
  },

  // Level 2 under Security & Protection
  {
    id: "23",
    type: "defaultNode",
    position: { x: 800, y: 220 },
    data: { label: "Authentication" },
  },
  {
    id: "24",
    type: "defaultNode",
    position: { x: 900, y: 220 },
    data: { label: "Authorization" },
  },
  {
    id: "25",
    type: "defaultNode",
    position: { x: 1000, y: 220 },
    data: { label: "Encryption" },
  },
];

// Edges
export const initialEdges = [
  // Root to level 1
  { id: "e1-2", type: "custom-edge", source: "1", target: "2" },
  { id: "e1-3", type: "custom-edge", source: "1", target: "3" },
  { id: "e1-4", type: "custom-edge", source: "1", target: "4" },
  { id: "e1-5", type: "custom-edge", source: "1", target: "5" },

  // Process Management to level 2
  { id: "e2-6", type: "custom-edge", source: "2", target: "6" },
  { id: "e2-7", type: "custom-edge", source: "2", target: "7" },
  { id: "e2-8", type: "custom-edge", source: "2", target: "8" },

  // Scheduling Algorithms to level 3
  { id: "e6-9", type: "custom-edge", source: "6", target: "9" },
  { id: "e6-10", type: "custom-edge", source: "6", target: "10" },
  { id: "e6-11", type: "custom-edge", source: "6", target: "11" },

  // Memory Management to level 2
  { id: "e3-12", type: "custom-edge", source: "3", target: "12" },
  { id: "e3-13", type: "custom-edge", source: "3", target: "13" },
  { id: "e3-14", type: "custom-edge", source: "3", target: "14" },

  // Virtual Memory to level 3
  { id: "e12-15", type: "custom-edge", source: "12", target: "15" },
  { id: "e12-16", type: "custom-edge", source: "12", target: "16" },

  // File System to level 2
  { id: "e4-17", type: "custom-edge", source: "4", target: "17" },
  { id: "e4-18", type: "custom-edge", source: "4", target: "18" },
  { id: "e4-19", type: "custom-edge", source: "4", target: "19" },

  // Directory Structure to level 3
  { id: "e17-20", type: "custom-edge", source: "17", target: "20" },
  { id: "e17-21", type: "custom-edge", source: "17", target: "21" },
  { id: "e17-22", type: "custom-edge", source: "17", target: "22" },

  // Security & Protection to level 2
  { id: "e5-23", type: "custom-edge", source: "5", target: "23" },
  { id: "e5-24", type: "custom-edge", source: "5", target: "24" },
  { id: "e5-25", type: "custom-edge", source: "5", target: "25" },
];
