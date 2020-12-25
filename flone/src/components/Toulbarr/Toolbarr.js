import React from "react";
import "./Toolbarr.css";
import "../SideDrawerr/DrawerToggleButtonn";
import DrawerToggleButtonn from "../SideDrawerr/DrawerToggleButtonn";

const Toolbarr = ({ sideDroppOpen, setSideDroppOpen }) => (
  <header className="toolbarr">
    <nav className="toolbarr__navigation">
      <div>
        <DrawerToggleButtonn
          sideDroppOpen={sideDroppOpen}
          setSideDroppOpen={setSideDroppOpen}
        />
      </div>
      <div className="toolbarr__logo">
        <a href="/">THE LOGO</a>
      </div>
      <div className="spacerr" />
      <div className="toolbarr_navigation-items">
        <ul>
          <li>
            {/* <a href="/">Products</a>
            <a href="/">Users</a> */}
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
export default Toolbarr;
