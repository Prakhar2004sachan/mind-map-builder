import React from 'react'
import Button from '../ui/Button';
import { FaBarsStaggered } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

function SideBarLelf() {
  
  return (
    <div className="h-screen w-[20rem] border-r-2 border-zinc-800 bg-[#282828] p-4">
      <div className="flex gap-4">
        <Button label={"Menu"} showIcon={true} icon={<FaBarsStaggered />} />
        <Button
          label={"Tools"}
          showIcon={true}
          icon={<IoSettingsOutline className="size-5" />}
        />
      </div>
    </div>
  );
}

export default SideBarLelf