import React from "react";
import img1 from "../../assets/img/3.jpg";
import "./card-stylee.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteBlog } from "../../redux/actions/blog";
import { connect } from "react-redux";

const CardBlogg = ({ blog, deleteBlog }) => {
  //console.log(blog);
  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="overflow">
              <img src={blog.image[0]} alt="" className="card-img-top" />
            </div>
            <div className="card-body text-dark">
              <h4 className="card-title">{blog.title}</h4>
              <p>{blog.description}</p>
              <div className="buttonns">
                {/* <a href="#" className="btn btn-outline-success">
                  Modifier
                </a> */}
                <Link
                  to={process.env.PUBLIC_URL + "/blogFormModif/" + blog.id}
                  className="btn btn-outline-success"
                >
                  Modifier
                </Link>

                <a
                  href="#"
                  className="btn btn-outline-danger"
                  onClick={() => deleteBlog(blog.id)}
                >
                  Supprimer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardBlogg.prototype = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteBlog })(CardBlogg);
