import React, { useState, Fragment, useEffect } from "react";
import Toolbarr from "../../components/Toulbarr/Toolbarr.js";
import SideDrawerr from "../../components/SideDrawerr/SideDrawerr.js";
import Backdropp from "../../components/SideDrawerr/Backdropp.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  modifyProd,
  modifSize,
  modifyVar,
  deleteSize,
  deleteVar,
} from "../../redux/actions/clothes";
import { Redirect } from "react-router-dom";
import { getAllClothes } from "../../redux/actions/productActions";

const ProductFormModif = ({
  variation,
  size,
  clothes,
  match,
  product,
  modifyProd,
  modifSize,
  modifyVar,
  getAllClothes,
  deleteSize,
  deleteVar,
}) => {
  const [sideDroppOpen, setSideDroppOpen] = useState(false);

  useEffect(() => {
    getAllClothes();
  });

  useEffect(() => {
    setClFormData({
      sku: product[0].sku,
      name: product[0].name,
      price: product[0].price,
      discount: product[0].discount,
      category: product[0].category.toString(),
      tag: product[0].tag.toString(),
      image: product[0].image.toString(),
      shortDescription: product[0].shortDescription,
      fullDescription: product[0].fullDescription,
    });
  }, []);

  const [ind, setInd] = useState(false);

  const [sizeFormData, setSizeFormData] = useState({
    idSize: "",
    namee: "",
    stock: "",
  });

  const { idSize, namee, stock } = sizeFormData;

  const onChangeSize = (e) =>
    setSizeFormData({
      ...sizeFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmitSize = (e) => {
    e.preventDefault();
    //console.log(sizeFormData);
    const name = namee;
    modifSize(idSize, { name, stock });
  };

  const modifySize = (Vid, Sid) => {
    const v = product[0].variation.filter((v) => v.id === Vid);

    const s = v[0].size.filter((s) => s.id == Sid);

    setSizeFormData({
      idSize: Sid,
      namee: s[0].name,
      stock: s[0].stock,
    });
  };

  //****************************************************************** */

  const [variationFormData, setVariationFormData] = useState({
    idVaria: "",
    color: "",
    img: "",
  });

  const { idVaria, color, img } = variationFormData;

  const onChangeVar = (e) =>
    setVariationFormData({
      ...variationFormData,
      [e.target.name]: e.target.value,
    });

  const modifierVariation = (id) => {
    const v = product[0].variation.filter((v) => v.id === id);
    //console.log(v[0]);
    setVariationFormData({
      idVaria: id,
      color: v[0].color,
      img: v[0].image,
    });
    //console.log(variationFormData);
  };

  const onSubmitVar = (e) => {
    e.preventDefault();
    //console.log(variationFormData);
    const image = img;
    modifyVar(idVaria, {
      color,
      image,
    });
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

  const {
    sku,
    name,
    price,
    discount,
    category,
    tag,
    image,
    shortDescription,
    fullDescription,
  } = clFormData;

  const onChangeCl = (e) =>
    setClFormData({
      ...clFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmitCl = (e) => {
    e.preventDefault();
    console.log(clFormData);
    modifyProd(product[0].id, clFormData);
    setInd(true);
  };

  if (ind) {
    return <Redirect to="/ProductsEspaceAdmin" />;
  }

  //************************************************************************ */

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
                //className="needs-validation"
                //noValidate
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
                    name="namee"
                    //className="form-control"
                    //required
                    onChange={(e) => onChangeSize(e)}
                    value={namee}
                  />
                  <small className="form-text text-muted">
                    Enter name of the size.
                  </small>
                  {/* <div className="invalid-feedback">
                    please enter a valid name!
                  </div> */}
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="text"
                    name="stock"
                    //className="form-control"
                    onChange={(e) => onChangeSize(e)}
                    //required
                    value={stock}
                  />
                  <small className="form-text text-muted">
                    Enter the stock.
                  </small>
                  {/* <div className="invalid-feedback">
                    please enter a valid stock number!
                  </div> */}
                </div>

                <button type="submit" className="btn btn-outline-success">
                  Submit
                </button>
              </form>

              <form
                onSubmit={(e) => onSubmitVar(e)}
                //className="needs-validation"
                //noValidate
                style={{
                  width: "300px",
                  margin: "auto",
                  marginTop: "50px",
                }}
              >
                <h1>Update Variation</h1>
                <div className="form-group">
                  <label>Color</label>
                  <input
                    type="text"
                    name="color"
                    //className="form-control"
                    //required
                    onChange={(e) => onChangeVar(e)}
                    value={color}
                  />
                  <small className="form-text text-muted">Enter color.</small>
                  {/* <div className="invalid-feedback">
                    please enter a valid color!
                  </div> */}
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="text"
                    name="img"
                    //className="form-control"
                    //required
                    onChange={(e) => onChangeVar(e)}
                    value={img}
                  />
                  <small className="form-text text-muted">Enter Image.</small>
                  {/* <div className="invalid-feedback">
                    please enter a valid image!
                  </div> */}
                </div>

                <button type="submit" className="btn btn-outline-success">
                  Submit
                </button>
              </form>

              <div
                className="container"
                style={{
                  marginTop: "30px",
                }}
              >
                <div className="jumbotron">
                  <div className="card">
                    <div className="card-header">Variations</div>
                    <div className="card-body">
                      <table className="table table-striped table-dark table-hover table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">color</th>
                            <th scope="col">image</th>

                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product[0].variation.map((v, i) => {
                            return (
                              <tr key={i}>
                                <th scope="row">{v.id}</th>
                                <th scope="row">{v.color}</th>
                                <td>{v.image}</td>

                                <td>
                                  <button
                                    className="btn btn-success badge-pill"
                                    onClick={() => modifierVariation(v.id)}
                                    style={{
                                      marginRight: "10px",
                                      marginLeft: "30px",
                                    }}
                                  >
                                    modifier
                                  </button>
                                  <button
                                    className="btn btn-danger badge-pill"
                                    onClick={() => deleteVar(v.id)}
                                  >
                                    delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="jumbotron">
                  <div className="card">
                    <div className="card-header">Size</div>
                    <div className="card-body">
                      <table className="table table-striped table-dark table-hover table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">stock</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product[0].variation.map((v) => {
                            return v.size.map((s, i) => {
                              return (
                                <tr key={i}>
                                  <th scope="row">{s.id}</th>
                                  <th scope="row">{s.name}</th>
                                  <td>{s.stock}</td>

                                  <td>
                                    <button
                                      className="btn btn-success badge-pill"
                                      onClick={() => modifySize(v.id, s.id)}
                                      style={{
                                        marginRight: "10px",
                                        marginLeft: "50px",
                                      }}
                                    >
                                      modifier
                                    </button>
                                    <button
                                      className="btn btn-danger badge-pill"
                                      onClick={() => deleteSize(s.id)}
                                    >
                                      delete
                                    </button>
                                  </td>
                                </tr>
                              );
                            });
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
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
                    value={sku}
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
                    value={name}
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
                    value={price}
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
                    value={discount}
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
                    value={category}
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
                    value={tag}
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
                    value={image}
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
                    value={shortDescription}
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
                    value={fullDescription}
                  />
                  <small className="form-text text-muted">
                    Enter full Description.
                  </small>
                </div>

                <button type="submit" className="btn btn-outline-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

ProductFormModif.prototype = {
  modifyProd: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  modifSize: PropTypes.func.isRequired,
  modifyVar: PropTypes.func.isRequired,
  getAllClothes: PropTypes.func.isRequired,
  deleteSize: PropTypes.func.isRequired,
  deleteVar: PropTypes.func.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;

  return {
    variation: state.clothes.variation,
    size: state.clothes.size,
    clothes: state.clothes.clothes,
    product: state.productData.products.filter((p) => p.id == match.params.id),
  };
};
export default connect(mapStateToProps, {
  modifyProd,
  modifyVar,
  modifSize,
  getAllClothes,
  deleteSize,
  deleteVar,
})(ProductFormModif);
