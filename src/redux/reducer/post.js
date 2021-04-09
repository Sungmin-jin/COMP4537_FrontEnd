import {
  UPLOAD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
} from '../action/types';

const initialState = {
  posts: [],
  post: {},
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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.postId !== payload),
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    default:
      return state;
  }
}
