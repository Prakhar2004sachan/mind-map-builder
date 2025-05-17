/**
 * Export React Flow structure
 */
export const initialNodes = [
  {
    id: "1",
    type: "defaultNode",
    position: {
      x: 374.5820742438059,
      y: -1245.6003694966707,
    },
    data: {
      label: "Operating System",
    },
    measured: {
      width: 160,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "4",
    type: "defaultNode",
    position: {
      x: 1250,
      y: -422,
    },
    data: {
      label: "File System",
    },
    measured: {
      width: 112,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "5",
    type: "defaultNode",
    position: {
      x: 1834.921901299822,
      y: -658.5947934199882,
    },
    data: {
      label: "Security & Protection",
    },
    measured: {
      width: 184,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "14",
    type: "defaultNode",
    position: {
      x: 154,
      y: -354,
    },
    data: {
      label: "Memory Allocation",
    },
    measured: {
      width: 168,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "17",
    type: "defaultNode",
    position: {
      x: 1000,
      y: -210,
    },
    data: {
      label: "Directory Structure",
    },
    measured: {
      width: 167,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "18",
    type: "defaultNode",
    position: {
      x: 1232,
      y: -208,
    },
    data: {
      label: "File Allocation Methods",
    },
    measured: {
      width: 200,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "19",
    type: "defaultNode",
    position: {
      x: 1484,
      y: -212,
    },
    data: {
      label: "File Access Methods",
    },
    measured: {
      width: 177,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "20",
    type: "defaultNode",
    position: {
      x: 660,
      y: 220,
    },
    data: {
      label: "Single-Level Directory",
    },
    measured: {
      width: 188,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "21",
    type: "defaultNode",
    position: {
      x: 990,
      y: 244,
    },
    data: {
      label: "Two-Level Directory",
    },
    measured: {
      width: 174,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "22",
    type: "defaultNode",
    position: {
      x: 1336,
      y: 280,
    },
    data: {
      label: "Hierarchical Directory",
    },
    measured: {
      width: 186,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "23",
    type: "defaultNode",
    position: {
      x: 1592.7845227657622,
      y: -445.286076889057,
    },
    data: {
      label: "Authentication",
    },
    measured: {
      width: 138,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "24",
    type: "defaultNode",
    position: {
      x: 1868.5353710803083,
      y: -438.3938867590748,
    },
    data: {
      label: "Authorization",
    },
    measured: {
      width: 130,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "25",
    type: "defaultNode",
    position: {
      x: 2202.869835499703,
      y: -436.09649004908067,
    },
    data: {
      label: "Encryption",
    },
    measured: {
      width: 109,
      height: 42,
    },
    selected: false,
    dragging: false,
  },
];
export const initialEdges = [
  {
    id: "e1-4",
    type: "custom-edge",
    source: "1",
    target: "4",
    selected: false,
  },
  {
    id: "e1-5",
    type: "custom-edge",
    source: "1",
    target: "5",
    selected: false,
  },
  {
    id: "e4-17",
    type: "custom-edge",
    source: "4",
    target: "17",
    selected: false,
  },
  {
    id: "e4-18",
    type: "custom-edge",
    source: "4",
    target: "18",
    selected: false,
  },
  {
    id: "e4-19",
    type: "custom-edge",
    source: "4",
    target: "19",
    selected: false,
  },
  {
    id: "e17-20",
    type: "custom-edge",
    source: "17",
    target: "20",
    selected: false,
  },
  {
    id: "e17-21",
    type: "custom-edge",
    source: "17",
    target: "21",
    selected: false,
  },
  {
    id: "e17-22",
    type: "custom-edge",
    source: "17",
    target: "22",
    selected: false,
  },
  {
    id: "e5-23",
    type: "custom-edge",
    source: "5",
    target: "23",
    selected: false,
  },
  {
    id: "e5-24",
    type: "custom-edge",
    source: "5",
    target: "24",
    selected: false,
  },
  {
    id: "e5-25",
    type: "custom-edge",
    source: "5",
    target: "25",
    selected: false,
  },
  {
    id: "1->6",
    source: "1",
    target: "6",
    type: "custom-edge",
  },
  {
    id: "1->7",
    source: "1",
    target: "7",
    type: "custom-edge",
  },
  {
    id: "1->8",
    source: "1",
    target: "8",
    type: "custom-edge",
  },
  {
    id: "1->12",
    source: "1",
    target: "12",
    type: "custom-edge",
  },
  {
    id: "1->13",
    source: "1",
    target: "13",
    type: "custom-edge",
  },
  {
    id: "1->14",
    source: "1",
    target: "14",
    type: "custom-edge",
  },
  {
    id: "3->15",
    source: "3",
    target: "15",
    type: "custom-edge",
  },
  {
    id: "3->16",
    source: "3",
    target: "16",
    type: "custom-edge",
  },
];
