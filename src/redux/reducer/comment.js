import {
  UPLOAD_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from '../action/types';

const initialState = {
  comments: [],
  loading: true,
  error: {},
};

export default function commentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.commentId !== payload
        ),
      };
    default:
      return state;
  }
}
