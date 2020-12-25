import { ADD_LIVRAISON, GET_LIVRAISONS } from "../actions/types";
import axios from "axios";

export const getLivraisons = () => async (dispatch) => {
  try {
    const res = await axios.get("/livraison");

    dispatch({
      type: GET_LIVRAISONS,
      payload: res.data,
    });
  } catch (error) {
    throw error;
  }
};

export const addLiv = (
  UserEmail,
  productColor,
  productName,
  productSize,
  productSku
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    UserEmail,
    productColor,
    productName,
    productSize,
    productSku,
  });

  try {
    const res = await axios.post("/livraison", body, config);

    dispatch({
      type: ADD_LIVRAISON,
      payload: res.data,
    });

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

export const deleteLivraison = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/livraison/${id}`);
  } catch (error) {
    throw error.message;
  }
};
