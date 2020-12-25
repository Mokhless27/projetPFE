import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogPost = ({ blog }) => {
  //console.log(blog);
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt=""
            src={blog.image[0]}
            //src={process.env.PUBLIC_URL + "/assets/img/blog/blog-5.jpg"}
          />
        </div>
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
              <li>{blog.time.slice(0, 10)}</li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  4 <i className="fa fa-comments-o" />
                </Link>
              </li>
            </ul>
          </div>
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          {/* <blockquote>
            Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do
            eiusmod tempor incididunt labo dolor magna aliqua. Ut enim ad minim
            veniam quis nostrud.
          </blockquote> */}
          <p>{blog.text}</p>
        </div>
      </div>
      <div className="dec-img-wrapper">
        <div className="row">
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                // src={
                //   process.env.PUBLIC_URL + "/assets/img/blog/blog-details.jpg"
                // }
                src={blog.image[1]}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dec-img mb-50">
              <img
                alt=""
                // src={
                //   //process.env.PUBLIC_URL + "/assets/img/blog/blog-details-2.jpg"
                //   process.env.PUBLIC_URL
                //   //+ `${blog.image[0]}`
                // }
                src={blog.image[2]}
              />
            </div>
          </div>
        </div>
        {/* <p>{blog.text}</p> */}
      </div>
      <div className="tag-share">
        <div className="dec-tag">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                lifestyle ,
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                interior ,
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                outdoor
              </Link>
            </li>
          </ul>
        </div>
        <div className="blog-share">
          <span>share :</span>
          <div className="share-social">
            <ul>
              <li>
                <a className="facebook" href="//facebook.com">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a className="twitter" href="//twitter.com">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a className="instagram" href="//instagram.com">
                  <i className="fa fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="next-previous-post">
        <Link
          to={process.env.PUBLIC_URL + `/blog-details-standard/${blog.id - 1}`}
        >
          {" "}
          <i className="fa fa-angle-left" /> prev post
        </Link>
        <Link
          to={process.env.PUBLIC_URL + `/blog-details-standard/${blog.id + 1}`}
        >
          next post <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

BlogPost.prototype = {
  blog: PropTypes.object.isRequired,
};

export default BlogPost;
