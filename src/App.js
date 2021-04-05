import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Chakra ui
import { ChakraProvider } from '@chakra-ui/react';

// pages
import Landing from './pages/landing/Landing';
import Dashboard from './pages/dashboard/Dashboard';
import PostForm from './pages/postForm/PostForm';
import Posts from './pages/posts/Posts';
import Post from './pages/post/Post';

//Autenticated route
import AuthRoute from './components/authRoute/AuthRoute';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/action/auth';
import Admin from './pages/admin/admin';

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
            <Route exact path='/' component={Landing} />
            <Route exact path='/admin' component={Admin} />
            <AuthRoute path='/post/:id' component={Post} />
            <AuthRoute path='/home' component={Dashboard} />
            <AuthRoute path='/postform' component={PostForm} />
            <AuthRoute paht='/posts' component={Posts} />
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
