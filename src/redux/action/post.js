import axios from 'axios';
import { DELETE_POST, GET_POST, GET_POSTS, POST_ERROR } from './types';
import defaultUrl from '../../config/defaultUrl.json';
import firebase from '../../config/firebase';
import { v4 as uuidv4 } from 'uuid';

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
      const fileRef = storageRef.child(uuidv4() + '');
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();
      formData.image = fileUrl;
    }
    await axios.post(`/posts`, formData, config);
    dispatch(getPosts());
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
    const res = await axios.get(`/posts`);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/user`);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'x-auth-token': localStorage.token,
      },
    };
    const res = await axios.get(`/posts/${id}`, config);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//todo send dispatch pass id
export const deletePost = (id, url) => async (dispatch) => {
  try {
    const imageRef = firebase.storage().refFromURL(url);
    imageRef.delete();
    await axios.delete(`/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

//todo send dispatch getposts or something
export const editPost = (formData, id, file) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    if (file) {
      const imageRef = firebase.storage().refFromURL(formData.image);
      await imageRef.delete();

      const storageRef = firebase.storage().ref('media');
      const fileRef = storageRef.child(uuidv4() + '');
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();
      formData.image = fileUrl;
    }
    console.log('edit post');

    const res = await axios.put(`/posts/${id}`, formData, config);
    console.log(res);
    dispatch(getMyPosts());
  } catch (error) {
    console.log(error);
  }
};
