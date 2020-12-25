import { GET_USERS } from "../actions/types";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth");

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    throw error;
  }
};
