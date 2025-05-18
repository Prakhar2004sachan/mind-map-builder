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
// import React, { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import HeroSection from "./sections/HeroSection";
// import GoalsSection from "./sections/GoalsSection";
// import FeaturesSection from "./sections/FeaturesSection";
// import SideNavigation from "./components/SideNavigation";

// // Register ScrollTrigger with GSAP
// gsap.registerPlugin(ScrollTrigger);

// function App() {
//   useEffect(() => {
//     // Initialize page animations
//     gsap.to("body", { opacity: 1, duration: 0.5, ease: "power2.inOut" });

//     // Setup smooth scrolling between sections
//     const sections = document.querySelectorAll("section");
//     sections.forEach((section, index) => {
//       ScrollTrigger.create({
//         trigger: section,
//         start: "top 80%",
//         end: "bottom 20%",
//         toggleClass: { targets: section, className: "active" },
//         onEnter: () => {
//           gsap.to(section, {
//             y: 0,
//             opacity: 1,
//             duration: 0.7,
//             ease: "power2.out",
//             delay: 0.1,
//           });
//         },
//         onLeaveBack: () => {
//           if (index !== 0) {
//             gsap.to(section, {
//               y: 50,
//               opacity: 0.8,
//               duration: 0.5,
//               ease: "power2.in",
//             });
//           }
//         },
//       });
//     });

//     return () => {
//       // Cleanup all ScrollTriggers on component unmount
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div className="app-container relative">
//       {/* <Header /> */}
//       <SideNavigation />
//       <main className="main-content">
//         <HeroSection />
//         <GoalsSection />
//         <FeaturesSection />
//       </main>
//     </div>
//   );
// }

// export default App;