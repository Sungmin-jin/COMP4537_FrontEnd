import axios from 'axios';
import {
  UPLOAD_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from './types';
import defaultUrl from '../../config/defaultUrl.json';

export const getComments = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`${defaultUrl.url}/comments/${postId}`);
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
    const res = await axios.post(
      `${defaultUrl.url}/comments`,
      formData,
      config
    );
    dispatch(getComments(formData.postId));
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${defaultUrl.url}/comments/${id}`);
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

export const editComment = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`${defaultUrl.url}/comments`, formData, config);
  } catch (error) {
    console.log(error);
  }
};
