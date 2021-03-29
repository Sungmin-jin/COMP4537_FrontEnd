import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Chakra ui
import { ChakraProvider } from "@chakra-ui/react";

// pages
import Landing from "./pages/landing/Landing";

function App() {
  return (
    <>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
