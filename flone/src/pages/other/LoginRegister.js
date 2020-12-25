import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link, Redirect } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { register, login } from "../../redux/actions/auth";
import { connect } from "react-redux";
import axios from "axios";
import Message from "../../components/Alert/Message";

const LoginRegister = ({
  location,
  register,
  login,
  isAuthenticated,
  cart,
  user,
}) => {
  const { pathname } = location;
  const [alertmsg, setAlertmsg] = useState("");

  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  //console.log(c, cart, "hhhhhhhhhhhhhhhhhhhhhhhhhhh");
  const { email, password, username } = registerFormData;

  // useEffect(() => {
  //   if (user.cartDataId !== null) {
  //     axios.get(`/cartData/${user.cartDataId}`).then((res) => {
  //       //console.log(res.data.clothes);
  //       res.data.clothes.map((i) => {
  //         axios.patch(`/cartdata/${i.id}/${user.cartDataId}`);
  //       });

  //       //cart = res.data.clothes;
  //       //console.log(cart);
  //     });
  //   }
  // }, []);

  // const [LoginFormData, setLoginFormData] = useState({
  //   email: "",
  //   password: ""
  // });

  //const { email, password } = LoginFormData;

  const onChange = (e) =>
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    // if (password !== password2) {
    //   console.log("passwords do not match");
    // } else {
    //console.log(registerFormData);
    register({ username, email, password }, setAlertmsg);
    // setAlertmsg(
    //   "Longueur mot de passe minimale 6 carectéres ; contenant au moins un chiffre et un carectére en majuscule"
    // );

    //}
  };

  // const onChangeLogin = e => {
  //   setLoginFormData({
  //     ...LoginFormData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    login(email, password, setAlertmsg);
    //setAlertmsg("Credentials False");
  };

  //Redirect if logged in
  if (isAuthenticated && user) {
    if (user.role) {
      return <Redirect to="/EspaceAdmin" />;
    } else {
      return <Redirect to="/home-fashion" />;
    }
  }

  //************************************************************ */

  //************************************************************ */

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        {alertmsg ? <Message msg={alertmsg} /> : null}
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={(e) => onSubmitLogin(e)}>
                              <input
                                //name="user-email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                              />
                              <input
                                type="password"
                                //name="user-password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => onChange(e)}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        {alertmsg ? <Message msg={alertmsg} /> : null}
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={(e) => onSubmit(e)}>
                              <input
                                type="text"
                                //name="user-name"
                                name="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => onChange(e)}
                              />
                              <input
                                type="password"
                                //name="user-password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => onChange(e)}
                              />
                              <input
                                //name="user-email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  cart: state.cartData,
  user: state.auth.user,
});

export default connect(mapStateToProps, { register, login })(LoginRegister);
