import axios from "axios";
import { GET_PREF } from "./types";

export const createPref = (id, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //const body = JSON.stringify({ a, b, c, d, e, f, g, h, j });

  try {
    const res = await axios.post(`/preference/${id}`, formData, config);

    dispatch({
      type: GET_PREF,
      payload: res.data
    });

    console.log(res.data);
  } catch (error) {
    throw error;
  }
};

export const updatePref = (id, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(`/preference/${id}`, formData, config);

    dispatch({
      type: GET_PREF,
      payload: res.data
    });

    console.log(res.data);
  } catch (error) {
    throw error;
  }
};
