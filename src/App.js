import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Chakra ui
import { ChakraProvider } from '@chakra-ui/react';

// pages
import Landing from './pages/landing/Landing';

//Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
