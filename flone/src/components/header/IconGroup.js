import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { removeFromCart } from "../../redux/actions/cartActions";
import { logout } from "../../redux/actions/auth";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  removeFromCart,
  auth: { isAuthenticated, loading },
  logout,
}) => {
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  const authLinks = (
    <div className="account-dropdown">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/my-account"}>my account</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/play/Home"}>my preference</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + ""} onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
    <div className="account-dropdown">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/login-register"}>Register</Link>
        </li>
        {/* <li>
          <Link to={process.env.PUBLIC_URL + "/my-account"}>my account</Link>
        </li> */}
      </ul>
    </div>
  );

  return (
    <div className="header-right-wrap">
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        {/* <div className="account-dropdown">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                Register
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                my account
              </Link>
            </li>
          </ul>
        </div> */}

        <Fragment>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Fragment>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareData && compareData.length ? compareData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          removeFromCart={removeFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  removeFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
    auth: state.auth,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     removeFromCart: (item, addToast) => {
//       dispatch(removeFromCart(item, addToast));
//     }
//   };
// };

export default connect(mapStateToProps, {
  //mapDispatchToProps
  removeFromCart,
  logout,
})(IconGroup);
