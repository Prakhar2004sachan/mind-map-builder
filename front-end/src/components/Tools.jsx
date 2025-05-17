import React from 'react'
import { useDnD } from '../utils/DnDContext';
import NodeButton from '../ui/NodeButton';

function Tools() {
    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
    //   setType(nodeType);
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    };
  return (
    <aside className="flex flex-col gap-2 mt-5">
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <NodeButton
        label={"Input Node"}
        buttonType={"inputNode"}
        nodeClasses={" -bottom-1 left-1/2 -translate-x-1/2"}
      />
      <NodeButton
        label={"Default Node"}
        buttonType={"defaultNode"}
        nodeClasses={" -bottom-1 left-1/2 -translate-x-1/2"}
      />
      <NodeButton
        label={"Output Node"}
        buttonType={"outputNode"}
        nodeClasses={" -top-1 left-1/2 -translate-x-1/2"}
      />
    </aside>
  );
}

export default Tools