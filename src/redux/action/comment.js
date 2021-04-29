import axios from "axios";
import { GET_COMMENTS, DELETE_COMMENT } from "./types";
import defaultUrl from "../../config/defaultUrl.json";

export const getComments = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`${defaultUrl.url}/comments/${postId}`);
    dispatch({
      type: GET_COMMENTS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const uploadComment = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(formData);
  try {
    await axios.post(`${defaultUrl.url}/comments`, formData, config);
    dispatch(getComments(formData.postId));
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${defaultUrl.url}/comments/${id}`);
    if (res.status === 200) {
      dispatch({
        type: DELETE_COMMENT,
        payload: id,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const editComment = (formData, postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.put(`${defaultUrl.url}/comments`, formData, config);
    dispatch(getComments(postId));
  } catch (error) {
    console.log(error);
  }
};
