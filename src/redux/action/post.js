import axios from 'axios';
import {
  UPLOAD_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
} from './types';

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
    const res = await axios.post('/api/v1/posts', formData, config);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
