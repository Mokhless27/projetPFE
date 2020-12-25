import axios from "axios";
import { ADD_SIZE, ADD_VAR, ADD_PROD } from "../actions/types";

export const addSize = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/size", formData, config);

    dispatch({
      type: ADD_SIZE,
      payload: res.data,
    });

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

export const addVar = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/variation", formData, config);

    dispatch({
      type: ADD_VAR,
      payload: res.data,
    });

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

export const associationSizeVar = (idVar, idSize) => async (dispatch) => {
  try {
    const res = await axios.patch(`/variation/${idVar}/${idSize}`);

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

//********************************************************************************* */

export const addProd = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/clothes", formData, config);

    dispatch({
      type: ADD_PROD,
      payload: res.data,
    });

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

export const associationClVar = (idCl, idVar) => async (dispatch) => {
  try {
    const res = await axios.patch(`/clothes/${idCl}/${idVar}`);

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

//************************************************************* */
export const modifyProd = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.patch(`/clothes/${id}`, formData, config);

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

export const modifSize = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.patch(`/size/size/${id}`, formData, config);

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

export const modifyVar = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.patch(`/variation/${id}`, formData, config);

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

//************************************** */
export const deleteClothes = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/clothes/${id}`);
  } catch (error) {
    throw error.message;
  }
};

export const deleteSize = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/size/${id}`);
  } catch (error) {
    throw error.message;
  }
};

export const deleteVar = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/variation/${id}`);
  } catch (error) {
    throw error.message;
  }
};
