import React, { useState, Fragment } from "react";
import Toolbarr from "../../components/Toulbarr/Toolbarr.js";
import SideDrawerr from "../../components/SideDrawerr/SideDrawerr.js";
import Backdropp from "../../components/SideDrawerr/Backdropp.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  addSize,
  addVar,
  associationSizeVar,
  addProd,
  associationClVar,
  //products,
} from "../../redux/actions/clothes";

const ProductFormAjout = ({
  addSize,
  addVar,
  associationSizeVar,
  variation,
  size,
  addProd,
  associationClVar,
  clothes,
}) => {
  const [sideDroppOpen, setSideDroppOpen] = useState(false);
  const [ind, setInd] = useState(false);

  const [sizeFormData, setSizeFormData] = useState({
    name: "",
    stock: "",
  });

  const { name, stock } = sizeFormData;

  const onChangeSize = (e) =>
    setSizeFormData({
      ...sizeFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmitSize = (e) => {
    e.preventDefault();
    console.log(sizeFormData);
    addSize(sizeFormData);
  };

  //****************************************************************** */

  const [variationFormData, setVariationFormData] = useState({
    color: "",
    image: "",
  });

  const { color, image } = variationFormData;

  const onChangeVar = (e) =>
    setVariationFormData({
      ...variationFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmitVar = (e) => {
    e.preventDefault();
    addVar(variationFormData);
  };

  const associationSV = (e) => {
    e.preventDefault();
    associationSizeVar(variation.id, size.id);
  };

  //******************************************************************************************** */

  const [clFormData, setClFormData] = useState({
    sku: "",
    name: "",
    price: "",
    discount: "",
    category: "",
    tag: "",
    image: "",
    shortDescription: "",
    fullDescription: "",
  });

  //const {} = clFormData;

  const onChangeCl = (e) =>
    setClFormData({
      ...clFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmitCl = (e) => {
    e.preventDefault();
    //console.log(clFormData);
    addProd(clFormData);
  };

  const associationCV = (e) => {
    e.preventDefault();
    associationClVar(clothes.id, variation.id);
    setInd(true);
  };

  if (ind) {
    return <Redirect to="/ProductsEspaceAdmin" />;
  }

  return (
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
            padding: "15px",
          }}
        >
          <div className="row">
            <div className="col">
              <form
                onSubmit={(e) => onSubmitSize(e)}
                className="needs-validation"
                noValidate
                style={{
                  width: "300px",
                  margin: "auto",
                }}
              >
                <h1>Create Size</h1>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    onChange={(e) => onChangeSize(e)}
                  />
                  <small className="form-text text-muted">
                    Enter name of the size.
                  </small>
                  <div className="invalid-feedback">
                    please enter a valid name!
                  </div>
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="text"
                    name="stock"
                    className="form-control"
                    onChange={(e) => onChangeSize(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    Enter the stock.
                  </small>
                  <div className="invalid-feedback">
                    please enter a valid stock number!
                  </div>
                </div>

                <button type="submit" className="btn btn-outline-success">
                  Submit
                </button>
              </form>

              <form
                onSubmit={(e) => onSubmitVar(e)}
                className="needs-validation"
                noValidate
                style={{
                  width: "300px",
                  margin: "auto",
                  marginTop: "50px",
                }}
              >
                <h1>Create Variation</h1>
                <div className="form-group">
                  <label>Color</label>
                  <input
                    type="text"
                    name="color"
                    className="form-control"
                    required
                    onChange={(e) => onChangeVar(e)}
                  />
                  <small className="form-text text-muted">Enter color.</small>
                  <div className="invalid-feedback">
                    please enter a valid color!
                  </div>
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    required
                    onChange={(e) => onChangeVar(e)}
                  />
                  <small className="form-text text-muted">Enter Image.</small>
                  <div className="invalid-feedback">
                    please enter a valid image!
                  </div>
                </div>

                <button type="submit" className="btn btn-outline-success">
                  Submit
                </button>
              </form>
              <button
                className="btn btn-outline-success"
                onClick={(e) => associationSV(e)}
              >
                Association
              </button>
            </div>
            <div className="col">
              <form
                onSubmit={(e) => onSubmitCl(e)}
                className="needs-validation"
                noValidate
                style={{
                  width: "300px",
                  margin: "auto",
                }}
              >
                <h1>Create Clothes</h1>
                <div className="form-group">
                  <label>Sku</label>
                  <input
                    type="text"
                    name="sku"
                    className="form-control"
                    required
                    onChange={(e) => onChangeCl(e)}
                  />
                  <small className="form-text text-muted">Enter sku.</small>
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={(e) => onChangeCl(e)}
                  />
                  <small className="form-text text-muted">Enter name.</small>
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    onChange={(e) => onChangeCl(e)}
                  />
                  <small className="form-text text-muted">Enter price.</small>
                </div>
                <div className="form-group">
                  <label>discount</label>
                  <input
                    type="text"
                    name="discount"
                    className="form-control"
                    required
                    onChange={(e) => onChangeCl(e)}
                  />
                  <small className="form-text text-muted">
                    Enter discount.
                  </small>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    required
                    onChange={(e) => onChangeCl(e)}
                  />
                  <small className="form-text text-muted">
                    Enter Category.
                  </small>
                </div>
                <div className="form-group">
                  <label>Tags</label>
                  <input
                    type="text"
                    name="tag"
                    className="form-control"
                    onChange={(e) => onChangeCl(e)}
                  />
                  <small className="form-text text-muted">Enter tags.</small>
                </div>
                <div className="form-group">
                  <label>Images</label>
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    required
                    onChange={(e) => onChangeCl(e)}
                  />
                  <small className="form-text text-muted">Enter images.</small>
                </div>
                <div className="form-group">
                  <label>Short Description</label>
                  <input
                    type="text"
                    name="shortDescription"
                    className="form-control"
                    onChange={(e) => onChangeCl(e)}
                  />
                  <small className="form-text text-muted">
                    Enter short Description.
                  </small>
                </div>
                <div className="form-group">
                  <label>Full Description</label>
                  <input
                    type="text"
                    name="fullDescription"
                    className="form-control"
                    required
                    onChange={(e) => onChangeCl(e)}
                  />
                  <small className="form-text text-muted">
                    Enter full Description.
                  </small>
                </div>

                <button type="submit" className="btn btn-outline-success">
                  Submit
                </button>
              </form>
              <button
                className="btn btn-outline-success"
                onClick={(e) => associationCV(e)}
              >
                Association
              </button>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

ProductFormAjout.prototype = {
  addSize: PropTypes.func.isRequired,
  addVar: PropTypes.func.isRequired,
  associationSizeVar: PropTypes.func.isRequired,
  addProd: PropTypes.func.isRequired,
  associationClVar: PropTypes.func.isRequired,
  //products: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  variation: state.clothes.variation,
  size: state.clothes.size,
  clothes: state.clothes.clothes,
  //products: state.productData.products,
});
export default connect(mapStateToProps, {
  addSize,
  addVar,
  associationSizeVar,
  addProd,
  associationClVar,
})(ProductFormAjout);
