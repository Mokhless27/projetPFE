import React, { useState, useEffect, Fragment } from "react";
import Toolbarr from "../../components/Toulbarr/Toolbarr.js";
import SideDrawerr from "../../components/SideDrawerr/SideDrawerr.js";
import Backdropp from "../../components/SideDrawerr/Backdropp.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardProductt from "../../wrappers/cardProduct/cardProductt";
import {
  getPropositions,
  deleteProposition,
} from "../../redux/actions/proposition";

const PropositionsAdmin = ({
  getPropositions,
  propositions,
  loading,
  deleteProposition,
}) => {
  const [sideDroppOpen, setSideDroppOpen] = useState(false);

  useEffect(() => {
    getPropositions();
  });

  return (
    <Fragment>
      {!propositions || loading ? (
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
                    <div className="card-header">Propositions</div>
                    <div className="card-body">
                      <table className="table table-striped table-dark table-hover table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">USER NAME</th>
                            <th scope="col">USER EMAIL</th>
                            <th scope="col">SUBJECT</th>
                            <th scope="col">MESSAGE</th>

                            <th scope="col">DATE</th>

                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {propositions.map((p) => {
                            return (
                              <tr>
                                <th scope="row">{p.id}</th>
                                <th scope="row">{p.name}</th>

                                <td>{p.email}</td>
                                <td>{p.subject}</td>
                                <td>{p.message}</td>

                                <td>{p.time.slice(0, 10)}</td>

                                <td>
                                  <button
                                    className="btn btn-danger badge-pill"
                                    onClick={() => deleteProposition(p.id)}
                                  >
                                    Delete
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

PropositionsAdmin.prototype = {
  getPropositions: PropTypes.func.isRequired,
  propositions: PropTypes.array.isRequired,
  deleteProposition: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  propositions: state.proposition.propositions,
  loading: state.proposition.loading,
});
export default connect(mapStateToProps, { getPropositions, deleteProposition })(
  PropositionsAdmin
);
