import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//import questions from "../../questions.json";
import Message from "../../components/Alert/Message";

import {
  getCurrentProfile,
  createOrUpdateProfile,
  createProfile,
  updateAddress,
  updatePhoto,
} from "../../redux/actions/profile";
import Spinner from "./spinner";

import {
  loadUser,
  changePassword,
  HashPassword,
} from "../../redux/actions/auth";

const MyAccount = ({
  location,
  getCurrentProfile,
  auth,
  profile: { profile, loading },
  createOrUpdateProfile,
  createProfile,
  loadUser,
  changePassword,
  HashPassword,
  updateAddress,
  updatePhoto,
}) => {
  const { pathname } = location;
  const [alertmsg, setAlertmsg] = useState("");

  useEffect(() => {
    if (auth.user.profileId !== null) {
      //console.log(auth.user.profileId);
      getCurrentProfile(auth.user.profileId);
      //console.log(profile);
      // setProfileFormData({
      //   firstName: profile.firstName,
      //   lastName: profile.lastName,
      //   tel: profile.tel,
      //   fax: profile.fax
      // });
      // setAddressData({
      //   address: profile.address
      // });
    }

    if (profile) {
      setProfileFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        tel: profile.tel,
        fax: profile.fax,
      });
      setAddressData({
        address: profile.address,
      });
      if (profile.img) {
        setFilePath(
          profile.img.substr(
            profile.img.lastIndexOf("\\") + 1,
            profile.img.length
          )
        );
      }
    }
  }, []);

  useEffect(() => {
    if (profile) {
      setProfileFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        tel: profile.tel,
        fax: profile.fax,
      });
      setAddressData({
        address: profile.address,
      });
      if (profile.img) {
        setFilePath(
          profile.img.substr(
            profile.img.lastIndexOf("\\") + 1,
            profile.img.length
          )
        );
      }
    }

    // if (profile.img !== null) {
    //   setFilePath(
    //     profile.img.substr(
    //       profile.img.lastIndexOf("\\") + 1,
    //       profile.img.length
    //     )
    //   );
    // }
  }, [profile]);

  useEffect(() => {
    if (ind === 1) {
      setFilePath(
        profile.img.substr(
          profile.img.lastIndexOf("\\") + 1,
          profile.img.length
        )
      );
    }
  }, [ind]);

  const [profileFormData, setProfileFormData] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    fax: "",
  });

  const { firstName, lastName, tel, fax } = profileFormData;

  const onChange = (e) =>
    setProfileFormData({
      ...profileFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    loadUser();
    if (auth.user.profileId === null) {
      console.log(auth.user.profileId);
      createProfile(auth.user.id, profileFormData, setAlertmsg);
    } else {
      createOrUpdateProfile(auth.user.profileId, profileFormData, setAlertmsg);
    }
  };
  //**************************************************************************************************************************** */

  const [passwordFormData, setPasswordFormData] = useState({
    yourPassword: "",
    nvPassword: "",
    confPassword: "",
  });
  const { yourPassword, nvPassword, confPassword } = passwordFormData;

  const onChangeP = (e) =>
    setPasswordFormData({
      ...passwordFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmitP = (e) => {
    e.preventDefault();
    // if (HashPassword(yourPassword, auth.user.salt) === auth.user.password) {}
    if (nvPassword === confPassword) {
      changePassword(auth.user.id, nvPassword);
    }
  };

  //************************************************************************************************* */

  const [addressData, setAddressData] = useState({
    address: "",
  });
  const { address } = addressData;

  const onChangeA = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitA = (e) => {
    e.preventDefault();
    updateAddress(auth.user.profileId, address, setAlertmsg);
  };

  const del = (e) => {
    e.preventDefault();
    setAddressData({ address: "" });
  };

  /*************************************************************************************** */

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [filePath, setFilePath] = useState("");
  const [uploadedPercentage, setUploadedPercentage] = useState(0);
  const [ind, setInd] = useState(0);
  const onChangePhoto = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const OnSubmitPhoto = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", file, filename);
    updatePhoto(auth.user.profileId, fd, setUploadedPercentage);
    // setTimeout(() => {
    // setFilePath(
    //   profile.img.substr(profile.img.lastIndexOf("\\") + 1, profile.img.length)
    // );
    // }, 3000);
    setInd(1);
  };

  /******************************************************************************************* */
  return (
    <Fragment>
      {!profile || loading ? (
        <Fragment>
          <MetaTags>
            <title>Flone | My Account</title>
            <meta
              name="description"
              content="Compare page of flone react minimalist eCommerce template."
            />
          </MetaTags>
          <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
            Home
          </BreadcrumbsItem>
          <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
            My Account
          </BreadcrumbsItem>
          <LayoutOne headerTop="visible">
            {/* breadcrumb */}
            <Breadcrumb />
            <div className="myaccount-area pb-80 pt-100">
              <div className="container">
                <div className="row">
                  <div className="ml-auto mr-auto col-lg-9">
                    <div className="myaccount-wrapper">
                      <Accordion defaultActiveKey="0">
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="0">
                              <h3 className="panel-title">
                                <span>1 .</span> Edit your account information{" "}
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <div className="account-info-wrapper">
                                  <h4>My Account Information</h4>
                                  <h5>Your Personal Details</h5>
                                </div>
                                {/* {alertmsg ? <Message msg={alertmsg} /> : null} */}

                                <form onSubmit={(e) => onSubmit(e)}>
                                  <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>First Name</label>
                                        <input
                                          type="text"
                                          //value={firstName}
                                          onChange={(e) => onChange(e)}
                                          name="firstName"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Last Name</label>
                                        <input
                                          type="text"
                                          onChange={(e) => onChange(e)}
                                          name="lastName"
                                          //value={lastName}
                                        />
                                      </div>
                                    </div>
                                    {/* <div className="col-lg-12 col-md-12">
                                    <div className="billing-info">
                                      <label>Email Address</label>
                                      <input
                                        type="email"
                                        value={auth.user.email}
                                        name="email"
                                      />
                                    </div>
                                  </div> */}
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Telephone</label>
                                        <input
                                          type="text"
                                          //value={tel}
                                          onChange={(e) => onChange(e)}
                                          name="tel"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Fax</label>
                                        <input
                                          type="text"
                                          //value={fax}
                                          onChange={(e) => onChange(e)}
                                          name="fax"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button type="submit">Continue</button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="1">
                              <h3 className="panel-title">
                                <span>2 .</span> Change your password
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="1">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <form onSubmit={(e) => onSubmitP(e)}>
                                  <div className="account-info-wrapper">
                                    <h4>Change Password</h4>
                                    <h5>Your Password</h5>
                                    <input
                                      type="password"
                                      value={yourPassword}
                                      onChange={(e) => onChangeP(e)}
                                      name="yourPassword"
                                    />
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="billing-info">
                                        <label>Password</label>
                                        <input
                                          type="password"
                                          value={nvPassword}
                                          onChange={(e) => onChangeP(e)}
                                          name="nvPassword"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                      <div className="billing-info">
                                        <label>Password Confirm</label>
                                        <input
                                          type="password"
                                          value={confPassword}
                                          onChange={(e) => onChangeP(e)}
                                          name="confPassword"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button type="submit">Continue</button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="2">
                              <h3 className="panel-title">
                                <span>3 .</span> Modify your address book
                                entries{" "}
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="2">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <form onSubmit={(e) => onSubmitA(e)}>
                                  <div className="account-info-wrapper">
                                    <h4>Address Book Entries</h4>
                                  </div>
                                  <div className="entries-wrapper">
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                        <div className="entries-info text-center">
                                          {/* <p>Farhana hayder (shuvo) </p>
                                      <p>hastech </p>
                                      <p> Road#1 , Block#c </p>
                                      <p> Rampura. </p>
                                      <p>Dhaka </p>
                                      <p>Bangladesh </p> */}
                                          <input
                                            type="text"
                                            //value={address}
                                            onChange={(e) => onChangeA(e)}
                                            name="address"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                        <div className="entries-edit-delete text-center">
                                          <button className="edit">Edit</button>
                                          <button onClick={(e) => del(e)}>
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button type="submit">Continue</button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="3">
                              <h3 className="panel-title">
                                <span>4 .</span> Change your profile photo
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="3">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <form onSubmit={() => OnSubmitPhoto()}>
                                  <div className="account-info-wrapper">
                                    <h4>Change Photo</h4>
                                    <h5>Your Photo</h5>
                                    <div className="custom-file mb-4">
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onChangePhoto}
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="customFile"
                                      >
                                        {filename}
                                      </label>
                                    </div>
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar bg-success"
                                      role="progressbar"
                                      style={{
                                        width: `${uploadedPercentage}%`,
                                      }}
                                    >
                                      {uploadedPercentage}%
                                    </div>
                                  </div>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button type="submit">Upload</button>
                                    </div>
                                  </div>
                                </form>
                              </div>

                              {/* {profile.img ? (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                  }}
                                >
                                  <h3 className="text-center">Current Photo</h3>
                                  <img
                                    style={{
                                      width: "300px",
                                      height: "350px",
                                      borderRadius: "50%",
                                      border: "1px solid #ddd",
                                      boxShadow:
                                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                      margin: "0px 250px",
                                    }}
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/img/" +
                                      filePath
                                    }
                                    alt=""
                                  />
                                </div>
                              ) : null} */}
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LayoutOne>
        </Fragment>
      ) : (
        <Fragment>
          <MetaTags>
            <title>Flone | My Account</title>
            <meta
              name="description"
              content="Compare page of flone react minimalist eCommerce template."
            />
          </MetaTags>
          <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
            Home
          </BreadcrumbsItem>
          <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
            My Account
          </BreadcrumbsItem>
          <LayoutOne headerTop="visible">
            {/* breadcrumb */}
            <Breadcrumb />
            <div className="myaccount-area pb-80 pt-100">
              <div className="container">
                <div className="row">
                  <div className="ml-auto mr-auto col-lg-9">
                    <div className="myaccount-wrapper">
                      <Accordion defaultActiveKey="0">
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="0">
                              <h3 className="panel-title">
                                <span>1 .</span> Edit your account information{" "}
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <div className="account-info-wrapper">
                                  <h4>My Account Information</h4>
                                  <h5>Your Personal Details</h5>
                                </div>
                                {alertmsg ? <Message msg={alertmsg} /> : null}

                                <form onSubmit={(e) => onSubmit(e)}>
                                  <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>First Name</label>
                                        <input
                                          type="text"
                                          value={firstName}
                                          onChange={(e) => onChange(e)}
                                          name="firstName"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Last Name</label>
                                        <input
                                          type="text"
                                          onChange={(e) => onChange(e)}
                                          name="lastName"
                                          value={lastName}
                                        />
                                      </div>
                                    </div>
                                    {/* <div className="col-lg-12 col-md-12">
                                      <div className="billing-info">
                                        <label>Email Address</label>
                                        <input
                                          type="email"
                                          value={auth.user.email}
                                          name="email"
                                        />
                                      </div>
                                    </div> */}
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Telephone</label>
                                        <input
                                          type="text"
                                          value={tel}
                                          onChange={(e) => onChange(e)}
                                          name="tel"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info">
                                        <label>Fax</label>
                                        <input
                                          type="text"
                                          value={fax}
                                          onChange={(e) => onChange(e)}
                                          name="fax"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button type="submit">Continue</button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="1">
                              <h3 className="panel-title">
                                <span>2 .</span> Change your password
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="1">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <form onSubmit={(e) => onSubmitP(e)}>
                                  <div className="account-info-wrapper">
                                    <h4>Change Password</h4>
                                    <h5>Your Password</h5>
                                    <input
                                      type="password"
                                      value={yourPassword}
                                      onChange={(e) => onChangeP(e)}
                                      name="yourPassword"
                                    />
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="billing-info">
                                        <label>Password</label>
                                        <input
                                          type="password"
                                          value={nvPassword}
                                          onChange={(e) => onChangeP(e)}
                                          name="nvPassword"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                      <div className="billing-info">
                                        <label>Password Confirm</label>
                                        <input
                                          type="password"
                                          value={confPassword}
                                          onChange={(e) => onChangeP(e)}
                                          name="confPassword"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button type="submit">Continue</button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="2">
                              <h3 className="panel-title">
                                <span>3 .</span> Modify your address book
                                entries{" "}
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="2">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <form onSubmit={(e) => onSubmitA(e)}>
                                  <div className="account-info-wrapper">
                                    <h4>Address Book Entries</h4>
                                  </div>
                                  {alertmsg ? <Message msg={alertmsg} /> : null}

                                  <div className="entries-wrapper">
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                        <div className="entries-info text-center">
                                          {/* <p>Farhana hayder (shuvo) </p>
                                        <p>hastech </p>
                                        <p> Road#1 , Block#c </p>
                                        <p> Rampura. </p>
                                        <p>Dhaka </p>
                                        <p>Bangladesh </p> */}
                                          <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => onChangeA(e)}
                                            name="address"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                        <div className="entries-edit-delete text-center">
                                          <button className="edit">Edit</button>
                                          <button onClick={(e) => del(e)}>
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button type="submit">Continue</button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>

                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="3">
                              <h3 className="panel-title">
                                <span>4 .</span> Change your profile photo
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="3">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <form onSubmit={OnSubmitPhoto}>
                                  <div className="account-info-wrapper">
                                    <h4>Change Photo</h4>
                                    <h5>Your Photo</h5>
                                    <div className="custom-file mb-4">
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onChangePhoto}
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="customFile"
                                      >
                                        {filename}
                                      </label>
                                    </div>
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar bg-success"
                                      role="progressbar"
                                      style={{
                                        width: `${uploadedPercentage}%`,
                                      }}
                                    >
                                      {uploadedPercentage}%
                                    </div>
                                  </div>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button type="submit">Upload</button>
                                    </div>
                                  </div>
                                </form>
                              </div>

                              {profile.img ? (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                  }}
                                >
                                  <h3 className="text-center">Current Photo</h3>
                                  <img
                                    style={{
                                      width: "300px",
                                      height: "350px",
                                      borderRadius: "50%",
                                      border: "1px solid #ddd",
                                      boxShadow:
                                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                      margin: "0px 250px",
                                    }}
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/img/" +
                                      filePath
                                    }
                                    alt=""
                                  />
                                </div>
                              ) : null}
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="4">
                              <h3 className="panel-title">
                                <span>5 .</span> Modify your preferences{" "}
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="4">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <form
                                //onSubmit={(e) => onSubmitPre(e)}
                                >
                                  <div className="account-info-wrapper">
                                    <h4>Your Preferences</h4>
                                    <h5>
                                      Selectionner vos preferences vous aide
                                      dans la recherche des articles qui vous
                                      conviendrait!
                                    </h5>
                                  </div>
                                  {/* <div className="entries-wrapper">
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                        <div className="entries-edit-delete text-center">
                                          <button className="edit">Edit</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div> */}
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button type="submit">
                                        <ul>
                                          <li>
                                            <Link
                                              className="play-button"
                                              to="/play/Home"
                                            >
                                              Continue
                                            </Link>
                                          </li>
                                        </ul>
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LayoutOne>
        </Fragment>
      )}
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  createOrUpdateProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  HashPassword: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
  updatePhoto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  createOrUpdateProfile,
  createProfile,
  loadUser,
  changePassword,
  HashPassword,
  updateAddress,
  updatePhoto,
})(MyAccount);
