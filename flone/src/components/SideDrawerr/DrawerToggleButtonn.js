import React from "react";
import "./DrawerToggleButtonn.css";

const DrawerToggleButtonn = ({ sideDroppOpen, setSideDroppOpen }) => (
  <button
    className="toggle-buttonn"
    onClick={() => setSideDroppOpen(!sideDroppOpen)}
  >
    <div className="toggle-button__linee"></div>
    <div className="toggle-button__linee"></div>
    <div className="toggle-button__linee"></div>
  </button>
);

export default DrawerToggleButtonn;
