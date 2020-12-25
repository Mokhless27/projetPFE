import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useLayoutEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import Spinner from "../other/spinner";
import RelatedProductSliderNeeded from "../../wrappers/product/RelatedProductSliderNeeded";

const Product = ({
  location,
  // product,
  match,
  products,
}) => {
  const { pathname } = location;

  // const [product, setProduct] = useState({});

  // setProduct(
  //   products[0] //.filter(single => single.id === match.params.id)
  // );

  return products.map((product) => {
    if (product.id == match.params.id) {
      return (
        <Fragment>
          <MetaTags>
            <title>Flone | Product Page</title>
            <meta
              name="description"
              content="Product page of flone react minimalist eCommerce template."
            />
          </MetaTags>

          <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
            Home
          </BreadcrumbsItem>
          <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
            Shop Product
          </BreadcrumbsItem>

          <LayoutOne headerTop="visible">
            {/* breadcrumb */}
            <Breadcrumb />

            {/* product description with image */}

            <ProductImageDescription
              spaceTopClass="pt-100"
              spaceBottomClass="pb-100"
              product={product}
            />

            {/* product description tab */}
            <ProductDescriptionTab
              spaceBottomClass="pb-90"
              productFullDesc={product.fullDescription}
              productId={product.id}
            />

            {/* related product slider */}
            <RelatedProductSliderNeeded
              spaceBottomClass="pb-95"
              category={product.category[0]}
              name={product.name}
              id={product.id}
              cat={product.category[0]}
            />
          </LayoutOne>
        </Fragment>
      );
    }
  });
};

Product.propTypes = {
  location: PropTypes.object.isRequired,
  //product: PropTypes.object.isRequired,
  products: PropTypes.array,
};

// const mapStateToProps = (state, ownProps) => {
//   const productId = ownProps.match.params.id;
//   return {
//     product: state.productData.products.filter(
//       single => single.id === productId
//     )[0]
//     product: state.productData
//   };
// };

const mapStateToProps = (state) => ({
  products: state.productData.products,
});
export default connect(mapStateToProps)(Product);
