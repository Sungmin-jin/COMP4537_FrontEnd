import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated && !auth.loading ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
