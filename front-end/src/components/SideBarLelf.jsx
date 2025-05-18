import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { FaBarsStaggered } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import Menu from './Menu';
import Tools from './Tools';

function SideBarLeft() {
  const [activeButton, setActiveButton] = useState("Menu");
  const [isOpen, setIsOpen] = useState(true);
  
  const onClickHandler = (label) => {
    setActiveButton(label);
  };
  
  const toggleSidebar = () => {
    setActiveButton("Menu")
    setIsOpen(!isOpen);
  };
  
  return (
    <motion.div
      className="h-full relative flex bg-[#282828] border-r-2 border-zinc-800"
      initial={{ width: "25rem" }}
      animate={{ width: isOpen ? "25rem" : "5rem" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div
        className="absolute top-1/2 -right-3 z-10 flex items-center justify-center h-8 w-6 bg-[#FFD700] rounded-md cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
      >
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 1L1.5 8L8.5 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      <div className="h-full w-full flex flex-col p-4 overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ opacity: isOpen ? 1 : 0.7 }}
        >
          <Button
            label={isOpen ? "Menu" : ""}
            showIcon={true}
            icon={<FaBarsStaggered />}
            click={() => onClickHandler("Menu")}
            active={activeButton === "Menu"}
          />
          <Button
            label={isOpen ? "Tools" : ""}
            showIcon={true}
            icon={<IoSettingsOutline className="size-5" />}
            click={() => onClickHandler("Tools")}
            active={activeButton === "Tools"}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key={activeButton}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-hidden"
            >
              {activeButton === "Menu" ? <Menu /> : <Tools />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default SideBarLeft;