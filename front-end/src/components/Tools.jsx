import React from 'react'
import { useDnD } from '../utils/DnDContext';

function Tools() {
    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
    //   setType(nodeType);
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    };
  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "inputNode")}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "defaultNode")}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "outputNode")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
}

export default Tools