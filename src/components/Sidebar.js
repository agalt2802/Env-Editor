import React from "react";

function Sidebar(props) {
  const handleClick = (event) => {
    const component = event.target.getAttribute("data-component");
    props.handleClick(component);
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={handleClick} data-component="CreateFlow">
          CreateFlow
        </li>
        <li onClick={handleClick} data-component="UpdateFlows">
          UpdateFlows
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
