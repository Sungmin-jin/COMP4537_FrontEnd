import {
  UPLOAD_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POST,
  GET_POSTS,
} from '../action/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
};

export default function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case UPLOAD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    default:
      return state;
  }
}
