import React from "react";
import "./Backdropp.css";

const Backdropp = ({ sideDroppOpen, setSideDroppOpen }) => (
  <div className="backdroppp" onClick={() => setSideDroppOpen(false)}></div>
);
export default Backdropp;
