import React, { useState, Fragment, useEffect } from "react";
import Toolbarr from "../../components/Toulbarr/Toolbarr.js";
import SideDrawerr from "../../components/SideDrawerr/SideDrawerr.js";
import Backdropp from "../../components/SideDrawerr/Backdropp.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardBlogg from "../../wrappers/cardProduct/cardBlogg";
import { modifyBlog } from "../../redux/actions/blog";
import { Redirect } from "react-router-dom";

const BlogFormModif = ({ match, blog, modifyBlog }) => {
  const [sideDroppOpen, setSideDroppOpen] = useState(false);
  useEffect(() => {
    setBlogFormData({
      title: blog[0].title,
      description: blog[0].description,
      text: blog[0].text,
      image: blog[0].image.toString(),
    });
  }, []);

  const [blogFormData, setBlogFormData] = useState({
    title: "",
    description: "",
    text: "",
    image: "",
  });
  const { title, text, description, image } = blogFormData;
  const [ind, setInd] = useState(false);

  const onChange = (e) =>
    setBlogFormData({
      ...blogFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(blogFormData);
    modifyBlog(blog[0].id, blogFormData);
    setInd(true);
  };
  if (ind) {
    return <Redirect to="/EspaceAdmin" />;
  }

  return (
    <Fragment>
      {!blog ? (
        <Fragment>Still Loading</Fragment>
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
              <form
                onSubmit={(e) => onSubmit(e)}
                style={{
                  width: "500px",
                  margin: "auto",
                }}
                className="needs-validation"
                noValidate
              >
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    required
                    onChange={(e) => onChange(e)}
                    value={title}
                  />
                  <small className="form-text text-muted">
                    Enter the title of the blog!
                  </small>
                  <div className="invalid-feedback">
                    please enter a valid title!
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    onChange={(e) => onChange(e)}
                    className="form-control"
                    required
                    value={description}
                  />
                  <small className="form-text text-muted">
                    Enter the Description of the blog!
                  </small>
                  <div className="invalid-feedback">
                    please enter a valid description!
                  </div>
                </div>
                <div className="form-group">
                  <label>Text</label>
                  <input
                    type="text"
                    name="text"
                    className="form-control"
                    required
                    onChange={(e) => onChange(e)}
                    value={text}
                  />
                  <small className="form-text text-muted">
                    Enter the Text of the blog!
                  </small>
                  <div className="invalid-feedback">
                    please enter a valid Text!
                  </div>
                </div>
                <div className="form-group">
                  <label>Images</label>
                  <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name="image"
                    className="form-control"
                    required
                    value={image}
                  />
                  <small className="form-text text-muted">
                    Enter the image of the blog!
                  </small>
                  <div className="invalid-feedback">
                    please enter a valid img!
                  </div>
                </div>
                <button type="submit" className="btn btn-outline-success">
                  Submit
                </button>
              </form>
            </main>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

BlogFormModif.prototype = {
  blog: PropTypes.object.isRequired,
  modifyBlog: PropTypes.func.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  return {
    blog: state.blog.blogs.filter((b) => b.id == match.params.id),
  };
};
export default connect(mapStateToProps, { modifyBlog })(BlogFormModif);
