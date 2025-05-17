import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";

function Menu() {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-4">
        <p className="bg-[#717171] py-2 px-4 rounded-lg cursor-pointer">
          Make Notes
        </p>
        <p className="bg-[#717171] py-2 px-4 rounded-lg cursor-pointer">
          Draw Mind Maps
        </p>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center p-2 border-b border-zinc-500">
          <p>Your Previous Projects</p>
          <MdOutlineArrowRightAlt className="size-6" />
        </div>
        {/* Projects */}
        <div className="scrollProj p-2 h-[12rem] overflow-y-scroll bg-[#717171] rounded-md mt-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <p
              className="hover:bg-[#ec6281] hover:rounded-md transition-all duration-100 p-2 rounded-m cursor-pointer"
              key={i}
            >
              Operating System
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
