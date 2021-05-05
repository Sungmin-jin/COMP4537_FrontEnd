import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import comments from "./comment";
import chat from "./chat";

export default combineReducers({
  auth,
  post,
  comments,
  chat,
});
