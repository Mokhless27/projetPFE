import { GET_PROPOSITIONS, ADD_PROPOSITION } from "../actions/types";
import axios from "axios";

export const getPropositions = () => async (dispatch) => {
  try {
    const res = await axios.get("/propositions");

    dispatch({
      type: GET_PROPOSITIONS,
      payload: res.data,
    });
  } catch (error) {
    throw error;
  }
};

export const addProposition = (formData, setAlertmsg) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/propositions", formData, config);

    dispatch({
      type: ADD_PROPOSITION,
      payload: res.data,
    });

    console.log(res.data);
    setAlertmsg("Prop Added");
  } catch (error) {
    setAlertmsg("Prop Not Added");
    throw error.message;
  }
};

export const deleteProposition = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/propositions/${id}`);
  } catch (error) {
    throw error.message;
  }
};
