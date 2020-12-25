import axios from "axios";

import {
  BLOG_ERROR,
  GET_BLOG,
  GET_BLOGS,
  ADD_COMMENT,
  GET_COMMENT,
  ADD_BLOG,
} from "./types";

//GET BLOGS
export const getCurrentBlog = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/blog/${id}`);

    dispatch({
      type: GET_BLOG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//GET BLOGS
export const getAllBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get(`/blog`);

    dispatch({
      type: GET_BLOGS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//Add Blog
export const addComment = (text, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ text });
  try {
    const res = await axios.patch(`/commentaire/${id}`, body, config);

    dispatch({
      type: ADD_COMMENT,
      payload: { comment: res.data, id },
    });

    const res1 = await axios.get(`/blog`);

    dispatch({
      type: GET_BLOGS,
      payload: res1.data,
    });

    const res2 = await axios.get(`/commentaire/${id}`);

    dispatch({
      type: GET_COMMENT,
      payload: res2.data,
    });
  } catch (error) {
    throw error.message;
  }
};

//Get Comments By BLOG
export const getCommentsByBlog = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/commentaire/${id}`);

    dispatch({
      type: GET_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    throw err;
  }
};

export const addCommentByUser = (formData, idUser, idBlog) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //const body = JSON.stringify({ text });
  try {
    const res = await axios.post(
      `/commentaire/${idUser}/${idBlog}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      //payload: { comment: res.data, idBlog },
      payload: res.data,
    });

    // const res1 = await axios.get(`/blog`);

    // dispatch({
    //   type: GET_BLOGS,
    //   payload: res1.data,
    // });

    // const res2 = await axios.get(`/commentaire/${idBlog}`);

    // dispatch({
    //   type: GET_COMMENT,
    //   payload: res2.data,
    // });
  } catch (error) {
    throw error.message;
  }
};

export const getComments = () => async (dispatch) => {
  try {
    const res = await axios.get(`/commentaire`);

    dispatch({
      type: GET_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    throw err;
  }
};

//**************************************************************** */

export const addBlog = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/blog", formData, config);

    dispatch({
      type: ADD_BLOG,
      payload: res.data,
    });

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

export const modifyBlog = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.patch(`/blog/${id}`, formData, config);

    // dispatch({
    //   type: ADD_BLOG,
    //   payload: res.data,
    // });

    console.log(res.data);
  } catch (error) {
    throw error.message;
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/blog/${id}`);
  } catch (error) {
    throw error.message;
  }
};
