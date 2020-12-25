import React, { useState, Fragment, useEffect } from "react";
import Toolbarr from "../../components/Toulbarr/Toolbarr.js";
import SideDrawerr from "../../components/SideDrawerr/SideDrawerr.js";
import Backdropp from "../../components/SideDrawerr/Backdropp.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardProductt from "../../wrappers/cardProduct/cardProductt";
import { getAllClothes } from "../../redux/actions/productActions";

const ProductsEspaceAdmin = ({ products, loading, getAllClothes }) => {
  const [sideDroppOpen, setSideDroppOpen] = useState(false);

  useEffect(() => {
    getAllClothes();
  });

  return (
    <Fragment>
      {!products || loading ? (
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
                display: "flex",
                justifyContent: "space-between",
                //flexDirection: "row",
                flexWrap: "wrap",
                //margin: "20px 20px",
              }}
            >
              {products.map((product, i) => {
                return (
                  <div
                    style={{
                      margin: "20px",
                      width: "300px",
                    }}
                  >
                    <CardProductt product={product} key={i} />
                  </div>
                );
              })}
            </main>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProductsEspaceAdmin.prototype = {
  products: PropTypes.array.isRequired,
  getAllClothes: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.productData.products,
  loading: state.productData.loading,
});
export default connect(mapStateToProps, { getAllClothes })(ProductsEspaceAdmin);
