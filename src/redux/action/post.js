import axios from 'axios';

import {
  UPLOAD_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POSTS,
  GET_POST,
} from './types';

export const uploadPost = (formData) => async (dispatch) => {
  const data = new FormData();
  data.append('image', formData.image);
  axios.post('/api/posts/34', data);
};
