import {
  UPLOAD_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POSTS,
  GET_POST,
} from '../action/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_POST:
      console.log(payload);
      return {
        ...state,
      };
    default:
      return state;
  }
}
