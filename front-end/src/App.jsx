import FlowCanvas from './components/FlowCanvas'
import SideBarLelf from './components/SideBarLelf';
import SideBarRight from './components/SideBarRight';

function App() {
 

  return (
    <div className="w-full h-screen flex gap-10">
      <SideBarLelf/>
      <FlowCanvas />
      <SideBarRight/>
    </div>
  );
}

export default App
