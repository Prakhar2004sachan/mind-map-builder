import React from "react";
import { motion } from "framer-motion";
import { useDnD } from "../utils/DnDContext";
import NodeButton from "../ui/NodeButton";
import { useFlowStore } from "../utils/store/flowStore";

function Tools() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 24 },
    },
  };

  const nodes = [
    {
      label: "Input Node",
      buttonType: "inputNode",
      nodeClasses: "-bottom-1 left-1/2 -translate-x-1/2",
      description: "Use this node as a starting point for your flow",
      color: "#10b981",
    },
    {
      label: "Default Node",
      buttonType: "defaultNode",
      nodeClasses: "-bottom-1 left-1/2 -translate-x-1/2",
      description: "Standard node with input and output connectors",
      color: "#6366f1",
    },
    {
      label: "Output Node",
      buttonType: "outputNode",
      nodeClasses: "-top-1 left-1/2 -translate-x-1/2",
      description: "Use this node as an endpoint in your flow",
      color: "#8E24AA",
    },
  ];

  return (
    <motion.div
      className="flex flex-col gap-4 mt-5 h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p className="text-zinc-400 text-sm mb-2" variants={itemVariants}>
        Drag and drop nodes onto the canvas to build your flow
      </motion.p>

      {nodes.map((node, index) => (
        <motion.div
          key={index}
          className="relative"
          variants={itemVariants}
          whileHover={{ scale: 1 }}
          draggable={true}
          whileTap={{ scale: 0.95 }}
          onDragStart={(event) => onDragStart(event, node.buttonType)}
        >
          <div className="border border-zinc-700 bg-zinc-800/50 p-4 rounded-lg hover:border-zinc-600 transition-all duration-300 cursor-grab active:cursor-grabbing">
            <div className="flex items-center mb-2">
              <span
                className="h-3 w-3 rounded-full mr-2"
                style={{ backgroundColor: node.color }}
              />
              <h3 className="font-medium text-white">{node.label}</h3>
            </div>
            <p className="text-zinc-400 text-sm">{node.description}</p>

            <div className="relative h-10 mt-4 bg-zinc-900/50 rounded border border-zinc-700 flex items-center justify-center text-xs text-zinc-500">
              Drag me to canvas
              <motion.div
                className="absolute z-10 w-full"
                initial={{ x: -100 }}
                animate={{ x: 100 }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
              >
                <div className="h-px w-10 bg-gradient-to-r from-transparent via-zinc-400 to-transparent opacity-30" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.button
        className="bg-zinc-700 text-white py-2 px-4 rounded hover:bg-zinc-600 transition-all rounded-2xl"
        onClick={() => useFlowStore.getState().toggleAllNodeCollapse()}
        variants={itemVariants}
      >
        Toggle Collapse All
      </motion.button>

      <motion.div
        className=" p-4 bg-zinc-800/30 rounded-lg border border-zinc-700 text-sm text-zinc-400"
        variants={itemVariants}
      >
        <h4 className="font-medium text-zinc-300 mb-2">Pro Tips:</h4>
        <ul className="list-disc pl-4 space-y-2">
          <li>Double-click node labels to edit them</li>
          <li>Connect nodes by dragging from handle to handle</li>
          <li>Delete nodes with Backspace or Delete key</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default Tools;
