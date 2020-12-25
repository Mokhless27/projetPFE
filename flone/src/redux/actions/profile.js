import axios from "axios";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

//Get Current user profile
export const getCurrentProfile = (profileId) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/me/${profileId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//create or update profile
export const createOrUpdateProfile = (id, formData, setAlertmsg) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/profile/${id}`, formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    console.log(res.data);
    setAlertmsg("Profile Modified");

    //history.push("/home-fashion");
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//create profile
export const createProfile = (id, formData, setAlertmsg) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/profile/user/${id}`, formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    console.log(res.data);
    setAlertmsg("Profile Added");

    //history.push("/home-fashion");
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//create or update profile
export const updateAddress = (id, address, setAlertmsg) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ address });

  try {
    const res = await axios.patch(`/profile/address/${id}`, body, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    console.log(res.data);
    setAlertmsg("Address Modified");

    //history.push("/home-fashion");
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
//********************************************************************************************* */
//create or update profile
export const updatePhoto = (id, file, setUploadPercentage) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.patch(`/profile/${id}`, file, {
      config,
      onUploadProgress: (ProgressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
          )
        );
        setTimeout(() => setUploadPercentage(0), 10000);
      },
    });

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    console.log(res.data);
  } catch (erreur) {
    throw erreur;
  }
};
