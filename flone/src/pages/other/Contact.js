import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LocationMap from "../../components/contact/LocationMap";
import { addProposition } from "../../redux/actions/proposition";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Message from "../../components/Alert/Message";

const Contact = ({ location, addProposition }) => {
  // useEffect(() => {
  //   //if (b) {
  //   setContactFormData({
  //     name: "",
  //     email: "",
  //     subject: "",
  //     message: "",
  //   });
  //   //}
  // }, [b]);
  const { pathname } = location;

  const [alertmsg, setAlertmsg] = useState("");
  const [b, setB] = useState(false);

  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { email, message, name, subject } = contactFormData;

  const onChange = (e) =>
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    addProposition(contactFormData, setAlertmsg);
    setContactFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Fragment>
      <MetaTags>
        <title>MJ27 | Contact</title>
        <meta
          name="description"
          content="Contact of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Contact
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="contact-map mb-10">
              <LocationMap latitude="47.444" longitude="-122.176" />
            </div>
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+012 345 678 102</p>
                      <p>+012 345 678 102</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:urname@email.com">urname@email.com</a>
                      </p>
                      <p>
                        <a href="//urwebsitenaem.com">urwebsitenaem.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Address goes here, </p>
                      <p>street, Crossroad 123.</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  {alertmsg ? <Message msg={alertmsg} /> : null}
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form
                    className="contact-form-style"
                    onSubmit={(e) => onSubmit(e)}
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          name="name"
                          placeholder="Name*"
                          type="text"
                          onChange={(e) => onChange(e)}
                          value={name}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          name="email"
                          placeholder="Email*"
                          type="email"
                          onChange={(e) => onChange(e)}
                          value={email}
                        />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Subject*"
                          type="text"
                          onChange={(e) => onChange(e)}
                          value={subject}
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Your Message*"
                          //defaultValue={""}
                          onChange={(e) => onChange(e)}
                          value={message}
                        />
                        <button className="submit" type="submit">
                          SEND
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object,
  addProposition: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addProposition })(Contact);
