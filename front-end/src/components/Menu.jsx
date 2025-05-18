import React, { useRef } from "react";
import { motion } from "framer-motion";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import Button from "../ui/Button";
import { HiOutlinePlusSm } from "react-icons/hi";
import { AiOutlineImport } from "react-icons/ai";
import { useFlowStore } from "../utils/store/flowStore";

function Menu() {
  const fileInputRef = useRef();
  const { loadFromFile, resetFlow } = useFlowStore();

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const handleNewFlow = () => {
    if (
      window.confirm(
        "Are you sure you want to create a new flow? All unsaved changes will be lost."
      )
    ) {
      resetFlow();
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-4 h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-col gap-4 mt-5" variants={itemVariants}>
        <motion.div
          className="border border-zinc-700 py-3 rounded-lg cursor-pointer bg-zinc-800/50 hover:bg-zinc-700/50 flex items-center justify-center group transition-all duration-300"
          onClick={handleNewFlow}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlinePlusSm className="size-6 text-zinc-300 group-hover:text-white transition-colors" />
          <span className="ml-2 text-zinc-300 group-hover:text-white transition-colors">
            New Flow
          </span>
        </motion.div>

        <motion.div
          className="flex gap-3 border border-zinc-700 items-center justify-center py-3 px-2 rounded-lg bg-zinc-800/50 hover:bg-[#ec6281] hover:border-[#ec6281]/70 transition-all duration-300 cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AiOutlineImport className="size-5 text-zinc-300 group-hover:text-white transition-colors" />
          <p className="text-zinc-300 group-hover:text-white transition-colors">
            Import Flow
          </p>
          <input
            type="file"
            ref={fileInputRef}
            accept=".js,.json"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                loadFromFile(file);
              }
              // Reset the input value to allow re-selecting the same file
              e.target.value = "";
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-6 flex gap-3 items-center cursor-pointer hover:text-[#FFD700] transition-all duration-200 p-2 rounded-lg hover:bg-zinc-800/70 border border-zinc-600"
        variants={itemVariants}
        whileHover={{ y: -3 }}
        onClick={() => {
          window.location.href = "mailto:prakhar102004@gmail.com";
        }}
      >
        <MdHelpOutline className="size-5" />
        <p>Get Help</p>
        <MdOutlineArrowRightAlt className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      <motion.div className="mt-5 flex flex-col gap-4" variants={itemVariants}>
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
          <Button
            link={"https://github.com/Prakhar2004sachan/mind-map-builder"}
            label={"Project on GitHub"}
            showIcon={true}
            icon={
              <svg
                className="size-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            }
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
          <Button
            link={"https://www.linkedin.com/in/prakhar-sachan-753829360/"}
            label={"Follow me on LinkedIn"}
            showIcon={true}
            icon={
              <svg
                className="size-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h-.003z" />
              </svg>
            }
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-auto mb-4 text-sm text-zinc-500 text-center"
        variants={itemVariants}
      >
        Flow Editor v1.0.0
      </motion.div>
    </motion.div>
  );
}

export default Menu;
