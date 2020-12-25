import React from "react";
import "./SideDrawerr.css";

const SideDrawerr = ({ sideDroppOpen }) => {
  let drawerClasses = "side-drawerr";
  if (sideDroppOpen) {
    drawerClasses = "side-drawerr openn";
  }
  return (
    <nav className={drawerClasses}>
      <div className="tiltlee-sidebarr">
        <h1>OPTIONS</h1>
      </div>
      <div className="menuu-navv">
        <ul>
          <li className="ul-integrall">
            {" "}
            <a href="#">
              <span
                className="fa fa-address-book "
                style={{
                  marginRight: "15px",
                }}
              ></span>
              Gestion Products
            </a>
            <ul>
              <li className="li-within">
                <a href="/ProductsEspaceAdmin">Products</a>
              </li>
              <li className="li-within">
                <a href="/ProductFormAjout">Ajout Product</a>
              </li>
            </ul>
          </li>

          <li>
            {" "}
            <a href="#">
              <span
                className="fa fa-address-book "
                style={{
                  marginRight: "15px",
                }}
              ></span>
              Gestion Blogs
            </a>
            <ul>
              <li className="li-within">
                <a href="/EspaceAdmin">Blogs</a>
              </li>
              <li className="li-within">
                <a href="/BlogFormAjout">Ajout Blog</a>
              </li>
            </ul>
          </li>

          <li>
            {" "}
            <a href="#">
              <span
                className="fa fa-users"
                style={{
                  marginRight: "15px",
                }}
              ></span>
              Gestion Users
            </a>
            <ul>
              <li className="li-within">
                <a href="/UsersAdmin">
                  <span
                    className="fa fa-users"
                    style={{
                      marginRight: "15px",
                    }}
                  ></span>
                  Users
                </a>
              </li>
            </ul>
          </li>

          <li>
            {" "}
            <a href="#">
              <span
                className="fa fa-users"
                style={{
                  marginRight: "15px",
                }}
              ></span>
              Gestion Livraisons
            </a>
            <ul>
              <li className="li-within">
                <a href="/LivraisonAdmin">
                  <span
                    className="fa fa-users"
                    style={{
                      marginRight: "15px",
                    }}
                  ></span>
                  Livraisons
                </a>
              </li>
            </ul>
          </li>

          <li>
            {" "}
            <a href="#">
              <span
                className="fa fa-users"
                style={{
                  marginRight: "15px",
                }}
              ></span>
              Gestion Propositions
            </a>
            <ul>
              <li className="li-within">
                <a href="/PropositionsAdmin">
                  <span
                    className="fa fa-users"
                    style={{
                      marginRight: "15px",
                    }}
                  ></span>
                  Propositions
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default SideDrawerr;
