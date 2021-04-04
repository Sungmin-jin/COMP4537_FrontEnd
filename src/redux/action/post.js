import axios from 'axios';
import {
  UPLOAD_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
} from './types';
import defaultUrl from '../../config/defaultUrl.json';
import firebase from '../../config/firebase';

export const uploadPost = ({ title, text, price, file }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const formData = { title, text, price, image: null };
    if (file) {
      const storageRef = firebase.storage().ref('media');
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();
      formData.image = fileUrl;
    }
    const res = await axios.post(`${defaultUrl.url}/posts`, formData, config);
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { error },
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${defaultUrl.url}/posts`);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
