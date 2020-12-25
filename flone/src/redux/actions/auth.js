import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  HASH,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

//load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/auth/user");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({ username, email, password }, setAlertmsg) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post("/auth/signup", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }
    setAlertmsg(
      "Longueur mot de passe minimale 6 carectéres ; contenant au moins un chiffre et un carectére en majuscule"
    );

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User
export const login = (email, password, setAlertmsg) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/auth/signin", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error));
    }
    setAlertmsg("Credentials False");
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout /Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};

//change Password
export const changePassword = (id, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ password });

  try {
    const res = await axios.patch(`/auth/password/${id}`, body, config);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    //console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh", res.data);
  } catch (err) {
    // dispatch({
    //   type: AUTH_ERROR
    // });
    console.log(err);
  }
};

//Hash password
export const HashPassword = (password, salt) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ password, salt });

  try {
    const res = await axios.post(`/auth/hash`, body, config);

    dispatch({
      type: HASH,
      payload: res.data,
    });

    console.log(res.data);
  } catch (err) {
    // dispatch({
    //   type: AUTH_ERROR
    // });
    console.log(err);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/auth/${id}`);
  } catch (error) {
    throw error.message;
  }
};
