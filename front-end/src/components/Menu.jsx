import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import Button from "../ui/Button";
import { HiOutlinePlusSm } from "react-icons/hi";
import { AiOutlineImport } from "react-icons/ai";

function Menu() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 mt-5">
        <div className="border py-2 rounded-lg cursor-pointer">
          <HiOutlinePlusSm className="w-full text-center" />
        </div>
        <div className="flex gap-3 border items-center justify-center py-2 rounded-lg hover:bg-[#ec6281] transition-all duration-300 cursor-pointer ">
          <AiOutlineImport className="size-5"/>
          <p>Import</p>
        </div>
      </div>
      <div className="mt-6 flex gap-3 items-center cursor-pointer">
        <MdHelpOutline className="size-5" />
        <p>Get Help</p>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <Button label={"Project on GitHub"} showIcon={false} />
        <Button label={"Follow me on Linkedin"} showIcon={false} />
      </div>
    </div>
  );
}

export default Menu;
