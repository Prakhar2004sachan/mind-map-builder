import React from 'react'

function NodeButton({label, buttonType, nodeClasses}) {
    const onDragStart = (event, nodeType) => {
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    };
  return (
    <div
      className="dndnode input relative text-center rounded p-2 px-4 border border-blue-500 my-4"
      onDragStart={(event) => onDragStart(event, buttonType)}
      draggable
    >
      {buttonType === "defaultNode" && (
        <div
          className={`absolute w-2 h-2 bg-white rounded-full -top-1 left-1/2 -translate-x-1/2`}
        ></div>
      )}
      <div
        className={`absolute w-2 h-2 bg-white rounded-full ${nodeClasses}`}
      ></div>
      {label}
    </div>
  );
}

export default NodeButton