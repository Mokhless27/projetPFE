// export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

// const fetchProductsSuccess = products => ({
//   type: FETCH_PRODUCTS_SUCCESS,
//   payload: products
// });

// // fetch products
// export const fetchProducts = products => {
//   return dispatch => {
//     dispatch(fetchProductsSuccess(products));
//   };
// };

import axios from "axios";

import {
  CLOTHES_ERROR,
  GET_CLOTHES,
  GET_PRODUCT,
  PRODUCT_ERROR,
  CHECKOUT,
  DELETE_PRODUCT,
} from "./types";

//Get All clothes
export const getAllClothes = () => async (dispatch) => {
  try {
    const res = await axios.get("/clothes");

    dispatch({
      type: GET_CLOTHES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLOTHES_ERROR,
    });
  }
};

//Get product by id
export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/clothes/${id}`);

    console.log(res.data);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    // dispatch({
    //   type: PRODUCT_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
    console.log(err);
  }
};

export const checkout = (product, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ product, token });
  try {
    const res = await axios.post(`/clothes/checkout`, body, config);
    //console.log(res.data);

    dispatch({
      type: CHECKOUT,
      payload: res.data,
    });
  } catch (err) {
    //throw err;
    console.log(err);
  }
};

//Delete product by id
export const deleteProductById = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/size/${id}`);

    console.log(res.data);
    // dispatch({
    //   type: DELETE_PRODUCT,
    //   payload: res.data,
    // });
  } catch (err) {
    // dispatch({
    //   type: PRODUCT_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
    console.log(err);
  }
};

export const achat = (idUser, idClothes) => async (dispatch) => {
  try {
    const res = await axios.patch(`/auth/achat/${idUser}/${idClothes}`);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
