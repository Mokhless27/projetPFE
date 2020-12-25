import React, { useState, Fragment, useEffect } from "react";
import Toolbarr from "../../components/Toulbarr/Toolbarr.js";
import SideDrawerr from "../../components/SideDrawerr/SideDrawerr.js";
import Backdropp from "../../components/SideDrawerr/Backdropp.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardBlogg from "../../wrappers/cardProduct/cardBlogg";
import { getAllBlogs } from "../../redux/actions/blog";

const EspaceAdmin = ({ blogs, loading, getAllBlogs }) => {
  const [sideDroppOpen, setSideDroppOpen] = useState(false);
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Fragment>
      {!blogs || loading ? (
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
              {blogs.map((blog, i) => {
                return <CardBlogg blog={blog} key={i} />;
              })}
            </main>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EspaceAdmin.prototype = {
  blogs: PropTypes.array.isRequired,
  getAllBlogs: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
  loading: state.blog.loading,
});
export default connect(mapStateToProps, { getAllBlogs })(EspaceAdmin);
