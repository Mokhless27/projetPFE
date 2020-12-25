import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addComment,
  getComments,
  addCommentByUser,
  getAllBlogs,
  getCommentsByBlog,
} from "../../redux/actions/blog";
//import Moment from "react-moment";
import Spinner from "../../pages/other/spinner";

const BlogComment = ({
  blog,
  //addComment,
  getComments,
  comments,
  addCommentByUser,
  user,
  getAllBlogs,
  //getCommentsByBlog,
  loading,
  profile,
}) => {
  useEffect(() => {
    getComments();
  }, [comments]);

  const [message, setMessage] = useState({
    text: "",
  });

  const { text } = message;

  const onChange = (e) => {
    setMessage({ text: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //addComment(text, blog.id);
    const img = profile.img.substr(
      profile.img.lastIndexOf("\\") + 1,
      profile.img.length
    );
    addCommentByUser({ text, img }, user.id, blog.id);
    setMessage({ text: "" });
  };

  // const liste = blog.commentaire.map(commentaire => {
  //   return (
  //     <div className="single-comment-wrapper mt-35">
  //       <div className="blog-comment-img">
  //         <img
  //           src={process.env.PUBLIC_URL + "/assets/img/blog/comment-1.jpg"}
  //           alt=""
  //         />
  //       </div>
  //       <div className="blog-comment-content">
  //         <h4>Anthony Stephens</h4>
  //         <span>{commentaire.time} </span>
  //         <p>{commentaire.text} </p>
  //       </div>
  //     </div>
  //   );
  // });
  //commentaire.userId !== null &&
  const liste = comments.map((commentaire, i) => {
    if (commentaire.blogId == blog.id) {
      return (
        <div className="blog-comment-wrapper mt-55">
          <h4 className="blog-dec-title">comment : {i + 1}</h4>
          <div className="single-comment-wrapper mt-35" key={i}>
            <div className="blog-comment-img">
              <img
                //src={process.env.PUBLIC_URL + "/assets/img/blog/comment-1.jpg"}
                src={process.env.PUBLIC_URL + "/assets/img/" + commentaire.img}
                alt=""
              />
            </div>
            <div className="blog-comment-content">
              <h4>{commentaire.user.username}</h4>
              <span>{commentaire.time.slice(0, 10)} </span>
              <p>{commentaire.text} </p>
            </div>
          </div>
        </div>
      );
    }
  });

  // console.log(
  //   profile.img.substr(profile.img.lastIndexOf("\\") + 1, profile.img.length)
  // );
  return (
    <Fragment>
      {!liste || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {/* <div className="blog-comment-wrapper mt-55">
            <h4 className="blog-dec-title">comments : 02</h4> */}
          {/* <div className="single-comment-wrapper mt-35">
          <div className="blog-comment-img">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/blog/comment-1.jpg"}
              alt=""
            />
          </div>
          <div className="blog-comment-content">
            <h4>Anthony Stephens</h4>
            <span>October 14, 2018 </span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolor magna aliqua. Ut enim
              ad minim veniam,{" "}
            </p>
          </div>
        </div> */}
          {liste}
          {/* <div className="single-comment-wrapper mt-50 ml-120">
          <div className="blog-comment-img">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/blog/comment-2.jpg"}
              alt=""
            />
          </div>
          <div className="blog-comment-content">
            <h4>DX Joxova</h4>
            <span>October 14, 2018 </span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolor magna aliqua. Ut enim
              ad minim veniam,{" "}
            </p>
          </div>
        </div> */}
          {/* </div> */}
          {user === null ? null : (
            <Fragment>
              <div className="blog-reply-wrapper mt-50">
                <h4 className="blog-dec-title">post a comment</h4>
                <form className="blog-form" onSubmit={(e) => onSubmit(e)}>
                  <div className="row">
                    {/* <div className="col-md-6">
              <div className="leave-form">
                <input type="text" placeholder="Full Name" />
              </div>
            </div> */}
                    {/* <div className="col-md-6">
              <div className="leave-form">
                <input type="email" placeholder="Email Address " />
              </div>
            </div> */}
                    <div className="col-md-12">
                      <div className="text-leave">
                        <textarea
                          placeholder="Message"
                          //defaultValue={""}
                          value={text}
                          onChange={(e) => onChange(e)}
                        />
                        <input type="submit" defaultValue="SEND MESSAGE" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Fragment>
          )}
          {/* <div className="blog-reply-wrapper mt-50">
            <h4 className="blog-dec-title">post a comment</h4>
            <form className="blog-form" onSubmit={(e) => onSubmit(e)}>
              <div className="row">
                
                <div className="col-md-12">
                  <div className="text-leave">
                    <textarea
                      placeholder="Message"
                      
                      value={text}
                      onChange={(e) => onChange(e)}
                    />
                    <input type="submit" defaultValue="SEND MESSAGE" />
                  </div>
                </div>
              </div>
            </form>
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

BlogComment.prototype = {
  blog: PropTypes.object.isRequired,
  //addComment: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  addCommentByUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getAllBlogs: PropTypes.func.isRequired,
  //getCommentsByBlog: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  comments: state.blog.comments,
  user: state.auth.user,
  loading: state.blog.loading,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {
  //addComment,
  getComments,
  addCommentByUser,
  getAllBlogs,
  //getCommentsByBlog,
})(BlogComment);
