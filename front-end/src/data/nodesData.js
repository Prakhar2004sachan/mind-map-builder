// Nodes
export const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Operating System" } },

  {
    id: "2",
    position: { x: -300, y: 100 },
    data: { label: "Process Management" },
  },
  { id: "3", position: { x: 0, y: 100 }, data: { label: "Memory Management" } },
  { id: "4", position: { x: 300, y: 100 }, data: { label: "File System" } },
  { id: "5", position: { x: -300, y: 220 }, data: { label: "Scheduling" } },
  {
    id: "6",
    position: { x: -150, y: 220 },
    data: { label: "Inter-process Communication" },
  },
  { id: "7", position: { x: 0, y: 220 }, data: { label: "Virtual Memory" } },
  {
    id: "8",
    position: { x: 150, y: 220 },
    data: { label: "Paging & Segmentation" },
  },
  {
    id: "9",
    position: { x: 300, y: 220 },
    data: { label: "Directory Structure" },
  },
  {
    id: "10",
    position: { x: 450, y: 220 },
    data: { label: "File Allocation" },
  },
  {
    id: "11",
    position: { x: 0, y: 350 },
    data: { label: "Security & Protection" },
  },
  {
    id: "12",
    position: { x: 300, y: 350 },
    data: { label: "Device Management" },
  },
];

// Edges
export const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e1-4", source: "1", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e2-6", source: "2", target: "6" },
  { id: "e3-7", source: "3", target: "7" },
  { id: "e3-8", source: "3", target: "8" },
  { id: "e4-9", source: "4", target: "9" },
  { id: "e4-10", source: "4", target: "10" },
  { id: "e1-11", source: "1", target: "11" },
  { id: "e1-12", source: "1", target: "12" },
];