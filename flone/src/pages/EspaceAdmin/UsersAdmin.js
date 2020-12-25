import React, { useState, useEffect, Fragment } from "react";
import Toolbarr from "../../components/Toulbarr/Toolbarr.js";
import SideDrawerr from "../../components/SideDrawerr/SideDrawerr.js";
import Backdropp from "../../components/SideDrawerr/Backdropp.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardProductt from "../../wrappers/cardProduct/cardProductt";
import { getUsers } from "../../redux/actions/users";
import { deleteUser } from "../../redux/actions/auth";

const UsersAdmin = ({ getUsers, users, loading, deleteUser }) => {
  const [sideDroppOpen, setSideDroppOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);
  //console.log(users);
  return (
    <Fragment>
      {!users || loading ? (
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
                    <div className="card-header">Users</div>
                    <div className="card-body">
                      {/* <h5 className="card-title">Special title treatment</h5> */}
                      <table className="table table-striped table-dark table-hover table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">USERNAME</th>
                            <th scope="col">EMAIL</th>

                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, i) => {
                            if (user.role === null) {
                              return (
                                <tr key={i}>
                                  <th scope="row">{user.id}</th>
                                  <td>{user.username}</td>
                                  <td>{user.email}</td>

                                  <td>
                                    <button
                                      className="btn btn-danger badge-pill"
                                      onClick={() => deleteUser(user.id)}
                                    >
                                      delete
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
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

UsersAdmin.prototype = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users.users,
  loading: state.users.loading,
});
export default connect(mapStateToProps, { getUsers, deleteUser })(UsersAdmin);
