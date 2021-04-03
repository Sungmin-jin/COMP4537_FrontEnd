import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Chakra ui
import { ChakraProvider } from '@chakra-ui/react';

// pages
import Landing from './pages/landing/Landing';
import Dashboard from './pages/dashboard/Dashboard';
import PostForm from './pages/postForm/PostForm';
import Admin from './pages/admin/Admin';

//Autenticated route
import AuthRoute from './components/authRoute/AuthRoute';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/action/auth';

function App() {
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
            <AuthRoute path='/home' component={Dashboard} />
            <AuthRoute path='/postForm' component={PostForm} />
            <Route path='/admin' component={Admin} />
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
