import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import comments from './comment';

export default combineReducers({
  auth,
  post,
  comments,
});
