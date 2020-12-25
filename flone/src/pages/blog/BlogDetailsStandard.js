import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogComment from "../../wrappers/blog/BlogComment";
import BlogPost from "../../wrappers/blog/BlogPost";
import { connect } from "react-redux";

const BlogDetailsStandard = ({ location, blogs, match }) => {
  const { pathname } = location;

  console.log(match.params.id);
  return blogs.map((blog) => {
    if (blog.id == match.params.id) {
      return (
        <Fragment>
          <MetaTags>
            <title>MJ27 | Blog Post</title>
            <meta
              name="description"
              content="Blog post page of flone react minimalist eCommerce template."
            />
          </MetaTags>
          <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
            Home
          </BreadcrumbsItem>
          <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
            Blog Post
          </BreadcrumbsItem>
          <LayoutOne headerTop="visible">
            {/* breadcrumb */}
            <Breadcrumb />
            <div className="blog-area pt-100 pb-100">
              <div className="container">
                <div className="row flex-row-reverse">
                  <div className="col-lg-9">
                    <div className="blog-details-wrapper ml-20">
                      {/* blog post */}
                      <BlogPost blog={blog} />

                      {/* blog post comment */}
                      <BlogComment blog={blog} />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    {/* blog sidebar */}
                    <BlogSidebar />
                  </div>
                </div>
              </div>
            </div>
          </LayoutOne>
        </Fragment>
      );
    }
  });
  // <Fragment>
  //   <MetaTags>
  //     <title>Flone | Blog Post</title>
  //     <meta
  //       name="description"
  //       content="Blog post page of flone react minimalist eCommerce template."
  //     />
  //   </MetaTags>
  //   <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
  //   <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
  //     Blog Post
  //   </BreadcrumbsItem>
  //   <LayoutOne headerTop="visible">
  //     {/* breadcrumb */}
  //     <Breadcrumb />
  //     <div className="blog-area pt-100 pb-100">
  //       <div className="container">
  //         <div className="row flex-row-reverse">
  //           <div className="col-lg-9">
  //             <div className="blog-details-wrapper ml-20">
  //               {/* blog post */}
  //               <BlogPost />

  //               {/* blog post comment */}
  //               <BlogComment />
  //             </div>
  //           </div>
  //           <div className="col-lg-3">
  //             {/* blog sidebar */}
  //             <BlogSidebar />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </LayoutOne>
  // </Fragment>
};

BlogDetailsStandard.propTypes = {
  location: PropTypes.object,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
});

export default connect(mapStateToProps, {})(BlogDetailsStandard);
