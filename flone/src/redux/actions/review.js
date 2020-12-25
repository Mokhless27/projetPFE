import { ADD_REVIEW, GET_REVIEWS } from "../actions/types";
import axios from "axios";

export const addReview = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/review/${id}`, formData, config);

    dispatch({
      type: ADD_REVIEW,
      payload: res.data,
    });

    console.log(res.data);
  } catch (error) {
    throw error;
  }
};
//************************************************************ */

export const addReviewByProd = (idUser, idProduct, formData) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `/review/${idUser}/${idProduct}`,
      formData,
      config
    );

    dispatch({
      type: ADD_REVIEW,
      payload: res.data,
    });

    console.log(res.data);
  } catch (error) {
    throw error;
  }
};

export const getReviews = () => async (dispatch) => {
  try {
    const res = await axios.get("/review");

    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });
    //console.log(res.data);
  } catch (error) {
    throw error;
  }
};

export const getReviewsByProd = (idProduct) => async (dispatch) => {
  try {
    const res = await axios.get(`/review/${idProduct}`);

    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });
    //console.log(res.data);
  } catch (error) {
    throw error;
  }
};
