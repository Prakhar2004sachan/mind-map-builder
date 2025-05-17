import { ReactFlowProvider } from "@xyflow/react";
import FlowCanvas from "./components/FlowCanvas";
import SideBarLelf from "./components/SideBarLelf";
import { DnDProvider } from "./utils/DnDContext";

function App() {
  return (
    <div className="w-full h-screen flex">
      <SideBarLelf />
      <ReactFlowProvider>
        <DnDProvider>
          <FlowCanvas />
        </DnDProvider>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
