import FlowCanvas from './components/FlowCanvas'
import SideBarLelf from './components/SideBarLelf';
import SideBarRight from './components/SideBarRight';

function App() {
 

  return (
    <div className="w-full h-screen flex">
      <SideBarLelf/>
      <FlowCanvas />
    </div>
  );
}

export default App
