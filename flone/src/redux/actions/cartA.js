import { ADD_CART } from "./types";
import axios from "axios";

//add to cart
export const addCart = (idClothes, idCart) => async (dispatch) => {
  try {
    const res = await axios.patch(`cartdata/${idClothes}/${idCart}`);
    console.log(res.data);
    dispatch({
      type: ADD_CART,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    throw err;
  }
};
