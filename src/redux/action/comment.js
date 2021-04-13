import axios from 'axios';
import { GET_COMMENTS, DELETE_COMMENT } from './types';
import defaultUrl from '../../config/defaultUrl.json';

export const getComments = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/comments/${postId}`);
    dispatch({
      type: GET_COMMENTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadComment = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.post(`/comments`, formData, config);
    dispatch(getComments(formData.postId));
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/comments/${id}`);
    console.log(res);
    if (res.data.affectedRows > 0) {
      dispatch({
        type: DELETE_COMMENT,
        payload: id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const editComment = (formData, postId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      crossDomain: true,
    },
  };
  try {
    await axios.put(`/comments`, formData, config);
    dispatch(getComments(postId));
  } catch (error) {
    console.log(error);
  }
};
