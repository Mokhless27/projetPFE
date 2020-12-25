import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
const Home = () => (
  <Fragment>
    <Helmet>
      {" "}
      <title> Quizz App - Home</title>{" "}
    </Helmet>
    <div id="home">
      <section>
        <div style={{ textAlign: "center" }}>
          <span className="mdi mdi-cube-outline cube"></span>
        </div>
        <h1>Your Preferences</h1>
        <div className="play-button-container">
          <ul>
            <li>
              <Link className="play-button" to="/play/Quiz">
                Continue
              </Link>
            </li>
          </ul>
        </div>
        <div className="auth-container">
          {/* <Link className="play-button" to="/play/Quiz">
            Continue
          </Link> */}
          <Link
            to="/my-account"
            className="auth-buttons"
            id="login-button"
            style={{
              width: "100%",
            }}
          >
            Return
          </Link>
          {/* <Link to="/Register" className="auth-buttons" id="register-button">
            Register
          </Link> */}
        </div>
      </section>
    </div>
  </Fragment>
);

export default Home;
