import React from "react";
import img1 from "../../assets/img/3.jpg";
import "./card-stylee.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteClothes } from "../../redux/actions/clothes";

const CardProductt = ({ product, deleteClothes }) => {
  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="overflow">
              <img src={product.image[0]} alt="" className="card-img-top" />
            </div>
            <div className="card-body text-dark">
              <h4 className="card-title">{product.name}</h4>
              <p>{product.shortDescription}</p>
              <div className="buttonns">
                <Link
                  to={
                    process.env.PUBLIC_URL + "/productFormModif/" + product.id
                  }
                  className="btn btn-outline-success"
                >
                  Modifier
                </Link>
                <a
                  href="#"
                  className="btn btn-outline-danger"
                  onClick={() => deleteClothes(product.id)}
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

CardProductt.prototype = {
  product: PropTypes.object.isRequired,
  deleteClothes: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteClothes })(CardProductt);
