import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Chakra ui
import { ChakraProvider } from '@chakra-ui/react';

// pages
import Landing from './pages/landing/Landing';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/action/auth';

function App() {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/home' component={Dashboard} />
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
