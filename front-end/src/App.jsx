import React from "react";
import { motion } from "framer-motion";
import { ReactFlowProvider } from "@xyflow/react";
import FlowCanvas from "./components/FlowCanvas";
import SideBarLeft from "./components/SideBarLelf";
import { DnDProvider } from "./utils/DnDContext";

function App() {
  return (
    <motion.div
      className="w-full h-screen flex bg-zinc-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute z-50 top-8 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-md py-2 px-4 rounded-full border border-zinc-700/50 text-sm text-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        Flow Editor - Design and connect your nodes visually
      </motion.div>

      <DnDProvider>
        <SideBarLeft />
        <ReactFlowProvider>
          <motion.div
            className="flex-1 relative h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FlowCanvas />
          </motion.div>
        </ReactFlowProvider>
      </DnDProvider>

      <motion.div
        className="absolute bottom-4 right-4 text-xs text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.8 }}
      >
        Built with React & React Flow
      </motion.div>
    </motion.div>
  );
}

export default App;
