import PropTypes from "prop-types";
import React, { useEffect, Fragment } from "react";
import blogFeaturedData from "../../data/blog-featured/blog-featured.json";
import BlogFeaturedSingle from "../../components/blog-featured/BlogFeaturedSingle";
import SectionTitle from "../../components/section-title/SectionTitle";
import { connect } from "react-redux";
import { getAllBlogs } from "../../redux/actions/blog";

const BlogFeatured = ({ spaceBottomClass, blogs, loading, getAllBlogs }) => {
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Fragment>
      {!blogs || loading ? (
        <Fragment></Fragment>
      ) : (
        <div
          className={`blog-area ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="container">
            <SectionTitle
              titleText="OUR BLOG"
              positionClass="text-center"
              spaceClass="mb-55"
            />
            <div className="row">
              {blogs.map((singlePost) => {
                return (
                  <BlogFeaturedSingle
                    singlePost={singlePost}
                    key={singlePost.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

BlogFeatured.propTypes = {
  spaceBottomClass: PropTypes.string,
  blogs: PropTypes.array.isRequired,
  getAllBlogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
  loading: state.blog.loading,
});

export default connect(mapStateToProps, { getAllBlogs })(BlogFeatured);
