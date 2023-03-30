import React, { useState } from "react";
import CreateFlow from "./CreateFlow";
import UpdateFlows from "./UpdateFlows";
import Sidebar from "./Sidebar";
// import "./styles.css";


function Home() {
  const [selectedComponent, setSelectedComponent] = useState("");

  const handleClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <Sidebar handleClick={handleClick} />
      {selectedComponent === "CreateFlow" ? (
        <CreateFlow />
      ) : selectedComponent === "UpdateFlows" ? (
        <UpdateFlows />
      ) : (
        <div className="home"></div>
      )}
    </div>
  );
}

export default Home;
