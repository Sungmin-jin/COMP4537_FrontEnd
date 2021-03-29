import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Chakra ui
import { ChakraProvider } from "@chakra-ui/react";

// pages
import Landing from "./pages/landing/Landing";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Dashboard} />
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
