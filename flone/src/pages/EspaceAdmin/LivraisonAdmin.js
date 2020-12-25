import React, { useState, useEffect, Fragment } from "react";
import Toolbarr from "../../components/Toulbarr/Toolbarr.js";
import SideDrawerr from "../../components/SideDrawerr/SideDrawerr.js";
import Backdropp from "../../components/SideDrawerr/Backdropp.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardProductt from "../../wrappers/cardProduct/cardProductt";
import { getLivraisons, deleteLivraison } from "../../redux/actions/livraison";

const LivraisonAdmin = ({
  getLivraisons,
  livraisons,
  loading,
  deleteLivraison,
}) => {
  const [sideDroppOpen, setSideDroppOpen] = useState(false);

  useEffect(() => {
    getLivraisons();
  });

  return (
    <Fragment>
      {!livraisons || loading ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <div
            style={{
              height: "100%",
            }}
          >
            <Toolbarr
              sideDroppOpen={sideDroppOpen}
              setSideDroppOpen={setSideDroppOpen}
            />
            <SideDrawerr sideDroppOpen={sideDroppOpen} />
            {sideDroppOpen ? (
              <Fragment>
                <Backdropp
                  sideDroppOpen={sideDroppOpen}
                  setSideDroppOpen={setSideDroppOpen}
                />
              </Fragment>
            ) : null}

            <main
              style={{
                marginTop: "64px",
              }}
            >
              <div className="container">
                <div className="jumbotron">
                  <div className="card">
                    <div className="card-header">Livraisons</div>
                    <div className="card-body">
                      <table className="table table-striped table-dark table-hover table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">USER MAIL</th>
                            <th scope="col">PRODUCT SKU</th>
                            <th scope="col">PRODUCT NAME</th>
                            <th scope="col">PRODUCT SIZE</th>
                            <th scope="col">PRODUCT COLOR</th>
                            <th scope="col">DATE</th>

                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {livraisons.map((liv) => {
                            return (
                              <tr>
                                <th scope="row">{liv.id}</th>
                                <th scope="row">{liv.UserEmail}</th>

                                <td>{liv.productSku}</td>
                                <td>{liv.productName}</td>
                                <td>{liv.productSize}</td>
                                <td>{liv.productColor}</td>
                                <td>{liv.time.slice(0, 10)}</td>

                                <td>
                                  <button
                                    className="btn btn-danger badge-pill"
                                    onClick={() => deleteLivraison(liv.id)}
                                  >
                                    delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

LivraisonAdmin.prototype = {
  getLivraisons: PropTypes.func.isRequired,
  livraisons: PropTypes.object.isRequired,
  deleteLivraison: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  livraisons: state.livraison.livraisons,
  loading: state.livraison.loading,
});
export default connect(mapStateToProps, { getLivraisons, deleteLivraison })(
  LivraisonAdmin
);
