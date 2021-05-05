import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Chakra ui
import { ChakraProvider } from "@chakra-ui/react";

// pages
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import PostForm from "./pages/postForm/PostForm";
import Posts from "./pages/posts/Posts";
import Post from "./pages/post/Post";
import User from "./pages/user/User";
import ChatRoom from "./pages/chat/ChatRoom";
import ChatList from "./pages/chat/ChatList";

//Autenticated route
import AuthRoute from "./components/authRoute/AuthRoute";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./redux/action/auth";

import "./styles/app.css";
import SignIn from "./components/signin/SignIn";
import About from "./pages/about/About";
import SignUp from "./components/signup/SignUp";
import Temp from "./components/temp/Temp";
import Header from "./components/header/Header";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path="/temp" component={Temp} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signin" component={SignIn} />
            <Route ext path="/signup" component={SignUp} />
            <AuthRoute exact path="/user" component={User} />
            //auth route
            <Route exact path="/chatList" component={ChatList} />
            <Route exact path="/chating/:id" component={ChatRoom} />
            <AuthRoute exact path="/post/:id" component={Post} />
            <AuthRoute exact path="/home" component={Dashboard} />
            <AuthRoute exact path="/postform" component={PostForm} />
            <AuthRoute exact path="/posts" component={Posts} />
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
